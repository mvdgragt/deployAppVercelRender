import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  isMarried: boolean;
  sport: string;
};

type UserForm = Omit<User, "id">;

const emptyForm: UserForm = {
  name: "",
  email: "",
  age: 0,
  isMarried: false,
  sport: "",
};

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState<UserForm>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchUsers() {
    const res = await fetch(`${API}/users`);
    setUsers(await res.json());
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const body = { ...form, age: Number(form.age) };

    try {
      if (editingId !== null) {
        await fetch(`${API}/users/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        setEditingId(null);
      } else {
        await fetch(`${API}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      setForm(emptyForm);
      fetchUsers();
    } catch {
      setError("Request failed.");
    }
  }

  async function handleDelete(id: number) {
    await fetch(`${API}/users/${id}`, { method: "DELETE" });
    fetchUsers();
  }

  function startEdit(user: User) {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, age: user.age, isMarried: user.isMarried, sport: user.sport });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
  }

  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: "0 20px" }}>
      <header style={{ marginBottom: 32 }}>
        <h1>Users</h1>
      </header>

      <section style={{ background: "#fff", borderRadius: 8, padding: 24, marginBottom: 32, boxShadow: "0 1px 3px rgba(0,0,0,.1)" }}>
        <h2>{editingId !== null ? "Edit user" : "Add user"}</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
            style={inputStyle}
          />
          <input
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            required
            style={inputStyle}
          />
          <input
            placeholder="Age"
            type="number"
            value={form.age}
            onChange={e => setForm(f => ({ ...f, age: Number(e.target.value) }))}
            required
            style={inputStyle}
          />
          <input
            placeholder="Sport"
            value={form.sport}
            onChange={e => setForm(f => ({ ...f, sport: e.target.value }))}
            required
            style={inputStyle}
          />
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
            <input
              type="checkbox"
              checked={form.isMarried}
              onChange={e => setForm(f => ({ ...f, isMarried: e.target.checked }))}
            />
            Married
          </label>
          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 8 }}>
            <button type="submit" style={btnStyle("#2563eb")}>
              {editingId !== null ? "Save" : "Add"}
            </button>
            {editingId !== null && (
              <button type="button" onClick={cancelEdit} style={btnStyle("#6b7280")}>
                Cancel
              </button>
            )}
          </div>
          {error && <p style={{ color: "red", gridColumn: "1 / -1", fontSize: 13 }}>{error}</p>}
        </form>
      </section>

      <section style={{ background: "#fff", borderRadius: 8, boxShadow: "0 1px 3px rgba(0,0,0,.1)", overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
              {["ID", "Name", "Email", "Age", "Married", "Sport", ""].map(h => (
                <th key={h} style={{ padding: "10px 16px", textAlign: "left", fontWeight: 600, color: "#374151" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length === 0 && (
              <tr><td colSpan={7} style={{ padding: 24, textAlign: "center", color: "#9ca3af" }}>No users yet.</td></tr>
            )}
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                <td style={tdStyle}>{user.id}</td>
                <td style={tdStyle}>{user.name}</td>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>{user.age}</td>
                <td style={tdStyle}>{user.isMarried ? "Yes" : "No"}</td>
                <td style={tdStyle}>{user.sport}</td>
                <td style={{ ...tdStyle, display: "flex", gap: 8 }}>
                  <button onClick={() => startEdit(user)} style={btnStyle("#059669", true)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)} style={btnStyle("#dc2626", true)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "8px 12px",
  border: "1px solid #d1d5db",
  borderRadius: 6,
  fontSize: 14,
  width: "100%",
};

const tdStyle: React.CSSProperties = { padding: "10px 16px", color: "#374151" };

function btnStyle(bg: string, small = false): React.CSSProperties {
  return {
    background: bg,
    color: "#fff",
    border: "none",
    borderRadius: 6,
    padding: small ? "5px 10px" : "8px 20px",
    fontSize: small ? 13 : 14,
    cursor: "pointer",
  };
}
