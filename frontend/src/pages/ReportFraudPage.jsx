import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ReportForm from "../components/ReportForm";

const ReportFraudPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = (isOpen) => {
    setIsMobileMenuOpen(isOpen);
  };

  return (
    <>
      <Navbar onMenuToggle={handleMenuToggle} />
      <Sidebar isMobileMenuOpen={isMobileMenuOpen}>
        <ReportForm />
      </Sidebar>
    </>
  );
};

export default ReportFraudPage;
