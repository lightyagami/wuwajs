"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeeklyRogueTagItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
class WeeklyRogueTagItem extends GridProxyAbstract_1.GridProxyAbstract {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText]];
  }
  Refresh(e, r, t) {
    e = ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeekTagConfig(e);
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.Name);
      this.GetSprite(0).SetColor(UE.Color.FromHex(e.Color));
    }
  }
}
exports.WeeklyRogueTagItem = WeeklyRogueTagItem;
//# sourceMappingURL=WeeklyRogueTagItem.js.map