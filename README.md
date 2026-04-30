# GlobeIOTA - 3D IOTA Network Visualization

GlobeIOTA is an interactive, real-time 3D visualization of the IOTA network. It renders active validators clustered by major geographic tech hubs and displays a live stream of IOTA transactions using animated 3D arcs.

## 🚀 Features

- **Interactive 3D Globe**: Built with `react-globe.gl` (Three.js), providing a smooth, rotatable, and zoomable view of the Earth.
- **Live Transaction Stream**: Integrates with the IOTA testnet via GraphQL to fetch and display recent transactions in real-time, visualized as animated arcs across the globe.
- **Validator Clustering**: Aggregates active IOTA validators into regional hubs, showing node counts and detailed server lists within custom, anchored HTML popups.
- **Fully Responsive**: Features a modern, mobile-friendly UI crafted with Tailwind CSS.
- **Strict TypeScript**: Ensures robust rendering and data handling.

## 🛠️ Technologies Used

- **Framework**: React 18, Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Visualization**: `react-globe.gl` (Three.js)
- **Data Fetching**: `@tanstack/react-query`
- **IOTA Ecosystem**: `@iota/dapp-kit`, `@iota/iota-sdk`

## ⚙️ Getting Started

### Prerequisites

Make sure you have Node.js and npm (or yarn/pnpm) installed on your system.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/marcin-debowski/GlobeIOTA.git
   cd GlobeIOTA
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the root directory and configure your IOTA RPC and GraphQL endpoints (defaults safely to testnet URLs if left empty, but specifying them is recommended):

   ```env
   VITE_IOTA_GRAPHQL_ENDPOINT=https://graphql.testnet.iota.cafe/
   VITE_IOTA_RPC_URL=https://fullnode.testnet.iota.cafe:443
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

## 🔒 Security Notes

The project uses `.env` variables to prevent accidental exposure of your RPC endpoints or API keys in the GitHub repository. For production deployments, it's recommended to proxy RPC requests through your own backend/serverless functions or use strict domain whitelisting (CORS) at your RPC provider level to completely secure your nodes.

## 📄 License

This project was created as a recruitment task / proof of concept. Feel free to explore and modify.
