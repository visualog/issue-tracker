'use client'

import styled from 'styled-components'
import Link from 'next/link'

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
  color: white;
`

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavTitle = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.large};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`

const NavLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  
  &:hover {
    text-decoration: underline;
  }
`

export function Navbar() {
  return (
    <Nav>
      <NavContainer>
        <NavTitle>이슈 트래커</NavTitle>
        <NavLinks>
          <NavLink href="/issues">이슈 목록</NavLink>
          <NavLink href="/issues/new">이슈 생성</NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  )
} 