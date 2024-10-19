import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { useTheme } from './context/ThemeContext';
import TreeView from './components/Tree/TreeView';
import './App.css'
import Toggle from './components/ThemeToggle/Toggle';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Provider store={store}>
      <div className={`app ${theme}`}>
        <header>
          <Toggle />
          <TreeView />
        </header>
      </div>
    </Provider>
  );
};

export default App;
