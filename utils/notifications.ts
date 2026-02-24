import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { Payment, Reminder } from '../types';
import { format, isBefore, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const notifications = {
  async requestPermissions(): Promise<boolean> {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    return finalStatus === 'granted';
  },

  async schedulePaymentReminder(payment: Payment, propertyName: string): Promise<void> {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) return;

    const dueDate = new Date(payment.dueDate);
    const threeDaysBefore = addDays(dueDate, -3);
    const now = new Date();

    if (isBefore(threeDaysBefore, now)) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '💰 Loyer à venir',
        body: `Le loyer de ${propertyName} est dû le ${format(dueDate, 'dd MMMM', { locale: fr })}`,
        data: { paymentId: payment.id, type: 'payment_reminder' },
      },
      trigger: {
        date: threeDaysBefore,
      },
    });
  },

  async scheduleLatePaymentNotification(payment: Payment, propertyName: string): Promise<void> {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) return;

    const dueDate = new Date(payment.dueDate);
    const oneDayAfter = addDays(dueDate, 1);
    const now = new Date();

    if (isBefore(oneDayAfter, now)) return;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⚠️ Loyer en retard',
        body: `Le loyer de ${propertyName} n'a pas été reçu`,
        data: { paymentId: payment.id, type: 'late_payment' },
      },
      trigger: {
        date: oneDayAfter,
      },
    });
  },

  async scheduleReminderNotification(reminder: Reminder): Promise<void> {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) return;

    const dueDate = new Date(reminder.dueDate);
    const now = new Date();

    if (isBefore(dueDate, now)) return;

    const titles: Record<string, string> = {
      rent_indexation: '📈 Indexation du loyer',
      lease_renewal: '📄 Renouvellement de bail',
      charges_revision: '💡 Révision des charges',
      custom: '🔔 Rappel',
    };

    await Notifications.scheduleNotificationAsync({
      content: {
        title: titles[reminder.type] || '🔔 Rappel',
        body: reminder.title,
        data: { reminderId: reminder.id, type: 'reminder' },
      },
      trigger: {
        date: dueDate,
      },
    });
  },

  async cancelAllNotifications(): Promise<void> {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },
};
