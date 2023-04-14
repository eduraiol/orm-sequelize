const { TurmasServices } = require('../services');
const turmasServices = new TurmasServices();

class TurmaController {
    static async pegaTodasAsTurmas(req, res) {
        try {
            const todasAsTurmas = await turmasServices.pegaTodosOsRegistros();
            return res.status(200).json(todasAsTurmas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTurmasPorData(req, res) {
        const { data_inicial, data_final } = req.query;

        try {
            const todasAsTurmas = await turmasServices.pegaTurmasData(data_inicial, data_final)
            return res.status(200).json(todasAsTurmas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaTurma(req, res) {
        const { id } = req.params;
        try {
            const umaTurma = await turmasServices.pegaUmRegistro(id);
            return res.status(200).json(umaTurma);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaTurma(req, res) {
        const novaTurma = req.body;
        try {
            const novaTurmaCriada = await turmasServices.criaRegistro(novaTurma);
            return res.status(200).json(novaTurmaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaTurma(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await turmasServices.atualizaRegistro(novasInfos, id);
            const turmaAtualizada = await turmasServices.pegaUmRegistro(id);
            return res.status(200).json(turmaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaTurma(req, res) {
        const { id } = req.params;
        try {
            await turmasServices.apagaRegistro(id);
            return res.status(200).json({ mensagem: `id ${id} deletado!` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraTurma(req, res) {
        const { id } = req.params;
        try {
            await turmasServices.restauraRegistro(id);
            return res.status(200).json({ mensagem: `id ${id} restaurado` })
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = TurmaController