import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Plus,
  Edit,
  Trash2,
  GripVertical,
  Eye,
  EyeOff,
  Copy,
  Settings,
  Type,
  Mail,
  Phone,
  MessageSquare,
  CheckSquare,
  Circle,
  List
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import {
  getAllContactFormFieldsAdmin,
  createContactFormField,
  updateContactFormField,
  deleteContactFormField,
  toggleContactFormFieldStatus,
  reorderContactFormFields,
  duplicateContactFormField,
  type ContactFormField,
  type CreateContactFormFieldData
} from '@/lib/supabase/contactFormServices';

const ContactFormFieldsManager = () => {
  const [fields, setFields] = useState<ContactFormField[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<ContactFormField | null>(null);
  const [formData, setFormData] = useState<CreateContactFormFieldData>({
    field_name: '',
    field_label: '',
    field_type: 'text',
    field_placeholder: '',
    is_required: false,
    is_active: true,
    order_index: 0
  });

  const fieldTypes = [
    { value: 'text', label: 'Text Input', icon: Type },
    { value: 'email', label: 'Email', icon: Mail },
    { value: 'tel', label: 'Phone', icon: Phone },
    { value: 'textarea', label: 'Textarea', icon: MessageSquare },
    { value: 'select', label: 'Select Dropdown', icon: List },
    { value: 'checkbox', label: 'Checkbox', icon: CheckSquare },
    { value: 'radio', label: 'Radio Button', icon: Circle }
  ];

  useEffect(() => {
    loadFields();
  }, [loadFields]);

  const loadFields = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAllContactFormFieldsAdmin();
      setFields(data);
    } catch (error) {
      console.error('Error loading contact form fields:', error);
      toast({
        title: "Error loading fields",
        description: "Failed to load contact form fields.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, []);

  const resetFormData = () => {
    setFormData({
      field_name: '',
      field_label: '',
      field_type: 'text',
      field_placeholder: '',
      is_required: false,
      is_active: true,
      order_index: fields.length + 1
    });
  };

  const handleAddField = async () => {
    try {
      const newField = await createContactFormField({
        ...formData,
        order_index: fields.length + 1
      });

      if (newField) {
        setFields([...fields, newField]);
        setIsAddDialogOpen(false);
        resetFormData();
        toast({
          title: "Field added",
          description: `${formData.field_label} has been added successfully.`
        });
      }
    } catch (error) {
      console.error('Error adding field:', error);
      toast({
        title: "Error adding field",
        description: "Failed to add the contact form field.",
        variant: "destructive"
      });
    }
  };

  const handleEditField = async () => {
    if (!selectedField) return;

    try {
      const updatedField = await updateContactFormField(selectedField.id, formData);

      if (updatedField) {
        setFields(fields.map(field =>
          field.id === selectedField.id ? updatedField : field
        ));
        setIsEditDialogOpen(false);
        setSelectedField(null);
        resetFormData();
        toast({
          title: "Field updated",
          description: `${formData.field_label} has been updated successfully.`
        });
      }
    } catch (error) {
      console.error('Error updating field:', error);
      toast({
        title: "Error updating field",
        description: "Failed to update the contact form field.",
        variant: "destructive"
      });
    }
  };

  const handleDeleteField = async (field: ContactFormField) => {
    if (!confirm(`Are you sure you want to delete "${field.field_label}"?`)) return;

    try {
      const success = await deleteContactFormField(field.id);

      if (success) {
        setFields(fields.filter(f => f.id !== field.id));
        toast({
          title: "Field deleted",
          description: `${field.field_label} has been deleted successfully.`
        });
      }
    } catch (error) {
      console.error('Error deleting field:', error);
      toast({
        title: "Error deleting field",
        description: "Failed to delete the contact form field.",
        variant: "destructive"
      });
    }
  };

  const handleToggleStatus = async (field: ContactFormField) => {
    try {
      const success = await toggleContactFormFieldStatus(field.id, !field.is_active);

      if (success) {
        setFields(fields.map(f =>
          f.id === field.id ? { ...f, is_active: !f.is_active } : f
        ));
        toast({
          title: field.is_active ? "Field disabled" : "Field enabled",
          description: `${field.field_label} has been ${field.is_active ? 'disabled' : 'enabled'}.`
        });
      }
    } catch (error) {
      console.error('Error toggling field status:', error);
      toast({
        title: "Error updating field",
        description: "Failed to update field status.",
        variant: "destructive"
      });
    }
  };

  const handleDuplicateField = async (field: ContactFormField) => {
    try {
      const duplicatedField = await duplicateContactFormField(field.id);

      if (duplicatedField) {
        setFields([...fields, duplicatedField]);
        toast({
          title: "Field duplicated",
          description: `${field.field_label} has been duplicated successfully.`
        });
      }
    } catch (error) {
      console.error('Error duplicating field:', error);
      toast({
        title: "Error duplicating field",
        description: "Failed to duplicate the contact form field.",
        variant: "destructive"
      });
    }
  };

  const openEditDialog = (field: ContactFormField) => {
    setSelectedField(field);
    setFormData({
      field_name: field.field_name,
      field_label: field.field_label,
      field_type: field.field_type,
      field_placeholder: field.field_placeholder || '',
      field_options: field.field_options,
      is_required: field.is_required,
      is_active: field.is_active,
      order_index: field.order_index,
      validation_rules: field.validation_rules,
      help_text: field.help_text || ''
    });
    setIsEditDialogOpen(true);
  };

  const getFieldTypeIcon = (type: string) => {
    const fieldType = fieldTypes.find(ft => ft.value === type);
    return fieldType ? fieldType.icon : Type;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-500">Loading contact form fields...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Contact Form Fields</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Customize your contact form by adding, editing, and reordering fields
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetFormData}>
              <Plus className="mr-2 h-4 w-4" />
              Add Field
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Contact Form Field</DialogTitle>
              <DialogDescription>
                Create a new field for your contact form
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="field_name">Field Name</Label>
                <Input
                  id="field_name"
                  value={formData.field_name}
                  onChange={(e) => setFormData({ ...formData, field_name: e.target.value })}
                  placeholder="e.g., full_name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="field_label">Field Label</Label>
                <Input
                  id="field_label"
                  value={formData.field_label}
                  onChange={(e) => setFormData({ ...formData, field_label: e.target.value })}
                  placeholder="e.g., Full Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="field_type">Field Type</Label>
                <Select
                  value={formData.field_type}
                  onValueChange={(value: string) => setFormData({ ...formData, field_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select field type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fieldTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center">
                          <type.icon className="mr-2 h-4 w-4" />
                          {type.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="field_placeholder">Placeholder Text</Label>
                <Input
                  id="field_placeholder"
                  value={formData.field_placeholder}
                  onChange={(e) => setFormData({ ...formData, field_placeholder: e.target.value })}
                  placeholder="e.g., Enter your full name"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="is_required"
                  checked={formData.is_required}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_required: checked })}
                />
                <Label htmlFor="is_required">Required field</Label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddField} disabled={!formData.field_name || !formData.field_label}>
                  Add Field
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Fields List */}
      <div className="space-y-4">
        {fields.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <Settings className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No fields configured</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Start by adding your first contact form field
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add First Field
              </Button>
            </CardContent>
          </Card>
        ) : (
          fields.map((field) => {
            const FieldIcon = getFieldTypeIcon(field.field_type);
            return (
              <Card key={field.id} className={`${!field.is_active ? 'opacity-60' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                      <FieldIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">
                          {field.field_label}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {field.field_name} • {field.field_type}
                          {field.is_required && <Badge variant="secondary" className="ml-2 text-xs">Required</Badge>}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleStatus(field)}
                        title={field.is_active ? 'Disable field' : 'Enable field'}
                      >
                        {field.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDuplicateField(field)}
                        title="Duplicate field"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(field)}
                        title="Edit field"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteField(field)}
                        title="Delete field"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Contact Form Field</DialogTitle>
            <DialogDescription>
              Update the field configuration
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit_field_name">Field Name</Label>
              <Input
                id="edit_field_name"
                value={formData.field_name}
                onChange={(e) => setFormData({ ...formData, field_name: e.target.value })}
                placeholder="e.g., full_name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit_field_label">Field Label</Label>
              <Input
                id="edit_field_label"
                value={formData.field_label}
                onChange={(e) => setFormData({ ...formData, field_label: e.target.value })}
                placeholder="e.g., Full Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit_field_type">Field Type</Label>
              <Select
                value={formData.field_type}
                onValueChange={(value: string) => setFormData({ ...formData, field_type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select field type" />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center">
                        <type.icon className="mr-2 h-4 w-4" />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit_field_placeholder">Placeholder Text</Label>
              <Input
                id="edit_field_placeholder"
                value={formData.field_placeholder}
                onChange={(e) => setFormData({ ...formData, field_placeholder: e.target.value })}
                placeholder="e.g., Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit_help_text">Help Text</Label>
              <Textarea
                id="edit_help_text"
                value={formData.help_text || ''}
                onChange={(e) => setFormData({ ...formData, help_text: e.target.value })}
                placeholder="Optional help text for users"
                rows={2}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="edit_is_required"
                checked={formData.is_required}
                onCheckedChange={(checked) => setFormData({ ...formData, is_required: checked })}
              />
              <Label htmlFor="edit_is_required">Required field</Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditField} disabled={!formData.field_name || !formData.field_label}>
                Update Field
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContactFormFieldsManager;
