/*                                                                          *
*   Data: 14/12/2024                                                        *
*   Autor: Felipe Negri da Silva & Julio Cesar Cavenaghi Barbosa            *
*   Objetivo: Desenvolvimento de um programa console com PrismaORM para     * 
*             inserção em objetos definidos em aula.                        *
*   Versão: 1.0.0                                                           
*                                                                           */

import { Prisma, PrismaClient, User, Author,Post,Comment } from "@prisma/client";
import * as readline from 'readline';

/* Função Assincrona para questionar o usuário de deleção */
async function askUserDelete(question: string): Promise<boolean> {
    const readLine = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });    

    return new Promise((resolve) => {
        const obterRespostaExclusão = () => {
            readLine.question(question, (answer) => {
                const validAnswer = answer.toLowerCase();
                
                if (validAnswer === 'sim') {
                    readLine.close();
                    resolve(true);
                } else if (validAnswer === 'não' || validAnswer === 'nao') {
                    readLine.close();
                    resolve(false);
                } else {
                    console.log('Por favor, digite "sim" ou "não".');
                    obterRespostaExclusão();
                }
            });
        };

        obterRespostaExclusão();
    });
}

/* Buscas unicas para deleção */
class UsersRepository {
    public async findUsersByEmails(emails: string[]) {
        return await prisma.user.findMany({
            where: {
                OR: emails.map((email) => ({ email })),
            },
        });
    }

    public async findUsersId(id: number) {
        return await prisma.user.findMany({
            where: {
                id
            },
        });
    }

    public async findAutorId(id: number) {
        return await prisma.author.findMany({
            where: {
                id
            },
        });
    }

    public async findPostId(id: number) {
        return await prisma.post.findMany({
            where: {
                id
            },
        });
    }

    public async findCommentId(id: number) {
        return await prisma.comment.findMany({
            where: {
                id
            },
        });
    }
}

const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"]
});

/* Incio Funções Assincronas para DML do usuário */
async function criarUsuario(user: Omit<User, "id">) {
console.log("Criando novo usuário...");
const created = await prisma.user.create({
    data: user,
});
console.log(`Usuário criado: ${created.id}`);
return created;
}

async function listarUsuario() {
console.log("Buscando todos os usuários");
    return await prisma.user.findMany();
}

async function atualizarUsuario(id: number, userData: Partial<Omit<User, "id">>) {
    console.log("Atualizando usuário...");
    const updated = await prisma.user.update({
        where: { id },
        data: userData,
    });

    console.log("Usuário atualizado:", updated);
    return updated;
}

async function excluirUsuario(id: number) {
    console.log("Deletando usuário...");
    const deleted = await prisma.user.delete({
    where: { id },
    });
    console.log("Usuário deletado:", deleted);
    return deleted;
}
/* Fim Funções Assincronas para DML do usuário */

/* Incio Funções Assincronas para DML do Autor */
async function criarAutor(author: Omit<Author, "id">) {
    console.log("Criando novo autor...");
    const created = await prisma.author.create({
        data: author,
    });
    console.log("Autor criado: ${created.id");
    return created;
}

async function listaAutor() {
    console.log("Buscando autores cadastrados..");
    return await prisma.author.findMany();
}
  
async function atualizarAutor(id: number, authorData: Partial<Omit<Author, "id">>) {
    console.log("Atualizando autor...");
    const updated = await prisma.author.update({
        where: { id },
        data: authorData,
    });
    console.log("Autor atualizado:", updated);
    return updated;
}

async function excluirAutor(id: number) {
    console.log("Deletando autor...");
    const deleted = await prisma.author.delete({
        where: { id },
    });
    console.log("Autor deletado:", deleted);
    return deleted;
}
/* Fim Funções Assincronas para DML do Autor */

/* Incio Funções Assincronas para DML do Post */
async function criarPublicacao(post: Omit<Post, "id">) {
    console.log("Criando nova publicação...");
    const created = await prisma.post.create({
        data: post,
    });
    console.log("Publicação criada: ${created.id}");
    return created;
}

async function listarPublicacoes() {
    console.log("Buscando publicações");
    return await prisma.post.findMany();
}

