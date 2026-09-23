/**
 * example_offer_calculator.js
 *
 * ILLUSTRATIVE ONLY — SYNTHETIC RECONSTRUCTION.
 *
 * This is NOT the client's proprietary offer-calculation formula.
 * The actual production formulas, offer type names, and business logic
 * are no longer known to me and have not been reconstructed or guessed at.
 *
 * What IS confirmed from the production system:
 *   - Numeric offer calculations were done in deterministic JavaScript,
 *     not left to the LLM, specifically to avoid numeric hallucination.
 *   - Two offers were generated per qualified property.
 *
 * This module demonstrates that architectural pattern using a clearly
 * fabricated, simplified example formula.
 */

/**
 * ILLUSTRATIVE formula — synthetic, for demonstration only.
 * Computes a simple "as-is cash offer" style figure as a percentage
 * of estimated value, adjusted by a synthetic condition factor.
 *
 * This is NOT how the client's actual system calculated offers.
 */
function calculateOfferA(property) {
  const BASE_PERCENTAGE = 0.85; // synthetic, arbitrary
  const conditionAdjustment = estimateConditionAdjustment(property); // synthetic

  const rawOffer = property.estimated_value * BASE_PERCENTAGE * conditionAdjustment;
  return roundToNearest(rawOffer, 500);
}

/**
 * ILLUSTRATIVE second offer type — synthetic "flexible terms" variant,
 * calculated slightly differently to demonstrate that two distinct offers
 * were generated. Not the client's actual second offer type.
 */
function calculateOfferB(property) {
  const BASE_PERCENTAGE = 0.81; // synthetic, arbitrary, deliberately different from Offer A
  const conditionAdjustment = estimateConditionAdjustment(property);

  const rawOffer = property.estimated_value * BASE_PERCENTAGE * conditionAdjustment;
  return roundToNearest(rawOffer, 500);
}

/**
 * ILLUSTRATIVE condition adjustment factor — synthetic.
 * A real system might derive this from property age, square footage,
 * inspection data, or other signals. This example just uses year built
 * as a rough, fabricated proxy.
 */
function estimateConditionAdjustment(property) {
  const age = new Date().getFullYear() - (property.year_built || 2000);
  if (age > 50) return 0.92;
  if (age > 25) return 0.96;
  return 1.0;
}

function roundToNearest(value, nearest) {
  return Math.round(value / nearest) * nearest;
}

/**
 * Generates both offers for a qualified property.
 * Mirrors the production pattern: deterministic JS calculation,
 * not an LLM-generated number.
 */
function generateOffers(property) {
  return {
    property_id: property.property_id,
    offer_a: {
      amount: calculateOfferA(property),
      terms: "Standard close, synthetic example terms",
    },
    offer_b: {
      amount: calculateOfferB(property),
      terms: "Flexible timeline, synthetic example terms",
    },
    formula_notice: "ILLUSTRATIVE ONLY — synthetic formula, not the client's proprietary calculation.",
  };
}

module.exports = {
  calculateOfferA,
  calculateOfferB,
  estimateConditionAdjustment,
  generateOffers,
};

// --- Example usage (synthetic data) ---
if (require.main === module) {
  const properties = require("../../data/synthetic/properties.json").properties;
  const qualifiedExample = properties.find((p) => p.property_id === "SYN-0004");

  const offers = generateOffers(qualifiedExample);
  console.log(JSON.stringify(offers, null, 2));
}
