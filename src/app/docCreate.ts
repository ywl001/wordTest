import { Table, TableRow, TableCell, Paragraph, BorderStyle, Document, WidthType, HeightRule, TextRun, VerticalAlign, AlignmentType, FrameAnchorType, HorizontalPositionAlign, Tab, VerticalPositionAlign } from "docx";

export const doc = new Document({
    sections: [
        {
            properties: {},
            children: [
                new Paragraph({
                    frame: {
                        position: {
                            x: 1000,
                            y: 3000,
                        },
                        width: 4000,
                        height: 1000,
                        anchor: {
                            horizontal: FrameAnchorType.MARGIN,
                            vertical: FrameAnchorType.MARGIN,
                        },
                        alignment: {
                            x: HorizontalPositionAlign.CENTER,
                            y: VerticalPositionAlign.TOP,
                        },
                    },
                   
                    children: [
                        new TextRun("Hello World"),
                        new TextRun({
                            text: "Foo Bar",
                            bold: true,
                        }),
                        new TextRun({
                            children: [new Tab(), "Github is the best"],
                            bold: true,
                        }),
                    ],
                }),
            ],
        },
    ],
});

// export function cm(num: number) {
//     return Math.ceil(num * 37.8);
// }