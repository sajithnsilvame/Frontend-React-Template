import { useEffect } from 'react'; // Import useEffect
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

const UnauthorizedPage = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  };

  const floatingEyeVariants = {
    hidden: { y: 0 },
    visible: {
      y: [0, -10, 0, 10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  useEffect(() => {
    toast.error('Unauthorized Access');  // Show toast only on initial render
  }, []); // Empty dependency array means this runs only once, on mount

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-purple-700 to-blue-500 text-white flex flex-col items-center justify-center relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <Helmet>
        <title>Unauthorized Access</title>
        <meta name="description" content="You do not have permission to view this page." />
        <meta property="og:title" content="Unauthorized Access" />
        <meta property="og:description" content="You do not have permission to view this page." />
      </Helmet>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 bg-yellow-300 rounded-full filter blur-2xl opacity-40"
          variants={floatingEyeVariants}
          initial="hidden"
          animate="visible"
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-red-400 rounded-full filter blur-2xl opacity-50"
          variants={floatingEyeVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </div>

      <motion.div
        className="text-center z-10"
        variants={itemVariants}
      >
        <motion.h1
          className="text-5xl font-extrabold mb-4 tracking-tight"
          style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
        >
          Unauthorized
        </motion.h1>
        <motion.p
          className="text-lg mb-8 text-gray-200"
          style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)' }}
        >
          Oops! You don't have permission to access this page.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link to="/" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>

    </motion.div>
  );
};

export default UnauthorizedPage;