import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <div className="ftw">
        <span className="ftlogo">
          <span className="ftdot" />
          CADON
        </span>
        <div className="ftlinks">
          <Link href="#product">Product</Link>
          <Link href="#">Docs</Link>
          <Link href="#security">Security</Link>
          <Link href="#privacy">Privacy</Link>
          <Link href="#contact">Contact</Link>
        </div>
        <span className="ftcopy">
          © {new Date().getFullYear()} CADON. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
