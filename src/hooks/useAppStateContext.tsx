import { useContext } from 'react';
import { AppStateContext } from '../components/AppStateProvider';

export default function useAppStateContext() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppStateContext must be used within a AppStateProvider');
  }
  return context;
}

