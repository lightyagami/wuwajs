"use strict";

var CharacterAnimationSyncComponent_1;
var __decorate = this && this.__decorate || function (t, i, a, e) {
  var o;
  var n = arguments.length;
  var s = n < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, a) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, i, a, e);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (o = t[r]) {
        s = (n < 3 ? o(s) : n > 3 ? o(i, a, s) : o(i, a)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(i, a, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterAnimationSyncComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Time_1 = require("../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const StringBuilder_1 = require("../../../../../Core/Utils/StringBuilder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
const CombatMessageController_1 = require("../../../../Module/CombatMessage/CombatMessageController");
const CombatLog_1 = require("../../../../Utils/CombatLog");
const WorldGlobal_1 = require("../../../../World/WorldGlobal");
const animationStateListRef = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinInt));
const specialStateListRef = (0, puerts_1.$ref)(UE.NewArray(UE.BuiltinInt));
const animationStates = UE.NewArray(UE.BuiltinInt);
const specialAnimationStates = UE.NewArray(UE.BuiltinInt);
const animationTagList = [792724096, -100527303, -1664105924, -1388636447, -513324610, 1818764431, -726891989, -182271791, -1761987351, 967041502, 1491611589, 20810141, 1173061094];
const MAX_ANIM_STATE_CHANGE_COUNT = 600;
let CharacterAnimationSyncComponent = CharacterAnimationSyncComponent_1 = class CharacterAnimationSyncComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Hte = undefined;
    this.Lie = undefined;
    this.EIe = undefined;
    this.Q3r = new Array();
    this.F4u = 0;
    this.qwr = undefined;
    this.hwl = undefined;
    this.X3r = t => {
      this.$3r();
    };
    this.fwa = 0;
    this.pwa = 5;
    this.Y3r = (t, i) => {
      var a;
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti && this.Hte.IsMoveAutonomousProxy) {
        (a = Protocol_1.Aki.Protocol.Se_.create()).hWn = t;
        a.lWn = i;
        CombatMessage_1.CombatNet.Send(26084, this.Entity, a);
      }
    };
  }
  get mYs() {
    var t;
    if (!this.qwr && !(t = this.Entity.GetComponent(44), this.qwr = t?.MainAnimInstance, this.qwr)) {
      t = this.Entity.GetComponent(236);
      this.qwr = t?.MainAnimInstance;
    }
    return this.qwr;
  }
  get _wl() {
    var t;
    if (!this.hwl && !(t = this.Entity.GetComponent(44), this.hwl = t?.SpecialAnimInstance, this.hwl)) {
      t = this.Entity.GetComponent(236);
      this.hwl = t?.SpecialAnimInstance;
    }
    return this.hwl;
  }
  OnEnd() {
    CombatMessageController_1.CombatMessageController.UnregisterAfterTick(this);
    return true;
  }
  OnActivate() {
    CombatMessageController_1.CombatMessageController.RegisterAfterTick(this, this.X3r);
    this.Hte = this.Entity.CheckGetComponent(1);
    this.Lie = this.Entity.GetComponent(206);
    this.EIe = this.Entity.GetComponent(0);
    if (this.Entity.GetComponent(283)?.IsEnableMorph()) {
      this.F4u = this.EIe?.GetModelConfig().ID ?? 0;
    }
    this.J3r();
    if (this.Lie) {
      for (const i of animationTagList) {
        var t = this.Lie.ListenForTagAddOrRemove(i, this.Y3r);
        this.Q3r.push(t);
      }
    }
    return true;
  }
  OnClear() {
    for (const t of this.Q3r) {
      t.EndTask();
    }
    return true;
  }
  J3r() {
    if (this.mYs && UE.KismetSystemLibrary.IsValid(this.mYs)) {
      var t = this.Entity.GetComponent(0).ComponentDataMap.get("cys");
      var i = t?.cys.gIs;
      var a = t?.cys.oWn;
      var e = t?.cys?.R4u;
      if (this.Hte.IsMoveAutonomousProxy) {
        this.mYs.SetStateMachineNetMode(false);
        this.AnimationStateInitPush();
      } else {
        this.mYs.SetStateMachineNetMode(true);
        if (this.F4u && e !== this.F4u) {
          CombatLog_1.CombatLog.Info("Animation", this.Entity, "动画状态机初始化, ModelId不匹配", ["NotifyModelId", e], ["CheckModelId", this.F4u]);
        } else if (i && i.length > 0) {
          e = (0, puerts_1.$unref)(animationStateListRef);
          WorldGlobal_1.WorldGlobal.ToUeInt32Array(i, e);
          this.mYs.SetStateOrdersReceivePending(e);
          CombatLog_1.CombatLog.Info("Animation", this.Entity, "动画状态机初始化成功", ["v", CharacterAnimationSyncComponent_1.OrderToString(i)]);
        } else {
          CombatLog_1.CombatLog.Info("Animation", this.Entity, "动画状态机初始化失败");
        }
        if (a && a.length > 0) {
          e = (0, puerts_1.$unref)(specialStateListRef);
          WorldGlobal_1.WorldGlobal.ToUeInt32Array(a, e);
          this._wl?.SetStateOrdersReceivePending(e);
        }
        i = t?.cys?.vIs;
        if (i && i.length > 0) {
          for (const n of i) {
            this.Lie.AddTag(n);
          }
          CombatLog_1.CombatLog.Info("Animation", this.Entity, "AnimationTags", ["tags", i.join(",")]);
        }
      }
      var a = t?.cys?.fIs;
      var o = this.Entity.GetComponent(178);
      if (o && a && a.length > 0) {
        for (const s of a) {
          o.HideBone(FNameUtil_1.FNameUtil.GetDynamicFName(s.sWn), !s.aWn, false);
        }
      }
    }
  }
  $3r() {
    var t;
    var i;
    var a;
    var e;
    if (this.mYs && UE.KismetSystemLibrary.IsValid(this.mYs)) {
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        if (this.Hte.IsMoveAutonomousProxy && (this.mYs.GetStateOrdersSendPending(animationStateListRef), t = (0, puerts_1.$unref)(animationStateListRef), this._wl?.GetStateOrdersSendPending(specialStateListRef), i = (0, puerts_1.$unref)(specialStateListRef), t.Num() > 0 || this._wl && i.Num() > 0)) {
          a = [];
          e = [];
          WorldGlobal_1.WorldGlobal.ToTsArray(t, a);
          if (this._wl) {
            WorldGlobal_1.WorldGlobal.ToTsArray(i, e);
          }
          if (a.length > CharacterAnimationSyncComponent_1.z3r || e.length > CharacterAnimationSyncComponent_1.z3r) {
            CombatLog_1.CombatLog.Error("Animation", this.Entity, "状态机增量变化数组超长", ["v", CharacterAnimationSyncComponent_1.OrderToString(a)], ["length", a.length]);
            this.AnimationStateInitPush();
          } else {
            this.AnimationStateChangedPush(this.Entity, a, e);
          }
        }
      } else if (Time_1.Time.NowSeconds > this.fwa + this.pwa) {
        this.mYs.ClearStateOrdersSendPending();
        this._wl?.ClearStateOrdersSendPending();
        this.fwa = Time_1.Time.NowSeconds;
      }
    }
  }
  ClearOrders() {
    this.mYs?.ClearStateOrdersReceivePending();
    this.mYs?.ClearStateOrdersSendPending();
  }
  AnimationGameplayTagHandle(t) {
    if (!this.Hte.IsMoveAutonomousProxy && this.Lie) {
      if (t.lWn) {
        this.Lie.AddTag(t.hWn);
      } else {
        this.Lie.RemoveTag(t.hWn);
      }
    }
  }
  static AnimationGameplayTagNotify(t, i) {
    t?.GetComponent(50)?.AnimationGameplayTagHandle(i);
  }
  AnimationStateChangedPush(t, i, a) {
    var e;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      (e = Protocol_1.Aki.Protocol.de_.create()).rWn = i;
      e.oWn = a;
      e.R4u = this.F4u;
      if (e.rWn.length > MAX_ANIM_STATE_CHANGE_COUNT || e.oWn.length > MAX_ANIM_STATE_CHANGE_COUNT) {
        CombatLog_1.CombatLog.Error("Animation", t, "状态机增量变化数组超长", ["States", CharacterAnimationSyncComponent_1.OrderToString(e.rWn)], ["SpecialStates", CharacterAnimationSyncComponent_1.OrderToString(e.oWn)]);
      }
      CombatMessage_1.CombatNet.Send(29272, t, e);
    }
  }
  AnimationStateInitPush() {
    var t;
    var i;
    var a;
    var e;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti && (this.mYs.GetOriginStates(animationStateListRef), e = (0, puerts_1.$unref)(animationStateListRef), this._wl?.GetOriginStates(specialStateListRef), t = (0, puerts_1.$unref)(specialStateListRef), e || t)) {
      i = [];
      a = [];
      WorldGlobal_1.WorldGlobal.ToTsArray(e, i);
      WorldGlobal_1.WorldGlobal.ToTsArray(t, a);
      (e = Protocol_1.Aki.Protocol.me_.create()).rWn = i;
      e.oWn = a;
      e.R4u = this.F4u;
      if (e.rWn.length > MAX_ANIM_STATE_CHANGE_COUNT || e.oWn.length > MAX_ANIM_STATE_CHANGE_COUNT) {
        CombatLog_1.CombatLog.Error("Animation", this.Entity, "状态机增量变化数组超长", ["States", CharacterAnimationSyncComponent_1.OrderToString(e.rWn)], ["SpecialStates", CharacterAnimationSyncComponent_1.OrderToString(e.oWn)]);
      }
      CombatLog_1.CombatLog.Info("Animation", this.Entity, "动画状态机初始化请求", ["v", CharacterAnimationSyncComponent_1.OrderToString(i)]);
      CombatMessage_1.CombatNet.Send(16688, this.Entity, e);
    }
  }
  static AnimationStateChangedNotify(t, i) {
    var a = t?.GetComponent(1);
    if (t && a && !a.IsMoveAutonomousProxy) {
      if ((a = t.GetComponent(50)).F4u && i.R4u !== a.F4u) {
        CombatLog_1.CombatLog.Info("Animation", t, "动画状态机修改通知, ModelId不匹配", ["NotifyModelId", i.R4u], ["CheckModelId", a.F4u]);
      } else {
        WorldGlobal_1.WorldGlobal.ToUeInt32Array(i.rWn, animationStates);
        WorldGlobal_1.WorldGlobal.ToUeInt32Array(i.oWn, specialAnimationStates);
        if (a) {
          a.mYs?.SetStateOrdersReceivePending(animationStates);
          a._wl?.SetStateOrdersReceivePending(specialAnimationStates);
        }
      }
    }
  }
  static PackAnimChangedNotify(t, i) {
    for (const n of i.R3d) {
      var a = MathUtils_1.MathUtils.LongToNumber(n.F4n);
      var a = ModelManager_1.ModelManager.CreatureModel.GetEntity(a);
      var e = a?.Entity?.GetComponent(1);
      var o = a?.Entity?.GetComponent(50);
      if (e && o && !e.IsMoveAutonomousProxy) {
        for (const s of n.b3d) {
          if (o.F4u && s.R4u !== o.F4u) {
            CombatLog_1.CombatLog.Info("Animation", t, "动画状态机修改通知, ModelId不匹配", ["NotifyModelId", s.R4u], ["CheckModelId", o.F4u]);
          } else {
            WorldGlobal_1.WorldGlobal.ToUeInt32Array(s.rWn, animationStates);
            WorldGlobal_1.WorldGlobal.ToUeInt32Array(s.oWn, specialAnimationStates);
            if (o) {
              o.mYs?.SetStateOrdersReceivePending(animationStates);
              o._wl?.SetStateOrdersReceivePending(specialAnimationStates);
            }
          }
        }
      }
    }
  }
  static AnimationStateInitNotify(t, i) {
    CombatLog_1.CombatLog.Info("Animation", t, "动画状态机初始化通知", ["v", this.OrderToString(i.rWn)]);
    var a = t.GetComponent(50);
    if (a.F4u && i.R4u !== a.F4u) {
      CombatLog_1.CombatLog.Info("Animation", t, "动画状态机初始化通知, ModelId不匹配", ["NotifyModelId", i.R4u], ["CheckModelId", a.F4u]);
    } else {
      t = UE.NewArray(UE.BuiltinInt);
      WorldGlobal_1.WorldGlobal.ToUeInt32Array(i.rWn, t);
      a.mYs?.SetStateOrdersReceivePending(t);
      if (a._wl) {
        t = UE.NewArray(UE.BuiltinInt);
        WorldGlobal_1.WorldGlobal.ToUeInt32Array(i.oWn, t);
        a._wl.SetStateOrdersReceivePending(t);
      }
    }
  }
  static OrderToString(t) {
    var i = new StringBuilder_1.StringBuilder();
    let a = -1;
    while (a + 5 <= t.length) {
      var e = t[++a];
      var o = t[++a];
      var n = a + o;
      for (i.Append("[" + e); a + 3 <= n;) {
        var s = t[++a];
        ++a;
        var r = t[++a];
        i.Append("=>" + s);
        a += r;
      }
      i.Append("]");
    }
    return i.ToString();
  }
  RebuildAnimationStates(t = true) {
    var i = this.Entity.GetComponent(44)?.MainAnimInstance;
    if (i) {
      this.qwr = i;
      this.F4u = t ? this.EIe?.GetModelConfig().ID ?? 0 : 0;
      this.J3r();
    } else {
      this.qwr = undefined;
    }
  }
};
CharacterAnimationSyncComponent.z3r = 600;
__decorate([CombatMessage_1.CombatNet.Listen("$Fn", true)], CharacterAnimationSyncComponent, "AnimationGameplayTagNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("NFn", true)], CharacterAnimationSyncComponent, "AnimationStateChangedNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("T3d", true)], CharacterAnimationSyncComponent, "PackAnimChangedNotify", null);
__decorate([CombatMessage_1.CombatNet.Listen("kFn", true)], CharacterAnimationSyncComponent, "AnimationStateInitNotify", null);
CharacterAnimationSyncComponent = CharacterAnimationSyncComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(50)], CharacterAnimationSyncComponent);
exports.CharacterAnimationSyncComponent = CharacterAnimationSyncComponent; //# sourceMappingURL=CharacterAnimationSyncComponent.js.map