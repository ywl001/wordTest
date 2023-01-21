import { Component } from '@angular/core';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';
import { mainCase } from './data';
import { ReportCreate } from './reportCreate';
import { ReportService } from './report.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wordTest';


  constructor(private reportService: ReportService) { }

  ngOnInit() {
    console.log('init')
  }

  onClick() {
    this.reportService.getReportData(mainCase).subscribe(res => {
      console.log(res)
      let report = new ReportCreate(res);
      const doc = report.getReportDoc();
      Packer.toBlob(doc).then(blob => {
        saveAs(blob, "example.docx");
        console.log("Document created successfully");
      });
    })
  }
}
