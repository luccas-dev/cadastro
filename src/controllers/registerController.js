const db = require('../config/firebaseConfig')

exports.registerVoter = async (req, res) => {
    try {
        const {nome, municipio, bairro, endereco, titulo, zona, secao} = req.body

        const voterTitle = await db.collection('voters').where('titulo', '==', titulo).get()

        if(voterTitle.empty) {
            const newVoter = await db.collection('voters').add({
                nome,
                municipio,
                bairro,
                endereco,
                titulo,
                zona,
                secao,
                createAt: new Date()
            })
            console.log('Voter Registered')
            return res.status(200).json({message: 'Cadastrado com Sucesso'})
        } else {
            console.log('Título ja cadastrado')
            return res.status(400).json({message: 'Título de Eleitor já cadastrado'})
        }
    } catch (error) {
        console.log('ERRO: ', error)
    }
}

exports.listVoter = async (req, res) => {
    const voters = await db.collection('voters').get()
    const list = voters.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    res.json(list)
}