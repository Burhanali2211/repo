import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAboutContent, AboutContent } from '@/hooks/useAboutContent';

interface AboutContentModalProps {
  content: any | null;
  isOpen: boolean;
  onClose: () => void;
}

const AboutContentModal = ({ content, isOpen, onClose }: AboutContentModalProps) => {
  const { createAboutContent, updateAboutContent } = useAboutContent();
  const [formData, setFormData] = useState({
    section_type: '',
    title: '',
    description: '',
    year: '',
    content_data: {},
    order_index: 0,
    is_active: true
  });

  useEffect(() => {
    if (content) {
      setFormData({
        section_type: content.section_type || '',
        title: content.title || '',
        description: content.description || '',
        year: content.year || '',
        content_data: content.content_data || {},
        order_index: content.order_index || 0,
        is_active: content.is_active || true
      });
    } else {
      setFormData({
        section_type: '',
        title: '',
        description: '',
        year: '',
        content_data: {},
        order_index: 0,
        is_active: true
      });
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (content) {
        await updateAboutContent(content.id, formData);
      } else {
        await createAboutContent(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving about content:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {content ? 'Edit About Content' : 'Add New About Content'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Label htmlFor="section_type">Section Type</Label>
            <select
              id="section_type"
              className="w-full p-2 border rounded-md"
              value={formData.section_type}
              onChange={(e) => setFormData(prev => ({ ...prev, section_type: e.target.value }))}
              required
            >
              <option value="">Select a section type</option>
              <option value="history">History</option>
              <option value="mission">Mission</option>
              <option value="vision">Vision</option>
              <option value="values">Values</option>
              <option value="team">Team</option>
              <option value="awards">Awards</option>
              <option value="timeline">Timeline</option>
              <option value="custom">Custom</option>
            </select>
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <textarea
              id="description"
              className="w-full p-2 border rounded-md"
              rows={3}
              value={formData.description || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="year">Year (Optional)</Label>
            <Input
              id="year"
              value={formData.year || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
              placeholder="e.g., 2023 or 2018-2022"
            />
          </div>

          <div>
            <Label htmlFor="content_data">Content Data (JSON)</Label>
            <textarea
              id="content_data"
              className="w-full p-2 border rounded-md font-mono text-sm"
              rows={5}
              value={formData.content_data ? JSON.stringify(formData.content_data, null, 2) : '{}'}
              onChange={(e) => {
                try {
                  const parsedData = e.target.value ? JSON.parse(e.target.value) : {};
                  setFormData(prev => ({ ...prev, content_data: parsedData }));
                } catch (error) {
                  // Allow invalid JSON during typing, it will be validated on submit
                  console.log('Invalid JSON, will validate on submit');
                }
              }}
              placeholder="{}"
            />
            <p className="text-xs text-gray-500 mt-1">Enter additional data as JSON object</p>
          </div>

          <div>
            <Label htmlFor="order_index">Order Index</Label>
            <Input
              id="order_index"
              type="number"
              value={formData.order_index}
              onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
              className="rounded"
            />
            <Label htmlFor="is_active">Active</Label>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {content ? 'Update' : 'Create'} Content
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutContentModal;
