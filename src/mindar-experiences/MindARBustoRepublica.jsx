import React from 'react';

function MindARBustoRepublica() {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <iframe
        src="/MindARBusto.html"
        style={{ width: '100%', height: '100%', border: 'none' }}
        title="Busto AR Face Tracking"
        allow="camera; microphone"
      ></iframe>
    </div>
  );
}

export default MindARBustoRepublica;