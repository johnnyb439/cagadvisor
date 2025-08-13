'use client'

import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'

interface BrandedQRCodeProps {
  url?: string
  size?: number
  className?: string
}

export default function BrandedQRCode({ 
  url = 'https://caglive.vercel.app',
  size = 200,
  className = ''
}: BrandedQRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (canvasRef.current) {
      generateQRCode()
    }
  }, [url, size])

  const generateQRCode = async () => {
    if (!canvasRef.current) return

    try {
      // Generate QR code with custom styling
      await QRCode.toCanvas(canvasRef.current, url, {
        width: size,
        margin: 2,
        color: {
          dark: '#0B1B3F', // Brand dark blue
          light: '#FFFFFF' // White background
        },
        errorCorrectionLevel: 'H' // High error correction for logo overlay
      })

      // Add brand logo/text in center
      const ctx = canvasRef.current.getContext('2d')
      if (ctx) {
        // Create center white circle for logo background
        const centerX = size / 2
        const centerY = size / 2
        const logoSize = size * 0.2
        
        // White background circle
        ctx.beginPath()
        ctx.arc(centerX, centerY, logoSize / 2 + 4, 0, 2 * Math.PI)
        ctx.fillStyle = '#FFFFFF'
        ctx.fill()
        
        // Add border to logo area
        ctx.beginPath()
        ctx.arc(centerX, centerY, logoSize / 2 + 4, 0, 2 * Math.PI)
        ctx.strokeStyle = '#C0C5CE'
        ctx.lineWidth = 2
        ctx.stroke()
        
        // Add "CA" text as logo
        ctx.font = `bold ${logoSize * 0.7}px Arial`
        ctx.fillStyle = '#0B1B3F'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText('CA', centerX, centerY)
      }
    } catch (error) {
      console.error('Error generating QR code:', error)
    }
  }

  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <div
        className="relative cursor-pointer transition-all duration-300 ease-in-out"
        style={{
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
          filter: isHovered ? 'drop-shadow(0 10px 20px rgba(11, 27, 63, 0.15))' : 'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        role="button"
        aria-label="Scan or click to visit ClearedAdvisor"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick()
          }
        }}
      >
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="rounded-lg"
        />
      </div>
      <p className="mt-3 text-sm font-medium text-gray-600">
        Scan to Learn More
      </p>
    </div>
  )
}