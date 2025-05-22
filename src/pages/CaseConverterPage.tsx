import React from 'react';
import CaseConverterTool from '@/components/tools/CaseConverterTool';
import ToolPageLayout from '@/components/ToolPageLayout';

const CaseConverterPage: React.FC = () => {
  return (
    <ToolPageLayout
      title="Case Converter"
      description="Convert text between different case formats like camelCase, snake_case, PascalCase, and more."
    >
      <CaseConverterTool />
    </ToolPageLayout>
  );
};

export default CaseConverterPage;
