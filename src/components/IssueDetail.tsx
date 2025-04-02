import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useIssueStore } from '../store/issueStore';
import { Issue, IssueFormData } from '../types/issue';
import { Badge } from './common/Badge';
import { Card } from './common/Card';
import { CommentSection } from './CommentSection';

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

const BackButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.dark};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.medium};
  font-family: ${props => props.theme.typography.fontFamily};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.secondary}dd;
    box-shadow: ${props => props.theme.elevation.shadow200};
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${props => props.theme.spacing.md};
`;

const MainContent = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
`;

const Sidebar = styled(Card)`
  padding: ${props => props.theme.spacing.md};
`;

const Section = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: ${props => props.theme.typography.heading.h2};
  color: ${props => props.theme.colors.dark};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const MetaInfo = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Description = styled.p`
  font-size: ${props => props.theme.typography.body1.regular};
  color: ${props => props.theme.colors.dark};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const InfoItem = styled.div`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const InfoLabel = styled.span`
  font-size: ${props => props.theme.typography.body2.medium};
  color: ${props => props.theme.colors.secondary};
  margin-right: ${props => props.theme.spacing.sm};
`;

const InfoValue = styled.span`
  font-size: ${props => props.theme.typography.body2.regular};
  color: ${props => props.theme.colors.dark};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const EditButton = styled.button`
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  font-size: ${props => props.theme.typography.body2.medium};
  color: ${props => props.theme.colors.dark};
`;

const Input = styled.input`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.regular};
  font-family: ${props => props.theme.typography.fontFamily};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.elevation.shadow100};
  }
`;

const TextArea = styled.textarea`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.regular};
  font-family: ${props => props.theme.typography.fontFamily};
  min-height: 150px;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.elevation.shadow100};
  }
`;

const Select = styled.select`
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.regular};
  font-family: ${props => props.theme.typography.fontFamily};
  background-color: ${props => props.theme.colors.white};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.elevation.shadow100};
  }
`;

const DeleteButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.error};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.medium};
  font-family: ${props => props.theme.typography.fontFamily};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.error}dd;
    box-shadow: ${props => props.theme.elevation.shadow200};
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
  max-width: 400px;
  width: 100%;
`;

const ModalTitle = styled.h2`
  font-size: ${props => props.theme.typography.heading.h2};
  color: ${props => props.theme.colors.dark};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ModalMessage = styled.p`
  font-size: ${props => props.theme.typography.body1.regular};
  color: ${props => props.theme.colors.dark};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: ${props => props.theme.spacing.sm};
`;

const CancelButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.dark};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.medium};
  font-family: ${props => props.theme.typography.fontFamily};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.secondary}dd;
    box-shadow: ${props => props.theme.elevation.shadow200};
  }
`;

