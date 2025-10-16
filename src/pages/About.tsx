import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Users, Calendar, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Devotion",
      description: "Celebrating Lord Ganesha with pure devotion and traditional rituals",
    },
    {
      icon: Users,
      title: "Community",
      description: "Bringing together families and neighbors in the spirit of unity",
    },
    {
      icon: Calendar,
      title: "Tradition",
      description: "Preserving and passing down cultural heritage to future generations",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "Organizing memorable events with dedication and attention to detail",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            About Our Balaga
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            A legacy of devotion, culture, and community spirit
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-lg mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Baghat Sing Geleyar Balaga was founded with a vision to celebrate the
              auspicious Ganesh Festival in a grand and meaningful way. What started
              as a small community gathering has grown into one of the most cherished
              annual celebrations in Baghat, Solan.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every year, our dedicated team of volunteers and coordinators work
              tirelessly to organize a festival that honors tradition while embracing
              the spirit of community. From the installation of the sacred idol to
              the vibrant processions and cultural programs, each event is crafted
              with devotion and care.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our Balaga is more than just an organization—it's a family united by
              faith, culture, and the joy of celebration. We welcome everyone to join
              us in this beautiful journey of devotion and togetherness.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-card shadow-warm hover:shadow-gold transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-saffron rounded-full flex items-center justify-center shadow-gold">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto bg-gradient-saffron rounded-2xl p-8 shadow-gold">
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-white/90 mb-6">
              Be part of our growing family and experience the joy of celebrating
              together
            </p>
            <a
              href="/members"
              className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors shadow-warm"
            >
              Become a Member
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
