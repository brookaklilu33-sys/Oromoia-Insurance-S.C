import React from 'react';
import { Shield, RefreshCw, Home } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error instanceof Error ? error.message : 'An unexpected display error occurred.'
    };
  }

  componentDidCatch(error: unknown) {
    console.error('OIC Platform ErrorBoundary caught error:', error);
  }

  handleReload = () => {
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  handleGoHome = () => {
    if (typeof window !== 'undefined') {
      window.location.hash = '/';
      this.setState({ hasError: false, errorMessage: '' });
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#006B6E]/10 flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6 text-[#006B6E]" />
            </div>
            <div className="space-y-1.5">
              <h1 className="text-lg font-bold text-[#006B6E]">
                Oromia Insurance S.C. Digital Portal
              </h1>
              <p className="text-xs text-slate-600 leading-relaxed">
                A temporary connection or page update interrupted this view. Your account and policy records remain safe.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="flex-1 bg-[#006B6E] hover:bg-[#005254] text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#7DC242]" />
                <span>Reload Page</span>
              </button>
              <button
                type="button"
                onClick={this.handleGoHome}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Return Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
