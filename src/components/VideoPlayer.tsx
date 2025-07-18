import { useRef, useState, useEffect } from 'react'
import { Play, Pause, AlertCircle, Volume2, VolumeX } from 'lucide-react'

interface VideoPlayerProps {
  src: string
  poster?: string
  className?: string
  onEnded?: () => void
  autoPlay?: boolean
  muted?: boolean
  controls?: boolean
  ariaLabel?: string
  forceUnmute?: boolean
}

export default function VideoPlayer({
  src,
  poster,
  className = "w-full h-full object-cover",
  onEnded,
  autoPlay = false,
  muted = false,
  controls = true,
  ariaLabel = "Video player",
  forceUnmute = false
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(muted)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleError = () => {
      console.error('Video playback error')
      setHasError(true)
      setIsLoading(false)
    }
    const handleVolumeChange = () => {
      if (video) {
        setIsMuted(video.muted)
      }
    }
    const handleLoadedData = async () => {
      setIsLoading(false)
      // Autoplay if requested
      if (autoPlay && videoRef.current) {
        try {
          // Try to play unmuted first
          videoRef.current.muted = false
          await videoRef.current.play()
          setIsMuted(false)
        } catch (error) {
          console.error('Unmuted autoplay failed:', error)
          // If unmuted fails, try muted
          if (videoRef.current) {
            videoRef.current.muted = true
            setIsMuted(true)
            try {
              await videoRef.current.play()
              // Immediately try to unmute after starting
              if (forceUnmute) {
                setTimeout(() => {
                  if (videoRef.current) {
                    videoRef.current.muted = false
                    setIsMuted(false)
                  }
                }, 100)
              }
            } catch (e) {
              console.error('Muted autoplay also failed:', e)
            }
          }
        }
      }
    }

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError)
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('volumechange', handleVolumeChange)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('volumechange', handleVolumeChange)
    }
  }, [autoPlay])

  // Update mute state when prop changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = muted
      setIsMuted(muted)
    }
  }, [muted])

  // Handle forceUnmute
  useEffect(() => {
    if (forceUnmute && videoRef.current && videoRef.current.muted) {
      videoRef.current.muted = false
      setIsMuted(false)
    }
  }, [forceUnmute])

  const handlePlayClick = async () => {
    if (!videoRef.current) return
    
    try {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        await videoRef.current.play()
      }
    } catch (error) {
      console.error('Playback failed:', error)
      setHasError(true)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!videoRef.current.muted)
    }
  }

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-gray-900 text-white p-8">
        <AlertCircle className="h-12 w-12 mb-4 text-red-500" />
        <p className="text-lg mb-4">Unable to load video</p>
        <a 
          href={src} 
          download 
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
        >
          Download Video
        </a>
      </div>
    )
  }

  return (
    <div className="relative h-full">
      <video
        ref={videoRef}
        className={className}
        src={src}
        poster={poster}
        onEnded={onEnded}
        controls={controls}
        autoPlay={autoPlay}
        muted={forceUnmute ? false : muted}
        playsInline
        preload="metadata"
        crossOrigin="anonymous"
        aria-label={ariaLabel}
      >
        <source src={src} type="video/mp4" />
        <source src={src.replace('.mp4', '.webm')} type="video/webm" />
        <p className="text-white p-4">
          Your browser does not support the video tag. 
          <a href={src} download className="underline ml-1">
            Download the video
          </a> to watch offline.
        </p>
      </video>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
      
      {!controls && !hasError && !isLoading && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
          aria-label={isPlaying ? "Pause video" : "Play video"}
        >
          {!isPlaying && (
            <div className="bg-white rounded-full p-4">
              <Play className="h-8 w-8 text-blue-600" />
            </div>
          )}
        </button>
      )}
      
      {/* Unmute button overlay - only show if not forceUnmute */}
      {isPlaying && isMuted && !hasError && !isLoading && !forceUnmute && (
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 bg-black/70 hover:bg-black/80 text-white p-3 rounded-lg transition-colors flex items-center gap-2"
          aria-label="Unmute video"
        >
          <VolumeX className="h-5 w-5" />
          <span className="text-sm font-medium">Click to unmute</span>
        </button>
      )}
    </div>
  )
}