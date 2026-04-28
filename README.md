# 🌾 AgroChain — Blockchain-Based Farm-to-Consumer Supply Chain Transparency

> **Team VIRA** | H2S Solution Challenge 2026 | Odisha, India

AgroChain is a blockchain-powered traceability platform that tracks agricultural produce from the farmer's field to the consumer's hands, ensuring **complete transparency**, **fair pricing**, and **tamper-proof records** at every stage of the supply chain.

---

## 🔎 Problem Statement

Indian agricultural supply chains suffer from:

- **Middleman Exploitation** — Commission agents buy produce 60–70% below retail price
- **Information Asymmetry** — Farmers lack access to market-wide pricing data
- **Zero Traceability** — No end-to-end visibility of produce journey enables fraud
- **Paper-Based Records** — Manual systems lead to tampering and compliance violations

---

## 💡 Our Solution

A **dual-level QR code system** backed by blockchain that creates an immutable, verifiable record of every transaction in the supply chain.

### Key Features

| Feature | Description |
|---------|-------------|
| 🏷️ **Dual-Level QR System** | Sack-level QR at FPO/Mandi + Retail-level QR at shops, both linked on-chain |
| 🔗 **Blockchain Backbone** | Hyperledger Fabric — tamper-proof, permissioned, auditable by all stakeholders |
| 📱 **SMS / IVR for Farmers** | Real-time price & status updates on basic feature phones — no smartphone needed |
| 🔍 **Consumer Verification** | Scan any retail QR to see farmer name, origin, quality grade, and price trail |
| 📊 **Price Analytics** | Historical pricing at every stage with MSP compliance monitoring |
| ⚡ **Smart Contract Automation** | Chaincode auto-verifies each handoff — no manual entry, no tampering |

---

## 🔄 Supply Chain Flow

```
🧑‍🌾 Farmer ──→ 🏪 FPO/Mandi ──→ 🚛 Distributor ──→ 🛒 Retailer ──→ 📱 Consumer
     │              │                  │                  │               │
     │         Sack QR Generated  QR Scanned at     Retail QR         Scans QR
     │         + Blockchain Log   Checkpoints        Generated         to Verify
     │                                                (linked to        Origin &
     ◄────────────── SMS/IVR Updates at Every Stage ──────────────►    Fair Price
```

1. **Farmer → FPO**: Deliver produce → Record farmer ID, crop, weight, grade → Generate Sack QR → Write to blockchain
2. **FPO → Distributor**: Purchase logged on-chain → QR scanned at every checkpoint
3. **Distributor → Retailer**: Retailer repacks into small units → Retail QR generated, linked to original sack
4. **Consumer Scan**: Scan retail QR → View farmer details, price history, origin, quality
5. **Farmer Feedback**: SMS/IVR notifies farmer of price at each stage — even on basic phones

---

## 🖥️ Application Pages

| Page | Description |
|------|-------------|
| **Dashboard** | Real-time stats, supply chain flow visualization, price analytics chart, recent blockchain activity |
| **Farmers Portal** | Farmer directory with registration form, produce history, and contact details |
| **FPO / Mandi** | Register produce batches, generate sack-level QR codes, view blockchain logs |
| **Distributors** | Distributor directory, in-transit shipment tracking |
| **Retailers** | Retail packet management, second-level QR generation linked to original farmer sack |
| **Consumer Verify** | Simulated QR scan → full product verification with price transparency breakdown |
| **Blockchain Explorer** | Immutable block chain view with transaction details, hashes, and confirmations |
| **SMS / IVR Logs** | Notification history with channel filtering (SMS/IVR) |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19 + Vite |
| **Routing** | React Router DOM |
| **QR Codes** | qrcode.react |
| **Icons** | Lucide React |
| **Styling** | Vanilla CSS (custom dark theme) |
| **Blockchain** | Hyperledger Fabric (architecture-ready) |
| **Notifications** | SMS / IVR integration layer |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/brvishwa-labs/AgroChain.git
cd AgroChain

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

---

## 📊 Architecture

```
AgroChain/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   └── Layout.jsx       # Sidebar navigation + app shell
│   ├── data/
│   │   └── dummyData.js     # Prototype dummy data (farmers, produce, transactions)
│   ├── pages/
│   │   ├── Dashboard.jsx    # Overview with stats & analytics
│   │   ├── Farmers.jsx      # Farmer directory & registration
│   │   ├── FPO.jsx          # FPO/Mandi produce management + sack QR
│   │   ├── Distributors.jsx # Distributor tracking
│   │   ├── Retailers.jsx    # Retail QR generation
│   │   ├── ConsumerVerify.jsx # Consumer QR scan & verification
│   │   ├── Blockchain.jsx   # Blockchain explorer
│   │   └── Notifications.jsx # SMS/IVR notification logs
│   ├── App.jsx              # Router configuration
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles (dark theme)
├── index.html
├── package.json
└── vite.config.js
```

---

## 🌍 Impact

- **Economic**: Farmers receive 62%+ of retail price (vs ~30% in traditional systems)
- **Social**: Transparent pricing eliminates middleman exploitation
- **Consumer Trust**: QR-based verification ensures food safety and authenticity
- **Accessibility**: SMS/IVR support makes it usable on basic feature phones
- **Government Aligned**: APMC/eNAM compatible, MSP compliance monitoring

---

## 🗺️ Roadmap

- [x] Frontend prototype with all stakeholder portals
- [x] Dual-level QR code generation (Sack + Retail)
- [x] Simulated blockchain explorer
- [x] Consumer verification flow
- [x] SMS/IVR notification system (UI)
- [ ] Hyperledger Fabric smart contract integration
- [ ] Real QR camera scanning
- [ ] Twilio SMS / IVR API integration
- [ ] Mobile responsive PWA
- [ ] Government API integration (eNAM, APMC)

---



## 📄 License

This project is built for the **H2S Solution Challenge 2026**.

---

<p align="center">
  <strong>🌾 AgroChain — Because every farmer deserves transparency.</strong>
</p>
