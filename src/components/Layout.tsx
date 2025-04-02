import styled from 'styled-components';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr;
`;

const Header = styled.header`
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const Main = styled.main`
  grid-area: main;
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.background};
`;

const SidebarWrapper = styled.aside`
  grid-area: sidebar;
  background-color: ${props => props.theme.colors.white};
  border-right: 1px solid ${props => props.theme.colors.light};
  height: calc(100vh - 64px); // 헤더 높이만큼 빼줌
  position: sticky;
  top: 64px; // 헤더 높이만큼 설정
  overflow-y: auto;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header>
        <Navbar />
      </Header>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <Main>{children}</Main>
    </LayoutContainer>
  );
}; 