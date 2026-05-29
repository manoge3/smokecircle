export const peopleSeed = [
  { name: "Marina", age: 29, area: "Pinheiros", distance: "1,2 km", status: "Online agora", bio: "Curte uma resenha tranquila, design e trocar ideia sem pressa.", tags: ["jazz", "design", "cafés"], photo: "https://randomuser.me/api/portraits/women/44.jpg", matched: true },
  { name: "Caio", age: 32, area: "Vila Madalena", distance: "2,1 km", status: "Com círculo ativo", bio: "Gosta de roda pequena, música baixa e trago com respeito.", tags: ["vinil", "lounge", "noite"], photo: "https://randomuser.me/api/portraits/men/32.jpg" },
  { name: "Lia", age: 27, area: "Moema", distance: "3,4 km", status: "Online agora", bio: "Quer achar uma resenha leve depois do trabalho.", tags: ["arquitetura", "drinks", "terraços"], photo: "https://randomuser.me/api/portraits/women/68.jpg" },
  { name: "Rafael", age: 36, area: "Jardins", distance: "1,8 km", status: "Verificado", bio: "Anfitrião cuidadoso, prefere círculos pequenos e seguros.", tags: ["host", "conversa", "vinhos"], photo: "https://randomuser.me/api/portraits/men/46.jpg" },
  { name: "Bianca", age: 31, area: "Itaim", distance: "2,7 km", status: "Com círculo ativo", bio: "Boa conversa, fotografia urbana e encontros sem bagunça.", tags: ["foto", "arte", "rooftop"], photo: "https://randomuser.me/api/portraits/women/12.jpg" },
  { name: "Theo", age: 28, area: "Bela Vista", distance: "3,9 km", status: "Online agora", bio: "Novo na cidade, quer ver quem está por perto.", tags: ["cinema", "tech", "bares"], photo: "https://randomuser.me/api/portraits/men/11.jpg", matched: true },
  { name: "Helena", age: 34, area: "Perdizes", distance: "2,9 km", status: "Disponível hoje", bio: "Valoriza privacidade, educação e círculos com bom senso.", tags: ["livros", "botânica", "uso legal"], photo: "https://randomuser.me/api/portraits/women/56.jpg" },
  { name: "Nuno", age: 40, area: "Higienópolis", distance: "3,1 km", status: "Verificado", bio: "Cria encontros adultos, sempre com regras claras.", tags: ["clube", "segurança", "papo"], photo: "https://randomuser.me/api/portraits/men/62.jpg" },
  { name: "Sofia", age: 30, area: "Brooklin", distance: "3,7 km", status: "Online agora", bio: "Prefere grupos mistos, gentis e com boa curadoria musical.", tags: ["soul", "design", "cidade"], photo: "https://randomuser.me/api/portraits/women/29.jpg" },
  { name: "Davi", age: 33, area: "Vila Olímpia", distance: "2,5 km", status: "Com círculo ativo", bio: "Procura gente boa para uma roda de fim de semana.", tags: ["network", "gastro", "terraço"], photo: "https://randomuser.me/api/portraits/men/75.jpg" },
  { name: "Malu", age: 26, area: "Consolação", distance: "1,5 km", status: "Disponível hoje", bio: "Gosta de descobrir lugares calmos e chamar no papo.", tags: ["indie", "galerias", "café"], photo: "https://randomuser.me/api/portraits/women/90.jpg", matched: true },
  { name: "André", age: 38, area: "Campo Belo", distance: "4,0 km", status: "Verificado", bio: "Adulto, discreto e atento a limites. Procura círculos maduros.", tags: ["privacidade", "lounge", "rotina"], photo: "https://randomuser.me/api/portraits/men/88.jpg" },
];

