import { useState, useEffect } from 'react';
import { getDynamicText } from '../services/storageService';

export default function useDynamicText() {
  const [dynamicText, setDynamicText] = useState('Добро пожаловать! Заполните форму ниже для отправки заявки.');
  const [isLoading, setIsLoading] = useState(true);

  const loadText = async () => {
    try {
      const text = await getDynamicText();
      setDynamicText(text);
    } catch (error) {
      console.error('Error loading dynamic text:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadText();
    
    // Poll for updates every 10 seconds
    const interval = setInterval(loadText, 10000);
    
    return () => clearInterval(interval);
  }, []);

  return { dynamicText, isLoading, refresh: loadText };
}