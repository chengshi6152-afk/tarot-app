export type TarotCard = {
  id: number;
  name: string;
  arcana: "Major" | "Minor";
  suit?: "Wands" | "Cups" | "Swords" | "Pentacles";
  number?: string;
  upright: string;
  reversed: string;
  image: string; // placeholder URL
};

// ---------------------------------------------------------------------------
// Major Arcana (0–21)
// ---------------------------------------------------------------------------
const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 0,
    name: "The Fool",
    arcana: "Major",
    number: "0",
    upright:
      "New beginnings, innocence, spontaneity, a free spirit setting out on an adventure with limitless potential.",
    reversed:
      "Naivety, foolishness, recklessness, holding back or taking a leap without enough thought.",
    image: "/cards/major/00-the-fool.jpg",
  },
  {
    id: 1,
    name: "The Magician",
    arcana: "Major",
    number: "I",
    upright:
      "Manifestation, resourcefulness, power, inspired action. All the tools you need are at hand.",
    reversed:
      "Manipulation, poor planning, untapped talents, illusion masking the truth.",
    image: "/cards/major/01-the-magician.jpg",
  },
  {
    id: 2,
    name: "The High Priestess",
    arcana: "Major",
    number: "II",
    upright:
      "Intuition, sacred knowledge, divine feminine, the subconscious mind revealing hidden truths.",
    reversed:
      "Secrets, disconnection from intuition, withdrawal, repressed feelings surfacing.",
    image: "/cards/major/02-the-high-priestess.jpg",
  },
  {
    id: 3,
    name: "The Empress",
    arcana: "Major",
    number: "III",
    upright:
      "Femininity, beauty, nature, abundance, nurturing creative energy flowing into material form.",
    reversed:
      "Creative block, dependence on others, smothering energy, neglect of self-care.",
    image: "/cards/major/03-the-empress.jpg",
  },
  {
    id: 4,
    name: "The Emperor",
    arcana: "Major",
    number: "IV",
    upright:
      "Authority, structure, control, fatherhood. Stable foundations built through discipline and logic.",
    reversed:
      "Domination, inflexibility, stubbornness, excessive control stifling growth.",
    image: "/cards/major/04-the-emperor.jpg",
  },
  {
    id: 5,
    name: "The Hierophant",
    arcana: "Major",
    number: "V",
    upright:
      "Spiritual wisdom, religious beliefs, conformity, tradition, institutions offering moral guidance.",
    reversed:
      "Personal beliefs challenged, freedom from convention, unconventional paths forged alone.",
    image: "/cards/major/05-the-hierophant.jpg",
  },
  {
    id: 6,
    name: "The Lovers",
    arcana: "Major",
    number: "VI",
    upright:
      "Love, harmony, relationships, values alignment, choices made from the heart.",
    reversed:
      "Self-love lacking, disharmony, imbalance, misaligned values creating inner conflict.",
    image: "/cards/major/06-the-lovers.jpg",
  },
  {
    id: 7,
    name: "The Chariot",
    arcana: "Major",
    number: "VII",
    upright:
      "Control, willpower, success, action, determination to overcome obstacles through focused intent.",
    reversed:
      "Self-discipline lacking, opposition overwhelming, aggression without direction.",
    image: "/cards/major/07-the-chariot.jpg",
  },
  {
    id: 8,
    name: "Strength",
    arcana: "Major",
    number: "VIII",
    upright:
      "Strength, courage, persuasion, influence, compassion conquering raw force through inner resolve.",
    reversed:
      "Inner strength doubted, self-doubt, weakness, insecurity clouding judgment.",
    image: "/cards/major/08-strength.jpg",
  },
  {
    id: 9,
    name: "The Hermit",
    arcana: "Major",
    number: "IX",
    upright:
      "Soul-searching, introspection, being alone, inner guidance found in solitude and reflection.",
    reversed:
      "Isolation, loneliness, withdrawal from the world, refusing needed guidance.",
    image: "/cards/major/09-the-hermit.jpg",
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    arcana: "Major",
    number: "X",
    upright:
      "Good luck, karma, life cycles, destiny, a turning point bringing unexpected change.",
    reversed:
      "Bad luck, resistance to change, breaking cycles proving difficult, external forces misaligned.",
    image: "/cards/major/10-wheel-of-fortune.jpg",
  },
  {
    id: 11,
    name: "Justice",
    arcana: "Major",
    number: "XI",
    upright:
      "Justice, fairness, truth, cause and effect, accountability and karmic balance restored.",
    reversed:
      "Unfairness, lack of accountability, dishonesty, legal complications unresolved.",
    image: "/cards/major/11-justice.jpg",
  },
  {
    id: 12,
    name: "The Hanged Man",
    arcana: "Major",
    number: "XII",
    upright:
      "Pause, surrender, letting go, new perspectives gained through willing sacrifice.",
    reversed:
      "Delays, resistance, stalling, martyrdom serving no purpose, indecision paralyzing progress.",
    image: "/cards/major/12-the-hanged-man.jpg",
  },
  {
    id: 13,
    name: "Death",
    arcana: "Major",
    number: "XIII",
    upright:
      "Endings, change, transformation, transition. One chapter closing so another may begin.",
    reversed:
      "Resistance to inevitable change, personal transformation delayed, clinging to the past.",
    image: "/cards/major/13-death.jpg",
  },
  {
    id: 14,
    name: "Temperance",
    arcana: "Major",
    number: "XIV",
    upright:
      "Balance, moderation, patience, purpose, a higher calling guiding steady, measured progress.",
    reversed:
      "Imbalance, excess, self-healing needed, realignment with one's true path required.",
    image: "/cards/major/14-temperance.jpg",
  },
  {
    id: 15,
    name: "The Devil",
    arcana: "Major",
    number: "XV",
    upright:
      "Shadow self, attachment, addiction, restriction, the chains we forge through our own choices.",
    reversed:
      "Releasing limiting beliefs, exploring dark thoughts safely, detachment from material bonds.",
    image: "/cards/major/15-the-devil.jpg",
  },
  {
    id: 16,
    name: "The Tower",
    arcana: "Major",
    number: "XVI",
    upright:
      "Sudden change, upheaval, chaos, revelation. False structures shattered to reveal truth.",
    reversed:
      "Personal transformation, fear of change, averting disaster, delayed inevitable collapse.",
    image: "/cards/major/16-the-tower.jpg",
  },
  {
    id: 17,
    name: "The Star",
    arcana: "Major",
    number: "XVII",
    upright:
      "Hope, faith, purpose, renewal, serenity. A guiding light after darkness has passed.",
    reversed:
      "Lack of faith, despair, self-trust wavering, disconnection from one's inner light.",
    image: "/cards/major/17-the-star.jpg",
  },
  {
    id: 18,
    name: "The Moon",
    arcana: "Major",
    number: "XVIII",
    upright:
      "Illusion, fear, the unconscious, intuition, confusion veiling what is real from what is not.",
    reversed:
      "Release of fear, repressed emotions surfacing, inner confusion beginning to clear.",
    image: "/cards/major/18-the-moon.jpg",
  },
  {
    id: 19,
    name: "The Sun",
    arcana: "Major",
    number: "XIX",
    upright:
      "Positivity, fun, warmth, success, vitality. Clarity and joy radiating outward into the world.",
    reversed:
      "Inner child blocked, excessive optimism clouding judgment, temporary setbacks in happiness.",
    image: "/cards/major/19-the-sun.jpg",
  },
  {
    id: 20,
    name: "Judgement",
    arcana: "Major",
    number: "XX",
    upright:
      "Judgement, rebirth, inner calling, absolution. A profound awakening to a higher purpose.",
    reversed:
      "Self-doubt, inner critic too loud, failure to heed the call of transformation.",
    image: "/cards/major/20-judgement.jpg",
  },
  {
    id: 21,
    name: "The World",
    arcana: "Major",
    number: "XXI",
    upright:
      "Completion, integration, accomplishment, travel. A cycle fulfilled and wholeness achieved.",
    reversed:
      "Seeking personal closure, short-cuts, delayed completion, loose ends left unresolved.",
    image: "/cards/major/21-the-world.jpg",
  },
];

