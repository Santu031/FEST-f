import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GalleryUploadDialog from "@/components/GalleryUploadDialog";
import { useAuth } from "@/contexts/AuthContext";
import { X, Upload, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api, type GalleryPhoto } from "@/lib/api";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import heroGanesh from "@/assets/hero-ganesh.jpg";
import ganesh1 from "@/assets/ganesh-1.jpg";
import ganesh2 from "@/assets/ganesh-2.jpg";
import ganesh3 from "@/assets/ganesh-3.jpg";
import ganesh4 from "@/assets/ganesh-4.jpg";
import eventCultural from "@/assets/event-cultural.jpg";
import eventProcession from "@/assets/event-procession.jpg";
import eventPrayer from "@/assets/event-prayer.jpg";
import communityCelebration from "@/assets/community-celebration.jpg";
import photo1 from "@/assets/20250827_201458.jpg";
import photo2 from "@/assets/20250827_201656.jpg";
import photo3 from "@/assets/20250827_202127.jpg";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [customPhotos, setCustomPhotos] = useState<GalleryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAdmin } = useAuth();

  // Load custom photos from database
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const photos = await api.getGalleryPhotos();
        setCustomPhotos(photos);
      } catch (error) {
        console.error("Error loading gallery photos:", error);
        toast.error("Failed to load gallery photos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  const galleryImages = [
    { src: heroGanesh, alt: "Lord Ganesha idol", category: "idol" },
    { src: ganesh1, alt: "Beautiful Ganesha idol 1", category: "idol" },
    { src: ganesh2, alt: "Decorated Ganesha idol 2", category: "idol" },
    { src: ganesh3, alt: "Majestic Ganesha idol 3", category: "idol" },
    { src: ganesh4, alt: "Divine Ganesha idol 4", category: "idol" },
    { src: gallery1, alt: "Festival celebration", category: "celebration" },
    { src: gallery2, alt: "Cultural performance", category: "cultural" },
    { src: gallery3, alt: "Community gathering", category: "celebration" },
    { src: gallery4, alt: "Prayer ceremony", category: "prayer" },
    { src: eventCultural, alt: "Cultural event", category: "cultural" },
    { src: eventProcession, alt: "Grand procession", category: "procession" },
    { src: eventPrayer, alt: "Evening prayer", category: "prayer" },
    { src: communityCelebration, alt: "Community celebration", category: "celebration" },
    { src: photo1, alt: "Festival moments 2025", category: "celebration" },
    { src: photo2, alt: "Evening prayers 2025", category: "prayer" },
    { src: photo3, alt: "Community gathering 2025", category: "celebration" },
    ...customPhotos, // Include custom uploaded photos
  ];

  const handlePhotoUpload = async (photo: {
    src: string;
    alt: string;
    category: string;
  }) => {
    try {
      const newPhoto = await api.uploadGalleryPhoto(photo);
      setCustomPhotos([...customPhotos, newPhoto]);
      toast.success("Photo uploaded successfully");
    } catch (error) {
      console.error("Error uploading photo:", error);
      toast.error("Failed to upload photo");
    }
  };

  const handleDeletePhoto = async (id: string) => {
    try {
      await api.deleteGalleryPhoto(id);
      const updatedPhotos = customPhotos.filter((photo) => photo._id !== id);
      setCustomPhotos(updatedPhotos);
      toast.success("Photo deleted successfully");
    } catch (error) {
      console.error("Error deleting photo:", error);
      toast.error("Failed to delete photo");
    }
  };

  // Check if an image is a custom uploaded photo
  const isCustomPhoto = (imageSrc: string) => {
    return customPhotos.some((photo) => photo.src === imageSrc);
  };

  // Get custom photo by src
  const getCustomPhotoBySrc = (imageSrc: string) => {
    return customPhotos.find((photo) => photo.src === imageSrc);
  };

  const categories = [
    { id: "all", label: "All Photos" },
    { id: "idol", label: "Ganesha Idols" },
    { id: "celebration", label: "Celebrations" },
    { id: "cultural", label: "Cultural Events" },
    { id: "prayer", label: "Prayers" },
    { id: "procession", label: "Processions" },
  ];

  const filteredImages =
    selectedCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 animate-fade-in">
            Festival Gallery
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
            Relive the beautiful moments from our Ganesh Festival celebrations
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category.id
                    ? "bg-gradient-gold text-foreground shadow-gold"
                    : "bg-card text-muted-foreground hover:text-foreground hover:bg-card/80"
                }`}
              >
                {category.label}
              </button>
            ))}
            
            {/* Admin Upload Button */}
            {isAdmin && (
              <Button
                onClick={() => setUploadDialogOpen(true)}
                className="bg-gradient-saffron hover:opacity-90 ml-4"
                size="sm"
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload Photo
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-2xl overflow-hidden bg-muted animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => {
                const customPhoto = getCustomPhotoBySrc(image.src);
                const isCustom = !!customPhoto;
                
                return (
                  <div
                    key={index}
                    className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer animate-fade-in shadow-warm hover:shadow-gold transition-all"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => setSelectedImage(image.src)}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Photo Description Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white font-medium">{image.alt}</p>
                    </div>
                    
                    {/* Admin Delete Button - Only for custom uploaded photos */}
                    {isAdmin && isCustom && customPhoto?._id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm("Are you sure you want to delete this photo?")) {
                            handleDeletePhoto(customPhoto._id!);
                          }
                        }}
                        className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110 z-10"
                        aria-label="Delete photo"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-primary transition-colors"
            onClick={() => setSelectedImage(null)}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery image"
            className="max-w-full max-h-full object-contain animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Upload Dialog */}
      <GalleryUploadDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        onUpload={handlePhotoUpload}
      />

      <Footer />
    </div>
  );
};

export default Gallery;