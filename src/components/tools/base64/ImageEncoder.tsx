
import { useState, ChangeEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ImageEncoder() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageResult, setImageResult] = useState<string | null>(null);

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

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch(err => console.error("Could not copy text: ", err));
  };

  return (
    <div className="space-y-4">
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
    </div>
  );
}
