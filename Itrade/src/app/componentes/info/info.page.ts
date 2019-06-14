import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Querys } from '../../servicios/fav.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  public parametro: any;
  public favorito: boolean;
  public listItems: string[];

  constructor(private route: ActivatedRoute, public router: Router, public fav: Querys, private location: Location) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.parametro = params['item'];
      this.fav.listFavs().then(data => {
        this.listItems = data;
        const index = this.listItems.indexOf(this.parametro);
        console.log(index)
        if (index !== -1) {
          this.favorito = true;
          console.log(this.favorito)
          document.getElementById('fav').style.color = 'red';
        }
      }
      ).catch(err => {
        console.log('Error al listar');
      });
    });
  }

  anteriorPagina(){
    this.location.back();
  }

  irInicio() {
    this.router.navigate(['/home']);
  }

  modificarFavorito(estado: boolean) {
    this.favorito = estado;
    if (this.favorito) {
      document.getElementById('fav').style.color = 'red';
      this.fav.listFavs().then(data => {
        this.listItems = data;
        this.listItems.push(this.parametro);
        this.fav.addFavs(this.listItems);
      }
      ).catch(err => {
        console.log('Error al listar');
      });
    } else {
      document.getElementById('fav').style.color = 'white';
      document.getElementById('fav').style.textShadow = '0 0 3px #000';
      this.fav.listFavs().then(data => {
        this.listItems = data;
        const index = this.listItems.indexOf(this.parametro);
        if (index > -1) {
          this.listItems.splice(index, 1);
        }
        this.fav.addFavs(this.listItems);
      }
      ).catch(err => {
        console.log('Error al listar');
      });
    }
  }
}