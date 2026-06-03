import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { groupsData, peopleData, productsData } from "./mockData";
import "./styles.css";

const tabs = ["Pessoas", "Grupos", "Mapa", "Acessórios", "Perfil"];
const preferenceOptions = [
  "Praia",
  "Fotografia",
  "Música",
  "Rolê tranquilo",
  "Conversa",
  "Facul",
  "Arte",
  "Skate",
  "Noite",
  "Natureza",
  "Grupo pequeno",
  "Grupo grande",
  "Pessoas",
  "Grupos",
  "Acessórios",
];

function Logo({ stacked = false }) {
  return (
    <div className={stacked ? "logo logoStacked" : "logo"}>
      <span className="logoIcon" aria-hidden="true">
        <svg viewBox="0 0 48 48">
          <path d="M24 7c8 7 13 14 13 22 0 7-5 12-13 12S11 36 11 29C11 21 16 14 24 7Z" fill="#4f8f45" />
          <path d="M24 11v26M17 24c4 1 6 3 7 7M31 22c-4 2-6 5-7 10" stroke="#173b1e" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      </span>
      <strong>Smoke Circle</strong>
    </div>
  );
}

function App() {
  const [entered, setEntered] = useState(false);
  const [tab, setTab] = useState("Pessoas");
  const [people, setPeople] = useState(peopleData);
  const [personIndex, setPersonIndex] = useState(0);
  const [personFilters, setPersonFilters] = useState([]);
  const [groupFilters, setGroupFilters] = useState([]);
  const [productFilters, setProductFilters] = useState([]);
  const [requestedGroups, setRequestedGroups] = useState([]);
  const [savedProducts, setSavedProducts] = useState([]);
  const [selectedPreferences, setSelectedPreferences] = useState(["Praia", "Fotografia", "Rolê tranquilo"]);
  const [modal, setModal] = useState(null);
  const [toast, setToast] = useState("");

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__smokeToast);
    window.__smokeToast = window.setTimeout(() => setToast(""), 2600);
  };

  const enter = (nextTab = "Pessoas") => {
    setTab(nextTab);
    setEntered(true);
  };

  if (!entered) {
    return (
      <main className="landing">
        <div className="landingShell">
          <header className="landingTop">
            <Logo />
            <span>Localização sempre aproximada</span>
          </header>
          <section className="landingHero">
            <div className="heroCopy">
              <p className="eyebrow">Demo social para adultos</p>
              <h1>Encontre sua roda</h1>
              <p>Descubra pessoas, grupos e círculos próximos para trocar ideia.</p>
              <div className="heroActions">
                <button className="primary big" onClick={() => enter("Pessoas")}>Explorar agora</button>
                <button className="secondary big" onClick={() => enter("Grupos")}>Ver grupos perto de mim</button>
              </div>
              <p className="safetyLine">O local exato só é liberado pelo criador do grupo. Use com responsabilidade e respeite as leis locais.</p>
            </div>
            <div className="heroPreview" aria-label="Prévia do app Smoke Circle">
              <div className="previewCard raised">
                <span className="statusDot" />
                <strong>Sunset Gonzaga</strong>
                <small>1,1 km · 18 pessoas · aberto</small>
              </div>
              <div className="previewMap">
                <span className="pin p1" />
                <span className="pin p2" />
                <span className="pin p3" />
              </div>
              <div className="previewCard">
                <strong>Marina, 24</strong>
                <small>Fotografia · Praia · Rolê tranquilo</small>
              </div>
            </div>
          </section>
        </div>
        {toast && <Toast message={toast} />}
      </main>
    );
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <Logo stacked />
        <nav>
          {tabs.map((item) => (
            <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>
              {iconFor(item)} <span>{item}</span>
            </button>
          ))}
        </nav>
        <p className="adultNote">Para adultos. Vitrine demo, sem checkout e sem venda de substâncias. O app usa localização aproximada.</p>
      </aside>

      <main className="shell">
        <Header tab={tab} setTab={setTab} notify={notify} />
        {tab === "Pessoas" && (
          <PeopleTab
            people={people}
            setPeople={setPeople}
            personIndex={personIndex}
            setPersonIndex={setPersonIndex}
            filters={personFilters}
            setFilters={setPersonFilters}
            setModal={setModal}
            notify={notify}
          />
        )}
        {tab === "Grupos" && (
          <GroupsTab
            groups={groupsData}
            filters={groupFilters}
            setFilters={setGroupFilters}
            requestedGroups={requestedGroups}
            setRequestedGroups={setRequestedGroups}
            setModal={setModal}
            notify={notify}
          />
        )}
        {tab === "Mapa" && (
          <MapTab groups={groupsData} setTab={setTab} setModal={setModal} requestedGroups={requestedGroups} />
        )}
        {tab === "Acessórios" && (
          <AccessoriesTab
            products={productsData}
            filters={productFilters}
            setFilters={setProductFilters}
            savedProducts={savedProducts}
            setSavedProducts={setSavedProducts}
            setModal={setModal}
            notify={notify}
          />
        )}
        {tab === "Perfil" && (
          <ProfileTab
            savedProducts={savedProducts}
            requestedGroups={requestedGroups}
            selectedPreferences={selectedPreferences}
            setSelectedPreferences={setSelectedPreferences}
            setModal={setModal}
            notify={notify}
            leave={() => setEntered(false)}
          />
        )}
      </main>

      <BottomNav tab={tab} setTab={setTab} />
      {modal && <AppModal modal={modal} close={() => setModal(null)} notify={notify} />}
      {toast && <Toast message={toast} />}
    </div>
  );
}

