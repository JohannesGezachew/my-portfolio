# Yohannes Gezachew - Portfolio

My personal portfolio website showcasing projects, skills, and experience. Built with HTML, CSS, JavaScript, Three.js, and GSAP.

## Technologies Used

*   **Frontend:** HTML5, CSS3, JavaScript (ES6+)
*   **Libraries:** Three.js (for 3D), GSAP (for animations)
*   **Backend (Contact Form):** Node.js, Nodemailer (via Vercel Serverless Function)
*   **Deployment:** Vercel

## Getting Started Locally

To run the complete site locally, including the contact form functionality:

**Prerequisites:**
*   Node.js and npm (or yarn) installed.
*   Vercel CLI installed (`npm install -g vercel`).

**Steps:**
1.  Clone the repository:
    ```bash
    git clone https://github.com/JohannesGezachew/your-repo-name.git
    ```
    *(Replace `your-repo-name`)*
2.  Navigate into the directory:
    ```bash
    cd your-repo-name
    ```
3.  Install backend dependencies:
    ```bash
    npm install
    ```
4.  Run the Vercel development server:
    ```bash
    vercel dev
    ```
5.  Open your browser and navigate to `http://localhost:3000` (or the URL provided by the `vercel dev` command).

*(**Note:** For the contact form to actually *send emails* when running locally, you must configure your SMTP environment variables. Create a `.env.development.local` file in the root directory with your `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASSWORD`.)*

## Credits

- Three.js: https://threejs.org
- GSAP: https://greensock.com/gsap
- Font: Inter (Google Fonts)

## License

Feel free to use and modify this portfolio for your personal use.

---

© 2025 Yohannes Gezachew 