import { useState } from "react";
import { Lock, Gift, Calendar, Check, ChevronRight, UserPlus, Plus, ExternalLink, Tag, Lightbulb, User, Users, Pencil, FolderPlus } from "lucide-react";

const TODAY = new Date(); // usa a data real do dispositivo
const MESES = ["jan","fev","mar","abr","mai","jun","jul","ago","set","out","nov","dez"];

const SEED_MEMBERS = [
  {
    id: 1, name: "Marina Costa", role: "Gerente de Marketing", birthday: "07-20",
    wishlist: [
      { item: "Fone de ouvido bluetooth", note: "prefere cor preta", link: "", offers: [
        { store: "Amazon", price: 349 }, { store: "Magazine Luiza", price: 365 }, { store: "Mercado Livre", price: 379 },
      ]},
      { item: "Hábitos Atômicos (livro)", note: "ainda não tem", link: "", offers: [
        { store: "Amazon", price: 42 }, { store: "Livraria Cultura", price: 48 },
      ]},
    ],
  },
  {
    id: 2, name: "Bruno Alves", role: "Analista de Performance", birthday: "08-05",
    wishlist: [
      { item: "Havaianas top", note: "número 41, marrom", link: "", offers: [
        { store: "Netshoes", price: 45 }, { store: "Amazon", price: 49 },
      ]},
      { item: "Cafeteira de coador", note: "tamanho médio", link: "", offers: [
        { store: "Mercado Livre", price: 129 }, { store: "Magazine Luiza", price: 139 }, { store: "Amazon", price: 145 },
      ]},
    ],
  },
  {
    id: 3, name: "Carla Nunes", role: "Designer de Produto", birthday: "09-14",
    wishlist: [
      { item: "Caderno pontilhado A5", note: "capa dura", link: "", offers: [
        { store: "Amazon", price: 38 }, { store: "Livraria Cultura", price: 41 },
      ]},
      { item: "Vale-presente loja de plantas", note: "", link: "", offers: [
        { store: "Meu Pé de Alface", price: 100 },
      ]},
    ],
  },
  {
    id: 4, name: "Diego Ramos", role: "Redator", birthday: "07-15",
    wishlist: [
      { item: "Camiseta gráfica", note: "tamanho M", link: "", offers: [
        { store: "Amazon", price: 79 }, { store: "Renner", price: 89 },
      ]},
      { item: "Vinil - clássico de rock", note: "surpreenda", link: "", offers: [
        { store: "Bemvindo Discos", price: 120 }, { store: "Amazon", price: 135 },
      ]},
    ],
  },
  {
    id: 5, name: "Elisa Prado", role: "Social Media", birthday: "11-02",
    wishlist: [
      { item: "Kit de pincéis de maquiagem", note: "", link: "", offers: [
        { store: "Sephora", price: 159 }, { store: "Amazon", price: 172 },
      ]},
      { item: "Vinho tinto seco", note: "meio-doce não", link: "", offers: [
        { store: "Evino", price: 65 }, { store: "Mercado Livre", price: 70 },
      ]},
    ],
  },
  {
    id: 6, name: "Felipe Souza", role: "Analista de Dados", birthday: "01-30",
    wishlist: [
      { item: "Mouse ergonômico", note: "", link: "", offers: [
        { store: "Amazon", price: 189 }, { store: "Kabum", price: 199 },
      ]},
      { item: "Sapiens (livro)", note: "", link: "", offers: [
        { store: "Amazon", price: 39 }, { store: "Livraria Cultura", price: 44 },
      ]},
    ],
  },
  {
    id: 7, name: "Ana Martins", role: "Mãe", birthday: "03-12",
    wishlist: [
      { item: "Conjunto de vasos de cerâmica", note: "", link: "", offers: [] },
    ],
  },
  {
    id: 8, name: "Paulo Martins", role: "Pai", birthday: "11-25",
    wishlist: [
      { item: "Ferramenta multifuncional", note: "pra mexer no jardim", link: "", offers: [] },
    ],
  },
  {
    id: 9, name: "Sofia Martins", role: "Irmã", birthday: "08-30",
    wishlist: [
      { item: "Curso de fotografia online", note: "", link: "", offers: [] },
    ],
  },
];

