const form = document.querySelector('form')

function message(message) {
    const containerMessage = document.createElement('div')
    containerMessage.id = 'message'
    containerMessage.innerText = message

    form.appendChild(containerMessage)
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: form.nome.value,
                municipio: form.municipio.value,
                bairro: form.bairro.value,
                endereco: form.endereco.value,
                titulo: form.titulo.value,
                zona: form.zona.value,
                secao: form.secao.value
            })
        })

        const data = await response.json()

        if(response.ok) {
            message(data.message)
            const successElement = document.getElementById('message')
            successElement.classList.toggle('success')
            setTimeout(() => {
                location.reload()
            }, 3000)
        } else {
            message(data.message)
            const errorElement = document.getElementById('message')
            errorElement.classList.toggle('error')
        }
    } catch (error) {
        console.log('ERRO: ', error)
    }
})