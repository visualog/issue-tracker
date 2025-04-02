import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavBrand = styled(Link)`
  font-size: ${props => props.theme.typography.heading.h2};
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const NavLink = styled(Link)`
  font-size: ${props => props.theme.typography.body1.regular};
  color: ${props => props.theme.colors.dark};
  text-decoration: none;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.sm};
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
    background-color: ${props => props.theme.colors.light};
  }
`;

export const Navbar = () => {
  return (
    <Nav>
      <NavBrand to="/">Issue Tracker</NavBrand>
      <NavLinks>
        <NavLink to="/create">New Issue</NavLink>
      </NavLinks>
    </Nav>
  );
}; 