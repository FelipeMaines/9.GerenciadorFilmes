import { API_KEY } from "../../secrets";
import { Filme } from "../Models/Filme";

export class ServiceFilme {

    BuscarFilmesEmAlta(): Promise<Filme[]> {
        return fetch("https://api.themoviedb.org/3/discover/movie", this.ObterHeaderAutorizacao())
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

    BuscarImagemFilme(idFilme: number) : any {
        return fetch(`https://api.themoviedb.org/3/movie/${idFilme}/images`, this.ObterHeaderAutorizacao())
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
    return primeiraImagem.file_path;

    // console.log("Retorno de path para imgagem");
    // console.log(obj);
    // console.log(obj.posters.file_path);
    //  return obj.logos.file_path
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