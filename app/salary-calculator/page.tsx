'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, MapPin, Shield, Briefcase, Award } from 'lucide-react'
import SkillsAssessment from '@/components/SkillsAssessment'

export default function SalaryCalculator() {
  const [clearanceLevel, setClearanceLevel] = useState('SECRET')
  const [experience, setExperience] = useState('3-5')
  const [location, setLocation] = useState('DC')
  const [role, setRole] = useState('sysadmin')
  const [certifications, setCertifications] = useState('comptia')
  const [calculatedSalary, setCalculatedSalary] = useState<{ min: number; max: number; avg: number } | null>(null)

  const calculateSalary = () => {
    // Base salaries
    const baseSalaries = {
      'help-desk': { min: 45000, max: 65000 },
      'sysadmin': { min: 70000, max: 95000 },
      'network': { min: 75000, max: 100000 },
      'security': { min: 90000, max: 120000 },
      'cloud': { min: 100000, max: 130000 },
      'devsecops': { min: 110000, max: 145000 }
    }

    // Clearance multipliers
    const clearanceMultipliers = {
      'none': 1.0,
      'PUBLIC-TRUST': 1.05,
      'SECRET': 1.15,
      'TS': 1.25,
      'TS-SCI': 1.35,
      'TS-SCI-POLY': 1.45
    }

    // Experience multipliers
    const experienceMultipliers = {
      '0-2': 0.85,
      '3-5': 1.0,
      '6-10': 1.15,
      '10+': 1.3
    }

    // Location multipliers
    const locationMultipliers = {
      'DC': 1.25,
      'VA': 1.2,
      'MD': 1.18,
      'CO': 1.1,
      'TX': 1.05,
      'FL': 1.0,
      'OTHER': 0.95
    }

    // Certification bonus
    const certBonus = {
      'none': 0,
      'comptia': 5000,
      'associate': 10000,
      'professional': 15000,
      'expert': 25000
    }

    const base = baseSalaries[role as keyof typeof baseSalaries]
    const clearanceMult = clearanceMultipliers[clearanceLevel as keyof typeof clearanceMultipliers]
    const expMult = experienceMultipliers[experience as keyof typeof experienceMultipliers]
    const locMult = locationMultipliers[location as keyof typeof locationMultipliers]
    const certAdd = certBonus[certifications as keyof typeof certBonus]

    const min = Math.round((base.min * clearanceMult * expMult * locMult) + certAdd)
    const max = Math.round((base.max * clearanceMult * expMult * locMult) + certAdd)
    const avg = Math.round((min + max) / 2)

    setCalculatedSalary({ min, max, avg })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Cleared Professional Salary Calculator
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover your earning potential based on clearance level, experience, and location
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Calculator Form */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Calculate Your Worth</h2>
              
              <div className="space-y-6">
                {/* Clearance Level */}
                <div>
                  <label className="block text-gray-300 mb-2 flex items-center">
                    <Shield className="w-4 h-4 mr-2 text-blue-400" />
                    Security Clearance Level
                  </label>
                  <select 
                    value={clearanceLevel}
                    onChange={(e) => setClearanceLevel(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="none">No Clearance</option>
                    <option value="PUBLIC-TRUST">Public Trust</option>
                    <option value="SECRET">SECRET</option>
                    <option value="TS">Top Secret (TS)</option>
                    <option value="TS-SCI">TS/SCI</option>
                    <option value="TS-SCI-POLY">TS/SCI w/ Poly</option>
                  </select>
                </div>

                {/* Experience */}
                <div>
                  <label className="block text-gray-300 mb-2 flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-green-400" />
                    Years of Experience
                  </label>
                  <select 
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="6-10">6-10 years</option>
                    <option value="10+">10+ years</option>
                  </select>
                </div>

                {/* Role */}
                <div>
                  <label className="block text-gray-300 mb-2 flex items-center">
                    <Briefcase className="w-4 h-4 mr-2 text-purple-400" />
                    Target Role
                  </label>
                  <select 
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="help-desk">Help Desk / IT Support</option>
                    <option value="sysadmin">Systems Administrator</option>
                    <option value="network">Network Engineer</option>
                    <option value="security">Cybersecurity Analyst</option>
                    <option value="cloud">Cloud Engineer</option>
                    <option value="devsecops">DevSecOps Engineer</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-gray-300 mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-cyan-400" />
                    Location
                  </label>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="DC">Washington, DC</option>
                    <option value="VA">Northern Virginia</option>
                    <option value="MD">Maryland</option>
                    <option value="CO">Colorado</option>
                    <option value="TX">Texas</option>
                    <option value="FL">Florida</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>

                {/* Certifications */}
                <div>
                  <label className="block text-gray-300 mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-2 text-yellow-400" />
                    Highest Certification
                  </label>
                  <select 
                    value={certifications}
                    onChange={(e) => setCertifications(e.target.value)}
                    className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-lg px-4 py-3 focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="none">No Certifications</option>
                    <option value="comptia">CompTIA (A+, Net+, Sec+)</option>
                    <option value="associate">Associate Level (AWS/Azure)</option>
                    <option value="professional">Professional Level</option>
                    <option value="expert">Expert/Architect (CISSP, CCNP)</option>
                  </select>
                </div>

                <button
                  onClick={calculateSalary}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold py-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 flex items-center justify-center"
                >
                  <DollarSign className="w-5 h-5 mr-2" />
                  Calculate Salary Range
                </button>
              </div>
            </div>

            {/* Results Display */}
            <div>
              {calculatedSalary ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg p-8"
                >
                  <h2 className="text-2xl font-semibold text-white mb-6">Your Estimated Salary Range</h2>
                  
                  <div className="text-center mb-8">
                    <p className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                      ${calculatedSalary.avg.toLocaleString()}
                    </p>
                    <p className="text-gray-400">Average Annual Salary</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                      <p className="text-gray-400 text-sm mb-1">Minimum</p>
                      <p className="text-2xl font-semibold text-cyan-400">
                        ${calculatedSalary.min.toLocaleString()}
                      </p>
                    </div>
                    <div className="bg-gray-900/50 rounded-lg p-4 text-center">
                      <p className="text-gray-400 text-sm mb-1">Maximum</p>
                      <p className="text-2xl font-semibold text-blue-400">
                        ${calculatedSalary.max.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                      <span className="text-gray-300">Hourly Rate</span>
                      <span className="text-white font-semibold">
                        ${Math.round(calculatedSalary.avg / 2080)} - ${Math.round(calculatedSalary.max / 2080)}/hr
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                      <span className="text-gray-300">Monthly</span>
                      <span className="text-white font-semibold">
                        ${Math.round(calculatedSalary.avg / 12).toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                      <span className="text-gray-300">With Benefits</span>
                      <span className="text-white font-semibold">
                        +${Math.round(calculatedSalary.avg * 0.3).toLocaleString()} value
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                    <p className="text-sm text-gray-300">
                      <TrendingUp className="inline w-4 h-4 mr-1 text-green-400" />
                      Cleared professionals typically see 15-30% higher salaries than non-cleared counterparts
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8 h-full flex items-center justify-center">
                  <div className="text-center">
                    <DollarSign className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">
                      Fill out the form to see your estimated salary range
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Skills Assessment Section */}
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Take Our Skills Assessment
              </h2>
              <p className="text-gray-300">
                Get personalized career recommendations based on your skills and clearance
              </p>
            </div>
            <SkillsAssessment />
          </div>
        </motion.div>
      </div>
    </div>
  )
}