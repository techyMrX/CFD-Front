import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-indigo-600 text-white">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Shield className="h-8 w-8" />
            <span className="ml-2 text-xl font-bold">SafetyNet</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <a href="#home" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Home</a>
              <a href="#identify" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Identify</a>
              <a href="#emergency" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Emergency</a>
              <a href="#contacts" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-500">Contacts</a>
              <button className="bg-white text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-50">
                Login
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-indigo-500"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">Home</a>
              <a href="#identify" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">Identify</a>
              <a href="#emergency" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">Emergency</a>
              <a href="#contacts" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-500">Contacts</a>
              <button className="w-full text-left bg-white text-indigo-600 px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-50">
                Login
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}