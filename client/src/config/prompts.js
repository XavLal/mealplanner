import FIXED_JSON_RULES_RAW from "@/config/fixed_json_rules.md?raw";

/**
 * Defaults (texte) pour l'utilisateur.
 * Ces valeurs ne sont modifiables que dans le fichier de config (dev).
 * L'utilisateur peut ensuite les remettre avec les boutons dédiés dans l'UI.
 */
export const DEFAULT_FAMILY_CONTEXT =
  "- Taille de la famille : 4\n- Contraintes : cuisine maison, horaires réalistes, zéro gâchis.\n";

export const DEFAULT_TASTES_CONTEXT =
  "- Préférences : légumes, plats équilibrés\n- Éviter : trop épicé\n- Allergies : aucune connue\n";

export const DEFAULT_CULINARY_STYLE_CONTEXT =
  "- Style : méditerranéen\n- Durée : 30-45 minutes\n- Niveau : simple (ingrédients faciles)\n";

export const DEFAULT_EQUIPMENT_CONTEXT =
  "- Four\n- Plaque de cuisson\n- Poêle\n- Mixeur (optionnel)\n";

export const DEFAULT_USER_CONTEXT =
  [
    "Famille (taille / contraintes) :",
    DEFAULT_FAMILY_CONTEXT.trim(),
    "",
    "Goûts (préférences / allergies) :",
    DEFAULT_TASTES_CONTEXT.trim(),
    "",
    "Style culinaire :",
    DEFAULT_CULINARY_STYLE_CONTEXT.trim(),
    "",
    "Équipements disponibles :",
    DEFAULT_EQUIPMENT_CONTEXT.trim(),
  ].join("\n");

// Règles strictes de sortie JSON (NE PAS exposer dans l'UI).
export const FIXED_JSON_RULES = FIXED_JSON_RULES_RAW;

