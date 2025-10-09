import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background overflow-x-hidden">
      <div className="text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8 sm:p-12"
        >
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-4 sm:mb-6 text-6xl sm:text-8xl lg:text-9xl font-bold gradient-text"
          >
            404
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-6 sm:mb-8 text-lg sm:text-xl lg:text-2xl text-foreground-secondary"
          >
            Oops! The page you're looking for doesn't exist.
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mb-8 sm:mb-12 text-sm sm:text-base text-foreground-secondary/80"
          >
            You tried to access: <code className="bg-muted px-2 py-1 rounded text-atom-primary">{location.pathname}</code>
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => navigate("/")}
              className="btn-metallic flex items-center gap-2 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Home className="w-4 h-4 sm:w-5 sm:h-5" />
              Return to Home
            </motion.button>
            
            <motion.button
              onClick={() => navigate(-1)}
              className="text-foreground-secondary hover:text-foreground transition-colors flex items-center gap-2 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              Go Back
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
