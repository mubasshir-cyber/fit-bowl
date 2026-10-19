'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, ArrowRight, Phone } from 'lucide-react';
import { Container } from '../ui/Container';
import { Button } from '../ui/Button';
import { smoothScrollTo } from '@/utils/scroll';

const NAV_LINKS = [
  { label: 'Menu', href: '#menu' },
  { label: 'Plans', href: '#plans' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQs', href: '#faqs' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    const lenis = (window as unknown as { lenis?: { stop: () => void; start: () => void } }).lenis;
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      lenis?.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      lenis?.start();
    };
  }, [mobileMenuOpen]);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    smoothScrollTo(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFF7E8]/95 backdrop-blur-md shadow-sm border-b border-[#E3D8C4] py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#top"
              className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F32] rounded-lg"
              aria-label="FitBowl Home"
            >
              <div className="relative w-36 h-9 sm:w-44 sm:h-11 transition-transform group-hover:scale-102">
                <Image
                  src="/images/logo/fitbowl-logo.svg"
                  alt="FitBowl Veg & Non-Veg Healthy Meals Delivered"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden md:flex items-center space-x-7 lg:space-x-8"
              aria-label="Main Navigation"
            >
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="text-sm lg:text-base font-semibold text-[#173F32] hover:text-[#F47738] transition-colors relative py-1 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F47738] transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Desktop Right CTA */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="dark"
                size="md"
                onClick={() => handleNavClick('#trial-form')}
                className="group shadow-sm hover:shadow-md"
              >
                <span>Claim Free Trial</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-[#173F32] hover:bg-[#173F32]/8 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173F32]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Backdrop & Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-[#173F32]/50 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        >
          <div
            className="fixed top-0 right-0 w-[85%] max-w-sm h-full bg-[#FFF7E8] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            data-lenis-prevent="true"
          >
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E3D8C4]">
                <div className="relative w-32 h-8">
                  <Image
                    src="/images/logo/fitbowl-logo.svg"
                    alt="FitBowl"
                    fill
                    className="object-contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-[#173F32] hover:bg-[#173F32]/10"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Links */}
              <nav className="mt-6 flex flex-col space-y-2">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className="flex items-center justify-between text-lg font-bold text-[#173F32] hover:text-[#F47738] py-3 px-3 rounded-xl hover:bg-[#173F32]/5 transition-colors"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </a>
                ))}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-[#E3D8C4] space-y-4">
              <div className="flex items-center text-xs text-[#63786F] gap-2 px-1">
                <Phone className="w-3.5 h-3.5 text-[#F47738]" />
                <span>Need help? +91 98765 43210</span>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center group"
                onClick={() => handleNavClick('#trial-form')}
              >
                <span>Claim Free Trial</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
