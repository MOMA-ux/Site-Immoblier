import { Award, ShieldCheck, HeartHandshake, PhoneCall, Mail, Star, Flame } from 'lucide-react';
import { TEAM_MEMBERS, STATS, VALUES } from '../data';

interface AboutProps {
  onPageChange: (page: string) => void;
}

export default function About({ onPageChange }: AboutProps) {
  return (
    <div id="about-page" className="space-y-24 pb-8">
      {/* 1. AGENT HERO / TITLE BANNER */}
      <section id="about-hero" className="relative pt-32 pb-16 bg-slate-950 overflow-hidden">
        {/* Background photo of luxury office lobby */}
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1920&q=80"
            alt="Elite Office lobby background"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-950" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full text-amber-400 text-[10px] tracking-widest uppercase font-semibold">
            <span>Histoire d'Excellence</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Notre Maison Immobilier d'Exception
          </h1>
          <p className="text-sm sm:text-base text-slate-350 max-w-2xl mx-auto leading-relaxed">
            Fondée sous le signe de l'architecture d'avant-garde et de l'écoute absolue, Elite Immo incarne le luxe immobilier intemporel.
          </p>
        </div>
      </section>

      {/* 2. CORPORATE CORE FOCUS & STATS */}
      <section id="about-stats" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left presentation photo panel */}
        <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
            alt="Luxury Architect Villa Exterior"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {/* Subtle logo inside img frame */}
          <div className="absolute bottom-6 left-6 bg-slate-950/80 px-4 py-3 rounded-xl border border-white/10 flex items-center space-x-2">
            <span className="text-amber-400 font-serif font-bold text-sm">EI</span>
            <span className="text-xs text-white uppercase tracking-wider font-semibold">Cercle Elite Immo 2026</span>
          </div>
        </div>

        {/* Right company overview & list */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold font-mono">
            À propos d'Elite Immo
          </span>
          <h2 className="text-3xl font-serif text-white leading-snug">
            La clé de voûte de vos décisions patrimoniales
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Depuis notre origine Avenue Montaigne à Paris, l’excellence guide chacun de nos actes. Que vous fassiez l'acquisition d'un penthouse confidentiel à Monaco, d'une piscine miroir à Saint-Tropez ou d'un domaine viticole séculaire en Aquitaine, nous garantissons un traitement unique :
          </p>

          <ul className="space-y-4 text-xs font-medium text-slate-300">
            <li className="flex items-center space-x-3.5">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Plus d'un milliard d'euros d'actifs d'exception négociés confidentiellement.</span>
            </li>
            <li className="flex items-center space-x-3.5">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <span>Conformité juridique, expertise en ingénierie fiscale et SCI sur-mesure.</span>
            </li>
            <li className="flex items-center space-x-3.5">
              <HeartHandshake className="w-5 h-5 text-amber-500" />
              <span>Conseils de réhabilitation par des architectes d'excellence.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 3. CORE VALUES SECTION */}
      <section id="about-values" className="bg-slate-900/40 border-t border-b border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-widest text-text text-amber-500 font-semibold">
              Nos Piliers de Charte
            </span>
            <h2 className="text-3xl font-serif text-white">Une déontologie de confiance absolue</h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Chaque transaction d'élite repose sur le respect scrupuleux de nos valeurs cardinales d'éthique et de rigueur métrique.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {VALUES.map((val, idx) => (
              <div
                key={idx}
                className="bg-slate-900 border border-white/5 p-8 rounded-2xl space-y-4 hover:border-amber-500/20 transition-all text-left"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
                <h4 className="text-base text-white font-medium">{val.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TEAM MEMBERS BIOGRAPHIES */}
      <section id="about-team" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-widest text-amber-500 font-semibold">
            Conseillers d'élite
          </span>
          <h2 className="text-3xl font-serif text-white">L'Excellence humaine au service du client</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Diplômés de grands établissements, nos courtiers ont une fine connaissance des problématiques fiscales et juridiques internationales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="bg-slate-920 border border-white/5 rounded-2xl overflow-hidden group hover:border-amber-500/20 transition-all text-left flex flex-col justify-between"
            >
              {/* Profile Picture Frame */}
              <div className="relative aspect-square bg-slate-800 overflow-hidden">
                <img
                  src={member.image}
                  referrerPolicy="no-referrer"
                  alt={`${member.name} Portrait`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
              </div>

              {/* Technical description */}
              <div className="p-6 space-y-5">
                <div className="space-y-1">
                  <h4 className="text-lg font-semibold text-white">{member.name}</h4>
                  <p className="text-xs text-amber-400 tracking-wider uppercase font-semibold">{member.role}</p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-slate-400 font-mono">
                  <div className="flex items-center space-x-2.5">
                    <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                    <span>{member.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2.5">
                    <Mail className="w-3.5 h-3.5 text-amber-500" />
                    <span>{member.email}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. GORGEOUS CALL TO ACTION FOR ADVISING */}
      <section id="about-cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-xl mx-auto space-y-4">
            <h3 className="text-2xl font-serif text-white">Prêt à acquérir l'inestimable ?</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-normal">
              Nos consultants chevronnés sont mobiles dans toute la France sous 24h ouvrées et reçoivent dans nos bureaux d'affaires d'une discrétion absolue.
            </p>
            <div className="pt-3">
              <button
                id="btn-about-cta"
                onClick={() => onPageChange('contact')}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 text-xs font-bold uppercase tracking-widest transition"
              >
                Prendre rendez-vous confidentiel
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
