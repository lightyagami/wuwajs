"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventClientUnlockAchievement = undefined;
const Log_1 = require("../../Core/Common/Log");
const Protocol_1 = require("../../Core/Define/Net/Protocol");
const Net_1 = require("../../Core/Net/Net");
const ModelManager_1 = require("../Manager/ModelManager");
const LevelGeneralBase_1 = require("./LevelGeneralBase");
class LevelEventClientUnlockAchievement extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, n) {
    var o;
    if (ModelManager_1.ModelManager.PlayerInfoModel.GetId() === ModelManager_1.ModelManager.CreatureModel.GetWorldOwner()) {
      if (e = e) {
        if (o = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(e.Id)) {
          if (o.GetFinishState() !== 0) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("LevelEvent", 31, "[LevelEventClientUnlockAchievement] 成就已解锁");
            }
          } else {
            (o = Protocol_1.Aki.Protocol.l$n.create()).s5n = e.Id;
            Net_1.Net.Call(18476, o, () => {});
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 31, "[LevelEventClientUnlockAchievement] 成就数据不存在");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 31, "[LevelEventClientUnlockAchievement] 参数不合法");
      }
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("LevelEvent", 31, "[LevelEventClientUnlockAchievement] 副机不跑");
    }
  }
}
exports.LevelEventClientUnlockAchievement = LevelEventClientUnlockAchievement;
//# sourceMappingURL=LevelEventClientUnlockAchievement.js.map