
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
// Removed Dashboard import, as the page doesn't exist and is now Library
import CreateStory from "./pages/CreateStory";
import AccountSettings from "./pages/AccountSettings";
import StoryViewer from "./pages/StoryViewer";
import GeneratingStory from "./pages/GeneratingStory";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import WaitingList from "./pages/WaitingList";
import RequireAuth from "./components/RequireAuth";
import Library from "./pages/Library";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Flag to control waiting list mode and page access
// Set to true to make the waiting list the primary landing page but allow other URLs to be accessed
const WAITING_LIST_AS_HOME = true;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Show the main Navbar on all pages except the waiting list pages */}
        <Routes>
          <Route path="/" element={null} />
          <Route path="/waiting-list" element={null} />
          <Route path="/generating-story/*" element={null} />
          <Route path="*" element={<Navbar />} />
        </Routes>
        
        <Routes>
          {WAITING_LIST_AS_HOME ? (
            <>
              {/* Make waiting list the home page and also accessible via /waiting-list */}
              <Route path="/" element={<WaitingList />} />
              <Route path="/waiting-list" element={<WaitingList />} />
              
              {/* Original homepage is now accessible via /homepage */}
              <Route path="/homepage" element={<Index />} />
              
              {/* Protected routes */}
              <Route path="/library" element={
                <RequireAuth>
                  <Library />
                </RequireAuth>
              } />
              <Route path="/create-story" element={
                <RequireAuth>
                  <CreateStory />
                </RequireAuth>
              } />
              {/* NEW: Generating story route */}
              <Route path="/generating-story/:storyId" element={
                <RequireAuth>
                  <GeneratingStory />
                </RequireAuth>
              } />
              {/* UNPROTECTED temp route for testing */}
              <Route path="/temp" element={<CreateStory />} />
              <Route path="/account-settings" element={
                <RequireAuth>
                  <AccountSettings />
                </RequireAuth>
              } />
              {/* UPDATED route for story viewer with storyId param */}
              <Route path="/library/stories/:storyId" element={
                <RequireAuth>
                  <StoryViewer />
                </RequireAuth>
              } />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="*" element={<NotFound />} />
            </>
          ) : (
            <>
              {/* Standard routing configuration if waiting list mode is disabled */}
              <Route path="/" element={<Index />} />
              <Route path="/homepage" element={<Index />} />
              <Route path="/waiting-list" element={<WaitingList />} />
              
              {/* Protected routes */}
              <Route path="/library" element={
                <RequireAuth>
                  <Library />
                </RequireAuth>
              } />
              <Route path="/create-story" element={
                <RequireAuth>
                  <CreateStory />
                </RequireAuth>
              } />
              {/* NEW: Generating story route */}
              <Route path="/generating-story/:storyId" element={
                <RequireAuth>
                  <GeneratingStory />
                </RequireAuth>
              } />
              {/* UNPROTECTED temp route for testing */}
              <Route path="/temp" element={<CreateStory />} />
              <Route path="/account-settings" element={
                <RequireAuth>
                  <AccountSettings />
                </RequireAuth>
              } />
              {/* UPDATED route for story viewer with storyId param */}
              <Route path="/library/stories/:storyId" element={
                <RequireAuth>
                  <StoryViewer />
                </RequireAuth>
              } />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
