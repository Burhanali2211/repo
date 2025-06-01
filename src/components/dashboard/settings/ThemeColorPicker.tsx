import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, RotateCcw, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ThemeColorPickerProps {
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  backgroundColor?: string;
  backgroundColorDark?: string;
  textColor?: string;
  textColorDark?: string;
  borderColor?: string;
  borderColorDark?: string;
  onColorChange: (field: string, value: string) => void;
}

const ThemeColorPicker: React.FC<ThemeColorPickerProps> = ({
  primaryColor = '#2563EB',
  secondaryColor = '#4F46E5',
  accentColor = '#10B981',
  backgroundColor = '#FFFFFF',
  backgroundColorDark = '#1F2937',
  textColor = '#1F2937',
  textColorDark = '#F9FAFB',
  borderColor = '#E5E7EB',
  borderColorDark = '#374151',
  onColorChange
}) => {
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light');

  const colorPresets = {
    blue: { primary: '#2563EB', secondary: '#3B82F6', accent: '#06B6D4' },
    purple: { primary: '#7C3AED', secondary: '#8B5CF6', accent: '#A855F7' },
    green: { primary: '#059669', secondary: '#10B981', accent: '#34D399' },
    red: { primary: '#DC2626', secondary: '#EF4444', accent: '#F87171' },
    orange: { primary: '#EA580C', secondary: '#F97316', accent: '#FB923C' },
    pink: { primary: '#DB2777', secondary: '#EC4899', accent: '#F472B6' }
  };

  const handleColorChange = (field: string, value: string) => {
    // Validate hex color
    if (!/^#[0-9A-F]{6}$/i.test(value)) {
      return;
    }
    onColorChange(field, value);
  };

  const applyPreset = async (preset: keyof typeof colorPresets) => {
    const colors = colorPresets[preset];

    // Apply all colors in sequence to ensure they're all updated
    onColorChange('primary_color', colors.primary);
    onColorChange('secondary_color', colors.secondary);
    onColorChange('accent_color', colors.accent);

    // Force a small delay to ensure all changes are processed
    setTimeout(() => {
      // Trigger a manual CSS variable update to ensure immediate visual feedback
      document.documentElement.style.setProperty('--primary-color', colors.primary);
      document.documentElement.style.setProperty('--secondary-color', colors.secondary);
      document.documentElement.style.setProperty('--accent-color', colors.accent);
    }, 100);

    toast({
      title: 'Color preset applied',
      description: `${preset.charAt(0).toUpperCase() + preset.slice(1)} color scheme has been applied. Save changes to make it permanent.`
    });
  };

  const resetToDefaults = () => {
    onColorChange('primary_color', '#2563EB');
    onColorChange('secondary_color', '#4F46E5');
    onColorChange('accent_color', '#10B981');
    onColorChange('background_color', '#FFFFFF');
    onColorChange('background_color_dark', '#1F2937');
    onColorChange('text_color', '#1F2937');
    onColorChange('text_color_dark', '#F9FAFB');
    onColorChange('border_color', '#E5E7EB');
    onColorChange('border_color_dark', '#374151');

    toast({
      title: 'Colors reset',
      description: 'All colors have been reset to default values'
    });
  };

  const ColorInput = ({
    label,
    field,
    value,
    description
  }: {
    label: string;
    field: string;
    value: string;
    description?: string;
  }) => (
    <div className="space-y-2">
      <Label htmlFor={field} className="text-sm font-medium">
        {label}
      </Label>
      <div className="flex items-center space-x-2">
        <div
          className="w-10 h-10 rounded-md border-2 border-gray-300 cursor-pointer"
          style={{ backgroundColor: value }}
          onClick={() => {
            const input = document.getElementById(`${field}_picker`) as HTMLInputElement;
            input?.click();
          }}
        />
        <Input
          id={`${field}_picker`}
          type="color"
          value={value}
          onChange={(e) => handleColorChange(field, e.target.value)}
          className="w-0 h-0 opacity-0 absolute"
        />
        <Input
          id={field}
          value={value}
          onChange={(e) => handleColorChange(field, e.target.value)}
          placeholder="#000000"
          className="flex-1 font-mono text-sm"
        />
      </div>
      {description && (
        <p className="text-xs text-gray-500">{description}</p>
      )}
    </div>
  );

  const PreviewCard = () => (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-sm">
            <Eye className="mr-2 h-4 w-4" />
            Live Preview
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              type="button"
              variant={previewMode === 'light' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('light')}
              className="text-xs"
            >
              Light
            </Button>
            <Button
              type="button"
              variant={previewMode === 'dark' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('dark')}
              className="text-xs"
            >
              Dark
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: previewMode === 'light' ? backgroundColor : backgroundColorDark,
            color: previewMode === 'light' ? textColor : textColorDark,
            borderColor: previewMode === 'light' ? borderColor : borderColorDark
          }}
        >
          <h3
            className="text-lg font-semibold mb-2"
            style={{ color: primaryColor }}
          >
            Sample Heading
          </h3>
          <p className="text-sm mb-3">
            This is a preview of how your colors will look on your website.
          </p>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 rounded text-white text-sm"
              style={{ backgroundColor: primaryColor }}
            >
              Primary Button
            </button>
            <button
              className="px-3 py-1 rounded text-white text-sm"
              style={{ backgroundColor: secondaryColor }}
            >
              Secondary Button
            </button>
            <button
              className="px-3 py-1 rounded text-white text-sm"
              style={{ backgroundColor: accentColor }}
            >
              Accent Button
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center">
          <Palette className="mr-2 h-5 w-5" />
          Advanced Theme Colors
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Customize your website's color scheme for both light and dark themes.
        </p>
      </div>

      {/* Color Presets */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Color Presets</CardTitle>
          <CardDescription className="text-xs">
            Apply pre-designed color schemes instantly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {Object.entries(colorPresets).map(([name, colors]) => (
              <Button
                key={name}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => applyPreset(name as keyof typeof colorPresets)}
                className="h-12 flex flex-col items-center justify-center p-2"
              >
                <div className="flex space-x-1 mb-1">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.secondary }}
                  />
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.accent }}
                  />
                </div>
                <span className="text-xs capitalize">{name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Primary Brand Colors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Primary Brand Colors</CardTitle>
          <CardDescription className="text-xs">
            Main colors used for buttons, links, and brand elements
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ColorInput
            label="Primary Color"
            field="primary_color"
            value={primaryColor}
            description="Main brand color for buttons and CTAs"
          />
          <ColorInput
            label="Secondary Color"
            field="secondary_color"
            value={secondaryColor}
            description="Supporting brand color for accents"
          />
          <ColorInput
            label="Accent Color"
            field="accent_color"
            value={accentColor}
            description="Highlight color for special elements"
          />
        </CardContent>
      </Card>

      {/* Extended Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Extended Color Palette</CardTitle>
          <CardDescription className="text-xs">
            Background, text, and border colors for light and dark themes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Light Theme</h4>
              <ColorInput
                label="Background"
                field="background_color"
                value={backgroundColor}
              />
              <ColorInput
                label="Text Color"
                field="text_color"
                value={textColor}
              />
              <ColorInput
                label="Border Color"
                field="border_color"
                value={borderColor}
              />
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Dark Theme</h4>
              <ColorInput
                label="Background"
                field="background_color_dark"
                value={backgroundColorDark}
              />
              <ColorInput
                label="Text Color"
                field="text_color_dark"
                value={textColorDark}
              />
              <ColorInput
                label="Border Color"
                field="border_color_dark"
                value={borderColorDark}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end">
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

      {/* Live Preview */}
      <PreviewCard />
    </div>
  );
};

export default ThemeColorPicker;
