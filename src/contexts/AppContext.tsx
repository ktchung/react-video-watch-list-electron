import { createContext, type FC, type ReactNode, useState, useEffect } from 'react';
import { setInstanceBaseUrl } from '../api';
import SetUrlPrompt from '../components/SetUrlPrompt';
import { API_BASE_URL_KEY } from '../constants/saveConstants';

interface IAppContext {
  showForm: boolean;
  setShowForm: (showForm: boolean) => void;

  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;

  editingItem: string | null;
  setEditingItem: (editingItem: string | null) => void;

  showRemovePrompt: boolean;
  setShowRemovePrompt: (showRemovePrompt: boolean) => void;

  removingItem: string | null;
  setRemovingItem: (removingItem: string | null) => void;
}

const defaultValues = {
  showForm: false,
  isEditing: false,
  editingItem: null,
  removingItem: null
} as unknown as IAppContext;

export const AppContext = createContext(defaultValues);

interface Props {
  children: ReactNode;
}

export const AppContextProvider: FC<Props> = ({ children }) => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [showRemovePrompt, setShowRemovePrompt] = useState(false);
  const [removingItem, setRemovingItem] = useState<string | null>(null);
  const [showSetUrlPrompt, setShowSetUrlPrompt] = useState(false);

  useEffect(() => {
    if (editingItem) {
      setShowForm(true);
    }
  }, [editingItem]);

  useEffect(() => {
    if (removingItem) {
      setShowRemovePrompt(true);
    }
  }, [removingItem]);

  /** Return values in context */
  const contextValues = {
    showForm,
    setShowForm,
    isEditing,
    setIsEditing,
    editingItem,
    setEditingItem,
    showRemovePrompt,
    setShowRemovePrompt,
    removingItem,
    setRemovingItem
  };

  /** Base URL setup */
  useEffect(() => {
    const storedUrl = localStorage.getItem(API_BASE_URL_KEY);

    if (storedUrl) {
      // Update axios instance base URL if stored in saved previously
      setInstanceBaseUrl(storedUrl);
    } else {
      // Prompt user to enter base URL
      setShowSetUrlPrompt(true);
    }
  }, []);

  return (
    <AppContext.Provider value={contextValues}>
      {children}
      <SetUrlPrompt
        open={showSetUrlPrompt}
        onClose={() => { setShowSetUrlPrompt(false); }}
      />
    </AppContext.Provider>
  );
};
