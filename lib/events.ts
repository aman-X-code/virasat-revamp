// Events data management and API simulation
export interface Event {
  id: number;
  day: string;
  date: string;
  title: string;
  description: string;
  image: string;
  time: string;
  location: string;
  seats: string;
  price: string; // Temporarily kept for future use when booking opens
  featured: boolean;
  category: string;
  duration?: string;
  ageRestriction?: string;
}

// All events data (in production, this would come from a database)
// NOTE: Pricing is temporarily disabled - booking will open soon
const rawAllEvents: Event[] = [
  {
    id: 1,
    day: "Day 1",
    date: "4th October, Saturday",
    title: "Festival Inauguration",
    description: "Join us for the grand opening ceremony of Virasat Festival 2024, marking the beginning of our cultural celebration.",
    image: "/images/artists/birju_maharaj.png",
    time: "7:00 PM",
    location: "Main Stage",
    seats: "500 seats available",
    price: "₹2000",
    featured: true,
    category: "Inauguration"
  },
  {
    id: 2,
    day: "Day 1",
    date: "4th October, Saturday",
    title: "Choliya – Folk Form of Uttarakhand",
    description: "Experience the traditional folk dance of Uttarakhand, showcasing the rich cultural heritage of the Himalayan region.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "7:30 PM",
    location: "Heritage Hall",
    seats: "300 seats available",
    price: "₹1500",
    featured: false,
    category: "Folk Dance"
  },
  {
    id: 3,
    day: "Day 1",
    date: "4th October, Saturday",
    title: "Sarod recital by Ustad Amjad Ali Khan",
    description: "An enchanting evening with the legendary sarod maestro, presenting classical ragas and timeless melodies.",
    image: "/images/artists/ring.png",
    time: "8:00 PM",
    location: "Classical Music Hall",
    seats: "250 seats available",
    price: "₹2500",
    featured: true,
    category: "Classical Music"
  },
  {
    id: 4,
    day: "Day 2",
    date: "5th October, Sunday",
    title: "Vintage Car Rally",
    description: "Witness a spectacular display of vintage automobiles showcasing automotive heritage and craftsmanship.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "10:00 AM",
    location: "Campus Grounds",
    seats: "Open Event",
    price: "₹500",
    featured: false,
    category: "Heritage"
  },
  {
    id: 5,
    day: "Day 2",
    date: "5th October, Sunday",
    title: "Bharatnatyam dance by Aarohi Munshi",
    description: "A mesmerizing performance of classical Bharatnatyam by the talented Aarohi Munshi, bringing ancient stories to life.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "6:00 PM",
    location: "Dance Theater",
    seats: "200 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Dance"
  },
  {
    id: 6,
    day: "Day 2",
    date: "5th October, Sunday",
    title: "Sitar recital by Adnan Khan",
    description: "An evening of soulful sitar melodies by the renowned Adnan Khan, exploring the depths of Hindustani classical music.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "7:00 PM",
    location: "Music Pavilion",
    seats: "180 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 7,
    day: "Day 2",
    date: "5th October, Sunday",
    title: "Osman Mir Live",
    description: "A contemporary musical experience with Osman Mir, blending traditional and modern sounds in a unique performance.",
    image: "/images/artists/birju_maharaj.png",
    time: "8:00 PM",
    location: "Open Air Theater",
    seats: "400 seats available",
    price: "₹1200",
    featured: false,
    category: "Contemporary Music"
  },
  {
    id: 8,
    day: "Day 3",
    date: "6th October, Monday",
    title: "Virasat Saadhna",
    description: "Morning spiritual session focusing on traditional practices and meditation techniques from Indian heritage.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "9:00 AM",
    location: "Meditation Hall",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Spiritual"
  },
  {
    id: 9,
    day: "Day 3",
    date: "6th October, Monday",
    title: "Folk performances from Uttarakhand",
    description: "A vibrant showcase of traditional folk music and dance forms from the beautiful state of Uttarakhand.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 10,
    day: "Day 3",
    date: "6th October, Monday",
    title: "Sarod recital by Pratik Shrivastava",
    description: "An intimate performance by the talented sarod artist Pratik Shrivastava, presenting classical compositions.",
    image: "/images/artists/ring.png",
    time: "7:00 PM",
    location: "Classical Music Hall",
    seats: "150 seats available",
    price: "₹1500",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 11,
    day: "Day 3",
    date: "6th October, Monday",
    title: "Hindustani vocal by Pt Ulhas Kashalkar",
    description: "An evening of classical vocal music by the renowned Pandit Ulhas Kashalkar, master of the Gwalior gharana.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "9:00 PM",
    location: "Vocal Music Hall",
    seats: "200 seats available",
    price: "₹2200",
    featured: true,
    category: "Classical Vocal"
  },
  {
    id: 12,
    day: "Day 4",
    date: "7th October, Tuesday",
    title: "Virasat Saadhna",
    description: "Morning spiritual session focusing on traditional practices and meditation techniques from Indian heritage.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "9:00 AM",
    location: "Meditation Hall",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Spiritual"
  },
  {
    id: 13,
    day: "Day 4",
    date: "7th October, Tuesday",
    title: "Sitar recital by Soumitra Thakur",
    description: "An evening of classical sitar music by the talented Soumitra Thakur, exploring traditional ragas and compositions.",
    image: "/images/artists/birju_maharaj.png",
    time: "7:00 PM",
    location: "Classical Music Hall",
    seats: "180 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 14,
    day: "Day 4",
    date: "7th October, Tuesday",
    title: "Vocal recital by Aniruddh Aithal",
    description: "A soulful vocal performance by Aniruddh Aithal, presenting classical Hindustani vocal music with traditional compositions.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "8:00 PM",
    location: "Vocal Music Hall",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 15,
    day: "Day 5",
    date: "8th October, Wednesday",
    title: "Virasat Saadhna",
    description: "Morning spiritual session focusing on traditional practices and meditation techniques from Indian heritage.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "9:00 AM",
    location: "Meditation Hall",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Spiritual"
  },
  {
    id: 16,
    day: "Day 5",
    date: "8th October, Wednesday",
    title: "Slide Guitar concert by Deepak Kshirsagar",
    description: "A unique musical experience with slide guitar maestro Deepak Kshirsagar, blending traditional and contemporary sounds.",
    image: "/images/artists/ring.png",
    time: "6:00 PM",
    location: "Music Pavilion",
    seats: "150 seats available",
    price: "₹1500",
    featured: false,
    category: "Contemporary Music"
  },
  {
    id: 17,
    day: "Day 5",
    date: "8th October, Wednesday",
    title: "Hindustani vocal by Pt. Sajan Mishra",
    description: "An evening of classical vocal music by the legendary Pandit Sajan Mishra, master of the Banaras gharana.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "7:00 PM",
    location: "Vocal Music Hall",
    seats: "250 seats available",
    price: "₹2500",
    featured: true,
    category: "Classical Vocal"
  },
  {
    id: 18,
    day: "Day 5",
    date: "8th October, Wednesday",
    title: "Across the Miles - Folk music and dance from Belarus",
    description: "An international cultural exchange featuring traditional folk music and dance performances from Belarus.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "9:00 PM",
    location: "International Stage",
    seats: "300 seats available",
    price: "₹1200",
    featured: false,
    category: "International Folk"
  },
  {
    id: 19,
    day: "Day 6",
    date: "9th October, Thursday",
    title: "Virasat Saadhna",
    description: "Morning spiritual session focusing on traditional practices and meditation techniques from Indian heritage.",
    image: "/images/artists/birju_maharaj.png",
    time: "9:00 AM",
    location: "Meditation Hall",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Spiritual"
  },
  {
    id: 20,
    day: "Day 6",
    date: "9th October, Thursday",
    title: "Traditional songs of Garhwal, Kumaon, Jaunsar",
    description: "A musical journey through the traditional songs and folk music of Garhwal, Kumaon, and Jaunsar regions.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "250 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 21,
    day: "Day 6",
    date: "9th October, Thursday",
    title: "Vocal recital by Deborshee Bhattacharjee",
    description: "A classical vocal performance by Deborshee Bhattacharjee, presenting traditional Hindustani classical music.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "7:00 PM",
    location: "Vocal Music Hall",
    seats: "180 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 22,
    day: "Day 6",
    date: "9th October, Thursday",
    title: "Sitar recital by Anupma Bhagwat",
    description: "An enchanting sitar performance by Anupma Bhagwat, showcasing the beauty of classical Indian music.",
    image: "/images/artists/ring.png",
    time: "9:00 PM",
    location: "Classical Music Hall",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 23,
    day: "Day 7",
    date: "10th October, Friday",
    title: "Folk forms of Goa",
    description: "Experience the vibrant folk traditions of Goa with traditional music, dance, and cultural performances.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1200",
    featured: false,
    category: "Folk Dance"
  },
  {
    id: 24,
    day: "Day 7",
    date: "10th October, Friday",
    title: "Violin recital by Yadnesh Raikar",
    description: "A mesmerizing violin performance by Yadnesh Raikar, presenting classical compositions with technical brilliance.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "7:00 PM",
    location: "Classical Music Hall",
    seats: "150 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 25,
    day: "Day 7",
    date: "10th October, Friday",
    title: "Vocal recital by Omkar Dadarkar",
    description: "A soulful vocal performance by Omkar Dadarkar, presenting classical Hindustani vocal music with traditional ragas.",
    image: "/images/artists/birju_maharaj.png",
    time: "8:00 PM",
    location: "Vocal Music Hall",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 26,
    day: "Day 7",
    date: "10th October, Friday",
    title: "All women Band from Kirgistan",
    description: "An international performance featuring an all-women band from Kyrgyzstan, showcasing Central Asian musical traditions.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "10:00 PM",
    location: "International Stage",
    seats: "250 seats available",
    price: "₹1500",
    featured: false,
    category: "International Music"
  },
  {
    id: 27,
    day: "Day 8",
    date: "11th October, Saturday",
    title: "Heritage Quiz",
    description: "Test your knowledge of Indian cultural heritage in this engaging quiz competition with exciting prizes.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "10:00 AM",
    location: "Academic Hall",
    seats: "100 seats available",
    price: "₹500",
    featured: false,
    category: "Educational"
  },
  {
    id: 28,
    day: "Day 8",
    date: "11th October, Saturday",
    title: "Folk Theatre – Chakravyuh of Uttarakhand",
    description: "Experience traditional folk theatre from Uttarakhand with the classic tale of Chakravyuh, performed by local artists.",
    image: "/images/artists/ring.png",
    time: "1:00 PM",
    location: "Theatre Hall",
    seats: "200 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Theatre"
  },
  {
    id: 29,
    day: "Day 8",
    date: "11th October, Saturday",
    title: "Vocal recital by Prabhakar Diwakar Kashyap",
    description: "A classical vocal performance by Prabhakar Diwakar Kashyap, presenting traditional Hindustani classical music.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "7:00 PM",
    location: "Vocal Music Hall",
    seats: "180 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 30,
    day: "Day 8",
    date: "11th October, Saturday",
    title: "Violin recital by Dr. N Rajam",
    description: "An evening of classical violin music by the legendary Dr. N Rajam, master of the Carnatic violin tradition.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "9:00 PM",
    location: "Classical Music Hall",
    seats: "200 seats available",
    price: "₹2500",
    featured: true,
    category: "Classical Music"
  },
  {
    id: 31,
    day: "Day 9",
    date: "12th October, Sunday",
    title: "Virasat Super Bike Rally",
    description: "Witness an exciting display of super bikes and motorcycles, showcasing automotive passion and heritage.",
    image: "/images/artists/birju_maharaj.png",
    time: "10:00 AM",
    location: "Campus Grounds",
    seats: "Open Event",
    price: "₹500",
    featured: false,
    category: "Heritage"
  },
  {
    id: 32,
    day: "Day 9",
    date: "12th October, Sunday",
    title: "Folk music and dance from Uttarakhand",
    description: "A vibrant showcase of traditional folk music and dance forms from the beautiful state of Uttarakhand.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 33,
    day: "Day 9",
    date: "12th October, Sunday",
    title: "Santoor recital by Abhay Sopori",
    description: "An enchanting santoor performance by Abhay Sopori, presenting classical compositions with traditional Kashmiri music.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "7:00 PM",
    location: "Classical Music Hall",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 34,
    day: "Day 9",
    date: "12th October, Sunday",
    title: "Usha Uthup Live in Concert",
    description: "An electrifying performance by the legendary Usha Uthup, bringing her unique blend of Indian and Western music.",
    image: "/images/artists/ring.png",
    time: "9:00 PM",
    location: "Main Stage",
    seats: "500 seats available",
    price: "₹3000",
    featured: true,
    category: "Contemporary Music"
  },
  {
    id: 35,
    day: "Day 10",
    date: "13th October, Monday",
    title: "Sit & Draw",
    description: "A creative workshop where participants can sit and draw, expressing their artistic vision inspired by the festival.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "9:00 AM",
    location: "Art Studio",
    seats: "50 seats available",
    price: "₹800",
    featured: false,
    category: "Workshop"
  },
  {
    id: 36,
    day: "Day 10",
    date: "13th October, Monday",
    title: "Saraswati Veena by Ramanna Balachandran",
    description: "A classical veena performance by Ramanna Balachandran, presenting traditional Carnatic music compositions.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "6:00 PM",
    location: "Classical Music Hall",
    seats: "150 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 37,
    day: "Day 10",
    date: "13th October, Monday",
    title: "Flute recital by Pravin Godkhindi",
    description: "A mesmerizing flute performance by Pravin Godkhindi, showcasing the beauty of classical Indian flute music.",
    image: "/images/artists/birju_maharaj.png",
    time: "7:00 PM",
    location: "Music Pavilion",
    seats: "180 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 38,
    day: "Day 10",
    date: "13th October, Monday",
    title: "Hindustani vocal by Jayateerth Mewundi",
    description: "A classical vocal performance by Jayateerth Mewundi, presenting traditional Hindustani classical music.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "9:00 PM",
    location: "Vocal Music Hall",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 39,
    day: "Day 11",
    date: "14th October, Tuesday",
    title: "Workshops",
    description: "Interactive workshops covering various aspects of Indian culture, arts, and traditional practices.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "9:00 AM",
    location: "Workshop Center",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Workshop"
  },
  {
    id: 40,
    day: "Day 11",
    date: "14th October, Tuesday",
    title: "Folk forms",
    description: "A diverse showcase of folk forms from different regions of India, celebrating cultural diversity.",
    image: "/images/artists/ring.png",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 41,
    day: "Day 11",
    date: "14th October, Tuesday",
    title: "Hindustani vocal by Sashwati Mandal",
    description: "A classical vocal performance by Sashwati Mandal, presenting traditional Hindustani classical music.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "7:00 PM",
    location: "Vocal Music Hall",
    seats: "180 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 42,
    day: "Day 11",
    date: "14th October, Tuesday",
    title: "Patiala Kathak Ballet by Manjari Chatturvedi",
    description: "A spectacular Kathak ballet performance by Manjari Chatturvedi, presenting the Patiala gharana style.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "9:00 PM",
    location: "Dance Theater",
    seats: "250 seats available",
    price: "₹2200",
    featured: true,
    category: "Classical Dance"
  },
  {
    id: 43,
    day: "Day 12",
    date: "15th October, Wednesday",
    title: "Workshops",
    description: "Interactive workshops covering various aspects of Indian culture, arts, and traditional practices.",
    image: "/images/artists/birju_maharaj.png",
    time: "9:00 AM",
    location: "Workshop Center",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Workshop"
  },
  {
    id: 44,
    day: "Day 12",
    date: "15th October, Wednesday",
    title: "Folk forms",
    description: "A diverse showcase of folk forms from different regions of India, celebrating cultural diversity.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 45,
    day: "Day 12",
    date: "15th October, Wednesday",
    title: "Kuchipudi dance by Arunima Kumar",
    description: "A classical Kuchipudi dance performance by Arunima Kumar, showcasing the grace and beauty of this traditional form.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "7:00 PM",
    location: "Dance Theater",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Dance"
  },
  {
    id: 46,
    day: "Day 12",
    date: "15th October, Wednesday",
    title: "Hindustani vocal by Parveen Sultana",
    description: "An evening of classical vocal music by the legendary Parveen Sultana, master of the Patiala gharana.",
    image: "/images/artists/ring.png",
    time: "9:00 PM",
    location: "Vocal Music Hall",
    seats: "250 seats available",
    price: "₹2500",
    featured: true,
    category: "Classical Vocal"
  },
  {
    id: 47,
    day: "Day 13",
    date: "16th October, Thursday",
    title: "Workshops",
    description: "Interactive workshops covering various aspects of Indian culture, arts, and traditional practices.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "9:00 AM",
    location: "Workshop Center",
    seats: "100 seats available",
    price: "₹800",
    featured: false,
    category: "Workshop"
  },
  {
    id: 48,
    day: "Day 13",
    date: "16th October, Thursday",
    title: "Folk forms",
    description: "A diverse showcase of folk forms from different regions of India, celebrating cultural diversity.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 49,
    day: "Day 13",
    date: "16th October, Thursday",
    title: "Kathak by Sinjini Kulkarni",
    description: "A classical Kathak dance performance by Sinjini Kulkarni, presenting traditional Kathak compositions.",
    image: "/images/artists/birju_maharaj.png",
    time: "7:00 PM",
    location: "Dance Theater",
    seats: "200 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Dance"
  },
  {
    id: 50,
    day: "Day 13",
    date: "16th October, Thursday",
    title: "Hindustani vocal by Ashwini Bhide",
    description: "A classical vocal performance by Ashwini Bhide, presenting traditional Hindustani classical music.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "9:00 PM",
    location: "Vocal Music Hall",
    seats: "200 seats available",
    price: "₹2000",
    featured: false,
    category: "Classical Vocal"
  },
  {
    id: 51,
    day: "Day 14",
    date: "17th October, Friday",
    title: "Treasure Hunt",
    description: "An exciting treasure hunt activity where participants can explore the festival grounds and discover hidden cultural treasures.",
    image: "/images/artists/zakir_hussain.jpg",
    time: "9:00 AM",
    location: "Campus Grounds",
    seats: "Open Event",
    price: "₹500",
    featured: false,
    category: "Activity"
  },
  {
    id: 52,
    day: "Day 14",
    date: "17th October, Friday",
    title: "Folk forms",
    description: "A diverse showcase of folk forms from different regions of India, celebrating cultural diversity.",
    image: "/images/artists/ring.png",
    time: "6:00 PM",
    location: "Folk Stage",
    seats: "300 seats available",
    price: "₹1000",
    featured: false,
    category: "Folk Music"
  },
  {
    id: 53,
    day: "Day 14",
    date: "17th October, Friday",
    title: "Flute recital by Debopriya & Shuchismita Chatterjee",
    description: "A mesmerizing flute duet performance by Debopriya and Shuchismita Chatterjee, showcasing classical Indian flute music.",
    image: "/images/artists/shubha_mudgal.jpg",
    time: "7:00 PM",
    location: "Music Pavilion",
    seats: "180 seats available",
    price: "₹1800",
    featured: false,
    category: "Classical Music"
  },
  {
    id: 54,
    day: "Day 14",
    date: "17th October, Friday",
    title: "Shaam e Gazal - Ustad Ahmed Mohd Hussain",
    description: "An evening of soulful ghazals by Ustad Ahmed Mohd Hussain, presenting the beauty of Urdu poetry and music.",
    image: "/images/artists/naseeruddin_shah.jpg",
    time: "9:00 PM",
    location: "Vocal Music Hall",
    seats: "250 seats available",
    price: "₹2200",
    featured: true,
    category: "Ghazal"
  },
  {
    id: 55,
    day: "Concluding Day",
    date: "18th October, Saturday",
    title: "Closing Ceremony",
    description: "Join us for the grand closing ceremony of Virasat Festival 2024, celebrating the successful completion of our cultural journey.",
    image: "/images/artists/birju_maharaj.png",
    time: "6:00 PM",
    location: "Main Stage",
    seats: "500 seats available",
    price: "₹2000",
    featured: true,
    category: "Closing"
  },
  {
    id: 56,
    day: "Concluding Day",
    date: "18th October, Saturday",
    title: "Manoj Tiwari Live",
    description: "A grand finale performance by the popular Bhojpuri singer and politician Manoj Tiwari, bringing the festival to a spectacular close.",
    image: "/images/artists/lata_mangeshkar.jpg",
    time: "8:00 PM",
    location: "Main Stage",
    seats: "500 seats available",
    price: "₹3000",
    featured: true,
    category: "Contemporary Music"
  }
];