function iconFor(tab) {
  return { Pessoas: "◎", Grupos: "◌", Mapa: "⌖", Acessórios: "◇", Perfil: "●" }[tab];
}

function Header({ tab, setTab, notify }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">Smoke Circle · Baixada Santista</p>
        <h2>{tab}</h2>
        <p className="muted">Ver quem está por perto, entrar na roda e trocar ideia com localização protegida.</p>
      </div>
      <button className="secondary preferenceShortcut" onClick={() => { setTab("Perfil"); notify("Abra sua vibe e ajuste as preferências."); }}>Preferências</button>
    </header>
  );
}

function BottomNav({ tab, setTab }) {
  return (
    <nav className="bottomNav">
      {tabs.map((item) => (
        <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>
          <span>{iconFor(item)}</span>
          <small>{item}</small>
        </button>
      ))}
    </nav>
  );
}

function FilterChips({ options, selected, onToggle }) {
  return (
    <div className="chips">
      {options.map((option) => (
        <button key={option} className={selected.includes(option) ? "chip active" : "chip"} onClick={() => onToggle(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}

function toggleOption(list, option) {
  return list.includes(option) ? list.filter((item) => item !== option) : [...list, option];
}

function PeopleTab({ people, setPeople, personIndex, setPersonIndex, filters, setFilters, setModal, notify }) {
  const filtered = useMemo(() => filterPeople(people, filters), [people, filters]);
  const current = filtered[personIndex % Math.max(filtered.length, 1)];

  const nextCard = () => setPersonIndex((index) => (index + 1) % Math.max(filtered.length, 1));
  const like = () => {
    notify("Você curtiu este perfil");
    nextCard();
  };
  const pass = () => {
    notify("Perfil pulado. Bora ver o próximo.");
    nextCard();
  };

  return (
    <section className="section fade">
      <Panel title="Pessoas por perto" text="Cards em modo visitante para achar uma resenha com respeito.">
        <FilterChips
          options={["Até 4 km", "Online agora", "Rolê tranquilo", "Faculdade", "Praia"]}
          selected={filters}
          onToggle={(option) => {
            setPersonIndex(0);
            setFilters(toggleOption(filters, option));
          }}
        />
      </Panel>
      {current ? (
        <div className="swipeLayout">
          <PersonCard person={current} onLike={like} onPass={pass} onProfile={() => setModal({ type: "person", item: current })} onMessage={() => setModal({ type: "message", title: `Mandar ideia para ${current.name}`, body: "Mensagem simulada aberta. No produto real, isso viraria um chat depois do match." })} />
          <div className="sideList">
            <h3>Também na área</h3>
            {filtered.slice(0, 5).map((person) => (
              <button key={person.id} onClick={() => setPersonIndex(filtered.findIndex((item) => item.id === person.id))}>
                <img src={person.photo} alt={person.name} />
                <span>{person.name}<small>{person.distance.toFixed(1).replace(".", ",")} km · {person.area}</small></span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState title="Nenhum perfil com esses filtros" action="Limpar filtros" onClick={() => setFilters([])} />
      )}
      <SafetyStrip actions={[["Denunciar", () => notify("Denúncia registrada no modo demo.")], ["Bloquear", () => notify("Perfil bloqueado no modo demo.")]]} />
    </section>
  );
}

function filterPeople(people, filters) {
  return people.filter((person) => {
    if (filters.includes("Até 4 km") && person.distance > 4) return false;
    if (filters.includes("Online agora") && !person.online) return false;
    if (filters.includes("Rolê tranquilo") && !person.calm) return false;
    if (filters.includes("Faculdade") && !person.college && !person.tags.includes("Faculdade")) return false;
    if (filters.includes("Praia") && !person.tags.includes("Praia")) return false;
    return true;
  });
}

function PersonCard({ person, onLike, onPass, onProfile, onMessage }) {
  return (
    <article className="personCard card">
      <img src={person.photo} alt={person.name} />
      <div className="cardBody">
        <div className="between">
          <div>
            <h3>{person.name}, {person.age}</h3>
            <p className="muted">{person.area} · {person.distance.toFixed(1).replace(".", ",")} km</p>
          </div>
          <span className={person.online ? "badge online" : "badge"}>{person.online ? "Online agora" : "Por perto"}</span>
        </div>
        <p>{person.bio}</p>
        <Tags tags={person.tags} />
        <div className="actions">
          <button className="secondary" onClick={onPass}>Passar</button>
          <button className="primary" onClick={onLike}>Curtir</button>
          <button onClick={onProfile}>Ver perfil</button>
          <button onClick={onMessage}>Mandar ideia</button>
        </div>
      </div>
    </article>
  );
}

function GroupsTab({ groups, filters, setFilters, requestedGroups, setRequestedGroups, setModal, notify }) {
  const filtered = useMemo(() => filterGroups(groups, filters), [groups, filters]);
  const requestGroup = (group) => {
    setRequestedGroups((items) => items.includes(group.id) ? items : [...items, group.id]);
    notify("Solicitação enviada. O criador do círculo libera o local exato se aceitar.");
  };
  return (
    <section className="section fade">
      <Panel title="Grupos e círculos" text="Entre na roda pelo pedido, veja regras e mantenha o local exato privado.">
        <FilterChips
          options={["Grupos abertos", "Até 4 km", "Praia", "Universitários", "Hoje", "Mais membros"]}
          selected={filters}
          onToggle={(option) => setFilters(toggleOption(filters, option))}
        />
      </Panel>
      <div className="grid groupsGrid">
        {filtered.map((group) => (
          <GroupCard key={group.id} group={group} requested={requestedGroups.includes(group.id)} onRequest={() => requestGroup(group)} onDetails={() => setModal({ type: "group", item: group })} />
        ))}
      </div>
      {!filtered.length && <EmptyState title="Nenhum grupo encontrado" action="Limpar filtros" onClick={() => setFilters([])} />}
    </section>
  );
}

function filterGroups(groups, filters) {
  return groups.filter((group) => {
    if (filters.includes("Grupos abertos") && !group.open) return false;
    if (filters.includes("Até 4 km") && group.distance > 4) return false;
    if (filters.includes("Praia") && !group.tags.includes("Praia")) return false;
    if (filters.includes("Universitários") && !group.university) return false;
    if (filters.includes("Hoje") && !group.today) return false;
    if (filters.includes("Mais membros") && group.members < 18) return false;
    return true;
  });
}

function GroupCard({ group, requested, onRequest, onDetails }) {
  return (
    <article className="groupCard card">
      <img src={group.photo} alt={group.name} />
      <div className="cardBody">
        <div className="between">
          <h3>{group.name}</h3>
          <span className={group.open ? "badge online" : "badge"}>{group.status}</span>
        </div>
        <p className="muted">{group.area} · {group.distance.toFixed(1).replace(".", ",")} km · {group.members} membros</p>
        <p>{group.description}</p>
        <Tags tags={group.tags} />
        <div className="actions">
          <button onClick={onDetails}>Ver grupo</button>
          <button className="primary" onClick={onRequest} disabled={requested}>{requested ? "Solicitação enviada" : "Pedir para entrar"}</button>
        </div>
      </div>
    </article>
  );
}

function MapTab({ groups, setTab, setModal, requestedGroups }) {
  return (
    <section className="section fade">
      <Panel title="Mapa aproximado" text="Sua localização exata nunca é exibida. Os círculos mostram apenas áreas aproximadas.">
        <button className="secondary" onClick={() => setTab("Grupos")}>Ver lista de grupos</button>
      </Panel>
      <div className="mapLayout">
        <div className="mapMock">
          <span className="road roadOne" />
          <span className="road roadTwo" />
          <span className="road roadThree" />
          {groups.map((group) => (
            <button key={group.id} className={requestedGroups.includes(group.id) ? "mapPin requested" : "mapPin"} style={{ left: `${group.x}%`, top: `${group.y}%` }} onClick={() => setModal({ type: "group", item: group })}>
              <span>{group.members}</span>
              <small>{group.distance.toFixed(1).replace(".", ",")} km</small>
            </button>
          ))}
        </div>
        <div className="floatingCards">
          {groups.slice(0, 5).map((group) => (
            <article key={group.id} className="floatingCard">
              <strong>{group.name}</strong>
              <small>{group.area} · {group.distance.toFixed(1).replace(".", ",")} km</small>
              <button onClick={() => setModal({ type: "group", item: group })}>Ver círculo</button>
            </article>
          ))}
        </div>
      </div>
      <SafetyStrip />
    </section>
  );
}

function AccessoriesTab({ products, filters, setFilters, savedProducts, setSavedProducts, setModal, notify }) {
  const filtered = useMemo(() => filterProducts(products, filters, savedProducts), [products, filters, savedProducts]);
  const toggleSaved = (product) => {
    const saved = savedProducts.includes(product.id);
    setSavedProducts((items) => saved ? items.filter((id) => id !== product.id) : [...items, product.id]);
    notify(saved ? "Item removido dos salvos." : "Acessório salvo no perfil visitante.");
  };
  return (
    <section className="section fade">
      <Panel title="Vitrine de acessórios" text="Sedas, piteiras, dichavadores, bandejas e kits em modo visual. Sem venda real e sem checkout.">
        <FilterChips
          options={["Sedas", "Piteiras", "Dichavadores", "Bandejas", "Cuia", "Isqueiros", "Kits", "Menor preço", "Mais populares", "Salvos"]}
          selected={filters}
          onToggle={(option) => setFilters(toggleOption(filters, option))}
        />
      </Panel>
      <div className="grid productGrid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} saved={savedProducts.includes(product.id)} onSave={() => toggleSaved(product)} onDetails={() => setModal({ type: "product", item: product, onSave: () => toggleSaved(product) })} />
        ))}
      </div>
      {!filtered.length && <EmptyState title="Nada por aqui ainda" action="Limpar filtros" onClick={() => setFilters([])} />}
    </section>
  );
}

function filterProducts(products, filters, savedProducts) {
  const categoryFilters = ["Sedas", "Piteiras", "Dichavadores", "Bandejas", "Cuia", "Isqueiros", "Kits"].filter((item) => filters.includes(item));
  let list = products.filter((product) => {
    if (categoryFilters.length && !categoryFilters.includes(product.category)) return false;
    if (filters.includes("Mais populares") && !product.popular) return false;
    if (filters.includes("Salvos") && !savedProducts.includes(product.id)) return false;
    return true;
  });
  if (filters.includes("Menor preço")) {
    list = [...list].sort((a, b) => parseMoney(a.price) - parseMoney(b.price));
  }
  return list;
}

function parseMoney(price) {
  return Number(price.replace("R$ ", "").replace(",", "."));
}

function ProductCard({ product, saved, onSave, onDetails }) {
  return (
    <article className="productCard card">
      <img src={product.image} alt={product.name} />
      <div className="cardBody">
        <div className="between">
          <h3>{product.name}</h3>
          <button className={saved ? "save saved" : "save"} onClick={onSave}>{saved ? "Salvo" : "Salvar"}</button>
        </div>
        <p className="muted">{product.category} · {product.price}</p>
        <p>{product.description}</p>
        <Tags tags={product.tags} />
        <button onClick={onDetails}>Ver detalhes</button>
      </div>
    </article>
  );
}

function PreferenceChip({ label, active, onClick }) {
  return (
    <button className={active ? "preferenceChip active" : "preferenceChip"} onClick={onClick} aria-pressed={active}>
      <span>{active ? "✓" : "+"}</span>
      {label}
    </button>
  );
}

function PreferencesSection({ selectedPreferences, setSelectedPreferences, notify }) {
  const togglePreference = (preference) => {
    setSelectedPreferences((items) => {
      const active = items.includes(preference);
      const next = active ? items.filter((item) => item !== preference) : [...items, preference];
      notify(active ? `${preference} saiu da sua vibe.` : `${preference} entrou na sua vibe.`);
      return next;
    });
  };

  return (
    <article className="card preferencePanel">
      <div className="preferenceIntro">
        <p className="eyebrow">Perfil visitante</p>
        <h3>Sua vibe</h3>
        <p className="muted">Escolha o que mais combina com você. Dá para marcar várias preferências ao mesmo tempo.</p>
      </div>
      <div className="preferenceGrid">
        {preferenceOptions.map((preference) => (
          <PreferenceChip
            key={preference}
            label={preference}
            active={selectedPreferences.includes(preference)}
            onClick={() => togglePreference(preference)}
          />
        ))}
      </div>
    </article>
  );
}

function ProfileTab({ savedProducts, requestedGroups, selectedPreferences, setSelectedPreferences, setModal, notify, leave }) {
  return (
    <section className="section fade">
      <div className="profileHero card">
        <Logo />
        <div>
          <h2>Visitante</h2>
          <p>Santos, SP · modo visitante</p>
          <p className="muted">Preferências: {selectedPreferences.length ? selectedPreferences.join(", ") : "escolha sua vibe abaixo"}.</p>
        </div>
      </div>
      <PreferencesSection selectedPreferences={selectedPreferences} setSelectedPreferences={setSelectedPreferences} notify={notify} />
      <div className="profileGrid">
        <article className="card profilePanel"><h3>Resumo</h3><p>{requestedGroups.length} solicitações de grupos</p><p>{savedProducts.length} acessórios salvos</p><p>Distância máxima: 6 km</p></article>
        <article className="card profilePanel"><h3>Privacidade</h3><p>Localização sempre aproximada.</p><p>O local exato só é liberado pelo criador do grupo.</p></article>
        <article className="card profilePanel"><h3>Configurações</h3><button onClick={() => setModal({ type: "simple", title: "Editar perfil", body: "Edição visual do visitante aberta. Em breve você poderá ajustar foto, bio e interesses." })}>Editar perfil</button><button onClick={() => setModal({ type: "simple", title: "Privacidade", body: "Sua localização exata nunca aparece publicamente neste protótipo." })}>Privacidade</button><button onClick={() => notify("Relato recebido no modo demo.")}>Denunciar problema</button><button onClick={leave}>Sair do modo visitante</button></article>
        <article className="card profilePanel"><h3>Comunidade</h3><button onClick={() => setModal({ type: "simple", title: "Regras da comunidade", body: "Use com responsabilidade, respeite consentimento, não venda substâncias ilegais e não exponha localização de outras pessoas." })}>Regras da comunidade</button><button onClick={() => notify("Lista de bloqueados aberta no modo demo.")}>Usuários bloqueados</button></article>
      </div>
    </section>
  );
}

function Panel({ title, text, children }) {
  return (
    <div className="panel">
      <div>
        <p className="eyebrow">Smoke Circle</p>
        <h1>{title}</h1>
        <p className="muted">{text}</p>
      </div>
      {children}
    </div>
  );
}

function Tags({ tags }) {
  return <div className="tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>;
}

function SafetyStrip({ actions = [] }) {
  return (
    <div className="safetyStrip">
      <strong>Privacidade e segurança</strong>
      <span>Localização sempre aproximada.</span>
      <span>O local exato só é liberado pelo criador do grupo.</span>
      <span>Use com responsabilidade e respeite as leis locais.</span>
      {actions.map(([label, action]) => <button key={label} onClick={action}>{label}</button>)}
    </div>
  );
}

function EmptyState({ title, action, onClick }) {
  return <div className="emptyState"><h3>{title}</h3><button className="secondary" onClick={onClick}>{action}</button></div>;
}

function AppModal({ modal, close, notify }) {
  const item = modal.item;
  return (
    <div className="overlay" onClick={close}>
      <div className="modal" onClick={(event) => event.stopPropagation()}>
        <button className="close" onClick={close}>×</button>
        {modal.type === "person" && (
          <>
            <img className="modalImg portrait" src={item.photo} alt={item.name} />
            <h2>{item.name}, {item.age}</h2>
            <p className="muted">{item.area} · {item.distance.toFixed(1).replace(".", ",")} km</p>
            <p>{item.details}</p>
            <Tags tags={item.tags} />
            <div className="actions"><button className="primary" onClick={() => notify("Você curtiu este perfil")}>Curtir</button><button onClick={() => notify("Usuário bloqueado no modo demo.")}>Bloquear</button><button onClick={() => notify("Denúncia registrada no modo demo.")}>Denunciar</button></div>
          </>
        )}
        {modal.type === "group" && (
          <>
            <img className="modalImg" src={item.photo} alt={item.name} />
            <h2>{item.name}</h2>
            <p className="muted">{item.area} · {item.distance.toFixed(1).replace(".", ",")} km · {item.members} membros</p>
            <p>{item.description}</p>
            <h3>Regras</h3>
            <ul>{item.rules.map((rule) => <li key={rule}>{rule}</li>)}</ul>
            <p className="notice">Sua localização exata nunca é exibida. O criador do círculo libera o local exato se aceitar.</p>
          </>
        )}
        {modal.type === "product" && (
          <>
            <img className="modalImg" src={item.image} alt={item.name} />
            <h2>{item.name}</h2>
            <p className="muted">{item.category} · {item.price}</p>
            <p>{item.description}</p>
            <p className="notice">Produto destinado apenas a adultos e conforme as leis locais. Esta vitrine é visual e não possui compra real.</p>
            <button className="primary" onClick={() => { modal.onSave?.(); notify("Acessório salvo no perfil visitante."); }}>Salvar</button>
          </>
        )}
        {modal.type === "message" && (
          <>
            <h2>{modal.title}</h2>
            <p>{modal.body}</p>
            <textarea placeholder="Escreva uma mensagem simulada" />
            <button className="primary" onClick={() => { notify("Mensagem simulada enviada."); close(); }}>Enviar ideia</button>
          </>
        )}
        {modal.type === "simple" && (
          <>
            <h2>{modal.title}</h2>
            <p>{modal.body}</p>
            <button className="primary" onClick={close}>Entendi</button>
          </>
        )}
      </div>
    </div>
  );
}

function Toast({ message }) {
  return <div className="toast">{message}</div>;
}

createRoot(document.getElementById("root")).render(<App />);
