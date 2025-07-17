import { useRef, useState, useEffect } from 'react'
import { Play, Pause, AlertCircle } from 'lucide-react'

interface VideoPlayerProps {
  src: string
  poster?: string
  className?: string
  onEnded?: () => void
  autoPlay?: boolean
  muted?: boolean
  controls?: boolean
  ariaLabel?: string
}

export default function VideoPlayer({
  src,
  poster,
  className = "w-full h-full object-cover",
  onEnded,
  autoPlay = false,
  muted = false,
  controls = true,
  ariaLabel = "Video player"
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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
    const handleLoadedData = () => setIsLoading(false)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError)
    video.addEventListener('loadeddata', handleLoadedData)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('error', handleError)
      video.removeEventListener('loadeddata', handleLoadedData)
    }
  }, [])

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
        muted={muted}
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
    </div>
  )
}