import React from "react";

export default function Impressum() {
  return (
    <main style={{ padding: "40px 5vw", fontFamily: "Tinos, serif", color: "#2b3a25" }}>
      <h1 style={{ fontSize: "1.8rem", fontWeight: "800", marginBottom: "24px" }}>Impressum</h1>

      <p><strong>Lea Ebinger UG (haftungsbeschränkt)</strong></p>
      <p>Represented by Lea Marie Ebinger</p>
      <p>Bertha-von-Suttner-Weg 10</p>
      <p>47877 Willich</p>
      <p>Germany</p>

      <p><strong>Email:</strong> [your-email@example.com]</p>
      <p><strong>VAT ID no.:</strong> DE456116192</p>
      <p>Registered in the commercial register of the Krefeld District Court</p>
      <p>Commercial Register Number HRB 21186</p>

      <h3 style={{ marginTop: "30px", fontWeight: "700" }}>Alternative Dispute Resolution:</h3>
      <p>
        The European Commission provides a platform for out-of-court online dispute resolution (ODR platform), 
        which can be accessed at{" "}
        <a href="https://ec.europa.eu/odr" target="_blank" rel="noreferrer" style={{ color: "#6f993e" }}>
          https://ec.europa.eu/odr
        </a>.
      </p>
      <p>
        We are neither willing nor obligated to participate in dispute resolution proceedings before consumer
        arbitration boards.
      </p>
    </main>
  );
}
