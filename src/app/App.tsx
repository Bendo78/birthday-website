import { Heart, Gift, X, ArrowRight, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

// ── GIFT POPUP IMAGE ──────────────────────────────────────────────
// Replace this URL with your own image link to update the gift popup photo
const GIFT_IMAGE_URL = "https://images.unsplash.com/photo-1518199266247-5301b466f8e9?w=600&h=500&fit=crop&auto=format";

const timelineEntries = [
  {
    date: "June 14, 2019",
    title: "The Day We Met",
    text: "A warm summer evening, a borrowed umbrella, and two strangers who somehow already felt like home to each other.",
    img: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=480&h=360&fit=crop&auto=format",
  },
  {
    date: "December 31, 2019",
    title: "Our First New Year",
    text: "Midnight arrived, fireworks painted the sky, and I realized I wanted every countdown to start with you beside me.",
    img: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=480&h=360&fit=crop&auto=format",
  },
  {
    date: "March 8, 2021",
    title: "Paris in the Rain",
    text: "Cobblestones, café au lait, and you laughing at my terrible French. I fell in love with you all over again.",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=480&h=360&fit=crop&auto=format",
  },
  {
    date: "August 20, 2022",
    title: "The Proposal",
    text: "On the cliff where we watched the sun dip below the horizon, I asked you to be my forever. You said yes before I finished the question.",
    img: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=480&h=360&fit=crop&auto=format",
  },
  {
    date: "Today",
    title: "Your Birthday",
    text: "Another year of you in this world — and in my life. Every single day with you has been a privilege I don't take lightly.",
    img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=480&h=360&fit=crop&auto=format",
  },
];

const galleryImages = [
  { id: "1518199266247-5301b466f8e9", h: 320, alt: "Couple walking in golden light" },
  { id: "1490750967868-88df5691cc8e", h: 260, alt: "Pink roses in bloom" },
  { id: "1519741497674-4f2e867e9427", h: 380, alt: "Romantic candlelight dinner" },
  { id: "1516589091380-5d8f80a6b9d8", h: 290, alt: "Hands intertwined" },
  { id: "1471086569508-084571b0a9d0", h: 340, alt: "Sunset silhouette of couple" },
  { id: "1562887003-7a63e3fef78d", h: 270, alt: "Dried flowers and love letters" },
];

// Each envelope can have ONE or MULTIPLE images — just add more URLs to the imgs array
// Helper: builds a path to a file in public/photos/, working both in local
// dev and once deployed under a GitHub Pages subfolder.
function photo(filename: string) {
  return `${import.meta.env.BASE_URL}photos/${filename}`;
}
const loveNotes = [
  {
    imgs: [
      photo("amelie-1.jpg"), photo("amelie-2.jpg"), photo("amelie-3.jpg"),
      photo("amelie-4.jpg"), photo("amelie-5.jpg"), photo("amelie-6.jpg"),
      photo("amelie-7.jpg"),
    ],
    alt: "De Amélie",
    note: "De Amélie : Depuis le collège, on a partagé tellement de souvenirs et je suis vraiment heureuse de t'avoir dans ma vie. Merci pour tous ces moments, nos rires et cette belle amitié qui dure au fil des années. Je te souhaite tout le bonheur du monde, plein de réussite, d'amour et de beaux projets. Profite bien de ta journée, tu le mérites tellement.",
    rotate: "-2deg",
  },
  {
    imgs: [photo("clarisse-1.jpg"), photo("clarisse-2.jpg")],
    alt: "De Clarisse",
    note: "De Clarisse : Joyeux anniversaire ma beeewlllee ! Tellement contente d'être restée pote avec toi et qu'on continue à se capter de temps en temps malgré nos edt chargés. Trop de souvenirs en soirées dont ton ancien chez toi restera toujours le QG. Un jour faudrait qu'on retourne se bronzer la nouille à Merville, trop bons souvenirs aussi. Gros bisouilles, reste géniale.",
    rotate: "1.5deg",
  },
  {
    imgs: [
      photo("clemence-1.png"), photo("clemence-2.png"),
      photo("clemence-3.png"), photo("clemence-4.png"),
    ],
    alt: "De Clémence",
    note: "De Clémence : Joyeux anniversaire. Tu es une des personnes les plus importantes dans ma vie. J'espère pouvoir finir vieille et aigrie avec toi. Gros bisous, je t'aime.",
    rotate: "-1deg",
  },
  {
    imgs: [
      photo("jihane-1.jpg"), photo("jihane-2.jpg"), photo("jihane-3.jpg"),
      photo("jihane-4.jpg"), photo("jihane-5.jpg"),
    ],
    alt: "De Jihane",
    note: "De Jihane : Lisa, je ne sais pas si tu t'en souviens, mais toi et Noa avez été les premières personnes à qui j'ai adressé la parole au collège. J'arrivais d'une autre ville, je ne connaissais personne, et il faut croire que tu as inspiré confiance à la Jihane d'il y a 11 ans. Le collège n'aura pas vraiment été le temps de la découverte, c'est au lycée qu'on s'est un peu plus rapprochées. Et aujourd'hui je te connais sous plusieurs de tes formes : l'artiste, la game master, choupi, Denis Brogniart (au fait, c'est pour quand l'épreuve des poteaux ?), la fêtarde (merci pour toutes ces soirées), la baroudeuse qui part conquérir le Mexique... et j'en passe. Bref, tout ça pour dire : joyeux anniversaire. Je suis contente d'avoir parlé à la bonne personne ce jour-là.",
    rotate: "1.5deg",
  },
  {
    imgs: [
      photo("leya-1.jpg"), photo("leya-2.jpg"), photo("leya-3.jpg"),
      photo("leya-4.jpg"), photo("leya-5.jpg"), photo("leya-6.jpg"),
    ],
    alt: "De Leya",
    note: "De Leya : Joyeux anniversaire, Lisa 💫 Tu peins la vie si bien qu'elle devrait te verser des droits d'auteur. Que cette année soit aussi pétillante que ton sourire et tes teintures. Continue de briller, d'éblouir sans mesure, mais laisse un peu de talent aux autres… par charité ! ❤️🖤",
    rotate: "-1.5deg",
  },
  {
    imgs: [photo("lisa-1.jpg"), photo("lisa-2.jpg"), photo("lisa-3.jpg")],
    alt: "De Lisa",
    note: "De Lisa : Voir photos.",
    rotate: "1deg",
  },
  {
    imgs: [
      photo("marie-amelie-1.jpg"), photo("marie-amelie-2.jpg"), photo("marie-amelie-3.jpg"),
      photo("marie-amelie-4.jpg"), photo("marie-amelie-5.jpg"), photo("marie-amelie-6.jpg"),
      photo("marie-amelie-7.jpg"), photo("marie-amelie-8.jpg"), photo("marie-amelie-9.jpg"),
    ],
    alt: "De Marie-Amélie",
    note: "De Marie-Amélie : Joyeux anniversaire ma beeewlllee ! Tellement contente d'être restée pote avec toi et qu'on continue à se capter de temps en temps malgré nos edt chargés. Trop de souvenirs en soirées dont ton ancien chez toi restera toujours le QG. Un jour faudrait qu'on retourne se bronzer la nouille à Merville, trop bons souvenirs aussi. Gros bisouilles, reste géniale.",
    rotate: "-2deg",
  },
  {
    imgs: [photo("melissa-1.jpg"), photo("melissa-2.jpg")],
    alt: "De Melissa",
    note: "De Melissa : Voir photos.",
    rotate: "1.5deg",
  },
  {
    imgs: [
      photo("noa-1.jpg"), photo("noa-2.jpg"), photo("noa-3.jpg"),
      photo("noa-4.jpg"), photo("noa-5.jpg"),
    ],
    alt: "De Noa",
    note: "De Noa : Dommage, j'ai pas trouvé de photos récentes et de photos quand on était toutes petites, merci d'être mon amie depuis 15 ans ! Je t'aime, j'espère qu'on aura l'occasion de se voir plus souvent cette année !",
    rotate: "-1deg",
  },
  {
    imgs: [photo("perla-1.png"), photo("perla-2.png"), photo("perla-3.png")],
    alt: "De Perla",
    note: "De Perla : Une grande amie qui t'aime énormément mais toujours en retard, désolée.",
    rotate: "1deg",
  },
  {
    imgs: [
      photo("thib-1.jpg"), photo("thib-2.jpg"), photo("thib-3.jpg"),
      photo("thib-4.jpg"), photo("thib-5.jpg"), photo("thib-6.jpg"),
    ],
    alt: "De Thib",
    note: "De Thib : Ma chère Lisa, je pense que je n'aurais jamais assez de merci à te dire pour te montrer toute ma gratitude. Tu as toujours su être là pour moi dans les meilleurs et dans les pires moments. Dès que je repense à nous 2, j'ai cette soirée chez Perla, notre première rencontre, qui revient, et nous 2 qui dansons toute la soirée alors qu'on se connaissait depuis 2 min ! Je te remercie de m'avoir fait connaître tout ce beau monde que tu as autour de toi, tu as toujours été quelqu'un de très généreuse et je t'en serai éternellement reconnaissant !! Qui l'eût cru à notre première rencontre que 7 ans après on en serait là, main dans la main ! Merci d'être l'amie formidable, douce et gentille que tu es. Pour cela je t'aime fort Lisa et je te souhaite un excellent anniversaire.",
    rotate: "-1.5deg",
  },
];

const TOTAL_PAGES = 4;

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, color: "#9e7575" }}>
      {children}
    </p>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl md:text-6xl text-foreground mb-10" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}>
      {children}
    </h2>
  );
}

