import React from 'react';
import { Order, OrderStatus } from '../types';
import { Scissors, CheckCircle2, Clock, ChevronRight } from 'lucide-react';

interface OrderListProps {
  orders: Order[];
  onStatusUpdate: (orderId: string, newStatus: OrderStatus) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, onStatusUpdate }) => {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.MEASURED: return 'bg-gray-100 text-gray-600';
      case OrderStatus.CUTTING: return 'bg-yellow-100 text-yellow-700';
      case OrderStatus.STITCHING: return 'bg-blue-100 text-blue-700';
      case OrderStatus.FINISHING: return 'bg-purple-100 text-purple-700';
      case OrderStatus.READY: return 'bg-green-100 text-green-700';
      case OrderStatus.DELIVERED: return 'bg-gray-900 text-white';
      default: return 'bg-gray-100';
    }
  };

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:shadow-md">
          
          {/* Left Section: Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start md:block">
                <div>
                    <h3 className="font-bold text-gray-900">{order.customerName}</h3>
                    <p className="text-sm text-gray-500">{order.mobile}</p>
                </div>
                <span className={`md:hidden px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                </span>
            </div>
            
            <div className="mt-3 flex flex-wrap gap-3 text-sm">
              <span className="flex items-center text-gray-600 bg-gray-50 px-2 py-1 rounded border">
                <Scissors className="w-3 h-3 mr-1" /> {order.dressType}
              </span>
              <span className="flex items-center text-gray-600 bg-gray-50 px-2 py-1 rounded border">
                <Clock className="w-3 h-3 mr-1" /> Due: {new Date(order.deliveryDate).toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Middle Section: Payment */}
          <div className="flex-shrink-0 md:w-40">
             <div className="text-right md:text-left">
                <p className="text-xs text-gray-500">Payment</p>
                <div className="font-medium">
                    <span className={order.amountPaid >= order.amountTotal ? "text-green-600" : "text-orange-600"}>
                        ₹{order.amountPaid}
                    </span>
                    <span className="text-gray-400"> / ₹{order.amountTotal}</span>
                </div>
                <p className="text-xs text-gray-400">{order.paymentMethod}</p>
             </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex flex-col gap-2 md:w-48">
             <select 
                value={order.status}
                onChange={(e) => onStatusUpdate(order.id, e.target.value as OrderStatus)}
                className={`w-full text-sm p-2 rounded-lg border-none font-medium outline-none cursor-pointer ${getStatusColor(order.status)}`}
             >
                {Object.values(OrderStatus).map(s => (
                    <option key={s} value={s}>{s}</option>
                ))}
             </select>
             <button className="w-full flex items-center justify-center text-sm text-brand-600 border border-brand-100 rounded-lg py-2 hover:bg-brand-50">
                View Details <ChevronRight className="w-4 h-4 ml-1" />
             </button>
          </div>
        </div>
      ))}
      
      {orders.length === 0 && (
        <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-dashed">
            <p>No orders found.</p>
        </div>
      )}
    </div>
  );
};