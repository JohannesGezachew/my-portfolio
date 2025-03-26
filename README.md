# Yohannes Gezachew Portfolio

A modern, interactive portfolio website inspired by Dennis Snellenberg's award-winning design. This portfolio features a clean, minimalist aesthetic with smooth animations, 3D elements, and a responsive layout.

## Features

- Interactive 3D background using Three.js
- Smooth animations and transitions with GSAP
- Custom cursor and interactive elements
- Responsive design that works on all devices
- Multi-language loader animation
- Local time display for Ethiopia (EAT timezone)
- Projects showcase section
- Detailed about section with skills, experience, and education
- Contact section with CTA buttons
- Social media links

## Technologies Used

- HTML5
- CSS3 (with custom properties and animations)
- JavaScript (ES6+)
- Three.js for 3D graphics
- GSAP for animations
- ScrollTrigger for scroll-based animations

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your browser to view the portfolio
3. Modify the content in `index.html` to customize your portfolio information
4. Update styles in `style.css` to match your personal brand
5. Adjust animations and 3D effects in `script.js` as needed

## Customization

### Changing Colors

The color scheme can be easily modified by editing the CSS variables in the `:root` selector in `style.css`:

```css
:root {
    --color-background: #f5f5f5; /* Background color */
    --color-text: #111111; /* Main text color */
    --color-accent: #333333; /* Accent color */
    --color-muted: #777777; /* Secondary text color */
    --color-border: #dddddd; /* Border color */
    /* ... other variables */
}
```

### Updating Content

Edit the HTML in `index.html` to update your personal information, projects, experience, and education details.

### Modifying 3D Elements

The 3D background can be customized in the `initThreeJS()` function in `script.js`. You can change the number of shapes, their colors, sizes, and animation properties.

### Adjusting Animations

Animation timings and effects can be modified in the `initScrollAnimations()` function in `script.js`.

## Browser Compatibility

This portfolio works best in modern browsers like Chrome, Firefox, Safari, and Edge.

## Credits

- Design inspiration: Dennis Snellenberg (https://dennissnellenberg.com)
- Three.js: https://threejs.org
- GSAP: https://greensock.com/gsap
- Font: Inter (Google Fonts)

## License

Feel free to use and modify this portfolio for your personal use.

---

© 2024 Yohannes Gezachew 