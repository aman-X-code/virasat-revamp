'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Star, Crown, Filter, ChevronDown, Play, Pause, ChevronLeft, ChevronRight, Building2, Shield, UserCheck, Briefcase, Lightbulb, Film } from 'lucide-react';

// Helper function to generate Cloudinary URLs
const getCloudinaryImageUrl = (folder: string, publicId: string, width: number = 100) => {
  return `https://res.cloudinary.com/digilabs/image/upload/f_auto,q_80,w_${width},c_limit/prod/about/${folder}/prod/about/${folder}/${publicId}`;
};

// Common people data - shared across all tabs
const people = {
  'vijay-ranchan': {
    name: 'Shri Vijay Ranchan',
    image: 'Shri_Vijay_Ranchan',
    folder: 'the-virasat-team',
    bio: 'Mr. Vijay Ranchan, a 1967 IAS officer (Gujarat cadre, rtd.), has chaired REACH since 2008. A passionate advocate of art and culture, he has authored several books, including the series Bollywood the Rashtrawad, Story of a Bollywood Song: Evolution of Hindi Film Music through Stories, Maachnadar Gaan, and Bollywood Aur Ramkatha, among others.'
  },
  'rajeev-kumar-singh': {
    name: 'Shri Rajeev Kumar Singh',
    image: 'Shri_Rajeev_Kumar_Singh',
    folder: 'the-virasat-team',
    bio: 'Mr. R. K Singh has had a distinguished career at the Oil and Natural Gas Corporation, having served ONGC in varied capacities from where he retired as the Executive Director, Human Resource. Mr. Singh has been serving REACH as its General Secretary since 1995.'
  },
  'lokesh-ohri': {
    name: 'Dr. Lokesh Ohri',
    image: 'Dr._Lokesh_Ohri',
    folder: 'the-virasat-team',
    bio: 'Dr. Lokesh Ohri, an anthropologist, historian, writer, and cultural activist from Dehradun, has long championed the preservation of the Doon Valley\'s natural and cultural heritage. He is the founder of Been There Doon That (BTDT), an initiative promoting awareness through walks, lectures, and workshops, and supporting village-based slow tourism across Uttarakhand and Himachal. Associated with REACH since its inception in 1995, Dr. Ohri has been serving as its Treasurer ever since.'
  },
  'data-ram-purohit': {
    name: 'Prof. Data Ram Purohit',
    image: 'Prof._Data_Ram_Purohit',
    folder: 'the-virasat-team',
    bio: 'Dr. Dataram Purohit, Professor of English and former Director of the Folk Culture and Performance Centre at HNB Garhwal Central University, received the prestigious Sangeet Natak Akademi Award in 2019 for his work in preserving Uttarakhand\'s folk music and theatre. He has been instrumental in bringing global recognition to traditions such as Ramman, Chakravyuh, and Nanda Jagar, while also revitalising the Bhalda mask tradition, the Pandav dance of Kedarghati, and other rich folk forms of the region.'
  },
  'devendra-narayan-singh': {
    name: 'Shri Devendra Narayan Singh',
    image: 'Shri_Devendra_Narayan_Singh',
    folder: 'the-virasat-team',
    bio: 'Ace senior geo scientist with ONGC. Acknowledged actor, theatre director and script writer. Has been associated with REACH from early times, bringing unique blend of scientific and artistic expertise.'
  },
  'harish-awal': {
    name: 'Shri Harish Awal',
    image: 'Shri_Harish_Awal',
    folder: 'the-virasat-team',
    bio: 'Basically an electronic engineer from Thapar institute of technology. An actor, orator, painter and corporate communication expert who retired as executive director from ONGC. He looks after all the digital representation of REACH and Viraast across all platforms.'
  },
  'shankar-kumar-jha': {
    name: 'Shri Shankar Kumar Jha',
    image: 'Shri_Shankar_Kumar_Jha',
    folder: 'the-virasat-team',
    bio: 'Primarily a geo physicist with ONGC trained at IIT Delhi. He has deep interest in and knowledge of Indian classical music. He is deeply interested in Hindi and Urdu poetry. He has been a guest speaker in various events and institutions such as ITC and Sangeet Research Academy. He is responsible for the artist selection.'
  },
  'shambhu-shekhar-singh': {
    name: 'Dr. Shambhu Shekhar Singh',
    image: 'Dr._Shambhu_Shekhar_Singh',
    folder: 'the-virasat-team',
    bio: 'JNU trained scholar of economics with long teaching association in Delhi University. Deep love for music, painting, crafts and Indian folk forms. The conscience keeper of REACH.'
  },
  'hemant-arora': {
    name: 'Shri Hemant Arora',
    image: 'Shri_Hemant_Arora',
    folder: 'the-virasat-team',
    bio: 'Renowned Chartered Accountant of India and Rotarian, social worker and philanthropist. Acts as the financial and legal advisor for REACH, ensuring organizational compliance and fiscal responsibility.'
  },
  'vijayshri-joshi': {
    name: 'Ms. Vijayshri Joshi',
    image: 'Ms._Vijayshri_Joshi',
    folder: 'the-virasat-team',
    bio: 'She represents a generation of youth that has grown in the management of arts and large festivals. She advises the state Government on the matters of art and culture.'
  },
  'sunil-verma': {
    name: 'Shri Sunil Verma',
    image: 'Shri_Sunil_Verma',
    folder: 'the-virasat-team',
    bio: 'Mr. Sunil has over 30+ years of experience as Editor/Director in Film & Television. As a Freelancer, Creative Consultant and Advisor, he has been associated with Theatre since the age of 9 yrs and has been Working for revitalizing arts, craft, culture & heritage of India. Some of the TV Series where he has worked as Director/ Editor include Chandrakanta, Hum Saath Saath haen, Ek Do Teen, Reporter to name a few. He is Director- Art and Craft, Virasat Festival.'
  },
  'sunaina-prakash-agarwal': {
    name: 'Ms. Sunaina Prakash Agarwal',
    image: 'Ms._Sunaina_Prakash_Agarwal',
    folder: 'the-virasat-team',
    bio: 'Smt. Sunayna Prakash is a crucial wheel in organising Virasat every year and serves as Vice President of the Virasat Organising Committee. A distinguished Supreme Court advocate, she is admired for her leadership, vision, and dedication to public service. A senior member of the Supreme Court Bar Association and the Bar Council of Uttar Pradesh, she brings exceptional legal expertise and social sensitivity to every role. She served as an Independent Director of RDPL, a Central Government PSU, and is Chairperson of the Legal Advisory Committee of the Indian Olympic Association, representing India at Paris 2024. She also chairs the Indian Soft Hockey League and is a member of the Advisory Committee of the National Commission for Women.'
  },
  'ashutosh-shandilya': {
    name: 'Shri Ashutosh Shandilya',
    image: 'Shri_Ashutosh_Shandilya',
    folder: 'the-virasat-team',
    bio: 'Mr. Ashutosh Shandilya is a General Manager, Geology with ONGC. He has been associated with REACH since 2017. He is REACH\'s representative at the ONGC Committee for VIRASAT.'
  },
  'pradeep-kumar-maithel': {
    name: 'Shri Pradeep Kumar Maithel',
    image: 'Shri_Pradeep_Kumar_Maithel',
    folder: 'the-virasat-team',
    bio: 'Mr. Pradeep Kumar Maithel has served in Oil and Natural Gas Corporations for over 37 yrs and retired as Deputy General Manager, Construction and Maintenance. He has been actively involved with REACH since September 2023. He is responsible for formulating contracts and their management, also he helps with the crucial aspects of REACH operations.'
  },
  'priyamvada-iyer': {
    name: 'Mrs. Priyamvada Iyer',
    image: 'Mrs_Priyamvada_Iyer_caqt2b',
    folder: 'the-virasat-team',
    bio: 'Priyamvada Iyer, Head – Media & Communications of the Virasat Organising Committee, is a postgraduate in Mathematics and a former high-school teacher of 15 years who later turned to entrepreneurship. Rooted in Dehradun\'s culture, she has volunteered with Virasat for over a decade as Media Coordinator, handling press and communications. She is also associated with Been There Doon That (BTDT), FICCI Flo Uttarakhand, and INTACH Dehradun. A keen student of history, archaeology, art, and politics, she has been a lifelong participant in cultural activities, and as a multilingual, voracious reader and occasional writer, continues to champion literature, heritage, and the arts.'
  },
  'kunal-rai': {
    name: 'Shri Kunal Rai',
    image: 'Shri_Kunal_Rai',
    folder: 'the-virasat-team',
    bio: 'Kunal Rai has been associated with REACH and Virasat since 2004. He commenced his journey as a volunteer and eventually progressed into the environmental and waste management industry, amassing over 15 years of expertise in waste management and environmental matters. He currently serves as the CEO of a Waste Management Startup and is an active contributor to REACH.'
  },
  'ghanshyam-rai': {
    name: 'Shri Ghanshyam Rai',
    image: 'Shri_Ghanshyam_Rai',
    folder: 'the-virasat-team',
    bio: 'Very dedicated and committed member of REACH who adds value to important activities including Saadhna, car and bike rally, contributing significantly to festival organization and community engagement.'
  },
  'ashish-dua': {
    name: 'Shri Ashish Dua',
    image: 'Shri_Ashish_Dua',
    folder: 'the-virasat-team',
    bio: 'Shri Ashish Dua is a multifaceted professional with a diverse academic background spanning engineering, fashion technology, and law. He holds a B.E. (Mechanical) from Delhi College of Engineering, a Postgraduate degree in Garment Manufacturing Technology from NIFT New Delhi, and an LL.B. from Dr. Ambedkar Law University, Rajasthan. He has further pursued advanced learning in Apparel Production Management at the Fashion Institute of Technology, New York, and International Politics at the University of Cambridge, U.K. His multidisciplinary expertise reflects a unique blend of technical, creative, and legal perspectives.'
  },
  'shobhna-khullar': {
    name: 'Mrs. Shobhna Khullar',
    image: 'Mrs._Shobhna_Khullar',
    folder: 'the-virasat-team',
    bio: 'At present the standard bearer of REACH Talkies as its president, she had her education done from Chandigarh (Punjab University) and has been actively involved in sectors of tourism, marketing and culture. She is an avid traveller.'
  },
  'avinash-saxena': {
    name: 'Shri Avinash Saxena',
    image: 'Shri_Avinash_Saxena',
    folder: 'the-virasat-team',
    bio: 'An industrialist of repute, he is the backbone of the REACH Talkies who has been looking after the day to day operations of REACH Talkies. He has deep interest in the world cinema.'
  },
  'tripurari-sharan': {
    name: 'Shri Tripurari Sharan',
    image: 'Shri_Tripurari_Sharan',
    folder: 'the-virasat-team',
    bio: 'Mr. Tripurari Sharan, 1985 batch Bihar Cadre IAS Officer is the former Chief Secretary of Bihar and the current State Chief Information Commissioner (CIC); He is also a distinguished filmmaker celebrated for his distinctive storytelling and profound cultural insights. His work in cinema and television has garnered significant acclaim.'
  },
  'surendra-kumar-bhagat': {
    name: 'Shri Surendra Kumar Bhagat',
    image: 'Shri_Surendra_Kumar_Bhagat',
    folder: 'the-virasat-team',
    bio: 'A 1982 batch IPS Officer of Uttarakhand Cadre, he is Former Director General, Railway Protection Force. A resident of Noida. he helps REACH on policy and strategic matters.'
  },
  'ashok-kumar': {
    name: 'Shri Ashok Kumar',
    image: 'Shri_Ashok_Kumar',
    folder: 'the-virasat-team',
    bio: 'Mr. Ashok Kumar is a retired 1989 batch Indian Police Service officer of the Uttarakhand cadre, who served as the 11th Director General of Uttarakhand Police. He was appointed as Vice-Chancellor (VC) of the Sports University of Haryana on 28 February 2024.'
  },
  'alaknanda-ashok': {
    name: 'Dr. Alaknanda Ashok',
    image: 'Dr._Alaknanda_Ashok',
    folder: 'the-virasat-team',
    bio: 'Dr Alaknanda Ashok is Dean at College of Technology, GB Pant University of Agriculture & Technology (GBPUAT). In her earlier role, she served as Director of Women\'s Institute of Technology (WIT), Dehradun.'
  },
  'rajesh-badal': {
    name: 'Shri Rajesh Badal',
    image: 'Shri_Rajesh_Badal',
    folder: 'the-virasat-team',
    bio: 'With an illustrious career in journalism (radio, print, electronic and digital) spanning 42 years, Mr. Badal has produced more than a hundred documentaries. For the first time in TV journalism, he systematically started biopics where he was the producer, presenter and anchor of more than fifty biopics. He has served as Editor at Aaj Tak, Managing Editor and Group Editor at Voice of India, News Director at India News, Executive Editor at BAG Films, Editor-in-Chief at CNEB and Founder Executive Director of Rajya Sabha TV for eight years.'
  },
  'ashok-vajpeyi': {
    name: 'Ashok Vajpeyi',
    image: 'Shri_Ashok_Bajpai',
    folder: 'the-virasat-team',
    bio: 'Ashok Vajpeyi, Life Trustee, Raza Foundation is a Hindi poet-critic, translator, editor and culture-activist. He is a major cultural figure of India with more than 14 books of poetry, 10 of criticism in Hindi and 4 books on art in English to his credit. He is widely recognised as an outstanding promoter of culture and an innovative institution-builder. Over the years he has worked tirelessly to enhance the mutual awareness and interaction between Indian and foreign cultures. He has been awarded the Sahitya Akademi Award, the Dayawati Kavi Shekhar Samman, Kabir Samman and awarded D.Lit. (honoriscausa) by the Central University of Hyderabad.'
  },
  'madhuri-barthwal': {
    name: 'Dr. Madhuri Barthwal',
    image: 'Dr._Madhuri_Barthwal',
    folder: 'the-virasat-team',
    bio: 'Madhuri Barthwal Uniyal is a folk singer of Uttarakhand, India. She is the first woman to be a music composer in All India Radio. She is said to be the first female musician from Uttarakhand to become a music teacher. On International Women\'s Day in 2019 she was awarded the Nari Shakti Puraskar by Ram Nath Kovind. She was awarded the Padma Shri, India\'s fourth highest civilian award in 2022 by the Indian government in the field of art.'
  },
  'mithilesh-kumar-jha': {
    name: 'Shri Mithilesh Kumar Jha',
    image: 'Shri_Mithilesh_Kumar_Jha',
    folder: 'the-virasat-team',
    bio: 'Mr. M.K Jha is a 1986 batch IPS officer of Tamil Nadu cadre who has been associated with REACH. He has also served REACH in the capacity of a Trustee.'
  },
  'rajat-mishra': {
    name: 'Shri Rajat Mishra',
    image: 'Shri_Rajat_Mishra',
    folder: 'the-virasat-team',
    bio: 'A seasoned business executive with a strong track record of revitalising businesses and launching successful ventures across Indian and European markets., Mr Rajat Mishra, CEO, EFKON India Ltd. Is a distinguished alumnus of IIT Delhi (B. Tech. Electrical Engineering, 1989 batch).'
  },
  'shekhar-pathak': {
    name: 'Dr. Shekhar Pathak',
    image: 'Dr._Shekhar_Pathak',
    folder: 'the-virasat-team',
    bio: 'Prof Shekhar Pathak is a historian, editor, publisher, activist, and traveller from Uttarakhand, India. He is known for his extensive knowledge of the history of colonial and postcolonial social movements and contemporary environmental and social issues in Uttarakhand, and colonial exploration in the Himalayas and Tibet.'
  },
  'anup-kumar': {
    name: 'Dr. Anup Kumar',
    image: 'Shri_Anup_Sinha',
    folder: 'the-virasat-team',
    bio: 'Anup Kumar (PhD, University of Iowa) is professor of communication at School of Communication in Levin College of Public Affairs and Education, Cleveland State University, Cleveland, Ohio, USA. He is a scholar of political communication, sociology of news, media law and ethics. He is author of The Making of a Small State: Populist Social Mobilisation and the Hindi Press in the Uttarakhand Movement (Orient Blackswan series on New Perspective in South Asian History, 2011).'
  }
};

