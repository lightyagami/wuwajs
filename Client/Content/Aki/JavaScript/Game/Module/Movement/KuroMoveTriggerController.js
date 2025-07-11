"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoveTriggerController = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
class MoveTriggerController extends ControllerBase_1.ControllerBase {
  static OnClear() {
    MoveTriggerController.ClearController();
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, MoveTriggerController.nye);
    return true;
  }
  static OnInit() {
    UE.KuroMoveTriggerController.UnRegisterController();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, MoveTriggerController.nye);
    return true;
  }
  static nye() {
    MoveTriggerController.ClearController();
    MoveTriggerController.Mqi = ActorSystem_1.ActorSystem.Get(UE.KuroMoveTriggerController.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble);
    if (MoveTriggerController.Mqi) {
      UE.KuroMoveTriggerController.RegisterController(MoveTriggerController.Mqi);
      MoveTriggerController.Mqi.Callback.Add(r => {
        for (let e = 0; e < r.Num(); ++e) {
          var o = r.Get(e);
          if (o.Actor instanceof TsBaseCharacter_1.default && o.Actor?.IsValid()) {
            var t = o.Actor?.CharacterActorComponent?.Entity;
            if (t?.Valid && o.Area === 0) {
              const l = t.GetComponent(77);
              if (o.EnterOverlap) {
                if (l?.Valid) {
                  l.InSwimTriggerCount++;
                  l.LogSwimTriggerCount();
                }
              } else if (l?.Valid && l.InSwimTriggerCount > 0) {
                if (l.IsRole) {
                  TimerSystem_1.TimerSystem.Delay(() => {
                    if (l?.Valid && l.InSwimTriggerCount > 0) {
                      l.InSwimTriggerCount--;
                      l.LogSwimTriggerCount();
                    }
                  }, 1000);
                } else {
                  l.InSwimTriggerCount--;
                  l.LogSwimTriggerCount();
                }
              }
            }
          }
        }
      });
      MoveTriggerController.Mqi.InitAllTriggers();
    }
  }
  static LeaveLevel() {
    MoveTriggerController.ClearController();
    return true;
  }
  static ClearController() {
    if (MoveTriggerController.Mqi) {
      ActorSystem_1.ActorSystem.Put("MoveTriggerController.ClearController", MoveTriggerController.Mqi);
    }
    UE.KuroMoveTriggerController.UnRegisterController();
    MoveTriggerController.Mqi = undefined;
  }
}
(exports.MoveTriggerController = MoveTriggerController).Mqi = undefined;
//# sourceMappingURL=KuroMoveTriggerController.js.map