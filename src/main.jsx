import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { accessoriesSeed, circlesSeed, groupsSeed, peopleSeed } from "./mockData";
import "./styles.css";

const navItems = ["Descobrir", "Círculos", "Acessórios", "Perfil"];

function Logo({ compact = false }) {
  return (
    <div className={compact ? "logo compactLogo" : "logo"}>
      <span className="logoMark" aria-hidden="true">
        <svg viewBox="0 0 48 48" role="img">
          <path d="M24 7c8 7 13 14 13 22 0 7-5 12-13 12S11 36 11 29C11 21 16 14 24 7Z" fill="#7fbd74" />
          <path d="M24 11v26M17 24c4 1 6 3 7 7M31 22c-4 2-6 5-7 10" stroke="#123018" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      </span>
      {!compact && <strong>Smoke Circle</strong>}
    </div>
  );
}

function iconFor(item) {
  return { Descobrir: "⌕", Círculos: "◎", Acessórios: "◇", Perfil: "◐" }[item];
}

function App() {
  const [tab, setTab] = useState("Descobrir");
  const [mode, setMode] = useState("Ambos");
  const [filters, setFilters] = useState({ online: false, active: false, distance: "4 km", interest: "Todos" });
  const [people, setPeople] = useState(peopleSeed.map((person, index) => ({ ...person, id: `p${index}` })));
  const [groups, setGroups] = useState(groupsSeed.map((group, index) => ({ ...group, id: `g${index}` })));
  const [circles, setCircles] = useState(circlesSeed.map((circle, index) => ({ ...circle, id: `c${index}` })));
  const [saved, setSaved] = useState([]);
  const [toast, setToast] = useState("");
  const [modal, setModal] = useState(null);
  const [chat, setChat] = useState(null);
  const [accessoryFilter, setAccessoryFilter] = useState("Todos");
  const [query, setQuery] = useState("");

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__smokeToast);
    window.__smokeToast = window.setTimeout(() => setToast(""), 2400);
  };

  const visiblePeople = people.filter((person) => {
    const onlineOk = !filters.online || person.status === "Online agora";
    const activeOk = !filters.active || person.status.includes("círculo");
    const interestOk = filters.interest === "Todos" || person.tags.join(" ").toLowerCase().includes(filters.interest.toLowerCase());
    return onlineOk && activeOk && interestOk;
  });

  const visibleAccessories = accessoriesSeed.filter((item) => {
    const categoryOk = accessoryFilter === "Todos" || item[1] === accessoryFilter;
    const searchText = `${item[0]} ${item[1]} ${item[2]} ${item[3].join(" ")}`.toLowerCase();
    return categoryOk && searchText.includes(query.toLowerCase());
  });

  return (
    <div className="app">
      <aside className="sidebar">
        <Logo />
        <nav>{navItems.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{iconFor(item)}{item}</button>)}</nav>
        <p className="adult">Para adultos. Sem venda, sem pagamento e sem autenticação real. Use com responsabilidade e respeite as leis locais.</p>
      </aside>

      <main className="shell">
        <header className="topbar">
          <div className="topBrand">
            <Logo compact />
            <div>
              <strong className="topBrandName">Smoke Circle</strong>
              <p className="eyebrow">São Paulo · raio social de 4 km</p>
              <h1>{tab}</h1>
              <p className="topCopy">Veja quem está por perto pra trocar ideia, entrar na roda ou puxar um trago com respeito.</p>
            </div>
          </div>
          <button className="pill" onClick={() => notify("Preferências salvas aqui no protótipo.")}>Preferências</button>
        </header>

        {tab === "Descobrir" && (
          <Discover mode={mode} setMode={setMode} filters={filters} setFilters={setFilters} people={visiblePeople} groups={groups} setPeople={setPeople} setGroups={setGroups} setModal={setModal} setChat={setChat} notify={notify} />
        )}
        {tab === "Círculos" && <Circles circles={circles} setCircles={setCircles} setModal={setModal} setChat={setChat} notify={notify} />}
        {tab === "Acessórios" && <Accessories items={visibleAccessories} filter={accessoryFilter} setFilter={setAccessoryFilter} query={query} setQuery={setQuery} saved={saved} setSaved={setSaved} setModal={setModal} notify={notify} />}
        {tab === "Perfil" && <Profile saved={saved} circles={circles} people={people} notify={notify} setTab={setTab} />}
      </main>

      <nav className="bottomNav">{navItems.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{iconFor(item)}<small>{item}</small></button>)}</nav>
      {toast && <div className="toast">{toast}</div>}
      {modal && <Modal modal={modal} close={() => setModal(null)} setGroups={setGroups} setCircles={setCircles} setChat={setChat} notify={notify} />}
      {chat && <Chat chat={chat} close={() => setChat(null)} />}
    </div>
  );
}

