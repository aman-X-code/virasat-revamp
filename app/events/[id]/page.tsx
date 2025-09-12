import { allEvents, getEventById } from '@/lib/events'
import EventDetailsClient from './EventDetailsClient'
import { getCachedEvent, preloadEventData } from '@/lib/event-preloader'
import { notFound } from 'next/navigation'

// Generate static params for all event IDs
export async function generateStaticParams() {
  return allEvents.map(event => ({
    id: event.id.toString(),
  }))
}

interface PageProps {
  params: {
    id: string
  }
}

export default function EventDetailsPage({ params }: PageProps) {
  const eventId = parseInt(params.id)
  
  // Try to get cached event data first for better performance
  let eventData = getCachedEvent(eventId)
  
  // If not cached, find in events array and cache it
  if (!eventData) {
    eventData = getEventById(eventId)
    if (eventData) {
      preloadEventData(eventId) // Cache for future use
    }
  }
  
  // Return 404 if event not found
  if (!eventData) {
    notFound()
  }

  return <EventDetailsClient eventData={eventData} />
}
