const { Notification } = require('electron');

/**
 * Send a system notification to the user.
 * @param {string} title - The title of the notification.
 * @param {string} body - The body text of the notification.
 */
function sendNotification(title, body) {
  new Notification({ title, body }).show();
}

/**
 * Send an email alert to the user.
 * This function is a placeholder and should be implemented with an actual email service.
 * @param {string} to - The email address to send the alert to.
 * @param {string} subject - The subject of the email.
 * @param {string} message - The message body of the email.
 */
function sendEmailAlert(to, subject, message) {
  // TODO: Implement email sending functionality using a service like Nodemailer.
  console.log(`Email sent to ${to} with subject "${subject}" and message "${message}"`);
}

module.exports = {
  sendNotification,
  sendEmailAlert
};