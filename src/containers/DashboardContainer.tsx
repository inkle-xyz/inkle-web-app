import React from 'react';
import Navbar from '../organisms/Navbar';

const DashboardContainer: React.FC = ({ children }) => (
  <>
    { children
      ? (
        <>
          { children }
        </>
      ) : <div />}
  </>
);

export default DashboardContainer;
