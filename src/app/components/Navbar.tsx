"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => setIsLoggedIn(!!localStorage.getItem("token"));
    checkAuth();
    window.addEventListener("authChange", checkAuth);
    return () => window.removeEventListener("authChange", checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("authChange"));
    router.push("/auth");
  };

  return (
    <nav className="container mx-auto max-w-4xl flex justify-between items-center p-4 dark:bg-black dark:text-white">
      {/* Logo */}
      <Link href="/" className="text-4xl font-bold italic">
        EmeraldQuest
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-4">
        <Link href="/" className="hover:text-emerald-400 p-2 font-bold italic text-2xl">
          Home
        </Link>

        {isLoggedIn && (
          <Link href="/dashboard" className="hover:text-emerald-400 p-2 font-bold italic text-2xl">
            Dashboard
          </Link>
        )}

        {!isLoggedIn ? (
          <Link href="/auth" className="hover:text-emerald-400 font-bold p-2 italic text-2xl">
            Login
          </Link>
        ) : (
          <button onClick={handleLogout} className="hover:text-red-400 font-bold p-2 italic text-2xl">
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button className="md:hidden text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-4 bg-white border border-gray-300 shadow-lg rounded-lg p-4 flex flex-col space-y-3 md:hidden">
          <Link href="/" className="hover:text-emerald-400 font-bold italic text-xl" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {isLoggedIn && (
            <Link href="/dashboard" className="hover:text-emerald-400 font-bold italic text-xl" onClick={() => setMenuOpen(false)}>
              Dashboard
            </Link>
          )}

          {!isLoggedIn ? (
            <Link href="/auth" className="hover:text-emerald-400 font-bold italic text-xl" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          ) : (
            <button onClick={handleLogout} className="hover:text-red-400 font-bold italic text-xl">
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
