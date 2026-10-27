export interface CakeLayer {
  order: number;
  name: string;
  composition: string;
  colorHex: string;
  borderHex: string;
  textColor: string;
  patternType: 'smooth' | 'crumb' | 'crunch' | 'gloss';
}

export interface SignatureFlavor {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  description: string;
  priceSupplementPerSlice: number;
  startingPrice15Slices: number;
  recommendedStyle: 'buttercream' | 'seminaked';
  harmonization: string;
  sensoryProfile: {
    dulcor: number; // 1 to 5
    acidez: number; // 1 to 5
    crocancia: number; // 1 to 5
    intensidade: number; // 1 to 5
  };
  layers: CakeLayer[];
}

export interface SalvadorNeighborhood {
  id: string;
  name: string;
  zone: string;
  deliveryFeeReadyMenu: number;
  refrigeratedCakeFee: number;
  estimatedMinutes: string;
}

export interface ReadyMenuItem {
  id: number;
  name: string;
  category: 'fatias' | 'patisserie' | 'salgados' | 'cafes';
  categoryLabel: string;
  price: number;
  weightOrPortion: string;
  description: string;
  highlightNote: string;
  visualTheme: {
    bgGradient: string;
    accentColor: string;
    illustrationType: 'devils-slice' | 'lemon-slice' | 'choux' | 'macarons' | 'croissant' | 'shrimp-toast' | 'espresso-tonic' | 'cappuccino-brullee';
  };
}

export const WHATSAPP_NUMBER = '5571987264829';
export const WHATSAPP_DISPLAY = '(71) 98726-4829';
export const STORE_ADDRESS = 'Rua Ramalho Ortigão, 30 – Pituba, Salvador/BA';

