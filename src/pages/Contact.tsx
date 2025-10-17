import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Youtube } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+91 99724 33292",
      link: "tel:+919972433292",
    },
    {
      icon: Mail,
      title: "Email",
      content: "santoshhiretanad292@gmail.com",
      link: "mailto:santoshhiretanad292@gmail.com",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "Chikgunjul, Karnataka 581117, India",
      link: "https://maps.app.goo.gl/gCrEYQ9RtTVrHqYNA",
    },
    {
      icon: Clock,
      title: "Office Hours",
      content: "Mon - Sat: 10:00 AM - 6:00 PM",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            Contact Us
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-2xl text-center shadow-warm hover:shadow-gold transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-saffron rounded-full flex items-center justify-center shadow-gold">
                  <info.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.link}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">{info.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-card p-8 rounded-2xl shadow-warm">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                  />
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What is this regarding?"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Write your message here..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-gold hover:opacity-90 text-foreground font-semibold shadow-gold"
                >
                  Send Message
                </Button>
              </form>
            </div>

            {/* Map & Social */}
            <div className="space-y-6">
              <div className="bg-card p-8 rounded-2xl shadow-warm">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Find Us Here
                </h2>
                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3849.627966825852!2d75.4088051!3d15.233512699999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb91fed9e3502d1%3A0x76fc9f90cd638b0a!2sChikkagunjal!5e0!3m2!1sen!2sin!4v1760635985577!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Baghat Location Map"
                  ></iframe>
                </div>
              </div>

              <div className="bg-card p-8 rounded-2xl shadow-warm">
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Follow Us
                </h2>
                <p className="text-muted-foreground mb-6">
                  Stay connected with us on social media for updates and event
                  announcements
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary flex items-center justify-center transition-all shadow-sm hover:shadow-warm"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary flex items-center justify-center transition-all shadow-sm hover:shadow-warm"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-primary-foreground text-primary flex items-center justify-center transition-all shadow-sm hover:shadow-warm"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
