import { useState, useEffect, useRef, useCallback } from "react";

// ============================================================
// DATA — Destinations mock
// ============================================================
const destinations = [
  {
    id: "paris-1889",
    nom: "Paris 1889",
    epoque: "Exposition Universelle",
    accroche: "Assistez à l'inauguration de la Tour Eiffel et vivez l'effervescence d'une ville en pleine révolution culturelle.",
    description: "Plongez au cœur de l'Exposition Universelle de 1889. Paris vibre d'innovation : la Tour Eiffel vient d'être achevée, les Impressionnistes redéfinissent l'art, et les cafés de Montmartre bouillonnent de créativité. Une destination idéale pour les amoureux de culture, d'architecture et de gastronomie.",
    niveauRisque: "Faible",
    dureeRecommandee: "3 jours",
    tags: ["Culture", "Famille", "Risque faible"],
    categorie: ["Culture", "Famille", "Risque faible"],
    image: "🗼",
    couleur: "#C8A87C",
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    incontournables: [
      { titre: "Tour Eiffel — Inauguration", desc: "Montez au sommet de la tour fraîchement construite et admirez Paris sous un angle inédit." },
      { titre: "Galerie des Machines", desc: "Découvrez les prouesses technologiques de l'ère industrielle dans ce hall monumental." },
      { titre: "Montmartre & les Impressionnistes", desc: "Rencontrez Toulouse-Lautrec et flânez dans les ateliers du Moulin de la Galette." }
    ],
    itineraire: [
      { jour: "Jour 1", titre: "Arrivée & Exposition", activites: "Accueil au Champ-de-Mars. Visite de la Tour Eiffel et de la Galerie des Machines. Dîner au Café de la Paix." },
      { jour: "Jour 2", titre: "Art & Culture", activites: "Montmartre le matin. Déjeuner dans un bistrot d'époque. Atelier peinture avec un impressionniste l'après-midi." },
      { jour: "Jour 3", titre: "La Belle Époque", activites: "Croisière sur la Seine. Shopping aux Grands Magasins. Soirée cabaret au Moulin Rouge." }
    ],
    precautions: [
      "Vaccination recommandée : variole (fournie avant départ)",
      "Vêtements d'époque obligatoires (inclus dans le pack)",
      "Ne pas mentionner les événements futurs aux locaux",
      "Évitez les quartiers périphériques après la tombée de la nuit"
    ],
    aEviter: "Ne tentez pas de modifier la construction de la Tour Eiffel ou d'interférer avec les exposants. Toute tentative de perturbation temporelle entraîne un rapatriement immédiat.",
    temoignages: [
      { nom: "Marie D.", note: 5, texte: "Incroyable ! Voir la Tour Eiffel toute neuve, c'est une émotion indescriptible. L'équipe était aux petits soins." },
      { nom: "Thomas R.", note: 4, texte: "Le dîner au Café de la Paix était magique. Seul bémol : les odeurs de Paris en 1889 sont… authentiques." }
    ]
  },
  {
    id: "cretace",
    nom: "Crétacé",
    epoque: "L'Âge des Dinosaures",
    accroche: "Observez les créatures les plus majestueuses ayant jamais foulé la Terre — à distance de sécurité.",
    description: "Remontez 68 millions d'années dans le passé pour observer des dinosaures dans leur habitat naturel. Depuis notre base d'observation sécurisée, admirez les Tyrannosaures, Tricératops et Ptéranodons dans les plaines du Crétacé supérieur. Réservé aux aventuriers courageux.",
    niveauRisque: "Élevé",
    dureeRecommandee: "2 jours",
    tags: ["Aventure", "Risque élevé"],
    categorie: ["Aventure", "Risque élevé"],
    image: "🦖",
    couleur: "#6B8F71",
    gradient: "linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 50%, #1a3c2a 100%)",
    incontournables: [
      { titre: "Observation T-Rex", desc: "Depuis le mirador blindé, observez le plus grand prédateur terrestre dans son environnement naturel." },
      { titre: "Vol avec les Ptéranodons", desc: "Survolez les plaines préhistoriques en nacelle protégée, escorté par des reptiles volants." },
      { titre: "Forêt de Fougères Géantes", desc: "Randonnée accompagnée dans une végétation luxuriante qui n'existe plus depuis des millions d'années." }
    ],
    itineraire: [
      { jour: "Jour 1", titre: "Installation & Exploration", activites: "Arrivée à la base sécurisée. Briefing sécurité. Première sortie d'observation en véhicule blindé. Campement haute-sécurité." },
      { jour: "Jour 2", titre: "Aventure Préhistorique", activites: "Survol en nacelle. Randonnée dans la forêt de fougères. Observation nocturne depuis le mirador. Retour." }
    ],
    precautions: [
      "Combinaison de protection obligatoire en permanence",
      "Ne JAMAIS quitter le périmètre sécurisé sans guide",
      "Aucun prélèvement de faune ou de flore autorisé",
      "Antidotes contre venins préhistoriques fournis",
      "Déconseillé aux moins de 12 ans et aux femmes enceintes"
    ],
    aEviter: "Ne vous approchez JAMAIS d'un nid de dinosaure. Ne touchez aucun animal, même apparemment docile. Le moindre changement écologique peut avoir des conséquences incalculables.",
    temoignages: [
      { nom: "Lucas M.", note: 5, texte: "Le moment où le T-Rex est passé à 20 mètres de notre véhicule… j'en ai encore des frissons. Expérience unique au monde." },
      { nom: "Sophie L.", note: 4, texte: "Le vol en nacelle est à couper le souffle. Par contre, préparez-vous mentalement, c'est intense !" }
    ]
  },
  {
    id: "florence-1504",
    nom: "Florence 1504",
    epoque: "Atelier de la Renaissance",
    accroche: "Entrez dans l'atelier de Michel-Ange et assistez à la naissance du David.",
    description: "Florence, berceau de la Renaissance italienne. En 1504, Michel-Ange achève son David, Léonard de Vinci perfectionne ses inventions, et les Médicis façonnent une ville qui deviendra le centre du monde artistique. Parfait pour les passionnés d'art, d'histoire et d'artisanat.",
    niveauRisque: "Modéré",
    dureeRecommandee: "3 jours",
    tags: ["Culture", "Aventure", "Famille"],
    categorie: ["Culture", "Aventure", "Famille"],
    image: "🏛️",
    couleur: "#C2956B",
    gradient: "linear-gradient(135deg, #2e1a1a 0%, #4a2d2d 50%, #3c2a1a 100%)",
    incontournables: [
      { titre: "Atelier de Michel-Ange", desc: "Observez le maître au travail sur les dernières finitions du David, la sculpture la plus célèbre au monde." },
      { titre: "Bottega de Léonard", desc: "Visitez l'atelier de Vinci et découvrez ses carnets de croquis et machines volantes en personne." },
      { titre: "Palazzo Medici", desc: "Assistez à un banquet chez les Médicis et découvrez les intrigues politiques de la Renaissance." }
    ],
    itineraire: [
      { jour: "Jour 1", titre: "Art & Génie", activites: "Accueil à Florence. Visite de l'atelier de Michel-Ange. Déjeuner toscan traditionnel. Promenade sur le Ponte Vecchio." },
      { jour: "Jour 2", titre: "Science & Invention", activites: "Visite de l'atelier de Léonard de Vinci. Atelier de dessin anatomique. Dîner dans une taverne florentine." },
      { jour: "Jour 3", titre: "Pouvoir & Splendeur", activites: "Réception au Palazzo Medici. Visite du Duomo. Cérémonie de dévoilement d'une œuvre. Retour." }
    ],
    precautions: [
      "Connaissances de base en italien recommandées (traducteur fourni)",
      "Vêtements d'époque obligatoires (inclus)",
      "Attention aux rivalités entre familles florentines",
      "Ne pas révéler la valeur future des œuvres d'art"
    ],
    aEviter: "N'essayez pas de ramener des œuvres d'art ou des esquisses originales. Ne mentionnez pas les futures guerres d'Italie aux Médicis. Toute interférence politique est strictement interdite.",
    temoignages: [
      { nom: "Claire B.", note: 5, texte: "Voir Michel-Ange travailler sur le David en vrai… j'en ai pleuré. C'est le plus beau voyage de ma vie." },
      { nom: "Antoine G.", note: 5, texte: "La bottega de Vinci est fascinante. Ses carnets sont encore plus impressionnants en vrai qu'en photo." }
    ]
  }
];

