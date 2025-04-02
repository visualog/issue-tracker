import React, { useState } from 'react';
import styled from 'styled-components';
import { useIssueStore } from '../store/issueStore';
import { Comment } from '../types/issue';

const Container = styled.div`
  margin-top: ${props => props.theme.spacing.xl};
`;

const Title = styled.h2`
  font-size: ${props => props.theme.typography.heading.h2};
  color: ${props => props.theme.colors.dark};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const CommentItem = styled.div`
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.md};
  box-shadow: ${props => props.theme.elevation.shadow100};
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const CommentAuthor = styled.span`
  font-size: ${props => props.theme.typography.body1.medium};
  color: ${props => props.theme.colors.dark};
`;

const CommentDate = styled.span`
  font-size: ${props => props.theme.typography.caption.regular};
  color: ${props => props.theme.colors.secondary};
`;

const CommentContent = styled.p`
  font-size: ${props => props.theme.typography.body1.regular};
  color: ${props => props.theme.colors.dark};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const CommentActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const ActionButton = styled.button<{ variant?: 'danger' }>`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  background-color: ${props => props.variant === 'danger' ? props.theme.colors.error : props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body2.medium};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const CommentForm = styled.form`
  margin-top: ${props => props.theme.spacing.md};
`;

const CommentInput = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: ${props => props.theme.spacing.sm};
  border: 1px solid ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.regular};
  font-family: ${props => props.theme.typography.fontFamily};
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: ${props => props.theme.elevation.shadow100};
  }
`;

const SubmitButton = styled.button`
  margin-top: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body1.medium};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

interface CommentSectionProps {
  issueId: string;
  comments: Comment[];
}

export const CommentSection = ({ issueId, comments }: CommentSectionProps) => {
  const { addComment, updateComment, deleteComment } = useIssueStore();
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<{ id: string; content: string } | null>(null);
  const [editContent, setEditContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addComment(issueId, newComment.trim(), '현재 사용자'); // TODO: 실제 사용자 정보로 대체
    setNewComment('');
  };

  const handleEdit = (comment: Comment) => {
    setEditingComment({ id: comment.id, content: comment.content });
    setEditContent(comment.content);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingComment || !editContent.trim()) return;

    updateComment(issueId, editingComment.id, editContent.trim());
    setEditingComment(null);
    setEditContent('');
  };

  const handleDelete = (commentId: string) => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteComment(issueId, commentId);
    }
  };

  return (
    <Container>
      <Title>댓글</Title>
      <CommentList>
        {comments.map((comment) => (
          <CommentItem key={comment.id}>
            <CommentHeader>
              <CommentAuthor>{comment.author}</CommentAuthor>
              <CommentDate>
                {new Date(comment.createdAt).toLocaleString()}
              </CommentDate>
            </CommentHeader>
            {editingComment?.id === comment.id ? (
              <form onSubmit={handleUpdate}>
                <CommentInput
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <CommentActions>
                  <ActionButton type="submit">저장</ActionButton>
                  <ActionButton
                    type="button"
                    onClick={() => {
                      setEditingComment(null);
                      setEditContent('');
                    }}
                  >
                    취소
                  </ActionButton>
                </CommentActions>
              </form>
            ) : (
              <>
                <CommentContent>{comment.content}</CommentContent>
                <CommentActions>
                  <ActionButton onClick={() => handleEdit(comment)}>
                    수정
                  </ActionButton>
                  <ActionButton
                    variant="danger"
                    onClick={() => handleDelete(comment.id)}
                  >
                    삭제
                  </ActionButton>
                </CommentActions>
              </>
            )}
          </CommentItem>
        ))}
      </CommentList>

      <CommentForm onSubmit={handleSubmit}>
        <CommentInput
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력하세요..."
        />
        <SubmitButton type="submit">댓글 작성</SubmitButton>
      </CommentForm>
    </Container>
  );
}; 