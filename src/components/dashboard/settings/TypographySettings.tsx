import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Type, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface TypographySettingsProps {
  fontFamily?: string;
  fontSize?: string;
  lineHeight?: string;
  fontWeight?: string;
  onTypographyChange: (field: string, value: string) => void;
}

const TypographySettings: React.FC<TypographySettingsProps> = ({
  fontFamily = 'Inter',
  fontSize = '16',
  lineHeight = '1.6',
  fontWeight = '400',
  onTypographyChange
}) => {
  const fontOptions = [
    // Modern Sans-serif fonts
    { value: 'Inter', label: 'Inter', category: 'Sans-serif', description: 'Modern, highly readable' },
    { value: 'Roboto', label: 'Roboto', category: 'Sans-serif', description: 'Google\'s flagship font' },
    { value: 'Open Sans', label: 'Open Sans', category: 'Sans-serif', description: 'Friendly and approachable' },
    { value: 'Lato', label: 'Lato', category: 'Sans-serif', description: 'Warm and humanist' },
    { value: 'Poppins', label: 'Poppins', category: 'Sans-serif', description: 'Geometric and modern' },
    { value: 'Nunito Sans', label: 'Nunito Sans', category: 'Sans-serif', description: 'Rounded and friendly' },
    { value: 'Source Sans Pro', label: 'Source Sans Pro', category: 'Sans-serif', description: 'Adobe\'s first open source font' },
    { value: 'Montserrat', label: 'Montserrat', category: 'Sans-serif', description: 'Urban and contemporary' },
    { value: 'Work Sans', label: 'Work Sans', category: 'Sans-serif', description: 'Optimized for screens' },
    { value: 'DM Sans', label: 'DM Sans', category: 'Sans-serif', description: 'Low contrast and geometric' },

    // Classic Serif fonts
    { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif', description: 'Elegant and transitional' },
    { value: 'Merriweather', label: 'Merriweather', category: 'Serif', description: 'Designed for screens' },
    { value: 'Lora', label: 'Lora', category: 'Serif', description: 'Calligraphic and contemporary' },
    { value: 'Crimson Text', label: 'Crimson Text', category: 'Serif', description: 'Inspired by old-style typefaces' },
    { value: 'Libre Baskerville', label: 'Libre Baskerville', category: 'Serif', description: 'Based on American Type Founder\'s Baskerville' },
    { value: 'Times New Roman', label: 'Times New Roman', category: 'Serif', description: 'Classic and traditional' },

    // Monospace fonts for code
    { value: 'Fira Code', label: 'Fira Code', category: 'Monospace', description: 'With programming ligatures' },
    { value: 'JetBrains Mono', label: 'JetBrains Mono', category: 'Monospace', description: 'Designed for developers' },
    { value: 'Source Code Pro', label: 'Source Code Pro', category: 'Monospace', description: 'Adobe\'s monospace font' },
    { value: 'Monaco', label: 'Monaco', category: 'Monospace', description: 'Apple\'s classic monospace' },
    { value: 'Consolas', label: 'Consolas', category: 'Monospace', description: 'Microsoft\'s programming font' }
  ];

  const fontWeightOptions = [
    { value: '100', label: 'Thin (100)' },
    { value: '200', label: 'Extra Light (200)' },
    { value: '300', label: 'Light (300)' },
    { value: '400', label: 'Regular (400)' },
    { value: '500', label: 'Medium (500)' },
    { value: '600', label: 'Semi Bold (600)' },
    { value: '700', label: 'Bold (700)' },
    { value: '800', label: 'Extra Bold (800)' },
    { value: '900', label: 'Black (900)' }
  ];

  const resetToDefaults = () => {
    onTypographyChange('font_family', 'Inter');
    onTypographyChange('font_size', '16');
    onTypographyChange('line_height', '1.6');
    onTypographyChange('font_weight', '400');

    toast({
      title: 'Typography reset',
      description: 'All typography settings have been reset to defaults'
    });
  };

  const getPreviewStyle = () => ({
    fontFamily: fontFamily,
    fontSize: `${fontSize}px`,
    lineHeight: lineHeight,
    fontWeight: fontWeight
  });

  const TypographyPreview = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-sm">Live Typography Preview</CardTitle>
        <CardDescription className="text-xs">
          See how your typography settings will look
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div style={getPreviewStyle()}>
          <h1 style={{ fontSize: `${parseInt(fontSize) * 2.25}px`, fontWeight: '700', marginBottom: '0.5rem' }}>
            Heading 1 - Main Title
          </h1>
          <h2 style={{ fontSize: `${parseInt(fontSize) * 1.875}px`, fontWeight: '600', marginBottom: '0.5rem' }}>
            Heading 2 - Section Title
          </h2>
          <h3 style={{ fontSize: `${parseInt(fontSize) * 1.5}px`, fontWeight: '600', marginBottom: '0.5rem' }}>
            Heading 3 - Subsection
          </h3>
          <h4 style={{ fontSize: `${parseInt(fontSize) * 1.25}px`, fontWeight: '500', marginBottom: '0.5rem' }}>
            Heading 4 - Minor Heading
          </h4>
          <p style={{ marginBottom: '1rem' }}>
            This is a paragraph of body text that demonstrates how your chosen typography settings will appear
            on your website. The font family, size, line height, and weight all contribute to the overall
            readability and aesthetic appeal of your content.
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong style={{ fontWeight: '700' }}>Bold text</strong> and{' '}
            <em style={{ fontStyle: 'italic' }}>italic text</em> will also follow your typography settings.
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Bulleted list item one</li>
            <li>Bulleted list item two</li>
            <li>Bulleted list item three</li>
          </ul>
          <blockquote
            style={{
              borderLeft: '4px solid #e5e7eb',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              color: '#6b7280'
            }}
          >
            "This is a blockquote that shows how quoted text will appear with your typography settings."
          </blockquote>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center">
          <Type className="mr-2 h-5 w-5" />
          Typography Settings
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Customize fonts, sizes, and text styling across your website.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Font Configuration</CardTitle>
          <CardDescription className="text-xs">
            Choose your website's typography settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Font Family */}
          <div className="space-y-2">
            <Label htmlFor="font_family" className="text-sm font-medium">
              Font Family
            </Label>
            <Select value={fontFamily} onValueChange={(value) => onTypographyChange('font_family', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {['Sans-serif', 'Serif', 'Monospace'].map(category => (
                  <div key={category}>
                    <div className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      {category}
                    </div>
                    {fontOptions
                      .filter(font => font.category === category)
                      .map(font => (
                        <SelectItem
                          key={font.value}
                          value={font.value}
                          style={{ fontFamily: font.value }}
                          className="flex flex-col items-start py-3"
                        >
                          <div className="font-medium">{font.label}</div>
                          <div className="text-xs text-gray-500 font-normal">{font.description}</div>
                        </SelectItem>
                      ))}
                  </div>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Choose from web-safe fonts that load quickly and display consistently
            </p>
          </div>

          {/* Font Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="font_size" className="text-sm font-medium">
                Base Font Size
              </Label>
              <span className="text-sm text-gray-500">{fontSize}px</span>
            </div>
            <Slider
              value={[parseInt(fontSize)]}
              onValueChange={(value) => onTypographyChange('font_size', value[0].toString())}
              min={12}
              max={24}
              step={1}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Base font size affects all text proportionally (12px - 24px)
            </p>
          </div>

          {/* Line Height */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="line_height" className="text-sm font-medium">
                Line Height
              </Label>
              <span className="text-sm text-gray-500">{lineHeight}</span>
            </div>
            <Slider
              value={[parseFloat(lineHeight)]}
              onValueChange={(value) => onTypographyChange('line_height', value[0].toFixed(1))}
              min={1.0}
              max={2.5}
              step={0.1}
              className="w-full"
            />
            <p className="text-xs text-gray-500">
              Spacing between lines of text (1.0 - 2.5)
            </p>
          </div>

          {/* Font Weight */}
          <div className="space-y-2">
            <Label htmlFor="font_weight" className="text-sm font-medium">
              Default Font Weight
            </Label>
            <Select value={fontWeight} onValueChange={(value) => onTypographyChange('font_weight', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select font weight" />
              </SelectTrigger>
              <SelectContent>
                {fontWeightOptions.map(weight => (
                  <SelectItem
                    key={weight.value}
                    value={weight.value}
                    style={{ fontWeight: weight.value }}
                  >
                    {weight.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Default weight for body text (headings will be automatically bolder)
            </p>
          </div>

          {/* Reset Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={resetToDefaults}
              className="text-sm"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Typography Preview */}
      <TypographyPreview />

      {/* Implementation Note */}
      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            Typography Implementation
          </h4>
          <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Typography settings are applied through CSS variables</li>
            <li>• Headings automatically scale based on your base font size</li>
            <li>• Font weights are optimized for web performance</li>
            <li>• All fonts include fallbacks for maximum compatibility</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default TypographySettings;
