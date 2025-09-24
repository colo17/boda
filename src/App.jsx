import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ==========================
// Config editable
// ==========================
const SITE_CONFIG = {
  coupleNames: "Flo & Bruno",
  dateLabel: "Sábado 29 de Noviembre de 2025",
  timeLabel: "18:00 hs",
  venueName: "Finca Clara",
  venueAddress: "San Juan 5072, 91001 Gral. Líber Seregni",
  mapsUrl:
    "https://maps.app.goo.gl/sYWUJTQiaP9WhPLr5",
  heroImageUrl: "/images/cicatrica.jpg",
  cityAndCountry: "Canelones, Uruguay",
  primaryColor: "#8b5cf6",
};

const GIFTS = [
  {
    id: "g1",
    title: "Juego de copas de cristal",
    price: 65,
    currency: "USD",
    url: "#",
    image: "/images/copas.jpg",
  },
  {
    id: "g2",
    title: "Set de toallas premium",
    price: 80,
    currency: "USD",
    url: "#",
    image: "/images/toallas.jpg",
  },
  {
    id: "g3",
    title: "Aporte para luna de miel",
    price: 100,
    currency: "USD",
    url: "#",
    image: "/images/cica1.jpg",
  },
  {
    id: "g4",
    title: "Juego de copas de cristal",
    price: 65,
    currency: "USD",
    url: "#",
    image: "/images/copas.jpg",
  },
  {
    id: "g5",
    title: "Set de toallas premium",
    price: 80,
    currency: "USD",
    url: "#",
    image: "/images/toallas.jpg",
  },
  {
    id: "g6",
    title: "Aporte para luna de miel",
    price: 100,
    currency: "USD",
    url: "#",
    image: "/images/cica2.jpg",
  },
];

const ACCOUNTS = [
  {
    bank: "BROU",
    holder: "Florencia Scarabino",
    currency: "UYU",
    accountType: "Caja de Ahorro",
    accountNumber: "000123456-7",
    aliasOrIBAN: "UY00 0000 0001 2345 6700",
    notes: "Referencia: 'Regalo Boda Flo & Bruno'",
  },
  {
    bank: "Santander",
    holder: "Bruno Cicatiello",
    currency: "USD",
    accountType: "Cuenta",
    accountNumber: "001-987654-3",
    aliasOrIBAN: "UY00 0001 0987 6543 0000",
    notes: "Referencia: 'Regalo Boda Flo & Bruno'",
  },
];

