# 🩸 BloodLink – Blood Donation Management System

## 📌 Project Purpose
BloodLink is a full-stack blood donation management platform designed to connect donors, volunteers, and admins efficiently. The system allows users to create, manage, and respond to blood donation requests with secure authentication, role-based dashboards, and a responsive UI.

---

## 🌐 Live URL
Frontend:  
https://bloodlink-2d9d9.web.app

## 🚀 Key Features

### 🔐 Authentication & Authorization
- Firebase Authentication (Email & Password)
- JWT-based route protection (Firebase ID Token)
- Role-based access control (Admin, Donor, Volunteer)
- Default role: **Donor**
- Admin can change user roles and block/unblock users

---

### 👤 User Roles
- **Admin 🌐**
  - Manage all users (make admin/volunteer, block/unblock)
  - View all donation requests
  - Dashboard statistics (users, funding, requests)

- **Donor 🩸**
  - Create blood donation requests
  - View, edit, delete own requests
  - Update profile information
  - View request status (pending, inprogress, done, canceled)

- **Volunteer 🤝**
  - View all donation requests
  - Update donation status only
  - Restricted from delete/edit other actions

---

### 📊 Dashboards (Private 🔒)
- Fully responsive sidebar-based dashboard
- Separate dashboards for Admin, Donor, Volunteer
- Profile page with editable form (email non-editable)
- Pagination & filtering where required

---

### 🏠 Public Pages
- Home page with banner, featured sections, contact & footer
- Search donors by blood group, district, upazila
- View all pending donation requests
- Donation request details page (login required)

---

### 💰 Funding (Challenge Feature)
- Funding page with Stripe payment integration
- View all funding records
- Total funding shown on Admin & Volunteer dashboards

---

### 🧰 Tech Stack & NPM Packages

#### Frontend
- React
- React Router
- Tailwind CSS
- TanStack React Query
- React Hook Form
- Lucide React Icons
- Firebase Authentication
- Axios

#### Backend
- Node.js
- Express.js
- MongoDB
- Firebase Admin SDK (JWT verification)

#### Others
- ImageBB (avatar upload)
- Stripe (payment integration)

---

## ✅ Security
- Firebase ID Token (JWT) verification on private APIs
- Protected routes for dashboard & donation actions
- Blocked users restricted from creating donation requests

---

## 📱 Responsiveness
- Fully responsive for mobile, tablet, and desktop
- Consistent color theme and UI across all dashboards
- Sidebar-based dashboard layout

---

## 📄 Notes
- Email verification & password reset intentionally skipped (as per assignment instruction)
- Social login not implemented
- Pagination added where required

---

## 👨‍💻 Author
Developed as part of a MERN stack assignment with custom UI and role-based system.
