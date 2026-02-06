"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var h;
  var r = arguments.length;
  var a = r < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(t, e, i, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (h = t[o]) {
        a = (r < 3 ? h(a) : r > 3 ? h(e, i, a) : h(e, i)) || a;
      }
    }
  }
  if (r > 3 && a) {
    Object.defineProperty(e, i, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemDynamicAttachTargetComponent = exports.AttachParam = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../Core/Net/Net");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SceneItemActorComponent_1 = require("../../SceneItemActorComponent");
class AttachParam {
  constructor() {
    this.PosAttachType = 0;
    this.PosAttachOffset = undefined;
    this.PosAbsolute = false;
    this.RotAttachType = 0;
    this.RotAttachOffset = undefined;
    this.RotAbsolute = false;
    this.AttachSocketName = undefined;
  }
  From(t) {
    this.PosAttachType = t.PosAttachType;
    this.PosAbsolute = t.PosAbsolute;
    if (this.PosAttachOffset) {
      this.PosAttachOffset.X = t.PosAttachOffset?.X ?? 0;
      this.PosAttachOffset.Y = t.PosAttachOffset?.Y ?? 0;
      this.PosAttachOffset.Z = t.PosAttachOffset?.Z ?? 0;
    } else {
      this.PosAttachOffset = Vector_1.Vector.Create(t.PosAttachOffset);
    }
    this.RotAttachType = t.RotAttachType;
    this.RotAbsolute = t.RotAbsolute;
    if (this.RotAttachOffset) {
      this.RotAttachOffset.Roll = t.RotAttachOffset?.Roll ?? 0;
      this.RotAttachOffset.Pitch = t.RotAttachOffset?.Pitch ?? 0;
      this.RotAttachOffset.Yaw = t.RotAttachOffset?.Yaw ?? 0;
    } else {
      this.RotAttachOffset = Rotator_1.Rotator.Create(t.RotAttachOffset);
    }
    if (t) {
      this.AttachSocketName = t.AttachSocketName;
    }
  }
  Reset() {
    this.PosAttachType = 0;
    this.PosAbsolute = false;
    if (this.PosAttachOffset) {
      this.PosAttachOffset.X = 0;
      this.PosAttachOffset.Y = 0;
      this.PosAttachOffset.Z = 0;
    }
    this.RotAttachType = 0;
    this.RotAbsolute = false;
    if (this.RotAttachOffset) {
      this.RotAttachOffset.Roll = 0;
      this.RotAttachOffset.Pitch = 0;
      this.RotAttachOffset.Yaw = 0;
    }
  }
}
exports.AttachParam = AttachParam;
let SceneItemDynamicAttachTargetComponent = class SceneItemDynamicAttachTargetComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.Hte = undefined;
    this.Sln = false;
    this.yln = 0;
    this.Iln = undefined;
    this.oln = undefined;
    this.Tln = undefined;
    this.rln = undefined;
    this.nln = undefined;
    this.aln = undefined;
    this.hln = (t, e, i) => {
      if (e?.Valid) {
        e = e.Entity.GetComponent(0);
        if (this.oln) {
          if (this.oln !== e?.GetPbDataId()) {
            return;
          }
        } else if (this.Tln && this.Tln !== e?.GetCreatureDataId()) {
          return;
        }
        this.lln();
      }
    };
    this._ln = (t, e) => {
      if (e?.Valid) {
        e = e.Entity.GetComponent(0);
        if (this.oln) {
          if (this.oln !== e?.GetPbDataId()) {
            return;
          }
        } else if (this.Tln && this.Tln !== e?.GetCreatureDataId()) {
          return;
        }
        this.uln();
        if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.hln)) {
          EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.hln);
        }
      }
    };
    this.cln = () => {
      let t = undefined;
      if (this.oln) {
        t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.oln);
      } else {
        if (!this.Tln) {
          return;
        }
        t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Tln);
      }
      if (t && t.Entity) {
        if (EventSystem_1.EventSystem.HasWithTarget(t.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.cln)) {
          EventSystem_1.EventSystem.RemoveWithTarget(t.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.cln);
        }
        this.lln();
      }
    };
    this.mln = t => {
      var e = FNameUtil_1.FNameUtil.GetDynamicFName(this.nln);
      if (t && e && t.op_Equality(e)) {
        t = this.aln.GetActor(e);
        this.dln(t);
      }
    };
    this.Cln = t => {
      this.gln(t);
    };
  }
  static get Dependencies() {
    return [214, 0];
  }
  OnInitData(t) {
    this.EIe = this.Entity.GetComponent(0);
    this.Hte = this.Entity.GetComponent(214);
    return !!this.Hte || (Log_1.Log.CheckError() && Log_1.Log.Error("SceneItem", 39, "[DynamicAttachComp] Invalid ActorComp", ["PbDataId:", this.EIe?.GetPbDataId()]), false);
  }
  OnActivate() {
    this.Sln = true;
    if (this.yln !== 0) {
      this.fln();
    }
  }
  OnEnd() {
    if (this.yln !== 0) {
      this.pln();
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.hln)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.hln);
    }
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    return !(this.Sln = false);
  }
  fln() {
    switch (this.yln) {
      case 1:
        this.lln();
        break;
      case 2:
        this.vln();
    }
  }
  pln() {
    switch (this.yln) {
      case 1:
        this.uln();
        break;
      case 2:
        this.Mln();
    }
  }
  lln() {
    let t = undefined;
    if (this.oln) {
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.oln);
    } else {
      if (!this.Tln) {
        return;
      }
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Tln);
    }
    if (t?.IsInit) {
      switch (t.Entity?.GetComponent(0)?.GetEntityType()) {
        case Protocol_1.Aki.Protocol.kks.Proto_SceneItem:
          this.Lln(t);
          break;
        case Protocol_1.Aki.Protocol.kks.Proto_Monster:
        case Protocol_1.Aki.Protocol.kks.Proto_Player:
        case Protocol_1.Aki.Protocol.kks.Proto_Vision:
        case Protocol_1.Aki.Protocol.kks.Proto_Npc:
          this.Dln(t);
      }
    } else if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.hln)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AddEntity, this.hln);
    }
  }
  Lln(e) {
    var i = e.Entity?.GetComponent(214);
    if (i) {
      if (this.rln && !i?.GetIsSceneInteractionLoadCompleted()) {
        if (!EventSystem_1.EventSystem.HasWithTarget(e.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.cln)) {
          EventSystem_1.EventSystem.AddWithTarget(e.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.cln);
        }
      } else {
        let t = undefined;
        t = this.rln ? i.GetActorInSceneInteraction(this.rln) ?? i.Owner : i.Owner;
        this.dln(t);
        if (!EventSystem_1.EventSystem.HasWithTarget(e, EventDefine_1.EEventName.RemoveEntity, this._ln)) {
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, e, EventDefine_1.EEventName.RemoveEntity, this._ln);
        }
      }
    }
  }
  Dln(t) {
    var e = t.Entity?.GetComponent(3)?.Owner;
    this.dln(e);
    if (!EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this._ln)) {
      EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, t, EventDefine_1.EEventName.RemoveEntity, this._ln);
    }
  }
  uln() {
    let t = undefined;
    if (this.oln) {
      t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.oln);
    } else {
      if (!this.Tln) {
        return;
      }
      t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Tln);
    }
    if (t && !EventSystem_1.EventSystem.HasWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this._ln)) {
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, t, EventDefine_1.EEventName.RemoveEntity, this._ln);
    }
    if (t?.Entity && EventSystem_1.EventSystem.HasWithTarget(t.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.cln)) {
      EventSystem_1.EventSystem.RemoveWithTarget(t.Entity, EventDefine_1.EEventName.OnSceneInteractionLoadCompleted, this.cln);
    }
    var e = t?.Entity?.GetComponent(214);
    let i = undefined;
    i = this.rln && e?.GetIsSceneInteractionLoadCompleted() ? e?.GetActorInSceneInteraction(this.rln) : e?.Owner;
    this.gln(i);
  }
  vln() {
    var t;
    if (this.nln && (this.aln?.IsValid() || (this.aln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(GlobalData_1.GlobalData.World, UE.KuroActorSubsystem.StaticClass()), this.aln?.IsValid())) && (this.aln.OnAddToSubsystem.Add(this.mln), (t = this.aln.GetActor(FNameUtil_1.FNameUtil.GetDynamicFName(this.nln)))?.IsValid())) {
      this.dln(t);
    }
  }
  Mln() {
    var t;
    if (this.nln) {
      if (this.aln?.IsValid()) {
        this.aln.OnAddToSubsystem.Remove(this.mln);
      }
      t = this.aln?.GetActor(FNameUtil_1.FNameUtil.GetDynamicFName(this.nln));
      this.gln(t);
    }
  }
  dln(s) {
    if (this.Hte?.Owner?.RootComponent?.IsValid() && s?.RootComponent?.IsValid()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "[DynamicAttachComp] AttachToTargetActor: 开始", ["PbDataId", this.EIe?.GetPbDataId()], ["自身坐标", Vector_1.Vector.Create(this.Hte.Owner.D_K2_GetActorLocation())], ["自身旋转", Rotator_1.Rotator.Create(this.Hte.Owner.K2_GetActorRotation())], ["目标坐标", Vector_1.Vector.Create(s.D_K2_GetActorLocation())], ["目标旋转", Rotator_1.Rotator.Create(s.K2_GetActorRotation())], ["目标PathName", UE.KismetSystemLibrary.GetPathName(s)], ["AttachParam", this.Iln]);
      }
      var e = Vector_1.Vector.Create(Vector_1.Vector.ZeroVectorProxy);
      var h = Rotator_1.Rotator.Create(Rotator_1.Rotator.ZeroRotatorProxy);
      if (this.Iln.PosAttachType === 0 || this.Iln.RotAttachType === 0) {
        r = this.Hte.Owner.RootComponent.D_GetRelativeTransform();
        if (this.Iln.PosAttachType === 0) {
          e.FromUeVector(r.GetLocation());
        }
        if (this.Iln.RotAttachType === 0) {
          h.FromUeRotator(r.Rotator());
        }
      }
      if (this.Iln.PosAttachType === 1 || this.Iln.RotAttachType === 1) {
        r = this.Hte.Owner.D_GetTransform().GetRelativeTransform(s.D_GetTransform());
        if (this.Iln.PosAttachType === 1) {
          e.FromUeVector(r.GetLocation());
        }
        if (this.Iln.RotAttachType === 1) {
          h.FromUeRotator(r.Rotator());
        }
      }
      if (this.Iln.PosAttachType === 3 || this.Iln.RotAttachType === 3) {
        var r = this.EIe.GetPbEntityInitData()?.Transform;
        var r = r ? this.Eln(r) : this.EIe.D_GetTransform();
        let i = undefined;
        if (this.yln === 2) {
          var a = (0, puerts_1.$ref)(undefined);
          this.aln.D_GetActorOriginalTransform(GlobalData_1.GlobalData.World, FNameUtil_1.FNameUtil.GetDynamicFName(this.nln), a);
          i = (0, puerts_1.$unref)(a);
        } else if (this.yln === 1) {
          let t = undefined;
          if (this.oln) {
            t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.oln);
          } else if (this.Tln) {
            t = ModelManager_1.ModelManager.CreatureModel.GetEntity(this.Tln);
          }
          var a = t.Entity;
          var o = a?.GetComponent(1);
          var a = a?.GetComponent(0);
          var n = a?.GetPbEntityInitData()?.Transform;
          var n = n ? this.Eln(n) : a.D_GetTransform();
          let e = this.rln?.length && o instanceof SceneItemActorComponent_1.SceneItemActorComponent ? o?.GetActorInSceneInteractionOriginalRelTransform(s) : undefined;
          e = e || s.D_GetTransform().GetRelativeTransform(o.Owner.D_GetTransform());
          i = e.op_Multiply(n);
        }
        if (!i) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("SceneItem", 39, "[SceneItemAttachTargetComponent] 目标初始坐标获取失败，使用自身初始坐标代替", ["PbDataId:", this.EIe?.GetPbDataId()]);
          }
          i = r;
        }
        a = r.GetRelativeTransform(i);
        if (this.Iln.PosAttachType === 3) {
          e.FromUeVector(a.GetLocation());
        }
        if (this.Iln.RotAttachType === 3) {
          h.FromUeRotator(a.Rotator());
        }
      }
      MathUtils_1.MathUtils.CommonTempVector.FromConfigVector(this.Iln.PosAttachOffset);
      e.AdditionEqual(MathUtils_1.MathUtils.CommonTempVector);
      h.AdditionEqual(this.Iln.RotAttachOffset);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "[DynamicAttachComp] AttachToTargetActor: 计算相对关系", ["PbDataId", this.EIe?.GetPbDataId()], ["相对坐标", e], ["相对旋转", h]);
      }
      this.Hte.Owner.RootComponent.SetAbsolute(this.Iln.PosAbsolute, this.Iln.RotAbsolute, true);
      let t = this.Iln.AttachSocketName;
      if (t && !FNameUtil_1.FNameUtil.IsEmpty(t) && s.RootComponent.DoesSocketExist(t)) {
        t = undefined;
      }
      o = s.GetComponentByClass(UE.MeshComponent.StaticClass());
      if (t && o) {
        this.Hte.Owner.K2_AttachRootComponentTo(o, t, 1, true);
      } else {
        this.Hte.Owner.K2_AttachToActor(s, t, 1, 1, 1, true);
      }
      n = s.D_GetTransform().TransformPosition(e.ToUeVector());
      r = s.D_GetTransform().TransformRotation(h.Quaternion().ToUeQuat());
      this.Hte.Owner.D_K2_SetActorTransform(new UE.TransformDouble(r, n, this.Hte.ActorScale), false, undefined, true);
      s.OnDestroyed.Add(this.Cln);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("SceneItem", 39, "[DynamicAttachComp] AttachToTargetActor: 完成", ["PbDataId", this.EIe?.GetPbDataId()], ["自身坐标", Vector_1.Vector.Create(this.Hte.Owner.D_K2_GetActorLocation())], ["自身旋转", Rotator_1.Rotator.Create(this.Hte.Owner.K2_GetActorRotation())], ["目标坐标", Vector_1.Vector.Create(s.D_K2_GetActorLocation())], ["目标旋转", Rotator_1.Rotator.Create(s.K2_GetActorRotation())], ["自身相对坐标", Vector_1.Vector.Create(this.Hte.Owner.RootComponent?.RelativeLocation)], ["自身相对旋转", Rotator_1.Rotator.Create(this.Hte.Owner.RootComponent?.RelativeRotation)]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 39, "[DynamicAttachComp] AttachToTargetActor Failed", ["PbDataId", this.EIe?.GetPbDataId()], ["SelfActorValid", !!this.Hte?.Owner?.RootComponent?.IsValid()], ["TargetActorValid", s?.RootComponent?.IsValid()]);
    }
  }
  gln(t) {
    if (this.Hte?.Owner?.IsValid()) {
      this.Hte.Owner.K2_DetachFromActor(1, 1, 1);
      t?.OnDestroyed.Remove(this.Cln);
    }
  }
  Eln(t) {
    var e = new UE.TransformDouble();
    e.SetLocation(new UE.VectorDouble(t.Pos.X ?? 0, t.Pos.Y ?? 0, t.Pos.Z ?? 0));
    e.SetRotation(UE.Rotator.MakeFromEuler(new UE.Vector(t.Rot?.X ?? 0, t.Rot?.Y ?? 0, t.Rot?.Z ?? 0)).Quaternion());
    e.SetScale3D(new UE.VectorDouble(t.Scale?.X ?? 1, t.Scale?.Y ?? 1, t.Scale?.Z ?? 1));
    return e;
  }
  IsRegTarget() {
    return this.yln !== 0;
  }
  RegEntityTarget(t, e, i, s) {
    if (this.yln !== 0 || this.Entity.IsEnd || !t) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "[RegEntityTarget] 注册Attach失败", ["PbDataId", this.EIe?.GetPbDataId()], ["CurrentRegTargetType", this.yln], ["CurrentEntityIsEnd", this.Entity.IsEnd], ["TargetPbDataId", t], ["Reason", s]);
      }
      return false;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 39, "[RegEntityTarget] 注册Attach成功", ["PbDataId", this.EIe?.GetPbDataId()], ["CurrentRegTargetType", this.yln], ["CurrentEntityIsEnd", this.Entity.IsEnd], ["TargetPbDataId", t], ["Reason", s]);
      }
      this.yln = 1;
      this.oln = t;
      this.Tln = undefined;
      this.rln = e;
      this.Iln ||= new AttachParam();
      this.Iln.From(i);
      if (this.Sln) {
        this.fln();
      }
      return true;
    }
  }
  RegEntityTargetByCreatureDataId(t, e, i, s) {
    if (this.yln !== 0 || this.Entity.IsEnd || !t) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "[RegEntityTarget] 注册Attach失败", ["PbDataId", this.EIe?.GetPbDataId()], ["CurrentRegTargetType", this.yln], ["CurrentEntityIsEnd", this.Entity.IsEnd], ["TargetCreatureDataId", t], ["Reason", s]);
      }
      return false;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 39, "[RegEntityTarget] 注册Attach成功", ["PbDataId", this.EIe?.GetPbDataId()], ["CurrentRegTargetType", this.yln], ["CurrentEntityIsEnd", this.Entity.IsEnd], ["TargetCreatureDataId", t], ["Reason", s]);
      }
      this.yln = 1;
      this.Tln = t;
      this.oln = undefined;
      this.rln = e;
      this.Iln ||= new AttachParam();
      this.Iln.From(i);
      if (this.Sln) {
        this.fln();
      }
      return true;
    }
  }
  RegRefActorTarget(t, e, i) {
    if (this.yln === 0 && !this.Entity.IsEnd && t && t.length) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 39, "[RegEntityTarget] 注册Attach成功", ["PbDataId", this.EIe?.GetPbDataId()], ["CurrentRegTargetType", this.yln], ["CurrentEntityIsEnd", this.Entity.IsEnd], ["TargetActorRef", t], ["Reason", i]);
      }
      this.yln = 2;
      this.nln = t;
      this.Iln ||= new AttachParam();
      this.Iln.From(e);
      if (this.Sln) {
        this.fln();
      }
      return true;
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "[RegEntityTarget] 注册Attach失败", ["PbDataId", this.EIe?.GetPbDataId()], ["CurrentRegTargetType", this.yln], ["CurrentEntityIsEnd", this.Entity.IsEnd], ["TargetActorRef", t], ["Reason", i]);
      }
      return false;
    }
  }
  UnRegTarget(t) {
    if (this.yln === 0 || this.Entity.IsEnd) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("SceneItem", 39, "[RegEntityTarget] 反注册Attach失败", ["PbDataId", this.EIe?.GetPbDataId()], ["CurrentRegTargetType", this.yln], ["CurrentEntityIsEnd", this.Entity.IsEnd], ["Reason", t]);
      }
      return false;
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("SceneItem", 39, "[RegEntityTarget] 反注册Attach成功", ["PbDataId", this.EIe?.GetPbDataId()], ["CurrentRegTargetType", this.yln], ["CurrentEntityIsEnd", this.Entity.IsEnd], ["Reason", t]);
      }
      this.pln();
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AddEntity, this.hln)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AddEntity, this.hln);
      }
      this.yln = 0;
      if (this.Iln) {
        this.Iln.Reset();
      }
      this.oln = undefined;
      this.Tln = undefined;
      this.rln = undefined;
      return !(this.nln = undefined);
    }
  }
  RequestAttachRefActor(t, e, i) {
    var s;
    if (this.Hte?.Owner?.IsValid()) {
      (s = Protocol_1.Aki.Protocol.fgs.create()).F4n = this.Hte.CreatureData.GetCreatureDataId();
      s.s6n = Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetActorPath;
      s.j6n = "_6n";
      s._6n = t;
      s.o6n = Protocol_1.Aki.Protocol.Gks.create();
      s.o6n.X = e.X;
      s.o6n.Y = e.Y;
      s.o6n.Z = e.Z;
      s.n6n = Protocol_1.Aki.Protocol.D2s.create();
      s.n6n.Pitch = i.Pitch;
      s.n6n.Yaw = i.Yaw;
      s.n6n.Roll = i.Roll;
      Net_1.Net.Call(23548, s, () => {});
    }
  }
  RequestAttachEntity(t, e, i, s) {
    var h;
    if (this.Hte?.Owner?.IsValid()) {
      (h = Protocol_1.Aki.Protocol.fgs.create()).F4n = this.Hte.CreatureData.GetCreatureDataId();
      h.s6n = Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetEntity;
      h.j6n = "h6n";
      h.h6n = Protocol_1.Aki.Protocol.sFs.create();
      h.h6n.a6n = t;
      h.h6n.l6n = e ?? "";
      h.o6n = Protocol_1.Aki.Protocol.Gks.create();
      h.o6n.X = i.X;
      h.o6n.Y = i.Y;
      h.o6n.Z = i.Z;
      h.n6n = Protocol_1.Aki.Protocol.D2s.create();
      h.n6n.Pitch = s.Pitch;
      h.n6n.Yaw = s.Yaw;
      h.n6n.Roll = s.Roll;
      Net_1.Net.Call(23548, h, () => {});
    }
  }
  RequestDetach() {
    var t = Protocol_1.Aki.Protocol.fgs.create();
    t.F4n = this.Hte.CreatureData.GetCreatureDataId();
    t.s6n = Protocol_1.Aki.Protocol.nFs.Proto_AttachTargetNone;
    Net_1.Net.Call(23548, t, () => {});
  }
};
SceneItemDynamicAttachTargetComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(136)], SceneItemDynamicAttachTargetComponent);
exports.SceneItemDynamicAttachTargetComponent = SceneItemDynamicAttachTargetComponent; //# sourceMappingURL=SceneItemDynamicAttachTargetComponent.js.map