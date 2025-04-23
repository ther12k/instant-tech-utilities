
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code2, Palette, Hash, FileJson, Regex } from "lucide-react";

const tools = [
  {
    name: "Base64 Encoder/Decoder",
    description: "Convert text to and from Base64 encoding, or encode images as Base64 strings.",
    icon: <Code2 className="h-8 w-8" />,
    path: "/base64",
    color: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
  },
  {
    name: "JSON Formatter",
    description: "Format, validate, and prettify your JSON data with customizable indentation.",
    icon: <FileJson className="h-8 w-8" />,
    path: "/json",
    color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  },
  {
    name: "Color Converter",
    description: "Convert between HEX, RGB, and HSL color formats with visual previews.",
    icon: <Palette className="h-8 w-8" />,
    path: "/color",
    color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
  },
  {
    name: "Regex Tester",
    description: "Test, validate, and debug regular expressions with interactive match highlighting.",
    icon: <Regex className="h-8 w-8" />,
    path: "/regex",
    color: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  },
  {
    name: "Hash Generator",
    description: "Generate secure cryptographic hashes from text or files using various algorithms.",
    icon: <Hash className="h-8 w-8" />,
    path: "/hash",
    color: "bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400",
  },
];

export default function Index() {
  return (
    <Layout>
      <div className="flex flex-col items-center text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
          TechToolKit
        </h1>
        <p className="max-w-[600px] text-lg text-muted-foreground mb-8">
          A collection of free, simple, and powerful web-based utilities for developers. 
          All tools run entirely in your browser - no data is sent to any server.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link key={tool.path} to={tool.path} className="group">
            <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
              <CardHeader>
                <div className={`inline-flex p-3 rounded-lg ${tool.color} mb-3`}>
                  {tool.icon}
                </div>
                <CardTitle className="flex items-center justify-between">
                  <span>{tool.name}</span>
                  <ArrowRight className="h-5 w-5 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                </CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-12 text-center py-6">
        <h2 className="text-2xl font-medium mb-4">Why use TechToolKit?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div>
            <h3 className="text-lg font-medium mb-2">100% Client-Side</h3>
            <p className="text-muted-foreground">All processing happens in your browser. Your data never leaves your device.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">No Installation</h3>
            <p className="text-muted-foreground">Access powerful developer tools instantly from any browser, on any device.</p>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-2">Open Source</h3>
            <p className="text-muted-foreground">Free and open source. Contribute on GitHub or use the code in your projects.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
