import React from 'react';
import { ReactPwa } from 'react-pwa-app';

export default function ProgressiveWebApp(props) {
  return (
    <ReactPwa
      test
      config={{
        swUrl: '/service-worker.js',
        onError: () => {
          console.log('erro ao instalar sw');
        },
        onSuccess: () => {
          console.log('service worker instalado');
        },
        onUpdate: () => {
          // eslint-disable-next-line no-alert
          alert('Feche o aplicativo e abra novamente para instalar atualizações');
          window.close();
        },
      }}
      {...props}
    />
  );
}
