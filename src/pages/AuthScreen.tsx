import React, { useState } from 'react';
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup
} from '../firebase';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Loader2,
  Check
} from 'lucide-react';
import LogoImg from '../assest/Logo.png';

interface AuthScreenProps {
  onAuthSuccess: (user: any) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Loading & Error States
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Password Complexity Evaluator
  const hasLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^A-Za-z0-9]/.test(password);

  const rules = [
    { label: 'At least 8 chars', valid: hasLength },
    { label: 'Uppercase', valid: hasUpper },
    { label: 'Lowercase', valid: hasLower },
    { label: 'Number', valid: hasNumber },
    { label: 'Symbol (e.g. !@#$)', valid: hasSymbol },
  ];

  const strengthCount = rules.filter(r => r.valid).length;

  let strengthLabel = 'Very Weak';
  let strengthColorClass = 'text-red-500';
  let strengthBarColor = 'bg-red-500';

  if (strengthCount === 5) {
    strengthLabel = 'Excellent';
    strengthColorClass = 'text-brand-nvidia';
    strengthBarColor = 'bg-brand-nvidia';
  } else if (strengthCount >= 4) {
    strengthLabel = 'Strong';
    strengthColorClass = 'text-emerald-500';
    strengthBarColor = 'bg-emerald-500';
  } else if (strengthCount >= 3) {
    strengthLabel = 'Moderate';
    strengthColorClass = 'text-amber-500';
    strengthBarColor = 'bg-amber-500';
  } else if (strengthCount >= 2) {
    strengthLabel = 'Weak';
    strengthColorClass = 'text-orange-500';
    strengthBarColor = 'bg-orange-500';
  }

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (isSignUp && !name) {
      setError('Please enter your full name.');
      return;
    }

    if (isSignUp) {
      const missingRules = [];
      if (!hasLength) missingRules.push('at least 8 characters');
      if (!hasUpper) missingRules.push('an uppercase letter');
      if (!hasLower) missingRules.push('a lowercase letter');
      if (!hasNumber) missingRules.push('a number');
      if (!hasSymbol) missingRules.push('a symbol');

      if (missingRules.length > 0) {
        setError(`Password must include: ${missingRules.join(', ')}.`);
        return;
      }
    }

    setLoading(true);
    setError(null);

    try {
      if (isSignUp) {
        // Sign Up Flow
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        onAuthSuccess(userCredential.user);
      } else {
        // Sign In Flow
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        onAuthSuccess(userCredential.user);
      }
    } catch (err: any) {
      console.error(err);
      let friendlyMessage = 'An authentication error occurred. Please check your inputs.';
      if (err.code === 'auth/wrong-password') {
        friendlyMessage = 'Invalid password provided. Please try again.';
      } else if (err.code === 'auth/user-not-found') {
        friendlyMessage = 'No registered profile matching this email address.';
      } else if (err.code === 'auth/email-already-in-use') {
        friendlyMessage = 'An account already exists under this email address.';
      } else if (err.code === 'auth/weak-password') {
        friendlyMessage = 'Password must be at least 6 characters long.';
      } else if (err.code === 'auth/invalid-email') {
        friendlyMessage = 'Please enter a valid email address.';
      }
      setError(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      onAuthSuccess(result.user);
    } catch (err: any) {
      console.error(err);
      if (err.code !== 'auth/popup-closed-by-user') {
        setError('Google authentication failed. Please try again.');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div id="auth-page-container" className="h-screen w-screen bg-brand-green md:bg-brand-off-white flex flex-col md:flex-row overflow-hidden font-sans select-none relative">

      {/* Dynamic Gradient Blobs (Backdrop) */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-primary/10 blur-[120px] pointer-events-none hidden md:block" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-brand-nvidia/10 blur-[120px] pointer-events-none hidden md:block" />

      {/* Mobile-only Premium background glow blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-primary/25 blur-[90px] pointer-events-none md:hidden animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand-primary/20 blur-[90px] pointer-events-none md:hidden animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Left Pane - Premium Branding Column */}
      <div className="hidden md:flex md:w-5/12 h-screen bg-brand-green p-10 md:p-16 flex-col justify-between text-white relative overflow-hidden border-b md:border-b-0 md:border-r border-brand-green-border shrink-0 select-none">

        {/* Subtle decorative high-fidelity glowing gradient orbits */}
        <div className="absolute top-[-20%] left-[-20%] w-[350px] h-[350px] rounded-full bg-brand-primary/25 blur-[100px] animate-pulse pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[300px] h-[300px] rounded-full bg-brand-nvidia/15 blur-[80px] pointer-events-none" />

        {/* Subtle decorative dot-grid background overlay */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent bg-grid-pattern"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        {/* Brand Logo */}
        <div className="z-10 flex items-center space-x-2">
          <img src={LogoImg} alt="DigitalSkillora Logo" className="h-14 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]" />
        </div>

        {/* Dynamic Catchphrase */}
        <div className="z-10 my-auto space-y-6 max-w-sm">
          <h2 className="text-3xl md:text-[44px] font-black tracking-tight leading-tight uppercase font-mono">
            Elevate Workforce <span className="text-brand-primary drop-shadow-[0_0_30px_rgba(245,166,35,0.9)] select-none inline-block">Competency</span> Models.
          </h2>

          <p className="text-xs text-brand-text-on-green leading-relaxed opacity-90">
            Unlock advanced adaptive learning graphs, gap mapping pipelines, MLOps certifications registries, and automated Workday integrations in one unified hub.
          </p>
        </div>

        {/* Bottom Secure Indicator */}
        <div className="z-10 text-[10px] font-mono text-brand-nvidia flex items-center font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-nvidia mr-2 animate-pulse" />
          Gateway Connection Secured
        </div>
      </div>

      {/* Right Pane - Sleek Auth Form Cards */}
      <div className="flex-1 h-screen overflow-y-auto flex items-start justify-center p-6 md:p-12 pt-28 pb-12 md:py-12 z-10 bg-brand-green md:bg-transparent relative">
        
        {/* Fixed Top Mobile Navbar with Green Background */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-brand-green border-b border-brand-green-border flex items-center justify-between px-6 z-30 shadow-md">
          <img src={LogoImg} alt="DigitalSkillora Logo" className="h-10 w-auto object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.15)]" />
          <span className="text-[10px] font-mono font-bold text-brand-nvidia tracking-wider uppercase bg-brand-nvidia/10 border border-brand-nvidia/20 px-2.5 py-1 rounded-full">
            Admin Console
          </span>
        </div>

        <div className="w-full max-w-[440px] bg-white/95 md:bg-white backdrop-blur-xl border border-white/20 md:border-brand-border rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden md:my-auto">

          {/* Form Header */}
          <div className="space-y-2 mb-8 text-center md:text-left">
            <h3 className="text-lg font-bold text-brand-text-dark uppercase tracking-wider font-mono">
              {isSignUp ? 'Generate Corporate Account' : 'Gateway Authorization'}
            </h3>
            <p className="text-xs text-brand-text-body">
              {isSignUp ? 'Sign up to configure enterprise learning models.' : 'Authenticate credentials to access corporate portals.'}
            </p>
          </div>

          {/* Tab Selection */}
          <div className="flex bg-brand-off-white border border-brand-border rounded-xl p-1 mb-6">
            <button
              onClick={() => { setIsSignUp(false); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${!isSignUp ? 'bg-white text-brand-green-mid shadow-sm' : 'text-brand-text-muted hover:text-brand-text-dark'
                }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setIsSignUp(true); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${isSignUp ? 'bg-white text-brand-green-mid shadow-sm' : 'text-brand-text-muted hover:text-brand-text-dark'
                }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message Box */}
          {error && (
            <div className="p-3.5 mb-6 border border-red-200 bg-red-50 text-red-600 rounded-xl flex items-start space-x-2 text-[11px] animate-shake">
              <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4 font-sans text-xs">
            {isSignUp && (
              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono font-bold text-brand-text-muted uppercase">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-off-white border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-brand-text-dark focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono font-bold text-brand-text-muted uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-brand-off-white border border-brand-border rounded-xl pl-10 pr-4 py-2.5 text-xs text-brand-text-dark focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="block text-[10px] font-mono font-bold text-brand-text-muted uppercase">Password</label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-text-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-brand-off-white border border-brand-border rounded-xl pl-10 pr-10 py-2.5 text-xs text-brand-text-dark focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-text-muted hover:text-brand-text-dark cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password strength validator meter */}
              {isSignUp && password.length > 0 && (
                <div className="mt-2.5 p-3 bg-brand-off-white border border-brand-border rounded-xl space-y-2 transition-all duration-300 animate-fadeIn">
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                    <span className="text-brand-text-muted uppercase">Strength:</span>
                    <span className={`transition-all duration-300 ${strengthColorClass}`}>{strengthLabel}</span>
                  </div>
                  
                  {/* Segmented Strength Bar */}
                  <div className="flex space-x-1 h-1.5 w-full">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <div
                        key={index}
                        className={`h-full flex-1 rounded-full transition-all duration-300 ${
                          index <= strengthCount ? strengthBarColor : 'bg-brand-border'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Validation Requirements Checklist */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 mt-2 pt-2 border-t border-brand-border/60 text-[10px] text-brand-text-muted">
                    {rules.map((rule) => (
                      <div key={rule.label} className="flex items-center space-x-1.5">
                        {rule.valid ? (
                          <span className="flex items-center justify-center h-3.5 w-3.5 rounded-full bg-emerald-500/10 text-emerald-600 transition-all duration-300 shrink-0">
                            <Check className="h-2 w-2 stroke-[3.5]" />
                          </span>
                        ) : (
                          <span className="flex items-center justify-center h-3.5 w-3.5 rounded-full bg-brand-text-muted/10 text-brand-text-muted transition-all duration-300 shrink-0">
                            <span className="h-1 w-1 rounded-full bg-brand-text-muted" />
                          </span>
                        )}
                        <span className={`transition-all duration-300 ${rule.valid ? 'text-brand-text-dark font-medium' : 'text-brand-text-muted'}`}>
                          {rule.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full mt-3 py-3 bg-brand-green text-white hover:bg-brand-green-mid text-xs font-bold rounded-xl transition-all shadow flex items-center justify-center space-x-1.5 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-brand-primary" />
              ) : (
                <>
                  <span>{isSignUp ? 'Generate Account' : 'Authenticate'}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-brand-primary" />
                </>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-y-1/2 left-0 right-0 border-t border-brand-border z-0" />
            <span className="relative bg-white px-3 font-mono text-[9px] font-bold text-brand-text-muted z-10 uppercase tracking-widest">OR CONTINUE WITH</span>
          </div>

          {/* Google SSO Button */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading || googleLoading}
            className="w-full py-2 border border-[#747775] bg-white hover:bg-brand-off-white text-[13px] font-medium text-[#1f1f1f] rounded-full transition-all flex items-center justify-center space-x-2.5 cursor-pointer disabled:opacity-50 shadow-sm"
          >
            {googleLoading ? (
              <Loader2 className="h-4.5 w-4.5 animate-spin text-brand-nvidia" />
            ) : (
              <>
                {/* Colorful official Google SVG logo */}
                <svg className="h-4.5 w-4.5 shrink-0" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.5 24c0-1.63-.15-3.2-.43-4.72H24v9h12.75c-.55 2.96-2.22 5.47-4.73 7.15l7.35 5.69c4.3-3.97 6.78-9.82 6.78-17.12z" />
                  <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.98-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.35-5.69c-2.03 1.36-4.63 2.18-8.54 2.18-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                <span className="font-sans text-[14px]">Sign in with Google</span>
              </>
            )}
          </button>

        </div>
      </div>

    </div>
  );
}