export const groupsSeed = [
  { name: "Roda da Orla", people: 18, distance: "1,4 km", category: "Chill", status: "Aberto a pedidos", creator: "Marina", rules: "Adultos, respeito e nada de expor localização.", description: "Uma roda leve pra trocar ideia perto da água.", photo: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80" },
  { name: "Trago no Centro", people: 12, distance: "2,6 km", category: "Conversa", status: "Em conversa", creator: "Caio", rules: "Papo antes de entrar; localização só com confiança.", description: "Círculo urbano para puxar um trago com calma.", photo: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80" },
  { name: "Chill da Praia", people: 16, distance: "3,2 km", category: "Rolê", status: "Aberto a pedidos", creator: "Lia", rules: "Respeite as leis locais e o espaço dos outros.", description: "Fim de tarde, papo bom e clima tranquilo.", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80" },
  { name: "Círculo do Tabaco", people: 9, distance: "1,8 km", category: "Tabaco", status: "Bloqueado", creator: "Rafael", rules: "Apenas tabaco legal e adultos confirmados.", description: "Discussões sobre tabaco legal e acessórios.", photo: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?auto=format&fit=crop&w=900&q=80" },
  { name: "Resenha Noturna", people: 21, distance: "2,0 km", category: "Cigarro", status: "Aberto a pedidos", creator: "Bianca", rules: "Ambiente adulto, sem pressão e sem bagunça.", description: "Grupo para achar uma resenha depois do expediente.", photo: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80" },
  { name: "Pausa do Trago", people: 7, distance: "3,6 km", category: "Acessórios", status: "Com círculo ativo", creator: "Nuno", rules: "Sem vendas; só guia visual e conversa responsável.", description: "Troca sobre sedas, piteiras e utensílios legais.", photo: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80" },
  { name: "Fim de Tarde", people: 14, distance: "3,9 km", category: "Chill", status: "Aberto a pedidos", creator: "Sofia", rules: "Entrada por pedido e conversa com o criador.", description: "Roda pequena, música baixa e céu aberto.", photo: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80" },
  { name: "Café e Fumaça", people: 10, distance: "2,8 km", category: "Narguilé", status: "Em conversa", creator: "Davi", rules: "Uso adulto, responsável e conforme leis locais.", description: "Café, conversa e uma roda sem pressa.", photo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80" },
];

export const circlesSeed = [
  { name: "Roda da Orla", people: 18, distance: "1,4 km", category: "Chill", status: "Bloqueado", creator: "Marina", area: "Orla oeste", exact: "Deck privado, liberado após aprovação", rules: "Adultos, respeito e leis locais.", description: "Veja rodas por perto. A localização exata só aparece quando for liberada.", photo: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80", x: 24, y: 30 },
  { name: "Trago no Centro", people: 12, distance: "2,6 km", category: "Conversa", status: "Em conversa", creator: "Caio", area: "Centro velho", exact: "Sala reservada", rules: "Papo antes de entrar na roda.", description: "Círculo urbano para trocar ideia com localização protegida.", photo: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=900&q=80", x: 68, y: 38 },
  { name: "Resenha Noturna", people: 21, distance: "2,0 km", category: "Cigarro", status: "Solicitado", creator: "Bianca", area: "Pinheiros norte", exact: "Endereço sob aprovação", rules: "Sem pressão, sem exposição e com respeito.", description: "Roda noturna para adultos que querem conversar com calma.", photo: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80", x: 46, y: 64 },
  { name: "Café e Fumaça", people: 10, distance: "2,8 km", category: "Narguilé", status: "Bloqueado", creator: "Davi", area: "Bairro sul", exact: "Café parceiro", rules: "Conforme as leis locais; localização só com consentimento.", description: "Café, conversa e trago com respeito.", photo: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80", x: 80, y: 72 },
];

export const accessoriesSeed = [
  ["Seda King Size Natural", "Sedas", "Papel de queima lenta com toque natural.", ["fina", "natural"], "https://loremflickr.com/900/700/rolling,paper?lock=11"],
  ["Piteira de Vidro Curta", "Piteiras", "Peça reutilizável com acabamento limpo.", ["vidro", "reutilizável"], "https://loremflickr.com/900/700/glass,smoking,accessory?lock=12"],
  ["Isqueiro Metal Escovado", "Isqueiros", "Corpo metálico, discreto e resistente.", ["metal", "urbano"], "https://loremflickr.com/900/700/lighter?lock=13"],
  ["Cinzeiro Cerâmica Grafite", "Cinzeiros", "Cerâmica pesada com presença silenciosa.", ["cerâmica", "casa"], "https://loremflickr.com/900/700/ashtray?lock=14"],
  ["Case Slim Preto", "Cases", "Estojo compacto para organizar acessórios.", ["case", "bolso"], "https://loremflickr.com/900/700/cigarette,case?lock=15"],
  ["Filtro Papel Premium", "Filtros", "Filtros firmes para montagem precisa.", ["filtro", "papel"], "https://loremflickr.com/900/700/filter,paper?lock=16"],
  ["Tabaco Legal Blend Suave", "Tabaco legal", "Referência adulta de tabaco legal aromático.", ["legal", "suave"], "https://loremflickr.com/900/700/tobacco,pouch?lock=17"],
  ["Cigarro Artesanal Legal", "Cigarros", "Item adulto legal para referência visual.", ["adulto", "legal"], "https://loremflickr.com/900/700/cigarette?lock=18"],
  ["Cuia de Madeira Clara", "Cuias", "Cuia pequena para organização de preparo.", ["madeira", "mesa"], "https://loremflickr.com/900/700/wood,bowl?lock=19"],
  ["Bandeja Metal Fosco", "Utensílios", "Superfície estável para organizar itens.", ["metal", "bandeja"], "https://loremflickr.com/900/700/metal,tray?lock=20"],
  ["Seda Hemp Brown", "Sedas", "Textura marrom discreta e visual natural.", ["hemp", "slow burn"], "https://loremflickr.com/900/700/papers,smoking?lock=21"],
  ["Piteira Papel Longa", "Piteiras", "Formato alongado para montagem firme.", ["papel", "longa"], "https://loremflickr.com/900/700/rolled,paper?lock=22"],
  ["Isqueiro Mini Black", "Isqueiros", "Compacto, simples e fácil de carregar.", ["mini", "preto"], "https://loremflickr.com/900/700/black,lighter?lock=23"],
  ["Cinzeiro Vidro Fumê", "Cinzeiros", "Vidro espesso com acabamento fumê.", ["vidro", "fumê"], "https://loremflickr.com/900/700/glass,ashtray?lock=24"],
  ["Case Couro Marrom", "Cases", "Estojo em couro sintético com visual adulto.", ["couro", "organização"], "https://loremflickr.com/900/700/leather,case?lock=25"],
  ["Filtro Carbono Legal", "Filtros", "Filtro adulto para acessórios permitidos.", ["carbono", "legal"], "https://loremflickr.com/900/700/carbon,filter?lock=26"],
  ["Tabaco Legal Virginia", "Tabaco legal", "Referência de tabaco legal seco e suave.", ["virginia", "adulto"], "https://loremflickr.com/900/700/dry,tobacco?lock=27"],
  ["Porta Cigarros Alumínio", "Cigarros", "Proteção rígida para transporte discreto.", ["alumínio", "transporte"], "https://loremflickr.com/900/700/aluminum,case?lock=28"],
  ["Cuia Pedra Escura", "Cuias", "Peça de mesa com textura mineral.", ["pedra", "mesa"], "https://loremflickr.com/900/700/stone,bowl?lock=29"],
  ["Escova de Limpeza", "Utensílios", "Utensílio simples para cuidado de acessórios.", ["limpeza", "cuidado"], "https://loremflickr.com/900/700/small,brush?lock=30"],
];
