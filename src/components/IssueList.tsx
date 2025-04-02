import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const Title = styled.h1`
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.dark};
`;

const IssueGrid = styled.div`
  display: grid;
  gap: ${props => props.theme.spacing.md};
`;

const IssueCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const IssueList = () => {
  return (
    <Container>
      <Title>Issues</Title>
      <IssueGrid>
        <IssueCard>
          <h3>Sample Issue</h3>
          <p>This is a placeholder issue. Real issues will be implemented soon.</p>
        </IssueCard>
      </IssueGrid>
    </Container>
  );
}; 