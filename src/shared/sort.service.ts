import { Injectable } from '@angular/core';
import { formatVideoDuration } from './date-utils';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  constructor() {}
  public sortByDate<T>(data: T[], key: string, isSorting: boolean) {
    const copyOfData = [...data];
    copyOfData.sort((firstItem, secondItem) => {
      const date1 = new Date((<any>firstItem)[key]);
      const date2 = new Date((<any>secondItem)[key]);
      if (isSorting) {
        return date1.getTime() - date2.getTime();
      } else {
        return date2.getTime() - date1.getTime();
      }
    });

    return copyOfData;
  }
  public sortAlphabetically<T>(data: T[], key: string, isSorting: boolean) {
    const copyOfData = [...data];
    copyOfData.sort((a: any, b: any) => {
      const valueA = a[key].toLowerCase();
      const valueB = b[key].toLowerCase();
      if (isSorting) {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
    return copyOfData;
  }
  public sortContentsByVideoLength(contents: any[], isSorting: boolean): any[] {
    const copyOfContents = [...contents];
    return copyOfContents.sort((a, b) => {
      const timeA = formatVideoDuration(+a.landscape_video_length);
      const timeB = formatVideoDuration(+b.landscape_video_length);

      return isSorting
        ? timeA.localeCompare(timeB)
        : timeB.localeCompare(timeA);
    });
  }
  public sortByTvStatus<T>(items: T[], key: string, isSorting: boolean) {
    const copyOfData = [...items];
    return copyOfData.sort((a: any, b: any) => {
      const comparison = isSorting
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
      return comparison;
    });
  }
}
