import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Edit,
  Trash2,
  Star,
  Eye,
  EyeOff,
  User,
  Building,
  Calendar,
  TrendingUp,
  Award,
  Image,
  Code,
  BarChart3
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  getAllSuccessStoriesAdmin,
  createSuccessStory,
  updateSuccessStory,
  deleteSuccessStory,
  toggleSuccessStoryFeatured,
  toggleSuccessStoryStatus,
  getSuccessStoryStats,
  type SuccessStory,
  type CreateSuccessStoryData
} from '@/lib/supabase/successStoriesServices';

const SuccessStoriesManager = () => {
  const [stories, setStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    featured: 0,
    categories: {}
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [formData, setFormData] = useState<CreateSuccessStoryData>({
    title: '',
    client_name: '',
    client_role: '',
    client_company: '',
    story_content: '',
    results_achieved: '',
    project_duration: '',
    is_featured: false,
    is_active: true,
    order_index: 0,
    category: ''
  });

  const categories = [
    'web-development',
    'mobile-app',
    'digital-marketing',
    'seo',
    'brand-design',
    'e-commerce',
    'cloud-services',
    'digital-transformation',
    'consulting',
    'other'
  ];

  useEffect(() => {
    loadStories();
    loadStats();
  }, []);

  const loadStories = async () => {
    try {
      setLoading(true);
      const data = await getAllSuccessStoriesAdmin();
      setStories(data);
    } catch (error) {
      console.error('Error loading success stories:', error);
      toast({
        title: "Error loading stories",
        description: "Failed to load success stories.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const statsData = await getSuccessStoryStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const resetFormData = () => {
    setFormData({
      title: '',
      client_name: '',
      client_role: '',
      client_company: '',
      story_content: '',
      results_achieved: '',
      project_duration: '',
      technologies_used: [],
      is_featured: false,
      is_active: true,
      order_index: stories.length + 1,
      category: ''
    });
  };

  const handleAddStory = async () => {
    try {
      const newStory = await createSuccessStory({
        ...formData,
        order_index: stories.length + 1
      });
      
      if (newStory) {
        setStories([...stories, newStory]);
        setIsAddDialogOpen(false);
        resetFormData();
        loadStats();
        toast({
          title: "Success story added",
          description: `${formData.title} has been added successfully.`
        });
      }
    } catch (error) {
      console.error('Error adding story:', error);
      toast({
        title: "Error adding story",
        description: "Failed to add the success story.",
        variant: "destructive"
      });
    }
  };

  const handleEditStory = async () => {
    if (!selectedStory) return;

    try {
      const updatedStory = await updateSuccessStory(selectedStory.id, formData);
      
      if (updatedStory) {
        setStories(stories.map(story => 
          story.id === selectedStory.id ? updatedStory : story
        ));
        setIsEditDialogOpen(false);
        setSelectedStory(null);
        resetFormData();
        loadStats();
        toast({
          title: "Success story updated",
          description: `${formData.title} has been updated successfully.`
        });
      }
    } catch (error) {
      console.error('Error updating story:', error);
      toast({
        title: "Error updating story",
        description: "Failed to update the success story.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteStory = async (story: SuccessStory) => {
    if (!confirm(`Are you sure you want to delete "${story.title}"?`)) return;

    try {
      const success = await deleteSuccessStory(story.id);
      
      if (success) {
        setStories(stories.filter(s => s.id !== story.id));
        loadStats();
        toast({
          title: "Success story deleted",
          description: `${story.title} has been deleted successfully.`
        });
      }
    } catch (error) {
      console.error('Error deleting story:', error);
      toast({
        title: "Error deleting story",
        description: "Failed to delete the success story.",
        variant: "destructive"
      });
    }
  };

  const handleToggleFeatured = async (story: SuccessStory) => {
    try {
      const success = await toggleSuccessStoryFeatured(story.id, !story.is_featured);
      
      if (success) {
        setStories(stories.map(s => 
          s.id === story.id ? { ...s, is_featured: !s.is_featured } : s
        ));
        loadStats();
        toast({
          title: story.is_featured ? "Removed from featured" : "Added to featured",
          description: `${story.title} has been ${story.is_featured ? 'removed from' : 'added to'} featured stories.`
        });
      }
    } catch (error) {
      console.error('Error toggling featured status:', error);
      toast({
        title: "Error updating story",
        description: "Failed to update featured status.",
        variant: "destructive"
      });
    }
  };

  const handleToggleStatus = async (story: SuccessStory) => {
    try {
      const success = await toggleSuccessStoryStatus(story.id, !story.is_active);
      
      if (success) {
        setStories(stories.map(s => 
          s.id === story.id ? { ...s, is_active: !s.is_active } : s
        ));
        loadStats();
        toast({
          title: story.is_active ? "Story disabled" : "Story enabled",
          description: `${story.title} has been ${story.is_active ? 'disabled' : 'enabled'}.`
        });
      }
    } catch (error) {
      console.error('Error toggling story status:', error);
      toast({
        title: "Error updating story",
        description: "Failed to update story status.",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (story: SuccessStory) => {
    setSelectedStory(story);
    setFormData({
      title: story.title,
      client_name: story.client_name,
      client_role: story.client_role || '',
      client_company: story.client_company || '',
      story_content: story.story_content,
      client_image: story.client_image || '',
      project_image: story.project_image || '',
      results_achieved: story.results_achieved || '',
      metrics: story.metrics,
      project_duration: story.project_duration || '',
      technologies_used: story.technologies_used || [],
      is_featured: story.is_featured,
      is_active: story.is_active,
      order_index: story.order_index,
      category: story.category || ''
    });
    setIsEditDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading success stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Success Stories</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage client success stories and testimonials for your contact page
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetFormData}>
              <Plus className="mr-2 h-4 w-4" />
              Add Story
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add Success Story</DialogTitle>
              <DialogDescription>
                Create a new client success story
              </DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="media">Media & Tech</TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Story Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Digital Transformation Success"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client_name">Client Name</Label>
                    <Input
                      id="client_name"
                      value={formData.client_name}
                      onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="client_role">Client Role</Label>
                    <Input
                      id="client_role"
                      value={formData.client_role}
                      onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                      placeholder="CEO"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="client_company">Company</Label>
                    <Input
                      id="client_company"
                      value={formData.client_company}
                      onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                      placeholder="TechCorp Inc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="story_content">Story Content</Label>
                  <Textarea
                    id="story_content"
                    value={formData.story_content}
                    onChange={(e) => setFormData({ ...formData, story_content: e.target.value })}
                    placeholder="Tell the client's success story..."
                    rows={4}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="results_achieved">Results Achieved</Label>
                  <Textarea
                    id="results_achieved"
                    value={formData.results_achieved}
                    onChange={(e) => setFormData({ ...formData, results_achieved: e.target.value })}
                    placeholder="Describe the measurable results..."
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project_duration">Project Duration</Label>
                  <Input
                    id="project_duration"
                    value={formData.project_duration}
                    onChange={(e) => setFormData({ ...formData, project_duration: e.target.value })}
                    placeholder="e.g., 6 months"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_featured"
                      checked={formData.is_featured}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                    />
                    <Label htmlFor="is_featured">Featured story</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">Active</Label>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="media" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client_image">Client Image URL</Label>
                  <Input
                    id="client_image"
                    value={formData.client_image}
                    onChange={(e) => setFormData({ ...formData, client_image: e.target.value })}
                    placeholder="https://example.com/client-photo.jpg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="project_image">Project Image URL</Label>
                  <Input
                    id="project_image"
                    value={formData.project_image}
                    onChange={(e) => setFormData({ ...formData, project_image: e.target.value })}
                    placeholder="https://example.com/project-screenshot.jpg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="technologies_used">Technologies Used (comma-separated)</Label>
                  <Input
                    id="technologies_used"
                    value={formData.technologies_used?.join(', ') || ''}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      technologies_used: e.target.value.split(',').map(tech => tech.trim()).filter(Boolean)
                    })}
                    placeholder="React, Node.js, AWS, Docker"
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddStory} disabled={!formData.title || !formData.client_name || !formData.story_content}>
                Add Story
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Stories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Star className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Featured</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.featured}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{Object.keys(stats.categories).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stories List */}
      <div className="space-y-4">
        {stories.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Award className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No success stories yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Start by adding your first client success story
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Story
              </Button>
            </CardContent>
          </Card>
        ) : (
          stories.map((story) => (
            <Card key={story.id} className={`${!story.is_active ? 'opacity-60' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
                        {story.title}
                      </h4>
                      {story.is_featured && (
                        <Badge variant="default" className="text-xs">
                          <Star className="mr-1 h-3 w-3" />
                          Featured
                        </Badge>
                      )}
                      {story.category && (
                        <Badge variant="outline" className="text-xs">
                          {story.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
                      <User className="mr-1 h-4 w-4" />
                      <span>{story.client_name}</span>
                      {story.client_role && (
                        <>
                          <span className="mx-2">•</span>
                          <span>{story.client_role}</span>
                        </>
                      )}
                      {story.client_company && (
                        <>
                          <span className="mx-2">•</span>
                          <Building className="mr-1 h-4 w-4" />
                          <span>{story.client_company}</span>
                        </>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {story.story_content}
                    </p>
                    
                    {story.project_duration && (
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-2">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>Duration: {story.project_duration}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleFeatured(story)}
                      title={story.is_featured ? 'Remove from featured' : 'Add to featured'}
                    >
                      <Star className={`h-4 w-4 ${story.is_featured ? 'fill-current text-yellow-500' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleStatus(story)}
                      title={story.is_active ? 'Disable story' : 'Enable story'}
                    >
                      {story.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openEditDialog(story)}
                      title="Edit story"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteStory(story)}
                      title="Delete story"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit Dialog - Similar structure to Add Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Success Story</DialogTitle>
            <DialogDescription>
              Update the success story details
            </DialogDescription>
          </DialogHeader>
          {/* Similar form structure as Add Dialog - truncated for brevity */}
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditStory} disabled={!formData.title || !formData.client_name || !formData.story_content}>
              Update Story
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuccessStoriesManager;
