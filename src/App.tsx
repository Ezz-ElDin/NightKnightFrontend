
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateStory from "./pages/CreateStory";
import AccountSettings from "./pages/AccountSettings";
import StoryViewer from "./pages/StoryViewer";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import WaitingList from "./pages/WaitingList";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Flag to enable/disable the waiting list mode - set to true to enable waiting list by default
const WAITING_LIST_MODE = true;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Only show the main Navbar when not in waiting list mode AND not on the waiting list page */}
        {!WAITING_LIST_MODE && <Routes>
          <Route path="/waiting-list" element={null} />
          <Route path="*" element={<Navbar />} />
        </Routes>}
        
        <Routes>
          {WAITING_LIST_MODE ? (
            <>
              <Route path="/waiting-list" element={<WaitingList />} />
              {/* Redirect all other routes to the waiting list */}
              <Route path="*" element={<Navigate replace to="/waiting-list" />} />
            </>
          ) : (
            <>
              {/* Redirect home page to waiting list even when not in full waiting list mode */}
              <Route path="/" element={<Navigate replace to="/waiting-list" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-story" element={<CreateStory />} />
              <Route path="/account-settings" element={<AccountSettings />} />
              <Route path="/story-viewer" element={<StoryViewer />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              {/* Add the waiting list route even when not in waiting list mode */}
              <Route path="/waiting-list" element={<WaitingList />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