// ── PAGE 1: HERO ──────────────────────────────────────────────────
function PageHero({ onNext }: { onNext: () => void }) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "radial-gradient(ellipse at 60% 40%, #fde8e8 0%, #fdf0eb 40%, #fdf6f0 70%, #f5e8e0 100%)" }}
    >
      {[
        { top: "12%", left: "8%", size: 18, opacity: 0.18, delay: "0s" },
        { top: "25%", left: "88%", size: 14, opacity: 0.14, delay: "1.2s" },
        { top: "68%", left: "5%", size: 22, opacity: 0.12, delay: "0.6s" },
        { top: "78%", left: "90%", size: 16, opacity: 0.16, delay: "1.8s" },
        { top: "45%", left: "92%", size: 10, opacity: 0.1, delay: "0.3s" },
        { top: "55%", left: "4%", size: 12, opacity: 0.12, delay: "2.1s" },
      ].map((p, i) => (
        <div key={i} className="absolute pointer-events-none select-none" style={{ top: p.top, left: p.left, opacity: p.opacity, animation: `float 6s ease-in-out ${p.delay} infinite` }}>
          <Heart fill="#c97b84" color="#c97b84" size={p.size} />
        </div>
      ))}

      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <p className="text-sm tracking-[0.25em] uppercase mb-6" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, color: "#9e7575" }}>
          un message d'anniversaire pour toi
        </p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl leading-tight mb-6 text-foreground" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
          Joyeux Anniversaire
          <br />
          <em style={{ fontWeight: 400 }}>mon Amour</em>
        </h1>
        <p className="text-lg md:text-xl italic mb-14 leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", fontWeight: 300, color: "#9e7575" }}>
          Aujourd'hui, le monde entier te célèbre.
        </p>
        <button
          onClick={onNext}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95"
          style={{ background: "linear-gradient(135deg, #c97b84 0%, #d4a0a0 100%)", boxShadow: "0 4px 24px rgba(201,123,132,0.35)", fontFamily: "'Lato', sans-serif" }}
        >
          Commencer notre histoire
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}

