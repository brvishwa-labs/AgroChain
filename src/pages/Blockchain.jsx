import { blockchainTransactions } from "../data/dummyData";
import { Link2, ArrowDown, Clock, Fuel, CheckCircle } from "lucide-react";

export default function Blockchain() {
  return (
    <div>
      <div className="page-header">
        <h2>🔗 Blockchain Explorer</h2>
        <p>Immutable, tamper-proof ledger of all supply chain transactions on Hyperledger Fabric</p>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        <div className="stat-card animate-in">
          <div className="stat-value">{blockchainTransactions.length}</div>
          <div className="stat-label">Total Blocks</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-value">100%</div>
          <div className="stat-label">Confirmed</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-value">0</div>
          <div className="stat-label">Tamper Attempts</div>
        </div>
        <div className="stat-card animate-in">
          <div className="stat-value">~2.1s</div>
          <div className="stat-label">Avg. Block Time</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3>⛓️ Block Chain</h3>
          <span className="badge green">● Network Active</span>
        </div>
        <div className="block-chain">
          {blockchainTransactions.map((tx, i) => (
            <div key={tx.id}>
              <div className="block-item animate-in">
                <div className="block-header">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span className="block-number">Block #{tx.blockNumber}</span>
                    <span className={`badge ${tx.type.includes("REGISTERED") ? "green" : tx.type.includes("PURCHASED") ? "blue" : tx.type.includes("DELIVERED") ? "yellow" : "purple"}`}>
                      {tx.type.replace(/_/g, " ")}
                    </span>
                  </div>
                  <span className="badge green" style={{ fontSize: 11 }}><CheckCircle size={11} /> {tx.confirmations} confirmations</span>
                </div>
                <div style={{ fontFamily: "monospace", fontSize: 11, color: "var(--text-muted)", marginBottom: 12, wordBreak: "break-all" }}>
                  {tx.hash}
                </div>
                <div className="block-details">
                  <div className="block-detail-item"><label>From</label><span>{tx.from}</span></div>
                  <div className="block-detail-item"><label>To</label><span>{tx.to}</span></div>
                  <div className="block-detail-item"><label>Crop</label><span>{tx.crop}</span></div>
                  <div className="block-detail-item"><label>Quantity</label><span>{tx.quantity}</span></div>
                  <div className="block-detail-item"><label>Price</label><span>{tx.price}</span></div>
                  <div className="block-detail-item">
                    <label>Timestamp</label>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} />{tx.timestamp}</span>
                  </div>
                </div>
              </div>
              {i < blockchainTransactions.length - 1 && (
                <div className="block-connector"><ArrowDown /></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
