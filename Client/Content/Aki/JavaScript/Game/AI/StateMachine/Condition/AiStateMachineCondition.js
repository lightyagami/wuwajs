"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineCondition = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage");
const CharacterStateMachineNewComponent_1 = require("../../../NewWorld/Character/Common/Component/CharacterStateMachineNewComponent");
const AiStateMachine_1 = require("../AiStateMachine");
class AiStateMachineCondition {
  constructor(t, i, e) {
    this.Inited = false;
    this.Node = undefined;
    this.Transition = undefined;
    this.ParentCondition = undefined;
    this.ConditionData = undefined;
    this.Index = undefined;
    this.CheckForClient = false;
    this.Reverse = false;
    this.ResultSelf = false;
    this.LastResult = undefined;
    this.HasTaskFinishCondition = false;
    this.HasSignaled = false;
    this.ResultServer = false;
    this.Node = t.Node;
    this.Transition = t;
    this.ConditionData = i;
    this.Reverse = i.Reverse;
    this.Index = e;
  }
  get Result() {
    return this.ResultSelf === !this.Reverse;
  }
  Init(t) {
    this.CheckForClient = !!this.ConditionData.IsClient;
    this.Inited = this.OnInit(this.ConditionData);
    this.ParentCondition = t;
    return this.Inited;
  }
  OnInit(t) {
    return true;
  }
  Enter() {
    this.LastResult = undefined;
    this.OnEnter();
  }
  OnEnter() {}
  Exit() {
    this.LastResult = undefined;
    this.OnExit();
  }
  OnExit() {}
  Tick() {
    this.OnTick();
    if (this.CanReqFsmConditionPass()) {
      this.ReqFsmConditionPass();
    }
    this.LastResult = this.Result;
  }
  CanReqFsmConditionPass() {
    return !this.Node.RootNode.IsAnimStateMachine && this.CheckForClient && this.Result !== this.LastResult;
  }
  ReqFsmConditionPass() {
    var t = Protocol_1.Aki.Protocol.x1d.create();
    t.$4n = this.Node.RootNode.Uuid;
    t.J4n = this.Transition.From;
    t.z4n = this.Transition.To;
    t.t5n = this.Index;
    t.e5n = this.Result;
    CombatMessage_1.CombatNet.Send(25415, this.Node.Entity, t);
  }
  OnTick() {}
  Clear() {
    this.OnClear();
    this.Node = undefined;
    this.Transition = undefined;
    this.ConditionData = undefined;
    this.ParentCondition = undefined;
  }
  OnClear() {}
  HandleServerDebugInfo(t) {
    this.ResultServer = t[this.Index];
  }
  OnSignaled() {}
  Signaled() {
    if (CharacterStateMachineNewComponent_1.CharacterStateMachineNewComponent.EventDrivenOn && this.CheckForClient) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("StateMachine", 84, "Signaled", ["condition", this.ConditionData.Name]);
      }
      this.HasSignaled = true;
      if (this.CanReqFsmConditionPass()) {
        this.ReqFsmConditionPass();
      }
      this.LastResult = this.Result;
      if (this.ParentCondition) {
        this.ParentCondition.OnSignaled();
      } else if (this.Result) {
        this.Node?.TrySwitch(this.Transition.To);
      }
    }
  }
  RegisterEvents() {
    return CharacterStateMachineNewComponent_1.CharacterStateMachineNewComponent.EventDrivenOn;
  }
  UnregisterEvents() {
    return CharacterStateMachineNewComponent_1.CharacterStateMachineNewComponent.EventDrivenOn;
  }
  ToString(t, i = 0) {
    (0, AiStateMachine_1.appendDepthSpace)(t, i);
    t.Append(`[${this.Result ? "Y" : "N"} `);
    t.Append(`${this.ResultServer ? "Y" : "N"} `);
    t.Append(`${this.CheckForClient ? "C" : "S"}] `);
    if (this.Reverse) {
      t.Append("[取反] ");
    }
    t.Append("" + this.ConditionData.Name);
  }
}
exports.AiStateMachineCondition = AiStateMachineCondition;
//# sourceMappingURL=AiStateMachineCondition.js.map