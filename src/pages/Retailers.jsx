import { retailers, produceRecords } from "../data/dummyData";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { Store, QrCode, Package } from "lucide-react";

export default function Retailers() {
  const [showQR, setShowQR] = useState(null);

  const retailPackets = [
    { id: "RTL-QR-001", originalSack: "SCK-QR-20260401-001", crop: "Basmati Rice", packSize: "5 kg", retailPrice: 65, retailer: "Fresh Mart Bhubaneswar", farmerName: "Rajesh Kumar" },
    { id: "RTL-QR-002", originalSack: "SCK-QR-20260401-001", crop: "Basmati Rice", packSize: "1 kg", retailPrice: 68, retailer: "Fresh Mart Bhubaneswar", farmerName: "Rajesh Kumar" },
    { id: "RTL-QR-003", originalSack: "SCK-QR-20260405-003", crop: "Sona Masoori Rice", packSize: "5 kg", retailPrice: 58, retailer: "Organic Corner Cuttack", farmerName: "Suresh Patel" },
    { id: "RTL-QR-004", originalSack: "SCK-QR-20260403-002", crop: "Fresh Turmeric", packSize: "500 g", retailPrice: 140, retailer: "Kisan Bazaar Puri", farmerName: "Lakshmi Devi" },
  ];

  return (
    <div>
      <div className="page-header">
        <h2>🛒 Retailer Portal</h2>
        <p>Manage retail packing, generate consumer-facing QR codes linked to original farmer data</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="stat-card animate-in">
          <div className="stat-value">{retailers.length}</div>
          <div className="stat-label">Active Retailers</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-value">{retailPackets.length}</div>
          <div className="stat-label">Retail QR Codes</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-value">100%</div>
          <div className="stat-label">Linked to Farmer Data</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>🏷️ Retail Packets (Second-Level QR)</h3>
          <button className="btn btn-primary" style={{ fontSize: 13 }}>+ Repack & Generate QR</button>
        </div>
        <div className="table-container">
          <table>
            <thead><tr><th>Retail QR</th><th>Original Sack</th><th>Crop</th><th>Pack Size</th><th>₹/kg</th><th>Retailer</th><th>Farmer</th><th>QR</th></tr></thead>
            <tbody>
              {retailPackets.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: "monospace", color: "var(--purple-primary)", fontWeight: 600, fontSize: 12 }}>{p.id}</td>
                  <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--green-primary)" }}>{p.originalSack}</td>
                  <td>{p.crop}</td>
                  <td><span className="badge blue">{p.packSize}</span></td>
                  <td style={{ fontWeight: 600 }}>₹{p.retailPrice}</td>
                  <td>{p.retailer}</td>
                  <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>{p.farmerName}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: "4px 8px", fontSize: 11 }} onClick={() => setShowQR(p)}>
                      <QrCode size={14} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showQR && (
        <div className="modal-overlay" onClick={() => setShowQR(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ textAlign: "center" }}>
            <h3>Retail-Level QR Code</h3>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", marginBottom: 16 }}>This QR links the retail packet to the original farmer's sack on blockchain</p>
            <div className="qr-display" style={{ margin: "0 auto 20px" }}>
              <QRCodeSVG value={JSON.stringify({ type: "RETAIL_QR", id: showQR.id, sack: showQR.originalSack, farmer: showQR.farmerName, crop: showQR.crop, pack: showQR.packSize })} size={200} level="H" />
              <div className="qr-label">{showQR.id}</div>
            </div>
            <div style={{ background: "var(--bg-secondary)", borderRadius: 8, padding: 12, textAlign: "left", fontSize: 13 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "var(--text-muted)" }}>Linked Sack:</span>
                <span style={{ fontFamily: "monospace", color: "var(--green-primary)" }}>{showQR.originalSack}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: "var(--text-muted)" }}>Farmer:</span>
                <span style={{ fontWeight: 600 }}>{showQR.farmerName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-muted)" }}>Blockchain:</span>
                <span className="badge green" style={{ fontSize: 11 }}>✓ Verified</span>
              </div>
            </div>
            <button className="btn btn-primary" onClick={() => setShowQR(null)} style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
