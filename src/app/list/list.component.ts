import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { ListService } from '../services/list.service';
import { AlertService } from '../shared/alert.service';
import { IsloggedinService } from '../services/isloggedin.service';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface ITEMToUpdate {
  title?: string,
  _id?: string
}

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, AfterViewInit, OnDestroy {
  // input to update to do
  @ViewChild('updateChackerLabel') public updateChackerLabel: ElementRef;

  todoFormControl = new FormControl('', [Validators.required,]);
  matcher = new MyErrorStateMatcher();
  
  updateItemInput: ITEMToUpdate = {};
  updateAPIErr: string;

  toDoExist:boolean = false;
  toDoList: any[];

  // search and filter toDos
  searchInput;
  
  // All Subscriptions
  getToDoSubscription: Subscription;
  addToDoSubscription: Subscription;
  deleteToDoSubscription: Subscription;
  getOneToDoSubscription: Subscription;
  updateOneToDoSubscription: Subscription;

  // Date
  dateNow = Date();
  day = Date().slice(0,3);
  month = this.dateNow.slice(4,7);
  dayDate = this.dateNow.slice(8,10);
  year = this.dateNow.slice(11,15);
  hours = new Date().getHours();
  minutes = new Date().getMinutes();
  seconds = new Date().getSeconds();

  constructor(
    private listService: ListService,
    private dialogService: AlertService,
    public isloged: IsloggedinService
    ) {}

  ngAfterViewInit(){

  }

  ngOnInit() {
    if(this.isloged.isLoggedIn())
      this.getToDoSubscription = this.getToDos();

    // set hours
    setInterval(()=>{
      this.hours = new Date().getHours();
      this.minutes = new Date().getMinutes();
      this.seconds = new Date().getSeconds();
    },1000);
    
  }

  ngOnDestroy(){
    // Unsubscribe from All getToDos subscription.
    if(this.getToDoSubscription)
      this.getToDoSubscription.unsubscribe();
    if(this.addToDoSubscription)
    this.addToDoSubscription.unsubscribe();
    if(this.deleteToDoSubscription)
      this.deleteToDoSubscription.unsubscribe();
    if(this.getOneToDoSubscription)
      this.getOneToDoSubscription.unsubscribe();
    if(this.updateOneToDoSubscription)
      this.updateOneToDoSubscription.unsubscribe();
  }

  getToDos(){
    return this.listService.getAllToDos().subscribe(res =>{
      if(res.data && res.data.length == 0)
        this.toDoExist = false;
      else {
        this.toDoExist = true;
        this.toDoList = res.data;
        this.toDoList.sort((a,b)=> a.checked - b.checked)
      }     
    });
  }

  addToList(input){
    let toDo = {
      title: input.value,
      userId: localStorage.getItem('username')
    }
    this.addToDoSubscription = this.listService.addToDo(toDo)
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
          this.deleteToDoSubscription = this.listService.deleteToDo(itemId)
          .subscribe(res=>{
            this.getToDos();
          })
        }
    })
  }
  
  getItemToUpdate(toDoId){
    // get one item, put its data to updateItemInput code here...
    this.getOneToDoSubscription = this.listService.getOneToDo(toDoId).subscribe(res =>{
      this.updateItemInput.title = res.data.title;
      this.updateItemInput._id = res.data._id;
    });
  }

  update(e, id, updateInput){
    if(e.keyCode == 13){
      // update one item code here...
      let data = {title: updateInput};
      this.updateOneToDoSubscription = this.listService.updateToDo(id,data).subscribe(res =>{
        if(res.success) {
          this.getToDos();
          this.updateChackerLabel.nativeElement.control.checked = false;
        }
      }, err => {
        this.updateAPIErr = err.error.msg;
        setTimeout(()=>{
          this.updateAPIErr = '';
        },3000);
      });
    }
    if(e.keyCode == 27){
      this.updateChackerLabel.nativeElement.control.checked = false;
    }
  }

  // update toDo to Completed toDo
  completedToDo(toDo){
    if(!toDo.checked){
      this.listService.updateToDo(toDo._id,{checked: true})
      .subscribe(res=>{
        if(res.success)
          this.getToDos();
      },err=> console.log(err));
    }else{
      this.listService.updateToDo(toDo._id,{checked: false})
      .subscribe(res=>{
        if(res.success)
          this.getToDos();
      },err=> console.log(err));
    }
    
  }

  // Search and filter Method
  search(){
    if(this.searchInput.length > 0){
      this.toDoList = this.toDoList.filter((item)=>{
        return item.title.toLocaleLowerCase().match(this.searchInput.toLocaleLowerCase());
      });
    }else{
      this.ngOnInit();
    }
  }

  // styling
  labelChecked(e, item){
    let self = e.target.parentNode.nextSibling.firstChild;
    if(self.classList.contains('is-checked')){
      self.classList.remove('is-checked');
    }else{
      self.classList.add('is-checked')
    }
  }
}