const SEED_GROUPS = [
  { id: "trabalho", name: "Depto. Marketing", memberIds: [1, 2, 3, 4, 5, 6] },
  { id: "familia", name: "Família", memberIds: [7, 8, 9] },
];

function daysUntil(mmdd) {
  const [m, d] = mmdd.split("-").map(Number);
  let next = new Date(TODAY.getFullYear(), m - 1, d);
  next.setHours(0,0,0,0);
  const today0 = new Date(TODAY); today0.setHours(0,0,0,0);
  if (next < today0) next = new Date(TODAY.getFullYear() + 1, m - 1, d);
  return Math.round((next - today0) / 86400000);
}

function formatDate(mmdd) {
  if (!mmdd) return "";
  const [m, d] = mmdd.split("-").map(Number);
  return `${d} de ${MESES[m - 1]}`;
}

function withDays(members) {
  return members.map((m) => ({ ...m, daysLeft: daysUntil(m.birthday) }));
}

const inputClass = "text-sm border border-line rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sealSoft/30 focus:border-sealSoft";
const primaryBtnStyle = { background: "linear-gradient(145deg,#E9AA78,#C97748)", boxShadow: "0 4px 12px rgba(201,119,72,0.35)" };

function Seal({ days, size = 46 }) {
  const urgent = days <= 7;
  return (
    <div
      className="flex flex-col items-center justify-center rounded-full shrink-0"
      style={{
        width: size, height: size,
        background: urgent ? "linear-gradient(145deg,#E9AA78,#C97748)" : "linear-gradient(145deg,#A8B5A1,#7C8A76)",
        boxShadow: urgent ? "0 4px 10px rgba(201,119,72,0.35)" : "0 4px 10px rgba(124,138,118,0.30)",
      }}
    >
      <span className="font-extrabold text-white leading-none" style={{ fontSize: size * 0.32 }}>{days}</span>
      <span className="font-semibold tracking-wide" style={{ fontSize: size * 0.12, color: "rgba(255,255,255,0.85)" }}>DIAS</span>
    </div>
  );
}

