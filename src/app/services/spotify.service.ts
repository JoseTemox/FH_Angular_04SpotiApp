import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor( private http: HttpClient) { 
    console.log('spotify service listo')
  }

  getQuery( query: string){
    const url = `https://api.spotify.com/v1/${ query }`;

    const headers = new HttpHeaders({
      'Authorization':'Bearer BQC1sRG1rvW0mYy55PtXpy99d_eJ7kGSNkYgIjccWHfjna0mjqnVyfexWkWwaFn2V7bPOJELE-FsLlgaHEI'
    });

    return this.http.get(url,{ headers});


  }
  getNewReleases(){

    // const headers = new HttpHeaders({
    //   'Authorization':'Bearer BQDtUUPJUnAyPZfP8Umr1oPtem-JABLCwyOWYO6nF9fOYuZef625OBLePRxgBTc1tXDnoJ6XO-e3ZHLC8nA'
    // });

    return this.getQuery('browse/new-releases?limit=20')
              .pipe( map( data => {
                return data['albums'].items;              
              }));
      
  }

  getArtistas(termino: string){
    // const headers = new HttpHeaders({
    //   'Authorization':'Bearer BQDtUUPJUnAyPZfP8Umr1oPtem-JABLCwyOWYO6nF9fOYuZef625OBLePRxgBTc1tXDnoJ6XO-e3ZHLC8nA'
    // });

    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
              .pipe( map( data => data['artists'].items////abrev de la funcion de flecha
              ));
              

  }

  getArtista(id: string){
    

    return this.getQuery(`artists/${id}`);
              // .pipe( map( data => data['artists'].items////abrev de la funcion de flecha
              // ));
              

  }

  getTopTracks(id: string){
    

    return this.getQuery(`artists/${ id }/top-tracks?country=us`)
                .pipe( map( data => data['tracks']
              ));
                         

  }
}
