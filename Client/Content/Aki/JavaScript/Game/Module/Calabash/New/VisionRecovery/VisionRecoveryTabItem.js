"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecoveryTabItem = undefined;
const UE = require("ue");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CalabashDefine_1 = require("../../CalabashDefine");
class VisionRecoveryTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.E9 = 0;
    this.OnClickToggleCallBack = undefined;
    this.kqe = () => {
      this.OnClickToggleCallBack?.(this.E9, this.GetExtendToggle(0));
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIText]];
    this.BtnBindInfo = [[0, this.kqe]];
  }
  Refresh(e, i, t) {
    this.E9 = e;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), CalabashDefine_1.visionRecoveryTabViewTypeName[this.E9]);
  }
  SelectToggle() {
    this.GetExtendToggle(0).SetToggleState(1, true);
  }
}
exports.VisionRecoveryTabItem = VisionRecoveryTabItem;
//# sourceMappingURL=VisionRecoveryTabItem.js.map