const ConfirmButton = styled.button`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.error};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.medium};
  font-family: ${props => props.theme.typography.fontFamily};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.error}dd;
    box-shadow: ${props => props.theme.elevation.shadow200};
  }
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

export const IssueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { issues, updateIssue, deleteIssue } = useIssueStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [formData, setFormData] = useState<IssueFormData>({
    title: '',
    description: '',
    type: 'TASK',
    priority: 'MEDIUM',
    severity: 'MINOR',
    status: 'OPEN',
    reporter: '',
    labels: [],
  });
  
  const issue = issues.find((i: Issue) => i.id === id);

  if (!issue) {
    return (
      <Container>
        <Title>이슈를 찾을 수 없습니다</Title>
        <BackButton onClick={() => navigate('/')}>목록으로 돌아가기</BackButton>
      </Container>
    );
  }

  const handleEdit = () => {
    setFormData({
      title: issue.title,
      description: issue.description,
      type: issue.type,
      priority: issue.priority,
      severity: issue.severity,
      status: issue.status,
      reporter: issue.reporter,
      labels: issue.labels,
    });
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateIssue(issue.id, formData);
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    deleteIssue(issue.id);
    navigate('/');
  };

  return (
    <Container>
      <Header>
        <Title>이슈 상세</Title>
        <ButtonGroup>
          {isEditing ? (
            <EditButton onClick={handleSubmit}>저장</EditButton>
          ) : (
            <EditButton onClick={handleEdit}>수정</EditButton>
          )}
          <DeleteButton onClick={() => setShowDeleteModal(true)}>삭제</DeleteButton>
          <BackButton onClick={() => navigate('/')}>목록으로 돌아가기</BackButton>
        </ButtonGroup>
      </Header>

      <Content>
        <MainContent>
          <Section>
            {isEditing ? (
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label htmlFor="title">제목</Label>
                  <Input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="description">설명</Label>
                  <TextArea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="type">타입</Label>
                  <Select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  >
                    <option value="BUG">버그</option>
                    <option value="FEATURE">기능</option>
                    <option value="IMPROVEMENT">개선</option>
                    <option value="TASK">작업</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="priority">우선순위</Label>
                  <Select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="LOW">낮음</option>
                    <option value="MEDIUM">중간</option>
                    <option value="HIGH">높음</option>
                    <option value="CRITICAL">긴급</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="severity">심각도</Label>
                  <Select
                    id="severity"
                    name="severity"
                    value={formData.severity}
                    onChange={handleChange}
                  >
                    <option value="MINOR">경미</option>
                    <option value="MAJOR">주요</option>
                    <option value="CRITICAL">심각</option>
                    <option value="BLOCKER">차단</option>
                  </Select>
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="status">상태</Label>
                  <Select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="OPEN">열림</option>
                    <option value="IN_PROGRESS">진행 중</option>
                    <option value="RESOLVED">해결됨</option>
                    <option value="CLOSED">닫힘</option>
                  </Select>
                </FormGroup>
              </Form>
            ) : (
              <>
                <SectionTitle>{issue.title}</SectionTitle>
                <MetaInfo>
                  <Badge backgroundColor={getPriorityColor(issue.priority)} color="#FFFFFF">
                    {issue.priority}
                  </Badge>
                  <Badge backgroundColor={getSeverityColor(issue.severity)} color="#FFFFFF">
                    {issue.severity}
                  </Badge>
                  <Badge backgroundColor={getStatusColor(issue.status)} color="#FFFFFF">
                    {issue.status}
                  </Badge>
                </MetaInfo>
                <Description>{issue.description}</Description>
              </>
            )}
          </Section>
        </MainContent>

        <Sidebar>
          <Section>
            <SectionTitle>상세 정보</SectionTitle>
            <InfoItem>
              <InfoLabel>ID:</InfoLabel>
              <InfoValue>{issue.id}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>상태:</InfoLabel>
              <InfoValue>{issue.status}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>타입:</InfoLabel>
              <InfoValue>{issue.type}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>우선순위:</InfoLabel>
              <InfoValue>{issue.priority}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>심각도:</InfoLabel>
              <InfoValue>{issue.severity}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>담당자:</InfoLabel>
              <InfoValue>{issue.assignee || '미지정'}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>보고자:</InfoLabel>
              <InfoValue>{issue.reporter}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>생성일:</InfoLabel>
              <InfoValue>{new Date(issue.createdAt).toLocaleDateString()}</InfoValue>
            </InfoItem>
            <InfoItem>
              <InfoLabel>수정일:</InfoLabel>
              <InfoValue>{new Date(issue.updatedAt).toLocaleDateString()}</InfoValue>
            </InfoItem>
          </Section>

          <Section>
            <SectionTitle>라벨</SectionTitle>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {issue.labels.map((label: string) => (
                <Badge key={label} backgroundColor="#F0F0F0">
                  {label}
                </Badge>
              ))}
            </div>
          </Section>
        </Sidebar>
      </Content>

      <CommentSection issueId={issue.id} comments={issue.comments} />

      {showDeleteModal && (
        <ModalOverlay onClick={() => setShowDeleteModal(false)}>
          <ModalContent onClick={(e: React.MouseEvent) => e.stopPropagation()}>
            <ModalTitle>이슈 삭제</ModalTitle>
            <ModalMessage>
              정말로 이 이슈를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
            </ModalMessage>
            <ModalButtons>
              <CancelButton onClick={() => setShowDeleteModal(false)}>
                취소
              </CancelButton>
              <ConfirmButton onClick={handleDelete}>
                삭제
              </ConfirmButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
}; 