import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Navbar() {
  const [user, setUser] = useState(null);

  // Listen for user login state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // Handle sign out
  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">Finley</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/news">News</Link></li>

        {user ? (
          <>
            <li>
              <span className="user-email">
                 {user.email.split('@')[0]}
              </span>
            </li>
            <li>
              <button className="signout-btn" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/signin">Sign In</Link></li>
            
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
