import Head from "next/head";
import { useState, useEffect } from "react";

const SITE_NAME = "Any Downloader";
const SITE_URL = "https://anydownloader.app";
const APP_VERSION = "1.0.0";

const META_TITLE =
  "Any Downloader — Free YouTube, Facebook, Instagram & TikTok Video Downloader";
const META_DESC =
  "Download YouTube, Facebook, Instagram and TikTok videos in HD quality for free. Any Downloader works on macOS, Windows, and Linux. No watermark. No limits. Completely free.";
const META_KEYWORDS =
  "youtube video downloader, facebook video downloader, instagram video downloader, tiktok video downloader, download youtube videos, download facebook videos, download instagram reels, download tiktok without watermark, free video downloader, hd video downloader mac windows linux";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "macOS, Windows, Linux",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: META_DESC,
  url: SITE_URL,
  downloadUrl: `${SITE_URL}/api/download`,
  image: `${SITE_URL}/og-image.png`,
  softwareVersion: APP_VERSION,
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "2847" },
};

// ── Apple SVG icon (apple shape with bite + leaf) ───────────
function AppleIcon({ size = 32, color = "#f1f5f9" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 814 1000" fill={color} xmlns="http://www.w3.org/2000/svg">
      {/* Leaf */}
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105.5-57.9-155.5-127.4C46 790.7 0 663 0 541.8c0-207.5 135.4-317.3 269-317.3 70.1 0 128.4 46.4 172.5 46.4 42.8 0 109.6-49 192.5-49 30.8 0 134.2 2.6 198.3 99z"/>
      {/* Stem/leaf on top */}
      <path d="M549.7 85.5C583 49.1 608.5 0 608.5 0s-4.9 0-7.1.6c-31.4 9.6-79.5 44.5-105.7 77.5-23.3 29.5-44.5 80.2-44.5 128.8 0 4.5.6 9 1.3 11.6 2.6.6 6.5 1.3 10.4 1.3 28.2 0 75.7-37.7 87.4-74.9 3.2-9.7 3.9-14.8 3.9-14.8-9.7-7.2-6.5-44.6-4.5-44.6z"/>
    </svg>
  );
}

// ── Windows SVG icon ─────────────────────────────────────────
function WindowsIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203zm35.67 33.529l.028 34.453L.028 75.48.026 45.7zm4.326-39.025L87.314 0v41.527l-47.318.376zm47.329 39.349l-.011 41.34-47.318-6.678-.066-34.739z" fill="#00adef"/>
    </svg>
  );
}

// ── Linux penguin icon ───────────────────────────────────────
function LinuxIcon({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="24" cy="16" rx="10" ry="13" fill="#f1c40f"/>
      <ellipse cx="24" cy="16" rx="7" ry="10" fill="#2c3e50"/>
      <circle cx="20" cy="13" r="2" fill="#f1f5f9"/>
      <circle cx="28" cy="13" r="2" fill="#f1f5f9"/>
      <circle cx="20.5" cy="13.5" r="1" fill="#2c3e50"/>
      <circle cx="28.5" cy="13.5" r="1" fill="#2c3e50"/>
      <ellipse cx="24" cy="20" rx="4" ry="2" fill="#e67e22"/>
      <rect x="14" y="28" width="20" height="12" rx="4" fill="#f1c40f"/>
      <ellipse cx="24" cy="30" rx="8" ry="6" fill="#f1c40f"/>
      <rect x="10" y="38" width="8" height="6" rx="2" fill="#f1c40f"/>
      <rect x="30" y="38" width="8" height="6" rx="2" fill="#f1c40f"/>
    </svg>
  );
}

