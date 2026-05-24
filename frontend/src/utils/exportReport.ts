import jsPDF from "jspdf";


export function exportInterviewReport(
  report: any
) {

  const doc =
    new jsPDF();

  let y = 20;


  doc.setFontSize(24);

  doc.text(
    "HireSense AI Interview Report",
    20,
    y
  );

  y += 20;


  doc.setFontSize(16);

  doc.text(
    `Confidence: ${report.confidence}%`,
    20,
    y
  );

  y += 12;

  doc.text(
    `Communication: ${report.communication}%`,
    20,
    y
  );

  y += 12;

  doc.text(
    `Technical: ${report.technical}%`,
    20,
    y
  );

  y += 12;

  doc.text(
    `Recommendation: ${report.recommendation}`,
    20,
    y
  );

  y += 20;


  doc.setFontSize(18);

  doc.text(
    "AI Summary",
    20,
    y
  );

  y += 12;


  doc.setFontSize(12);

  const summaryLines =
    doc.splitTextToSize(

      report.summary,

      170
    );

  doc.text(
    summaryLines,
    20,
    y
  );

  y += 30;


  doc.setFontSize(18);

  doc.text(
    "Strengths",
    20,
    y
  );

  y += 12;


  doc.setFontSize(12);

  report.strengths?.forEach(
    (item: string) => {

      doc.text(
        `• ${item}`,
        25,
        y
      );

      y += 10;
    }
  );


  y += 10;


  doc.setFontSize(18);

  doc.text(
    "Areas For Improvement",
    20,
    y
  );

  y += 12;


  doc.setFontSize(12);

  report.improvements?.forEach(
    (item: string) => {

      doc.text(
        `• ${item}`,
        25,
        y
      );

      y += 10;
    }
  );


  doc.save(
    "HireSense_AI_Report.pdf"
  );
}