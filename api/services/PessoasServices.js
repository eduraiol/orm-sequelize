const Sequelize = require('sequelize');
const Services = require('./Services');
const database = require('../models');

class PessoasServices extends Services {
    constructor() {
        super('Pessoas');
        this.matriculas = new Services('Matriculas');
    }

    async pegaRegistrosAtivos(where = {}) {
        return database[this.nomeDoModelo]
            .scope('ativas')
            .findAll({
                where: { ...where }
            })
    }

    async cancelaPessoasEMatriculas(estudanteId) {
        return database.sequelize.transaction(async transacao => {
            super.atualizaRegistro({ ativo: false }, estudanteId, { transaction: transacao })
            await this.matriculas.atualizaRegistros({ status: 'cancelado' }, { estudante_id: estudanteId }, { transaction: transacao })
        });
    }

    async criaMatricula(novaMatricula) {
        return this.matriculas.criaRegistro(novaMatricula);
    }

    async atualizaMatricula(novosDados, estudanteId, matriculaId) {
        return this.matriculas.atualizaRegistros(
            novosDados,
            {
                id: matriculaId,
                estudante_id: estudanteId
            }
        )
    }

    async pegaUmaMatricula(matriculaId, estudanteId) {
        return database['Matriculas'].findOne(
            {
                where:
                {
                    id: Number(matriculaId),
                    estudante_id: Number(estudanteId)
                }
            }
        );
    }

    async pegaMatriculas(estudanteId) {
        return database[this.nomeDoModelo].findOne(
            {
                where: {
                    id: Number(estudanteId)
                }
            }
        )
    }

    async deletaMatricula(estudanteId, matriculaId) {
        return database['Matriculas'].destroy(
            {
                where: {
                    id: matriculaId,
                    estudante_id: estudanteId
                }
            }
        )
    }

    async restauraMatricula(matriculaId, estudanteId) {
        return database['Matriculas'].restore(
            {
                where: {
                    id: matriculaId,
                    estudante_id: estudanteId
                }
            }
        );
    }

    async pegaMatriculasPorTurma(turmaId) {
        return database['Matriculas'].findAndCountAll(
            {
                where: {
                    turma_id: Number(turmaId),
                    status: 'Confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'DESC']]
            })
    }

    async pegaTurmasLotadas() {
        const lotacaoTurma = 3;
        return database['Matriculas'].findAndCountAll(
            {
                where: {
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
            })
    }
}

module.exports = PessoasServices;