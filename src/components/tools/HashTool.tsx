
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Upload, RefreshCw } from "lucide-react";

// Function to convert ArrayBuffer to hex string
const bufferToHex = (buffer: ArrayBuffer): string => {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

export default function HashTool() {
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [hashAlgorithm, setHashAlgorithm] = useState<string>("SHA-256");
  const [hashResult, setHashResult] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [outputFormat, setOutputFormat] = useState<"hex" | "base64">("hex");
  const [uppercaseOutput, setUppercaseOutput] = useState<boolean>(false);
  
  // List of available hash algorithms
  const hashAlgorithms = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"];

  const generateHash = async () => {
    setIsProcessing(true);
    setHashResult("");
    
    try {
      let data: ArrayBuffer;
      
      if (selectedFile) {
        data = await selectedFile.arrayBuffer();
      } else {
        // Convert string to ArrayBuffer for consistent API
        const encoder = new TextEncoder();
        data = encoder.encode(text);
      }
      
      // Use the Web Crypto API to generate the hash
      const algorithm = hashAlgorithm.replace('-', '').toLowerCase();
      const hashBuffer = await window.crypto.subtle.digest(algorithm, data);
      
      // Convert the hash to the desired format
      let result = '';
      if (outputFormat === 'hex') {
        result = bufferToHex(hashBuffer);
        if (uppercaseOutput) {
          result = result.toUpperCase();
        }
      } else {
        // Convert to Base64
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashBase64 = btoa(String.fromCharCode(...hashArray));
        result = hashBase64;
      }
      
      setHashResult(result);
    } catch (error) {
      setHashResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setFileSize(file.size);
      setText("");
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setFileName(null);
    setFileSize(null);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hashResult)
      .then(() => alert("Hash copied to clipboard!"))
      .catch(err => console.error("Could not copy text: ", err));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hash Generator</CardTitle>
        <CardDescription>
          Generate secure cryptographic hashes from text or files.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="text">
          <TabsList className="mb-4">
            <TabsTrigger value="text">Text Input</TabsTrigger>
            <TabsTrigger value="file">File Input</TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="text-input">Text to Hash</Label>
              <Textarea
                id="text-input"
                placeholder="Enter text to generate a hash..."
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  clearFile();
                }}
                className="min-h-[100px]"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="file" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="file-input">File to Hash</Label>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  className="w-full h-24 flex flex-col items-center justify-center border-dashed"
                  onClick={() => document.getElementById("file-input")?.click()}
                >
                  <input 
                    id="file-input" 
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Upload className="h-6 w-6 mb-2" />
                  <span>Click to select file</span>
                  <span className="text-xs text-muted-foreground mt-1">or drag and drop</span>
                </Button>
              </div>
              
              {fileName && (
                <div className="mt-4 p-3 border rounded-md flex justify-between items-center">
                  <div>
                    <p className="font-medium truncate max-w-[250px]">{fileName}</p>
                    <p className="text-sm text-muted-foreground">
                      {fileSize ? `${(fileSize / 1024).toFixed(2)} KB` : ""}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={clearFile}>
                    Clear
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <Label>Hash Algorithm</Label>
              <RadioGroup 
                value={hashAlgorithm} 
                onValueChange={setHashAlgorithm}
                className="flex flex-wrap gap-4"
              >
                {hashAlgorithms.map((algorithm) => (
                  <div key={algorithm} className="flex items-center space-x-2">
                    <RadioGroupItem value={algorithm} id={`algorithm-${algorithm}`} />
                    <Label htmlFor={`algorithm-${algorithm}`} className="cursor-pointer">
                      {algorithm}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <Label>Output Format</Label>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    id="format-hex" 
                    value="hex" 
                    checked={outputFormat === "hex"}
                    onClick={() => setOutputFormat("hex")}
                  />
                  <Label htmlFor="format-hex" className="cursor-pointer">Hexadecimal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem 
                    id="format-base64" 
                    value="base64" 
                    checked={outputFormat === "base64"}
                    onClick={() => setOutputFormat("base64")}
                  />
                  <Label htmlFor="format-base64" className="cursor-pointer">Base64</Label>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="uppercase" 
                checked={uppercaseOutput}
                onCheckedChange={(checked) => setUppercaseOutput(checked === true)}
                disabled={outputFormat !== "hex"}
              />
              <Label 
                htmlFor="uppercase" 
                className={`cursor-pointer ${outputFormat !== "hex" ? "opacity-50" : ""}`}
              >
                Uppercase output (hexadecimal only)
              </Label>
            </div>
            
            <Button 
              onClick={generateHash} 
              disabled={isProcessing || (!text && !selectedFile)}
              className="w-full"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : "Generate Hash"}
            </Button>
            
            {hashResult && (
              <div className="space-y-2 mt-4">
                <div className="flex justify-between items-center">
                  <Label htmlFor="hash-result">{hashAlgorithm} Hash Result</Label>
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="p-3 border rounded-md bg-muted/50 font-mono text-sm break-all">
                  {hashResult}
                </div>
              </div>
            )}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}
