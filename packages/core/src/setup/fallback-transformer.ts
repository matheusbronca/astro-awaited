export function transformFallbackComponents(
  code: string,
  componentName: string,
  slotName: string,
): string {
  // Regular expression to match Fallback components without slot attribute
  const fallbackRegex = new RegExp(
    `<${componentName}(?![^>]*\\sslot=)([^>]*?)(\/?)>`,
    "gi",
  );

  // Replace Fallback components to include slot="fallback"
  return code.replace(fallbackRegex, (match, attributes, selfClosing) => {
    // Clean up attributes and add slot
    const cleanAttributes = attributes.trim();
    const slotAttribute = `slot="${slotName}"`;

    if (cleanAttributes) {
      return `<${componentName} ${cleanAttributes} ${slotAttribute}${selfClosing ? " /" : ""}>`;
    } else {
      return `<${componentName} ${slotAttribute}${selfClosing ? " /" : ""}>`;
    }
  });
}
