import { Document, AlignmentType, VerticalAlign, Paragraph } from "docx";
import { DocCreate as DocCreator } from "./docCreator";
import { Font, Lawcase, Person, firstLine } from "./type";


export class ReportCreate {

    private mainCase: Lawcase
    private docCreator: DocCreator;
    private sub: string = '孟公情指[2023]009号';

    docData: any[] = []

    constructor(lawCase: Lawcase) {
        // const data = new DataCreate();
        console.log(lawCase)
        this.mainCase = lawCase;
        this.docCreator = new DocCreator();

        // console.log(this.mainCase)

        this.addTable()
    }

    private addTable() {
        this.docData = [
            this.docCreator.createParagraph([this.docCreator.createTextRun('内部资料，注意保密', '14pt')]),
            this.docCreator.createTable('16cm', [
                this.docCreator.createTableRow('4cm', [
                    this.docCreator.createTableCell('2.26cm', [
                        this.docCreator.createParagraph([this.docCreator.createTextRun('领', '16pt'),], AlignmentType.CENTER,),
                        this.docCreator.createParagraph([this.docCreator.createTextRun('导', '16pt'),], AlignmentType.CENTER),
                        this.docCreator.createParagraph([this.docCreator.createTextRun('批', '16pt'),], AlignmentType.CENTER),
                        this.docCreator.createParagraph([this.docCreator.createTextRun('示', '16pt'),], AlignmentType.CENTER,),
                    ],{top:300}),
                    this.docCreator.createTableCell('14.12cm',
                        [this.docCreator.createParagraph([this.docCreator.createTextRun('年   月   日', '16pt')], AlignmentType.RIGHT)], { right: 300, bottom: 200 },
                        VerticalAlign.BOTTOM)
                ]),

                this.docCreator.createTableRow('4cm', [
                    this.docCreator.createTableCell('2.26cm', [
                        this.docCreator.createParagraph([this.docCreator.createTextRun('部', '16pt'),], AlignmentType.CENTER),
                        this.docCreator.createParagraph([this.docCreator.createTextRun('门', '16pt'),], AlignmentType.CENTER),
                        this.docCreator.createParagraph([this.docCreator.createTextRun('审', '16pt'),], AlignmentType.CENTER),
                        this.docCreator.createParagraph([this.docCreator.createTextRun('核', '16pt'),], AlignmentType.CENTER),
                    ],{top:300}),
                    this.docCreator.createTableCell('14.12cm',
                        [this.docCreator.createParagraph([this.docCreator.createTextRun('年   月   日', '16pt')], AlignmentType.RIGHT)], { right: 300, bottom: 200 }, VerticalAlign.BOTTOM)
                ])]),

            this.docCreator.createNullLine(),
            this.docCreator.createNullLine(),
            this.docCreator.createTitle(`${this.mainCase.caseName}研判报告`),
            this.docCreator.createParagraph([this.docCreator.createTextRun(this.sub, Font.four)], AlignmentType.RIGHT, { right: '2cm' }),
            this.docCreator.createNullLine(),
            this.docCreator.createNullLine(),
            this.docCreator.createTitle_2('一、案件基本情况'),
            this.docCreator.createMainText(this.mainCase?.caseDesc!),
            this.docCreator.createTitle_2('二、可打击人员')
        ]

        if (this.mainCase.relationPerson.length > 0) {
            for (let i = 0; i < this.mainCase.relationPerson.length; i++) {
                const p = this.mainCase.relationPerson[i];
                this.createPersonData(p,i)
            }
        }

        this.docData.push(this.docCreator.createTitle_2('三、打击处理情况：'));
        if (this.mainCase.relationPerson.length > 0) {
            let str = '';
            for (let i = 0; i < this.mainCase.relationPerson.length; i++) {
                const p = this.mainCase.relationPerson[i];
                if(p.criminalRecord)
                    str+=`犯罪嫌疑人${p.name}${p.personNumber}，${p.criminalRecord}`
            }
            this.docData.push(this.docCreator.createMainText(str));
        }

        this.docData.push(this.docCreator.createTitle_2('四、研判结果'));

        if (this.mainCase.relationPerson.length > 0) {
            let str = '1、';
            let criminalTypeMap:Map<string,Array<string>> = new Map();
            for (let i = 0; i < this.mainCase.relationPerson.length; i++) {
                const p = this.mainCase.relationPerson[i];
                const key = p.sue;
                if(criminalTypeMap.has(key)){
                    criminalTypeMap.get(key).push(p.name)
                }else{
                    criminalTypeMap.set(key,[p.name])
                }
            }

            criminalTypeMap.forEach((value,key)=>{
                value.forEach(pname=>{
                    str += pname + '、';
                })
                str = str.substring(0,str.length-2)
                str += `涉嫌${key}，`
            })
            str += '建议办案单位落地核查并打击。'

            // str+=`犯罪嫌疑人${p.name}`
            this.docData.push(this.docCreator.createMainText(str));
        }
        this.docData.push(this.docCreator.createMainText('2、办案单位采取工作措施及工作情况随时报反诈中心。'));

        this.docData.push(this.docCreator.createNullLine());
        this.docData.push(this.docCreator.createNullLine());
        this.docData.push(this.docCreator.createNullLine());
        this.docData.push(this.docCreator.createNullLine());

        //最后的落款
        this.docData.push(this.docCreator.createParagraph([this.docCreator.createTextRun( `反诈中心研判人： 王洁琼`)],AlignmentType.RIGHT,{right:'3cm'}))
        this.docData.push(this.docCreator.createParagraph([this.docCreator.createTextRun( `${new Date().toLocaleString(undefined,{  year: 'numeric', month: 'long', day: 'numeric' })}`)],AlignmentType.RIGHT,{right:'3cm'}))

    }

