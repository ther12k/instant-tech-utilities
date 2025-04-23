
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TextEncoder from "./base64/TextEncoder";
import TextDecoder from "./base64/TextDecoder";
import ImageEncoder from "./base64/ImageEncoder";

export default function Base64Tool() {
  const [activeTab, setActiveTab] = useState("encode");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
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
          
          <TabsContent value="encode">
            <TextEncoder />
          </TabsContent>
          
          <TabsContent value="decode">
            <TextDecoder />
          </TabsContent>
          
          <TabsContent value="image">
            <ImageEncoder />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
