export enum DressType {
  SHIRT = 'Shirt',
  PANT = 'Pant',
  KURTA = 'Kurta',
  SHERWANI = 'Sherwani',
  SUIT = 'Suit',
  PAJAMA = 'Pajama'
}

export enum OrderStatus {
  MEASURED = 'Measured',
  CUTTING = 'Cutting',
  STITCHING = 'Stitching',
  FINISHING = 'Finishing',
  READY = 'Ready',
  DELIVERED = 'Delivered'
}

export enum PaymentMethod {
  CASH = 'Cash',
  CREDIT_CARD = 'Credit Card',
  DEBIT_CARD = 'Debit Card',
  UPI = 'UPI'
}

export interface Measurements {
  neck?: number;
  shoulder?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  sleeveLength?: number;
  shirtLength?: number;
  pantLength?: number;
  inseam?: number;
  thigh?: number;
  biceps?: number;
  cuff?: number;
}

export interface Customer {
  id: string;
  name: string;
  mobile: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  mobile: string;
  dressType: DressType;
  measurements: Measurements;
  materialImage?: string;
  materialNotes?: string;
  orderDate: string;
  deliveryDate: string;
  status: OrderStatus;
  amountTotal: number;
  amountPaid: number;
  paymentMethod: PaymentMethod;
  trackingToken: string;
}

export interface DashboardStats {
  totalOrders: number;
  pendingRevenue: number;
  deliveriesToday: number;
}