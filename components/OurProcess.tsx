'use client'

import { motion } from 'framer-motion'
import { FileSearch, Dumbbell, Rocket, Trophy } from 'lucide-react'

const steps = [
  {
    icon: FileSearch,
    number: "01",
    title: "Assessment",
    description: "We evaluate your clearance level, IT skills, and career goals to create a personalized roadmap."
  },
  {
    icon: Dumbbell,
    number: "02",
    title: "Preparation",
    description: "Resume translation, interview coaching, and technical skill development tailored to cleared positions."
  },
  {
    icon: Rocket,
    number: "03",
    title: "Connection",
    description: "We leverage our network to connect you with prime contractors and government opportunities."
  },
  {
    icon: Trophy,
    number: "04",
    title: "Success",
    description: "Ongoing support through offer negotiation, onboarding, and career advancement planning."
  }
]

export default function OurProcess() {
  return (
    <section className="py-20 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold mb-4 dark:text-white">
            Our Proven <span className="gradient-text">Process</span>
          </h2>
          <p className="text-xl text-intel-gray dark:text-gray-300 max-w-3xl mx-auto">
            From initial assessment to career success, we're with you every step of the way
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500/30 via-cyan-400/40 to-cyan-500/30 transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-command-black dark:border dark:border-gray-700 rounded-xl p-6"
              >
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-cyan-500/10 border border-cyan-500/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-cyan-500/20">
                    <step.icon className="w-12 h-12 text-white" />
                  </div>
                  <span className="text-5xl font-montserrat font-bold text-gray-100">{step.number}</span>
                  <h3 className="text-2xl font-montserrat font-semibold mt-2 mb-4 dark:text-white">{step.title}</h3>
                  <p className="text-intel-gray dark:text-gray-300">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}