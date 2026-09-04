import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { VoiceAssistant } from './components/VoiceAssistant';
import { PageBackground } from './components/PageBackground';
import { ProtectedRoute } from './components/ProtectedRoute';

import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { ForgotPassword } from './pages/ForgotPassword';
import { Dashboard } from './pages/Dashboard';
import { Weather } from './pages/Weather';
import { CropRecommendation } from './pages/CropRecommendation';
import { DiseaseDetection } from './pages/DiseaseDetection';
import { MarketPrices } from './pages/MarketPrices';
import { PricePrediction } from './pages/PricePrediction';
import { SoilAnalytics } from './pages/SoilAnalytics';
import { GovernmentSchemes } from './pages/GovernmentSchemes';
import { MyFarm } from './pages/MyFarm';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { About } from './pages/About';

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Navbar />

                <div className="flex-1">
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<PageBackground variant="home"><Home /></PageBackground>} />
                    <Route path="/about" element={<PageBackground variant="home"><About /></PageBackground>} />
                    <Route path="/login" element={<PageBackground variant="auth"><Login /></PageBackground>} />
                    <Route path="/register" element={<PageBackground variant="auth"><Signup /></PageBackground>} />
                    <Route path="/signup" element={<PageBackground variant="auth"><Signup /></PageBackground>} />
                    <Route path="/forgot-password" element={<PageBackground variant="auth"><ForgotPassword /></PageBackground>} />

                    {/* Protected Authenticated Routes */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProtectedRoute>
                          <PageBackground variant="dashboard"><Dashboard /></PageBackground>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/my-farm"
                      element={
                        <ProtectedRoute>
                          <PageBackground variant="farm"><MyFarm /></PageBackground>
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/farms" element={<Navigate to="/my-farm" replace />} />

                    <Route
                      path="/weather"
                      element={
                        <ProtectedRoute>
                          <PageBackground variant="weather"><Weather /></PageBackground>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/soil-analytics"
                      element={
                        <ProtectedRoute>
                          <PageBackground variant="soil"><SoilAnalytics /></PageBackground>
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/soil" element={<Navigate to="/soil-analytics" replace />} />

                    <Route
                      path="/crop-recommendation"
                      element={
                        <ProtectedRoute>
                          <PageBackground variant="crop"><CropRecommendation /></PageBackground>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/disease-detection"
                      element={
                        <ProtectedRoute>
                          <PageBackground variant="disease"><DiseaseDetection /></PageBackground>
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/disease" element={<Navigate to="/disease-detection" replace />} />

                    <Route
                      path="/market-prices"
                      element={
                        <ProtectedRoute>
                          <PageBackground variant="market"><MarketPrices /></PageBackground>
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/market" element={<Navigate to="/market-prices" replace />} />

                    <Route
                      path="/price-prediction"
                      element={
                        <ProtectedRoute>
                          <PageBackground variant="market"><PricePrediction /></PageBackground>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/government-schemes"
                      element={
                        <ProtectedRoute>
                          <PageBackground variant="schemes"><GovernmentSchemes /></PageBackground>
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/schemes" element={<Navigate to="/government-schemes" replace />} />

                    <Route
                      path="/notifications"
                      element={
                        <ProtectedRoute>
                          <PageBackground variant="dashboard"><Notifications /></PageBackground>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/settings"
                      element={
                        <ProtectedRoute>
                          <PageBackground variant="dashboard"><Settings /></PageBackground>
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <PageBackground variant="dashboard"><Profile /></PageBackground>
                        </ProtectedRoute>
                      }
                    />

                    {/* Catch all fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>

                <VoiceAssistant />
                <Footer />
              </div>
            </Router>
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
