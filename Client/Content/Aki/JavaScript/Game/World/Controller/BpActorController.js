"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BpActorController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const FNameUtil_1 = require("../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const AOI_OFFSET = 1000;
const MEDIA_ACTOR_TICK_FEQ = 30;
const Media_Actor_Group = new UE.FName("MediaActor");
const MEDIA_ACTOR_CHECKFRAME_CLOSE = 10;
const MEDIA_ACTOR_CHECKFRAME_PLAY = 15;
const Media_Actor_Group_Extra = new UE.FName("MediaActor_Extra");
const MEDIA_ACTOR_Extra_CHECKFRAME_CLOSE = 20;
const MEDIA_ACTOR_Extra_CHECKFRAME_PLAY = 25;
const DAY_MINITE_START = 360;
const DAY_MINITE_END = 1080;
class BpActorController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    var t = UE.NewArray(UE.GameBudgetBlueprintGroupConfig);
    var r = new UE.GameBudgetBlueprintGroupConfig();
    r.Group = 2;
    r.GameBudgetGroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BlueprintTick.BlueprintSingleton");
    var o = new UE.GameBudgetBlueprintGroupConfig();
    o.Group = 3;
    o.GameBudgetGroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BlueprintTick.SceneBlueprintActor");
    var e = new UE.GameBudgetBlueprintGroupConfig();
    e.Group = 7;
    e.GameBudgetGroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BlueprintTick.FarBlueprintActor");
    var i = new UE.GameBudgetBlueprintGroupConfig();
    i.Group = 4;
    i.GameBudgetGroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BlueprintTick.SuperFarBlueprintActor");
    var _ = new UE.GameBudgetBlueprintGroupConfig();
    _.Group = 5;
    _.GameBudgetGroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BlueprintTick.DynamicPhysicsInteractionActor");
    var l = new UE.GameBudgetBlueprintGroupConfig();
    l.Group = 6;
    l.GameBudgetGroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BlueprintTick.StaticPhysicsInteractionActor");
    var s = new UE.GameBudgetBlueprintGroupConfig();
    s.Group = 8;
    s.GameBudgetGroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BlueprintTick.HighPriorityPhysicsInteractionActor");
    var c = new UE.GameBudgetBlueprintGroupConfig();
    c.Group = 9;
    c.GameBudgetGroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BlueprintTick.SpecialBlueprintActor");
    var a = new UE.GameBudgetBlueprintGroupConfig();
    a.Group = 10;
    a.GameBudgetGroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BlueprintTick.SparseGridPhysicsInteractionActor");
    t.Add(r);
    t.Add(o);
    t.Add(e);
    t.Add(i);
    t.Add(_);
    t.Add(l);
    t.Add(s);
    t.Add(c);
    t.Add(a);
    UE.KuroGameBudgetBlueprintDefine.Initialize(t);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SetEnvironmentInteraction, BpActorController.Yag);
    return true;
  }
  static OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SetEnvironmentInteraction, BpActorController.Yag);
    UE.KuroGameBudgetBlueprintDefine.Clear();
    return true;
  }
  static RegisterBpActor(t, r) {
    if (r?.IsValid()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("World", 38, "BpActorController 注册", ["BPI_SceneBp", r.GetName()]);
      }
      if (t.op_Equality(Media_Actor_Group)) {
        if (r) {
          r.SetActorTickEnabled(false);
          this.VSa.add(r);
          return;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("World", 38, "BpActorController MediaActor 只能放在Actor下实现接口");
          }
          return;
        }
      } else if (t.op_Equality(Media_Actor_Group_Extra)) {
        if (r) {
          r.SetActorTickEnabled(false);
          this.gzl.add(r);
          return;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("World", 38, "BpActorController MediaActor_Extra 只能放在Actor下实现接口");
          }
          return;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 38, "SceneBp 注册失败,没有对应的处理类型");
        }
        return;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 38, "BpActorController sceneBp 是空的");
    }
  }
  static UnregisterBpActor(t, r) {
    if (r?.IsValid()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("World", 38, "BpActorController 反注册", ["BPI_SceneBp", r.GetName()]);
      }
      if (t.op_Equality(Media_Actor_Group)) {
        if (r) {
          this.VSa.delete(r);
          if (this.VSa.size === 0 && this.HSa?.IsValid() && (this.HSa.Stop(), this.HSa = undefined, Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("World", 38, "BpActorController MediaActor 移除最后一个 关掉当前");
          }
          return;
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("World", 38, "BpActorController MediaActor 只能放在Actor下实现接口");
          }
          return;
        }
      } else if (t.op_Equality(Media_Actor_Group_Extra)) {
        if (r) {
          this.gzl.delete(r);
          if (this.gzl.size === 0 && this.pzl?.IsValid() && (this.pzl.Stop(), this.pzl = undefined, Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("World", 38, "BpActorController MediaActor_Extra 移除最后一个 关掉当前");
          }
          return;
        } else {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("World", 38, "BpActorController MediaActor_Extra 只能放在Actor下实现接口");
          }
          return;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("World", 38, "SceneBp 反注册失败,没有对应的处理类型");
        }
        return;
      }
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("World", 38, "BpActorController sceneBp 是空的");
    }
  }
  static ior() {
    return ControllerHolder_1.ControllerHolder.TimeOfDayController?.CheckInMinuteSpan(DAY_MINITE_START, DAY_MINITE_END);
  }
  static RegisterDayNightActor(t) {
    if (!this.kXf.has(t)) {
      this.kXf.add(t);
      if (this.ior()) {
        t.OnEnterDay();
      } else {
        t.OnEnterNight();
      }
    }
  }
  static UnregisterDayNightActor(t) {
    if (this.kXf.has(t)) {
      this.kXf.delete(t);
    }
  }
  static qXf() {
    if (!(this.kXf.size < 0)) {
      if (this.OXf === undefined) {
        this.OXf = this.ior();
      } else {
        var t = this.ior();
        if (this.OXf !== t) {
          if (this.OXf = t) {
            for (const r of this.kXf) {
              if (r?.IsValid()) {
                r.OnEnterDay();
              } else {
                this.GXf.add(r);
              }
            }
          } else {
            for (const o of this.kXf) {
              if (o?.IsValid()) {
                o.OnEnterNight();
              } else {
                this.GXf.add(o);
              }
            }
          }
          if (this.GXf.size > 0) {
            for (const e of this.GXf) {
              this.kXf.delete(e);
            }
            this.GXf.clear();
          }
        }
      }
    }
  }
  static OnTick(t) {
    this.jSa();
    this.qXf();
  }
  static DisableMediaByGM(t) {
    this.IsDisableMediaByGM = t;
    if (this.IsDisableMediaByGM) {
      this.HSa?.Stop();
      this.HSa = undefined;
      this.pzl?.Stop();
      this.pzl = undefined;
    }
  }
  static jSa() {
    if (!this.IsDisableMediaByGM && (this.VSa.size > 0 || this.gzl.size > 0)) {
      this.WSa++;
      if (this.WSa > MEDIA_ACTOR_TICK_FEQ) {
        this.WSa = 0;
      }
      if (this.VSa.size > 0) {
        if (this.WSa === MEDIA_ACTOR_CHECKFRAME_CLOSE) {
          this.so_();
          return;
        }
        if (this.WSa === MEDIA_ACTOR_CHECKFRAME_PLAY) {
          this.ao_();
          return;
        }
      }
      if (this.gzl.size > 0) {
        if (this.WSa === MEDIA_ACTOR_Extra_CHECKFRAME_CLOSE) {
          this.ho_();
        } else if (this.WSa === MEDIA_ACTOR_Extra_CHECKFRAME_PLAY) {
          this.lo_();
        }
      }
    }
  }
  static g7f(t) {
    var r = (0, puerts_1.$ref)(0);
    t.GetAoiRange(r);
    return (0, puerts_1.$unref)(r);
  }
  static C7f(t) {
    var r = (0, puerts_1.$ref)(false);
    t.ShouldStopOnHide(r);
    return (0, puerts_1.$unref)(r);
  }
  static so_() {
    if (this.VSa.size > 0 && this.HSa?.IsValid()) {
      let t = undefined;
      var o;
      var e = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const l of this.VSa) {
        var i = l;
        var _ = Vector_1.Vector.Create();
        _.FromUeVector(i.D_K2_GetActorLocation());
        var i = Vector_1.Vector.Dist(e, _);
        if (i < r && !this.C7f(l)) {
          r = i;
          t = l;
        }
      }
      if (t?.IsValid() && this.HSa === t) {
        if ((o = this.g7f(t)) && o + AOI_OFFSET < r && (this.HSa.Stop(), this.HSa = undefined, Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("World", 38, "BpActorController MediaActor 超出Aoi 关掉当前");
        }
      } else {
        this.HSa.Stop();
        this.HSa = undefined;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("World", 38, "BpActorController MediaActor 要切换新的或不可见 关掉当前");
        }
      }
    }
  }
  static ao_() {
    if (this.VSa.size > 0 && !this.HSa?.IsValid()) {
      let t = undefined;
      var o;
      var e = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const l of this.VSa) {
        var i = l;
        var _ = Vector_1.Vector.Create();
        _.FromUeVector(i.D_K2_GetActorLocation());
        var i = Vector_1.Vector.DistSquared(e, _);
        if (i < r && !this.C7f(l)) {
          r = i;
          t = l;
        }
      }
      if (t?.IsValid() && (r = Math.sqrt(r), o = this.g7f(t)) && o > r && (t.Start(), this.HSa = t, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("World", 38, "BpActorController MediaActor 当前可见并距离小于AOI 开始播放");
      }
    }
  }
  static ho_() {
    if (this.gzl.size > 0 && this.pzl?.IsValid()) {
      let t = undefined;
      var o;
      var e = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const l of this.gzl) {
        var i = l;
        var _ = Vector_1.Vector.Create();
        _.FromUeVector(i.D_K2_GetActorLocation());
        var i = Vector_1.Vector.Dist(e, _);
        if (i < r && !this.C7f(l)) {
          r = i;
          t = l;
        }
      }
      if (t?.IsValid() && this.pzl === t) {
        if ((o = this.g7f(t)) && o + AOI_OFFSET < r && (this.pzl.Stop(), this.pzl = undefined, Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("World", 38, "BpActorController MediaActor Extra 超出Aoi 关掉当前");
        }
      } else {
        this.pzl.Stop();
        this.pzl = undefined;
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("World", 38, "BpActorController MediaActor Extra 要切换新的或不可见 关掉当前");
        }
      }
    }
  }
  static lo_() {
    if (this.gzl.size > 0 && !this.pzl?.IsValid()) {
      let t = undefined;
      var o;
      var e = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const l of this.gzl) {
        var i = l;
        var _ = Vector_1.Vector.Create();
        _.FromUeVector(i.D_K2_GetActorLocation());
        var i = Vector_1.Vector.DistSquared(e, _);
        if (i < r && !this.C7f(l)) {
          r = i;
          t = l;
        }
      }
      if (t?.IsValid() && (r = Math.sqrt(r), o = this.g7f(t)) && o > r && (t.Start(), this.pzl = t, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("World", 38, "BpActorController MediaActor Extra 当前可见并距离小于AOI 开始播放");
      }
    }
  }
}
(exports.BpActorController = BpActorController).IsDisableMediaByGM = false;
BpActorController.WSa = 0;
BpActorController.VSa = new Set();
BpActorController.gzl = new Set();
BpActorController.HSa = undefined;
BpActorController.pzl = undefined;
BpActorController.kXf = new Set();
BpActorController.Yag = t => {
  var r = UE.SubsystemBlueprintLibrary.GetGameInstanceSubsystem(GlobalData_1.GlobalData.GameInstance, UE.KuroGameBudgetSubSystem.StaticClass());
  if (r) {
    r.SetEnvInteractChange(t > 0);
  }
};
BpActorController.OXf = undefined;
BpActorController.GXf = new Set(); //# sourceMappingURL=BpActorController.js.map