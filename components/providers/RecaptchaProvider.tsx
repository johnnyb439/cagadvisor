'use client'

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

interface RecaptchaProviderProps {
  children: React.ReactNode
}

export function RecaptchaProvider({ children }: RecaptchaProviderProps) {
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_CAPTCHA === 'true'
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''

  // If CAPTCHA is disabled or no site key, just render children
  if (!isEnabled || !siteKey) {
    return <>{children}</>
  }

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: 'head',
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  )
}