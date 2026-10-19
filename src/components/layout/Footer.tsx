import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Phone, Clock, MapPin, ArrowUpRight, Heart } from 'lucide-react';
import { Container } from '../ui/Container';

export function Footer() {
  return (
    <footer className="bg-[#173F32] text-[#FFF7E8] pt-16 sm:pt-20 pb-12 border-t border-[#1F4E3E]">
      <Container>
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#235847]">
          {/* Brand Column (Span 2 on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <Link href="/" className="inline-block" aria-label="FitBowl Home">
                <Image
                  src="/images/logo/fitbowl-logo-light.svg"
                  alt="FitBowl"
                  width={160}
                  height={46}
                  className="h-10 w-auto"
                />
              </Link>
              <p className="text-[10px] tracking-[0.22em] font-black uppercase text-[#DCEBCF] mt-1">
                HEALTHY MEALS DELIVERED
              </p>
            </div>

            <p className="text-sm text-[#DCEBCF] leading-relaxed max-w-sm font-medium">
              Nutritious, chef-curated veg and non-veg healthy meals delivered
              fresh to your desk or doorstep across Mumbai. Every bowl macro-counted,
              zero preservatives, cooked fresh each morning.
            </p>

            {/* Handwritten script note matching wireframe */}
            <div className="pt-2">
              <span className="font-script text-2xl text-[#FFF7E8] font-bold rotate-[-2deg] inline-block">
                Good Food Busy Life <span className="text-[#F47738]">Sorted!</span> ✨
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FitBowl on Instagram"
                className="w-9 h-9 rounded-full bg-[#1F4E3E] text-[#DCEBCF] hover:text-[#F47738] hover:bg-[#2B6A56] flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FitBowl on Facebook"
                className="w-9 h-9 rounded-full bg-[#1F4E3E] text-[#DCEBCF] hover:text-[#F47738] hover:bg-[#2B6A56] flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.679 5H18V0h-3.808C10.59 0 9 1.583 9 4.615V8z"/>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FitBowl on YouTube"
                className="w-9 h-9 rounded-full bg-[#1F4E3E] text-[#DCEBCF] hover:text-[#F47738] hover:bg-[#2B6A56] flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FitBowl on LinkedIn"
                className="w-9 h-9 rounded-full bg-[#1F4E3E] text-[#DCEBCF] hover:text-[#F47738] hover:bg-[#2B6A56] flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#DCEBCF]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-[#DCEBCF]/80">
              <li>
                <a
                  href="#benefits"
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Why FitBowl</span>
                </a>
              </li>
              <li>
                <a
                  href="#menu"
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>14 Signature Bowls</span>
                </a>
              </li>
              <li>
                <a
                  href="#plans"
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Plans & Pricing</span>
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>How It Works</span>
                </a>
              </li>
              <li>
                <a
                  href="#reviews"
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>Customer Reviews</span>
                </a>
              </li>
              <li>
                <a
                  href="#faqs"
                  className="hover:text-white transition-colors flex items-center gap-1 group"
                >
                  <span>FAQs</span>
                </a>
              </li>
              <li>
                <a
                  href="#trial-form"
                  className="text-[#F47738] font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>Claim Free Trial</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Service Areas Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#DCEBCF]">
              Mumbai Hubs
            </h4>
            <ul className="space-y-2.5 text-sm text-[#DCEBCF]/80">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F47738] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Andheri</span>
                  <span className="text-xs text-[#DCEBCF]/70">East, West & SEEPZ</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F47738] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Bandra</span>
                  <span className="text-xs text-[#DCEBCF]/70">West & BKC Complex</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F47738] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Powai</span>
                  <span className="text-xs text-[#DCEBCF]/70">Hiranandani & IIT Area</span>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F47738] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Lower Parel</span>
                  <span className="text-xs text-[#DCEBCF]/70">One World, Mills & Worli</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact & Hours Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#DCEBCF]">
              Contact Us
            </h4>
            <ul className="space-y-3 text-sm text-[#DCEBCF]/80">
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#F47738] shrink-0" />
                <a
                  href="mailto:hello@fitbowl.com"
                  className="hover:text-white transition-colors font-medium"
                >
                  hello@fitbowl.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#F47738] shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="hover:text-white transition-colors font-medium"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#F47738] shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <span className="text-white font-bold block">Kitchen Deliveries:</span>
                  <span>Lunch: 12:00 PM – 2:00 PM</span>
                  <br />
                  <span>Dinner: 7:00 PM – 9:00 PM</span>
                  <br />
                  <span className="text-[#F47738] font-bold">Mon – Sat (Closed Sundays)</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCEBCF]/60">
          <p className="text-center sm:text-left">
            © 2026 FitBowl. All rights reserved. Cooked fresh daily in Mumbai.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>FSSAI Lic. 11524026000123</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-[#F47738] fill-current" /> for healthy Mumbaikars
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
