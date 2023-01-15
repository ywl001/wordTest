import { Component } from '@angular/core';
import { Packer, Document, AlignmentType, HeightRule, Paragraph, Table, TableCell, TableRow, TextRun, VerticalAlign, WidthType, TextDirection } from 'docx';
import { doc } from './docCreate';
import { saveAs } from 'file-saver';
import { DocCreate } from './docCreator';
import { HttpClient } from '@angular/common/http';
import { Report } from './report';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wordTest';

  private docCreator: DocCreate;

  private img: ArrayBuffer = new ArrayBuffer(0);
  private str: string = '2023年1月3日姜志佳收到一条号码10690154739057381596发来的短信，显示是信用卡中心发来的，内容为民生银行信用分已达标，预批的信用额度为126000元，申领填表单链接coloursc.cn/fr，然后姜志佳就点击链接下载民生e贷APP，并注册账号，绑定收款银行卡，然后姜志佳就在APP上面申请贷款，之后姜志佳准备提现，系统提示收款银行卡号输错一位，贷款资金被冻结，对方让姜志佳向指定银行卡转账进行解冻，姜志佳转账后，对方又说姜志佳没有听指挥资金被二次冻结，还让姜志佳转账，对方以各种名义让姜志佳转账。之后发现被骗报警。'
  private docTitle: string = '姜志佳被诈骗案研判报告';
  private sub: string = '孟公情指[2023]009号';

  private report: Report;

  private docContent: any[] = []

  constructor(private http: HttpClient) {
    this.docCreator = new DocCreate();
    this.report = new Report;
  }

  private table: any[] = [];

  ngOnInit() {
    console.log('init')
    // this.http.get('../assets/1.jpg', { responseType: 'arraybuffer' }).subscribe(res => {
    //   this.img = res;
    // })
    const re = new Report();
  }

  private createReport(): Document {
    return new Document({
      sections: [{
        children: this.report.docData
      }]
    });
  }

  private createReport2(): Document {
    return new Document({
      sections: [{
        children: [

          this.docCreator.createParagraph([this.docCreator.createTextRun(this.str, '14pt')]),
          new Paragraph({
            children: [this.docCreator.createImage(this.img),
            this.docCreator.createParagraph([this.docCreator.createTextRun(this.str, '14pt')])
            ],
          }),

        ]
      }]
    })
  }

  onClick() {
    // Packer.toBlob(doc).then(blob => {
    //   console.log(blob);
    //   saveAs(blob, "example.docx");
    //   console.log("Document created successfully");
    // });

    Packer.toBlob(this.createReport()).then(blob => {
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }
}
