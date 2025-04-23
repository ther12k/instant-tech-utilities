
import { useState, useCallback, ChangeEvent } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Base64Tool() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [activeTab, setActiveTab] = useState("encode");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageResult, setImageResult] = useState<string | null>(null);

  // Text Base64 conversion
  const encodeBase64 = useCallback(() => {
    try {
      const encoded = btoa(text);
      setResult(encoded);
    } catch (error) {
      setResult("Error: Could not encode text. Make sure it contains valid characters.");
    }
  }, [text]);

  const decodeBase64 = useCallback(() => {
    try {
      const decoded = atob(text);
      setResult(decoded);
    } catch (error) {
      setResult("Error: Invalid Base64 string.");
    }
  }, [text]);

  // Image Base64 conversion
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImagePreview(result);
      
      // Extract the Base64 part from the data URL
      const base64String = result.split(',')[1];
      setImageResult(base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setText("");
    setResult("");
    setImagePreview(null);
    setImageResult(null);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch(err => console.error("Could not copy text: ", err));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Base64 Encoder/Decoder</CardTitle>
        <CardDescription>
          Convert text to Base64 and vice versa, or encode images to Base64 strings for web embedding.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="encode" onValueChange={handleTabChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
            <TabsTrigger value="image">Image to Base64</TabsTrigger>
          </TabsList>
          
          <TabsContent value="encode" className="space-y-4">
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
            
            <Button onClick={encodeBase64} disabled={!text}>Encode to Base64</Button>
            
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
          </TabsContent>
          
          <TabsContent value="decode" className="space-y-4">
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
            
            <Button onClick={decodeBase64} disabled={!text}>Decode from Base64</Button>
            
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
          </TabsContent>
          
          <TabsContent value="image" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="image-upload">Upload Image</Label>
              <input 
                id="image-upload"
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload}
                className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary/10 file:text-primary
                  hover:file:bg-primary/20"
              />
            </div>
            
            {imagePreview && (
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Preview</Label>
                  <div className="mt-2 border rounded-md p-4 flex justify-center">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-[200px] object-contain"
                    />
                  </div>
                </div>
                
                {imageResult && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="result-image-base64">Base64 Result</Label>
                      <Button variant="outline" size="sm" onClick={() => handleCopy(imageResult)}>
                        Copy Base64
                      </Button>
                    </div>
                    <Textarea 
                      id="result-image-base64"
                      readOnly 
                      value={imageResult}
                      className="min-h-[100px] text-xs"
                    />
                    
                    <div className="pt-2">
                      <Label>For HTML IMG tag:</Label>
                      <div className="flex gap-2 mt-1">
                        <Textarea 
                          readOnly 
                          value={`<img src="data:image/png;base64,${imageResult}" alt="Base64 encoded image" />`}
                          className="text-xs"
                        />
                        <Button variant="outline" size="sm" onClick={() => handleCopy(`<img src="data:image/png;base64,${imageResult}" alt="Base64 encoded image" />`)}>
                          Copy
                        </Button>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Label>For CSS background:</Label>
                      <div className="flex gap-2 mt-1">
                        <Textarea 
                          readOnly 
                          value={`background-image: url(data:image/png;base64,${imageResult});`}
                          className="text-xs"
                        />
                        <Button variant="outline" size="sm" onClick={() => handleCopy(`background-image: url(data:image/png;base64,${imageResult});`)}>
                          Copy
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
