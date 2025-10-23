'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Linkedin, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">WashingtonTaxDesk</h3>
            <p className="text-sm mb-4">
              Professional Washington State tax guidance and resources for individuals, 
              businesses, and professional firms.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-white transition-colors">
                  Resource Library
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-white transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* For Clients */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Clients</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/individuals" className="hover:text-white transition-colors">
                  Individuals
                </Link>
              </li>
              <li>
                <Link href="/small-business" className="hover:text-white transition-colors">
                  Small Businesses
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="hover:text-white transition-colors">
                  Enterprise Solutions
                </Link>
              </li>
              <li>
                <Link href="/accounting-firms" className="hover:text-white transition-colors">
                  Accounting Firms
                </Link>
              </li>
              <li>
                <Link href="/law-firms" className="hover:text-white transition-colors">
                  Law Firms
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Seattle, Washington</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="mailto:info@washingtontaxdesk.com" className="hover:text-white transition-colors">
                  info@washingtontaxdesk.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="tel:+12065551234" className="hover:text-white transition-colors">
                  (206) 555-1234
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm">
            <p>
              © {currentYear} WashingtonTaxDesk.com. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Disclaimer: This website provides general tax information and should not be considered 
            legal or professional tax advice. Please consult with qualified tax professionals for 
            specific guidance.
          </p>
        </div>
      </div>
    </footer>
  );
}
