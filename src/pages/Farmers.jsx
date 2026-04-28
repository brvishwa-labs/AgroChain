import { farmers as initialFarmers, produceRecords } from "../data/dummyData";
import { MapPin, ArrowUpRight, CheckCircle, UserPlus } from "lucide-react";
import { useState } from "react";

const villages = [
  { village: "Balasore", district: "Balasore" },
  { village: "Puri", district: "Puri" },
  { village: "Cuttack", district: "Cuttack" },
  { village: "Bhubaneswar", district: "Khordha" },
  { village: "Sambalpur", district: "Sambalpur" },
  { village: "Berhampur", district: "Ganjam" },
  { village: "Rourkela", district: "Sundargarh" },
  { village: "Jharsuguda", district: "Jharsuguda" },
];

const cropOptions = ["Rice", "Wheat", "Turmeric", "Sugarcane", "Tomato", "Onion", "Potato", "Mustard", "Vegetables", "Maize"];

export default function Farmers() {
  const [farmers, setFarmers] = useState(initialFarmers);
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", village: villages[0].village, aadhar: "", crops: [],
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleCrop = (crop) => {
    setForm(prev => ({
      ...prev,
      crops: prev.crops.includes(crop)
        ? prev.crops.filter(c => c !== crop)
        : [...prev.crops, crop],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loc = villages.find(v => v.village === form.village) || villages[0];
    const newFarmer = {
      id: `FMR-${String(farmers.length + 1).padStart(3, "0")}`,
      name: form.name || "New Farmer",
      phone: form.phone || "+91 00000 00000",
      village: loc.village,
      district: loc.district,
      state: "Odisha",
      aadhar: form.aadhar ? `XXXX-XXXX-${form.aadhar.slice(-4)}` : "XXXX-XXXX-0000",
      crops: form.crops.length > 0 ? form.crops : ["Rice"],
      registeredDate: new Date().toISOString().split("T")[0],
      totalProduce: 0,
      avatar: Math.random() > 0.5 ? "🧑‍🌾" : "👩‍🌾",
    };
    setSubmitted(true);
    setTimeout(() => {
      setFarmers(prev => [newFarmer, ...prev]);
      setSubmitted(false);
      setShowForm(false);
      setForm({ name: "", phone: "", village: villages[0].village, aadhar: "", crops: [] });
    }, 1800);
  };

  const inputStyle = {
    width: "100%", padding: "10px 12px", borderRadius: 8,
    background: "var(--bg-secondary)", border: "1px solid var(--border-color)",
    color: "var(--text-primary)", fontSize: 14, fontFamily: "inherit",
    outline: "none", transition: "border-color 0.2s",
  };

  return (
    <div>
      <div className="page-header">
        <h2>🧑‍🌾 Registered Farmers</h2>
        <p>All farmers enrolled in the AgroChain traceability network</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="stat-card animate-in">
          <div className="stat-value">{farmers.length}</div>
          <div className="stat-label">Active Farmers</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-value">{farmers.reduce((a, f) => a + f.totalProduce, 0).toLocaleString()} kg</div>
          <div className="stat-label">Total Produce Logged</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-value">{[...new Set(farmers.flatMap(f => f.crops))].length}</div>
          <div className="stat-label">Crop Varieties</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Farmer Directory</h3>
          <button className="btn btn-primary" style={{ fontSize: 13 }} onClick={() => setShowForm(true)}>
            <UserPlus size={16} /> Register Farmer
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Farmer</th><th>Location</th><th>Crops</th><th>Total Produce</th><th>Registered</th><th>Action</th>
              </tr>
            </thead>
            <tbody>
              {farmers.map(f => (
                <tr key={f.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 24 }}>{f.avatar}</span>
                      <div>
                        <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{f.name}</div>
                        <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{f.id} • {f.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td><MapPin size={13} style={{ display: "inline", marginRight: 4 }} />{f.village}, {f.district}</td>
                  <td>{f.crops.map(c => <span key={c} className="badge green" style={{ marginRight: 4, marginBottom: 2 }}>{c}</span>)}</td>
                  <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>{f.totalProduce.toLocaleString()} kg</td>
                  <td>{f.registeredDate}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ fontSize: 12, padding: "5px 10px" }} onClick={() => setSelected(f)}>
                      View <ArrowUpRight size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Farmer Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <span style={{ fontSize: 40 }}>{selected.avatar}</span>
              <div>
                <h3 style={{ margin: 0 }}>{selected.name}</h3>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{selected.id}</div>
              </div>
            </div>
            <div className="detail-grid" style={{ gridTemplateColumns: "1fr 1fr", marginBottom: 20 }}>
              <div className="detail-item"><label>Phone</label><span>{selected.phone}</span></div>
              <div className="detail-item"><label>Village</label><span>{selected.village}</span></div>
              <div className="detail-item"><label>District</label><span>{selected.district}</span></div>
              <div className="detail-item"><label>Aadhar</label><span>{selected.aadhar}</span></div>
            </div>
            <h4 style={{ fontSize: 14, marginBottom: 10, color: "var(--text-secondary)" }}>Produce History</h4>
            {produceRecords.filter(p => p.farmerId === selected.id).length === 0 && (
              <div style={{ background: "var(--bg-secondary)", padding: 16, borderRadius: 8, textAlign: "center", color: "var(--text-muted)", fontSize: 13 }}>
                No produce recorded yet
              </div>
            )}
            {produceRecords.filter(p => p.farmerId === selected.id).map(p => (
              <div key={p.id} style={{ background: "var(--bg-secondary)", padding: 12, borderRadius: 8, marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 600 }}>{p.crop} — {p.quantity} {p.unit}</span>
                  <span className="badge green">{p.status}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>₹{p.pricePerKg}/kg • {p.dateSubmitted}</div>
              </div>
            ))}
            <button className="btn btn-secondary" onClick={() => setSelected(null)} style={{ marginTop: 16, width: "100%", justifyContent: "center" }}>Close</button>
          </div>
        </div>
      )}

      {/* Register Farmer Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => { if (!submitted) { setShowForm(false); } }}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: 40 }}>
                <div style={{ animation: "fadeIn 0.3s ease" }}>
                  <CheckCircle size={56} color="var(--green-primary)" />
                  <h3 style={{ marginTop: 16, marginBottom: 8 }}>Farmer Registered!</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                    {form.name || "New Farmer"} has been added to the AgroChain network
                  </p>
                  <p style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 8 }}>
                    Data stored on blockchain • SMS notification sent
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <UserPlus size={20} color="var(--green-primary)" /> Register New Farmer
                </h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 13, marginBottom: 20 }}>
                  Add a farmer to the AgroChain traceability network
                </p>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {/* Name */}
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Full Name *
                    </label>
                    <input
                      type="text" required placeholder="e.g. Ramesh Kumar"
                      value={form.name} onChange={e => handleChange("name", e.target.value)}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--green-primary)"}
                      onBlur={e => e.target.style.borderColor = "var(--border-color)"}
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel" required placeholder="+91 98765 43210"
                      value={form.phone} onChange={e => handleChange("phone", e.target.value)}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--green-primary)"}
                      onBlur={e => e.target.style.borderColor = "var(--border-color)"}
                    />
                  </div>

                  {/* Village */}
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Village / Location *
                    </label>
                    <select
                      value={form.village} onChange={e => handleChange("village", e.target.value)}
                      style={inputStyle}
                    >
                      {villages.map(v => (
                        <option key={v.village} value={v.village}>{v.village}, {v.district}</option>
                      ))}
                    </select>
                  </div>

                  {/* Aadhar */}
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                      Aadhar Number
                    </label>
                    <input
                      type="text" placeholder="XXXX-XXXX-XXXX"
                      value={form.aadhar} onChange={e => handleChange("aadhar", e.target.value)}
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "var(--green-primary)"}
                      onBlur={e => e.target.style.borderColor = "var(--border-color)"}
                    />
                  </div>

                  {/* Crops */}
                  <div>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 8 }}>
                      Crops Grown (select one or more)
                    </label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {cropOptions.map(crop => (
                        <button
                          key={crop} type="button" onClick={() => toggleCrop(crop)}
                          style={{
                            padding: "6px 14px", borderRadius: 20, fontSize: 13, fontWeight: 500,
                            border: form.crops.includes(crop) ? "1px solid var(--green-primary)" : "1px solid var(--border-color)",
                            background: form.crops.includes(crop) ? "var(--green-glow-strong)" : "var(--bg-secondary)",
                            color: form.crops.includes(crop) ? "var(--green-primary)" : "var(--text-secondary)",
                            cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit",
                          }}
                        >
                          {form.crops.includes(crop) ? "✓ " : ""}{crop}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                    <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)} style={{ flex: 1, justifyContent: "center" }}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: "center" }}>
                      <UserPlus size={16} /> Register & Store on Blockchain
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
