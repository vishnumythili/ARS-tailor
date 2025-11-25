import React, { useState } from 'react';
import { DressType, Order, OrderStatus, PaymentMethod, Measurements } from '../types';
import { DRESS_TYPES, REQUIRED_MEASUREMENTS, PAYMENT_METHODS } from '../constants';
import { Ruler, Calendar, User, Phone, Image as ImageIcon, IndianRupee, X as XIcon } from 'lucide-react';

interface OrderFormProps {
  onSubmit: (order: Order) => void;
  onCancel: () => void;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, onCancel }) => {
  const [step, setStep] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [mobile, setMobile] = useState('');
  const [dressType, setDressType] = useState<DressType>(DressType.SHIRT);
  const [measurements, setMeasurements] = useState<Measurements>({});
  const [deliveryDate, setDeliveryDate] = useState('');
  const [amountTotal, setAmountTotal] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.CASH);
  const [materialNotes, setMaterialNotes] = useState('');
  const [materialImage, setMaterialImage] = useState<string | undefined>(undefined);
  
  const handleMeasurementChange = (key: keyof Measurements, value: string) => {
    setMeasurements(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMaterialImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrder: Order = {
      id: `ORD-${Date.now().toString().slice(-6)}`,
      customerId: `CUST-${Date.now().toString().slice(-4)}`,
      customerName,
      mobile,
      dressType,
      measurements,
      orderDate: new Date().toISOString(),
      deliveryDate,
      status: OrderStatus.MEASURED,
      amountTotal: parseFloat(amountTotal) || 0,
      amountPaid: parseFloat(amountPaid) || 0,
      paymentMethod,
      trackingToken: Math.random().toString(36).substring(7),
      materialNotes,
      materialImage
    };
    onSubmit(newOrder);
  };

  const renderMeasurements = () => {
    const fields = REQUIRED_MEASUREMENTS[dressType];
    return (
      <div className="grid grid-cols-2 gap-4">
        {fields.map(field => (
          <div key={field} className="space-y-1">
            <label className="text-xs font-semibold uppercase text-gray-500">
              {field.replace(/([A-Z])/g, ' $1').trim()} (in)
            </label>
            <div className="relative">
                <input
                    type="number"
                    step="0.1"
                    className="w-full p-2 pl-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                    placeholder="0.0"
                    onChange={(e) => handleMeasurementChange(field as keyof Measurements, e.target.value)}
                />
                <span className="absolute right-3 top-2 text-gray-400 text-sm">"</span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden flex flex-col h-full max-h-[85vh]">
      <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900">New Order</h2>
        <span className="text-sm text-gray-500">Step {step} of 3</span>
      </div>

      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h3 className="text-md font-medium text-brand-600 flex items-center gap-2">
                <User className="w-4 h-4" /> Customer Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                  placeholder="e.g. Amit Kumar"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                    <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={e => setMobile(e.target.value)}
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                    placeholder="98765 43210"
                    />
                </div>
              </div>
            </div>

            <h3 className="text-md font-medium text-brand-600 flex items-center gap-2 pt-4">
                <Ruler className="w-4 h-4" /> Select Garment
            </h3>
            <div className="grid grid-cols-2 gap-3">
                {DRESS_TYPES.map((dt) => (
                    <button
                        key={dt.id}
                        type="button"
                        onClick={() => setDressType(dt.id)}
                        className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all ${
                            dressType === dt.id 
                            ? 'border-brand-600 bg-brand-50 text-brand-700 font-medium ring-1 ring-brand-600' 
                            : 'border-gray-200 hover:border-gray-300 text-gray-600'
                        }`}
                    >
                        <dt.icon className="w-6 h-6" />
                        <span className="text-sm">{dt.label}</span>
                    </button>
                ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h3 className="text-md font-medium text-brand-600 flex items-center gap-2">
                <Ruler className="w-4 h-4" /> Measurements ({dressType})
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                {renderMeasurements()}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Material Sample & Notes</label>
                
                {!materialImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                      <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Click to upload or take photo of fabric</span>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden border border-gray-200 h-40 w-full">
                    <img src={materialImage} alt="Material" className="w-full h-full object-cover" />
                    <button 
                      type="button"
                      onClick={() => setMaterialImage(undefined)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <textarea
                    rows={3}
                    value={materialNotes}
                    onChange={e => setMaterialNotes(e.target.value)}
                    placeholder="E.g., Double cuff, chinese collar, gold buttons..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-brand-500 focus:border-brand-500 mt-2"
                />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
             <h3 className="text-md font-medium text-brand-600 flex items-center gap-2">
                <IndianRupee className="w-4 h-4" /> Payment & Delivery
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
                    <input
                        type="number"
                        required
                        value={amountTotal}
                        onChange={e => setAmountTotal(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="₹"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Advance Paid</label>
                    <input
                        type="number"
                        value={amountPaid}
                        onChange={e => setAmountPaid(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="₹"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                <div className="flex flex-wrap gap-2">
                    {PAYMENT_METHODS.map(method => (
                        <button
                            key={method}
                            type="button"
                            onClick={() => setPaymentMethod(method)}
                            className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                                paymentMethod === method
                                ? 'bg-brand-600 text-white border-brand-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            {method}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                <div className="relative">
                    <Calendar className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
                    <input
                        type="date"
                        required
                        value={deliveryDate}
                        onChange={e => setDeliveryDate(e.target.value)}
                        className="w-full p-3 pl-10 border border-gray-300 rounded-lg"
                    />
                </div>
            </div>
          </div>
        )}
      </form>

      <div className="p-4 border-t bg-gray-50 flex justify-between">
        {step > 1 ? (
            <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
            >
                Back
            </button>
        ) : (
            <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 font-medium"
            >
                Cancel
            </button>
        )}
        
        {step < 3 ? (
             <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-medium"
            >
                Next
            </button>
        ) : (
            <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
                Create Order
            </button>
        )}
      </div>
    </div>
  );
};