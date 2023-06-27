import gmail from "gmail-tester";

const clientSecret = "utils/gmail/client_secret_platform.json";
const token = "utils/gmail/token_platform.json";

export async function getLinkFromEmail(emailSubject: string, emailFrom: string, afterDate: Date) {
  const emailBody = await getBodyFromEmail(emailSubject, emailFrom, afterDate);
  const linkRegex = /(https?:\/\/[^\s]+)/g;
  const match = emailBody?.match(linkRegex);
  const link = match ? match[0] : "No link in the email";
  console.log("link = " + link);
  return link;
}

export async function getBodyFromEmail(emailSubject: string, emailFrom: string, afterDate: Date) {
  await gmail.check_inbox(clientSecret, token, {
    subject: emailSubject,
    from: emailFrom,
    include_body: true,
    after: afterDate,
    max_wait_time_sec: 15,
    wait_time_sec: 1
  });

  const message = await gmail.get_messages(clientSecret, token, {
    subject: emailSubject,
    from: emailFrom,
    include_body: true,
    after: afterDate
  });
  const emailBody = message[0].body?.text;
  return emailBody;
}
