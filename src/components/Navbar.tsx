import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.white};
  padding: ${props => props.theme.spacing.md};
  box-shadow: ${props => props.theme.elevation.shadow100};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
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
  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

export const Navbar = () => {
  return (
    <Nav>
      <NavContainer>
        <NavBrand to="/">Issue Tracker</NavBrand>
        <NavLinks>
          <NavLink to="/">Issues</NavLink>
          <NavLink to="/create">New Issue</NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
}; 