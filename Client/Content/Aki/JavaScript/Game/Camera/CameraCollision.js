"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CameraCollision = undefined;
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../Core/Define/QueryTypeDefine");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../Core/Utils/TraceElementCommon");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const GlobalData_1 = require("../GlobalData");
const ModelManager_1 = require("../Manager/ModelManager");
const TsBaseVehicle_1 = require("../NewWorld/Vehicle/TsBaseVehicle");
const GravityUtils_1 = require("../Utils/GravityUtils");
const MIN_DITHER = 0.01;
const MAX_VALUE = 9999999;
const PROBE_RATIO = 4;
const PLAYER_COLLISION_RADUIS = 20;
const PROFILE_KEY1 = "FightCameraLogicComponent_CheckCollision_Camera";
const PROFILE_KEY2 = "FightCameraLogicComponent_CheckCollision_Npc";
const PROFILE_KEY3 = "FightCameraLogicComponent_CheckCollision_Camera_Caught_PlayerLocation";
const PROFILE_KEY4 = "FightCameraLogicComponent_CheckCollision_Player";
class CameraCollision {
  constructor() {
    this.Hh = undefined;
    this.Tae = undefined;
    this.Lae = undefined;
    this.Fse = undefined;
    this.Hse = undefined;
    this.jse = undefined;
    this.Dae = undefined;
    this.Rae = undefined;
    this.Tdc = Vector_1.Vector.Create();
    this._ae = Vector_1.Vector.Create();
    this.uae = Vector_1.Vector.Create();
    this.Uae = Vector_1.Vector.Create();
    this.Aae = Vector_1.Vector.Create();
    this.Pae = Vector_1.Vector.Create();
    this.xae = Vector_1.Vector.Create();
    this.wae = Vector_1.Vector.Create();
    this.Bae = Vector_1.Vector.Create();
    this.bae = Vector_1.Vector.Create();
    this.Lz = Vector_1.Vector.Create();
    this.qae = 0;
    this.Gae = 0;
    this.Nae = 0;
    this.Oae = false;
    this.kae = false;
    this.IsLeftCollision = false;
    this.IsRightCollision = false;
    this.IsOpenBlend = true;
    this.Zrh = 0;
    this.CurrentBlendState = 0;
    this.Fae = 0;
    this.Vae = 0;
    this.Hae = 0;
    this.jae = 0;
    this.Wae = 0;
    this._pa = 0;
    this.IsNpcDitherEnable = true;
    this.IsPlayerXRayEnable = true;
    this.Kae = new Set();
    this.Qae = new Map();
  }
  Init(t) {
    this.Hh = t;
  }
  InitTraceElements() {
    this.Fse = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.Fse.bIsSingle = false;
    this.Fse.bTraceComplex = false;
    this.Fse.bIgnoreSelf = true;
    this.Fse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
    this.jse = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.jse.bIsSingle = true;
    this.jse.bTraceComplex = false;
    this.jse.bIgnoreSelf = true;
    this.jse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
    this.Hse = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.Hse.bIsSingle = true;
    this.Hse.bTraceComplex = false;
    this.Hse.bIgnoreSelf = true;
    this.Hse.SetTraceTypeQuery(QueryTypeDefine_1.KuroTraceTypeQuery.Camera);
    this.Dae = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.Dae.bIsSingle = false;
    this.Dae.bTraceComplex = false;
    this.Dae.bIgnoreSelf = true;
    this.Dae.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn);
    this.Dae.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
    this.Dae.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer);
    this.Rae = UE.NewObject(UE.TraceSphereElement.StaticClass());
    this.Rae.bIsSingle = false;
    this.Rae.bTraceComplex = false;
    this.Rae.bIgnoreSelf = true;
    this.Rae.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.Pawn);
    this.Rae.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnMonster);
    this.Rae.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.PawnPlayer);
  }
  SetDrawDebugEnable(t) {
    if (t) {
      this.Fse.SetDrawDebugTrace(1);
      this.Fse.DrawTime = 5;
      this.jse.SetDrawDebugTrace(1);
      this.jse.DrawTime = 5;
      this.Hse.SetDrawDebugTrace(1);
      this.Hse.DrawTime = 5;
      this.Dae.SetDrawDebugTrace(1);
      this.Dae.DrawTime = 5;
      this.Rae.SetDrawDebugTrace(0);
      this.Rae.DrawTime = 5;
    } else {
      this.Fse.SetDrawDebugTrace(0);
      this.Fse.DrawTime = 0;
      this.jse.SetDrawDebugTrace(0);
      this.jse.DrawTime = 0;
      this.Hse.SetDrawDebugTrace(0);
      this.Hse.DrawTime = 0;
      this.Dae.SetDrawDebugTrace(0);
      this.Dae.DrawTime = 0;
      this.Rae.SetDrawDebugTrace(0);
      this.Rae.DrawTime = 0;
    }
  }
  SetCharacter(t) {
    this.Tae = t;
    this.Fse.ActorsToIgnore.Add(t);
    this.jse.ActorsToIgnore.Add(t);
    this.Hse.ActorsToIgnore.Add(t);
    this.Dae.ActorsToIgnore.Add(t);
    this.Rae.ActorsToIgnore.Add(t);
    this.Lae = t?.CharacterActorComponent?.Entity?.GetComponent(77);
  }
  SetCameraConfig(t, i) {
    this.Wae = t * t * PROBE_RATIO;
    this._pa = i;
  }
  Clear() {
    if (this.Fse) {
      this.Fse.Dispose();
      this.Fse = undefined;
    }
    if (this.Hse) {
      this.Hse.Dispose();
      this.Hse = undefined;
    }
    if (this.jse) {
      this.jse.Dispose();
      this.jse = undefined;
    }
    if (this.Dae) {
      this.Dae.Dispose();
      this.Dae = undefined;
    }
    if (this.Rae) {
      this.Rae.Dispose();
      this.Rae = undefined;
    }
    this.Oae = false;
    this.kae = false;
    this.IsLeftCollision = false;
    this.IsRightCollision = false;
    this.Kae.clear();
  }
  ResetBlendData() {
    this.CurrentBlendState = 0;
  }
  CheckCollision(t, i, s) {
    this.Pae.DeepCopy(i);
    this.pae();
    this.Xae(t, i);
    this.$ae(t, i);
    this.Yae();
    this.Jae(t, i);
    this.zae(t, i, s);
    this.Zae();
    this.ehe(t);
    return this.Pae;
  }
  Xae(t, i) {
    this.Tdc.DeepCopy(this.Hh.GravityDirect);
    this._ae.DeepCopy(t);
    this.uae.DeepCopy(i);
    this.Fse.WorldContextObject = GlobalData_1.GlobalData.World;
    this.Fse.Radius = this.Hh.CurrentCollisionSize;
    if (this.Lae) {
      const s = GravityUtils_1.GravityUtils.GetZnInGravityForDirect(this.Tdc, this._ae);
      t = this.Lz;
      t.DeepCopy(this.Lae.GetWaterLocation());
      GravityUtils_1.GravityUtils.AddZnInGravityForDirect(this.Tdc, t, this.Hh.CollisionAdditionalHeightInWater);
      i = GravityUtils_1.GravityUtils.GetZnInGravityForDirect(this.Tdc, t);
      this._ae.Z = (s > i ? this._ae : t).Z;
    }
    const s = GravityUtils_1.GravityUtils.GetZnInGravityForDirect(this.Tdc, this._ae);
    i = this.Lz;
    i.DeepCopy(this.Hh.Character.CharacterActorComponent.FloorLocation);
    GravityUtils_1.GravityUtils.AddZnInGravityForDirect(this.Tdc, i, this._pa);
    t = GravityUtils_1.GravityUtils.GetZnInGravityForDirect(this.Tdc, i);
    this._ae.Z = (s > t ? this._ae : i).Z;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, this._ae);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, this.uae);
    this.Oae = false;
    t = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Fse, PROFILE_KEY1);
    if (t && (this.Nae = this.the(this._ae, this.uae, this.Fse.HitResult), this.Nae >= 0)) {
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Fse.HitResult, this.Nae, this.Pae);
      this.Oae = true;
    }
  }
  Yae() {
    var t;
    this.kae = false;
    if (this.Oae && (t = this.Fse.HitResult?.Components?.Get(this.Nae))?.IsValid() && t.GetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.Water) === 2) {
      this.kae = true;
    }
  }
  $ae(t, i) {
    var s;
    if (this.Oae) {
      t.Subtraction(i, this.Uae);
      this.Uae.Normalize();
      s = (this.Hh.CheckWidth + this.Fae) / Vector_1.Vector.Dist(i, this.Pae);
      s = Vector_1.Vector.Dist(i, t) * s;
      this.Uae.CrossProduct(this.Tdc, this.Aae);
      this.Aae.MultiplyEqual(s);
      t.Addition(this.Aae, this._ae);
      this.jse.HitResult?.Clear();
      this.jse.WorldContextObject = GlobalData_1.GlobalData.World;
      this.jse.Radius = this.Hh.CheckCollisionProbeSize;
      this._ae.DeepCopy(this.ihe(this._ae, this.Uae, -this.jse.Radius));
      this.uae.DeepCopy(i);
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.jse, this._ae);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.jse, this.uae);
      this.IsRightCollision = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.jse, PROFILE_KEY1);
      if (!this.IsRightCollision) {
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.jse, this.uae);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.jse, this._ae);
        this.IsRightCollision = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.jse, PROFILE_KEY1);
      }
      this.Aae.UnaryNegation(this.Aae);
      t.Addition(this.Aae, this._ae);
      this.Hse.HitResult?.Clear();
      this.Hse.WorldContextObject = GlobalData_1.GlobalData.World;
      this.Hse.Radius = this.Hh.CheckCollisionProbeSize;
      this._ae.DeepCopy(this.ihe(this._ae, this.Uae, -this.Hse.Radius));
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Hse, this._ae);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Hse, this.uae);
      this.IsLeftCollision = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Hse, PROFILE_KEY1);
      if (!this.IsLeftCollision) {
        TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Hse, this.uae);
        TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Hse, this._ae);
        this.IsLeftCollision = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Hse, PROFILE_KEY1);
      }
    }
  }
  Jae(t, i) {
    if (this.IsOpenBlend) {
      if (!this.ohe()) {
        switch (this.CurrentBlendState) {
          case 0:
            if (this.Oae && (this.IsLeftCollision || this.IsRightCollision)) {
              t.Subtraction(this.Hh.CameraLocation, this.wae);
              t.Subtraction(this.Pae, this.Bae);
              this.qae = this.wae.Size();
              this.Gae = this.Bae.Size();
              this.CurrentBlendState = 1;
            }
            break;
          case 1:
            if (this.Oae && this.IsLeftCollision && this.IsRightCollision) {
              this.CurrentBlendState = 2;
            } else if (this.Oae && (this.IsLeftCollision || this.IsRightCollision)) {
              t.Subtraction(this.Hh.CameraLocation, this.wae);
              t.Subtraction(this.Pae, this.Bae);
              this.qae = this.wae.Size();
              this.Gae = this.Bae.Size();
              if (this.rhe(t, i, this.qae)) {
                this.ResetBlendData();
                return;
              }
              if (this.qae <= this.Gae) {
                this.CurrentBlendState = 2;
              }
            } else if (this.Oae) {
              this.CurrentBlendState = 1;
            } else {
              this.CurrentBlendState = 3;
            }
            break;
          case 3:
            if (this.Oae && (this.IsLeftCollision || this.IsRightCollision)) {
              this.CurrentBlendState = 1;
            } else {
              t.Subtraction(this.Hh.CameraLocation, this.wae);
              t.Subtraction(i, this.Bae);
              this.qae = this.wae.Size();
              this.Gae = this.Bae.Size();
              if (this.rhe(t, i, this.qae)) {
                this.ResetBlendData();
                return;
              }
              if (this.qae >= this.Gae || this.qae >= this.Hh.MaxArmLength) {
                this.CurrentBlendState = 0;
              }
            }
            break;
          case 2:
            if (!this.Oae && !this.IsLeftCollision && !this.IsRightCollision) {
              t.Subtraction(this.Hh.CameraLocation, this.wae);
              t.Subtraction(i, this.Bae);
              this.qae = this.wae.Size();
              this.Gae = this.Bae.Size();
              this.CurrentBlendState = 3;
            }
        }
      }
    } else {
      this.CurrentBlendState = this.Oae ? 2 : 0;
    }
  }
  zae(t, i, s) {
    if (!this.kae) {
      switch (this.CurrentBlendState) {
        case 1:
          var h = this.qae - this.Hh.InSpeed * s;
          var h = Math.max(this.Gae, h);
          i.Subtraction(t, this.Uae);
          this.Uae.Normalize();
          this.Uae.Multiply(h, this.bae);
          t.Addition(this.bae, this.Pae);
          break;
        case 3:
          h = this.qae + this.Hh.OutSpeed * s;
          h = Math.min(this.Gae, h);
          h = Math.min(this.Hh.MaxArmLength, h);
          i.Subtraction(t, this.Uae);
          this.Uae.Normalize();
          this.Uae.Multiply(h, this.bae);
          t.Addition(this.bae, this.Pae);
          break;
        case 0:
          this.Pae.DeepCopy(i);
      }
    }
  }
  Zae() {
    if (this.IsNpcDitherEnable) {
      this.nhe();
      this.she();
      this.Dae.HitResult?.Clear();
      this.Dae.WorldContextObject = GlobalData_1.GlobalData.World;
      this.Dae.Radius = this.Vae;
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Dae, this.Pae);
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Dae, this.xae);
      var t = TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Dae, PROFILE_KEY2);
      var i = this.Dae.HitResult.GetHitCount();
      if (t) {
        this.ahe(this.Dae.HitResult);
        for (var [s, h] of this.Qae) {
          if (this.hhe(s)) {
            s.SetDitherEffect(1, 1);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Camera", 57, `[NPC Dither] 存在忽略Tag,恢复Npc'${s?.GetName()}'Dither`);
            }
          } else {
            s.SetDitherEffect(this.lhe(s, h), 1);
            if (h = this.Kae.has(s)) {
              this.Kae.delete(s);
            }
            this.Kae.add(s);
            if (!h) {
              if (Log_1.Log.CheckDebug()) {
                Log_1.Log.Debug("Camera", 57, "[NPC Dither] 应用Npc Dither", ["actor?.GetName()", s?.GetName()]);
              }
            }
          }
        }
      }
      var e = this.Kae.values();
      for (let t = 0; t < this.Kae.size - i; t++) {
        var r = e.next().value;
        if (this.Wx_(r) && (r.SetDitherEffect(1, 1), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Camera", 57, `[NPC Dither] 恢复Npc'${r?.GetName()}'Dither`);
        }
        this.Kae.delete(r);
      }
    } else if (this.Kae.size > 0) {
      this.Kae.forEach(t => {
        if (t?.IsValid() && (t.SetDitherEffect(1, 1), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Camera", 57, `[NPC Dither] 禁用Npc虚化时恢复Npc'${t?.GetName()}'Dither`);
        }
      });
      this.Kae.clear();
    }
  }
  ehe(t) {
    if (this.IsPlayerXRayEnable && (this.Rae.HitResult?.Clear(), this.Rae.WorldContextObject = GlobalData_1.GlobalData.World, this.Rae.Radius = PLAYER_COLLISION_RADUIS, TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Rae, this.Pae), TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Rae, t), TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Rae, PROFILE_KEY4)) && this._he(this.Rae.HitResult)) {
      this.Tae?.CharacterActorComponent?.SetActorXRayState(true);
    } else {
      this.Tae?.CharacterActorComponent?.SetActorXRayState(false);
    }
  }
  ResetAllNpcDither() {
    for (const t of this.Kae) {
      if (!t?.IsValid()) {
        return;
      }
      t.SetDitherEffect(1, 1);
    }
    this.Kae.clear();
  }
  pae() {
    var t;
    if (this.Hh.NearCollisionProbeSize <= this.Hh.CollisionProbeSize) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Character", 57, "CollisionSize数据错误:NearCollisionProbeSize <= this.CollisionProbeSize", ["CollisionProbeSize", this.Hh.CollisionProbeSize], ["NearCollisionProbeSize", this.Hh.NearCollisionProbeSize]);
      }
    } else {
      this.Fae = this.Hh.NearCollisionProbeSize - this.Hh.CollisionProbeSize;
      t = MathUtils_1.MathUtils.Clamp(this.Hh.CameraInputController.InputSpeedPercentage / this.Hh.CollisionSizePercentage, 0, 1);
      this.Hh.CurrentCollisionSize = this.Fae * t + this.Hh.CollisionProbeSize;
      this.Hh.CurrentCollisionSize = MathUtils_1.MathUtils.Clamp(this.Hh.CurrentCollisionSize, this.Hh.CurrentCollisionSize, this.Hh.NearCollisionProbeSize);
      if (this.CurrentBlendState !== 0) {
        this.Hh.CurrentCollisionSize = this.Hh.NearCollisionProbeSize;
      }
    }
  }
  ihe(t, i, s) {
    i.Multiply(s, this.Lz);
    t.Addition(this.Lz, this.Lz);
    return this.Lz;
  }
  ohe() {
    if (this.Hh.CameraDialogueController.State !== 0) {
      this.CurrentBlendState = this.Oae ? 2 : 0;
      return true;
    } else if (ModelManager_1.ModelManager.GameModeModel.IsSilentLogin) {
      return !(this.CurrentBlendState = 0);
    } else if (this.Zrh === 2) {
      this.CurrentBlendState = this.Oae ? 2 : 0;
      return true;
    } else {
      return this.Zrh === 1 && (this.Zrh = 0, this.CurrentBlendState = this.Oae ? 2 : 0, true);
    }
  }
  rhe(t, i, s) {
    return t.Subtraction(i, this.Lz).SizeSquared() < s * s;
  }
  hhe(t) {
    return !!t.GetEntityNoBlueprint()?.GetComponent(205)?.HasTag(-1151151013);
  }
  nhe() {
    var t;
    var i;
    if (!MathUtils_1.MathUtils.IsNearlyZero(ModelManager_1.ModelManager.CameraModel.CameraDitherStartHideDistance, MathUtils_1.MathUtils.KindaSmallNumber) && (!MathUtils_1.MathUtils.IsNearlyEqual(this.Hae, ModelManager_1.ModelManager.CameraModel.CameraDitherStartHideDistance) || !MathUtils_1.MathUtils.IsNearlyEqual(this.jae, this.Hh.Fov))) {
      this.Hae = ModelManager_1.ModelManager.CameraModel.CameraDitherStartHideDistance;
      this.jae = this.Hh.Fov;
      t = this.Hae;
      i = this.Hh.CameraActor.CameraComponent.AspectRatio;
      i = MathUtils_1.MathUtils.VerticalFovToHorizontally(this.Hh.Fov, i);
      i = Math.sin(i / 2 * MathUtils_1.MathUtils.DegToRad) * t * 2;
      this.Vae = MathUtils_1.MathUtils.GetTriangleCircumradius(t, t, i);
    }
  }
  she() {
    this.Hh.CameraForward.Normalize();
    this.Hh.CameraForward.Multiply(this.Vae, this.Lz);
    this.Pae.Addition(this.Lz, this.xae);
  }
  ahe(i) {
    var s = i.GetHitCount();
    this.Qae.clear();
    for (let t = 0; t < s; ++t) {
      var h;
      var e = i.Actors.Get(t);
      if (e && e instanceof UE.Object && e.IsValid() && this.Wx_(e)) {
        if (!e.GetEntityNoBlueprint()?.GetComponent(0)?.GetModelConfig()?.主角蓝透 && !(TraceElementCommon_1.TraceElementCommon.GetImpactPoint(i, t, this.Lz), (this.Qae.get(e) ?? MAX_VALUE) <= (h = Vector_1.Vector.Dist(this.Lz, this.Pae)))) {
          this.Qae.set(e, h);
        }
      }
    }
  }
  lhe(t, i) {
    if (!t?.IsValid() || !t.CapsuleComponent) {
      return 1;
    }
    let s = this.Hh.CompleteHideDistance;
    let h = this.Hh.StartHideDistance;
    let e = this.Hh.StartDitherValue;
    var r;
    if (t.CapsuleComponent.GetCollisionObjectType() === QueryTypeDefine_1.KuroCollisionChannel.PawnMonster) {
      if (r = t.GetEntityNoBlueprint()?.GetComponent(3)) {
        s = r.CompleteHideDistance;
        h = r.StartHideDistance;
        e = r.StartDitherValue;
      }
    } else if (t.CapsuleComponent.GetCollisionObjectType() === QueryTypeDefine_1.KuroCollisionChannel.Vehicle && (r = t.GetEntityNoBlueprint()?.GetComponent(234)) && r.StartHideDistance > 0) {
      s = r.CompleteHideDistance;
      h = r.StartHideDistance;
      e = r.StartDitherValue;
    }
    return MathUtils_1.MathUtils.RangeClamp(i, s, h, MIN_DITHER, e);
  }
  the(i, t, s) {
    if (i.Z > t.Z) {
      return 0;
    }
    let h = -1;
    let e = MAX_VALUE;
    var r = s.GetHitCount();
    for (let t = 0; t < r; ++t) {
      var a;
      var o = this.Fse.HitResult?.Components?.Get(t);
      if (o?.IsValid()) {
        TraceElementCommon_1.TraceElementCommon.GetImpactPoint(s, t, this.Lz);
        a = Vector_1.Vector.DistSquared(this.Lz, i);
        if (o.GetCollisionResponseToChannel(QueryTypeDefine_1.KuroCollisionChannel.Water) !== 2 || !(a <= this.Wae)) {
          if (a < e) {
            e = a;
            h = t;
          }
        }
      }
    }
    return h;
  }
  _he(i) {
    var s = i.GetHitCount();
    for (let t = 0; t < s; ++t) {
      var h = i.Actors.Get(t);
      if (h) {
        if (h instanceof UE.Object && h.IsValid() && this.Wx_(h)) {
          if (h.GetEntityNoBlueprint()?.GetComponent(0)?.GetModelConfig()?.主角蓝透) {
            return true;
          }
        }
      }
    }
    return false;
  }
  TraceCheckPlayerLocation(t, i, s) {
    this.Fse.WorldContextObject = GlobalData_1.GlobalData.World;
    this.Fse.Radius = this.Hh.CurrentCollisionSize;
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(this.Fse, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(this.Fse, i);
    return !!TraceElementCommon_1.TraceElementCommon.SphereTrace(this.Fse, PROFILE_KEY3) && (TraceElementCommon_1.TraceElementCommon.GetHitLocation(this.Fse.HitResult, 0, s), true);
  }
  SetCameraBlendPauseType(t) {
    this.Zrh = t;
  }
  Wx_(t) {
    return !!t?.IsValid() && (t instanceof TsBaseCharacter_1.default || t instanceof TsBaseVehicle_1.default) && !!ModelManager_1.ModelManager.CharacterModel.GetHandle(t.GetEntityIdNoBlueprint())?.Valid;
  }
}
exports.CameraCollision = CameraCollision;
//# sourceMappingURL=CameraCollision.js.map