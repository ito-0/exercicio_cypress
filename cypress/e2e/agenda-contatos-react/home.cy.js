/// <reference types="cypress" />

describe('Testes para a aplicação de agenda de contatos', () => {
    const url = 'https://agenda-contatos-react.vercel.app/';

    beforeEach(() => {
        cy.visit(url);
    });

    const adicionarContato = (nome, email, telefone) => {
        cy.get('input[placeholder="Nome"]').type(nome);
        cy.get('input[placeholder="E-mail"]').type(email);
        cy.get('input[placeholder="Telefone"]').type(telefone);
        cy.get('button[type="submit"]').click();
    };

    const editarContato = (nomeAtual, novoNome, novoEmail, novoTelefone) => {
        cy.contains(nomeAtual).parents('.contato').within(() => {
            cy.get('button.edit').click();
        });
        cy.get('input[placeholder="Nome"]').clear().type(novoNome);
        cy.get('input[placeholder="E-mail"]').clear().type(novoEmail);
        cy.get('input[placeholder="Telefone"]').clear().type(novoTelefone);
        cy.get('button[type="submit"]').click();
    };

    const deletarContato = (nome) => {
        cy.contains(nome).parents('.contato').within(() => {
            cy.get('button.delete').click();
        });
    };

    const verificarContato = (nome, visivel = true) => {
        const assertion = visivel ? 'be.visible' : 'not.exist';
        cy.contains(nome).should(assertion);
    };

    it('Deve adicionar um novo contato', () => {
        adicionarContato('Novo Contato', 'novocontato@example.com', '123456789');
        verificarContato('Novo Contato');
    });

    it('Deve alterar um contato existente', () => {
        editarContato('Novo Contato', 'Contato Alterado', 'contatoalterado@example.com', '987654321');
        verificarContato('Contato Alterado');
    });

    it('Deve remover um contato', () => {
        deletarContato('Contato Alterado');
        verificarContato('Contato Alterado', false);
    });
});
