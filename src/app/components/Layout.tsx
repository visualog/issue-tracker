'use client'

import styled from 'styled-components'
import Navbar from './Navbar'

interface LayoutProps {
  children: React.ReactNode
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Main = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`

export default function Layout({ children }: LayoutProps) {
  return (
    <LayoutContainer>
      <Navbar />
      <Main>{children}</Main>
    </LayoutContainer>
  )
} 