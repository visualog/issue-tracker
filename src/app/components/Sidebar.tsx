'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
  width: 240px;
  background-color: ${props => props.theme.colors.white};
  border-right: 1px solid ${props => props.theme.colors.light};
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

interface MenuLinkProps {
  isActive: boolean;
}

const MenuLink = styled.a<MenuLinkProps>`
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
  const pathname = usePathname();

  const isActive = (path: string): boolean => {
    return pathname === path;
  };

  return (
    <SidebarContainer>
      <MenuGroup>
        <MenuTitle>내 팀 요청</MenuTitle>
        <MenuList>
          <MenuItem>
            <Link href="/" passHref legacyBehavior>
              <MenuLink isActive={isActive('/')}>
                <span className="icon">📋</span>
                요청 목록
              </MenuLink>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/board" passHref legacyBehavior>
              <MenuLink isActive={isActive('/board')}>
                <span className="icon">📊</span>
                칸반 보드
              </MenuLink>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/calendar" passHref legacyBehavior>
              <MenuLink isActive={isActive('/calendar')}>
                <span className="icon">📅</span>
                캘린더
              </MenuLink>
            </Link>
          </MenuItem>
        </MenuList>
      </MenuGroup>

      <MenuGroup>
        <MenuTitle>관리</MenuTitle>
        <MenuList>
          <MenuItem>
            <Link href="/my-issues" passHref legacyBehavior>
              <MenuLink isActive={isActive('/my-issues')}>
                <span className="icon">👤</span>
                내 담당 요청
              </MenuLink>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/reports" passHref legacyBehavior>
              <MenuLink isActive={isActive('/reports')}>
                <span className="icon">📈</span>
                통계/리포트
              </MenuLink>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href="/settings" passHref legacyBehavior>
              <MenuLink isActive={isActive('/settings')}>
                <span className="icon">⚙️</span>
                설정
              </MenuLink>
            </Link>
          </MenuItem>
        </MenuList>
      </MenuGroup>
    </SidebarContainer>
  );
}; 