export const SIGNATURE_FLAVORS: SignatureFlavor[] = [
  {
    id: 'devils-food',
    name: "Devil's Food Cake (Chocolate 63% & Caramelo com Flor de Sal)",
    shortName: "Devil's Food Cake 63%",
    subtitle: 'O Clássico Mais Pedido · Cacau Black & Flor de Sal de Mossoró',
    description:
      'Nossa receita icônica de massa úmida de cacau alcalino black intercalada com ganache aveludada de chocolate belga 63% cacau e fios de caramelo artesanal puxado no tacho com toque de flor de sal.',
    priceSupplementPerSlice: 0,
    startingPrice15Slices: 202.5,
    recommendedStyle: 'buttercream',
    harmonization: 'Espresso Duplo de Torra Média ou Vinho do Porto Tawny',
    sensoryProfile: {
      dulcor: 3,
      acidez: 1,
      crocancia: 2,
      intensidade: 5,
    },
    layers: [
      {
        order: 1,
        name: 'Cobertura em Buttercream Seda ou Ganache 63%',
        composition: 'Emulsão acetinada de merengue suíço com manteiga extra ou ganache espatulada estável ao clima da Bahia.',
        colorHex: '#2C1B18',
        borderHex: '#C5A059',
        textColor: '#FBF8F3',
        patternType: 'gloss',
      },
      {
        order: 2,
        name: 'Caramelo Artesanal com Flor de Sal',
        composition: 'Caramelo de creme de leite fresco cozido lentamente, quebrando o dulçor com cristais de flor de sal.',
        colorHex: '#B66E2E',
        borderHex: '#8C511D',
        textColor: '#FBF8F3',
        patternType: 'smooth',
      },
      {
        order: 3,
        name: 'Massa Úmida Devil’s Cacau Black',
        composition: 'Massa aerada de cacau 100% alcalino com infusão de café especial para ressaltar as notas de cacau torrado.',
        colorHex: '#1F1513',
        borderHex: '#3E2A26',
        textColor: '#FBF8F3',
        patternType: 'crumb',
      },
      {
        order: 4,
        name: 'Ganache Nobre de Chocolate 63%',
        composition: 'Ganache estruturada com chocolate amargo 63% derretido em creme fresco, textura de trufa francesa.',
        colorHex: '#3B231E',
        borderHex: '#59362F',
        textColor: '#FBF8F3',
        patternType: 'smooth',
      },
      {
        order: 5,
        name: 'Base Estrutural de Massa Cacau & Calda de Baunilha',
        composition: 'Camada de sustentação levemente umedecida com calda de fava de baunilha natural.',
        colorHex: '#1A1110',
        borderHex: '#3E2A26',
        textColor: '#FBF8F3',
        patternType: 'crumb',
      },
    ],
  },
  {
    id: 'lemon-croc',
    name: 'Lemon Croc (Baunilha, Limão Siciliano & Praliné de Caju)',
    shortName: 'Lemon Croc & Praliné',
    subtitle: 'Equilíbrio Cítrico · Doce de Leite Artesanal & Crocante',
    description:
      'A leveza da massa amanteigada de fava de baunilha combinada ao frescor vibrante do curd de limão siciliano, suavizada pelo doce de leite de tacho e coroada pelo nosso famoso praliné crocante de castanha de caju.',
    priceSupplementPerSlice: 0,
    startingPrice15Slices: 202.5,
    recommendedStyle: 'seminaked',
    harmonization: 'Chá Branco com Pêssego ou Espumante Brut Rosé',
    sensoryProfile: {
      dulcor: 3,
      acidez: 4,
      crocancia: 5,
      intensidade: 4,
    },
    layers: [
      {
        order: 1,
        name: 'Buttercream Seda de Baunilha Bourbon',
        composition: 'Acabamento acetinado leve com sementes reais de fava de baunilha de Madagascar.',
        colorHex: '#F7F1E1',
        borderHex: '#C5A059',
        textColor: '#141413',
        patternType: 'smooth',
      },
      {
        order: 2,
        name: 'Curd Aveludado de Limão Siciliano',
        composition: 'Creme cítrico preparado com suco e raspas frescas de limão siciliano e manteiga extra.',
        colorHex: '#EED473',
        borderHex: '#D1B347',
        textColor: '#141413',
        patternType: 'gloss',
      },
      {
        order: 3,
        name: 'Praliné Crocante de Castanha de Caju',
        composition: 'Castanhas selecionadas caramelizadas no ponto de vidro e trituradas artesanalmente no ateliê.',
        colorHex: '#C98A4B',
        borderHex: '#9E662E',
        textColor: '#FBF8F3',
        patternType: 'crunch',
      },
      {
        order: 4,
        name: 'Doce de Leite Cremoso de Tacho',
        composition: 'Camada aveludada de doce de leite cozido lentamente que equilibra a acidez do limão.',
        colorHex: '#9C5E31',
        borderHex: '#7A4621',
        textColor: '#FBF8F3',
        patternType: 'smooth',
      },
      {
        order: 5,
        name: 'Massa Chiffon Amanteigada de Baunilha',
        composition: 'Massa clara, macia e estruturada com manteiga extra sem sal e leite integral fresco.',
        colorHex: '#EFE3C2',
        borderHex: '#D4C39A',
        textColor: '#141413',
        patternType: 'crumb',
      },
    ],
  },
  {
    id: 'pistache-frutas',
    name: 'Sinfonia de Pistache & Coulis de Frutas Vermelhas',
    shortName: 'Sinfonia de Pistache',
    subtitle: 'Alta Pâtisserie · Pasta 100% Pistache Torrado & Framboesas',
    description:
      'Para paladares exigentes: massa úmida com farinha de pistache verde, brigadeiro gourmet de pasta pura de pistache italiano e redução artesanal de morangos, amoras e framboesas frescas com baixa adição de açúcar.',
    priceSupplementPerSlice: 2.5,
    startingPrice15Slices: 240.0,
    recommendedStyle: 'buttercream',
    harmonization: 'Espresso Tônica Cítrico ou Champagne Demi-Sec',
    sensoryProfile: {
      dulcor: 2,
      acidez: 4,
      crocancia: 3,
      intensidade: 5,
    },
    layers: [
      {
        order: 1,
        name: 'Buttercream Acetinado & Pistaches Laminados',
        composition: 'Cobertura lisa com coroamento de pistaches verdes tostados e pétalas orgânicas.',
        colorHex: '#F3EFE6',
        borderHex: '#C5A059',
        textColor: '#141413',
        patternType: 'smooth',
      },
      {
        order: 2,
        name: 'Coulis Rústico de Frutas Vermelhas',
        composition: 'Compota de framboesas, amoras e morangos inteiros cozidos em fogo lento sem conservantes.',
        colorHex: '#7A1C1C',
        borderHex: '#5E1414',
        textColor: '#FBF8F3',
        patternType: 'gloss',
      },
      {
        order: 3,
        name: 'Mousseline de Pistache Puro Torrado',
        composition: 'Creme intenso preparado com pasta 100% pistache importado, sem corantes ou aromas artificiais.',
        colorHex: '#8A9A68',
        borderHex: '#6B7A4B',
        textColor: '#141413',
        patternType: 'smooth',
      },
      {
        order: 4,
        name: 'Crocante de Pistache & Chocolate Branco Belga',
        composition: 'Textura crocante impermeabilizada em manteiga de cacau para manter a crocância por horas.',
        colorHex: '#B7C298',
        borderHex: '#8A9A68',
        textColor: '#141413',
        patternType: 'crunch',
      },
      {
        order: 5,
        name: 'Massa Financier de Amêndoas & Pistache',
        composition: 'Massa nobre inspirada na confeitaria parisiense com farinha de oleaginosas selecionadas.',
        colorHex: '#DCE0C8',
        borderHex: '#B7C298',
        textColor: '#141413',
        patternType: 'crumb',
      },
    ],
  },
  {
    id: 'maracuja-crocante',
    name: 'Maracujá Crocante (Cream Cheese Frosting & Coulis do Mato)',
    shortName: 'Maracujá Crocante',
    subtitle: 'Identidade Baiana & Técnica Francesa · Refrescante e Autoral',
    description:
      'Uma homenagem tropical elegante: massa de baunilha com mel de abelhas nativas, creme aveludado de cream cheese philadelphia, redução intensa de maracujá fresco com sementes crocantes e praliné de castanhas.',
    priceSupplementPerSlice: 0,
    startingPrice15Slices: 202.5,
    recommendedStyle: 'seminaked',
    harmonization: 'Fresh Tangerina Espresso ou Chablis Gelado',
    sensoryProfile: {
      dulcor: 2,
      acidez: 5,
      crocancia: 4,
      intensidade: 4,
    },
    layers: [
      {
        order: 1,
        name: 'Semi-Naked ou Buttercream com Mel Nativo',
        composition: 'Acabamento translúcido ou espatulado revelando a arquitetura natural das camadas.',
        colorHex: '#F9F4E8',
        borderHex: '#C5A059',
        textColor: '#141413',
        patternType: 'smooth',
      },
      {
        order: 2,
        name: 'Redução Brilhante de Maracujá Fresco',
        composition: 'Polpa de maracujá amarelo apurada no tacho mantendo o perfume tropical vibrante.',
        colorHex: '#E5A922',
        borderHex: '#C28B12',
        textColor: '#141413',
        patternType: 'gloss',
      },
      {
        order: 3,
        name: 'Creme Léger de Cream Cheese Nobre',
        composition: 'Textura aerada e levemente ácida que corta o açúcar e refresca o paladar.',
        colorHex: '#F5EFE2',
        borderHex: '#DED3BC',
        textColor: '#141413',
        patternType: 'smooth',
      },
      {
        order: 4,
        name: 'Nougatine Crocante de Castanhas',
        composition: 'Lâminas crocantes caramelizadas com manteiga com sal para contraste de textura.',
        colorHex: '#B87A3D',
        borderHex: '#8F5B28',
        textColor: '#FBF8F3',
        patternType: 'crunch',
      },
      {
        order: 5,
        name: 'Massa Dourada de Baunilha',
        composition: 'Massa estruturada de ovos caipiras e fava de baunilha com migalha macia.',
        colorHex: '#EFE2BE',
        borderHex: '#D4C294',
        textColor: '#141413',
        patternType: 'crumb',
      },
    ],
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet Parisiense com Cream Cheese & Framboesa',
    shortName: 'Red Velvet Parisiense',
    subtitle: 'Veludo Carmim · Cacau Suave, Cream Cheese & Toque de Framboesa',
    description:
      'Nossa releitura sofisticada do clássico: massa aveludada de cacau levemente ácida em tom carmim profundo, intercalada com frosting autêntico de cream cheese, manteiga francesa e toque sutil de geleia de framboesa.',
    priceSupplementPerSlice: 1.0,
    startingPrice15Slices: 217.5,
    recommendedStyle: 'buttercream',
    harmonization: 'Cappuccino Italiano ou Espumante Rosé',
    sensoryProfile: {
      dulcor: 3,
      acidez: 3,
      crocancia: 1,
      intensidade: 4,
    },
    layers: [
      {
        order: 1,
        name: 'Frosting Acetinado de Baunilha & Cream Cheese',
        composition: 'Cobertura alva contrastando com o tom carmim profundo das camadas internas.',
        colorHex: '#FAF7F0',
        borderHex: '#C5A059',
        textColor: '#141413',
        patternType: 'smooth',
      },
      {
        order: 2,
        name: 'Geleia Artesanal de Framboesas Inteira',
        composition: 'Toque fino de framboesa ácida que eleva a complexidade do Red Velvet tradicional.',
        colorHex: '#8E1D2C',
        borderHex: '#63111C',
        textColor: '#FBF8F3',
        patternType: 'gloss',
      },
      {
        order: 3,
        name: 'Massa Aveludada Carmim com Buttermilk',
        composition: 'Preparada com leitelho artesanal e cacau puro para umidade prolongada.',
        colorHex: '#7A1C1C',
        borderHex: '#5E1414',
        textColor: '#FBF8F3',
        patternType: 'crumb',
      },
      {
        order: 4,
        name: 'Mousseline Dupla de Cream Cheese Nobre',
        composition: 'Camada generosa e estruturada de cream cheese batido com fava de baunilha.',
        colorHex: '#F3EDE0',
        borderHex: '#D8CEB8',
        textColor: '#141413',
        patternType: 'smooth',
      },
      {
        order: 5,
        name: 'Base Red Velvet Estruturada',
        composition: 'Base macia com corte limpo que mantém cada fatia impecável no prato dos convidados.',
        colorHex: '#6B1717',
        borderHex: '#4F1010',
        textColor: '#FBF8F3',
        patternType: 'crumb',
      },
    ],
  },
];

