import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { InjectorInstance } from "../app.module";
import { Account } from "./account";

export class Person{
    name:string = '';
    pid:string = '';
    gender:string = '';
    address:string = '';
    tel:string = '';
    marriage:string = '未婚';
    nation:string = '汉族'

    remark:string = '';

    photoUrl:string = '';

    photo:Observable<ArrayBuffer> ;

    //涉嫌罪名
    charges:string[] = []

    relationAccount:Account[] = [];

    private http:HttpClient;
    constructor(name:string,pid:string,gender:string,address:string,tel:string,marriage:string,nation:string,pototUrl:string){
        this.name = name;
        this.pid = pid;
        this.gender = gender;
        this.address = address;
        this.tel = tel;
        this.marriage = marriage;
        this.nation = nation;
        this.photoUrl = pototUrl;
        this.http = InjectorInstance.get<HttpClient>(HttpClient);
        this.photo = this.http.get(this.photoUrl,{responseType:'arraybuffer'})
    }

    public toString():string{
        return `${this.name}，${this.pid}。性别:${this.gender}，民族:${this.nation}，出生日期:${this.pid.substring(6,8)}，婚姻状况:${this.marriage}，户籍地：${this.address}。该人员名下${this.relationAccount.length}张银行卡涉案:`
    }
}