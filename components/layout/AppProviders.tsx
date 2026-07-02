'use client'

import { CompanyProfileProvider } from '@/contexts/CompanyProfileContext'
import CompanyProfileModal from '@/components/CompanyProfileModal'

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CompanyProfileProvider>
      {children}
      <CompanyProfileModal />
    </CompanyProfileProvider>
  )
}
