"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEvolveItem = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LINE_ROTATOR_YAW_OFFSET = 180;
class FloroRanchEvolveItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.KLu = undefined;
    this.cco = [];
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [3, UE.UIItem], [2, UE.UIItem]];
  }
  OnStart() {
    this.KLu = this.GetItem(2);
    this.KLu.SetUIActive(false);
  }
  Refresh(e) {
    if (e) {
      this.GetRootItem().SetUIActive(true);
      this.GetText(1).SetText(e.CurLevel.toString());
      this.GetSprite(0).SetFillAmount(e.CurExp / e.ExpPerLevel);
      this.mco(e);
    } else {
      this.GetRootItem().SetUIActive(false);
    }
  }
  mco(t) {
    if (this.cco.length < t.ExpPerLevel) {
      for (let e = this.cco.length; e < t.ExpPerLevel; e++) {
        var i = this.Bqe();
        this.cco.push(i);
      }
    }
    var s = 360 / t.ExpPerLevel;
    for (let e = 0; e < this.cco.length; e++) {
      var r;
      var h = this.cco[e];
      if (e >= t.ExpPerLevel) {
        h.SetUIActive(false);
      } else {
        h.SetUIActive(true);
        r = new UE.Rotator(0, LINE_ROTATOR_YAW_OFFSET - s * e, 0);
        h.SetUIRelativeRotation(r);
      }
    }
  }
  Bqe() {
    return LguiUtil_1.LguiUtil.CopyItem(this.KLu, this.GetItem(3));
  }
}
exports.FloroRanchEvolveItem = FloroRanchEvolveItem;
//# sourceMappingURL=FloroRanchEvolveItem.js.map