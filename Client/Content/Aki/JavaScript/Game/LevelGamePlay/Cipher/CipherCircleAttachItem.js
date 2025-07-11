"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CipherCircleAttachItem = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../Manager/ModelManager");
const AutoAttachItem_1 = require("../../Module/AutoAttach/AutoAttachItem");
const WRONG_COLOR = "BB5C58";
const RIGHT_COLOR = "F6D03F";
const NORMAL_COLOR = "FFFFFF";
class CipherCircleAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments);
    this.fye = 0;
    this.pye = undefined;
    this.vye = UE.Color.FromHex(WRONG_COLOR);
    this.Mye = UE.Color.FromHex(RIGHT_COLOR);
    this.Eye = UE.Color.FromHex(NORMAL_COLOR);
    this.Sye = undefined;
  }
  OnMoveItem() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnRefreshItem(t) {
    this.pye = t;
    if (this.pye !== undefined) {
      this.GetText(0).SetText(this.pye.toString());
    }
  }
  OnSelect() {
    ModelManager_1.ModelManager.CipherModel.SetCurPassword(this.fye, this.pye);
    var t = this.GetText(0);
    t.SetChangeColor(false, t.changeColor);
    if (this.Sye) {
      this.Sye(this.pye);
    }
  }
  OnUnSelect() {
    var t = this.GetText(0);
    t.SetColor(this.Eye);
    t.SetChangeColor(true, t.changeColor);
  }
  InitData(t, e) {
    this.fye = t;
    this.Sye = e;
  }
  HandleConfirm(t) {
    let e = this.vye;
    if (t) {
      e = this.Mye;
    }
    this.GetText(0).SetColor(e);
  }
  GetNumber() {
    return this.pye;
  }
}
exports.CipherCircleAttachItem = CipherCircleAttachItem;
//# sourceMappingURL=CipherCircleAttachItem.js.map