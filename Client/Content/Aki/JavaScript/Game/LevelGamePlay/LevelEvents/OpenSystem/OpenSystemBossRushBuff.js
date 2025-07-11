"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenSystemBossRushBuff = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BossRushController_1 = require("../../../Module/Activity/ActivityContent/BossRush/BossRushController");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemBossRushBuff extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    var e = e.BoardId;
    var o = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    var s = BossRushController_1.BossRushController.GetBossRushSelectedBuffId(o);
    if (s === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 27, "找不到当前BOSSRUSH 选择的buff", ["currentInstanceLevelId", o]);
      }
      return false;
    } else if (o = ConfigManager_1.ConfigManager.BossRushConfig.GetBossRushBuffDescByClassLevel(s, e)) {
      return ControllerHolder_1.ControllerHolder.SoundAreaPlayTipsController.OpenSoundAreaPlayTips(o.SoundAreaInfoConfigId);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Activity", 27, "找不到当前BOSSRUSH 选择的buff的配置", ["buffId", s], ["classLevel", e]);
      }
      return false;
    }
  }
  GetViewName(e) {
    return "SoundAreaPlayTips";
  }
}
exports.OpenSystemBossRushBuff = OpenSystemBossRushBuff;
//# sourceMappingURL=OpenSystemBossRushBuff.js.map