"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformAlertState = undefined;
const AiContollerLibrary_1 = require("../../../../AI/Controller/AiContollerLibrary");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const NpcPerformBaseState_1 = require("./NpcPerformBaseState");
const TURN_SPEED = 20000;
class NpcPerformAlertState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments);
    this.Oer = () => {
      this.StateMachine.Switch(1);
    };
  }
  CanChangeFrom(e) {
    var t = this.Owner.Entity.GetComponent(197);
    return this.Owner.Entity.GetComponent(48)?.AiController?.AiAlert?.AiAlertConfig !== undefined && e === 1 && !t.IsInPlot;
  }
  OnEnter(e) {
    var t;
    var r;
    if (Global_1.Global.BaseCharacter) {
      t = Global_1.Global.BaseCharacter.CharacterActorComponent;
      r = this.Owner.Entity.GetComponent(3);
      AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(r, t.ActorLocationProxy, TURN_SPEED);
      EventSystem_1.EventSystem.AddWithTarget(this.Owner.Entity, EventDefine_1.EEventName.OnStalkAlertLifted, this.Oer);
    }
  }
  OnExit(e) {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Owner.Entity, EventDefine_1.EEventName.OnStalkAlertLifted, this.Oer);
  }
}
exports.NpcPerformAlertState = NpcPerformAlertState;
//# sourceMappingURL=NpcPerformAlertState.js.map