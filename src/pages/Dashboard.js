// src\pages\Dashboard.js
import React from "react";

function Dashboard() {
    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            <h1>Privacy Dashboard</h1>
            <p>
                This dashboard gives you an overview of your social media privacy risks,
                scan history, and personalized recommendations.
            </p>

            {/* Risk Score Section */}
            <section style={{ marginTop: "2rem" }}>
                <h2>Recent Risk Scores</h2>
                <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
                        <h3>Instagram</h3>
                        <p>Risk Score: <strong>72/100</strong></p>
                    </div>
                    <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
                        <h3>Facebook</h3>
                        <p>Risk Score: <strong>65/100</strong></p>
                    </div>
                    <div style={{ border: "1px solid #ddd", padding: "1rem", borderRadius: "8px" }}>
                        <h3>X (Twitter)</h3>
                        <p>Risk Score: <strong>80/100</strong></p>
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section style={{ marginTop: "2rem" }}>
                <h2>Scan History</h2>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ background: "#f2f2f2" }}>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Platform</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Findings</th>
                            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Risk Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>2025-09-20</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Instagram</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>2 location tags, 1 phone number</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>72</td>
                        </tr>
                        <tr>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>2025-09-18</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Facebook</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>Workplace info in bio</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>65</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Recommendations Section */}
            <section style={{ marginTop: "2rem" }}>
                <h2>Recommendations</h2>
                <ul>
                    <li>Remove location tags from recent Instagram posts.</li>
                    <li>Update Facebook privacy settings to hide workplace details.</li>
                    <li>Enable two-factor authentication on all accounts.</li>
                </ul>
            </section>

            {/* Trends Placeholder */}
            <section style={{ marginTop: "2rem" }}>
                <h2>Privacy Trends</h2>
                <p>A chart will be displayed here to show how your risk score improves over time.</p>
            </section>
        </div>
    );
}

export default Dashboard;
