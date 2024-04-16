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

    const inputText = document.getElementById('input')

    minhaLista.push({
        tarefa: inputText.value,
        concluida: false,
    })

    inputText.value = ''

    mostrarTarefas()
}

//criando funcao para mostrar as tarefas - 45minutos do video
//onclick => esta chamando a funcao de deletar uma tarefa 
//forEach => passa por cada item do array
function mostrarTarefas(){
    let novaLi = '';

        minhaLista.forEach ( (item,  index) => {
            novaLi = 
                novaLi + 
                    ` 
                        <li class="task ${item.concluida && "done"}"> 
                            <img src="img/como.png" alt="tarefa-feita" onclick="concluirTarefa(${index})">

                            <img src="img/bin.png" alt="detelar-tarefa"  onclick="deletarItem(${index})">
                            
                            <p class="text-tarefa">${item.tarefa}</p>
                            
                            <img src="img/editar.png" alt="editar-tarefa" onclick="editarItem(${index})">
                            <img src="img/ocultar.png" alt="ocultar-tarefa" onclick="ocultarItem(${index})">
                            
                        </li>
                    ` 
        });
        

    listaCompleta.innerHTML = novaLi
    localStorage.setItem('lista', JSON.stringify(minhaLista))
}

function editarItem(index) {
    // Obtém a referência à tarefa específica que será editada
    const taskElement = listaCompleta.children[index];

    // Obtém o texto atual da tarefaS
    const currentTaskText = taskElement.querySelector('.text-tarefa').textContent;

    // Cria um campo de entrada para edição
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'edit-input';
    inputField.value = currentTaskText;

    // Substitui o texto da tarefa pelo campo de entrada
    taskElement.querySelector('.text-tarefa').replaceWith(inputField);

    // Adiciona um evento para salvar a edição quando o usuário pressionar Enter
    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            salvarEdicao(index, inputField.value);
        }
    });
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