import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { store, ADMIN_PRIVILEGED_ROLES } from './services/store';
import { RoleSwitcher } from './components/RoleSwitcher';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import {
  TopProgressBar,
  startGlobalProgress,
  doneGlobalProgress,
  pulseGlobalProgress
} from './components/TopProgressBar';
import { OfflineIndicator } from './components/OfflineIndicator';

const RouteLoadingFallback: React.FC<{ message?: string }> = ({
  message = 'Loading Oromia Insurance S.C. workspace...'
}) => {
  useEffect(() => {
    startGlobalProgress();
    return () => doneGlobalProgress();
  }, []);
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-xs text-slate-500">
      {message}
    </div>
  );
};

function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      return await factory();
    } catch {
      await new Promise((r) => setTimeout(r, 350));
      return factory();
    }
  });
}

// Primary Landing Page (eagerly loaded for instant first paint)
import { HomePage } from './pages/public/HomePage';

// Lazy-Loaded Public & Auth Pages
const ProductsPage = lazyWithRetry(() => import('./pages/public/ProductsPage').then((m) => ({ default: m.ProductsPage })));
const VerifyPolicyPage = lazyWithRetry(() => import('./pages/public/VerifyPolicyPage').then((m) => ({ default: m.VerifyPolicyPage })));
const AboutPage = lazyWithRetry(() => import('./pages/public/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazyWithRetry(() => import('./pages/public/ContactPage').then((m) => ({ default: m.ContactPage })));
const ClaimsPage = lazyWithRetry(() => import('./pages/public/ClaimsPage').then((m) => ({ default: m.ClaimsPage })));
const LoginPage = lazyWithRetry(() => import('./pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })));
const RegisterPage = lazyWithRetry(() => import('./pages/auth/RegisterPage').then((m) => ({ default: m.RegisterPage })));
const OnboardingPage = lazyWithRetry(() => import('./pages/auth/OnboardingPage').then((m) => ({ default: m.OnboardingPage })));
const AccountStatusPage = lazyWithRetry(() => import('./pages/auth/AccountStatusPage').then((m) => ({ default: m.AccountStatusPage })));
const SecretAdminAuthPage = lazyWithRetry(() => import('./pages/auth/SecretAdminAuthPage').then((m) => ({ default: m.SecretAdminAuthPage })));

// Lazy-Loaded Heavy Pages & Workspaces
const ProductDetailPage = lazyWithRetry(() => import('./pages/public/ProductDetailPage').then((m) => ({ default: m.ProductDetailPage })));
const BranchesPage = lazyWithRetry(() => import('./pages/public/BranchesPage').then((m) => ({ default: m.BranchesPage })));
const MediaPage = lazyWithRetry(() => import('./pages/public/MediaPage').then((m) => ({ default: m.MediaPage })));
const LeadershipPage = lazyWithRetry(() => import('./pages/public/LeadershipPage').then((m) => ({ default: m.LeadershipPage })));
const CustomerPortal = lazyWithRetry(() => import('./pages/customer/CustomerPortal').then((m) => ({ default: m.CustomerPortal })));
const OperatorPortal = lazyWithRetry(() => import('./pages/operator/OperatorPortal').then((m) => ({ default: m.OperatorPortal })));
const StaffWorkspace = lazyWithRetry(() => import('./pages/staff/StaffWorkspace').then((m) => ({ default: m.StaffWorkspace })));
const AdminControlCentre = lazyWithRetry(() => import('./pages/admin/AdminControlCentre').then((m) => ({ default: m.AdminControlCentre })));

const OPERATOR_ALLOWED_ROLES = ['operator', 'agent', 'broker', 'branch_manager', 'admin', 'super_admin'];
const STAFF_ALLOWED_ROLES = [
  'staff',
  'underwriter',
  'claims_officer',
  'finance',
  'marketing',
  'department_manager',
  'branch_manager',
  'executive',
  'admin',
  'super_admin'
];

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace(/^#/, '');
      return hash || window.location.pathname || '/';
    }
    return '/';
  });

  const [queryParams, setQueryParams] = useState<URLSearchParams>(() => {
    if (typeof window !== 'undefined') {
      const queryIdx = window.location.hash.indexOf('?');
      if (queryIdx >= 0) {
        return new URLSearchParams(window.location.hash.substring(queryIdx));
      }
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  });

const AUTH_IMMEDIATE_ROUTES = new Set([
  '/login',
  '/register',
  '/onboarding',
  '/account-status',
  '/admin-auth',
  '/admin-login',
  '/portal',
  '/operator',
  '/staff',
  '/admin'
]);

function hasPersistedAuthHint(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.sessionStorage.getItem('oic_pending_google_redirect') === '1') return true;
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith('firebase:authUser:')) return true;
    }
  } catch {
    // Ignore storage access errors
  }
  return false;
}

  const [authReady, setAuthReady] = useState(false);
  const authStartedRef = useRef(false);
  const authUnsubscribeRef = useRef<(() => void) | null>(null);
  const appMountedRef = useRef(true);

  const [, setTick] = useState(0);
  useEffect(() => {
    return store.subscribe(() => setTick((t) => t + 1));
  }, []);

  const ensureAuthInitialized = () => {
    if (authStartedRef.current) return;
    authStartedRef.current = true;

    const existingUser = store.getCurrentUser();
    if (existingUser?.accountType === 'customer') {
      void import('./pages/customer/CustomerPortal').catch(() => {});
    }

    const safetyTimer = setTimeout(() => {
      if (appMountedRef.current) setAuthReady(true);
    }, 800);

    import('./services/authService')
      .then(({ subscribeToAuthSession, completeRedirectSignIn }) => {
        if (!appMountedRef.current) return;

        completeRedirectSignIn()
          .then((res) => {
            if (appMountedRef.current && res?.success && res.destination) {
              navigate(res.destination);
            }
          })
          .catch(() => {});

        authUnsubscribeRef.current = subscribeToAuthSession(() => {
          if (appMountedRef.current) {
            clearTimeout(safetyTimer);
            setAuthReady(true);
          }
        });
      })
      .catch(() => {
        clearTimeout(safetyTimer);
        if (appMountedRef.current) setAuthReady(true);
      });
  };

  useEffect(() => {
    appMountedRef.current = true;
    const needsImmediateAuth =
      AUTH_IMMEDIATE_ROUTES.has(currentRoute) || Boolean(store.getCurrentUser()) || hasPersistedAuthHint();

    let idleHandle: number | undefined;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

    if (needsImmediateAuth) {
      ensureAuthInitialized();
    } else {
      setAuthReady(true);
      const w = window as Window & {
        requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      if (typeof w.requestIdleCallback === 'function') {
        idleHandle = w.requestIdleCallback(() => ensureAuthInitialized(), { timeout: 2500 });
      } else {
        fallbackTimer = setTimeout(() => ensureAuthInitialized(), 1600);
      }
    }

    return () => {
      appMountedRef.current = false;
      if (idleHandle !== undefined) {
        const w = window as Window & { cancelIdleCallback?: (id: number) => void };
        w.cancelIdleCallback?.(idleHandle);
      }
      if (fallbackTimer !== undefined) {
        clearTimeout(fallbackTimer);
      }
      authUnsubscribeRef.current?.();
      authUnsubscribeRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (AUTH_IMMEDIATE_ROUTES.has(currentRoute) && !authStartedRef.current) {
      ensureAuthInitialized();
    }
  }, [currentRoute]);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      pulseGlobalProgress(150);
      window.location.hash = path;
      const cleanPath = path.split('?')[0];
      const queryIdx = path.indexOf('?');
      if (queryIdx >= 0) {
        setQueryParams(new URLSearchParams(path.substring(queryIdx)));
      } else {
        setQueryParams(new URLSearchParams());
      }
      setCurrentRoute(cleanPath);
      window.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    const handleHashChange = () => {
      pulseGlobalProgress(140);
      const hash = window.location.hash.replace(/^#/, '') || '/';
      const cleanPath = hash.split('?')[0];
      const queryIdx = hash.indexOf('?');
      if (queryIdx >= 0) {
        setQueryParams(new URLSearchParams(hash.substring(queryIdx)));
      } else {
        setQueryParams(new URLSearchParams());
      }
      setCurrentRoute(cleanPath);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderContent = () => {
    if (currentRoute.startsWith('/insurance/')) {
      const slug = currentRoute.replace('/insurance/', '');
      return <ProductDetailPage slug={slug} navigate={navigate} />;
    }

    switch (currentRoute) {
      case '/':
        return <HomePage navigate={navigate} />;
      case '/insurance':
        return <ProductsPage navigate={navigate} />;
      case '/verify-policy':
        return <VerifyPolicyPage initialCode={queryParams.get('code') || ''} />;
      case '/branches':
        return <BranchesPage />;
      case '/about':
        return <AboutPage navigate={navigate} />;
      case '/leadership':
      case '/board-of-directors':
        return <LeadershipPage navigate={navigate} initialTab="board" />;
      case '/executive-managers':
      case '/executive-management':
        return <LeadershipPage navigate={navigate} initialTab="executives" />;
      case '/organizational-structure':
      case '/company-profile':
        return <LeadershipPage navigate={navigate} initialTab="structure" />;
      case '/claims':
        return <ClaimsPage navigate={navigate} />;
      case '/media':
      case '/announcements':
        return <MediaPage navigate={navigate} />;
      case '/contact':
        return <ContactPage />;
      case '/login': {
        const rawRedirect = queryParams.get('redirect');
        const resolvedRedirect = rawRedirect
          ? rawRedirect.startsWith('/')
            ? rawRedirect
            : `/${rawRedirect}`
          : undefined;
        return <LoginPage navigate={navigate} redirectRoute={resolvedRedirect} />;
      }
      case '/register':
        return <RegisterPage navigate={navigate} />;
      case '/onboarding':
        if (!authReady && !store.getCurrentUser()) {
          return <RouteLoadingFallback message="Preparing your Oromia Insurance onboarding profile..." />;
        }
        return <OnboardingPage navigate={navigate} redirectRoute={queryParams.get('redirect') || undefined} />;
      case '/account-status':
        return <AccountStatusPage navigate={navigate} mode="status" />;
      case '/admin-auth':
      case '/admin-login':
        return <SecretAdminAuthPage navigate={navigate} />;

      case '/portal': {
        const user = store.getCurrentUser();
        if (!authReady && !user) {
          return <RouteLoadingFallback message="Loading your Oromia Insurance policyholder workspace..." />;
        }
        if (!user) {
          return <LoginPage navigate={navigate} redirectRoute="/portal" />;
        }
        if (user.accountStatus !== 'active') {
          return <AccountStatusPage navigate={navigate} mode="status" />;
        }
        if (user.accountType === 'customer' && user.onboardingStatus === 'incomplete') {
          return <OnboardingPage navigate={navigate} redirectRoute="/portal" />;
        }
        return (
          <CustomerPortal
            navigate={navigate}
            initialAction={queryParams.get('action') || undefined}
            initialProductId={queryParams.get('productId') || undefined}
          />
        );
      }
      case '/operator': {
        const user = store.getCurrentUser();
        if (!user) return <LoginPage navigate={navigate} redirectRoute="/operator" />;
        if (!OPERATOR_ALLOWED_ROLES.includes(user.accountType)) {
          return <AccountStatusPage navigate={navigate} mode="access_denied" />;
        }
        return (
          <OperatorPortal
            navigate={navigate}
            initialAction={queryParams.get('action') || undefined}
            initialProductId={queryParams.get('productId') || undefined}
          />
        );
      }
      case '/staff': {
        const user = store.getCurrentUser();
        if (!user) return <LoginPage navigate={navigate} redirectRoute="/staff" />;
        if (!STAFF_ALLOWED_ROLES.includes(user.accountType)) {
          return <AccountStatusPage navigate={navigate} mode="access_denied" />;
        }
        return <StaffWorkspace navigate={navigate} />;
      }
      case '/admin': {
        const user = store.getCurrentUser();
        if (!user) return <SecretAdminAuthPage navigate={navigate} />;
        if (!ADMIN_PRIVILEGED_ROLES.includes(user.accountType)) {
          return <AccountStatusPage navigate={navigate} mode="access_denied" />;
        }
        return <AdminControlCentre navigate={navigate} />;
      }

      default:
        return <HomePage navigate={navigate} />;
    }
  };

  const isAuthSecret = ['/admin-auth', '/admin-login'].includes(currentRoute);
  const isInternalWorkspace = ['/admin', '/operator', '/staff'].includes(currentRoute);
  const isWorkspace = ['/portal', '/operator', '/staff', '/admin'].includes(currentRoute);

  if (isAuthSecret) {
    return (
      <div className="min-h-screen font-sans text-slate-100 bg-[#022b2d]">
        <TopProgressBar />
        <div key={currentRoute} className="oic-view-transition">
          {renderContent()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-900 bg-slate-50">
      <TopProgressBar />
      <OfflineIndicator />

      {/* Rapid Role Switcher Banner ONLY shown inside authorized internal workspaces */}
      {isInternalWorkspace && <RoleSwitcher navigate={navigate} />}

      {/* Top Navbar */}
      <Navbar currentRoute={currentRoute} navigate={navigate} />

      {/* Page Body */}
      <div className="flex-1">
        <Suspense fallback={<RouteLoadingFallback />}>
          <div key={currentRoute} className="oic-view-transition">
            {renderContent()}
          </div>
        </Suspense>
      </div>

      {/* Footer on public views */}
      {!isWorkspace && <Footer navigate={navigate} />}
    </div>
  );
}

