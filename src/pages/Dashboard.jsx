import { dashboardStats, priceAnalytics, blockchainTransactions, produceRecords } from "../data/dummyData";
import { TrendingUp, Users, Wheat, Link2, Store, ArrowUpRight, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const maxRetail = Math.max(...priceAnalytics.map(p => p.retail));

  return (
    <div>
      <div className="page-header">
        <h2>📊 Dashboard Overview</h2>
        <p>Real-time agricultural supply chain analytics powered by blockchain</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card animate-in">
          <div className="stat-icon green"><Users size={22} /></div>
          <div className="stat-value">{dashboardStats.totalFarmers.toLocaleString()}</div>
          <div className="stat-label">Registered Farmers</div>
          <div className="stat-change positive"><TrendingUp size={12} /> +12.3% this month</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-icon blue"><Wheat size={22} /></div>
          <div className="stat-value">{(dashboardStats.totalProduce / 1000).toFixed(1)}T</div>
          <div className="stat-label">Total Produce Tracked</div>
          <div className="stat-change positive"><TrendingUp size={12} /> +{dashboardStats.monthlyGrowth}%</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-icon purple"><Link2 size={22} /></div>
          <div className="stat-value">{dashboardStats.totalTransactions.toLocaleString()}</div>
          <div className="stat-label">Blockchain Transactions</div>
          <div className="stat-change positive"><TrendingUp size={12} /> +847 today</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-icon yellow"><Store size={22} /></div>
          <div className="stat-value">{dashboardStats.avgFarmerShare}%</div>
          <div className="stat-label">Avg. Farmer Revenue Share</div>
          <div className="stat-change positive"><TrendingUp size={12} /> +3.2% vs last year</div>
        </div>
      </div>

      {/* Supply Chain Flow Visual */}
      <div className="card animate-in">
        <div className="card-header">
          <h3>🔗 Live Supply Chain Flow</h3>
          <span className="badge green">● Live</span>
        </div>
        <div className="flow-steps">
          <div className="flow-step">
            <div className="step-circle active">🧑‍🌾</div>
            <div className="step-title">Farmer</div>
            <div className="step-desc">1,247 registered</div>
          </div>
          <div className="flow-arrow"><ArrowRight /></div>
          <div className="flow-step">
            <div className="step-circle active">🏪</div>
            <div className="step-title">FPO / Mandi</div>
            <div className="step-desc">28 active FPOs</div>
          </div>
          <div className="flow-arrow"><ArrowRight /></div>
          <div className="flow-step">
            <div className="step-circle active">🚛</div>
            <div className="step-title">Distributor</div>
            <div className="step-desc">156 distributors</div>
          </div>
          <div className="flow-arrow"><ArrowRight /></div>
          <div className="flow-step">
            <div className="step-circle active">🛒</div>
            <div className="step-title">Retailer</div>
            <div className="step-desc">342 retail points</div>
          </div>
          <div className="flow-arrow"><ArrowRight /></div>
          <div className="flow-step">
            <div className="step-circle">📱</div>
            <div className="step-title">Consumer</div>
            <div className="step-desc">Scan & Verify</div>
          </div>
        </div>
      </div>

      <div className="grid-2">
        {/* Price Analytics Chart */}
        <div className="card animate-in">
          <div className="card-header">
            <h3>💰 Price Analytics (₹/kg)</h3>
            <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--green-primary)" }}></span> Farmer
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--blue-primary)", opacity: 0.7 }}></span> Retail
              </span>
            </div>
          </div>
          <div className="chart-placeholder">
            {priceAnalytics.map((item, i) => (
              <div key={i} className="chart-bar-group">
                <div className="chart-bars">
                  <div className="chart-bar farmer-bar" style={{ height: `${(item.farmer / maxRetail) * 100}%` }}></div>
                  <div className="chart-bar retail-bar" style={{ height: `${(item.retail / maxRetail) * 100}%` }}></div>
                </div>
                <div className="chart-label">{item.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="card animate-in">
          <div className="card-header">
            <h3>🔗 Recent Blockchain Activity</h3>
            <button className="btn btn-secondary" onClick={() => navigate("/blockchain")} style={{ fontSize: 12, padding: "6px 12px" }}>
              View All <ArrowUpRight size={12} />
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {blockchainTransactions.slice(0, 4).map(tx => (
              <div key={tx.id} style={{
                background: "var(--bg-secondary)", padding: 14, borderRadius: 8,
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{tx.type.replace(/_/g, " ")}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{tx.crop} • {tx.quantity}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="badge green" style={{ fontSize: 11 }}>✓ {tx.status}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4, fontFamily: "monospace" }}>
                    {tx.hash.slice(0, 10)}...
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Produce Table */}
      <div className="card animate-in">
        <div className="card-header">
          <h3>📦 Recent Produce Submissions</h3>
          <button className="btn btn-secondary" onClick={() => navigate("/fpo")} style={{ fontSize: 12, padding: "6px 12px" }}>
            View All <ArrowUpRight size={12} />
          </button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Farmer</th><th>Crop</th><th>Qty</th><th>Quality</th><th>Price</th><th>Status</th><th>Block Hash</th>
              </tr>
            </thead>
            <tbody>
              {produceRecords.map(p => (
                <tr key={p.id}>
                  <td style={{ fontFamily: "monospace", fontWeight: 600, color: "var(--green-primary)" }}>{p.id}</td>
                  <td style={{ color: "var(--text-primary)", fontWeight: 500 }}>{p.farmerName}</td>
                  <td>{p.crop}</td>
                  <td>{p.quantity} {p.unit}</td>
                  <td><span className="badge green">{p.quality}</span></td>
                  <td style={{ color: "var(--text-primary)", fontWeight: 600 }}>₹{p.totalPrice.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${p.status === "At FPO" ? "yellow" : p.status === "With Distributor" ? "blue" : p.status === "At Consumer" ? "purple" : "green"}`}>
                      {p.status}
                    </span>
                  </td>
                  <td style={{ fontFamily: "monospace", fontSize: 12, color: "var(--text-muted)" }}>{p.blockHash}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
