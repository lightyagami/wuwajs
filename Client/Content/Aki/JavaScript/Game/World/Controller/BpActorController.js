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
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const AOI_OFFSET = 1000;
const MEDIA_ACTOR_TICK_FEQ = 30;
const Media_Actor_Group = new UE.FName("MediaActor");
const MEDIA_ACTOR_CHECKFRAME_CLOSE = 10;
const MEDIA_ACTOR_CHECKFRAME_PLAY = 15;
const Media_Actor_Group_Extra = new UE.FName("MediaActor_Extra");
const MEDIA_ACTOR_Extra_CHECKFRAME_CLOSE = 20;
const MEDIA_ACTOR_Extra_CHECKFRAME_PLAY = 25;
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
    var c = new UE.GameBudgetBlueprintGroupConfig();
    c.Group = 8;
    c.GameBudgetGroupName = FNameUtil_1.FNameUtil.GetDynamicFName("BlueprintTick.HighPriorityPhysicsInteractionActor");
    t.Add(r);
    t.Add(o);
    t.Add(e);
    t.Add(i);
    t.Add(_);
    t.Add(l);
    t.Add(c);
    UE.KuroGameBudgetBlueprintDefine.Initialize(t);
    return true;
  }
  static OnClear() {
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
  static OnTick(t) {
    this.jSa();
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
  static so_() {
    if (this.VSa.size > 0 && this.HSa?.IsValid()) {
      let t = undefined;
      var o;
      var e;
      var i = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const c of this.VSa) {
        var _ = c;
        var l = Vector_1.Vector.Create();
        l.FromUeVector(_.D_K2_GetActorLocation());
        var _ = Vector_1.Vector.Dist(i, l);
        if (_ < r) {
          r = _;
          t = c;
        }
      }
      if (t?.IsValid()) {
        e = (o = 0, puerts_1.$ref)(0);
        t.GetAoiRange(e);
        o = (0, puerts_1.$unref)(e);
        if (this.HSa === t) {
          if (o && o + AOI_OFFSET < r && (this.HSa.Stop(), this.HSa = undefined, Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("World", 38, "BpActorController MediaActor 超出Aoi 关掉当前");
          }
        } else if (this.HSa?.IsValid() && (this.HSa.Stop(), this.HSa = undefined, Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("World", 38, "BpActorController MediaActor 要切换新的 关掉当前");
        }
      }
    }
  }
  static ao_() {
    if (this.VSa.size > 0 && !this.HSa?.IsValid()) {
      let t = undefined;
      var o;
      var e;
      var i = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const c of this.VSa) {
        var _ = c;
        var l = Vector_1.Vector.Create();
        l.FromUeVector(_.D_K2_GetActorLocation());
        var _ = Vector_1.Vector.DistSquared(i, l);
        if (_ < r) {
          r = _;
          t = c;
        }
      }
      if (t?.IsValid() && (r = Math.sqrt(r), e = (o = 0, puerts_1.$ref)(0), t.GetAoiRange(e), o = (0, puerts_1.$unref)(e)) && o > r && (t.Start(), this.HSa = t, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("World", 38, "BpActorController MediaActor 当前距离小于AOI 开始播放");
      }
    }
  }
  static ho_() {
    if (this.gzl.size > 0 && this.pzl?.IsValid()) {
      let t = undefined;
      var o;
      var e;
      var i = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const c of this.gzl) {
        var _ = c;
        var l = Vector_1.Vector.Create();
        l.FromUeVector(_.D_K2_GetActorLocation());
        var _ = Vector_1.Vector.Dist(i, l);
        if (_ < r) {
          r = _;
          t = c;
        }
      }
      if (t?.IsValid()) {
        e = (o = 0, puerts_1.$ref)(0);
        t.GetAoiRange(e);
        o = (0, puerts_1.$unref)(e);
        if (this.pzl === t) {
          if (o && o + AOI_OFFSET < r && (this.pzl.Stop(), this.pzl = undefined, Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("World", 38, "BpActorController MediaActor 超出Aoi 关掉当前");
          }
        } else if (this.pzl?.IsValid() && (this.pzl.Stop(), this.pzl = undefined, Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("World", 38, "BpActorController MediaActor 要切换新的 关掉当前");
        }
      }
    }
  }
  static lo_() {
    if (this.gzl.size > 0 && !this.pzl?.IsValid()) {
      let t = undefined;
      var o;
      var e;
      var i = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      let r = Number.MAX_VALUE;
      for (const c of this.gzl) {
        var _ = c;
        var l = Vector_1.Vector.Create();
        l.FromUeVector(_.D_K2_GetActorLocation());
        var _ = Vector_1.Vector.DistSquared(i, l);
        if (_ < r) {
          r = _;
          t = c;
        }
      }
      if (t?.IsValid() && (r = Math.sqrt(r), e = (o = 0, puerts_1.$ref)(0), t.GetAoiRange(e), o = (0, puerts_1.$unref)(e)) && o > r && (t.Start(), this.pzl = t, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("World", 38, "BpActorController MediaActor 当前距离小于AOI 开始播放");
      }
    }
  }
}
(exports.BpActorController = BpActorController).IsDisableMediaByGM = false;
BpActorController.WSa = 0;
BpActorController.VSa = new Set();
BpActorController.gzl = new Set();
BpActorController.HSa = undefined;
BpActorController.pzl = undefined; //# sourceMappingURL=BpActorController.js.map