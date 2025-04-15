/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import { isNullUndefined } from '../../util/util';
import { NotificationAlert, NotificationType } from './notification-utils';

export function notificationCallback(
  notificationType: NotificationType,
  message: string,
  notificationAlert: NotificationAlert,
  position: 'top' | 'bottom' = 'top',
  duration = 3500,
): void {
  if (isNullUndefined(notificationAlert)) {
    alert('Toast Notification not Specified');
    return;
  }

  let typeOfNotification: NotificationType = 'info'; //default to this
  const typeOfNotificationMessage = 'You have not specifiedMessage'; //default to this

  if (notificationType === 'err' || notificationType === 'error') {
    typeOfNotification = 'error';
  }
  if (notificationType === 'failure' || notificationType === 'fail') {
    typeOfNotification = 'error';
  }
  if (notificationType === 'succ' || notificationType === 'success') {
    typeOfNotification = 'success';
  }
  if (notificationType === 'warn' || notificationType === 'warning') {
    typeOfNotification = 'warning';
  }
  if (notificationType === 'information' || notificationType === 'info') {
    typeOfNotification = 'info';
  }

  notificationAlert.alert = true;
  notificationAlert.position = position;
  notificationAlert.duration = duration;
  notificationAlert.message = message || typeOfNotificationMessage;
  notificationAlert.type = typeOfNotification;
  setTimeout(() => {
    notificationAlert.alert = false;
    notificationAlert.message = null;
  }, notificationAlert.duration);
}

export const notificationAlertProps: NotificationAlert = {
  alert: false,
  message: null,
  type: null,
  duration: 3500,
  position: 'top',
  activity: null,
};
