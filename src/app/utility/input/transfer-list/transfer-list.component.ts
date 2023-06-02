import { Component, Input } from '@angular/core';
import { DataTransferList, Transferlist } from 'global/utils/tranferList';

@Component({
  selector: 'transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss']
})
export class TransferListComponent {

  leftChecked: DataTransferList[] = [];
  rightChecked: DataTransferList[] = [];


  @Input()
  transferList: Transferlist = {
    leftData: [],
    leftPlaceHolder: 'Default placeholder',
    leftTitle: 'Default Title',
    rightData: [],
    rightPlaceHolder: 'Default placeholder',
    rightTitle: 'Default Title'
  }



  checked(value: DataTransferList, isLeft: boolean) {

    if (isLeft) {

      const isDataExist = this.leftChecked.find(data => data.id === value.id);

      if (isDataExist) {
        this.leftChecked = this.leftChecked.filter(data => data.id !== value.id)
        return;
      }

      this.leftChecked.push(value);
      return;
    }
    
    const isDataExist = this.rightChecked.find(data => data.id === value.id);

    if(isDataExist){
      this.rightChecked = this.rightChecked.filter(data => data.id !== value.id)
      return;
    }

    this.rightChecked.push(value);
  }

  transferToRight() {
    this.leftChecked.forEach(data => {
      this.transferList.rightData.unshift(data);
      this.transferList.leftData = this.transferList.leftData.filter(fData => fData.id !== data.id)
    });

    this.leftChecked = [];
  }

  transferToLeft() {
    this.rightChecked.forEach(data => {
      this.transferList.leftData.unshift(data);
      this.transferList.rightData = this.transferList.rightData.filter(fData => fData.id !== data.id)
    });

    this.rightChecked = [];
  }
}
