import { useState, type JSX } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubscribed(true);
    setEmail('');
  };

  const footerLinks = {
    shop: [
      { label: 'All Products', href: '/products' },
      { label: 'New Arrivals', href: '/products?sort=newest' },
      { label: 'Best Sellers', href: '/products?sort=popular' },
      { label: 'Sale', href: '/products?sale=true' },
    ],
    support: [
      { label: 'Help Center', href: '/faq' },
      { label: 'Shipping Info', href: '/shipping' },
      { label: 'Returns & Exchanges', href: '/returns' },
      { label: 'Track Order', href: '/track-order' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Press', href: '/press' },
      { label: 'Sustainability', href: '/sustainability' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Accessibility', href: '/accessibility' },
    ],
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'facebook', href: 'https://www.facebook.com/tminnella/' },
    { name: 'X', icon: 'x', href: 'https://x.com/tjminnella' },
    { name: 'Instagram', icon: 'instagram', href: 'https://www.instagram.com/tminnella66/' },
    { name: 'Pinterest', icon: 'pinterest', href: '#' },
    { name: 'YouTube', icon: 'youtube', href: '#' },
  ];

  const renderSocialIcon = (icon: string) => {
    const iconPaths: Record<string, JSX.Element> = {
      facebook: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
      twitter: (
        <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
      ),
      x: (
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2z" />
      ),
      pinterest: (
        <path d="M8 14.5c0-1.5.5-2.5 2-2.5.5 0 1 .5 1 1 0 1-.5 1.5-1 2-.5.5-.5 1-.5 1.5 0 1 1 1.5 2 1.5 1.5 0 2.5-1.5 2.5-4 0-2.5-1.5-5-5-5-4 0-6 3-6 6.5 0 2.5 1 4.5 3 4.5 1.5 0 2.5-1 2.5-2.5 0-1-.5-1.5-1-1.5-.5 0-1 .5-1 1.5 0 .5.5 1.5 1.5 1.5h.5c1.5 0 2.5-1 2.5-3 0-1.5-1-3-3-3-2.5 0-4 2-4 5" />
      ),
      youtube: (
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33zM9.75 15.02l5.75-3.27-5.75-3.27z" />
      ),
    };

    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        {iconPaths[icon] || iconPaths.facebook}
      </svg>
    );
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">ShopLogo</h3>
            <p className="text-slate-300 mb-6 max-w-sm">
              Welcome to my e-commerce store! I sell artwork and vintage items.
            </p>

            <div className="flex items-center gap-4 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={social.name}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white transition-all duration-200"
                >
                  {renderSocialIcon(social.icon)}
                </a>
              ))}
            </div>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">
                Contact me.
              </h4>
              <p className="text-sm text-slate-400">
                Get in touch for inquiries, collaborations, or any questions you may have.
              </p>

              {isSubscribed ? (
                <div className="flex items-center gap-2 text-green-400 transition-opacity duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm font-medium">Thanks for subscribing!</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 min-w-0 px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap"
                  >
                    {isLoading ? (
                      <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        />
                      </svg>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </div>
              )}
            </form>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400 text-center md:text-left">
              © {new Date().getFullYear()} Ownded by Thomas Minnella. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <span className="text-sm text-slate-400">I accept:</span>
              <div className="flex items-center gap-3">
                {/*['visa', 'mastercard', 'amex', 'paypal'].map((payment) => (*/}
                {['cash', 'cash app', 'venmo'].map((payment) => (
                  <div
                    key={payment}
                    className="w-20 h-6 bg-slate-800 rounded flex items-center justify-center text-xs text-slate-400 font-medium uppercase"
                  >
                    {payment.slice(0, 8)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
