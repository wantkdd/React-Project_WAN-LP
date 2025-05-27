import { Link } from 'react-router-dom';

const footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-2">
      <div className="container mx-auto text-center text-gray-600 dark:text-gray-400">
        <p>
          &copy;{new Date().getFullYear()} Wan Dolimpan. All rights reserved
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link to={'#'}>Privacy Policy</Link>
          <Link to={'#'}>Terms of Service</Link>
          <Link to={'#'}>Contact</Link>
        </div>
      </div>
    </footer>
  );
};

export default footer;
