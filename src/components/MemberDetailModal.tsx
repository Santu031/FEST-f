import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Calendar, Briefcase, X, Edit } from "lucide-react";

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

interface MemberDetailModalProps {
  member: Member | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  showContact?: boolean;
  isAdmin?: boolean;
}

const MemberDetailModal = ({
  member,
  open,
  onClose,
  onEdit,
  showContact = true,
  isAdmin = true,
}: MemberDetailModalProps) => {
  if (!member) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary">
            Member Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Photo and Basic Info */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="flex-shrink-0">
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-40 h-40 rounded-full object-cover border-4 border-primary/20"
                />
              ) : (
                <div className="w-40 h-40 rounded-full bg-gradient-saffron flex items-center justify-center text-white text-5xl font-bold border-4 border-primary/20">
                  {getInitials(member.name)}
                </div>
              )}
            </div>

            <div className="flex-1 text-center md:text-left space-y-3">
              <h2 className="text-3xl font-bold text-foreground">
                {member.name}
              </h2>
              <p className="text-lg font-medium text-primary bg-primary/10 inline-block px-4 py-2 rounded-full">
                {member.role}
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                {member.email && showContact && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary" />
                    <a
                      href={`mailto:${member.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {member.email}
                    </a>
                  </div>
                )}
                {member.phone && showContact && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary" />
                    <a
                      href={`tel:${member.phone}`}
                      className="hover:text-primary transition-colors"
                    >
                      {member.phone}
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>Joined {member.joinYear}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              About
            </h3>
            <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
          </div>

          {/* Responsibilities */}
          {member.responsibilities && member.responsibilities.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Key Responsibilities
              </h3>
              <ul className="space-y-2">
                {member.responsibilities.map((resp, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-muted-foreground"
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            <X className="w-4 h-4 mr-2" />
            Close
          </Button>
          {isAdmin && (
            <Button onClick={onEdit} className="bg-gradient-saffron hover:opacity-90">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default MemberDetailModal;
