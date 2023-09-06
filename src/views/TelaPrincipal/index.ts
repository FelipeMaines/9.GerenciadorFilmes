import './styles.css';
import "bootstrap";
import { detalhes } from '../TelaDetalhes/detalhes';
import { Filme } from '../../Models/Filme';
import { ServiceFilme } from '../../services/servicoFilme';

class TelaPrincipla {

    servicoFilme: ServiceFilme;
    containerEmAlta:  HTMLDivElement;
    row: HTMLDivElement;
    filmesEmAlta: Array<Filme>;
    promise : Promise<Filme[]>;

    constructor(){
        this.servicoFilme = new ServiceFilme();
        this.containerEmAlta = document.querySelector('#containerEmAlta') as HTMLDivElement;
        this.row = document.querySelector('#containerEmAlta .row ') as HTMLDivElement;
        this.servicoFilme.BuscarFilmesEmAlta().then(res => this.CriarGrid(res));

        this.AdicionarEventos()
    }

    AdicionarEventos() {
    }

    async CriarGrid(listaFilmes: Filme[]) {

        for (let i = 0; i < 12; i++) {
            let filme = listaFilmes[i];
    
            // const imagemPath = await this.servicoFilme.BuscarImagemFilme(filme.id);
    
            const novoElemento = document.createElement("div");
            novoElemento.className = "col-6 col-md-4 col-lg-2";
    
            const conteudo = `
                <div class="d-grid gap-2 text-center text-center">
                    <a href="detalhes.html?id=${filme.id}" class="fs-5 link-warning fw-bold text-decoration-none" id="a">
                        <img
                          src="${filme.foto}"  // Insira o caminho da imagem aqui
                          class="img-fluid rounded-3 p-2 pb-0"
                        >
                        ${filme.nome}</a>
                </div>`;
    
            novoElemento.innerHTML = conteudo;

            this.row.appendChild(novoElemento);
        }
    }
}
window.addEventListener('load', ()=> new TelaPrincipla());