// Remove cancelled events globally so Events page and details source don't show them
const cancelledTitles = new Set<string>([
  "Festival Inauguration",
  "Vintage Car Rally",
  "Virasat Saadhna",
  "Heritage Quiz",
  "Virasat Super Bike Rally",
  "Sit & Draw",
  "Workshops",
  "Treasure Hunt",
  "Closing Ceremony",
]);

export const allEvents: Event[] = rawAllEvents.filter(e => !cancelledTitles.has(e.title));

// Day order mapping for sorting
export const dayOrder: Record<string, number> = {
  "Day 1": 1, "Day 2": 2, "Day 3": 3, "Day 4": 4, "Day 5": 5, "Day 6": 6, "Day 7": 7,
  "Day 8": 8, "Day 9": 9, "Day 10": 10, "Day 11": 11, "Day 12": 12, "Day 13": 13,
  "Day 14": 14, "Concluding Day": 15
};

// API simulation functions
export interface EventsResponse {
  events: Event[];
  totalCount: number;
  hasMore: boolean;
  currentPage: number;
  totalPages: number;
}

export interface EventsFilters {
  category?: string;
  day?: string;
  featured?: boolean;
  search?: string;
}

// Simulate API delay
const simulateApiDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// Get events with pagination
export async function getEvents(
  page: number = 1,
  pageSize: number = 8, // Show 1-2 days worth of events
  filters: EventsFilters = {}
): Promise<EventsResponse> {
  await simulateApiDelay(300); // Simulate API call

  let filteredEvents = [...allEvents];

  // Apply filters
  if (filters.category && filters.category !== "All") {
    filteredEvents = filteredEvents.filter(event => event.category === filters.category);
  }

  if (filters.day && filters.day !== "All") {
    filteredEvents = filteredEvents.filter(event => event.day === filters.day);
  }

  if (filters.featured !== undefined) {
    filteredEvents = filteredEvents.filter(event => event.featured === filters.featured);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredEvents = filteredEvents.filter(event =>
      event.title.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.category.toLowerCase().includes(searchLower)
    );
  }

  // Sort by day order
  filteredEvents.sort((a, b) => {
    const dayA = dayOrder[a.day] || 999;
    const dayB = dayOrder[b.day] || 999;
    return dayA - dayB;
  });

  const totalCount = filteredEvents.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const events = filteredEvents.slice(startIndex, endIndex);

  return {
    events,
    totalCount,
    hasMore: page < totalPages,
    currentPage: page,
    totalPages
  };
}

