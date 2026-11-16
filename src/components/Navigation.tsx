import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useRouter } from '../context/RouterContext';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const links = [
  { label: 'Services', href: '/services/ai-automation/', route: '/services/ai-automation' },
  { label: 'AI Agents', href: '/services/ai-agents/', route: '/services/ai-agents' },
  { label: 'US', href: '/us/', route: '/us' },
  { label: 'Calculator', href: '/tools/automation-roi-calculator/', route: '/tools/automation-roi-calculator' },
  { label: 'Pricing', href: '/pricing/', route: '/pricing' },
  { label: 'Blog', href: '/blog/', route: '/blog' },
  { label: 'About', href: '/about/', route: '/about' },
];

export function Navigation({ activeSection: _activeSection, onNavigate }: NavigationProps) {
  const { pathname, navigate } = useRouter();
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [open]);

  const activate = (item: (typeof links)[number]) => {
    setOpen(false);
    if (item.route) {
      navigate(item.href);
    } else {
      navigate(item.href);
    }
  };

  const goHome = () => {
    setOpen(false);
    if (pathname === '/') {
      onNavigate('top');
    } else {
      navigate('/');
    }
  };

  const requestAudit = () => {
    setOpen(false);
    if (pathname === '/') {
      onNavigate('contact');
    } else {
      navigate('/#contact');
    }
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a
          className="brand"
          href="/"
          aria-label="Arenova home"
          onClick={(event) => {
            event.preventDefault();
            goHome();
          }}
        >
          <img src="/arenova-128.webp" width="40" height="40" alt="" />
          <span>Arenova</span>
        </a>

        <nav className="desktop-nav" aria-label="Main Navigation">
          {links.map((item) => {
            const isActive = pathname === item.route;
            return (
              <a
                key={item.label}
                href={item.href}
                aria-current={isActive ? 'page' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  activate(item);
                }}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="site-header__actions">
          <button className="button button--primary header-cta" onClick={requestAudit}>
            Request an audit
          </button>
          <button
            ref={menuButtonRef}
            className="menu-toggle"
            aria-expanded={open}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div id="mobile-navigation" className="mobile-menu" data-open={open || undefined} aria-hidden={!open}>
        <nav aria-label="Mobile Navigation">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                activate(item);
              }}
            >
              {item.label}
            </a>
          ))}
          <button className="button button--primary" onClick={requestAudit}>
            Request an audit
          </button>
        </nav>
      </div>
    </header>
  );
}
