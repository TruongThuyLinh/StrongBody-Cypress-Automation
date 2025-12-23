import { MailSlurp } from "mailslurp-client";

// ------ DÁN API KEY CỦA BẠN TẠI ĐÂY ------
const apiKey = "sk_qeBgR3RbV40TWI9a_ss3NQpUDIPJlAfDR5gPRTOCQS9Vy0MDEeEDBLCCt87f7i9S0c8JV9ofYlxhy27Mr";
// -----------------------------------------

Cypress.Commands.add("createInbox", () => {
  const mailslurp = new MailSlurp({ apiKey });
  return mailslurp.createInbox();
});

Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
  const mailslurp = new MailSlurp({ apiKey });
  return mailslurp.waitForLatestEmail(inboxId, 60000);
});
