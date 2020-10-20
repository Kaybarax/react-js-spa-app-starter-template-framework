//key
//sd - self described
/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import {isNullUndefined} from "../../util/util";

/**
 * sd _ Kaybarax
 * Handle the custom display of notifications.
 * @param notificationType
 * @param message
 * @param notificationAlert
 * @param position
 * @param duration
 */
export function notificationCallback(
    notificationType,
    message,
    notificationAlert,
    position = 'top',
    duration = 3500,
) {

  if (isNullUndefined(notificationAlert)) {
    alert('Toast Notification not Specified');
    return;
  }

  let typeOfNotification = 'info';//default to this
  let typeOfNotificationMessage = 'You have not specifiedMessage';//default to this

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
  if (notificationType === 'information') {
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

/**
 * sd _ Kaybarax
 * @type {{duration: number, activity: null, alert: boolean, position: string, message: null, type: null}}
 */
export const notificationAlertProps = {
  alert: false,
  message: null,
  type: null,
  duration: 3500,
  position: 'top',
  activity: null,
};
