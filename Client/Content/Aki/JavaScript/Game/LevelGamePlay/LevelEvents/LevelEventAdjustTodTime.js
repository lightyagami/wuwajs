"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventAdjustTodTime = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const TimeOfDayModel_1 = require("../../Module/TimeOfDay/TimeOfDayModel");
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventAdjustTodTime extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o, r) {
    if (e) {
      if (o.Type !== 6 || o.BtType !== Protocol_1.Aki.Protocol.hps.Proto_BtTypeInst) {
        this.FinishExecute(true);
      } else {
        o = e;
        const t = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(o.Hour, o.Min);
        if (t < 0) {
          this.FinishExecute(false);
        } else if (o.ShowUi) {
          UiManager_1.UiManager.ResetToBattleView(e => {
            if (e) {
              UiManager_1.UiManager.OpenView("TimeOfDaySecondView", undefined, e => {
                if (e) {
                  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdjustTimeInAnim, ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second, t, () => {
                    this.FinishExecute(true);
                  });
                } else {
                  ControllerHolder_1.ControllerHolder.TimeOfDayController.AdjustTime(t, Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto);
                  this.FinishExecute(true);
                }
              });
            } else {
              ControllerHolder_1.ControllerHolder.TimeOfDayController.AdjustTime(t, Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto);
              this.FinishExecute(true);
            }
          });
        } else {
          ControllerHolder_1.ControllerHolder.TimeOfDayController.AdjustTime(t, Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto);
          this.FinishExecute(true);
        }
      }
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventAdjustTodTime = LevelEventAdjustTodTime;
//# sourceMappingURL=LevelEventAdjustTodTime.js.map