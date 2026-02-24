export interface Property {
  id: string;
  name: string;
  address: string;
  surface: number;
  type: 'apartment' | 'house' | 'studio' | 'other';
  monthlyRent?: number;
  currency?: string;
  photos: string[];
  documents: Document[];
  createdAt: string;
}

export interface Tenant {
  id: string;
  propertyId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  moveInDate: string;
  moveOutDate?: string;
  deposit: number;
  guarantor?: Guarantor;
  documents: Document[];
  createdAt: string;
}

export interface Guarantor {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Payment {
  id: string;
  propertyId: string;
  tenantId?: string;
  amount: number;
  currency?: string;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'late' | 'partial';
  method?: 'bank_transfer' | 'check' | 'cash' | 'other';
  notes?: string;
  createdAt: string;
}

export interface Expense {
  id: string;
  propertyId: string;
  category: 'repair' | 'maintenance' | 'tax' | 'insurance' | 'utilities' | 'other';
  description: string;
  amount: number;
  currency?: string;
  date: string;
  isRecoverable: boolean;
  receipt?: string;
  documents: Document[];
  createdAt: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'deed' | 'diagnostic' | 'contract' | 'identity' | 'payslip' | 'other';
  uri: string;
  uploadDate: string;
}

export interface Reminder {
  id: string;
  propertyId: string;
  type: 'rent_indexation' | 'lease_renewal' | 'charges_revision' | 'custom';
  title: string;
  description?: string;
  dueDate: string;
  isCompleted: boolean;
  createdAt: string;
}

export interface FinancialReport {
  propertyId: string;
  period: {
    start: string;
    end: string;
  };
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  payments: Payment[];
  expenses: Expense[];
}
