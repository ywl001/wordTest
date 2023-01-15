import { Account } from "./model/account";
import { Lawcase } from "./model/lawcase";
import { Person } from "./model/person";

export class DataCreate{
   
    private c1:Lawcase = {
        caseName:'胡国军被诈骗案',
        caseId:'A1509280500002023010002'
    }

    private c2:Lawcase = {
        caseName:'刘青峰被诈骗案',
        caseId:'A3201128400002023010008'
    }

    private c3:Lawcase = {
        caseName:'周丽云被诈骗案',
        caseId:'A3206825600002023010017'
    }

    private c4:Lawcase = {
        caseName:'吴畏被诈骗案',
        caseId:'A3210025300002023010009'
    }

    private c5:Lawcase = {
        caseName:'南浔区南浔镇徐云峰被诈骗案',
        caseId:'A3305035000002023015011'
    }

    private c6:Lawcase = {
        caseName:'越城区何伟被诈骗案',
        caseId:'A3306025500002023015009'
    }

    private c7:Lawcase = {
        caseName:'邓十匀被诈骗案',
        caseId:'A4403115200002023016036'
    }
    private c8:Lawcase = {
        caseName:'福泉市娄梅被诈骗案',
        caseId:'A5227026200002023010002'
    }
    private c9:Lawcase = {
        caseName:'燕红军被诈骗案',
        caseId:'A32050655000020220500CB'
    }
    private c10:Lawcase = {
        caseName:'韩勇芳被诈骗案二级账户',
        caseId:'A5134220900002022050007'
    }
    private c11:Lawcase = {
        caseName:'王林芬被诈骗',
        caseId:'A5303225600002023010016'
    }

    private p:Person = new Person('肖玉新','37088219960324581X','男','山东省兖州市小孟镇肖家王村247号','15020745337','未婚','汉族','../assets/1.jpg');
    
    private p2:Person = new Person('解世超','130130199512023331','男','河北省石家庄市无极县郝庄乡东门营村文明街东20号','','已婚','汉族','assets/2.jpg');
    private p3:Person = new Person('谢国辉','511121197808104815','男','四川省仁寿县禄加镇光华社区8组28号','','未婚','汉族','assets/3.jpg');
    private p4:Person = new Person('严雪烽','522222199312163233','男','贵州省江口县怒溪乡梵星村五组','','未婚','土家族','assets/4.jpg');
    

    private a1:Account = new Account('6217002210024971753','中国建设银行股份有限公司济宁兖州支行','2018-03-27','','89.35万');
    private a2:Account = new Account('6236433001344600357','中国建设银行股份有限公司上海长三角一体化示范区支行','2023-01-03','该卡为涉案一级卡6217002210024971753的二级洗钱账户','');
    private a3:Account = new Account('6217856000065432527','中国银行兖州西环支行','2017-03-08','该卡为涉案一级卡6217002210024971753的三级洗钱账户','');
    
    private a4:Account = new Account('6214130050005144406','无极支行','2022-12-26','本案一级卡嫌疑人肖玉新37088219960324581X将受害人资金转入该解账户，后解世超于20230104 13:45:44取现64万','');
    private a5:Account = new Account('6214833111063536','石家庄分行裕华支行','2018-06-27','该卡为梅伟被诈骗案A4403115900002022126426三级账户（一级卡刘建伟6217995020014098429），最终将卡内资金全部取现，取现金额50万元，取现地点：20221231125638石家庄分行营业部。','');
    
    private a6:Account = new Account('6228234095036045564','中国农业银行股份有限公司仁寿禄加分理处','2013-05-22','本案受害人资金2万元于20230104 142736取现2万元，地点中国农业银行股份有限公司仁寿金兰支行','5.5万');
    private a7:Account = new Account('6214571281008188670 ','四川仁寿农村商业银行股份有限公司鹤鸣分理处','2021-08-26','滕红梅被诈骗案二级账户A320923050000201904000D。涉案一级账户何玉龙6217996610003408677于2022-06-13 15：06转入二级账户谢国辉6214571281008188670资金26000元，受害人资金流转过程中此卡多次出现，此卡明细存在多案受害者资金。','');
    private a8:Account = new Account('6228484099133820678 ','中国农业银行股份有限公司仁寿禄加分理处','2015-04-06','燕红军被诈骗案二级账户A6208210500002022050025、畅明安被诈骗案二级账户A32050655000020220500CB、韩勇芳被诈骗案二级账户A5134220900002022050007	（一级6222620640025893683）。后于20220520 130223 柜台取现4.5万，地点中国农业银行股份有限公司仁寿文林支行。\n其中，谢国辉银行卡6214571281008188670、6228484099133820678因掩饰隐瞒被四川省仁寿县公安局	处理，6228234095036045564于2023.1.4再次涉案。','4.5w');
    
    private a9:Account = new Account('6228481198898223277 ','中国农业银行股份有限公司铜仁锦江支行','2018-09-30','该卡取现金额2.5万元。','');
    private a10:Account = new Account('6217995840048597165 ','中国邮政储蓄银行股份有限公司深圳源盛营业所','2016-11-23','该卡为6228481198898223277二级账户，取款金额1万元。','');
    
    private mainCase:Lawcase = {
        caseName:'姜志佳被诈骗案',
        caseId:'A1509280500002023010002',
        caseDesc:'2023年1月3日姜志佳收到一条号码10690154739057381596发来的短信，显示是信用卡中心发来的，内容为民生银行信用分已达标，预批的信用额度为126000元，申领填表单链接coloursc.cn/fr，然后姜志佳就点击链接下载民生e贷APP，并注册账号，绑定收款银行卡，然后姜志佳就在APP上面申请贷款，之后姜志佳准备提现，系统提示收款银行卡号输错一位，贷款资金被冻结，对方让姜志佳向指定银行卡转账进行解冻，姜志佳转账后，对方又说姜志佳没有听指挥资金被二次冻结，还让姜志佳转账，对方以各种名义让姜志佳转账。之后发现被骗报警。',
        station:'城关派出所',

        relationPerson:[
            this.p,this.p2,this.p3,this.p4
        ]
    }

    constructor(){
        this.p.relationAccount.push(this.a1);
        this.p.relationAccount.push(this.a2);
        this.p.relationAccount.push(this.a3);

        this.p2.relationAccount.push(this.a4)
        this.p2.relationAccount.push(this.a5)

        this.p3.relationAccount.push(this.a6)
        this.p3.relationAccount.push(this.a7)
        this.p3.relationAccount.push(this.a8)

        this.p4.relationAccount.push(this.a9)
        this.p4.relationAccount.push(this.a10)

        this.a1.relationLawcase.push(this.c1)
        this.a1.relationLawcase.push(this.c2)
        this.a1.relationLawcase.push(this.c3)
        this.a1.relationLawcase.push(this.c4)
        this.a1.relationLawcase.push(this.c5)
        this.a1.relationLawcase.push(this.c6)
        this.a1.relationLawcase.push(this.c7)

        this.a6.relationLawcase.push(this.c8)

        this.a7.relationLawcase.push(this.c9)
        this.a7.relationLawcase.push(this.c10)

        this.a9.relationLawcase.push(this.c11)
        this.a10.relationLawcase.push(this.c11)
    }

    public get data():Lawcase{
        return this.mainCase;
    }

}

