import { Document, AlignmentType, VerticalAlign, Paragraph } from "docx";
import { DataCreate } from "./data";
import { DocCreate as DocCreator } from "./docCreator";
import { Lawcase } from "./model/lawcase";
import { Person } from "./model/person";

export class Report {

    private mainCase: Lawcase
    private docCreator: DocCreator;
    private sub: string = '孟公情指[2023]009号';

    docData: any[] = []

    constructor() {
        const data = new DataCreate();
        this.mainCase = data.data;
        this.docCreator = new DocCreator()
        console.log(this.mainCase)

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
                    ]),
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
                    ]),
                    this.docCreator.createTableCell('14.12cm',
                        [this.docCreator.createParagraph([this.docCreator.createTextRun('年   月   日', '16pt')], AlignmentType.RIGHT)], { right: 300, bottom: 200 }, VerticalAlign.BOTTOM)
                ])]),

            this.docCreator.createNullLine(),
            this.docCreator.createNullLine(),
            this.docCreator.createTitle(`${this.mainCase.caseName}研判报告`),
            this.docCreator.createParagraph([this.docCreator.createTextRun(this.sub, '12pt')], AlignmentType.RIGHT, { right: '2cm' }),
            this.docCreator.createNullLine(),
            this.docCreator.createNullLine(),
            this.docCreator.createMainText('一、案件基本情况'),
            this.docCreator.createMainText(this.mainCase?.caseDesc!),
            this.docCreator.createMainText('二、可打击人员'),
        ]
        if (this.mainCase.relationPerson.length > 0){
            for (let i = 0; i < this.mainCase.relationPerson.length; i++) {
                const p = this.mainCase.relationPerson[i];
                this.createPersonData(p)
            }
        }
    }

    private createPersonData(p: Person) {
        p.photo.subscribe(res=>{
            const info = p.toString();
            const renyuan = new Paragraph({
                children: [this.docCreator.createImage(res),
                this.docCreator.createMainText(info)
                ],
            })
            this.docData.push(renyuan);
            for (let i = 0; i < p.relationAccount.length; i++) {
                const item = p.relationAccount[i];
                const fistLine = item.amount == '' ?
                    this.docCreator.createMainText(`(${i + 1})， ${item.account}`) :
                    this.docCreator.createMainText(`(${i + 1})， ${item.account}，流水${item.amount}`);
                this.docData.push(fistLine);
                const a = `证照号码：${p.pid}，主体名称：${p.name}，联系手机：${p.tel}，住宅地址：${p.address}，开户网点：${item.company}，开户日期：${item.createAt}。`
                const account = this.docCreator.createMainText(a);
                this.docData.push(account)
                this.docData.push(this.docCreator.createMainText(item.remark))
                if (item.relationLawcase.length > 0) {
                    for (let j = 0; j < item.relationLawcase.length; j++) {
                        const lc = item.relationLawcase[j];
                        const lawcase = this.docCreator.createMainText(lc.caseId + lc.caseName)
                        this.docData.push(lawcase)
                    }
                }
            }
        })
    }

    public getReport() {
        return new Document({
            sections: [{
                children: this.docData
            }]
        });
    }
}