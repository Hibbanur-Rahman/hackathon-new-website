const Queue = require("queue-fifo");
const sendEmail = require("./emailService.js");

// Create an email queue
const emailQueue = new Queue();

// Function to add an email task to the queue
function addToEmailQueue(sender, recipient, subject, templateName, data, bccList = []) {
  emailQueue.enqueue({ sender, recipient, subject, templateName, data, bccList });
}

// Worker process to send emails from the queue
function processEmailQueue() {
  if (!emailQueue.isEmpty()) {
    const task = emailQueue.dequeue();
    sendEmail(
      task.sender,
      task.recipient,
      task.subject,
      task.templateName,
      task.data,
      task.bccList
    );
  }
}

// Start the worker process
setInterval(processEmailQueue, 5000); // Process the queue every 5 seconds

module.exports = addToEmailQueue;
