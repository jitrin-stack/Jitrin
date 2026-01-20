
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { ManualVerification } from './components/ManualVerification';
import { ApiManagement } from './components/ApiManagement';
import { ViewState } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('Verification');

  return (
    <Layout activeView={activeView} setView={setActiveView}>
      {activeView === 'Verification' ? (
        <ManualVerification />
      ) : (
        <ApiManagement />
      )}
    </Layout>
  );
};

export default App;
