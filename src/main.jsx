import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const peopleSeed = [
  ["Marina", 29, "Pinheiros", "1,2 km", "Online agora", "Curte lounges discretos, design e conversas longas sem pressa.", ["jazz", "design", "cafés"], "https://randomuser.me/api/portraits/women/44.jpg"],
  ["Caio", 32, "Vila Madalena", "2,1 km", "Com círculo ativo", "Gosta de encontros pequenos, música baixa e gente pontual.", ["vinil", "charutos legais", "noite"], "https://randomuser.me/api/portraits/men/32.jpg"],
  ["Lia", 27, "Moema", "3,4 km", "Online agora", "Procura grupos tranquilos para conversar depois do trabalho.", ["arquitetura", "drinks", "terraços"], "https://randomuser.me/api/portraits/women/68.jpg"],
  ["Rafael", 36, "Jardins", "1,8 km", "Verificado", "Anfitrião cuidadoso, prefere círculos pequenos e ambientes seguros.", ["host", "charcutaria", "vinhos"], "https://randomuser.me/api/portraits/men/46.jpg"],
  ["Bianca", 31, "Itaim", "2,7 km", "Com círculo ativo", "Boa conversa, fotografia urbana e encontros sem improviso caótico.", ["foto", "arte", "rooftop"], "https://randomuser.me/api/portraits/women/12.jpg"],
  ["Theo", 28, "Bela Vista", "3,9 km", "Online agora", "Novo na cidade, quer conhecer círculos adultos e bem organizados.", ["cinema", "tech", "bares"], "https://randomuser.me/api/portraits/men/11.jpg"],
  ["Helena", 34, "Perdizes", "2,9 km", "Disponível hoje", "Valoriza privacidade, educação e encontros com curadoria.", ["livros", "botânica", "legal use"], "https://randomuser.me/api/portraits/women/56.jpg"],
  ["Nuno", 40, "Higienópolis", "3,1 km", "Verificado", "Cria encontros pequenos para adultos, sempre com regras claras.", ["clube", "conversa", "segurança"], "https://randomuser.me/api/portraits/men/62.jpg"],
  ["Sofia", 30, "Brooklin", "3,7 km", "Online agora", "Prefere grupos mistos, gentis e com boa curadoria musical.", ["soul", "design", "cidade"], "https://randomuser.me/api/portraits/women/29.jpg"],
  ["Davi", 33, "Vila Olímpia", "2,5 km", "Com círculo ativo", "Procura boas pessoas para conversas de fim de semana.", ["network", "gastro", "terraço"], "https://randomuser.me/api/portraits/men/75.jpg"],
  ["Malu", 26, "Consolação", "1,5 km", "Disponível hoje", "Gosta de descobrir lugares calmos e gente com bom senso.", ["indie", "galerias", "café"], "https://randomuser.me/api/portraits/women/90.jpg"],
  ["André", 38, "Campo Belo", "4,0 km", "Verificado", "Adulto, discreto e atento a limites. Procura círculos maduros.", ["privacidade", "lounge", "rotina"], "https://randomuser.me/api/portraits/men/88.jpg"],
];

const groupSeed = [
  ["Lounge Baixo Ruído", 8, "1,4 km", "Lounge", "Encontro pequeno, conversa calma e curadoria de acessórios legais.", "Aberto a pedidos"],
  ["Terraço de Sexta", 14, "2,6 km", "Social", "Círculo adulto com música baixa, vista urbana e regras simples.", "Em conversa"],
  ["Clube da Seda", 11, "3,2 km", "Acessórios", "Discussão sobre sedas, filtros e itens de uso legal adulto.", "Aberto a pedidos"],
  ["Círculo Jardins", 6, "1,8 km", "Privado", "Grupo reservado com entrada por conversa prévia e indicação.", "Bloqueado"],
  ["After Work Pinheiros", 18, "2,0 km", "Networking", "Adultos próximos para conversas depois do expediente.", "Aberto a pedidos"],
  ["Mesa de Curadoria", 9, "3,6 km", "Cultura", "Trocas sobre música, design, bebidas e acessórios legais.", "Com círculo ativo"],
  ["Roda Moema", 12, "3,9 km", "Bairro", "Círculo local, leve, com anfitriões rotativos.", "Aberto a pedidos"],
  ["Noite Legal Use", 7, "2,8 km", "Responsável", "Encontro adulto com foco em uso legal e segurança.", "Em conversa"],
];

