//lib/analytics/track.ts
export interface TrackingEvent {
  name: string
  properties?: Record<string, any>
  timestamp?: Date
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  // Stub for analytics integration (PostHog/Mixpanel ready)
  console.log(`[Analytics] ${eventName}`, properties)
  
  // Example structure for future integration:
  // if (typeof window !== 'undefined' && window.posthog) {
  // window.posthog.capture(eventName, properties)
  // }
}

export const trackPageView = (page: string) => {
  trackEvent('page_view', { page })
}

export const trackProductImpression = (productId: string, productName: string, position: number) => {
  trackEvent('product_impression', { product_id: productId, product_name: productName, position })
}

export const trackProductClick = (productId: string, productName: string) => {
  trackEvent('product_click', { product_id: productId, product_name: productName })
}
