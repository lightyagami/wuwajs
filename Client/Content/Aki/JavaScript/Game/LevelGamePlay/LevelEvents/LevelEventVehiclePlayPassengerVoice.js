"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventVehiclePlayPassengerVoice = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventVehiclePlayPassengerVoice extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    if (e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Vehicle", 42, "[LevelEventVehiclePlayPassengerVoice] 进入触发器");
      }
      if (ModelManager_1.ModelManager.GameAudioModel?.CheckRideSharingState()) {
        if (e.TriggerPassengers?.Passengers && e.TriggerPassengers.Passengers.length > 0) {
          var a = ModelManager_1.ModelManager.VehicleModel.RideSharingInfoMap.values().next().value.RoleId;
          if ((e.TriggerPassengers.MatchNone ?? false) === e.TriggerPassengers.Passengers.includes(a)) {
            this.FinishExecute(false);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Vehicle", 42, "[LevelEventVehiclePlayPassengerVoice] 播放共乘语音取消，角色不在触发列表中");
            }
            return;
          }
        }
        ModelManager_1.ModelManager.GameAudioModel.PlayRideSharingPlotAudio(e.TriggerType);
        this.FinishExecute(true);
      } else if (ModelManager_1.ModelManager.FishingModel?.GetShipData().IsShipDriving()) {
        ModelManager_1.ModelManager.GameAudioModel?.PlayFishingAudio(e.TriggerType);
        this.FinishExecute(true);
      } else {
        this.FinishExecute(false);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Vehicle", 42, "[LevelEventVehiclePlayPassengerVoice] 不在共乘状态，执行播放共乘语音失败");
        }
      }
    } else {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Vehicle", 42, "[LevelEventVehiclePlayPassengerVoice] 参数异常，执行播放共乘语音失败");
      }
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventVehiclePlayPassengerVoice = LevelEventVehiclePlayPassengerVoice;
//# sourceMappingURL=LevelEventVehiclePlayPassengerVoice.js.map