// Get events by day with pagination
export async function getEventsByDay(
  page: number = 1,
  daysPerPage: number = 2, // Show 1-2 days at a time
  filters: EventsFilters = {}
): Promise<EventsResponse & { eventsByDay: Record<string, Event[]> }> {
  await simulateApiDelay(300);

  let filteredEvents = [...allEvents];

  // Apply filters
  if (filters.category && filters.category !== "All") {
    filteredEvents = filteredEvents.filter(event => event.category === filters.category);
  }

  if (filters.day && filters.day !== "All") {
    filteredEvents = filteredEvents.filter(event => event.day === filters.day);
  }

  if (filters.featured !== undefined) {
    filteredEvents = filteredEvents.filter(event => event.featured === filters.featured);
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filteredEvents = filteredEvents.filter(event =>
      event.title.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.category.toLowerCase().includes(searchLower)
    );
  }

  // Group events by day
  const eventsByDay: Record<string, Event[]> = {};
  filteredEvents.forEach(event => {
    if (!eventsByDay[event.day]) {
      eventsByDay[event.day] = [];
    }
    eventsByDay[event.day].push(event);
  });

  // Get unique days and sort them
  const uniqueDays = Object.keys(eventsByDay).sort((a, b) => {
    const dayA = dayOrder[a] || 999;
    const dayB = dayOrder[b] || 999;
    return dayA - dayB;
  });

  // Paginate days
  const totalDays = uniqueDays.length;
  const totalPages = Math.ceil(totalDays / daysPerPage);
  const startDayIndex = (page - 1) * daysPerPage;
  const endDayIndex = startDayIndex + daysPerPage;
  const paginatedDays = uniqueDays.slice(startDayIndex, endDayIndex);

  // Get events for paginated days
  const paginatedEventsByDay: Record<string, Event[]> = {};
  const allEventsInPage: Event[] = [];
  
  paginatedDays.forEach(day => {
    paginatedEventsByDay[day] = eventsByDay[day];
    allEventsInPage.push(...eventsByDay[day]);
  });

  return {
    events: allEventsInPage,
    eventsByDay: paginatedEventsByDay,
    totalCount: filteredEvents.length,
    hasMore: page < totalPages,
    currentPage: page,
    totalPages
  };
}

// Get all unique categories
export function getCategories(): string[] {
  const categories = new Set(allEvents.map(event => event.category));
  return ["All", ...Array.from(categories).sort()];
}

// Get all unique days
export function getDays(): string[] {
  const days = new Set(allEvents.map(event => event.day));
  return ["All", ...Array.from(days).sort((a, b) => {
    const dayA = dayOrder[a] || 999;
    const dayB = dayOrder[b] || 999;
    return dayA - dayB;
  })];
}

// Get featured events
export function getFeaturedEvents(): Event[] {
  return allEvents.filter(event => event.featured);
}

// Get event by ID
export function getEventById(id: number): Event | undefined {
  return allEvents.find(event => event.id === id);
}
