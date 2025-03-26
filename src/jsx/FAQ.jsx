"use client";
import React, { useState } from 'react';
import '../css/FAQ.css';

function FAQ() {
  const faqs = [
    {
      question: "What is the purpose of this website?",
      answer: "This website allows users to view, search, and manage their uploaded files easily with a clean interface."
    },
    {
      question: "How do I search for a specific file?",
      answer: "Use the search bar above the file list. Type the file name or keyword and click the Search button."
    },
    {
      question: "What file types are supported?",
      answer: "The platform supports images, audio, video, PDFs, and other generic file formats, each with color-coded icons."
    },
    {
      question: "What happens if the backend is down?",
      answer: "The search bar remains functional and visible. However, file content will not load until the backend is restored."
    },
    {
      question: "How can I clear my search and view all files again?",
      answer: "Click the Clear button next to the search bar to reset your search and view all files."
    },
    {
      question: "Is my data safe on this platform?",
      answer: "Yes, your data is secure and only accessible by you or authorized users."
    },
    {
      question: "Can I upload or delete files from this page?",
      answer: "Currently, this page focuses on viewing and searching files. Upload/delete options may be added later."
    },
    {
      question: "Why is a file icon colored differently?",
      answer: "Each file type has a unique color-coded icon for easy identification (blue for images, orange for audio, etc.)."
    },
    {
      question: "Is this website mobile-friendly?",
      answer: "Yes! The website is fully responsive and works well on all devices."
    },
    {
      question: "Whom do I contact for support or issues?",
      answer: "You can reach out to our support team through the contact page or email us directly."
    }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question}
              <span className="arrow">{activeIndex === index ? '▲' : '▼'}</span>
            </div>
            <div className="faq-answer">
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;
