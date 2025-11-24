const STORAGE_KEY = "banco"

function iniciarDados(){
    if (!localStorage.getItem(STORAGE_KEY)){
        const dados = [
            {id: 1, nome: "Guilherme Gomes", email: "guigo@admin", senha: 123},
            {id: 2, nome: "Giulia dos Santos", email: "giulia@admin", senha: 123}
        ]
        salvarBanco(dados)
    }
}

function obterBanco(){
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || [])
}

function salvarBanco(banco){
    localStorage.setItem(STORAGE_KEY, JSON.stringify(banco))
}

function mostrarTabela(dados){
    const tabela = document.getElementById("tabela")

    if (dados.length === 0){
        tabela.innerHTML = "<p> Nenhum usuário encontrado ou cadastrado </p>"
        return
    }

    const linhas = dados.map(dado => `
        <tr>
            <td> ${dado.id} </td>
            <td> ${dado.nome} </td>
            <td> ${dado.email} </td>
        </tr>
    `).join("")

    tabela.innerHTML = `
        <table class="tabelaUsuarios">
            <thead>
                <tr><th>ID</th> <th>Nome</th> <th>Email</th></tr>
            <thead>
            <tbody>${linhas}</tbody>
        </table>
    `
}

function buscar(){
    const texto = document.getElementById("pesquisar").value.trim().toLowerCase()
    const banco = obterBanco()

    const filtro = banco.filter(dado =>
        dado.nome.toLowerCase().includes(texto) ||
        dado.email.toLowerCase().includes(texto)
    )
    mostrarTabela(filtro)
}

function cadastrar(){
    const nome = prompt("[Nome] do Usuário:")
    const email = prompt("[Email] do Usuário:")
    const senha = prompt("[Senha] do Usuário:")

    if (!nome || !email || !senha) return alert("Preencha todos os campos corretamente!")

    const banco = obterBanco()

    const novoUsuario = {
        id: banco.length ? banco[banco.length -1].id + 1 : 1,
        nome,
        email,
        senha
    }

    banco.push(novoUsuario)
    salvarBanco(banco)
    mostrarTabela(banco)

    alert("Usuário cadastrado!")
}

function atualizar(){
    const id = Number(prompt("Digite o [ID] do usuário que deseja atualizar:"))

    if (!id) return

    const banco = obterBanco()
    const usuario = banco.find(user => user.id === id)

    if(!usuario) return alert("Usuário não encontrado")
    
    const novoNome = prompt("Novo nome:", usuario.nome)
    const novoEmail = prompt("Novo email:", usuario.email)
    const novaSenha = prompt("Nova senha:", usuario.senha)

    usuario.nome = novoNome
    usuario.email = novoEmail
    usuario.senha = novaSenha
    
    salvarBanco(banco)
    mostrarTabela(banco)

    alert("Usuário atualizado")
}

function apagar(){
    const id = Number(prompt("Digite o [ID] do usuário que deseja excluir: "))
    
    if (!id) return

    const banco = obterBanco()
    const index = banco.findIndex(user => user.id == id)

    if (index === -1) return alert("Usuário não encontrado")

    if (!confirm(`Tem certeza que deseja excluir ${banco[index].nome}?`)) return

    banco.splice(index, 1)
    salvarBanco(banco)
    mostrarTabela(banco)

    alert("Usuário apagado com sucesso")
}

iniciarDados()
mostrarTabela(obterBanco())