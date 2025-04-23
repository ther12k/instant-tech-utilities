
export const encodeBase64 = (text: string): { result: string; error?: string } => {
  try {
    const encoded = btoa(text);
    return { result: encoded };
  } catch (error) {
    return { result: "", error: "Could not encode text. Make sure it contains valid characters." };
  }
};

export const decodeBase64 = (text: string): { result: string; error?: string } => {
  try {
    const decoded = atob(text);
    return { result: decoded };
  } catch (error) {
    return { result: "", error: "Invalid Base64 string." };
  }
};
