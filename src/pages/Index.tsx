import { useState, useEffect } from "react";
import { Search, Filter, UserPlus, Download, Facebook, Instagram, Youtube, Loader2 } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import MemberCard from "@/components/MemberCard";
import MemberDetailModal from "@/components/MemberDetailModal";
import MemberFormDialog from "@/components/MemberFormDialog";
import MemberCardSkeleton from "@/components/MemberCardSkeleton";

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

const initialMembers: Member[] = [
  {
    id: "1",
    name: "Rajesh Kumar",
    role: "Coordinator",
    bio: "Leading the festival organization for over 10 years with dedication and devotion to Lord Ganesha.",
    joinYear: 2014,
    email: "rajesh@balagha.org",
    phone: "+91 98765 43210",
    responsibilities: [
      "Overall festival coordination and planning",
      "Managing volunteer teams",
      "Liaison with local authorities and sponsors",
      "Budget oversight and resource allocation",
    ],
  },
  {
    id: "2",
    name: "Priya Sharma",
    role: "Cultural Organizer",
    bio: "Passionate about preserving traditional arts and organizing cultural programs for the community.",
    joinYear: 2016,
    email: "priya@balagha.org",
    phone: "+91 98765 43211",
    responsibilities: [
      "Planning cultural events and performances",
      "Coordinating with artists and performers",
      "Managing stage setup and decorations",
      "Organizing traditional rituals and ceremonies",
    ],
  },
  {
    id: "3",
    name: "Amit Patel",
    role: "Sound Lead",
    bio: "Expert in audio systems and ensuring perfect sound quality for all devotional programs.",
    joinYear: 2018,
    email: "amit@balagha.org",
    phone: "+91 98765 43212",
    responsibilities: [
      "Sound system setup and maintenance",
      "Managing audio for all events",
      "Coordinating with technical vendors",
      "Ensuring quality of devotional music playback",
    ],
  },
  {
    id: "4",
    name: "Sneha Desai",
    role: "Volunteer",
    bio: "Dedicated volunteer helping with daily operations and community engagement activities.",
    joinYear: 2020,
    email: "sneha@balagha.org",
    phone: "+91 98765 43213",
    responsibilities: [
      "Assisting in daily festival operations",
      "Managing volunteer schedules",
      "Helping with crowd management",
      "Supporting decoration and setup teams",
    ],
  },
  {
    id: "5",
    name: "Vikram Singh",
    role: "Logistics Manager",
    bio: "Ensuring smooth operations by managing supplies, vendors, and logistical arrangements.",
    joinYear: 2017,
    email: "vikram@balagha.org",
    phone: "+91 98765 43214",
    responsibilities: [
      "Managing supplies and inventory",
      "Coordinating with vendors and suppliers",
      "Transportation and delivery logistics",
      "Ensuring timely availability of resources",
    ],
  },
];

const ITEMS_PER_PAGE = 9;

