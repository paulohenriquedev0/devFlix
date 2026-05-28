// Importa o PrismaClient
const { PrismaClient } = require("@prisma/client");

// Cria uma conexão com o banco de dados
const prisma = new PrismaClient();

// Exporta o prisma para ser usado em outros arquivos
module.exports = prisma;