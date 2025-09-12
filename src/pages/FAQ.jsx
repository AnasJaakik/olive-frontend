import React from "react";
import "./FAQ.css";

export default function FAQ() {
  return (
    <main className="faq-page">
      <section className="faq-wrap">
        <h1 className="faq-title">Frequently Asked Questions</h1>
        <p className="faq-sub">
          Below are answers to common questions about pre-orders, delivery, and our olive oil.
        </p>

        <div className="faq-block">
          <h2>What does “pre-order” mean?</h2>
          <p>
            You’re reserving bottles from our next batch. No payment is required today. 
            When the oil is physically in Germany, we’ll email you an invoice 
            (PayPal QR + IBAN) to complete your order.
          </p>
        </div>

        <div className="faq-block">
          <h2>When will I receive my olive oil?</h2>
          <p>
            We aren’t yet certain when the stock will arrive in Germany. 
            That’s why we use a pre-order form — so you can reserve bottles now. 
            Once the oil has landed, we’ll notify you, collect payment, and 
            ship your order right away.
          </p>
        </div>

        <div className="faq-block">
          <h2>How many bottles can I reserve?</h2>
          <p>
            Up to 4 bottles per person during the pre-order phase to keep it fair. 
            If inventory remains, we’ll open larger orders later.
          </p>
        </div>

        <div className="faq-block">
          <h2>Where is the olive oil from?</h2>
          <p>
            From our family grove in the Haouz (Marrakech), Morocco. 
            Single-origin Haouzia variety.
          </p>
        </div>

        <div className="faq-block">
          <h2>What makes your oil special?</h2>
          <p>
            We target an acidity level below <strong>0.4%</strong> (vs. 0.8% max for extra virgin), 
            thanks to early harvest and rapid cold extraction. This results in a 
            polyphenol-rich oil with a vivid, peppery finish.
          </p>
        </div>

        <div className="faq-block">
          <h2>How is payment handled?</h2>
          <p>
            Once stock is in Germany, we’ll send you an invoice with 
            PayPal QR and IBAN. You can choose either method to complete payment.
          </p>
        </div>

        <div className="faq-block">
          <h2>Do you ship outside Germany?</h2>
          <p>
            For the first pre-order wave we focus on Germany, Switzerland and Denmark. 
            If you’re elsewhere in the EU, please contact us and 
            we’ll try to accommodate.
          </p>
        </div>

        <div className="faq-block">
          <h2>How should I store the oil?</h2>
          <p>
            Keep it cool, dark, and sealed. Avoid heat and direct light. 
            Best enjoyed within 12–18 months of harvest.
          </p>
        </div>

        <div className="faq-block">
          <h2>How do I contact you?</h2>
          <p>
            Email us at <a href="mailto:info@abdeljaliloliveoil.com">info@abdeljaliloliveoil.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
