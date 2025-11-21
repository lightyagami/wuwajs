"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleHonamiStoryRoleSuitItem = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewSequence_1 = require("../../../../Ui/Base/UiViewSequence");
class BattleHonamiStoryRoleSuitItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.xmm = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnBeforeCreateImplement() {
    this.xmm = new UiViewSequence_1.UiBehaviorLevelSequence(this);
    this.AddUiBehavior(this.xmm);
  }
  Refresh(e, t) {
    t = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetPluginSubType(t);
    let i = t.ActiveSpritePath;
    if (e) {
      if ((e = e.CurCount - e.NeedCount) >= 0) {
        i = t.ActiveAllSpritePath;
      } else if (e == -1) {
        i = t.ActiveOneSpritePath;
      }
    }
    this.SetSpriteByPath(i, this.GetSprite(0), true);
  }
  PlayBurst() {
    this.xmm?.StopPrevSequence(false, true);
    this.xmm?.PlaySequence("Burst");
  }
}
exports.BattleHonamiStoryRoleSuitItem = BattleHonamiStoryRoleSuitItem;
//# sourceMappingURL=BattleHonamiStoryRoleSuitItem.js.map