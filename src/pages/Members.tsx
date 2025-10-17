import { useState, useEffect } from "react";
import { Search, Filter, UserPlus, Download, Loader2, RotateCcw } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useAuth } from "@/contexts/AuthContext";
import { api, type Member } from "@/lib/api";
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
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ITEMS_PER_PAGE = 9;

const Members = () => {
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
  const { isAdmin } = useAuth();
  const [maskPhone] = useState(true);

  // Load members from API
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setIsLoading(true);
        const data = await api.getMembers();
        // Normalize IDs (MongoDB uses _id, we use id in frontend)
        const normalizedData = data.map(m => ({
          ...m,
          id: m._id || m.id || '',
        }));
        setMembers(normalizedData);
      } catch (error) {
        console.error('Error fetching members:', error);
        toast.error('Failed to load members. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMembers();
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

  const handleSaveMember = async (memberData: Partial<Member>) => {
    try {
      if (editingMember) {
        const updated = await api.updateMember(editingMember.id, memberData);
        const normalizedUpdated = { ...updated, id: updated._id || updated.id || '' };
        setMembers(members.map((m) => (m.id === normalizedUpdated.id ? normalizedUpdated : m)));
        toast.success("Member updated successfully!");
      } else {
        const newMember = await api.createMember(memberData);
        const normalizedNew = { ...newMember, id: newMember._id || newMember.id || '' };
        setMembers([...members, normalizedNew]);
        toast.success("Member added successfully!");
      }
      setFormModalOpen(false);
    } catch (error) {
      console.error('Error saving member:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save member');
    }
  };

  const handleDeleteMember = async (memberId: string) => {
    try {
      await api.deleteMember(memberId);
      setMembers(members.filter((m) => m.id !== memberId));
      toast.success("Member deleted successfully!");
    } catch (error) {
      console.error('Error deleting member:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete member');
    }
  };

  const handleResetData = async () => {
    if (confirm('Are you sure you want to reset all member data to default? This cannot be undone.')) {
      try {
        await api.resetMembers();
        const data = await api.getMembers();
        const normalizedData = data.map(m => ({
          ...m,
          id: m._id || m.id || '',
        }));
        setMembers(normalizedData);
        toast.success("Member data reset to default!");
      } catch (error) {
        console.error('Error resetting members:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to reset members');
      }
    }
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
      ...filteredMembers.map((m) => [
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Header */}
      <header className="bg-gradient-saffron text-white py-16 px-4 shadow-warm mt-20">
        <div className="container mx-auto text-center space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold">Our Members</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Meet the dedicated volunteers and coordinators behind our Ganesh
            Festival
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {!isLoading && (
          <div className="mb-6 text-center text-sm text-muted-foreground animate-fade-in">
            Showing {visibleMembers.length} of {filteredMembers.length} members
            {filteredMembers.length !== members.length &&
              ` (filtered from ${members.length} total)`}
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
              <>
                <Button
                  size="sm"
                  onClick={handleAddMember}
                  className="bg-gradient-saffron hover:opacity-90"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Member
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetData}
                  className="hover:bg-destructive hover:text-destructive-foreground transition-colors border-destructive text-destructive"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Data
                </Button>
              </>
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
                    isAdmin={isAdmin}
                  />
                </div>
              ))}
            </div>

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

      <Footer />
    </div>
  );
};

export default Members;
