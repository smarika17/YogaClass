import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Admin() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await axios.get(import.meta.env.VITE_API_BASE_URL + "/api/admin/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users", error);
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
    // const interval = setInterval(fetchUsers, 3000);
    // return () => clearInterval(interval);
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/users/delete/${userId}`);
      toast.success("User deleted successfully!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user!");
    }
  };

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paidUsers = filteredUsers.filter((user) => user.paymentInfo?.isPaid);
  const unpaidUsers = filteredUsers.filter((user) => !user.paymentInfo?.isPaid);

  return (
    <>
      <h2 style={styles.title}>📋 Admin Dashboard</h2>
      <input
        type="text"
        placeholder="🔍 Search users by name or email..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.searchInput}
      />
      <div style={styles.container}>
        <h3 style={styles.sectionTitle}>✅ Registered Users</h3>
        <div style={styles.grid}>
          {paidUsers.length === 0 ? (
            <p style={styles.noUsers}>No paid users found.</p>
          ) : (
            paidUsers.map((user) => (
              <UserCard key={user._id} user={user} handleDeleteUser={handleDeleteUser} />
            ))
          )}
        </div>

        <h3 style={styles.sectionTitle}>❌ Unregistered Users (Unpaid)</h3>
        <div style={styles.grid}>
          {unpaidUsers.length === 0 ? (
            <p style={styles.noUsers}>No unpaid users found.</p>
          ) : (
            unpaidUsers.map((user) => (
              <UserCard key={user._id} user={user} handleDeleteUser={handleDeleteUser} />
            ))
          )}
        </div>
      </div>
    </>
  );
}

function UserCard({ user, handleDeleteUser }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Not Available";

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.name}>👤 {user.fullName}</h3>
      <p style={styles.info}><strong>📧 Email:</strong> {user.email}</p>
      <p style={styles.info}><strong>📞 Phone:</strong> {user.phone}</p>
      <p style={styles.info}><strong>⚥ Gender:</strong> {user.gender}</p>
      <p style={styles.info}><strong>📅 Batch:</strong> {user.batch}</p>
      <p style={styles.info}><strong>🕒 Enrollment Date:</strong> {formatDate(user.createdAt)}</p>
      <p style={styles.info}><strong>🎂 Date of Birth:</strong> {formatDate(user.dob)}</p>
      <p style={styles.info}><strong>🗓 Age:</strong> {user.age} years</p>

      <h4 style={styles.sectionTitle}>📍 Address</h4>
      <p style={styles.info}>{user.address?.street}, {user.address?.city}, {user.address?.state} - {user.address?.postalCode}, {user.address?.country}</p>

      <h4 style={styles.sectionTitle}>💳 Payment Info</h4>
      <p style={styles.info}><strong>Payment Date:</strong> {formatDate(user.paymentInfo?.paymentDate)}</p>
      <p style={styles.info}><strong>Payment Expires:</strong> {formatDate(user.paymentInfo?.paymentExpires)}</p>
      <p style={styles.info}><strong>Payment Status:</strong>
        <span style={user.paymentInfo?.isPaid ? styles.paid : styles.notPaid}>
          <strong> {user.paymentInfo?.isPaid ? " Paid" : " Not Paid"}</strong>
        </span>
      </p>
      <p style={styles.info}><strong>Method:</strong> {user.paymentInfo?.method}</p>
      {user.paymentInfo?.cardNumber && <p style={styles.info}><strong>Card:</strong> **** **** **** {user.paymentInfo.cardNumber.slice(-4)}</p>}
      {user.paymentInfo?.upiId && <p style={styles.info}><strong>UPI ID:</strong> {user.paymentInfo.upiId}</p>}

      <button style={styles.deleteButton} onClick={() => handleDeleteUser(user._id)}>❌ Delete User</button>
    </div>
  );
}

const styles = {
  container: { padding: "20px", backgroundColor: "#121212", minHeight: "100vh", color: "#E0E0E0" },
  title: { textAlign: "center", fontSize: "28px", color: "#FFFFFF" },
  searchInput: {
    display: "block",
    width: "80%",
    maxWidth: "400px",
    margin: "0 auto 20px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  noUsers: { textAlign: "center", fontSize: "18px", color: "#E0E0E0" },
  grid: { display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))" },
  card: { backgroundColor: "#1E1E1E", padding: "20px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(255, 255, 255, 0.1)" },
  name: { fontSize: "22px", color: "#BB86FC" },
  info: { fontSize: "16px", marginBottom: "5px" },
  sectionTitle: { fontSize: "18px", color: "#03DAC6" },
  deleteButton: {
    marginTop: "20px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  },
  paid: { color: "green" },
  notPaid: { color: "red" }
};

export default Admin;