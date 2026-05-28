const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    // Limpando tabelas
    await prisma.movie.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Usuário comum
    await prisma.user.create({
        data: {
            name: "Usuário DevFlix",
            email: "user@devflix.com",
            password: "123456",
            role: "USER"
        }
    });

    // Usuário admin
    await prisma.user.create({
        data: {
            name: "Admin DevFlix",
            email: "admin@devflix.com",
            password: "123456",
            role: "ADMIN"
        }
    });

    // Categorias
    const ficcao = await prisma.category.create({
        data: {
            name: "Ficção Científica",
            type: "filme"
        }
    });

    const aventura = await prisma.category.create({
        data: {
            name: "Aventura",
            type: "filme"
        }
    });

    const suspense = await prisma.category.create({
        data: {
            name: "Suspense",
            type: "serie"
        }
    });

    const comedia = await prisma.category.create({
        data: {
            name: "Comédia",
            type: "serie"
        }
    });

    const tecnologia = await prisma.category.create({
        data: {
            name: "Tecnologia",
            type: "documentario"
        }
    });

    const natureza = await prisma.category.create({
        data: {
            name: "Natureza",
            type: "documentario"
        }
    });

    // Filmes e séries

    await prisma.movie.create({
        data: {
            title: "Maze Runner: Correr ou Morrer",
            description:
                "Thomas acorda em um enorme labirinto cheio de mistérios e perigos, onde jovens tentam encontrar uma saída antes que seja tarde.",
            type: "filme",
            coverImage:
                "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
            bannerImage:
                "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            featured: true,
            categoryId: ficcao.id
        }
    });

    await prisma.movie.create({
        data: {
            title: "Jogador Nº 1",
            description:
                "Em um futuro dominado pela realidade virtual, um jovem participa de uma competição que pode mudar sua vida para sempre.",
            type: "filme",
            coverImage:
                "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
            bannerImage:
                "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            featured: false,
            categoryId: aventura.id
        }
    });

    await prisma.movie.create({
        data: {
            title: "Prison Break",
            description:
                "Um engenheiro elabora um plano genial para tirar seu irmão da prisão após uma condenação injusta.",
            type: "serie",
            coverImage:
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
            bannerImage:
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            featured: false,
            categoryId: suspense.id
        }
    });

    await prisma.movie.create({
        data: {
            title: "Todo Mundo Odeia o Chris",
            description:
                "A série acompanha a infância e adolescência de Chris em meio a situações engraçadas e desafios do cotidiano.",
            type: "serie",
            coverImage:
                "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
            bannerImage:
                "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            featured: false,
            categoryId: comedia.id
        }
    });

    await prisma.movie.create({
        data: {
            title: "O Dilema das Redes",
            description:
                "Especialistas revelam como as redes sociais influenciam comportamento, opiniões e saúde mental da sociedade.",
            type: "documentario",
            coverImage:
                "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
            bannerImage:
                "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            featured: false,
            categoryId: tecnologia.id
        }
    });

    await prisma.movie.create({
        data: {
            title: "Nosso Planeta",
            description:
                "Uma impressionante jornada pelos ecossistemas da Terra, mostrando a beleza da natureza e os impactos ambientais.",
            type: "documentario",
            coverImage:
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
            bannerImage:
                "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
            videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            featured: false,
            categoryId: natureza.id
        }
    });

    console.log("Dados iniciais criados com sucesso!");
}

main()
    .catch((error) => {
        console.error("Erro ao criar dados iniciais:", error);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });