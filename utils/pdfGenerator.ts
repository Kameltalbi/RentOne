import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { Payment, Property, Tenant } from '../types';
import { formatCurrency } from '../constants/currencies';

interface ReceiptData {
  payment: Payment;
  property: Property;
  tenant: Tenant;
  receiptNumber: string;
  currency: string;
}

export const generateRentReceipt = async (data: ReceiptData): Promise<void> => {
  const { payment, property, tenant, receiptNumber, currency } = data;
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: 'Helvetica', 'Arial', sans-serif;
            padding: 40px;
            color: #333;
            line-height: 1.6;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 20px;
          }
          .header h1 {
            color: #2563eb;
            font-size: 32px;
            margin-bottom: 10px;
          }
          .header p {
            color: #666;
            font-size: 14px;
          }
          .receipt-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
          }
          .info-block {
            flex: 1;
          }
          .info-block h3 {
            color: #2563eb;
            font-size: 14px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          .info-block p {
            margin: 5px 0;
            font-size: 14px;
          }
          .amount-section {
            background: #f8fafc;
            padding: 30px;
            border-radius: 8px;
            margin: 30px 0;
            border: 2px solid #e2e8f0;
          }
          .amount-row {
            display: flex;
            justify-content: space-between;
            margin: 15px 0;
            font-size: 16px;
          }
          .amount-row.total {
            border-top: 2px solid #2563eb;
            padding-top: 15px;
            margin-top: 20px;
            font-weight: bold;
            font-size: 24px;
            color: #2563eb;
          }
          .payment-details {
            margin: 30px 0;
          }
          .payment-details table {
            width: 100%;
            border-collapse: collapse;
          }
          .payment-details th,
          .payment-details td {
            padding: 12px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
          }
          .payment-details th {
            background: #f8fafc;
            color: #2563eb;
            font-weight: 600;
            text-transform: uppercase;
            font-size: 12px;
            letter-spacing: 0.5px;
          }
          .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
          }
          .status-paid {
            background: #dcfce7;
            color: #166534;
          }
          .status-pending {
            background: #fef3c7;
            color: #92400e;
          }
          .status-late {
            background: #fee2e2;
            color: #991b1b;
          }
          .status-partial {
            background: #dbeafe;
            color: #1e40af;
          }
          .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #e2e8f0;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
          .signature-section {
            margin-top: 60px;
            display: flex;
            justify-content: space-between;
          }
          .signature-block {
            text-align: center;
            flex: 1;
          }
          .signature-line {
            border-top: 1px solid #333;
            margin-top: 60px;
            padding-top: 10px;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>REÇU DE LOYER</h1>
          <p>Quittance de paiement</p>
        </div>

        <div class="receipt-info">
          <div class="info-block">
            <h3>Propriétaire</h3>
            <p><strong>RentOne</strong></p>
            <p>N° Reçu: ${receiptNumber}</p>
            <p>Date: ${new Date().toLocaleDateString('fr-FR')}</p>
          </div>
          
          <div class="info-block">
            <h3>Locataire</h3>
            <p><strong>${tenant.firstName} ${tenant.lastName}</strong></p>
            <p>${tenant.email || ''}</p>
            <p>${tenant.phone}</p>
          </div>
        </div>

        <div class="payment-details">
          <h3 style="color: #2563eb; margin-bottom: 15px;">Détails du bien</h3>
          <table>
            <tr>
              <th>Bien</th>
              <th>Adresse</th>
              <th>Type</th>
            </tr>
            <tr>
              <td>${property.name}</td>
              <td>${property.address}</td>
              <td>${property.type === 'apartment' ? 'Appartement' : 
                   property.type === 'house' ? 'Maison' : 
                   property.type === 'studio' ? 'Studio' : 'Autre'}</td>
            </tr>
          </table>
        </div>

        <div class="amount-section">
          <div class="amount-row">
            <span>Période de location:</span>
            <span>${new Date(payment.dueDate).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</span>
          </div>
          <div class="amount-row">
            <span>Loyer mensuel:</span>
            <span>${formatCurrency(payment.amount, currency)}</span>
          </div>
          ${payment.description ? `
          <div class="amount-row">
            <span>Description:</span>
            <span>${payment.description}</span>
          </div>
          ` : ''}
          <div class="amount-row total">
            <span>MONTANT TOTAL:</span>
            <span>${formatCurrency(payment.amount, currency)}</span>
          </div>
        </div>

        <div class="payment-details">
          <h3 style="color: #2563eb; margin-bottom: 15px;">Informations de paiement</h3>
          <table>
            <tr>
              <th>Date d'échéance</th>
              <th>Date de paiement</th>
              <th>Statut</th>
            </tr>
            <tr>
              <td>${new Date(payment.dueDate).toLocaleDateString('fr-FR')}</td>
              <td>${payment.paidDate ? new Date(payment.paidDate).toLocaleDateString('fr-FR') : '-'}</td>
              <td>
                <span class="status-badge status-${payment.status}">
                  ${payment.status === 'paid' ? 'Payé' : 
                    payment.status === 'pending' ? 'En attente' : 
                    payment.status === 'late' ? 'En retard' : 'Partiel'}
                </span>
              </td>
            </tr>
          </table>
        </div>

        <div class="signature-section">
          <div class="signature-block">
            <div class="signature-line">
              Signature du propriétaire
            </div>
          </div>
          <div class="signature-block">
            <div class="signature-line">
              Signature du locataire
            </div>
          </div>
        </div>

        <div class="footer">
          <p>Ce document a été généré automatiquement par RentOne</p>
          <p>Pour toute question, veuillez contacter votre propriétaire</p>
        </div>
      </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({ html });
    
    const isAvailable = await Sharing.isAvailableAsync();
    if (isAvailable) {
      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: `Reçu de loyer - ${tenant.firstName} ${tenant.lastName}`,
        UTI: 'com.adobe.pdf',
      });
    } else {
      console.log('Sharing is not available on this device');
    }
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const generateReceiptNumber = (): string => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `REC-${year}${month}${day}-${random}`;
};
