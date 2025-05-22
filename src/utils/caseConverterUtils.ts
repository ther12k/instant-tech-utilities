export const toCamelCase = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (char) => char.toLowerCase());
};

export const toSnakeCase = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/([A-Z])/g, '_$1')
    .replace(/\s+/g, '_')
    .replace(/__+/g, '_')
    .replace(/^_/, '')
    .toLowerCase();
};

export const toPascalCase = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, (char) => char.toUpperCase());
};

export const toKebabCase = (text: string): string => {
  if (!text) return '';
  return text
    .replace(/([A-Z])/g, '-$1')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .replace(/^-/, '')
    .toLowerCase();
};

export const toUpperCaseText = (text: string): string => {
  if (!text) return '';
  return text.toUpperCase();
};

export const toLowerCaseText = (text: string): string => {
  if (!text) return '';
  return text.toLowerCase();
};
