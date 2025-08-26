"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventGuideTrigger = undefined;
const Log_1 = require("../../../Core/Common/Log");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventGuideTrigger extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.mDe = 0;
    this.YO = undefined;
    this.IDe = IAction_1.EGuideTriggerType.BeginnerGuide;
    this.TDe = undefined;
    this.LDe = () => {
      if (ControllerHolder_1.ControllerHolder.LevelGeneralController.CheckConditionNew(this.YO, undefined)) {
        TimerSystem_1.GameplayTimerSystem.Remove(this.TDe);
        if (this.IDe === IAction_1.EGuideTriggerType.AttackGuide) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComboTeachingViewOpen, this.mDe);
          this.IsAsync;
          this.FinishExecute(true);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Guide", 16, "行为节点调用引导", ["组Id", this.mDe]);
          }
          if (!ControllerHolder_1.ControllerHolder.GuideController.TryStartGuide(this.mDe) || this.IsAsync) {
            this.FinishExecute(true);
          } else {
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideGroupFinished, this.dDe);
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideGroupBreak, this.dDe);
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GuideGroupRest, this.dDe);
          }
        }
      }
    };
    this.DDe = () => {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingCloseGuide, this.DDe);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComboTeachingFinish, this.DDe);
      this.FinishExecute(true);
    };
    this.dDe = e => {
      if (e === this.mDe) {
        this.mDe = 0;
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideGroupFinished, this.dDe);
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideGroupBreak, this.dDe);
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GuideGroupRest, this.dDe);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Guide", 16, "行为触发的引导组执行完毕", ["组Id", e]);
        }
        this.FinishExecute(true);
      }
    };
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(true);
  }
  ExecuteNew(e, t) {
    if (e) {
      this.YO = {
        Type: 0,
        Conditions: e.Conditions ?? []
      };
      this.mDe = e.GuideId;
      this.IDe = e.Type;
      this.TDe = TimerSystem_1.GameplayTimerSystem.Forever(this.LDe, 1000);
      this.LDe();
    }
  }
}
exports.LevelEventGuideTrigger = LevelEventGuideTrigger;
//# sourceMappingURL=LevelEventGuideTrigger.js.map