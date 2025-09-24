import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

// ==========================
// Config editable
// ==========================
const SITE_CONFIG = {
  coupleNames: "Agus & Nico",
  dateLabel: "Sábado 27 de diciembre de 2025",
  timeLabel: "19:30 hs",
  venueName: "Estancia La Magnolia",
  venueAddress: "Camino de los Molinos s/n, Canelones",
  mapsUrl:
    "https://maps.google.com/?q=Estancia%20La%20Magnolia%20Camino%20de%20los%20Molinos",
  heroImageUrl:
    "https://images.unsplash.com/photo-1496439786094-e697ca3584f2?q=80&w=2068&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1527960471264-932f39eb5840?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "g2",
    title: "Set de toallas premium",
    price: 80,
    currency: "USD",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1603178456212-4059e416c4d1?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: "g3",
    title: "Aporte para luna de miel",
    price: 100,
    currency: "USD",
    url: "#",
    image:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=2070&auto=format&fit=crop",
  },
];

const ACCOUNTS = [
  {
    bank: "BROU",
    holder: "Agustina Perez",
    currency: "UYU",
    accountType: "Caja de Ahorro",
    accountNumber: "000123456-7",
    aliasOrIBAN: "UY00 0000 0001 2345 6700",
    notes: "Referencia: 'Regalo Boda Agus & Nico'",
  },
  {
    bank: "Santander",
    holder: "Nicolas Gomez",
    currency: "USD",
    accountType: "Cuenta",
    accountNumber: "001-987654-3",
    aliasOrIBAN: "UY00 0001 0987 6543 0000",
    notes: "Muchas gracias por su regalo",
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
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-white/70 border-b border-black/5">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-4 py-3">
        <a href="#inicio" className="font-semibold tracking-wide">
          {SITE_CONFIG.coupleNames}
        </a>
        <div className="hidden md:flex gap-6 text-sm">
          <a href="#regalos" className="hover:opacity-80">
            Regalos
          </a>
          <a href="#depositos" className="hover:opacity-80">
            Depósitos
          </a>
        </div>
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
    <section id="inicio" className="relative pt-20">
      <div className="absolute inset-0 -z-10">
        <img
          src={SITE_CONFIG.heroImageUrl}
          alt="Foto de los novios"
          className="h-[70vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white to-white/20" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="bg-white/80 backdrop-blur rounded-3xl p-6 md:p-10 shadow-lg border border-black/5">
          <p className="uppercase tracking-[0.2em] text-xs md:text-sm text-black/60 mb-2">
            ¡Nos casamos!
          </p>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {SITE_CONFIG.coupleNames}
          </h1>
          <p className="mt-3 text-lg md:text-xl text-black/70">
            {SITE_CONFIG.dateLabel} · {SITE_CONFIG.timeLabel}
          </p>
          <p className="text-black/70">{SITE_CONFIG.cityAndCountry}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 text-sm px-3 py-2 rounded-full bg-black/5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M12 2.25c-4.97 0-9 3.89-9 8.687 0 2.615 1.282 5.039 3.516 6.79L12 21.75l5.484-3.99c2.234-1.75 3.516-4.174 3.516-6.79 0-4.797-4.03-8.687-9-8.687Z" />
              </svg>
              {SITE_CONFIG.venueName}
            </span>
            <a
              href={SITE_CONFIG.mapsUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm underline underline-offset-4 hover:opacity-80"
            >
              {SITE_CONFIG.venueAddress}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function GiftCard({ gift, reserved, onToggle }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={gift.image}
          alt={gift.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{gift.title}</h3>
        <p className="text-black/60 text-sm">
          {gift.currency} {gift.price}
        </p>
        <div className="mt-3 flex gap-2">
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
            {reserved ? "Reservado" : "Quiero regalar este"}
          </button>
        </div>
      </div>
      {reserved && (
        <div className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs bg-white/90 border border-black/5 shadow">
          ✅ Reservado
        </div>
      )}
    </div>
  );
}

function Gifts() {
  const [reservations, setReservations] = useState({}); // { [giftId]: { reserved_by, note, created_at } }
  const [loading, setLoading] = useState(false);

  // Estado del modal
  const [modalOpen, setModalOpen] = useState(false);
  const [activeGift, setActiveGift] = useState(null);
  const [guestName, setGuestName] = useState("");
  const [guestNote, setGuestNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Cargar reservas existentes + suscripción en tiempo real
  useEffect(() => {
    if (!supabase) return; // si no configuraste .env, funciona en modo local sin tiempo real

    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("reservations")
        .select("gift_id, reserved_by, note, created_at");
      if (!error && data) {
        const map = {};
        data.forEach((r) => {
          map[r.gift_id] = { reserved_by: r.reserved_by, note: r.note, created_at: r.created_at };
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
              [r.gift_id]: { reserved_by: r.reserved_by, note: r.note, created_at: r.created_at },
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

  // CLICK reservar -> abre modal (si hay Supabase). En modo sin servidor, marca localmente.
  const onReserveClick = (gift) => {
    if (!supabase) {
      setReservations((prev) => ({
        ...prev,
        [gift.id]: { reserved_by: "Invitado", note: "", created_at: new Date().toISOString() },
      }));
      return;
    }
    setActiveGift(gift);
    setGuestName("");
    setGuestNote("");
    setModalOpen(true);
  };

  // Confirmar reserva (guarda en Supabase)
  const confirmReserve = async () => {
  if (!activeGift) return;
  setSubmitting(true);
  try {
    const payload = {
      gift_id: activeGift.id,
      reserved_by: guestName.trim() || "Invitado",
      note: guestNote.trim() || null,
    };

    // Guarda en Supabase
    const { error } = await supabase.from("reservations").upsert(payload);
    if (error) throw error;

    // ✅ Update optimista en UI (no esperamos realtime)
    setReservations(prev => ({
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

  // Liberar un regalo (borra la fila)
 const [releasingId, setReleasingId] = useState(null); // opcional: para deshabilitar botón

const releaseGift = async (giftId) => {
  const ok = confirm("¿Seguro que querés liberar este regalo?");
  if (!ok) return;

  // 🔒 deshabilitar botón mientras libera (opcional)
  setReleasingId(giftId);

  // ✅ update optimista: quitamos del estado primero
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
      // ❌ revertir si falla
      setReservations((cur) => ({ ...cur, [giftId]: prev }));
      alert(`No se pudo liberar: ${error.message}`);
    } else {
      // (Opcional) refetch puntual como “seguro”
      // await supabase.from("reservations").select("gift_id").eq("gift_id", giftId).single();
      // si vuelve 404, ya está liberado; no hace falta tocar el estado
    }
  } finally {
    setReleasingId(null);
  }
};

  const shareMessage = encodeURIComponent(
    `Te compartimos nuestra lista de regalos: ${window.location.href}\n¡Gracias por acompañarnos!`
  );

  return (
    <section id="regalos" className="scroll-mt-24 py-16 md:py-24 bg-gradient-to-b from-white to-black/[0.02]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Regalos</h2>
            <p className="text-black/60">
              Elegí uno para obsequiarnos.{" "}
              {supabase
                ? "Las reservas se sincronizan para todos en tiempo real."
                : "*(Modo sin servidor: las reservas solo se guardan en este navegador)*"}
            </p>
            {loading && <p className="text-sm text-black/60 mt-1">Cargando reservas…</p>}
          </div>
          <div className="flex gap-2">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GIFTS.map((gift) => {
            const r = reservations[gift.id];
            const isReserved = !!r;
            return (
              <div key={gift.id} className="group relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img src={gift.image} alt={gift.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{gift.title}</h3>
                  <p className="text-black/60 text-sm">
                    {gift.currency} {gift.price}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <a
                      href={gift.url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2 rounded-xl text-sm border border-black/10 hover:bg-black/5"
                    >
                      Ver referencia
                    </a>
                    
                    {isReserved ? (
                      <button
                        onClick={() => releaseGift(gift.id)}
                        className="px-3 py-2 rounded-xl text-sm text-white"
                        style={{ backgroundColor: "var(--primary)" }}
                      >
                        Cancelar Reserva
                      </button>
                    ) : (
                      <button
                        onClick={() => onReserveClick(gift)}
                        className="px-3 py-2 rounded-xl text-sm text-white"
                        style={{ backgroundColor: "var(--primary)" }}
                      >
                        Reservar
                      </button>
                    )}
                  </div>

                  {isReserved && (
                    <p className="text-xs text-black/60 mt-2">
                      Reservado por <strong>{r.reserved_by || "Invitado"}</strong>
                      {r.note ? ` — “${r.note}”` : ""}
                    </p>
                  )}
                </div>

                {isReserved && (
                  <div className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs bg-white/90 border border-black/5 shadow">
                    ✅ Reservado
                  </div>
                )}
              </div>
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
  const toCopy = `${a.bank} · ${a.accountType} (${a.currency})
Titular: ${a.holder}
Cuenta: ${a.accountNumber}
IBAN/Alias: ${a.aliasOrIBAN || "-"}
${a.notes || ""}`.trim();
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
          onClick={() => navigator.clipboard.writeText(toCopy)}
          className="px-3 py-2 rounded-xl text-sm border border-black/10 hover:bg-black/5"
        >
          Copiar datos
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
        <p>
          Con cariño, {SITE_CONFIG.coupleNames}. · {SITE_CONFIG.dateLabel}
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