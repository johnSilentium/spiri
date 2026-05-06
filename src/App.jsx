import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Menu,
  ShoppingBag,
  Truck,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  X,
  Flame,
  Zap,
  Crown,
  Heart,
  ChevronRight,
  Tag,
  Minus,
  Plus,
  Trash2,
  Ghost,
  Skull,
  Eye,
  Lock,
  Crosshair,
  Check,
  CreditCard,
} from "lucide-react";

const RED = "#DC2626";
const RED_LT = "#EF4444";

const CATALOG = [
  { id: 1, name: "DREYSSHA HOODIE", sub: "oversize / чёрный", price: 5990, cat: "Худи", tag: "ХИТ" },
  { id: 2, name: "KARPOV TEE", sub: "graphic / белый", price: 2490, cat: "Футболки", tag: "" },
  { id: 3, name: "SHATUN CARGO", sub: "wide / тёмно-серый", price: 6490, cat: "Карго", tag: "NEW" },
  { id: 4, name: "TUMAN HOODIE", sub: "crop / дымчатый", price: 5490, cat: "Худи", tag: "" },
  { id: 5, name: "GRAF TEE", sub: "oversize / чёрный", price: 2990, cat: "Футболки", tag: "ХИТ" },
  { id: 6, name: "NOCH JACKET", sub: "puffer / чёрный", price: 9990, cat: "Куртки", tag: "NEW" },
  { id: 7, name: "ASFALT PANTS", sub: "straight / серый", price: 4990, cat: "Карго", tag: "" },
  { id: 8, name: "PANEL HOODIE", sub: "oversize / графит", price: 5990, cat: "Худи", tag: "" },
  { id: 9, name: "BETON TEE", sub: "basic / белый", price: 2490, cat: "Футболки", tag: "" },
  { id: 10, name: "LED JACKET", sub: "windbreaker / лёд", price: 8990, cat: "Куртки", tag: "NEW" },
  { id: 11, name: "MGLA CARGO", sub: "tactical / хаки", price: 5990, cat: "Карго", tag: "ХИТ" },
  { id: 12, name: "VOLNA LONG", sub: "fitted / тёмно-синий", price: 3490, cat: "Лонгсливы", tag: "" },
];

const COLLABS = [
  { brand: "shadowraze", badge: "COLLAB", icon: Ghost, desc: "Тёмная сторона. Лимитированная коллекция.", color: "#1a0a1a",
    items: [{ name: "SHDW HOODIE «RAZE»", price: 7990, remaining: 8 }, { name: "SHDW TEE «PHANTOM»", price: 3490, remaining: 15 }, { name: "SHDW CARGO «VOID»", price: 6990, remaining: 5 }] },
  { brand: "dek0", badge: "COLLAB", icon: Skull, desc: "Нулевой код. Минимализм на максимуме.", color: "#0a1a0a",
    items: [{ name: "DEK0 HOODIE «NULL»", price: 7490, remaining: 12 }, { name: "DEK0 TEE «ZERO»", price: 2990, remaining: 20 }, { name: "DEK0 CARGO «BINARY»", price: 6490, remaining: 8 }] },
  { brand: "lattykk", badge: "COLLAB", icon: Eye, desc: "Уличный взгляд. Каждая вещь — манифест.", color: "#1a1a0a",
    items: [{ name: "LAT HOODIE «VISION»", price: 7990, remaining: 6 }, { name: "LAT JACKET «STREET»", price: 11990, remaining: 3 }, { name: "LAT TEE «FOCUS»", price: 3490, remaining: 10 }] },
  { brand: "zxcursed", badge: "COLLAB", icon: Crosshair, desc: "Заклятый стиль. Не для всех.", color: "#0a0a1a",
    items: [{ name: "ZXC HOODIE «HEX»", price: 8490, remaining: 4 }, { name: "ZXC TEE «CURSE»", price: 3490, remaining: 10 }, { name: "ZXC CARGO «DOOM»", price: 6990, remaining: 7 }] },
  { brand: "BALENCIAGA", badge: "EXCLUSIVE", icon: Crown, desc: "Высокая мода встречается с улицей.", color: "#1a1a1a",
    items: [{ name: "BLNC HOODIE «PARIS»", price: 14990, remaining: 2 }, { name: "BLNC TEE «HAUTE»", price: 6990, remaining: 5 }, { name: "BLNC JACKET «COUTURE»", price: 19990, remaining: 1 }] },
];

const CATS = [
  { key: "all", label: "ВСЁ" },
  { key: "Худи", label: "ХУДИ" },
  { key: "Футболки", label: "ФУТБОЛКИ" },
  { key: "Куртки", label: "КУРТКИ" },
  { key: "Карго", label: "КАРГО" },
  { key: "Лонгсливы", label: "ЛОНГСЛИВЫ" },
];

const FEATURES = [
  { icon: Sparkles, num: "01 / 04", title: "Премиум ткани", desc: "Итальянский хлопок и японский деним. Каждая ткань — отдельный отбор." },
  { icon: Truck, num: "02 / 04", title: "Доставка 2-4 дня", desc: "По всей России. Бесплатно при заказе от 5 000₽." },
  { icon: ShieldCheck, num: "03 / 04", title: "30 дней на возврат", desc: "Не подошло — вернём деньги. Без вопросов." },
  { icon: Crown, num: "04 / 04", title: "Лимитированные дропы", desc: "Ограниченный тираж. Не повторяем. Никогда." },
];

const SIDE_NAV = [
  { label: "Старт", sub: "Главная" },
  { label: "Каталог", sub: "Вся одежда" },
  { label: "О нас", sub: "Преимущества" },
  { label: "Лимтки", sub: "Коллабы" },
];

