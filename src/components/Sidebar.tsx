import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
  padding: ${props => props.theme.spacing.md} 0;
`;

const MenuGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  &:last-child {
    margin-bottom: 0;
  }
`;

const MenuTitle = styled.h2`
  font-size: ${props => props.theme.typography.subtitle.subtitle2};
  color: ${props => props.theme.colors.secondary};
  margin-bottom: ${props => props.theme.spacing.sm};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const MenuLink = styled(Link)<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.isActive ? props.theme.colors.primary : props.theme.colors.dark};
  text-decoration: none;
  font-size: ${props => props.theme.typography.body2.regular};
  background-color: ${props => props.isActive ? `${props.theme.colors.primary}11` : 'transparent'};
  border-left: 3px solid ${props => props.isActive ? props.theme.colors.primary : 'transparent'};
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.primary};
  }

  .icon {
    margin-right: ${props => props.theme.spacing.sm};
    font-size: 16px;
  }
`;

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <SidebarContainer>
      <MenuGroup>
        <MenuTitle>내 팀 요청</MenuTitle>
        <MenuList>
          <MenuItem>
            <MenuLink to="/" isActive={isActive('/')}>
              <span className="icon">📋</span>
              요청 목록
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/board" isActive={isActive('/board')}>
              <span className="icon">📊</span>
              칸반 보드
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/calendar" isActive={isActive('/calendar')}>
              <span className="icon">📅</span>
              캘린더
            </MenuLink>
          </MenuItem>
        </MenuList>
      </MenuGroup>

      <MenuGroup>
        <MenuTitle>관리</MenuTitle>
        <MenuList>
          <MenuItem>
            <MenuLink to="/my-issues" isActive={isActive('/my-issues')}>
              <span className="icon">👤</span>
              내 담당 요청
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/reports" isActive={isActive('/reports')}>
              <span className="icon">📈</span>
              통계/리포트
            </MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/settings" isActive={isActive('/settings')}>
              <span className="icon">⚙️</span>
              설정
            </MenuLink>
          </MenuItem>
        </MenuList>
      </MenuGroup>
    </SidebarContainer>
  );
}; 