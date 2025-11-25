import React, { useState } from 'react';
import { getStyleSuggestion } from '../services/geminiService';
import { Sparkles, Loader2 } from 'lucide-react';

export const StyleAssistant: React.FC = () => {
  const [eventType, setEventType] = useState('Wedding');
  const [season, setSeason] = useState('Winter');
  const [pref, setPref] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAskAI = async () => {
    setLoading(true);
    const result = await getStyleSuggestion(eventType, season, pref);
    setSuggestion(result);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-brand-100 overflow-hidden">
      <div className="bg-gradient-to-r from-brand-800 to-brand-600 p-6 text-white">
        <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-300" />
            <h2 className="text-xl font-bold">Darji AI Stylist</h2>
        </div>
        <p className="text-brand-100 mt-2 text-sm">Get instant outfit recommendations for your customers.</p>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Occasion</label>
                <select 
                    value={eventType} 
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                >
                    <option>Wedding</option>
                    <option>Reception</option>
                    <option>Sangeet</option>
                    <option>Formal Meeting</option>
                    <option>Casual Party</option>
                    <option>Festival</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Season</label>
                <select 
                    value={season} 
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                >
                    <option>Summer</option>
                    <option>Winter</option>
                    <option>Monsoon</option>
                    <option>Spring</option>
                </select>
            </div>
        </div>

        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Customer Preferences (Optional)</label>
            <input 
                type="text"
                value={pref}
                onChange={(e) => setPref(e.target.value)}
                placeholder="Likes dark colors, dislikes floral..."
                className="w-full p-2 border rounded-lg"
            />
        </div>

        <button
            onClick={handleAskAI}
            disabled={loading}
            className="w-full py-3 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-700 transition-colors flex items-center justify-center gap-2"
        >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Sparkles className="w-4 h-4" /> Generate Style</>}
        </button>

        {suggestion && (
            <div className="mt-6 p-4 bg-brand-50 rounded-xl border border-brand-100 animate-in fade-in slide-in-from-bottom-4">
                <h3 className="font-bold text-brand-900 mb-2">Suggestion:</h3>
                <div className="prose prose-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {suggestion}
                </div>
            </div>
        )}
      </div>
    </div>
  );
};