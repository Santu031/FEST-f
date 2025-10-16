import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import eventPrayer from "@/assets/event-prayer.jpg";
import eventCultural from "@/assets/event-cultural.jpg";
import eventProcession from "@/assets/event-procession.jpg";

const Events = () => {
  const upcomingEvents = [
    {
      id: 1,
      title: "Ganesh Chaturthi Celebration 2025",
      date: "September 15, 2025",
      time: "10:00 AM - 8:00 PM",
      location: "Baghat Community Hall",
      image: eventPrayer,
      description:
        "Join us for the grand Ganesh Chaturthi celebration with traditional rituals, prayers, and community feast.",
      attendees: 500,
      status: "upcoming",
    },
    {
      id: 2,
      title: "Cultural Dance & Music Program",
      date: "September 18, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "Main Balaga Ground",
      image: eventCultural,
      description:
        "An evening of devotional songs, traditional dances, and cultural performances by local artists.",
      attendees: 300,
      status: "upcoming",
    },
    {
      id: 3,
      title: "Grand Visarjan Procession",
      date: "September 24, 2025",
      time: "4:00 PM - 7:00 PM",
      location: "Starting from Community Hall",
      image: eventProcession,
      description:
        "The grand finale procession with dhol-tasha, dancing, and immersion ceremony of Lord Ganesha.",
      attendees: 1000,
      status: "upcoming",
    },
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Ganesh Chaturthi 2024",
      date: "September 19, 2024",
      attendees: 800,
      highlights: "Record attendance, 10-day celebration, cultural programs",
    },
    {
      id: 5,
      title: "Ganesh Chaturthi 2023",
      date: "September 18, 2023",
      attendees: 650,
      highlights: "First eco-friendly idol, tree plantation drive",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            Festival Events
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Celebrate tradition and culture through our vibrant festival events
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className="bg-card rounded-2xl overflow-hidden shadow-warm hover:shadow-gold transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-4 py-2 bg-gradient-gold text-foreground text-sm font-semibold rounded-full shadow-gold">
                      Upcoming
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      {event.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      Expected: {event.attendees}+ attendees
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-saffron hover:opacity-90 text-white font-semibold shadow-gold">
                    Register for Event
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Past Celebrations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event, index) => (
              <div
                key={event.id}
                className="bg-card p-6 rounded-2xl shadow-warm animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{event.date}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    {event.attendees} attendees
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Highlights:
                    </span>{" "}
                    {event.highlights}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
