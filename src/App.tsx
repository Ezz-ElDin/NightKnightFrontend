import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import CreateStory from "./pages/CreateStory";
import AccountSettings from "./pages/AccountSettings";
import StoryViewer from "./pages/StoryViewer";
import GeneratingStory from "./pages/GeneratingStory";
import NotFound from "./pages/NotFound";
import AuthCallback from "./pages/AuthCallback";
import WaitingList from "./pages/WaitingList";
import RequireAuth from "./components/RequireAuth";
import Library from "./pages/Library";
import Email from "./pages/Email";
import FollowUpEmail from "./pages/FollowUpEmail";

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Flag to control waiting list mode and page access
// Set to true to make the waiting list the primary landing page but allow other URLs to be accessed
const WAITING_LIST_AS_HOME = false;

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Show the main Navbar on all pages except the waiting list pages and specific excluded routes */}
        <Routes>
          <Route path="/waiting-list" element={null} />
          <Route path="/generating-story/*" element={null} />
          <Route path="/reset-password" element={null} />
          <Route path="/forgot-password" element={null} />
          <Route path="/email" element={null} />
          <Route path="/follow-up-email" element={null} />
          <Route path="*" element={<Navbar />} />
        </Routes>
        
        <Routes>
          {WAITING_LIST_AS_HOME ? (
            <>
              {/* Make waiting list the home page and also accessible via /waiting-list */}
              <Route path="/" element={<WaitingList />} />
              <Route path="/waiting-list" element={<WaitingList />} />
              
              {/* Password reset and forgot password routes (unprotected) */}
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Email template routes */}
              <Route path="/email" element={<Email />} />
              <Route path="/follow-up-email" element={<FollowUpEmail />} />
              
              {/* Protected routes without /a/ prefix */}
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
              <Route path="/generating-story/:storyId" element={
                <RequireAuth>
                  <GeneratingStory />
                </RequireAuth>
              } />
              <Route path="/account-settings" element={
                <RequireAuth>
                  <AccountSettings />
                </RequireAuth>
              } />
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
              <Route path="/waiting-list" element={<WaitingList />} />
              
              {/* Password reset and forgot password routes (unprotected) */}
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Email template routes */}
              <Route path="/email" element={<Email />} />
              <Route path="/follow-up-email" element={<FollowUpEmail />} />
              
              {/* Protected routes without /a/ prefix */}
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
              <Route path="/generating-story/:storyId" element={
                <RequireAuth>
                  <GeneratingStory />
                </RequireAuth>
              } />
              <Route path="/account-settings" element={
                <RequireAuth>
                  <AccountSettings />
                </RequireAuth>
              } />
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
