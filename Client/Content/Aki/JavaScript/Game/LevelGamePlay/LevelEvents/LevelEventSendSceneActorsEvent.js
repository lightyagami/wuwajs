"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSendSceneActorsEvent = undefined;
const Log_1 = require("../../../Core/Common/Log");
const GlobalData_1 = require("../../GlobalData");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSendSceneActorsEvent extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("LevelEvent", 79, "[LevelEventSendSceneActorsEvent] LevelEvent向蓝图发送音乐节拍事件", ["MusicEventType", e.ActorEvent.Type]);
      }
      GlobalData_1.GlobalData.BpEventManager.音乐节拍事件触发时.Broadcast(e.ActorEvent.Type);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 79, "[LevelEventSendSceneActorsEvent] 参数不合法");
    }
  }
}
exports.LevelEventSendSceneActorsEvent = LevelEventSendSceneActorsEvent;
//# sourceMappingURL=LevelEventSendSceneActorsEvent.js.map