// Team data organized by categories
const teamCategories: Record<string, {
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
}> = {
  'in-loving-memory': {
    title: 'In Loving Memory',
    shortTitle: 'Memory',
    icon: <Heart className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800',
    members: [
      {
        name: 'Shri. Rajendra Prasad Joshi',
        role: 'Founder Chairman',
        image: 'Shri._Rajendra_Prasad_Joshi',
        folder: 'loving-memory',
        bio: 'DGP Uttar Pradesh & Director Intelligence Bureau (DIB)\nLater Founder Chairman Emeritus',
        years: '1995-2020'
      },
      {
        name: 'Shri Ajai Shankar, IAS (retd.)',
        role: 'Vice Chairman',
        image: 'Shri_Ajai_Shankar,_IAS_(retd.)',
        folder: 'loving-memory',
        bio: 'Mr. Ajay Shankar is a 1973 batch Madhya Pradesh Cadre officer of the Indian Administrative Service and retired as Secretary, Department of Industrial Policy and Promotion in the Government of India in December, 2009.',
        years: '1998-2019',
        contribution: 'Documented and preserved traditional art forms'
      },
      {
        name: 'Shri Bameshwar Prasad Narayan Sinha',
        role: 'Founding Member',
        image: 'Shri_Bameshwar_Prasad_Narayan_Sinha',
        folder: 'loving-memory',
        bio: 'Professor of English in Indian Military Academy who has written his well acclaimed book, Valour and Wisdom- The First History of Indian Military academy. He was also one of the founding members of REACH. A Scholar of English Literature and an intellectual of high calibre, he was very respectfully mentioned in great detail by Dame Helen Gardener an oxonion scholar, critic and writer in her book The Composition of Four Quartets (Oxford University Press)',
        years: '1996-2018',
        contribution: 'Revived traditional wood carving techniques'
      },
      {
        name: 'Shri Surjit Kishore Das',
        role: 'Vice Chairman',
        image: 'Shri_Surjit_Kishore_Das',
        folder: 'loving-memory',
        bio: 'A graduate of English Literature from St. Stephens College, Delhi, Served as Chief Secretary of Uttarakhand and was founder of The Doon Library. A highly intellectual Bureaucrat and a confirmed Gandhian has written several books and supported many initiatives across the country.',
        years: '2000-2021',
        contribution: 'Developed cultural education programs'
      },
      {
        name: 'Col. Subhash Khullar',
        role: 'Founding President of REACH Talkies',
        image: 'Col._Subhash_Khullar',
        folder: 'loving-memory',
        bio: 'A well decorated artillery officer who took part in the wars of 1965 and 71. Was an incurable film buff. He started REACH Talkies, an 16 year old film club and the only one in Dehradun. His commitment to spreading awareness about world cinema was both infectious and exemplary.',
        years: '1995-2017',
        contribution: 'Established classical music traditions at Virasat'
      },
      {
        name: 'Shri Sanjeev Singh (IPS)',
        role: 'Founding Member',
        image: 'Shri_Sanjeev_Singh_(IPS)',
        folder: 'loving-memory',
        bio: 'Sanjeev kumar Singh, IPS of 1987 batch of MP Cadre was the Founder Trustee of REACH. A DG rank officer was the sculptors of NIA.He was the pillar of the organisation and had played a crucial role in  coordinating with central and state governments and agencies and PSUs for programmes and funding. His inspirational memory eggs REACH on its journey.',
        years: '1997-2019',
        contribution: 'Preserved and promoted folk dance forms'
      },
      {
        name: 'Ms. Rajshree Joshi',
        role: 'Founding Member',
        image: 'Ms._Rajshree_Joshi',
        folder: 'loving-memory',
        bio: 'She was a born-in- REACH leader of the cultural odyssey of the REACH who had kept it strong against the vulnerabilities and crises faced in its  journey of three decades. A memory that both cheers and saddens you.',
        years: '1996-2020',
        contribution: 'Built community partnerships and networks'
      }
    ]
  },
  'patrons': {
    title: 'Patrons',
    shortTitle: 'Patrons',
    icon: <Crown className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-800',
    members: [
      {
        name: 'Shri Raja Randhir Singh',
        role: 'Patron',
        image: 'Shri_Raja_Randhir_Singh',
        folder: 'patrons',
        bio: 'Raja Randhir Singh, from the royal family of Patiala, is a former shooting champion and one of India\'s most influential sports administrators. The first Indian shooter to win Asian Games gold (1978) and an Arjuna Awardee (1979), he has held key leadership roles for decades. Singh served as Secretary General of the IOA (1987–2012) and OCA (1991–2015), and has been OCA President since 2024, after serving as Acting President from 2021.',
        years: '2005-Present',
        contribution: 'Strategic guidance and major funding support'
      },
      {
        name: 'Shri Johri Lal',
        role: 'Patron',
        image: 'Shri_Johri_Lal',
        folder: 'patrons',
        bio: 'He was among ONGC\'s longest-serving Directors (HR), instrumental in establishing Virasat as a flagship CSR initiative. A deeply spiritual man and dedicated social activist, he tirelessly championed the cause of the weaker sections of society.',
        years: '2010-Present',
        contribution: 'Support for rural artist development programs'
      },
      {
        name: 'Dr. A.K. Balyan',
        role: 'Patron',
        image: 'Dr_A.K_Balyan',
        folder: 'patrons',
        bio: 'A world-class geochemist and CNG expert trained in Germany, he served as Director (HR) of ONGC and later as MD of Petronet LNG Ltd.',
        years: '2008-Present',
        contribution: 'Technology integration and digital initiatives'
      },
      {
        name: 'Dr. Alka Mittal',
        role: 'Patron',
        image: 'Dr_Alka_Mittal',
        folder: 'patrons',
        bio: 'Former Director HR and then CMD of ONGC, Dr. Mittal was instrumental in providing stability and guidance to REACH.',
        years: '2008-Present',
        contribution: 'Women&apos;s empowerment through cultural arts'
      }
    ]
  },
  'reach-trustees': {
    title: 'REACH (Trustees)',
    shortTitle: 'Trustees',
    icon: <Shield className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800',
    members: [
      { ...people['vijay-ranchan'], role: 'Trustee' },
      { ...people['rajeev-kumar-singh'], role: 'Trustee' },
      { ...people['lokesh-ohri'], role: 'Trustee' },
      { ...people['data-ram-purohit'], role: 'Trustee' },
      { ...people['devendra-narayan-singh'], role: 'Trustee' },
      { ...people['harish-awal'], role: 'Trustee' },
      { ...people['shankar-kumar-jha'], role: 'Trustee' },
      { ...people['shambhu-shekhar-singh'], role: 'Trustee' },
      { ...people['hemant-arora'], role: 'Trustee' }
    ]
  },
  'reach-office-bearers': {
    title: 'REACH (Office Bearers)',
    shortTitle: 'Office Bearers',
    icon: <Building2 className="w-6 h-6" />,
    color: 'from-emerald-500 to-cyan-500',
    bgColor: 'bg-gradient-to-br from-emerald-50 to-cyan-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-800',
    members: [
      { ...people['vijay-ranchan'], role: 'Chairman' },
      { ...people['rajeev-kumar-singh'], role: 'General Secretary' },
      { ...people['lokesh-ohri'], role: 'Treasurer' },
      { ...people['vijayshri-joshi'], role: 'Joint Secretary' },
      { ...people['sunil-verma'], role: 'Director- Art & Crafts' },
      { ...people['harish-awal'], role: 'Director – Digital Strategy & Media' },
      { ...people['shankar-kumar-jha'], role: 'Director – Artist Relations' }
    ]
  },
  'virasat-organising-committee': {
    title: 'Virasat Organising Committee',
    shortTitle: 'Organising Committee',
    icon: <Briefcase className="w-6 h-6" />,
    color: 'from-rose-500 to-pink-500',
    bgColor: 'bg-gradient-to-br from-rose-50 to-pink-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-800',
    members: [
      { ...people['sunaina-prakash-agarwal'], role: 'Vice President' },
      { ...people['ashutosh-shandilya'], role: 'ONGC Relations Lead' },
      { ...people['pradeep-kumar-maithel'], role: 'Head of Delivery & Operations' },
      { ...people['priyamvada-iyer'], role: 'Head – Media & Communications' },
      { ...people['kunal-rai'], role: 'Member' },
      { ...people['ghanshyam-rai'], role: 'Member' },
      { ...people['ashish-dua'], role: 'Member' }
    ]
  },
  'advisors': {
    title: 'Advisors',
    shortTitle: 'Advisors',
    icon: <Lightbulb className="w-6 h-6" />,
    color: 'from-amber-500 to-orange-500',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-800',
    members: [
      { ...people['tripurari-sharan'], role: 'Advisor' },
      { ...people['surendra-kumar-bhagat'], role: 'Advisor' },
      { ...people['ashok-kumar'], role: 'Advisor' },
      { ...people['alaknanda-ashok'], role: 'Advisor' },
      {
        name: 'Shri Manohar Bothra',
        role: 'Advisor',
        image: 'Shri_Manohar_Bothra_Senior_Journalist_Bhopal',
        folder: 'the-virasat-team',
        bio: 'Senior journalist and long associate of REACH, bringing media expertise and strategic communication insights to support the organization\'s mission and outreach efforts.'
      },
      { ...people['rajesh-badal'], role: 'Advisor' },
      { ...people['ashok-vajpeyi'], role: 'Advisor' },
      { ...people['madhuri-barthwal'], role: 'Advisor' },
      { ...people['mithilesh-kumar-jha'], role: 'Advisor' },
      { ...people['rajat-mishra'], role: 'Advisor' },
      { ...people['shekhar-pathak'], role: 'Advisor' },
      { ...people['anup-kumar'], role: 'Advisor' }
    ]
  },
  'reach-talkies': {
    title: 'REACH Talkies',
    shortTitle: 'Talkies',
    icon: <Film className="w-6 h-6" />,
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-gradient-to-br from-violet-50 to-purple-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-800',
    members: [
      { ...people['shobhna-khullar'], role: 'President' },
      { ...people['avinash-saxena'], role: 'Secretary' }
    ]
  }
};

