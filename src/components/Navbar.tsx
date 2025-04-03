import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const NavLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const NavBrand = styled(Link)`
  font-size: ${props => props.theme.typography.heading.h3};
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const SearchBar = styled.div`
  position: relative;
  width: 300px;
  margin-left: ${props => props.theme.spacing.md};

  input {
    width: 100%;
    padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
    padding-left: ${props => props.theme.spacing.xl};
    border: 1px solid ${props => props.theme.colors.light};
    border-radius: ${props => props.theme.borderRadius.sm};
    font-size: ${props => props.theme.typography.body2.regular};
    background-color: ${props => props.theme.colors.background};

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.primary};
      background-color: ${props => props.theme.colors.white};
    }
  }

  .search-icon {
    position: absolute;
    left: ${props => props.theme.spacing.sm};
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.secondary};
    font-size: ${props => props.theme.typography.body2.regular};
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.md};
`;

const CreateButton = styled.button`
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: ${props => props.theme.typography.body2.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  &:hover {
    background-color: ${props => props.theme.colors.primary}dd;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: ${props => props.theme.spacing.xs};
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const UserMenu = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};
  cursor: pointer;
  padding: ${props => props.theme.spacing.xs};
  border-radius: ${props => props.theme.borderRadius.sm};

  &:hover {
    background-color: ${props => props.theme.colors.light};
  }
`;

const UserAvatar = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.theme.typography.body2.medium};
`;

export const Navbar = () => {
  return (
    <Nav>
      <NavLeft>
        <NavBrand to="/">
          Issue Tracker
        </NavBrand>
        <SearchBar>
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="검색..." />
        </SearchBar>
      </NavLeft>
      <NavRight>
        <CreateButton>
          만들기
        </CreateButton>
        <IconButton>🔔</IconButton>
        <UserMenu>
          <UserAvatar>U</UserAvatar>
        </UserMenu>
      </NavRight>
    </Nav>
  );
}; 