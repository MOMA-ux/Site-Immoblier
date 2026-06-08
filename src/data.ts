import { Property, TeamMember, Testimonial } from './types';

export const PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Villa Lou Paradou',
    description: 'Baignée de lumière, cette somptueuse villa contemporaine offre des prestations de luxe absolu sur les hauteurs de Saint-Tropez. Dotée d\'une vue panoramique spectaculaire sur la baie, elle dispose d\'un double séjour de réception, d\'une cuisine professionnelle haut de gamme et d\'une terrasse d\'envergure s\'ouvrant sur une piscine à débordement chauffée. Un havre de paix intemporel mêlant l\'esthétique minimaliste moderne et la douceur méditerranéenne.',
    price: 12500000,
    location: 'Collines de Saint-Tropez, PACA',
    city: 'Saint-Tropez',
    type: 'villa',
    bedrooms: 5,
    bathrooms: 6,
    area: 450,
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
    ],
    agent: {
      name: 'Alexandra Blanc',
      role: 'Directrice Riviera & Prestige',
      phone: '+33 6 12 34 56 78',
      email: 'a.blanc@elite-immo.fr',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    features: [
      'Piscine à débordement chauffée',
      'Domotique intégrée',
      'Cave à vin climatisée',
      'Salle de cinéma privée',
      'Studio d\'invités indépendant',
      'Système de sécurité renforcé',
      'Garage fermé pour 4 véhicules'
    ],
    yearBuilt: 2022,
    rating: 4.9,
    status: 'sale',
    coordinates: { lat: 43.2678, lng: 6.6394 },
    isFeatured: true
  },
  {
    id: 'prop-2',
    title: 'Penthouse Splendide',
    description: 'Surplombant la principauté de Monaco, cet appartement d\'exception en dernier étage (penthouse) incarne l\'élégance urbaine à l\'état pur. Ses larges baies vitrées de 4 mètres de hauteur offrent une vue imprenable à 360° sur la mer de Ligurie et le port de Monaco. Récemment rénové par un architecte d\'intérieur de renommée internationale, il allie marbres précieux, boiseries nobles et équipements domotiques de pointe.',
    price: 8900000,
    location: 'Quartier Monte-Carlo, Monaco',
    city: 'Monaco',
    type: 'apartment',
    bedrooms: 3,
    bathrooms: 3,
    area: 210,
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'
    ],
    agent: {
      name: 'Jean-Marc Dupont',
      role: 'Spécialiste Luxe & International',
      phone: '+377 93 45 67 89',
      email: 'jm.dupont@elite-immo.fr',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    },
    features: [
      'Terrasse sur le toit de 120m²',
      'Solarium et jacuzzi privé',
      'Conciergerie 24h/24',
      'Accès ascenseur sécurisé privé',
      'Matériaux haut de gamme (marbre de Carrare)',
      'Climatisation réversible intégrale',
      '2 places de parking en sous-sol'
    ],
    yearBuilt: 2018,
    rating: 4.8,
    status: 'sale',
    coordinates: { lat: 43.7384, lng: 7.4246 },
    isFeatured: true
  },
  {
    id: 'prop-3',
    title: 'Duplex Haussmannien d\'Exception',
    description: 'Au cœur du très prestigieux 16ème arrondissement de Paris, ce superbe appartement duplex occupe les derniers niveaux d\'un immeuble en pierre de taille parfaitement entretenu. Conservant tout le charme de l\'ancien (cheminées d\'origine, moulures classées, parquet en point de Hongrie), cet espace a été restructuré avec brio pour intégrer des volumes contemporains et fluides. Ses multiples balcons filants offrent des vues magistrales sur la Tour Eiffel.',
    price: 4200000,
    location: 'Avenue Victor Hugo, Paris 16e',
    city: 'Paris',
    type: 'apartment',
    bedrooms: 4,
    bathrooms: 3,
    area: 180,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    agent: {
      name: 'Nathalie Lemaire',
      role: 'Conseillère Immobilier Paris intra-muros',
      phone: '+33 6 98 76 54 32',
      email: 'n.lemaire@elite-immo.fr',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    },
    features: [
      'Vue directe sur la Tour Eiffel',
      'Moulures et cheminées d\'époque',
      'Parquet Point de Hongrie',
      'Balcon filant de 18m²',
      'Cuisine dinatoire sur mesure',
      'Gardienne d\'immeuble permanente',
      'Grande cave voutée'
    ],
    yearBuilt: 1890,
    rating: 4.7,
    status: 'sale',
    coordinates: { lat: 48.8694, lng: 2.2828 },
    isFeatured: true
  },
  {
    id: 'prop-4',
    title: 'Chalet des Sommets',
    description: 'Situé dans le domaine prisé de Megève, à quelques minutes des pistes de ski de Rochebrune, ce spectaculaire chalet d\'architecte marie avec audace le vieux bois de pays, la pierre locale et le verre. Ses hauteurs sous plafond monumentales, sa cheminée centrale à triple foyer et ses baies orientées plein sud garantissent une chaleur naturelle et une luminosité incomparable toute l\'année.',
    price: 6800000,
    location: 'Rochebrune, Megève',
    city: 'Megève',
    type: 'villa',
    bedrooms: 6,
    bathrooms: 6,
    area: 350,
    images: [
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    agent: {
      name: 'Jean-Marc Dupont',
      role: 'Spécialiste Luxe & International',
      phone: '+377 93 45 67 89',
      email: 'jm.dupont@elite-immo.fr',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    },
    features: [
      'Espace Bien-être (Spa, Sauna, Jacuzzi)',
      'Piscine intérieure chauffée',
      'Ski-in / Ski-out (Accès direct pistes)',
      'Cheminée suspendue monumentale',
      'Local à skis chauffant ultra-moderne',
      'Chambre de service dédiée',
      'Terrasse extérieure avec brasero'
    ],
    yearBuilt: 2020,
    rating: 4.95,
    status: 'sale',
    coordinates: { lat: 45.8569, lng: 6.6186 },
    isFeatured: true
  },
  {
    id: 'prop-5',
    title: 'Bureaux Skylight Prestige',
    description: 'Idéalement situés dans une tour haut de gamme du quartier d\'affaires de Paris La Défense, ces bureaux de chef d\'entreprise et espaces collaboratifs de très haut standing sont prêts à accueillir votre siège social. Dotés d\'une vue vertigineuse sur l\'axe historique de Paris, l\'aménagement modulable haut de gamme privilégie le confort acoustique, la luminosité naturelle constante et l\'efficacité opérationnelle.',
    price: 15400000,
    location: 'Quartier d\'affaires de La Défense, Puteaux',
    city: 'Paris',
    type: 'office',
    bedrooms: 0,
    bathrooms: 4,
    area: 680,
    images: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80'
    ],
    agent: {
      name: 'Nathalie Lemaire',
      role: 'Conseillère Immobilier Paris intra-muros',
      phone: '+33 6 98 76 54 32',
      email: 'n.lemaire@elite-immo.fr',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    },
    features: [
      'Certification environnementale BREEAM Excellent',
      'Aménagement entièrement modulable',
      'Insonorisation acoustique poussée',
      'Accès sécurisé par badge RFID/Biométrie',
      'Système de filtration d\'air de pointe',
      '8 places privatives en parking sous-terrain',
      'Salles de réunion connectées équipées 8K'
    ],
    yearBuilt: 2021,
    rating: 4.6,
    status: 'sale',
    coordinates: { lat: 48.8897, lng: 2.2418 }
  },
  {
    id: 'prop-6',
    title: 'Boutique Concept Store Triangle d\'Or',
    description: 'Une opportunité d\'implantation extraordinaire au sein du Triangle d\'Or de la mode à Paris. Ce local commercial bénéficie d\'un linéaire de vitrine de premier ordre de plus de 9 mètres de façade, offrant une visibilité absolue sur un axe piétonnier extrêmement plébiscité. Le sous-sol est aménagé pour le stockage de pièces de collection en sécurité avec escalier d\'honneur de liaison.',
    price: 5400000,
    location: 'Rue du Faubourg Saint-Honoré, Paris 8e',
    city: 'Paris',
    type: 'commercial',
    bedrooms: 0,
    bathrooms: 2,
    area: 125,
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80'
    ],
    agent: {
      name: 'Nathalie Lemaire',
      role: 'Conseillère Immobilier Paris intra-muros',
      phone: '+33 6 98 76 54 32',
      email: 'n.lemaire@elite-immo.fr',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    },
    features: [
      'Vitrine d\'angle linéaire de 9m',
      'Parfaite rénovation contemporaine',
      'Alarme périmétrique et rideau métallique de sécurité',
      'Climatisation commerciale réversible',
      'Extraction haute installée',
      'Zone de livraison arrière directe',
      'Cave de stockage saine et sécurisée'
    ],
    yearBuilt: 1910,
    rating: 4.75,
    status: 'sale',
    coordinates: { lat: 48.8711, lng: 2.3181 }
  },
  {
    id: 'prop-7',
    title: 'Villa Céleste et Crique Privée',
    description: 'Trônant fièrement sur le cap d\'Antibes, la Villa Céleste propose une expérience méditerranéenne exclusive avec un accès quasi direct à une crique rocheuse abritée. Son architecture moderne privilégie les lignes intemporelles de béton blanc sablé façonnées par un célèbre cabinet. Entourée d\'un jardin paysager peuplé d\'oliviers centenaires et de pins parasols.',
    price: 14800000,
    location: 'Cap d\'Antibes, Alpes-Maritimes',
    city: 'Cap d\'Antibes',
    type: 'villa',
    bedrooms: 6,
    bathrooms: 7,
    area: 520,
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80'
    ],
    agent: {
      name: 'Alexandra Blanc',
      role: 'Directrice Riviera & Prestige',
      phone: '+33 6 12 34 56 78',
      email: 'a.blanc@elite-immo.fr',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    features: [
      'Accès privatif sentier douanier',
      'Héliport agréé à proximité',
      'Piscine miroir chauffée à l\'eau salée',
      'Espace barbecue haut de gamme en marbre',
      'Cuisine d\'été équipée complète',
      'Technologie de domotique intégrale Savant',
      'Logement de gardien indépendant complet'
    ],
    yearBuilt: 2023,
    rating: 5.0,
    status: 'sale',
    coordinates: { lat: 43.5516, lng: 7.1264 },
    isFeatured: true
  },
  {
    id: 'prop-8',
    title: 'Loft Contemporain d\'Atelier',
    description: 'Né de la réhabilitation totale d\'un ancien chai de stockage de vin dans un quartier historique de Bordeaux, ce loft spectaculaire impressionne par ses hauteurs de plafond de près de 6 mètres sous verrière ancienne. Les matériaux bruts tels que l\'acier patiné, le béton ciré et la pierre blonde girondine apportent un cachet industriel chic unique.',
    price: 1850000,
    location: 'Quartier des Chartrons, Bordeaux',
    city: 'Bordeaux',
    type: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 165,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    agent: {
      name: 'Nathalie Lemaire',
      role: 'Conseillère Immobilier Paris intra-muros',
      phone: '+33 6 98 76 54 32',
      email: 'n.lemaire@elite-immo.fr',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80'
    },
    features: [
      'Verrière zénithale motorisée triple vitrage',
      'Patio végétalisé de 30m² sans aucun vis-à-vis',
      'Cuisine américaine avec piano de cuisson haut de gamme',
      'Béton ciré poli au sol',
      'Suite parentale de 45m² avec dressing suspendu',
      'Chauffage d\'ambiance et climatisation par le sol',
      'Garage privatif fermé automatique'
    ],
    yearBuilt: 2019,
    rating: 4.8,
    status: 'sale',
    coordinates: { lat: 44.8542, lng: -0.5721 }
  },
  {
    id: 'prop-9',
    title: 'Espace Corporate L\'Atelier',
    description: 'Sublime plateau d\'affaires de style atelier industriel au coeur du pôle tertiaire de Lyon. Idéal pour d\'ambitieux cabinets juridiques, agences de design d\'intérieur ou startups souhaitant proposer une expérience de travail hautement créative et inspirante pour leurs collaborateurs dans un environnement cosy haut de gamme.',
    price: 2900000,
    location: 'Quartier de la Confluence, Lyon',
    city: 'Lyon',
    type: 'office',
    bedrooms: 0,
    bathrooms: 3,
    area: 280,
    images: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80'
    ],
    agent: {
      name: 'Jean-Marc Dupont',
      role: 'Spécialiste Luxe & International',
      phone: '+377 93 45 67 89',
      email: 'jm.dupont@elite-immo.fr',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80'
    },
    features: [
      'Ancien bâtiment industriel totalement restructuré',
      'Briques apparentes vernies',
      'Grandes fenêtres industrielles cintrées',
      'Cuisine dinatoire type cafétéria',
      'Climatisation double flux réversible de haute performance',
      'Espace détente zen avec douches privées',
      'Local à vélos équipé avec recharges électriques'
    ],
    yearBuilt: 2021,
    rating: 4.55,
    status: 'sale',
    coordinates: { lat: 45.7485, lng: 4.8192 }
  },
  {
    id: 'prop-10',
    title: 'Boutiques de l\'Impérial Biarritz',
    description: 'Une superbe adresse commerciale de premier plan sur l\'avenue emblématique de Biarritz qui s\'étend face aux palaces. Un espace de vente élégant bénéficiant de plafonds hauts, d\'arches en encorbellement d\'origine et d\'une luminosité grandiose, optimal pour une maison de couture, d\'horlogerie ou de haute joaillerie.',
    price: 3600000,
    location: 'Avenue de l\'Impératrice, Biarritz',
    city: 'Biarritz',
    type: 'commercial',
    bedrooms: 0,
    bathrooms: 2,
    area: 110,
    images: [
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    agent: {
      name: 'Alexandra Blanc',
      role: 'Directrice Riviera & Prestige',
      phone: '+33 6 12 34 56 78',
      email: 'a.blanc@elite-immo.fr',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
    },
    features: [
      'Arches en pierre naturelle d\'époque Napoléon III',
      'Parquet de chêne massif teinté ébène',
      'Vitrine securisée blindée triple couche anti-effraction',
      'Domotique d\'ambiance et éclairages à LED directionnels',
      'Emplacement de parking privé inclus',
      'Système d\'alarme relié centre de télésurveillance',
      'Cuisine d\'appoint privée pour le personnel'
    ],
    yearBuilt: 1875,
    rating: 4.9,
    status: 'sale',
    coordinates: { lat: 43.4862, lng: -1.5541 }
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Alexandra Blanc',
    role: 'Directrice & Fondatrice',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    email: 'a.blanc@elite-immo.fr',
    phone: '+33 6 12 34 56 78'
  },
  {
    name: 'Jean-Marc Dupont',
    role: 'Spécialiste Propriétés d\'Exception',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    email: 'jm.dupont@elite-immo.fr',
    phone: '+377 93 45 67 89'
  },
  {
    name: 'Nathalie Lemaire',
    role: 'Experte Résidentiel Paris & Grand Paris',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    email: 'n.lemaire@elite-immo.fr',
    phone: '+33 6 98 76 54 32'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Pierre & Isabelle Laurent',
    role: 'Aquéreurs de la Villa Lou Paradou',
    comment: 'L\'accompagnement d\'Elite Immo a été irréprochable du début à la signature de notre bien d\'exception. Leur sens du détail et du secret professionnel est exemplaire.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Sébastien Morel',
    role: 'Fondateur de Morel & Associés',
    comment: 'Nous avons fait l\'acquisition de nos bureaux Skylight via Elite Immo. Un dossier complexe géré d\'une main de maître par Nathalie Lemaire avec professionnalisme.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
  },
  {
    name: 'Sophie Bernier',
    role: 'Propriétaire d\'un Loft résidentiel',
    comment: 'Une discrétion hors du commun, un service sur-mesure digne des plus grands palaces. Un merci infini à toute l\'équipe pour nous avoir trouvé ce joyau caché.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
  }
];

