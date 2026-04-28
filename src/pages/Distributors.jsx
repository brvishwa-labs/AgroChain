import { distributors, produceRecords } from "../data/dummyData";
import { Truck, MapPin, Package } from "lucide-react";

export default function Distributors() {
  const inTransit = produceRecords.filter(p => p.status === "With Distributor");

  return (
    <div>
      <div className="page-header">
        <h2>🚛 Distributor Portal</h2>
        <p>Track produce movement from FPO to retailers</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="stat-card animate-in">
          <div className="stat-value">{distributors.length}</div>
          <div className="stat-label">Active Distributors</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-value">{inTransit.length}</div>
          <div className="stat-label">Shipments In Transit</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-value">{distributors.reduce((a, d) => a + d.totalVolume, 0).toLocaleString()} kg</div>
          <div className="stat-label">Total Volume Handled</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3>Distributor Directory</h3></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {distributors.map(d => (
            <div key={d.id} style={{
              background: "var(--bg-secondary)", borderRadius: 12, padding: 20,
              border: "1px solid var(--border-color)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div className="stat-icon blue" style={{ margin: 0 }}><Truck size={20} /></div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16 }}>{d.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{d.id}</div>
                </div>
              </div>
              <div className="detail-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                <div className="detail-item"><label>Location</label><span>{d.location}</span></div>
                <div className="detail-item"><label>Phone</label><span>{d.phone}</span></div>
                <div className="detail-item"><label>Batches</label><span>{d.produceHandled}</span></div>
                <div className="detail-item"><label>Volume</label><span>{d.totalVolume.toLocaleString()} kg</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-header"><h3>📦 Produce In Transit</h3></div>
        <div className="table-container">
          <table>
            <thead><tr><th>ID</th><th>Farmer</th><th>Crop</th><th>Qty</th><th>From</th><th>Status</th><th>Block Hash</th></tr></thead>
            <tbody>
              {inTransit.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: "monospace", color: "var(--green-primary)", fontWeight: 600 }}>{p.id}</td>
                  <td style={{ fontWeight: 500, color: "var(--text-primary)" }}>{p.farmerName}</td>
                  <td>{p.crop}</td>
                  <td>{p.quantity} {p.unit}</td>
                  <td>{p.fpoName}</td>
                  <td><span className="badge blue">{p.status}</span></td>
                  <td style={{ fontFamily: "monospace", fontSize: 12 }}>{p.blockHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