// ---------------------------------------------------------------------------
// Minor Arcana helper
// ---------------------------------------------------------------------------
type Suit = "Wands" | "Cups" | "Swords" | "Pentacles";

const SUIT_THEMES: Record<
  Suit,
  { element: string; domain: string; tone: string }
> = {
  Wands: { element: "Fire", domain: "passion, creativity, ambition", tone: "energetic" },
  Cups: { element: "Water", domain: "emotions, relationships, intuition", tone: "emotional" },
  Swords: { element: "Air", domain: "intellect, conflict, truth", tone: "analytical" },
  Pentacles: { element: "Earth", domain: "material world, finances, work", tone: "practical" },
};

const PIPS = [
  { number: "1", name: "Ace" },
  { number: "2", name: "Two" },
  { number: "3", name: "Three" },
  { number: "4", name: "Four" },
  { number: "5", name: "Five" },
  { number: "6", name: "Six" },
  { number: "7", name: "Seven" },
  { number: "8", name: "Eight" },
  { number: "9", name: "Nine" },
  { number: "10", name: "Ten" },
];

const COURT = [
  { number: "11", name: "Page" },
  { number: "12", name: "Knight" },
  { number: "13", name: "Queen" },
  { number: "14", name: "King" },
];

// Upright/reversed meanings for all 56 minor arcana cards
const MINOR_MEANINGS: Record<
  string,
  { upright: string; reversed: string }
