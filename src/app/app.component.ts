import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title: string = 'angular-test-project';
  success: boolean;
  tags: Array<String> = ["DESIGN", "AUDIOVISUAL","GAME", "PROGRAMACAO"];

  form: FormGroup = new FormGroup({
    title: new FormControl(null,Validators.required),
    images: new FormControl(null),
    date: new FormControl(null),
    tags: new FormControl(null)
  });

  constructor(
    private httpClient: HttpClient
  ){}

  ngOnInit(){
    const date = new Date();
    this.form.get('date').setValue(`${ date.getFullYear() }-${ date.getMonth() + 1 < 10? ("0" + (date.getMonth() + 1)): date.getMonth() }-${ date.getDate() }`);
    console.log(this.form);
  }

  handlerFile($event): void {
    this.form.get('images').setValue($event.target.files[0]) ;
    console.log(this.form);
  }

  save(): void {
    const portfolio = {
      title: this.form.get('title').value,
      date: this.form.get('date').value,
      tags: this.form.get('tags').value
    }
    let formData = new FormData();
    formData.append('images',this.form.get('images').value);
    formData.set('portfolio', JSON.stringify(portfolio));
    console.log(portfolio);
    this.httpClient.post('http://localhost:8000/portfolio',formData)
    .subscribe(
      (sucess) => {
        console.log(sucess);
        this.success = true;
      },
      (err)=> console.log(err)
    )
  }
}
