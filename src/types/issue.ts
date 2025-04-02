export type IssueStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type IssuePriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
export type IssueSeverity = 'MINOR' | 'MAJOR' | 'CRITICAL' | 'BLOCKER';
export type IssueType = 'BUG' | 'FEATURE' | 'IMPROVEMENT' | 'TASK';

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  severity: IssueSeverity;
  type: IssueType;
  assignee?: string;
  reporter: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  labels: string[];
  comments: Comment[];
}

export interface IssueFormData {
  title: string;
  description: string;
  type: Issue['type'];
  priority: Issue['priority'];
  severity: Issue['severity'];
  status: Issue['status'];
  reporter: string;
  assignee?: string;
  labels: string[];
}

export interface IssueFilter {
  status?: Issue['status'];
  priority?: Issue['priority'];
  severity?: Issue['severity'];
  type?: Issue['type'];
  assignee?: string;
  reporter?: string;
  dateRange?: {
    start?: Date;
    end?: Date;
  };
} 