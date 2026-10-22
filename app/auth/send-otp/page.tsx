import type { Metadata } from 'next'
import SendOtpUi from './sendOtpUi'

export const metadata: Metadata = {
  title: 'Send OTP',
}

export default function SendOtpPage() {
  return <SendOtpUi />
}