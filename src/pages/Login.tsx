import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Lock, User, Key, Atom, Sparkles, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import Waves from '@/components/Waves';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (login(username, password)) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Waves Background */}
      <Waves
        lineColor="rgba(255, 255, 255, 0.25)"
        backgroundColor="transparent"
        waveSpeedX={0.012}
        waveSpeedY={0.008}
        waveAmpX={25}
        waveAmpY={15}
        xGap={15}
        yGap={25}
        friction={0.95}
        tension={0.008}
        maxCursorMove={100}
        className="opacity-80"
      />

      {/* Additional floating elements */}
      <motion.div
        className="absolute top-20 right-20 text-cyan-400/20 z-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Atom size={48} />
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-16 text-purple-400/20 z-10"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Sparkles size={36} />
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-1/4 text-blue-400/15 z-10"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Zap size={32} />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Logo/Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="relative inline-block">
              <motion.div
                className="w-20 h-20 mx-auto bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/25"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Atom className="w-10 h-10 text-white" />
              </motion.div>
              <motion.div
                className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="w-3 h-3 text-white" />
              </motion.div>
            </div>

            <motion.h1
              className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mt-6 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              ATOM CMS
            </motion.h1>

            <motion.p
              className="text-slate-400 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Content Management System
            </motion.p>
          </motion.div>

          {/* Login Card with Glass Morphism */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative backdrop-blur-md bg-white/3 border border-white/8 rounded-3xl shadow-2xl shadow-black/30 p-8 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
              backdropFilter: 'blur(12px) saturate(150%) contrast(110%)',
              WebkitBackdropFilter: 'blur(12px) saturate(150%) contrast(110%)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              boxShadow: '0 20px 40px -8px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.03) inset, 0 8px 32px rgba(0, 0, 0, 0.2)'
            }}
          >
            {/* Enhanced Glass morphism background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/3 via-transparent to-white/2 opacity-20"></div>
            <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-cyan-500/6 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/6 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-conic from-blue-500/4 via-transparent to-cyan-500/4 rounded-full blur-2xl"></div>

            {/* Subtle inner glow with reduced opacity for wave visibility */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/3 via-transparent to-purple-500/3 opacity-15"></div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative z-10 text-center mb-6"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl mb-4 shadow-lg">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-slate-300 text-sm">Please sign in to your account</p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="relative z-10 space-y-2"
              >
                <Label htmlFor="username" className="text-slate-300 text-sm font-medium">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200"
                    placeholder="Enter your username"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="relative z-10 space-y-2"
              >
                <Label htmlFor="password" className="text-slate-300 text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-slate-400 focus:border-cyan-400 focus:ring-cyan-400/20 transition-all duration-200"
                    placeholder="Enter your password"
                  />
                </div>
              </motion.div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10"
                >
                  <Alert variant="destructive" className="border-red-500/20 bg-red-500/10">
                    <AlertDescription className="text-red-400">
                      {error}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="relative z-10"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      ACCESSING THE SYSTEM ...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Lock className="w-5 h-5 mr-2" />
                      ACCESS THE SYSTEM
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="relative z-10 mt-6 text-center"
            >
              <p className="text-xs text-slate-500">
                Secured by ATOM • Content Management System
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