// ── PAGE 3: GALLERY ───────────────────────────────────────────────
function PageGallery() {
  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: "linear-gradient(180deg, #fdf6f0 0%, #fde8e8 100%)" }}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <SectionLabel>gravés dans le temps</SectionLabel>
          <SectionHeading>Beaux Souvenirs</SectionHeading>
        </div>
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4">
          {galleryImages.map((img, i) => (
            <div key={i} className="break-inside-avoid mb-4 rounded-2xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer" style={{ background: "#f2e4e1" }}>
              <img src={`https://images.unsplash.com/photo-${img.id}?w=600&h=${img.h}&fit=crop&auto=format`} alt={img.alt} className="w-full block" style={{ height: img.h }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── ENVELOPE CARD ─────────────────────────────────────────────────
// stage: "closed" → click → "preview" (full-screen carousel) → click backdrop → "revealed"
function EnvelopeCard({ imgs, alt, note }: { imgs: string[]; alt: string; note: string }) {
  const [stage, setStage] = useState<"closed" | "preview" | "revealed">("closed");
  const [currentImg, setCurrentImg] = useState(0);

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg(i => (i - 1 + imgs.length) % imgs.length);
  };
  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImg(i => (i + 1) % imgs.length);
  };

  return (
    <>
      {/* ── Full-screen preview overlay ── */}
      {stage === "preview" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(61,43,43,0.65)", backdropFilter: "blur(10px)", animation: "fadeIn 0.3s ease" }}
          onClick={() => setStage("revealed")}
        >
          <div
            style={{ maxWidth: 420, width: "100%", animation: "popIn 0.45s cubic-bezier(0.34,1.4,0.64,1)" }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ background: "#fdf5e4", borderRadius: 12, padding: "1.75rem", boxShadow: "0 24px 80px rgba(100,60,40,0.35)", border: "1px solid rgba(180,140,90,0.2)" }}>
              {/* Hearts */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <Heart size={12} fill="#c97b84" color="#c97b84" style={{ opacity: 0.5 }} />
                <Heart size={18} fill="#c97b84" color="#c97b84" />
                <Heart size={12} fill="#c97b84" color="#c97b84" style={{ opacity: 0.5 }} />
              </div>

              {/* Photo carousel */}
              <div className="relative" style={{ background: "#f2e4e1", borderRadius: 8, overflow: "hidden" }}>
                <img
                  key={currentImg}
                  src={imgs[currentImg]}
                  alt={alt}
                  className="w-full object-cover block"
                  style={{ height: 260, animation: "fadeIn 0.25s ease" }}
                />

                {/* Prev / Next arrows — only shown when more than 1 image */}
                {imgs.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-opacity duration-200"
                      style={{ background: "rgba(253,245,228,0.85)", color: "#c97b84" }}
                    >
                      <ArrowLeft size={16} />
                    </button>
                    <button
                      onClick={next}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center transition-opacity duration-200"
                      style={{ background: "rgba(253,245,228,0.85)", color: "#c97b84" }}
                    >
                      <ArrowRight size={16} />
                    </button>
                  </>
                )}

                {/* Dot indicators */}
                {imgs.length > 1 && (
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                    {imgs.map((_, i) => (
                      <button
                        key={i}
                        onClick={e => { e.stopPropagation(); setCurrentImg(i); }}
                        style={{ width: i === currentImg ? 16 : 6, height: 6, borderRadius: 3, background: i === currentImg ? "#c97b84" : "rgba(255,255,255,0.7)", transition: "all 0.2s ease" }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Counter */}
              {imgs.length > 1 && (
                <p className="text-center mt-2" style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", color: "#9e7575" }}>
                  {currentImg + 1} / {imgs.length}
                </p>
              )}

              {/* Message */}
              <p className="text-center mt-4 leading-relaxed" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.3rem", color: "#5a3e2b", lineHeight: 1.6 }}>
                {note}
              </p>

              {/* Hint */}
              <p className="text-center mt-4" style={{ fontFamily: "'Lato', sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c97b84", opacity: 0.6 }}>
                appuie en dehors pour garder
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── Card in grid ── */}
      <div style={{ width: "100%", maxWidth: 280 }}>
        {stage === "revealed" ? (
          /* Letter sits permanently in place of the envelope */
          <div style={{ background: "#fdf5e4", borderRadius: 10, padding: "1rem", boxShadow: "0 6px 28px rgba(160,120,80,0.18)", border: "1px solid rgba(180,140,90,0.18)", animation: "popIn 0.4s cubic-bezier(0.34,1.2,0.64,1)" }}>
            <div className="flex items-center justify-center mb-3">
              <Heart size={14} fill="#c97b84" color="#c97b84" />
            </div>
            {/* Show first image in revealed state — click to reopen the full-screen photo view */}
            <img
              src={imgs[0]}
              alt={alt}
              onClick={() => setStage("preview")}
              className="w-full object-cover rounded block mb-3 cursor-pointer"
              style={{ height: 150 }}
            />
            {imgs.length > 1 && (
              <p
                onClick={() => setStage("preview")}
                style={{ textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: "0.6rem", letterSpacing: "0.12em", color: "#9e7575", marginBottom: "0.5rem", cursor: "pointer" }}
              >
                +{imgs.length - 1} photo{imgs.length > 2 ? "s" : ""} · voir toutes
              </p>
            )}
            <p className="text-center leading-snug" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.05rem", color: "#5a3e2b" }}>
              {note}
            </p>
          </div>
        ) : (
          /* Closed envelope */
          <div
            onClick={() => setStage("preview")}
            className="relative cursor-pointer select-none w-full"
            style={{ height: 180, borderRadius: 8, background: "#fff8f5", boxShadow: "0 6px 28px rgba(180,130,130,0.22)", border: "1px solid rgba(201,123,132,0.18)" }}
          >
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, width: 0, height: 0, margin: "0 auto", borderLeft: "140px solid transparent", borderRight: "140px solid transparent", borderBottom: "88px solid #f2dde0" }} />
            <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 0, height: 0, borderTop: "90px solid transparent", borderBottom: "90px solid transparent", borderLeft: "140px solid #fde8e8" }} />
            <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 0, height: 0, borderTop: "90px solid transparent", borderBottom: "90px solid transparent", borderRight: "140px solid #fde8e8" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 90, zIndex: 5 }}>
              <div style={{ width: 0, height: 0, borderLeft: "140px solid transparent", borderRight: "140px solid transparent", borderTop: "90px solid #f2d5d8" }} />
            </div>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 6, width: 44, height: 44, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 10px rgba(201,123,132,0.35)" }}>
              <Heart size={22} fill="#c97b84" color="#c97b84" />
            </div>
            {imgs.length > 1 && (
              <div style={{ position: "absolute", top: 8, right: 8, zIndex: 7, background: "#c97b84", color: "white", borderRadius: 99, padding: "1px 7px", fontFamily: "'Lato', sans-serif", fontSize: "0.6rem", fontWeight: 700 }}>
                {imgs.length} photos
              </div>
            )}
            <p style={{ position: "absolute", bottom: 10, left: 0, right: 0, textAlign: "center", fontFamily: "'Lato', sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#c97b84", opacity: 0.65 }}>
              appuie pour ouvrir
            </p>
          </div>
        )}
      </div>
    </>
  );
}

