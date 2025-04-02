import styled from 'styled-components';

const Container = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.heading.h1};
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
  box-shadow: ${props => props.theme.elevation.shadow200};

  h3 {
    font-size: ${props => props.theme.typography.heading.h3};
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  p {
    font-size: ${props => props.theme.typography.body2.regular};
    color: ${props => props.theme.colors.secondary};
  }
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