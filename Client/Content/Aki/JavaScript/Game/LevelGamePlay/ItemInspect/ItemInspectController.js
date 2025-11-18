"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemInspectController = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const QueryTypeDefine_1 = require("../../../Core/Define/QueryTypeDefine");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathCommon_1 = require("../../../Core/Utils/Math/MathCommon");
const Quat_1 = require("../../../Core/Utils/Math/Quat");
const Transform_1 = require("../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../Core/Utils/TraceElementCommon");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneInteractionManager_1 = require("../../Render/Scene/Interaction/SceneInteractionManager");
const UiManager_1 = require("../../Ui/UiManager");
const ItemInspectRangeChecker_1 = require("./ItemInspectRangeChecker");
const ItemInspectPointManagerCreator_1 = require("./Point/ItemInspectPointManagerCreator");
const PROFILE_KEY = "ItemInspectCheckVisible";
const ITEM_ROTATION_TOLERANCE = 0.1;
class ItemInspectController extends ControllerBase_1.ControllerBase {
  static BindItemInspectActor(e) {
    if (e.IsValid()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelPlay", 48, "绑定物品检视Actor", ["Actor", e.GetName()]);
      }
      ModelManager_1.ModelManager.ItemInspectModel.OriginItemActor = e;
    }
  }
  static TriggerRangeDebug() {
    ModelManager_1.ModelManager.ItemInspectModel.OpenRangeDebug = !ModelManager_1.ModelManager.ItemInspectModel.OpenRangeDebug;
  }
  static OpenItemInspect(t, e, a) {
    var r = t.RangeCheckConfig;
    var o = r.CenterOffset;
    var n = Global_1.Global.CharacterCameraManager;
    var M = Vector_1.Vector.Create(n.D_GetCameraLocation());
    M.X += o.X ?? 0;
    M.Y += o.Y ?? 0;
    M.Z += o.Z ?? 0;
    var o = ItemInspectRangeChecker_1.ItemInspectRangeChecker.Create(r.Type, {
      Height: r.Height,
      Radius: r.Radius
    }, M, n.GetCameraRotation());
    var r = (0, ItemInspectPointManagerCreator_1.createPointManager)(t.InteractPointsConfig);
    if (o && r) {
      if (ModelManager_1.ModelManager.ItemInspectModel.OriginItemActor?.IsValid()) {
        (M = UE.NewObject(UE.TraceLineElement.StaticClass())).WorldContextObject = GlobalData_1.GlobalData.World;
        M.bIsSingle = true;
        M.AddObjectTypeQuery(QueryTypeDefine_1.KuroObjectTypeQuery.WorldDynamic);
        n = t.TextUiConfig;
        ModelManager_1.ModelManager.ItemInspectModel.InitData(n.Type, t.RotateSpeed, o, r, t.ItemInteractFinishEffect, M, a);
        if (o = ModelManager_1.ModelManager.ItemInspectModel.GetViewName()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("LevelPlay", 48, "物品检视玩法开始");
          }
          ControllerHolder_1.ControllerHolder.SequenceController.PauseSequence("ItemInspect");
          e?.(o);
          UiManager_1.UiManager.OpenViewByPlot(o, n, () => {
            if (ModelManager_1.ModelManager.ItemInspectModel.OriginItemActor) {
              ModelManager_1.ModelManager.ItemInspectModel.OpenViewReady();
            }
          });
          this.u0d(() => {
            var e;
            var a;
            var r = ModelManager_1.ModelManager.ItemInspectModel.OriginItemActor;
            if (r?.IsValid()) {
              e = r.D_K2_GetActorLocation();
              a = 0;
              a = SceneInteractionManager_1.SceneInteractionManager.Get().CreateSceneInteractionLevel(t.PrefabPath, 0, e, r.K2_GetActorRotation(), () => {
                this.EId(true);
                ModelManager_1.ModelManager.ItemInspectModel.LoadPrefabReady();
                TimerSystem_1.TimerSystem.Next(() => {
                  var e = ModelManager_1.ModelManager.ItemInspectModel.CurItemId;
                  this.sQu(e);
                  var e = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionMainActor(e);
                  if (e?.IsValid()) {
                    ModelManager_1.ModelManager.ItemInspectModel.TargetQuat.FromUeQuat(e.K2_GetActorQuaternion());
                  }
                });
              }, true, false);
              ModelManager_1.ModelManager.ItemInspectModel.CurItemId = a ?? 0;
              (r = Transform_1.Transform.Create()).SetLocation(e);
              (a = ActorSystem_1.ActorSystem.Get(UE.StaticMeshActor.StaticClass(), r.ToUeTransform())).SetActorHiddenInGame(true);
              ModelManager_1.ModelManager.ItemInspectModel.DarkStageActor = a;
              if (GlobalData_1.GlobalData.IsPlayInEditor) {
                a.SetActorLabel("ItemInspectDarkStage");
              }
              this.i0d().finally(() => {
                var e = ModelManager_1.ModelManager.ItemInspectModel.GetDarkStageAlpha();
                var a = ModelManager_1.ModelManager.ItemInspectModel.GetDarkStageBlendTime();
                this.r0d(0, e, a);
              });
            }
          });
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelPlay", 48, "物品检视界面类型未实现，开启失败");
          }
          a?.(false);
          ModelManager_1.ModelManager.ItemInspectModel.ClearData();
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelPlay", 48, "物品检视未绑定原物品，开启失败");
        }
        a?.(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelPlay", 48, "物品检视配置不合法，开启失败");
      }
      a?.(false);
    }
  }
  static FinishItemInspect(a) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelPlay", 48, "物品检视玩法结束");
    }
    var e = ModelManager_1.ModelManager.ItemInspectModel.GetDarkStageAlpha();
    var r = ModelManager_1.ModelManager.ItemInspectModel.GetDarkStageBlendTime();
    this.r0d(e, 0, r, () => {
      var e = ModelManager_1.ModelManager.ItemInspectModel.CurItemId;
      SceneInteractionManager_1.SceneInteractionManager.Get().ToggleSceneInteractionVisible(e, false, true, undefined, "FinishItemInspect");
      SceneInteractionManager_1.SceneInteractionManager.Get().DestroySceneInteraction(e);
      this.EId(false);
      ModelManager_1.ModelManager.ItemInspectModel.GetFinishCallback()?.(a);
      ModelManager_1.ModelManager.ItemInspectModel.ClearData();
      ControllerHolder_1.ControllerHolder.SequenceController.ResumeSequence("ItemInspect");
    });
  }
  static InterruptItemInspect() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelPlay", 48, "物品检视玩法中断");
    }
    var e = ModelManager_1.ModelManager.ItemInspectModel.GetViewName();
    if (e && UiManager_1.UiManager.IsViewOpen(e)) {
      UiManager_1.UiManager.CloseView(e);
    }
    var e = ModelManager_1.ModelManager.ItemInspectModel.CurItemId;
    if (e > 0) {
      SceneInteractionManager_1.SceneInteractionManager.Get().ToggleSceneInteractionVisible(e, false, true, undefined, "FinishItemInspect");
      SceneInteractionManager_1.SceneInteractionManager.Get().DestroySceneInteraction(e);
    }
    this.EId(false);
    ModelManager_1.ModelManager.ItemInspectModel.GetFinishCallback()?.(true);
    ModelManager_1.ModelManager.ItemInspectModel.ClearData();
    ControllerHolder_1.ControllerHolder.SequenceController.ResumeSequence("ItemInspect");
  }
  static EId(a) {
    var e = ModelManager_1.ModelManager.ItemInspectModel.OriginItemActor;
    if (e?.IsValid()) {
      e.SetActorHiddenInGame(a);
      var r = (0, puerts_1.$ref)(undefined);
      e.GetAttachedActorDescendants(r, true);
      var t = (0, puerts_1.$unref)(r);
      var o = t.Num();
      for (let e = 0; e < o; e++) {
        var n = t.Get(e);
        if (n.IsValid()) {
          n.SetActorHiddenInGame(a);
        }
      }
    }
  }
  static u0d(a) {
    if (ModelManager_1.ModelManager.ItemInspectModel.IsInitGlobalConfig()) {
      a();
    } else {
      ResourceSystem_1.ResourceSystem.LoadTypeAsync("BP_ItemInspectGlobalConfig_C", () => {
        ResourceSystem_1.ResourceSystem.LoadAsync("/Game/Aki/Data/Level/ItemInspect/DA_ItemInspectGlobalConfig.DA_ItemInspectGlobalConfig", UE.BP_ItemInspectGlobalConfig_C, e => {
          if (e?.IsValid()) {
            ModelManager_1.ModelManager.ItemInspectModel.InitGlobalConfig(e);
            a();
          }
        });
      });
    }
  }
  static async i0d() {
    var e = ModelManager_1.ModelManager.ItemInspectModel.GetDarkStageMeshPath();
    if (e !== "") {
      const r = new CustomPromise_1.CustomPromise();
      ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.StaticMesh, e => {
        var a;
        if (e?.IsValid() && (a = ModelManager_1.ModelManager.ItemInspectModel.DarkStageActor)?.IsValid()) {
          a.StaticMeshComponent.SetMobility(2);
          a.StaticMeshComponent.SetStaticMesh(e);
          a.StaticMeshComponent.SetEnableGravity(false);
          r.SetResult(true);
        } else {
          r.SetResult(false);
        }
      });
      if (await r.Promise) {
        e = ModelManager_1.ModelManager.ItemInspectModel.GetDarkStageMaterialPath();
        if (e !== "") {
          const t = new CustomPromise_1.CustomPromise();
          ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.MaterialInstance, e => {
            var a;
            var r;
            if (e?.IsValid() && (a = ModelManager_1.ModelManager.ItemInspectModel.DarkStageActor)?.IsValid() && (e = a.StaticMeshComponent.CreateDynamicMaterialInstance(0, e))?.IsValid()) {
              ModelManager_1.ModelManager.ItemInspectModel.DarkStageMaterial = e;
              r = ModelManager_1.ModelManager.ItemInspectModel.GetDarkStageScreenDepth();
              e.SetScalarParameterValue(new UE.FName("ScreenDepth"), r);
              e.SetScalarParameterValue(new UE.FName("Base_Alpha_Multiply"), 0);
              a.SetActorHiddenInGame(false);
            }
            t.SetResult();
          });
          await t.Promise;
        }
      }
    }
  }
  static r0d(o, n, M, _) {
    if (ModelManager_1.ModelManager.ItemInspectModel.DarkStageBlendTimer) {
      ModelManager_1.ModelManager.ItemInspectModel.DarkStageBlendTimer.Remove();
      ModelManager_1.ModelManager.ItemInspectModel.DarkStageBlendTimer = undefined;
    }
    const l = new UE.FName("Base_Alpha_Multiply");
    var e;
    if (M <= 0) {
      if ((e = ModelManager_1.ModelManager.ItemInspectModel.DarkStageMaterial)?.IsValid()) {
        e.SetScalarParameterValue(l, n);
      }
      _?.();
    } else {
      let t = 0;
      ModelManager_1.ModelManager.ItemInspectModel.DarkStageBlendTimer = TimerSystem_1.TimerSystem.Forever(e => {
        var a;
        var r = ModelManager_1.ModelManager.ItemInspectModel.DarkStageMaterial;
        if (!r?.IsValid() || (e = (t += e) / M, a = MathUtils_1.MathUtils.Lerp(o, n, MathUtils_1.MathUtils.Clamp(e, 0, 1)), r.SetScalarParameterValue(l, a), e >= 1)) {
          ModelManager_1.ModelManager.ItemInspectModel.DarkStageBlendTimer?.Remove();
          ModelManager_1.ModelManager.ItemInspectModel.DarkStageBlendTimer = undefined;
          _?.();
        }
      }, ModelManager_1.ModelManager.ItemInspectModel.GetDarkStageBlendInterval());
    }
  }
  static InteractPoint(e, a) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelPlay", 48, "物品检视，执行交互效果开始");
    }
    this.hzu();
    this.ResetRotateInput();
    const r = ModelManager_1.ModelManager.ItemInspectModel.GetPointManager();
    var t = () => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelPlay", 48, "物品检视，执行交互效果结束");
      }
      r.CheckPoint(e);
      a();
    };
    var o = r.GetPoint(e);
    var n = o?.EffectConfigs;
    if (!n || n.length <= 0) {
      t();
    } else {
      ModelManager_1.ModelManager.ItemInspectModel.GetEffectCenter().ExecuteEffects(n, o.IsChecked, o.ProtectTime, t);
    }
  }
  static ReceiveRotateInput(e, a = false) {
    ModelManager_1.ModelManager.ItemInspectModel.InputDirect.DeepCopy(e);
    ModelManager_1.ModelManager.ItemInspectModel.InputDirect.MultiplyEqual(a ? ModelManager_1.ModelManager.ItemInspectModel.GetGamePadSensitivity() : ModelManager_1.ModelManager.ItemInspectModel.GetDragSensitivity());
  }
  static ResetRotateInput() {
    ModelManager_1.ModelManager.ItemInspectModel.InputDirect.Reset();
  }
  static ResetItemRotation(e) {
    ModelManager_1.ModelManager.ItemInspectModel.ResettingItem = true;
    ModelManager_1.ModelManager.ItemInspectModel.OnResetItemRotationFinish = e;
  }
  static PlayFinishEffect(e) {
    var a = ModelManager_1.ModelManager.ItemInspectModel.GetFinishEffect();
    if (a) {
      ModelManager_1.ModelManager.ItemInspectModel.GetEffectCenter().ExecuteEffects(a.EffectList, false, a.ProtectTime ?? 0, e);
    } else {
      e?.();
    }
  }
  static UpdateItemInspect(e) {
    var a;
    if (!!ModelManager_1.ModelManager.ItemInspectModel.IsInspectReady() && !((a = ModelManager_1.ModelManager.ItemInspectModel.CurItemId) <= 0)) {
      if (GlobalData_1.GlobalData.IsPlayInEditor && ModelManager_1.ModelManager.ItemInspectModel.OpenRangeDebug) {
        this.RSd();
      }
      if (ModelManager_1.ModelManager.ItemInspectModel.ResettingItem) {
        this.JWc(a, e);
        this.sQu(a);
      } else if (this.aQu(a, e)) {
        this.sQu(a);
      }
    }
  }
  static RSd() {
    ModelManager_1.ModelManager.ItemInspectModel.GetRangeChecker()?.DebugDraw();
  }
  static aQu(e, r) {
    e = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionMainActor(e);
    if (!e?.IsValid()) {
      return false;
    }
    var r = r * MathUtils_1.MathUtils.MillisecondToSecond;
    var t = ModelManager_1.ModelManager.ItemInspectModel.GetInputSeedLimit();
    var a = ModelManager_1.ModelManager.ItemInspectModel.GetRotateInterpSpeed();
    var o = ModelManager_1.ModelManager.ItemInspectModel.InputDirect;
    var n = ModelManager_1.ModelManager.ItemInspectModel.TargetQuat;
    var M = ModelManager_1.ModelManager.ItemInspectModel.TempQuat;
    if (!o.IsNearlyZero()) {
      var _ = ModelManager_1.ModelManager.ItemInspectModel.TempVector;
      var l = Global_1.Global.CharacterCameraManager;
      let e = r * o.X;
      let a = r * o.Y;
      if (Math.abs(e) > t) {
        e = Math.sign(e) * t;
      }
      if (Math.abs(a) > t) {
        a = Math.sign(a) * t;
      }
      _.FromUeVector(l.D_GetActorUpVector());
      Quat_1.Quat.ConstructorByAxisAngle(_, e * MathCommon_1.MathCommon.DegToRad, M);
      M.Multiply(n, n);
      _.FromUeVector(l.D_GetActorRightVector());
      Quat_1.Quat.ConstructorByAxisAngle(_, a * MathCommon_1.MathCommon.DegToRad, M);
      M.Multiply(n, n);
    }
    o = ModelManager_1.ModelManager.ItemInspectModel.TempRotator;
    o.FromUeRotator(e.K2_GetActorRotation());
    t = ModelManager_1.ModelManager.ItemInspectModel.TempRotator2;
    n.Rotator(t);
    return !o.Equals(t, ITEM_ROTATION_TOLERANCE) && (M.FromUeQuat(e.K2_GetActorQuaternion()), Quat_1.Quat.Slerp(M, n, MathUtils_1.MathUtils.Clamp(a * r, 0, 1), M), M.Rotator(t), e.K2_SetActorRotation(t.ToUeRotator(), false), true);
  }
  static JWc(e, a) {
    var r;
    var t;
    var e = SceneInteractionManager_1.SceneInteractionManager.Get().GetSceneInteractionMainActor(e);
    var o = ModelManager_1.ModelManager.ItemInspectModel.OriginItemActor;
    if (e?.IsValid() && o?.IsValid()) {
      (r = ModelManager_1.ModelManager.ItemInspectModel.TempRotator).FromUeRotator(e.K2_GetActorRotation());
      (t = ModelManager_1.ModelManager.ItemInspectModel.TempRotator2).FromUeRotator(o.K2_GetActorRotation());
      if (r.Equals(t, ITEM_ROTATION_TOLERANCE)) {
        e.K2_SetActorRotation(t.ToUeRotator(), false);
        ModelManager_1.ModelManager.ItemInspectModel.ResettingItem = false;
        ModelManager_1.ModelManager.ItemInspectModel.OnResetItemRotationFinish?.();
        t.Quaternion(ModelManager_1.ModelManager.ItemInspectModel.TargetQuat);
      } else {
        MathUtils_1.MathUtils.RotatorInterpTo(r, t, a * MathUtils_1.MathUtils.MillisecondToSecond, ModelManager_1.ModelManager.ItemInspectModel.GetResetItemRotationSpeed(), t);
        e.K2_SetActorRotation(t.ToUeRotator(), false);
      }
    } else {
      ModelManager_1.ModelManager.ItemInspectModel.ResettingItem = false;
      ModelManager_1.ModelManager.ItemInspectModel.OnResetItemRotationFinish?.();
    }
  }
  static sQu(a) {
    var r = SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorsNum(a) ?? 0;
    if (!(r <= 0)) {
      this.hzu();
      var t = ModelManager_1.ModelManager.ItemInspectModel.VisiblePoints;
      var o = ModelManager_1.ModelManager.ItemInspectModel.VisiblePointsPool;
      var n = ModelManager_1.ModelManager.ItemInspectModel.GetPointManager();
      var M = ModelManager_1.ModelManager.ItemInspectModel.GetRangeChecker();
      var _ = Global_1.Global.CharacterCameraManager.D_GetCameraLocation();
      var l = ModelManager_1.ModelManager.ItemInspectModel.GetLineElement();
      for (let e = 0; e < r; e++) {
        var i = SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActor(a, e);
        if (i?.IsValid()) {
          var g = SceneInteractionManager_1.SceneInteractionManager.Get().GetPartCollisionActorTag(a, i);
          if (g) {
            var g = g.TagId;
            var s = n.GetPoint(g);
            if (s?.IsActive) {
              i = i.D_K2_GetActorLocation();
              if (M.IsPointInside(i)) {
                if (!s.CancelTrace && l) {
                  TraceElementCommon_1.TraceElementCommon.SetStartLocation(l, i);
                  TraceElementCommon_1.TraceElementCommon.SetEndLocation(l, _);
                  if (TraceElementCommon_1.TraceElementCommon.LineTrace(l, PROFILE_KEY) && l.HitResult?.bBlockingHit) {
                    continue;
                  }
                }
                let e = o.pop();
                if (e) {
                  e.TagId = g;
                  e.Location.FromUeVector(i);
                  e.IsChecked = s.IsChecked;
                } else {
                  e = {
                    TagId: g,
                    Location: Vector_1.Vector.Create(i),
                    IsChecked: s.IsChecked
                  };
                }
                t.push(e);
              }
            }
          }
        }
      }
    }
  }
  static hzu() {
    var a = ModelManager_1.ModelManager.ItemInspectModel.VisiblePoints;
    var r = ModelManager_1.ModelManager.ItemInspectModel.VisiblePointsPool;
    var t = a.length;
    for (let e = 0; e < t; e++) {
      var o = a.pop();
      if (o) {
        r.push(o);
      }
    }
  }
}
exports.ItemInspectController = ItemInspectController;
//# sourceMappingURL=ItemInspectController.js.map