function Discover({ mode, setMode, filters, setFilters, people, groups, setPeople, setGroups, setModal, setChat, notify }) {
  const showPeople = mode !== "Grupos";
  const showGroups = mode !== "Pessoas";
  const passPerson = (id) => {
    setPeople((list) => list.filter((person) => person.id !== id));
    notify("Passou. Bora ver o próximo perfil.");
  };
  const likePerson = (person) => {
    if (person.matched) setModal({ type: "match", person });
    else notify(`Você curtiu ${person.name}. Se rolar match, o papo abre.`);
  };
  const requestGroup = (group, joined = false) => {
    setGroups((list) => list.map((item) => item.id === group.id ? { ...item, status: joined ? "Em conversa" : "Solicitado" } : item));
    setModal({ type: "join", target: group.name, joined });
  };

  return (
    <section className="section fade">
      <div className="heroPanel brandPanel">
        <div>
          <p className="eyebrow">Descobrir</p>
          <h2>Encontre pessoas e grupos na sua vibe.</h2>
          <p className="muted">Dá pra ver quem está por perto, pedir entrada e chamar no papo sem revelar localização exata de cara.</p>
        </div>
        <div className="segmented">{["Pessoas", "Grupos", "Ambos"].map((item) => <button className={mode === item ? "active" : ""} onClick={() => setMode(item)} key={item}>{item}</button>)}</div>
      </div>
      <div className="filters">
        <label>Distância<select value={filters.distance} onChange={(event) => setFilters({ ...filters, distance: event.target.value })}><option>2 km</option><option>4 km</option><option>8 km</option></select></label>
        <label>Interesses<select value={filters.interest} onChange={(event) => setFilters({ ...filters, interest: event.target.value })}><option>Todos</option><option>Design</option><option>Lounge</option><option>Uso legal</option><option>Papo</option></select></label>
        <button className={filters.online ? "chip active" : "chip"} onClick={() => setFilters({ ...filters, online: !filters.online })}>Online agora</button>
        <button className={filters.active ? "chip active" : "chip"} onClick={() => setFilters({ ...filters, active: !filters.active })}>Com círculo ativo</button>
      </div>
      {showPeople && <Grid title="Pessoas por perto">{people.map((person) => <PersonCard key={person.id} person={person} onPass={() => passPerson(person.id)} onLike={() => likePerson(person)} onSuper={() => { notify(`Super interesse enviado para ${person.name}.`); setModal({ type: "success", title: "Super interesse", body: "Sinal mais forte enviado com discrição. Sem pressão, só intenção clara." }); }} onChat={() => setChat({ title: person.name, subtitle: person.status, image: person.photo, kind: "match" })} />)}</Grid>}
      {showGroups && <Grid title="Rodas e grupos em destaque">{groups.map((group) => <GroupCard key={group.id} group={group} onDetails={() => setModal({ type: "groupDetails", group })} onRequest={() => requestGroup(group)} onJoin={() => requestGroup(group, true)} onChat={() => setChat({ title: group.name, subtitle: group.status, image: group.photo, kind: "grupo" })} />)}</Grid>}
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
        <div className="tags">{person.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="actions"><button onClick={onPass}>Passar</button><button className="primary" onClick={onLike}>Curtir</button><button className="warm" onClick={onSuper}>Super interesse</button><button onClick={onChat}>Mensagem</button></div>
      </div>
    </article>
  );
}

function GroupCard({ group, onDetails, onRequest, onJoin, onChat }) {
  return (
    <article className="card groupCard">
      <img className="groupBanner" src={group.photo} alt={group.name} />
      <div className="cardBody">
        <div className="between"><h4>{group.name}</h4><span className="badge">{group.distance}</span></div>
        <p className="muted">{group.people} pessoas · {group.category} · {group.status}</p>
        <p>{group.description}</p>
        <p className="muted">Criador: {group.creator} · {group.rules}</p>
        <div className="actions"><button onClick={onDetails}>Ver detalhes</button><button className="primary" onClick={onRequest}>Pedir entrada</button><button className="warm" onClick={onJoin}>Entrar na roda</button><button onClick={onChat}>Conversar</button></div>
      </div>
    </article>
  );
}

function Circles({ circles, setCircles, setModal, setChat, notify }) {
  const [view, setView] = useState("map");
  const [form, setForm] = useState({ name: "", description: "", category: "Chill", max: 10, area: "", exact: "", rules: "", photo: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80" });
  const createCircle = (event) => {
    event.preventDefault();
    const circle = { id: `c${Date.now()}`, name: form.name || "Nova roda", people: 1, distance: "0,8 km", category: form.category, status: "Local liberado", creator: "Você", area: form.area || "Área aproximada", exact: form.exact || "Privado", rules: form.rules || "Adultos, respeito e leis locais.", description: form.description || "Roda criada para trocar ideia com calma.", photo: form.photo, x: 28 + Math.random() * 52, y: 24 + Math.random() * 54 };
    setCircles((list) => [circle, ...list]);
    setView("map");
    notify("Círculo criado. Já dá pra chamar a galera.");
    setModal({ type: "circleDetails", circle });
  };

  return (
    <section className="section fade">
      {view === "create" ? (
        <form className="formPanel" onSubmit={createCircle}>
          <button type="button" className="ghost" onClick={() => setView("map")}>Voltar</button>
          <h2>Criar círculo</h2>
          <p className="muted">Monte uma roda, esconda o local exato e libere só quando fizer sentido.</p>
          <div className="formGrid">
            <label>Nome do círculo<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
            <label>Categoria<select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>{["Chill", "Conversa", "Rolê", "Tabaco", "Cigarro", "Narguilé", "Acessórios"].map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Quantidade máxima<input type="number" value={form.max} onChange={(event) => setForm({ ...form, max: event.target.value })} /></label>
            <label>Localização aproximada<input value={form.area} onChange={(event) => setForm({ ...form, area: event.target.value })} /></label>
            <label>Localização exata privada<input value={form.exact} onChange={(event) => setForm({ ...form, exact: event.target.value })} /></label>
            <label>Foto/banner do círculo<input value={form.photo} onChange={(event) => setForm({ ...form, photo: event.target.value })} /></label>
            <label className="wide">Descrição<textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} /></label>
            <label className="wide">Regras do círculo<textarea value={form.rules} onChange={(event) => setForm({ ...form, rules: event.target.value })} /></label>
          </div>
          <button className="primary big">Criar círculo</button>
        </form>
      ) : (
        <>
          <div className="mapHeader brandPanel"><div><p className="eyebrow">Círculos próximos</p><h2>Veja rodas por perto. A localização exata só aparece quando for liberada.</h2></div><button className="primary" onClick={() => setView("create")}>Criar círculo</button></div>
          <div className="mapGrid">
            <div className="mapMock">
              <span className="road r1" /><span className="road r2" /><span className="road r3" />
              {circles.map((circle) => <button key={circle.id} className={`bubble ${circle.status.replaceAll(" ", "").toLowerCase()}`} style={{ left: `${circle.x}%`, top: `${circle.y}%` }} onClick={() => setModal({ type: "circleDetails", circle })}><span>{circle.people}</span>{circle.distance}</button>)}
            </div>
            <div className="list">{circles.map((circle) => <CircleCard key={circle.id} circle={circle} setCircles={setCircles} setModal={setModal} setChat={setChat} notify={notify} />)}</div>
          </div>
        </>
      )}
    </section>
  );
}

function CircleCard({ circle, setCircles, setModal, setChat, notify }) {
  const update = (status) => setCircles((list) => list.map((item) => item.id === circle.id ? { ...item, status } : item));
  const enter = () => {
    const status = circle.status === "Local liberado" ? "Local liberado" : "Solicitado";
    update(status);
    notify(circle.status === "Local liberado" ? "Você entrou na roda." : "Pedido de entrada enviado.");
  };
  return (
    <article className="card compact circleCard">
      <img className="circlePhoto" src={circle.photo} alt={circle.name} />
      <div className="between"><h4>{circle.name}</h4><span className={`status ${circle.status.replaceAll(" ", "").toLowerCase()}`}>{circle.status}</span></div>
      <p className="muted">{circle.people} pessoas · {circle.distance} · {circle.category}</p>
      <p>{circle.description}</p>
      <p className="muted">Criador: {circle.creator} · Regras: {circle.rules}</p>
      <div className="actions"><button onClick={() => setModal({ type: "circleDetails", circle })}>Ver detalhes</button><button className="primary" onClick={() => { update("Solicitado"); notify("Pedido enviado ao criador."); }}>Pedir entrada</button><button className="warm" onClick={enter}>Entrar na roda</button><button onClick={() => setChat({ title: circle.creator, subtitle: circle.name, image: circle.photo, kind: "criador" })}>Conversar com criador</button><button onClick={() => setModal({ type: "unlock", circle, onConfirm: () => update("Local liberado") })}>Liberar localização</button><button onClick={() => notify("Gerenciamento mock aberto.")}>Gerenciar círculo</button></div>
    </article>
  );
}

function Accessories({ items, filter, setFilter, query, setQuery, saved, setSaved, setModal, notify }) {
  const categories = ["Todos", ...new Set(accessoriesSeed.map((item) => item[1]))];
  const toggleSaved = (item) => {
    const alreadySaved = saved.some((savedItem) => savedItem[0] === item[0]);
    setSaved((list) => alreadySaved ? list.filter((savedItem) => savedItem[0] !== item[0]) : [item, ...list]);
    notify(alreadySaved ? "Removido dos favoritos." : "Acessório salvo pra ver depois.");
  };
  return (
    <section className="section fade">
      <div className="heroPanel brandPanel"><div><p className="eyebrow">Acessórios</p><h2>Sedas, piteiras, isqueiros e utensílios pra deixar o trago mais organizado.</h2><p className="muted">Guia visual para adultos. Sem compra, sem checkout e sem promoção de produtos ilegais.</p></div><input className="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar acessórios" /></div>
      <div className="scrollChips">{categories.map((category) => <button key={category} className={filter === category ? "chip active" : "chip"} onClick={() => setFilter(category)}>{category}</button>)}</div>
      <div className="accessoryGrid">{items.map((item) => <AccessoryCard key={item[0]} item={item} saved={saved.some((savedItem) => savedItem[0] === item[0])} onSave={() => toggleSaved(item)} onDetails={() => setModal({ type: "accessory", item, onSave: () => toggleSaved(item) })} />)}</div>
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
        <div className="tags">{item[3].map((tag) => <span key={tag}>{tag}</span>)}</div>
        <button onClick={onDetails}>Ver detalhes</button>
      </div>
    </article>
  );
}

function Profile({ saved, circles, people, notify, setTab }) {
  return (
    <section className="section fade">
      <div className="profileHero brandPanel"><Logo /><img src="https://randomuser.me/api/portraits/men/36.jpg" alt="Perfil" /><div><p className="eyebrow">Perfil mock</p><h2>Guilherme, 34</h2><p>Adulto, discreto, interessado em círculos pequenos, acessórios legais e privacidade de localização.</p></div></div>
      <div className="profileGrid">
        <Panel title="Preferências"><p>Distância aproximada · círculos adultos · uso legal · privacidade ativa</p><button onClick={() => notify("Editor de perfil mock aberto.")}>Editar perfil</button></Panel>
        <Panel title="Círculos participando"><p>{circles.filter((circle) => circle.status !== "Bloqueado").length} círculos em andamento</p><button onClick={() => setTab("Círculos")}>Ver círculos</button></Panel>
        <Panel title="Acessórios salvos"><p>{saved.length || "Nenhum"} item salvo</p>{saved.slice(0, 3).map((item) => <small key={item[0]}>{item[0]}</small>)}</Panel>
        <Panel title="Matches recentes"><p>{people.filter((person) => person.matched).length} conversas potenciais</p><button onClick={() => notify("Lista de matches mock aberta.")}>Abrir matches</button></Panel>
        <Panel title="Configurações"><div className="actions vertical">{["Privacidade de localização", "Mostrar distância aproximada", "Usuários bloqueados", "Denunciar problema", "Sair"].map((action) => <button key={action} onClick={() => notify(`${action}: ação mock registrada.`)}>{action}</button>)}</div></Panel>
      </div>
    </section>
  );
}

function Panel({ title, children }) {
  return <article className="card panel"><h4>{title}</h4>{children}</article>;
}

function Modal({ modal, close, setGroups, setCircles, setChat, notify }) {
  const confirmUnlock = () => { modal.onConfirm?.(); notify("Local liberado com aviso registrado."); close(); };
  return (
    <div className="overlay" onClick={close}><div className="modal" onClick={(event) => event.stopPropagation()}>
      <button className="x" onClick={close}>×</button>
      {modal.type === "match" && <><h2>Deu match com {modal.person.name}</h2><img className="modalImg" src={modal.person.photo} alt={modal.person.name} /><p>Vocês curtiram a mesma vibe. Chama no papo e vai com calma.</p><button className="primary" onClick={() => { setChat({ title: modal.person.name, subtitle: "Match recente", image: modal.person.photo, kind: "match" }); close(); }}>Mensagem</button></>}
      {modal.type === "join" && <><h2>{modal.joined ? "Você entrou na roda" : "Pedido enviado"}</h2><p>{modal.joined ? `Você entrou em ${modal.target}. Se o local ainda estiver bloqueado, fale com o criador.` : `Seu pedido para entrar em ${modal.target} foi registrado. O criador vê seu perfil antes de liberar detalhes.`}</p><button className="primary" onClick={close}>Fechado</button></>}
      {modal.type === "success" && <><h2>{modal.title}</h2><p>{modal.body}</p><button className="primary" onClick={close}>Fechar</button></>}
      {modal.type === "groupDetails" && <><img className="modalImg" src={modal.group.photo} alt={modal.group.name} /><h2>{modal.group.name}</h2><p>{modal.group.description}</p><p className="muted">{modal.group.people} pessoas · {modal.group.distance} · {modal.group.category}</p><p>{modal.group.rules}</p><div className="actions"><button className="primary" onClick={() => { setGroups((list) => list.map((group) => group.id === modal.group.id ? { ...group, status: "Solicitado" } : group)); notify("Pedido enviado."); close(); }}>Pedir entrada</button><button className="warm" onClick={() => { setGroups((list) => list.map((group) => group.id === modal.group.id ? { ...group, status: "Em conversa" } : group)); notify("Você entrou na roda."); close(); }}>Entrar na roda</button></div></>}
      {modal.type === "circleDetails" && <><img className="modalImg" src={modal.circle.photo} alt={modal.circle.name} /><h2>{modal.circle.name}</h2><p>{modal.circle.description}</p><p className="muted">Área: {modal.circle.area} · Local exato: {modal.circle.status === "Local liberado" ? modal.circle.exact : "oculto até liberação"}</p><p>{modal.circle.rules}</p><button className="primary" onClick={() => { setChat({ title: modal.circle.name, subtitle: "Chat do círculo", image: modal.circle.photo, kind: "círculo" }); close(); }}>Conversar</button></>}
      {modal.type === "unlock" && <><h2>Liberar localização?</h2><p>Compartilhe sua localização exata apenas com pessoas em quem confia.</p><p className="notice">Use com responsabilidade e respeite as leis locais.</p><div className="actions"><button onClick={close}>Voltar</button><button className="warm" onClick={confirmUnlock}>Liberar localização</button></div></>}
      {modal.type === "accessory" && <><img className="modalImg wideImg" src={modal.item[4]} alt={modal.item[0]} /><h2>{modal.item[0]}</h2><p className="muted">{modal.item[1]}</p><p>{modal.item[2]} Dica: mantenha seus itens limpos, organizados e use apenas conforme as leis locais.</p><p className="notice">Produto destinado apenas a adultos e conforme as leis locais.</p><div className="actions"><button className="primary" onClick={() => { modal.onSave?.(); close(); }}>Salvar nos favoritos</button><button onClick={close}>Voltar</button></div></>}
    </div></div>
  );
}

function Chat({ chat, close }) {
  const [messages, setMessages] = useState(["Oi. Vi seu perfil e curti o tom da roda.", "A ideia é trocar ideia antes de liberar qualquer detalhe privado."]);
  const [draft, setDraft] = useState("");
  const send = () => { if (!draft.trim()) return; setMessages((items) => [...items, draft.trim()]); setDraft(""); };
  return (
    <div className="chatPane">
      <header><button onClick={close}>Voltar</button><div>{chat.image && <img src={chat.image} alt="" />}<strong>{chat.title}</strong><small>{chat.subtitle}</small></div></header>
      <div className="messages">{messages.map((message, index) => <p key={`${message}-${index}`} className={index % 2 ? "other" : "mine"}>{message}</p>)}</div>
      <footer><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => event.key === "Enter" && send()} placeholder="Escreva uma mensagem" /><button className="primary" onClick={send}>Enviar</button></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