function WishlistView({ wishlist }) {
  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center text-center gap-1 py-6 text-textMuted">
        <Gift size={26} className="text-sealSoft opacity-60" />
        <span className="text-sm font-bold text-text">Lista ainda vazia</span>
      </div>
    );
  }
  return wishlist.map((w, i) => {
    const sortedOffers = [...(w.offers || [])].sort((a, b) => a.price - b.price);
    return (
      <div key={i} className="py-3 border-b border-lineSoft last:border-0">
        <div className="text-sm font-semibold">{w.item}</div>
        {w.note && <div className="text-xs text-textMuted">{w.note}</div>}
        <div className="flex flex-wrap gap-1.5 mt-1.5">
          {w.link && (
            <a href={w.link} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full no-underline"
              style={{ background: "rgba(168,181,161,0.12)", color: "#7C8A76", border: "1px solid rgba(168,181,161,0.30)" }}>
              <ExternalLink size={10} /> Ver produto
            </a>
          )}
          {sortedOffers.map((o, oi) => (
            <span key={oi} className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${oi === 0 ? "bg-ledger/10 text-ledger border border-ledger/30" : "bg-text/5 text-text border border-line"}`}>
              {oi === 0 && <Tag size={10} />} {o.store} · R$ {o.price}
            </span>
          ))}
        </div>
      </div>
    );
  });
}

export default function App() {
  const [members, setMembers] = useState(() => withDays(SEED_MEMBERS));
  const [groups, setGroups] = useState(SEED_GROUPS);
  const [currentGroupId, setCurrentGroupId] = useState("trabalho");
  const [selectedId, setSelectedId] = useState(1);
  const [currentUserId, setCurrentUserId] = useState(1);
  const [view, setView] = useState("grupo"); // 'grupo' | 'perfil'
  const [addFormOpen, setAddFormOpen] = useState(false);
  const [addGroupOpen, setAddGroupOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [purchases, setPurchases] = useState({
    "trabalho::4": { buyerId: 2, amount: 240, paidMap: { 1: true, 3: false, 5: true, 6: false } },
  });
  const [nextId, setNextId] = useState(10);
  const [nextGroupNum, setNextGroupNum] = useState(1);
  const [existingPickId, setExistingPickId] = useState(null);
  const [viewingFriendId, setViewingFriendId] = useState(null);
  const [friendsListOpen, setFriendsListOpen] = useState(false);
  const [createAccountOpen, setCreateAccountOpen] = useState(false);

  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newBirthday, setNewBirthday] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemNote, setItemNote] = useState("");
  const [itemLink, setItemLink] = useState("");
  const [buyerId, setBuyerId] = useState(null);
  const [amount, setAmount] = useState("");

  const currentGroup = groups.find((g) => g.id === currentGroupId);
  const groupMembers = members.filter((m) => currentGroup.memberIds.includes(m.id)).sort((a, b) => a.daysLeft - b.daysLeft);
  const selected = groupMembers.find((m) => m.id === selectedId) || groupMembers[0];
  const currentUser = members.find((m) => m.id === currentUserId);
  const isOwn = selected && selected.id === currentUserId;
  const others = selected ? groupMembers.filter((m) => m.id !== selected.id) : [];
  const purchaseKey = selected ? `${currentGroupId}::${selected.id}` : null;
  const purchase = purchaseKey ? purchases[purchaseKey] : null;
  const friends = members.filter((m) => m.id !== currentUserId);
  const eligibleExisting = members.filter((m) => !currentGroup.memberIds.includes(m.id));
  const viewingFriend = viewingFriendId ? members.find((m) => m.id === viewingFriendId) : null;

  function switchGroup(groupId) {
    setCurrentGroupId(groupId);
    const g = groups.find((x) => x.id === groupId);
    const firstMember = members.filter((m) => g.memberIds.includes(m.id))[0];
    setSelectedId(firstMember ? firstMember.id : null);
    if (firstMember) setCurrentUserId(firstMember.id);
  }

  function handleCreateGroup() {
    if (!newGroupName.trim()) return;
    const id = `grupo-${nextGroupNum}`;
    setGroups((prev) => [...prev, { id, name: newGroupName.trim(), memberIds: [] }]);
    setNextGroupNum((n) => n + 1);
    setNewGroupName("");
    setAddGroupOpen(false);
    setCurrentGroupId(id);
    setSelectedId(null);
  }

  function handleCreateAccount() {
    if (!newName.trim() || !newBirthday) return;
    const mmdd = newBirthday.slice(5, 10);
    const id = nextId;
    const created = { id, name: newName.trim(), role: newRole.trim() || "Novo participante", birthday: mmdd, wishlist: [] };
    setMembers((prev) => withDays([...prev, created]));
    setCurrentUserId(id);
    setNextId(id + 1);
    setCreateAccountOpen(false);
    setNewName(""); setNewRole(""); setNewBirthday("");
    setView("perfil"); // leva a pessoa direto pra completar o perfil dela
  }

  function handleAddExistingMember() {
    if (!existingPickId) return;
    setGroups((prev) => prev.map((g) => (g.id === currentGroupId ? { ...g, memberIds: [...g.memberIds, existingPickId] } : g)));
    setSelectedId(existingPickId);
    setAddFormOpen(false);
    setExistingPickId(null);
  }

  function updateCurrentUser(field, value) {
    setMembers((prev) => {
      const updated = prev.map((m) => (m.id === currentUserId ? { ...m, [field]: value } : m));
      return field === "birthday" ? withDays(updated) : updated;
    });
  }

  function handleAddItem() {
    if (!itemName.trim()) return;
    setMembers((prev) =>
      prev.map((m) =>
        m.id === currentUserId
          ? { ...m, wishlist: [...m.wishlist, { item: itemName.trim(), note: itemNote.trim(), link: itemLink.trim(), offers: [] }] }
          : m
      )
    );
    setItemName(""); setItemNote(""); setItemLink("");
  }

  function handleRegisterPurchase() {
    const amt = parseFloat(amount);
    if (!buyerId || !amt || amt <= 0 || !purchaseKey) return;
    const contributors = groupMembers.filter((x) => x.id !== selected.id && x.id !== buyerId);
    const paidMap = {};
    contributors.forEach((c) => { paidMap[c.id] = false; });
    setPurchases((prev) => ({ ...prev, [purchaseKey]: { buyerId, amount: amt, paidMap } }));
    setAmount("");
  }

  function togglePaid(contributorId) {
    setPurchases((prev) => ({
      ...prev,
      [purchaseKey]: {
        ...prev[purchaseKey],
        paidMap: { ...prev[purchaseKey].paidMap, [contributorId]: !prev[purchaseKey].paidMap[contributorId] },
      },
    }));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 font-sans text-text">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-panel border border-line rounded-2xl px-5 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(145deg,#E9AA78,#C97748)", boxShadow: "0 3px 8px rgba(201,119,72,0.35)" }}>
            <Lock size={16} color="#fff" />
          </div>
          <span className="text-lg font-extrabold tracking-tight">Surpresa</span>
          <select
            value={currentGroupId}
            onChange={(e) => switchGroup(e.target.value)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full border cursor-pointer"
            style={{ color: "#7C8A76", background: "rgba(168,181,161,0.10)", borderColor: "rgba(168,181,161,0.25)" }}
          >
            {groups.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
          </select>
          <button onClick={() => setAddGroupOpen((v) => !v)}
            title="Novo grupo"
            className="flex items-center gap-1 text-xs font-semibold text-textMuted hover:text-sealSoftDark transition-colors">
            <FolderPlus size={15} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setCreateAccountOpen((v) => !v)}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white"
            style={primaryBtnStyle}>
            <UserPlus size={13} /> Criar conta
          </button>
          <span className="text-xs text-textMuted font-medium">logado como</span>
          <select
            value={currentUserId}
            onChange={(e) => setCurrentUserId(Number(e.target.value))}
            className="text-sm font-semibold bg-panelAlt border border-line rounded-lg px-3 py-2 cursor-pointer"
          >
            {members.map((m) => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>
      </div>

      {createAccountOpen && (
        <div className="mt-3 bg-panel border border-line rounded-2xl p-4 shadow-md max-w-md">
          <div className="text-xs font-bold uppercase tracking-wide text-textMuted mb-2">Criar minha conta</div>
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Seu nome"
            className={`${inputClass} w-full mb-2`} />
          <input value={newRole} onChange={(e) => setNewRole(e.target.value)} placeholder="Seu cargo / papel"
            className={`${inputClass} w-full mb-2`} />
          <input type="date" value={newBirthday} onChange={(e) => setNewBirthday(e.target.value)}
            className={`${inputClass} w-full mb-3`} />
          <div className="flex gap-2">
            <button onClick={() => setCreateAccountOpen(false)} className="flex-1 text-sm font-bold py-2 rounded-lg bg-panelAlt border border-line text-textMuted">CANCELAR</button>
            <button onClick={handleCreateAccount} className="flex-1 text-sm font-bold py-2 rounded-lg text-white" style={primaryBtnStyle}>CRIAR CONTA</button>
          </div>
        </div>
      )}

      {addGroupOpen && (
        <div className="mt-3 bg-panel border border-line rounded-2xl p-4 shadow-md flex gap-2 flex-wrap items-center">
          <span className="text-xs font-bold uppercase tracking-wide text-textMuted">Novo grupo:</span>
          <input value={newGroupName} onChange={(e) => setNewGroupName(e.target.value)} placeholder="Nome do grupo (ex: Amigos da faculdade)"
            className={`${inputClass} flex-1 min-w-[200px]`} />
          <button onClick={() => setAddGroupOpen(false)} className="text-sm font-bold py-2 px-3 rounded-lg bg-panelAlt border border-line text-textMuted">CANCELAR</button>
          <button onClick={handleCreateGroup} className="text-sm font-bold py-2 px-4 rounded-lg text-white" style={primaryBtnStyle}>CRIAR GRUPO</button>
        </div>
      )}

      {/* Nav tabs */}
      <div className="flex gap-2 mt-4">
        <button onClick={() => setView("grupo")}
          className={`flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl transition-colors ${view === "grupo" ? "bg-panel border border-seal shadow-sm text-text" : "text-textMuted hover:bg-panelAlt"}`}>
          <Users size={16} /> Grupo
        </button>
        <button onClick={() => setView("perfil")}
          className={`flex items-center gap-2 text-sm font-bold px-4 py-2.5 rounded-xl transition-colors ${view === "perfil" ? "bg-panel border border-seal shadow-sm text-text" : "text-textMuted hover:bg-panelAlt"}`}>
          <User size={16} /> Meu Perfil
        </button>
      </div>

      {view === "perfil" ? (
        /* ---------------- PERFIL ---------------- */
        viewingFriend ? (
          <div className="mt-5 bg-panel border border-line rounded-3xl p-6 shadow-md animate-fade-slide max-w-2xl">
            <button onClick={() => setViewingFriendId(null)}
              className="text-xs font-semibold text-sealSoftDark hover:text-text transition-colors mb-4">
              ← Voltar ao meu perfil
            </button>
            <div className="flex items-center gap-4">
              <Seal days={viewingFriend.daysLeft} size={56} />
              <div>
                <h2 className="font-serif text-2xl font-bold">{viewingFriend.name}</h2>
                <p className="text-sm text-textMuted mt-0.5">{viewingFriend.role} · aniversário em {formatDate(viewingFriend.birthday)}</p>
              </div>
            </div>
            <div className="mt-5 bg-panelAlt border border-line rounded-2xl p-5">
              <span className="text-xs font-bold uppercase tracking-wide text-textMuted">Lista de desejos</span>
              <div className="mt-1">
                <WishlistView wishlist={viewingFriend.wishlist} />
              </div>
            </div>
          </div>
        ) : (
        <div className="mt-5 bg-panel border border-line rounded-3xl p-6 shadow-md animate-fade-slide max-w-2xl">
          <div className="flex items-center gap-4">
            <Seal days={currentUser.daysLeft} size={56} />
            <div>
              <h2 className="font-serif text-2xl font-bold">{currentUser.name}</h2>
              <p className="text-sm text-textMuted mt-0.5">aniversário em {formatDate(currentUser.birthday)}</p>
            </div>
          </div>

          <div className="mt-5 bg-panelAlt border border-line rounded-2xl p-5">
            <span className="text-xs font-bold uppercase tracking-wide text-textMuted flex items-center gap-1.5"><Pencil size={11} /> Meus dados</span>
            <div className="mt-3 flex flex-col gap-2.5">
              <label className="text-xs text-textMuted font-medium">
                Nome
                <input value={currentUser.name} onChange={(e) => updateCurrentUser("name", e.target.value)} className={`${inputClass} w-full mt-1`} />
              </label>
              <label className="text-xs text-textMuted font-medium">
                Cargo / papel
                <input value={currentUser.role} onChange={(e) => updateCurrentUser("role", e.target.value)} className={`${inputClass} w-full mt-1`} />
              </label>
              <label className="text-xs text-textMuted font-medium">
                Aniversário
                <input type="date" value={`2000-${currentUser.birthday}`} onChange={(e) => updateCurrentUser("birthday", e.target.value.slice(5, 10))} className={`${inputClass} w-full mt-1`} />
              </label>
            </div>
          </div>

          <div className="mt-4 bg-panelAlt border border-line rounded-2xl p-5">
            <span className="text-xs font-bold uppercase tracking-wide text-textMuted">Minha lista de desejos</span>
            <div className="mt-1">
              <WishlistView wishlist={currentUser.wishlist} />
            </div>
            <div className="mt-3 pt-3 border-t border-line flex gap-2 flex-wrap">
              <input value={itemName} onChange={(e) => setItemName(e.target.value)} placeholder="O que você deseja?"
                className={`${inputClass} flex-[2] min-w-[140px]`} />
              <input value={itemNote} onChange={(e) => setItemNote(e.target.value)} placeholder="Detalhe (opcional)"
                className={`${inputClass} flex-1 min-w-[100px]`} />
              <input value={itemLink} onChange={(e) => setItemLink(e.target.value)} placeholder="Link do produto (opcional)"
                className={`${inputClass} flex-[2] min-w-[160px]`} />
              <button onClick={handleAddItem}
                className="flex items-center justify-center gap-1.5 text-sm font-bold text-white px-4 py-2 rounded-lg hover:-translate-y-0.5 transition-transform"
                style={primaryBtnStyle}>
                <Plus size={14} /> Adicionar
              </button>
            </div>
          </div>
          <p className="text-xs text-textMuted mt-3 px-1">Essa lista vale pra qualquer grupo que você participar.</p>

          <div className="mt-4 bg-panelAlt border border-line rounded-2xl p-5">
            <button onClick={() => setFriendsListOpen((v) => !v)} className="flex items-center gap-2 w-full text-left">
              <span className="text-2xl font-extrabold text-text">{friends.length}</span>
              <span className="text-xs font-bold uppercase tracking-wide text-textMuted">
                {friends.length === 1 ? "amigo no app" : "amigos no app"}
              </span>
              <ChevronRight size={15} className={`text-textMuted ml-auto transition-transform ${friendsListOpen ? "rotate-90" : ""}`} />
            </button>
            {friendsListOpen && (
              <div className="mt-3 pt-3 border-t border-line flex flex-col gap-2">
                {friends.map((f) => (
                  <button key={f.id} onClick={() => setViewingFriendId(f.id)}
                    className="flex items-center gap-3 p-2.5 bg-panel rounded-xl border border-line shadow-sm hover:-translate-y-0.5 hover:shadow-md hover:border-sealSoft transition-all text-left">
                    <Seal days={f.daysLeft} size={38} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold">{f.name}</div>
                      <div className="text-xs text-textMuted">{f.role}</div>
                    </div>
                    <ChevronRight size={15} className="text-textMuted" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        )
      ) : (
        /* ---------------- GRUPO ---------------- */
        <>
          <p className="flex items-center gap-2 text-xs text-textMuted my-4 px-1">
            <Lightbulb size={14} />
            Clique em um participante pra ver a lista de desejos e organizar o presente.
          </p>

          <div className="flex flex-col lg:flex-row gap-4 items-start">
            {/* Member list */}
            <div className="flex-1 w-full lg:max-w-xs flex flex-col gap-2">
              {addFormOpen ? (
                <div className="bg-panel border border-line rounded-2xl p-4 shadow-md">
                  <div className="text-xs font-bold uppercase tracking-wide text-textMuted mb-2">Adicionar participante</div>
                  <p className="text-xs text-textMuted mb-3">Só é possível adicionar quem já tem uma conta no Surpresa.</p>
                  {eligibleExisting.length === 0 ? (
                    <p className="text-xs text-textMuted mb-3">Ninguém disponível ainda — peça pra pessoa criar a conta dela primeiro (botão "Criar conta" no topo).</p>
                  ) : (
                    <select value={existingPickId ?? ""} onChange={(e) => setExistingPickId(Number(e.target.value))}
                      className={`${inputClass} w-full mb-3 bg-white`}>
                      <option value="" disabled>Escolha uma pessoa</option>
                      {eligibleExisting.map((m) => <option key={m.id} value={m.id}>{m.name} · {m.role}</option>)}
                    </select>
                  )}
                  <div className="flex gap-2">
                    <button onClick={() => setAddFormOpen(false)} className="flex-1 text-sm font-bold py-2 rounded-lg bg-panelAlt border border-line text-textMuted">CANCELAR</button>
                    <button onClick={handleAddExistingMember} disabled={eligibleExisting.length === 0}
                      className="flex-1 text-sm font-bold py-2 rounded-lg text-white disabled:opacity-40" style={primaryBtnStyle}>ADICIONAR AO GRUPO</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setAddFormOpen(true)}
                  className="flex items-center justify-center gap-2 py-3 bg-panel border-2 border-dashed border-line rounded-2xl text-sm font-semibold text-textMuted hover:border-sealSoft hover:text-sealSoftDark hover:bg-panelAlt transition-colors">
                  <UserPlus size={16} /> Adicionar participante
                </button>
              )}

              {groupMembers.map((m) => {
                const active = m.id === selectedId;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedId(m.id)}
                    className={`flex items-center gap-3 p-3 bg-panel rounded-2xl border shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${active ? "border-seal" : "border-line hover:border-sealSoft"}`}
                    style={active ? { boxShadow: "0 0 0 3px rgba(201,119,72,0.10), 0 6px 20px -6px rgba(56,65,77,0.16)" } : undefined}
                  >
                    <Seal days={m.daysLeft} />
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-sm font-bold">{m.name}</div>
                      <div className="text-xs text-textMuted">{m.role}</div>
                      <div className="flex items-center gap-1 text-xs text-textMuted mt-1">
                        <Calendar size={11} /> {formatDate(m.birthday)}
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-textMuted" />
                  </button>
                );
              })}
            </div>

            {/* Case file */}
            <div className="flex-[1.7] w-full min-w-0">
              {!selected ? (
                <div className="bg-panel border border-line rounded-3xl p-10 shadow-md text-center text-textMuted">
                  <Users size={28} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm font-semibold">Esse grupo ainda não tem participantes.</p>
                  <p className="text-xs mt-1">Use "Adicionar participante" ao lado pra começar.</p>
                </div>
              ) : (
              <div key={selected.id} className="bg-panel border border-line rounded-3xl p-6 shadow-md animate-fade-slide">
                <div className="flex items-center gap-4">
                  <Seal days={selected.daysLeft} size={56} />
                  <div>
                    <h2 className="font-serif text-2xl font-bold -tracking-wide">{selected.name}</h2>
                    <p className="text-sm text-textMuted mt-0.5">{selected.role} · aniversário em {formatDate(selected.birthday)}</p>
                  </div>
                </div>

                {/* Wishlist (somente leitura aqui) */}
                <div className="mt-5 bg-panelAlt border border-line rounded-2xl p-5">
                  <span className="text-xs font-bold uppercase tracking-wide text-textMuted">Lista de desejos</span>
                  <div className="mt-1">
                    <WishlistView wishlist={selected.wishlist} />
                  </div>
                  {isOwn && (
                    <button onClick={() => setView("perfil")}
                      className="mt-3 pt-3 border-t border-line w-full text-left text-xs text-sealSoftDark font-semibold flex items-center gap-1.5 hover:text-text transition-colors">
                      <Pencil size={11} /> Editar minha lista em "Meu Perfil"
                    </button>
                  )}
                </div>

                {/* Ledger / confidential */}
                {isOwn ? (
                  <div className="relative mt-4 bg-panelAlt border border-line rounded-2xl p-5 overflow-hidden">
                    <div className="absolute -top-2.5 -right-2.5 flex items-center gap-1 text-xs font-bold text-white px-3 py-1.5 rounded-lg rotate-6"
                      style={{ background: "linear-gradient(145deg,#E9AA78,#C97748)", boxShadow: "0 4px 10px rgba(201,119,72,0.35)" }}>
                      <Lock size={11} /> CONFIDENCIAL
                    </div>
                    <p className="text-xs text-textMuted mb-3">arquivo lacrado até o seu aniversário</p>
                    {[92, 64, 78, 40].map((w, i) => (
                      <div key={i} className="h-2.5 bg-text/85 rounded mb-2" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                ) : others.length === 0 ? (
                  <div className="mt-4 bg-panelAlt border border-line rounded-2xl p-5 text-center text-xs text-textMuted">
                    Adicione mais participantes nesse grupo pra organizar o presente em conjunto.
                  </div>
                ) : !purchase ? (
                  <div className="mt-4 bg-panelAlt border border-line rounded-2xl p-5">
                    <span className="text-xs font-bold uppercase tracking-wide text-textMuted">Registrar compra do presente</span>
                    <p className="text-xs text-textMuted my-2">Quem comprou o presente registra aqui, e o app divide o valor entre o resto do grupo.</p>
                    <div className="flex gap-2 flex-wrap items-center">
                      <select value={buyerId ?? ""} onChange={(e) => setBuyerId(Number(e.target.value))}
                        className={`${inputClass} flex-1 min-w-[140px] bg-white`}>
                        <option value="" disabled>Quem comprou?</option>
                        {others.map((o) => <option key={o.id} value={o.id}>{o.name}</option>)}
                      </select>
                      <input type="number" min="1" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Valor total (R$)"
                        className={`${inputClass} w-40`} />
                    </div>
                    <button onClick={handleRegisterPurchase}
                      className="w-full mt-3 flex items-center justify-center gap-2 text-sm font-bold text-white py-2.5 rounded-lg hover:-translate-y-0.5 transition-transform"
                      style={primaryBtnStyle}>
                      <Check size={14} /> REGISTRAR COMPRA
                    </button>
                  </div>
                ) : (
                  (() => {
                    const buyer = groupMembers.find((x) => x.id === purchase.buyerId);
                    const contributors = others.filter((x) => x.id !== buyer.id);
                    const n = others.length;
                    const perPerson = Math.round((purchase.amount / n) * 100) / 100;
                    const paidCount = Object.values(purchase.paidMap).filter(Boolean).length;
                    const reimbursed = perPerson + paidCount * perPerson;
                    const pct = Math.round((reimbursed / purchase.amount) * 100);
                    return (
                      <div className="mt-4 bg-panelAlt border border-line rounded-2xl p-5">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold uppercase tracking-wide text-textMuted">Presente comprado</span>
                          <span className="text-sm font-extrabold text-ledger">R$ {reimbursed.toFixed(2)} / R$ {purchase.amount.toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-textMuted mb-2">comprado por <b className="text-text">{buyer.name}</b> · dividido entre {n} pessoas · R$ {perPerson.toFixed(2)} cada</p>
                        <div className="h-2 bg-line rounded-full overflow-hidden mb-3">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: "linear-gradient(90deg,#BFC9B8,#7C8A76)" }} />
                        </div>
                        {contributors.map((c) => {
                          const paid = !!purchase.paidMap[c.id];
                          return (
                            <div key={c.id} className="flex items-center justify-between py-1.5 text-sm">
                              <span className="font-semibold">{c.name}</span>
                              <div className="flex items-center gap-2.5">
                                <span className="opacity-85 font-semibold">R$ {perPerson.toFixed(2)}</span>
                                <button onClick={() => togglePaid(c.id)}
                                  className={`text-xs font-bold px-2.5 py-1 rounded-full hover:-translate-y-0.5 transition-transform ${paid ? "bg-ledger/10 text-ledger" : "bg-seal/10 text-seal"}`}>
                                  {paid ? "PAGO" : "MARCAR PAGO"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                        <p className="text-xs text-textMuted mt-2.5">{buyer.name} já cobriu a parte dele comprando o presente.</p>
                      </div>
                    );
                  })()
                )}
              </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
