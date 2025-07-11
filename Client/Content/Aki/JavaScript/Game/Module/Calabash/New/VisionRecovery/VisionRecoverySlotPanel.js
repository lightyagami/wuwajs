"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecoverySlotPanel = undefined;
const UE = require("ue");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const CalabashDefine_1 = require("../../CalabashDefine");
const VisionRecoverySlotItem_1 = require("./VisionRecoverySlotItem");
class VisionRecoverySlotPanel extends UiPanelBase_1.UiPanelBase {
  constructor(e, i = true) {
    super();
    this.hMt = new Array(CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM);
    this.lMt = new Array(CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM);
    this._Mt = undefined;
    this.nMt = false;
    this._Mt = e;
    this.nMt = i;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = new Array();
    e.push(this.uMt(0));
    e.push(this.uMt(1));
    e.push(this.uMt(2));
    e.push(this.uMt(3));
    e.push(this.uMt(4));
    await Promise.all(e);
  }
  async uMt(e) {
    var i = this.GetItem(e);
    var s = new VisionRecoverySlotItem_1.VisionRecoverySlotItem(this._Mt, this.nMt);
    await s.CreateThenShowByActorAsync(i.GetOwner());
    this.lMt[e] = s;
  }
  RefreshUi(s) {
    for (let i = 0; i < this.hMt.length; i++) {
      let e = this.hMt[i];
      e = i >= s.length ? undefined : s[i];
      this.lMt[i].RefreshUi(e);
    }
  }
}
exports.VisionRecoverySlotPanel = VisionRecoverySlotPanel;
//# sourceMappingURL=VisionRecoverySlotPanel.js.map