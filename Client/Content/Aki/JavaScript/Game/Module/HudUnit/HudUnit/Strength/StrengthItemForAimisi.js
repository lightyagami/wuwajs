"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StrengthItemForAimisi = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const StrengthItem_1 = require("./StrengthItem");
const childTypeMap = new Map([[8, 0], [7, 1], [11, 2], [10, 3], [3, 5], [9, 6], [13, 7], [12, 8], [14, 9], [15, 10], [16, 11], [17, 12], [18, 13], [19, 14], [20, 15], [21, 16]]);
class StrengthItemForAimisi extends StrengthItem_1.StrengthItem {
  GetResourceId() {
    return "UiItem_EnduranceAimisi";
  }
  OnRegisterComponent() {
    var t = new Map([[1, UE.UISprite], [0, UE.UISprite], [6, UE.UISprite]]);
    this.ComponentRegisterInfos = [];
    for (let e = 0; e < 17; ++e) {
      this.ComponentRegisterInfos.push([e, t.get(e) ?? UE.UIItem]);
    }
  }
  AMg(e) {
    if (childTypeMap.has(e)) {
      return childTypeMap.get(e);
    } else {
      return e;
    }
  }
  GetItem(e) {
    return UiPanelBase_1.UiPanelBase.prototype.GetItem.call(this, this.AMg(e));
  }
  GetSprite(e) {
    return UiPanelBase_1.UiPanelBase.prototype.GetSprite.call(this, this.AMg(e));
  }
  InitUi() {}
  OnAddEntityEvents() {}
  SetNormal(e) {
    var t;
    var i;
    if (this.IsNormalState !== e && (this.IsNormalState = e, t = this.GetSprite(1), i = this.GetSprite(0), t.IsUIActiveSelf() === e && t.SetUIActive(!e), t.IsUIActiveSelf() !== e)) {
      i.SetUIActive(e);
    }
  }
  SetEnable(e) {}
  SetNone(e) {}
  SetBuff(e) {}
}
exports.StrengthItemForAimisi = StrengthItemForAimisi;
//# sourceMappingURL=StrengthItemForAimisi.js.map