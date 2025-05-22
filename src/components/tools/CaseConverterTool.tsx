import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  toCamelCase,
  toSnakeCase,
  toPascalCase,
  toKebabCase,
  toUpperCaseText,
  toLowerCaseText,
} from '@/utils/caseConverterUtils';

const CaseConverterTool: React.FC = () => {
  const [inputText, setInputText] = useState<string>('');
  const [outputText, setOutputText] = useState<string>('');

  const handleCamelCaseClick = () => {
    setOutputText(toCamelCase(inputText));
  };

  const handleSnakeCaseClick = () => {
    setOutputText(toSnakeCase(inputText));
  };

  const handlePascalCaseClick = () => {
    setOutputText(toPascalCase(inputText));
  };

  const handleKebabCaseClick = () => {
    setOutputText(toKebabCase(inputText));
  };

  const handleUpperCaseClick = () => {
    setOutputText(toUpperCaseText(inputText));
  };

  const handleLowerCaseClick = () => {
    setOutputText(toLowerCaseText(inputText));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Case Converter</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-1">
              Input
            </label>
            <Textarea
              id="input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text here"
              className="w-full h-32 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <Button onClick={handleCamelCaseClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm">
              camelCase
            </Button>
            <Button onClick={handleSnakeCaseClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm">
              snake_case
            </Button>
            <Button onClick={handlePascalCaseClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm">
              PascalCase
            </Button>
            <Button onClick={handleKebabCaseClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm">
              kebab-case
            </Button>
            <Button onClick={handleUpperCaseClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm">
              UPPERCASE
            </Button>
            <Button onClick={handleLowerCaseClick} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm">
              lowercase
            </Button>
          </div>
          <div>
            <label htmlFor="output" className="block text-sm font-medium text-gray-700 mb-1">
              Output
            </label>
            <Textarea
              id="output"
              value={outputText}
              readOnly
              placeholder="Output will appear here"
              className="w-full h-32 p-2 border border-gray-300 rounded-md shadow-sm bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseConverterTool;
