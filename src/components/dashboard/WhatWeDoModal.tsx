import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useWhatWeDo, WhatWeDo } from '@/hooks/useWhatWeDo';

interface WhatWeDoModalProps {
  item: WhatWeDo | null;
  isOpen: boolean;
  onClose: () => void;
}

const WhatWeDoModal = ({ item, isOpen, onClose }: WhatWeDoModalProps) => {
  const { createWhatWeDo, updateWhatWeDo } = useWhatWeDo();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    link: '',
    link_text: '',
    order_index: 0
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || '',
        description: item.description || '',
        icon: item.icon || '',
        link: item.link || '',
        link_text: item.link_text || '',
        order_index: item.order_index || 0
      });
    } else {
      setFormData({
        title: '',
        description: '',
        icon: '',
        link: '',
        link_text: '',
        order_index: 0
      });
    }
  }, [item]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (item) {
        await updateWhatWeDo(item.id, formData);
      } else {
        await createWhatWeDo(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving What We Do item:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">
            {item ? 'Edit What We Do Item' : 'Add New What We Do Item'}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="w-full p-2 border rounded-md"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>

          <div>
            <Label htmlFor="icon">Icon</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
              placeholder="e.g., 'code' or 'phone'"
            />
            <p className="text-xs text-gray-500 mt-1">Enter a Lucide icon name</p>
          </div>

          <div>
            <Label htmlFor="link">Link URL</Label>
            <Input
              id="link"
              value={formData.link}
              onChange={(e) => setFormData(prev => ({ ...prev, link: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="link_text">Link Text</Label>
            <Input
              id="link_text"
              value={formData.link_text}
              onChange={(e) => setFormData(prev => ({ ...prev, link_text: e.target.value }))}
            />
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



          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {item ? 'Update' : 'Create'} Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WhatWeDoModal;
