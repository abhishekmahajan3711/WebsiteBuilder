import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-gradient-to-r from-purple-600 via-teal-400 to-purple-400 text-white mt-16">
    <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* About Us */}
      <div id="about">
        <h3 className="text-lg font-bold mb-2">About Us</h3>
        <p className="text-sm mb-3">Created by <span className="font-semibold">Abhishek Mahajan</span>. Passionate about empowering everyone to build beautiful websites easily.</p>
        <div className="flex space-x-4 mt-2">
          <a href="https://x.com/mahajan_abhiM" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-teal-100"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z"/></svg></a>
          <a href="https://www.linkedin.com/in/abhishek-mahajan-8a5a91252" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-teal-100"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.79-1.75-1.75s.784-1.75 1.75-1.75 1.75.79 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg></a>
          <a href="https://github.com/abhishekmahajan3711" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-teal-100"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.371.823 1.102.823 2.222 0 1.606-.015 2.898-.015 3.293 0 .322.216.694.825.576C20.565 21.796 24 17.299 24 12c0-6.627-5.373-12-12-12z"/></svg></a>
          <a href="https://www.instagram.com/abhishekmahajan3000" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-teal-100"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.359 2.374 3.532 2.315 4.809 2.256 6.089 2.243 6.498 2.243 12c0 5.502.013 5.911.072 7.191.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32 1.28.059 1.689.072 7.191.072s5.911-.013 7.191-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-7.191s-.013-5.911-.072-7.191c-.059-1.277-.353-2.45-1.32-3.417C19.45.425 18.277.131 17 .072 15.721.013 15.311 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg></a>
          <a href="mailto:abhishekmahajan3711@gmail.com" aria-label="Email" className="hover:text-teal-100"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 13.065l-11.99-7.065v14h24v-14l-12.01 7.065zm11.99-9.065h-23.98l11.99 7.065 11.99-7.065z"/></svg></a>
        </div>
      </div>
      {/* Contact Us */}
      <div id="contact">
        <h3 className="text-lg font-bold mb-2">Contact Us</h3>
        <p className="text-sm">Phone: <a href="tel:8080142710" className="underline hover:text-teal-100">8080142710</a></p>
        <p className="text-sm">Email: <a href="mailto:abhishekmahajan3711@gmail.com" className="underline hover:text-teal-100">abhishekmahajan3711@gmail.com</a></p>
      </div>
      {/* Footer Links */}
      <div className="flex flex-col items-start md:items-end justify-between">
        <div className="space-x-6 mb-4 md:mb-0">
          <a href="#features" className="hover:text-teal-100">Features</a>
          <a href="#pricing" className="hover:text-teal-100">Pricing</a>
          <Link to="/about" className="hover:text-teal-100">About Us</Link>
          <Link to="/contact" className="hover:text-teal-100">Contact Us</Link>
          <Link to="/faq" className="hover:text-teal-100">FAQ</Link>
        </div>
        <div className="flex flex-col space-y-2 mt-4 md:mt-0">
          <div className="flex space-x-4 text-sm">
            <Link to="/terms" className="hover:text-teal-100">Terms & Conditions</Link>
            <Link to="/privacy" className="hover:text-teal-100">Privacy Policy</Link>
          </div>
          <div className="text-sm text-white/80">&copy; {new Date().getFullYear()} WebBuilder. All rights reserved.</div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