const accessorySeed = [
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

const circleSeed = [
  { name: "Círculo Pinheiros", people: 9, distance: "1,1 km", category: "Bairro", status: "Bloqueado", creator: "Marina", area: "Pinheiros oeste", exact: "Rua privada, liberada após aprovação", rules: "Adultos, respeito, sem exposição de terceiros.", x: 24, y: 30 },
  { name: "Rooftop Baixo Som", people: 12, distance: "2,4 km", category: "Lounge", status: "Em conversa", creator: "Caio", area: "Vila Madalena", exact: "Cobertura privada", rules: "Pontualidade, convite validado, uso legal.", x: 68, y: 38 },
  { name: "Mesa Jardins", people: 6, distance: "1,7 km", category: "Privado", status: "Solicitado", creator: "Rafael", area: "Jardins", exact: "Endereço sob aprovação", rules: "Grupo pequeno, discrição e conversa prévia.", x: 46, y: 64 },
  { name: "Legal Use Moema", people: 15, distance: "3,8 km", category: "Responsável", status: "Bloqueado", creator: "Lia", area: "Moema", exact: "Espaço reservado", rules: "Somente adultos e conforme leis locais.", x: 80, y: 72 },
];

function App() {
  const [tab, setTab] = useState("Descobrir");
  const [mode, setMode] = useState("Ambos");
  const [filters, setFilters] = useState({ online: false, active: false, distance: "4 km", age: "26-40", interest: "Todos" });
  const [people, setPeople] = useState(peopleSeed.map((p, i) => ({ id: `p${i}`, name: p[0], age: p[1], area: p[2], distance: p[3], status: p[4], bio: p[5], tags: p[6], photo: p[7], matched: i % 5 === 0 })));
  const [groups, setGroups] = useState(groupSeed.map((g, i) => ({ id: `g${i}`, name: g[0], people: g[1], distance: g[2], category: g[3], description: g[4], status: g[5] })));
  const [circles, setCircles] = useState(circleSeed.map((c, i) => ({ id: `c${i}`, ...c })));
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);
  const [chat, setChat] = useState(null);
  const [accessoryFilter, setAccessoryFilter] = useState("Todos");
  const [query, setQuery] = useState("");

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__smokeToast);
    window.__smokeToast = window.setTimeout(() => setToast(""), 2200);
  };

  const visiblePeople = people.filter((p) => (!filters.online || p.status === "Online agora") && (!filters.active || p.status.includes("círculo")));
  const visibleGroups = groups.filter((g) => mode !== "Pessoas");
  const visibleAccessories = accessorySeed.filter((item) => {
    const categoryOk = accessoryFilter === "Todos" || item[1] === accessoryFilter;
    const searchOk = `${item[0]} ${item[1]} ${item[2]} ${item[3].join(" ")}`.toLowerCase().includes(query.toLowerCase());
    return categoryOk && searchOk;
  });

  const nav = ["Descobrir", "Círculos", "Acessórios", "Perfil"];

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand"><span />Smoke Circle</div>
        <nav>{nav.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{iconFor(item)}{item}</button>)}</nav>
        <p className="adult">Protótipo adulto, social e legal-use. Sem vendas, pagamentos ou autenticação real.</p>
      </aside>

      <main className="shell">
        <header className="topbar">
          <div>
            <p className="eyebrow">São Paulo · raio social de 4 km</p>
            <h1>{tab}</h1>
          </div>
          <button className="pill" onClick={() => notify("Preferências salvas localmente.")}>Preferências</button>
        </header>
        {tab === "Descobrir" && <Discover mode={mode} setMode={setMode} filters={filters} setFilters={setFilters} people={visiblePeople} groups={visibleGroups} setPeople={setPeople} setGroups={setGroups} setModal={setModal} setChat={setChat} notify={notify} />}
        {tab === "Círculos" && <Circles circles={circles} setCircles={setCircles} setModal={setModal} setChat={setChat} notify={notify} />}
        {tab === "Acessórios" && <Accessories items={visibleAccessories} filter={accessoryFilter} setFilter={setAccessoryFilter} query={query} setQuery={setQuery} saved={saved} setSaved={setSaved} setModal={setModal} notify={notify} />}
        {tab === "Perfil" && <Profile saved={saved} circles={circles} people={people} notify={notify} setTab={setTab} />}
      </main>

      <nav className="bottomNav">{nav.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{iconFor(item)}<small>{item}</small></button>)}</nav>
      {toast && <div className="toast">{toast}</div>}
      {modal && <Modal modal={modal} close={() => setModal(null)} setCircles={setCircles} setGroups={setGroups} setChat={setChat} setSaved={setSaved} notify={notify} />}
      {chat && <Chat chat={chat} close={() => setChat(null)} />}
    </div>
  );
}

