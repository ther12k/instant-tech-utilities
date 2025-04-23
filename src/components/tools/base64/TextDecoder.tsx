
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { decodeBase64 } from "@/utils/base64Utils";

export default function TextDecoder() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");

  const handleDecode = () => {
    const { result, error } = decodeBase64(text);
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
        <Label htmlFor="input-base64">Base64 to Decode</Label>
        <Textarea 
          id="input-base64"
          placeholder="Enter Base64 string to decode..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      
      <Button onClick={handleDecode} disabled={!text}>Decode from Base64</Button>
      
      {result && (
        <div className="space-y-2 mt-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="result-decoded">Decoded Result</Label>
            <Button variant="outline" size="sm" onClick={() => handleCopy(result)}>
              Copy
            </Button>
          </div>
          <Textarea 
            id="result-decoded"
            readOnly 
            value={result}
            className="min-h-[100px]"
          />
        </div>
      )}
    </div>
  );
}