export const SALVADOR_NEIGHBORHOODS: SalvadorNeighborhood[] = [
  {
    id: 'retirada-pituba',
    name: 'Retirada na Loja (Rua Ramalho Ortigão, 30 – Pituba)',
    zone: 'Estacionamento Próprio Gratuito na Porta',
    deliveryFeeReadyMenu: 0,
    refrigeratedCakeFee: 0,
    estimatedMinutes: 'Pronto em 25 min',
  },
  {
    id: 'pituba-itaigara',
    name: 'Pituba, Itaigara & Parque Bela Vista',
    zone: 'Zona 1 · Entorno Imediato do Ateliê',
    deliveryFeeReadyMenu: 10.0,
    refrigeratedCakeFee: 35.0,
    estimatedMinutes: '25 a 35 min',
  },
  {
    id: 'caminho-arvores-horto',
    name: 'Caminho das Árvores, Horto Florestal & Santa Teresa',
    zone: 'Zona 2 · Rota Nobre Central',
    deliveryFeeReadyMenu: 14.0,
    refrigeratedCakeFee: 45.0,
    estimatedMinutes: '30 a 45 min',
  },
  {
    id: 'rio-vermelho-ondina',
    name: 'Rio Vermelho, Amaralina & Ondina',
    zone: 'Zona 3 · Orla Atlântica',
    deliveryFeeReadyMenu: 16.0,
    refrigeratedCakeFee: 50.0,
    estimatedMinutes: '35 a 50 min',
  },
  {
    id: 'graca-barra-vitoria',
    name: 'Graça, Barra, Corredor da Vitória & Campo Grande',
    zone: 'Zona 4 · Circuito Clássico & Cerimoniais',
    deliveryFeeReadyMenu: 20.0,
    refrigeratedCakeFee: 65.0,
    estimatedMinutes: '40 a 55 min',
  },
  {
    id: 'alphaville-patamares',
    name: 'Alphaville 1 e 2, Greenville, Patamares & Paralela',
    zone: 'Zona 5 · Condomínios & Mansões de Eventos',
    deliveryFeeReadyMenu: 24.0,
    refrigeratedCakeFee: 75.0,
    estimatedMinutes: '45 a 60 min',
  },
];

