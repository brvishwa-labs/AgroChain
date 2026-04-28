import { smsNotifications } from "../data/dummyData";
import { MessageSquare, Phone, Bell, CheckCircle } from "lucide-react";
import { useState } from "react";

export default function Notifications() {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all"
    ? smsNotifications
    : smsNotifications.filter(s => s.channel === filter.toUpperCase());

  const getIcon = (type) => {
    switch (type) {
      case "RECEIVED": return { icon: "📥", bg: "var(--green-glow)", color: "var(--green-primary)" };
      case "PRICE_UPDATE": return { icon: "💰", bg: "rgba(234,179,8,0.15)", color: "var(--yellow-primary)" };
      case "FINAL_SALE": return { icon: "✅", bg: "rgba(59,130,246,0.15)", color: "var(--blue-primary)" };
      default: return { icon: "📨", bg: "var(--green-glow)", color: "var(--green-primary)" };
    }
  };

  return (
    <div>
      <div className="page-header">
        <h2>📱 SMS / IVR Notification Logs</h2>
        <p>Real-time farmer updates via SMS and IVR — accessible on basic feature phones</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        <div className="stat-card animate-in">
          <div className="stat-icon green"><MessageSquare size={22} /></div>
          <div className="stat-value">{smsNotifications.filter(s => s.channel === "SMS").length}</div>
          <div className="stat-label">SMS Sent</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-icon blue"><Phone size={22} /></div>
          <div className="stat-value">{smsNotifications.filter(s => s.channel === "IVR").length}</div>
          <div className="stat-label">IVR Calls Made</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-icon yellow"><CheckCircle size={22} /></div>
          <div className="stat-value">100%</div>
          <div className="stat-label">Delivery Rate</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>Notification Log</h3>
          <div className="tabs" style={{ marginBottom: 0 }}>
            {["all", "sms", "ivr"].map(t => (
              <button key={t} className={`tab ${filter === t ? "active" : ""}`} onClick={() => setFilter(t)}>
                {t === "all" ? "All" : t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <div className="sms-list">
          {filtered.map(s => {
            const style = getIcon(s.type);
            return (
              <div key={s.id} className="sms-item animate-in">
                <div className="sms-icon" style={{ background: style.bg, color: style.color }}>{style.icon}</div>
                <div className="sms-body">
                  <div className="sms-farmer">
                    {s.farmerName}
                    <span className={`badge ${s.channel === "SMS" ? "green" : "blue"}`} style={{ marginLeft: 8, fontSize: 10 }}>
                      {s.channel === "SMS" ? "📱 SMS" : "📞 IVR"}
                    </span>
                  </div>
                  <div className="sms-message">{s.message}</div>
                  <div className="sms-time">{s.timestamp}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
