import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { useTheme } from './context/ThemeContext';
import TreeView from './components/Tree/TreeView';
import './App.css'
import ThemeToggle from './components/Theme/ThemeToggle';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <Provider store={store}>
      <div className={`app ${theme}`}>
        <header>
          <ThemeToggle />
          <TreeView />
        </header>
      </div>
    </Provider>
  );
};

export default App;
