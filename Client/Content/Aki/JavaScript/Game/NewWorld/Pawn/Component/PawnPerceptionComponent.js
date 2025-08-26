"use strict";

var __decorate = this && this.__decorate || function (t, e, i, n) {
  var s;
  var h = arguments.length;
  var o = h < 3 ? e : n === null ? n = Object.getOwnPropertyDescriptor(e, i) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, i, n);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (s = t[r]) {
        o = (h < 3 ? s(o) : h > 3 ? s(e, i, o) : s(e, i)) || o;
      }
    }
  }
  if (h > 3 && o) {
    Object.defineProperty(e, i, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PawnPerceptionComponent = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const DISTANCE_OFFSET = 100;
const INTERACT_LOGIC_OFFSET = 100;
let PawnPerceptionComponent = class PawnPerceptionComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Can = undefined;
    this.vhn = false;
    this.Mhn = false;
    this.Ehn = false;
    this.NearbyEnable = false;
    this.Shn = false;
    this.yhn = undefined;
    this.rzr = undefined;
    this.ConfigId = -0;
    this.Ihn = undefined;
    this._Vu = new Map();
    this.uVu = new Set();
    this.Thn = undefined;
    this.Lhn = undefined;
    this.vzr = () => {
      if (this.Shn) {
        this.Shn = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveNearbyTrackRange, this.Entity);
      }
    };
    this.Rhn = t => {
      this.NearbyEnable = t;
      this.Shn = false;
    };
  }
  get IsInInteractRange() {
    return this.vhn;
  }
  get InAnyOptionWithOffsetRange() {
    return this.uVu.size > 0;
  }
  get IsInAdsorbRange() {
    return this.Mhn;
  }
  get IsInSightRange() {
    return this.Ehn;
  }
  SetInteractRange(t, e = 0, i = undefined) {
    this.rzr.SetLogicRange(Math.max(t + INTERACT_LOGIC_OFFSET, e) + (i ? i.Size() : 0));
    if (this.Ihn) {
      this.Ihn.UpdateDistance(t, e === 0 ? t : e);
    } else {
      this.Ihn = this.rzr.CreatePerceptionEvent(t, this.Entity?.GameBudgetManagedToken, () => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Interaction", 36, "进入交互范围", ["EntityId", this.Entity.Id]);
        }
        this.vhn = true;
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnInEntityInteractRangeChange, true);
      }, () => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Interaction", 36, "离开交互范围", ["EntityId", this.Entity.Id]);
        }
        this.vhn = false;
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnInEntityInteractRangeChange, false);
      }, undefined, undefined, e, i);
    }
  }
  SetOffsetOptionInteractRange(t, e, i = 0, n = undefined, s = undefined, h = undefined) {
    this.rzr.SetLogicRange(Math.max(e + INTERACT_LOGIC_OFFSET, i) + (n ? n.Size() : 0));
    if (this._Vu.has(t)) {
      const o = this._Vu.get(t);
      o.UpdateDistance(e, i === 0 ? e : i);
    }
    const o = this.rzr.CreatePerceptionEvent(e, this.Entity?.GameBudgetManagedToken, () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 31, "进入交互范围", ["EntityId", this.Entity.Id], ["OptionId", t]);
      }
      if (s) {
        s();
      }
      this.uVu.add(t);
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnInEntityInteractRangeChange, true);
    }, () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Interaction", 31, "离开交互范围", ["EntityId", this.Entity.Id], ["OptionId", t]);
      }
      if (h) {
        h();
      }
      this.uVu.delete(t);
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnInEntityInteractRangeChange, false);
    }, undefined, undefined, i, n);
    this._Vu.set(t, o);
  }
  SetSightRange(t) {
    this.rzr.SetLogicRange(t);
    if (this.Thn) {
      this.Thn.UpdateDistance(t);
    } else {
      this.Thn = this.rzr.CreatePerceptionEvent(t, this.Entity?.GameBudgetManagedToken, () => {
        this.Ehn = true;
      }, () => {
        this.Ehn = false;
      });
    }
  }
  SetGuideRange(t) {
    this.rzr.SetLogicRange(t);
    if (this.Lhn) {
      this.Lhn.UpdateDistance(t);
    } else {
      this.Lhn = this.rzr.CreatePerceptionEvent(t, this.Entity?.GameBudgetManagedToken, () => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnGuideRangeEnter, this.Entity.Id);
      });
    }
  }
  OnInitData() {
    this.yhn = UE.NewMap(UE.BuiltinInt, UE.BuiltinInt);
    this.ConfigId = this.Entity.GetComponent(0).GetPbDataId();
    return true;
  }
  OnInit() {
    this.rzr = this.Entity.GetComponent(122);
    return true;
  }
  OnStart() {
    var t = this.Entity.GetComponent(0);
    this.Can = this.Entity.GetComponent(1);
    var e = this.Can.Owner;
    if (UE.KismetSystemLibrary.IsValid(e)) {
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange, this.vzr);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnUpdateNearbyEnable, this.Rhn);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Pawn", 7, "[PawnPerceptionComponent.OnStart] 非法Actor", ["PbDataId", t.GetPbDataId()]);
      }
      return false;
    }
  }
  OnActivate() {
    var t;
    var e;
    var i = this.Entity.GetComponent(161);
    if (i) {
      t = i.ShowRange;
      e = i.HideRange;
      this.NearbyEnable = i.EnableTracking;
      this.Shn = false;
      this.rzr.CreatePerceptionEvent(t, this.Entity?.GameBudgetManagedToken, () => {
        this.Shn = true;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterNearbyTrackRange, this.Entity);
      }, () => {
        this.Shn = false;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveNearbyTrackRange, this.Entity);
      }, undefined, () => this.NearbyEnable, e);
      this.rzr.SetLogicRange(t);
      this.rzr.SetLogicRange(e + DISTANCE_OFFSET);
    }
    return true;
  }
  OnEnd() {
    if (this.Shn) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveNearbyTrack, this.Entity);
    }
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.LeaveLogicRange, this.vzr);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnUpdateNearbyEnable, this.Rhn);
    this.Ihn = undefined;
    this.Thn = undefined;
    this.Lhn = undefined;
    this.yhn.Empty();
    return true;
  }
  GetDebugString() {
    let t = "";
    t += `InteractRangeToken: ${this.Ihn?.EventToken ?? "undefined"}; IsInRangeInternal: ${this.vhn}
InteractRangeInfo:
`;
    if (this.Ihn) {
      t += cpp_1.FKuroPerceptionInterface.GetPlayerPerceptionDebugString(this.Ihn.EventToken);
    }
    if (this._Vu.size > 0) {
      t += "\nOptionInteractRangeInfo:\n";
      for (const e of this._Vu.values()) {
        t += cpp_1.FKuroPerceptionInterface.GetPlayerPerceptionDebugString(e.EventToken) + "\n";
      }
    }
    return t;
  }
};
PawnPerceptionComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(120)], PawnPerceptionComponent);
exports.PawnPerceptionComponent = PawnPerceptionComponent; //# sourceMappingURL=PawnPerceptionComponent.js.map