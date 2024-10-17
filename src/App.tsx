import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { ThemeProvider } from './context/ThemeContext';
import TreeView from './components/Tree/TreeView';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <TreeView />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
