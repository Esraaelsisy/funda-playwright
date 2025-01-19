import localizationData from "../data/localization.json";

export class LocalizationHelper {
  static getLocalizedText(
    category: "messages" | "buttons",
    key: string
  ): string {
    const localizedCategory = localizationData[category];
    const language = process.env.LANGUAGE || "NL";
    if (!localizedCategory) {
      throw new Error(`Localization category '${category}' not found.`);
    }

    const localizedData = localizedCategory[language];
    if (!localizedData) {
      throw new Error(
        `Localization for language '${language}' not found in category '${category}'.`
      );
    }

    const localizedText = localizedData[key];
    if (!localizedText) {
      throw new Error(
        `Localization key '${key}' not found in category '${category}' for language '${language}'.`
      );
    }

    return localizedText;
  }
}
