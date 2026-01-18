import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import AlertsFeed from "../components/AlertsFeed";

const AlertsPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = (isOpen) => {
    setIsMobileMenuOpen(isOpen);
  };

  return (
    <>
      <Navbar onMenuToggle={handleMenuToggle} />
      <Sidebar isMobileMenuOpen={isMobileMenuOpen}>
        <AlertsFeed />
      </Sidebar>
    </>
  );
};

export default AlertsPage;
