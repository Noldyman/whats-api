import { CorsOptions } from "cors";

const allowedOriginRegexp = new RegExp(process.env.CORS_ORIGIN_REGEXP!);

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOriginRegexp.test(origin ?? "")) {
      callback(new Error("Not allowed by CORS"));
    }
    callback(null);
  },
};
