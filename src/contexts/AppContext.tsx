import { createContext, type FC, type ReactNode, useState, useEffect } from 'react';

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

  return (
    <AppContext.Provider value={contextValues}>
      {children}
    </AppContext.Provider>
  );
};
