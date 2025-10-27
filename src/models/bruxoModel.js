import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const findAll = async () => {
    return await prisma.bruxo.findMany({
        orderBy: { id: 'asc'}
    });
}

export const findOne = async (id) => {
    return await prisma.bruxo.findUnique({
        where: { id: Number(id)}
    })
}


export const create = async (dado) => {
    return await prisma.bruxo.create({
        data: {
            nome: dado.nome,
            casa: dado.casa,
            patrono: dado.patrono,
            varinha: dado.varinha,
            anoMatricula: dado.anoMatricula
        }
    })
}

export const deletar = async (id) => {
    return await prisma.bruxo.delete({
        where: { id: Number(id) }
    })

}

export const update = async (id, dado) => {
    return await prisma.bruxo.update({
        where: { id: Number(id) },
        data: {
           ...(dado.nome && {nome: dado.nome}),
           ...(dado.casa && {casa: dado.casa}),
           ...(dado.patrono && {patrono: dado.patrono}),
           ...(dado.varinha && {varinha: dado.varinha}),
           ...(dado.anoMatricula && {anoMatricula: dado.anoMatricula}),
           ...(dado.ativo !== undefined && { ativo: dado.ativo}),
        }
    })
}