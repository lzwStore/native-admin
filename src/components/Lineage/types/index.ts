
export interface HeaderItem {
  height: number;
  width: number;
  position: {
    x: number;
    y: number;
  }
}
export type HeaderArr = HeaderItem[]

export interface DataParams {
  containerHeight: number;
  titleHeight: number;
  columnWidth: number;
  compWidth: number;
  compHeight: number;
  dataList: any;
  padding: number;
  columnPadding: number;
}
