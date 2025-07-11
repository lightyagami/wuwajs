"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
class TsAnimNotifyBonesShowControl extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.BoneName = undefined;
    this.Show = false;
  }
  Constructor() {}
  K2_Notify(t, s) {
    if (t.IsBoneHiddenByName(this.BoneName) === this.Show) {
      if (this.Show) {
        t.UnHideBoneByName(this.BoneName);
      } else {
        t.HideBoneByName(this.BoneName, 0);
      }
    }
    return true;
  }
  GetNotifyName() {
    return "控制骨骼显隐";
  }
}
exports.default = TsAnimNotifyBonesShowControl;
//# sourceMappingURL=TsAnimNotifyBonesShowControl.js.map