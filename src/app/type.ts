export interface Person{
    id:number
    name?:string;
    personNumber?:string;
    gender?:string;
    address?:string;
    tel?:string;
    marriage?:string;
    nation?:string;
    photoUrl?:string;
    photo?:ArrayBuffer;
    relationAccount?:AccountInfo[]
    //涉嫌罪名
    sue?:string
    //前科
    criminalRecord?:string
}

export interface AccountInfo{
    id?:number;
    account?:string;
    company?:string;
    createDate?:Date;
    amount?:string;
    remark?:string;
    relationLawcase:Lawcase[]
}


export interface Lawcase{
    id?:number;
    caseName?:string;
    caseId?:string;
    caseDesc?:string;
    remark?:string;
    relationPerson?:Person[]
}

export enum Font {
    fangsong = '仿宋',
    yahei = '微软雅黑',
    kaiti = '楷体',
    heiti = '黑体',
    songti = '宋体',

    red = 'ff0000',
    pink = 'ff69b4',
    black = '000000',
    white = 'ffffff',
    darkblue = '00008b',
    lightblue = '87CEFA',

    one = '26pt',
    two = '22pt',
    two_2 = '18pt',
    three = '16pt',
    three_2 = '15pt',
    four = '14pt',
    four_2 = '12pt',
    five = '10.5pt',
    five_2 = '9pt'
}

export const firstLine={firstLine:'1.5cm'}