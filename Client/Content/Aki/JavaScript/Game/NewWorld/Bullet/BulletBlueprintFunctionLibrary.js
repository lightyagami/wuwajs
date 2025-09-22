"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterBuffIds_1 = require("../Character/Common/Component/Abilities/CharacterBuffIds");
const BulletController_1 = require("./BulletController");
const BulletUtil_1 = require("./BulletUtil");
class BulletBlueprintFunctionLibrary extends UE.BlueprintFunctionLibrary {
  Constructor() {}
  static CreateBulletForDebug(t, e) {
    return BulletController_1.BulletController.CreateBulletForDebug(t, e);
  }
  static GetSpecialBulletToSkillId(t, e) {
    if (e !== "") {
      return e;
    } else if (e = CharacterBuffIds_1.specialBulletToSkillIdMap.get(t)) {
      return e.toString();
    } else {
      return "";
    }
  }
  static CreateBulletFromGA(t, e, r, l, a = true, o = undefined) {
    var i;
    var l = BulletBlueprintFunctionLibrary.GetSpecialBulletToSkillId(e, l);
    if (l === "") {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Bullet", 35, "CreateBulletFromGA的SkillId为空", ["bullet", e]);
      }
      return -1;
    } else {
      i = BulletUtil_1.BulletUtil.GetSkillContextId(t.GetEntityNoBlueprint(), Number(l));
      if (e = BulletController_1.BulletController.CreateBulletCustomTarget(t, e, r, {
        SkillId: Number(l),
        SkillContextId: i,
        SyncType: a ? 1 : 0,
        InitTargetLocation: o,
        BattleFlags: t.GetEntityNoBlueprint()?.GetComponent(39)?.GetSkill(Number(l))?.BattleFlags
      }, i, 1)) {
        return e.Id;
      } else {
        return -1;
      }
    }
  }
  static GetBulletActorById(t) {
    t = EntitySystem_1.EntitySystem.Get(t);
    if (t?.Valid) {
      return t.GetComponent(170).Owner;
    }
  }
  static DestroyBullet(t, e, r = false) {
    BulletController_1.BulletController.DestroyBullet(t, e, 0, r);
    return true;
  }
  static DestroyAllBullet(t = false) {
    BulletController_1.BulletController.DestroyAllBullet(t);
  }
  static DestroySpecifiedBullet(t, e, r = false, l = 0, a = 0) {
    BulletController_1.BulletController.DestroySpecifiedBullet(t, e, r, l, a);
  }
  static GetSpecifiedBulletCount(t, e) {
    return BulletController_1.BulletController.GetSpecifiedBulletCount(t, e);
  }
  static GetCharacterLaunchedBulletIds(t) {
    t = ModelManager_1.ModelManager.BulletModel.GetBulletSetByAttacker(t);
    if (t) {
      var e = UE.NewArray(UE.BuiltinInt);
      for (const r of t) {
        e.Add(r.Id);
      }
      return e;
    }
  }
  static DebugShowBulletCollision(t, e) {
    ModelManager_1.ModelManager.BulletModel.SetBulletCollisionDraw(e, t);
  }
  static DebugShowBulletTrace(t, e) {
    ModelManager_1.ModelManager.BulletModel.SetBulletTraceDraw(e, t);
  }
  static GetIsShowBulletCollision(t) {
    return ModelManager_1.ModelManager.BulletModel.ShowBulletCollision(t);
  }
  static GetIsShowBulletTrace(t) {
    return ModelManager_1.ModelManager.BulletModel?.ShowBulletTrace(t) ?? false;
  }
  static FrozenBulletTimeByBulletName(t, e, r) {
    BulletUtil_1.BulletUtil.FrozenCharacterBullet(t.GetEntityIdNoBlueprint(), e, r);
  }
  static SetEntityIdByCustomKey(t, e, r) {
    ModelManager_1.ModelManager.BulletModel.SetEntityIdByCustomKey(t, e, r);
  }
  static GetAllBullet() {
    var t = UE.NewArray(UE.BuiltinInt);
    for (const e of ModelManager_1.ModelManager.BulletModel.GetAttackerBulletIterator()) {
      for (const r of e) {
        t.Add(r.Id);
      }
    }
    return t;
  }
  static GetBulletTransform(t) {
    return BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.ActorComponent.ActorTransform;
  }
  static GetBulletAttacker(t) {
    return BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.AttackerActorComp.Actor;
  }
  static GetBulletCollision(t) {
    return BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.CollisionInfo.CollisionComponent;
  }
  static GetBulletName(t) {
    return BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.BulletDataMain.BulletName;
  }
  static SetBulletStopHitTrue(t) {
    t = BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.CollisionInfo;
    if (t) {
      t.StopHit = true;
    }
  }
  static SetBulletTarget(t, e) {
    t = BulletBlueprintFunctionLibrary.GetBulletInfo(t);
    if (e) {
      t?.SetTargetById(e.GetEntityIdNoBlueprint());
    } else {
      t?.SetTargetById(0);
    }
  }
  static SetBulletSummon(t) {
    BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.ChildInfo?.SetIsActiveSummonChildBullet(true);
  }
  static SetBulletTransform(t, e) {
    BulletBlueprintFunctionLibrary.GetBulletInfo(t)?.ActorComponent.SetActorTransform(e);
  }
  static SetBeginSpeed(t, e) {
    BulletController_1.BulletController.SetBulletSpeedRatio(t, e);
  }
  static GetBulletInfo(t) {
    return ModelManager_1.ModelManager.BulletModel.GetBulletEntityById(t)?.GetBulletInfo();
  }
  static CalSectorPoints(e, t, r, l, a, o, i) {
    t.Normalize(MathCommon_1.MathCommon.SmallNumber);
    r.Normalize(MathCommon_1.MathCommon.SmallNumber);
    var u = o > 0 ? l / o : l;
    let n = t.RotateAngleAxis(l / 2 * -1, r).op_Multiply(a);
    t = e.op_Addition(n);
    i.Add(t);
    for (let t = 0; t < o; t++) {
      n = n.RotateAngleAxis(u, r);
      var c = e.op_Addition(n);
      i.Add(c);
    }
  }
  static RectangleTriangles(t, e, r, l, a) {
    a.Add(r);
    a.Add(l);
    a.Add(e);
    a.Add(r);
    a.Add(e);
    a.Add(t);
  }
  static CalcPipe(t, e, r, l, a, o, i, u, n) {
    e.Normalize(MathCommon_1.MathCommon.SmallNumber);
    r.Normalize(MathCommon_1.MathCommon.SmallNumber);
    var c = Vector_1.Vector.Create(r);
    c.MultiplyEqual(o);
    var o = Vector_1.Vector.Create(t);
    var t = Vector_1.Vector.Create();
    o.Subtraction(c, t);
    var s = Vector_1.Vector.Create();
    o.Addition(c, s);
    var o = (0, puerts_1.$unref)(u);
    var B = (0, puerts_1.$unref)(n);
    BulletBlueprintFunctionLibrary.CalSectorPoints(t.ToUeVectorOld(), e, r, 360, a, i, o);
    var _ = o.Num();
    BulletBlueprintFunctionLibrary.CalSectorPoints(t.ToUeVectorOld(), e, r, 360, l, i, o);
    var C = o.Num();
    BulletBlueprintFunctionLibrary.CalSectorPoints(s.ToUeVectorOld(), e, r, 360, a, i, o);
    var m = o.Num();
    BulletBlueprintFunctionLibrary.CalSectorPoints(s.ToUeVectorOld(), e, r, 360, l, i, o);
    for (let t = 0; t < _ - 1; t++) {
      var M = C + t;
      var b = C + t + 1;
      var y = m + t;
      var h = m + t + 1;
      BulletBlueprintFunctionLibrary.RectangleTriangles(M, y, b, h, B);
      M = 0 + t + 1;
      b = 0 + t;
      y = _ + t + 1;
      h = _ + t;
      BulletBlueprintFunctionLibrary.RectangleTriangles(M, y, b, h, B);
      M = 0 + t;
      b = 0 + t + 1;
      y = C + t;
      h = C + t + 1;
      BulletBlueprintFunctionLibrary.RectangleTriangles(M, y, b, h, B);
      M = _ + t + 1;
      b = _ + t;
      y = m + t + 1;
      h = m + t;
      BulletBlueprintFunctionLibrary.RectangleTriangles(M, y, b, h, B);
    }
  }
  static CircleTriangles(e, r, l, a, o) {
    for (let t = r; t < l; t++) {
      if (a) {
        o.Add(e);
        o.Add(t + 1);
        o.Add(t);
      } else {
        o.Add(e);
        o.Add(t);
        o.Add(t + 1);
      }
    }
  }
  static CalcSector(t, e, r, l, a, o, i, u, n) {
    e.Normalize(MathCommon_1.MathCommon.SmallNumber);
    r.Normalize(MathCommon_1.MathCommon.SmallNumber);
    var u = (0, puerts_1.$unref)(u);
    var c = (0, puerts_1.$unref)(n);
    var n = l > MathCommon_1.MathCommon.RoundAngle ? MathCommon_1.MathCommon.RoundAngle : l;
    var l = t.op_Subtraction(r.op_Multiply(o));
    var t = t.op_Addition(r.op_Multiply(o));
    u.Add(l);
    BulletBlueprintFunctionLibrary.CalSectorPoints(l, e, r, n, a, i, u);
    var s = u.Num() - 1;
    var B = u.Num();
    u.Add(t);
    BulletBlueprintFunctionLibrary.CalSectorPoints(t, e, r, n, a, i, u);
    var o = u.Num() - 1;
    BulletBlueprintFunctionLibrary.CircleTriangles(0, 1, s, false, c);
    BulletBlueprintFunctionLibrary.CircleTriangles(B, B + 1, o, true, c);
    if (!MathUtils_1.MathUtils.IsNearlyEqual(n, MathCommon_1.MathCommon.RoundAngle)) {
      BulletBlueprintFunctionLibrary.RectangleTriangles(1, B + 1, 0, B, c);
      BulletBlueprintFunctionLibrary.RectangleTriangles(0, B, s, o, c);
    }
    for (let t = 1; t < s; t++) {
      var _ = t;
      var C = t + 1;
      var m = B + _;
      var M = B + C;
      BulletBlueprintFunctionLibrary.RectangleTriangles(C, M, _, m, c);
    }
  }
  static CalcBulletInitLocation(a, o, i) {
    var u = o.D_GetTransform();
    var o = Quat_1.Quat.Create();
    Rotator_1.Rotator.Create(0, 90, 0).Quaternion(o);
    u.SetRotation(o.ToUeQuat());
    if (a.移动设置.运动轨迹类型 === 3) {
      let t = undefined;
      let e = 0;
      let r = undefined;
      r = a.移动设置.运动轨迹参数目标 === 0 || a.移动设置.运动轨迹参数目标 === 6 || a.移动设置.运动轨迹参数目标 === 1 ? (t = u.GetLocation(), e = u.Rotator().Yaw, u.GetRotation().GetForwardVectorDouble()) : (t = i.GetLocation(), e = i.GetRotation().Rotator().Yaw, i.GetRotation().VectorDouble());
      o = a.移动设置.运动轨迹参数数据.Get(0);
      let l = r.RotateAngleAxis(o.Y, Vector_1.Vector.UpVectorDouble);
      l.Z = -Math.sin((e + o.Y) * MathCommon_1.MathCommon.DegToRad) * Math.tan(o.Z * MathCommon_1.MathCommon.DegToRad);
      l.Normalize(MathCommon_1.MathCommon.SmallNumber);
      return l = (l = l.op_Multiply(o.X)).op_Addition(t);
    }
    var t = Vector_1.Vector.Create();
    var e = Vector_1.Vector.Create();
    e.FromUeVector(a.基础设置.出生位置偏移);
    switch (a.基础设置.出生位置基准) {
      case 0:
      case 6:
        t.FromUeVector(u.TransformPosition(e.ToUeVector()));
        break;
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 7:
      case 8:
      case 9:
      case 10:
        t.FromUeVector(i.TransformPosition(e.ToUeVector()));
    }
    return t.ToUeVector();
  }
  static AttachToBone(t, e, r) {
    var l = r.移动设置.子弹跟随类型;
    if (l === 0) {
      e.K2_AttachToComponent(t, r.移动设置.骨骼名字, 1, 1, 1, true);
    } else if (l === 3) {
      e.K2_AttachToComponent(t, r.移动设置.骨骼名字, 1, 1, 1, true);
      l = UE.KismetMathLibrary.Conv_VectorToVectorDouble(r.基础设置.出生位置偏移);
      e.D_K2_SetActorRelativeLocation(l, false, undefined, false);
      e.K2_SetActorRelativeRotation(Rotator_1.Rotator.ZeroRotator, false, undefined, true);
    }
  }
  static CalcBulletInitRotator(t, e, r, l, a) {
    var o = Rotator_1.Rotator.Create();
    if (t.移动设置.运动轨迹类型 === 3) {
      return e.K2_GetActorRotation();
    }
    switch (t.移动设置.出生初速度方向基准) {
      case 0:
        var i = e.GetActorForwardVector().RotateAngleAxis(90, Vector_1.Vector.UpVector);
        o.FromUeRotator(i.Rotation());
        break;
      case 2:
      case 7:
        o.FromUeRotator(UE.KismetMathLibrary.D_FindLookAtRotation(e.D_K2_GetActorLocation(), r.D_K2_GetActorLocation()));
        break;
      case 1:
      case 5:
      case 6:
      case 10:
      case 9:
      case 8:
      case 11:
        o.FromUeRotator(UE.KismetMathLibrary.D_FindLookAtRotation(e.D_K2_GetActorLocation(), l.GetLocation()));
        break;
      case 3:
        o.FromUeRotator(a.K2_GetActorRotation());
        break;
      case 4:
        o.FromUeRotator(e.K2_GetActorRotation());
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 20, "CalcBulletInitRotator", ["ret", o]);
    }
    return o.ToUeRotator();
  }
  static CalcBulletRotator(e, r, l, a, o) {
    var t = Rotator_1.Rotator.Create();
    var i = Vector_1.Vector.Create();
    switch (e.移动设置.运动轨迹类型) {
      case 0:
        t.FromUeRotator(r.K2_GetActorRotation());
        break;
      case 1:
        break;
      case 2:
        t.FromUeRotator(UE.KismetMathLibrary.D_FindLookAtRotation(r.D_K2_GetActorLocation(), a));
        break;
      case 3:
        {
          var u = e.移动设置.运动轨迹参数数据.Get(0);
          var n = e.移动设置.移动速度 * o * MathCommon_1.MathCommon.RadToDeg / u.X;
          i.Set(0, Math.sin(u.Z * MathCommon_1.MathCommon.DegToRad), Math.cos(u.Z * MathCommon_1.MathCommon.DegToRad));
          let t = undefined;
          u = (t = e.移动设置.运动轨迹参数目标 === 0 || e.移动设置.运动轨迹参数目标 === 6 || e.移动设置.运动轨迹参数目标 === 1 ? l.D_K2_GetActorLocation() : a).op_Subtraction(r.D_K2_GetActorLocation()).RotateAngleAxis(n, i.ToUeVector());
          n = t.op_Addition(u);
          r.K2_SetActorRotation(UE.KismetMathLibrary.D_FindLookAtRotation(t, n), false);
          r.D_K2_SetActorLocation(n, false, undefined, true);
          break;
        }
    }
    return t.ToUeRotator();
  }
  static CalcBulletLocation(t, e, r) {
    return e.D_K2_GetActorLocation().op_Addition(e.D_GetActorForwardVector().op_Multiply(t.移动设置.移动速度 * r));
  }
}
exports.default = BulletBlueprintFunctionLibrary;
//# sourceMappingURL=BulletBlueprintFunctionLibrary.js.map