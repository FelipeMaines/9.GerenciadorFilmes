import { API_KEY } from "../../secrets";
import { Filme } from "../Models/Filme";

export class ServiceFilme {

    BuscarFilmesEmAlta(): Promise<Filme[]> {
        return fetch("https://api.themoviedb.org/3/discover/movie", this.ObterHeaderAutorizacao())
          .then((res: Response): Promise<any> => res.json())
          .then((obj: any) => this.MapearListaFilmes(obj.results))
           .catch((error: Error) => {
             console.error("Erro ao buscar filmes em alta:", error);
             throw error;
           });
      }

    MapearListaFilmes(results: any[]): any {
        const filmes = results.map(obj => this.MapearFilme(obj));
        
        return Promise.all(filmes);
    }

    MapearFilme(obj: any): Filme {
        return {
            id: obj.id,
            nome: obj.title,
            IdsGeneros: obj.genre_ids
        }
    }

    private ObterHeaderAutorizacao(): object{
        return {
            method: 'GET',
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${API_KEY}`
            }
        }
    }
}