> = {
  // ── WANDS ───────────────────────────────────────────────────────────────
  "Ace of Wands": {
    upright: "Inspiration, new opportunities, growth, potential bursting with creative fire.",
    reversed: "Delays, lack of motivation, creative blocks stifling new beginnings.",
  },
  "Two of Wands": {
    upright: "Future planning, progress, decisions, personal power expanding toward new horizons.",
    reversed: "Personal goals misaligned, lack of planning, fear of the unknown holding back.",
  },
  "Three of Wands": {
    upright: "Expansion, foresight, overseas opportunities, initial plans coming to fruition.",
    reversed: "Playing it safe, unexpected delays, obstacles blocking forward momentum.",
  },
  "Four of Wands": {
    upright: "Celebration, joy, harmony, relaxation, community and homecoming bringing peace.",
    reversed: "Personal celebration, inner harmony, conflict at home creating tension.",
  },
  "Five of Wands": {
    upright: "Conflict, disagreements, competition, tension, clashing energies seeking resolution.",
    reversed: "Inner conflict avoided, conflict suppressed, avoiding necessary confrontation.",
  },
  "Six of Wands": {
    upright: "Success, public recognition, progress, self-confidence validated by achievement.",
    reversed: "Egotism, disrepute, lack of recognition despite genuine effort.",
  },
  "Seven of Wands": {
    upright: "Challenge, competition, perseverance, maintaining your position under pressure.",
    reversed: "Exhausted, giving up, overwhelmed by opposition, defensive stance draining.",
  },
  "Eight of Wands": {
    upright: "Movement, fast-paced change, action, swift progress toward your destination.",
    reversed: "Delays, frustration, resisting change, scattered energy with no clear direction.",
  },
  "Nine of Wands": {
    upright: "Resilience, courage, persistence, test of faith nearing its end.",
    reversed: "Inner resources depleted, hesitation, refusing to compromise causing stalemate.",
  },
  "Ten of Wands": {
    upright: "Burden, extra responsibility, hard work, duties overwhelming but near completion.",
    reversed: "Doing it all yourself, difficulty delegating, collapse under unbearable pressure.",
  },
  "Page of Wands": {
    upright: "Exploration, excitement, freedom, a free-spirited messenger of creative inspiration.",
    reversed: "Setbacks to new ideas, hasty action without reflection, lack of direction.",
  },
  "Knight of Wands": {
    upright: "Energy, passion, inspired action, a charming adventurer charging toward a goal.",
    reversed: "Anger, impulsiveness, recklessness, scattered energy burning out too fast.",
  },
  "Queen of Wands": {
    upright: "Courage, confidence, independence, a bold and vivacious natural leader.",
    reversed: "Self-respect lacking, jealousy, temperamental outbursts, demanding nature.",
  },
  "King of Wands": {
    upright: "Natural-born leader, vision, entrepreneur, a bold visionary turning dreams to reality.",
    reversed: "Impulsiveness, haste, ruthlessness, expectations set impossibly high.",
  },

  // ── CUPS ────────────────────────────────────────────────────────────────
  "Ace of Cups": {
    upright: "Love, new relationships, compassion, creativity, emotional abundance overflowing.",
    reversed: "Self-love needed, repressed emotions, emptiness, disconnection from feelings.",
  },
  "Two of Cups": {
    upright: "Unified love, partnership, mutual attraction, a deep soul-level connection forming.",
    reversed: "Self-love lacking, imbalance in a partnership, broken communication.",
  },
  "Three of Cups": {
    upright: "Celebration, friendship, creativity, community gathering in joyful expression.",
    reversed: "Independence from the crowd, overindulgence, gossip undermining connection.",
  },
  "Four of Cups": {
    upright: "Meditation, contemplation, apathy, reevaluation of what truly matters.",
    reversed: "Retreat ended, awakening awareness, choosing to engage with life again.",
  },
  "Five of Cups": {
    upright: "Regret, failure, disappointment, focus on loss while blessings remain unseen.",
    reversed: "Personal setbacks accepted, moving on, finding peace after emotional loss.",
  },
  "Six of Cups": {
    upright: "Revisiting the past, childhood memories, innocence, nostalgia and simpler times.",
    reversed: "Living in the past, forgiveness needed, naïve idealism obscuring present truth.",
  },
  "Seven of Cups": {
    upright: "Opportunities, choices, wishful thinking, illusion clouding a path forward.",
    reversed: "Alignment with values, confusion clearing, decisive choice cutting through fog.",
  },
  "Eight of Cups": {
    upright: "Disappointment, abandonment, withdrawal, walking away in search of deeper meaning.",
    reversed: "Trying one more time, indecision, fear of moving on keeping you stuck.",
  },
  "Nine of Cups": {
    upright: "Contentment, satisfaction, gratitude, your wish granted and desires fulfilled.",
    reversed: "Inner happiness sought, materialism, dissatisfaction despite apparent success.",
  },
  "Ten of Cups": {
    upright: "Divine love, blissful relationships, harmony, family bonds and emotional fulfilment.",
    reversed: "Broken home, misaligned values, struggling to find lasting inner peace.",
  },
  "Page of Cups": {
    upright: "Creative opportunities, intuitive messages, curiosity, a dreamy emotional beginner.",
    reversed: "New ideas resisted, emotional immaturity, insecurity clouding expression.",
  },
  "Knight of Cups": {
    upright: "Creativity, romance, charm, imagination, a messenger bringing heartfelt invitations.",
    reversed: "Overactive imagination, unrealistic expectations, moodiness and jealousy.",
  },
  "Queen of Cups": {
    upright: "Compassionate, caring, emotionally stable, intuitive and in tune with others.",
    reversed: "Inner feelings neglected, codependency, giving too much at personal cost.",
  },
  "King of Cups": {
    upright: "Emotionally balanced, compassionate, diplomatic, a master of heart and wisdom.",
    reversed: "Self-compassion lacking, inner feelings suppressed, manipulative or moodiness.",
  },

  // ── SWORDS ──────────────────────────────────────────────────────────────
  "Ace of Swords": {
    upright: "Breakthroughs, new ideas, mental clarity, truth cutting through confusion.",
    reversed: "Confusion, brutality, chaos, a new idea without the clarity to pursue it.",
  },
  "Two of Swords": {
    upright: "Difficult decisions, weighing options, an impasse requiring a choice.",
    reversed: "Indecision, confusion, information overload, paralysis by too many options.",
  },
  "Three of Swords": {
    upright: "Heartbreak, emotional pain, sorrow, grief and disappointment cutting deep.",
    reversed: "Negative self-talk, releasing pain, forgiveness allowing healing to begin.",
  },
  "Four of Swords": {
    upright: "Rest, relaxation, meditation, recuperation from conflict or illness.",
    reversed: "Exhaustion, burn-out, deep rest needed, inability to quiet a restless mind.",
  },
  "Five of Swords": {
    upright: "Conflict, disagreements, competition, defeat acknowledged, tension unresolved.",
    reversed: "Reconciliation, making amends, moving past old conflict and resentment.",
  },
  "Six of Swords": {
    upright: "Transition, change, rite of passage, moving toward calmer waters ahead.",
    reversed: "Personal transition, resistance to change, emotional baggage slowing progress.",
  },
  "Seven of Swords": {
    upright: "Betrayal, deception, getting away with something, strategy used to avoid conflict.",
    reversed: "Imposter syndrome, self-deceit, coming clean, conscience demanding truth.",
  },
  "Eight of Swords": {
    upright: "Negative thoughts, self-imposed restriction, victim mentality, trapped by the mind.",
    reversed: "Self-limiting beliefs released, open to new perspectives, reclaiming inner power.",
  },
  "Nine of Swords": {
    upright: "Anxiety, worry, fear, depression, nightmares born of an overwhelmed mind.",
    reversed: "Inner turmoil, reaching out for help, hopelessness beginning to lift.",
  },
  "Ten of Swords": {
    upright: "Painful endings, deep wounds, betrayal, loss and crisis reaching its lowest point.",
    reversed: "Recovery, regeneration, resisting an inevitable end, a crisis finally bottoming out.",
  },
  "Page of Swords": {
    upright: "New ideas, curiosity, thirst for knowledge, communicating with sharp wit.",
    reversed: "All talk, manipulation, a harsh tongue causing unnecessary wounds.",
  },
  "Knight of Swords": {
    upright: "Ambitious, action-oriented, driven to succeed, charging forward with a sharp mind.",
    reversed: "Restless, unfocused, rushing in, impulsive action creating unintended damage.",
  },
  "Queen of Swords": {
    upright: "Independent, unbiased judgement, clear boundaries, honest communication.",
    reversed: "Overly emotional, easily influenced, bitter words masking deeper pain.",
  },
  "King of Swords": {
    upright: "Mental clarity, intellectual power, authority, clear and ethical decision-making.",
    reversed: "Quiet power misused, manipulative, tyrannical, abuse of intellect and authority.",
  },

  // ── PENTACLES ───────────────────────────────────────────────────────────
  "Ace of Pentacles": {
    upright: "New financial opportunity, manifestation, abundance, a seed of material prosperity.",
    reversed: "Lost opportunity, lack of planning, scarcity mindset blocking material growth.",
  },
  "Two of Pentacles": {
    upright: "Multiple priorities, time management, prioritisation, adapting to constant change.",
    reversed: "Over-committed, disorganisation, reprioritisation needed to restore balance.",
  },
  "Three of Pentacles": {
    upright: "Teamwork, initial fulfilment, collaboration, skilled work recognised and appreciated.",
    reversed: "Disharmony in teamwork, misaligned goals, learning from failed collaboration.",
  },
  "Four of Pentacles": {
    upright: "Saving money, security, conservatism, stability built through careful stewardship.",
    reversed: "Over-spending, greed, materialism, hoarding out of fear rather than wisdom.",
  },
  "Five of Pentacles": {
    upright: "Financial loss, poverty, lack mindset, feeling left out in the cold by hardship.",
    reversed: "Recovery from financial loss, spiritual poverty, refusing available help.",
  },
  "Six of Pentacles": {
    upright: "Giving, receiving, sharing wealth, generosity creating cycles of abundance.",
    reversed: "Self-care, unpaid debts, selfishness, strings attached to apparent generosity.",
  },
  "Seven of Pentacles": {
    upright: "Long-term vision, sustainable results, perseverance, patient investment rewarded.",
    reversed: "Lack of long-term vision, limited success, impatience undermining steady growth.",
  },
  "Eight of Pentacles": {
    upright: "Apprenticeship, repetitive tasks, mastery through diligence and focused skill.",
    reversed: "Self-development lacking, perfectionism, no ambition, work becoming drudgery.",
  },
  "Nine of Pentacles": {
    upright: "Abundance, luxury, self-sufficiency, fruits of dedicated labour enjoyed fully.",
    reversed: "Self-worth tied to finances, over-investment in work, comfort at a hidden cost.",
  },
  "Ten of Pentacles": {
    upright: "Wealth, financial security, family legacy, long-term success and lasting prosperity.",
    reversed: "Financial failure, loneliness, loss of family stability, legacy questioned.",
  },
  "Page of Pentacles": {
    upright: "Ambition, desire, diligence, a student with a practical and grounded approach.",
    reversed: "Lack of progress, procrastination, laziness undermining real-world goals.",
  },
  "Knight of Pentacles": {
    upright: "Hard work, productivity, routine, a methodical achiever with a reliable nature.",
    reversed: "Self-discipline lacking, boredom, feeling stuck in a suffocating routine.",
  },
  "Queen of Pentacles": {
    upright: "Nurturing, practical, providing financially, a homebody who creates comfort for all.",
    reversed: "Financial independence sought, self-care neglected, smothering practicality.",
  },
  "King of Pentacles": {
    upright: "Wealth, business, leadership, security, a disciplined patriarch of material success.",
    reversed: "Financially inept, obsessed with wealth, stubbornness blocking true abundance.",
  },
};

