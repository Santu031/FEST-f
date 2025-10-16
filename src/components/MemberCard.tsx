import { User, Mail, Phone, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface MemberCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    bio: string;
    joinYear: number;
    photo?: string;
    email?: string;
    phone?: string;
  };
  onView: () => void;
  onEdit: () => void;
  onContact: () => void;
}

const MemberCard = ({ member, onView, onEdit, onContact }: MemberCardProps) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className="group hover:shadow-warm transition-all duration-300 hover:-translate-y-1 overflow-hidden border-border/50">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar/Photo */}
          <div className="relative">
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-colors"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-saffron flex items-center justify-center text-white text-2xl font-bold border-4 border-primary/20 group-hover:border-primary/40 transition-colors">
                {getInitials(member.name)}
              </div>
            )}
            <div className="absolute -bottom-2 -right-2 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-gold">
              {member.joinYear}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-2 w-full">
            <h3 className="font-bold text-xl text-foreground">{member.name}</h3>
            <p className="text-sm font-medium text-primary bg-primary/10 inline-block px-3 py-1 rounded-full">
              {member.role}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
              {member.bio}
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors"
          onClick={onView}
          aria-label={`View ${member.name}'s profile`}
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 hover:bg-secondary hover:text-secondary-foreground transition-colors"
          onClick={onEdit}
          aria-label={`Edit ${member.name}'s profile`}
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onContact}
          className="hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label={`Contact ${member.name}`}
        >
          <Mail className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MemberCard;
