const list = document.querySelector('#listTable tbody')

async function listUsers () {
    try {
        const response = await fetch('/api/register/list/voters')
        const voters = await response.json()
        
        voters.forEach(voter => {
            const containerDados = document.createElement('tr')

            const nome = document.createElement('td')
            nome.innerHTML = voter.nome

            const titulo = document.createElement('td')
            titulo.innerHTML = voter.titulo
            
            const zona = document.createElement('td')
            zona.innerHTML = voter.zona
            
            const secao = document.createElement('td')
            secao.innerHTML = voter.secao
            
            const endereco = document.createElement('td')
            endereco.innerHTML = voter.endereco
            
            const bairro = document.createElement('td')
            bairro.innerHTML = voter.bairro
            
            const municipio = document.createElement('td')
            municipio.innerHTML = voter.municipio
            
            containerDados.appendChild(nome)
            containerDados.appendChild(titulo)
            containerDados.appendChild(zona)
            containerDados.appendChild(secao)
            containerDados.appendChild(endereco)
            containerDados.appendChild(bairro)
            containerDados.appendChild(municipio)

            list.appendChild(containerDados)
        })
    }catch (error) {
        console.log('ERRO: ', error)
    }
}
window.onload = listUsers