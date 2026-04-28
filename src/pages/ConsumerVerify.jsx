import { consumerVerification } from "../data/dummyData";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
import { ScanLine, ShieldCheck, User, MapPin, Award, ArrowRight } from "lucide-react";

export default function ConsumerVerify() {
  const [scanned, setScanned] = useState(false);
  const v = consumerVerification;

  return (
    <div>
      <div className="page-header">
        <h2>📱 Consumer Verification</h2>
        <p>Scan any retail QR code to verify produce origin, farmer details, and fair pricing</p>
      </div>

      {!scanned ? (
        <div className="verify-container">
          <div className="card" style={{ textAlign: "center", padding: 48 }}>
            <ScanLine size={64} color="var(--green-primary)" style={{ marginBottom: 20 }} />
            <h3 style={{ marginBottom: 8 }}>Scan Retail QR Code</h3>
            <p style={{ color: "var(--text-secondary)", marginBottom: 24, fontSize: 14 }}>
              Point your camera at any AgroChain QR code on a retail product
            </p>
            <div style={{ background: "var(--bg-secondary)", borderRadius: 12, padding: 32, marginBottom: 24, border: "2px dashed var(--border-color)" }}>
              <div style={{ width: 180, height: 180, margin: "0 auto", border: "3px solid var(--green-primary)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(34,197,94,0.05)" }}>
                <ScanLine size={48} color="var(--green-primary)" style={{ opacity: 0.5 }} />
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: 12, marginTop: 12 }}>Camera preview area</p>
            </div>
            <button className="btn btn-primary" onClick={() => setScanned(true)} style={{ fontSize: 16, padding: "14px 32px" }}>
              🔍 Simulate QR Scan
            </button>
            <p style={{ color: "var(--text-muted)", fontSize: 11, marginTop: 12 }}>Demo: Click to simulate scanning RTL-QR-20260404-001</p>
          </div>
        </div>
      ) : (
        <div className="verify-container" style={{ maxWidth: 700 }}>
          <div className="verify-hero animate-in">
            <div className="verified-badge"><ShieldCheck size={18} /> Blockchain Verified ✓</div>
            <h3 style={{ fontSize: 22, marginBottom: 4 }}>{v.product}</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>{v.packSize} Pack • {v.retailPrice}</p>
          </div>

          {/* Farmer Info */}
          <div className="card animate-in">
            <h3 style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <User size={18} color="var(--green-primary)" /> Farmer Details
            </h3>
            <div className="detail-grid">
              <div className="detail-item"><label>Farmer Name</label><span>🧑‍🌾 {v.farmerName}</span></div>
              <div className="detail-item"><label>Location</label><span><MapPin size={13} style={{ display: "inline" }} /> {v.farmerLocation}</span></div>
              <div className="detail-item"><label>Farmer Price</label><span style={{ color: "var(--green-primary)" }}>{v.farmerPrice}</span></div>
              <div className="detail-item"><label>Quality Grade</label><span><Award size={13} style={{ display: "inline" }} /> {v.quality}</span></div>
              <div className="detail-item"><label>Harvest Date</label><span>{v.harvestDate}</span></div>
              <div className="detail-item"><label>FPO</label><span>{v.fpo}</span></div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="card animate-in">
            <h3 style={{ marginBottom: 16 }}>💰 Price Transparency Breakdown</h3>
            <div className="price-breakdown">
              {v.priceBreakdown.map((item, i) => (
                <div key={i} className="price-bar-container">
                  <span className="label">{item.stage}</span>
                  <div className="price-bar">
                    <div
                      className={`price-bar-fill ${["farmer", "fpo", "distributor", "retailer"][i]}`}
                      style={{ width: `${item.percentage}%` }}
                    >
                      ₹{item.price} ({item.percentage}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, padding: 12, background: "var(--green-glow)", borderRadius: 8, textAlign: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--green-primary)" }}>
                Farmer receives {v.priceBreakdown[0].percentage}% of the final retail price
              </span>
            </div>
          </div>

          {/* Supply Chain */}
          <div className="card animate-in">
            <h3 style={{ marginBottom: 16 }}>🔗 Supply Chain Journey</h3>
            <div className="flow-steps" style={{ justifyContent: "center" }}>
              {[
                { icon: "🧑‍🌾", title: v.farmerName, desc: v.farmerPrice },
                { icon: "🏪", title: v.fpo, desc: "₹48/kg" },
                { icon: "🚛", title: v.distributor, desc: "₹55/kg" },
                { icon: "🛒", title: v.retailer, desc: "₹65/kg" },
              ].map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center" }}>
                  <div className="flow-step">
                    <div className="step-circle">{step.icon}</div>
                    <div className="step-title">{step.title}</div>
                    <div className="step-desc">{step.desc}</div>
                  </div>
                  {i < 3 && <div className="flow-arrow"><ArrowRight /></div>}
                </div>
              ))}
            </div>
          </div>

          {/* Blockchain Proof */}
          <div className="card animate-in">
            <h3 style={{ marginBottom: 16 }}>🔐 Blockchain Proof</h3>
            <div className="detail-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="detail-item"><label>Total Transactions</label><span>{v.totalTransactions}</span></div>
              <div className="detail-item"><label>Retail QR ID</label><span style={{ fontFamily: "monospace", fontSize: 12 }}>{v.retailQR}</span></div>
            </div>
            <div style={{ marginTop: 12, padding: 12, background: "var(--bg-secondary)", borderRadius: 8 }}>
              <label style={{ fontSize: 11, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: 0.5 }}>Chain Hash Trail</label>
              <div style={{ fontFamily: "monospace", fontSize: 12, color: "var(--green-primary)", marginTop: 4, wordBreak: "break-all" }}>
                {v.chainHash}
              </div>
            </div>
          </div>

          <button className="btn btn-secondary" onClick={() => setScanned(false)} style={{ width: "100%", justifyContent: "center", marginTop: 8 }}>
            ← Scan Another Product
          </button>
        </div>
      )}
    </div>
  );
}
