class TestimonialWidget {
    constructor(containerId) {
      this.container = document.getElementById(containerId);
      this.renderTestimonial();
    }
  
    renderTestimonial() {
      const data = {
        text: "This service is amazing! Highly recommend to everyone.",
        author: "John Doe"
      };
  
      this.container.innerHTML = `
        <div class="testimonial-box">
          <p class="testimonial-text">"${data.text}"</p>
          <p class="testimonial-author">- ${data.author}</p>
        </div>
      `;
  
      // Add CSS styles
      const style = document.createElement("style");
      style.innerHTML = `
        .testimonial-box {
          border: 1px solid #ddd;
          padding: 15px;
          max-width: 300px;
          border-radius: 8px;
          background: #f9f9f9;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
          font-family: Arial, sans-serif;
        }
        .testimonial-text {
          font-style: italic;
          color: #333;
        }
        .testimonial-author {
          font-weight: bold;
          text-align: right;
          margin-top: 10px;
          color: #555;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Initialize widget
  (function () {
    new TestimonialWidget("testimonial-widget");
  })();