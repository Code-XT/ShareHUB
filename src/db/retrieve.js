import { eq } from "drizzle-orm";
import { db } from ".";
import { urlShortenerTable } from "./schema";

export const retrieveEncryptedURL = async (shortToken) => {
  const result = await db
    .select()
    .from(urlShortenerTable)
    .where(eq(urlShortenerTable.Token, shortToken))
    .limit(1);

  return result.length > 0 ? result[0].encryptedURL : null;
};
