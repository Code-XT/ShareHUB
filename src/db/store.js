import { db } from ".";
import { urlShortenerTable } from "./schema";

export const storeShortenedUrl = async (shortToken, encryptedUrl) => {
  await db.insert(urlShortenerTable).values({
    Token: shortToken,
    encryptedURL: encryptedUrl,
  });
};
