"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CipherCircleItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const AutoAttachExhibitionItem_1 = require("../../Module/CircleExhibition/AutoAttachExhibitionItem");
const WRONG_COLOR = "BB5C58";
const RIGHT_COLOR = "F6D03F";
const NORMAL_COLOR = "FFFFFF";
class CipherCircleItem extends AutoAttachExhibitionItem_1.AutoAttachExhibitionItemAbstract {
  constructor() {
    super(...arguments);
    this.fye = 0;
    this.pye = undefined;
    this.Pe = undefined;
    this.vye = UE.Color.FromHex(WRONG_COLOR);
    this.Mye = UE.Color.FromHex(RIGHT_COLOR);
    this.Eye = UE.Color.FromHex(NORMAL_COLOR);
    this.Sye = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  RefreshItem(t) {
    this.pye = this.Pe[this.GetShowItemIndex()];
    if (this.pye !== undefined) {
      this.GetText(0).SetText(this.pye.toString());
    }
  }
  OnSelect() {
    super.OnSelect();
    ModelManager_1.ModelManager.CipherModel.SetCurPassword(this.fye, this.pye);
    this.GetText(0).useChangeColor = false;
    if (this.Sye) {
      this.Sye(this.pye);
    }
  }
  OnUnSelect() {
    super.OnUnSelect();
    this.GetText(0).SetColor(this.Eye);
    this.GetText(0).useChangeColor = true;
  }
  SetData(t) {
    this.Pe = t;
  }
  InitItem(t, i) {
    this.fye = t;
    this.Sye = i;
  }
  HandleConfirm(t) {
    let i = this.vye;
    if (t) {
      i = this.Mye;
    }
    this.GetText(0).SetColor(i);
  }
  GetNumber() {
    return this.pye;
  }
}
exports.CipherCircleItem = CipherCircleItem;
//# sourceMappingURL=CipherCircleItem.js.map