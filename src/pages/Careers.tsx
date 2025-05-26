import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Filter } from 'lucide-react';

const jobListings = [
  {
    id: 'fe-dev-1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    experience: '3-5 years',
    salary: '$90,000 - $120,000',
    posted: '2025-05-15',
    description: 'We are looking for a Senior Frontend Developer to join our team and help build beautiful, responsive web applications using React, TypeScript, and modern UI frameworks.'
  },
  {
    id: 'be-dev-1',
    title: 'Backend Developer',
    department: 'Engineering',
    location: 'New York, NY',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '$85,000 - $110,000',
    posted: '2025-05-12',
    description: 'We are seeking a talented Backend Developer to design and implement server-side logic, maintain databases, and ensure high performance and responsiveness to frontend requests.'
  },
  {
    id: 'ux-designer-1',
    title: 'UX/UI Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    experience: '2-5 years',
    salary: '$80,000 - $105,000',
    posted: '2025-05-10',
    description: 'We are looking for a creative UX/UI Designer to create amazing user experiences.'
  }
];

const departments = ['All Departments', 'Engineering', 'Design'];
const locations = ['All Locations', 'Remote', 'New York, NY'];

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');

  const filteredJobs = jobListings.filter(job => {
    const matchesDepartment = selectedDepartment === 'All Departments' || job.department === selectedDepartment;
    const matchesLocation = selectedLocation === 'All Locations' || job.location === selectedLocation;
    return matchesDepartment && matchesLocation;
  });

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-purple-600 bg-clip-text text-transparent">
          Join Our Team
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          We're looking for passionate individuals to help us build the future of digital identity
        </p>
      </div>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Open Positions</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5 text-purple-400" />
                <h3 className="text-xl font-bold">Filters</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <select 
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Location</label>
                  <select 
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    {locations.map(loc => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-3/4 grid grid-cols-1 gap-8">
            {filteredJobs.length === 0 ? (
              <div className="text-center text-gray-400 py-20">No jobs found for selected filters.</div>
            ) : (
              filteredJobs.map(job => (
                <Card key={job.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-all">
                  <CardHeader>
                    <CardTitle>{job.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-3 mb-2">
                      <span className="bg-purple-700 text-white text-xs px-2 py-1 rounded-full">{job.department}</span>
                      <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">{job.location}</span>
                      <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">{job.type}</span>
                    </div>
                    <div className="text-gray-400 text-sm mb-2">{job.salary} | {job.experience} | Posted {formatDate(job.posted)}</div>
                    <p className="mb-4 text-gray-300">{job.description}</p>
                    <Button className="bg-gradient-to-r from-yellow-400 to-purple-600 text-white" tabIndex={0} aria-label={`Apply for ${job.title}`}>
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
