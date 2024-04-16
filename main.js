const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')
const listaOculta = document.querySelector('.list-tasks-ocultas')
const divOculta = document.getElementById('container-ocultas')
const divOcultaStyle = divOculta.style
divOculta.style = 'display: none;'

let minhaListaDeItens = []

function adicionarNovaTarefa() {

    if (input.value.trim() == '') {
        return alert('A tarefa precisa de uma descrição.')
    }

    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false,
        oculta: false,
    })

    input.value = ''

    mostrarTarefas()
}

function mostrarTarefas() {
    let novaLi = ''
    let novaLiOculta = ''

    minhaListaDeItens.forEach((item, posicao) => {

        task =
            `

        <li class="task ${item.concluida && 'done'}">
            <img src="./img/como.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <img src="./img/bin.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
            <p>${item.tarefa}</p>
            <img src="./img/editar.png" alt="editar-tarefa" onclick="editarItem(${posicao})">
            <img src="./img/ocultar.png" alt="ocultar-tarefa" onclick="ocultarItem(${posicao})">
        </li>
        
        `

        if (item.oculta) {
            novaLiOculta = novaLiOculta + task
        } else {
            novaLi = novaLi + task
        }
    })

    listaCompleta.innerHTML = novaLi
    listaOculta.innerHTML = novaLiOculta

    localStorage.setItem('lista', JSON.stringify(minhaListaDeItens))
}

function concluirTarefa(posicao) {
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()
}

function deletarItem(posicao) {
    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefas()
}

function editarItem(posicao) {

    texto = prompt('Nova descrição:').trim()

    if (texto == '' || texto == null) {
        alert('A tarefa precisa de uma descrição.')
        editarItem(posicao)
    } else {
        minhaListaDeItens[posicao].tarefa = texto
    }

    mostrarTarefas()
}

function ocultarItem(posicao) {

    tarefa = minhaListaDeItens[posicao]

    if (tarefa.concluida) {
        tarefa.oculta = !tarefa.oculta
    } else {
        return alert('A tarefa precisa ser concluída para ser ocultada.')
    }

    mostrarTarefas()
}

function ocultarDiv() {

    if (divOculta.style.display == 'none') {
        divOculta.style = divOcultaStyle
    } else {
        divOculta.style = 'display: none;'
    }

}

function recarregarTarefas() {
    const tarefasDoLocalStorage = localStorage.getItem('lista')

    if (tarefasDoLocalStorage) {
        minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }

    mostrarTarefas()
}

recarregarTarefas()