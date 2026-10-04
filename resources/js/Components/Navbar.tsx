"use client";
import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "HOME" },
  { href: "/scanner", label: "SCANNER" },
  { href: "/history", label: "HISTORY" },
  { href: "/about", label: "ABOUT" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePage().url.split("?")[0];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-[#0e0f1a]/80 border-b border-[#4a5366]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-between h-14 sm:h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="w-5 h-5 sm:w-6 sm:h-6 border border-[#d3bc8e] flex items-center justify-center text-[#d3bc8e] text-[10px] sm:text-xs"
            style={{ transform: "rotate(45deg)" }}
          >
            <span style={{ transform: "rotate(-45deg)" }}>✦</span>
          </span>
          <span className="hoyo-title text-[#ece5d8] text-sm sm:text-base lg:text-lg tracking-[3px] font-bold">
            ECOQUEST
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`hoyo-title text-[10px] lg:text-[11px] xl:text-[12px] tracking-[2px] lg:tracking-[3px] px-3 lg:px-4 xl:px-5 py-2 transition-all duration-300 relative ${
                  isActive
                    ? "text-[#d3bc8e]"
                    : "text-[#6b7280] hover:text-[#ece5d8]"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-3 right-3 lg:left-4 lg:right-4 h-[1px] bg-[#d3bc8e]"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-[5px] p-2 group"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-[#d3bc8e] transition-all duration-300 ${
              open ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-[#d3bc8e] transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-[#d3bc8e] transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-[#4a5366]/40 bg-[#0e0f1a]/95 backdrop-blur-md"
          >
            <div className="flex flex-col px-4 py-3">
              {NAV_LINKS.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`hoyo-title text-[11px] tracking-[3px] py-3 block border-b border-[#4a5366]/20 transition-colors ${
                        isActive
                          ? "text-[#d3bc8e]"
                          : "text-[#6b7280] hover:text-[#ece5d8]"
                      }`}
                    >
                      <span className="mr-3 text-[#d3bc8e] opacity-40">✦</span>
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
