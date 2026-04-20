//components/ui/Footer.tsx

// components/ui/Footer.tsx
'use client'

import Link from 'next/link'
import {
  ArrowUpRight,
  Globe,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  ShieldCheck,
} from 'lucide-react'
import { SiFacebook, SiInstagram } from 'react-icons/si'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const collections = [
    { label: 'Skincare', href: '/collections/skincare' },
    { label: 'Fragrances', href: '/collections/fragrances' },
    { label: 'New Arrivals', href: '/collections/new-arrivals' },
  ]

  const customerCare = [
    { label: 'Contact Us', href: '/contact' },
    { label: 'Order Support', href: '/support/orders' },
    { label: 'Shipping Information', href: '/shipping' },
    { label: 'Returns & Exchanges', href: '/returns' },
  ]

  const legalLinks = [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Accessibility', href: '/accessibility' },
    { label: 'Sitemap', href: '/sitemap' },
  ]

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#050505] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-6 sm:px-8 lg:px-10">
        <div className="grid gap-4 border-b border-white/10 pb-6 md:grid-cols-3">
          <a
            href="mailto:gordonmsyokege@gmail.com"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.05]"
          >
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white/90">
              <Mail className="h-4 w-4" />
              Email
            </div>
            <p className="text-sm text-white/65 transition group-hover:text-white/90">
              gordonmsyokege@gmail.com
            </p>
          </a>

          <a
            href="tel:+255757374368"
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.05]"
          >
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white/90">
              <Phone className="h-4 w-4" />
              Phone
            </div>
            <p className="text-sm text-white/65 transition group-hover:text-white/90">
              +255 757 374 368
            </p>
          </a>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white/90">
              <MapPin className="h-4 w-4" />
              Location
            </div>
            <p className="text-sm text-white/65">
              Kariakoo Msimbazi A, Dar es Salaam
            </p>
          </div>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.35fr_repeat(4,1fr)]">
          <div className="max-w-md">
            <div className="mb-4">
              <h2 className="text-2xl font-semibold tracking-[0.08em] text-white">
                Dubai Vipodozi
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-white/45">
                <span>Est. 2024</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>Dar es Salaam</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>Premium Beauty</span>
              </div>
            </div>

            <p className="mb-6 text-sm leading-7 text-white/65">
              Premium skincare and fragrance curated for performance, elegance,
              and modern aesthetics. Discover elevated beauty essentials with a
              refined shopping experience designed for confident everyday luxury.
            </p>

            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white/90">
                <Globe className="h-4 w-4" />
                Local Presence
              </div>

              <div className="space-y-3 text-sm text-white/65">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
                  <span>Kariakoo Msimbazi A, Dar es Salaam</span>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
                  <a
                    href="mailto:gordonmsyokege@gmail.com"
                    className="transition hover:text-white"
                  >
                    gordonmsyokege@gmail.com
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/50" />
                  <a
                    href="tel:+255757374368"
                    className="transition hover:text-white"
                  >
                    +255 757 374 368
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-white/90">
              Collections
            </h3>

            <ul className="space-y-3">
              {collections.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-white/90">
              Customer Care
            </h3>

            <ul className="space-y-3">
              {customerCare.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-white/90">
              Connect
            </h3>

            <div className="space-y-3">
              <a
                href="https://www.instagram.com/dubai_vipodozi10?igsh=ZDFxM2FmOHRxOHIx&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
              >
                <SiInstagram className="h-4 w-4" />
                <span>Instagram</span>
              </a>

              <a
                href="https://www.facebook.com/share/18tBhZuBex/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
              >
                <SiFacebook className="h-4 w-4" />
                <span>Facebook</span>
              </a>

              <a
                href="https://wa.me/255757374368"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-2 text-sm text-white/65 transition hover:text-white"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                Client Contact
              </p>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Reach us directly for order support, product inquiries, and
                premium beauty recommendations.
              </p>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-[0.22em] text-white/90">
              Newsletter
            </h3>

            <p className="mb-4 text-sm leading-7 text-white/65">
              Get curated drops, private offers, and new beauty releases from
              Dubai Vipodozi.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/30 focus:bg-white/[0.06]"
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/30 hover:bg-white/10"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4">
              <p className="text-sm text-white/55">
                © {currentYear} Dubai Vipodozi. All rights reserved.
              </p>

              {/* OLD GDS LOGIC KEPT HERE */}
              <Link
                href="/admin"
                className="group flex w-fit items-center gap-3 rounded-md border border-white/10 bg-white/5 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/10"
              >
                <ShieldCheck
                  size={14}
                  className="transition-transform group-hover:rotate-12"
                />
                GDS System Access
              </Link>
            </div>

            <div className="flex flex-col items-start gap-4 lg:items-end">
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {legalLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-white/55 transition hover:text-white"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <p className="text-sm text-white/55">
                Engineered by{' '}
                <Link
                  href="#"
                  className="font-medium text-white/90 transition hover:text-white"
                >
                  CS SOFTWARE Builders
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
