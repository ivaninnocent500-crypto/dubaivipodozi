//app/page.tsx
'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useProducts } from '@/hooks/useProducts'
import ProductCard from '@/components/product/ProductCard'
import Button from '@/ui/Button'
import Container from '@/ui/Container'
import { useQuizStore } from '@/store/quizStore'
import { trackEvent } from '@/lib/analytics/track'

const promoCards = [
  {
    id: 1,
    title: 'Meet the Latest',
    description: 'Brand-new beauty just dropped. What are you waiting for?',
    cta: 'SHOP NOW',
    href: '/products',
    image: 'hero-new.jpg.png',
    bg: 'bg-[#0a74d8]',
    text: 'text-white',
  },
  {
    id: 2,
    title: 'New from Sol de Janeiro',
    description: 'Discover paradise with these gourmand and fruity-floral fragrance mists.',
    cta: 'SHOP NOW',
    href: '/fragrance',
    image: 'glow-now.jpg.png',
    bg: 'bg-[#f8bd42]',
    text: 'text-black',
  },
  {
    id: 3,
    title: 'Discover What’s New',
    description: 'Shop fresh picks and exclusive drops in skincare, body and fragrance.',
    cta: 'SHOP NOW',
    href: '/offers',
    image: 'hero-okay.jpg.png',
    bg: 'bg-[#16385f]',
    text: 'text-white',
  },
]

const beautyOffers = [
  {
    id: 1,
    title: 'Choose a Free Skincare Trial Size',
    description:
      'Get a mini cleanser, vitamin C serum, or hydrating face cream from top skincare brands.',
    finePrint1: 'Free with $30 skincare purchase*',
    finePrint2: 'Members only.',
    finePrint3: 'Online only. Terms apply.',
    href: '/offers',
    image: 'offer-skincare-1.jpg.png',
  },
  {
    id: 2,
    title: 'Receive a Skincare Sample Set',
    description:
      'Enjoy a curated trial set including toner, serum, and moisturizer with your purchase.',
    finePrint1: 'Online only',
    finePrint2: 'While quantities last.',
    finePrint3: '*Exclusions apply.',
    href: '/offers',
    image: 'offer-skincare-2.jpg.png',
  },
  {
    id: 3,
    title: 'Enhance Your Natural Shape',
    description:
      'Discover firming creams and body treatments designed to improve skin elasticity and enhance natural curves.',
    finePrint1: 'Selected products only',
    finePrint2: 'Limited-time offer',
    finePrint3: 'Terms apply.',
    href: '/offers',
    image: 'offer-body-care.jpg.png',
  },
]

function SectionHeader({
  title,
  actionLabel,
  actionHref,
}: {
  title: string
  actionLabel?: string
  actionHref?: string
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <h2 className="text-[22px] font-semibold tracking-[-0.02em] text-black">
        {title}
      </h2>

      {actionLabel && actionHref ? (
        <Link href={actionHref} className="text-[13px] font-medium text-sky-700">
          {actionLabel}
        </Link>
      ) : (
        <div />
      )}
    </div>
  )
}

export default function HomePage() {
  const { products, loading, error } = useProducts(60000)
  const setQuizOpen = useQuizStore((state) => state.setOpen)

  const featuredProducts = products.slice(0, 12)

  const newArrivals = [...products]
    .sort((a, b) => {
      const aTime = a.created_at ? new Date(a.created_at).getTime() : 0
      const bTime = b.created_at ? new Date(b.created_at).getTime() : 0
      return bTime - aTime
    })
    .slice(0, 12)

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-gray-400">Loading collection...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-red-500">Failed to load products. Please try again later.</div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-white">
      {/* HERO PROMO CARDS - HORIZONTAL MOBILE SCROLL */}
      <section className="bg-white pt-3 pb-5">
        <div className="px-1.5 sm:px-4">
          <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {promoCards.map((card) => (
              <Link
                key={card.id}
                href={card.href}
                className="snap-start shrink-0 w-[calc(100vw-22px)] max-w-[292px] sm:max-w-[360px]"
              >
                <article className="overflow-hidden rounded-md border border-[#e5e5e5] bg-white">
                  <div className="relative h-[134px] bg-gray-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className={`${card.bg} ${card.text} px-3 py-3 min-h-[92px]`}>
                    <h3 className="text-[13px] font-semibold leading-tight">{card.title}</h3>
                    <p className="mt-1 text-[11px] leading-[1.35] opacity-95">
                      {card.description}
                    </p>
                    <div className="mt-3 text-[12px] font-semibold">{card.cta} ▸</div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CHOSEN FOR YOU */}
      {featuredProducts.length > 0 && (
        <section className="bg-white pb-5">
          <div className="px-3 sm:px-4">
            <SectionHeader title="Chosen For You" />

            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} layout="horizontal" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BEAUTY OFFERS */}
      <section className="bg-white pb-5">
        <div className="px-3 sm:px-4">
          <SectionHeader title="Beauty Offers (19)" actionLabel="View all" actionHref="/offers" />

          <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {beautyOffers.map((offer) => (
              <Link
                key={offer.id}
                href={offer.href}
                className="shrink-0 w-[186px] rounded-md border border-[#e7e7e7] bg-white overflow-hidden"
              >
                <article className="flex h-full flex-col">
                  <div className="relative h-[138px] bg-white p-4">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  <div className="px-3 pb-3">
                    <h3 className="text-[12px] font-semibold leading-[1.3] text-black min-h-[32px]">
                      {offer.title}
                    </h3>

                    <p className="mt-1 text-[11px] leading-[1.35] text-black">
                      {offer.description}
                    </p>

                    <div className="mt-2 space-y-[2px] text-[10px] leading-[1.3] text-gray-500">
                      <p>{offer.finePrint1}</p>
                      <p>{offer.finePrint2}</p>
                      <p>{offer.finePrint3}</p>
                    </div>

                    <div className="mt-4 flex justify-center">
                      <span className="inline-flex h-8 min-w-[92px] items-center justify-center rounded-full border border-black px-5 text-[12px] font-medium text-black">
                        Apply
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {newArrivals.length > 0 && (
        <section className="bg-white pb-8">
          <div className="px-3 sm:px-4">
            <SectionHeader title="New Arrivals" actionLabel="Show more" actionHref="/products" />

            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} layout="horizontal" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* OPTIONAL LOWER SECTION - KEEP IF YOU STILL WANT QUIZ */}
      <section className="bg-[#F9F9F9] py-16 border-y border-gray-100">
        <Container className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl mb-6 italic text-black">
              Discover Your Routine
            </h2>

            <p className="text-gray-500 mb-10 max-w-xl mx-auto leading-relaxed">
              Not sure which treatment is right for your skin type? Take our clinical quiz
              for a personalized selection.
            </p>

            <Button
              onClick={() => {
                trackEvent('discover_routine_click')
                setQuizOpen(true)
              }}
              className="px-12 py-4 text-xs tracking-widest uppercase font-bold"
            >
              Start Skin Quiz
            </Button>
          </motion.div>
        </Container>
      </section>
    </main>
  )
}
