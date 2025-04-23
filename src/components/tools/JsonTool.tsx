
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function JsonTool() {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indentSize, setIndentSize] = useState(2);
  const [sortKeys, setSortKeys] = useState(false);

  const formatJson = () => {
    try {
      setError(null);
      
      // Parse the input string to a JSON object
      const parsedJson = JSON.parse(jsonInput);
      
      // Format with specified options
      const formatted = JSON.stringify(
        parsedJson,
        sortKeys ? (key, value) => {
          // If this is an object (but not an array or null), sort its keys
          if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            return Object.fromEntries(
              Object.entries(value).sort((a, b) => a[0].localeCompare(b[0]))
            );
          }
          return value;
        } : null,
        indentSize
      );
      
      setFormattedJson(formatted);
    } catch (err) {
      setError("Invalid JSON: " + (err instanceof Error ? err.message : String(err)));
      setFormattedJson("");
    }
  };

  const minifyJson = () => {
    try {
      setError(null);
      
      // Parse the input string to a JSON object
      const parsedJson = JSON.parse(jsonInput);
      
      // Minify by using no whitespace
      const minified = JSON.stringify(parsedJson);
      
      setFormattedJson(minified);
    } catch (err) {
      setError("Invalid JSON: " + (err instanceof Error ? err.message : String(err)));
      setFormattedJson("");
    }
  };

  const validateJson = () => {
    try {
      setError(null);
      JSON.parse(jsonInput);
      setFormattedJson("✓ JSON is valid");
    } catch (err) {
      setError("Invalid JSON: " + (err instanceof Error ? err.message : String(err)));
      setFormattedJson("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson)
      .then(() => alert("Copied to clipboard!"))
      .catch(err => console.error("Could not copy text: ", err));
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJsonInput(text);
    } catch (err) {
      console.error("Failed to read clipboard: ", err);
      alert("Could not access clipboard. Please check your browser permissions.");
    }
  };

  const clearAll = () => {
    setJsonInput("");
    setFormattedJson("");
    setError(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>JSON Formatter & Validator</CardTitle>
        <CardDescription>
          Format, validate, or minify your JSON data with ease.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="format">
          <TabsList>
            <TabsTrigger value="format">Format & Validate</TabsTrigger>
          </TabsList>

          <TabsContent value="format" className="space-y-4 pt-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="json-input">JSON Input</Label>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" onClick={handlePaste}>
                    Paste
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearAll}>
                    Clear
                  </Button>
                </div>
              </div>
              <Textarea
                id="json-input"
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{"example": "Paste your JSON here"}'
                className="font-mono text-sm min-h-[200px]"
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-4">
                <Label htmlFor="indent-size" className="whitespace-nowrap">
                  Indent Size:
                </Label>
                <Input
                  id="indent-size"
                  type="number"
                  min={0}
                  max={8}
                  value={indentSize}
                  onChange={(e) => setIndentSize(Number(e.target.value))}
                  className="w-16"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="sort-keys">Sort Object Keys:</Label>
                <Switch
                  id="sort-keys"
                  checked={sortKeys}
                  onCheckedChange={setSortKeys}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={formatJson} disabled={!jsonInput}>
                Format & Validate
              </Button>
              <Button variant="outline" onClick={minifyJson} disabled={!jsonInput}>
                Minify
              </Button>
              <Button variant="outline" onClick={validateJson} disabled={!jsonInput}>
                Validate Only
              </Button>
            </div>

            {formattedJson && (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between">
                  <Label htmlFor="result">Result</Label>
                  <Button variant="outline" size="sm" onClick={handleCopy}>
                    Copy
                  </Button>
                </div>
                <Textarea
                  id="result"
                  readOnly
                  value={formattedJson}
                  className="font-mono text-sm min-h-[200px]"
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
