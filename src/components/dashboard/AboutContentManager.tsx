import React, { useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAboutContent } from '@/hooks/useAboutContent';
import AboutContentModal from '@/components/dashboard/AboutContentModal';

const AboutContentManager = () => {
  const { aboutContent, loading, deleteAboutContent } = useAboutContent();
  const [selectedContent, setSelectedContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContent = aboutContent.filter(content =>
    content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    content.section_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (content.description && content.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEdit = (content: any) => {
    setSelectedContent(content);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedContent(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      await deleteAboutContent(id);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
        <Button onClick={handleCreate} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Content
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">About Content</h2>
        </div>
        <div className="p-6">
          <div className="grid gap-6">
            {filteredContent.length > 0 ? (
              filteredContent.map((content) => (
                <div key={content.id} className="border rounded-lg p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{content.title}</h3>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {content.section_type}
                        </span>
                        {content.is_active && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                            Active
                          </span>
                        )}
                      </div>
                      {content.description && (
                        <p className="text-gray-700 mb-4">{content.description}</p>
                      )}
                      {content.year && (
                        <p className="text-sm text-gray-600">Year: {content.year}</p>
                      )}
                      <p className="text-sm text-gray-600 mt-2">Order: {content.order_index}</p>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(content)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(content.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No content found. Create your first about content to get started!
              </div>
            )}
          </div>
        </div>
      </div>

      <AboutContentModal
        content={selectedContent}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedContent(null);
        }}
      />
    </div>
  );
};

export default AboutContentManager;
