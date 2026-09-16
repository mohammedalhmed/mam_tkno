import { Toaster } from "@/components/ui/sonner";
import { lazy, Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
const ServiceCategory = lazy(() => import("./pages/ServiceCategory"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudy"));

function Router() {
  const fallback = <div className="min-h-screen bg-[#061437]" aria-label="جارٍ تحميل الصفحة" />;
  return (
    <Suspense fallback={fallback}>
      <Switch>
      <Route path="/" component={Home} />
      <Route path="/case-studies/:projectId" component={CaseStudyPage} />
      <Route path="/services/technology">
        <ServiceCategory category="technology" />
      </Route>
      <Route path="/services/design">
        <ServiceCategory category="design" />
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
