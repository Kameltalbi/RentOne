import { Payment, Expense, FinancialReport } from '../types';
import { startOfMonth, endOfMonth, isWithinInterval, parseISO } from 'date-fns';

export const financial = {
  calculateMonthlyReport(
    propertyId: string,
    payments: Payment[],
    expenses: Expense[],
    month: Date
  ): FinancialReport {
    const start = startOfMonth(month);
    const end = endOfMonth(month);

    const monthPayments = payments.filter(p => {
      if (p.propertyId !== propertyId) return false;
      const date = parseISO(p.paidDate || p.dueDate);
      return isWithinInterval(date, { start, end });
    });

    const monthExpenses = expenses.filter(e => {
      if (e.propertyId !== propertyId) return false;
      const date = parseISO(e.date);
      return isWithinInterval(date, { start, end });
    });

    const totalIncome = monthPayments
      .filter(p => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0);

    const totalExpenses = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

    return {
      propertyId,
      period: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
      totalIncome,
      totalExpenses,
      netIncome: totalIncome - totalExpenses,
      payments: monthPayments,
      expenses: monthExpenses,
    };
  },

  calculateYearlyReport(
    propertyId: string,
    payments: Payment[],
    expenses: Expense[],
    year: number
  ): FinancialReport {
    const start = new Date(year, 0, 1);
    const end = new Date(year, 11, 31);

    const yearPayments = payments.filter(p => {
      if (p.propertyId !== propertyId) return false;
      const date = parseISO(p.paidDate || p.dueDate);
      return isWithinInterval(date, { start, end });
    });

    const yearExpenses = expenses.filter(e => {
      if (e.propertyId !== propertyId) return false;
      const date = parseISO(e.date);
      return isWithinInterval(date, { start, end });
    });

    const totalIncome = yearPayments
      .filter(p => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0);

    const totalExpenses = yearExpenses.reduce((sum, e) => sum + e.amount, 0);

    return {
      propertyId,
      period: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
      totalIncome,
      totalExpenses,
      netIncome: totalIncome - totalExpenses,
      payments: yearPayments,
      expenses: yearExpenses,
    };
  },

  formatCurrency(amount: number, currencyCode: string = 'EUR'): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  },

  calculateRentIndexation(currentRent: number, indexationRate: number): number {
    return Math.round(currentRent * (1 + indexationRate / 100) * 100) / 100;
  },
};
