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
            successElement.style.backgroundColor = '#4CAF50';
            setTimeout(() => {
                successElement.remove()
                location.reload()
            }, 5000)
        } else {
            message(data.message)
            const errorElement = document.getElementById('message')
            errorElement.style.backgroundColor = '#f44336';
            setTimeout(() => {
                errorElement.remove()
            }, 5000)
        }
    } catch (error) {
        console.log('ERRO: ', error)
    }
})