const Sequelize = require('sequelize');
const Services = require('./Services');
const database = require('../models');
const Op = Sequelize.Op;

class TurmasServices extends Services {
    constructor(){
        super('Turmas')
    }

    async pegaTurmasData(data_inicial, data_final){
        const where = {};
        data_inicial || data_final ? where.data_inicio = {} : null;
        data_inicial ? where.data_inicio[Op.gte] = data_inicial : null;
        data_final ? where.data_inicio[Op.lte] = data_final : null;
        console.log(where);
        return database[this.nomeDoModelo].findAll(
            {
                where
            }
        );
    }
}

module.exports = TurmasServices;

