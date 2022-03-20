import React from 'react'
import PageContent from '../PageContent'
import PageHeader from '../PageHeader'
import PageLayout from '../PageLayout'

export default function PageLayoutWithContent({ children }) {
  return (
    <PageLayout>
        <PageHeader />
        <PageContent>{children}</PageContent>
    </PageLayout>
  )
}