// ============================================================
// DATA — FAQ
// ============================================================
const faqData = [
  { q: "Le voyage dans le temps est-il sûr ?", r: "Chaque voyage est encadré par notre protocole de sécurité temporelle certifié. Nos guides sont formés pour toute éventualité. Le taux d'incident est inférieur à 0,01%." },
  { q: "Puis-je modifier le cours de l'histoire ?", r: "Non. Nos voyageurs sont équipés de dispositifs de non-interférence. Toute tentative de modification temporelle déclenche un rapatriement automatique. C'est notre règle n°1." },
  { q: "Quel voyage recommandez-vous pour une famille ?", r: "Paris 1889 est notre destination la plus adaptée aux familles. Risque faible, activités variées et ambiance festive. Florence 1504 convient aussi aux enfants de plus de 10 ans." },
  { q: "Que faut-il prévoir pour le Crétacé ?", r: "Une bonne condition physique et un mental d'acier ! La combinaison de protection et tous les antidotes sont fournis. Déconseillé aux moins de 12 ans." },
  { q: "Combien de temps dure un voyage ?", r: "Nos voyages durent de 2 à 3 jours selon la destination. Le temps s'écoule normalement : 1 jour dans le passé = 1 jour dans le présent." },
  { q: "Puis-je personnaliser mon itinéraire ?", r: "Absolument ! Notre agent IA peut adapter chaque voyage selon vos centres d'intérêt, votre budget et votre tolérance au risque. Utilisez le chat pour obtenir des recommandations personnalisées." },
  { q: "Que se passe-t-il en cas d'urgence ?", r: "Chaque voyageur porte un bracelet de rapatriement d'urgence. Une simple pression déclenche le retour immédiat. Notre équipe de crise est disponible 24h/24 dans toutes les époques." },
  { q: "Les recommandations de l'agent sont-elles fiables ?", r: "Notre agent IA se base sur les données officielles de chaque destination et les retours de nos voyageurs. Il ne peut pas inventer d'informations. En cas de doute, consultez notre FAQ ou contactez un conseiller humain." },
  { q: "Quels modes de paiement acceptez-vous ?", r: "Nous acceptons les principaux moyens de paiement : carte bancaire, virement, et chrono-crédits. Le paiement en 3x sans frais est disponible pour les voyages Premium." },
  { q: "Puis-je annuler mon voyage ?", r: "Annulation gratuite jusqu'à 48h avant le départ temporel. Au-delà, des frais de 30% s'appliquent. Consultez nos conditions générales pour plus de détails." }
];

// ============================================================
// DATA — Chat responses
// ============================================================
const chatResponses = {
  salutations: [
    "Bonjour ! Je suis votre agent temporel. Comment puis-je vous aider aujourd'hui ? 🕰️",
    "Bienvenue chez TimeTravel Agency ! Je suis là pour vous guider dans le choix de votre prochaine aventure temporelle."
  ],
  recommandation_questions: [
    "Pour vous recommander la destination idéale, j'ai besoin d'en savoir plus. Qu'est-ce qui vous attire le plus ?\n\n• La culture et l'art\n• L'aventure et les sensations\n• La découverte en famille",
    "Et concernant le risque, quel est votre niveau de confort ?\n\n• Je préfère la sécurité absolue\n• Un peu de frisson, pourquoi pas\n• Plus c'est intense, mieux c'est !"
  ],
  hors_perimetre: "Je suis spécialisé dans les voyages temporels proposés par TimeTravel Agency. Pour cette question, je vous invite à consulter notre FAQ ou contacter un conseiller humain. Puis-je vous aider avec nos destinations ?",
  defaut: "Je peux vous aider à choisir une destination, personnaliser votre voyage ou répondre à vos questions sur nos services. Que souhaitez-vous savoir ?"
};

// ============================================================
// ICONS (inline SVG components)
// ============================================================
const Icons = {
  Clock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Shield: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Star: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Send: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Chat: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  X: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  ChevDown: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  ChevRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  MapPin: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Check: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  AlertTriangle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  ArrowLeft: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>,
  Sparkle: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/></svg>,
};

// ============================================================
// CHAT SERVICE
// ============================================================
class ChatService {
  constructor() {
    this.conversationState = { step: 0, interests: null, risk: null, currentDestination: null };
  }

  setContext(destId) {
    this.conversationState.currentDestination = destId;
  }

  sendMessage(userMsg) {
    const msg = userMsg.toLowerCase().trim();

    if (msg.match(/bonjour|salut|hello|hey|coucou/)) {
      return { text: chatResponses.salutations[Math.floor(Math.random() * chatResponses.salutations.length)], actions: [] };
    }

    if (msg.match(/recommand|conseil|suggest|quel.*voyage|quelle.*destination|aide.*choisir/)) {
      this.conversationState.step = 1;
      return { text: chatResponses.recommandation_questions[0], actions: [], awaitingResponse: true };
    }

    if (this.conversationState.step === 1) {
      if (msg.match(/culture|art/)) this.conversationState.interests = "culture";
      else if (msg.match(/aventure|sensation|frisson/)) this.conversationState.interests = "aventure";
      else if (msg.match(/famille|enfant/)) this.conversationState.interests = "famille";
      else this.conversationState.interests = "culture";
      this.conversationState.step = 2;
      return { text: chatResponses.recommandation_questions[1], actions: [], awaitingResponse: true };
    }

    if (this.conversationState.step === 2) {
      let rec;
      if (msg.match(/sécurité|sûr|tranquille|peur/)) {
        rec = destinations[0];
        this.conversationState.risk = "low";
      } else if (msg.match(/intense|extrême|max/)) {
        rec = destinations[1];
        this.conversationState.risk = "high";
      } else if (this.conversationState.interests === "aventure") {
        rec = destinations[1];
      } else if (this.conversationState.interests === "famille") {
        rec = destinations[0];
      } else {
        rec = destinations[2];
      }
      this.conversationState.step = 0;
      return {
        text: `D'après vos préférences, je vous recommande **${rec.nom} — ${rec.epoque}** !\n\n${rec.accroche}\n\nNiveau de risque : ${rec.niveauRisque} · Durée : ${rec.dureeRecommandee}`,
        actions: [
          { label: "Voir la destination", type: "navigate", value: `/destinations/${rec.id}` },
          { label: "Planifier ce voyage", type: "navigate", value: `/planifier?dest=${rec.id}` }
        ]
      };
    }

    if (this.conversationState.currentDestination) {
      const dest = destinations.find(d => d.id === this.conversationState.currentDestination);
      if (dest) {
        if (msg.match(/risque|danger|sécurité|sûr/)) {
          return { text: `Pour ${dest.nom}, le niveau de risque est **${dest.niveauRisque}**.\n\nPrécautions principales :\n${dest.precautions.map(p => `• ${p}`).join('\n')}`, actions: [] };
        }
        if (msg.match(/itinéraire|programme|jour/)) {
          return { text: `Voici l'itinéraire recommandé pour ${dest.nom} :\n\n${dest.itineraire.map(j => `**${j.jour} — ${j.titre}**\n${j.activites}`).join('\n\n')}`, actions: [{ label: "Planifier ce voyage", type: "navigate", value: `/planifier?dest=${dest.id}` }] };
        }
        if (msg.match(/avis|témoignage|retour/)) {
          return { text: `Voici les retours de nos voyageurs pour ${dest.nom} :\n\n${dest.temoignages.map(t => `⭐ ${t.nom} (${t.note}/5) : « ${t.texte} »`).join('\n\n')}`, actions: [] };
        }
        return { text: `Je suis votre guide pour ${dest.nom} — ${dest.epoque}. Je peux vous renseigner sur :\n\n• L'itinéraire et les activités\n• Le niveau de risque et les précautions\n• Les avis de nos voyageurs\n\nQue souhaitez-vous savoir ?`, actions: [] };
      }
    }

    for (const faq of faqData) {
      const keywords = faq.q.toLowerCase().split(/\s+/).filter(w => w.length > 4);
      const matchCount = keywords.filter(k => msg.includes(k)).length;
      if (matchCount >= 2) {
        return { text: faq.r, actions: [] };
      }
    }

    if (msg.match(/famille|enfant|kid/)) {
      return { text: "Pour un voyage en famille, je recommande Paris 1889 ! Risque faible, ambiance festive et activités pour tous les âges. Florence 1504 convient aussi aux enfants de plus de 10 ans.", actions: [{ label: "Voir Paris 1889", type: "navigate", value: "/destinations/paris-1889" }] };
    }

    if (msg.match(/dinosaure|crétacé|t-rex|trex/)) {
      return { text: "Le Crétacé est notre destination la plus intense ! Observation de T-Rex, vol en nacelle au-dessus des plaines préhistoriques… Attention, le niveau de risque est élevé. Déconseillé aux moins de 12 ans.", actions: [{ label: "Voir le Crétacé", type: "navigate", value: "/destinations/cretace" }] };
    }

    if (msg.match(/prix|coût|tarif|budget|payer|cher/)) {
      return { text: "Nos tarifs varient selon la destination et le pack choisi. Utilisez notre planificateur pour obtenir une estimation personnalisée ! Paiement en 3x sans frais disponible.", actions: [{ label: "Ouvrir le planificateur", type: "navigate", value: "/planifier" }] };
    }

    if (msg.match(/merci|super|génial|parfait|cool/)) {
      return { text: "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. Bon voyage dans le temps ! 🕰️", actions: [] };
    }

    return { text: chatResponses.defaut, actions: [
      { label: "Voir les destinations", type: "navigate", value: "/destinations" },
      { label: "Consulter la FAQ", type: "navigate", value: "/faq" }
    ]};
  }
}

