import { Filme } from '../../Models/Filme';
import { ServiceFilme } from '../../services/servicoFilme';
import './styles.css';

export class detalhes {

    
    filme: Filme;
    servicoFilme: ServiceFilme
    body: HTMLBodyElement

    constructor() {
        const url = new URLSearchParams(window.location.search);
        const id = parseInt(url.get('id') as string);
        this.body = document.querySelector('body') as HTMLBodyElement;
        
        this.servicoFilme = new ServiceFilme();

        this.servicoFilme.ObterFilmePorid(id).then(obj => {
            this.filme = obj;
            this.ObterFotoFilme();
            return this.CriarTelaDetalhes(obj)
        })
            .then((container: HTMLDivElement) => this.CriarCabecalho(container))
            .then((container: HTMLDivElement) => this.CriarFotoVideo(container))
            .then((container: HTMLDivElement) => this.CriarGeneros(container))
            .then((container: HTMLDivElement) => this.CriarDescricao(container))
            .then((conteiner: HTMLDivElement) => {
                this.body.appendChild(conteiner);
            });
    }

    CriarDescricao(container: HTMLDivElement): any {
        const containerRow = document.createElement('div');

        containerRow.classList.add('row');

        containerRow.innerHTML = ` <p class="text-light fs-5" id="descricao">${this.filme.descricao}.</p>`;

        container.appendChild(containerRow);

        console.log(container);

        return container;
    }

    CriarGeneros(container: HTMLDivElement): any {

        const containerGeneros = document.createElement('div')
        containerGeneros.className = "d-flex gap-3";

        if (this.filme.generos) {
            for (let item of this.filme.generos) {
                const span = document.createElement('span');
                span.className = "badge rounded-pill fs-5 px-4 py-2 bg-warning text-dark";

                span.innerText = item;

                containerGeneros.appendChild(span);
            }
        }

        container.appendChild(containerGeneros);

        return container;
    }

    CriarCabecalho(container: HTMLDivElement): HTMLDivElement {
        const containerRow = document.createElement('div');

        containerRow.classList.add('row');

        containerRow.innerHTML = `<div class="d-flex align-items-center">
                                        <h1 class="text-light" id="titulo">${this.filme.nome}</h1>

                                        <div class="ms-auto text-end">
                                            <p class="text-light">${this.filme.popularidade} Votos</p>
                                            <i class="bi bi-heart fs-2 text-warning"></i>
                                        </div>
                                    </div>`;

        container.appendChild(containerRow);

        return container;
    }

    CriarTelaDetalhes(obj: Filme): HTMLDivElement {

        this.filme = obj;

        const container = document.createElement('div');

        container.className = "container d-grid my-4 gap-3";

        return container;
    }

    async CriarFotoVideo(container: HTMLDivElement): Promise<any> {
        const containerRow = document.createElement('div');

        await this.ObterFotoFilme();
        await this.ObterVideo();

        const urlFoto = this.filme.foto;

        console.log(this.filme.urlTrailer);

        containerRow.classList.add('row');

        containerRow.innerHTML = `<div class="col-lg-3">
                                        <img src="${this.filme.foto}" alt=""
                                            class="img-fluid rounded-3 " id="imagem">
                                    </div>

                                    <div class="col-lg">
                                        <div class="ratio ratio-21x9 h-100">
                                            <Iframe class="rounded-3" id="iframeTrailer"
                                                src="${this.filme.urlTrailer}"
                                                frameborder="0" allowfullscreen>

                                            </Iframe>
                                        </div>
                                    </div>`;

        container.appendChild(containerRow);

        console.log(container);

        return container
    }

    async ObterFotoFilme() {
        try {
            // const foto = await this.servicoFilme.BuscarImagemFilme(this.filme.id);

            await this.servicoFilme.BuscarImagemFilmePorId(this.filme.id).then(obj => {
                this.filme.foto = obj
            });

        } catch (error) {
            console.error(error);
        }
    }

    async ObterVideo(){
        try {
            // const foto = await this.servicoFilme.BuscarImagemFilme(this.filme.id);

            await this.servicoFilme.BuscarVideoFilmePorId(this.filme.id).then(obj => {
                this.filme.urlTrailer = obj
            });

        } catch (error) {
            console.error(error);
        }
    }

    async ObterVideoFilme() {
        console.log('entrou no obter video detalhes')
        await this.servicoFilme.BuscarVideoFilmePorId(this.filme.id).then(res => console.log(res))
    }






}

window.addEventListener('load', () => new detalhes());