/* ─── Clean Clothing SVGs ─── */
function ClothSVG({ type, color = "#1a1a1a" }) {
  const s = "rgba(255,255,255,0.15)";
  const s2 = "rgba(255,255,255,0.08)";
  const svgs = [
    /* 0 hoodie */
    <svg key="0" viewBox="0 0 100 100" width="100%" height="100%">
      <rect width="100" height="100" fill={color} />
      {/* body */}
      <path d="M30 30 Q28 30 26 32 L16 40 L20 48 L28 42 L28 86 H72 V42 L80 48 L84 40 L74 32 Q72 30 70 30 Z" fill="none" stroke={s} strokeWidth="1.8" strokeLinejoin="round" />
      {/* hood */}
      <path d="M38 30 Q38 18 50 16 Q62 18 62 30" fill="none" stroke={s} strokeWidth="1.8" strokeLinecap="round" />
      {/* kangaroo pocket */}
      <rect x="35" y="56" width="30" height="14" rx="2" fill="none" stroke={s2} strokeWidth="1" strokeLinejoin="round" />
      {/* drawstrings */}
      <line x1="45" y1="32" x2="44" y2="50" stroke={s2} strokeWidth="0.8" />
      <line x1="55" y1="32" x2="56" y2="50" stroke={s2} strokeWidth="0.8" />
    </svg>,
    /* 1 tshirt */
    <svg key="1" viewBox="0 0 100 100" width="100%" height="100%">
      <rect width="100" height="100" fill={color} />
      {/* body + sleeves */}
      <path d="M30 24 L18 32 L24 42 L30 38 V86 H70 V38 L76 42 L82 32 L70 24 Q60 20 50 20 Q40 20 30 24 Z" fill="none" stroke={s} strokeWidth="1.8" strokeLinejoin="round" />
      {/* collar */}
      <path d="M42 20 Q46 28 50 28 Q54 28 58 20" fill="none" stroke={s2} strokeWidth="1.2" strokeLinecap="round" />
      {/* subtle fold */}
      <line x1="50" y1="28" x2="50" y2="50" stroke={s2} strokeWidth="0.6" />
    </svg>,
    /* 2 jacket */
    <svg key="2" viewBox="0 0 100 100" width="100%" height="100%">
      <rect width="100" height="100" fill={color} />
      {/* left side */}
      <path d="M30 28 L16 38 L20 48 L28 42 V88 H50 V28 Z" fill="none" stroke={s} strokeWidth="1.8" strokeLinejoin="round" />
      {/* right side */}
      <path d="M70 28 L84 38 L80 48 L72 42 V88 H50 V28 Z" fill="none" stroke={s} strokeWidth="1.8" strokeLinejoin="round" />
      {/* collar */}
      <path d="M36 28 L42 20 H58 L64 28" fill="none" stroke={s} strokeWidth="1.5" strokeLinejoin="round" />
      {/* center zipper */}
      <line x1="50" y1="28" x2="50" y2="88" stroke={s2} strokeWidth="1.2" />
      {/* zipper teeth */}
      <line x1="47" y1="36" x2="53" y2="36" stroke={s2} strokeWidth="0.6" />
      <line x1="47" y1="44" x2="53" y2="44" stroke={s2} strokeWidth="0.6" />
      <line x1="47" y1="52" x2="53" y2="52" stroke={s2} strokeWidth="0.6" />
      <line x1="47" y1="60" x2="53" y2="60" stroke={s2} strokeWidth="0.6" />
      {/* pockets */}
      <rect x="32" y="56" width="14" height="10" rx="1" fill="none" stroke={s2} strokeWidth="0.8" />
      <rect x="54" y="56" width="14" height="10" rx="1" fill="none" stroke={s2} strokeWidth="0.8" />
    </svg>,
    /* 3 cargo pants */
    <svg key="3" viewBox="0 0 100 100" width="100%" height="100%">
      <rect width="100" height="100" fill={color} />
      {/* waistband */}
      <path d="M26 14 H74 V22 H26 Z" fill="none" stroke={s} strokeWidth="1.5" strokeLinejoin="round" />
      {/* left leg */}
      <path d="M26 22 L24 88 H44 L46 22 Z" fill="none" stroke={s} strokeWidth="1.8" strokeLinejoin="round" />
      {/* right leg */}
      <path d="M74 22 L76 88 H56 L54 22 Z" fill="none" stroke={s} strokeWidth="1.8" strokeLinejoin="round" />
      {/* center seam */}
      <line x1="50" y1="14" x2="50" y2="28" stroke={s2} strokeWidth="1" />
      {/* left cargo pocket */}
      <rect x="26" y="38" width="14" height="16" rx="2" fill="none" stroke={s2} strokeWidth="1" />
      <line x1="26" y1="46" x2="40" y2="46" stroke={s2} strokeWidth="0.6" />
      {/* right cargo pocket */}
      <rect x="60" y="38" width="14" height="16" rx="2" fill="none" stroke={s2} strokeWidth="1" />
      <line x1="60" y1="46" x2="74" y2="46" stroke={s2} strokeWidth="0.6" />
      {/* fly */}
      <line x1="50" y1="22" x2="50" y2="34" stroke={s2} strokeWidth="0.8" />
    </svg>,
    /* 4 longsleeve */
    <svg key="4" viewBox="0 0 100 100" width="100%" height="100%">
      <rect width="100" height="100" fill={color} />
      {/* body + long sleeves */}
      <path d="M30 24 L12 44 L18 54 L26 46 L26 86 H74 V46 L82 54 L88 44 L70 24 Q60 20 50 20 Q40 20 30 24 Z" fill="none" stroke={s} strokeWidth="1.8" strokeLinejoin="round" />
      {/* collar */}
      <path d="M42 20 Q46 28 50 28 Q54 28 58 20" fill="none" stroke={s2} strokeWidth="1.2" strokeLinecap="round" />
      {/* sleeve cuffs */}
      <line x1="18" y1="48" x2="26" y2="48" stroke={s2} strokeWidth="1" />
      <line x1="74" y1="48" x2="82" y2="48" stroke={s2} strokeWidth="1" />
      {/* subtle fold */}
      <line x1="50" y1="28" x2="50" y2="56" stroke={s2} strokeWidth="0.6" />
    </svg>,
    /* 5 beanie / accessory */
    <svg key="5" viewBox="0 0 100 100" width="100%" height="100%">
      <rect width="100" height="100" fill={color} />
      {/* beanie body */}
      <path d="M24 60 Q24 30 50 24 Q76 30 76 60 Z" fill="none" stroke={s} strokeWidth="1.8" strokeLinejoin="round" />
      {/* fold / cuff */}
      <rect x="22" y="56" width="56" height="12" rx="2" fill="none" stroke={s} strokeWidth="1.5" />
      {/* top seam */}
      <line x1="50" y1="24" x2="50" y2="38" stroke={s2} strokeWidth="0.8" />
      {/* subtle rib lines */}
      <line x1="34" y1="32" x2="34" y2="56" stroke={s2} strokeWidth="0.5" />
      <line x1="42" y1="28" x2="42" y2="56" stroke={s2} strokeWidth="0.5" />
      <line x1="58" y1="28" x2="58" y2="56" stroke={s2} strokeWidth="0.5" />
      <line x1="66" y1="32" x2="66" y2="56" stroke={s2} strokeWidth="0.5" />
    </svg>,
  ];
  return svgs[type % 6];
}

