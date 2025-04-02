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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const IssueCard = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.elevation.shadow200};
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.elevation.shadow300};
  }

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
  // 샘플 데이터
  const sampleIssues = [
    { id: 1, title: 'First Issue', description: 'This is a sample issue description.' },
    { id: 2, title: 'Second Issue', description: 'Another sample issue for testing.' },
    { id: 3, title: 'Third Issue', description: 'Yet another sample issue.' },
    { id: 4, title: 'Fourth Issue', description: 'One more sample issue.' },
  ];

  return (
    <Container>
      <Title>Issues</Title>
      <IssueGrid>
        {sampleIssues.map(issue => (
          <IssueCard key={issue.id}>
            <h3>{issue.title}</h3>
            <p>{issue.description}</p>
          </IssueCard>
        ))}
      </IssueGrid>
    </Container>
  );
}; 