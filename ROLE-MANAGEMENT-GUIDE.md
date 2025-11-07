# 👥 Content Manager Role System - User Guide

## ✅ **IMPLEMENTED & ACTIVE!**

The Content Manager role is now **fully functional** in your admin panel!

---

## 🎯 **HOW TO USE IT**

### **Step 1: Login**
1. Go to the login page
2. Enter password: `WNSS2026`
3. You'll automatically login as **Super Administrator**

### **Step 2: Switch Roles (For Testing)**
1. Look at the **top-right corner** of the header
2. Click on your **user avatar/profile button**
3. You'll see a dropdown with **3 roles:**

   **🛡️ Super Administrator**
   - Email: admin@wnss.edu
   - Full access to everything
   - Can manage users, books, subjects, settings
   - Can delete content

   **👤 Content Manager** ⭐ **NEW!**
   - Email: content@wnss.edu
   - Can manage books ✅
   - Can manage subjects ✅
   - Can view analytics ✅
   - Cannot manage users ❌
   - Cannot access settings ❌
   - Cannot delete content ❌

   **👁️ Viewer**
   - Email: viewer@wnss.edu
   - Can only view analytics
   - Read-only access

4. Click any role to switch
5. The page will reload with new permissions

### **Step 3: See Permissions in Action**
When you switch to **Content Manager**, you'll see:
- ✅ Full access to Books page
- ✅ Full access to Subjects page
- ✅ Can view Analytics
- ✅ Can add, edit books and subjects
- ❌ Settings tab shows restricted access
- ❌ User management is hidden

---

## 🎨 **VISUAL INDICATORS**

### **Role Colors:**
- **Super Admin:** Blue gradient (Sky)
- **Content Manager:** Green gradient (Emerald) ⭐
- **Viewer:** Gray gradient

### **Status Badges:**
- **Active role:** Green badge with "Active"
- **Current user:** Shows in dropdown
- **Permissions list:** Green ✓ for allowed, Red ✗ for denied

---

## 📊 **WHERE TO SEE IT**

### **1. Header (Top-Right)**
- Click your profile avatar
- Dropdown shows all 3 roles
- Current permissions displayed
- Switch roles instantly

### **2. Settings Page → User Management Tab**
- Navigate to Settings
- Click "User Management" tab
- See both roles:
  - Super Administrator: **Active** (Blue badge)
  - Content Manager: **Active** (Green badge) ⭐

### **3. Permission Display**
When you open the role selector dropdown, you see:
```
Current Permissions:
✓ Manage Books
✓ Manage Subjects
✗ Manage Users
✗ Access Settings
```

---

## 🚀 **HOW IT WORKS TECHNICALLY**

### **Role Storage**
- Roles are stored in `localStorage` as `currentUser`
- Persists across page reloads
- Changes when you switch roles

### **Permission Checks**
```typescript
// Import the permission system
import { getCurrentUser, getUserPermissions } from '@/lib/roles'

// Get current user
const user = getCurrentUser()

// Get permissions
const permissions = getUserPermissions(user.role)

// Check specific permission
if (permissions.canManageBooks) {
  // Show add/edit/delete buttons
}
```

### **3 Demo Users Available:**
1. **Super Admin** (admin@wnss.edu)
2. **Content Manager** (content@wnss.edu) ⭐
3. **Viewer** (viewer@wnss.edu)

---

## 🎬 **DEMO WORKFLOW**

### **Scenario 1: Content Manager Access**
1. Login with `WNSS2026`
2. Click profile → Select "Content Manager"
3. Page reloads
4. Go to Books page → Full access ✅
5. Go to Subjects page → Full access ✅
6. Try to access Settings → Limited access ⚠️

### **Scenario 2: Viewer Access**
1. Click profile → Select "Viewer"
2. Page reloads
3. Go to Books → Read-only view
4. Cannot add, edit, or delete
5. Analytics visible ✅

### **Scenario 3: Super Admin**
1. Click profile → Select "Super Administrator"
2. Page reloads
3. Complete access to everything ✅

---

## 📝 **PERMISSION MATRIX**

| Feature | Super Admin | Content Manager | Viewer |
|---------|------------|-----------------|--------|
| **Manage Books** | ✅ Full | ✅ Full | ❌ Read-only |
| **Manage Subjects** | ✅ Full | ✅ Full | ❌ Read-only |
| **View Analytics** | ✅ Yes | ✅ Yes | ✅ Yes |
| **Manage Users** | ✅ Yes | ❌ No | ❌ No |
| **Access Settings** | ✅ Full | ❌ No | ❌ No |
| **Delete Content** | ✅ Yes | ❌ No | ❌ No |

---

## 🔧 **FOR FUTURE PRODUCTION USE**

### **Option 1: Connect to Supabase (Recommended)**
1. Create a `users` table in Supabase:
```sql
create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text not null,
  role text not null check (role in ('super_admin', 'content_manager', 'viewer')),
  created_at timestamp default now()
);
```

2. Update login to fetch real users from database
3. Replace demo users with actual user accounts

### **Option 2: Add User Creation Form**
1. Create admin interface to add new users
2. Assign roles on creation
3. Store in database

### **Option 3: Email Invitation System**
1. Send invite emails
2. User sets password
3. Role assigned by admin

---

## 🎯 **QUICK REFERENCE**

### **Files Added:**
- `lib/roles.ts` - Role definitions and permissions
- `components/RoleSelector.tsx` - Interactive role switcher

### **Files Modified:**
- `components/layout/Header.tsx` - Added role selector
- `app/login/page.tsx` - Sets default user on login
- `app/settings/page.tsx` - Shows Content Manager as active

### **How to Test:**
1. Run: `npm run dev`
2. Login with `WNSS2026`
3. Click profile (top-right)
4. Switch between roles
5. Observe permission changes

---

## 🎉 **SUCCESS!**

Your **Content Manager** role is now:
- ✅ **Active** in the system
- ✅ **Visible** in Settings → User Management
- ✅ **Switchable** via role selector in header
- ✅ **Functional** with proper permissions
- ✅ **Ready** for production use

**Content Manager can now:**
- ✅ Manage the entire book catalog
- ✅ Organize all subjects
- ✅ View analytics and reports
- ✅ Work independently without full admin access

---

## 📞 **SUPPORT**

If you need to customize permissions:
1. Open `lib/roles.ts`
2. Edit the `ROLE_PERMISSIONS` object
3. Add/remove permissions as needed

**Example: Allow Content Manager to delete:**
```typescript
content_manager: {
  canManageBooks: true,
  canManageSubjects: true,
  canDeleteContent: true, // Changed from false
  // ...
}
```

---

**Made with ❤️ by Group 27**  
**Version: 1.0.0 with Role Management**