// ==========================
// Utils + Supabase
// ==========================
function classNames(...xs) {
  return xs.filter(Boolean).join(" ");
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase =
  supabaseUrl && supabaseAnon
    ? createClient(supabaseUrl, supabaseAnon)
    : null;

function usePrimaryColor(hex) {
  const css = useMemo(
    () => `
:root { --primary: ${hex}; --primary-600: ${hex}; }
`,
    [hex]
  );
  useEffect(() => {
    const style = document.createElement("style");
    style.setAttribute("data-wedding-styles", "");
    style.innerHTML = css;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, [css]);
}

// ==========================
// UI
// ==========================
function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-sm border-b border-black/10">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        {/* Nombre de la pareja */}
        <a href="#inicio" className="font-semibold tracking-wide">
          {SITE_CONFIG.coupleNames}
        </a>

        {/* Menú */}
        <div className="hidden md:flex gap-6 text-sm">
          <a href="#inicio" className="hover:opacity-80">
            Inicio
          </a>
          <a href="#regalos" className="hover:opacity-80">
            Regalos
          </a>
          <a href="#depositos" className="hover:opacity-80">
            Depósitos
          </a>
        </div>

        {/* Botón ubicación */}
        <a
          href={SITE_CONFIG.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="text-white px-3 py-2 rounded-xl shadow-sm"
          style={{ backgroundColor: "var(--primary)" }}
        >
          Ver ubicación
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="inicio"
      className="relative pt-16 sm:pt-0 scroll-mt-24"
    >
      {/* móvil: 100vh + padding arriba/abajo, desktop: pantalla completa */}
      <div className="relative h-[100vh] sm:h-screen flex items-center justify-center px-4 py-10 sm:py-0">
        <img
          src={SITE_CONFIG.heroImageUrl}
          alt="Foto de los novios"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 🔽 antes: bg-black/30 —> ahora más suave para que el vidrio destaque */}
        <div className="absolute inset-0 bg-black/15" />

        {/* tarjeta */}
        <div className="relative z-10 w-full mx-auto max-w-lg sm:max-w-3xl">
          {/* 🔽 vidrio: fallback compatible (bg-white bg-opacity-20) + blur + borde */}
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 shadow-xl border border-white/30 text-center text-white">
            <p className="uppercase tracking-[0.2em] text-xs sm:text-sm text-white/80 mb-1 sm:mb-2">
              ¡Nos casamos!
            </p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold leading-tight drop-shadow">
              {SITE_CONFIG.coupleNames}
            </h1>
            <p className="mt-2 sm:mt-3 text-base sm:text-xl md:text-2xl text-white/90 drop-shadow">
              {SITE_CONFIG.dateLabel} · {SITE_CONFIG.timeLabel}
            </p>

            {/* mobile = venueName, desktop = cityAndCountry */}
            <p className="text-white/85 text-sm sm:text-base drop-shadow">
              <span className="sm:hidden">{SITE_CONFIG.venueName}</span>
              <span className="hidden sm:inline">{SITE_CONFIG.cityAndCountry}</span>
            </p>

            <div className="mt-3 sm:mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span className="hidden sm:inline-flex items-center gap-2 text-sm px-3 py-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
                {/* icono */}
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.25c-4.97 0-9 3.89-9 8.687 0 2.615 1.282 5.039 3.516 6.79L12 21.75l5.484-3.99c2.234-1.75 3.516-4.174 3.516-6.79 0-4.797-4.03-8.687-9-8.687Z"/>
                </svg>
                {SITE_CONFIG.venueName}
              </span>
              <a
                href={SITE_CONFIG.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs sm:text-sm underline underline-offset-4 hover:opacity-90"
              >
                {SITE_CONFIG.venueAddress}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GiftCard({ gift, reserved, reservedInfo, onToggle }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
      {/* Bloque de imagen: ALTURA FIJA */}
      <div className="relative w-full h-60 overflow-hidden bg-gray-50 shrink-0">
        <img
          src={gift.image}
          alt={gift.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Contenido */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="font-semibold text-lg">{gift.title}</h3>
        <p className="text-black/60 text-sm">
          {gift.currency} {gift.price}
        </p>

        <div className="mt-auto pt-3 flex gap-2">
          <a
            href={gift.url}
            target="_blank"
            rel="noreferrer"
            className="px-3 py-2 rounded-xl text-sm border border-black/10 hover:bg-black/5"
          >
            Ver referencia
          </a>

          <button
            onClick={onToggle}
            className={classNames(
              "px-3 py-2 rounded-xl text-sm text-white",
              reserved ? "opacity-80" : ""
            )}
            style={{ backgroundColor: "var(--primary)" }}
          >
            {reserved ? "Cancelar Reserva" : "Reservar"}
          </button>
        </div>

        {reserved && reservedInfo && (
          <p className="mt-2 text-xs text-black/60">
            Reservado por <strong>{reservedInfo.reserved_by || "Invitado"}</strong>
            {reservedInfo.note ? ` — “${reservedInfo.note}”` : ""}
          </p>
        )}
      </div>

      {reserved && (
        <div className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-medium bg-white text-green-600 border border-green-500 shadow">
    ✅ Reservado
        </div>
      )}
    </div>
  );
}

function Gifts() {
  const [reservations, setReservations] = useState({}); // { [giftId]: { reserved_by, note, created_at } }
  const [loading, setLoading] = useState(false);

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [activeGift, setActiveGift] = useState(null);
  const [guestName, setGuestName] = useState("");
  const [guestNote, setGuestNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Desbloqueo
  const [releasingId, setReleasingId] = useState(null);

  // Cargar reservas + realtime
  useEffect(() => {
    if (!supabase) return;

    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("reservations")
        .select("gift_id, reserved_by, note, created_at");
      if (!error && data) {
        const map = {};
        data.forEach((r) => {
          map[r.gift_id] = {
            reserved_by: r.reserved_by,
            note: r.note,
            created_at: r.created_at,
          };
        });
        setReservations(map);
      }
      setLoading(false);
    })();

    const channel = supabase
      .channel("reservations")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reservations" },
        (payload) => {
          if (payload.eventType === "INSERT" || payload.eventType === "UPDATE") {
            const r = payload.new;
            setReservations((prev) => ({
              ...prev,
              [r.gift_id]: {
                reserved_by: r.reserved_by,
                note: r.note,
                created_at: r.created_at,
              },
            }));
          } else if (payload.eventType === "DELETE") {
            const r = payload.old;
            setReservations((prev) => {
              const clone = { ...prev };
              delete clone[r.gift_id];
              return clone;
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const onReserveClick = (gift) => {
    if (!supabase) {
      setReservations((prev) => ({
        ...prev,
        [gift.id]: {
          reserved_by: "Invitado",
          note: "",
          created_at: new Date().toISOString(),
        },
      }));
      return;
    }
    setActiveGift(gift);
    setGuestName("");
    setGuestNote("");
    setModalOpen(true);
  };

  const confirmReserve = async () => {
    if (!activeGift) return;
    setSubmitting(true);
    try {
      const payload = {
        gift_id: activeGift.id,
        reserved_by: guestName.trim() || "Invitado",
        note: guestNote.trim() || null,
      };

      const { error } = await supabase.from("reservations").upsert(payload);
      if (error) throw error;

      // Update optimista
      setReservations((prev) => ({
        ...prev,
        [activeGift.id]: {
          reserved_by: payload.reserved_by,
          note: payload.note,
          created_at: new Date().toISOString(),
        },
      }));

      setModalOpen(false);
      setActiveGift(null);
    } catch (e) {
      console.error("SUPABASE UPSERT ERROR", e);
      alert(`No se pudo guardar la reserva: ${e.message || e}`);
    } finally {
      setSubmitting(false);
    }
  };

  const releaseGift = async (giftId) => {
    const ok = confirm("¿Seguro que querés liberar este regalo?");
    if (!ok) return;

    setReleasingId(giftId);

    // Optimista
    const prev = reservations[giftId];
    setReservations((cur) => {
      const clone = { ...cur };
      delete clone[giftId];
      return clone;
    });

    try {
      const { error } = await supabase
        .from("reservations")
        .delete()
        .eq("gift_id", giftId);

      if (error) {
        // revertir
        setReservations((cur) => ({ ...cur, [giftId]: prev }));
        alert(`No se pudo liberar: ${error.message}`);
      }
    } finally {
      setReleasingId(null);
    }
  };

  const shareMessage = encodeURIComponent(
    `Te compartimos nuestra lista de regalos: ${window.location.href}\n¡Gracias por acompañarnos!`
  );

  return (
    <section
      id="regalos"
      className="scroll-mt-24 py-16 md:py-24 bg-gradient-to-b from-white to-black/[0.02]"
    >
      <div className="mx-auto max-w-6xl px-4">

        {/* ENCABEZADO: móvil apilado; desktop como estaba */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            {/* Título + texto */}
            <div className="text-center sm:text-left">
              <h2 className="text-2xl md:text-3xl font-bold">Regalos</h2>
              <p className="text-black/60 mt-2">
                Elegí uno para obsequiarnos.{" "}
                {supabase
                  ? "Las reservas se sincronizan para todos en tiempo real."
                  : "*(Modo sin servidor: las reservas solo se guardan en este navegador)*"}
              </p>
              {loading && (
                <p className="text-sm text-black/60 mt-1">Cargando reservas…</p>
              )}

              {/* Botones SOLO debajo en móvil */}
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:hidden">
                <a
                  href={`https://wa.me/?text=${shareMessage}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl text-sm border border-black/10 hover:bg-black/5"
                >
                  Compartir por WhatsApp
                </a>
                <a
                  href={`mailto:?subject=Lista%20de%20regalos&body=${shareMessage}`}
                  className="px-3 py-2 rounded-xl text-sm border border-black/10 hover:bg-black/5"
                >
                  Compartir por Email
                </a>
              </div>
            </div>

            {/* Botones a la derecha en desktop (igual que antes) */}
            <div className="hidden sm:flex gap-2">
              <a
                href={`https://wa.me/?text=${shareMessage}`}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl text-sm border border-black/10 hover:bg-black/5"
              >
                Compartir por WhatsApp
              </a>
              <a
                href={`mailto:?subject=Lista%20de%20regalos&body=${shareMessage}`}
                className="px-3 py-2 rounded-xl text-sm border border-black/10 hover:bg-black/5"
              >
                Compartir por Email
              </a>
            </div>
          </div>
        </div>

        {/* Grilla de tarjetas usando GiftCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GIFTS.map((gift) => {
            const r = reservations[gift.id];
            const isReserved = !!r;
            return (
              <GiftCard
                key={gift.id}
                gift={gift}
                reserved={isReserved}
                reservedInfo={r}
                onToggle={() =>
                  isReserved ? releaseGift(gift.id) : onReserveClick(gift)
                }
              />
            );
          })}
        </div>
      </div>

      {/* Modal de reserva */}
      <ReservationModal
        open={modalOpen}
        gift={activeGift}
        name={guestName}
        note={guestNote}
        setName={setGuestName}
        setNote={setGuestNote}
        submitting={submitting}
        onCancel={() => setModalOpen(false)}
        onConfirm={confirmReserve}
      />
    </section>
  );
}

function ReservationModal({ open, gift, name, note, setName, setNote, onCancel, onConfirm, submitting }) {
  if (!open || !gift) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-black/10 p-5">
        <h3 className="text-lg font-semibold">Reservar: {gift.title}</h3>
        <p className="text-sm text-black/60 mt-1">Dejanos tu nombre y un mensajito (opcional).</p>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-sm font-medium">Tu nombre</label>
            <input
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Ej: Juan / Familia Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Mensaje (opcional)</label>
            <textarea
              className="mt-1 w-full rounded-xl border border-black/15 px-3 py-2 outline-none focus:ring-2 focus:ring-black/10"
              rows={3}
              placeholder="Con mucho cariño para ustedes…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-2 rounded-xl text-sm border border-black/10 hover:bg-black/5">
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={submitting || !name.trim()}
            className="px-3 py-2 rounded-xl text-sm text-white disabled:opacity-60"
            style={{ backgroundColor: "var(--primary)" }}
          >
            {submitting ? "Guardando..." : "Confirmar reserva"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AccountRow({ a }) {
  const [copied, setCopied] = useState(false);

  const toCopy = `${a.bank} · ${a.accountType} (${a.currency})
Titular: ${a.holder}
Cuenta: ${a.accountNumber}
IBAN/Alias: ${a.aliasOrIBAN || "-"}
${a.notes || ""}`.trim();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(toCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // vuelve a "Copiar datos" después de 2s
  };

  return (
    <div className="rounded-2xl border border-black/10 p-4 bg-white flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div>
        <p className="font-semibold">
          {a.bank} · {a.accountType} ({a.currency})
        </p>
        <p className="text-sm text-black/70">Titular: {a.holder}</p>
        <p className="text-sm text-black/70">Cuenta: {a.accountNumber}</p>
        {a.aliasOrIBAN && (
          <p className="text-sm text-black/70">IBAN/Alias: {a.aliasOrIBAN}</p>
        )}
        {a.notes && <p className="text-xs text-black/50 mt-1">{a.notes}</p>}
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleCopy}
          className={`px-3 py-2 rounded-xl text-sm border transition ${
            copied
              ? "bg-green-500 text-white border-green-600"
              : "border-black/10 hover:bg-black/5"
          }`}
        >
          {copied ? "Copiado ✅" : "Copiar datos"}
        </button>
      </div>
    </div>
  );
}

function Deposits() {
  return (
    <section id="depositos" className="scroll-mt-24 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">
          Depósitos / Transferencias
        </h2>
        <div className="space-y-4">
          {ACCOUNTS.map((a, i) => (
            <AccountRow key={i} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-black/5 py-10 bg-white">
      <div className="mx-auto max-w-6xl px-4 text-sm text-black/60 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-center md:text-left">
          Con cariño, {SITE_CONFIG.coupleNames}. · {SITE_CONFIG.dateLabel} · {SITE_CONFIG.timeLabel}
          <br />
          {SITE_CONFIG.venueName} · {SITE_CONFIG.cityAndCountry}
        </p>
        <a href="#inicio" className="underline underline-offset-4">
          Volver arriba
        </a>
      </div>
    </footer>
  );
}

export default function WeddingSite() {
  usePrimaryColor(SITE_CONFIG.primaryColor);

  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-[system-ui]">
      <Nav />
      <Hero />
      <Gifts />
      <Deposits />
      <Footer />
    </div>
  );
}