"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GamePingController = undefined;
const NetInfo_1 = require("../../../Core/Net/NetInfo");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const CloudGameManager_1 = require("../../Manager/CloudGameManager");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const REFRESH_PING_INTERVAL_MS = 100;
const MAX_PING_MS = 999;
const MIN_PING_MS = 1;
class GamePingController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    this.P3e();
    return true;
  }
  static OnClear() {
    this.R6t();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDoneAndCloseLoading, this.FWe);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("PingView", GamePingController.iVe, "GamePingController.CanOpenView");
  }
  static gTo() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return e === 0 || !(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) || e.WorldDungeonSubType !== 1;
  }
  static P3e() {
    GamePingController.qKt = TimerSystem_1.GameplayTimerSystem.Forever(GamePingController.GKt, REFRESH_PING_INTERVAL_MS);
  }
  static R6t() {
    if (GamePingController.qKt !== undefined) {
      TimerSystem_1.GameplayTimerSystem.Remove(GamePingController.qKt);
      GamePingController.qKt = undefined;
    }
  }
}
exports.GamePingController = GamePingController;
(_a = GamePingController).qKt = undefined;
GamePingController.iVe = e => !!_a.gTo();
GamePingController.FWe = () => {
  if (!CloudGameManager_1.CloudGameManager.IsCloudGame) {
    UiManager_1.UiManager.OpenView("PingView");
  }
};
GamePingController.GKt = () => {
  var e = Math.ceil(NetInfo_1.NetInfo.RttMs);
  var e = Math.min(e, MAX_PING_MS);
  e = Math.max(e, MIN_PING_MS);
  ModelManager_1.ModelManager.GamePingModel.CurrentPing = e;
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCheckGamePing, e);
}; //# sourceMappingURL=GamePingController.js.map