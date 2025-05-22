import {
  toCamelCase,
  toSnakeCase,
  toPascalCase,
  toKebabCase,
  toUpperCaseText,
  toLowerCaseText,
} from '@/utils/caseConverterUtils';

describe('Case Conversion Utilities', () => {
  describe('toCamelCase', () => {
    it('should convert space-separated words', () => {
      expect(toCamelCase('hello world')).toBe('helloWorld');
    });
    it('should convert kebab-case', () => {
      expect(toCamelCase('hello-world')).toBe('helloWorld');
    });
    it('should convert snake_case', () => {
      expect(toCamelCase('hello_world')).toBe('helloWorld');
    });
    it('should handle already camelCased input', () => {
      expect(toCamelCase('helloWorld')).toBe('helloWorld');
    });
    it('should handle PascalCase input', () => {
      expect(toCamelCase('HelloWorld')).toBe('helloWorld');
    });
    it('should handle mixed input', () => {
      expect(toCamelCase('Hello_World-Again')).toBe('helloWorldAgain');
    });
    it('should handle leading/trailing spaces', () => {
      expect(toCamelCase('  hello world  ')).toBe('helloWorld');
    });
    it('should handle numbers', () => {
      expect(toCamelCase('hello 123 world')).toBe('hello123World');
    });
    it('should return empty string for empty input', () => {
      expect(toCamelCase('')).toBe('');
    });
    it('should handle single word', () => {
      expect(toCamelCase('hello')).toBe('hello');
    });
    it('should handle single capitalized word', () => {
      expect(toCamelCase('Hello')).toBe('hello');
    });
  });

  describe('toSnakeCase', () => {
    it('should convert space-separated words', () => {
      expect(toSnakeCase('hello world')).toBe('hello_world');
    });
    it('should convert camelCase', () => {
      expect(toSnakeCase('helloWorld')).toBe('hello_world');
    });
    it('should convert PascalCase', () => {
      expect(toSnakeCase('HelloWorld')).toBe('hello_world');
    });
    it('should convert kebab-case', () => {
      expect(toSnakeCase('hello-world')).toBe('hello_world');
    });
    it('should handle already snake_cased input', () => {
      expect(toSnakeCase('hello_world')).toBe('hello_world');
    });
    it('should handle mixed input', () => {
      expect(toSnakeCase('Hello_World-Again')).toBe('hello_world_again');
    });
    it('should handle leading/trailing spaces and hyphens', () => {
      expect(toSnakeCase('  hello-world  ')).toBe('hello_world');
    });
    it('should handle numbers', () => {
      expect(toSnakeCase('hello 123 world')).toBe('hello_123_world');
    });
    it('should return empty string for empty input', () => {
      expect(toSnakeCase('')).toBe('');
    });
    it('should handle single word', () => {
      expect(toSnakeCase('hello')).toBe('hello');
    });
    it('should handle single capitalized word', () => {
      expect(toSnakeCase('Hello')).toBe('hello');
    });
    it('should handle multiple underscores', () => {
      expect(toSnakeCase('hello__world')).toBe('hello_world');
    });
  });

  describe('toPascalCase', () => {
    it('should convert space-separated words', () => {
      expect(toPascalCase('hello world')).toBe('HelloWorld');
    });
    it('should convert camelCase', () => {
      expect(toPascalCase('helloWorld')).toBe('HelloWorld');
    });
    it('should convert snake_case', () => {
      expect(toPascalCase('hello_world')).toBe('HelloWorld');
    });
    it('should convert kebab-case', () => {
      expect(toPascalCase('hello-world')).toBe('HelloWorld');
    });
    it('should handle already PascalCased input', () => {
      expect(toPascalCase('HelloWorld')).toBe('HelloWorld');
    });
    it('should handle mixed input', () => {
      expect(toPascalCase('Hello_World-Again')).toBe('HelloWorldAgain');
    });
    it('should handle leading/trailing spaces', () => {
      expect(toPascalCase('  hello world  ')).toBe('HelloWorld');
    });
    it('should handle numbers', () => {
      expect(toPascalCase('hello 123 world')).toBe('Hello123World');
    });
    it('should return empty string for empty input', () => {
      expect(toPascalCase('')).toBe('');
    });
    it('should handle single word', () => {
      expect(toPascalCase('hello')).toBe('Hello');
    });
  });

  describe('toKebabCase', () => {
    it('should convert space-separated words', () => {
      expect(toKebabCase('hello world')).toBe('hello-world');
    });
    it('should convert camelCase', () => {
      expect(toKebabCase('helloWorld')).toBe('hello-world');
    });
    it('should convert PascalCase', () => {
      expect(toKebabCase('HelloWorld')).toBe('hello-world');
    });
    it('should convert snake_case', () => {
      expect(toKebabCase('hello_world')).toBe('hello-world');
    });
    it('should handle already kebab-cased input', () => {
      expect(toKebabCase('hello-world')).toBe('hello-world');
    });
    it('should handle mixed input', () => {
      expect(toKebabCase('Hello_World-Again')).toBe('hello-world-again');
    });
    it('should handle leading/trailing spaces and underscores', () => {
      expect(toKebabCase('  hello_world  ')).toBe('hello-world');
    });
    it('should handle numbers', () => {
      expect(toKebabCase('hello 123 world')).toBe('hello-123-world');
    });
    it('should return empty string for empty input', () => {
      expect(toKebabCase('')).toBe('');
    });
    it('should handle single word', () => {
      expect(toKebabCase('hello')).toBe('hello');
    });
    it('should handle single capitalized word', () => {
      expect(toKebabCase('Hello')).toBe('hello');
    });
    it('should handle multiple hyphens', () => {
      expect(toKebabCase('hello--world')).toBe('hello-world');
    });
  });

  describe('toUpperCaseText', () => {
    it('should convert "hello world" to "HELLO WORLD"', () => {
      expect(toUpperCaseText('hello world')).toBe('HELLO WORLD');
    });
    it('should handle already uppercase input', () => {
      expect(toUpperCaseText('HELLO WORLD')).toBe('HELLO WORLD');
    });
    it('should handle mixed case input', () => {
      expect(toUpperCaseText('HeLlO wOrLd')).toBe('HELLO WORLD');
    });
    it('should handle empty string', () => {
      expect(toUpperCaseText('')).toBe('');
    });
    it('should handle numbers and symbols', () => {
      expect(toUpperCaseText('hello 123 world!')).toBe('HELLO 123 WORLD!');
    });
  });

  describe('toLowerCaseText', () => {
    it('should convert "HELLO WORLD" to "hello world"', () => {
      expect(toLowerCaseText('HELLO WORLD')).toBe('hello world');
    });
    it('should handle already lowercase input', () => {
      expect(toLowerCaseText('hello world')).toBe('hello world');
    });
    it('should handle mixed case input', () => {
      expect(toLowerCaseText('HeLlO wOrLd')).toBe('hello world');
    });
    it('should handle empty string', () => {
      expect(toLowerCaseText('')).toBe('');
    });
    it('should handle numbers and symbols', () => {
      expect(toLowerCaseText('HELLO 123 WORLD!')).toBe('hello 123 world!');
    });
  });
});
