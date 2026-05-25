import type { Order, Product } from "@/types/commerce";

export const products: Product[] = [
  {
    id: "p-001",
    slug: "aura-watch-pro",
    name: "Aura Watch Pro",
    tagline: "Monitoramento inteligente com acabamento aeroespacial.",
    description:
      "Um smartwatch premium para rotina, treino e produtividade, com tela AMOLED, bateria de longa duracao e sensores de saude em tempo real.",
    category: "Wearables",
    price: 389.9,
    compareAtPrice: 529.9,
    rating: 4.9,
    reviewCount: 1248,
    image:
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=1200&q=90",
    ],
    colors: ["#f8fafc", "#111827", "#6d28d9"],
    variants: [
      { name: "Pulseira", value: "Grafite", stock: 28 },
      { name: "Pulseira", value: "Titanio", stock: 13 },
    ],
    features: ["AMOLED 1.9", "Resistente a agua", "7 dias de bateria", "Bluetooth 5.4"],
    badge: "Mais vendido",
  },
  {
    id: "p-002",
    slug: "sonic-pods-max",
    name: "Sonic Pods Max",
    tagline: "Audio espacial, cancelamento ativo e estojo magnetico.",
    description:
      "Fones sem fio com assinatura sonora precisa, chamadas cristalinas e modo transparencia para trabalhar, viajar e treinar.",
    category: "Audio",
    price: 249.9,
    compareAtPrice: 349.9,
    rating: 4.8,
    reviewCount: 842,
    image:
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=1200&q=90",
    ],
    colors: ["#ffffff", "#18181b", "#94a3b8"],
    variants: [
      { name: "Modelo", value: "Classic", stock: 41 },
      { name: "Modelo", value: "Sport", stock: 19 },
    ],
    features: ["ANC hibrido", "Audio espacial", "Estojo USB-C", "32h de bateria"],
    badge: "Novo",
  },
  {
    id: "p-003",
    slug: "nova-pack-carbon",
    name: "Nova Pack Carbon",
    tagline: "Mochila modular para trabalho, viagem e tecnologia.",
    description:
      "Design minimalista com tecido repelente a agua, divisorias inteligentes e bolso antifurto para notebook e acessorios.",
    category: "Lifestyle",
    price: 319.9,
    compareAtPrice: 459.9,
    rating: 4.7,
    reviewCount: 516,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=1200&q=90",
    ],
    colors: ["#0f172a", "#374151", "#a3e635"],
    variants: [
      { name: "Tamanho", value: "20L", stock: 22 },
      { name: "Tamanho", value: "30L", stock: 8 },
    ],
    features: ["Notebook 16", "USB externo", "Tecido premium", "Antifurto"],
    badge: "Premium",
  },
  {
    id: "p-004",
    slug: "luma-lamp-mini",
    name: "Luma Lamp Mini",
    tagline: "Iluminacao ambiente com controle touch e bateria.",
    description:
      "Luminaria portatil com corpo em aluminio, temperatura ajustavel e visual perfeito para setup, quarto ou escritorio.",
    category: "Casa tech",
    price: 179.9,
    rating: 4.8,
    reviewCount: 391,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=1200&q=90",
    ],
    colors: ["#f8fafc", "#111827", "#f59e0b"],
    variants: [
      { name: "Luz", value: "Quente", stock: 34 },
      { name: "Luz", value: "Neutra", stock: 17 },
    ],
    features: ["Touch dimmer", "USB-C", "18h bateria", "Aluminio anodizado"],
  },
  {
    id: "p-005",
    slug: "halo-charge-station",
    name: "Halo Charge Station",
    tagline: "Base magnetica 3 em 1 para carregar seus essenciais.",
    description:
      "Estacao compacta com carregamento magnetico, apoio para fones e area dedicada para acessorios, criada para manter a rotina organizada com visual premium.",
    category: "Acessorios",
    price: 229.9,
    compareAtPrice: 319.9,
    rating: 4.8,
    reviewCount: 467,
    image:
      "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1615526675159-e248c3021d3f?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1200&q=90",
    ],
    colors: ["#0a0a0a", "#f8fafc", "#facc15"],
    variants: [
      { name: "Padrao", value: "Mesa", stock: 26 },
      { name: "Padrao", value: "Travel", stock: 12 },
    ],
    features: ["3 em 1", "MagSafe ready", "USB-C", "Protecao termica"],
    badge: "Essencial",
  },
  {
    id: "p-006",
    slug: "pulse-ring-air",
    name: "Pulse Ring Air",
    tagline: "Anel inteligente para sono, movimento e bem-estar.",
    description:
      "Wearable minimalista com sensores discretos, acompanhamento de sono e relatorios de atividade em uma peca leve para usar todos os dias.",
    category: "Wearables",
    price: 299.9,
    compareAtPrice: 419.9,
    rating: 4.7,
    reviewCount: 328,
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=1200&q=90",
    ],
    colors: ["#18181b", "#e5e7eb", "#d4af37"],
    variants: [
      { name: "Tamanho", value: "18", stock: 18 },
      { name: "Tamanho", value: "20", stock: 11 },
    ],
    features: ["Sono", "Atividade", "Leve", "7 dias bateria"],
    badge: "Minimal",
  },
  {
    id: "p-007",
    slug: "arc-desk-pad",
    name: "Arc Desk Pad",
    tagline: "Desk pad premium com textura tecnica e base antiderrapante.",
    description:
      "Superficie ampla para notebook, mouse e acessorios, com acabamento escuro, costura reforcada e toque preciso para produtividade moderna.",
    category: "Produtividade",
    price: 139.9,
    compareAtPrice: 199.9,
    rating: 4.9,
    reviewCount: 612,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=90",
    ],
    colors: ["#020617", "#27272a", "#facc15"],
    variants: [
      { name: "Tamanho", value: "M", stock: 35 },
      { name: "Tamanho", value: "XL", stock: 21 },
    ],
    features: ["Antiderrapante", "Impermeavel", "Costura premium", "Mouse ready"],
  },
  {
    id: "p-008",
    slug: "nova-cam-360",
    name: "Nova Cam 360",
    tagline: "Camera smart com visao ampla e privacidade fisica.",
    description:
      "Camera inteligente para monitoramento residencial com deteccao de movimento, modo noturno e obturador fisico para controle visual da privacidade.",
    category: "Smart home",
    price: 269.9,
    compareAtPrice: 379.9,
    rating: 4.8,
    reviewCount: 284,
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=90",
    gallery: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&w=1200&q=90",
      "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=1200&q=90",
    ],
    colors: ["#ffffff", "#111827", "#facc15"],
    variants: [
      { name: "Resolucao", value: "2K", stock: 24 },
      { name: "Resolucao", value: "4K", stock: 9 },
    ],
    features: ["Visao 360", "Modo noturno", "Privacidade", "App control"],
    badge: "Smart",
  },
];

export const orders: Order[] = [
  { id: "#JK-1048", customer: "Marina Costa", status: "Pago", total: 639.8, date: "Hoje" },
  { id: "#JK-1047", customer: "Bruno Alves", status: "Enviado", total: 319.9, date: "Ontem" },
  { id: "#JK-1046", customer: "Rafaela Nunes", status: "Pendente", total: 249.9, date: "22 maio" },
  { id: "#JK-1045", customer: "Caio Lima", status: "Pago", total: 889.7, date: "21 maio" },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slug: string) {
  return products.filter((product) => product.slug !== slug).slice(0, 3);
}