function iconFor(item) {
  return { Descobrir: "◌", Círculos: "◎", Acessórios: "◇", Perfil: "◐" }[item];
}

function Discover({ mode, setMode, filters, setFilters, people, groups, setPeople, setGroups, setModal, setChat, notify }) {
  const showPeople = mode !== "Grupos";
  const showGroups = mode !== "Pessoas";
  const passPerson = (id) => { setPeople((list) => list.filter((p) => p.id !== id)); notify("Perfil passado."); };
  const likePerson = (person) => person.matched ? setModal({ type: "match", person }) : notify(`Você curtiu ${person.name}.`);
  const requestGroup = (group) => { setGroups((list) => list.map((g) => g.id === group.id ? { ...g, status: "Solicitado" } : g)); setModal({ type: "join", target: group.name }); };

  return (
    <section className="section fade">
      <div className="heroPanel">
        <div>
          <p className="eyebrow">Descoberta refinada</p>
          <h2>Encontre pessoas e círculos próximos, sem revelar localização exata cedo demais.</h2>
        </div>
        <div className="segmented">{["Pessoas", "Grupos", "Ambos"].map((m) => <button className={mode === m ? "active" : ""} onClick={() => setMode(m)} key={m}>{m}</button>)}</div>
      </div>
      <div className="filters">
        <label>Distância<select value={filters.distance} onChange={(e) => setFilters({ ...filters, distance: e.target.value })}><option>2 km</option><option>4 km</option><option>8 km</option></select></label>
        <label>Idade<select value={filters.age} onChange={(e) => setFilters({ ...filters, age: e.target.value })}><option>21-30</option><option>26-40</option><option>35+</option></select></label>
        <label>Interesses<select value={filters.interest} onChange={(e) => setFilters({ ...filters, interest: e.target.value })}><option>Todos</option><option>Design</option><option>Lounge</option><option>Legal use</option></select></label>
        <button className={filters.online ? "chip active" : "chip"} onClick={() => setFilters({ ...filters, online: !filters.online })}>Online agora</button>
        <button className={filters.active ? "chip active" : "chip"} onClick={() => setFilters({ ...filters, active: !filters.active })}>Com círculo ativo</button>
      </div>
      {showPeople && <Grid title="Pessoas próximas">{people.map((p) => <PersonCard key={p.id} person={p} onPass={() => passPerson(p.id)} onLike={() => likePerson(p)} onSuper={() => { notify(`Super interesse enviado para ${p.name}.`); setModal({ type: "success", title: "Super interesse", body: "Sinal mais forte enviado com discrição." }); }} onChat={() => setChat({ title: p.name, subtitle: p.status, image: p.photo, kind: "match" })} />)}</Grid>}
      {showGroups && <Grid title="Grupos e círculos em destaque">{groups.map((g) => <GroupCard key={g.id} group={g} onDetails={() => setModal({ type: "groupDetails", group: g })} onRequest={() => requestGroup(g)} onChat={() => setChat({ title: g.name, subtitle: g.status, kind: "grupo" })} />)}</Grid>}
    </section>
  );
}

function Grid({ title, children }) {
  return <div className="block"><h3>{title}</h3><div className="grid">{children}</div></div>;
}

