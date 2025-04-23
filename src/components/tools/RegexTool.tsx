
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

interface Match {
  match: string;
  index: number;
  groups: string[];
}

export default function RegexTool() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [replacement, setReplacement] = useState("");
  const [replacedText, setReplacedText] = useState<string | null>(null);

  const isGlobalFlag = flags.includes('g');
  const isMultilineFlag = flags.includes('m');
  const isInsensitiveFlag = flags.includes('i');
  const isDotAllFlag = flags.includes('s');
  const isUnicodeFlag = flags.includes('u');

  const toggleFlag = (flag: string) => {
    if (flags.includes(flag)) {
      setFlags(flags.replace(flag, ''));
    } else {
      setFlags(flags + flag);
    }
  };

  const testRegex = () => {
    if (!pattern) {
      setError("Please enter a regular expression pattern");
      setMatches([]);
      setReplacedText(null);
      return;
    }

    try {
      setError(null);
      const regex = new RegExp(pattern, flags);
      const foundMatches: Match[] = [];
      
      if (isGlobalFlag) {
        let match;
        while ((match = regex.exec(text)) !== null) {
          // Get the matched groups (excluding the full match)
          const groups = match.slice(1);
          
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: groups
          });
          
          if (!match[0].length) {
            // Prevent infinite loop for empty matches
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(text);
        if (match) {
          // Get the matched groups (excluding the full match)
          const groups = match.slice(1);
          
          foundMatches.push({
            match: match[0],
            index: match.index,
            groups: groups
          });
        }
      }
      
      setMatches(foundMatches);
      
      // Perform replacement if replacement text is provided
      if (replacement) {
        try {
          const replaced = text.replace(regex, replacement);
          setReplacedText(replaced);
        } catch (err) {
          console.error("Replacement error:", err);
          setReplacedText(null);
        }
      } else {
        setReplacedText(null);
      }
      
    } catch (err) {
      setError("Invalid regular expression: " + (err instanceof Error ? err.message : String(err)));
      setMatches([]);
      setReplacedText(null);
    }
  };

  const clearAll = () => {
    setPattern("");
    setFlags("g");
    setText("");
    setMatches([]);
    setError(null);
    setReplacement("");
    setReplacedText(null);
  };

  const getHighlightedText = () => {
    if (!matches.length || !pattern) return text;

    try {
      const regex = new RegExp(pattern, isGlobalFlag ? flags : flags.replace('g', '') + 'g');
      return text.replace(regex, match => `<mark class="bg-yellow-300 dark:bg-yellow-800">${match}</mark>`);
    } catch {
      return text;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Regex Tester</CardTitle>
        <CardDescription>
          Test, validate, and debug regular expressions with real-time matching.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Regex Pattern Input */}
        <div className="space-y-2">
          <Label htmlFor="regex-pattern">Regular Expression</Label>
          <div className="flex gap-2">
            <div className="flex-grow">
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                  /
                </span>
                <Input
                  id="regex-pattern"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="Enter regex pattern here..."
                  className="rounded-l-none rounded-r-none font-mono"
                />
                <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-muted-foreground text-sm">
                  /{flags}
                </span>
              </div>
            </div>
            <Button onClick={testRegex} disabled={!pattern || !text}>
              Test
            </Button>
          </div>
        </div>

        {/* Flags */}
        <div className="space-y-2">
          <Label>Flags</Label>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Switch 
                id="global-flag"
                checked={isGlobalFlag}
                onCheckedChange={() => toggleFlag('g')}
              />
              <Label htmlFor="global-flag" className="cursor-pointer">
                <code className="bg-muted/50 p-1 rounded">g</code> Global
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                id="multiline-flag"
                checked={isMultilineFlag}
                onCheckedChange={() => toggleFlag('m')}
              />
              <Label htmlFor="multiline-flag" className="cursor-pointer">
                <code className="bg-muted/50 p-1 rounded">m</code> Multiline
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                id="insensitive-flag"
                checked={isInsensitiveFlag}
                onCheckedChange={() => toggleFlag('i')}
              />
              <Label htmlFor="insensitive-flag" className="cursor-pointer">
                <code className="bg-muted/50 p-1 rounded">i</code> Case Insensitive
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                id="dotall-flag"
                checked={isDotAllFlag}
                onCheckedChange={() => toggleFlag('s')}
              />
              <Label htmlFor="dotall-flag" className="cursor-pointer">
                <code className="bg-muted/50 p-1 rounded">s</code> DotAll
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch 
                id="unicode-flag"
                checked={isUnicodeFlag}
                onCheckedChange={() => toggleFlag('u')}
              />
              <Label htmlFor="unicode-flag" className="cursor-pointer">
                <code className="bg-muted/50 p-1 rounded">u</code> Unicode
              </Label>
            </div>
          </div>
        </div>

        {/* Test String */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="test-string">Test String</Label>
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear All
            </Button>
          </div>
          <Textarea
            id="test-string"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to match against..."
            className="min-h-[100px]"
          />
        </div>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Replacement String */}
        {!error && (
          <div className="space-y-2">
            <Label htmlFor="replacement-string">Replacement String (optional)</Label>
            <Input
              id="replacement-string"
              value={replacement}
              onChange={(e) => setReplacement(e.target.value)}
              placeholder="Enter replacement pattern..."
              className="font-mono"
            />
          </div>
        )}

        {/* Match Results */}
        {matches.length > 0 && (
          <div className="space-y-3">
            <Alert className="bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <AlertDescription>
                <span className="font-medium">{matches.length}</span> match{matches.length !== 1 ? 'es' : ''} found
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Label>Text with Matches Highlighted</Label>
              <div 
                className="border rounded-md p-3 font-mono text-sm whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: getHighlightedText() }}
              />
            </div>

            <div className="space-y-2">
              <Label>Match Details</Label>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                {matches.map((match, index) => (
                  <div key={index} className="border rounded-md p-3 space-y-2">
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                      <span className="font-medium">Match #{index + 1}</span>
                      <span>Index: {match.index}</span>
                      <span>Length: {match.match.length}</span>
                    </div>
                    <div className="font-mono bg-muted/50 p-2 rounded-md whitespace-pre-wrap overflow-x-auto">
                      {match.match}
                    </div>
                    
                    {match.groups.length > 0 && (
                      <div className="space-y-1">
                        <Label className="text-xs">Capturing Groups</Label>
                        {match.groups.map((group, groupIndex) => (
                          <div key={groupIndex} className="flex gap-2 text-sm">
                            <span className="font-mono bg-muted/50 px-2 rounded-md">Group {groupIndex + 1}</span>
                            <span className="font-mono">{group || "(empty)"}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Replacement Result */}
        {replacedText !== null && (
          <div className="space-y-2">
            <Label>Replaced Text</Label>
            <Textarea
              readOnly
              value={replacedText}
              className="min-h-[100px] font-mono"
            />
          </div>
        )}

        {/* No Matches */}
        {!error && pattern && text && matches.length === 0 && (
          <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
            <Info className="h-4 w-4 text-blue-500" />
            <AlertDescription>No matches found.</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