async function atualizarPublicacao(id: number, postData: Partial<Omit<Post, "id">>) {
    console.log("Atualizando publicação...");
    const updated = await prisma.post.update({
        where: { id },
        data: postData
    });
    console.log("Publicação atualizada:", updated);
    return updated;
}

async function excluirPublicacao(id: number) {
    console.log("Deletando publicação...");
    const deleted = await prisma.post.delete({
        where: { id }
    });
    console.log("Publicação deletada:", deleted);
    return deleted;
}
/* Fim Funções Assincronas para DML do Post */

/* Incio Funções Assincronas para DML do Comentário */
async function criarComentario(comment: Omit<Comment, "id">) {
    console.log("Criando novo comentário...");
    const created = await prisma.comment.create({
        data: comment,
    });
    console.log("Comentário criado: ${created.id}");
    return created;
}

async function listarComentarios() {
    console.log("Buscando comentarios");
    return await prisma.post.findMany();
}

async function atualizarComentario(id: number, commentData: Partial<Omit<Comment, "id">>) {
    console.log("Atualizando comentário...");
    const updated = await prisma.comment.update({
        where: { id },
        data: commentData,
    });
    console.log("Comentário atualizado:", updated);
    return updated;
}

async function excluirComentario(id: number) {
    console.log("Deletando comentário...");
    const deleted = await prisma.comment.delete({
        where: { id }
    });
    console.log("Comentário deletado:", deleted);
    return deleted;
}
/* Fim Funções Assincronas para DML do Comentário */

/* Incio Funções Assincronas Principais */
async function main() {
    
    /* DML Usuário */
    const repo = new UsersRepository();
    const emailsParaVerificar = ["grupo@outlook.com", "novogrupo@outlook.com"];
    const existingUser = await repo.findUsersByEmails(emailsParaVerificar);

    if (existingUser.length > 0) {
        console.log("Usuário já cadastrado com esse e-mail, deletando a base e criando novamente!!")
        for (const user of existingUser) {
            await excluirUsuario(user.id);
        }
    }

    const usuario = await criarUsuario({name: "Grupo", email: "grupo@outlook.com"});    
    await atualizarUsuario(usuario.id, { name: "Grupo Atualizado", email: "novogrupo@outlook.com"});
    
    /* DML Autor */
    const autor = await criarAutor({ tags:"Ação", surname: "Autor", completeName: "Autor Teste", userId: usuario.id });
    await atualizarAutor(autor.id, { tags: "Misterio, Terror"});

    /* DML Publicação */
    const publicacao = await criarPublicacao({ title: "Publicação teste", text: "Titulo teste", BelongsToAuthor: autor.id });
    await atualizarPublicacao(publicacao.id, { title: "Novo titulo" });   

    /* DML Comentário */
    const comentario = await criarComentario({ text: "Comentário teste!", BelongsToPost: publicacao.id, BelongsToUser: usuario.id });
    await atualizarComentario(comentario.id, { text: "Comentário teste novo" });

    /*Listagem de todos os objetos*/ 
    console.log("Iniciando a listagem dos Objetos")
    await listarUsuario();
    await listaAutor();
    await listarPublicacoes();
    await listarComentarios();
    
    /* Confirmação de deleção de todos os registros */
    const confirmarExclusao = await askUserDelete("Você realmente deseja excluir todos os objetos? (sim/não): ");
    if (confirmarExclusao) {

        const verificaUsuario = await repo.findUsersId(usuario.id);
        if(verificaUsuario.length > 0){
            await excluirUsuario(usuario.id);
        }    

        const verificaAutor = await repo.findAutorId(autor.id);    
        if(verificaAutor.length > 0){
            await excluirAutor(autor.id);
        }

        const verificaPost = await repo.findPostId(publicacao.id);
        if(verificaPost.length > 0){
            await excluirPublicacao(publicacao.id);
        }
        
        const verificaComment = await repo.findCommentId(comentario.id);
        if(verificaComment.length > 0){
            await excluirComentario(comentario.id);
        }        
        console.log("Objetos excluídos com sucesso!");
    } else {
        console.log("Exclusão cancelada!");
    }
}

/* Fim Funções Assincronas Principais */
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        await prisma.$disconnect();
        console.log(e);
        process.exit(1);
});

