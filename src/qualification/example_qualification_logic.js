/**
 * example_qualification_logic.js
 *
 * ILLUSTRATIVE ONLY — SYNTHETIC RECONSTRUCTION.
 *
 * This is NOT the client's original qualification logic or criteria.
 * The actual production criteria were provided by the client and are no
 * longer known to me; I have not attempted to reconstruct them from memory.
 *
 * This module demonstrates the *pattern* used in the production system:
 *   1. Duplicate check against a persistent store (Supabase in production)
 *   2. Cheap pre-filter rules before invoking the LLM
 *   3. LLM-assisted analysis against acquisition criteria
 *   4. Classification into Qualified / Not Qualified
 *
 * The specific thresholds and rules below are fabricated for demonstration.
 */

/**
 * Simulates a duplicate check against a persistence layer.
 * In production this queried Supabase by a stable property identifier.
 */
function isDuplicate(property, processedIds) {
  return processedIds.has(property.property_id);
}

/**
 * ILLUSTRATIVE pre-filter rules — synthetic thresholds, not the client's criteria.
 * Purpose: eliminate obviously non-viable properties cheaply, before the
 * more expensive LLM-based analysis step.
 */
function passesPreFilter(property) {
  const MIN_VALUE = 50000;   // synthetic threshold
  const MAX_VALUE = 500000;  // synthetic threshold

  if (!property.owner_occupied) return false;
  if (property.estimated_value < MIN_VALUE || property.estimated_value > MAX_VALUE) return false;

  return true;
}

/**
 * ILLUSTRATIVE distress-signal scoring — synthetic, not the client's model.
 * In production, this kind of judgment was likely assisted by an LLM
 * reasoning over unstructured signals; here it's simplified to keyword
 * matching purely for demo purposes.
 */
function hasDistressSignal(property) {
  const signal = (property.mortgage_status_signal || "").toLowerCase();
  const distressKeywords = ["delinquent", "pre-foreclosure", "default", "nod filed"];
  return distressKeywords.some((kw) => signal.includes(kw));
}

/**
 * ILLUSTRATIVE qualification decision.
 * Combines pre-filter + a synthetic "criteria analysis" step.
 * In production, the criteria-analysis step likely involved an LLM call;
 * here it's a simple rule for demonstration purposes only.
 */
function qualifyProperty(property, processedIds) {
  if (isDuplicate(property, processedIds)) {
    return { property_id: property.property_id, status: "skipped", reason: "duplicate" };
  }

  if (!passesPreFilter(property)) {
    return { property_id: property.property_id, status: "not_qualified", reason: "failed pre-filter (synthetic rule)" };
  }

  if (!hasDistressSignal(property)) {
    return { property_id: property.property_id, status: "not_qualified", reason: "no distress signal detected (synthetic rule)" };
  }

  if (property.tax_delinquent === true) {
    return {
      property_id: property.property_id,
      status: "qualified",
      reason: "distress signal + tax delinquency present (synthetic rule)",
    };
  }

  return {
    property_id: property.property_id,
    status: "qualified",
    reason: "distress signal present (synthetic rule)",
  };
}

/**
 * Processes a batch of properties, mirroring the production pipeline shape:
 * batch in -> duplicate check -> filter -> qualify -> results out.
 */
function processBatch(properties, processedIds = new Set()) {
  return properties.map((property) => qualifyProperty(property, processedIds));
}

module.exports = {
  isDuplicate,
  passesPreFilter,
  hasDistressSignal,
  qualifyProperty,
  processBatch,
};

// --- Example usage (synthetic data) ---
if (require.main === module) {
  const properties = require("../../data/synthetic/properties.json").properties;
  const alreadyProcessed = new Set(); // e.g., new Set(["SYN-0003"])

  const results = processBatch(properties, alreadyProcessed);
  console.log(JSON.stringify(results, null, 2));
}
