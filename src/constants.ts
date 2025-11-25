import { DressType, OrderStatus, PaymentMethod } from './types';
import { 
  Shirt, 
  Ruler, 
  User
} from 'lucide-react';

export const DRESS_TYPES = [
  { id: DressType.SHIRT, label: 'Formal Shirt', icon: Shirt },
  { id: DressType.PANT, label: 'Formal Pant', icon: Ruler },
  { id: DressType.KURTA, label: 'Traditional Kurta', icon: User },
  { id: DressType.SHERWANI, label: 'Wedding Sherwani', icon: User },
  { id: DressType.SUIT, label: '3-Piece Suit', icon: User },
  { id: DressType.PAJAMA, label: 'Pajama / Churidar', icon: Ruler },
];

export const STATUS_FLOW = [
  OrderStatus.MEASURED,
  OrderStatus.CUTTING,
  OrderStatus.STITCHING,
  OrderStatus.FINISHING,
  OrderStatus.READY,
  OrderStatus.DELIVERED,
];

export const PAYMENT_METHODS = [
  PaymentMethod.CASH,
  PaymentMethod.CREDIT_CARD,
  PaymentMethod.DEBIT_CARD,
  PaymentMethod.UPI
];

export const REQUIRED_MEASUREMENTS: Record<DressType, string[]> = {
  [DressType.SHIRT]: ['neck', 'shoulder', 'chest', 'waist', 'sleeveLength', 'shirtLength', 'cuff', 'biceps'],
  [DressType.PANT]: ['waist', 'hips', 'pantLength', 'inseam', 'thigh', 'cuff'],
  [DressType.KURTA]: ['neck', 'shoulder', 'chest', 'waist', 'sleeveLength', 'shirtLength'],
  [DressType.SHERWANI]: ['neck', 'shoulder', 'chest', 'waist', 'hips', 'sleeveLength', 'shirtLength'],
  [DressType.SUIT]: ['neck', 'shoulder', 'chest', 'waist', 'hips', 'sleeveLength', 'shirtLength', 'pantLength', 'inseam'],
  [DressType.PAJAMA]: ['waist', 'hips', 'pantLength', 'cuff'],
};

export const MOCK_ORDERS = [
  {
    id: 'ORD-001',
    customerId: 'CUST-1',
    customerName: 'Rahul Sharma',
    mobile: '9876543210',
    dressType: DressType.SHERWANI,
    measurements: { neck: 16, shoulder: 18, chest: 42, waist: 36, sleeveLength: 25, shirtLength: 44 },
    orderDate: new Date(Date.now() - 86400000 * 5).toISOString(),
    deliveryDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    status: OrderStatus.STITCHING,
    amountTotal: 15000,
    amountPaid: 5000,
    paymentMethod: PaymentMethod.UPI,
    trackingToken: 'abc123xyz',
    materialNotes: 'Royal Blue Velvet with Gold embroidery'
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-2',
    customerName: 'Amit Patel',
    mobile: '9123456789',
    dressType: DressType.SHIRT,
    measurements: { neck: 15.5, shoulder: 17.5, chest: 40, waist: 34, sleeveLength: 24, shirtLength: 28 },
    orderDate: new Date(Date.now() - 86400000 * 2).toISOString(),
    deliveryDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    status: OrderStatus.CUTTING,
    amountTotal: 1200,
    amountPaid: 1200,
    paymentMethod: PaymentMethod.CREDIT_CARD,
    trackingToken: 'def456uvw',
    materialNotes: 'White Linen'
  }
];