// ── All download options ─────────────────────────────────────
const DOWNLOADS = [
  {
    os: "mac",
    label: "macOS",
    sublabel: "Apple Silicon (M1/M2/M3)",
    icon: <AppleIcon size={28} />,
    iconEmoji: "🍎",
    ext: ".dmg",
    meta: "macOS 11+ · arm64",
    href: "/api/download?os=mac-arm64",
  },
  {
    os: "mac-x64",
    label: "macOS",
    sublabel: "Intel Mac",
    icon: <AppleIcon size={28} />,
    iconEmoji: "🍎",
    ext: ".dmg",
    meta: "macOS 11+ · x64",
    href: "/api/download?os=mac-x64",
  },
  {
    os: "windows",
    label: "Windows",
    sublabel: "Windows 10 / 11",
    icon: <WindowsIcon size={28} />,
    iconEmoji: "🪟",
    ext: ".exe",
    meta: "Windows 10+ · x64",
    href: "/api/download?os=windows",
  },
  {
    os: "linux-x64",
    label: "Linux",
    sublabel: "Ubuntu / Debian / Arch",
    icon: <LinuxIcon size={28} />,
    iconEmoji: "🐧",
    ext: ".deb",
    meta: "Linux · x64",
    href: "/api/download?os=linux-x64",
  },
  {
    os: "linux-arm64",
    label: "Linux",
    sublabel: "Ubuntu / Debian / Arch",
    icon: <LinuxIcon size={28} />,
    iconEmoji: "🐧",
    ext: ".deb",
    meta: "Linux · arm64",
    href: "/api/download?os=linux-arm64",
  },
];

function detectOS() {
  if (typeof navigator === "undefined") return "mac";
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod|Android/i.test(ua)) return "mobile";
  if (/Win/i.test(ua)) return "windows";
  if (/Linux/i.test(ua)) return "linux";
  return "mac"; // macOS
}

const faqs = [
  { q: "Is Any Downloader free?", a: "Yes, completely free. Download unlimited videos from YouTube, Facebook, Instagram, and TikTok with no subscription or hidden charges." },
  { q: "How do I download a YouTube video?", a: "Open Any Downloader, paste the YouTube video URL, click Search to load available formats, then click Download next to your preferred quality (4K, 1080p, 720p, MP3, etc.)." },
  { q: "Can I download Facebook videos?", a: "Yes. Any Downloader supports Facebook video download in HD and SD quality. Paste the Facebook video URL and choose your format." },
  { q: "Does it download Instagram Reels and Stories?", a: "Any Downloader can download public Instagram posts, Reels, and IGTV videos. Note: private account content requires authentication cookies." },
  { q: "Can I download TikTok videos without watermark?", a: "Yes! Any Downloader fetches the original TikTok source file, which in many cases is the clean version without the TikTok watermark overlay." },
  { q: "What video qualities are supported?", a: "We support 8K, 4K, 2K, 1080p, 720p, 480p, 360p video formats, as well as MP3 audio extraction — depending on what the source platform provides." },
  { q: "Which OS versions are supported?", a: "macOS 11+, Windows 10/11, and major Linux distros (Ubuntu, Debian, Arch). Both Intel and Apple Silicon Macs are supported." },
  { q: "Is it safe to use?", a: "Any Downloader is an open-source desktop app. All downloads happen locally on your computer — no data is sent to external servers. Your privacy is fully protected." },
];

const features = [
  { icon: "⚡", title: "Lightning Fast", desc: "Downloads start in seconds. Multi-threaded engine grabs video and audio simultaneously for maximum speed." },
  { icon: "🎬", title: "HD & 4K Quality", desc: "Download in the highest quality available — up to 4K UHD. Choose exactly the resolution you want." },
  { icon: "🎵", title: "MP3 Audio Extract", desc: "Extract audio from any video as high-quality MP3. Perfect for podcasts, music, and lectures." },
  { icon: "🚫", title: "No Watermark", desc: "Get clean, original video files without platform watermarks on supported sources like TikTok." },
  { icon: "🔒", title: "100% Private", desc: "All processing happens locally. No account required. No video data ever leaves your computer." },
  { icon: "♾️", title: "Unlimited Downloads", desc: "No daily limits, no queues. Download as many videos as you want, whenever you want." },
];

const platforms = [
  { cls: "yt-card", iconBg: "rgba(255,0,0,0.12)", icon: "▶️", color: "#ff0000", name: "YouTube", desc: "Download any YouTube video in 4K, 1080p, 720p or extract audio as MP3. Supports Shorts, playlists, and live recordings.", tags: ["4K UHD", "1080p", "720p", "MP3", "Shorts"] },
  { cls: "fb-card", iconBg: "rgba(24,119,242,0.12)", icon: "👥", color: "#1877f2", name: "Facebook", desc: "Save Facebook videos, Reels, and Watch content in HD or SD. Works on public posts and pages.", tags: ["HD Video", "SD Video", "Reels", "Watch"] },
  { cls: "ig-card", iconBg: "rgba(225,48,108,0.12)", icon: "📸", color: "#e1306c", name: "Instagram", desc: "Download Instagram posts, Reels, and IGTV in full quality. Save photos and videos from any public profile.", tags: ["Reels", "Posts", "IGTV", "Photos"] },
  { cls: "tt-card", iconBg: "rgba(105,201,208,0.12)", icon: "🎵", color: "#69c9d0", name: "TikTok", desc: "Download TikTok videos without watermark in HD quality. Save your favourite clips with the original audio.", tags: ["No Watermark", "HD", "Audio", "Slides"] },
];

