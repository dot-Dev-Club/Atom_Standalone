import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Phone, Building, MapPin, Send, CheckCircle, CreditCard } from 'lucide-react';
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
  organization: string;
  designation: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  emergencyContact: string;
  emergencyPhone: string;
  dietaryRequirements: string;
  expectations: string;
  experience: string;
  hearAbout: string;
  paymentMethod: string;
}

const ExternalRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    designation: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    emergencyContact: '',
    emergencyPhone: '',
    dietaryRequirements: '',
    expectations: '',
    experience: '',
    hearAbout: '',
    paymentMethod: ''
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
    if (!formData.organization.trim()) newErrors.organization = 'Organization is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!formData.emergencyContact.trim()) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.emergencyPhone.trim()) newErrors.emergencyPhone = 'Emergency phone is required';
    if (!formData.paymentMethod.trim()) newErrors.paymentMethod = 'Payment method is required';

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
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-cyan-900 flex items-center justify-center p-4">
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
            You have been successfully registered for the event! You will receive a confirmation email with payment instructions, event schedule, and detailed information about the event.
          </p>
          <Button
            onClick={() => window.location.href = '/events'}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-3 rounded-xl font-semibold"
          >
            Back to Events
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-teal-900 to-cyan-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse"></div>
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
            className="text-white hover:text-teal-400 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Events
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-400 via-cyan-500 to-teal-400 bg-clip-text text-transparent mb-4">
            Event Registration
          </h1>
          <p className="text-gray-300 text-lg">
            Register for the event - External participants
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden max-w-4xl mx-auto">
            <CardHeader className="bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border-b border-white/10">
              <CardTitle className="text-2xl text-white flex items-center gap-3">
                <User className="w-6 h-6" />
                Event Registration - Participant Information
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
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500"
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
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500"
                      placeholder="your.email@domain.com"
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
                      className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hearAbout" className="text-white font-medium">How did you hear about this event?</Label>
                    <select
                      id="hearAbout"
                      name="hearAbout"
                      value={formData.hearAbout}
                      onChange={handleInputChange}
                      className="w-full bg-white/5 border border-white/20 text-white rounded-lg px-3 py-2 focus:border-teal-500 focus:outline-none"
                    >
                      <option value="" className="bg-gray-800">Select an option</option>
                      <option value="Social Media" className="bg-gray-800">Social Media</option>
                      <option value="Website" className="bg-gray-800">Website</option>
                      <option value="Friend/Colleague" className="bg-gray-800">Friend/Colleague</option>
                      <option value="Professional Network" className="bg-gray-800">Professional Network</option>
                      <option value="Previous Event" className="bg-gray-800">Previous Event</option>
                      <option value="University Partnership" className="bg-gray-800">University Partnership</option>
                      <option value="Other" className="bg-gray-800">Other</option>
                    </select>
                  </div>
                </div>

                {/* Professional Information */}
                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <Building className="w-5 h-5" />
                    Professional Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organization" className="text-white font-medium">Organization/Company *</Label>
                      <Input
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500"
                        placeholder="Company/Organization name"
                      />
                      {errors.organization && <p className="text-red-400 text-sm">{errors.organization}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="designation" className="text-white font-medium">Designation/Role *</Label>
                      <Input
                        id="designation"
                        name="designation"
                        value={formData.designation}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500"
                        placeholder="Your job title/role"
                      />
                      {errors.designation && <p className="text-red-400 text-sm">{errors.designation}</p>}
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <MapPin className="w-5 h-5" />
                    Address Details
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-white font-medium">Street Address *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500 min-h-[80px]"
                        placeholder="Enter your complete address"
                      />
                      {errors.address && <p className="text-red-400 text-sm">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-white font-medium">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500"
                          placeholder="City"
                        />
                        {errors.city && <p className="text-red-400 text-sm">{errors.city}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="state" className="text-white font-medium">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500"
                          placeholder="State"
                        />
                        {errors.state && <p className="text-red-400 text-sm">{errors.state}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode" className="text-white font-medium">Pincode *</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500"
                          placeholder="123456"
                        />
                        {errors.pincode && <p className="text-red-400 text-sm">{errors.pincode}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country" className="text-white font-medium">Country</Label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className="w-full bg-white/5 border border-white/20 text-white rounded-lg px-3 py-2 focus:border-teal-500 focus:outline-none"
                        >
                          <option value="India" className="bg-gray-800">India</option>
                          <option value="USA" className="bg-gray-800">USA</option>
                          <option value="UK" className="bg-gray-800">UK</option>
                          <option value="Canada" className="bg-gray-800">Canada</option>
                          <option value="Australia" className="bg-gray-800">Australia</option>
                          <option value="Other" className="bg-gray-800">Other</option>
                        </select>
                      </div>
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
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500"
                        placeholder="Contact person name"
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
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500"
                        placeholder="+91 98765 43210"
                      />
                      {errors.emergencyPhone && <p className="text-red-400 text-sm">{errors.emergencyPhone}</p>}
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div className="border-t border-white/10 pt-8">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod" className="text-white font-medium">Preferred Payment Method *</Label>
                      <select
                        id="paymentMethod"
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleInputChange}
                        className="w-full bg-white/5 border border-white/20 text-white rounded-lg px-3 py-2 focus:border-teal-500 focus:outline-none"
                      >
                        <option value="" className="bg-gray-800">Select payment method</option>
                        <option value="Credit/Debit Card" className="bg-gray-800">Credit/Debit Card</option>
                        <option value="UPI" className="bg-gray-800">UPI</option>
                        <option value="Net Banking" className="bg-gray-800">Net Banking</option>
                        <option value="Bank Transfer" className="bg-gray-800">Bank Transfer</option>
                      </select>
                      {errors.paymentMethod && <p className="text-red-400 text-sm">{errors.paymentMethod}</p>}
                    </div>
                    
                    <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl p-4">
                      <p className="text-teal-300 text-sm">
                        <strong>Note:</strong> Payment instructions will be sent to your email after registration. 
                        The event registration fee is ₹500 for external participants.
                      </p>
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
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500"
                        placeholder="Vegetarian, Vegan, Allergies, etc."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-white font-medium">Professional/Technical Experience</Label>
                      <Textarea
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500 min-h-[100px]"
                        placeholder="Relevant experience, technical skills, previous events attended..."
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="expectations" className="text-white font-medium">What do you hope to gain from this event?</Label>
                      <Textarea
                        id="expectations"
                        name="expectations"
                        value={formData.expectations}
                        onChange={handleInputChange}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-teal-500 min-h-[100px]"
                        placeholder="Your learning objectives, networking goals, expected outcomes..."
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 border-t border-white/10">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
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

export default ExternalRegistrationForm;
