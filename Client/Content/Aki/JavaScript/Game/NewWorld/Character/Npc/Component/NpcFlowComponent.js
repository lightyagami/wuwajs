"use strict";

var __decorate = this && this.__decorate || function (t, e, o, i) {
  var n;
  var r = arguments.length;
  var s = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, o, i);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (n = t[a]) {
        s = (r < 3 ? n(s) : r > 3 ? n(e, o, s) : n(e, o)) || s;
      }
    }
  }
  if (r > 3 && s) {
    Object.defineProperty(e, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcFlowComponent = undefined;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterFlowComponent_1 = require("../../Common/Component/Flow/CharacterFlowComponent");
const NpcFlowLogic_1 = require("../Logics/NpcFlowLogic");
const STOP_MONTAGE_BLEND_OUT_TIME = 0.3;
let NpcFlowComponent = class NpcFlowComponent extends CharacterFlowComponent_1.CharacterFlowComponent {
  constructor() {
    super(...arguments);
    this.Stn = undefined;
    this.yj_ = -1;
    this.KYs = -1;
  }
  OnStart() {
    this.Stn = this.Entity.GetComponent(125);
    super.OnStart();
    return true;
  }
  InitFlowLogic(t) {
    if (t) {
      this.FlowLogic = new NpcFlowLogic_1.NpcFlowLogic(this.ActorComp, t);
      this.InitFlowLogicRange(this.FlowData?.EnterRange, this.FlowData?.LeaveRange);
      this.IsEnter = false;
      this.IsInit = true;
    }
  }
  InitFlowLogicRange(t, e) {
    return !!super.InitFlowLogicRange(t, e) && (this.Stn?.SetLogicRange(e ?? CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE), true);
  }
  CheckCondition() {
    return !!super.CheckCondition() && !!this.Stn && (this.Stn.IsInLogicRange && ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId !== this.Entity.Id || (this.ForceStopFlow(), false));
  }
  TryPlayMontage(t) {
    this.KYs = -1;
    this.yj_ = -1;
    var e = this.Entity.GetComponent(46);
    if (e && t?.includes("/")) {
      this.KYs = e.PlayPerformMontage(3, {
        MontagePath: t,
        OnStartCallback: t => {
          this.yj_ = t;
        },
        OnEndCallback: () => {
          this.yj_ = -1;
        }
      });
    }
    return false;
  }
  Vtn() {
    var t;
    if (this.ActorComp && this.ActorComp.SkeletalMesh && (t = this.Entity.GetComponent(46))) {
      t.EnableAction(this.KYs, false);
      t.StopPerformMontage(3, {
        Method: 0,
        BlendOutTime: STOP_MONTAGE_BLEND_OUT_TIME,
        HandleId: this.yj_
      });
    }
  }
  RemoveFlowActions() {
    var t = this.FlowLogic;
    t?.HideDialogueText();
    t?.ClearAudio();
    this.Vtn();
  }
  GetTimberId() {
    return this.FlowData?.TimberId;
  }
};
NpcFlowComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(189)], NpcFlowComponent);
exports.NpcFlowComponent = NpcFlowComponent; //# sourceMappingURL=NpcFlowComponent.js.map