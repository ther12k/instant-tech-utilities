
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { encodeBase64 } from "@/utils/base64Utils";

export default function TextEncoder() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleEncode = () => {
    const { result, error } = encodeBase64(text);
    setResult(error || result);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch(err => console.error("Could not copy text: ", err));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="input-text">Text to Encode</Label>
        <Textarea 
          id="input-text"
          placeholder="Enter text to convert to Base64..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      
      <Button onClick={handleEncode} disabled={!text}>Encode to Base64</Button>
      
      {result && (
        <div className="space-y-2 mt-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="result-text">Encoded Result</Label>
            <Button variant="outline" size="sm" onClick={() => handleCopy(result)}>
              Copy
            </Button>
          </div>
          <Textarea 
            id="result-text"
            readOnly 
            value={result}
            className="min-h-[100px]"
          />
        </div>
      )}
    </div>
  );
}