const seoSections = [
  { label: "YouTube Downloader", title: "Download YouTube Videos in Any Quality", paras: ["Any Downloader is the most reliable YouTube video downloader for Windows, Mac, and Linux. Whether you want to save a tutorial in 4K, download a music video in 1080p HD, or extract only the audio as a high-quality MP3 — our app handles it all in a few clicks.", "Unlike browser extensions that break every YouTube update, Any Downloader uses the same robust yt-dlp engine trusted by millions worldwide. It handles age-restricted videos, YouTube Shorts, and even live recordings."], list: ["Download YouTube videos in 4K, 2K, 1080p, 720p, 480p, 360p", "Extract MP3 audio at 128, 192, or 320 kbps", "Download YouTube Shorts with one click", "Save subtitles and metadata"], icon: "▶️", iconLabel: "YouTube • Any Quality", reverse: false },
  { label: "Facebook & Instagram Downloader", title: "Save Facebook & Instagram Videos Instantly", paras: ["Stop struggling with online tools that expire or fail. Any Downloader lets you save Facebook videos, Reels, and Instagram content directly to your computer in seconds — no browser extensions, no watermarks, no hassle.", "From Facebook Watch videos to Instagram Reels going viral, our app detects the best available quality and lets you choose the exact format you need."], list: ["Download Facebook videos in HD and SD", "Save Instagram Reels, posts and IGTV", "Works on public pages and profiles", "Batch download support"], icon: "📱", iconLabel: "Facebook • Instagram", reverse: true },
  { label: "TikTok Downloader", title: "Download TikTok Videos Without Watermark", paras: ["TikTok's built-in save feature adds a watermark that ruins the video quality. Any Downloader fetches the original source file directly — giving you a clean, watermark-free copy in full HD resolution.", "Save your favourite TikTok trends, cooking tutorials, dance videos, and educational content locally on your computer for offline viewing anytime."], list: ["Download TikTok without watermark", "Full HD 1080p quality", "Save TikTok audio separately", "Works with any TikTok video URL"], icon: "🎵", iconLabel: "TikTok • No Watermark", reverse: false },
];

// ── Download card component ───────────────────────────────────
function DownloadCard({ d, isDetected }) {
  return (
    <a
      href={d.href}
      download
      style={{
        display: "flex", alignItems: "center", gap: 16, padding: "18px 22px",
        background: isDetected ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.04)",
        border: isDetected ? "1px solid rgba(124,58,237,0.5)" : "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14, textDecoration: "none", color: "inherit",
        transition: "transform .2s, box-shadow .2s",
        boxShadow: isDetected ? "0 0 30px rgba(124,58,237,0.2)" : "none",
        position: "relative", cursor: "pointer",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
    >
      {/* Detected badge */}
      {isDetected && (
        <span style={{ position: "absolute", top: -10, right: 14, background: "linear-gradient(135deg,#7c3aed,#06b6d4)", color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: 100, letterSpacing: 1, textTransform: "uppercase" }}>
          ✓ Your OS
        </span>
      )}
      <span style={{ fontSize: "2.2rem", lineHeight: 1, display: "flex", alignItems: "center" }}>{d.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: "1rem" }}>
          {d.label} <span style={{ color: "var(--text-muted)", fontWeight: 400, fontSize: "0.85rem" }}>{d.sublabel}</span>
        </div>
        <div style={{ color: "var(--text-muted)", fontSize: "0.78rem", marginTop: 3 }}>{d.meta} · {d.ext}</div>
      </div>
      <div style={{
        display: "flex", alignItems: "center", gap: 6, padding: "8px 18px",
        background: isDetected ? "linear-gradient(135deg,#7c3aed,#06b6d4)" : "rgba(255,255,255,0.08)",
        borderRadius: 8, fontSize: "0.85rem", fontWeight: 700, flexShrink: 0,
        color: isDetected ? "#fff" : "var(--text-muted)",
      }}>
        ⬇ Download
      </div>
    </a>
  );
}

