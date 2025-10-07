import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, BookOpen, Send, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { registerParticipant } from '@/utils/api';
import '@/styles/event-enhancements.css';

interface FormData {
  name: string;
  reg_no: string;
  division: string;
  year_of_study: string;
  email: string;
  phone_no: string;
  recipt_no: string;
}

const InternalRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    reg_no: '',
    division: '',
    year_of_study: '',
    email: '',
    phone_no: '',
    recipt_no: ''
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

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.reg_no.trim()) newErrors.reg_no = 'Registration number is required';
    if (!formData.division.trim()) newErrors.division = 'Division is required';
    if (!formData.year_of_study.trim()) newErrors.year_of_study = 'Year of study is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone_no.trim()) newErrors.phone_no = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone_no.replace(/\s|-/g, ''))) newErrors.phone_no = 'Phone number must be 10 digits';
    if (!formData.recipt_no.trim()) newErrors.recipt_no = 'Receipt number is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const result = await registerParticipant(formData, 'internal');

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      // Handle error - for now just log it, you could add error state
      console.error('Registration failed:', result.message);
      alert(result.message || 'Registration failed. Please try again.');
    }
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white font-medium">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reg_no" className="text-white font-medium">Registration Number *</Label>
                    <Input
                      id="reg_no"
                      name="reg_no"
                      value={formData.reg_no}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                      placeholder="URK21XXXX"
                    />
                    {errors.reg_no && <p className="text-red-400 text-sm">{errors.reg_no}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="division" className="text-white font-medium">Division *</Label>
                    <Input
                      id="division"
                      name="division"
                      value={formData.division}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                      placeholder="Enter your division"
                    />
                    {errors.division && <p className="text-red-400 text-sm">{errors.division}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year_of_study" className="text-white font-medium">Year of Study *</Label>
                    <select
                      id="year_of_study"
                      name="year_of_study"
                      value={formData.year_of_study}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/20 text-white rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none"
                    >
                      <option value="" className="bg-gray-800">Select Year</option>
                      <option value="1st Year" className="bg-gray-800">1st Year</option>
                      <option value="2nd Year" className="bg-gray-800">2nd Year</option>
                      <option value="3rd Year" className="bg-gray-800">3rd Year</option>
                      <option value="4th Year" className="bg-gray-800">4th Year</option>
                    </select>
                    {errors.year_of_study && <p className="text-red-400 text-sm">{errors.year_of_study}</p>}
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
                    <Label htmlFor="phone_no" className="text-white font-medium">Phone Number *</Label>
                    <Input
                      id="phone_no"
                      name="phone_no"
                      type="tel"
                      value={formData.phone_no}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500"
                      placeholder="Enter 10-digit phone number"
                    />
                    {errors.phone_no && <p className="text-red-400 text-sm">{errors.phone_no}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipt_no" className="text-white font-medium">Receipt Number *</Label>
                    <div className="flex gap-3">
                      <Input
                        id="recipt_no"
                        name="recipt_no"
                        value={formData.recipt_no}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-blue-500 flex-1"
                        placeholder="Enter receipt number"
                      />
                      <Button
                        type="button"
                        onClick={() => window.open('https://eduserve.karunya.edu/online/PayAddOnFees.aspx', '_blank')}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-orange-500/40 whitespace-nowrap"
                      >
                        Pay Now
                      </Button>
                    </div>
                    {errors.recipt_no && <p className="text-red-400 text-sm">{errors.recipt_no}</p>}
                  </div>
                </div>

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
