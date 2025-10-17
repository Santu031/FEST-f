import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
import { Save, X, Upload, Trash2 } from "lucide-react";

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  joinYear: number;
  photo?: string;
  email?: string;
  phone?: string;
  responsibilities?: string[];
}

interface MemberFormDialogProps {
  member?: Member | null;
  open: boolean;
  onClose: () => void;
  onSave: (member: Partial<Member>) => void;
}

const roles = [
  "Coordinator",
  "Volunteer",
  "Sound Lead",
  "Cultural Organizer",
  "Logistics Manager",
  "Treasurer",
  "Secretary",
  "Technical Support",
  "Decoration Team",
  "Food Committee",
  "Editor",
  "Photographer",
];

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

const MemberFormDialog = ({
  member,
  open,
  onClose,
  onSave,
}: MemberFormDialogProps) => {
  const [formData, setFormData] = useState<Partial<Member>>({
    name: "",
    role: "",
    bio: "",
    joinYear: currentYear,
    email: "",
    phone: "",
    photo: "",
    responsibilities: [],
  });

  const [responsibilitiesText, setResponsibilitiesText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (member) {
      setFormData(member);
      setResponsibilitiesText(member.responsibilities?.join("\n") || "");
      setImagePreview(member.photo || null);
    } else {
      setFormData({
        name: "",
        role: "",
        bio: "",
        joinYear: currentYear,
        email: "",
        phone: "",
        photo: "",
        responsibilities: [],
      });
      setResponsibilitiesText("");
      setImagePreview(null);
    }
  }, [member, open]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file is an image
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        setFormData({ ...formData, photo: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setFormData({ ...formData, photo: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const responsibilities = responsibilitiesText
      .split("\n")
      .filter((line) => line.trim() !== "");
    onSave({ ...formData, responsibilities });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            {member ? "Edit Member" : "Add New Member"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Select
                value={formData.role}
                onValueChange={(value) =>
                  setFormData({ ...formData, role: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="email@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="joinYear">Join Year *</Label>
              <Select
                value={formData.joinYear?.toString()}
                onValueChange={(value) =>
                  setFormData({ ...formData, joinYear: parseInt(value) })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="photo">Profile Photo</Label>
              <div className="flex flex-col gap-3">
                {imagePreview && (
                  <div className="relative w-40 h-40 mx-auto">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-40 h-40 rounded-full object-cover border-4 border-primary/20"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 rounded-full w-8 h-8 p-0"
                      onClick={handleRemoveImage}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                <div className="flex gap-2">
                  <input
                    ref={fileInputRef}
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {imagePreview ? 'Change Photo' : 'Upload Photo'}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio *</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              required
              placeholder="Brief description about the member..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="responsibilities">
              Key Responsibilities (one per line)
            </Label>
            <Textarea
              id="responsibilities"
              value={responsibilitiesText}
              onChange={(e) => setResponsibilitiesText(e.target.value)}
              placeholder="Managing stage setup&#10;Coordinating with vendors&#10;Sound system operations"
              rows={4}
            />
          </div>

          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={onClose}>
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-saffron hover:opacity-90">
              <Save className="w-4 h-4 mr-2" />
              Save Member
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MemberFormDialog;
