import { ObterHeaderAutorizacao } from "../../ObterHeaderAutorizacao";
import { API_KEY } from "../../secrets";
import { Filme } from "../Models/Filme";

export class ServiceFilme {

    ObterFilmePorid(id: number): Promise<Filme> {
        return fetch(`https://api.themoviedb.org/3/movie/${id}`, ObterHeaderAutorizacao())
        .then((res) => res.json())
        .then((obj) => 
        {
            return this.MapearFilme(obj);
        })}

    async BuscarFilmesEmAlta(): Promise<Filme[]> {
        return fetch("https://api.themoviedb.org/3/discover/movie", ObterHeaderAutorizacao())
          .then((res: Response): Promise<any> => {
            return res.json();
          })
          .then((obj: any) => {
            return this.MapearListaFilmes(obj.results, true);
          })
           .catch((error: Error) => {
             console.error("Erro ao buscar filmes em alta:", error);
             throw error;
           });
      }

    async MapearListaFilmes(results: any[], pegarImagem: boolean = false): Promise<Filme[]> {
        const filmes = results.map(obj => this.MapearFilme(obj));

        if(pegarImagem){
            for(let item of filmes){
                await this.BuscarImagemFilme(item.id).then(res => item.foto = res);
            }
        }
        
        return Promise.all(filmes);
    }

    BuscarImagemFilme(idFilme: number) : Promise<string> {
        return fetch(`https://api.themoviedb.org/3/movie/${idFilme}/images`, ObterHeaderAutorizacao())
        .then((res) => res.json())
        .then((obj) => 
        {
            return this.MapearEmImagem(obj);
        })
    }

   MapearEmImagem(obj: any): string{

    const primeiraImagem = obj.posters[0];
    return 'https://image.tmdb.org/t/p/' + 'w500' + primeiraImagem.file_path;
}

    MapearFilme(obj: any): Filme {
        return {
            id: obj.id,
            nome: obj.title,
            IdsGeneros: obj.genre_ids,
            descricao: obj.overview,
            popularidade: obj.popularity,
            data: obj.release_date
        }
    }
}