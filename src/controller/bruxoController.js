import * as BruxoModel from './../models/bruxoModel.js'

export const listAll = async (req , res) => {
    try {
        const bruxos = await BruxoModel.findAll();

        if (!bruxos || bruxos.lenght === 0) {
            res.status(404).json({
                total: 0,
                message: "Não há bruxos na lista",
                bruxos
            })
        }

        res.status(200).json({
            total: bruxos.lenght,
            message: "Lista de Bruxos",
            bruxos
        })
    } catch(error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
            status: 500
        })
    }
}

export const listOne = async (req , res) => {
    try {
        const id = parseInt(req.params.id);
        const bruxo = await BruxoModel.findOne(id);

        if(!bruxo) {
            return res.status(404).json({
                erro: "Bruxo não encontrado",
                message: "Verifique o id do bruxo",
                id: id
            })
        }

        res.status(200).json({
            message: "Bruxo encontrado",
            bruxo
        })
    } catch(error) {
        res.status(500).json({
            erro: "Erro interno de servidor",
            detalhes: error.message,
            status: 500
        })
    }
}