export const READY_MENU_CATALOG: ReadyMenuItem[] = [
  {
    id: 1,
    name: "Fatia Devil's Food Cake 63%",
    category: 'fatias',
    categoryLabel: 'Fatias Autorais',
    price: 25.0,
    weightOrPortion: 'Fatia Generosa · 190g',
    description:
      'Massa úmida de cacau black, ganache de chocolate belga 63% e caramelo artesanal puxado no tacho com flor de sal.',
    highlightNote: 'Mais Vendido da Vitrine',
    visualTheme: {
      bgGradient: 'from-[#2A1917] via-[#3E2420] to-[#1A100E]',
      accentColor: '#C5A059',
      illustrationType: 'devils-slice',
    },
  },
  {
    id: 2,
    name: 'Fatia Lemon Croc & Praliné',
    category: 'fatias',
    categoryLabel: 'Fatias Autorais',
    price: 25.0,
    weightOrPortion: 'Fatia Generosa · 185g',
    description:
      'Massa de fava de baunilha, creme cítrico de limão siciliano, doce de leite artesanal e praliné crocante de caju.',
    highlightNote: 'Equilíbrio Cítrico',
    visualTheme: {
      bgGradient: 'from-[#F3E9C6] via-[#E8D596] to-[#D6BC6B]',
      accentColor: '#7A1C1C',
      illustrationType: 'lemon-slice',
    },
  },
  {
    id: 3,
    name: 'Choux Cream Baunilha Bourbon & Morango',
    category: 'patisserie',
    categoryLabel: 'Choux & Macarons',
    price: 22.0,
    weightOrPortion: 'Unidade · 110g',
    description:
      'Massa choux francesa assada com craquelin crocante de amêndoas, creme léger de baunilha Bourbon e compota de morango fresco.',
    highlightNote: 'Pâtisserie Clássica',
    visualTheme: {
      bgGradient: 'from-[#F6ECE1] via-[#EBD6C0] to-[#DEC0A1]',
      accentColor: '#7A1C1C',
      illustrationType: 'choux',
    },
  },
  {
    id: 4,
    name: 'Coffret 6 Macarons Parisienses',
    category: 'patisserie',
    categoryLabel: 'Choux & Macarons',
    price: 48.0,
    weightOrPortion: 'Caixa Presenteável · 6 unid.',
    description:
      'Farinha de amêndoas pura sem glúten: 2x Pistache Italiano, 2x Caramelo com Flor de Sal, 1x Framboesa e 1x Chocolate 63%.',
    highlightNote: 'Ideal para Presentear',
    visualTheme: {
      bgGradient: 'from-[#E9EDE2] via-[#D8E0CC] to-[#C3CEB2]',
      accentColor: '#4A5238',
      illustrationType: 'macarons',
    },
  },
  {
    id: 5,
    name: 'Croissant Italianinho Gratinado',
    category: 'salgados',
    categoryLabel: 'Croissants & Brunch',
    price: 36.0,
    weightOrPortion: 'Servido Quente · 180g',
    description:
      'Croissant folhado na manteiga francesa com 27 voltas, mortadela italiana com pistache, fonduta de queijos e pesto de manjericão.',
    highlightNote: 'Estrela do Brunch',
    visualTheme: {
      bgGradient: 'from-[#F2DFC4] via-[#E3C498] to-[#CFA66E]',
      accentColor: '#4A5238',
      illustrationType: 'croissant',
    },
  },
  {
    id: 6,
    name: 'Toast de Camarão no Brioche Artesanal',
    category: 'salgados',
    categoryLabel: 'Croissants & Brunch',
    price: 44.0,
    weightOrPortion: 'Prato Brunch · 220g',
    description:
      'Pão brioche de fermentação lenta tostado na manteiga clarificada, camarões salteados ao alho-poró, cream cheese e raspas de limão.',
    highlightNote: 'Exclusivo Pituba',
    visualTheme: {
      bgGradient: 'from-[#F5E6D6] via-[#E8CCB0] to-[#D6B18D]',
      accentColor: '#7A1C1C',
      illustrationType: 'shrimp-toast',
    },
  },
  {
    id: 7,
    name: 'Fresh Tangerina Espresso',
    category: 'cafes',
    categoryLabel: 'Cafés Especiais',
    price: 24.0,
    weightOrPortion: 'Taça 300ml · Gelado',
    description:
      'Espresso duplo de grãos especiais da Chapada Diamantina (86 pts), redução artesanal de tangerina, mel de abelha nativa e água tônica.',
    highlightNote: 'Bebida Assinatura',
    visualTheme: {
      bgGradient: 'from-[#3D2516] via-[#6E4020] to-[#B86A28]',
      accentColor: '#FBF8F3',
      illustrationType: 'espresso-tonic',
    },
  },
  {
    id: 8,
    name: 'Cappuccino Brûlée com Fava de Baunilha',
    category: 'cafes',
    categoryLabel: 'Cafés Especiais',
    price: 21.0,
    weightOrPortion: 'Xícara 220ml · Quente',
    description:
      'Espresso encorpado, leite vaporizado em microespuma de seda, xarope artesanal de baunilha e crosta maçaricada de açúcar demerara.',
    highlightNote: 'Torra Especial 86 pts',
    visualTheme: {
      bgGradient: 'from-[#4A3222] via-[#6E4C35] to-[#966C4E]',
      accentColor: '#E5D3B3',
      illustrationType: 'cappuccino-brullee',
    },
  },
];

