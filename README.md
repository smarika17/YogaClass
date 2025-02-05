# Yoga Class Admission System live: 
https://yogaclassfrontend-4gq8.onrender.com/


## 1. About Project

This full-stack web application manages the admission process for monthly yoga classes, ensuring only individuals between 18-65 years old can enroll and requiring a full-month payment regardless of enrollment date. Users can select from four batches and switch batches each month.

## 2. Database Complete Logic with ER Diagram and Entity Relationship

The database consists of the following entities:

- **Users**: Stores user information (name, age, contact details).
- **Payments**: Records monthly payments and their statuses.
- **Admins**: Manages users and payment records.
An ER diagram is attached to visualize the relationships between these entities.
![WhatsApp Image 2025-02-05 at 16 13 43 (1)](https://github.com/user-attachments/assets/330fe617-cd2d-43b7-9c20-f95aab3f06b5)

## 3. About `CompletePayment()` Function

The `CompletePayment()` function ensures that at the beginning of each month, all registered users' status resets to `false`, requiring renewal of payment to maintain registration.

## 4. How We Have Created Payment Working

```
User Enrolls → Clicks 'PayNow' → Payment Processed ✅ → Appears in Registered Users
                           ↓
                        Payment Pending ❌ → Appears in Unregistered Users
                           ↓
              Start of New Month → Registration Resets → Requires Renewal
```

- Payment gateway is integrated using a mock function (`CompletePayment()`).
- The system resets registration status automatically at the start of each month.
- Hosted on **Render** for seamless deployment.

## 5. Approach to Solve Problem

The project is divided into three sections:

1. **User Portal**: Allows users to enter details and register.
2. **Admin Portal**: Enables monitoring of users without authentication for simplicity.
   - **Registered Users**: Successfully paid users.
   - **Unregistered Users**: Users with pending payments.
3. **Payment Gateway**: Users enter their email ID and pay fees every month to remain registered.

## 6. Assumptions

- Users must be between 18-65 years old.
- Monthly payments are mandatory for continued registration.
- Payments can be processed at any time during the month.
- No admin authentication is implemented.

## 7. Algorithms Used

The project uses CRUD operations, payment status updates, batch management, and filtering algorithms to efficiently manage users and payments.

## 8. Hosted Links
- **Frontend:** https://yogaclassfrontend-4gq8.onrender.com
- **Backend API:** https://yogaclassbackend-uv9r.onrender.com


## Steps to Setup the Project Locally

### Prerequisites
Ensure you have the following installed:
- Node.js and npm
- MongoDB (Local or MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/smarika17/YogaClass.git
cd userRegistration
```

### 2. Install Dependencies
Navigate to the `user-registration` folder and run the following commands in both `client` and `server`:
```bash
cd client && npm install
cd ../server && npm install
```

### 3. Setup Environment Variables
Create a `.env` file in both `client` and `server`:

#### Client `.env` File:
```
VITE_API_BASE_URL=http://localhost:3000
```

#### Server `.env` File:
```
MONGO_URI=<your-mongodb-connection-string>
PORT=3000
```

### 4. Run the Project
Start both frontend and backend servers:

#### Start Backend Server:
```bash
cd server
npm start
```

#### Start Frontend Server:
```bash
cd client
npm run dev
```

### 5. Access the Application
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`
  
