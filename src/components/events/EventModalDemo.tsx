import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import ModernEventModal from './ModernEventModal';

// Sample event data for demonstration
const sampleEvents = [
  {
    id: 1,
    title: "Battle of Binaries 1.0",
    date: "2025-10-17",
    time: "09:30 AM",
    location: "Karunya University, Coimbatore",
    description: "An ultimate coding face-off — Battle of Binaries 1.0 — organized in association with CompTIA. This is a comprehensive coding competition that will test your programming skills across multiple domains. Participate in various rounds including algorithm challenges, debugging sessions, and project presentations. Compete, code, and conquer to win certifications worth ₹75,000! The event features multiple tracks for different skill levels, from beginners to advanced programmers. Network with industry professionals and gain insights into the latest programming trends and technologies.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=450&fit=crop",
    status: "upcoming" as const,
    category: "Competition",
    eventType: "paid" as const,
    rulesAndRegulations: `
1. All participants must register before the event deadline of October 15, 2025.
2. Participants must bring valid college ID proof for verification.
3. Laptops with required software must be brought by participants.
4. Team size is limited to 2-4 members maximum.
5. Plagiarism will result in immediate disqualification.
6. Judges' decisions will be final and binding.
7. All code submissions must be original work.
8. Use of AI tools is strictly prohibited during the competition.
    `,
    termsAndConditions: `
By registering for Battle of Binaries 1.0, you agree to:
• Allow photography and videography during the event for promotional purposes.
• Comply with all competition rules and venue policies.
• Understand that organizers are not liable for any technical issues with personal equipment.
• Accept that event schedule may change with 24-hour prior notice.
• Provide accurate team information during registration.
• Follow all safety protocols and COVID guidelines if applicable.
• Acknowledge that prizes are subject to tax implications as per Indian law.
• Grant permission to use your name and photo in event publicity materials.
    `
  },
  {
    id: 2,
    title: "AI Workshop Series",
    date: "2024-08-15",
    time: "10:00 AM",
    location: "Online",
    description: "A comprehensive workshop series covering machine learning fundamentals, neural networks, and practical AI applications. Perfect for beginners and intermediate learners.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop",
    status: "past" as const,
    category: "Workshop",
    participants: 150,
    rating: 4.8,
    eventType: "paid" as const,
  }
];

const EventModalDemo: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<typeof sampleEvents[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (event: typeof sampleEvents[0]) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleRegister = () => {
    console.log('Registration clicked for:', selectedEvent?.title);
    // Add registration logic here
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold gradient-text text-center mb-8">
          Modern Event Modal Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sampleEvents.map((event) => (
            <div 
              key={event.id}
              className="glass-card border-glass-border p-6 space-y-4"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {event.title}
                </h3>
                <p className="text-foreground-secondary text-sm mb-4">
                  {event.description.slice(0, 120)}...
                </p>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === 'upcoming' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-500/20 text-gray-400'
                  }`}>
                    {event.status === 'upcoming' ? 'Upcoming' : 'Past Event'}
                  </span>
                  <Button 
                    onClick={() => openModal(event)}
                    variant="outline"
                    className="border-glass-border"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modern Event Modal */}
        <ModernEventModal
          event={selectedEvent}
          isOpen={isModalOpen}
          onClose={closeModal}
          onRegister={selectedEvent?.status === 'upcoming' ? handleRegister : undefined}
        />
      </div>
    </div>
  );
};

export default EventModalDemo;