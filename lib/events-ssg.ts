// Static Site Generation utilities for events
import { allEvents, type Event } from './events'

// Pre-computed static data for SSG
export const staticEventsData = {
  allEvents,
  totalCount: allEvents.length,
  categories: Array.from(new Set(allEvents.map(event => event.category))).sort(),
  days: Array.from(new Set(allEvents.map(event => event.day))).sort((a, b) => {
    const dayOrder = { 
      "Day 1": 1, "Day 2": 2, "Day 3": 3, "Day 4": 4, "Day 5": 5, "Day 6": 6, "Day 7": 7, 
      "Day 8": 8, "Day 9": 9, "Day 10": 10, "Day 11": 11, "Day 12": 12, "Day 13": 13, 
      "Day 14": 14, "Concluding Day": 15 
    }
    return (dayOrder[a as keyof typeof dayOrder] || 999) - (dayOrder[b as keyof typeof dayOrder] || 999)
  }),
  featuredEvents: allEvents.filter(event => event.featured),
  eventsByDay: allEvents.reduce((acc, event) => {
    if (!acc[event.day]) {
      acc[event.day] = []
    }
    acc[event.day].push(event)
    return acc
  }, {} as Record<string, Event[]>),
  eventsByCategory: allEvents.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = []
    }
    acc[event.category].push(event)
    return acc
  }, {} as Record<string, Event[]>)
}

// Generate static paths for all events
export function generateStaticEventPaths() {
  return allEvents.map(event => ({
    params: { id: event.id.toString() }
  }))
}

// Get static props for events pages
export function getStaticEventsProps() {
  return {
    props: {
      staticEventsData
    },
    // Revalidate every hour in production
    revalidate: 3600
  }
}

// Get static props for individual event pages
export function getStaticEventProps(eventId: string) {
  const event = allEvents.find(e => e.id.toString() === eventId)
  
  if (!event) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      event,
      relatedEvents: allEvents
        .filter(e => e.id !== event.id && e.category === event.category)
        .slice(0, 3)
    },
    revalidate: 3600
  }
}

// Cache key generators for different data views
export const cacheKeys = {
  events: 'events:all',
  eventsByDay: (day: string) => `events:day:${day}`,
  eventsByCategory: (category: string) => `events:category:${category}`,
  featuredEvents: 'events:featured',
  eventById: (id: number) => `event:${id}`
}

// Cache duration in seconds
export const cacheDurations = {
  events: 3600, // 1 hour
  featured: 1800, // 30 minutes
  individual: 7200 // 2 hours
}
