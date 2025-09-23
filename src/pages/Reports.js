import React from "react";

function Reports() {

    const sampleReports = [
        {
            id: 1,
            date: "2025-09-20",
            platform: "Instagram",
            findings: "2 location tags, 1 phone number",
            riskScore: 72,
        },
        {
            id: 2,
            date: "2025-09-18",
            platform: "Facebook",
            findings: "Workplace info in bio",
            riskScore: 65,
        },
    ];


    const handleExport = () => {
        alert("Export functionality will generate a PDF/CSV report here.");
    };

    return (
        <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
            <h1>Reports</h1>
            <p>
                View and export detailed reports of your privacy scans. These reports
                summarize findings and provide risk scores per platform.
            </p>

            {/* Table of reports */}
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1.5rem" }}>
                <thead>
                    <tr style={{ background: "#f2f2f2" }}>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Platform</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Findings</th>
                        <th style={{ border: "1px solid #ddd", padding: "8px" }}>Risk Score</th>
                    </tr>
                </thead>
                <tbody>
                    {sampleReports.map((report) => (
                        <tr key={report.id}>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{report.date}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{report.platform}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{report.findings}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{report.riskScore}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Export Button */}
            <button
                onClick={handleExport}
                style={{
                    marginTop: "1.5rem",
                    padding: "0.75rem 1.5rem",
                    background: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                }}
            >
                Export Report
            </button>
        </div>
    );
}

export default Reports;
