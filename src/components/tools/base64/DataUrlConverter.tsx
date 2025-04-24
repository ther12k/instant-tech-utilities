
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, FileCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function DataUrlConverter() {
  const [base64Input, setBase64Input] = useState("");
  const [dataUrl, setDataUrl] = useState("");
  const [mimeType, setMimeType] = useState("image/png");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConvert = () => {
    setError(null);
    
    try {
      if (!base64Input.trim()) {
        setError("Please enter a Base64 string");
        return;
      }

      // Try to decode the base64 string to validate it
      try {
        atob(base64Input.trim());
      } catch (e) {
        setError("Invalid Base64 string");
        return;
      }

      const result = `data:${mimeType};base64,${base64Input.trim()}`;
      setDataUrl(result);
    } catch (err) {
      setError("An error occurred during conversion");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dataUrl);
    toast({
      title: "Copied to clipboard",
      description: "Data URL has been copied to your clipboard",
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="base64-input" className="text-sm font-medium">
          Base64 String
        </label>
        <Textarea
          id="base64-input"
          placeholder="Enter Base64 string without the data:mimetype;base64, prefix"
          value={base64Input}
          onChange={(e) => setBase64Input(e.target.value)}
          rows={4}
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <label htmlFor="mime-type" className="text-sm font-medium">
            MIME Type
          </label>
          <select
            id="mime-type"
            className="w-full px-3 py-2 border rounded-md"
            value={mimeType}
            onChange={(e) => setMimeType(e.target.value)}
          >
            <option value="image/png">image/png</option>
            <option value="image/jpeg">image/jpeg</option>
            <option value="image/gif">image/gif</option>
            <option value="image/svg+xml">image/svg+xml</option>
            <option value="image/webp">image/webp</option>
            <option value="audio/mpeg">audio/mpeg</option>
            <option value="audio/wav">audio/wav</option>
            <option value="video/mp4">video/mp4</option>
            <option value="application/pdf">application/pdf</option>
            <option value="application/json">application/json</option>
          </select>
        </div>

        <div className="pt-6">
          <Button onClick={handleConvert}>
            Convert to Data URL
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {dataUrl && !error && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Data URL</label>
            <Button
              size="sm"
              variant="outline"
              onClick={copyToClipboard}
              className="flex items-center"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
          <div className="p-3 bg-muted rounded-md break-all">
            <pre className="text-xs overflow-x-auto whitespace-pre-wrap">
              {dataUrl}
            </pre>
          </div>

          {mimeType.startsWith("image/") && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Preview:</p>
              <div className="p-4 bg-muted/50 rounded-md flex justify-center">
                <img
                  src={dataUrl}
                  alt="Data URL preview"
                  className="max-h-64 object-contain"
                  onError={() => setError("Invalid image data")}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
