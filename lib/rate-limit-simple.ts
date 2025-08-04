// Simplified rate limiter for CodeSandbox (in-memory storage)
const rateLimitStore = new Map<string, {
  attempts: number
  firstAttempt: number
  blockedUntil?: number
}>()

const MAX_ATTEMPTS = 5
const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const BLOCK_DURATION_MS = 60 * 60 * 1000 // 1 hour

export async function checkRateLimit(identifier: string): Promise<{
  allowed: boolean
  attemptsRemaining: number
  resetTime?: number
  blockedUntil?: number
}> {
  const now = Date.now()
  const entry = rateLimitStore.get(identifier)
  
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
  const now = Date.now()
  let entry = rateLimitStore.get(identifier)
  
  if (!entry || now - entry.firstAttempt >= WINDOW_MS) {
    // Start new window
    entry = {
      attempts: 1,
      firstAttempt: now,
    }
  } else {
    // Increment attempts in current window
    entry.attempts++
  }
  
  rateLimitStore.set(identifier, entry)
}

export async function resetRateLimit(identifier: string) {
  rateLimitStore.delete(identifier)
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