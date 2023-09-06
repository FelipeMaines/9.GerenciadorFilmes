import { API_KEY } from "../../secrets";
import { Filme } from "../Models/Filme";
import { FilmeListagem } from "../Models/FilmeListagem";

export class servicoFilmeListagem {

     PegarFilmesComGeneros(filmesCrus: Filme[]): Promise<FilmeListagem[]> {

        const arrayPromise: Promise<FilmeListagem>[] = [];

        for(let item of filmesCrus)
        {
            const promise = fetch(`https://api.themoviedb.org/3/movie/${item.id}`, this.ObterHeaderAutorizacao())
            .then((res: Response): Promise<any> => res.json())
            .then((obj: any) => this.MapearListaFilmes(obj.results))
            .catch((error: Error) => {
                console.error("Erro ao Pegar informaoes extras do filme:", error);
                throw error;
            });

            arrayPromise.push(promise);
        }

        console.log('Array Promise:' + arrayPromise); 

        return Promise.all(arrayPromise);
    }

    private ObterHeaderAutorizacao(): object {
        return {
            method: 'GET',
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${API_KEY}`
            }
        }
    }

    MapearListaFilmes(results: any[]): Promise<FilmeListagem[]> {
        const filmesPromises: Promise<FilmeListagem>[] = [];
      
        for (const obj of results) {
          const filmePromise = this.MapearFilme(obj);
          filmesPromises.push(filmePromise);
        }
      
        return Promise.all(filmesPromises);
      }

    MapearFilme(obj: any): FilmeListagem {
        return {
            id: obj.id,
            nome: obj.title,
            generos: obj.genres,
            popularidade: obj.popularity,
            data: obj.release_date
        }
    }
}