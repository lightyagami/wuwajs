"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResetTimeController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Time_1 = require("../../../Core/Common/Time");
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ReconnectDefine_1 = require("../../Module/ReConnect/ReconnectDefine");
const PLAY_TIME_SECONDS = 172800;
const AFK_TIME_SECONDS = 3600;
const UPDATE_INTERVAL = CommonDefine_1.MILLIONSECOND_PER_SECOND * CommonDefine_1.SECOND_PER_MINUTE;
class ResetTimeController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Timer", 4, "ResetTimeController.OnInit", ["PassSeconds", this.Doh], ["LastInputTime", this.Roh], ["NowSeconds", Time_1.Time.NowSeconds]);
    }
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
    this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(() => {
      this.Doh += CommonDefine_1.SECOND_PER_MINUTE;
      if (this.Doh >= PLAY_TIME_SECONDS && Time_1.Time.NowSeconds - this.Roh > AFK_TIME_SECONDS) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Timer", 4, "ResetTimeController.Logout", ["PassSeconds", this.Doh], ["LastInputTime", this.Roh], ["NowSeconds", Time_1.Time.NowSeconds]);
        }
        ControllerHolder_1.ControllerHolder.ReConnectController.Logout(ReconnectDefine_1.ELogoutReason.ResetTime);
      }
    }, UPDATE_INTERVAL);
    return true;
  }
  static Clear() {
    this.ResetTime();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnInputAnyKey, this.rAt);
    return true;
  }
  static ResetTime() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Timer", 4, "ResetTimeController.ResetTime", ["PassSeconds", this.Doh], ["LastInputTime", this.Roh], ["NowSeconds", Time_1.Time.NowSeconds]);
    }
    if (this.TDe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
      this.TDe = undefined;
    }
    this.Doh = 0;
    this.Roh = 0;
    GlobalData_1.GlobalData.World?.ResetAllTimeSeconds(0);
  }
}
exports.ResetTimeController = ResetTimeController;
(_a = ResetTimeController).Doh = 0;
ResetTimeController.Roh = 0;
ResetTimeController.TDe = undefined;
ResetTimeController.rAt = () => {
  _a.Roh = Time_1.Time.NowSeconds;
}; //# sourceMappingURL=ResetTimeController.js.map