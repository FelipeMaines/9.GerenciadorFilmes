export class Filme{
    id: number
    nome: string
    foto?: string 
    generos?: Array<string>
    descricao?: string
    quantidadeVotos?: number
    popularidade?: number
    data?: string
    urlTrailer?: string
}