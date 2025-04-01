const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

const app = express();
const db = new Database(path.join(__dirname, 'database.db'));
const SECRET_KEY = 'portoapp_secret_key';

// Configuração do banco de dados
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  );

  INSERT OR IGNORE INTO users (email, password) VALUES (
    'lucasdrepper@gmail.com', 
    '${bcrypt.hashSync('2010021119', 8)}'
  );
`);

// Middlewares
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Rota de Login
app.post('/api/login', (req, res) => {
  console.log('[LOGIN] Dados recebidos:', req.body);
  const { email, password } = req.body;

  // Validação de campos
  if (!email || !password) {
    return res.status(400).json({ error: 'Preencha todos os campos' });
  }

  // Busca usuário
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim());

  if (!user) {
    console.log('[LOGIN] Usuário não encontrado:', email);
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  // Verifica senha
  const validPassword = bcrypt.compareSync(password.trim(), user.password);
  if (!validPassword) {
    console.log('[LOGIN] Senha incorreta para:', email);
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  // Gera token
  const token = jwt.sign(
    { userId: user.id, email: user.email }, 
    SECRET_KEY, 
    { expiresIn: '1h' }
  );

  console.log('[LOGIN] Login bem-sucedido para:', email);
  res.json({ token });
});

// Middleware de autenticação
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    console.log('[AUTH] Token não fornecido');
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log('[AUTH] Token inválido:', err.message);
      return res.sendStatus(403);
    }
    
    console.log('[AUTH] Usuário autenticado:', decoded.email);
    req.user = decoded;
    next();
  });
};

// Rota protegida de exemplo
app.get('/api/protected', authenticate, (req, res) => {
  res.json({ 
    message: 'Acesso permitido!',
    user: req.user
  });
});

// Inicia servidor
app.listen(3001, () => {
  console.log('---------------------------------------');
  console.log(' Servidor backend rodando na porta 3001');
  console.log('---------------------------------------');
  console.log('Credenciais padrão:');
  console.log('Email: lucasdrepper@gmail.com');
  console.log('Senha: 2010021119');
  console.log('---------------------------------------');
});