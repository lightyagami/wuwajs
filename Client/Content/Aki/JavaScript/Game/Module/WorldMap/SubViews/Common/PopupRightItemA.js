"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PopupRightItemA = undefined;
const UE = require("ue");
const PopupTypeRightItem_1 = require("../../../../Ui/Common/PopupTypeRightItem");
const PopupCaption_1 = require("./PopupCaption");
class PopupRightItemA extends PopupTypeRightItem_1.PopupTypeRightItem {
  constructor() {
    super(...arguments);
    this.zJa = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIItem], [0, UE.UIButtonComponent], [2, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickCloseBtn]];
  }
  async OnBeforeStartAsync() {
    this.zJa = new PopupCaption_1.PopupCaption();
    this.zJa.OnCloseCall = this.OnClickCloseBtn;
    await this.zJa.CreateByActorAsync(this.GetItem(2).GetOwner());
    this.AddChild(this.zJa);
  }
  SetTitleIcon(t) {
    this.zJa.SetTitleIcon(t);
  }
  SetTitleLocalTxt(t) {
    this.zJa.SetTitleLocalTxt(t);
  }
}
exports.PopupRightItemA = PopupRightItemA;
//# sourceMappingURL=PopupRightItemA.js.map