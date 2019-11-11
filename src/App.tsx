import React from 'react';
import './App.css';
import { AppHeader, MainInfo } from './components';
import { CollapsableSegment } from './components';
import { Divider } from 'semantic-ui-react';

const App: React.FC = () => {
  return (
    <div className='App'>
      <AppHeader />
      <CollapsableSegment basic title='Character Information' titleColor='red'>
        <Divider hidden />
        <MainInfo />
      </CollapsableSegment>
    </div>
  );
};

export default App;
