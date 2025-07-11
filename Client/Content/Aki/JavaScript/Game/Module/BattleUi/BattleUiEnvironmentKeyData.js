"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiEnvironmentKeyData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class BattleUiEnvironmentKeyData {
  constructor() {
    this.jQe = 0;
    this.WQe = [];
  }
  GetCurEnvironmentalKey() {
    return this.jQe;
  }
  GetCurKeyText() {
    return BattleUiEnvironmentKeyData.KQe[this.jQe];
  }
  Init() {
    this.jQe = 0;
    this.WQe.length = 0;
    this.WQe.push(true);
    for (let e = 1; e < 10; e++) {
      this.WQe.push(false);
    }
  }
  SetEnvironmentKeyVisible(t, e) {
    if (this.WQe[t] !== e) {
      if (this.WQe[t] = e) {
        if (this.jQe < t) {
          this.jQe = t;
          this.QQe();
        }
      } else if (!(this.jQe > t)) {
        for (let e = t - 1; e >= 0; e--) {
          if (this.WQe[e]) {
            this.jQe = e;
            this.QQe();
            return;
          }
        }
      }
    }
  }
  QQe() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "环境特性快捷键类型改变", ["type", this.jQe]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiEnvironmentKeyChanged);
  }
  OnLeaveLevel() {
    this.jQe = 0;
    for (let e = 1; e < 10; e++) {
      this.WQe[e] = false;
    }
  }
  Clear() {}
}
(exports.BattleUiEnvironmentKeyData = BattleUiEnvironmentKeyData).KQe = [undefined, "HotKeyText_SilentAreaTips_Name", "HotKeyText_EnvironmentBuffTips_Name", "HotKeyText_SilentAreaTips_Name", "HotKeyText_RogueInfoTips_Name", "HotKeyText_VisionLevelTips_Name", "HotKeyText_TowerTokenTips_Name", "HotKeyText_RogueInfoTips_Name", "HotKeyText_MoraleTokenTips_Name", "HotKeyText_MoraleAreaSum_Name"];
//# sourceMappingURL=BattleUiEnvironmentKeyData.js.map