/**
 * 技術用語 → 外部リンク マッピング
 * キーが本文テキスト中にマッチすると自動で <a target="_blank"> リンクに変換される。
 *
 * URL の優先順:
 *   1. IT用語辞典 e-Words（https://e-words.jp）
 *   2. 該当ページがない用語は Google 検索へ飛ばす
 */

const g = (q) => `https://www.google.com/search?q=${encodeURIComponent(q)}`;
const ew = (slug) => `https://e-words.jp/w/${slug}.html`;

export const TECH_LINKS = {
  // ── Google APIs ──
  "Google Directions API": g("Google Directions API"),
  "Google Calendar API":   g("Google Calendar API"),
  "Google Classroom":      g("Google Classroom API"),
  "Google Calendar":       g("Google Calendar API"),
  "Google OAuth":          ew("OAuth"),

  // ── AI / Audio ──
  "MelBandRoformers": g("MelBandRoformers 音源分離"),
  "DeepFilterNet3":   g("DeepFilterNet3"),
  "DeepFilterNet":    g("DeepFilterNet"),
  "Silero VAD":       g("Silero VAD"),
  "scikit-learn":     g("scikit-learn"),
  "StandardScaler":   g("scikit-learn StandardScaler"),
  "RandomForest":     ew("ランダムフォレスト"),
  "noisereduce":      g("noisereduce Python"),
  "pyworld":          g("pyworld WORLD vocoder"),

  // ── Frameworks & Libraries ──
  "Tailwind CSS": g("Tailwind CSS"),
  "NextAuth.js":  g("NextAuth.js"),
  "NextAuth":     g("NextAuth.js"),
  "shadcn/ui":    g("shadcn/ui"),
  "FastAPI":      ew("FastAPI"),
  "Next.js":      g("Next.js"),
  "React":        ew("React"),
  "uvicorn":      g("uvicorn"),

  // ── Languages ──
  "TypeScript": ew("TypeScript"),
  "Python":     ew("Python"),
  "MATLAB":     g("MATLAB"),

  // ── Databases & Infrastructure ──
  "Row Level Security": g("PostgreSQL Row Level Security"),
  "PostgreSQL":         ew("PostgreSQL"),
  "Supabase":           g("Supabase"),
  "SQLite":             ew("SQLite"),
  "Vercel":             g("Vercel"),

  // ── Tools ──
  "Arduino":   ew("Arduino"),
  "soundfile": g("python-soundfile"),
  "ffmpeg":    ew("FFmpeg"),
  "numpy":     g("NumPy"),

  // ── Concepts ──
  "PWA":              ew("PWA"),
  "VBA":              ew("VBA"),
  "Service Worker":   ew("サービスワーカー"),
};

/* ── 正規表現を構築（長い用語から優先マッチ） ── */
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const sorted = Object.keys(TECH_LINKS).sort((a, b) => b.length - a.length);
export const techPattern = new RegExp(`(${sorted.map(esc).join("|")})`);
