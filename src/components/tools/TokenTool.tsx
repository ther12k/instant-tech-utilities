
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const TokenTool = () => {
  const [uuidResult, setUuidResult] = useState<string>("");
  const [uuidVersion, setUuidVersion] = useState<"v4" | "v1">("v4");
  const [randomTokenResult, setRandomTokenResult] = useState<string>("");
  const [tokenLength, setTokenLength] = useState<number>(32);
  const [tokenCharset, setTokenCharset] = useState<"alphanumeric" | "hex" | "numbers" | "symbols">("alphanumeric");
  const { toast } = useToast();

  // Generate a UUID based on the selected version
  const generateUUID = () => {
    if (uuidVersion === "v4") {
      setUuidResult(crypto.randomUUID());
    } else if (uuidVersion === "v1") {
      // Simple UUID v1-like implementation (not true v1 which requires MAC address)
      const now = new Date().getTime();
      const uuid = 'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (now + Math.random() * 16) % 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      setUuidResult(uuid);
    }
  };

  // Generate a random token with the specified length and character set
  const generateRandomToken = () => {
    let charset = "";
    
    switch (tokenCharset) {
      case "alphanumeric":
        charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        break;
      case "hex":
        charset = "0123456789abcdef";
        break;
      case "numbers":
        charset = "0123456789";
        break;
      case "symbols":
        charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
        break;
      default:
        charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    }

    // Generate secure random token
    const randomValues = new Uint32Array(tokenLength);
    crypto.getRandomValues(randomValues);
    
    let result = "";
    for (let i = 0; i < tokenLength; i++) {
      result += charset[randomValues[i] % charset.length];
    }
    
    setRandomTokenResult(result);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Copied!",
          description: `${type} copied to clipboard`
        });
      })
      .catch(err => console.error("Could not copy text: ", err));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Token Generator</CardTitle>
          <CardDescription>
            Generate UUIDs and secure random tokens for your applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="uuid" className="space-y-4">
            <TabsList>
              <TabsTrigger value="uuid">UUID Generator</TabsTrigger>
              <TabsTrigger value="random">Random Token</TabsTrigger>
            </TabsList>
            
            <TabsContent value="uuid" className="space-y-4">
              <div className="space-y-2">
                <Label>UUID Version</Label>
                <RadioGroup 
                  value={uuidVersion} 
                  onValueChange={(value) => setUuidVersion(value as "v4" | "v1")}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="v4" id="uuid-v4" />
                    <Label htmlFor="uuid-v4">UUID v4 (random)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="v1" id="uuid-v1" />
                    <Label htmlFor="uuid-v1">UUID v1 (timestamp)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto"
                  onClick={generateUUID}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate UUID
                </Button>
                
                <div className="mt-4 flex items-center gap-2">
                  <Input 
                    className="font-mono"
                    readOnly
                    value={uuidResult}
                    placeholder="Your UUID will appear here"
                  />
                  {uuidResult && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(uuidResult, "UUID")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="random" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token-length">Token Length</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="token-length"
                    type="number"
                    min="1"
                    max="256"
                    value={tokenLength}
                    onChange={(e) => setTokenLength(Number(e.target.value))}
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">characters</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Character Set</Label>
                <RadioGroup 
                  value={tokenCharset} 
                  onValueChange={(value) => setTokenCharset(value as "alphanumeric" | "hex" | "numbers" | "symbols")}
                  className="flex flex-wrap gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="alphanumeric" id="charset-alphanumeric" />
                    <Label htmlFor="charset-alphanumeric">Alphanumeric</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hex" id="charset-hex" />
                    <Label htmlFor="charset-hex">Hexadecimal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="numbers" id="charset-numbers" />
                    <Label htmlFor="charset-numbers">Numbers only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="symbols" id="charset-symbols" />
                    <Label htmlFor="charset-symbols">Include symbols</Label>
                  </div>
                </RadioGroup>
              </div>

              <Separator />

              <div className="flex flex-col gap-2">
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto"
                  onClick={generateRandomToken}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate Random Token
                </Button>
                
                <div className="mt-4 flex items-center gap-2">
                  <Input 
                    className="font-mono"
                    readOnly
                    value={randomTokenResult}
                    placeholder="Your random token will appear here"
                  />
                  {randomTokenResult && (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(randomTokenResult, "Token")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenTool;
