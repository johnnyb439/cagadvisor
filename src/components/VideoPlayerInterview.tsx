'use client'

import { useEffect, useRef } from 'react'
import { Loader2 } from 'lucide-react'

interface VideoPlayerProps {
  src: string
  onEnded?: () => void
  className?: string
}

export default function VideoPlayerInterview({ src, onEnded, className = '' }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ensure video plays when src changes
    video.load()
    const playPromise = video.play()
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Auto-play was prevented:', error)
      })
    }
  }, [src])

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        onEnded={onEnded}
        controls={false}
      >
        Your browser does not support the video tag.
      </video>
      
      {/* Loading overlay */}
      {!src && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}
    </div>
  )
}