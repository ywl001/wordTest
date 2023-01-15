import { AlignmentType, FrameAnchorType, HeightRule, HorizontalPositionAlign, HorizontalPositionRelativeFrom, IIndentAttributesProperties, ImageRun, IParagraphOptions, ITableCellOptions, LineRuleType, Paragraph, Table, TableCell, TableRow, TextDirection, TextRun, TextWrappingType, VerticalAlign, VerticalPositionAlign, VerticalPositionRelativeFrom, WidthType } from "docx";
import { ITableCellMarginOptions } from "docx/build/file/table/table-properties/table-cell-margin";

/**
 * docx 中的主要对象
 * 
 * 1、Paragraph相当于段落，段落中可包含图片，文字，
 * 文字textrun，文字有内容，字体等样式。图片imageRun，图片主要是大小和布局
 * 2、table、tableRow、tableCell,表格的三个部分，
 * table由row组成，row有高度，没有宽度，宽度是所有cell宽度的和，
 * row由cell组成，cell没有高度，高度就是row的高度
 */
export class DocCreate {
    constructor() { }
    public createPishiText(content: string): Paragraph {
        let op: IParagraphOptions = {
            children: [
                new TextRun({
                    size: '16pt',
                    text: content,
                    font: '仿宋'
                })
            ],
            alignment: AlignmentType.CENTER
        };
        return new Paragraph(op);
    }

    public createTextFrame(text: TextRun, x: number, y: number, w: number, h: number) {
        return new Paragraph({
            frame: {
                position: {
                    x: x,
                    y: y
                },
                width: w,
                height: h,
                anchor: {
                    horizontal: FrameAnchorType.TEXT,
                    vertical: FrameAnchorType.TEXT,
                },
                alignment: {
                    x: HorizontalPositionAlign.CENTER,
                    y: VerticalPositionAlign.TOP,
                },
            },
            children: [text]
        })
    }

    /**
     * 创建表格
     * @param width 表格总宽度
     * @param rows 行数组
     * @returns 
     */
    public createTable(width: string | number,rows:TableRow[]) {
        return new Table({
            width: {
                size: width,
                type: WidthType.AUTO
            },
            rows: rows
        })
    }

    /**
     * 创建行
     * @param height 行高
     * @param cells 单元格
     * @returns 
     */
    public createTableRow(height: string, cells: TableCell[]): TableRow {
        return new TableRow(
            {
                height: {
                    value: height,
                    rule: HeightRule.ATLEAST
                },
                children: cells
            }
        )
    }

    /**
     * 单元格
     * @param width 宽度
     * @param content 内容
     * @param margin 
     * @param align 对齐方式
     * @returns 
     */
    public createTableCell(width: string, content: Paragraph[],margin:ITableCellMarginOptions={}, align: VerticalAlign = VerticalAlign.CENTER) {
        return new TableCell({
            width: {
                size: width,
                type: WidthType.AUTO
            },
            children: content,
            verticalAlign: align,
            margins:margin
        })
    }

    /**
     * 通用段落创建
     * @param content 段落内容
     * @param align 对齐
     * @param indent 缩进
     * @returns 
     */
    public createParagraph(content: TextRun[], align: AlignmentType = AlignmentType.JUSTIFIED,indent:IIndentAttributesProperties = {}) {
        return new Paragraph({
            alignment: align,
            children: content,
            indent:indent,
            spacing:{
                line:300,
                lineRule:LineRuleType.AUTO
            }
        })
    }

    /**
     * 创建文字
     * @param content 文字内容
     * @param size 字体大小
     * @param fontFamily 字体
     * @returns 
     */
    public createTextRun(content: string, size: string, fontFamily: string = '仿宋_GB2312') {
        return new TextRun({
            size: size,
            text: content,
            font: fontFamily,
        })
    }

    public createNullLine():Paragraph{
        return new Paragraph({})
    }

    /**
     * 标题
     * @param content 
     * @returns 
     */
    public createTitle(content:string):Paragraph{
        return this.createParagraph([this.createTextRun(content,'22pt','宋体')],AlignmentType.CENTER)
    }

    /**
     * 正文段落
     * @param content 段落内容
     * @returns 
     */
    public createMainText(content:string){
        return this.createParagraph([this.createTextRun(content,'16pt','仿宋')],AlignmentType.JUSTIFIED,{firstLine:'1.5cm'})
    }

    public createImage(buffer:ArrayBuffer){
        return new ImageRun({
            data: buffer,
            transformation: {
                width: 90,
                height: 120,
            },
            floating: {
                horizontalPosition: {
                    // offset: 1014400*2, // relative: HorizontalPositionRelativeFrom.PAGE by default
                    align:HorizontalPositionAlign.RIGHT,
                    relative:HorizontalPositionRelativeFrom.COLUMN
                },
                verticalPosition: {
                    // offset: 1014400, // relative: VerticalPositionRelativeFrom.PAGE by default
                    align:VerticalPositionAlign.INSIDE,
                    relative:VerticalPositionRelativeFrom.LINE
                },
                wrap:{
                    type:TextWrappingType.SQUARE
                }
            },
        });
    }



}