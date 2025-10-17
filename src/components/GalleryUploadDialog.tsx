import { useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface GalleryUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: (photo: {
    src: string;
    alt: string;
    category: string;
  }) => void;
}

const GalleryUploadDialog = ({
  open,
  onClose,
  onUpload,
}: GalleryUploadDialogProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [category, setCategory] = useState<string>("celebration");
  const [altText, setAltText] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const categories = [
    { id: "idol", label: "Ganesha Idols" },
    { id: "celebration", label: "Celebrations" },
    { id: "cultural", label: "Cultural Events" },
    { id: "prayer", label: "Prayers" },
    { id: "procession", label: "Processions" },
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image size should be less than 10MB");
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Auto-generate alt text from filename
    if (!altText) {
      const name = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setAltText(name);
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !preview) {
      toast.error("Please select an image");
      return;
    }

    if (!altText.trim()) {
      toast.error("Please provide a description");
      return;
    }

    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      onUpload({
        src: preview, // Base64 image data
        alt: altText,
        category: category,
      });

      toast.success("Photo uploaded successfully!");
      handleClose();
      setIsUploading(false);
    }, 500);
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreview("");
    setAltText("");
    setCategory("celebration");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Photo to Gallery</DialogTitle>
          <DialogDescription>
            Add a new photo to your festival gallery
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* File Upload Area */}
          <div className="space-y-2">
            <Label>Select Image</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                preview
                  ? "border-primary bg-primary/5"
                  : "border-muted-foreground/25 hover:border-primary hover:bg-accent"
              }`}
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              {preview ? (
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-h-64 rounded-lg shadow-lg"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setPreview("");
                      }}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedFile?.name}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Photo Description */}
          <div className="space-y-2">
            <Label htmlFor="alt-text" className="text-base font-semibold">
              📝 Photo Description *
            </Label>
            <Input
              id="alt-text"
              placeholder="e.g., Beautiful Ganesha idol at evening prayer"
              value={altText}
              onChange={(e) => setAltText(e.target.value)}
              className="h-11"
            />
            <p className="text-sm text-muted-foreground">
              Provide a meaningful description for this photo
            </p>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-base font-semibold">
              🏷️ Gallery Section (Category) *
            </Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="Select which section to display this photo" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Choose where this photo will appear in the gallery
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || !altText.trim() || isUploading}
              className="bg-gradient-saffron hover:opacity-90"
            >
              {isUploading ? (
                <>
                  <ImageIcon className="w-4 h-4 mr-2 animate-pulse" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Photo
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryUploadDialog;
