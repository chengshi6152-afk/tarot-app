import { ALL_CARDS, TarotCard } from "./tarot-data";

export type Orientation = "Upright" | "Reversed";

export type DrawnCard = {
  card: TarotCard;
  orientation: Orientation;
  meaning: string;
};

// ---------------------------------------------------------------------------
// Core randomizers
// ---------------------------------------------------------------------------

/** Cryptographically seeded random integer 0 ≤ n < max */
function secureRandInt(max: number): number {
  if (typeof window !== "undefined" && window.crypto) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  return Math.floor(Math.random() * max);
}

/** Returns "Upright" or "Reversed" with a 50 / 50 chance */
function randomOrientation(): Orientation {
  return secureRandInt(2) === 0 ? "Upright" : "Reversed";
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Draw a single random card from the full deck.
 */
export function drawCard(deck: TarotCard[] = ALL_CARDS): DrawnCard {
  const card = deck[secureRandInt(deck.length)];
  const orientation = randomOrientation();
  return {
    card,
    orientation,
    meaning: orientation === "Upright" ? card.upright : card.reversed,
  };
}

/**
 * Draw `count` unique cards (no repeats within the spread).
 */
export function drawSpread(
  count: number,
  deck: TarotCard[] = ALL_CARDS
): DrawnCard[] {
  if (count > deck.length) {
    throw new Error(`Cannot draw ${count} cards from a deck of ${deck.length}.`);
  }

  // Fisher-Yates shuffle on a copy of the deck, then take `count` cards
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = secureRandInt(i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count).map((card) => {
    const orientation = randomOrientation();
    return {
      card,
      orientation,
      meaning: orientation === "Upright" ? card.upright : card.reversed,
    };
  });
}

/**
 * Draw a classic three-card spread: Past, Present, Future.
 */
export function drawThreeCardSpread(): {
  past: DrawnCard;
  present: DrawnCard;
  future: DrawnCard;
} {
  const [past, present, future] = drawSpread(3);
  return { past, present, future };
}