const Index = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 300);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [yearFilter, setYearFilter] = useState<string>("all");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isAdmin] = useState(true); // Toggle this to show/hide admin features
  const [maskPhone, setMaskPhone] = useState(true);

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMembers(initialMembers);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const roles = Array.from(new Set(members.map((m) => m.role)));
  const years = Array.from(new Set(members.map((m) => m.joinYear))).sort(
    (a, b) => b - a
  );

  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      member.role.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      member.bio.toLowerCase().includes(debouncedSearch.toLowerCase());
    const matchesRole = roleFilter === "all" || member.role === roleFilter;
    const matchesYear =
      yearFilter === "all" || member.joinYear.toString() === yearFilter;
    return matchesSearch && matchesRole && matchesYear;
  });

  const visibleMembers = filteredMembers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMembers.length;

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setDetailModalOpen(true);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setDetailModalOpen(false);
    setFormModalOpen(true);
  };

  const handleAddMember = () => {
    setEditingMember(null);
    setFormModalOpen(true);
  };

  const handleSaveMember = (memberData: Partial<Member>) => {
    if (editingMember) {
      // Edit existing member
      setMembers(
        members.map((m) =>
          m.id === editingMember.id ? { ...m, ...memberData } : m
        )
      );
      toast.success("Member updated successfully!");
    } else {
      // Add new member
      const newMember: Member = {
        id: Date.now().toString(),
        ...memberData,
      } as Member;
      setMembers([...members, newMember]);
      toast.success("Member added successfully!");
    }
    setFormModalOpen(false);
  };

  const handleContact = (member: Member) => {
    if (member.email) {
      window.location.href = `mailto:${member.email}`;
    } else {
      toast.error("No email available for this member");
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ["Name", "Role", "Email", "Phone", "Join Year", "Bio"],
      ...members.map((m) => [
        m.name,
        m.role,
        m.email || "",
        m.phone || "",
        m.joinYear,
        m.bio,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "members.csv";
    a.click();
    toast.success("CSV exported successfully!");
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setRoleFilter("all");
    setYearFilter("all");
    setVisibleCount(ITEMS_PER_PAGE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const maskPhoneNumber = (phone: string) => {
    if (!maskPhone || !phone) return phone;
    // Show only last 4 digits: +91 98765 43210 -> +91 ******* 3210
    const digits = phone.replace(/\D/g, "");
    if (digits.length > 4) {
      return phone.slice(0, -4).replace(/\d/g, "*") + phone.slice(-4);
    }
    return phone;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <header className="bg-gradient-saffron text-white py-16 px-4 shadow-warm">
        <div className="container mx-auto text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold">Our Members</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Meet the dedicated volunteers and coordinators behind our Ganesh
            Festival
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Stats */}
        {!isLoading && (
          <div className="mb-6 text-center text-sm text-muted-foreground animate-fade-in">
            Showing {visibleMembers.length} of {filteredMembers.length} members
            {filteredMembers.length !== members.length && ` (filtered from ${members.length} total)`}
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-card rounded-xl shadow-gold p-6 mb-8 animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search by name or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={yearFilter} onValueChange={setYearFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetFilters}
              className="hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
            {isAdmin && (
              <Button
                size="sm"
                onClick={handleAddMember}
                className="bg-gradient-saffron hover:opacity-90"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Member
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              className="hover:bg-secondary hover:text-secondary-foreground transition-colors"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Members Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <MemberCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="text-center py-16 animate-fade-in">
            <p className="text-xl text-muted-foreground">
              No members found matching your filters
            </p>
            <Button
              variant="outline"
              onClick={handleResetFilters}
              className="mt-4"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
              {visibleMembers.map((member, index) => (
                <div
                  key={member.id}
                  style={{
                    animationDelay: `${index * 0.05}s`,
                  }}
                  className="animate-fade-in"
                >
                  <MemberCard
                    member={member}
                    onView={() => handleViewMember(member)}
                    onEdit={() => handleEditMember(member)}
                    onContact={() => handleContact(member)}
                  />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-8 animate-fade-in">
                <Button
                  onClick={handleLoadMore}
                  variant="outline"
                  size="lg"
                  className="hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Load More Members
                  <Loader2 className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center space-y-4">
          <div className="flex justify-center gap-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Youtube className="w-6 h-6" />
            </a>
          </div>
          <p className="text-muted-foreground">
            © 2025 Baghat Sing Geleyar Balaga. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <MemberDetailModal
        member={selectedMember}
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        onEdit={() => {
          if (selectedMember) {
            handleEditMember(selectedMember);
          }
        }}
        showContact={!maskPhone}
        isAdmin={isAdmin}
      />

      <MemberFormDialog
        member={editingMember}
        open={formModalOpen}
        onClose={() => setFormModalOpen(false)}
        onSave={handleSaveMember}
      />
    </div>
  );
};

export default Index;
