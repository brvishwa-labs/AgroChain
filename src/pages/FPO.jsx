import { produceRecords, farmers } from "../data/dummyData";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { Package, QrCode, CheckCircle } from "lucide-react";

export default function FPO() {
  const [showQR, setShowQR] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); }, 2000);
  };

  return (
    <div>
      <div className="page-header">
        <h2>🏪 FPO / Mandi Portal</h2>
        <p>Register farmer produce, generate sack-level QR codes, and log on blockchain</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="stat-card animate-in">
          <div className="stat-icon green"><Package size={22} /></div>
          <div className="stat-value">{produceRecords.length}</div>
          <div className="stat-label">Produce Batches Logged</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-icon blue"><QrCode size={22} /></div>
          <div className="stat-value">{produceRecords.length}</div>
          <div className="stat-label">Sack QR Codes Generated</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-icon yellow"><CheckCircle size={22} /></div>
          <div className="stat-value">100%</div>
          <div className="stat-label">Blockchain Verified</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>📦 Produce Records</h3>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Register New Produce</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sack QR</th><th>Farmer</th><th>Crop</th><th>Qty</th><th>Quality</th><th>Price/kg</th><th>Total</th><th>FPO</th><th>QR</th>
              </tr>
            </thead>
            <tbody>
              {produceRecords.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--green-primary)", fontWeight: 600 }}>{p.sackQR}</td>
                  <td style={{ fontWeight: 500, color: "var(--text-primary)" }}>{p.farmerName}</td>
                  <td>{p.crop}</td>
                  <td>{p.quantity} {p.unit}</td>
                  <td><span className="badge green">{p.quality}</span></td>
                  <td>₹{p.pricePerKg}</td>
                  <td style={{ fontWeight: 600, color: "var(--text-primary)" }}>₹{p.totalPrice.toLocaleString()}</td>
                  <td style={{ fontSize: 13 }}>{p.fpoName}</td>
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
            <h3>Sack-Level QR Code</h3>
            <div className="qr-display" style={{ margin: "0 auto 20px" }}>
              <QRCodeSVG
                value={JSON.stringify({
                  type: "SACK_QR",
                  id: showQR.sackQR,
                  farmer: showQR.farmerName,
                  crop: showQR.crop,
                  qty: showQR.quantity + showQR.unit,
                  quality: showQR.quality,
                  price: showQR.pricePerKg,
                  fpo: showQR.fpoName,
                  date: showQR.dateSubmitted,
                  blockHash: showQR.blockHash,
                })}
                size={200}
                level="H"
              />
              <div className="qr-label">{showQR.sackQR}</div>
            </div>
            <div className="detail-grid" style={{ textAlign: "left" }}>
              <div className="detail-item"><label>Farmer</label><span>{showQR.farmerName}</span></div>
              <div className="detail-item"><label>Crop</label><span>{showQR.crop}</span></div>
              <div className="detail-item"><label>Quantity</label><span>{showQR.quantity} {showQR.unit}</span></div>
              <div className="detail-item"><label>Block Hash</label><span style={{ fontSize: 12, fontFamily: "monospace" }}>{showQR.blockHash}</span></div>
            </div>
            <button className="btn btn-primary" onClick={() => setShowQR(null)} style={{ marginTop: 20, width: "100%", justifyContent: "center" }}>Close</button>
          </div>
        </div>
      )}

      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: 40 }}>
                <CheckCircle size={48} color="var(--green-primary)" />
                <h3 style={{ marginTop: 16 }}>Produce Registered!</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>QR generated & data stored on blockchain</p>
              </div>
            ) : (
              <>
                <h3>Register New Produce</h3>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {[
                    { label: "Farmer", type: "select", options: farmers.map(f => f.name) },
                    { label: "Crop Type", type: "text", placeholder: "e.g. Basmati Rice" },
                    { label: "Quantity (kg)", type: "number", placeholder: "500" },
                    { label: "Quality Grade", type: "select", options: ["Grade A+", "Grade A", "Grade B+", "Grade B"] },
                    { label: "Price per kg (₹)", type: "number", placeholder: "42" },
                  ].map(field => (
                    <div key={field.label}>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", display: "block", marginBottom: 4 }}>{field.label}</label>
                      {field.type === "select" ? (
                        <select style={{
                          width: "100%", padding: "10px 12px", borderRadius: 8,
                          background: "var(--bg-secondary)", border: "1px solid var(--border-color)",
                          color: "var(--text-primary)", fontSize: 14, fontFamily: "inherit"
                        }}>
                          {field.options.map(o => <option key={o}>{o}</option>)}
                        </select>
                      ) : (
                        <input type={field.type} placeholder={field.placeholder} style={{
                          width: "100%", padding: "10px 12px", borderRadius: 8,
                          background: "var(--bg-secondary)", border: "1px solid var(--border-color)",
                          color: "var(--text-primary)", fontSize: 14, fontFamily: "inherit"
                        }} />
                      )}
                    </div>
                  ))}
                  <button type="submit" className="btn btn-primary" style={{ marginTop: 8, justifyContent: "center" }}>
                    Generate QR & Store on Blockchain
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
