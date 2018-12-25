import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'github-repos',
  templateUrl: './github-repos.component.html',
  styleUrls: ['./github-repos.component.scss']
})
export class GithubReposComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    let githubIcon:any = document.querySelector('.fab.fa-github');
    let containerBox:any = document.querySelector('#github-container-box');

    githubIcon.addEventListener('mouseenter', (e: any)=>{
      containerBox.style.backgroundColor = 'white';
    });
    githubIcon.addEventListener('mouseleave', (e:any)=>{
      containerBox.style.backgroundColor = 'transparent';
    });

    // custom tooltip
    let tooltip: any = document.querySelector('.c-tooltip');
    let angular = document.querySelector('.fab.fa-angular');
    let nodejs  = document.querySelector('.fab.fa-node-js');
    let close = document.querySelector('.fas.fa-times');

    // angular tooltip
    angular.addEventListener('mousemove', (e:any)=>{
      tooltip.textContent = 'angular app repo';
      tooltip.style.left = `${ e.clientX - (tooltip.clientWidth / 2) }px`
      tooltip.style.opacity = 1;
    });
    angular.addEventListener('mouseleave', (e)=>{
      tooltip.style.opacity = 0;
    });

    // nodejs tooltip

    nodejs.addEventListener('mousemove', (e:any)=>{
      tooltip.textContent = 'nodejs app repo';
      tooltip.style.left = `${ e.clientX - (tooltip.clientWidth / 2) }px`
      tooltip.style.opacity = 1;
    });
    nodejs.addEventListener('mouseleave', (e: any)=>{
      tooltip.style.opacity = 0;
    });

    // close icon X

    close.addEventListener('mousemove', (e: any)=>{
      tooltip.textContent = 'close';
      tooltip.style.opacity = 1;
      tooltip.style.left = `${ e.clientX - (tooltip.clientWidth / 2) }px`
    });
    close.addEventListener('mouseleave', (e: any)=>{
      tooltip.style.opacity = 0;
    });


  }

}
