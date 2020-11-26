import Knex from 'knex';
/* toda vez que eu rodo o seed ele insere novamente no banco uai */
export async function seed(knex: Knex) {
    await knex('items').del();
    await knex('items').insert([        
        { title: 'Lâmpadas', image: 'lampadas.svg'},
        { title: 'Pilhas e Baterias', image: 'baterias.svg'},
        { title: 'Papéis e Papelão', image: 'papeis-papelao.svg'},
        { title: 'Resíduos Eletrônicos', image: 'eletronicos.svg'},
        { title: 'Resíduos Orgânicos', image: 'organicos.svg'},
        { title: 'Óleo de Cozinha', image: 'oleo.svg'},
        { title: 'Vidros', image: 'papeis-papelao.svg'},
        { title: 'Metal', image: 'papeis-papelao.svg'},
        { title: 'Materiais de Construção', image: 'papeis-papelao.svg'},
    ]);
}