const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const oAuth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const getAuthUrl = () => {
  return oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
  });
};

const setCredentials = (tokens: any) => {
  oAuth2Client.setCredentials(tokens);
};

const createCalendarEvent = async (event: any) => {
  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });
  return calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
};

export { getAuthUrl, setCredentials, createCalendarEvent };
