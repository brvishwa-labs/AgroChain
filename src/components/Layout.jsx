import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard, Users, Wheat, Truck, Store, ScanLine,
  Link2, MessageSquare, ChevronRight
} from "lucide-react";

const navItems = [
  { label: "Overview", path: "/", icon: LayoutDashboard },
  { section: "Supply Chain" },
  { label: "Farmers", path: "/farmers", icon: Users },
  { label: "FPO / Mandi", path: "/fpo", icon: Wheat },
  { label: "Distributors", path: "/distributors", icon: Truck },
  { label: "Retailers", path: "/retailers", icon: Store },
  { section: "Transparency" },
  { label: "Consumer Verify", path: "/verify", icon: ScanLine },
  { label: "Blockchain Explorer", path: "/blockchain", icon: Link2 },
  { label: "SMS / IVR Logs", path: "/notifications", icon: MessageSquare },
];

export default function Layout() {
  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-icon">🌾</div>
          <div>
            <h1>AgroChain</h1>
            <span>Farm-to-Fork Transparency</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item, i) =>
            item.section ? (
              <div key={i} className="nav-section-title">{item.section}</div>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              >
                <item.icon />
                {item.label}
              </NavLink>
            )
          )}
        </nav>
        <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: 16, marginTop: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 12px" }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: "linear-gradient(135deg, var(--green-primary), var(--green-dark))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 700
            }}>V</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600 }}>Team VIRA</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)" }}>H2S • Odisha</div>
            </div>
          </div>
        </div>
      </aside>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
