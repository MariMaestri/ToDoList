//criando as variaveis e chamando as classes do HTML
const button = document.querySelector('.button-add-task');
const input  = document.querySelector('.input-task');
const listaCompleta = document.querySelector('.list-tasks');

//criando um array para alocar as tarefas
let minhaLista = [];

//criando uma funcao para o botao e chamando a funcao - mostrar tarefa -
// - push - vai adicionar as tarefas dentro do array
//limpa o input
function addNew(){
    minhaLista.push({
        tarefa: input.value,
        concluida: false
    })

    input.value = ''

    mostrarTarefas()
};

//criando funcao para mostrar as tarefas - 45minutos do video
//onclick => esta chamando a funcao de deletar uma tarefa 
//forEach => passa por cada item do array
function mostrarTarefas(){
    
    let novaLi = '';
    minhaLista.forEach ( (item,  index) => {
        novaLi = novaLi + ` 
                <li class="task ${item.concluida && "done"}"> 
                    <img src="img/como.png" alt="tarefa-feita" onclick="concluirTarefa(${index})">

                    <img src="img/bin.png" alt="detelar-tarefa"  onclick="deletarItem(${index})">
                
                    <img src="img/editar.png" alt="editar-tarefa" onclick="editarItem(${index})">
                    
                    <p>${item.tarefa}</p>
                </li>
            `
    });

listaCompleta.innerHTML = novaLi
};


//criando uma funcao para editar a tarefa
function editarItem(index){

}

//criando uma funcao para tarefa concluida
//! - sinal de negaçao
function concluirTarefa(index){
    minhaLista[index].concluida = !minhaLista[index].concluida 
    mostrarTarefas()
    
};

//criando a funcao para deletar uma tarefa
function deletarItem(index){
    minhaLista.splice(index, 1);
    mostrarTarefas()
};

//responsavel pelo botao quando o usuario aberta, chamando a funcao - valorDoInput - 
button.addEventListener('click', addNew);