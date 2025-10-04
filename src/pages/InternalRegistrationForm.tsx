import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, BookOpen, Calendar, Send, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import '@/styles/event-enhancements.css';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  department: string;
  year: string;
  branch: string;
  emergencyContact: string;
  emergencyPhone: string;
  dietaryRequirements: string;
  expectations: string;
  experience: string;
}

const InternalRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    studentId: '',
    department: '',
    year: '',
    branch: '',
    emergencyContact: '',
    emergencyPhone: '',
    dietaryRequirements: '',
    expectations: '',
    experience: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number';
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.year.trim()) newErrors.year = 'Year is required';
    if (!formData.branch.trim()) newErrors.branch = 'Branch is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const goBack = () => {
    window.history.back();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 max-w-md w-full"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white mb-4">Event Registration Successful!</h2>
          <p className="text-gray-300 mb-8">
            You have been successfully registered for the event! You will receive a confirmation email with event details, schedule, and any additional instructions.
          </p>
          <Button
            onClick={() => window.location.href = '/events'}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Back to Events
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            onClick={goBack}
            variant="ghost"
            className="text-white hover:text-blue-400 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 bg-clip-text text-transparent mb-4">
            Event Registration
          </h1>
          <p className="text-gray-300 text-lg">
            Register for the event - Karunya University students
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden max-w-4xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-b border-white/10">
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <User className="w-6 h-6" />
                Event Registration - Student Information
              </CardTitle>
            </CardHeader>
            
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-white font-medium">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white font-medium">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                      placeholder="student@karunya.edu"
                    />
                    {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="studentId" className="text-white font-medium">Student ID *</Label>
                    <Input
                      id="studentId"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                      placeholder="21XXXX"
                    />
                    {errors.studentId && <p className="text-red-400 text-sm">{errors.studentId}</p>}
                  </div>
                </div>

                {/* Academic Information */}
                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    Academic Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="department" className="text-white font-medium">Department *</Label>
                      <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/20 text-white rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="" className="bg-gray-800">Select Department</option>
                        <option value="Computer Science" className="bg-gray-800">Computer Science</option>
                        <option value="Information Technology" className="bg-gray-800">Information Technology</option>
                        <option value="Electronics" className="bg-gray-800">Electronics</option>
                        <option value="Mechanical" className="bg-gray-800">Mechanical</option>
                        <option value="Civil" className="bg-gray-800">Civil</option>
                        <option value="Biotechnology" className="bg-gray-800">Biotechnology</option>
                        <option value="Other" className="bg-gray-800">Other</option>
                      </select>
                      {errors.department && <p className="text-red-400 text-sm">{errors.department}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year" className="text-white font-medium">Year *</Label>
                      <select
                        id="year"
                        name="year"
                        value={formData.year}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/20 text-white rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                      >
                        <option value="" className="bg-gray-800">Select Year</option>
                        <option value="1st Year" className="bg-gray-800">1st Year</option>
                        <option value="2nd Year" className="bg-gray-800">2nd Year</option>
                        <option value="3rd Year" className="bg-gray-800">3rd Year</option>
                        <option value="4th Year" className="bg-gray-800">4th Year</option>
                      </select>
                      {errors.year && <p className="text-red-400 text-sm">{errors.year}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="branch" className="text-white font-medium">Branch/Specialization *</Label>
                      <Input
                        id="branch"
                        name="branch"
                        value={formData.branch}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                        placeholder="e.g., CSE, IT, ECE"
                      />
                      {errors.branch && <p className="text-red-400 text-sm">{errors.branch}</p>}
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Phone className="w-5 h-5" />
                    Emergency Contact
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact" className="text-white font-medium">Emergency Contact Name *</Label>
                      <Input
                        id="emergencyContact"
                        name="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                        placeholder="Parent/Guardian name"
                      />
                      {errors.emergencyContact && <p className="text-red-400 text-sm">{errors.emergencyContact}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone" className="text-white font-medium">Emergency Phone *</Label>
                      <Input
                        id="emergencyPhone"
                        name="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                        placeholder="+91 98765 43210"
                      />
                      {errors.emergencyPhone && <p className="text-red-400 text-sm">{errors.emergencyPhone}</p>}
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-xl font-semibold text-white mb-6">Additional Information</h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="dietaryRequirements" className="text-white font-medium">Dietary Requirements</Label>
                      <Input
                        id="dietaryRequirements"
                        name="dietaryRequirements"
                        value={formData.dietaryRequirements}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                        placeholder="Vegetarian, Vegan, Allergies, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-white font-medium">Previous Event/Technical Experience</Label>
                      <Textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500 min-h-[100px]"
                        placeholder="Previous events attended, technical skills, projects, etc..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expectations" className="text-white font-medium">What do you hope to learn from this event?</Label>
                      <Textarea
                        id="expectations"
                        name="expectations"
                        value={formData.expectations}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500 min-h-[100px]"
                        placeholder="Your learning goals and expectations from this event..."
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 border-t border-white/10">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Submitting Registration...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <Send className="w-5 h-5" />
                        Register for Event
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default InternalRegistrationForm;