import React, { useState } from 'react';
import { Send, User, Phone, Hash } from 'lucide-react';
import Loader from './Loader';
import { validateForm } from '../utils/validators';
import { sendToTelegram } from '../services/telegramService';

export default function Form({ onSuccess }) {
  const [formData, setFormData] = useState({
    phone: '',
    fullName: '',
    inn: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const numbers = value.replace(/\D/g, '');
      let formatted = '';
      
      if (numbers.length > 0) {
        formatted = '+' + numbers.substring(0, 1);
        if (numbers.length > 1) {
          formatted += ' (' + numbers.substring(1, 4);
        }
        if (numbers.length >= 4) {
          formatted += ') ' + numbers.substring(4, 7);
        }
        if (numbers.length >= 7) {
          formatted += '-' + numbers.substring(7, 9);
        }
        if (numbers.length >= 9) {
          formatted += '-' + numbers.substring(9, 11);
        }
      }
      
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else if (name === 'inn') {
      const numbers = value.replace(/\D/g, '').substring(0, 12);
      setFormData(prev => ({ ...prev, [name]: numbers }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    setError('');
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async () => {
    const validation = validateForm(formData);
    
    if (!validation.isValid) {
      setError(validation.error);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await sendToTelegram(formData);
      onSuccess();
    } catch (err) {
      setError('Произошла ошибка при отправке. Попробуйте еще раз.');
      console.error('Error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return <Loader />;
  }

  const getFieldError = (field) => {
    if (!touched[field]) return '';
    
    if (field === 'fullName' && !formData.fullName.trim()) {
      return 'Обязательное поле';
    }
    if (field === 'phone' && formData.phone.replace(/\D/g, '').length > 0 && formData.phone.replace(/\D/g, '').length < 11) {
      return 'Некорректный номер';
    }
    if (field === 'inn' && formData.inn.length > 0 && formData.inn.length < 10) {
      return 'Минимум 10 цифр';
    }
    return '';
  };

  return (
    <div className="space-y-6">
      {/* Full Name */}
      <div className="space-y-2">
        <label htmlFor="fullName" className="block text-sm font-semibold text-gray-300 ml-1">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-purple-400" />
            <span>ФИО</span>
            <span className="text-pink-400">*</span>
          </div>
        </label>
        <div className="relative group">
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            onBlur={() => handleBlur('fullName')}
            placeholder="Иванов Иван Иванович"
            className="w-full px-6 py-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 group-hover:border-slate-600"
            disabled={isSubmitting}
          />
          {getFieldError('fullName') && (
            <p className="text-red-400 text-xs mt-1 ml-1">{getFieldError('fullName')}</p>
          )}
        </div>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label htmlFor="phone" className="block text-sm font-semibold text-gray-300 ml-1">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-purple-400" />
            <span>Номер телефона</span>
            <span className="text-pink-400">*</span>
          </div>
        </label>
        <div className="relative group">
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={() => handleBlur('phone')}
            placeholder="+7 (___) ___-__-__"
            className="w-full px-6 py-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 group-hover:border-slate-600"
            disabled={isSubmitting}
          />
          {getFieldError('phone') && (
            <p className="text-red-400 text-xs mt-1 ml-1">{getFieldError('phone')}</p>
          )}
        </div>
      </div>

      {/* INN */}
      <div className="space-y-2">
        <label htmlFor="inn" className="block text-sm font-semibold text-gray-300 ml-1">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-purple-400" />
            <span>ИНН</span>
            <span className="text-pink-400">*</span>
          </div>
        </label>
        <div className="relative group">
          <input
            type="text"
            id="inn"
            name="inn"
            value={formData.inn}
            onChange={handleChange}
            onBlur={() => handleBlur('inn')}
            placeholder="1234567890"
            maxLength="12"
            className="w-full px-6 py-4 bg-slate-800/50 border-2 border-slate-700 rounded-xl text-white placeholder-gray-500 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 group-hover:border-slate-600"
            disabled={isSubmitting}
          />
          {getFieldError('inn') && (
            <p className="text-red-400 text-xs mt-1 ml-1">{getFieldError('inn')}</p>
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-500/10 border-2 border-red-500/20 text-red-400 px-6 py-4 rounded-xl text-center font-medium backdrop-blur-sm">
          {error}
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full relative group overflow-hidden bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-5 px-8 rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        <div className="relative flex items-center justify-center gap-3 text-lg">
          <Send className="w-6 h-6" />
          <span>Отправить заявку</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>
      </button>

      <p className="text-center text-gray-500 text-xs">
        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
      </p>
    </div>
  );
}