/* ─── Smooth scroll helper ─── */
function smoothTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function App() {
  const [scroll, setScroll] = useState(0);
  const [active, setActive] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [liked, setLiked] = useState({});
  const [collabTab, setCollabTab] = useState(0);
  const [notif, setNotif] = useState(null);
  const [intro, setIntro] = useState(true);
  const [checkoutDone, setCheckoutDone] = useState(false);
  const cartRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIntro(false), 2600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = intro ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [intro]);

  useEffect(() => {
    const onScroll = () => {
      const t = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(h > 0 ? t / h : 0);
      setScrolled(t > 40);
      const secs = ["hero", "catalog", "about", "collabs"];
      for (let i = secs.length - 1; i >= 0; i--) {
        const el = document.getElementById(secs[i]);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.5) { setActive(i); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (notif) { const t = setTimeout(() => setNotif(null), 2200); return () => clearTimeout(t); }
  }, [notif]);

  /* Close cart on Escape */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setCartOpen(false); setMenuOpen(false); } };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (id) => { smoothTo(id); setMenuOpen(false); };

  const addToCart = useCallback((item) => {
    setCart(prev => {
      const ex = prev.find(c => c.id === item.id && c.name === item.name);
      if (ex) return prev.map(c => c.id === item.id && c.name === item.name ? { ...c, qty: c.qty + 1 } : c);
      return [...prev, { ...item, qty: 1 }];
    });
    setNotif(`${item.name} → в корзину`);
  }, []);

  const removeFromCart = useCallback((id, name) => setCart(p => p.filter(c => !(c.id === id && c.name === name))), []);
  const updateQty = useCallback((id, name, d) => {
    setCart(p => p.map(c => c.id === id && c.name === name ? { ...c, qty: Math.max(0, c.qty + d) } : c).filter(c => c.qty > 0));
  }, []);

  const cartTotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const filtered = filter === "all" ? CATALOG : CATALOG.filter(i => i.cat === filter);
  const toggleLike = (id) => setLiked(p => ({ ...p, [id]: !p[id] }));
  const collab = COLLABS[collabTab];

  const handleCheckout = () => {
    setCheckoutDone(true);
    setTimeout(() => { setCart([]); setCheckoutDone(false); setCartOpen(false); }, 2500);
  };

  const navLinks = [
    { id: "catalog", label: "Каталог" },
    { id: "about", label: "О нас" },
    { id: "collabs", label: "Лимтки" },
  ];

  return (
    <>
      <style>{css}</style>

      {/* ═══ INTRO ═══ */}
      <div className={`intro ${intro ? "intro-active" : "intro-done"}`}>
        <div className="intro-bg" />
        <div className="intro-logo">
          {["s","p","i","r","i"].map((l, i) => (
            <span key={i} className="intro-letter" style={{ animationDelay: `${0.3 + i * 0.13}s` }}>{l}</span>
          ))}
        </div>
        <div className="intro-line" />
        <div className="intro-tagline" style={{ animationDelay: "1.4s" }}>wear your character</div>
        <div className="intro-scanline" />
      </div>

      <div className="root">
        <div className="shell"><div className="shell-stripes" /></div>
        <div className="site-main">

          {notif && <div className="notif">{notif}</div>}
          <div className="scroll-prog" style={{ transform: `scaleX(${scroll})` }} />

          {/* ═══ HEADER (glass) ═══ */}
          <header className={`hdr ${scrolled ? "hdr-scrolled" : ""}`}>
            <div className="hdr-inner">
              <button className="logo" onClick={() => go("hero")}>
                <span className="logo-text">spiri</span>
              </button>
              <nav className="nav-center">
                {navLinks.map(l => <button key={l.id} className="nav-link" onClick={() => go(l.id)}>{l.label}</button>)}
              </nav>
              <div className="hdr-right">
                <button className="hdr-btn cart-btn" onClick={() => setCartOpen(true)} aria-label="Cart">
                  <ShoppingBag size={20} />
                  {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                </button>
                <button className="hdr-btn mob-menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={24} /></button>
              </div>
            </div>
            {menuOpen && (
              <nav className="mob-nav">
                {navLinks.map(l => <button key={l.id} className="mob-link" onClick={() => go(l.id)}>{l.label}</button>)}
              </nav>
            )}
          </header>

          {/* ═══ SIDE NAV (glass) ═══ */}
          <aside className="side-nav">
            <div className="side-line" />
            <div className="side-dots">
              {SIDE_NAV.map((it, i) => (
                <button key={i} className="side-dot-wrap" onClick={() => go(["hero","catalog","about","collabs"][i])}>
                  <div className="side-tip">
                    <div className="side-tl">{it.label}</div>
                    <div className="side-ts">{it.sub}</div>
                  </div>
                  <div className={`s-dot ${i === active ? "s-dot-on" : ""}`} />
                </button>
              ))}
            </div>
          </aside>

          {/* ═══ HERO ═══ */}
          <section id="hero" className="hero">
            <div className="hero-bg" aria-hidden="true"><div className="hero-glow-r" /></div>
            <div className="hero-wrap">
              <div className="hero-content reveal">
                <p className="kicker-r">SS26 — УЖЕ В ПРОДАЖЕ</p>
                <h1 className="hero-h1">Стиль — это<br /><span className="text-r">характер.</span></h1>
                <p className="hero-sub">Неформальная одежда для тех, кто говорит без слов. Минимализм, качество, характер.</p>
                <div className="hero-btns">
                  <button className="btn-red" onClick={() => go("catalog")}>Смотреть каталог</button>
                  <button className="btn-outline" onClick={() => go("collabs")}>Лимтки</button>
                </div>
              </div>
              <div className="hero-visual reveal-delayed">
                <div className="hanger-wrap">
                  <svg viewBox="0 0 300 400" className="hanger-svg">
                    <path d="M150 20 C150 10, 165 0, 165 10 C165 20, 155 25, 150 20" fill="none" stroke="rgba(220,38,38,0.5)" strokeWidth="3" />
                    <line x1="40" y1="50" x2="260" y2="50" stroke="rgba(220,38,38,0.35)" strokeWidth="3" strokeLinecap="round" />
                    <path d="M40 50 Q30 50, 25 70 L10 120" fill="none" stroke="rgba(220,38,38,0.25)" strokeWidth="2.5" />
                    <path d="M260 50 Q270 50, 275 70 L290 120" fill="none" stroke="rgba(220,38,38,0.25)" strokeWidth="2.5" />
                    <path d="M70 120 L90 85 Q150 65, 210 85 L230 120 L230 340 Q230 355, 215 355 L85 355 Q70 355, 70 340 Z"
                      fill="rgba(20,20,20,0.95)" stroke="rgba(220,38,38,0.12)" strokeWidth="2" />
                    <path d="M115 120 Q150 95, 185 120" fill="none" stroke="rgba(220,38,38,0.15)" strokeWidth="2" />
                    <rect x="115" y="245" width="70" height="35" rx="2" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                    <text x="150" y="200" textAnchor="middle" fontFamily="Unbounded, sans-serif" fontSize="22" fontWeight="800"
                      fill="rgba(220,38,38,0.4)" letterSpacing="6">SPIRI</text>
                    <line x1="138" y1="130" x2="134" y2="185" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                    <line x1="162" y1="130" x2="166" y2="185" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
                  </svg>
                  <div className="float-tag"><Tag size={14} /><span>SS26</span></div>
                  <div className="price-badge"><span className="pb-label">от</span><span className="pb-price">2 490 ₽</span></div>
                </div>
              </div>
            </div>
            <div className="scroll-hint reveal-delayed">
              <span>ВНИЗ</span>
              <span className="scroll-hint-line" />
            </div>
          </section>

          <Divider />

          {/* ═══ CATALOG ═══ */}
          <section id="catalog" className="section">
            <div className="section-bg" aria-hidden="true"><div className="section-glow-r" /></div>
            <p className="sec-index sec-index-tl" aria-hidden="true">01</p>
            <div className="container">
              <header className="sec-head">
                <p className="kicker-r">Каталог</p>
                <h2 className="sec-h2">Вся одежда</h2>
                <p className="sec-desc">{CATALOG.length} позиций. Каждая — продумана до деталей.</p>
              </header>
              <div className="filter-bar glass">
                {CATS.map(f => (
                  <button key={f.key} className={`filter-tab ${filter === f.key ? "filter-tab-on" : ""}`} onClick={() => setFilter(f.key)}>{f.label}</button>
                ))}
              </div>
              <div className="product-grid">
                {filtered.map((item, i) => {
                  const bgColors = ["#1a1a1a","#111","#1a1a1a","#222","#111","#1a1a1a","#222","#1a1a1a","#111","#222","#1a1a1a","#111"];
                  return (
                    <div className="product-card glass-card" key={item.id}>
                      <div className="product-img" style={{ background: bgColors[i % 12] }}>
                        <ClothSVG type={i} />
                        {item.tag && <span className={`product-tag ${item.tag === "NEW" ? "product-tag-new" : ""}`}>{item.tag}</span>}
                        <button className="product-like" onClick={() => toggleLike(item.id)}>
                          <Heart size={18} fill={liked[item.id] ? RED : "none"} color={liked[item.id] ? RED : "rgba(255,255,255,0.25)"} />
                        </button>
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{item.name}</h3>
                        <p className="product-sub">{item.sub}</p>
                        <p className="product-price">{item.price.toLocaleString("ru")} ₽</p>
                      </div>
                      <button className="product-btn" onClick={() => addToCart(item)}>
                        <ShoppingBag size={14} /> В корзину
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <Divider />

          {/* ═══ ABOUT ═══ */}
          <section id="about" className="section">
            <div className="section-bg" aria-hidden="true"><div className="section-glow-r" /></div>
            <p className="sec-index sec-index-br" aria-hidden="true">02</p>
            <div className="container">
              <header className="sec-head">
                <p className="kicker-r">О нас</p>
                <h2 className="sec-h2">Четыре столпа.</h2>
                <p className="sec-desc">Не обещания — принципы, на которых стоит spiri.</p>
              </header>
              <ul className="bento-grid">
                {FEATURES.map(f => (
                  <li key={f.title}>
                    <article className="bento glass-card">
                      <span className="bento-num" aria-hidden="true">{f.num}</span>
                      <div className="bento-icon-box"><f.icon size={22} strokeWidth={1.2} /></div>
                      <h3 className="bento-title">{f.title}</h3>
                      <p className="bento-desc">{f.desc}</p>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <Divider />

          {/* ═══ LIMTKI ═══ */}
          <section id="collabs" className="section">
            <div className="section-bg" aria-hidden="true"><div className="section-glow-r" /></div>
            <p className="sec-index sec-index-bl" aria-hidden="true">03</p>
            <div className="container">
              <header className="sec-head sec-head-c">
                <p className="kicker-r">Лимитированные дропы</p>
                <h2 className="sec-h2">Лимтки.</h2>
                <p className="sec-desc">Когда закончится — не повторим. Каждая вещь с уникальным номером.</p>
              </header>
              <div className="collab-tabs">
                {COLLABS.map((c, i) => (
                  <button key={c.brand} className={`collab-tab glass ${i === collabTab ? "collab-tab-on" : ""}`} onClick={() => setCollabTab(i)}>
                    <c.icon size={16} strokeWidth={1.5} />
                    <span>{c.brand}</span>
                  </button>
                ))}
              </div>
              <div className="collab-body glass-panel">
                <div key={`h-${collabTab}`} className="collab-header-anim">
                  <div className="collab-header">
                    <div className="collab-brand">
                      <collab.icon size={28} strokeWidth={1.5} className="collab-icon-big" />
                      <div>
                        <h3 className="collab-name">{collab.brand} <span className="collab-x">x</span> spiri</h3>
                        <p className="collab-desc">{collab.desc}</p>
                      </div>
                    </div>
                    <span className={`collab-badge ${collab.badge === "EXCLUSIVE" ? "collab-badge-exc" : ""}`}>
                      {collab.badge === "EXCLUSIVE" ? <Lock size={12} /> : <Flame size={12} />}
                      {collab.badge}
                    </span>
                  </div>
                </div>
                <div key={`i-${collabTab}`} className="collab-items">
                  {collab.items.map((item, i) => (
                    <div className="collab-item collab-item-anim" key={i}>
                      <div className="collab-item-img" style={{ background: collab.color }}>
                        <ClothSVG type={collabTab * 2 + i} color={collab.color} />
                      </div>
                      <div className="collab-item-info">
                        <h4 className="collab-item-name">{item.name}</h4>
                        <p className="collab-item-price">{item.price.toLocaleString("ru")} ₽</p>
                        {item.remaining !== null && (
                          <div className="collab-stock"><span className="dot-live" />Осталось {item.remaining} шт.</div>
                        )}
                        <button className="collab-btn" onClick={() => addToCart({ id: 100 + collabTab * 10 + i, name: item.name, price: item.price })}>
                          <ShoppingBag size={13} /> Забрать
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ═══ FOOTER ═══ */}
          <footer className="footer">
            <div className="container">
              <div className="footer-top">
                <div>
                  <p className="footer-brand">spiri</p>
                  <p className="footer-copy">(c) 2026 spiri. Все права защищены.</p>
                </div>
                <div className="footer-links">
                  <a href="#" className="footer-link">Telegram</a>
                  <a href="#" className="footer-link">Instagram</a>
                  <a href="#" className="footer-link">VK</a>
                </div>
              </div>
              <div className="footer-giant-wrap">
                <p className="footer-giant" aria-hidden="true">WEAR IT.</p>
              </div>
            </div>
          </footer>

          {/* ═══ CART (glass) ═══ */}
          <div className={`cart-overlay ${cartOpen ? "cart-open" : ""}`}>
            <div className="cart-backdrop" onClick={() => setCartOpen(false)} />
            <div className="cart-panel glass-cart" ref={cartRef}>
              <div className="cart-head">
                <h2 className="cart-title">Корзина <span className="cart-count-label">({cartCount})</span></h2>
                <button className="cart-close" onClick={() => setCartOpen(false)}><X size={24} /></button>
              </div>

              {checkoutDone ? (
                <div className="cart-empty">
                  <div className="checkout-ok"><Check size={48} strokeWidth={1.5} /></div>
                  <p className="cart-empty-text">Заказ оформлен!</p>
                  <p className="cart-empty-sub">Спасибо за покупку. Жди доставку.</p>
                </div>
              ) : cart.length === 0 ? (
                <div className="cart-empty">
                  <ShoppingBag size={48} strokeWidth={1} style={{ color: "rgba(255,255,255,0.12)" }} />
                  <p className="cart-empty-text">Корзина пуста</p>
                  <p className="cart-empty-sub">Добавь что-нибудь из каталога</p>
                  <button className="cart-empty-btn" onClick={() => { setCartOpen(false); go("catalog"); }}>Перейти в каталог</button>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cart.map((item, i) => (
                      <div className="cart-item" key={`${item.id}-${item.name}-${i}`}>
                        <div className="cart-item-img" style={{ background: "#111" }}>
                          <ClothSVG type={i % 6} color="#111" />
                        </div>
                        <div className="cart-item-details">
                          <h4 className="cart-item-name">{item.name}</h4>
                          <p className="cart-item-price">{item.price.toLocaleString("ru")} ₽</p>
                          <div className="cart-item-controls">
                            <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.name, -1)}><Minus size={14} /></button>
                            <span className="cart-qty">{item.qty}</span>
                            <button className="cart-qty-btn" onClick={() => updateQty(item.id, item.name, 1)}><Plus size={14} /></button>
                          </div>
                          <p className="cart-item-line">{(item.price * item.qty).toLocaleString("ru")} ₽</p>
                        </div>
                        <button className="cart-remove" onClick={() => removeFromCart(item.id, item.name)}><Trash2 size={16} /></button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-footer">
                    <div className="cart-summary">
                      <div className="cart-summary-row"><span>Подытог</span><span>{cartTotal.toLocaleString("ru")} ₽</span></div>
                      <div className="cart-summary-row"><span>Доставка</span><span className={cartTotal >= 5000 ? "free-del" : ""}>{cartTotal >= 5000 ? "Бесплатно" : "490 ₽"}</span></div>
                      <div className="cart-summary-row cart-summary-total"><span>Итого</span><span>{(cartTotal + (cartTotal >= 5000 ? 0 : 490)).toLocaleString("ru")} ₽</span></div>
                    </div>
                    <button className="cart-checkout" onClick={handleCheckout}>
                      <CreditCard size={16} style={{ marginRight: 8 }} /> Оформить заказ
                    </button>
                    {cartTotal < 5000 && (
                      <p className="cart-free-hint">До бесплатной доставки ещё {(5000 - cartTotal).toLocaleString("ru")} ₽</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <div className="divider-line" />
      <div className="divider-dots">
        <span className="divider-dot-r" />
        <span className="divider-text">...</span>
        <span className="divider-dot-r" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CSS
   ═══════════════════════════════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Unbounded:wght@400;500;600;700;800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;scroll-padding-top:80px}
body{background:#020202;color:#fff;font-family:'Inter',Arial,sans-serif;-webkit-font-smoothing:antialiased;overflow-x:hidden}

/* ── Smooth scroll for all anchor-like clicks ── */
*{-webkit-tap-highlight-color:transparent}

.root{min-height:100vh;position:relative;width:100%}
.site-main{position:relative;z-index:1}

/* ═══ INTRO ═══ */
.intro{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#020202;pointer-events:none;transition:opacity 0.6s ease 0.3s,visibility 0.6s ease 0.3s}
.intro-active{opacity:1;visibility:visible;pointer-events:auto}
.intro-done{opacity:0;visibility:hidden}
.intro-bg{position:absolute;inset:0;background:radial-gradient(ellipse 120% 80% at 50% 50%,rgba(220,38,38,0.08),transparent 55%),repeating-linear-gradient(to bottom,rgba(255,255,255,0.02) 0px,rgba(255,255,255,0.02) 1px,transparent 1px,transparent 64px),repeating-linear-gradient(to right,rgba(255,255,255,0.02) 0px,rgba(255,255,255,0.02) 1px,transparent 1px,transparent 64px)}
.intro-scanline{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(to right,transparent,rgba(220,38,38,0.30),transparent);animation:scanline 1.5s ease-in-out forwards}
@keyframes scanline{0%{top:0;opacity:1}80%{opacity:1}100%{top:100%;opacity:0}}
.intro-logo{position:relative;z-index:1;display:flex;gap:0;font-family:'Unbounded',sans-serif;font-size:clamp(3rem,10vw,5rem);font-weight:800;letter-spacing:-0.03em}
.intro-letter{display:inline-block;color:#fff;opacity:0;transform:translateY(30px) scale(0.8);animation:letterIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards}
@keyframes letterIn{0%{opacity:0;transform:translateY(30px) scale(0.8)}60%{opacity:1;transform:translateY(-4px) scale(1.02)}100%{opacity:1;transform:translateY(0) scale(1)}}
.intro-line{position:relative;z-index:1;width:0;height:2px;margin-top:1.5rem;margin-bottom:1rem;background:linear-gradient(to right,transparent,#DC2626,transparent);animation:lineExpand 0.6s cubic-bezier(0.16,1,0.3,1) 1.1s forwards}
@keyframes lineExpand{0%{width:0}100%{width:min(200px,40vw)}}
.intro-tagline{position:relative;z-index:1;font-family:'Unbounded',sans-serif;font-size:clamp(0.625rem,1.5vw,0.875rem);font-weight:600;text-transform:uppercase;letter-spacing:0.28em;color:rgba(220,38,38,0.60);opacity:0;animation:fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards}
@keyframes fadeUp{0%{opacity:0;transform:translateY(10px)}100%{opacity:1;transform:translateY(0)}}

/* Notification */
.notif{position:fixed;top:5rem;left:50%;transform:translateX(-50%);z-index:200;padding:0.75rem 1.5rem;background:rgba(220,38,38,0.9);backdrop-filter:blur(8px);font-family:'Unbounded',sans-serif;font-size:0.75rem;font-weight:600;color:#fff;border-radius:2px;animation:notifIn 0.3s ease-out,notifOut 0.3s ease-in 1.9s forwards;white-space:nowrap}
@keyframes notifIn{0%{opacity:0;transform:translateX(-50%) translateY(-10px)}100%{opacity:1;transform:translateX(-50%) translateY(0)}}
@keyframes notifOut{0%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(-10px)}}

/* Shell */
.shell{position:fixed;inset:0;z-index:0;pointer-events:none}
.shell-stripes{position:absolute;inset:0;background:radial-gradient(ellipse 120% 80% at 50% -20%,rgba(220,38,38,0.07),transparent 55%),radial-gradient(circle at center,transparent,rgba(0,0,0,0.5) 100%),repeating-linear-gradient(to bottom,rgba(255,255,255,0.015) 0px,rgba(255,255,255,0.015) 1px,transparent 1px,transparent 64px),repeating-linear-gradient(to right,rgba(255,255,255,0.015) 0px,rgba(255,255,255,0.015) 1px,transparent 1px,transparent 64px)}

.scroll-prog{position:fixed;top:0;left:0;z-index:55;height:2px;width:100%;transform-origin:left;background:#DC2626;transition:transform 0.1s linear}

/* ── GLASS MIXIN ── */
.glass{
  background:rgba(10,10,10,0.60) !important;
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border:1px solid rgba(255,255,255,0.08) !important;
}
.glass-card{
  background:rgba(10,10,10,0.50);
  backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,0.06);
}
.glass-card:hover{border-color:rgba(220,38,38,0.20)}
.glass-panel{
  background:rgba(10,8,8,0.60);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border:1px solid rgba(220,38,38,0.10);
}
.glass-cart{
  background:rgba(10,10,10,0.85) !important;
  backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
}

/* Header */
.hdr{position:fixed;left:0;right:0;top:0;z-index:50;background:transparent;border-bottom:1px solid transparent;transition:background-color 0.3s,border-color 0.3s,backdrop-filter 0.3s}
.hdr-scrolled{
  background:rgba(2,2,2,0.70) !important;
  backdrop-filter:blur(20px) saturate(1.5);-webkit-backdrop-filter:blur(20px) saturate(1.5);
  border-bottom-color:rgba(255,255,255,0.06);
}
.hdr-inner{max-width:1200px;margin:0 auto;padding:1rem 1.25rem;display:flex;align-items:center;justify-content:space-between}
@media(min-width:768px){.hdr-inner{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:1rem;padding:1.25rem 2rem}}
.logo{pointer-events:auto;position:relative;z-index:10;font-family:'Unbounded',sans-serif;font-size:1.75rem;font-weight:800;letter-spacing:-0.03em;color:#fff;background:none;border:none;cursor:pointer}
@media(min-width:768px){.logo{justify-self:start;font-size:2rem}}
.nav-center{display:none;align-items:center;justify-content:center;gap:0.25rem}
@media(min-width:768px){.nav-center{display:flex}}
.nav-link{padding:0.5rem 1rem;font-family:'Unbounded',sans-serif;font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.14em;color:rgba(255,255,255,0.45);background:none;border:none;cursor:pointer;transition:color 0.3s}
.nav-link:hover{color:#DC2626}
.hdr-right{display:flex;align-items:center;gap:0.75rem}
@media(min-width:768px){.hdr-right{justify-self:end}}
.hdr-btn{display:flex;align-items:center;justify-content:center;height:2.5rem;width:2.5rem;border:1px solid rgba(255,255,255,0.10);color:#fff;background:none;cursor:pointer;transition:border-color 0.3s,color 0.3s}
.hdr-btn:hover{border-color:#DC2626;color:#DC2626}
.mob-menu{display:flex}@media(min-width:768px){.mob-menu{display:none}}
.cart-btn{position:relative}
.cart-badge{position:absolute;top:-4px;right:-4px;min-width:16px;height:16px;border-radius:50%;background:#DC2626;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 3px}
.mob-nav{pointer-events:auto;border-top:1px solid rgba(255,255,255,0.06);background:rgba(2,2,2,0.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);padding:1rem 1.25rem}
.mob-link{display:block;width:100%;padding:0.75rem 0;text-align:left;font-family:'Unbounded',sans-serif;font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.14em;color:rgba(255,255,255,0.45);background:none;border:none;cursor:pointer;transition:color 0.3s}
.mob-link:hover{color:#fff}

/* Side Nav */
.side-nav{position:fixed;right:0.75rem;top:50%;z-index:40;transform:translateY(-50%);font-family:'Unbounded',sans-serif;display:none}
@media(min-width:768px){.side-nav{display:block}}
@media(min-width:1024px){.side-nav{right:1.25rem}}
.side-line{position:absolute;right:15px;top:2rem;bottom:2rem;width:1px;background:linear-gradient(to bottom,transparent,rgba(220,38,38,0.15),transparent)}
.side-dots{position:relative;display:flex;flex-direction:column;align-items:flex-end;gap:1rem;padding-right:2rem}
.side-dot-wrap{position:relative;display:flex;align-items:center;justify-content:flex-end;background:none;border:none;cursor:pointer;padding:0}
.s-dot{height:8px;width:8px;border-radius:50%;border:1px solid rgba(255,255,255,0.20);background:#020202;transition:all 0.3s}
.s-dot-on{transform:scale(1.5);border-color:#DC2626;background:#DC2626;box-shadow:0 0 12px rgba(220,38,38,0.4)}
.side-tip{position:absolute;right:4.5rem;top:50%;transform:translateY(-50%);max-width:120px;text-align:right;opacity:0;transition:opacity 0.3s;pointer-events:none;background:rgba(10,10,10,0.70);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);padding:8px 12px;border:1px solid rgba(255,255,255,0.08)}
.side-dot-wrap:hover .side-tip{opacity:1}
.side-tl{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;color:#fff}
.side-ts{font-size:9px;line-height:1.25;color:rgba(255,255,255,0.45)}

/* ═══ HERO ═══ */
.hero{position:relative;min-height:100dvh;overflow:hidden;padding-top:5rem;padding-bottom:3rem}
@media(min-width:768px){.hero{padding-top:6rem;padding-bottom:4rem}}
.hero-bg{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.hero-glow-r{position:absolute;left:50%;top:42%;width:min(110vw,64rem);height:min(90vw,42rem);transform:translate(-50%,-50%) translateY(56px);border-radius:50%;background:radial-gradient(ellipse 75% 55% at 50% 50%, rgba(220,38,38,0.08), transparent 68%)}
.hero-wrap{position:relative;z-index:10;max-width:1200px;margin:0 auto;padding:0 1.25rem;display:flex;flex-direction:column;align-items:center;gap:2rem}
@media(min-width:768px){.hero-wrap{padding:0 2rem;flex-direction:row;align-items:flex-start;gap:3rem}}
.hero-content{text-align:center;width:100%}
@media(min-width:768px){.hero-content{text-align:left;flex:1;min-width:0;padding-top:2rem}}
.kicker-r{font-family:'Unbounded',sans-serif;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.28em;color:#EF4444}
.hero-h1{margin-top:1.25rem;font-family:'Unbounded',sans-serif;font-size:clamp(2.5rem,8vw,5rem);font-weight:800;line-height:1.02;letter-spacing:-0.04em;color:#fff}
@media(min-width:768px){.hero-h1{margin-top:1.5rem;font-size:clamp(3rem,9vw,5.5rem)}}
.text-r{color:#DC2626}
.hero-sub{margin-top:1rem;max-width:32rem;margin-left:auto;margin-right:auto;font-family:'Unbounded',sans-serif;font-size:0.9375rem;line-height:1.625;color:rgba(255,255,255,0.42)}
@media(min-width:768px){.hero-sub{margin-left:0;font-size:1.0625rem;margin-top:1.25rem}}
.hero-btns{margin-top:2rem;display:flex;flex-direction:column;align-items:stretch;gap:0.75rem;max-width:400px;margin-left:auto;margin-right:auto}
@media(min-width:768px){.hero-btns{max-width:none;margin-left:0;margin-right:0;flex-direction:row;align-items:center;gap:1rem}}
.btn-red{position:relative;overflow:hidden;border:none;border-radius:0;font-family:'Unbounded',sans-serif;font-size:0.75rem;font-weight:800;text-transform:uppercase;cursor:pointer;transition:all 0.3s;background:#DC2626;color:#fff;padding:1rem 2.5rem;letter-spacing:0.2em}
.btn-red:hover{background:#EF4444;transform:translateY(-1px)}
.btn-outline{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,0.20);border-radius:0;font-family:'Unbounded',sans-serif;font-size:0.75rem;font-weight:700;text-transform:uppercase;cursor:pointer;transition:all 0.3s;background:transparent;color:#fff;padding:1rem 2.5rem;letter-spacing:0.16em}
.btn-outline:hover{border-color:#DC2626;color:#DC2626}

.hero-visual{display:flex;justify-content:center;width:100%;max-width:360px;margin:0 auto}
@media(min-width:768px){.hero-visual{flex:0 0 auto;max-width:340px;margin:0;padding-top:1rem}}
.hanger-wrap{position:relative;width:100%}
.hanger-svg{width:100%;height:auto;filter:drop-shadow(0 0 30px rgba(220,38,38,0.06))}
.float-tag{position:absolute;top:8%;right:5%;display:flex;align-items:center;gap:6px;padding:6px 12px;border:1px solid rgba(220,38,38,0.30);background:rgba(220,38,38,0.08);font-family:'Unbounded',sans-serif;font-size:10px;font-weight:700;letter-spacing:0.14em;color:#EF4444;animation:floatTag 3s ease-in-out infinite;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
@keyframes floatTag{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.price-badge{position:absolute;bottom:12%;left:5%;padding:10px 16px;border:1px solid rgba(255,255,255,0.10);background:rgba(10,10,10,0.80);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);text-align:center;animation:floatTag 3.5s ease-in-out infinite 0.5s}
.pb-label{display:block;font-size:9px;color:rgba(255,255,255,0.40);text-transform:uppercase;letter-spacing:0.15em;font-family:'Unbounded',sans-serif}
.pb-price{display:block;font-size:1.125rem;font-weight:800;color:#fff;font-family:'Unbounded',sans-serif;letter-spacing:-0.02em}

.scroll-hint{position:absolute;bottom:2rem;left:1.25rem;z-index:10;display:flex;align-items:center;gap:1rem}
@media(min-width:768px){.scroll-hint{left:2rem}}
.scroll-hint span{font-family:monospace;font-size:10px;letter-spacing:0.25em;color:rgba(255,255,255,0.20);animation:scrollH 2s ease-in-out infinite}
@keyframes scrollH{0%,100%{opacity:0.35;transform:scaleX(0.85)}50%{opacity:1;transform:scaleX(1)}}
.scroll-hint-line{display:block;height:1px;width:3.5rem;background:linear-gradient(to right,rgba(220,38,38,0.40),transparent);opacity:0.9}

.reveal{opacity:0;animation:reveal 0.6s cubic-bezier(0.16,1,0.3,1) forwards}
.reveal-delayed{opacity:0;animation:reveal 0.55s cubic-bezier(0.16,1,0.3,1) 0.12s forwards}
@keyframes reveal{0%{opacity:0;transform:translateY(12px)}100%{opacity:1;transform:translateY(0)}}

/* Divider */
.divider{position:relative;z-index:10;display:flex;align-items:center;justify-content:center;height:3.5rem}
@media(min-width:768px){.divider{height:4rem}}
.divider-line{height:1px;flex:1;max-width:72rem;background:linear-gradient(to right,transparent,rgba(255,255,255,0.08),transparent)}
.divider-dots{position:absolute;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:0.5rem}
.divider-dot-r{height:4px;width:4px;border-radius:50%;background:#DC2626}
.divider-text{font-family:monospace;font-size:10px;letter-spacing:0.35em;color:rgba(255,255,255,0.15)}

/* Section */
.section{position:relative;overflow:hidden;padding:4rem 0}
@media(min-width:768px){.section{padding:6rem 0}}
.section-bg{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.section-glow-r{position:absolute;left:50%;top:42%;width:min(110vw,64rem);height:min(90vw,42rem);transform:translate(-50%,-50%) translateY(56px);border-radius:50%;background:radial-gradient(ellipse 75% 55% at 50% 50%, rgba(220,38,38,0.06), transparent 68%)}
.container{position:relative;z-index:10;max-width:1200px;margin:0 auto;padding:0 1.25rem}
@media(min-width:768px){.container{padding:0 2rem}}
.sec-head{margin-bottom:2rem;max-width:42rem}
@media(min-width:768px){.sec-head{margin-bottom:2.5rem}}
.sec-head-c{text-align:center;margin-left:auto;margin-right:auto}
.sec-h2{margin-top:1rem;font-family:'Unbounded',sans-serif;font-size:clamp(1.65rem,4.2vw,3rem);font-weight:800;line-height:1.06;letter-spacing:-0.03em;color:#fff}
@media(min-width:768px){.sec-h2{margin-top:1.25rem}}
.sec-desc{margin-top:0.75rem;max-width:32rem;font-size:0.8125rem;font-weight:500;line-height:1.625;color:rgba(255,255,255,0.42)}
@media(min-width:768px){.sec-desc{margin-top:1rem;font-size:1rem}}
.sec-index{position:absolute;font-family:'Unbounded',sans-serif;font-size:clamp(4rem,14vw,9rem);font-weight:800;letter-spacing:-0.04em;line-height:1;color:rgba(220,38,38,0.06);pointer-events:none;user-select:none}
.sec-index-tl{left:0.5rem;top:5rem;opacity:0.6}@media(min-width:768px){.sec-index-tl{left:1.5rem}}
.sec-index-br{bottom:2rem;right:1rem;opacity:0.6}@media(min-width:768px){.sec-index-br{right:2.5rem}}
.sec-index-bl{bottom:5rem;left:1rem;opacity:0.7}@media(min-width:768px){.sec-index-bl{left:2rem}}

/* Filter bar (glass) */
.filter-bar{display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:2rem;padding:0.75rem;border-radius:4px}
.filter-tab{padding:0.5rem 1rem;font-family:'Unbounded',sans-serif;font-size:0.6875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.35);border:1px solid transparent;background:transparent;cursor:pointer;transition:all 0.3s}
.filter-tab:hover{color:rgba(255,255,255,0.60)}
.filter-tab-on{color:#DC2626 !important;background:rgba(220,38,38,0.12) !important}

/* Product grid */
.product-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:0.75rem}
@media(min-width:640px){.product-grid{grid-template-columns:repeat(3,1fr);gap:1rem}}
@media(min-width:1024px){.product-grid{grid-template-columns:repeat(4,1fr);gap:1.25rem}}
.product-card{border-radius:4px;overflow:hidden;transition:border-color 0.3s,transform 0.3s}
.product-card:hover{transform:translateY(-2px)}
.product-img{position:relative;aspect-ratio:1;display:flex;align-items:center;justify-content:center;overflow:hidden}
.product-img svg{width:80%;height:80%;transition:transform 0.4s cubic-bezier(0.16,1,0.3,1)}
.product-card:hover .product-img svg{transform:scale(1.05)}
.product-tag{position:absolute;top:0.5rem;left:0.5rem;padding:4px 8px;font-family:'Unbounded',sans-serif;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;background:rgba(255,255,255,0.10);color:rgba(255,255,255,0.70)}
.product-tag-new{background:rgba(220,38,38,0.20) !important;color:#EF4444 !important}
.product-like{position:absolute;top:0.5rem;right:0.5rem;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border:1px solid rgba(255,255,255,0.10);background:rgba(0,0,0,0.50);cursor:pointer;transition:all 0.3s}
.product-like:hover{border-color:rgba(220,38,38,0.30)}
.product-info{padding:0.75rem}
@media(min-width:768px){.product-info{padding:1rem}}
.product-name{font-family:'Unbounded',sans-serif;font-size:0.75rem;font-weight:600;color:#fff;line-height:1.3}
.product-sub{margin-top:0.125rem;font-size:0.6875rem;color:rgba(255,255,255,0.30);text-transform:lowercase}
.product-price{margin-top:0.25rem;font-size:0.875rem;font-weight:700;color:#DC2626}
.product-btn{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:0.625rem;border:none;border-top:1px solid rgba(255,255,255,0.06);background:transparent;font-family:'Unbounded',sans-serif;font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.50);cursor:pointer;transition:all 0.3s}
.product-btn:hover{background:rgba(220,38,38,0.10);color:#DC2626}

/* Bento */
.bento-grid{display:grid;grid-template-columns:1fr;gap:0.75rem;max-width:48rem;margin:0 auto}
@media(min-width:640px){.bento-grid{grid-template-columns:repeat(2,1fr)}}
.bento{position:relative;height:100%;overflow:hidden;border-radius:4px;box-shadow:inset 0 1px 0 0 rgba(255,255,255,0.04);transition:border-color 0.35s cubic-bezier(0.16,1,0.3,1),background-color 0.35s cubic-bezier(0.16,1,0.3,1);padding:1.5rem}
@media(min-width:768px){.bento{padding:2rem}}
.bento-num{position:absolute;right:1rem;top:1rem;font-family:monospace;font-size:10px;tabular-nums;color:rgba(220,38,38,0.15);pointer-events:none}
@media(min-width:768px){.bento-num{right:1.5rem;top:1.5rem}}
.bento-icon-box{display:flex;align-items:center;justify-content:center;height:2.75rem;width:2.75rem;border:1px solid rgba(220,38,38,0.15);background:rgba(220,38,38,0.05);margin-bottom:1.25rem}
@media(min-width:768px){.bento-icon-box{height:3rem;width:3rem;margin-bottom:1.5rem}}
.bento-icon-box svg{color:rgba(255,255,255,0.80)}
.bento-title{font-family:'Unbounded',sans-serif;font-size:1.125rem;font-weight:700;color:#fff}
@media(min-width:768px){.bento-title{font-size:1.25rem}}
.bento-desc{margin-top:0.75rem;max-width:48ch;font-size:0.875rem;line-height:1.625;color:rgba(255,255,255,0.40)}
@media(min-width:768px){.bento-desc{font-size:15px}}

/* Collabs */
.collab-tabs{display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:2rem;justify-content:center}
.collab-tab{display:flex;align-items:center;gap:8px;padding:0.625rem 1.25rem;border-radius:4px;font-family:'Unbounded',sans-serif;font-size:0.75rem;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.40);cursor:pointer;transition:all 0.3s}
.collab-tab:hover{color:rgba(255,255,255,0.70)}
.collab-tab-on{color:#DC2626 !important}
.collab-body{max-width:48rem;margin:0 auto;border-radius:6px;padding:1.5rem}
@media(min-width:768px){.collab-body{padding:2rem}}

/* Collab fade animations */
@keyframes collabFadeIn{0%{opacity:0;transform:translateY(16px)}100%{opacity:1;transform:translateY(0)}}
.collab-header-anim{animation:collabFadeIn 0.4s cubic-bezier(0.16,1,0.3,1) forwards}
.collab-item-anim{opacity:0;animation:collabFadeIn 0.45s cubic-bezier(0.16,1,0.3,1) forwards}
.collab-item-anim:nth-child(1){animation-delay:0.05s}
.collab-item-anim:nth-child(2){animation-delay:0.12s}
.collab-item-anim:nth-child(3){animation-delay:0.19s}
.collab-item-anim:nth-child(4){animation-delay:0.26s}
.collab-item-anim:nth-child(5){animation-delay:0.33s}
.collab-header{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.5rem;padding-bottom:1.5rem;border-bottom:1px solid rgba(255,255,255,0.06)}
.collab-brand{display:flex;align-items:center;gap:1rem}
.collab-icon-big{color:#DC2626}
.collab-name{font-family:'Unbounded',sans-serif;font-size:1.375rem;font-weight:800;color:#fff}
.collab-x{color:#DC2626;font-weight:600}
.collab-desc{margin-top:0.25rem;font-size:0.875rem;color:rgba(255,255,255,0.40);line-height:1.5}
.collab-badge{display:flex;align-items:center;gap:6px;padding:6px 14px;background:rgba(220,38,38,0.12);border:1px solid rgba(220,38,38,0.25);font-family:'Unbounded',sans-serif;font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#EF4444;border-radius:3px}
.collab-badge-exc{background:rgba(255,215,0,0.08);border-color:rgba(255,215,0,0.25);color:#FFD700}
.collab-items{display:grid;grid-template-columns:1fr;gap:1rem}
@media(min-width:640px){.collab-items{grid-template-columns:repeat(2,1fr)}}
@media(min-width:768px){.collab-items{grid-template-columns:repeat(3,1fr)}}
.collab-item{border:1px solid rgba(220,38,38,0.08);background:rgba(8,4,4,0.40);border-radius:4px;overflow:hidden;transition:border-color 0.3s}
.collab-item:hover{border-color:rgba(220,38,38,0.20)}
.collab-item-img{aspect-ratio:1;display:flex;align-items:center;justify-content:center}
.collab-item-img svg{width:80%;height:80%}
.collab-item-info{padding:1rem}
.collab-item-name{font-family:'Unbounded',sans-serif;font-size:0.75rem;font-weight:600;color:#fff;line-height:1.3}
.collab-item-price{margin-top:0.25rem;font-size:1rem;font-weight:700;color:#DC2626}
.collab-stock{margin-top:0.5rem;display:flex;align-items:center;gap:0.5rem;font-family:'Unbounded',sans-serif;font-size:0.6875rem;font-weight:600;color:rgba(255,255,255,0.45)}
.dot-live{width:8px;height:8px;border-radius:50%;background:#DC2626;animation:pulse 1.5s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}
.collab-btn{display:flex;align-items:center;justify-content:center;gap:6px;width:100%;padding:0.625rem;margin-top:0.75rem;border:1px solid rgba(220,38,38,0.15);border-radius:0;background:transparent;font-family:'Unbounded',sans-serif;font-size:0.6875rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.60);cursor:pointer;transition:all 0.3s}
.collab-btn:hover{background:#DC2626;color:#fff;border-color:#DC2626}

/* Footer */
.footer{position:relative;border-top:1px solid rgba(255,255,255,0.05);padding:4rem 0}
@media(min-width:768px){.footer{padding:6rem 0}}
.footer-top{display:flex;flex-direction:column;gap:3rem}
@media(min-width:768px){.footer-top{flex-direction:row;align-items:flex-end;justify-content:space-between}}
.footer-brand{font-family:'Unbounded',sans-serif;font-size:2.25rem;font-weight:800;letter-spacing:-0.025em;color:#fff}
@media(min-width:768px){.footer-brand{font-size:3.75rem}}
.footer-copy{margin-top:1rem;max-width:20rem;font-family:'Unbounded',sans-serif;font-size:0.875rem;line-height:1.625;color:rgba(255,255,255,0.30)}
.footer-links{display:flex;flex-wrap:wrap;gap:2.5rem}
@media(min-width:768px){.footer-links{justify-content:flex-end}}
.footer-link{font-family:'Unbounded',sans-serif;font-size:0.875rem;font-weight:600;text-transform:uppercase;letter-spacing:0.12em;color:rgba(255,255,255,0.35);text-decoration:none;transition:color 0.3s}
.footer-link:hover{color:#DC2626}
.footer-giant-wrap{margin-top:4rem;text-align:center}
@media(min-width:768px){.footer-giant-wrap{margin-top:7rem}}
.footer-giant{font-family:'Unbounded',sans-serif;font-size:clamp(3rem,13vw,8rem);font-weight:800;line-height:0.92;letter-spacing:0.12em;color:rgba(220,38,38,0.25);text-shadow:0 0 28px rgba(220,38,38,0.12), 0 0 64px rgba(220,38,38,0.05)}
@media(min-width:768px){.footer-giant{letter-spacing:0.2em}}

/* ═══ CART (glass) ═══ */
.cart-overlay{position:fixed;inset:0;z-index:100;opacity:0;pointer-events:none;transition:opacity 0.3s}
.cart-open{opacity:1;pointer-events:auto}
.cart-backdrop{position:absolute;inset:0;background:rgba(0,0,0,0.60);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
.cart-panel{position:absolute;right:0;top:0;bottom:0;width:100%;max-width:420px;border-left:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;transform:translateX(100%);transition:transform 0.35s cubic-bezier(0.16,1,0.3,1)}
.cart-open .cart-panel{transform:translateX(0)}
.cart-head{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.5rem;border-bottom:1px solid rgba(255,255,255,0.06)}
.cart-title{font-family:'Unbounded',sans-serif;font-size:1.125rem;font-weight:800;color:#fff}
.cart-count-label{color:rgba(255,255,255,0.40);font-weight:600}
.cart-close{display:flex;align-items:center;justify-content:center;width:2.5rem;height:2.5rem;border:1px solid rgba(255,255,255,0.10);background:none;color:#fff;cursor:pointer;transition:border-color 0.3s}
.cart-close:hover{border-color:#DC2626;color:#DC2626}
.cart-items{flex:1;overflow-y:auto;padding:1rem 1.5rem}
.cart-item{display:flex;gap:1rem;padding:1rem 0;border-bottom:1px solid rgba(255,255,255,0.04)}
.cart-item-img{width:64px;height:64px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.06)}
.cart-item-img svg{width:80%;height:80%}
.cart-item-details{flex:1;min-width:0}
.cart-item-name{font-family:'Unbounded',sans-serif;font-size:0.6875rem;font-weight:600;color:#fff;line-height:1.3}
.cart-item-price{margin-top:0.25rem;font-size:0.875rem;font-weight:700;color:#DC2626}
.cart-item-controls{display:flex;align-items:center;gap:0.5rem;margin-top:0.5rem}
.cart-qty-btn{display:flex;align-items:center;justify-content:center;width:24px;height:24px;border:1px solid rgba(255,255,255,0.10);background:none;color:#fff;cursor:pointer;transition:border-color 0.3s}
.cart-qty-btn:hover{border-color:#DC2626;color:#DC2626}
.cart-qty{font-family:'Unbounded',sans-serif;font-size:0.75rem;font-weight:700;min-width:20px;text-align:center}
.cart-item-line{margin-top:0.375rem;font-size:0.75rem;font-weight:600;color:rgba(255,255,255,0.35)}
.cart-remove{display:flex;align-items:center;justify-content:center;width:24px;height:24px;border:none;background:none;color:rgba(255,255,255,0.20);cursor:pointer;transition:color 0.3s;flex-shrink:0}
.cart-remove:hover{color:#DC2626}

.cart-footer{padding:1.5rem;border-top:1px solid rgba(255,255,255,0.06)}
.cart-summary{margin-bottom:1rem}
.cart-summary-row{display:flex;justify-content:space-between;padding:0.375rem 0;font-family:'Unbounded',sans-serif;font-size:0.8125rem;font-weight:600;color:rgba(255,255,255,0.50)}
.free-del{color:#4ADE80 !important}
.cart-summary-total{padding-top:0.75rem;margin-top:0.375rem;border-top:1px solid rgba(255,255,255,0.08);font-size:1rem !important;font-weight:800 !important;color:#fff !important}
.cart-checkout{width:100%;padding:1rem;border:none;border-radius:0;background:#DC2626;font-family:'Unbounded',sans-serif;font-size:0.75rem;font-weight:800;text-transform:uppercase;letter-spacing:0.2em;color:#fff;cursor:pointer;transition:background 0.3s;display:flex;align-items:center;justify-content:center}
.cart-checkout:hover{background:#EF4444}
.cart-free-hint{margin-top:0.75rem;font-size:0.75rem;text-align:center;color:rgba(255,255,255,0.35);font-family:'Unbounded',sans-serif}

.cart-empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:3rem 1.5rem;text-align:center}
.checkout-ok{display:flex;align-items:center;justify-content:center;width:64px;height:64px;border:2px solid rgba(74,222,128,0.30);border-radius:50%;color:#4ADE80;animation:checkPop 0.4s cubic-bezier(0.16,1,0.3,1)}
@keyframes checkPop{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
.cart-empty-text{margin-top:1.5rem;font-family:'Unbounded',sans-serif;font-size:1.125rem;font-weight:700;color:#fff}
.cart-empty-sub{margin-top:0.5rem;font-size:0.875rem;color:rgba(255,255,255,0.35)}
.cart-empty-btn{margin-top:1.5rem;padding:0.75rem 2rem;border:1px solid rgba(220,38,38,0.30);background:rgba(220,38,38,0.08);font-family:'Unbounded',sans-serif;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.14em;color:#DC2626;cursor:pointer;transition:all 0.3s}
.cart-empty-btn:hover{background:#DC2626;color:#fff}

/* Scrollbar */
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:rgba(220,38,38,0.30);border-radius:2px}
`;