const chatService = new ChatService();

// ============================================================
// STYLES
// ============================================================
const baseStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=Outfit:wght@300;400;500;600;700&display=swap');

  :root {
    --midnight: #0a0b14;
    --deep: #10111f;
    --surface: #171829;
    --surface2: #1e2035;
    --border: #2a2c45;
    --text: #e8e6f0;
    --text-dim: #9896aa;
    --gold: #d4a853;
    --gold-light: #e8c97a;
    --gold-dim: #9c7b3a;
    --accent: #6366f1;
    --accent-light: #818cf8;
    --danger: #ef4444;
    --success: #22c55e;
    --font-display: 'Cormorant Garamond', serif;
    --font-body: 'Outfit', sans-serif;
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body { background: var(--midnight); color: var(--text); font-family: var(--font-body); }

  .app-wrapper { min-height: 100vh; background: var(--midnight); }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--deep); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

  /* Animations */
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes pulse-gold {
    0%, 100% { box-shadow: 0 0 0 0 rgba(212,168,83,0.3); }
    50% { box-shadow: 0 0 0 8px rgba(212,168,83,0); }
  }
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes slideUp {
    from { transform: translateY(100%); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes typing {
    0%, 60% { opacity: 1; }
    30% { opacity: 0.3; }
  }

  .animate-in { animation: fadeInUp 0.6s ease-out both; }
  .animate-in-delay-1 { animation-delay: 0.1s; }
  .animate-in-delay-2 { animation-delay: 0.2s; }
  .animate-in-delay-3 { animation-delay: 0.3s; }

  /* Header */
  .header {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    background: rgba(10,11,20,0.85); backdrop-filter: blur(20px);
    border-bottom: 1px solid var(--border);
    transition: all 0.3s ease;
  }
  .header-inner {
    max-width: 1200px; margin: 0 auto; padding: 0 20px;
    display: flex; align-items: center; justify-content: space-between; height: 64px;
  }
  .logo {
    font-family: var(--font-display); font-size: 1.4rem; font-weight: 700;
    color: var(--gold); cursor: pointer; letter-spacing: 0.02em;
    text-decoration: none;
  }
  .logo span { color: var(--text-dim); font-weight: 400; }
  .nav-links { display: flex; gap: 28px; align-items: center; }
  .nav-link {
    color: var(--text-dim); text-decoration: none; font-size: 0.88rem;
    font-weight: 400; letter-spacing: 0.03em; transition: color 0.2s;
    cursor: pointer; background: none; border: none; font-family: var(--font-body);
  }
  .nav-link:hover, .nav-link.active { color: var(--gold); }
  .btn-primary {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%);
    color: var(--midnight); border: none; padding: 10px 20px; border-radius: 8px;
    font-weight: 600; font-size: 0.88rem; cursor: pointer; transition: all 0.2s;
    font-family: var(--font-body); letter-spacing: 0.02em;
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(212,168,83,0.3); }
  .btn-secondary {
    background: transparent; border: 1px solid var(--border); color: var(--text);
    padding: 10px 20px; border-radius: 8px; font-weight: 500; font-size: 0.88rem;
    cursor: pointer; transition: all 0.2s; font-family: var(--font-body);
    display: inline-flex; align-items: center; gap: 8px;
  }
  .btn-secondary:hover { border-color: var(--gold); color: var(--gold); }
  .btn-ghost {
    background: none; border: none; color: var(--gold); cursor: pointer;
    font-family: var(--font-body); font-size: 0.88rem; font-weight: 500;
    display: inline-flex; align-items: center; gap: 4px; padding: 4px 0;
  }
  .btn-ghost:hover { color: var(--gold-light); }

  .mobile-menu-btn {
    display: none; background: none; border: none; color: var(--text); cursor: pointer;
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .nav-links.open {
      display: flex; flex-direction: column; position: absolute;
      top: 64px; left: 0; right: 0; background: var(--deep);
      padding: 20px; gap: 16px; border-bottom: 1px solid var(--border);
    }
    .mobile-menu-btn { display: block; }
  }

  /* Hero */
  .hero {
    min-height: 70vh; display: flex; align-items: center; justify-content: center;
    position: relative; overflow: hidden; padding: 100px 20px 60px;
  }
  .hero-bg {
    position: absolute; inset: 0; z-index: 0;
    background: radial-gradient(ellipse at 30% 20%, rgba(99,102,241,0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 70% 80%, rgba(212,168,83,0.1) 0%, transparent 50%),
                var(--midnight);
  }
  .hero-bg::after {
    content: ''; position: absolute; inset: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }
  .hero-content {
    position: relative; z-index: 1; text-align: center; max-width: 720px;
  }
  .hero h1 {
    font-family: var(--font-display); font-size: clamp(2.4rem, 6vw, 4.2rem);
    font-weight: 700; line-height: 1.1; margin-bottom: 20px;
    background: linear-gradient(135deg, var(--text) 0%, var(--gold-light) 50%, var(--text) 100%);
    background-size: 200% auto;
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    background-clip: text; animation: shimmer 6s linear infinite;
  }
  .hero p {
    color: var(--text-dim); font-size: 1.05rem; line-height: 1.7;
    margin-bottom: 32px; max-width: 540px; margin-left: auto; margin-right: auto;
  }
  .hero-btns { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 40px; }
  .trust-bar {
    display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;
    font-size: 0.82rem; color: var(--text-dim); letter-spacing: 0.05em; text-transform: uppercase;
  }
  .trust-item { display: flex; align-items: center; gap: 6px; }
  .trust-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold); }

  /* Sections */
  .section {
    max-width: 1200px; margin: 0 auto; padding: 80px 20px;
  }
  .section-title {
    font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 2.6rem);
    font-weight: 700; margin-bottom: 12px; color: var(--text);
  }
  .section-subtitle {
    color: var(--text-dim); font-size: 1rem; margin-bottom: 48px; max-width: 540px;
  }
  .section-label {
    font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.12em;
    color: var(--gold); margin-bottom: 8px; font-weight: 600;
  }

  /* Steps */
  .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
  .step-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
    padding: 32px 24px; text-align: center; transition: all 0.3s ease;
  }
  .step-card:hover { border-color: var(--gold-dim); transform: translateY(-4px); }
  .step-number {
    width: 48px; height: 48px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%);
    color: var(--midnight); font-weight: 700; font-size: 1.2rem;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
  }
  .step-card h3 { font-family: var(--font-display); font-size: 1.3rem; margin-bottom: 8px; }
  .step-card p { color: var(--text-dim); font-size: 0.9rem; line-height: 1.6; }

  /* Destination Cards */
  .dest-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
  .dest-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
    overflow: hidden; transition: all 0.3s ease; cursor: pointer;
  }
  .dest-card:hover { border-color: var(--gold-dim); transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
  .dest-card-img {
    height: 200px; display: flex; align-items: center; justify-content: center;
    font-size: 5rem; position: relative;
  }
  .dest-card-body { padding: 24px; }
  .dest-card-body h3 { font-family: var(--font-display); font-size: 1.4rem; margin-bottom: 4px; }
  .dest-card-body .epoque { color: var(--gold); font-size: 0.82rem; margin-bottom: 12px; font-weight: 500; }
  .dest-card-body .accroche { color: var(--text-dim); font-size: 0.9rem; line-height: 1.6; margin-bottom: 16px; }
  .tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; }
  .tag {
    padding: 4px 12px; border-radius: 20px; font-size: 0.75rem;
    background: rgba(212,168,83,0.1); color: var(--gold); border: 1px solid rgba(212,168,83,0.2);
  }
  .dest-card-actions { display: flex; gap: 8px; }

  /* Detail page */
  .detail-hero {
    min-height: 50vh; display: flex; align-items: flex-end;
    position: relative; padding: 100px 20px 48px;
  }
  .detail-hero-bg { position: absolute; inset: 0; z-index: 0; }
  .detail-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, var(--midnight) 0%, rgba(10,11,20,0.5) 50%, rgba(10,11,20,0.3) 100%);
  }
  .detail-hero-content { position: relative; z-index: 1; max-width: 1200px; margin: 0 auto; width: 100%; }
  .detail-emoji { font-size: 4rem; margin-bottom: 12px; }
  .detail-hero h1 { font-family: var(--font-display); font-size: clamp(2rem, 5vw, 3.2rem); margin-bottom: 8px; }
  .detail-hero .epoque-label { color: var(--gold); font-size: 1rem; margin-bottom: 16px; font-weight: 500; }
  .badges { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 24px; }
  .badge {
    padding: 6px 14px; border-radius: 8px; font-size: 0.82rem; font-weight: 500;
    display: flex; align-items: center; gap: 6px;
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
  }
  .badge.risk-low { border-color: rgba(34,197,94,0.3); color: #86efac; }
  .badge.risk-moderate { border-color: rgba(234,179,8,0.3); color: #fde047; }
  .badge.risk-high { border-color: rgba(239,68,68,0.3); color: #fca5a5; }
  .detail-btns { display: flex; gap: 12px; flex-wrap: wrap; }

  .detail-section { max-width: 1200px; margin: 0 auto; padding: 48px 20px; }
  .detail-section h2 {
    font-family: var(--font-display); font-size: 1.8rem;
    margin-bottom: 24px; color: var(--text);
  }

  .incontournables-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; }
  .incontournable-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 24px; transition: border-color 0.2s;
  }
  .incontournable-card:hover { border-color: var(--gold-dim); }
  .incontournable-card h4 { font-family: var(--font-display); font-size: 1.15rem; margin-bottom: 8px; color: var(--gold-light); }
  .incontournable-card p { color: var(--text-dim); font-size: 0.9rem; line-height: 1.6; }

  /* Timeline */
  .timeline { position: relative; padding-left: 32px; }
  .timeline::before {
    content: ''; position: absolute; left: 7px; top: 0; bottom: 0;
    width: 2px; background: var(--border);
  }
  .timeline-item { position: relative; margin-bottom: 32px; }
  .timeline-dot {
    position: absolute; left: -32px; top: 4px; width: 16px; height: 16px;
    border-radius: 50%; background: var(--gold); border: 3px solid var(--midnight);
  }
  .timeline-item h4 { font-family: var(--font-display); font-size: 1.2rem; margin-bottom: 4px; }
  .timeline-item .jour-label { color: var(--gold); font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
  .timeline-item p { color: var(--text-dim); font-size: 0.9rem; line-height: 1.6; }

  /* Precautions */
  .precaution-list { list-style: none; display: flex; flex-direction: column; gap: 10px; }
  .precaution-item {
    display: flex; gap: 12px; align-items: flex-start;
    padding: 12px 16px; background: var(--surface); border-radius: 10px;
    border: 1px solid var(--border); font-size: 0.9rem; color: var(--text-dim);
  }
  .precaution-icon { color: var(--gold); flex-shrink: 0; margin-top: 2px; }
  .warning-box {
    background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2);
    border-radius: 12px; padding: 20px; margin-top: 20px;
    display: flex; gap: 12px; align-items: flex-start;
  }
  .warning-box .icon { color: var(--danger); flex-shrink: 0; margin-top: 2px; }
  .warning-box p { color: #fca5a5; font-size: 0.9rem; line-height: 1.6; }

  /* Testimonials */
  .testimonials { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }
  .testimonial-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 24px;
  }
  .testimonial-stars { color: var(--gold); margin-bottom: 12px; display: flex; gap: 2px; }
  .testimonial-text { color: var(--text-dim); font-style: italic; font-size: 0.9rem; line-height: 1.6; margin-bottom: 12px; }
  .testimonial-name { color: var(--text); font-weight: 600; font-size: 0.88rem; }

  /* Filters */
  .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 32px; }
  .filter-chip {
    padding: 8px 16px; border-radius: 20px; font-size: 0.82rem;
    background: var(--surface); border: 1px solid var(--border);
    color: var(--text-dim); cursor: pointer; transition: all 0.2s;
    font-family: var(--font-body);
  }
  .filter-chip:hover, .filter-chip.active {
    border-color: var(--gold); color: var(--gold); background: rgba(212,168,83,0.08);
  }

  /* Wizard */
  .wizard { max-width: 680px; margin: 0 auto; }
  .wizard-steps {
    display: flex; gap: 4px; margin-bottom: 40px;
  }
  .wizard-step-indicator {
    flex: 1; height: 4px; border-radius: 2px; background: var(--border); transition: background 0.3s;
  }
  .wizard-step-indicator.active { background: var(--gold); }
  .wizard-step-indicator.done { background: var(--success); }
  .form-group { margin-bottom: 24px; }
  .form-label {
    display: block; font-size: 0.88rem; font-weight: 500; margin-bottom: 8px; color: var(--text);
  }
  .form-input, .form-select {
    width: 100%; padding: 12px 16px; border-radius: 10px;
    background: var(--surface); border: 1px solid var(--border);
    color: var(--text); font-family: var(--font-body); font-size: 0.95rem;
    transition: border-color 0.2s; outline: none;
  }
  .form-input:focus, .form-select:focus { border-color: var(--gold); }
  .form-select option { background: var(--surface); }
  .radio-group { display: flex; gap: 8px; flex-wrap: wrap; }
  .radio-option {
    padding: 10px 18px; border-radius: 10px; font-size: 0.88rem;
    background: var(--surface); border: 1px solid var(--border);
    color: var(--text-dim); cursor: pointer; transition: all 0.2s;
  }
  .radio-option.selected { border-color: var(--gold); color: var(--gold); background: rgba(212,168,83,0.08); }
  .counter {
    display: flex; align-items: center; gap: 16px;
  }
  .counter-btn {
    width: 40px; height: 40px; border-radius: 10px;
    background: var(--surface); border: 1px solid var(--border);
    color: var(--text); font-size: 1.2rem; cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
  }
  .counter-btn:hover { border-color: var(--gold); }
  .counter-value { font-size: 1.4rem; font-weight: 600; min-width: 40px; text-align: center; }

  .pack-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 24px; }
  .pack-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    padding: 20px; cursor: pointer; transition: all 0.2s; text-align: center;
  }
  .pack-card:hover, .pack-card.selected { border-color: var(--gold); }
  .pack-card.selected { background: rgba(212,168,83,0.05); }
  .pack-card h4 { font-family: var(--font-display); font-size: 1.15rem; margin-bottom: 4px; }
  .pack-card p { color: var(--text-dim); font-size: 0.82rem; }

  .recap-box {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 16px; padding: 24px;
  }
  .recap-row {
    display: flex; justify-content: space-between; padding: 10px 0;
    border-bottom: 1px solid var(--border); font-size: 0.92rem;
  }
  .recap-row:last-child { border-bottom: none; }
  .recap-label { color: var(--text-dim); }
  .recap-value { color: var(--text); font-weight: 500; }

  .success-state {
    text-align: center; padding: 48px 20px;
  }
  .success-icon {
    width: 80px; height: 80px; border-radius: 50%;
    background: rgba(34,197,94,0.15); border: 2px solid var(--success);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 24px; color: var(--success);
  }
  .success-state h2 { font-family: var(--font-display); font-size: 2rem; margin-bottom: 12px; }
  .success-state p { color: var(--text-dim); font-size: 1rem; }

  /* FAQ */
  .faq-list { max-width: 720px; display: flex; flex-direction: column; gap: 8px; }
  .faq-item {
    background: var(--surface); border: 1px solid var(--border); border-radius: 12px;
    overflow: hidden; transition: border-color 0.2s;
  }
  .faq-item:hover { border-color: var(--gold-dim); }
  .faq-question {
    width: 100%; padding: 18px 20px; display: flex; justify-content: space-between;
    align-items: center; background: none; border: none; color: var(--text);
    font-family: var(--font-body); font-size: 0.95rem; font-weight: 500;
    cursor: pointer; text-align: left;
  }
  .faq-question svg { transition: transform 0.2s; flex-shrink: 0; margin-left: 12px; }
  .faq-question.open svg { transform: rotate(180deg); }
  .faq-answer {
    padding: 0 20px 18px; color: var(--text-dim); font-size: 0.9rem; line-height: 1.7;
  }

  /* Chat Widget */
  .chat-fab {
    position: fixed; bottom: 24px; right: 24px; z-index: 200;
    width: 56px; height: 56px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-dim) 100%);
    border: none; cursor: pointer; color: var(--midnight);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 20px rgba(212,168,83,0.4);
    transition: all 0.2s; animation: pulse-gold 2s infinite;
  }
  .chat-fab:hover { transform: scale(1.08); }
  .chat-panel {
    position: fixed; z-index: 201;
    background: var(--deep); border: 1px solid var(--border);
    display: flex; flex-direction: column;
    animation: slideUp 0.3s ease-out;
  }
  @media (min-width: 769px) {
    .chat-panel {
      bottom: 24px; right: 24px; width: 400px; height: 560px;
      border-radius: 20px; box-shadow: 0 16px 48px rgba(0,0,0,0.5);
    }
  }
  @media (max-width: 768px) {
    .chat-panel {
      bottom: 0; left: 0; right: 0; height: 75vh;
      border-radius: 20px 20px 0 0;
    }
  }
  .chat-header {
    padding: 16px 20px; display: flex; justify-content: space-between; align-items: center;
    border-bottom: 1px solid var(--border);
  }
  .chat-header h3 { font-family: var(--font-display); font-size: 1.15rem; color: var(--gold); }
  .chat-close { background: none; border: none; color: var(--text-dim); cursor: pointer; }
  .chat-messages {
    flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 12px;
  }
  .chat-msg {
    max-width: 85%; padding: 12px 16px; border-radius: 14px;
    font-size: 0.9rem; line-height: 1.6; white-space: pre-wrap;
  }
  .chat-msg.bot {
    align-self: flex-start; background: var(--surface); border: 1px solid var(--border); color: var(--text);
  }
  .chat-msg.user {
    align-self: flex-end; background: rgba(212,168,83,0.15); border: 1px solid rgba(212,168,83,0.25); color: var(--text);
  }
  .chat-actions { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 8px; }
  .chat-action-btn {
    padding: 6px 12px; border-radius: 8px; font-size: 0.78rem;
    background: rgba(212,168,83,0.1); border: 1px solid rgba(212,168,83,0.25);
    color: var(--gold); cursor: pointer; font-family: var(--font-body);
    transition: all 0.2s;
  }
  .chat-action-btn:hover { background: rgba(212,168,83,0.2); }
  .chat-suggestions {
    padding: 8px 16px; display: flex; gap: 6px; overflow-x: auto;
    border-top: 1px solid var(--border);
  }
  .chat-suggestion {
    padding: 6px 14px; border-radius: 16px; font-size: 0.78rem;
    background: var(--surface); border: 1px solid var(--border);
    color: var(--text-dim); cursor: pointer; white-space: nowrap;
    font-family: var(--font-body); transition: all 0.2s;
  }
  .chat-suggestion:hover { border-color: var(--gold); color: var(--gold); }
  .chat-input-bar {
    padding: 12px 16px; display: flex; gap: 8px; border-top: 1px solid var(--border);
  }
  .chat-input {
    flex: 1; padding: 10px 14px; border-radius: 10px;
    background: var(--surface); border: 1px solid var(--border);
    color: var(--text); font-family: var(--font-body); font-size: 0.9rem;
    outline: none; transition: border-color 0.2s;
  }
  .chat-input:focus { border-color: var(--gold); }
  .chat-send {
    width: 40px; height: 40px; border-radius: 10px;
    background: var(--gold); border: none; color: var(--midnight);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
  }
  .chat-send:hover { background: var(--gold-light); }
  .typing-indicator {
    display: flex; gap: 4px; padding: 12px 16px; align-self: flex-start;
  }
  .typing-dot {
    width: 8px; height: 8px; border-radius: 50%; background: var(--text-dim);
    animation: typing 1s infinite;
  }
  .typing-dot:nth-child(2) { animation-delay: 0.15s; }
  .typing-dot:nth-child(3) { animation-delay: 0.3s; }

  /* Footer */
  .footer {
    border-top: 1px solid var(--border); padding: 40px 20px;
    text-align: center; color: var(--text-dim); font-size: 0.82rem;
  }
  .footer-inner { max-width: 1200px; margin: 0 auto; }
  .footer p { margin-bottom: 8px; line-height: 1.6; }
  .footer .ia-notice {
    padding: 12px 16px; background: rgba(99,102,241,0.06);
    border: 1px solid rgba(99,102,241,0.15); border-radius: 10px;
    display: inline-flex; align-items: center; gap: 8px;
    margin-top: 16px; font-size: 0.78rem; color: var(--accent-light);
  }

  /* Sticky mobile CTA */
  .sticky-cta {
    position: fixed; bottom: 0; left: 0; right: 0; z-index: 50;
    padding: 12px 20px; background: rgba(10,11,20,0.95);
    backdrop-filter: blur(12px); border-top: 1px solid var(--border);
    display: none; gap: 8px;
  }
  @media (max-width: 768px) {
    .sticky-cta.visible { display: flex; }
    .sticky-cta .btn-primary, .sticky-cta .btn-secondary { flex: 1; justify-content: center; }
    .chat-fab { bottom: 84px; }
  }

  .page-container { padding-top: 64px; min-height: 100vh; }
