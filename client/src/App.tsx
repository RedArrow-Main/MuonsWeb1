/** Field Ledger style reminder: maintain a high-contrast, editorial field-report experience throughout routing. */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "@/pages/Home";
import SeoTopic from "@/pages/SeoTopic";
import { usePageViews } from "@/hooks/usePageViews";

function Router() {
  // Client-side navigation does not reload the document, so views are reported
  // here rather than by the GA4 snippet.
  usePageViews();

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/solutions/:slug" component={SeoTopic} />
      <Route path="/insights/:slug" component={SeoTopic} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster richColors position="top-center" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
