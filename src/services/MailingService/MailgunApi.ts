import axios from "axios";
import FormData from "form-data";

import { MailingApi, MailOptions } from "./MailingService";

export class MailgunApi implements MailingApi {
  private mailgunDomain: string;
  private mailgunEmail: string;
  private mailgunApiKey: string;

  constructor({
    mailgunDomain,
    mailgunEmail,
    mailgunApiKey,
  }: {
    mailgunDomain: string;
    mailgunEmail: string;
    mailgunApiKey: string;
  }) {
    this.mailgunDomain = mailgunDomain;
    this.mailgunEmail = mailgunEmail;
    this.mailgunApiKey = mailgunApiKey;
  }

  public async sendTemplate<T>(options: MailOptions<T>): Promise<void> {
    const form = new FormData();
    form.append("from", this.mailgunEmail);
    form.append("to", options.to);
    form.append("subject", options.subject);
    form.append("template", options.template);
    form.append("h:X-Mailgun-Variables", JSON.stringify(options.variables));

    const apiToken = Buffer.from(`api:${this.mailgunApiKey}`).toString(
      "base64",
    );

    try {
      await axios.post(
        `https://api.mailgun.net/v3/${this.mailgunDomain}/messages`,
        form,
        {
          headers: {
            ...form.getHeaders(),
            Authorization: `Basic ${apiToken}`,
          },
        },
      );
    } catch (e) {
      throw new Error("Failed to send mailgun template");
    }
  }
}
