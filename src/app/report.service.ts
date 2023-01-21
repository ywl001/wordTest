import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, mergeMap, Observable, of, tap,concat} from 'rxjs';
import { accountLawcases, casePerson, mainCase, personAccount } from './data';
import { AccountInfo, Lawcase, Person } from './type';

/**
 * 给一个案件，按照反诈报告生成，填充案件的数据
 * data是模拟数据
 * 数据模型：树状模型，rxjs的递归获取
 * 案件--》多个嫌疑人--》多个嫌疑账号--》多个关联案件
 */

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  getReportData(lawcase: Lawcase) {
    return of(casePerson).pipe(
      tap(res => mainCase.relationPerson = res),
      mergeMap(res => {
        const o = res.map(p => {
         return concat(this.getPersonPhoto(p),this.getPersonAccount(p)) 
        });
        return forkJoin(o)
      }),
      map(res => lawcase)
    )
  }

  getPersonPhoto(p: Person) {
    return this.http.get(p.photoUrl, { responseType: 'arraybuffer' }).pipe(tap(res => p.photo = res));
  }

  /**
   * 
   * @param p 人员
   * @returns 人员关联的账号
   */
  getPersonAccount(p: Person): Observable<any> {
    return of(personAccount[p.id]).pipe(
      tap(res => p.relationAccount = res),
      mergeMap(res => {
        const o = res.map(a => this.getAccountLawcase(a));
        return forkJoin(o)
      })
    )
  }

  /**
   * 
   * @param a 账号
   * @returns 账号关联的案件
   */
  getAccountLawcase(a: AccountInfo): Observable<Lawcase[]> {
    return of(accountLawcases[a.id]).pipe(
      tap(res => a.relationLawcase = res)
    )
  }
}
