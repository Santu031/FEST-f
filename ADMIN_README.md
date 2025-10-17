# Admin Authentication Guide

## Overview
This application now has admin-only authentication for managing member information.

## Admin Login Credentials
- **URL**: `/admin` or click the "Admin" button in the navbar
- **Password**: `admin123`

## Features

### For Regular Users (Non-Admin):
- View member profiles
- Contact members
- Search and filter members
- Export member list to CSV
- **Cannot**: Add or edit member information

### For Admin Users:
- All regular user features
- **Add new members** via the "Add Member" button
- **Edit member information** via the "Edit" button on member cards and detail modals
- Full access to member management features

## How to Use

### Login as Admin:
1. Click the "Admin" button in the navigation bar
2. Enter the password: `admin123`
3. Click "Login"
4. You will be redirected to the Members page with admin privileges

### Logout:
1. Click the "Logout" button in the navigation bar (visible only when logged in)
2. Your admin session will be cleared

## Security Notes

⚠️ **IMPORTANT FOR PRODUCTION**:
- The current password (`admin123`) is hardcoded for development purposes only
- For production, implement proper backend authentication:
  - Use secure password hashing (bcrypt, argon2, etc.)
  - Implement JWT or session-based authentication
  - Store credentials securely in a database
  - Add rate limiting for login attempts
  - Implement password reset functionality
  - Use HTTPS for all communications

## Implementation Details

### Files Modified:
1. **`src/contexts/AuthContext.tsx`** - Authentication context provider
2. **`src/pages/AdminLogin.tsx`** - Admin login page
3. **`src/App.tsx`** - Added AuthProvider and admin route
4. **`src/components/Navbar.tsx`** - Added login/logout buttons
5. **`src/pages/Members.tsx`** - Uses auth context for admin checks
6. **`src/components/MemberCard.tsx`** - Conditionally shows edit button
7. **`src/components/MemberDetailModal.tsx`** - Conditionally shows edit button

### Authentication Flow:
1. User visits `/admin` page
2. Enters password
3. AuthContext validates and stores login state in localStorage
4. Admin status persists across page refreshes
5. Logout clears the admin state

## Customization

To change the admin password, edit the `ADMIN_PASSWORD` constant in:
```typescript
// src/contexts/AuthContext.tsx
const ADMIN_PASSWORD = 'your-new-password';
```

Remember: This is only suitable for development. Use proper backend authentication for production!
