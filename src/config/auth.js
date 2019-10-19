// ARQUIVO PARA GUARDAR AS AUTENTICACOES DE TOKEN DE USUARIO

// gera o token da sessao do usuario, jogando o id que e o payload
// do JWT e o segundo parametro e o verificador que e unico
// gerei este com o site https://www.md5online.org/ digitando o
// meugobarberonline que gerou o resultado abaixo
// The MD5 hash for meugobarberonline is : 247486234f865a944180b455fef20e07
// terceiro parametro e o tempo de validade do token
export default {
  secret: '247486234f865a944180b455fef20e07',
  expiresIn: '7d',
};
