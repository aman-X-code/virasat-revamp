"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Star,
  Crown,
  Filter,
  ChevronDown,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Building2,
  Shield,
  UserCheck,
  Briefcase,
  Lightbulb,
  Film,
} from "lucide-react";
import dynamic from "next/dynamic";
import "yet-another-react-lightbox/styles.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  loading: () => (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-red"></div>
    </div>
  ),
  ssr: false,
});

// Helper function to generate Cloudinary URLs
const getCloudinaryImageUrl = (
  folder: string,
  publicId: string,
  width: number = 100
) => {
  return `https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_${width},c_limit/prod/about/${folder}/prod/about/${folder}/${publicId}`;
};

// Common people data - shared across all tabs
const people = {
  "vijay-ranchan": {
    name: "Shri Vijay Ranchan",
    image: "Shri_Vijay_Ranchan",
    folder: "the-virasat-team",
    bio: "Mr. Vijay Ranchan, a 1967 IAS officer (Gujarat cadre, rtd.), has chaired REACH since 2008. A passionate advocate of art and culture, he has authored several books, including the series Bollywood the Rashtrawad, Story of a Bollywood Song: Evolution of Hindi Film Music through Stories, Maachnadar Gaan, and Bollywood Aur Ramkatha, among others.",
  },
  "rajeev-kumar-singh": {
    name: "Shri Rajeev Kumar Singh",
    image: "Shri_Rajeev_Kumar_Singh",
    folder: "the-virasat-team",
    bio: "Mr. R. K Singh has had a distinguished career at the Oil and Natural Gas Corporation, having served ONGC in varied capacities from where he retired as the Executive Director, Human Resource. Mr. Singh has been serving REACH as its General Secretary since 1995.",
  },
  "lokesh-ohri": {
    name: "Dr. Lokesh Ohri",
    image: "Dr._Lokesh_Ohri",
    folder: "the-virasat-team",
    bio: "Dr. Lokesh Ohri, an anthropologist, historian, writer, and cultural activist from Dehradun, has long championed the preservation of the Doon Valley's natural and cultural heritage. He is the founder of Been There Doon That (BTDT), an initiative promoting awareness through walks, lectures, and workshops, and supporting village-based slow tourism across Uttarakhand and Himachal. Associated with REACH since its inception in 1995, Dr. Ohri has been serving as its Treasurer ever since.",
  },
  "data-ram-purohit": {
    name: "Prof. Data Ram Purohit",
    image: "Prof._Data_Ram_Purohit",
    folder: "the-virasat-team",
    bio: "Dr. Dataram Purohit, Professor of English and former Director of the Folk Culture and Performance Centre at HNB Garhwal Central University, received the prestigious Sangeet Natak Akademi Award in 2019 for his work in preserving Uttarakhand's folk music and theatre. He has been instrumental in bringing global recognition to traditions such as Ramman, Chakravyuh, and Nanda Jagar, while also revitalising the Bhalda mask tradition, the Pandav dance of Kedarghati, and other rich folk forms of the region.",
  },
  "devendra-narayan-singh": {
    name: "Shri Devendra Narayan Singh",
    image: "Shri_Devendra_Narayan_Singh",
    folder: "the-virasat-team",
    bio: "Ace senior geo scientist with ONGC. Acknowledged actor, theatre director and script writer. Has been associated with REACH from early times, bringing unique blend of scientific and artistic expertise.",
  },
  "harish-awal": {
    name: "Shri Harish Awal",
    image: "Shri_Harish_Awal",
    folder: "the-virasat-team",
    bio: "Basically an electronic engineer from Thapar institute of technology. An actor, orator, painter and corporate communication expert who retired as executive director from ONGC. He looks after all the digital representation of REACH and Viraast across all platforms.",
  },
  "shankar-kumar-jha": {
    name: "Shri Shankar Kumar Jha",
    image: "Shri_Shankar_Kumar_Jha",
    folder: "the-virasat-team",
    bio: "Primarily a geo physicist with ONGC trained at IIT Delhi. He has deep interest in and knowledge of Indian classical music. He is deeply interested in Hindi and Urdu poetry. He has been a guest speaker in various events and institutions such as ITC and Sangeet Research Academy. He is responsible for the artist selection.",
  },
  "shambhu-shekhar-singh": {
    name: "Dr. Shambhu Shekhar Singh",
    image: "Dr._Shambhu_Shekhar_Singh",
    folder: "the-virasat-team",
    bio: "JNU trained scholar of economics with long teaching association in Delhi University. Deep love for music, painting, crafts and Indian folk forms. The conscience keeper of REACH.",
  },
  "hemant-arora": {
    name: "Shri Hemant Arora",
    image: "Shri_Hemant_Arora",
    folder: "the-virasat-team",
    bio: "Renowned Chartered Accountant of India and Rotarian, social worker and philanthropist. Acts as the financial and legal advisor for REACH, ensuring organizational compliance and fiscal responsibility.",
  },
  "vijayshri-joshi": {
    name: "Ms. Vijayshree Joshi",
    image: "Ms._Vijayshri_Joshi",
    folder: "the-virasat-team",
    bio: "She represents a generation of youth that has grown in the management of arts and large festivals. She advises the state Government on the matters of art and culture.",
  },
  "sunil-verma": {
    name: "Shri Sunil Verma",
    image: "Shri_Sunil_Verma",
    folder: "the-virasat-team",
    bio: "Mr. Sunil has over 30+ years of experience as Editor/Director in Film & Television. As a Freelancer, Creative Consultant and Advisor, he has been associated with Theatre since the age of 9 yrs and has been Working for revitalizing arts, craft, culture & heritage of India. Some of the TV Series where he has worked as Director/ Editor include Chandrakanta, Hum Saath Saath haen, Ek Do Teen, Reporter to name a few. He is Director- Art and Craft, Virasat Festival.",
  },
  "sunaina-prakash-agarwal": {
    name: "Ms. Sunayna Prakash Agarwal",
    image: "Ms._Sunaina_Prakash_Agarwal",
    folder: "the-virasat-team",
    bio: "Smt. Sunayna Prakash is a crucial wheel in organising Virasat every year and serves as Vice President of the Virasat Organising Committee. A distinguished Supreme Court advocate, she is admired for her leadership, vision, and dedication to public service. A senior member of the Supreme Court Bar Association and the Bar Council of Uttar Pradesh, she brings exceptional legal expertise and social sensitivity to every role. She served as an Independent Director of RDPL, a Central Government PSU, and is Chairperson of the Legal Advisory Committee of the Indian Olympic Association, representing India at Paris 2024. She also chairs the Indian Soft Hockey League and is a member of the Advisory Committee of the National Commission for Women.",
  },
  "ashutosh-shandilya": {
    name: "Shri Ashutosh Shandilya",
    image: "Shri_Ashutosh_Shandilya",
    folder: "the-virasat-team",
    bio: "Mr. Ashutosh Shandilya is a General Manager, Geology with ONGC. He has been associated with REACH since 2017. He is REACH's representative at the ONGC Committee for VIRASAT.",
  },
  "pradeep-kumar-maithel": {
    name: "Shri Pradeep Kumar Maithel",
    image: "Shri_Pradeep_Kumar_Maithel",
    folder: "the-virasat-team",
    bio: "Mr. Pradeep Kumar Maithel has served in Oil and Natural Gas Corporations for over 37 yrs and retired as Deputy General Manager, Construction and Maintenance. He has been actively involved with REACH since September 2023. He is responsible for formulating contracts and their management, also he helps with the crucial aspects of REACH operations.",
  },
  "priyamvada-iyer": {
    name: "Mrs. Priyamvada Iyer",
    image: "Mrs_Priyamvada_Iyer_caqt2b",
    folder: "the-virasat-team",
    bio: "Priyamvada Iyer, Head – Media & Communications of the Virasat Organising Committee, is a postgraduate in Mathematics and a former high-school teacher of 15 years who later turned to entrepreneurship. Rooted in Dehradun's culture, she has volunteered with Virasat for over a decade as Media Coordinator, handling press and communications. She is also associated with Been There Doon That (BTDT), FICCI Flo Uttarakhand, and INTACH Dehradun. A keen student of history, archaeology, art, and politics, she has been a lifelong participant in cultural activities, and as a multilingual, voracious reader and occasional writer, continues to champion literature, heritage, and the arts.",
  },
  "kunal-rai": {
    name: "Shri Kunal Rai",
    image: "Shri_Kunal_Rai",
    folder: "the-virasat-team",
    bio: "Kunal Rai has been associated with REACH and Virasat since 2004. He commenced his journey as a volunteer and eventually progressed into the environmental and waste management industry, amassing over 15 years of expertise in waste management and environmental matters. He currently serves as the CEO of a Waste Management Startup and is an active contributor to REACH.",
  },
  "ghanshyam-rai": {
    name: "Shri Ghanshyam Rai",
    image: "Shri_Ghanshyam_Rai",
    folder: "the-virasat-team",
    bio: "Very dedicated and committed member of REACH who adds value to important activities including Saadhna, car and bike rally, contributing significantly to festival organization and community engagement.",
  },
  "ashish-dua": {
    name: "Shri Ashish Dua",
    image: "Shri_Ashish_Dua",
    folder: "the-virasat-team",
    bio: "Shri Ashish Dua is a multifaceted professional with a diverse academic background spanning engineering, fashion technology, and law. He holds a B.E. (Mechanical) from Delhi College of Engineering, a Postgraduate degree in Garment Manufacturing Technology from NIFT New Delhi, and an LL.B. from Dr. Ambedkar Law University, Rajasthan. He has further pursued advanced learning in Apparel Production Management at the Fashion Institute of Technology, New York, and International Politics at the University of Cambridge, U.K. His multidisciplinary expertise reflects a unique blend of technical, creative, and legal perspectives.",
  },
  "shobhna-khullar": {
    name: "Mrs. Shobhna Khullar",
    image: "Mrs._Shobhna_Khullar",
    folder: "the-virasat-team",
    bio: "At present the standard bearer of REACH Talkies as its president, she had her education done from Chandigarh (Punjab University) and has been actively involved in sectors of tourism, marketing and culture. She is an avid traveller.",
  },
  "avinash-saxena": {
    name: "Shri Avinash Saxena",
    image: "Shri_Avinash_Saxena",
    folder: "the-virasat-team",
    bio: "An industrialist of repute, he is the backbone of the REACH Talkies who has been looking after the day to day operations of REACH Talkies. He has deep interest in the world cinema.",
  },
  "tripurari-sharan": {
    name: "Shri Tripurari Sharan",
    image: "Shri_Tripurari_Sharan",
    folder: "the-virasat-team",
    bio: "Mr. Tripurari Sharan, 1985 batch Bihar Cadre IAS Officer is the former Chief Secretary of Bihar and the current State Chief Information Commissioner (CIC); He is also a distinguished filmmaker celebrated for his distinctive storytelling and profound cultural insights. His work in cinema and television has garnered significant acclaim.",
  },
  "surendra-kumar-bhagat": {
    name: "Shri Surendra Kumar Bhagat",
    image: "Shri_Surendra_Kumar_Bhagat",
    folder: "the-virasat-team",
    bio: "A 1982 batch IPS Officer of Uttarakhand Cadre, he is Former Director General, Railway Protection Force. A resident of Noida. he helps REACH on policy and strategic matters.",
  },
  "ashok-kumar": {
    name: "Shri Ashok Kumar",
    image: "Shri_Ashok_Kumar",
    folder: "the-virasat-team",
    bio: "Mr. Ashok Kumar is a retired 1989 batch Indian Police Service officer of the Uttarakhand cadre, who served as the 11th Director General of Uttarakhand Police. He was appointed as Vice-Chancellor (VC) of the Sports University of Haryana on 28 February 2024.",
  },
  "alaknanda-ashok": {
    name: "Dr. Alaknanda Ashok",
    image: "Dr._Alaknanda_Ashok",
    folder: "the-virasat-team",
    bio: "Dr Alaknanda Ashok is Dean at College of Technology, GB Pant University of Agriculture & Technology (GBPUAT). In her earlier role, she served as Director of Women's Institute of Technology (WIT), Dehradun.",
  },
  "rajesh-badal": {
    name: "Shri Rajesh Badal",
    image: "Shri_Rajesh_Badal",
    folder: "the-virasat-team",
    bio: "With an illustrious career in journalism (radio, print, electronic and digital) spanning 42 years, Mr. Badal has produced more than a hundred documentaries. For the first time in TV journalism, he systematically started biopics where he was the producer, presenter and anchor of more than fifty biopics. He has served as Editor at Aaj Tak, Managing Editor and Group Editor at Voice of India, News Director at India News, Executive Editor at BAG Films, Editor-in-Chief at CNEB and Founder Executive Director of Rajya Sabha TV for eight years.",
  },
  "ashok-vajpeyi": {
    name: "Ashok Vajpeyi",
    image: "Shri_Ashok_Bajpai",
    folder: "the-virasat-team",
    bio: "Ashok Vajpeyi, Life Trustee, Raza Foundation is a Hindi poet-critic, translator, editor and culture-activist. He is a major cultural figure of India with more than 14 books of poetry, 10 of criticism in Hindi and 4 books on art in English to his credit. He is widely recognised as an outstanding promoter of culture and an innovative institution-builder. Over the years he has worked tirelessly to enhance the mutual awareness and interaction between Indian and foreign cultures. He has been awarded the Sahitya Akademi Award, the Dayawati Kavi Shekhar Samman, Kabir Samman and awarded D.Lit. (honoriscausa) by the Central University of Hyderabad.",
  },
  "madhuri-barthwal": {
    name: "Dr. Madhuri Barthwal",
    image: "Dr._Madhuri_Barthwal",
    folder: "the-virasat-team",
    bio: "Madhuri Barthwal Uniyal is a folk singer of Uttarakhand, India. She is the first woman to be a music composer in All India Radio. She is said to be the first female musician from Uttarakhand to become a music teacher. On International Women's Day in 2019 she was awarded the Nari Shakti Puraskar by Ram Nath Kovind. She was awarded the Padma Shri, India's fourth highest civilian award in 2022 by the Indian government in the field of art.",
  },
  "mithilesh-kumar-jha": {
    name: "Shri Mithilesh Kumar Jha",
    image: "Shri_Mithilesh_Kumar_Jha",
    folder: "the-virasat-team",
    bio: "Mr. M.K Jha is a 1986 batch IPS officer of Tamil Nadu cadre who has been associated with REACH. He has also served REACH in the capacity of a Trustee.",
  },
  "rajat-mishra": {
    name: "Shri Rajat Mishra",
    image: "Shri_Rajat_Mishra",
    folder: "the-virasat-team",
    bio: "A seasoned business executive with a strong track record of revitalising businesses and launching successful ventures across Indian and European markets., Mr Rajat Mishra, CEO, EFKON India Ltd. Is a distinguished alumnus of IIT Delhi (B. Tech. Electrical Engineering, 1989 batch).",
  },
  "shekhar-pathak": {
    name: "Dr. Shekhar Pathak",
    image: "Dr._Shekhar_Pathak",
    folder: "the-virasat-team",
    bio: "Prof Shekhar Pathak is a historian, editor, publisher, activist, and traveller from Uttarakhand, India. He is known for his extensive knowledge of the history of colonial and postcolonial social movements and contemporary environmental and social issues in Uttarakhand, and colonial exploration in the Himalayas and Tibet.",
  },
  "anup-kumar": {
    name: "Dr. Anup Kumar",
    image: "Shri_Anup_Sinha",
    folder: "the-virasat-team",
    bio: "Anup Kumar (PhD, University of Iowa) is professor of communication at School of Communication in Levin College of Public Affairs and Education, Cleveland State University, Cleveland, Ohio, USA. He is a scholar of political communication, sociology of news, media law and ethics. He is author of The Making of a Small State: Populist Social Mobilisation and the Hindi Press in the Uttarakhand Movement (Orient Blackswan series on New Perspective in South Asian History, 2011).",
  },
};

