import React from 'react';
import Navbar from '../organisms/Navbar';

const DashboardContainer: React.FC = ({ children }) => (
  <>
    <Navbar />
    { children }
  </>
);

export default DashboardContainer;
