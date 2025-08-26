"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueArtifactGrid = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRogueArtifactGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.OnSelectedChange = undefined;
    this.TokenId = 0;
    this.N8e = () => {
      var t = this.GetExtendToggle(0).GetToggleState() === 1;
      this.OnSelectedChange?.(this.TokenId, t);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText]];
    this.BtnBindInfo = [[0, this.N8e]];
  }
  Refresh(t, e, i) {
    if ((this.TokenId = t) !== 0 && (t = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyBuffPool(t))) {
      this.SetTextureShowUntilLoaded(t.BuffIcon, this.GetTexture(1));
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.BuffName);
    }
  }
  OnSelected(t) {
    this.GetExtendToggle(0).SetToggleState(1, t);
  }
  OnDeselected(t) {
    this.GetExtendToggle(0).SetToggleState(0, t);
  }
  GetKey(t, e) {
    return this.TokenId;
  }
}
exports.WeeklyRogueArtifactGrid = WeeklyRogueArtifactGrid;
//# sourceMappingURL=WeeklyRogueArtifactGrid.js.map