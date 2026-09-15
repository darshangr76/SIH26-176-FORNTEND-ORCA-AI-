"use client";
import dynamic from "next/dynamic";

import { useRef, useState } from "react";


import {
  AlertTriangle,
  Anchor,
  BarChart3,
  CheckCircle2,
  Compass,
  Gauge,
  Map,
  MessageSquare,
  Navigation,
  RefreshCw,
  ShieldCheck,
  Waves,
  Wind,
} from "lucide-react";

const MapView = dynamic(
  () => import("./MapView"),
  {
    ssr: false,
    loading: () => (
      <div className="map-loading">
        Loading marine map...
      </div>
    ),
  }
);

export default function Home() {
  const [query, setQuery] = useState(
    "Can I go fishing near Mangaluru tomorrow morning?"
  );
  const askOrcaRef = useRef<HTMLElement>(null);
  const liveMapRef = useRef<HTMLElement>(null);
  const routesRef = useRef<HTMLElement>(null);
  const safetyRef = useRef<HTMLElement>(null);
  const [showResponse, setShowResponse] = useState(false);

  return (
    <main className="orca-app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">O</div>

          <div>
            <h1>ORCA-AI</h1>
            <p>Marine Intelligence</p>
          </div>
        </div>

        <nav>
  <button
    className="nav-item active"
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  >
    <BarChart3 size={18} />
    Dashboard
  </button>

  <button
    className="nav-item"
    onClick={() => {
  askOrcaRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
  askOrcaRef.current?.querySelector("input")?.focus();
}}
  >
    <MessageSquare size={18} />
    Ask ORCA
  </button>

  <button
  className="nav-item"
  onClick={() => {
    liveMapRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }}
>
  <Map size={18} />
  Live Map
</button>

 <button
  className="nav-item"
  onClick={() => {
    if (routesRef.current) {
      const y =
        routesRef.current.getBoundingClientRect().top +
        window.scrollY -
        120;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  }}
>
  <Navigation size={18} />
  Routes
</button>

 <button
  className="nav-item"
  onClick={() => {
    safetyRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }}
>
  <ShieldCheck size={18} />
  Safety
</button>
</nav>

        <div className="sidebar-bottom">
          <span className="online-dot" />
          ORCA systems online
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="main">
        <header className="header">
          <div>
            <h2>Fishing Safety Dashboard</h2>
            <p>AI-powered marine decision support</p>
          </div>

          <div className="header-status">
            <span className="online-dot" />
            Live Simulation
          </div>
        </header>

        <div className="content">
          {/* ASK ORCA */}
          
          <section className="query" ref={askOrcaRef}>
          <input
           value={query}
           onChange={(e) => setQuery(e.target.value)}
           placeholder="Ask ORCA..."
          />
            <select defaultValue="Mangaluru">
              <option>Mangaluru</option>
              <option>Udupi</option>
              <option>Karwar</option>
            </select>

            <input type="time" defaultValue="06:00" />

          <button
             className="analyse-button"
             onClick={() => {
             alert("Analyse button is working");
             setShowResponse(true);
            }}
            > 
             Analyse
            </button>
          </section>
          {showResponse && (
          <div className="orca-response">
          <strong>ORCA Analysis</strong>
          <p>
           Based on the current marine conditions, fishing activity is
           recommended with normal safety precautions.
          </p>
          </div>
         )}


          {/* TOP SECTION */}
          <section className="top-grid" ref={liveMapRef}>
            <div className="card map-card">
              <div className="card-header">
                <div>
                  <h3>Marine Situation</h3>
                  <span>Mangaluru Coast</span>
                </div>

                <span className="map-live">● LIVE</span>
              </div>

                          <MapView />

            </div>

            {/* DECISION */}
            
              <div className="card decision-card" ref={safetyRef}>
              <div className="card-header">
                <div>
                  <h3>ORCA Decision</h3>
                  <span>Latest assessment</span>
                </div>

                <ShieldCheck size={20} />
              </div>

              <div className="decision-content">
                <div className="decision-status go">
                  <CheckCircle2 size={20} />
                  GO
                </div>

                <div className="decision-main">
                  <div>
                    <h2>GO</h2>
                    <p>Recommended fishing action</p>
                  </div>

                  <div className="confidence">
                    <Gauge size={18} />
                    <strong>91%</strong>
                    <span>Confidence</span>
                  </div>
                </div>

                <div className="metrics">
                  <Metric label="RISK" value="LOW" />
                  <Metric label="PFZ" value="FAVOURABLE" />
                  <Metric label="WIND" value="12 km/h" />
                  <Metric label="WAVES" value="1.1 m" />
                </div>

                <div className="why">
                  <h4>Why?</h4>

                  <Evidence
                    text="PFZ conditions are favourable."
                    good
                  />

                  <Evidence
                    text="Wind conditions are within safe range."
                    good
                  />

                  <Evidence
                    text="No severe weather alert detected."
                    good
                  />

                  <Evidence
                    text="Recommended route has acceptable risk."
                    good
                  />
                </div>

                <div className="trust-mini">
                  <ShieldCheck size={17} />

                  <div>
                    <strong>Evidence freshness</strong>
                    <span>Data updated 8 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* LOWER SECTION */}
          <section className="bottom-grid">
            {/* CONDITIONS */}
            <div className="card" ref={routesRef}>
              <div className="card-header">
                <h3>Marine Conditions</h3>
                <span>Current</span>
              </div>

              <div className="condition-grid">
                <Condition
                  icon={<Wind size={18} />}
                  label="Wind"
                  value="12 km/h"
                />

                <Condition
                  icon={<Waves size={18} />}
                  label="Wave Height"
                  value="1.1 m"
                />

                <Condition
                  icon={<AlertTriangle size={18} />}
                  label="Thunderstorm"
                  value="5%"
                />

                <Condition
                  icon={<Anchor size={18} />}
                  label="Sea Surface"
                  value="28.1°C"
                />
              </div>
            </div>

            {/* ROUTES */}
            <div className="card">
              <div className="card-header">
                <h3>Recommended Route</h3>
                <span>Risk-aware</span>
              </div>

              <div className="route-list">
                <Route
                  icon={<Compass size={18} />}
                  title="Primary Route"
                  detail="18.4 km • Lowest assessed risk"
                />

                <Route
                  icon={<RefreshCw size={18} />}
                  title="Alternate Route"
                  detail="21.7 km • Avoids caution zone"
                />

                <Route
                  icon={<Navigation size={18} />}
                  title="Return Route"
                  detail="Generated automatically on NO-GO"
                />
              </div>
            </div>

            {/* REPLANNING */}
            <div className="card">
              <div className="card-header">
                <h3>Dynamic Replanning</h3>
                <span>Autonomous</span>
              </div>

              <div className="timeline">
                <Timeline
                  time="06:00"
                  title="GO"
                  text="Wind 12 km/h • Waves 1.1 m"
                />

                <Timeline
                  time="07:15"
                  title="CAUTION"
                  text="Environment changed → Route recalculated"
                />

                <Timeline
                  time="07:45"
                  title="NO-GO"
                  text="Thunderstorm detected → Return route"
                />
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Evidence({
  text,
  good,
}: {
  text: string;
  good: boolean;
}) {
  return (
    <div className="evidence">
      <span className={good ? "good" : "bad"}>
        {good ? "✓" : "⚠"}
      </span>

      {text}
    </div>
  );
}

function Condition({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="condition">
      <div className="condition-icon">
        {icon}
      </div>

      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Route({
  icon,
  title,
  detail,
}: {
  icon: React.ReactNode;
  title: string;
  detail: string;
}) {
  return (
    <div className="route">
      <div className="route-icon">
        {icon}
      </div>

      <div>
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>

      <span>→</span>
    </div>
  );
}

function Timeline({
  time,
  title,
  text,
}: {
  time: string;
  title: string;
  text: string;
}) {
  return (
    <div className="timeline-item">
      <span className="timeline-time">
        {time}
      </span>

      <div className="timeline-dot" />

      <div>
        <strong>{title}</strong>
        <p>{text}</p>
      </div>
    </div>
  );
}