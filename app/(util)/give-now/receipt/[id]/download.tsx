'use client'

import React from 'react'
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PaidTransactionType } from '@data/mpesa';
import { HashString } from '@utils/hash-string';

const Download = ({data}:{data:PaidTransactionType}) => {
    const DownloadReceipt = async()=>{
        const pdf = new jsPDF('p', 'pt', 'a6');
        pdf.setProperties({
            title: `SDACKC Receipt ${data.no}`
        });
        pdf.addImage('/logo.png', 'JPEG', 10, 5, 70, 22);
        pdf.setFontSize(9);
        pdf.setFont('custom', 'bold');
        pdf.setLineWidth(0.1);
        pdf.setDrawColor(200, 200, 200);
        pdf.line(10, 27, 280, 27)
        pdf.text(`${data.name}`, 13, 35)
        pdf.setFont('custom', 'normal');
        pdf.text(`${HashString(data.email)||''}`, 13, 47)
        pdf.text(`${HashString(data.phone)}`, 13, 60)
        pdf.setFont('custom', 'bold')
        pdf.text('Receipt#        :', 150, 35)
        pdf.text('Payment Mode    :', 150, 47)
        pdf.text('Transaction Date:', 150, 60)
        pdf.text(`${data.no}`, 225, 35)
        pdf.text(`${data.paymentMode}`, 225, 47)
        pdf.text(new Date(data.createdAt).toLocaleDateString(), 225, 60)
        pdf.setFont('custom', 'normal')
        pdf.setFontSize(9);
            // Generate AutoTable for item details
    const receiptRows = data.lines.map((line, index) => [
        (index + 1).toString(),
        line.name.toString(),
        line.amount.toFixed(2).toString()
    ]);
    const ReceiptLineDetailsHeaders = ['S.No', 'Item Name', 'Amount (KES)'];
    const ReceiptLineDetailsFooters = ['', 'Total (KES)', data.amount.toFixed(2).toString()];
    const columnWidths = [30, 160, 85]; // Adjust column widths as needed
    // Define table styles
    
    pdf.setFont('custom');
    const itemDetailsYStart = 68;
    autoTable(pdf, {
        head: [ReceiptLineDetailsHeaders],
        body: receiptRows,
        foot: [ReceiptLineDetailsFooters],
        startY: itemDetailsYStart, // Adjust the Y position as needed
        headStyles: {
            fillColor: [240, 240, 240],
            textColor:0,
            fontStyle:'bold',
            fontSize: 9, // Adjust the font size as needed
            font: 'custom', // Set the font family
            halign: 'justify',
        },
        columnStyles: {
            0: { cellWidth: columnWidths[0] }, // Adjust column widths as needed
            1: { cellWidth: columnWidths[1] },
            2: { cellWidth: columnWidths[2], halign:'right' },
        },
        alternateRowStyles: { fillColor: [255, 255, 255] },
        bodyStyles: {
            fontSize: 9, // Adjust the font size for the body
            font: 'custom', // Set the font family for the body
            cellPadding: { top: 1, right: 5, bottom: 1, left: 2 }, // Adjust cell padding
            textColor: [0, 0, 0], // Set text color for the body
            // rowPageBreak: 'avoid', // Avoid row page breaks
        },
        margin: { top: 10, left: 13 },
        footStyles:{
            fillColor: [240, 240, 240],
            textColor:0,
            fontStyle:'bold',
            fontSize: 9, // Adjust the font size as needed
            font: 'custom', // Set the font family
            halign: 'right',
        },
    });

    // Add summary and page numbers
    const summaryYStart = pdf.internal.pageSize.getHeight() - 50;
    pdf.setFontSize(9);
    pdf.setFont('custom', 'normal')
    pdf.text('Thank You,', 13, summaryYStart + 12)
    pdf.setFont('custom', 'bold')
    pdf.text('For Queries/Concerns,', 13, summaryYStart + 20)
    pdf.setFont('custom', 'italic')
    pdf.text('Phone: +254748826726,', 18, summaryYStart + 28)
    pdf.text('Email: treasury@sdackc.org,', 18, summaryYStart + 36)
    pdf.setFont('custom', 'bold')
    pdf.text('Karen Community SDA Church', 13, summaryYStart + 44)

    // const totalPages = pdf.internal.getNumberOfPages();
    const totalPages = 1;
    for (let i = 1; i <= totalPages; i++) {
        pdf.addImage('/transparent_logo_3.png', 'PNG', 0, 0,  pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getWidth());        
        pdf.addImage('/security-seal3.png', 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      
        pdf.line(10, 373, 280, 373)
        pdf.setPage(i);
        pdf.setFont('custom');
        pdf.text(
            `Page ${i} of ${totalPages}`,
            238,
            pdf.internal.pageSize.getHeight() - 5
        );
    }

    // Save the PDF 
    pdf.save(`SDACKC Receipt-${data.no}.pdf`);

    // pdf open in a new tab
    // const pdfDataUri = pdf.output('datauristring');
    // const newTab = window.open();
    // newTab?.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);

    }
    return (
        <button className="font-medium hover:underline" onClick={DownloadReceipt}>
            Print Receipt
        </button>
    )
}

export default Download