export const ALL_FEATURES_LIST = Array.from(
  new Set(PROPERTIES.flatMap((p) => p.features))
);

export const CITIES = Array.from(
  new Set(PROPERTIES.map((p) => p.city))
);

export const STATS = [
  { value: '1.2B€+', label: 'Volume de transaction cumulé' },
  { value: '150+', label: 'Propriétés vendues chaque année' },
  { value: '99%', label: 'Indice de satisfaction client' },
  { value: '15 Ans', label: 'D\'expérience sur le marché ultra-luxe' }
];

export const VALUES = [
  {
    title: 'Excellence',
    description: 'Chaque détail de nos services est continuellement ajusté pour s\'approcher d\'une rigueur absolue et de l\'excellence attendue par nos usagers.'
  },
  {
    title: 'Discrétion',
    description: 'La clé de voûte de nos partenariats réside dans la confidentialité, le respect secret des transactions privées et des informations de notre clientèle.'
  },
  {
    title: 'Passion',
    description: 'La passion de la belle pierre et de l\'architecture hors normes nous pousse chaque jour à dénicher des biens d\'exception et inédits sur le marché.'
  },
  {
    title: 'Sur-Mesure',
    description: 'Parce que chaque acquisition est un projet de vie singulier, nous créons des relations sur-mesure, de la recherche exclusive à l\'emménagement.'
  }
];
