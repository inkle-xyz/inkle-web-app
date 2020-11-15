import React from 'react';
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'
import LiveEdit from '../organisms/LiveEdit';

const HomePage: React.FC = () => (
  <>
    <h1>Home</h1>

    <LiveEdit/>
  </>
);

export default HomePage;