// ---------------------------------------------------------------------------
// Build Minor Arcana array
// ---------------------------------------------------------------------------
function buildMinorArcana(): TarotCard[] {
  const cards: TarotCard[] = [];
  const suits: Suit[] = ["Wands", "Cups", "Swords", "Pentacles"];
  let id = 22;

  for (const suit of suits) {
    // Pip cards (Ace–Ten)
    for (const pip of PIPS) {
      const name = `${pip.name} of ${suit}`;
      const slug = name.toLowerCase().replace(/\s+/g, "-");
      cards.push({
        id: id++,
        name,
        arcana: "Minor",
        suit,
        number: pip.number,
        upright: MINOR_MEANINGS[name]?.upright ?? `${SUIT_THEMES[suit].tone.charAt(0).toUpperCase() + SUIT_THEMES[suit].tone.slice(1)} energy of ${SUIT_THEMES[suit].domain}.`,
        reversed: MINOR_MEANINGS[name]?.reversed ?? `Blocked or imbalanced ${SUIT_THEMES[suit].domain} energy requiring attention.`,
        image: `/cards/minor/${suit.toLowerCase()}/${slug}.jpg`,
      });
    }
    // Court cards
    for (const court of COURT) {
      const name = `${court.name} of ${suit}`;
      const slug = name.toLowerCase().replace(/\s+/g, "-");
      cards.push({
        id: id++,
        name,
        arcana: "Minor",
        suit,
        number: court.number,
        upright: MINOR_MEANINGS[name]?.upright ?? `Mature ${SUIT_THEMES[suit].domain} energy embodied with mastery.`,
        reversed: MINOR_MEANINGS[name]?.reversed ?? `Immature or distorted ${SUIT_THEMES[suit].domain} energy expressed negatively.`,
        image: `/cards/minor/${suit.toLowerCase()}/${slug}.jpg`,
      });
    }
  }

  return cards;
}

export const ALL_CARDS: TarotCard[] = [
  ...MAJOR_ARCANA,
  ...buildMinorArcana(),
];

export const MAJOR_CARDS = ALL_CARDS.filter((c) => c.arcana === "Major");
export const MINOR_CARDS = ALL_CARDS.filter((c) => c.arcana === "Minor");