function PersonCard({ person, onPass, onLike, onSuper, onChat }) {
  return (
    <article className="card person">
      <img src={person.photo} alt={person.name} />
      <div className="cardBody">
        <div className="between"><h4>{person.name}, {person.age}</h4><span className="badge">{person.distance}</span></div>
        <p className="muted">{person.area} · {person.status}</p>
        <p>{person.bio}</p>
        <div className="tags">{person.tags.map((t) => <span key={t}>{t}</span>)}</div>
        <div className="actions"><button onClick={onPass}>Passar</button><button className="primary" onClick={onLike}>Curtir</button><button className="warm" onClick={onSuper}>Super interesse</button><button onClick={onChat}>Mensagem</button></div>
      </div>
    </article>
  );
}

function GroupCard({ group, onDetails, onRequest, onChat }) {
  return (
    <article className="card">
      <div className="circleMark">{group.name.slice(0, 2)}</div>
      <div className="cardBody">
        <div className="between"><h4>{group.name}</h4><span className="badge">{group.distance}</span></div>
        <p className="muted">{group.people} pessoas · {group.category} · {group.status}</p>
        <p>{group.description}</p>
        <div className="actions"><button onClick={onDetails}>Ver detalhes</button><button className="primary" onClick={onRequest}>Pedir para entrar</button><button onClick={onChat}>Conversar</button></div>
      </div>
    </article>
  );
}

function Circles({ circles, setCircles, setModal, setChat, notify }) {
  const [view, setView] = useState("map");
  const [form, setForm] = useState({ name: "", description: "", category: "Social", max: 10, area: "", exact: "", rules: "", icon: "◎" });
  const createCircle = (e) => {
    e.preventDefault();
    const circle = { id: `c${Date.now()}`, name: form.name || "Novo círculo", people: 1, distance: "0,8 km", category: form.category, status: "Local liberado", creator: "Você", area: form.area || "Área aproximada", exact: form.exact || "Privado", rules: form.rules || "Respeito, adultos e leis locais.", description: form.description || "Círculo criado localmente.", x: 35 + Math.random() * 40, y: 25 + Math.random() * 50 };
    setCircles((list) => [circle, ...list]);
    setView("map");
    notify("Círculo criado com sucesso.");
    setModal({ type: "circleDetails", circle });
  };

  return (
    <section className="section fade">
      {view === "create" ? (
        <form className="formPanel" onSubmit={createCircle}>
          <button type="button" className="ghost" onClick={() => setView("map")}>Voltar</button>
          <h2>Criar círculo</h2>
          <div className="formGrid">
            <label>Nome do círculo<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            <label>Categoria<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
            <label>Quantidade máxima<input type="number" value={form.max} onChange={(e) => setForm({ ...form, max: e.target.value })} /></label>
            <label>Localização aproximada<input value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} /></label>
            <label>Localização exata privada<input value={form.exact} onChange={(e) => setForm({ ...form, exact: e.target.value })} /></label>
            <label>Ícone/foto do círculo<input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} /></label>
            <label className="wide">Descrição<textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></label>
            <label className="wide">Regras do círculo<textarea value={form.rules} onChange={(e) => setForm({ ...form, rules: e.target.value })} /></label>
          </div>
          <button className="primary big">Criar círculo</button>
        </form>
      ) : (
        <>
          <div className="mapHeader"><div><p className="eyebrow">Mapa discreto</p><h2>Círculos próximos sem localização exata pública.</h2></div><button className="primary" onClick={() => setView("create")}>Criar círculo</button></div>
          <div className="mapGrid">
            <div className="mapMock">
              <span className="road r1" /><span className="road r2" /><span className="road r3" />
              {circles.map((c) => <button key={c.id} className={`bubble ${c.status.replaceAll(" ", "").toLowerCase()}`} style={{ left: `${c.x}%`, top: `${c.y}%` }} onClick={() => setModal({ type: "circleDetails", circle: c })}><span>{c.people}</span>{c.distance}</button>)}
            </div>
            <div className="list">{circles.map((c) => <CircleCard key={c.id} circle={c} setCircles={setCircles} setModal={setModal} setChat={setChat} notify={notify} />)}</div>
          </div>
        </>
      )}
    </section>
  );
}