export default function Home() {
  const [faqOpen, setFaqOpen] = useState(null);
  const [detectedOS, setDetectedOS] = useState("mac");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const os = detectOS();
    setDetectedOS(os);
    setIsMobile(os === "mobile");
  }, []);

  // Map detected OS to which download card(s) get highlighted
  const getHighlight = (d) => {
    if (detectedOS === "windows") return d.os === "windows";
    if (detectedOS === "linux") return d.os === "linux-x64" || d.os === "linux-arm64";
    // macOS — highlight arm64 by default (most modern Macs)
    return d.os === "mac" || d.os === "mac-x64";
  };

  // Primary download href for CTA buttons (points to detected OS)
  const primaryHref = detectedOS === "windows"
    ? "/api/download?os=windows"
    : detectedOS === "linux"
    ? "/api/download?os=linux-x64"
    : "/api/download?os=mac-arm64";

  const primaryLabel = detectedOS === "windows"
    ? "Download for Windows — Free"
    : detectedOS === "linux"
    ? "Download for Linux — Free"
    : "Download for macOS — Free";

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{META_TITLE}</title>
        <meta name="description" content={META_DESC} />
        <meta name="keywords" content={META_KEYWORDS} />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:title" content={META_TITLE} />
        <meta property="og:description" content={META_DESC} />
        <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={META_TITLE} />
        <meta name="twitter:description" content={META_DESC} />
        <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      </Head>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="container nav-inner">
          <a href="/" className="nav-logo" style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/favicon.png" alt="Logo" style={{ width: 32, height: 32, borderRadius: 8 }} />
            <span className="gradient-text">Any Downloader</span>
          </a>
          {!isMobile && <a href={primaryHref} download className="nav-btn">Download Free</a>}
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <div className="orb orb1" /><div className="orb orb2" /><div className="orb orb3" />
          <div className="grid-overlay" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge"><span />Free · Open Source · macOS · Windows · Linux</div>
            <h1 className="hero-title">
              Download Any Video<br />
              <span className="gradient-text">From Any Platform</span>
            </h1>
            <p className="hero-sub">
              The most powerful desktop video downloader. Download YouTube, Facebook,
              Instagram and TikTok videos in HD quality — on any operating system.
              No watermarks. No limits. Completely free.
            </p>

            {/* ── Primary CTA (matches detected OS) ── */}
            {!isMobile ? (
              <a href={primaryHref} download className="download-btn">
                <div className="shimmer" />
                <span className="btn-icon">⬇</span>
                {primaryLabel}
              </a>
            ) : (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 14, padding: "18px 28px", color: "#a78bfa", fontWeight: 700 }}>
                📱 Open this page on a desktop to download
              </div>
            )}

            {/* ── ALL download options grid ── */}
            {!isMobile && (
              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12, maxWidth: 560, width: "100%", margin: "32px auto 0" }}>
                {DOWNLOADS.map((d) => (
                  <DownloadCard key={d.os} d={d} isDetected={getHighlight(d)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── PLATFORMS BAR ── */}
      <div className="platforms-bar">
        <div className="container">
          <div className="platforms-bar-inner">
            {[{ label: "YouTube", cls: "yt", icon: "▶" }, { label: "Facebook", cls: "fb", icon: "f" }, { label: "Instagram", cls: "ig", icon: "◈" }, { label: "TikTok", cls: "tt", icon: "♪" }].map((p) => (
              <div key={p.label} className={`platform-chip ${p.cls}`}><strong>{p.icon}</strong> {p.label}</div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PLATFORM CARDS ── */}
      <section className="section">
        <div className="container">
          <div className="text-center">
            <p className="section-label">Supported Platforms</p>
            <h2 className="section-title">One App. Every Platform.</h2>
            <p className="section-sub">Supports the world's biggest video platforms. Paste a link from any of these and start downloading in seconds.</p>
          </div>
          <div className="platform-grid">
            {platforms.map((p) => (
              <div key={p.name} className={`platform-card ${p.cls}`}>
                <div className="platform-icon-wrap" style={{ background: p.iconBg }}><span>{p.icon}</span></div>
                <h3 style={{ color: p.color }}>{p.name} Downloader</h3>
                <p>{p.desc}</p>
                <div className="platform-tags">{p.tags.map((t) => <span key={t} className="tag">{t}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="text-center">
            <p className="section-label">Why Any Downloader</p>
            <h2 className="section-title">Everything You Need</h2>
            <p className="section-sub">Built for speed, quality, and privacy. No browser extensions. No cloud uploads. Just download.</p>
          </div>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="text-center">
            <p className="section-label">How It Works</p>
            <h2 className="section-title">Download in 3 Simple Steps</h2>
          </div>
          <div className="steps">
            {[
              { n: "1", icon: "📋", title: "Paste the URL", desc: "Copy a video link from YouTube, Facebook, Instagram, or TikTok and paste it into Any Downloader." },
              { n: "2", icon: "🔍", title: "Choose Quality", desc: "Click Search to load all available formats. Pick your preferred resolution — 4K, 1080p, 720p, or MP3 audio." },
              { n: "3", icon: "💾", title: "Download", desc: "Click Download and the file is saved directly to your computer. No cloud, no wait, no limits." },
            ].map((s) => (
              <div key={s.n} className="step">
                <div className="step-num">{s.n}</div>
                <div className="step-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO SECTIONS ── */}
      {seoSections.map((s) => (
        <section key={s.label} className="seo-section">
          <div className="container">
            <div className={`seo-inner${s.reverse ? " reverse" : ""}`}>
              <div className="seo-content">
                <p className="section-label">{s.label}</p>
                <h2 className="section-title">{s.title}</h2>
                {s.paras.map((para, i) => <p key={i}>{para}</p>)}
                <ul className="feature-list">{s.list.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div className="seo-visual">
                <div className="big-icon">{s.icon}</div>
                <p>{s.iconLabel}</p>
                {!isMobile && <a href={primaryHref} download className="nav-btn" style={{ marginTop: 8 }}>Download Free</a>}
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── FAQ ── */}
      <section className="section" id="faq">
        <div className="container">
          <div className="text-center">
            <p className="section-label">FAQ</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-sub">Everything you need to know about Any Downloader.</p>
          </div>
          <div className="faq-list">
            {faqs.map((f, i) => (
              <div key={i} className="faq-item">
                <button className="faq-q" onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  {f.q}
                  <span className={`faq-chevron${faqOpen === i ? " open" : ""}`}>▾</span>
                </button>
                <div className={`faq-a${faqOpen === i ? " open" : ""}`}>{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-box">
            <p className="section-label" style={{ textAlign: "center" }}>Get Started Today</p>
            <h2>Start Downloading for Free</h2>
            <p>Join thousands of users who trust Any Downloader to save YouTube, Facebook, Instagram and TikTok videos every day. Available on macOS, Windows, and Linux.</p>
            {!isMobile ? (
              <>
                <a href={primaryHref} download className="download-btn" style={{ marginBottom: 24 }}>
                  <div className="shimmer" /><span className="btn-icon">⬇</span>{primaryLabel}
                </a>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  {DOWNLOADS.map((d) => (
                    <a key={d.os} href={d.href} download style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, textDecoration: "none", color: "var(--text-muted)", fontSize: "0.8rem", fontWeight: 600 }}>
                      {d.iconEmoji} {d.label} {d.sublabel} {d.ext}
                    </a>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ color: "var(--text-muted)", marginTop: 8 }}>Open on a desktop computer to download.</div>
            )}
            <div className="hero-meta" style={{ marginTop: 20 }}>
              <span>Version {APP_VERSION}</span>
              <span>macOS · Windows · Linux</span>
              <span>Free</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="container">
          <div className="footer-inner">
            <div className="footer-logo" style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="/favicon.png" alt="Logo" style={{ width: 28, height: 28, borderRadius: 6 }} />
              <span className="gradient-text">Any Downloader</span>
            </div>
            <div className="footer-platforms">
              <span>YouTube Downloader</span><span>•</span>
              <span>Facebook Video Downloader</span><span>•</span>
              <span>Instagram Downloader</span><span>•</span>
              <span>TikTok Downloader</span>
            </div>
            <div className="footer-links">
              {!isMobile && <a href={primaryHref} download>Download</a>}
              <a href="#faq">FAQ</a>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} Any Downloader. Free &amp; Open Source. macOS · Windows · Linux.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
