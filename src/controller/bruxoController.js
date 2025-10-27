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

export const create = async (req , res) => {
    try {
        const camposObrigatorios = ['nome', 'casa', 'varinha', 'anoMatricula'];

        const dado = req.body;

        const faltando = camposObrigatorios.filter(campo => !dado[campo]);
        
        if (faltando.length > 0) {
          return res.status(400).json({
            erro: `Os seguintes campos são obrigatórios: ${faltando.join(', ')}.`
          });
        }
        const casasValidas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
        if (!casasValidas.includes(casa)) {
          return res.status(400).json({
          erro: 'Casa inválida! O Chapéu Seletor só reconhece as 4 casas',
          casasValidas
      });
    }

    const newBruxo =await BruxoModel.create(req.body)
        res.status(200).json({
            message: 'Bruxo criado com sucesso!',
            bruxo: newBruxo
        })
    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao criar Bruxo',
            detalhes: error.message
        }) 
    }
}

export const deletar = async (req , res) => {
    try {
        const id = parseInt(req.params.id);

        const bruxoExiste = await BruxoModel.findOne(id);

        if(!bruxoExiste) {
            return res.status(404).json({
                erro: 'Bruxo não encontrado com esse id',
                id: id
            })
        }

        await BruxoModel.deletar(id);

        res.status(200).json({
            messsage: 'Bruxo apagado com sucesso!',
            bruxoRemovido: bruxoExiste
        })

    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao apagar Bruxo!',
            detalhes: error.message
        })
    }
}

export const update = async (req , res) => {
    try {
        const id = parseInt(req.params.id);
        const dados = req.body;

        const bruxoExiste = await BruxoModel.findOne(id);

        if (!bruxoExiste) {
            return res.status(404).json({
                erro: 'Bruxo não existe!',
                id: id
            })
        }

        if(dados.casa) {
            const casasValidas = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
            if (!casasValidas.includes(dados.casa)) {
              return res.status(400).json({
              erro: 'Casa inválida! O Chapéu Seletor só reconhece as 4 casas',
              casasValidas
          });
        }
    }
        
        const bruxoAtualizado = await BruxoModel.update(id, dados)
        res.status(200).json({
            message: 'Bruxo atualizado com sucesso!' ,
            bruxo: bruxoAtualizado
        })


    } catch (error) {
        res.status(500).json({
            erro: 'Erro ao atualizar Bruxo!',
            detalhes: error.message
        })
    }
}