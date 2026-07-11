import arcjet, {
  detectBot,
  fixedWindow,
  protectSignup,
  sensitiveInfo,
  shield,
  slidingWindow,
} from "@arcjet/next";

export { detectBot, fixedWindow, protectSignup, sensitiveInfo, shield, slidingWindow };

export default arcjet({
  key: process.env.ARCJET_KEY!,
  // Define base rules for all requests
  rules: [
    shield({
      mode: "LIVE",
    }),
  ],
  characteristics: ["fingerprint"],
});
