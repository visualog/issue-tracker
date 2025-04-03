'use client'

import styled from 'styled-components'

const Container = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xlarge};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.primary};
`

const Description = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.medium};
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`

export default function Home() {
  return (
    <Container>
      <Title>이슈 트래커</Title>
      <Description>
        환영합니다! 이슈 트래커 애플리케이션입니다.
      </Description>
    </Container>
  )
} 