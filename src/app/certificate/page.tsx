"use client"
import React, { useState } from 'react';
import { PDFDocument, rgb } from 'pdf-lib';
const Home: React.FC = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const handleGenerateCertificate = async () => {
    try {
      const existingPdfBytes = await fetch('/certificate.pdf').then((res) => res.arrayBuffer());
      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const page = pdfDoc.getPage(0);
      const nameX = 100;
      const nameY = 255;
      const dobX = 140;
      const dobY = 60;
      const textColor = rgb(90 / 255, 90 / 255, 90 / 255);
      page.drawText(`${name}`, { x: nameX, y: nameY, color: textColor,size:24});
      page.drawText(`${dob}`, { x: dobX, y: dobY,color: textColor ,size:12});
      const modifiedPdfBytes = await pdfDoc.save();
      const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
      const fileName = 'filled_certificate.pdf';
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error('Error loading or modifying PDF:', error);
    }
  };

  return (
    <div>
      <h1>Generate Certificate</h1>
      <form>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Date:
          <input type="text" value={dob} onChange={(e) => setDob(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleGenerateCertificate}>
          Generate Certificate
        </button>
      </form>
    </div>
  );
};

export default Home;
