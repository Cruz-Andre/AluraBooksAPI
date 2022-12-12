// Exemplo com Async Await
async function buscaEndereco(cep) {
  
  var mensagemErro = document.getElementById('erro')
  mensagemErro.innerHTML = ''

  try {
    var consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  
    var consultaCEPConvertida = await consultaCEP.json()
    
    if (consultaCEPConvertida.erro) {
      throw Error('Cep Não existente!')
    }

    var logradouro = document.getElementById('endereco')
    var bairro = document.getElementById('bairro')
    var cidade = document.getElementById('cidade')
    var estado = document.getElementById('estado')

    logradouro.value = consultaCEPConvertida.logradouro
    bairro.value = consultaCEPConvertida.bairro
    cidade.value = consultaCEPConvertida.localidade
    estado.value = consultaCEPConvertida.uf
    
    console.log(consultaCEPConvertida)

    return consultaCEPConvertida

  } catch (e) {
    mensagemErro.innerHTML = `<p>Cep inválido. CEP deve ter 8 digitos sem ponto ou traço.</p>`
    console.log(e)
  }

}

var cep = document.getElementById('cep')
cep.addEventListener('focusout', () => buscaEndereco(cep.value))

/**
 * //Exemplo para várias requisições
 * 
 * let ceps = ['01001000', '91900121', '91770552']
 * 
 * let conjuntoCeps = ceps.map(valor => buscaEndereco(valor))
 * 
 * console.log(conjuntoCeps)
 * 
 * //fazer várias requisições ao mesmo tempo
 * Promise.all(conjuntoCeps).then(respostas => console.log(respostas))
 *  
 */


/**
 * Exemplo com Then
 * var consultaCEP = fetch('https://viacep.com.br/ws/01001000/json/')
 * .then(resposta => resposta.json())
 * .then(r => {
 *   if (r.erro) {
 *     throw Error('Esse cep não existe')
 *   } else
 *   console.log(r)
 *   }
 * )
 * .catch(erro => console.log(erro))
 * .finally(mensagem => console.log('processamento concluído!'))
 * 
 * console.log(consultaCEP)
 * 
 */
