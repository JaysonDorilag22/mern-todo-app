import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import Home from "@user/Home";
import AuthPage from "@auth/AuthPage";
import Project from "./user/project/Project";
import ProjectDetails from "./user/project/ProjectDetails"; // Import ProjectDetails component
import Todo from "./user/todo/Todo";
import Group from "./user/group/Group";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import { AppSidebar } from "./components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "./components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import withErrorBoundary from "@/components/withErrorBoundary"; // Import the HOC

const HomeWithErrorBoundary = withErrorBoundary(Home);
const AuthPageWithErrorBoundary = withErrorBoundary(AuthPage);
const ProjectWithErrorBoundary = withErrorBoundary(Project);
const ProjectDetailsWithErrorBoundary = withErrorBoundary(ProjectDetails);
const TodoWithErrorBoundary = withErrorBoundary(Todo);
const GroupWithErrorBoundary = withErrorBoundary(Group);

function AppContent() {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const pathnames = location.pathname.split("/").filter((x) => x);

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const breadcrumbPaths = pathnames.map((_, index) => {
      const to = `/${pathnames.slice(0, index + 1).join("/")}`;
      return { to, label: pathnames[index], isLast: index === pathnames.length - 1 };
    });
    setBreadcrumbs(breadcrumbPaths);
  }, [location]);

  return (
    <>
      {location.pathname !== "/" && <AppSidebar />}
      <div className="flex flex-col flex-1">
        {location.pathname !== "/" && (
            <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4 z-10">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <React.Fragment key={breadcrumb.to}>
                    {index > 0 && <BreadcrumbSeparator className="hidden md:block" />}
                    <BreadcrumbItem>
                      {breadcrumb.isLast ? (
                        <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <Link to={breadcrumb.to}>
                            {breadcrumb.label}
                          </Link>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </header>
        )}
        <Routes>
          <Route path="/" element={<AuthPageWithErrorBoundary />} />
          <Route path="/home" element={<HomeWithErrorBoundary />} />
          <Route path="/todo" element={<TodoWithErrorBoundary />} />
          <Route path="/project" element={<ProjectWithErrorBoundary />} />
          <Route path="/project/:id" element={<ProjectDetailsWithErrorBoundary setBreadcrumbs={setBreadcrumbs} />} /> {/* Pass setBreadcrumbs */}
          <Route path="/group" element={<GroupWithErrorBoundary />} />
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