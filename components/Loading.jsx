// LoadingScreen.js
import React from 'react';
import { Spin } from 'antd';

const LoadingScreen = () => (
  <div className="loading-screen">
    <Spin size="large" tip="Loading..." />
  </div>
);

export default LoadingScreen;
