import requestIp from "request-ip";
import fetch from "node-fetch";
export const timezone = async (req: any) => {
  const clientIp = requestIp.getClientIp(req);
  try {
    const response = await fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=YYJGHWMOOXSP&format=json&by=zone&ip=${clientIp}`
    );
    const data = await response.json();
    return data.zoneName;
  } catch (error) {
    return null;
  }
};
