
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function UrlEncoder() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleEncode = () => {
    try {
      const encoded = encodeURIComponent(input);
      setResult(encoded);
      toast.success("URL encoded successfully");
    } catch (error) {
      toast.error("Failed to encode URL");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
      .then(() => toast.success("Copied to clipboard"))
      .catch(() => toast.error("Failed to copy"));
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="url-input">URL to Encode</Label>
        <Textarea 
          id="url-input"
          placeholder="Enter URL or text to encode..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      
      <Button onClick={handleEncode} disabled={!input}>
        Encode URL
      </Button>
      
      {result && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="result">Encoded Result</Label>
            <Button variant="outline" size="sm" onClick={handleCopy}>
              Copy
            </Button>
          </div>
          <Textarea 
            id="result"
            readOnly
            value={result}
            className="min-h-[100px]"
          />
        </div>
      )}
    </div>
  );
}
