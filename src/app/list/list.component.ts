import { Component, OnInit } from '@angular/core';
import { ListService } from '../services/list.service';
import { FormGroup, FormControl, NgForm, NgModel } from '@angular/forms';

import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface ToDo {id?: string, title: string}

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  showAlert = false;

  updateForm = false;

  itemCollection: AngularFirestoreCollection<ToDo>;
  toDoList;
  form;
  
  updateItemInput;
  updateItemValue;

  constructor(
    private listService: ListService,
    private afs: AngularFirestore,
  ) { 
    afs.collection('toDoList').snapshotChanges().pipe(
      map(actions =>
         actions.map(a => ({...a.payload.doc.data(), id: a.payload.doc.id}))
      )
    ).subscribe(res =>{
      console.log(res);
      this.toDoList = res;
    });

    this.itemCollection = afs.collection('toDoList');
  }

  dateNow = Date();
  day = Date().slice(0,3);
  month = this.dateNow.slice(4,7);
  dayDate = this.dateNow.slice(8,10);
  year = this.dateNow.slice(11,15);



  

  ngOnInit() {
    
  }

  addToList(input){
    this.itemCollection.add({title: input.value})
    input.value = '';
  }

  deleteItem(itemId){
    this.afs.collection('toDoList/').doc(itemId).delete();
  }
  

  getItemToUpdate(item){
    this.itemCollection.doc(item.id).snapshotChanges().subscribe(e =>{
      this.updateItemInput = {title: (e.payload.data() as ToDo).title, id: e.payload.id };
    })
  }

  update(e, id, updateInput){
    // console.log(id, updateInput);
    if(e.keyCode == 13){
      this.itemCollection.doc(id).update({title: updateInput});
      e.target.parentNode.firstChild.control.checked = false;
    }
  }

  showUpdateForm(){
    if(this.updateForm){
      this.updateForm = false;
    }else{
      this.updateForm = true;
    }
  }
  // styling
  labelChecked(e){
    let self = e.target.parentNode.nextSibling.firstChild;
    if(self.classList.contains('is-checked')){
      self.classList.remove('is-checked')
    }else{
      self.classList.add('is-checked');
    }
  }


}
