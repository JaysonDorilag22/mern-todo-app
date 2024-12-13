import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from '@user/Home';
import AuthPage from '@auth/AuthPage';
import { ThemeProvider } from './components/theme-provider';
import { Toaster } from './components/ui/toaster';
import { AppSidebar } from './components/app-sidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from './components/ui/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

function AppContent() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <AppSidebar />}
      <div className="flex flex-col flex-1">
        {location.pathname !== '/' && (
          <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">All Inboxes</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Inbox</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
        )}
        <Routes>
          <Route path='/' element={<AuthPage />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <SidebarProvider style={{ "--sidebar-width": "350px" }}>
          <AppContent />
        </SidebarProvider>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;