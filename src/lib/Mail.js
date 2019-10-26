import modemailer from 'nodemailer';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';
import { resolve } from 'path';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    // importa as configuracoes do nodemailer de dentro do arquivo em /config/mail
    const { host, port, secure, auth } = mailConfig;
    this.transporter = modemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
    this.configureTemplates();
  }

  // configura o template de email
  configureTemplates() {
    // define o caminho do view
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    // passa mais configuracoes ao transporter
    this.transporter.use(
      'compile',
      nodemailerhbs({
        viewEngine: exphbs.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs',
        }),
        viewPath,
        extName: '.hbs',
      })
    );
  }

  sendMail(message) {
    // envia email jogando tudo que esta dentro das variaveis
    // mailConfig e message
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }
}

export default new Mail();
