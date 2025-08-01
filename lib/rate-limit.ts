import { promises as fs } from 'fs'
import path from 'path'

interface RateLimitEntry {
  attempts: number
  firstAttempt: number
  lastAttempt: number
  blockedUntil?: number
}

interface RateLimitStore {
  [key: string]: RateLimitEntry
}

const RATE_LIMIT_FILE = path.join(process.cwd(), 'data', 'rate-limits.json')
const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const BLOCK_DURATION_MS = 60 * 60 * 1000 // 1 hour

// Ensure data directory exists
async function ensureDataDir() {
  const dataDir = path.dirname(RATE_LIMIT_FILE)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

// Load rate limit data
async function loadRateLimits(): Promise<RateLimitStore> {
  try {
    await ensureDataDir()
    const data = await fs.readFile(RATE_LIMIT_FILE, 'utf-8')
    return JSON.parse(data)
  } catch {
    return {}
  }
}

// Save rate limit data
async function saveRateLimits(store: RateLimitStore) {
  await ensureDataDir()
  await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(store, null, 2))
}

// Clean up old entries
function cleanupOldEntries(store: RateLimitStore) {
  const now = Date.now()
  const cutoff = now - WINDOW_MS
  
  for (const key in store) {
    const entry = store[key]
    // Remove entries that are expired and not blocked
    if (entry.lastAttempt < cutoff && (!entry.blockedUntil || entry.blockedUntil < now)) {
      delete store[key]
    }
  }
}

export async function checkRateLimit(identifier: string): Promise<{
  allowed: boolean
  attemptsRemaining: number
  resetTime?: number
  blockedUntil?: number
}> {
  const store = await loadRateLimits()
  cleanupOldEntries(store)
  
  const now = Date.now()
  const entry = store[identifier]
  
  // Check if blocked
  if (entry?.blockedUntil && entry.blockedUntil > now) {
    return {
      allowed: false,
      attemptsRemaining: 0,
      blockedUntil: entry.blockedUntil
    }
  }
  
  // Check if within rate limit window
  if (entry && now - entry.firstAttempt < WINDOW_MS) {
    if (entry.attempts >= MAX_ATTEMPTS) {
      // Block the user
      entry.blockedUntil = now + BLOCK_DURATION_MS
      await saveRateLimits(store)
      
      return {
        allowed: false,
        attemptsRemaining: 0,
        blockedUntil: entry.blockedUntil
      }
    }
    
    return {
      allowed: true,
      attemptsRemaining: MAX_ATTEMPTS - entry.attempts,
      resetTime: entry.firstAttempt + WINDOW_MS
    }
  }
  
  // No recent attempts or window expired
  return {
    allowed: true,
    attemptsRemaining: MAX_ATTEMPTS
  }
}

export async function recordAttempt(identifier: string) {
  const store = await loadRateLimits()
  const now = Date.now()
  
  let entry = store[identifier]
  
  if (!entry || now - entry.firstAttempt >= WINDOW_MS) {
    // Start new window
    entry = {
      attempts: 1,
      firstAttempt: now,
      lastAttempt: now
    }
  } else {
    // Increment attempts in current window
    entry.attempts++
    entry.lastAttempt = now
  }
  
  store[identifier] = entry
  await saveRateLimits(store)
}

export async function resetRateLimit(identifier: string) {
  const store = await loadRateLimits()
  delete store[identifier]
  await saveRateLimits(store)
}

// Utility function for API routes
export function getRateLimitHeaders(result: {
  allowed: boolean
  attemptsRemaining: number
  resetTime?: number
  blockedUntil?: number
}) {
  const headers: Record<string, string> = {
    'X-RateLimit-Limit': MAX_ATTEMPTS.toString(),
    'X-RateLimit-Remaining': result.attemptsRemaining.toString(),
  }
  
  if (result.resetTime) {
    headers['X-RateLimit-Reset'] = new Date(result.resetTime).toISOString()
  }
  
  if (result.blockedUntil) {
    headers['Retry-After'] = Math.ceil((result.blockedUntil - Date.now()) / 1000).toString()
  }
  
  return headers
}