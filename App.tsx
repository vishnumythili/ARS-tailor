import React, { useState, useEffect } from 'react';
import { LayoutDashboard, PlusCircle, List, Sparkles, Menu, X } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { OrderForm } from './components/OrderForm';
import { OrderList } from './components/OrderList';
import { StyleAssistant } from './components/StyleAssistant';
import { Order, OrderStatus } from './types';
import { MOCK_ORDERS } from './constants';

type View = 'dashboard' | 'new-order' | 'orders' | 'assistant';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  
  // Load orders from localStorage or fallback to MOCK_ORDERS
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('darji_orders');
      return saved ? JSON.parse(saved) : MOCK_ORDERS;
    } catch (e) {
      console.error("Failed to load orders", e);
      return MOCK_ORDERS;
    }
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Save orders whenever they change
  useEffect(() => {
    localStorage.setItem('darji_orders', JSON.stringify(orders));
  }, [orders]);

  const handleCreateOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setCurrentView('orders');
  };

  const handleStatusUpdate = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  const NavButton = ({ view, icon: Icon, label }: { view: View; icon: any; label: string }) => (
    <button
      onClick={() => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }}
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors ${
        currentView === view 
          ? 'bg-brand-600 text-white shadow-md' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      
      {/* Sidebar (Desktop) */}
      <div className="hidden md:flex flex-col w-64 bg-slate-900 text-white p-4">
        <div className="flex items-center gap-2 px-2 mb-10 mt-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center font-bold text-white text-xl">D</div>
            <h1 className="text-xl font-bold tracking-tight">Darji Master</h1>
        </div>
        
        <nav className="space-y-2 flex-1">
          <NavButton view="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavButton view="new-order" icon={PlusCircle} label="New Order" />
          <NavButton view="orders" icon={List} label="Order List" />
          <NavButton view="assistant" icon={Sparkles} label="Style AI" />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-800">
            <div className="px-4 py-2 bg-slate-800 rounded-lg">
                <p className="text-xs text-slate-400">Premium Plan</p>
                <p className="text-sm font-medium">Valid till Dec 2024</p>
            </div>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-900 text-white z-50 h-16 flex items-center justify-between px-4 shadow-md">
         <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center font-bold text-white">D</div>
            <h1 className="text-lg font-bold">Darji Master</h1>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-900 z-40 pt-20 px-4 space-y-3 md:hidden">
             <NavButton view="dashboard" icon={LayoutDashboard} label="Dashboard" />
             <NavButton view="new-order" icon={PlusCircle} label="New Order" />
             <NavButton view="orders" icon={List} label="Order List" />
             <NavButton view="assistant" icon={Sparkles} label="Style AI" />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-20 md:pt-0 pb-20 md:pb-0">
        <div className="max-w-5xl mx-auto p-4 md:p-8">
          
          {/* Header for View */}
          <div className="mb-6 flex justify-between items-end">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 capitalize">
                    {currentView.replace('-', ' ')}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                    {currentView === 'dashboard' && 'Overview of your tailoring business'}
                    {currentView === 'new-order' && 'Take measurements and create bookings'}
                    {currentView === 'orders' && 'Manage production flow'}
                    {currentView === 'assistant' && 'AI-powered fashion advice'}
                </p>
            </div>
          </div>

          {/* Views */}
          {currentView === 'dashboard' && <Dashboard orders={orders} />}
          
          {currentView === 'new-order' && (
            <OrderForm 
                onSubmit={handleCreateOrder} 
                onCancel={() => setCurrentView('dashboard')} 
            />
          )}
          
          {currentView === 'orders' && (
            <OrderList orders={orders} onStatusUpdate={handleStatusUpdate} />
          )}

          {currentView === 'assistant' && <StyleAssistant />}
        </div>
      </main>
      
      {/* Mobile Bottom Fab (Quick Action) */}
      <div className="md:hidden fixed bottom-6 right-6 z-30">
        {currentView !== 'new-order' && (
            <button 
                onClick={() => setCurrentView('new-order')}
                className="bg-brand-600 text-white p-4 rounded-full shadow-lg hover:bg-brand-700 active:scale-95 transition-transform"
            >
                <PlusCircle className="w-6 h-6" />
            </button>
        )}
      </div>
    </div>
  );
}