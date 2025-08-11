import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Company Data Structure
interface Company {
  id: string
  companyName: string
  contactName: string
  email: string
  phone: string
  password: string
  companySize: string
  hiringNeeds: string
  disclaimerAgreed: boolean
  disclaimerAgreedAt: string
  createdAt: string
  isCompany: boolean
}

const companiesFilePath = path.join(process.cwd(), 'data', 'companies.json')

// Ensure the data directory and companies.json file exist
function initializeCompaniesDB() {
  const dir = path.dirname(companiesFilePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(companiesFilePath)) {
    fs.writeFileSync(companiesFilePath, JSON.stringify([]))
  }
}

// Get all companies
function getCompanies(): Company[] {
  initializeCompaniesDB()
  try {
    const data = fs.readFileSync(companiesFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

// Save companies
function saveCompanies(companies: Company[]) {
  fs.writeFileSync(companiesFilePath, JSON.stringify(companies, null, 2))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      companyName, 
      contactName, 
      email, 
      phone, 
      password, 
      companySize, 
      hiringNeeds,
      disclaimerAgreed 
    } = body

    // Validate required fields
    if (!companyName || !contactName || !email || !phone || !password) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      )
    }

    // Validate disclaimer agreement
    if (!disclaimerAgreed) {
      return NextResponse.json(
        { error: 'You must acknowledge the self-report disclaimer to create a company account' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      )
    }

    // Validate phone format (basic validation)
    const phoneRegex = /^[\d\s\-\+\(\)]+$/
    if (!phoneRegex.test(phone) || phone.length < 10) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number' },
        { status: 400 }
      )
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      )
    }

    // Validate company name length
    if (companyName.length < 2) {
      return NextResponse.json(
        { error: 'Company name must be at least 2 characters long' },
        { status: 400 }
      )
    }

    // Validate contact name length
    if (contactName.length < 2) {
      return NextResponse.json(
        { error: 'Contact name must be at least 2 characters long' },
        { status: 400 }
      )
    }

    const companies = getCompanies()
    
    // Check if email already exists
    if (companies.find((c: Company) => c.email.toLowerCase() === email.toLowerCase())) {
      return NextResponse.json(
        { error: 'A company with this email already exists' },
        { status: 409 }
      )
    }

    // Check if company name already exists
    if (companies.find((c: Company) => c.companyName.toLowerCase() === companyName.toLowerCase())) {
      return NextResponse.json(
        { error: 'A company with this name already exists' },
        { status: 409 }
      )
    }

    // Create new company
    const newCompany: Company = {
      id: `company_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      companyName: companyName,
      contactName: contactName,
      email: email.toLowerCase(),
      phone: phone,
      password: password, // In production, this should be hashed
      companySize: companySize || 'Not specified',
      hiringNeeds: hiringNeeds || 'Not specified',
      disclaimerAgreed: disclaimerAgreed,
      disclaimerAgreedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      isCompany: true
    }

    // Add company and save
    companies.push(newCompany)
    saveCompanies(companies)

    // Return success response (without password)
    const { password: _, ...companyWithoutPassword } = newCompany
    
    return NextResponse.json({
      success: true,
      message: 'Company account created successfully',
      company: companyWithoutPassword
    })

  } catch (error: any) {
    console.error('Company registration error:', error)
    
    // Generic server error
    return NextResponse.json(
      { error: 'Company registration failed. Please try again.' },
      { status: 500 }
    )
  }
}