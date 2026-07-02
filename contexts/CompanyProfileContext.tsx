'use client'

import { createContext, useContext, useState, useCallback } from 'react'

interface CompanyProfileContextValue {
  selectedCompany: string | null
  openCompany: (name: string) => void
  closeCompany: () => void
}

const CompanyProfileContext = createContext<CompanyProfileContextValue>({
  selectedCompany: null,
  openCompany: () => {},
  closeCompany: () => {},
})

export function CompanyProfileProvider({ children }: { children: React.ReactNode }) {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

  const openCompany = useCallback((name: string) => setSelectedCompany(name), [])
  const closeCompany = useCallback(() => setSelectedCompany(null), [])

  return (
    <CompanyProfileContext.Provider value={{ selectedCompany, openCompany, closeCompany }}>
      {children}
    </CompanyProfileContext.Provider>
  )
}

export function useCompanyProfile() {
  return useContext(CompanyProfileContext)
}