export const CASE_STUDIES_TESTIMONIALS = [
  {
    id: 1,
    metricHighlight: '120 Convidados · 0% Derretimento em 6h de Festa',
    occasionTag: 'Casamento Civil & Recepção · Horto Florestal',
    quote:
      'Nosso maior receio era contratar um bolo em Buttercream que não aguentasse o calor de Salvador ou que atrasasse no dia do casamento. Fizemos a degustação na loja da Pituba com estacionamento na porta, definimos o bolo de 3 andares com Devil’s Food Cake e Lemon Croc, e a estrutura ficou intacta por 6 horas na mesa. Os convidados elogiaram até a última fatia.',
    clientName: 'Fernanda & Gabriel Peixoto',
    clientRole: 'Noivos · Recepção no Horto Florestal',
    verifiedSource: 'Avaliação 5.0 ★ Verificada no Google Maps',
  },
  {
    id: 2,
    metricHighlight: 'Orçamento em 2 Minutos · Entrega Pontual',
    occasionTag: 'Celebração de 60 Anos · Caminho das Árvores',
    quote:
      'Antes de conhecer a Jeanne Garcia, tentei orçar com três confeiteiras pelo Instagram e levei quase dois dias para receber tabelas confusas em PDF. Pelo simulador do site escolhi o tamanho para 50 pessoas no sabor Sinfonia de Pistache, já vi o valor com a entrega climatizada para o Caminho das Árvores e fechei tudo em menos de 10 minutos pelo WhatsApp.',
    clientName: 'Patrícia Mendonça',
    clientRole: 'Anfitriã · Caminho das Árvores',
    verifiedSource: 'Cliente Recorrente · Nota 5.0 ★',
  },
  {
    id: 3,
    metricHighlight: 'Brunch Sem Filas · Estacionamento & Pet-Friendly',
    occasionTag: 'Brunch de Fim de Semana · Rua Ramalho Ortigão, 30',
    quote:
      'Um verdadeiro refúgio parisiense no coração da Pituba. Estacionamos na porta com tranquilidade, levamos nossa cachorrinha na área Pet-Friendly e fomos recebidos com água fresca para ela. O Choux Cream de baunilha Bourbon, o Croissant Italianinho e a fatia do Devil’s Food Cake têm padrão de confeitaria europeia.',
    clientName: 'Dr. Marcelo Tourinho',
    clientRole: 'Local Guide Nível 6 · Itaigara',
    verifiedSource: '160+ Avaliações Auditadas (Média 4.8 ★)',
  },
];

