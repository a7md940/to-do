import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ListService } from '../services/list.service';
import { AlertService } from '../shared/alert.service';
import { IsloggedinService } from '../services/isloggedin.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
// import * as socketIo from 'socket.io-client';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit {
  // input to update to do
  @ViewChild('updateChackerLabel') public updateChackerLabel: ElementRef;

  todoFormControl = new FormControl('', [
    Validators.required,
  ]);
  matcher = new MyErrorStateMatcher();
  
  updateItemInput;

  toDoExist:boolean = false;
  toDoList;
  

  dateNow = Date();
  day = Date().slice(0,3);
  month = this.dateNow.slice(4,7);
  dayDate = this.dateNow.slice(8,10);
  year = this.dateNow.slice(11,15);

  constructor(
    private listService: ListService,
    private dialogService: AlertService,
    public isloged: IsloggedinService
    ) { 
      
    }

  ngAfterViewInit(){

  }

  ngOnInit() {
    if(this.isloged.isLoggedIn()){
      this.getToDos();
    }
    
  }

  getToDos(){
    this.listService.getAllToDos().subscribe(res =>{
      if(res.data && res.data.length == 0)
        this.toDoExist = false;
      else {
        this.toDoExist = true;
        this.toDoList = res.data;
      }     
    });
  }

  addToList(input){
    let toDo = {
      title: input.value,
      userId: localStorage.getItem('username')
    }
    this.listService.addToDo(toDo)
    .subscribe(res =>{
      this.getToDos();
    },err =>console.log(err));
    input.value = '';
  }

  deleteItem(itemId){
    // confirm Material dialog to delete one item.
    this.dialogService.confirm('Are you sure deleting this TODO?')
      .afterClosed()
      .subscribe(confirm =>{
        if(confirm){
          // delete item from server, and update toDo Array
          this.listService.deleteToDo(itemId)
          .subscribe(res=>{
            this.getToDos();
          })
        }
    })
  }
  

  getItemToUpdate(toDoId, e){
    // get one item, put its data to updateItemInput code here...
    this.listService.getOneToDo(toDoId).subscribe(res =>{
      this.updateItemInput = res.data.title;
      this.updateItemInput = res.data._id;
    })
  }

  update(e, id, updateInput){
    if(e.keyCode == 13){
      // update one item code here...
      // this.itemCollection.doc(id).update({title: updateInput});
      this.updateChackerLabel.nativeElement.control.checked = false;
    }

    if(e.keyCode == 27){
      this.updateChackerLabel.nativeElement.control.checked = false;
    }
  }


  // styling
  labelChecked(e, item){
    let self = e.target.parentNode.nextSibling.firstChild;

    if(self.classList.contains('is-checked')){
      self.classList.remove('is-checked');

    }else{
      self.classList.add('is-checked');

    }
  }
}