    //创建人员
    private createPersonData(p: Person,i:number) {
        this.docData.push(this.docCreator.createTitle_3(`${i+1}、${p.name}`))
        let info = this.personToString(p);
        info += `该${p.name}名下共有3张银行卡涉案：`

        const renyuan = new Paragraph({
            children: [
                this.docCreator.createImage(p.photo),
                this.docCreator.createMainText(info)
            ],
        })
        this.docData.push(renyuan);
        for (let i = 0; i < p.relationAccount.length; i++) {
            const item = p.relationAccount[i];
            const fistLine = item.amount == '' ?
                this.docCreator.createTitle_4(`(${i + 1})， ${item.account}`) :
                this.docCreator.createTitle_4(`(${i + 1})， ${item.account}，流水${item.amount}`);
            this.docData.push(fistLine);
            const a = `证照号码：${p.personNumber}，主体名称：${p.name}，联系手机：${p.tel}，住宅地址：${p.address}，开户网点：${item.company}，开户日期：${item.createDate}。`
            const account = this.docCreator.createParagraph(
                [this.docCreator.createTextRun(a),this.docCreator.createTextRun(this.checkJuhao(item.remark),Font.three,Font.red,Font.fangsong,)],AlignmentType.LEFT,firstLine
            );
            this.docData.push(account)

            // this.docData.push(this.docCreator.createMainText(item.remark,'f00f00'))
            if (item.relationLawcase?.length > 0) {
                this.docData.push(this.docCreator.createMainText('涉及案件：'))
                for (let j = 0; j < item.relationLawcase.length; j++) {
                    const lc = item.relationLawcase[j];
                    const lawcase = this.docCreator.createTitle_5(lc.caseId + lc.caseName)
                    this.docData.push(lawcase)
                }
            }
        }
    }

    personToString(p: Person) {
        return `${p.name}，${p.personNumber}。性别:${p.gender}，民族:${p.nation}，出生日期:${p.personNumber.substring(5, 13)}，婚姻状况:	${p.marriage}，户籍地：${p.address}。`
    }

    checkJuhao(str:string){
        str = str.trim();
        if(str.charAt(str.length-1)== '。' || str==''){
            return str;
        }
        return str +'。'
    }

    public getReportDoc() {
        return new Document({
            sections: [{
                children: this.docData
            }]
        });
    }
}