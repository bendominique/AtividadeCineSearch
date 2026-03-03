////Para acessar a nossa API por completo https://www.omdbapi.com/?apikey=3811fe&
const botaoReceberFilmes = document.getElementById('botaoReceberFilmes');
const listaPesquisa = document.getElementById('listas-pesquisa')  //filmes da lista de pesquisa que aparecem ao escrever o nome de um filme 
const resultadoContainer = document.getElementById('resultado-pesquisa-filme')
const caixaPesquisaFilme = document.getElementById('caixa-pesquisar-filmes');
//Recebendo a nossa API através da constante receberFilmes.

// async function receberFilmes(nomeFilme) {
//   // const urlAPI = async (`https://www.omdbapi.com/?apikey=3811fe&s=${nomeFilme}`) async deve ser usado apenas para trabalhar-se com funções
//   const urlAPI =  (`https://www.omdbapi.com/?apikey=3811fe&s=${nomeFilme}`)

//   try{
//     const response = await fetch(urlAPI)
//     if (!response.ok) {
//       throw new Error(`Resposta do Servidor: ${response.status}`)
//     }
//     const dadosRecebidos = await response.json();
//     console.log(dadosRecebidos);

//   } catch(error) {

//     console.error(error);
//   }
// }

// botaoReceberFilmes.addEventListener("click", () => {  //Recebendo as informações de receberFilmes quando clicado, através da pesquisarFilmes.value, que seria o valor do elemento pesquisado, ai com isso a nossa function é declarada exibindo o valor
//   const filme = pesquisarFilmes.value;
//   receberFilmes(filme)
// }

// );

async function receberFilmes(nomeFilme) {
  // const urlAPI = async (`https://www.omdbapi.com/?apikey=3811fe&s=${nomeFilme}`) async deve ser usado apenas para trabalhar-se com funções
  const urlAPI = (`https://www.omdbapi.com/?apikey=3811fe&s=${nomeFilme}`)

  try {
    const response = await fetch(urlAPI)
    if (!response.ok) {
      throw new Error(`Resposta do Servidor: ${response.status}`)
    }
    const dadosRecebidos = await response.json();
    if(dadosRecebidos.Response === "True"){
      mostrarListaDeFilmes(dadosRecebidos.Search)
    } else {
      listaPesquisa.innerHTML = "<p>Filme não encontrado</p>"
    }

  } catch (error) {

    console.error(error);
  }
}

botaoReceberFilmes.addEventListener("click", () => {  //Recebendo as informações de receberFilmes quando clicado, através da pesquisarFilmes.value, que seria o valor do elemento pesquisado, ai com isso a nossa function é declarada exibindo o valor
  const filme = caixaPesquisaFilme.value;
  receberFilmes(filme)
});

function encontrarFilmes() {
  let filmeProcurado = caixaPesquisaFilme.value.trim();
  if (filmeProcurado > 0) {
    listaPesquisa.classList.remove('esconder-filme-da-lista')
    receberFilmes(filmeProcurado)
  } else {
    listaPesquisa.classList.add('esconder-filme-da-lista');
  }
}

function mostrarListaDeFilmes(filmes) {
  listaPesquisa.innerHTML = "";
  for (let idFilme = 0; idFilme < filmes.length; idFilme++) {
    let filmesLista = document.createElement('div');
    filmesLista.dataset.id = filmes[idFilme].imdbID;
    filmesLista.classList.add('buscar-lista-filme')
    if (filmes[idFilme].Poster != "N/A")
      posterFilme = filmes[idFilme].Poster
    else
      posterFilme = "imagem";

    filmesLista.innerHTML = `
          <div class="thumbnail-filme-pesquisado">
                    <img src="${posterFilme}">
                </div>
                <div class="filmes-pesquisados-info">
                    <h3>${filmes[idFilme].Title}</h3>
                    <p>${filmes[idFilme].Year}</p>
                </div>

      `;
    listaPesquisa.appendChild(filmesLista);
  }
  carregarDescricoesFilmes();
}


function carregarDescricoesFilmes() {


  //CÓDIGO BENJAMIN
  // const descreverFilmes = descricaoFilme.querySelectorAll('.descricaoFilme');
  // descreverFilmes.forEach(filme => {
  //   filme.addEventListener('click', async () => {
  //     caixaPesquisaFilme.value = "";
  //     const resultado = await fetch(`http://www.omdbapi.com/?i=${filme.dataset.id}&apikey=3811fe`);
  //     const detalhesFilmes = await resultado.json();
  //     mostrarDescricoesFilme(detalhesFilmes);
  //   })
  // })
  


  //CÓDIGO DO CHAT
  listaPesquisa.addEventListener("click", async (event) => {
   const id = event.target.closest(".buscar-lista-filme")?.dataset.id;
   if (!id) return;
   const response = await fetch(`https://www.omdbapi.com/?apikey=3811fe&i=${id}&plot=full`);
    const data = await response.json();
       mostrarDescricaoFilmes(data);
});



}


function mostrarDescricaoFilmes(detalhes) {
  resultadoContainer.innerHTML = `
  <div class="poster-filme">
                            <img src="${detalhes.Poster}" alt="poster filme">
                        </div> 
                        <div class="descricao-filme" id="descricao-filme">
                        <h3 class="titulo-filme">${detalhes.Title}</h3>
                            <ul class="informacoes-filme">
                                <li class="ano-filme">Ano: ${detalhes.Year}</li>
                                <li class="idade-min-filme">${detalhes.Titulo}</li>
                                <li class="data-publicacao-filme">${detalhes.Released}</li>
                            </ul>
                            <p class="genero"><b>Genero:</b>${detalhes.Genre}</p>
                            <p class="escritor"><b>Escritor:</b>${detalhes.Writer}</p>
                            <p class="atores"><b>Atores: </b>${detalhes.Actors}</p>
                            <p class="resumo"><b>Resumo:</b> T${detalhes.Plot}
                            </p>
                            <p class="lingua-original"><b>Língua Original:</b>${detalhes.Language}</p>
                            <p class="prêmios"><b><i class="fas fa-award"></i></b>${detalhes.Awards}</p> </div>`;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        listaPesquisa.classList.add('esconder-filme-da-lista');
    }
});