'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
      await queryInterface.bulkInsert('Pessoas', 
      [
        {
        nome: 'Carlos Raiol',
        ativo: true,
        email: 'cadu@gmail.com',
        role: 'docente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Emanuely Raiol',
        ativo: true,
        email: 'manu@gmail.com',
        role: 'docente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Adriely Raiol',
        ativo: true,
        email: 'ad.raiol00@gmail.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Roberto Borges',
        ativo: true,
        email: 'robertoborges@gmail.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Ana Lúcia',
        ativo: true,
        email: 'analu@gmail.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Nelson Raiol',
        ativo: true,
        email: 'nraiol@gmail.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Alzira Raiol',
        ativo: true,
        email: 'alraiol@gmail.com',
        role: 'estudante',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pessoas', null, {});
  }
};
