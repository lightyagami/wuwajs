"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueEnvironmentTips = undefined;
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRogueEnvironmentTips extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.tlo = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIButtonComponent]];
    this.BtnBindInfo = [[1, this.tlo]];
  }
  OnBeforeShow() {
    var e = ModelManager_1.ModelManager.WeeklyRogueModel.ActivityData.GetCycleConfig();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.BuffDesc, ...e.BuffDescParam);
  }
}
exports.WeeklyRogueEnvironmentTips = WeeklyRogueEnvironmentTips;
//# sourceMappingURL=WeeklyRogueEnvironmentTips.js.map