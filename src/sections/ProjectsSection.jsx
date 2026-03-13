import { Mic, GitBranch, Database, Layers, Zap, ExternalLink, CalendarDays, Server, Cpu } from "lucide-react";
import FadeIn from "../components/FadeIn";
import SectionLabel from "../components/SectionLabel";
import Tag from "../components/Tag";

/* ── Pitch Scout ── */
const PitchScout = () => (
  <div className="project-card overflow-hidden transition-all duration-300 hover:translate-y-[-3px]"
    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "18px", backdropFilter: "blur(4px)" }}>
    <div style={{ height: 2, background: "linear-gradient(90deg, transparent, #6366f1 20%, #a855f7 50%, #ec4899 80%, transparent)" }} />

    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))", border: "1px solid rgba(129,140,248,0.18)" }}>
          <Mic size={22} style={{ color: "#a5b4fc" }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1 cursor-default">
            <h3 className="text-xl sm:text-2xl font-bold text-white glitch-hover transition-colors">Pitch Scout</h3>
            <span className="px-2 py-0.5 rounded-md text-[0.65rem] font-medium uppercase tracking-wider pulse-dot"
              style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.18)", color: "#6ee7b7" }}>
              In Progress
            </span>
          </div>
          <p className="text-sm text-zinc-500 font-medium">AI-Powered Karaoke Song Recommender</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
            style={{ background: "rgba(129,140,248,0.08)", border: "1px solid rgba(129,140,248,0.14)", color: "#a5b4fc" }}>
            <Database size={11} /> バックエンド / ML担当
          </span>
          <span className="text-xs text-zinc-600 mono">2026.02 —</span>
        </div>
      </div>

      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
        声を録音するだけでAIが音域を分析し、自分に合ったカラオケ曲をレコメンドするWebアプリ。
        5人チームで開発。バックエンドの音声処理パイプラインと機械学習モデルを主に担当。
      </p>

      {/* 担当 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch size={13} className="text-zinc-600" />
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">担当・取り組み</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            "Demucsによるボーカル自動分離パイプライン構築",
            "CREPEによるピッチ検出・精度改善",
            "地声/裏声分類MLモデルの設計・学習",
            "FastAPIでのバックエンドAPI設計・実装",
            "音声前処理（変換・サンプリングレート調整）",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-zinc-400 py-1">
              <span style={{ color: "#818cf8", marginTop: 3, flexShrink: 0 }}>▸</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Layers size={13} className="text-zinc-600" />
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">バックエンド技術スタック</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {[
            { layer: "Web API",    tech: "FastAPI 0.115 + uvicorn" },
            { layer: "ピッチ検出", tech: "torchcrepe (CREPE NN)" },
            { layer: "音源分離",   tech: "Demucs htdemucs_6s" },
            { layer: "ノイズ除去", tech: "DeepFilterNet3 + Silero VAD" },
            { layer: "ML判定",     tech: "scikit-learn Random Forest" },
            { layer: "音声処理",   tech: "librosa / torchaudio / ffmpeg" },
            { layer: "DB",         tech: "SQLite（楽曲 ~5000曲）" },
            { layer: "実行環境",   tech: "PyTorch (CUDA / MPS / CPU)" },
          ].map(({ layer, tech }) => (
            <div key={layer} className="flex items-baseline gap-2 text-xs py-0.5">
              <span className="text-zinc-600 flex-shrink-0 w-16">{layer}</span>
              <span className="text-zinc-400 mono">{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pipeline */}
      <div className="mb-6 rounded-xl px-4 py-3" style={{ background: "rgba(129,140,248,0.04)", border: "1px solid rgba(129,140,248,0.10)" }}>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2.5">音声解析パイプライン</p>
        <div className="flex flex-wrap items-center gap-1 text-xs mono" style={{ color: "#71717a" }}>
          {[
            { label: "音声入力",      color: "#818cf8" },
            { label: "ffmpeg変換" },
            { label: "Demucs分離" },
            { label: "DeepFilterNet" },
            { label: "CREPE検出" },
            { label: "ML判定" },
            { label: "楽曲推薦",      color: "#34d399" },
          ].map(({ label, color }, i) => (
            <span key={label} className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded-md text-[0.65rem]"
                style={{ background: color ? `${color}12` : "rgba(255,255,255,0.03)", border: `1px solid ${color ? `${color}20` : "rgba(255,255,255,0.06)"}`, color: color || "#71717a" }}>
                {label}
              </span>
              {i < 6 && <span style={{ color: "#3f3f46" }}>→</span>}
            </span>
          ))}
        </div>
      </div>

      {/* 実装の工夫 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={13} className="text-zinc-600" />
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">実装の工夫</p>
        </div>
        <div className="space-y-2.5">
          {[
            { title: "段階的信頼度フォールバック", desc: "CREPE の信頼度閾値を [0.5→0.01] で段階的に下げ、常に最低 5 フレームを確保。中央値からの音程差に応じて要求信頼度を動的に変化させノイズ混入を防止。" },
            { title: "Hybrid 地声 / 裏声判定",    desc: "Random Forest による ML 判定 + ルールベースフォールバックの 2 層構造。H1-H2差・倍音数・HNR などのスペクトル特徴量でスコアリングし、モデルファイルの mtime を 30 秒スロットリング監視してサーバー再起動なしでホットリロード。" },
            { title: "3 層楽器リーク除去",         desc: "Demucs 分離後の残留楽器を、①孤立裏声フレーム除去（8 フレーム未満）、②RMS フィルタ（地声中央値の 25% 未満を除外）、③Silero VAD（歌声スコア < 0.3 を除外）の 3 層で対策。" },
            { title: "3 層セキュリティ検証",       desc: "拡張子 → MIME Type → マジックバイト（WAV は RIFF+WAVE 二重確認）の 3 層ファイル検証。Content-Length と実測サイズ両方で 50 MB 制限（スプーフィング対策）。" },
          ].map(({ title, desc }) => (
            <div key={title} className="rounded-lg px-3.5 py-3" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
              <p className="text-xs font-semibold text-zinc-300 mb-1">{title}</p>
              <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-6">
        {["Python", "FastAPI", "Demucs", "CREPE", "DeepFilterNet", "scikit-learn", "librosa", "SQLite", "Git/GitHub"].map(t => (
          <Tag key={t} glow>{t}</Tag>
        ))}
      </div>

      <a href="https://pitch-scout.vercel.app/" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3 group" style={{ color: "#34d399" }}>
        <ExternalLink size={15} />
        <span>Live Demo</span>
      </a>
    </div>
  </div>
);

/* ── Smart Schedule ── */
const SmartSchedule = () => (
  <div className="mt-5 project-card overflow-hidden transition-all duration-300 hover:translate-y-[-3px]"
    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "18px", backdropFilter: "blur(4px)" }}>
    <div className="smart-bar" style={{ height: 2 }} />

    <div className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.1))", border: "1px solid rgba(6,182,212,0.18)" }}>
          <CalendarDays size={22} style={{ color: "#67e8f9" }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1 cursor-default">
            <h3 className="text-xl sm:text-2xl font-bold text-white glitch-hover transition-colors">Smart Schedule</h3>
            <span className="px-2 py-0.5 rounded-md text-[0.65rem] font-medium uppercase tracking-wider pulse-dot"
              style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.18)", color: "#67e8f9" }}>
              In Progress
            </span>
          </div>
          <p className="text-sm text-zinc-500 font-medium">AI-Powered Smart Scheduler for Students</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium"
            style={{ background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.14)", color: "#6ee7b7" }}>
            <Server size={11} /> 個人開発
          </span>
          <span className="text-xs text-zinc-600 mono">2026.03 —</span>
        </div>
      </div>

      <p className="text-sm text-zinc-400 leading-relaxed mb-6">
        大学生向けのAIスケジュール管理アプリ。Google OAuth でログインし、Google Classroom の課題を自動取り込み・
        空き時間を検出して Google Calendar に自動スケジュール。スキル診断クイズでバッファ時間を最適化し、
        乗換案内による遅延検知・リスケ提案も実装予定。
      </p>

      {/* Tech Stack */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Layers size={13} className="text-zinc-600" />
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">技術スタック</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
          {[
            { layer: "Frontend", tech: "Next.js 14 App Router" },
            { layer: "言語",     tech: "TypeScript" },
            { layer: "UI",       tech: "Tailwind CSS + shadcn/ui" },
            { layer: "Auth",     tech: "NextAuth.js (Google OAuth)" },
            { layer: "DB",       tech: "Supabase (PostgreSQL + RLS)" },
            { layer: "外部API",  tech: "Calendar / Classroom / Directions" },
            { layer: "PWA",      tech: "Service Worker + オフラインキャッシュ" },
            { layer: "Deploy",   tech: "Vercel" },
          ].map(({ layer, tech }) => (
            <div key={layer} className="flex items-baseline gap-2 text-xs py-0.5">
              <span className="text-zinc-600 flex-shrink-0 w-16">{layer}</span>
              <span className="text-zinc-400 mono">{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Data flow */}
      <div className="mb-6 rounded-xl px-4 py-3" style={{ background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.10)" }}>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2.5">データフロー</p>
        <div className="flex flex-wrap items-center gap-1 text-xs mono" style={{ color: "#71717a" }}>
          {[
            { label: "Google OAuth",  color: "#06b6d4" },
            { label: "Classroom取込" },
            { label: "スキル診断" },
            { label: "空き時間検出" },
            { label: "AI最適化" },
            { label: "Calendar書込",  color: "#34d399" },
          ].map(({ label, color }, i) => (
            <span key={label} className="flex items-center gap-1">
              <span className="px-2 py-0.5 rounded-md text-[0.65rem]"
                style={{ background: color ? `${color}12` : "rgba(255,255,255,0.03)", border: `1px solid ${color ? `${color}20` : "rgba(255,255,255,0.06)"}`, color: color || "#71717a" }}>
                {label}
              </span>
              {i < 5 && <span style={{ color: "#3f3f46" }}>→</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <GitBranch size={13} className="text-zinc-600" />
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">主な機能</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            "Google OAuth + Calendar / Classroom 連携",
            "スキル診断クイズ（30問）でバッファ倍率を自動計算",
            "空き時間検出 → カレンダー自動スケジュール",
            "Google Directions API で通勤ルート・遅延検知",
            "PWA対応・ダークモード・タイムライン表示",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-zinc-400 py-1">
              <span style={{ color: "#06b6d4", marginTop: 3, flexShrink: 0 }}>▸</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 設計の工夫 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={13} className="text-zinc-600" />
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">設計の工夫</p>
        </div>
        <div className="space-y-2.5">
          {[
            { title: "スキル診断によるパーソナライズ", desc: "30問のクイズで集中持続力・先延ばし傾向・作業スピードを数値化。課題カテゴリ別にバッファ倍率（1.0×〜2.5×）を自動算出し、個人差を考慮したスケジュールを生成。" },
            { title: "空き時間検出アルゴリズム",       desc: "Google Calendar API の既存イベントを解析してフリースロットを抽出。課題の優先度・推定所要時間・締切を考慮し、最も適した時間帯へ自動挿入。リスケ時も同アルゴリズムで再配置。" },
            { title: "Supabase RLS でマルチテナント設計", desc: "全テーブルに Row Level Security ポリシーを適用し、user_id フィルタで DB レベルのデータ分離を保証。NextAuth のセッションと Supabase の JWT を連携して認証フローを一元化。" },
            { title: "遅延検知 + 自動リスケ",           desc: "Google Directions API のリアルタイム所要時間と通常所要時間を比較し、遅延を検知。影響を受ける当日のスケジュールを自動で再計算し、プッシュ通知で提案。" },
          ].map(({ title, desc }) => (
            <div key={title} className="rounded-lg px-3.5 py-3" style={{ background: "rgba(6,182,212,0.03)", border: "1px solid rgba(6,182,212,0.08)" }}>
              <p className="text-xs font-semibold text-zinc-300 mb-1">{title}</p>
              <p className="text-xs text-zinc-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {["Next.js 14", "TypeScript", "Supabase", "NextAuth.js", "Tailwind CSS", "shadcn/ui", "Google API", "PWA"].map(t => (
          <span key={t} className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md"
            style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.16)", color: "#67e8f9" }}>
            {t}
          </span>
        ))}
      </div>
    </div>
  </div>
);

/* ── Section ── */
const ProjectsSection = () => (
  <section id="projects" className="py-20 sm:py-28 px-5 sm:px-8">
    <div className="max-w-4xl mx-auto">
      <FadeIn>
        <SectionLabel icon={Cpu} label="PROJECTS" />
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 glitch-hover transition-colors">プロジェクト<span className="cursor-blink text-emerald-400 font-normal">_</span></h2>
        <p className="text-sm text-zinc-600 mb-10">実際に設計・実装したプロダクト</p>
      </FadeIn>
      <FadeIn delay={0.1}><PitchScout /></FadeIn>
      <FadeIn delay={0.2}><SmartSchedule /></FadeIn>
    </div>
  </section>
);

export default ProjectsSection;
