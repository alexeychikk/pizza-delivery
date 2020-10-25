export class Env {
  public get port() {
    return parseInt(this.getVar("PORT", "3000"));
  }

  public get dbFolder() {
    return this.getVar("DB_FOLDER");
  }

  public get sessionSecret() {
    return this.getVar("SESSION_SECRET");
  }

  public get mailgunDomain() {
    return this.getVar("MAILGUN_DOMAIN");
  }

  public get mailgunEmail() {
    return this.getVar("MAILGUN_EMAIL");
  }

  public get mailgunApiKey() {
    // I applied base64 to the mailgun api key env var twice
    // so that it's not exposed to repo crawlers
    // I UNDERSTAND THAT API KEY MUST NOT BE COMMITED TO THE REPO
    // IN A REAL PRODUCTION APP. THIS IS JUST FOR THE TESTING PURPOSES ONLY
    const b64Key = Buffer.from(
      this.getVar("MAILGUN_API_KEY"),
      "base64",
    ).toString();
    return Buffer.from(b64Key, "base64").toString();
  }

  private getVar(name: string, defaultValue?: string) {
    const val = process.env[name];
    if (val !== undefined) {
      return val;
    }
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Environment variable ${name} is missing`);
  }
}

export default new Env();
