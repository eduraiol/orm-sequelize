const { PessoasServices } = require('../services');
const pessoasServices = new PessoasServices();

class PessoaController {

    static async pegaTodasAsPessoas(req, res) {
        try {
            const todasAsPessoas = await pessoasServices.pegaTodosOsRegistros();
            return res.status(200).json(todasAsPessoas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaPessoasAtivas(req, res) {
        try {
            const pessoasAtivas = await pessoasServices.pegaRegistrosAtivos();
            return res.status(200).json(pessoasAtivas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaPessoa(req, res) {
        const { id } = req.params;
        try {
            const umaPessoa = await pessoasServices.pegaUmRegistro(id);
            return res.status(200).json(umaPessoa);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaPessoa(req, res) {
        const novaPessoa = req.body;
        try {
            const novaPessoaCriada = await pessoasServices.criaRegistro(novaPessoa);
            return res.status(200).json(novaPessoaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaPessoa(req, res) {
        const { id } = req.params;
        const novasInfos = req.body;
        try {
            await pessoasServices.atualizaRegistro(novasInfos, id);
            const pessoaAtualizada = await pessoasServices.pegaUmRegistro(id);
            return res.status(200).json(pessoaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaPessoa(req, res) {
        const { id } = req.params;
        try {
            await pessoasServices.apagaRegistro(id);
            return res.status(200).json({ mensagem: `id ${id} deletado!` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraPessoa(req, res) {
        const { id } = req.params
        try {
            pessoasServices.restauraRegistro(id)
            return res.status(200).json({ mensagem: `id ${id} restaurado!` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async criaMatricula(req, res) {
        const { estudanteId } = req.params;
        const novaMatricula = { ...req.body, estudante_id: Number(estudanteId) };
        try {
            const novaMatriculaCriada = await pessoasServices.criaMatricula(novaMatricula);
            return res.status(200).json(novaMatriculaCriada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        const novasInfos = req.body;
        try {
            await pessoasServices.atualizaMatricula(novasInfos, estudanteId, matriculaId);
            const matriculaAtualizada = await pessoasServices.pegaUmaMatricula(matriculaId, estudanteId);
            return res.status(200).json(matriculaAtualizada);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculas(req, res) {
        const { estudanteId } = req.params;
        try {
            const pessoa = await pessoasServices.pegaMatriculas(estudanteId);
            const matriculas = await pessoa.getAulasMatriculadas();
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaUmaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            const umaMatricula = await pessoasServices.pegaUmaMatricula(matriculaId, estudanteId);
            return res.status(200).json(umaMatricula);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletaMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await pessoasServices.deletaMatricula(estudanteId, matriculaId);
            return res.status(200).json({ mensagem: `id ${matriculaId} deletado!` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async restauraMatricula(req, res) {
        const { estudanteId, matriculaId } = req.params;
        try {
            await pessoasServices.restauraMatricula(matriculaId, estudanteId);
            return res.status(200).json({ mensagem: `id ${matriculaId} restaurado!` });
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaMatriculasPorTurma(req, res) {
        const { turmaId } = req.params;
        try {
            const todasAsMatriculas = await pessoasServices.pegaMatriculasPorTurma(turmaId);
            return res.status(200).json(todasAsMatriculas);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async pegaTurmasLotadas(req, res) {
        try {
            const turmasLotadas = await pessoasServices.pegaTurmasLotadas();
            return res.status(200).json(turmasLotadas.count);
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async cancelaPessoa(req, res) {
        const { estudanteId } = req.params;
        try {
            await pessoasServices.cancelaPessoasEMatriculas(Number(estudanteId));
            return res.status(200).json({ message: `matrículas ref. estudante ${estudanteId} canceladas!`});
        } catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = PessoaController