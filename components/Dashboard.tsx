import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Order, OrderStatus } from '../types';
import { CreditCard, Scissors, ShoppingBag } from 'lucide-react';

interface DashboardProps {
  orders: Order[];
}

export const Dashboard: React.FC<DashboardProps> = ({ orders }) => {
  const stats = {
    totalOrders: orders.length,
    pendingRevenue: orders.reduce((acc, o) => acc + (o.amountTotal - o.amountPaid), 0),
    activeOrders: orders.filter(o => o.status !== OrderStatus.DELIVERED).length
  };

  // Prepare chart data: Orders by Status
  const statusData = Object.values(OrderStatus).map(status => ({
    name: status,
    count: orders.filter(o => o.status === status).length
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Active Orders</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.activeOrders}</h3>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Scissors className="w-6 h-6 text-brand-600" />
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Payment</p>
            <h3 className="text-2xl font-bold text-gray-900">₹{stats.pendingRevenue.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-red-50 rounded-full">
            <CreditCard className="w-6 h-6 text-red-600" />
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders}</h3>
          </div>
          <div className="p-3 bg-green-50 rounded-full">
            <ShoppingBag className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-[400px]">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Progress</h3>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="count" fill="#0284c7" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="bg-gradient-to-r from-brand-900 to-brand-600 text-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold">Shop Status</h3>
        <p className="opacity-90 mt-1">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        <div className="mt-4 flex gap-3">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                Deliveries Due: {orders.filter(o => new Date(o.deliveryDate) <= new Date() && o.status !== OrderStatus.DELIVERED).length}
            </span>
        </div>
      </div>
    </div>
  );
};