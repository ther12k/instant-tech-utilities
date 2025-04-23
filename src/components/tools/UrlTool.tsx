
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UrlEncoder from "./url/UrlEncoder";
import UrlDecoder from "./url/UrlDecoder";

export default function UrlTool() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>URL Encoder/Decoder</CardTitle>
        <CardDescription>
          Encode or decode URLs and query parameters. Handles special characters and UTF-8 encoding.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="encode">
          <TabsList className="mb-4">
            <TabsTrigger value="encode">Encode</TabsTrigger>
            <TabsTrigger value="decode">Decode</TabsTrigger>
          </TabsList>
          
          <TabsContent value="encode">
            <UrlEncoder />
          </TabsContent>
          
          <TabsContent value="decode">
            <UrlDecoder />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
