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

    constructor(){
        this.detalhes = new detalhes();
        this.servicoFilme = new ServiceFilme();
        this.containerEmAlta = document.querySelector('#containerEmAlta') as HTMLDivElement;
        this.row = document.querySelector('#containerEmAlta .row ') as HTMLDivElement;
        this.servicoFilme.BuscarFilmesEmAlta().then(res => this.CriarGrid(res));
        //.then(filmes => this.CriarGrid(filmes))
    }

    CriarGrid(listaFilmes: Filme[]) : void{
        console.log(listaFilmes);

       for(let i = 0; i < 5; i++)
       {
           let filme: Filme;
           filme = listaFilmes[i];

           console.log("filme:" + filme);

            const novoElemento = document.createElement("div");
            novoElemento.className = "col-6 col-md-4 col-lg-2"; 

            const conteudo = `
                <div class="d-grid gap-2 text-center text-center">
                    <img
                    src=${"https://image.tmdb.org/t/p/original/9EnfMH0nTPCna87Mh3G8Q6W2wze.jpg"} 
                    class="img-fluid rounded-3 p-2 pb-0">
                    <a href="detalhes.html" class="fs-5 link-warning fw-bold text-decoration-none">${filme.nome}</a>
                </div>`

            novoElemento.innerHTML = conteudo;

            console.log("Row:" + this.row);
            this.row.appendChild(novoElemento);
        }
    }
    
    private redirecionarUsuario(nome: string): any {
        window.location.href = `detalhes.html?nome=${nome}`
        console.log(window.location.href);
    }

}
window.addEventListener('load', ()=> new TelaPrincipla());