const AboutPage = () => {
  const [activeCategory, setActiveCategory] = useState('in-loving-memory');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [scrollContainerRef, setScrollContainerRef] = useState<HTMLDivElement | null>(null);
  
  // Memorial carousel states
  const [focusedMemorialIndex, setFocusedMemorialIndex] = useState(0);
  const [isMemorialCarouselPlaying, setIsMemorialCarouselPlaying] = useState(true);
  
  // Read more states for bios
  const [expandedBios, setExpandedBios] = useState<{[key: string]: boolean}>({});

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle scroll position for mobile
  const handleScroll = () => {
    if (!isMobile || !scrollContainerRef) return;
    
    const scrollLeft = scrollContainerRef.scrollLeft;
    const cardWidth = 304; // w-72 + gap = 288 + 16 = 304px
    const currentCardIndex = Math.round(scrollLeft / cardWidth);
    setCurrentCard(Math.min(Math.max(currentCardIndex, 0), teamCategories[activeCategory].members.length - 1));
  };

  // Memorial carousel controls
  const toggleMemorialCarousel = () => {
    setIsMemorialCarouselPlaying(prev => !prev);
  };

  const goToMemorialCard = (index: number) => {
    setFocusedMemorialIndex(index);
  };

  // Toggle read more for bios
  const toggleBioExpansion = (memberKey: string) => {
    setExpandedBios(prev => ({
      ...prev,
      [memberKey]: !prev[memberKey]
    }));
  };

  // Helper function to determine if bio needs read more (more than 200 characters)
  const shouldShowReadMore = (bio: string) => {
    return bio.length > 200;
  };

  // Helper function to get truncated bio
  const getTruncatedBio = (bio: string) => {
    return bio.length > 200 ? bio.substring(0, 200) + '...' : bio;
  };

  // Reset memorial carousel when switching to memorial section
  useEffect(() => {
    if (activeCategory === 'in-loving-memory') {
      setFocusedMemorialIndex(0);
      setIsMemorialCarouselPlaying(true);
    }
  }, [activeCategory]);

  // Auto-advance carousel effect
  useEffect(() => {
    if (activeCategory !== 'in-loving-memory' || !isMemorialCarouselPlaying) {
      return;
    }

    const interval = setInterval(() => {
      setFocusedMemorialIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % teamCategories['in-loving-memory'].members.length;
        return nextIndex;
      });
    }, 4000);

    return () => {
      clearInterval(interval);
    };
  }, [activeCategory, isMemorialCarouselPlaying]);

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
        staggerChildren: 0.1
      }
    }
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    }
  };

  const memberVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.4 }
    }
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

        /* Memorial specific styles */
        .memorial-glow {
          box-shadow: 0 0 20px rgba(147, 51, 234, 0.3), 0 0 40px rgba(236, 72, 153, 0.2);
        }
        
        .memorial-card-hover {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .memorial-card-hover:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(147, 51, 234, 0.25), 0 0 0 1px rgba(236, 72, 153, 0.1);
        }

        /* Enhanced focus effects for memorial cards */
        .memorial-card-focused {
          transform: translateY(-4px) scale(1.05);
          box-shadow: 
            0 15px 30px -8px rgba(147, 51, 234, 0.25),
            0 0 0 2px rgba(147, 51, 234, 0.4),
            0 0 20px rgba(236, 72, 153, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
          border-color: rgba(147, 51, 234, 0.6) !important;
          background: linear-gradient(135deg, rgba(147, 51, 234, 0.03), rgba(236, 72, 153, 0.03)) !important;
        }

        .memorial-card-unfocused {
          transform: translateY(0) scale(1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .memorial-card-unfocused:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 25px -8px rgba(147, 51, 234, 0.2);
        }

        /* Pulsing glow effect for focused card */
        @keyframes memorial-pulse {
          0%, 100% { 
            box-shadow: 
              0 15px 30px -8px rgba(147, 51, 234, 0.25),
              0 0 0 2px rgba(147, 51, 234, 0.4),
              0 0 20px rgba(236, 72, 153, 0.15);
          }
          50% { 
            box-shadow: 
              0 18px 35px -8px rgba(147, 51, 234, 0.3),
              0 0 0 2px rgba(147, 51, 234, 0.5),
              0 0 25px rgba(236, 72, 153, 0.2);
          }
        }

        .memorial-card-focused {
          animation: memorial-pulse 2s ease-in-out infinite;
        }

        /* Timeline animation */
        @keyframes timeline-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
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
      `}</style>
      <div className="text-brand-black pt-28" style={{ backgroundColor: '#FFF7F5F4' }}>
      {/* Hero Section */}
      <motion.section
        className="py-8 px-6 container mx-auto"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <div className="text-center max-w-4xl mx-auto mb-8">
          <motion.h1 
            className="text-4xl md:text-5xl font-serif text-brand-brown mb-4 leading-tight"
            variants={fadeIn}
          >
            About Virasat by REACH
          </motion.h1>
          <motion.div 
            className="w-20 h-1 bg-gradient-to-r from-brand-red to-brand-brown mx-auto rounded-full"
            variants={fadeIn}
          ></motion.div>
        </div>
      </motion.section>

      {/* Main Content Section */}
      <motion.section
        className="py-8 px-6 container mx-auto relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Decorative Rangoli Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            whileInView={{ opacity: 0.6, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56"
          >
            <Image 
              src="/images/rangoli-about.png" 
              alt="Decorative Rangoli" 
              width={224}
              height={224}
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{ opacity: 0.8 }}
              onError={(e) => {
                console.log('Rangoli image failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => console.log('Rangoli image loaded successfully')}
            />
          </motion.div>
          
          {/* Top Right Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 0.5, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
            className="absolute top-0 right-0 w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56"
          >
            <Image 
              src="/images/rangoli-about2.png" 
              alt="Decorative Rangoli" 
              width={224}
              height={224}
              className="w-full h-full object-contain filter drop-shadow-lg scale-x-[-1]"
              style={{ opacity: 0.4 }}
              onError={(e) => {
                console.log('Rangoli image failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => console.log('Rangoli image loaded successfully')}
            />
          </motion.div>
          
          {/* Bottom Center Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            whileInView={{ opacity: 0.4, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.7, ease: "easeOut" }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-40 h-40 md:w-56 md:h-56 lg:w-64 lg:h-64"
          >
            <Image 
              src="/images/rangoli-about3.png" 
              alt="Decorative Rangoli" 
              width={256}
              height={256}
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{ opacity: 0.35 }}
              onError={(e) => {
                console.log('Rangoli image failed to load:', e);
                e.currentTarget.style.display = 'none';
              }}
              onLoad={() => console.log('Rangoli image loaded successfully')}
            />
          </motion.div>
          
          {/* Side decorative elements */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute inset-0"
          >
            {/* Left side decorative pattern */}
            <motion.div
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-16 h-16 md:w-20 md:h-20"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Image 
                src="/images/rangoli.svg" 
                alt="Decorative Rangoli" 
                width={80}
                height={80}
                className="w-full h-full object-contain"
                style={{ opacity: 0.2 }}
              />
            </motion.div>
            
            {/* Right side decorative pattern */}
            <motion.div
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-16 h-16 md:w-20 md:h-20"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
              <Image 
                src="/images/rangoli.svg" 
                alt="Decorative Rangoli" 
                width={80}
                height={80}
                className="w-full h-full object-contain"
                style={{ opacity: 0.2 }}
              />
            </motion.div>
            
            {/* Floating decorative dots */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-brand-red rounded-full"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  y: [-10, 10, -10],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </div>
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
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-brand-red/20 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-brand-brown/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-1/2 -left-8 w-6 h-6 bg-brand-red/25 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Main image container */}
                <div className="relative">
                  {/* Rotated background shadow */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-brand-red/10 to-brand-brown/10 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
                  
                  {/* Image frame */}
                  <div className="relative bg-white p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/REACH (2).png"
                      alt="REACH - Rural Entrepreneurship for Art & Cultural Heritage"
                      width={280}
                      height={210}
                      className="rounded-lg group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {/* Overlay gradient for depth */}
                    <div className="absolute inset-4 bg-gradient-to-t from-black/5 via-transparent to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                </div>
                
                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-red/5 via-transparent to-brand-brown/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>

            {/* Text Content - Right Column */}
            <motion.div 
              className="lg:col-span-8"
              variants={slideInRight}
            >
              <div className="space-y-6">
                
                {/* First Paragraph */}
                <motion.div 
                  className="bg-gradient-to-r from-brand-red/5 to-transparent p-4 rounded-xl border-l-4 border-brand-red"
                  variants={slideInRight}
                >
                  <p className="text-base md:text-lg font-sans text-brand-earthen leading-relaxed">
                    Born in 1995 in Dehradun, <span className="font-semibold text-brand-brown">REACH (Rural Entrepreneurship for Art & Cultural Heritage)</span> emerged to safeguard India&apos;s fading traditions at a time when modernization threatened to overshadow them. Its mission has been clear: preserve heritage, empower rural artists, and create sustainable cultural entrepreneurship.
                  </p>
                </motion.div>

                {/* Second Paragraph */}
                <motion.div 
                  className="bg-gradient-to-l from-brand-brown/5 to-transparent p-4 rounded-xl border-r-4 border-brand-brown"
                  variants={slideInRight}
                >
                  <p className="text-base md:text-lg font-sans text-brand-earthen leading-relaxed">
                    From this vision came <span className="font-semibold text-brand-red">Virāsat</span>, a festival that began as a small campus initiative and has grown into <span className="font-semibold text-brand-brown">Afro-Asia&apos;s largest celebration of art and culture</span>. Spanning fifteen days, it transforms Dehradun into a living museum where classical ragas blend with folk dances, handmade crafts find new admirers, and theatre, literature, and traditional cuisines bring communities together.
                  </p>
                </motion.div>

                {/* Third Paragraph with Impact */}
                <motion.div 
                  className="bg-gradient-to-br from-brand-red/8 via-brand-brown/5 to-brand-red/8 p-4 rounded-xl border border-brand-brown/20 relative overflow-hidden"
                  variants={slideInRight}
                >
                  {/* Decorative background elements - positioned outside text area */}
                  <div className="absolute -top-2 -right-2 w-12 h-12 border-2 border-brand-red/10 rounded-full"></div>
                  <div className="absolute -bottom-2 -left-2 w-8 h-8 border-2 border-brand-brown/10 rounded-full"></div>
                  
                  <p className="text-base md:text-lg font-sans text-brand-earthen leading-relaxed relative z-10">
                    Today, Virāsat is more than a festival — it is a <span className="font-semibold text-brand-red">movement of revival and pride</span>. Each year it welcomes over a million visitors, features more than four hundred performing artists and three hundred artisans from across India, and engages fifty thousand students from schools and colleges. With a media reach valued at over <span className="font-semibold text-brand-brown">₹22 crore</span>, it not only revives endangered art forms but also creates livelihoods, connects grassroots creators with global audiences, and fosters cultural pride among the youth. With nearly three decades of impact, Virāsat continues to shape the cultural economy while keeping India&apos;s living heritage alive, relevant, and celebrated.
                  </p>
                </motion.div>

              </div>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-16 px-6 container mx-auto relative"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        {/* Decorative Rangoli Background Elements for Team Section */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Top Left Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
            whileInView={{ opacity: 0.3, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
          >
            <Image 
              src="/images/rangoli.svg" 
              alt="Decorative Rangoli" 
              width={160}
              height={160}
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{ opacity: 0.4 }}
            />
          </motion.div>
          
          {/* Top Right Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 15 }}
            whileInView={{ opacity: 0.25, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40"
          >
            <Image 
              src="/images/rangoli.svg" 
              alt="Decorative Rangoli" 
              width={160}
              height={160}
              className="w-full h-full object-contain filter drop-shadow-lg scale-x-[-1]"
              style={{ opacity: 0.3 }}
            />
          </motion.div>
          
          {/* Bottom Center Rangoli */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            whileInView={{ opacity: 0.2, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
          >
            <Image 
              src="/images/rangoli.svg" 
              alt="Decorative Rangoli" 
              width={192}
              height={192}
              className="w-full h-full object-contain filter drop-shadow-lg"
              style={{ opacity: 0.25 }}
            />
          </motion.div>
        </div>

        {/* Team Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-12 relative z-10"
          variants={fadeIn}
        >
          <h2 className="text-4xl md:text-5xl font-serif text-brand-brown mb-4 leading-tight">
            Meet Our Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-red to-brand-brown mx-auto rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-brand-earthen leading-relaxed mb-6">
            The passionate individuals behind REACH and Virasat, dedicated to preserving and celebrating India&apos;s cultural heritage.
          </p>
        </motion.div>

        {/* Clean Professional Tab Navigation */}
        <motion.div 
          className="relative mb-16 px-4"
          initial="hidden"
          animate="visible"
          variants={categoryVariants}
        >
          {/* Desktop & Tablet: Clean Horizontal Tabs */}
          <div className="hidden sm:block">
            <div className="max-w-5xl mx-auto">
              {/* Tab Container with subtle background */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-gray-100">
                <div className="flex flex-wrap justify-center gap-2">
                  {Object.entries(teamCategories).map(([key, category], index) => (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                      className={`relative group transition-all duration-300 ease-out ${
                        activeCategory === key ? 'z-10' : 'z-0'
                }`}
                variants={memberVariants}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Tab Button */}
                      <div className={`relative px-6 py-4 rounded-xl transition-all duration-300 ${
                    activeCategory === key 
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg shadow-current/25` 
                          : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 shadow-sm hover:shadow-md border border-gray-200'
                      }`}>
                        {/* Content */}
                        <div className="flex items-center gap-3">
                          <div className={`transition-all duration-300 ${
                            activeCategory === key ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'
                          }`}>
                            {React.cloneElement(category.icon, { 
                              className: `w-5 h-5 ${activeCategory === key ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`
                            })}
                          </div>
                          <span className={`font-semibold text-sm whitespace-nowrap ${
                            activeCategory === key ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'
                          }`}>
                            {category.title}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            activeCategory === key 
                              ? 'bg-white/20 text-white' 
                              : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}>
                    {category.members.length}
                  </span>
          </div>
          
                        {/* Active indicator line */}
                {activeCategory === key && (
                  <motion.div
                            className="absolute bottom-0 left-0 right-0 h-1 bg-white/40 rounded-b-xl"
                            layoutId="activeIndicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                </div>
              </motion.button>
            ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Clean Vertical Stack */}
          <div className="block sm:hidden">
            <div className="max-w-sm mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg border border-gray-100">
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(teamCategories).map(([key, category], index) => {
                    const isLastItem = index === Object.entries(teamCategories).length - 1;
                    const isOddTotal = Object.entries(teamCategories).length % 2 === 1;
                    const shouldCenter = isLastItem && isOddTotal;
                    
                    return (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                      className={`relative group transition-all duration-300 ease-out ${
                        activeCategory === key ? 'z-10' : 'z-0'
                      } ${shouldCenter ? 'col-span-2 justify-self-center' : ''}`}
                variants={memberVariants}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Mobile Tab Button */}
                      <div className={`relative px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeCategory === key 
                          ? `bg-gradient-to-r ${category.color} text-white shadow-md` 
                          : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm border border-gray-200'
                      }`}>
                        {/* Content */}
                        <div className="flex items-center gap-2">
                          <div className={`transition-all duration-300 ${
                            activeCategory === key ? 'text-white' : 'text-gray-500'
                          }`}>
                            {React.cloneElement(category.icon, { 
                              className: `w-4 h-4 ${activeCategory === key ? 'text-white' : 'text-gray-500'}`
                            })}
                          </div>
                          <span className={`font-semibold text-xs leading-tight ${
                            activeCategory === key ? 'text-white' : 'text-gray-700'
                          }`}>
                            {category.shortTitle}
                          </span>
                          <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ml-auto ${
                            activeCategory === key 
                              ? 'bg-white/20 text-white' 
                              : 'bg-gray-100 text-gray-600'
                  }`}>
                    {category.members.length}
                  </span>
                        </div>
                </div>
              </motion.button>
                    );
                  })}
                </div>
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
            {/* Special Layout for In Loving Memory */}
            {activeCategory === 'in-loving-memory' ? (
              <div className={`${isMobile ? 'block' : 'grid grid-cols-1 lg:grid-cols-7'} gap-6`}>
                {/* Large Focus Box - Left Side - Visible on Mobile */}
                <div className={`${isMobile ? 'w-full mb-6' : 'lg:col-span-4'}`}>
                    <div className={`relative bg-white rounded-3xl ${isMobile ? 'p-4' : 'p-6'} shadow-2xl border border-purple-100 h-full ${isMobile ? 'min-h-[400px]' : 'min-h-[500px]'} overflow-hidden`}>
                      
                      

                      {/* Carousel Controls */}
                      <div className="absolute top-6 right-6 z-50 pointer-events-auto">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleMemorialCarousel();
                          }}
                          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 cursor-pointer border-0 outline-none focus:outline-none ${
                            isMemorialCarouselPlaying 
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600' 
                              : 'bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700'
                          }`}
                          style={{ zIndex: 1000, pointerEvents: 'auto' }}
                        >
                          {isMemorialCarouselPlaying ? (
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
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            isMemorialCarouselPlaying 
                              ? 'bg-purple-100 text-purple-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {isMemorialCarouselPlaying ? 'Auto-playing' : 'Paused'}
                          </span>
                        </div>
                      </div>

                      {/* Focused Memorial Content */}
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={focusedMemorialIndex}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="relative z-10 h-full flex flex-col"
                        >
                          {/* Memorial Header */}
                          <div className="text-center mb-6">
                            <div className="relative inline-block mb-4">
                              {/* Animated rings around profile picture */}
                              <motion.div
                                animate={{ 
                                  rotate: [0, 360],
                                  scale: [1, 1.05, 1]
                                }}
                                transition={{ 
                                  duration: 20,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                                className="absolute inset-0 w-32 h-32 mx-auto rounded-full border-2 border-purple-200/30"
                              />
                              <motion.div
                                animate={{ 
                                  rotate: [360, 0],
                                  scale: [1, 1.1, 1]
                                }}
                                transition={{ 
                                  duration: 15,
                                  repeat: Infinity,
                                  ease: "linear"
                                }}
                                className="absolute inset-0 w-36 h-36 mx-auto rounded-full border border-pink-200/20"
                              />
                              
                              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden relative z-10">
                                {/* Enhanced Border with Multiple Layers */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 p-1">
                                  <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-100 to-pink-100 p-1">
                                    <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
                                      <Image
                                        src={getCloudinaryImageUrl(teamCategories[activeCategory].members[focusedMemorialIndex].folder, teamCategories[activeCategory].members[focusedMemorialIndex].image, 128)}
                                        alt={teamCategories[activeCategory].members[focusedMemorialIndex].name}
                                        width={128}
                                        height={128}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Decorative Elements Around Profile */}
                                <motion.div
                                  animate={{ 
                                    rotate: [0, 360],
                                    scale: [1, 1.05, 1]
                                  }}
                                  transition={{ 
                                    duration: 8,
                                    repeat: Infinity,
                                    ease: "linear"
                                  }}
                                  className="absolute -inset-2 rounded-full border border-purple-200/30"
                                />
                                <motion.div
                                  animate={{ 
                                    rotate: [360, 0],
                                    scale: [1, 1.08, 1]
                                  }}
                                  transition={{ 
                                    duration: 12,
                                    repeat: Infinity,
                                    ease: "linear"
                                  }}
                                  className="absolute -inset-4 rounded-full border border-pink-200/20"
                                />
                              </div>
                              
                              {/* Enhanced Memorial Heart with sophisticated animation */}
                              <motion.div 
                                animate={{ 
                                  scale: [1, 1.3, 1],
                                  rotate: [0, 8, -8, 0],
                                  y: [0, -2, 0]
                                }}
                                transition={{ 
                                  duration: 3,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                                className="absolute -top-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 shadow-lg shadow-pink-400/60 ring-2 ring-pink-300/40"
                              >
                                <motion.div
                                  animate={{ 
                                    scale: [1, 1.1, 1],
                                    rotate: [0, 5, -5, 0]
                                  }}
                                  transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                  }}
                                >
                                  <Heart className="w-5 h-5 text-white fill-current drop-shadow-sm" />
                                </motion.div>
                                
                                {/* Pulsing ring effect */}
                                <motion.div
                                  animate={{ 
                                    scale: [1, 1.5, 1],
                                    opacity: [0.3, 0, 0.3]
                                  }}
                                  transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                  }}
                                  className="absolute inset-0 rounded-full border-2 border-pink-300/50"
                                />
                              </motion.div>
                            </div>

                            <h3 className="text-xl md:text-2xl font-serif text-purple-800 leading-tight mb-2">
                              {teamCategories[activeCategory].members[focusedMemorialIndex].name}
                            </h3>
                            <p className="text-purple-600 font-semibold text-base mb-4">
                              {teamCategories[activeCategory].members[focusedMemorialIndex].role}
                            </p>
                          </div>

                          {/* Enhanced Memorial Content */}
                          <div className="space-y-4 flex-1">
                            <div className="relative">
                              
                              <h4 className="text-base font-serif text-purple-800 mb-2 relative">
                                <motion.span
                                  animate={{ 
                                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                                  }}
                                  transition={{ 
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear"
                                  }}
                                  className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_100%] bg-clip-text text-transparent font-semibold"
                                >
                                  Biography
                                </motion.span>
                                
                                {/* Decorative line under title */}
                                <motion.div
                                  animate={{ 
                                    scaleX: [0, 1, 0],
                                    opacity: [0, 0.6, 0]
                                  }}
                                  transition={{ 
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 1
                                  }}
                                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                                />
                              </h4>
                              <div className="relative">
                                {/* Enhanced Biography Text Container */}
                                <motion.div
                                  initial={{ opacity: 0, y: 15 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.8, delay: 0.2 }}
                                  className="relative bg-gradient-to-br from-purple-50/30 to-pink-50/30 rounded-xl p-4 border border-purple-100/50 shadow-sm"
                                >
                                  
                                  <div className="relative z-10 text-gray-700 text-base leading-relaxed text-justify">
                                    {teamCategories[activeCategory].members[focusedMemorialIndex].bio}
                                  </div>
                                  
                                </motion.div>
                                
                                {teamCategories[activeCategory].members[focusedMemorialIndex].name === 'Shri. Rajendra Prasad Joshi' && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="relative bg-gradient-to-br from-purple-50/20 to-pink-50/20 rounded-lg p-3 mt-3 border border-purple-100/30 shadow-sm"
                                  >
                                    <div className="text-gray-700 text-base leading-relaxed text-justify font-medium">
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

                {/* Small Cards Grid - Right Side on Desktop, Below Large Card on Mobile */}
                <div className={`${isMobile ? 'w-full' : 'lg:col-span-3'}`}>
                  <div className="space-y-4">
                    
                    {/* Small Memorial Cards - 3x3 Grid */}
                    <div className="grid grid-cols-3 gap-3">
                      {teamCategories[activeCategory].members.map((member: any, index: number) => (
                        <motion.div
                          key={member.name}
                          className="cursor-pointer transition-all duration-300"
                          onClick={() => goToMemorialCard(index)}
                          variants={memberVariants}
                        >
                          <div className={`bg-white rounded-2xl ${isMobile ? 'p-2' : 'p-3'} border-2 aspect-square flex flex-col relative overflow-hidden ${
                            index === focusedMemorialIndex 
                              ? 'memorial-card-focused' 
                              : 'memorial-card-unfocused border-purple-200'
                          }`}>
                            
                            <div className="flex flex-col items-center text-center h-full justify-between">
                              {/* Profile Image Section - Fixed height */}
                              <div className={`relative flex-shrink-0 ${isMobile ? 'mb-1' : 'mb-2'}`}>
                                <div className={`${isMobile ? 'w-14 h-14' : 'w-16 h-16'} rounded-full overflow-hidden transition-all duration-300 relative ${
                                  index === focusedMemorialIndex 
                                    ? 'shadow-lg shadow-purple-400/50 ring-2 ring-purple-300/40' 
                                    : 'shadow-md shadow-purple-300/30'
                                }`}>
                                  {/* Enhanced border with gradient */}
                                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 p-0.5">
                                    <div className="w-full h-full rounded-full bg-white p-0.5">
                                      <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50">
                                        <Image
                                          src={getCloudinaryImageUrl(member.folder, member.image, isMobile ? 56 : 64)}
                                          alt={member.name}
                                          width={isMobile ? 56 : 64}
                                          height={isMobile ? 56 : 64}
                                          className="w-full h-full object-cover transition-all duration-500"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                
                                {/* Enhanced Memorial Heart */}
                                <motion.div 
                                  animate={index === focusedMemorialIndex ? {
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 5, -5, 0]
                                  } : {}}
                                  transition={{ 
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                  }}
                                  className={`absolute -top-1 -right-1 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'} rounded-full flex items-center justify-center transition-all duration-300 ${
                                    index === focusedMemorialIndex 
                                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 shadow-lg shadow-pink-400/60 ring-2 ring-pink-300/40' 
                                      : 'bg-gradient-to-r from-purple-400 to-pink-400 shadow-md shadow-purple-400/30'
                                  }`}
                                >
                                  <Heart className={`${isMobile ? 'w-1.5 h-1.5' : 'w-2 h-2'} text-white fill-current drop-shadow-sm`} />
                                  
                                  {/* Pulsing ring for focused cards */}
                                  {index === focusedMemorialIndex && (
                                    <motion.div
                                      animate={{ 
                                        scale: [1, 1.5, 1],
                                        opacity: [0.3, 0, 0.3]
                                      }}
                                      transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeOut"
                                      }}
                                      className="absolute inset-0 rounded-full border border-pink-300/50"
                                    />
                                  )}
                                </motion.div>
                              </div>
                              
                              {/* Text Content Section - Flexible height */}
                              <div className={`w-full flex flex-col ${isMobile ? 'gap-0.5' : 'gap-1'} flex-1 justify-center px-1`}>
                                <h4 className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-serif leading-tight transition-colors duration-300 ${isMobile ? 'truncate' : ''} ${
                                  index === focusedMemorialIndex 
                                    ? 'text-purple-800 font-bold' 
                                    : 'text-purple-700'
                                }`}>
                                  {isMobile ? member.name.split(' ').slice(0, 2).join(' ') : member.name}
                                </h4>
                                <p className={`font-semibold ${isMobile ? 'text-[9px]' : 'text-xs'} leading-tight ${isMobile ? 'truncate' : ''} ${
                                  index === focusedMemorialIndex 
                                    ? 'text-purple-700 font-bold' 
                                    : 'text-purple-600'
                                }`}>
                                  {isMobile ? member.role.split(' ').slice(0, 3).join(' ') : member.role}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            ) : (
              /* Regular Grid Layout for Patrons and Current Team */
            <div className={`${isMobile ? 'hidden' : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'} gap-6`}>
              {teamCategories[activeCategory].members.map((member: any, index: number) => (
                <motion.div
                  key={member.name}
                  className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border-2 ${teamCategories[activeCategory].borderColor} hover:border-opacity-60`}
                  variants={memberVariants}
                  style={{
                    background: `linear-gradient(135deg, ${teamCategories[activeCategory].bgColor.replace('bg-gradient-to-br ', '')}, white)`
                  }}
                >
                  <div className="text-center">
                    <div className="relative mb-6">
                      <div className={`w-20 h-20 mx-auto rounded-full overflow-hidden border-4 transition-all duration-300 relative`}
                           style={{ borderColor: teamCategories[activeCategory].color.replace('from-', '').replace(' to-', ', ') }}>
                        <Image
                          src={getCloudinaryImageUrl(member.folder, member.image, 80)}
                          alt={member.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      {/* Special badges for different categories */}
                      {activeCategory === 'patrons' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                          <Crown className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                      {activeCategory === 'reach-trustees' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <Shield className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                      {activeCategory === 'reach-office-bearers' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <Building2 className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                      {activeCategory === 'virasat-organising-committee' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Briefcase className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                      {activeCategory === 'advisors' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                          <Lightbulb className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                      {activeCategory === 'reach-talkies' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                          <Film className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                      {activeCategory === 'in-loving-memory' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                          <Heart className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    
                    <h3 className={`text-lg font-serif ${teamCategories[activeCategory].textColor} leading-tight mb-2`}>
                      {member.name}
                    </h3>
                    <p className="text-brand-red font-semibold text-base mb-3">{member.role}</p>
                    
                    {/* Additional info based on category */}
                    
                    <div className="text-brand-earthen text-base leading-relaxed mb-3 text-justify whitespace-pre-line">
                      {shouldShowReadMore(member.bio) && !expandedBios[`${activeCategory}-${member.name}`] 
                        ? getTruncatedBio(member.bio)
                        : member.bio
                      }
                      {shouldShowReadMore(member.bio) && (
                        <button
                          onClick={() => toggleBioExpansion(`${activeCategory}-${member.name}`)}
                          className="ml-2 text-brand-red font-semibold hover:underline focus:outline-none"
                        >
                          {expandedBios[`${activeCategory}-${member.name}`] ? 'Read Less' : 'Read More'}
                        </button>
                      )}
                    </div>
                    
                  </div>
                </motion.div>
              ))}
            </div>
            )}

            {/* Mobile Layout - Only for Patrons and Current Team */}
            {isMobile && activeCategory !== 'in-loving-memory' && (
              <div className="relative">
                <div 
                  ref={setScrollContainerRef}
                  className="flex overflow-x-auto overflow-y-hidden scrollbar-hide gap-4 pb-4"
                  onScroll={handleScroll}
                  style={{
                    scrollSnapType: 'x mandatory',
                    scrollBehavior: 'smooth',
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  {teamCategories[activeCategory].members.map((member: any, index: number) => (
                    <motion.div
                      key={member.name}
                      className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border-2 ${teamCategories[activeCategory].borderColor} hover:border-opacity-60 flex-shrink-0 w-72`}
                      style={{
                        scrollSnapAlign: 'start',
                        background: `linear-gradient(135deg, ${teamCategories[activeCategory].bgColor.replace('bg-gradient-to-br ', '')}, white)`
                      }}
                    >
                      <div className="text-center">
                        <div className="relative mb-6">
                          <div className={`w-20 h-20 mx-auto rounded-full overflow-hidden border-4 transition-all duration-300 relative`}
                               style={{ borderColor: teamCategories[activeCategory].color.replace('from-', '').replace(' to-', ', ') }}>
                            <Image
                              src={getCloudinaryImageUrl(member.folder, member.image, 80)}
                              alt={member.name}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          {/* Special badges for different categories */}
                          {activeCategory === 'patrons' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                              <Crown className="w-3 h-3 text-white fill-current" />
                            </div>
                          )}
                          {activeCategory === 'reach-trustees' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                              <Shield className="w-3 h-3 text-white fill-current" />
                            </div>
                          )}
                          {activeCategory === 'reach-office-bearers' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                              <Building2 className="w-3 h-3 text-white fill-current" />
                            </div>
                          )}
                          {activeCategory === 'virasat-organising-committee' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                              <Briefcase className="w-3 h-3 text-white fill-current" />
                            </div>
                          )}
                          {activeCategory === 'advisors' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                              <Lightbulb className="w-3 h-3 text-white fill-current" />
                            </div>
                          )}
                          {activeCategory === 'reach-talkies' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center">
                              <Film className="w-3 h-3 text-white fill-current" />
                            </div>
                          )}
                          {activeCategory === 'in-loving-memory' && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                              <Heart className="w-3 h-3 text-white fill-current" />
                            </div>
                          )}
                        </div>
                        
                        <h3 className={`text-lg font-serif ${teamCategories[activeCategory].textColor} leading-tight mb-2`}>
                          {member.name}
                        </h3>
                        <p className="text-brand-red font-semibold text-base mb-3">{member.role}</p>
                        
                        {/* Additional info based on category */}
                        
                        <div className="text-brand-earthen text-base leading-relaxed mb-3 text-justify whitespace-pre-line">
                          {shouldShowReadMore(member.bio) && !expandedBios[`${activeCategory}-${member.name}`] 
                            ? getTruncatedBio(member.bio)
                            : member.bio
                          }
                          {shouldShowReadMore(member.bio) && (
                            <button
                              onClick={() => toggleBioExpansion(`${activeCategory}-${member.name}`)}
                              className="ml-2 text-brand-red font-semibold hover:underline focus:outline-none"
                            >
                              {expandedBios[`${activeCategory}-${member.name}`] ? 'Read Less' : 'Read More'}
                            </button>
                          )}
                        </div>
                        
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.section>

      {/* Donate CTA Section */}
      <motion.section
        className="py-6 px-6 container mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <motion.div 
          className="text-center max-w-xl mx-auto"
          variants={fadeIn}
        >
          <h2 className="text-2xl md:text-3xl font-serif text-brand-brown mb-2">
            Support Our Mission
          </h2>
          <p className="text-sm md:text-base text-brand-earthen mb-4">
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
      </div>
    </>
  );
};

export default AboutPage;
