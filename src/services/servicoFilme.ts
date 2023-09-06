import { ObterHeaderAutorizacao } from "../../ObterHeaderAutorizacao";
import { Filme } from "../Models/Filme";

export class ServiceFilme {

    ObterFilmePorid(id: number): Promise<Filme> {
        return fetch(`https://api.themoviedb.org/3/movie/${id}`, ObterHeaderAutorizacao())
            .then((res) => res.json())
            .then((obj) => {
                return this.MapearFilme(obj);
            })
    }

    async BuscarFilmesEmAlta(): Promise<Filme[]> {
        return fetch("https://api.themoviedb.org/3/discover/movie", ObterHeaderAutorizacao())
            .then((res: Response): Promise<any> => {
                return res.json();
            })
            .then((obj: any) => {
                console.log(obj.results);
                const items = this.MapearListaFilmes(obj.results, true);
                console.log(items);
                return this.MapearListaFilmes(obj.results, true);
            })
            .catch((error: Error) => {
                console.error("Erro ao buscar filmes em alta:", error);
                throw error;
            });
    }

    async MapearListaFilmes(results: any[], pegarImagem: boolean = false): Promise<Filme[]> {

        const filmes = results.map(obj => this.MapearFilme(obj));

        if (pegarImagem) {
            for (let item of filmes) {
                await this.BuscarImagemFilmePorId(item.id).then(res => item.foto = res);
            }
        }

        return Promise.all(filmes);
    }

    BuscarImagemFilmePorId(idFilme: number): Promise<string> {
        return fetch(`https://api.themoviedb.org/3/movie/${idFilme}/images`, ObterHeaderAutorizacao())
            .then((res) => res.json())
            .then((obj) => {
                return this.MapearEmImagem(obj);
            })
    }

    BuscarVideoFilmePorId(idFilme: number) {
        return fetch(`https://api.themoviedb.org/3/movie/${idFilme}/videos
        `, ObterHeaderAutorizacao())
            .then((res) => res.json())
            .then((obj) => {
                return this.MapearEmVideo(obj);
            })
    }

    MapearEmVideo(obj: any): string {
        console.log(obj);
        console.log(obj.results.key)
        let url = `https://youtube.com/embed/${obj.results[obj.results.length - 1].key}`;
        console.log(url)
        return url;
    }

    MapearEmImagem(obj: any): string {

        const primeiraImagem = obj.posters[0];
        return 'https://image.tmdb.org/t/p/' + 'w500' + primeiraImagem.file_path;
    }

    MapearFilme(obj: any): Filme {

        let filme: Filme = {
            id: obj.id,
            nome: obj.title,
            descricao: obj.overview,
            popularidade: obj.popularity,
            generos: [],
            data: obj.release_date,
            quantidadeVotos: obj.vote_count
        }

        if (obj.genres)
            filme.generos = obj?.genres.map((g: any) => g.name as string)


        return filme
    }
}