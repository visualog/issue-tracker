import { create } from 'zustand';
import { Issue, IssueFormData } from '../types/issue';

interface IssueStore {
  issues: Issue[];
  selectedIssue: Issue | null;
  filters: {
    status: string[];
    priority: string[];
    severity: string[];
    type: string[];
  };
  searchQuery: string;
  sortField: 'createdAt' | 'updatedAt' | 'priority' | 'severity' | 'status';
  sortOrder: 'asc' | 'desc';
  setSelectedIssue: (issue: Issue | null) => void;
  createIssue: (issue: IssueFormData) => void;
  updateIssue: (id: string, issue: Partial<Issue>) => void;
  deleteIssue: (id: string) => void;
  setFilters: (filters: Partial<IssueStore['filters']>) => void;
  setSearchQuery: (query: string) => void;
  setSortField: (field: IssueStore['sortField']) => void;
  setSortOrder: (order: IssueStore['sortOrder']) => void;
  addComment: (issueId: string, content: string, author: string) => void;
  updateComment: (issueId: string, commentId: string, content: string) => void;
  deleteComment: (issueId: string, commentId: string) => void;
  filteredIssues: Issue[];
}

const sampleIssues: Issue[] = [
  {
    id: '1',
    title: '로그인 페이지 반응형 디자인 개선',
    description: '모바일 환경에서 로그인 폼이 깨지는 현상이 발생하고 있습니다. 특히 아이폰 SE와 같은 작은 화면에서 문제가 심각합니다.',
    type: 'UI',
    priority: 'HIGH',
    severity: 'MAJOR',
    status: 'IN_PROGRESS',
    reporter: '김디자인',
    assignee: '이프론트',
    createdAt: '2024-03-15T09:00:00Z',
    updatedAt: '2024-03-16T14:30:00Z',
    comments: [
      {
        id: '1',
        content: '모바일 화면에서 input 필드가 화면을 벗어나는 문제 확인했습니다.',
        author: '이프론트',
        createdAt: '2024-03-15T10:00:00Z',
        updatedAt: '2024-03-15T10:00:00Z'
      }
    ],
    labels: ['UI/UX', '모바일']
  },
  {
    id: '2',
    title: '결제 시스템 보안 취약점 발견',
    description: '외부 보안 감사 결과, 결제 처리 과정에서 SQL 인젝션 취약점이 발견되었습니다. 즉시 수정이 필요합니다.',
    type: 'SECURITY',
    priority: 'HIGH',
    severity: 'CRITICAL',
    status: 'OPEN',
    reporter: '보안팀',
    assignee: '박백엔드',
    createdAt: '2024-03-16T11:00:00Z',
    updatedAt: '2024-03-16T11:00:00Z',
    comments: [],
    labels: ['보안', '긴급']
  },
  {
    id: '3',
    title: '성능 최적화: 메인 페이지 로딩 시간 개선',
    description: '메인 페이지의 초기 로딩 시간이 3초 이상 소요되고 있습니다. 이미지 최적화와 코드 스플리팅을 통해 개선이 필요합니다.',
    type: 'PERFORMANCE',
    priority: 'MEDIUM',
    severity: 'MAJOR',
    status: 'OPEN',
    reporter: '김성능',
    assignee: '이프론트',
    createdAt: '2024-03-14T15:00:00Z',
    updatedAt: '2024-03-16T09:00:00Z',
    comments: [
      {
        id: '2',
        content: '이미지 최적화를 위해 next/image 도입을 제안드립니다.',
        author: '이프론트',
        createdAt: '2024-03-15T16:00:00Z',
        updatedAt: '2024-03-15T16:00:00Z'
      }
    ],
    labels: ['성능', '최적화']
  }
];

export const useIssueStore = create<IssueStore>()((set, get) => ({
  issues: sampleIssues,
  selectedIssue: null,
  filters: {
    status: [],
    priority: [],
    severity: [],
    type: []
  },
  searchQuery: '',
  sortField: 'createdAt',
  sortOrder: 'desc',
  setSelectedIssue: (issue) => set({ selectedIssue: issue }),
  createIssue: (issueData) => {
    const newIssue: Issue = {
      ...issueData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: []
    };
    set((state) => ({ issues: [...state.issues, newIssue] }));
  },
  updateIssue: (id, updatedIssue) => {
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === id
          ? { ...issue, ...updatedIssue, updatedAt: new Date().toISOString() }
          : issue
      ),
      selectedIssue: state.selectedIssue?.id === id
        ? { ...state.selectedIssue, ...updatedIssue, updatedAt: new Date().toISOString() }
        : state.selectedIssue
    }));
  },
  deleteIssue: (id) => {
    set((state) => ({
      issues: state.issues.filter((issue) => issue.id !== id),
      selectedIssue: state.selectedIssue?.id === id ? null : state.selectedIssue
    }));
  },
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortField: (field) => set({ sortField: field }),
  setSortOrder: (order) => set({ sortOrder: order }),
  addComment: (issueId, content, author) => {
    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      content,
      author,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === issueId
          ? { ...issue, comments: [...issue.comments, newComment] }
          : issue
      )
    }));
  },
  updateComment: (issueId, commentId, content) => {
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === issueId
          ? {
              ...issue,
              comments: issue.comments.map((comment) =>
                comment.id === commentId
                  ? { ...comment, content, updatedAt: new Date().toISOString() }
                  : comment
              )
            }
          : issue
      )
    }));
  },
  deleteComment: (issueId, commentId) => {
    set((state) => ({
      issues: state.issues.map((issue) =>
        issue.id === issueId
          ? { ...issue, comments: issue.comments.filter((comment) => comment.id !== commentId) }
          : issue
      )
    }));
  },
  get filteredIssues() {
    const { issues, filters, searchQuery, sortField, sortOrder } = get();
    
    let filtered = [...issues];

    // 필터 적용
    if (filters.status.length > 0) {
      filtered = filtered.filter(issue => filters.status.includes(issue.status));
    }
    if (filters.priority.length > 0) {
      filtered = filtered.filter(issue => filters.priority.includes(issue.priority));
    }
    if (filters.severity.length > 0) {
      filtered = filtered.filter(issue => filters.severity.includes(issue.severity));
    }
    if (filters.type.length > 0) {
      filtered = filtered.filter(issue => filters.type.includes(issue.type));
    }

    // 검색어 적용
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(issue => 
        issue.title.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query) ||
        issue.reporter.toLowerCase().includes(query) ||
        issue.assignee?.toLowerCase().includes(query) ||
        issue.comments.some(comment => 
          comment.content.toLowerCase().includes(query) ||
          comment.author.toLowerCase().includes(query)
        )
      );
    }

    // 정렬 적용
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'updatedAt':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        case 'priority':
          comparison = ['LOW', 'MEDIUM', 'HIGH'].indexOf(a.priority) - ['LOW', 'MEDIUM', 'HIGH'].indexOf(b.priority);
          break;
        case 'severity':
          comparison = ['TRIVIAL', 'MINOR', 'MAJOR', 'CRITICAL'].indexOf(a.severity) - ['TRIVIAL', 'MINOR', 'MAJOR', 'CRITICAL'].indexOf(b.severity);
          break;
        case 'status':
          comparison = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].indexOf(a.status) - ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'].indexOf(b.status);
          break;
        default:
          comparison = 0;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }
})); 