// Team data organized by categories
const teamCategories: Record<
  string,
  {
    title: string;
    icon: React.ReactElement;
    color: string;
    bgColor: string;
    borderColor: string;
    textColor: string;
    shortTitle: string;
    members: Array<{
      name: string;
      role: string;
      image: string;
      folder: string;
      bio: string;
      years?: string;
      contribution?: string;
      department?: string;
      experience?: string;
    }>;
  }
> = {
  "in-loving-memory": {
    title: "In Loving Memory",
    shortTitle: "Memory",
    icon: <Heart className="w-6 h-6" />,
    color: "",
    bgColor: "",
    borderColor: "border-transparent",
    textColor: "text-gray-800",
    members: [
      {
        name: "Shri. Rajendra Prasad Joshi",
        role: "Founder Chairman",
        image: "Shri._Rajendra_Prasad_Joshi",
        folder: "loving-memory",
        bio: "DGP Uttar Pradesh & Director Intelligence Bureau (DIB)\nLater Founder Chairman Emeritus\nउच्च शिक्षा इलाहाबाद विश्वविद्यालय",
        years: "1995-2020",
      },
      {
        name: "Shri Ajai Shankar, IAS (retd.)",
        role: "Vice Chairman",
        image: "Shri_Ajai_Shankar,_IAS_(retd.)?v=1759389147",
        folder: "loving-memory",
        bio: "Mr. Ajay Shankar is a 1973 batch Madhya Pradesh Cadre officer of the Indian Administrative Service and retired as Secretary, Department of Industrial Policy and Promotion in the Government of India in December, 2009.",
        years: "1998-2019",
        contribution: "Documented and preserved traditional art forms",
      },
      {
        name: "Shri Bameshwar Prasad Narayan Sinha",
        role: "Founding Member",
        image: "Shri_Bameshwar_Prasad_Narayan_Sinha",
        folder: "loving-memory",
        bio: "Professor of English in Indian Military Academy who has written his well acclaimed book, Valour and Wisdom- The First History of Indian Military academy. He was also one of the founding members of REACH. A Scholar of English Literature and an intellectual of high calibre, he was very respectfully mentioned in great detail by Dame Helen Gardener an oxonion scholar, critic and writer in her book The Composition of Four Quartets (Oxford University Press)",
        years: "1996-2018",
        contribution: "Revived traditional wood carving techniques",
      },
      {
        name: "Shri Surjit Kishore Das",
        role: "Vice Chairman",
        image: "Shri_Surjit_Kishore_Das",
        folder: "loving-memory",
        bio: "A graduate of English Literature from St. Stephens College, Delhi, Served as Chief Secretary of Uttarakhand and was founder of The Doon Library. A highly intellectual Bureaucrat and a confirmed Gandhian has written several books and supported many initiatives across the country.",
        years: "2000-2021",
        contribution: "Developed cultural education programs",
      },
      {
        name: "Col. Subhash Khullar",
        role: "Founding President of REACH Talkies",
        image: "Col._Subhash_Khullar",
        folder: "loving-memory",
        bio: "A well decorated artillery officer who took part in the wars of 1965 and 71. Was an incurable film buff. He started REACH Talkies, an 16 year old film club and the only one in Dehradun. His commitment to spreading awareness about world cinema was both infectious and exemplary.",
        years: "1995-2017",
        contribution: "Established classical music traditions at Virasat",
      },
      {
        name: "Shri Sanjeev Singh (IPS)",
        role: "Founding Member",
        image: "Shri_Sanjeev_Singh_(IPS)",
        folder: "loving-memory",
        bio: "Sanjeev kumar Singh, IPS of 1987 batch of MP Cadre was the Founder Trustee of REACH. A DG rank officer was the sculptors of NIA.He was the pillar of the organisation and had played a crucial role in  coordinating with central and state governments and agencies and PSUs for programmes and funding. His inspirational memory eggs REACH on its journey.",
        years: "1997-2019",
        contribution: "Preserved and promoted folk dance forms",
      },
      {
        name: "Ms. Rajshree Joshi",
        role: "Founding Member",
        image: "Ms._Rajshree_Joshi",
        folder: "loving-memory",
        bio: "She was a born-in- REACH leader of the cultural odyssey of the REACH who had kept it strong against the vulnerabilities and crises faced in its  journey of three decades. A memory that both cheers and saddens you.",
        years: "1996-2020",
        contribution: "Built community partnerships and networks",
      },
    ],
  },
  patrons: {
    title: "Patrons",
    shortTitle: "Patrons",
    icon: <Crown className="w-6 h-6" />,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
    borderColor: "border-yellow-200",
    textColor: "text-yellow-800",
    members: [
      {
        name: "Shri Raja Randhir Singh",
        role: "Patron",
        image: "Shri_Raja_Randhir_Singh",
        folder: "patrons",
        bio: "Raja Randhir Singh, from the royal family of Patiala, is a former shooting champion and one of India's most influential sports administrators. The first Indian shooter to win Asian Games gold (1978) and an Arjuna Awardee (1979), he has held key leadership roles for decades. Singh served as Secretary General of the IOA (1987–2012) and OCA (1991–2015), and has been OCA President since 2024, after serving as Acting President from 2021.",
        years: "2005-Present",
        contribution: "Strategic guidance and major funding support",
      },
      {
        name: "Shri Johri Lal",
        role: "Patron",
        image: "Shri_Johri_Lal",
        folder: "patrons",
        bio: "He was among ONGC's longest-serving Directors (HR), instrumental in establishing Virasat as a flagship CSR initiative. A deeply spiritual man and dedicated social activist, he tirelessly championed the cause of the weaker sections of society.",
        years: "2010-Present",
        contribution: "Support for rural artist development programs",
      },
      {
        name: "Dr. A.K. Balyan",
        role: "Patron",
        image: "Dr_A.K_Balyan",
        folder: "patrons",
        bio: "A world-class geochemist and CNG expert trained in Germany, he served as Director (HR) of ONGC and later as MD of Petronet LNG Ltd.",
        years: "2008-Present",
        contribution: "Technology integration and digital initiatives",
      },
      {
        name: "Dr. Alka Mittal",
        role: "Patron",
        image: "Dr_Alka_Mittal",
        folder: "patrons",
        bio: "Former Director HR and then CMD of ONGC, Dr. Mittal was instrumental in providing stability and guidance to REACH.",
        years: "2008-Present",
        contribution: "Women&apos;s empowerment through cultural arts",
      },
    ],
  },
  "reach-trustees": {
    title: "REACH Trustees",
    shortTitle: "Trustees",
    icon: <Shield className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-800",
    members: [
      { ...people["vijay-ranchan"], role: "Trustee" },
      { ...people["rajeev-kumar-singh"], role: "Trustee" },
      { ...people["lokesh-ohri"], role: "Trustee" },
      { ...people["data-ram-purohit"], role: "Trustee" },
      { ...people["devendra-narayan-singh"], role: "Trustee" },
      { ...people["harish-awal"], role: "Trustee" },
      { ...people["shankar-kumar-jha"], role: "Trustee" },
      { ...people["shambhu-shekhar-singh"], role: "Trustee" },
      { ...people["hemant-arora"], role: "Trustee" },
    ],
  },
  "reach-office-bearers": {
    title: "REACH Core Committee",
    shortTitle: "Office Bearers",
    icon: <Building2 className="w-6 h-6" />,
    color: "from-emerald-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-emerald-50 to-cyan-50",
    borderColor: "border-emerald-200",
    textColor: "text-emerald-800",
    members: [
      { ...people["vijay-ranchan"], role: "Chairman" },
      { ...people["rajeev-kumar-singh"], role: "General Secretary" },
      { ...people["lokesh-ohri"], role: "Treasurer" },
      { ...people["vijayshri-joshi"], role: "Joint Secretary" },
      { ...people["sunil-verma"], role: "Director- Art & Crafts" },
      { ...people["harish-awal"], role: "Director – Digital Strategy & Media" },
      { ...people["shankar-kumar-jha"], role: "Director – Artist Relations" },
    ],
  },
  "virasat-organising-committee": {
    title: "Virasat Organising Committee",
    shortTitle: "Organising Committee",
    icon: <Briefcase className="w-6 h-6" />,
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
    borderColor: "border-rose-200",
    textColor: "text-rose-800",
    members: [
      { ...people["sunaina-prakash-agarwal"], role: "Vice President" },
      { ...people["ashutosh-shandilya"], role: "ONGC Relations Lead" },
      {
        ...people["pradeep-kumar-maithel"],
        role: "Head of Delivery & Operations",
      },
      { ...people["priyamvada-iyer"], role: "Head – Media & Communications" },
      { ...people["kunal-rai"], role: "Member" },
      { ...people["ghanshyam-rai"], role: "Member" },
      { ...people["ashish-dua"], role: "Member" },
    ],
  },
  advisors: {
    title: "Advisors",
    shortTitle: "Advisors",
    icon: <Lightbulb className="w-6 h-6" />,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    textColor: "text-amber-800",
    members: [
      { ...people["tripurari-sharan"], role: "Advisor" },
      { ...people["surendra-kumar-bhagat"], role: "Advisor" },
      { ...people["ashok-kumar"], role: "Advisor" },
      { ...people["alaknanda-ashok"], role: "Advisor" },
      {
        name: "Shri Manohar Bothra",
        role: "Advisor",
        image: "Shri_Manohar_Bothra_Senior_Journalist_Bhopal",
        folder: "the-virasat-team",
        bio: "Senior journalist and long associate of REACH, bringing media expertise and strategic communication insights to support the organization's mission and outreach efforts.",
      },
      { ...people["rajesh-badal"], role: "Advisor" },
      { ...people["ashok-vajpeyi"], role: "Advisor" },
      { ...people["madhuri-barthwal"], role: "Advisor" },
      { ...people["mithilesh-kumar-jha"], role: "Advisor" },
      { ...people["rajat-mishra"], role: "Advisor" },
      { ...people["shekhar-pathak"], role: "Advisor" },
      { ...people["anup-kumar"], role: "Advisor" },
    ],
  },
  "reach-talkies": {
    title: "REACH Talkies",
    shortTitle: "Talkies",
    icon: <Film className="w-6 h-6" />,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
    borderColor: "border-violet-200",
    textColor: "text-violet-800",
    members: [
      { ...people["shobhna-khullar"], role: "President" },
      { ...people["avinash-saxena"], role: "Secretary" },
    ],
  },
};

