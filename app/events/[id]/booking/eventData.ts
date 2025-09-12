// Import from the centralized events library
import { allEvents } from '@/lib/events'

// Export for backward compatibility
export const allEventsData = allEvents

// Seating areas data for booking
export const seatingAreas = [
  {
    id: 'vip',
    name: 'VIP Premium',
    description: 'Exclusive seating with premium amenities and services',
    icon: 'Crown',
    price: 3500,
    originalPrice: 4000,
    available: 12,
    total: 20,
    color: 'from-purple-600 to-purple-800',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    perks: [
      'Premium cushioned seating',
      'Complimentary welcome drink',
      'Dedicated server',
      'Priority entry',
      'Exclusive merchandise'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Seating',
    description: 'Comfortable seating with enhanced amenities',
    icon: 'Star',
    price: 2500,
    originalPrice: 3000,
    available: 25,
    total: 40,
    color: 'from-blue-600 to-blue-800',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    perks: [
      'Comfortable seating',
      'Welcome refreshments',
      'Event program booklet',
      'Priority parking',
      'Photo opportunity'
    ]
  },
  {
    id: 'standard',
    name: 'Standard Seating',
    description: 'Great view with standard amenities',
    icon: 'Users',
    price: 1500,
    originalPrice: 2000,
    available: 45,
    total: 80,
    color: 'from-green-600 to-green-800',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    perks: [
      'Standard seating',
      'Event program',
      'Access to food court',
      'Restroom facilities',
      'Parking available'
    ]
  },
  {
    id: 'traditional',
    name: 'Traditional Floor',
    description: 'Authentic cultural experience with floor seating',
    icon: 'Sofa',
    price: 1000,
    originalPrice: 1200,
    available: 30,
    total: 50,
    color: 'from-orange-600 to-orange-800',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    perks: [
      'Traditional floor seating',
      'Cultural experience',
      'Event program',
      'Basic amenities',
      'Authentic atmosphere'
    ]
  }
]