function CircleCard({ circle, setCircles, setModal, setChat, notify }) {
  const update = (status) => setCircles((list) => list.map((c) => c.id === circle.id ? { ...c, status } : c));
  return (
    <article className="card compact">
      <div className="between"><h4>{circle.name}</h4><span className={`status ${circle.status.replaceAll(" ", "").toLowerCase()}`}>{circle.status}</span></div>
      <p className="muted">{circle.people} pessoas · {circle.distance} · {circle.category}</p>
      <p>{circle.description || `Área aproximada: ${circle.area}. Local exato protegido.`}</p>
      <p className="muted">Criador: {circle.creator} · Regras: {circle.rules}</p>
      <div className="actions"><button onClick={() => setModal({ type: "circleDetails", circle })}>Ver detalhes</button><button className="primary" onClick={() => { update("Solicitado"); notify("Pedido enviado ao criador."); }}>Pedir para entrar</button><button onClick={() => setChat({ title: circle.creator, subtitle: circle.name, kind: "criador" })}>Conversar com criador</button><button className="warm" onClick={() => setModal({ type: "unlock", circle, onConfirm: () => update("Local liberado") })}>Liberar localização</button><button onClick={() => notify("Painel de gerenciamento mock aberto.")}>Gerenciar círculo</button></div>
    </article>
  );
}

function Accessories({ items, filter, setFilter, query, setQuery, saved, setSaved, setModal, notify }) {
  const categories = ["Todos", ...new Set(accessorySeed.map((i) => i[1]))];
  const toggleSaved = (item) => {
    setSaved((list) => list.some((x) => x[0] === item[0]) ? list.filter((x) => x[0] !== item[0]) : [item, ...list]);
    notify(saved.some((x) => x[0] === item[0]) ? "Removido dos favoritos." : "Acessório salvo.");
  };
  return (
    <section className="section fade">
      <div className="heroPanel"><div><p className="eyebrow">Guia visual adulto</p><h2>Acessórios legais, sem checkout e sem promoção de substâncias ilegais.</h2></div><input className="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar acessórios" /></div>
      <div className="scrollChips">{categories.map((c) => <button key={c} className={filter === c ? "chip active" : "chip"} onClick={() => setFilter(c)}>{c}</button>)}</div>
      <div className="accessoryGrid">{items.map((item) => <AccessoryCard key={item[0]} item={item} saved={saved.some((x) => x[0] === item[0])} onSave={() => toggleSaved(item)} onDetails={() => setModal({ type: "accessory", item, onSave: () => toggleSaved(item) })} />)}</div>
    </section>
  );
}

function AccessoryCard({ item, saved, onSave, onDetails }) {
  return (
    <article className="card accessory">
      <img src={item[4]} alt={item[0]} />
      <div className="cardBody">
        <div className="between"><h4>{item[0]}</h4><button className={saved ? "save saved" : "save"} onClick={onSave}>{saved ? "Salvo" : "Salvar"}</button></div>
        <p className="muted">{item[1]}</p><p>{item[2]}</p>
        <div className="tags">{item[3].map((t) => <span key={t}>{t}</span>)}</div>
        <button onClick={onDetails}>Ver detalhes</button>
      </div>
    </article>
  );
}

function Profile({ saved, circles, people, notify, setTab }) {
  return (
    <section className="section fade">
      <div className="profileHero"><img src="https://randomuser.me/api/portraits/men/36.jpg" alt="Perfil" /><div><p className="eyebrow">Perfil mock</p><h2>Guilherme, 34</h2><p>Adulto, discreto, interessado em círculos pequenos, acessórios legais e privacidade de localização.</p></div></div>
      <div className="profileGrid">
        <Panel title="Preferências"><p>Distância aproximada · círculos adultos · legal use · privacidade ativa</p><button onClick={() => notify("Editor de perfil mock aberto.")}>Editar perfil</button></Panel>
        <Panel title="Círculos participando"><p>{circles.filter((c) => c.status !== "Bloqueado").length} círculos em andamento</p><button onClick={() => setTab("Círculos")}>Ver círculos</button></Panel>
        <Panel title="Acessórios salvos"><p>{saved.length || "Nenhum"} item salvo</p>{saved.slice(0, 3).map((s) => <small key={s[0]}>{s[0]}</small>)}</Panel>
        <Panel title="Matches recentes"><p>{people.filter((p) => p.matched).length} conversas potenciais</p><button onClick={() => notify("Lista de matches mock aberta.")}>Abrir matches</button></Panel>
        <Panel title="Configurações"><div className="actions vertical">{["Privacidade de localização", "Mostrar distância aproximada", "Usuários bloqueados", "Denunciar problema", "Sair"].map((a) => <button key={a} onClick={() => notify(`${a}: ação mock registrada.`)}>{a}</button>)}</div></Panel>
      </div>
    </section>
  );
}