const AboutPage = () => {
  const [activeCategory, setActiveCategory] = useState("in-loving-memory");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [scrollContainerRef, setScrollContainerRef] =
    useState<HTMLDivElement | null>(null);

  // Carousel states for all tabs
  const [focusedMemberIndex, setFocusedMemberIndex] = useState(0);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(true);

  // Read more states for bios
  const [expandedBios, setExpandedBios] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Lightbox states for image expansion
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle scroll position for mobile
  const handleScroll = () => {
    if (!isMobile || !scrollContainerRef) return;

    const scrollLeft = scrollContainerRef.scrollLeft;
    const cardWidth = 304; // w-72 + gap = 288 + 16 = 304px
    const currentCardIndex = Math.round(scrollLeft / cardWidth);
    setCurrentCard(
      Math.min(
        Math.max(currentCardIndex, 0),
        teamCategories[activeCategory].members.length - 1
      )
    );
  };

  // Carousel controls for all tabs
  const toggleCarousel = () => {
    setIsCarouselPlaying((prev) => !prev);
  };

  const goToMemberCard = (index: number) => {
    const members = teamCategories[activeCategory]?.members || [];
    if (index >= 0 && index < members.length) {
      setFocusedMemberIndex(index);
    }
  };

  // Toggle read more for bios
  const toggleBioExpansion = (memberKey: string) => {
    setExpandedBios((prev) => ({
      ...prev,
      [memberKey]: !prev[memberKey],
    }));
  };

  // Open lightbox for image expansion
  const openLightbox = (index: number = 0) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Helper function to determine if bio needs read more (more than 200 characters)
  const shouldShowReadMore = (bio: string) => {
    return bio.length > 200;
  };

  // Helper function to get truncated bio
  const getTruncatedBio = (bio: string) => {
    return bio.length > 200 ? bio.substring(0, 200) + "..." : bio;
  };

  // Reset carousel when switching categories
  useEffect(() => {
    setFocusedMemberIndex(0);
    setIsCarouselPlaying(true);
  }, [activeCategory]);

  // Get current focused member with bounds checking
  const getCurrentFocusedMember = () => {
    const members = teamCategories[activeCategory]?.members || [];
    const index = Math.min(focusedMemberIndex, members.length - 1);
    return members[index] || members[0] || null;
  };

  const currentFocusedMember = getCurrentFocusedMember();

  // Auto-advance carousel effect for all tabs
  useEffect(() => {
    if (!isCarouselPlaying) {
      return;
    }

    const members = teamCategories[activeCategory]?.members || [];
    if (members.length === 0) {
      return;
    }

    const interval = setInterval(() => {
      setFocusedMemberIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % members.length;
        return nextIndex;
      });
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [activeCategory, isCarouselPlaying]);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.2 },
  };

  const slideInRight = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0.4 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const memberVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <>
      <style jsx>{`
        /* From Uiverse.io by cssbuttons-io - Adapted for Virasat brand colors */
        .donate-btn {
          --color: #d4af37; /* golden yellow */
          font-family: inherit;
          display: inline-block;
          width: auto;
          min-width: 8em;
          height: 2.6em;
          line-height: 2.5em;
          margin: 20px;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border: 2px solid var(--color);
          transition: color 0.5s;
          z-index: 1;
          font-size: 17px;
          border-radius: 6px;
          font-weight: 500;
          color: var(--color);
          padding: 0 2em;
          background: transparent;
        }

        .donate-btn:before {
          content: "";
          position: absolute;
          z-index: -1;
          background: var(--color);
          height: 300px;
          width: 300px;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.7s ease;
        }

        .donate-btn:hover {
          color: #fff;
        }

        .donate-btn:hover:before {
          transform: translate(-50%, -50%) scale(1);
        }

        .donate-btn:active:before {
          background: #b8941f; /* darker golden yellow */
          transition: background 0s;
        }

        /* Member card specific styles */
        .member-glow {
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1), 0 0 40px rgba(0, 0, 0, 0.05);
        }

        .member-card-hover {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .member-card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15),
            0 0 0 1px rgba(0, 0, 0, 0.1);
        }

        /* Enhanced focus effects for member cards */
        .memorial-card-focused {
          /* Keep original size and position - no scaling */
          transform: translateY(0) scale(1);
          /* Golden glow effect similar to main card */
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.4), 
                      0 0 40px rgba(212, 175, 55, 0.2),
                      0 0 60px rgba(212, 175, 55, 0.1);
          /* Maintain edges with golden border */
          border-color: rgba(212, 175, 55, 0.6) !important;
          border-width: 2px !important;
          /* Subtle golden background */
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.1),
            rgba(212, 175, 55, 0.05)
          ) !important;
          /* Remove backdrop blur to keep edges sharp */
          backdrop-filter: none !important;
        }

        .memorial-card-unfocused {
          transform: translateY(0) scale(1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .memorial-card-unfocused:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.1);
        }

        /* Pulsing glow effect for focused card - golden version */
        @keyframes member-pulse-golden {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(212, 175, 55, 0.4), 
                        0 0 40px rgba(212, 175, 55, 0.2),
                        0 0 60px rgba(212, 175, 55, 0.1);
          }
          50% {
            box-shadow: 0 0 25px rgba(212, 175, 55, 0.5), 
                        0 0 50px rgba(212, 175, 55, 0.3),
                        0 0 75px rgba(212, 175, 55, 0.15);
          }
        }

        .memorial-card-focused {
          animation: member-pulse-golden 2s ease-in-out infinite;
        }

        /* Timeline animation */
        @keyframes timeline-pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        .timeline-dot {
          animation: timeline-pulse 2s ease-in-out infinite;
        }

        /* Hide scrollbar for mobile tabs */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Line clamp utility */
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Clean tab hover effects */
        .tab-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .tab-hover:hover {
          transform: translateY(-2px);
        }

        /* Custom scrollbar for biography section */
        .biography-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .biography-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 3px;
        }

        .biography-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .biography-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>
      <div className="text-brand-black pt-28 relative">
        {/* Dark Underlay Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundColor: "#160000",
          }}
        />

        {/* Fabric Texture Background - Reduced Opacity */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/digilabs/image/upload/v1759174422/prod/texture/fabric_texture_dtbgi8.jpg)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 0.18,
          }}
        />

        {/* Peacock Flat Overlay with Multiply Blend */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url(https://res.cloudinary.com/digilabs/image/upload/v1759174358/prod/about/background/peacock_flat_ol19op.png)",
            backgroundSize: "70%",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
            mixBlendMode: "multiply",
            opacity: 0.9,
          }}
        />

        {/* Top Fade Overlay - Like Home Screen */}
        <div
          className="absolute top-0 left-0 right-0 z-1"
          style={{
            height: "200px",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        />

        {/* Bottom Fade Overlay - Like Home Screen */}
        <div
          className="absolute bottom-0 left-0 right-0 z-1"
          style={{
            height: "200px",
            background:
              "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        />
        {/* Hero Section */}
        <motion.section
          className="py-8 px-6 container mx-auto relative z-10"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          <div className="text-center max-w-4xl mx-auto mb-8">
            <motion.h1
              className="text-4xl md:text-5xl font-berkshire-swash text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-berkshire-swash)" }}
              variants={fadeIn}
            >
              About Virasat by REACH
            </motion.h1>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full"
              variants={fadeIn}
            ></motion.div>
          </div>
        </motion.section>

        {/* Main Content Section */}
        <motion.section
          className="py-8 px-6 container mx-auto relative z-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Image and Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Image Section - Left Column */}
              <motion.div
                className="lg:col-span-4 flex justify-center lg:justify-start"
                variants={slideInLeft}
              >
                <div className="relative group">
                  {/* Decorative background elements */}
                  <div className="absolute -top-6 -left-6 w-12 h-12 bg-brand-red/20 rounded-full animate-pulse pointer-events-none"></div>
                  <div
                    className="absolute -bottom-4 -right-4 w-8 h-8 bg-brand-brown/30 rounded-full animate-pulse pointer-events-none"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="absolute top-1/2 -left-8 w-6 h-6 bg-brand-red/25 rounded-full animate-pulse pointer-events-none"
                    style={{ animationDelay: "1s" }}
                  ></div>

                  {/* Main image container */}
                  <div className="relative">
                    {/* Rotated background shadow */}
                    <div className="absolute -inset-4 bg-gradient-to-br from-brand-red/10 to-brand-brown/10 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500 pointer-events-none"></div>

                    {/* Image frame */}
                    <div
                      className="relative p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300 cursor-pointer z-10"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        openLightbox(0);
                      }}
                      style={{ zIndex: 10 }}
                    >
                      <Image
                        src="https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_560,c_limit/v1759346446/prod/about/background/REACH_2_teiupy.jpg"
                        alt="REACH - Rural Entrepreneurship for Art & Cultural Heritage"
                        width={280}
                        height={210}
                        className="rounded-lg group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                      />

                      {/* Overlay gradient for depth */}
                      <div className="absolute inset-4 bg-gradient-to-t from-black/5 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                      {/* Click indicator */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <div className="backdrop-blur-sm rounded-full p-3 shadow-lg">
                          <svg
                            className="w-6 h-6 text-brand-brown"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtle border glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-red/5 via-transparent to-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                </div>
              </motion.div>

              {/* Text Content - Right Column */}
              <motion.div className="lg:col-span-8" variants={slideInRight}>
                <div className="space-y-6">
                  {/* First Paragraph */}
                  <motion.div
                    className="p-4 rounded-xl border-l-4 border-brand-red"
                    variants={slideInRight}
                  >
                    <p
                      className="text-base md:text-lg font-league-spartan text-white leading-relaxed"
                      style={{ fontFamily: "var(--font-league-spartan)" }}
                    >
                      Virasat, Arts, Folklife and Heritage Festival is a fortnight long event that has become an unparalleled success story in promoting village and classical music, dance, and crafts for urban audiences. The festival has a truly national presence with an international footprint. It brings together all possible aspects of heritage through a crafts bazaar, workshops, folkdances, music, theatre, exhibitions, talks, seminars, film-festival, literature festivals, cuisine presentations and much more. The festival attracts a pan-Indian participation of about one million people along with 300 master craftsperson and 400 artistes.
                    </p>
                  </motion.div>

                  {/* Second Paragraph */}
                  <motion.div
                    className="p-4 rounded-xl border-r-4 border-brand-brown"
                    variants={slideInRight}
                  >
                    <p
                      className="text-base md:text-lg font-league-spartan text-white leading-relaxed"
                      style={{ fontFamily: "var(--font-league-spartan)" }}
                    >
                      The folk forms, craft, art, and culture of the mountain communities are presented with an academic perspective. Another unique aspect of this event is the participation of about 50,000 school children and youth from various schools and training institutes. Some features of the festival include:
                    </p>
                  </motion.div>

                  {/* Third Paragraph with Features */}
                  <motion.div
                    className="p-4 rounded-xl border border-brand-brown/20 relative overflow-hidden"
                    variants={slideInRight}
                  >
                    {/* Decorative background elements - positioned outside text area */}
                    <div className="absolute -top-2 -right-2 w-12 h-12 border-2 border-brand-red/10 rounded-full"></div>
                    <div className="absolute -bottom-2 -left-2 w-8 h-8 border-2 border-brand-brown/10 rounded-full"></div>

                    <div
                      className="text-base md:text-lg font-league-spartan text-white leading-relaxed relative z-10"
                      style={{ fontFamily: "var(--font-league-spartan)" }}
                    >
                      <ul className="space-y-2">
                        <li>• Direct support to 350 artisans from across India through stalls at the festival.</li>
                        <li>• Direct support to 100 culinary artistes from across India through invitation at the festival.</li>
                        <li>• Direct support to 100 artisans/artistes/culinary artistes from the state of Uttarakhand.</li>
                        <li>• Direct support to over 300 artistes performing at the festival.</li>
                        <li>• One million people attending the festival over the fortnight.</li>
                        <li>• Infusion of economies into the creative industries of India.</li>
                      </ul>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Team Section */}
        <motion.section
          className="py-16 px-6 container mx-auto relative z-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Team Header */}
          <motion.div
            className="text-center max-w-4xl mx-auto mb-12 relative z-10"
            variants={fadeIn}
          >
            <h2
              className="text-4xl md:text-5xl font-berkshire-swash text-white mb-4 leading-tight"
              style={{ fontFamily: "var(--font-berkshire-swash)" }}
            >
              Meet Our Team
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-white leading-relaxed mb-6">
              The passionate individuals behind REACH and Virasat, dedicated to
              preserving and celebrating India&apos;s cultural heritage.
            </p>
          </motion.div>

          {/* Redesigned Tab Navigation - 4 cards top row, 3 cards bottom row */}
          <motion.div
            className="relative mb-16 px-4"
            initial="hidden"
            animate="visible"
            variants={categoryVariants}
          >
            {/* Desktop & Tablet: Grid Layout */}
            <div className="hidden sm:block">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {/* First row - 4 cards */}
                  {Object.entries(teamCategories)
                    .slice(0, 4)
                    .map(([key, category], index) => (
                      <motion.button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={`relative group transition-all duration-300 ease-out ${
                          activeCategory === key ? "z-10" : "z-0"
                        }`}
                        variants={memberVariants}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Tab Card */}
                        <div
                          className={`relative px-3 py-4 rounded-xl transition-all duration-300 text-center ${
                            activeCategory === key
                              ? "bg-white text-black shadow-lg"
                              : "bg-white/40 text-black/70"
                          }`}
                        >
                          {/* Content without icons */}
                          <div className="flex flex-col items-center gap-2">
                            <span
                              className={`font-league-spartan font-medium text-sm whitespace-nowrap ${
                                activeCategory === key
                                  ? "text-black"
                                  : "text-black"
                              }`}
                              style={{
                                fontFamily: "var(--font-league-spartan)",
                              }}
                            >
                              {category.title}
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-3 justify-center max-w-2xl mx-auto">
                  {/* Second row - 3 cards */}
                  {Object.entries(teamCategories)
                    .slice(4)
                    .map(([key, category], index) => (
                      <motion.button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={`relative group transition-all duration-300 ease-out ${
                          activeCategory === key ? "z-10" : "z-0"
                        }`}
                        variants={memberVariants}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Tab Card */}
                        <div
                          className={`relative px-3 py-4 rounded-xl transition-all duration-300 text-center ${
                            activeCategory === key
                              ? "bg-white text-black shadow-lg"
                              : "bg-white/40 text-black/70"
                          }`}
                        >
                          {/* Content without icons */}
                          <div className="flex flex-col items-center gap-2">
                            <span
                              className={`font-league-spartan font-medium text-sm whitespace-nowrap ${
                                activeCategory === key
                                  ? "text-black"
                                  : "text-black"
                              }`}
                              style={{
                                fontFamily: "var(--font-league-spartan)",
                              }}
                            >
                              {category.title}
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                </div>
              </div>
            </div>

            {/* Mobile: Same grid layout as desktop but responsive */}
            <div className="block sm:hidden">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {/* First row - 2 cards */}
                  {Object.entries(teamCategories)
                    .slice(0, 2)
                    .map(([key, category], index) => (
                      <motion.button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={`relative group transition-all duration-300 ease-out ${
                          activeCategory === key ? "z-10" : "z-0"
                        }`}
                        variants={memberVariants}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Tab Card */}
                        <div
                          className={`relative px-2 py-3 rounded-xl transition-all duration-300 text-center ${
                            activeCategory === key
                              ? "bg-white text-black shadow-lg"
                              : "bg-white/40 text-black/70"
                          }`}
                        >
                          {/* Content */}
                          <div className="flex flex-col items-center gap-1">
                            <span
                              className={`font-league-spartan font-medium text-xs whitespace-nowrap ${
                                activeCategory === key
                                  ? "text-black"
                                  : "text-black"
                              }`}
                              style={{
                                fontFamily: "var(--font-league-spartan)",
                              }}
                            >
                              {category.title}
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {/* Second row - 2 cards */}
                  {Object.entries(teamCategories)
                    .slice(2, 4)
                    .map(([key, category], index) => (
                      <motion.button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={`relative group transition-all duration-300 ease-out ${
                          activeCategory === key ? "z-10" : "z-0"
                        }`}
                        variants={memberVariants}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Tab Card */}
                        <div
                          className={`relative px-2 py-3 rounded-xl transition-all duration-300 text-center ${
                            activeCategory === key
                              ? "bg-white text-black shadow-lg"
                              : "bg-white/40 text-black/70"
                          }`}
                        >
                          {/* Content */}
                          <div className="flex flex-col items-center gap-1">
                            <span
                              className={`font-league-spartan font-medium text-xs whitespace-nowrap ${
                                activeCategory === key
                                  ? "text-black"
                                  : "text-black"
                              }`}
                              style={{
                                fontFamily: "var(--font-league-spartan)",
                              }}
                            >
                              {category.title}
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  {/* Third row - 2 cards */}
                  {Object.entries(teamCategories)
                    .slice(4, 6)
                    .map(([key, category], index) => (
                      <motion.button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={`relative group transition-all duration-300 ease-out ${
                          activeCategory === key ? "z-10" : "z-0"
                        }`}
                        variants={memberVariants}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Tab Card */}
                        <div
                          className={`relative px-2 py-3 rounded-xl transition-all duration-300 text-center ${
                            activeCategory === key
                              ? "bg-white text-black shadow-lg"
                              : "bg-white/40 text-black/70"
                          }`}
                        >
                          {/* Content */}
                          <div className="flex flex-col items-center gap-1">
                            <span
                              className={`font-league-spartan font-medium text-xs whitespace-nowrap ${
                                activeCategory === key
                                  ? "text-black"
                                  : "text-black"
                              }`}
                              style={{
                                fontFamily: "var(--font-league-spartan)",
                              }}
                            >
                              {category.title}
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                </div>

                <div className="flex justify-center">
                  {/* Fourth row - 1 centered card */}
                  {Object.entries(teamCategories)
                    .slice(6)
                    .map(([key, category], index) => (
                      <motion.button
                        key={key}
                        onClick={() => setActiveCategory(key)}
                        className={`relative group transition-all duration-300 ease-out ${
                          activeCategory === key ? "z-10" : "z-0"
                        }`}
                        variants={memberVariants}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Tab Card */}
                        <div
                          className={`relative px-4 py-3 rounded-xl transition-all duration-300 text-center ${
                            activeCategory === key
                              ? "bg-white text-black shadow-lg"
                              : "bg-white/40 text-black/70"
                          } ${
                            category.title === "REACH Talkies" ? "min-w-[140px]" : ""
                          }`}
                        >
                          {/* Content */}
                          <div className="flex flex-col items-center gap-1">
                            <span
                              className={`font-league-spartan font-medium text-xs whitespace-nowrap ${
                                activeCategory === key
                                  ? "text-black"
                                  : "text-black"
                              }`}
                              style={{
                                fontFamily: "var(--font-league-spartan)",
                              }}
                            >
                              {category.title}
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Content Layout */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              className="max-w-7xl mx-auto relative z-10"
              variants={categoryVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {/* Big Box + Small Cards Layout for All Tabs */}
              {teamCategories[activeCategory]?.members?.length > 0 ? (
                <div className={`${isMobile ? "block" : "flex"} gap-6`}>
                  {/* Large Focus Box - Left Side - Visible on Mobile */}
                  <div className={`${isMobile ? "w-full mb-6" : "flex-1"}`}>
                    <div
                      className={`relative rounded-3xl ${
                        isMobile ? "p-4" : "p-6"
                      } shadow-2xl ${
                        isMobile ? "h-[520px]" : "h-[540px]"
                      } overflow-hidden`}
                    >
                      {/* Carousel Controls */}
                      <div className="absolute top-6 right-6 z-50 pointer-events-auto">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleCarousel();
                          }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 cursor-pointer border-0 outline-none focus:outline-none ${
                            isCarouselPlaying
                              ? `bg-gradient-to-r ${teamCategories[activeCategory].color} text-white hover:opacity-90`
                              : "bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700"
                          }`}
                          style={{ zIndex: 1000, pointerEvents: "auto" }}
                        >
                          {isCarouselPlaying ? (
                            <>
                              <Pause className="w-4 h-4" />
                              Pause
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              Play
                            </>
                          )}
                        </button>
                        <div className="text-xs text-center mt-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              isCarouselPlaying
                                ? `${teamCategories[activeCategory].bgColor} ${teamCategories[activeCategory].textColor}`
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {isCarouselPlaying ? "Auto-playing" : "Paused"}
                          </span>
                        </div>
                      </div>

                      {/* Focused Member Content */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={focusedMemberIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="relative z-10 h-full flex flex-col"
                        >
                          {/* Member Header */}
                          <div className="text-center mb-6">
                            <div className="relative inline-block mb-4 p-4">
                              <div
                                className={`${
                                  isMobile ? "w-40 h-40" : "w-48 h-48"
                                } mx-auto relative z-10`}
                              >
                                {/* Golden Glow - for all sections */}
                                <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-25 blur-xl z-0"></div>
                                {/* Circular Frame - only for In Loving Memory section */}
                                {activeCategory === "in-loving-memory" && (
                                  <div className="absolute -inset-2 top-[12px] left-[-18px] rounded-full overflow-hidden z-20">
                                    <Image
                                      src="/images/circle_frame.png"
                                      alt="Circular frame"
                                      width={isMobile ? 180 : 280}
                                      height={isMobile ? 180 : 280}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                )}
                                {/* Profile Photo - positioned inside the frame */}
                                <div className={`absolute inset-4 rounded-full overflow-hidden z-10 ${
                                  activeCategory !== "in-loving-memory" ? "border-4 border-white shadow-lg shadow-white/30" : ""
                                }`}>
                                  {currentFocusedMember && (
                                    <Image
                                      src={getCloudinaryImageUrl(
                                        currentFocusedMember.folder,
                                        currentFocusedMember.image,
                                        280
                                      )}
                                      alt={currentFocusedMember.name}
                                      width={isMobile ? 128 : 160}
                                      height={isMobile ? 128 : 160}
                                      className={`w-full h-full ${
                                        currentFocusedMember.name === "Dr. Alka Mittal" || currentFocusedMember.name === "Ms. Vijayshree Joshi" || currentFocusedMember.name === "Shri Ghanshyam Rai" || currentFocusedMember.name === "Shri Avinash Saxena"
                                          ? "object-cover object-top" 
                                          : "object-cover"
                                      }`}
                                      style={
                                        currentFocusedMember.name === "Dr. Alka Mittal" 
                                          ? { objectPosition: "center 0%" }
                                          : currentFocusedMember.name === "Ms. Vijayshree Joshi"
                                          ? { objectPosition: "center 15%" }
                                          : currentFocusedMember.name === "Shri Ghanshyam Rai"
                                          ? { objectPosition: "center 25%" }
                                          : currentFocusedMember.name === "Shri Avinash Saxena"
                                          ? { objectPosition: "center 0%" }
                                          : {}
                                      }
                                    />
                                  )}
                                </div>
                              </div>
                            </div>

                            <h3
                              className={`${
                                isMobile ? "text-2xl" : "text-xl md:text-2xl"
                              } font-serif text-white leading-tight mb-2`}
                            >
                              {currentFocusedMember?.name || "Loading..."}
                            </h3>
                            <p
                              className={`text-white font-semibold ${
                                isMobile ? "text-lg" : "text-base"
                              } mb-4 opacity-80`}
                            >
                              {currentFocusedMember?.role || "Loading..."}
                            </p>
                          </div>

                          {/* Enhanced Member Content */}
                          <div className="space-y-4 flex-1 overflow-hidden">
                            <div className="relative h-full flex flex-col">
                              <div className="relative flex-1 overflow-hidden">
                                {/* Enhanced Biography Text Container */}
                                <motion.div
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                  className={`relative h-full overflow-y-auto biography-scroll ${
                                    isMobile ? "max-h-[280px]" : "max-h-[320px]"
                                  }`}
                                >
                                  <div
                                    className={`relative z-10 text-white font-league-spartan ${
                                      isMobile ? "text-lg" : "text-base"
                                    } leading-relaxed text-justify`}
                                    style={{
                                      fontFamily: "var(--font-league-spartan)",
                                    }}
                                  >
                                    {currentFocusedMember?.bio ||
                                      "Loading biography..."}
                                  </div>
                                </motion.div>

                                {/* Special content for specific members */}
                                {currentFocusedMember?.name?.includes(
                                  "Rajendra Prasad Joshi"
                                ) && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className={`relative mt-3`}
                                  >
                                    <div
                                      className={`text-white font-league-spartan ${
                                        isMobile ? "text-lg" : "text-base"
                                      } leading-relaxed text-justify font-medium`}
                                      style={{
                                        fontFamily:
                                          "var(--font-league-spartan)",
                                      }}
                                    >
                                      उच्च शिक्षा इलाहाबाद विश्वविद्यालय
                                    </div>
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Vertical Separator Line - Only visible on desktop */}
                  <div className="hidden lg:flex items-center justify-center">
                    <div className="w-px h-[540px] bg-gradient-to-b from-transparent via-white/50 to-transparent"></div>
                  </div>

                  {/* Small Cards Grid - Right Side on Desktop, Below Large Card on Mobile */}
                  <div className={`${isMobile ? "w-full" : "flex-1"}`}>
                    <div className="space-y-4">
                      {/* Small Member Cards - 2x4 Grid for Mobile, 3x3 for Desktop */}
                      <div className={`grid gap-3 ${
                        isMobile ? "grid-cols-2" : "grid-cols-3"
                      }`}>
                        {teamCategories[activeCategory].members.map(
                          (member: any, index: number) => (
                            <motion.div
                              key={member.name}
                              className="cursor-pointer transition-all duration-300"
                              onClick={() => goToMemberCard(index)}
                              variants={memberVariants}
                            >
                              <div
                                className={`rounded-2xl ${
                                  isMobile ? "p-2.5" : "p-2"
                                } ${isMobile ? "aspect-[4/5]" : "aspect-square"} flex flex-col relative overflow-hidden bg-white/5 border border-white/15 shadow-lg ${
                                  index === focusedMemberIndex
                                    ? `memorial-card-focused bg-gradient-to-br from-yellow-400/15 to-yellow-500/10 border-yellow-400/40 shadow-2xl`
                                    : `memorial-card-unfocused hover:bg-white/6 hover:border-white/18 hover:shadow-xl`
                                }`}
                              >
                                <div className="flex flex-col items-center text-center h-full justify-between">
                                  {/* Profile Image Section - Fixed height */}
                                  <div
                                    className={`relative flex-shrink-0 p-2 ${
                                      isMobile ? "mb-1" : "mb-2"
                                    }`}
                                  >
                                    <div
                                      className={`${
                                        isMobile ? "w-28 h-28" : "w-24 h-24"
                                      } transition-all duration-300 relative`}
                                    >
                                      {/* Circular Frame - only for In Loving Memory section */}
                                      {activeCategory === "in-loving-memory" && (
                                        <div className="absolute -inset-2 top-[5px] left-[-12px] rounded-full overflow-hidden z-20">
                                          <Image
                                            src="/images/circle_frame.png"
                                            alt="Circular frame"
                                            width={isMobile ? 220 : 260}
                                            height={isMobile ? 220 : 260}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      )}
                                      {/* Profile Photo - positioned inside the frame */}
                                      <div className="absolute inset-2 rounded-full overflow-hidden z-10">
                                        <Image
                                          src={getCloudinaryImageUrl(
                                            member.folder,
                                            member.image,
                                            isMobile ? 160 : 200
                                          )}
                                          alt={member.name}
                                          width={isMobile ? 56 : 64}
                                          height={isMobile ? 56 : 64}
                                          className={`w-full h-full transition-all duration-500 ${
                                            member.name === "Dr. Alka Mittal" || member.name === "Ms. Vijayshree Joshi" || member.name === "Shri Ghanshyam Rai" || member.name === "Shri Avinash Saxena"
                                              ? "object-cover object-top" 
                                              : "object-cover"
                                          }`}
                                          style={
                                            member.name === "Dr. Alka Mittal" 
                                              ? { objectPosition: "center 0%" }
                                              : member.name === "Ms. Vijayshree Joshi"
                                              ? { objectPosition: "center 15%" }
                                              : member.name === "Shri Ghanshyam Rai"
                                              ? { objectPosition: "center 25%" }
                                              : member.name === "Shri Avinash Saxena"
                                              ? { objectPosition: "center 0%" }
                                              : {}
                                          }
                                        />
                                      </div>
                                    </div>
                                  </div>

                                  {/* Text Content Section - Flexible height */}
                                  <div
                                    className={`w-full flex flex-col ${
                                      isMobile ? "gap-1" : "gap-1.5"
                                    } flex-1 justify-center px-1 pb-1`}
                                  >
                                    <h4
                                      className={`${
                                        isMobile ? "text-xs" : "text-xs"
                                      } leading-tight transition-colors duration-300 ${
                                        isMobile ? "truncate" : ""
                                      } ${
                                        index === focusedMemberIndex
                                          ? `text-white font-bold`
                                          : `text-white opacity-80`
                                      }`}
                                      style={{ fontFamily: 'var(--font-league-spartan)' }}
                                    >
                                      {isMobile
                                        ? member.name
                                        : member.name}
                                    </h4>
                                    <p
                                      className={`font-semibold ${
                                        isMobile ? "text-xs" : "text-xs"
                                      } leading-tight ${
                                        isMobile ? "truncate" : ""
                                      } ${
                                        index === focusedMemberIndex
                                          ? `text-white font-bold opacity-90`
                                          : `text-white opacity-70`
                                      }`}
                                    >
                                      {isMobile
                                        ? member.role
                                        : member.role}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No members found for this category.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.section>

        {/* Donate CTA Section */}
        <motion.section
          className="py-6 px-6 container mx-auto relative z-10"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <motion.div
            className="text-center max-w-xl mx-auto"
            variants={fadeIn}
          >
            <h2 
              className="text-2xl md:text-3xl font-berkshire-swash text-white mb-2"
              style={{ fontFamily: "var(--font-berkshire-swash)" }}
            >
              Support Our Mission
            </h2>
            <p 
              className="text-sm md:text-base font-league-spartan text-white mb-4"
              style={{ fontFamily: "var(--font-league-spartan)" }}
            >
              Help preserve India&apos;s cultural heritage.
            </p>

            <Link href="/donate">
              <button className="donate-btn">
                <Heart className="w-4 h-4 inline mr-2" />
                Donate Now
              </button>
            </Link>
          </motion.div>
        </motion.section>

        {/* Lightbox for image expansion */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={[
            {
              type: "image",
              src: "https://res.cloudinary.com/digilabs/image/upload/f_auto,q_95,w_1200,c_limit/v1759346446/prod/about/background/REACH_2_teiupy.jpg",
              width: 1200,
              height: 900,
              alt: "REACH - Rural Entrepreneurship for Art & Cultural Heritage",
            },
          ]}
          index={lightboxIndex}
          render={{
            buttonPrev: () => null,
            buttonNext: () => null,
          }}
          carousel={{
            finite: true,
          }}
          controller={{
            closeOnBackdropClick: true,
            closeOnPullDown: false,
            closeOnPullUp: false,
          }}
          styles={{
            container: {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(10px)",
            },
            slide: {
              border: "none",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              borderRadius: "12px",
              padding: "0",
            },
          }}
        />
      </div>
    </>
  );
};

export default AboutPage;
