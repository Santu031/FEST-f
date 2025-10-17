import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Handshake,
  Building2,
  Heart,
  Star,
  Send,
  CheckCircle2,
  Phone,
  Mail,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Sponsors = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    phone: "",
    sponsorshipType: "",
    amount: "",
    message: "",
  });

  const currentSponsors: Array<{
    name: string;
    type: string;
    logo: string;
    contribution: string;
    year: number;
  }> = [];

  const sponsorshipTiers = [
    {
      name: "Platinum Sponsor",
      amount: "₹1,00,000+",
      icon: Star,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      benefits: [
        "Logo on main banner and all promotional materials",
        "Special mention in all events",
        "VIP seating for events",
        "Social media recognition",
        "Certificate of appreciation",
      ],
    },
    {
      name: "Gold Sponsor",
      amount: "₹50,000 - ₹99,999",
      icon: Star,
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      benefits: [
        "Logo on promotional materials",
        "Mention in event announcements",
        "Priority seating",
        "Social media recognition",
        "Certificate of appreciation",
      ],
    },
    {
      name: "Silver Sponsor",
      amount: "₹25,000 - ₹49,999",
      icon: Star,
      color: "text-gray-400",
      bgColor: "bg-gray-50",
      benefits: [
        "Name in promotional materials",
        "Recognition during events",
        "Certificate of appreciation",
        "Social media mention",
      ],
    },
    {
      name: "Community Supporter",
      amount: "₹10,000 - ₹24,999",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50",
      benefits: [
        "Name in event program",
        "Certificate of appreciation",
        "Social media mention",
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically send this to a backend
    console.log("Sponsorship request:", formData);
    
    toast.success(
      "Thank you for your interest! We will contact you shortly.",
      {
        description: "Your sponsorship request has been received.",
      }
    );

    // Reset form
    setFormData({
      name: "",
      organization: "",
      email: "",
      phone: "",
      sponsorshipType: "",
      amount: "",
      message: "",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <header className="bg-gradient-saffron text-white py-16 px-4 shadow-warm mt-20">
        <div className="container mx-auto text-center space-y-4 animate-fade-in">
          <Handshake className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold">Our Sponsors</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Supporting our community celebrations and traditions
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Current Sponsors Section */}
        <section className="mb-16 animate-slide-up">
          <div className="text-center mb-12">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold inline-block mb-4">
              <Building2 className="inline w-4 h-4 mr-2" />
              Our Valued Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Current Sponsors
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We are grateful to our sponsors who make our festivals possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentSponsors.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Building2 className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Be Our First Sponsor!
                </h3>
                <p className="text-muted-foreground">
                  We're looking for sponsors to support our community events.
                  <br />
                  Fill out the form below to become a sponsor.
                </p>
              </div>
            ) : (
              currentSponsors.map((sponsor, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      {sponsor.logo ? (
                        <img
                          src={sponsor.logo}
                          alt={sponsor.name}
                          className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center text-white text-2xl font-bold border-4 border-primary/20">
                          {getInitials(sponsor.name)}
                        </div>
                      )}
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg text-foreground">
                          {sponsor.name}
                        </h3>
                        <p className="text-sm font-medium text-primary bg-primary/10 inline-block px-3 py-1 rounded-full">
                          {sponsor.type}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {sponsor.contribution}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Since {sponsor.year}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>

        {/* Sponsorship Tiers Section */}
        <section className="mb-16 animate-slide-up">
          <div className="text-center mb-12">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold inline-block mb-4">
              <Star className="inline w-4 h-4 mr-2" />
              Sponsorship Opportunities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Become a Sponsor
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Support our community and gain recognition for your contribution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sponsorshipTiers.map((tier, index) => {
              const IconComponent = tier.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-2 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className={`${tier.bgColor} text-center`}>
                    <IconComponent className={`w-12 h-12 ${tier.color} mx-auto mb-2`} />
                    <CardTitle className="text-xl">{tier.name}</CardTitle>
                    <p className={`text-2xl font-bold ${tier.color}`}>
                      {tier.amount}
                    </p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Sponsorship Request Form */}
        <section className="mb-16 animate-slide-up">
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-warm">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-primary mb-2">
                  Sponsorship Request Form
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you soon
                </p>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        placeholder="Your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organization">Organization/Company *</Label>
                      <Input
                        id="organization"
                        value={formData.organization}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            organization: e.target.value,
                          })
                        }
                        required
                        placeholder="Company name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="sponsorshipType">Sponsorship Tier *</Label>
                      <Select
                        value={formData.sponsorshipType}
                        onValueChange={(value) =>
                          setFormData({ ...formData, sponsorshipType: value })
                        }
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select tier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="platinum">Platinum Sponsor</SelectItem>
                          <SelectItem value="gold">Gold Sponsor</SelectItem>
                          <SelectItem value="silver">Silver Sponsor</SelectItem>
                          <SelectItem value="community">
                            Community Supporter
                          </SelectItem>
                          <SelectItem value="custom">Custom Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">Contribution Amount (₹)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={formData.amount}
                        onChange={(e) =>
                          setFormData({ ...formData, amount: e.target.value })
                        }
                        placeholder="10000"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us more about your interest in sponsoring our events..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-saffron hover:opacity-90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Sponsorship Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-8 animate-fade-in">
          <Card className="bg-card/50">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold text-foreground">
                  Have Questions?
                </h3>
                <p className="text-muted-foreground">
                  Contact us directly for more information about sponsorship opportunities
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                  <a
                    href="tel:+919972433292"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Phone className="w-4 h-4" />
                    +91 9972433292
                  </a>
                  <span className="hidden md:inline text-muted-foreground">•</span>
                  <a
                    href="mailto:santoshhiretanad292@gmail.com"
                    className="flex items-center gap-2 text-primary hover:underline"
                  >
                    <Mail className="w-4 h-4" />
                    santoshhiretanad292@gmail.com
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Sponsors;
