import { ObterHeaderAutorizacao } from "../../ObterHeaderAutorizacao";
import { API_KEY } from "../../secrets";
import { Filme } from "../Models/Filme";

export class ServiceFilme {

    ObterFilmePorid(id: number): Promise<Filme> {
        return fetch(`https://api.themoviedb.org/3/movie/${id}`, ObterHeaderAutorizacao())
        .then((res) => res.json())
        .then((obj) => 
        {
            console.log('Image')
            console.log(obj)
            return this.MapearFilme(obj);
        })}

    BuscarFilmesEmAlta(): Promise<Filme[]> {
        return fetch("https://api.themoviedb.org/3/discover/movie", ObterHeaderAutorizacao())
          .then((res: Response): Promise<any> => {
            console.log("RES:");
            console.log(res);
            return res.json();
          })
          .then((obj: any) => {
            console.log("OBJ");
            console.log(obj);
            return this.MapearListaFilmes(obj.results);
          })
           .catch((error: Error) => {
             console.error("Erro ao buscar filmes em alta:", error);
             throw error;
           });
      }

    MapearListaFilmes(results: any[]): any {
        const filmes = results.map(obj => this.MapearFilme(obj));
        
        return Promise.all(filmes);
    }

    BuscarImagemFilme(idFilme: number) : Promise<string> {
        return fetch(`https://api.themoviedb.org/3/movie/${idFilme}/images`, ObterHeaderAutorizacao())
        .then((res) => res.json())
        .then((obj) => 
        {
            console.log('Image')
            console.log(obj)
            return this.MapearEmImagem(obj);
        })
    }

   MapearEmImagem(obj: any): string{

    const primeiraImagem = obj.posters[0];
    console.log("OBJ POSTERS[0]:")
    console.log(obj.posters[0]);

    console.log("FILE PATH:")
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

    // private ObterHeaderAutorizacao(): object{
    //     return {
    //         method: 'GET',
    //         headers: {
    //             accept: "application/json",
    //             Authorization: `Bearer ${API_KEY}`
    //         }
    //     }
    // }
}