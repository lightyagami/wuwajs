"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventCommonTip2 = undefined;
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const LevelEventLockInputState_1 = require("../LevelEventLockInputState");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const BLOCK_INPUTTAG = "BlockAllInputTag";
class LevelEventCommonTip2 extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.WDe = undefined;
    this.Zkl = false;
    this.Z4l = () => {
      this.FinishExecute(true);
    };
  }
  ExecuteNew(e, t) {
    if (e) {
      e = e.TipOption;
      if (e.Type === IAction_1.ECommonTip2Type.PrepareCountdown) {
        this.Zkl = e.IsBlockPlayer ?? false;
        if (this.Zkl) {
          if (LevelEventLockInputState_1.LevelEventLockInputState.IsLockInput()) {
            LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.push(BLOCK_INPUTTAG);
            ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
          } else {
            ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTag(BLOCK_INPUTTAG);
            LevelEventLockInputState_1.LevelEventLockInputState.Lock([BLOCK_INPUTTAG]);
          }
        }
        switch (e.UiStyle) {
          case "Common":
            this.WDe = "LevelGamePlayPrepareCountDown";
            break;
          case "MotorRacing":
            this.WDe = "LevelGamePlayMotorPrepareCountDown";
            break;
          default:
            this.WDe = "LevelGamePlayPrepareCountDown";
        }
        e = {
          CountDownNum: e.CountDownNum,
          TidText: e.TidCountDownTxt
        };
        UiManager_1.UiManager.OpenView(this.WDe, e);
        if (this.IsAsync) {
          this.FinishExecute(true);
        } else {
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.LevelGamePlayPrepareCountDownEnd, this.Z4l);
        }
      }
    }
  }
  OnFinish() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.LevelGamePlayPrepareCountDownEnd, this.Z4l);
    if (this.Zkl) {
      LevelEventLockInputState_1.LevelEventLockInputState.Unlock();
      ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
    }
    this.Zkl = false;
  }
}
exports.LevelEventCommonTip2 = LevelEventCommonTip2;
//# sourceMappingURL=LevelEventCommonTip2.js.map