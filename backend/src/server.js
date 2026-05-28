const express = require("express");
const cors = require("cors");

const prisma = require("./lib/prisma");

const app = express();
const PORT = 3333;

app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
    return response.json({
        message: "API da DevFlix funcionando!"
    });
});

app.post("/login", async (request, response) => {
    const { email, password } = request.body;

    if (!email || !password) {
        return response.status(400).json({
            message: "Email e senha são obrigatórios."
        });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        return response.status(401).json({
            message: "Email ou senha inválidos."
        });
    }

    if (user.password !== password) {
        return response.status(401).json({
            message: "Email ou senha inválidos."
        });
    }

    return response.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        token: "token-fake-devflix"
    });
});

app.get("/categories", async (request, response) => {
    const categories = await prisma.category.findMany({
        orderBy: {
            name: "asc"
        }
    });

    return response.json(categories);
});

app.get("/movies", async (request, response) => {
    const movies = await prisma.movie.findMany({
        include: {
            category: true
        },
        orderBy: {
            id: "asc"
        }
    });

    return response.json(movies);
});

app.get("/movies/featured", async (request, response) => {
    const featuredMovie = await prisma.movie.findFirst({
        where: {
            featured: true
        },
        include: {
            category: true
        }
    });

    if (!featuredMovie) {
        return response.status(404).json({
            message: "Nenhum filme em destaque encontrado."
        });
    }

    return response.json(featuredMovie);
});

app.get("/movies/:id", async (request, response) => {
    const { id } = request.params;

    const movie = await prisma.movie.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            category: true
        }
    });

    if (!movie) {
        return response.status(404).json({
            message: "Filme não encontrado."
        });
    }

    return response.json(movie);
});

app.put("/movies/:id/featured", async (request, response) => {
    const { id } = request.params;

    const movieExists = await prisma.movie.findUnique({
        where: {
            id: Number(id)
        }
    });

    if (!movieExists) {
        return response.status(404).json({
            message: "Filme não encontrado."
        });
    }

    await prisma.movie.updateMany({
        data: {
            featured: false
        }
    });

    const featuredMovie = await prisma.movie.update({
        where: {
            id: Number(id)
        },
        data: {
            featured: true
        },
        include: {
            category: true
        }
    });

    return response.json({
        message: "Filme marcado como destaque com sucesso.",
        movie: featuredMovie
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});