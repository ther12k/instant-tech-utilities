
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function UrlDecoder() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(input);
      setResult(decoded);
      toast.success("URL decoded successfully");
    } catch (error) {
      toast.error("Invalid URL encoding");
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
        <Label htmlFor="url-input">Encoded URL</Label>
        <Textarea 
          id="url-input"
          placeholder="Enter encoded URL to decode..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      
      <Button onClick={handleDecode} disabled={!input}>
        Decode URL
      </Button>
      
      {result && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="result">Decoded Result</Label>
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
