import './styles.css';
import { v4 as uuidv4 } from 'uuid';
import "bootstrap";
import { detalhes } from '../TelaDetalhes/detalhes';
import { Filme } from '../../Models/Filme';
import { API_KEY } from '../../../secrets';
import { ServiceFilme } from '../../services/servicoFilme';

class TelaPrincipla {

    servicoFilme: ServiceFilme;
    detalhes: detalhes;
    containerEmAlta:  HTMLDivElement;
    row: HTMLDivElement;
    filmesEmAlta: Array<Filme>;
    promise : Promise<Filme[]>;
    eventA : NodeListOf<HTMLLinkElement>;

    constructor(){
        this.detalhes = new detalhes();
        this.servicoFilme = new ServiceFilme();
        this.containerEmAlta = document.querySelector('#containerEmAlta') as HTMLDivElement;
        this.row = document.querySelector('#containerEmAlta .row ') as HTMLDivElement;
        this.servicoFilme.BuscarFilmesEmAlta().then(res => this.CriarGrid(res));
        this.eventA = document.querySelectorAll('#a');
        //.then(filmes => this.CriarGrid(filmes))

        this.AdicionarEventos()
    }

    AdicionarEventos() {
        for(let i = 0; i <this.eventA.length; i++){
            this.eventA[i].addEventListener('click', ()=>{

            })
        }
    }

    async CriarGrid(listaFilmes: Filme[]) {
        console.log(listaFilmes);
    
        const baseUrl = 'https://image.tmdb.org/t/p/';

        for (let i = 0; i < 20; i++) {
            let filme = listaFilmes[i];
    
            // Busca o path da imagem de forma assíncrona
            const imagemPath = await this.servicoFilme.BuscarImagemFilme(filme.id);

            const imagemUrl = baseUrl + 'w500' + imagemPath; // 'w500' é o tamanho da imagem, você pode escolher outro tamanho se desejar
    
            const novoElemento = document.createElement("div");
            novoElemento.className = "col-6 col-md-4 col-lg-2";
    
            const conteudo = `
                <div class="d-grid gap-2 text-center text-center">
                    <img
                        src="${imagemUrl}"  // Insira o caminho da imagem aqui
                        class="img-fluid rounded-3 p-2 pb-0"
                    >
                    <a href="detalhes.html" class="fs-5 link-warning fw-bold text-decoration-none" id="a">${filme.nome}</a>
                </div>`;
    
            novoElemento.innerHTML = conteudo;
            
            console.log(imagemUrl);
            this.row.appendChild(novoElemento);
        }
    }
    
    private redirecionarUsuario(nome: string): any {
        window.location.href = `detalhes.html?nome=${nome}`
        console.log(window.location.href);
    }

}
window.addEventListener('load', ()=> new TelaPrincipla());