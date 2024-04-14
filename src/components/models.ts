

export interface Films{
docs:FilmsDocs[],
pages:number,
[key:string]:any,
}
interface Poster{
    url:string|null
    
}
export interface FilmsDocs{
    id:number, 
    name:string|null,
    alternativeName:string|null,
    year:number,
    poster:Poster,
    movieLength:number|null,
    seriesLength:number|null,
}
export interface Film extends FilmsDocs{
    ageRating:number|null,
    description:string|null,
    isSeries:boolean,
    rating:{
        kp:number,
    }, 
    seasonsInfo:Array<any>,
    shortDescription:string|null,
    similarMovies:SimilarMovies[]|null,
}

export interface SimilarMovies{
    id:number, 
    name:string, 
    poster:Poster
}

export interface Review{
docs:ReviewDocs[], 
total:number,
[key:string]:any
}

export interface ReviewDocs{
    author:string, 
    userRating:number, 
    title:string, 
    review:string, 
    type:string, 
    [key:string]:any
}

export interface Actors{
    docs:ActorsDocs[],
    total:number,
    [key:string]:any,
}

export interface ActorsDocs{
    name:string|null, 
    photo:string, 
    enName:string|null,
    id:number,
}

export interface Seasons{
    docs:SeasonsDocs[],
    total:number,
}

interface SeasonsDocs{
    episodes:{
        name:string, 
        number:number,
    }[],
    name:string
}

export interface Posters{
    docs:PostersDocs[], 
    total:number, 
    [key:string]:any
}

interface PostersDocs{
id:string, 
url:string, 
[key:string]:any,
}

export interface PaginationProps{
    total:number
}

export interface ModalProps{
    isModalOpen:boolean, 
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>, 
    handleCancel:()=>void,
}