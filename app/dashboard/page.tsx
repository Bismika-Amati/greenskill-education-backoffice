'use client';

import { Button } from 'antd';
import React from 'react';

export default () => {
  return (
    <>
      <div style={{ padding: 24, textAlign: 'center' }}>
        <Button type="primary">ascac</Button>
        <p>long content</p>
        {
          // indicates very long content
          Array.from({ length: 100 }, (_, index) => (
            <React.Fragment key={index}>
              {index % 20 === 0 && index ? 'more' : '...'}
              <br />
            </React.Fragment>
          ))
        }
      </div>
    </>
  );
};
