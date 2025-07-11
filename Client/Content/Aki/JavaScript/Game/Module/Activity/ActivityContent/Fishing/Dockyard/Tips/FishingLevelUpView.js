"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingLevelUpView = undefined;
const UE = require("ue");
const UiViewBase_1 = require("../../../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../../../Util/LguiUtil");
class FishingLevelUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.nqe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[1, UE.UIText], [2, UE.UIText], [0, UE.UIButtonComponent], [3, UE.UIItem]];
    this.BtnBindInfo = [[0, this.nqe]];
  }
  OnStart() {
    var i = this.OpenParam;
    var e = i.IsCurrentLevelMax();
    this.Og(i.LastLevel, i.CurrentLevel, e);
  }
  Og(i, e, s) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "Fishing_LevelUpTip", i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "Fishing_LevelUpTip", e);
    this.GetItem(3).SetUIActive(s);
  }
}
exports.FishingLevelUpView = FishingLevelUpView;
//# sourceMappingURL=FishingLevelUpView.js.map