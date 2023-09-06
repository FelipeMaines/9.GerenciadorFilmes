import { Filme } from '../../Models/Filme';
import { ServiceFilme } from '../../services/servicoFilme';
import './styles.css';

export class detalhes {

    imagem: HTMLImageElement;
    descricao: HTMLParagraphElement;
    containerGeneros: HTMLDivElement;
    titulo: HTMLHeadElement;
    trailer: HTMLIFrameElement;
    filme: Filme;
    servicoFilme: ServiceFilme

    constructor() {
        const url = new URLSearchParams(window.location.search);
        const id = parseInt(url.get('id') as string);

        this.imagem = document.querySelector('#imagem') as HTMLImageElement;
        this.descricao = document.querySelector('#descricao') as HTMLParagraphElement;
        this.containerGeneros = document.querySelector('#container-generos') as HTMLDivElement;
        this.titulo = document.querySelector('#titulo') as HTMLHeadElement;
        this.trailer = document.querySelector('#iframeTrailer') as HTMLIFrameElement
        this.servicoFilme = new ServiceFilme();
        this.servicoFilme.ObterFilmePorid(id).then(obj => this.ArrumarPagina(obj));
    }

    async ArrumarPagina(obj: Filme): Promise<void> {
        this.filme = obj;

        await this.ObterFotoFilme();

        if (this.filme.descricao){
            console.log('fptp')
            console.log(this.filme.foto);
            this.descricao.textContent = this.filme.descricao
        }

        if (this.filme.foto)
            this.imagem.src = this.filme.foto;

        if(this.filme.nome)
        this.titulo.textContent = this.filme.nome;
    }

    async ObterFotoFilme() {
        try {
            // const foto = await this.servicoFilme.BuscarImagemFilme(this.filme.id);

            await this.servicoFilme.BuscarImagemFilme(this.filme.id).then(obj => {
                this.filme.foto = obj
                console.log('Aqui')
                console.log(obj)
                console.log(this.filme.foto)
            });

        } catch (error) {
            console.error(error);
        }
    }
}

window.addEventListener('load', () => new detalhes());