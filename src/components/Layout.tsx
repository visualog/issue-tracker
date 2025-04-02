import styled from 'styled-components';
import { useState } from 'react';
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

  @media (max-width: 1024px) {
    grid-template-areas:
      "header"
      "main";
    grid-template-columns: 1fr;
  }
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
    display: flex;
    align-items: center;
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  color: ${props => props.theme.colors.dark};
  margin-right: 16px;

  @media (max-width: 1024px) {
    display: block;
  }

  &:hover {
    color: ${props => props.theme.colors.primary};
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

const SidebarWrapper = styled.aside<{ isOpen: boolean }>`
  grid-area: sidebar;
  background-color: ${props => props.theme.colors.white};
  border-right: 1px solid ${props => props.theme.colors.light};
  height: calc(100vh - ${HEADER_HEIGHT});
  position: sticky;
  top: ${HEADER_HEIGHT};
  overflow-y: auto;
  padding: ${LAYOUT_PADDING} 0;
  transform: translateX(0);
  transition: transform 0.3s ease-in-out;

  @media (max-width: 1024px) {
    position: fixed;
    left: 0;
    top: ${HEADER_HEIGHT};
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    z-index: 999;
    box-shadow: ${props => props.theme.elevation.shadow300};
  }
`;

const Overlay = styled.div<{ isOpen: boolean }>`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;

  @media (max-width: 1024px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer>
      <Header>
        <div className="header-content">
          <MenuButton onClick={toggleSidebar}>
            {isSidebarOpen ? '✕' : '☰'}
          </MenuButton>
          <Navbar />
        </div>
      </Header>
      <Overlay isOpen={isSidebarOpen} onClick={toggleSidebar} />
      <SidebarWrapper isOpen={isSidebarOpen}>
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