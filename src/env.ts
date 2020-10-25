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
    return this.getVar("MAILGUN_API_KEY");
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
