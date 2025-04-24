
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

export const createDataUrl = (base64: string, mimeType: string): { result: string; error?: string } => {
  try {
    // Validate base64 string
    try {
      atob(base64.trim());
    } catch (e) {
      return { result: "", error: "Invalid Base64 string." };
    }
    
    return { result: `data:${mimeType};base64,${base64.trim()}` };
  } catch (error) {
    return { result: "", error: "Failed to create Data URL." };
  }
};

export const extractBase64FromDataUrl = (dataUrl: string): { result: string; mimeType: string; error?: string } => {
  try {
    const regex = /^data:([^;]+);base64,(.+)$/;
    const matches = dataUrl.match(regex);
    
    if (!matches || matches.length !== 3) {
      return { result: "", mimeType: "", error: "Invalid Data URL format." };
    }
    
    return { result: matches[2], mimeType: matches[1] };
  } catch (error) {
    return { result: "", mimeType: "", error: "Failed to extract Base64 from Data URL." };
  }
};
