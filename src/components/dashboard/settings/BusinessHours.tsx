import * as React from 'react';
const { useState } = React;
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Copy, Calendar, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface BusinessHoursData {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

interface BusinessHoursProps {
  businessHours?: BusinessHoursData;
  onBusinessHoursChange: (hours: BusinessHoursData) => void;
}

const BusinessHours: React.FC<BusinessHoursProps> = ({
  businessHours = {},
  onBusinessHoursChange
}) => {
  const defaultHours: BusinessHoursData = {
    monday: { open: '09:00', close: '17:00', closed: false },
    tuesday: { open: '09:00', close: '17:00', closed: false },
    wednesday: { open: '09:00', close: '17:00', closed: false },
    thursday: { open: '09:00', close: '17:00', closed: false },
    friday: { open: '09:00', close: '17:00', closed: false },
    saturday: { open: '10:00', close: '14:00', closed: false },
    sunday: { open: '10:00', close: '14:00', closed: true }
  };

  const [hours, setHours] = useState<BusinessHoursData>({
    ...defaultHours,
    ...businessHours
  });

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const updateHours = (newHours: BusinessHoursData) => {
    setHours(newHours);
    onBusinessHoursChange(newHours);
  };

  const updateDayHours = (day: string, field: 'open' | 'close' | 'closed', value: string | boolean) => {
    const newHours = {
      ...hours,
      [day]: {
        ...hours[day],
        [field]: value
      }
    };
    updateHours(newHours);
  };

  const setWeekdayHours = () => {
    const newHours = { ...hours };
    ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(day => {
      newHours[day] = { open: '09:00', close: '17:00', closed: false };
    });
    updateHours(newHours);
    toast({
      title: 'Weekday hours set',
      description: 'Monday-Friday set to 9:00 AM - 5:00 PM'
    });
  };

  const setWeekendHours = () => {
    const newHours = { ...hours };
    ['saturday', 'sunday'].forEach(day => {
      newHours[day] = { open: '10:00', close: '14:00', closed: false };
    });
    updateHours(newHours);
    toast({
      title: 'Weekend hours set',
      description: 'Saturday-Sunday set to 10:00 AM - 2:00 PM'
    });
  };

  const copyToAllDays = (sourceDay: string) => {
    const sourceHours = hours[sourceDay];
    const newHours = { ...hours };
    
    Object.keys(newHours).forEach(day => {
      if (day !== sourceDay) {
        newHours[day] = { ...sourceHours };
      }
    });
    
    updateHours(newHours);
    toast({
      title: 'Hours copied',
      description: `${sourceDay.charAt(0).toUpperCase() + sourceDay.slice(1)}'s hours copied to all days`
    });
  };

  const resetToDefaults = () => {
    updateHours(defaultHours);
    toast({
      title: 'Hours reset',
      description: 'Business hours reset to default values'
    });
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const validateTime = (time: string) => {
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  };

  const BusinessHoursPreview = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-sm">Business Hours Preview</CardTitle>
        <CardDescription className="text-xs">
          How your business hours will appear to customers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {daysOfWeek.map(({ key, label }) => {
            const dayHours = hours[key];
            return (
              <div key={key} className="flex justify-between items-center py-1">
                <span className="text-sm font-medium">{label}</span>
                <span className="text-sm text-gray-600">
                  {dayHours.closed 
                    ? 'Closed' 
                    : `${formatTime(dayHours.open)} - ${formatTime(dayHours.close)}`
                  }
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Business Hours
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Configure your business operating hours for each day of the week.
        </p>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Quick Actions</CardTitle>
          <CardDescription className="text-xs">
            Set common business hour patterns quickly
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={setWeekdayHours}
            className="text-xs"
          >
            <Calendar className="mr-2 h-3 w-3" />
            Set Weekdays (9-5)
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={setWeekendHours}
            className="text-xs"
          >
            <Calendar className="mr-2 h-3 w-3" />
            Set Weekends (10-2)
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={resetToDefaults}
            className="text-xs"
          >
            <RotateCcw className="mr-2 h-3 w-3" />
            Reset to Defaults
          </Button>
        </CardContent>
      </Card>

      {/* Individual Day Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Daily Hours Configuration</CardTitle>
          <CardDescription className="text-xs">
            Set opening and closing times for each day (24-hour format)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {daysOfWeek.map(({ key, label }) => {
            const dayHours = hours[key];
            return (
              <div key={key} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center p-4 border rounded-lg">
                <div className="md:col-span-1">
                  <Label className="text-sm font-medium">{label}</Label>
                </div>
                
                <div className="md:col-span-1 flex items-center space-x-2">
                  <Switch
                    checked={!dayHours.closed}
                    onCheckedChange={(checked) => updateDayHours(key, 'closed', !checked)}
                  />
                  <Label className="text-xs">
                    {dayHours.closed ? 'Closed' : 'Open'}
                  </Label>
                </div>

                {!dayHours.closed && (
                  <>
                    <div className="md:col-span-1">
                      <Label htmlFor={`${key}_open`} className="text-xs">Opening</Label>
                      <Input
                        id={`${key}_open`}
                        type="time"
                        value={dayHours.open}
                        onChange={(e) => {
                          if (validateTime(e.target.value)) {
                            updateDayHours(key, 'open', e.target.value);
                          }
                        }}
                        className="text-xs"
                      />
                    </div>
                    
                    <div className="md:col-span-1">
                      <Label htmlFor={`${key}_close`} className="text-xs">Closing</Label>
                      <Input
                        id={`${key}_close`}
                        type="time"
                        value={dayHours.close}
                        onChange={(e) => {
                          if (validateTime(e.target.value)) {
                            updateDayHours(key, 'close', e.target.value);
                          }
                        }}
                        className="text-xs"
                      />
                    </div>
                  </>
                )}

                <div className="md:col-span-2 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToAllDays(key)}
                    className="text-xs"
                  >
                    <Copy className="mr-1 h-3 w-3" />
                    Copy to All
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Business Hours Preview */}
      <BusinessHoursPreview />

      {/* Implementation Note */}
      <Card className="bg-blue-50 dark:bg-blue-900/20">
        <CardContent className="pt-6">
          <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            Business Hours Usage
          </h4>
          <ul className="text-xs text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Hours are displayed in 12-hour format to customers</li>
            <li>• Use 24-hour format (HH:MM) when setting times</li>
            <li>• Business hours can be displayed on contact pages</li>
            <li>• Hours are stored in JSON format for easy integration</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BusinessHours;
