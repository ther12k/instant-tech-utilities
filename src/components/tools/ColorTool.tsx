
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface ColorValues {
  hex: string;
  rgb: {
    r: number;
    g: number;
    b: number;
  };
  hsl: {
    h: number;
    s: number;
    l: number;
  };
}

export default function ColorTool() {
  const [color, setColor] = useState<ColorValues>({
    hex: "#3b82f6",
    rgb: { r: 59, g: 130, b: 246 },
    hsl: { h: 217, s: 91, l: 60 }
  });
  
  const [activeInput, setActiveInput] = useState<"hex" | "rgb" | "hsl">("hex");

  // Hex to RGB conversion
  const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  };

  // RGB to Hex conversion
  const rgbToHex = (r: number, g: number, b: number): string => {
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  };

  // RGB to HSL conversion
  const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number } => {
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      
      h *= 60;
    }
    
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  // HSL to RGB conversion
  const hslToRgb = (h: number, s: number, l: number): { r: number; g: number; b: number } => {
    h /= 360;
    s /= 100;
    l /= 100;
    
    let r, g, b;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  };

  // Handle hex color input change
  const handleHexChange = (value: string) => {
    if (!/^#?([a-f\d]{0,6})$/i.test(value)) return;
    
    const hexValue = value.startsWith('#') ? value : `#${value}`;
    
    if (/^#([a-f\d]{6})$/i.test(hexValue)) {
      const rgb = hexToRgb(hexValue)!;
      const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
      
      setColor({ hex: hexValue, rgb, hsl });
    } else {
      setColor({ ...color, hex: hexValue });
    }
  };

  // Handle RGB color input change
  const handleRgbChange = (component: 'r' | 'g' | 'b', value: string) => {
    let numValue = parseInt(value, 10);
    
    if (isNaN(numValue)) numValue = 0;
    else if (numValue > 255) numValue = 255;
    else if (numValue < 0) numValue = 0;
    
    const newRgb = { ...color.rgb, [component]: numValue };
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    const newHsl = rgbToHsl(newRgb.r, newRgb.g, newRgb.b);
    
    setColor({ rgb: newRgb, hex: newHex, hsl: newHsl });
  };

  // Handle HSL color input change
  const handleHslChange = (component: 'h' | 's' | 'l', value: string) => {
    let numValue = parseInt(value, 10);
    
    if (isNaN(numValue)) numValue = 0;
    
    if (component === 'h') {
      if (numValue > 359) numValue = 359;
      if (numValue < 0) numValue = 0;
    } else {
      if (numValue > 100) numValue = 100;
      if (numValue < 0) numValue = 0;
    }
    
    const newHsl = { ...color.hsl, [component]: numValue };
    const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
    const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    
    setColor({ rgb: newRgb, hex: newHex, hsl: newHsl });
  };

  // Handle color picker change
  const handleColorPickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hexValue = e.target.value;
    const rgb = hexToRgb(hexValue)!;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    setColor({ hex: hexValue, rgb, hsl });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert("Copied to clipboard!"))
      .catch(err => console.error("Could not copy text: ", err));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Color Converter</CardTitle>
        <CardDescription>
          Convert between HEX, RGB, and HSL color formats with live preview.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Color Preview */}
        <div className="flex flex-col space-y-2">
          <Label className="text-center">Color Preview</Label>
          <div className="flex gap-4">
            <div 
              className="w-full h-24 rounded-md shadow-inner border" 
              style={{ backgroundColor: color.hex }}
            ></div>
            <div className="relative w-12">
              <input
                type="color"
                value={color.hex}
                onChange={handleColorPickerChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="w-12 h-24 rounded-md border shadow-inner bg-gradient-to-r from-red-500 via-green-500 to-blue-500" />
            </div>
          </div>
        </div>
        
        {/* Hex Input */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="hex-input">HEX</Label>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => copyToClipboard(color.hex)}
              className="h-6 w-6"
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy HEX</span>
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="hex-input"
              value={color.hex}
              onChange={(e) => handleHexChange(e.target.value)}
              onFocus={() => setActiveInput("hex")}
              className="font-mono"
            />
          </div>
        </div>
        
        {/* RGB Input */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>RGB</Label>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => copyToClipboard(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`)}
              className="h-6 w-6"
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy RGB</span>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="rgb-r" className="sr-only">R</Label>
              <div className="flex items-center">
                <span className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-l-md">R</span>
                <Input
                  id="rgb-r"
                  value={color.rgb.r}
                  onChange={(e) => handleRgbChange('r', e.target.value)}
                  onFocus={() => setActiveInput("rgb")}
                  className="rounded-l-none font-mono"
                  type="number"
                  min="0"
                  max="255"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="rgb-g" className="sr-only">G</Label>
              <div className="flex items-center">
                <span className="bg-green-500 text-white w-6 h-6 flex items-center justify-center rounded-l-md">G</span>
                <Input
                  id="rgb-g"
                  value={color.rgb.g}
                  onChange={(e) => handleRgbChange('g', e.target.value)}
                  onFocus={() => setActiveInput("rgb")}
                  className="rounded-l-none font-mono"
                  type="number"
                  min="0"
                  max="255"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="rgb-b" className="sr-only">B</Label>
              <div className="flex items-center">
                <span className="bg-blue-500 text-white w-6 h-6 flex items-center justify-center rounded-l-md">B</span>
                <Input
                  id="rgb-b"
                  value={color.rgb.b}
                  onChange={(e) => handleRgbChange('b', e.target.value)}
                  onFocus={() => setActiveInput("rgb")}
                  className="rounded-l-none font-mono"
                  type="number"
                  min="0"
                  max="255"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* HSL Input */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>HSL</Label>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => copyToClipboard(`hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%)`)}
              className="h-6 w-6"
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy HSL</span>
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <Label htmlFor="hsl-h" className="sr-only">H</Label>
              <div className="flex items-center">
                <span className="bg-purple-500 text-white w-6 h-6 flex items-center justify-center rounded-l-md">H</span>
                <Input
                  id="hsl-h"
                  value={color.hsl.h}
                  onChange={(e) => handleHslChange('h', e.target.value)}
                  onFocus={() => setActiveInput("hsl")}
                  className="rounded-l-none font-mono"
                  type="number"
                  min="0"
                  max="359"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="hsl-s" className="sr-only">S</Label>
              <div className="flex items-center">
                <span className="bg-cyan-500 text-white w-6 h-6 flex items-center justify-center rounded-l-md">S</span>
                <Input
                  id="hsl-s"
                  value={color.hsl.s}
                  onChange={(e) => handleHslChange('s', e.target.value)}
                  onFocus={() => setActiveInput("hsl")}
                  className="rounded-l-none font-mono"
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="hsl-l" className="sr-only">L</Label>
              <div className="flex items-center">
                <span className="bg-gray-500 text-white w-6 h-6 flex items-center justify-center rounded-l-md">L</span>
                <Input
                  id="hsl-l"
                  value={color.hsl.l}
                  onChange={(e) => handleHslChange('l', e.target.value)}
                  onFocus={() => setActiveInput("hsl")}
                  className="rounded-l-none font-mono"
                  type="number"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* CSS Output */}
        <div className="space-y-2">
          <Label>CSS Output</Label>
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-muted/50 rounded-md p-2 font-mono text-sm">
              <code>color: {color.hex};</code>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard(`color: ${color.hex};`)}
                className="h-6 w-6"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between bg-muted/50 rounded-md p-2 font-mono text-sm">
              <code>color: rgb({color.rgb.r}, {color.rgb.g}, {color.rgb.b});</code>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard(`color: rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b});`)}
                className="h-6 w-6"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center justify-between bg-muted/50 rounded-md p-2 font-mono text-sm">
              <code>color: hsl({color.hsl.h}, {color.hsl.s}%, {color.hsl.l}%);</code>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => copyToClipboard(`color: hsl(${color.hsl.h}, ${color.hsl.s}%, ${color.hsl.l}%);`)}
                className="h-6 w-6"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
