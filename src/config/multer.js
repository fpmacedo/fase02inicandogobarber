import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default {
  // cria o storage para armazenamento da imagem avatar
  storage: multer.diskStorage({
    // informa o destino de onde a imagem ficara salva
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    // funcao para definir o nome do arquivo
    filename: (req, file, cb) => {
      // funcao para gerar um codigo unico antes do nome da img
      crypto.randomBytes(16, (err, res) => {
        // se deu erro retorna o cb(callback) com o erro
        if (err) return cb(err);
        // retorna o callback com o primeiro parametro
        // null pois o primeiro parametro e o erro, sem erro
        // retorna null depois pega o res converte o hexadecimal
        // para string e concatena com a extensao do arquivo ex.: ahs78dahsh.png
        return cb(null, res.toLocaleString('hex') + extname(file.originalname));
      });
    },
  }),
};
