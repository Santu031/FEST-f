import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calendar,
  Users,
  Heart,
  ArrowRight,
  Sparkles,
  Music,
  Camera,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-ganesh.jpg";
import communityImage from "@/assets/community-celebration.jpg";
import eventCultural from "@/assets/event-cultural.jpg";
import eventProcession from "@/assets/event-procession.jpg";
import eventPrayer from "@/assets/event-prayer.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const Home = () => {
  const upcomingEvents = [
    {
      title: "Ganesh Chaturthi Celebration",
      date: "September 7, 2025",
      image: eventPrayer,
      description: "Grand installation ceremony and opening prayer",
    },
    {
      title: "Cultural Night",
      date: "September 12, 2025",
      image: eventCultural,
      description: "Traditional music, dance, and community performances",
    },
    {
      title: "Grand Procession",
      date: "September 17, 2025",
      image: eventProcession,
      description: "Community procession and immersion ceremony",
    },
  ];

  const coreMembers = [
    {
      name: "Rajesh Kumar",
      role: "Coordinator",
      image: "",
    },
    {
      name: "Priya Sharma",
      role: "Cultural Organizer",
      image: "",
    },
    {
      name: "Amit Patel",
      role: "Sound Lead",
      image: "",
    },
  ];

  const galleryImages = [gallery1, gallery2, gallery3, gallery4];

  const testimonials = [
    {
      quote:
        "Being part of this community has brought immense joy and purpose to my life. The devotion and teamwork during the festival is truly inspiring.",
      author: "Sneha Desai",
      role: "Volunteer",
    },
    {
      quote:
        "The way our Balaga brings people together in celebration and service is remarkable. Every year, we create memories that last a lifetime.",
      author: "Vikram Singh",
      role: "Logistics Manager",
    },
  ];

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

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Welcome to
            <br />
            <span className="bg-gradient-gold bg-clip-text text-transparent">
              Baghat Sing Geleyar Balaga
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
            Uniting devotion, culture, and community spirit every Ganesh
            Festival
          </p>
          <Button
            size="lg"
            className="bg-gradient-saffron hover:opacity-90 text-white font-semibold px-8 py-6 text-lg shadow-warm"
            asChild
          >
            <Link to="/events">
              View Upcoming Events
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-up">
              <div className="inline-block">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  About Our Community
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Tradition, Devotion & Unity
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Baghat Sing Geleyar Balaga has been at the heart of our
                community's Ganesh Festival celebrations for decades. We bring
                together devotees, volunteers, and families to honor Lord
                Ganesha with grand festivities, cultural programs, and
                community service.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our mission is to preserve traditional values while fostering
                unity and joy through devotional celebrations. Every year, we
                organize elaborate ceremonies, cultural events, and community
                gatherings that bring people together in the spirit of love and
                devotion.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                asChild
              >
                <Link to="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="relative animate-scale-in">
              <img
                src={communityImage}
                alt="Community celebration"
                className="rounded-2xl shadow-warm w-full"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-gradient-gold rounded-2xl -z-10 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Events Preview Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold inline-block mb-4">
              <Calendar className="inline w-4 h-4 mr-2" />
              What's Coming Up
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join us in our upcoming celebrations and cultural programs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <Card
                key={index}
                className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-2 overflow-hidden border-border/50 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-gold">
                    {event.date}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {event.description}
                  </p>
                  <Button
                    variant="link"
                    className="text-primary p-0 h-auto font-semibold"
                    asChild
                  >
                    <Link to="/events">
                      Know More
                      <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Members Highlight Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold inline-block mb-4">
              <Users className="inline w-4 h-4 mr-2" />
              Meet Our Team
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Core Members
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dedicated volunteers who make our festivals memorable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {coreMembers.map((member, index) => (
              <Card
                key={index}
                className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-2 text-center animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gradient-saffron flex items-center justify-center text-white text-3xl font-bold border-4 border-primary/20 group-hover:border-primary/40 transition-colors">
                        {getInitials(member.name)}
                      </div>
                    )}
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center animate-fade-in">
            <Button
              size="lg"
              className="bg-gradient-saffron hover:opacity-90 text-white font-semibold shadow-warm"
              asChild
            >
              <Link to="/members">
                View All Members
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold inline-block mb-4">
              <Camera className="inline w-4 h-4 mr-2" />
              Memories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Festival Moments
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Glimpses from our past celebrations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-xl cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={image}
                  alt={`Festival moment ${index + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 animate-fade-in">
            <Button
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link to="/gallery">
                View Full Gallery
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold inline-block mb-4">
              <Heart className="inline w-4 h-4 mr-2" />
              Community Voices
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What Our Members Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-warm transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="mb-6">
                    <Music className="w-10 h-10 text-primary/30" />
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="border-t border-border pt-4">
                    <p className="font-bold text-foreground">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-primary">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
