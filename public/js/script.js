const form = document.querySelector('form')

function message() {
    if(document.getElementById('message')) {
        document.getElementById('message').remove()
    }
    const containerMessage = document.createElement('div')
    containerMessage.id = 'message'
    
    form.appendChild(containerMessage)
}

function validateTitulo(titulo) {
    // Verifica se é uma string de exatamente 12 dígitos
    if (!/^\d{12}$/.test(titulo)) {
        return false;
    }

    const digits = titulo.split('').map(Number);

    // Cálculo do primeiro dígito verificador (posição 11)
    let firstDigitSum = 0;
    for (let i = 0; i < 9; i++) {
        firstDigitSum += digits[i] * (2 + i); // pesos 2, 3, 4, 5, 6, 7, 8, 9, 10
    }
    let firstDigitRemainder = firstDigitSum % 11;
    let firstCheckDigit = firstDigitRemainder < 10 ? firstDigitRemainder : 0;
    if (firstCheckDigit !== digits[9]) {
        return false;
    }

    // Cálculo do segundo dígito verificador (posição 12)
    let secondDigitSum = 0;
    const secondDigitWeights = [7, 8, 9, 10, 1, 2, 3, 4, 5, 6];
    for (let i = 0; i < 10; i++) {
        secondDigitSum += digits[i] * secondDigitWeights[i];
    }
    let secondDigitRemainder = secondDigitSum % 11;
    let secondCheckDigit = secondDigitRemainder < 10 ? secondDigitRemainder : 0;
    if (secondCheckDigit !== digits[10]) {
        return false;
    }

    return true;
}

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    // Validação do título de eleitor
    if (!validateTitulo(form.titulo.value)) {
        message('Título de eleitor inválido. Verifique o número digitado.')
        const errorElement = document.getElementById('message')
        errorElement.classList.add('error')
        return
    }

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
        message()

        if(response.ok) {
            const successElement = document.getElementById('message')
            successElement.innerHTML = data.message
            successElement.classList.add('success')
            setTimeout(() => clearForm(), 1000)
        } else {
            const errorElement = document.getElementById('message')
            errorElement.innerHTML = data.message
            errorElement.classList.add('error')
        }
    } catch (error) {
        console.log('ERRO: ', error)
    }
})

function clearForm() {
    form.nome.value = ''
    form.municipio.value = ''
    form.bairro.value = ''
    form.endereco.value = ''
    form.titulo.value = ''
    form.zona.value = ''
    form.secao.value = ''
}