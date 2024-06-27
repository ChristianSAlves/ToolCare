import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export default function PDF() {
    const pdf = useRef();
    const downloadPDF = () => {
        const input = pdf.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF('p', 'mm', 'a4', true);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgWidth = canvas.width;
            const imgHeight = canvas.height;
            const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
            const imgX = (pdfWidth - imgWidth * ratio) / 2;
            const imgY = 30;
            pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
            pdf.save('teste.pdf');

        });


    };



    return (
        <>
            <div className="container mt-5 border p-5" ref={pdf}>
                <div className="row mb-4">


                </div>
                <div className="col-6 text-end"><h1>UAU</h1></div>
            </div>

            <div className="row text-center mt-5">
                <button className="btn btn-primary" onClick={downloadPDF}>downloadPDF</button>
            </div>
        </>


    )



}