import { useState, useEffect } from "react";
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
import { Save, X } from "lucide-react";

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

  useEffect(() => {
    if (member) {
      setFormData(member);
      setResponsibilitiesText(member.responsibilities?.join("\n") || "");
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
    }
  }, [member, open]);

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

            <div className="space-y-2">
              <Label htmlFor="photo">Photo URL</Label>
              <Input
                id="photo"
                type="url"
                value={formData.photo}
                onChange={(e) =>
                  setFormData({ ...formData, photo: e.target.value })
                }
                placeholder="https://example.com/photo.jpg"
              />
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
