import { Component,ElementRef,ViewChild } from '@angular/core';
import { NavController,Content } from 'ionic-angular';

@Component({
    selector:'collapsing-page',
    templateUrl: './collapsing-page.html'
})

export class CollapsingPage {
    @ViewChild(Content) content: Content;

    private collapsingContent;
    private header;
    private domContent;
    private collapsingContentHeight;
    private domContentHeight;
    private navBar;
    private collapsingContentMarginTop=0;
    private contentHeight;

    private contentStyle: String = "not-scroll";
    private isScrollTop: boolean = true;

    constructor( private element: ElementRef, public navCtrl: NavController) {
        
    }

    panUp(event) {
        let deltaX = Math.abs(event.deltaX);
        let deltaY = Math.abs(event.deltaY);
        if(event.direction == 8) {
            //通过设置<ion-content>和<div content>标签的margin-top值,以及<ion-content>的高度来实现滑动
            //移动的距离为速度乘以时间
            let distance = Math.abs(event.deltaTime*event.velocityY);

            this.collapsingContentMarginTop -= distance/40;
            if(this.collapsingContentMarginTop <= -this.collapsingContentHeight) {
                this.collapsingContentMarginTop = -this.collapsingContentHeight;
            }
            this.contentHeight = this.domContentHeight - this.collapsingContentMarginTop;
            if(this.collapsingContentMarginTop == -this.collapsingContentHeight) {
                this.contentStyle = "";
            } else {
                this.contentStyle = "not-scroll";
            }
        }
    }

    panDown(event) {
        let deltaX = Math.abs(event.deltaX);
        let deltaY = Math.abs(event.deltaY);
        if(event.direction == 16 && this.isScrollTop) {
            //通过设置<ion-content>和<div content>标签的margin-top值,以及<ion-content>的高度来实现滑动
            let distance = Math.abs(event.deltaTime*event.velocityY);

            this.collapsingContentMarginTop -= -distance/40;
            if(this.collapsingContentMarginTop >= 0) {
                this.collapsingContentMarginTop = 0;
            }

            this.contentHeight = this.domContentHeight - this.collapsingContentMarginTop;

            if(this.collapsingContentMarginTop>-this.collapsingContentHeight) {
                this.contentStyle = "not-scroll";
            } else{
                this.contentStyle = "";
            }
        }
    }

    ngAfterViewInit() {
         this.header = this.element.nativeElement.querySelector("ion-header");
         this.domContent = this.element.nativeElement.querySelector("ion-content");
         this.collapsingContent = this.element.nativeElement.querySelector("div[content]");
         this.collapsingContentHeight = this.collapsingContent.offsetHeight;
         this.domContentHeight = this.domContent.offsetHeight;
         this.navBar = this.element.nativeElement.querySelector("ion-navbar");
         this.content.ionScroll.subscribe((evt) => { 
             if(evt.scrollTop == 0) {
                this.isScrollTop = true;
             } else {
                this.isScrollTop = false;
                this.contentStyle = "";
             }
         })
         this.navBar.style.opacity = "1";
    }
}