export const STRATEGIC_FAQS = [
  {
    question: '1. Com quanta antecedência devo encomendar meu bolo de casamento ou aniversário?',
    answer:
      'Para Casamentos, Bodas, 15 Anos e Eventos de Grande Porte (2 a 4 andares), recomendamos reservar sua data com 30 dias a 6 meses de antecedência, pois limitamos o número de projetos artísticos por fim de semana para garantir perfeição técnica. Para bolos comemorativos de 1 andar (10 a 25 fatias da Ligne Intime), atendemos com 48h a 72h de antecedência. Caso precise de algo para hoje, consulte nossa Aba 2 de Pronta-Entrega!',
  },
  {
    question: '2. O endereço oficial fica na Rua Ramalho Ortigão, 30 na Pituba? Possui estacionamento?',
    answer:
      'Sim! Alguns diretórios antigos de terceiros na internet ainda mostram endereços desatualizados, mas nosso ateliê e cafeteria funciona exclusivamente na Rua Ramalho Ortigão, 30 – Pituba, Salvador/BA (ao lado do Almacen Pepe). Contamos com vagas de estacionamento próprio gratuito na porta, salão climatizado e espaço Pet-Friendly.',
  },
  {
    question: '3. O acabamento em Buttercream resiste ao calor e à umidade de Salvador sem derreter?',
    answer:
      'Com total segurança. Desenvolvemos uma formulação autoral de Buttercream de merengue suíço estruturado com manteiga extra de alta pureza, projetada especificamente para o clima tropical da Bahia. O bolo permanece firme, liso e acetinado durante horas de exposição na mesa do evento, sem o aspecto artificial da pasta americana e sem o dulçor enjoativo do chantininho comum.',
  },
  {
    question: '4. Como funciona a degustação para noivas e quais são as condições de pagamento?',
    answer:
      'Noivas e anfitriões podem agendar uma sessão de degustação guiada em nossa cafeteria na Pituba ou solicitar nossa Caixa de Degustação em Casa pelo WhatsApp (71) 98726-4829. A reserva da data na agenda é confirmada mediante sinal de 50% (via Pix ou transferência) e o saldo restante pode ser quitado até 7 dias antes do evento ou parcelado no cartão de crédito.',
  },
  {
    question: '5. Como funciona o transporte de bolos de múltiplos andares e a reserva do Brunch?',
    answer:
      'Para bolos de casamento e múltiplos andares, recomendamos fortemente nossa Entrega Climatizada Especializada (calculada automaticamente por bairro no Simulador acima), onde nossa equipe realiza o transporte refrigerado e a finalização floral direto na mesa do seu cerimonial. Já para o Brunch de Sábado e Domingo, basta preencher a Aba 3 do Configurador para garantir sua mesa sem espera.',
  },
];
