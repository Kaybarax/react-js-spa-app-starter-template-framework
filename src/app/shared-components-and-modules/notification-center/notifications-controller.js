//key
//sd - self described
//@authored by Kaybarax -- Twitter @_ https://twitter.com/Kaybarax, Github @_ https://github.com/Kaybarax, LinkedIn @_ https://linkedin.com/in/kaybarax

import {isNullUndefined} from "../../util/util";

/**
 * sd _ Kaybarax
 * Utility function to handle the custom display of messages.
 * @param notificationType
 * @param message
 * @param activity
 * @param position
 * @param duration
 */
export function toastNotificationCallback(
    notificationType,
    message,
    activity,
    position = 'top',
    duration = 3500,
) {

  if (isNullUndefined(activity)) {
    alert('Component calling "Toast Notification not Specified"');
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

  let toastNotificationAlertProps = activity.toastNotificationAlert;
  toastNotificationAlertProps.alert = true;
  toastNotificationAlertProps.position = position;
  toastNotificationAlertProps.duration = duration;
  toastNotificationAlertProps.message = message || typeOfNotificationMessage;
  toastNotificationAlertProps.type = typeOfNotification;
  setTimeout(() => {
    toastNotificationAlertProps.alert = false;
    toastNotificationAlertProps.message = null;
  }, toastNotificationAlertProps.duration);

}

/**
 * sd _ Kaybarax
 * @type {{duration: number, activity: null, alert: boolean, position: string, message: null, type: null}}
 */
export const toastNotificationAlertProps = {
  alert: false,
  message: null,
  type: null,
  duration: 3500,
  position: 'top',
  activity: null,
};
