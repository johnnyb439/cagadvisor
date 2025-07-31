'use client'

import { useCallback } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

export function useRecaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha()
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_CAPTCHA === 'true'

  const executeRecaptchaIfEnabled = useCallback(
    async (action: string) => {
      // If CAPTCHA is disabled, return a mock token
      if (!isEnabled) {
        return 'captcha_disabled_mock_token'
      }

      // If CAPTCHA is enabled but executeRecaptcha is not available
      if (!executeRecaptcha) {
        console.warn('reCAPTCHA not yet loaded')
        return null
      }

      try {
        const token = await executeRecaptcha(action)
        return token
      } catch (error) {
        console.error('Error executing reCAPTCHA:', error)
        return null
      }
    },
    [executeRecaptcha, isEnabled]
  )

  return {
    executeRecaptcha: executeRecaptchaIfEnabled,
    isEnabled,
    isReady: !isEnabled || !!executeRecaptcha
  }
}