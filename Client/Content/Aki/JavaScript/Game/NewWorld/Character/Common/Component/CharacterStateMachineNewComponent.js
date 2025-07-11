"use strict";

var __decorate = this && this.__decorate || function (t, e, a, o) {
  var n;
  var i = arguments.length;
  var r = i < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, a) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, a, o);
  } else {
    for (var s = t.length - 1; s >= 0; s--) {
      if (n = t[s]) {
        r = (i < 3 ? n(r) : i > 3 ? n(e, a, r) : n(e, a)) || r;
      }
    }
  }
  if (i > 3 && r) {
    Object.defineProperty(e, a, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterStateMachineNewComponent = undefined;
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const AiStateMachineGroup_1 = require("../../../../AI/StateMachine/AiStateMachineGroup");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
let CharacterStateMachineNewComponent = class CharacterStateMachineNewComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.StateMachineName = "";
    this.StateMachineJsonObject = undefined;
    this.StateMachineGroup = undefined;
  }
  OnTick(t) {
    this.StateMachineGroup.OnTick(t);
  }
  OnInit() {
    this.StateMachineGroup = new AiStateMachineGroup_1.AiStateMachineGroup(this);
    return true;
  }
  OnActivate() {
    this.StateMachineGroup.OnActivate();
    return true;
  }
  OnEnd() {
    this.StateMachineGroup?.Clear();
    return !(this.StateMachineGroup = undefined);
  }
  OnControl() {
    this.StateMachineGroup.OnControl();
  }
  static ChangeStateNotify(t, e, a) {
    a = MathUtils_1.MathUtils.LongToBigInt(a.$8n);
    t?.GetComponent(76)?.StateMachineGroup.HandleSwitch(e.$4n, e.J4n, e.z4n, a);
  }
  static ChangeStateConfirmNotify(t, e) {
    t?.GetComponent(76)?.StateMachineGroup.HandleChangeStateConfirm(e.$4n, e.Y4n);
  }
  static FsmResetNotify(t, e, a) {
    a = MathUtils_1.MathUtils.LongToBigInt(a.$8n);
    t?.GetComponent(76)?.StateMachineGroup.ResetStateMachine(e.Uys, a);
  }
  static FsmBlackboardNotify(t, e) {
    t?.GetComponent(76)?.StateMachineGroup.HandleBlackboard(e);
  }
  static FsmCustomBlackboardNotify(t, e) {
    t?.GetComponent(76)?.StateMachineGroup.HandleCustomBlackboard(e);
  }
};
CharacterStateMachineNewComponent.EventDrivenOn = true;
__decorate([CombatMessage_1.CombatNet.Listen("e3n", true)], CharacterStateMachineNewComponent, "ChangeStateNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("t3n", true)], CharacterStateMachineNewComponent, "ChangeStateConfirmNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("n3n", true)], CharacterStateMachineNewComponent, "FsmResetNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("h3n", true)], CharacterStateMachineNewComponent, "FsmBlackboardNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("I3n", true)], CharacterStateMachineNewComponent, "FsmCustomBlackboardNotify", null);
CharacterStateMachineNewComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(76)], CharacterStateMachineNewComponent);
exports.CharacterStateMachineNewComponent = CharacterStateMachineNewComponent; //# sourceMappingURL=CharacterStateMachineNewComponent.js.map