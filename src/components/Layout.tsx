import styled from 'styled-components';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

const MAX_WIDTH = '1440px';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px 1fr; // 헤더 높이 고정
`;

const Header = styled.header`
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.elevation.shadow100};
  
  .header-content {
    max-width: ${MAX_WIDTH};
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.lg};
    height: 100%;
  }
`;

const Main = styled.main`
  grid-area: main;
  padding: ${props => props.theme.spacing.lg};
  background-color: ${props => props.theme.colors.background};
  
  .main-content {
    max-width: calc(${MAX_WIDTH} - 240px); // 사이드바 너비 제외
    margin: 0 auto;
  }
`;

const SidebarWrapper = styled.aside`
  grid-area: sidebar;
  background-color: ${props => props.theme.colors.white};
  border-right: 1px solid ${props => props.theme.colors.light};
  height: calc(100vh - 64px);
  position: sticky;
  top: 64px;
  overflow-y: auto;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutContainer>
      <Header>
        <div className="header-content">
          <Navbar />
        </div>
      </Header>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      <Main>
        <div className="main-content">
          {children}
        </div>
      </Main>
    </LayoutContainer>
  );
}; 