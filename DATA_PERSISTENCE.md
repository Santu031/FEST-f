# Data Persistence Guide

## Overview
Member data is now persisted using browser's localStorage. Any changes made to members through the website will be saved and persist across page refreshes.

## How It Works

### Automatic Saving
- **Add Member**: When you add a new member, it's automatically saved to localStorage
- **Edit Member**: When you edit a member's information, changes are saved immediately
- **Persistent**: Data remains even after closing the browser or refreshing the page

### Data Storage
- Data is stored in the browser's localStorage under the key: `membersData`
- Each browser stores its own copy of the data
- Data is stored as JSON format

## Admin Features

### 1. Add New Members
- Click "Add Member" button (admin only)
- Fill in member details
- Save - the new member is added and persisted

### 2. Edit Existing Members
- Click "Edit" button on any member card or detail modal (admin only)
- Modify the information
- Save - changes are persisted immediately

### 3. Reset Data to Default
- Click "Reset Data" button (admin only)
- Confirm the action
- All member data will be reset to the initial default members
- **Warning**: This action cannot be undone!

## Data Structure

Each member contains:
```typescript
{
  id: string;           // Unique identifier
  name: string;         // Full name
  role: string;         // Role/Position
  bio: string;          // Biography
  joinYear: number;     // Year joined
  photo?: string;       // Photo URL (optional)
  email?: string;       // Email address (optional)
  phone?: string;       // Phone number (optional)
  responsibilities?: string[];  // List of responsibilities (optional)
}
```

## Initial Default Members

The application comes with 5 default members:
1. **Rajesh Kumar** - Coordinator (with photo)
2. **Priya Sharma** - Cultural Organizer
3. **Amit Patel** - Sound Lead
4. **Sneha Desai** - Volunteer
5. **Vikram Singh** - Logistics Manager

## Important Notes

### Browser-Specific Storage
- Data is stored per browser/device
- Different browsers will have different data
- Clearing browser data will remove all saved members

### For Production Use
Consider implementing a backend solution for:
- **Database storage** (MongoDB, PostgreSQL, etc.)
- **API endpoints** for CRUD operations
- **User authentication** and authorization
- **Data backup** and recovery
- **Multi-user synchronization**
- **Data validation** on server-side

### Current Limitations
- Data is not synchronized across devices
- No server-side backup
- Limited to browser's localStorage capacity (~5-10MB)
- Clearing browser cache will delete data

## Testing the Feature

### Test Editing:
1. Login as admin (password: `admin123`)
2. Click "Edit" on any member
3. Change the name or other details
4. Save the changes
5. Refresh the page
6. ✅ Your changes should persist

### Test Adding:
1. Login as admin
2. Click "Add Member"
3. Fill in details
4. Save
5. Refresh the page
6. ✅ New member should still be there

### Test Reset:
1. Login as admin
2. Make some changes to members
3. Click "Reset Data"
4. Confirm
5. ✅ All data reverts to original default members

## Troubleshooting

### Data Not Persisting?
1. Check browser's localStorage is enabled
2. Check browser console for errors
3. Verify you're not in incognito/private mode
4. Try clearing localStorage and refreshing

### Reset Data Not Working?
1. Make sure you're logged in as admin
2. Confirm the action in the dialog
3. Check browser console for errors

### Clear All Data Manually
Open browser console and run:
```javascript
localStorage.removeItem('membersData');
location.reload();
```

This will clear all member data and reload with defaults.
