import { useState, useEffect, useCallback, useMemo } from 'react'
import { getEventsByDay, getCategories, getDays, type Event, type EventsFilters, type EventsResponse } from '@/lib/events'

interface UseEventsOptions {
  initialPage?: number
  pageSize?: number
  filters?: EventsFilters
  enableInfiniteScroll?: boolean
}

interface UseEventsReturn {
  events: Event[]
  eventsByDay: Record<string, Event[]>
  loading: boolean
  loadingMore: boolean
  hasMore: boolean
  currentPage: number
  totalPages: number
  totalCount: number
  error: string | null
  loadMore: () => void
  refresh: () => void
  updateFilters: (filters: EventsFilters) => void
  categories: string[]
  days: string[]
}

export function useEvents(options: UseEventsOptions = {}): UseEventsReturn {
  const {
    initialPage = 1,
    pageSize = 2, // 2 days at a time
    filters = {},
    enableInfiniteScroll = true
  } = options

  // State management
  const [eventsByDay, setEventsByDay] = useState<Record<string, Event[]>>({})
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [currentFilters, setCurrentFilters] = useState<EventsFilters>(filters)

  // Memoized computed values
  const events = useMemo(() => Object.values(eventsByDay).flat(), [eventsByDay])
  const categories = useMemo(() => getCategories(), [])
  const days = useMemo(() => getDays(), [])

  // Load events function
  const loadEvents = useCallback(async (page: number, reset: boolean = true) => {
    if (loadingMore && !reset) return

    try {
      setError(null)
      
      if (reset) {
        setLoading(true)
      } else {
        setLoadingMore(true)
      }

      const response = await getEventsByDay(page, pageSize, currentFilters)
      
      if (reset) {
        setEventsByDay(response.eventsByDay)
        setCurrentPage(1)
      } else {
        setEventsByDay(prev => ({ ...prev, ...response.eventsByDay }))
      }
      
      setTotalPages(response.totalPages)
      setHasMore(response.hasMore)
      setTotalCount(response.totalCount)
      setCurrentPage(page)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load events')
      console.error('Error loading events:', err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }, [currentFilters, pageSize, loadingMore])

  // Load more events
  const loadMore = useCallback(() => {
    if (hasMore && !loadingMore && enableInfiniteScroll) {
      loadEvents(currentPage + 1, false)
    }
  }, [hasMore, loadingMore, currentPage, loadEvents, enableInfiniteScroll])

  // Refresh events
  const refresh = useCallback(() => {
    loadEvents(1, true)
  }, [loadEvents])

  // Update filters
  const updateFilters = useCallback((newFilters: EventsFilters) => {
    setCurrentFilters(newFilters)
    setCurrentPage(1)
  }, [])

  // Load initial data
  useEffect(() => {
    loadEvents(initialPage, true)
  }, [loadEvents, initialPage])

  // Reload when filters change
  useEffect(() => {
    if (currentFilters !== filters) {
      loadEvents(1, true)
    }
  }, [currentFilters, filters, loadEvents])

  return {
    events,
    eventsByDay,
    loading,
    loadingMore,
    hasMore,
    currentPage,
    totalPages,
    totalCount,
    error,
    loadMore,
    refresh,
    updateFilters,
    categories,
    days
  }
}

// Hook for individual event data
export function useEvent(eventId: number) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 300))
        
        // In a real app, this would be an API call
        const { allEvents } = await import('@/lib/events')
        const foundEvent = allEvents.find(e => e.id === eventId)
        
        if (foundEvent) {
          setEvent(foundEvent)
        } else {
          setError('Event not found')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load event')
      } finally {
        setLoading(false)
      }
    }

    loadEvent()
  }, [eventId])

  return { event, loading, error }
}

// Hook for featured events
export function useFeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadFeaturedEvents = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 200))
        
        const { getFeaturedEvents } = await import('@/lib/events')
        setEvents(getFeaturedEvents())
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load featured events')
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedEvents()
  }, [])

  return { events, loading, error }
}
