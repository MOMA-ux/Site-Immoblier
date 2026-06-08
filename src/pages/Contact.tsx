import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ShieldAlert, Landmark, ZoomIn, Map } from 'lucide-react';

export default function Contact() {
  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Acquisition immobilière');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Map settings
  const [mapZoom, setMapZoom] = useState(15);
  const [mapType, setMapType] = useState('satellite'); // satellite, standard

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (fullName.trim() && email.trim() && phone.trim() && message.trim()) {
      setSubmitted(true);
      // Reset form fields
      setFullName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 6000);
    }
  };

  return (
    <div id="contact-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16Client">
      {/* 1. PAGE HEADER */}
      <div className="space-y-3 text-left">
        <div className="text-xs uppercase tracking-widest text-amber-500 font-semibold">
          Prendre Contact confidentiel
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
          Entrer en Relation Privée
        </h1>
        <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
          Que ce soit pour expertiser votre actif, mandater notre agence de recherche ou simplement visiter l’une de nos propriétés exclusives, nos agents d’affaires sont à votre entière disposition.
        </p>
      </div>

      {/* 2. CORE DIVISION GRID: CONTACT LAYOUT & DETAILS VS FORM CARDS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Column Left (4/12 width on desktop): Details, details, coordinates briefs */}
        <div className="lg:col-span-5 space-y-8 text-left">
          {/* Agency details panel */}
          <div className="bg-slate-900 border border-white/5 p-8 rounded-2xl space-y-6">
            <h3 className="text-lg font-serif text-white font-semibold">Elite Immo Paris</h3>
            <p className="text-xs text-slate-450 leading-relaxed font-normal">
              Notre siège social d'exception vous reçoit uniquement sur rendez-vous au sein du triangle d'or parisien, garantissant discrétion absolue et confort confidentiel d'affaires.
            </p>

            <div className="space-y-4 pt-4 border-t border-white/5 text-xs text-slate-300">
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  42 Avenue Montaigne,<br />
                  75008 Paris, France
                </span>
              </div>

              <div className="flex items-center space-x-3.5">
                <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="font-mono">+33 1 45 67 89 10</span>
              </div>

              <div className="flex items-center space-x-3.5">
                <Mail className="w-5 h-5 text-amber-500 shrink-0" />
                <span className="font-mono">contact@elite-immo.fr</span>
              </div>

              <div className="flex items-start space-x-3.5">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Lundi au Vendredi • 09:00 - 19:30<br />
                  Samedi (Sur-rendez-vous) • 10:00 - 17:00
                </span>
              </div>
            </div>
          </div>

          {/* Secure disclaimer guidelines */}
          <div className="bg-slate-900/40 border border-yellow-500/15 p-6 rounded-2xl flex items-start space-x-4">
            <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-1" />
            <div className="space-y-1">
              <h5 className="text-xs font-semibold text-white">Chiffrement & Discrétion</h5>
              <p className="text-[11px] text-slate-450 leading-relaxed font-normal">
                Conformément à la déontologie professionnelle d'Elite Immo, les coordonnées saisies sur nos formulaires font l'objet d'un archivage isolé chiffré et ne seront jamais partagées avec des tiers.
              </p>
            </div>
          </div>
        </div>

        {/* Column Right (7/12 width on desktop): High-end Contact Form Card */}
        <div className="lg:col-span-7 bg-slate-900 rounded-3xl border border-white/10 p-6 sm:p-10 space-y-6 shadow-2xl">
          <div className="space-y-1.5 text-left">
            <h3 className="text-xl font-serif text-white font-semibold">Formulaire Confidentiel d'Affaires</h3>
            <p className="text-xs text-slate-400 font-normal">Transmettez vos besoins d'investissements, réponse rapide garantie.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name input */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium">Nom & Prénom</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Christian Dior"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium">Adresse Courriel</label>
                <input
                  type="email"
                  required
                  placeholder="Ex: client@couronne.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium">Téléphone portable</label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: +33 6 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors font-mono"
                />
              </div>

              {/* Select Subject area */}
              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-medium">Sujet de Relation d'Affaires</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="Acquisition immobilière">Acquisition immobilière d'exception</option>
                  <option value="Mandat de vente exclusive">Mandat de vente exclusive (Céder un actif)</option>
                  <option value="Recherche confidentielle sur-mesure">Recherche confidentielle (Off-market)</option>
                  <option value="Expertise ou Evaluation de Bien">Expertise ou évaluation sous 48h</option>
                </select>
              </div>
            </div>

            {/* Message input area */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-300 font-medium">Saisissez les spécités de votre projet d'affaires</label>
              <textarea
                rows={5}
                required
                placeholder="Exprimez ici la nature de votre recherche (Région, surface minimale, budget prévisionnel de vos projets immobiliers...)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-amber-500 resize-none font-sans"
              />
            </div>

            {/* Submit progress indicators states */}
            {submitted ? (
              <div id="contact-page-success" className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-center">
                <p className="text-xs text-emerald-400 font-semibold animate-pulse">
                  Demande transmise avec succès. Cabinet d'évaluation sollicité. Un courtier d'élite prend contact avec vous incessamment.
                </p>
              </div>
            ) : (
              <button
                id="btn-contact-page-submit"
                type="submit"
                className="w-full flex items-center justify-center space-x-2.5 py-4 bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md hover:shadow-amber-500/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer le Message d'Affention</span>
              </button>
            )}
          </form>
        </div>
      </div>

      {/* 3. HEADQUARTES INTERACTIVE GEOLOCATION MAP MOCKUP */}
      <section id="agency-headquarters-map" className="space-y-6 pt-4 border-t border-white/5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1 text-left">
            <h3 className="text-2xl font-serif text-white tracking-tight">Rendez-vous à notre Cabinet</h3>
            <p className="text-xs text-slate-400">42 Avenue Montaigne, 75008 Paris - Quartier Champs-Élysées</p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <button
              id="btn-agency-map-satellite"
              onClick={() => setMapType('satellite')}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                mapType === 'satellite'
                  ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                  : 'bg-slate-900 text-slate-300 border-white/10'
              }`}
            >
              Satellite Map
            </button>
            <button
              id="btn-agency-map-road"
              onClick={() => setMapType('standard')}
              className={`px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                mapType === 'standard'
                  ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                  : 'bg-slate-900 text-slate-300 border-white/10'
              }`}
            >
              Standard Map
            </button>
          </div>
        </div>

        {/* Elegant Black-themed maps embedding with controls */}
        <div className="w-full rounded-2xl border border-white/10 overflow-hidden relative shadow-lg aspect-[21/9] min-h-[350px] bg-slate-950">
          <div className="absolute inset-0 z-0">
            <img
              src={
                mapType === 'satellite'
                  ? 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400'
                  : 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400'
              }
              referrerPolicy="no-referrer"
              alt="Hq Map ground grid"
              className="w-full h-full object-cover opacity-20 filter saturate-50 blur-xs"
            />
            <div className="absolute inset-0 bg-slate-950/75" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            {/* Pulsing ring pinpointer */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-amber-500/20 animate-ping" />
              <div className="relative w-12 h-12 rounded-full bg-slate-900/90 border border-amber-500 flex items-center justify-center text-amber-400 font-serif font-bold pointer-events-none shadow-2xl">
                <Landmark className="w-6 h-6 text-amber-550 animate-bounce" />
              </div>
            </div>

            <div className="mt-4 bg-slate-900/95 border border-white/10 px-5 py-3 rounded-2xl text-center shadow-2xl backdrop-blur-md max-w-sm">
              <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400 font-mono">Elite Immo Headquarters</h4>
              <p className="text-[11px] text-white mt-1">42 Avenue Montaigne, 75008 Paris</p>
              <p className="text-[9px] text-slate-500">Coordonnées GPS d'excellence : 48.8694° N, 2.3022° E</p>
            </div>
          </div>

          {/* Scale detail indicators map overlays */}
          <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 border border-white/5 px-3 py-1.5 rounded-lg text-[9px] font-mono text-slate-400">
            ECHELLE APPROX: 50m / GRID
          </div>

          {/* Zoom controls map overlays */}
          <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1">
            <button
              id="btn-agency-zoomin"
              onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 text-white font-mono font-bold flex items-center justify-center hover:bg-slate-800"
            >
              +
            </button>
            <button
              id="btn-agency-zoomout"
              onClick={() => setMapZoom(prev => Math.max(prev - 1, 10))}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-white/10 text-white font-mono font-bold flex items-center justify-center hover:bg-slate-800"
            >
              -
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