function Panel({ title, children }) {
  return <article className="card panel"><h4>{title}</h4>{children}</article>;
}

function Modal({ modal, close, setCircles, setGroups, setChat, setSaved, notify }) {
  const confirmUnlock = () => { modal.onConfirm?.(); notify("Localização liberada com aviso registrado."); close(); };
  return (
    <div className="overlay" onClick={close}><div className="modal" onClick={(e) => e.stopPropagation()}>
      <button className="x" onClick={close}>×</button>
      {modal.type === "match" && <><h2>Match com {modal.person.name}</h2><img className="modalImg" src={modal.person.photo} alt={modal.person.name} /><p>Vocês demonstraram interesse. Comece uma conversa com calma.</p><button className="primary" onClick={() => { setChat({ title: modal.person.name, subtitle: "Match recente", image: modal.person.photo, kind: "match" }); close(); }}>Mensagem</button></>}
      {modal.type === "join" && <><h2>Pedido enviado</h2><p>Seu pedido para entrar em {modal.target} foi registrado. O criador verá seu perfil antes de liberar detalhes.</p><button className="primary" onClick={close}>Entendi</button></>}
      {modal.type === "success" && <><h2>{modal.title}</h2><p>{modal.body}</p><button className="primary" onClick={close}>Fechar</button></>}
      {modal.type === "groupDetails" && <><h2>{modal.group.name}</h2><p>{modal.group.description}</p><p className="muted">{modal.group.people} pessoas · {modal.group.distance} · {modal.group.category}</p><button className="primary" onClick={() => { setGroups((list) => list.map((g) => g.id === modal.group.id ? { ...g, status: "Solicitado" } : g)); notify("Pedido enviado."); close(); }}>Pedir para entrar</button></>}
      {modal.type === "circleDetails" && <><h2>{modal.circle.name}</h2><p>{modal.circle.description || "Círculo local com localização exata protegida."}</p><p className="muted">Área: {modal.circle.area} · Exato: {modal.circle.status === "Local liberado" ? modal.circle.exact : "oculto até aprovação"}</p><p>{modal.circle.rules}</p><button className="primary" onClick={() => { setChat({ title: modal.circle.name, subtitle: "Chat do círculo", kind: "círculo" }); close(); }}>Conversar</button></>}
      {modal.type === "unlock" && <><h2>Liberar localização?</h2><p>Compartilhe sua localização exata apenas com pessoas em quem confia.</p><div className="actions"><button onClick={close}>Voltar</button><button className="warm" onClick={confirmUnlock}>Liberar localização</button></div></>}
      {modal.type === "accessory" && <><img className="modalImg wideImg" src={modal.item[4]} alt={modal.item[0]} /><h2>{modal.item[0]}</h2><p className="muted">{modal.item[1]}</p><p>{modal.item[2]} Selecionado como referência visual para adultos, com foco em organização e uso responsável.</p><p className="notice">Produto destinado apenas a adultos e conforme as leis locais.</p><div className="actions"><button className="primary" onClick={() => { modal.onSave?.(); close(); }}>Salvar nos favoritos</button><button onClick={close}>Voltar</button></div></>}
    </div></div>
  );
}

function Chat({ chat, close }) {
  const [messages, setMessages] = useState(["Olá. Vi seu perfil e gostei do tom do círculo.", "A ideia é conversar antes de liberar qualquer detalhe privado."]);
  const [draft, setDraft] = useState("");
  const send = () => { if (!draft.trim()) return; setMessages((m) => [...m, draft.trim()]); setDraft(""); };
  return (
    <div className="chatPane">
      <header><button onClick={close}>Voltar</button><div>{chat.image && <img src={chat.image} alt="" />}<strong>{chat.title}</strong><small>{chat.subtitle}</small></div></header>
      <div className="messages">{messages.map((m, i) => <p key={i} className={i % 2 ? "other" : "mine"}>{m}</p>)}</div>
      <footer><input value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Escreva uma mensagem" /><button className="primary" onClick={send}>Enviar</button></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
