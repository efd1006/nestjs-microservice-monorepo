import { existsSync } from "fs";
import { resolve } from "path";

export function getEnvPath(dest: string): string {
  const env: string | undefined = process.env.NODE_ENV;
  console.log(`Loading variables for '${env}' environment...`);
  const fallback: string = resolve(`${dest}/.env`);
  const filename: string = env ? `${env}.env` : "development.env";
  let filePath: string = resolve(`${dest}/${filename}`);

  if (!existsSync(filePath)) {
    filePath = fallback;
  }

  console.log(`Loading environment variables from file - ${filePath}`);
  return filePath;
}
