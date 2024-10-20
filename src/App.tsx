import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { useTheme } from './context/ThemeContext';
import TreeView from './components/Tree/TreeView';
import './App.css'
import Toggle from './components/ThemeToggle/Toggle';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const { theme } = useTheme();

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div className={`app ${theme}`}>
          <header>
            {/* otherwise this would have been in a Header component with proper pages and routing. but we will have to do for now */}
            <Toggle />
          </header>
          <TreeView />
        </div>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
