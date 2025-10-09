import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '@/config/emailjs';

export const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    email: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = { name: "", mobile: "", email: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.mobile.trim())) {
      newErrors.mobile = "Please enter a valid mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors and try again.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Email template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        from_mobile: formData.mobile,
        to_email: 'atom@karunya.edu',
        message: `
Contact Form Submission from ATOM Club Website

Name: ${formData.name}
Email: ${formData.email}
Mobile: ${formData.mobile}

This person is interested in joining the ATOM Club community.
        `.trim(),
        reply_to: formData.email,
      };

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      toast({
        title: "Message Sent Successfully!",
        description:
          "Thank you for your interest. We'll get back to you at atom@karunya.edu soon.",
        variant: "default",
      });

      setFormData({ name: "", mobile: "", email: "" });
      setErrors({ name: "", mobile: "", email: "" });
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Error Sending Message",
        description: "Something went wrong. Please try emailing us directly at atom@karunya.edu",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <section
      ref={ref}
      className="py-8 px-4 sm:py-12 sm:px-6 md:py-16 lg:py-20 xl:py-24 max-w-5xl mx-auto"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 sm:mb-6 md:mb-8 gradient-text"
      >
        Get In Touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-sm sm:text-base md:text-lg text-center text-foreground-secondary mb-6 sm:mb-8 md:mb-12 max-w-2xl mx-auto px-2"
      >
        Ready to join the ATOM Club community? Send us your details and we'll
        get back to you with more information about our programs and membership.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="glass-card p-6 sm:p-8 md:p-10 lg:p-12 max-w-4xl mx-auto"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={`w-full px-4 py-3 bg-input border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-atom-primary transition-all duration-300 text-foreground ${
                errors.name
                  ? "border-destructive focus:ring-destructive"
                  : "border-border focus:border-atom-primary"
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-destructive flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </motion.p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Mobile Number *
            </label>
            <input
              type="tel"
              id="mobile"
              value={formData.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              className={`w-full px-4 py-3 bg-input border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-atom-primary transition-all duration-300 text-foreground ${
                errors.mobile
                  ? "border-destructive focus:ring-destructive"
                  : "border-border focus:border-atom-primary"
              }`}
              placeholder="+1 (555) 123-4567"
            />
            {errors.mobile && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-destructive flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.mobile}
              </motion.p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`w-full px-4 py-3 bg-input border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-atom-primary transition-all duration-300 text-foreground ${
                errors.email
                  ? "border-destructive focus:ring-destructive"
                  : "border-border focus:border-atom-primary"
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-destructive flex items-center gap-1"
              >
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </motion.p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full btn-metallic text-sm sm:text-base flex items-center justify-center gap-3 py-3 sm:py-4 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Send Message
              </>
            )}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-foreground-secondary"
        >
          <p>
            By submitting this form, you agree to receive communications from
            ATOM Club. We respect your privacy and will never share your
            information.
          </p>
          <p className="mt-2 text-atom-primary">
            Messages are sent directly to: <strong>atom@karunya.edu</strong>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};
