/*--[ theme paymentForm 1.0 ]--*/
  function calculateTotal() {
    let total = 1500; 
    const allPages = document.getElementById('allPages');
    const support = document.getElementById('support');

    if (allPages.checked) total += parseInt(allPages.value);
    if (support.checked) total += parseInt(support.value);

    document.getElementById('totalAmount').textContent = total;
  }

  function showPaymentNumber() {
    const method = document.getElementById('method').value;
    const paymentNumberInfo = document.getElementById('paymentNumberInfo');
    const paymentNumber = document.getElementById('paymentNumber');

    if (method === 'bkash') {
      paymentNumber.textContent = '01676110991';
    } else if (method === 'nagad') {
      paymentNumber.textContent = '01676110991';
    } else if (method === 'rocket') {
      paymentNumber.textContent = '019XXXXXXXX';
    }

    paymentNumberInfo.style.display = 'block';
  }

  document.getElementById('paymentForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const senderNumber = document.getElementById('senderNumber').value;
    const totalAmount = document.getElementById('totalAmount').textContent;
    const method = document.getElementById('method').value;
    const transaction = document.getElementById('transaction').value;

    const message = `
      💳 *New Payment Received! World Theme* 💳
      👤 Name: ${name}
      📧 Email: ${email}
      📱 Sender Number: ${senderNumber}
      💵 Total Amount: ${totalAmount} BDT
      💳 Payment Method: ${method}
      🔢 Transaction ID: ${transaction}
    `;

    const botToken = '7530296292:AAFO1a2hXmt45pEl4vAvhXT6bDnEEERqNUA';
    const chatId = '-1002493368052';
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}&parse_mode=Markdown`;

    fetch(telegramUrl)
      .then(response => response.json())
      .then(data => {
        if (data.ok) {
          alert('Payment information sent to Telegram!');
          generatePDF(name, email, senderNumber, totalAmount, method, transaction);
        } else {
          alert('There was an error sending the data.');
        }
      })
      .catch(error => {
        alert('An error occurred while sending the data.');
      });
  });

  function generatePDF(name, email, senderNumber, totalAmount, method, transaction) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header Section - Your Website Name & Theme
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.setTextColor(33, 150, 243); // Blue color for header
    doc.text('SM TEAM WORLD - Premium Theme Purchase Confirmation', 20, 20);
  
    // Subheader Section
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color for subheader
    doc.text('Order Confirmation - Tailored for Excellence', 20, 30);

    // Website Theme Description
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 50); // Dark Grey color for theme description
    doc.text('Unlock the power of modern web design with SM TEAM WORLD. This premium theme is crafted for seamless integration, responsive design, and unparalleled user experience. Perfect for those who want their site to shine and attract users effortlessly.', 20, 40, { maxWidth: 170 });

    // Payment Details Section
    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50); // Dark Grey color for details
    doc.text(`Name: ${name}`, 20, 60);
    doc.text(`Email: ${email}`, 20, 70);
    doc.text(`Sender Number: ${senderNumber}`, 20, 80);
    doc.text(`Total Amount: ${totalAmount} BDT`, 20, 90);
    doc.text(`Payment Method: ${method}`, 20, 100);
    doc.text(`Transaction ID: ${transaction}`, 20, 110);

    // Decorative Lines for Better Layout
    doc.setLineWidth(0.5);
    doc.line(20, 120, 180, 120); // Horizontal line

    // Stylish SM TEAM WORLD Features Section without Bullets or Icons
    doc.setFontSize(12);
    doc.setTextColor(0, 128, 0); // Green color for features title
    doc.text('SM TEAM WORLD Features:', 20, 130);

    doc.setFontSize(11);
    doc.setTextColor(50, 50, 50); // Dark Grey color for features details
    doc.text("Seamlessly responsive design to fit all devices.", 20, 140);
    doc.text("SEO-optimized for faster and higher rankings.", 20, 150);
    doc.text("Customizable layouts for full creative control.", 20, 160);
    doc.text("Blazing fast loading speed ensuring smooth user experience.", 20, 170);
    doc.text("Comprehensive documentation for easy setup and integration.", 20, 180);
    doc.text("Continuous updates and feature improvements to keep your site ahead.", 20, 190);

    // Footer Section with Theme Name & Thank You Message
    doc.setFontSize(12);
    doc.setTextColor(0, 128, 0); // Green color for footer
    doc.text('Thank you for trusting SM TEAM WORLD Theme! Let your website achieve new heights!', 20, 200);

    // Adding stylish Footer with Underline for Theme name
    doc.setFontSize(14);
    doc.setTextColor(33, 150, 243); // Blue color for theme name
    doc.text('SM TEAM WORLD', 20, 210);
    doc.setDrawColor(33, 150, 243); // Blue color for underline
    doc.setLineWidth(1.5);
    doc.line(20, 213, 180, 213); // Underline for theme name

    // Adding signature line with stylish "SM SOYEB"
    doc.setFont('courier', 'italic'); // Change font for signature
    doc.setFontSize(16);
    doc.setTextColor(100, 100, 100); // Light Grey for signature text
    doc.text('_________________________', 20, 220);
    doc.setFontSize(20); // Larger size for signature
    doc.setTextColor(33, 150, 243); // Signature color in blue
    doc.text('SM SOYEB', 20, 225);

    // Adding Order Confirmation Date below Signature
    const orderDate = new Date().toLocaleDateString();
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100); // Light Grey color for order confirmation date
    doc.text(`Order Confirmed on: ${orderDate}`, 20, 235);

    // Auto download PDF after order is confirmed
    doc.save('SM_Team_World_Theme_Confirmation.pdf');
  }
