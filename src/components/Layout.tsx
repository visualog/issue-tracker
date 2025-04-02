import styled from 'styled-components';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

const SIDEBAR_WIDTH = '240px';
const HEADER_HEIGHT = '64px';
const LAYOUT_PADDING = '24px';

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: ${SIDEBAR_WIDTH} 1fr;
  grid-template-rows: ${HEADER_HEIGHT} 1fr;
  width: 100%;
  position: relative;
`;

const Header = styled.header`
  grid-area: header;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.elevation.shadow100};
  
  .header-content {
    width: 100%;
    max-width: 100%;
    padding: 0 ${LAYOUT_PADDING};
    height: ${HEADER_HEIGHT};
  }
`;

const Main = styled.main`
  grid-area: main;
  padding: ${LAYOUT_PADDING};
  background-color: ${props => props.theme.colors.background};
  width: 100%;
  
  .main-content {
    width: 100%;
    max-width: 100%;
  }
`;

const SidebarWrapper = styled.aside`
  grid-area: sidebar;
  background-color: ${props => props.theme.colors.white};
  border-right: 1px solid ${props => props.theme.colors.light};
  height: calc(100vh - ${HEADER_HEIGHT});
  position: sticky;
  top: ${HEADER_HEIGHT};
  overflow-y: auto;
  padding: ${LAYOUT_PADDING} 0;
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