'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [audienceDropdownOpen, setAudienceDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-wa-blue-600 to-wa-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">WT</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">WashingtonTaxDesk</h1>
              <p className="text-xs text-gray-600">Professional Tax Solutions</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-wa-blue-600 transition-colors">
              Home
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setAudienceDropdownOpen(!audienceDropdownOpen)}
                className="flex items-center space-x-1 text-gray-700 hover:text-wa-blue-600 transition-colors"
              >
                <span>For You</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {audienceDropdownOpen && (
                <div className="absolute top-full mt-2 w-56 bg-white shadow-lg rounded-lg py-2 border">
                  <Link
                    href="/individuals"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setAudienceDropdownOpen(false)}
                  >
                    Individuals
                  </Link>
                  <Link
                    href="/small-business"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setAudienceDropdownOpen(false)}
                  >
                    Small Businesses
                  </Link>
                  <Link
                    href="/enterprise"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setAudienceDropdownOpen(false)}
                  >
                    Enterprise
                  </Link>
                  <Link
                    href="/accounting-firms"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setAudienceDropdownOpen(false)}
                  >
                    Accounting Firms
                  </Link>
                  <Link
                    href="/law-firms"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50"
                    onClick={() => setAudienceDropdownOpen(false)}
                  >
                    Law Firms
                  </Link>
                </div>
              )}
            </div>

            <Link href="/resources" className="text-gray-700 hover:text-wa-blue-600 transition-colors">
              Resources
            </Link>
            
            <Link href="/chat" className="text-gray-700 hover:text-wa-blue-600 transition-colors">
              AI Assistant
            </Link>
            
            <Link href="/about" className="text-gray-700 hover:text-wa-blue-600 transition-colors">
              About
            </Link>
            
            <Link href="/contact" className="text-gray-700 hover:text-wa-blue-600 transition-colors">
              Contact
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/chat"
              className="px-6 py-2 bg-gradient-to-r from-wa-blue-600 to-wa-green-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link
              href="/"
              className="block text-gray-700 hover:text-wa-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/individuals"
              className="block text-gray-700 hover:text-wa-blue-600 pl-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Individuals
            </Link>
            <Link
              href="/small-business"
              className="block text-gray-700 hover:text-wa-blue-600 pl-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Small Businesses
            </Link>
            <Link
              href="/enterprise"
              className="block text-gray-700 hover:text-wa-blue-600 pl-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Enterprise
            </Link>
            <Link
              href="/accounting-firms"
              className="block text-gray-700 hover:text-wa-blue-600 pl-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Accounting Firms
            </Link>
            <Link
              href="/law-firms"
              className="block text-gray-700 hover:text-wa-blue-600 pl-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Law Firms
            </Link>
            <Link
              href="/resources"
              className="block text-gray-700 hover:text-wa-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              href="/chat"
              className="block text-gray-700 hover:text-wa-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              AI Assistant
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-wa-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-gray-700 hover:text-wa-blue-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/chat"
              className="block px-6 py-2 bg-gradient-to-r from-wa-blue-600 to-wa-green-600 text-white rounded-lg text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
