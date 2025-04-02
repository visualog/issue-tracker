import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useIssueStore } from '../store/issueStore';
import { Issue } from '../types/issue';
import { Badge } from './common/Badge';
import { Card } from './common/Card';
import { IssueFilter } from './IssueFilter';

const Container = styled.div`
  padding: ${props => props.theme.spacing.md};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Title = styled.h1`
  font-size: ${props => props.theme.typography.heading.h1};
  color: ${props => props.theme.colors.dark};
`;

const CreateButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.medium};
  font-family: ${props => props.theme.typography.fontFamily};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
    box-shadow: ${props => props.theme.elevation.shadow200};
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const IssueCard = styled(Card)`
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.elevation.shadow300};
  }
`;

const IssueTitle = styled.h2`
  font-size: ${props => props.theme.typography.heading.h2};
  color: ${props => props.theme.colors.dark};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const IssueMeta = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const IssueDescription = styled.p`
  font-size: ${props => props.theme.typography.body2.regular};
  color: ${props => props.theme.colors.secondary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const IssueFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.theme.spacing.sm};
`;

const IssueDate = styled.span`
  font-size: ${props => props.theme.typography.caption.regular};
  color: ${props => props.theme.colors.secondary};
`;

const BadgeContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.xs};
`;

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'HIGH':
      return '#FF4D4F';
    case 'MEDIUM':
      return '#FAAD14';
    case 'LOW':
      return '#52C41A';
    default:
      return '#8C8C8C';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'CRITICAL':
      return '#FF4D4F';
    case 'MAJOR':
      return '#FAAD14';
    case 'MINOR':
      return '#52C41A';
    default:
      return '#8C8C8C';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'OPEN':
      return '#1890FF';
    case 'IN_PROGRESS':
      return '#FAAD14';
    case 'RESOLVED':
      return '#52C41A';
    case 'CLOSED':
      return '#8C8C8C';
    default:
      return '#8C8C8C';
  }
};

export const IssueList = () => {
  const navigate = useNavigate();
  const { filteredIssues } = useIssueStore();

  return (
    <Container>
      <Header>
        <Title>이슈 목록</Title>
        <CreateButton onClick={() => navigate('/create')}>새 이슈</CreateButton>
      </Header>

      <IssueFilter />

      <Grid>
        {filteredIssues.map((issue: Issue) => (
          <Card key={issue.id} onClick={() => navigate(`/issue/${issue.id}`)}>
            <h3>{issue.title}</h3>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <Badge backgroundColor={getPriorityColor(issue.priority)} color="#FFFFFF">
                {issue.priority}
              </Badge>
              <Badge backgroundColor={getSeverityColor(issue.severity)} color="#FFFFFF">
                {issue.severity}
              </Badge>
              <Badge backgroundColor={getStatusColor(issue.status)} color="#FFFFFF">
                {issue.status}
              </Badge>
            </div>
            <p style={{ marginBottom: '8px' }}>{issue.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>담당자: {issue.assignee || '미지정'}</span>
              <span>{new Date(issue.createdAt).toLocaleDateString()}</span>
            </div>
          </Card>
        ))}
      </Grid>
    </Container>
  );
}; 