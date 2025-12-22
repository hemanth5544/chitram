import { useRouter } from "next/router";
import logo from "~/assets/logo.png";
import PillNav from './PillNav';

export default function Header() {
  const router = useRouter();
  
  const handleMobileMenuClick = () => {
    // Mobile menu toggle handled by PillNav component
  };

  return (
    <div className="sticky top-0 z-10 w-full bg-black/95 backdrop-blur-md backdrop-saturate-200 border-b border-white/10">
      <div className="relative">
        <PillNav
          logo={logo}
          logoAlt="Chitram Logo"
          items={[
            { label: 'Overview', href: '/' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Github', href: 'https://github.com/MarconLP/chitram' },
            { label: 'Sign In', href: '/sign-in' }
          ]}
          activeHref={router.asPath}
          className="custom-nav"
          ease="power2.easeOut"
          baseColor="#000000"
          pillColor="#ffffff"
          hoveredPillTextColor="#ffffff"
          pillTextColor="#000000"
          onMobileMenuClick={handleMobileMenuClick}
        />
      </div>
    </div>
  );
}