// ── PAGE 4: LOVE NOTES ────────────────────────────────────────────
function PageLoveNotes() {
  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: "#fdf6f0" }}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <SectionLabel>des mots du cœur</SectionLabel>
          <SectionHeading>Petites Lettres</SectionHeading>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 justify-items-center items-end">
          {loveNotes.map((note, i) => (
            <EnvelopeCard key={i} imgs={note.imgs} alt={note.alt} note={note.note} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PAGE 5: LOVE LETTER ───────────────────────────────────────────
function PageLetter({ onOpenGift }: { onOpenGift: () => void }) {
  return (
    <div className="w-full h-full overflow-y-auto" style={{ background: "linear-gradient(180deg, #fdf6f0 0%, #f5ead8 60%, #f0e0c8 100%)" }}>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <SectionLabel>avec tout mon amour</SectionLabel>
          <SectionHeading>Une Lettre Pour Toi</SectionHeading>
        </div>

        <div className="relative mx-auto" style={{ background: "#fdf5e4", boxShadow: "0 8px 48px rgba(160,120,80,0.18), inset 0 1px 0 rgba(255,255,255,0.8)", border: "1px solid rgba(180,140,90,0.18)", padding: "3rem 3.5rem", borderRadius: 4 }}>
          <div className="flex items-center justify-center gap-4 mb-8">
            <div style={{ flex: 1, height: 1, background: "rgba(180,130,100,0.25)" }} />
            <Heart size={20} fill="#c97b84" color="#c97b84" style={{ opacity: 0.7 }} />
            <div style={{ flex: 1, height: 1, background: "rgba(180,130,100,0.25)" }} />
          </div>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, rgba(180,140,100,0.06) 31px, rgba(180,140,100,0.06) 32px)", pointerEvents: "none", borderRadius: 4 }} />
          <div className="relative z-10">
            <p className="mb-2" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.05rem", color: "#7a5c3a" }}>Mon cœur,</p>
            <p className="leading-loose mb-5" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.15rem", color: "#5a3e2b", lineHeight: 1.9 }}>
              Le jour où tu es née, le monde est devenu un endroit plus doux, plus beau — même s'il m'a fallu des années pour te trouver et le comprendre vraiment. Tu portes une chaleur qui rend chaque pièce plus lumineuse, chaque moment ordinaire digne d'être gardé précieusement.
            </p>
            <p className="leading-loose mb-5" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.15rem", color: "#5a3e2b", lineHeight: 1.9 }}>
              Je t'ai vue rire aux larmes pour les choses les plus bêtes, et je suis restée à tes côtés dans tes moments les plus silencieux aussi. Ces deux versions de toi sont mes préférées. Ces deux versions de toi sont la raison pour laquelle je crois en quelque chose comme le destin.
            </p>
            <p className="leading-loose mb-8" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.15rem", color: "#5a3e2b", lineHeight: 1.9 }}>
              Joyeux anniversaire, mon amour. Que cette année t'apporte tout ce que ton beau cœur mérite — et que tu saches toujours à quel point tu es aimée, infiniment, éperdument, joyeusement.
            </p>
            <div className="flex flex-col items-end">
              <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "2rem", color: "#7a5c3a", fontWeight: 700, lineHeight: 1.2 }}>Nassim</p>
              <div style={{ width: 80, height: 2, background: "linear-gradient(90deg, transparent, #c97b84 40%, transparent)", marginTop: 4 }} />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <button
            onClick={onOpenGift}
            className="inline-flex items-center gap-3 px-12 py-5 rounded-full text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            style={{ background: "linear-gradient(135deg, #c97b84 0%, #b56870 100%)", boxShadow: "0 6px 32px rgba(201,123,132,0.4)", fontFamily: "'Lato', sans-serif", fontWeight: 600, fontSize: "1.1rem", letterSpacing: "0.02em", animation: "pulse-glow 2.5s ease-in-out infinite" }}
          >
            <Gift size={20} />
            Ouvre ton cadeau
          </button>
        </div>
      </div>
    </div>
  );
}

// ── GIFT MODAL ────────────────────────────────────────────────────
function GiftModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(61,43,43,0.55)", backdropFilter: "blur(6px)" }} onClick={onClose}>
      <div className="relative w-full max-w-md mx-auto" style={{ background: "#fdf5e4", borderRadius: 12, boxShadow: "0 24px 80px rgba(100,60,40,0.3), inset 0 1px 0 rgba(255,255,255,0.8)", border: "1px solid rgba(180,140,90,0.2)", padding: "2.5rem 2rem 2rem", animation: "popIn 0.35s cubic-bezier(0.34,1.56,0.64,1)" }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200" style={{ background: "rgba(201,123,132,0.12)", color: "#c97b84" }}>
          <X size={16} />
        </button>
        <div className="flex items-center justify-center gap-3 mb-6">
          <Heart size={14} fill="#c97b84" color="#c97b84" style={{ opacity: 0.6 }} />
          <Heart size={20} fill="#c97b84" color="#c97b84" />
          <Heart size={14} fill="#c97b84" color="#c97b84" style={{ opacity: 0.6 }} />
        </div>
        <p className="text-center mb-6 leading-relaxed" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.45rem", color: "#5a3e2b", lineHeight: 1.6 }}>
          pour la plus drôle, gentille, belle, intelligente et aimante madame
        </p>
        <div className="w-full rounded-xl overflow-hidden" style={{ background: "#f2e4e1", minHeight: 220 }}>
          <img src={GIFT_IMAGE_URL} alt="Un cadeau pour toi" className="w-full object-cover block" style={{ maxHeight: 340 }} />
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState(0);
  const [visible, setVisible] = useState(true);
  const [giftOpen, setGiftOpen] = useState(false);

  const goTo = (next: number) => {
    setVisible(false);
    setTimeout(() => {
      setPage(next);
      setVisible(true);
    }, 350);
  };

  const next = () => { if (page < TOTAL_PAGES - 1) goTo(page + 1); };
  const prev = () => { if (page > 0) goTo(page - 1); };

  // Prevent body scroll — we control scroll per section
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const pages = [
    <PageHero onNext={next} />,
    <PageLoveNotes />,
    <PageGallery />,
    <PageLetter onOpenGift={() => setGiftOpen(true)} />,
  ];

  const pageLabels = ["Accueil", "Petites Lettres", "Souvenirs", "La Lettre"];

  return (
    <div className="fixed inset-0 flex flex-col" style={{ fontFamily: "'Lato', sans-serif", background: "#fdf6f0" }}>
      {/* Page content with fade transition */}
      <div
        className="flex-1 overflow-hidden transition-opacity duration-350"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.35s ease" }}
      >
        {pages[page]}
      </div>

      {/* Bottom navigation bar */}
      <div
        className="relative flex-shrink-0 flex items-center justify-between px-6 py-4"
        style={{ background: "rgba(253,246,240,0.92)", backdropFilter: "blur(8px)", borderTop: "1px solid rgba(180,130,130,0.15)" }}
      >
        {/* Back button */}
        <button
          onClick={prev}
          disabled={page === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
          style={{ fontFamily: "'Lato', sans-serif", color: "#9e7575", background: "rgba(201,123,132,0.1)" }}
        >
          <ArrowLeft size={15} />
          Retour
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              title={pageLabels[i]}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === page ? 24 : 8,
                height: 8,
                background: i === page ? "#c97b84" : "rgba(201,123,132,0.3)",
              }}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={next}
          disabled={page === TOTAL_PAGES - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 disabled:opacity-0 disabled:pointer-events-none"
          style={{ fontFamily: "'Lato', sans-serif", color: "#fff8f5", background: "linear-gradient(135deg, #c97b84, #d4a0a0)" }}
        >
          Suivant
          <ArrowRight size={15} />
        </button>
      </div>

      {/* Gift modal */}
      {giftOpen && <GiftModal onClose={() => setGiftOpen(false)} />}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-12px) rotate(5deg); }
          66% { transform: translateY(-6px) rotate(-3deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 6px 32px rgba(201,123,132,0.4); }
          50% { box-shadow: 0 6px 48px rgba(201,123,132,0.65), 0 0 0 6px rgba(201,123,132,0.1); }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
