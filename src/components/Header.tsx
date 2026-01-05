import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import logo from "~/assets/logo.png";

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Overview', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Github', href: 'https://github.com/hemanth5544/chitram', external: true },
  ];

  const isActive = (href: string) => router.asPath === href;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
              <Image 
                src={logo} 
                alt="Chitram Logo" 
                fill
                className="object-cover"
              />
            </div>
            <span className="text-2xl md:text-3xl font-bold text-gray-900">
              Snap<span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">ify</span>
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-gray-600 hover:text-orange-500 font-medium transition-colors rounded-lg hover:bg-gray-50"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 font-medium transition-colors rounded-lg ${
                    isActive(item.href)
                      ? 'text-orange-500 bg-orange-50'
                      : 'text-gray-600 hover:text-orange-500 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
          
          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link
              href="/sign-in"
              className="px-4 py-2 text-gray-700 font-medium hover:text-orange-500 transition-colors rounded-lg hover:bg-gray-50"
            >
              Sign In
            </Link>
            <Link
              href="/videos"
              className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all shadow-md hover:shadow-lg"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-gray-600 hover:text-orange-500 font-medium transition-colors rounded-lg hover:bg-gray-50"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 font-medium transition-colors rounded-lg ${
                      isActive(item.href)
                        ? 'text-orange-500 bg-orange-50'
                        : 'text-gray-600 hover:text-orange-500 hover:bg-gray-50'
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              ))}
              <div className="pt-4 space-y-2">
                <Link
                  href="/sign-in"
                  className="block w-full px-4 py-3 text-center text-gray-700 font-medium border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/videos"
                  className="block w-full px-4 py-3 text-center bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all shadow-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
