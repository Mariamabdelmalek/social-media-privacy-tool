// src\pages\Dashboard.js
import React from "react";
<<<<<<< HEAD
import '../App.scss';
=======
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

>>>>>>> 8911b2b (Updated Dashboard with modern design)
function Dashboard() {
    const riskData = [
        { platform: "Instagram", score: 72, icon: <FaInstagram />, color: "#E1306C" },
        { platform: "Facebook", score: 65, icon: <FaFacebookF />, color: "#3b5998" },
        { platform: "X (Twitter)", score: 80, icon: <FaTwitter />, color: "#1DA1F2" },
    ];

    const historyData = [
        { date: "2025-09-20", platform: "Instagram", findings: "2 location tags, 1 phone number", score: 72 },
        { date: "2025-09-18", platform: "Facebook", findings: "Workplace info in bio", score: 65 },
    ];

    const recommendations = [
        "Remove location tags from recent Instagram posts.",
        "Update Facebook privacy settings to hide workplace details.",
        "Enable two-factor authentication on all accounts.",
        "Regularly review connected apps and permissions.",
    ];

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", background: "#f9f9f9", minHeight: "100vh" }}>
            {/* Header */}
            <header style={{ textAlign: "center", marginBottom: "2rem" }}>
                <h1 style={{ fontSize: "2.5rem", color: "#333" }}>Privacy Dashboard</h1>
                <p style={{ color: "#666", fontSize: "1rem" }}>
                    Overview of your social media privacy risks, scan history, and personalized recommendations.
                </p>
            </header>

            {/* Risk Scores */}
            <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ color: "#444", marginBottom: "1rem" }}>Recent Risk Scores</h2>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {riskData.map((data) => (
                        <div key={data.platform} style={{
                            flex: "1 1 200px",
                            background: `linear-gradient(135deg, ${data.color}33, ${data.color}11)`,
                            padding: "1.5rem",
                            borderRadius: "12px",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            transition: "transform 0.2s",
                        }}
                            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
                        >
                            <div style={{ fontSize: "2rem", marginBottom: "0.5rem", color: data.color }}>
                                {data.icon}
                            </div>
                            <h3 style={{ marginBottom: "0.5rem" }}>{data.platform}</h3>
                            <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Risk Score: {data.score}/100</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Scan History */}
            <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ color: "#444", marginBottom: "1rem" }}>Scan History</h2>
                <div style={{ overflowX: "auto", background: "#fff", padding: "1rem", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse" }}>
                        <thead>
                            <tr style={{ background: "#f2f2f2" }}>
                                <th style={{ padding: "12px", textAlign: "left" }}>Date</th>
                                <th style={{ padding: "12px", textAlign: "left" }}>Platform</th>
                                <th style={{ padding: "12px", textAlign: "left" }}>Findings</th>
                                <th style={{ padding: "12px", textAlign: "left" }}>Risk Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historyData.map((item, index) => (
                                <tr key={index} style={{ borderBottom: "1px solid #eee" }}>
                                    <td style={{ padding: "12px" }}>{item.date}</td>
                                    <td style={{ padding: "12px" }}>{item.platform}</td>
                                    <td style={{ padding: "12px" }}>{item.findings}</td>
                                    <td style={{ padding: "12px", fontWeight: "bold" }}>{item.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Recommendations */}
            <section style={{ marginBottom: "2rem" }}>
                <h2 style={{ color: "#444", marginBottom: "1rem" }}>Recommendations</h2>
                <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                    {recommendations.map((rec, idx) => (
                        <li key={idx} style={{
                            background: "#fff",
                            marginBottom: "0.5rem",
                            padding: "1rem",
                            borderRadius: "8px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        }}>
                            {rec}
                        </li>
                    ))}
                </ul>
            </section>

            {/* Trends */}
            <section style={{ marginBottom: "2rem", textAlign: "center" }}>
                <h2 style={{ color: "#444", marginBottom: "1rem" }}>Privacy Trends</h2>
                <div style={{
                    height: "200px",
                    background: "#fff",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                }}>
                    <p style={{ color: "#999" }}>Chart Placeholder: Risk score over time</p>
                </div>
            </section>
        </div>
    );
}

export default Dashboard;
