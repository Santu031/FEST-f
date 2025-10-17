# Sponsors Page Documentation

## Overview
A dedicated Sponsors page has been added to showcase current sponsors and allow potential sponsors to submit sponsorship requests for hosting events.

## Features

### 1. **Current Sponsors Display**
- Shows all current sponsors with their details
- Displays sponsor logos (or initials if no logo)
- Shows sponsorship tier (Platinum, Gold, Silver, etc.)
- Lists their contributions
- Shows the year they joined as sponsors

### 2. **Sponsorship Tiers**
Four sponsorship levels with clear benefits:

#### Platinum Sponsor (₹1,00,000+)
- Logo on main banner and all promotional materials
- Special mention in all events
- VIP seating for events
- Social media recognition
- Certificate of appreciation

#### Gold Sponsor (₹50,000 - ₹99,999)
- Logo on promotional materials
- Mention in event announcements
- Priority seating
- Social media recognition
- Certificate of appreciation

#### Silver Sponsor (₹25,000 - ₹49,999)
- Name in promotional materials
- Recognition during events
- Certificate of appreciation
- Social media mention

#### Community Supporter (₹10,000 - ₹24,999)
- Name in event program
- Certificate of appreciation
- Social media mention

### 3. **Sponsorship Request Form**
Allows potential sponsors to submit requests with:
- Full name (required)
- Organization/Company name (required)
- Email address (required)
- Phone number (required)
- Sponsorship tier selection (required)
- Contribution amount (optional)
- Message/Additional information (optional)

### 4. **Contact Information**
Direct contact details for sponsorship inquiries:
- Phone: +91 9972433292
- Email: santoshhiretanad292@gmail.com

## Page Location

**URL**: `/sponsors`

**Navigation**: Added to the main navbar between "Gallery" and "Contact"

## File Structure

### New File:
- **`src/pages/Sponsors.tsx`** - Main sponsors page component

### Updated Files:
- **`src/App.tsx`** - Added sponsors route
- **`src/components/Navbar.tsx`** - Added sponsors navigation link

## How to Use

### For Visitors (View Sponsors):
1. Navigate to "Sponsors" in the navbar
2. View current sponsors and their contributions
3. See available sponsorship tiers and benefits

### For Potential Sponsors (Submit Request):
1. Go to the Sponsors page
2. Review sponsorship tiers
3. Fill out the sponsorship request form:
   - Enter your details
   - Select sponsorship tier
   - Add contribution amount (optional)
   - Write a message (optional)
4. Click "Submit Sponsorship Request"
5. Receive confirmation toast message
6. Wait for the organization to contact you

## Customization

### Adding/Editing Current Sponsors

Edit the `currentSponsors` array in `/src/pages/Sponsors.tsx`:

```typescript
const currentSponsors = [
  {
    name: "Company Name",
    type: "Platinum Sponsor", // or Gold, Silver, etc.
    logo: "", // URL to logo image or leave empty for initials
    contribution: "Brief description of contribution",
    year: 2024,
  },
  // Add more sponsors...
];
```

### Modifying Sponsorship Tiers

Edit the `sponsorshipTiers` array in `/src/pages/Sponsors.tsx`:

```typescript
{
  name: "Tier Name",
  amount: "₹Amount Range",
  icon: Star, // or Heart
  color: "text-color-class",
  bgColor: "bg-color-class",
  benefits: [
    "Benefit 1",
    "Benefit 2",
    // Add more benefits...
  ],
}
```

### Updating Contact Information

The contact details currently use the user's contact information from memory:
- Phone: +91 9972433292
- Email: santoshhiretanad292@gmail.com

To change these, edit the contact section in `Sponsors.tsx`.

## Form Handling

### Current Implementation:
- Form data is logged to console
- Success toast notification shown
- Form resets after submission
- **No backend integration** (frontend only)

### For Production:
You should implement backend integration:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/sponsorship-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    if (response.ok) {
      toast.success("Request submitted successfully!");
      // Send email notification
      // Save to database
      // etc.
    }
  } catch (error) {
    toast.error("Failed to submit request. Please try again.");
  }
};
```

## Design Features

### Visual Elements:
- ✅ Gradient header with handshake icon
- ✅ Sponsor cards with hover effects
- ✅ Color-coded sponsorship tiers
- ✅ Animated card entrances
- ✅ Responsive grid layouts
- ✅ Beautiful form with validation

### User Experience:
- ✅ Clear tier differentiation with colors
- ✅ Easy-to-use form
- ✅ Toast notifications for feedback
- ✅ Mobile-responsive design
- ✅ Accessible form controls

## Integration with Other Pages

The Sponsors page:
- Uses the same **Navbar** and **Footer** components
- Follows the same **design system** and color scheme
- Maintains **consistent animations** and transitions
- Matches the **overall aesthetic** of the application

## Future Enhancements

Consider adding:
1. **Admin Panel**: Manage sponsors from admin dashboard
2. **Sponsor Dashboard**: Login for sponsors to view their profile
3. **Payment Integration**: Online payment for sponsorships
4. **Photo Gallery**: Sponsor logos/photos from past events
5. **Sponsor Stories**: Testimonials from current sponsors
6. **Analytics**: Track sponsorship requests and conversions
7. **Email Notifications**: Automatic emails on form submission
8. **Database Storage**: Store sponsors in database instead of hardcoded

## Testing

### Manual Testing Steps:
1. **Navigate** to /sponsors page
2. **View** current sponsors section
3. **Check** sponsorship tiers display correctly
4. **Fill** out the form with valid data
5. **Submit** and verify toast notification
6. **Verify** form resets after submission
7. **Test** on mobile devices for responsiveness

### Edge Cases to Test:
- Empty form submission (should show validation errors)
- Invalid email format
- Invalid phone number format
- Very long messages in textarea
- Sponsor cards with and without logos

## Accessibility

The page includes:
- ✅ Proper semantic HTML
- ✅ Form labels for all inputs
- ✅ Required field indicators
- ✅ Keyboard navigation support
- ✅ Screen reader friendly structure
- ✅ Color contrast compliance

## Summary

The Sponsors page provides a complete solution for:
- **Showcasing** current sponsors and their contributions
- **Attracting** new sponsors with clear tier benefits
- **Collecting** sponsorship requests through an easy form
- **Communicating** sponsorship opportunities effectively

Perfect for community organizations looking to grow their sponsor base and recognize their supporters!
