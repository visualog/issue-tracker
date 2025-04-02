import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarContainer = styled.nav`
  padding: ${props => props.theme.spacing.md};
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body2.medium};
  
  &:hover {
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.primary};
  }

  &.active {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const MenuGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};

  h2 {
    font-size: ${props => props.theme.typography.subtitle.subtitle2};
    color: ${props => props.theme.colors.secondary};
    margin-bottom: ${props => props.theme.spacing.sm};
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  }
`;

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <MenuList>
        <MenuGroup>
          <h2>Issues</h2>
          <MenuItem>
            <MenuLink to="/">All Issues</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/my-issues">My Issues</MenuLink>
          </MenuItem>
          <MenuItem>
            <MenuLink to="/assigned">Assigned to Me</MenuLink>
          </MenuItem>
        </MenuGroup>
        <MenuGroup>
          <h2>Labels</h2>
          <MenuItem>
            <MenuLink to="/labels">Manage Labels</MenuLink>
          </MenuItem>
        </MenuGroup>
        <MenuGroup>
          <h2>Projects</h2>
          <MenuItem>
            <MenuLink to="/projects">View Projects</MenuLink>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </SidebarContainer>
  );
}; 