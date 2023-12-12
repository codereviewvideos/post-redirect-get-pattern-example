import "express-session";

declare module "express-session" {
  interface SessionData {
    whereDoYouLive: string | undefined;
  }
}