`;

// ============================================================
// MAIN APP COMPONENT
// ============================================================
export default function App() {
  const [currentPage, setCurrentPage] = useState(window.location.hash.slice(1) || "/");
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const handleHash = () => setCurrentPage(window.location.hash.slice(1) || "/");
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigate = useCallback((path) => {
    window.location.hash = path;
    setCurrentPage(path);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const renderPage = () => {
    if (currentPage.startsWith("/destinations/")) {
      const id = currentPage.split("/destinations/")[1];
      return <DestinationDetail id={id} navigate={navigate} openChat={() => setChatOpen(true)} />;
    }
    switch (currentPage) {
      case "/destinations": return <DestinationsPage navigate={navigate} openChat={() => setChatOpen(true)} />;
      case "/planifier": return <PlanifierPage navigate={navigate} />;
      case "/faq": return <FAQPage openChat={() => setChatOpen(true)} />;
      default: return <HomePage navigate={navigate} openChat={() => setChatOpen(true)} />;
    }
  };

  return (
    <>
      <style>{baseStyles}</style>
      <div className="app-wrapper">
        <Header currentPage={currentPage} navigate={navigate} menuOpen={menuOpen} setMenuOpen={setMenuOpen} openChat={() => setChatOpen(true)} />
        {renderPage()}
        <Footer />
        <ChatWidget open={chatOpen} setOpen={setChatOpen} navigate={navigate} currentPage={currentPage} />
      </div>
    </>
  );
}

// ============================================================
// HEADER
// ============================================================
function Header({ currentPage, navigate, menuOpen, setMenuOpen, openChat }) {
  return (
    <header className="header">
      <div className="header-inner">
        <a className="logo" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          TimeTravel <span>Agency</span>
        </a>
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button className={`nav-link ${currentPage === "/destinations" ? "active" : ""}`} onClick={() => navigate("/destinations")}>Destinations</button>
          <button className={`nav-link ${currentPage === "/planifier" ? "active" : ""}`} onClick={() => navigate("/planifier")}>Planifier</button>
          <button className={`nav-link ${currentPage === "/faq" ? "active" : ""}`} onClick={() => navigate("/faq")}>FAQ</button>
          <button className="btn-primary" onClick={openChat}><Icons.Chat /> Parler à l'agent</button>
        </nav>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <Icons.X /> : <Icons.Menu />}
        </button>
      </div>
    </header>
  );
}

// ============================================================
// HOME PAGE
// ============================================================
function HomePage({ navigate, openChat }) {
  return (
    <div className="page-container">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-content animate-in">
          <div className="section-label">Agence de voyages temporels</div>
          <h1>Voyagez dans le temps, sans compromis</h1>
          <p>Immersion totale, sécurité maximale, personnalisation par l'intelligence artificielle. Découvrez des époques fascinantes comme jamais auparavant.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => navigate("/destinations")}>Découvrir les destinations</button>
            <button className="btn-secondary" onClick={openChat}><Icons.Chat /> Parler à l'agent</button>
          </div>
          <div className="trust-bar">
            <span className="trust-item"><span className="trust-dot" /> 3 destinations</span>
            <span className="trust-item"><span className="trust-dot" /> Conseils IA</span>
            <span className="trust-item"><span className="trust-dot" /> Planification en 2 min</span>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="section">
        <div className="section-label">Comment ça marche</div>
        <h2 className="section-title">Trois étapes vers l'aventure</h2>
        <p className="section-subtitle">De la découverte à la planification, notre processus est pensé pour être simple, rapide et personnalisé.</p>
        <div className="steps-grid">
          {[
            { n: 1, t: "Choisir une époque", d: "Explorez nos destinations temporelles et trouvez celle qui vous fait vibrer." },
            { n: 2, t: "Personnaliser avec l'IA", d: "Notre agent intelligent adapte chaque voyage à vos envies et votre profil." },
            { n: 3, t: "Planifier & Réserver", d: "Confirmez votre itinéraire personnalisé et préparez vos bagages temporels." }
          ].map((s, i) => (
            <div key={s.n} className={`step-card animate-in animate-in-delay-${i + 1}`}>
              <div className="step-number">{s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Destinations Preview */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-label">Destinations</div>
        <h2 className="section-title">Nos époques emblématiques</h2>
        <p className="section-subtitle">Trois destinations soigneusement sélectionnées pour des expériences inoubliables.</p>
        <div className="dest-grid">
          {destinations.map((d, i) => (
            <DestCard key={d.id} dest={d} index={i} navigate={navigate} openChat={null} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button className="btn-ghost" onClick={() => navigate("/destinations")}>
            Voir toutes les destinations <Icons.ChevRight />
          </button>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// DESTINATION CARD
// ============================================================
function DestCard({ dest, index, navigate, openChat }) {
  return (
    <div className={`dest-card animate-in animate-in-delay-${index + 1}`} onClick={() => navigate(`/destinations/${dest.id}`)}>
      <div className="dest-card-img" style={{ background: dest.gradient }}>
        <span>{dest.image}</span>
      </div>
      <div className="dest-card-body">
        <h3>{dest.nom}</h3>
        <div className="epoque">{dest.epoque}</div>
        <p className="accroche">{dest.accroche}</p>
        <div className="tags">
          {dest.tags.slice(0, 3).map(t => <span key={t} className="tag">{t}</span>)}
        </div>
        <div className="dest-card-actions">
          <button className="btn-primary" style={{ fontSize: "0.82rem", padding: "8px 16px" }} onClick={(e) => { e.stopPropagation(); navigate(`/destinations/${dest.id}`); }}>
            Voir le détail
          </button>
          {openChat && (
            <button className="btn-secondary" style={{ fontSize: "0.82rem", padding: "8px 16px" }} onClick={(e) => { e.stopPropagation(); openChat(); }}>
              Demander à l'agent
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// DESTINATIONS PAGE
// ============================================================
function DestinationsPage({ navigate, openChat }) {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const filters = ["Tous", "Culture", "Aventure", "Famille", "Risque faible", "Risque élevé"];

  const filtered = activeFilter === "Tous"
    ? destinations
    : destinations.filter(d => d.categorie.includes(activeFilter));

  return (
    <div className="page-container">
      <section className="section" style={{ paddingTop: 100 }}>
        <div className="section-label">Explorer</div>
        <h1 className="section-title">Choisissez votre époque</h1>
        <p className="section-subtitle">Filtrez par thématique et trouvez la destination qui vous correspond.</p>
        <div className="filters">
          {filters.map(f => (
            <button key={f} className={`filter-chip ${activeFilter === f ? "active" : ""}`} onClick={() => setActiveFilter(f)}>{f}</button>
          ))}
        </div>
        <div className="dest-grid">
          {filtered.map((d, i) => (
            <DestCard key={d.id} dest={d} index={i} navigate={navigate} openChat={openChat} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p style={{ color: "var(--text-dim)", textAlign: "center", padding: 40 }}>Aucune destination ne correspond à ce filtre.</p>
        )}
      </section>
    </div>
  );
}

// ============================================================
// DESTINATION DETAIL
// ============================================================
function DestinationDetail({ id, navigate, openChat }) {
  const dest = destinations.find(d => d.id === id);
  const [openItinerary, setOpenItinerary] = useState(null);

  useEffect(() => {
    chatService.setContext(id);
    return () => chatService.setContext(null);
  }, [id]);

  if (!dest) return (
    <div className="page-container" style={{ padding: "120px 20px", textAlign: "center" }}>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: 16 }}>Destination introuvable</h2>
      <button className="btn-primary" onClick={() => navigate("/destinations")}>Retour aux destinations</button>
    </div>
  );

  const riskClass = dest.niveauRisque === "Faible" ? "risk-low" : dest.niveauRisque === "Modéré" ? "risk-moderate" : "risk-high";

  return (
    <div className="page-container" style={{ paddingTop: 0 }}>
      {/* Hero */}
      <div className="detail-hero">
        <div className="detail-hero-bg" style={{ background: dest.gradient }} />
        <div className="detail-hero-overlay" />
        <div className="detail-hero-content animate-in">
          <button className="btn-ghost" onClick={() => navigate("/destinations")} style={{ marginBottom: 16 }}>
            <Icons.ArrowLeft /> Destinations
          </button>
          <div className="detail-emoji">{dest.image}</div>
          <h1>{dest.nom}</h1>
          <div className="epoque-label">{dest.epoque}</div>
          <div className="badges">
            <span className={`badge ${riskClass}`}><Icons.Shield /> Risque {dest.niveauRisque.toLowerCase()}</span>
            <span className="badge"><Icons.Clock /> {dest.dureeRecommandee}</span>
          </div>
          <p style={{ color: "var(--text-dim)", maxWidth: 600, lineHeight: 1.7, marginBottom: 24, fontSize: "0.95rem" }}>{dest.description}</p>
          <div className="detail-btns">
            <button className="btn-primary" onClick={() => navigate(`/planifier?dest=${dest.id}`)}>Planifier ce voyage</button>
            <button className="btn-secondary" onClick={openChat}><Icons.Chat /> Conseils de l'agent</button>
          </div>
        </div>
      </div>

      {/* Incontournables */}
      <div className="detail-section">
        <div className="section-label">Expériences</div>
        <h2>À ne pas manquer</h2>
        <div className="incontournables-grid">
          {dest.incontournables.map((inc, i) => (
            <div key={i} className={`incontournable-card animate-in animate-in-delay-${i + 1}`}>
              <h4>{inc.titre}</h4>
              <p>{inc.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Itinéraire */}
      <div className="detail-section">
        <div className="section-label">Programme</div>
        <h2>Itinéraire recommandé</h2>
        <div className="timeline">
          {dest.itineraire.map((j, i) => (
            <div key={i} className="timeline-item animate-in" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="timeline-dot" />
              <div className="jour-label">{j.jour}</div>
              <h4>{j.titre}</h4>
              <p>{j.activites}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24 }}>
          <button className="btn-secondary" onClick={openChat}>
            <Icons.Sparkle /> Adapter selon mon profil
          </button>
        </div>
      </div>

      {/* Précautions */}
      <div className="detail-section">
        <div className="section-label">Sécurité</div>
        <h2>Conseils & Précautions</h2>
        <ul className="precaution-list">
          {dest.precautions.map((p, i) => (
            <li key={i} className="precaution-item">
              <span className="precaution-icon"><Icons.Shield /></span>
              <span>{p}</span>
            </li>
          ))}
        </ul>
        <div className="warning-box">
          <span className="icon"><Icons.AlertTriangle /></span>
          <div>
            <strong style={{ color: "#fca5a5", display: "block", marginBottom: 4 }}>À éviter</strong>
            <p>{dest.aEviter}</p>
          </div>
        </div>
      </div>

      {/* Témoignages */}
      <div className="detail-section">
        <div className="section-label">Retours</div>
        <h2>Avis de nos voyageurs</h2>
        <div className="testimonials">
          {dest.temoignages.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="testimonial-stars">
                {Array.from({ length: t.note }).map((_, j) => <Icons.Star key={j} />)}
              </div>
              <p className="testimonial-text">« {t.texte} »</p>
              <div className="testimonial-name">{t.nom}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky mobile CTA */}
      <div className="sticky-cta visible">
        <button className="btn-primary" onClick={() => navigate(`/planifier?dest=${dest.id}`)}>Planifier</button>
        <button className="btn-secondary" onClick={openChat}><Icons.Chat /> Agent</button>
      </div>
    </div>
  );
}

// ============================================================
// PLANIFIER PAGE (Wizard)
// ============================================================
function PlanifierPage({ navigate }) {
  const params = new URLSearchParams(window.location.hash.split("?")[1] || "");
  const preselectedDest = params.get("dest") || "";

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    destination: preselectedDest,
    duree: "3",
    voyageurs: 2,
    interet: "",
    budget: "",
    risque: "",
    pack: "culture"
  });
  const [confirmed, setConfirmed] = useState(false);

  const destObj = destinations.find(d => d.id === form.destination);

  if (confirmed) {
    return (
      <div className="page-container">
        <section className="section" style={{ paddingTop: 100 }}>
          <div className="success-state animate-in">
            <div className="success-icon"><Icons.Check /></div>
            <h2>Planification confirmée !</h2>
            <p style={{ marginBottom: 24 }}>Votre voyage vers <strong>{destObj?.nom || "votre destination"}</strong> a bien été planifié. Notre équipe vous contactera sous 24h pour les prochaines étapes.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => navigate("/")}>Retour à l'accueil</button>
              <button className="btn-secondary" onClick={() => navigate("/destinations")}>Voir d'autres destinations</button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page-container">
      <section className="section" style={{ paddingTop: 100 }}>
        <div className="section-label">Planification</div>
        <h1 className="section-title">Planifiez votre voyage</h1>
        <p className="section-subtitle">En 3 étapes simples, construisez l'aventure temporelle qui vous ressemble.</p>

        <div className="wizard">
          <div className="wizard-steps">
            {[1, 2, 3].map(s => (
              <div key={s} className={`wizard-step-indicator ${s === step ? "active" : s < step ? "done" : ""}`} />
            ))}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="animate-in">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: 24 }}>Vos préférences</h3>
              <div className="form-group">
                <label className="form-label">Destination</label>
                <select className="form-select" value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })}>
                  <option value="">Choisir une destination</option>
                  {destinations.map(d => <option key={d.id} value={d.id}>{d.nom} — {d.epoque}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Durée (jours)</label>
                <select className="form-select" value={form.duree} onChange={e => setForm({ ...form, duree: e.target.value })}>
                  <option value="2">2 jours</option>
                  <option value="3">3 jours</option>
                  <option value="5">5 jours</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Nombre de voyageurs</label>
                <div className="counter">
                  <button className="counter-btn" onClick={() => setForm({ ...form, voyageurs: Math.max(1, form.voyageurs - 1) })}>−</button>
                  <span className="counter-value">{form.voyageurs}</span>
                  <button className="counter-btn" onClick={() => setForm({ ...form, voyageurs: Math.min(6, form.voyageurs + 1) })}>+</button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Centre d'intérêt principal</label>
                <div className="radio-group">
                  {["Culture", "Aventure", "Gastronomie", "Histoire"].map(v => (
                    <button key={v} className={`radio-option ${form.interet === v ? "selected" : ""}`} onClick={() => setForm({ ...form, interet: v })}>{v}</button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Budget</label>
                <div className="radio-group">
                  {["Économique", "Standard", "Premium"].map(v => (
                    <button key={v} className={`radio-option ${form.budget === v ? "selected" : ""}`} onClick={() => setForm({ ...form, budget: v })}>{v}</button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Tolérance au risque</label>
                <div className="radio-group">
                  {["Minimal", "Modéré", "Élevé"].map(v => (
                    <button key={v} className={`radio-option ${form.risque === v ? "selected" : ""}`} onClick={() => setForm({ ...form, risque: v })}>{v}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 32 }}>
                <button className="btn-primary" onClick={() => form.destination ? setStep(2) : alert("Veuillez choisir une destination")}>
                  Continuer <Icons.ChevRight />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — IA Proposition */}
          {step === 2 && (
            <div className="animate-in">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: 8 }}>Proposition de l'IA</h3>
              <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", marginBottom: 24 }}>Basée sur vos préférences, voici notre recommandation personnalisée.</p>

              <div className="section-label" style={{ marginBottom: 12 }}>Pack recommandé</div>
              <div className="pack-grid">
                {[
                  { id: "culture", label: "Culture", desc: "Visites & découvertes", icon: "🎭" },
                  { id: "aventure", label: "Aventure", desc: "Sensations & exploration", icon: "⚡" },
                  { id: "premium", label: "Premium", desc: "Expérience complète", icon: "✨" }
                ].map(p => (
                  <div key={p.id} className={`pack-card ${form.pack === p.id ? "selected" : ""}`} onClick={() => setForm({ ...form, pack: p.id })}>
                    <div style={{ fontSize: "2rem", marginBottom: 8 }}>{p.icon}</div>
                    <h4>{p.label}</h4>
                    <p>{p.desc}</p>
                  </div>
                ))}
              </div>

              {destObj && (
                <>
                  <div className="section-label" style={{ marginTop: 24, marginBottom: 12 }}>Itinéraire résumé</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                    {destObj.itineraire.map((j, i) => (
                      <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 14px", background: "var(--surface)", borderRadius: 10, border: "1px solid var(--border)" }}>
                        <span style={{ color: "var(--gold)", fontWeight: 600, fontSize: "0.82rem", minWidth: 50 }}>{j.jour}</span>
                        <span style={{ color: "var(--text)", fontSize: "0.9rem" }}>{j.titre}</span>
                      </div>
                    ))}
                  </div>

                  <div className="section-label" style={{ marginBottom: 12 }}>Checklist de préparation</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
                    {["Vêtements d'époque (fournis)", "Briefing sécurité (30 min)", "Kit médical temporel", "Bracelet de rapatriement"].map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: "0.9rem", color: "var(--text-dim)" }}>
                        <span style={{ color: "var(--success)" }}><Icons.Check /></span> {item}
                      </div>
                    ))}
                  </div>
                </>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, gap: 12 }}>
                <button className="btn-secondary" onClick={() => setStep(1)}><Icons.ArrowLeft /> Retour</button>
                <button className="btn-primary" onClick={() => setStep(3)}>Continuer <Icons.ChevRight /></button>
              </div>
            </div>
          )}

          {/* Step 3 — Validation */}
          {step === 3 && (
            <div className="animate-in">
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", marginBottom: 8 }}>Récapitulatif</h3>
              <p style={{ color: "var(--text-dim)", fontSize: "0.9rem", marginBottom: 24 }}>Vérifiez les détails avant de confirmer votre planification.</p>

              <div className="recap-box">
                <div className="recap-row"><span className="recap-label">Destination</span><span className="recap-value">{destObj?.nom || "—"}</span></div>
                <div className="recap-row"><span className="recap-label">Époque</span><span className="recap-value">{destObj?.epoque || "—"}</span></div>
                <div className="recap-row"><span className="recap-label">Durée</span><span className="recap-value">{form.duree} jours</span></div>
                <div className="recap-row"><span className="recap-label">Voyageurs</span><span className="recap-value">{form.voyageurs}</span></div>
                <div className="recap-row"><span className="recap-label">Intérêt</span><span className="recap-value">{form.interet || "Non précisé"}</span></div>
                <div className="recap-row"><span className="recap-label">Budget</span><span className="recap-value">{form.budget || "Non précisé"}</span></div>
                <div className="recap-row"><span className="recap-label">Risque</span><span className="recap-value">{form.risque || "Non précisé"}</span></div>
                <div className="recap-row"><span className="recap-label">Pack</span><span className="recap-value" style={{ textTransform: "capitalize" }}>{form.pack}</span></div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, gap: 12 }}>
                <button className="btn-secondary" onClick={() => setStep(2)}><Icons.ArrowLeft /> Retour</button>
                <button className="btn-primary" onClick={() => setConfirmed(true)}><Icons.Check /> Confirmer la planification</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ============================================================
// FAQ PAGE
// ============================================================
function FAQPage({ openChat }) {
  const [openIndex, setOpenIndex] = useState(null);
  const suggestions = ["Quel voyage pour une famille ?", "Que prévoir pour le Crétacé ?", "Le voyage est-il sûr ?"];

  return (
    <div className="page-container">
      <section className="section" style={{ paddingTop: 100 }}>
        <div className="section-label">Aide</div>
        <h1 className="section-title">Questions fréquentes</h1>
        <p className="section-subtitle">Tout ce que vous devez savoir sur nos voyages temporels.</p>
        <div className="faq-list">
          {faqData.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className={`faq-question ${openIndex === i ? "open" : ""}`} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span>{faq.q}</span>
                <Icons.ChevDown />
              </button>
              {openIndex === i && <div className="faq-answer animate-in">{faq.r}</div>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p style={{ color: "var(--text-dim)", marginBottom: 16, fontSize: "0.92rem" }}>Vous ne trouvez pas votre réponse ?</p>
          <button className="btn-primary" onClick={openChat}><Icons.Chat /> Poser ma question à l'agent</button>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginTop: 16 }}>
            {suggestions.map(s => (
              <button key={s} className="filter-chip" onClick={openChat} style={{ fontSize: "0.8rem" }}>« {s} »</button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================================
// CHAT WIDGET
// ============================================================
function ChatWidget({ open, setOpen, navigate, currentPage }) {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Bonjour ! Je suis votre agent temporel. Comment puis-je vous aider ? 🕰️", actions: [] }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMsg = (text) => {
    if (!text.trim()) return;
    const userMsg = { from: "user", text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = chatService.sendMessage(text);
      setMessages(prev => [...prev, { from: "bot", text: response.text, actions: response.actions || [] }]);
      setTyping(false);
    }, 600 + Math.random() * 800);
  };

  const handleAction = (action) => {
    if (action.type === "navigate") {
      navigate(action.value);
      setOpen(false);
    }
  };

  const suggestions = ["Recommandez-moi un voyage", "Voyage en famille ?", "C'est sûr ?", "Quel budget prévoir ?"];

  if (!open) return <button className="chat-fab" onClick={() => setOpen(true)} aria-label="Ouvrir le chat"><Icons.Chat /></button>;

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <h3>🕰️ Agent Temporel</h3>
        <button className="chat-close" onClick={() => setOpen(false)}><Icons.X /></button>
      </div>
      <div className="chat-messages">
        {messages.map((msg, i) => (
          <div key={i}>
            <div className={`chat-msg ${msg.from}`}>
              {msg.text.split("\n").map((line, j) => (
                <span key={j}>
                  {line.split(/\*\*(.*?)\*\*/).map((part, k) =>
                    k % 2 === 0 ? part : <strong key={k}>{part}</strong>
                  )}
                  {j < msg.text.split("\n").length - 1 && <br />}
                </span>
              ))}
            </div>
            {msg.actions?.length > 0 && (
              <div className="chat-actions" style={{ justifyContent: msg.from === "bot" ? "flex-start" : "flex-end" }}>
                {msg.actions.map((a, j) => (
                  <button key={j} className="chat-action-btn" onClick={() => handleAction(a)}>{a.label}</button>
                ))}
              </div>
            )}
          </div>
        ))}
        {typing && (
          <div className="typing-indicator">
            <div className="typing-dot" />
            <div className="typing-dot" />
            <div className="typing-dot" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-suggestions">
        {suggestions.map(s => (
          <button key={s} className="chat-suggestion" onClick={() => sendMsg(s)}>{s}</button>
        ))}
      </div>
      <div className="chat-input-bar">
        <input
          className="chat-input"
          placeholder="Votre message…"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMsg(input)}
        />
        <button className="chat-send" onClick={() => sendMsg(input)}><Icons.Send /></button>
      </div>
    </div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--gold)", marginBottom: 12 }}>
          TimeTravel <span style={{ color: "var(--text-dim)" }}>Agency</span>
        </p>
        <p>© 2025 TimeTravel Agency — Projet académique</p>
        <p>Crédits visuels : images de démonstration (placeholders)</p>
        <p>Mentions légales · Politique de confidentialité · CGV</p>
        <div className="ia-notice">
          <Icons.Sparkle />
          Certaines recommandations sont générées par une intelligence artificielle
        </div>
      </div>
    </footer>
  );
}
