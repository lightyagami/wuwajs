"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventAdjustPlayerCamera = undefined;
const Log_1 = require("../../../Core/Common/Log");
const TickSystem_1 = require("../../../Core/Tick/TickSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const IComponent_1 = require("../../../UniverseEditor/Interface/IComponent");
const SceneCameraDisplayComponent_1 = require("../../Camera/SceneCameraDisplayComponent");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsUtils_1 = require("../../GameSettings/GameSettingsUtils");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const FlowController_1 = require("../../Module/Plot/Flow/FlowController");
const RenderUtil_1 = require("../../Render/Utils/RenderUtil");
const ConfigCurveUtils_1 = require("../../Utils/ConfigCurveUtils");
const GravityUtils_1 = require("../../Utils/GravityUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const IMMEDIATELY_FADE_CAMERA_TIME = 0.1;
const noAimGameplayTag = -1036349300;
class LevelEventAdjustPlayerCamera extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.yLe = undefined;
    this.$Jd = new SceneCameraDisplayComponent_1.CameraAberrationView();
    this.cz = Vector_1.Vector.Create();
    this.OPt = undefined;
    this.H6m = undefined;
    this.$6m = undefined;
    this.Jsg = undefined;
    this.N4l = () => {
      this.FinishExecute(true);
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AdjustCameraSync, this.N4l)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AdjustCameraSync, this.N4l);
      }
    };
    this.W6m = () => {
      if (ControllerHolder_1.ControllerHolder.CameraController.SceneCamera?.PlayerComponent?.IsDefaultSubCameraValid()) {
        if (this.OPt) {
          var e = this.OPt.Option.TargetType.CutCameraConfig;
          if (e?.CameraParams) {
            const o = e?.CutFlow;
            var t = Vector_1.Vector.Create();
            var r = Rotator_1.Rotator.Create();
            t.FromConfigVector(e.CameraParams.Pos);
            r.Pitch = e?.CameraParams.Rot.Y ?? 0;
            r.Yaw = e?.CameraParams.Rot.Z ?? 0;
            r.Roll = e?.CameraParams.Rot.X ?? 0;
            GameSettingsUtils_1.GameSettingsUtils.ApplyMotionBlur(0);
            ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.EnterFixSceneSubCamera(t, r, e?.CameraParams.Fov ?? 75, 0, 0, 1, () => {
              GameSettingsUtils_1.GameSettingsUtils.ApplyMotionBlur(1);
              if (o) {
                FlowController_1.FlowController.StartFlowForCallback(o.FlowListName, o.FlowId, o.StateId, this.Q6m);
              } else {
                this.Q6m();
              }
            });
          } else {
            this.Q6m();
          }
        } else {
          this.Q6m();
        }
      } else {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Event", 74, "[环视]FixedLookAtCallback 场景子相机不可用, 结束环视");
        }
        ControllerHolder_1.ControllerHolder.PanoramicController.EnterPanoramic(false, undefined);
        this.FinishExecute(false);
      }
    };
    this.Q6m = () => {
      var e = this.OPt?.Option?.TargetType;
      GameSettingsUtils_1.GameSettingsUtils.ApplyMotionBlur(0);
      if (e) {
        var t = (e.CutCameraConfig?.CutTimeParams?.CutStayTime ?? 0.02) < 0.02 ? 0.02 : e.CutCameraConfig?.CutTimeParams?.CutStayTime ?? 0.02;
        const r = (e.MovingTimeParams?.BeforeFadeOutStayTime ?? 0.02) < 0.02 ? 0.02 : e.MovingTimeParams?.BeforeFadeOutStayTime ?? 0.02;
        this.H6m = TimerSystem_1.TimerSystem.Delay(() => {
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitFixSceneSubCamera(() => {
            GameSettingsUtils_1.GameSettingsUtils.ApplyMotionBlur(1);
            this.$6m = TimerSystem_1.TimerSystem.Delay(() => {
              ControllerHolder_1.ControllerHolder.PanoramicController.EnterPanoramic(false, undefined);
              ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraGuideFinishStaying();
              this.Xtf();
              this.FinishExecute(true);
            }, r * 1000);
          }, false);
        }, t * 1000);
      } else {
        ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.ExitFixSceneSubCamera(() => {
          GameSettingsUtils_1.GameSettingsUtils.ApplyMotionBlur(1);
          this.$6m = TimerSystem_1.TimerSystem.Delay(() => {
            ControllerHolder_1.ControllerHolder.PanoramicController.EnterPanoramic(false, undefined);
            ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraGuideFinishStaying();
            this.Xtf();
            this.FinishExecute(true);
          }, 20);
        }, false);
      }
    };
  }
  ExecuteNew(e, t) {
    const i = e;
    if (i) {
      this.OPt = i;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 38, "进入相机调整");
      }
      if (this.K6m()) {
        if (!this.ILe(i)) {
          this.FinishExecute(false);
          return;
        }
      }
      let o = false;
      switch (i.Option.Type) {
        case IAction_1.EAdjustPlayerCamera.Horizontal:
          this.TLe(i, noAimGameplayTag);
          ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraSpline(i.Option.SplineEntityId, i.Option.YawAngle, i.Option.PitchAngle, i.Option.FadeInTime);
          if (i.Option.DepthOfField !== undefined) {
            ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyDepthOfField(i.Option.DepthOfField.Fstop, i.Option.DepthOfField.Distance, i.Option.DepthOfField.BlurAmount, i.Option.DepthOfField.BlurRadius);
          } else {
            ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ExitDepthOfField();
          }
          ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.SetPlayCameraSequenceEnabled(false);
          RenderUtil_1.RenderUtil.CloseVelocityScreenSizeCull();
          break;
        case IAction_1.EAdjustPlayerCamera.Dialog:
          this.TLe(i, noAimGameplayTag);
          let e = i.Option.PitchAngle;
          if (e !== undefined) {
            e = -e;
          }
          let t = i.Option.YawAngle;
          if (t !== undefined) {
            t += 180;
          }
          var l = this.yLe.DefaultConfig.get(1);
          ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.AdjustDialogueCamera(i.Option.CenterPos, e, t, l);
          break;
        case IAction_1.EAdjustPlayerCamera.Fixed:
          this.TLe(i, noAimGameplayTag);
          var l = Vector_1.Vector.Create();
          var s = Rotator_1.Rotator.Create();
          l.Set(i.Option.CenterPos.X ?? 0, i.Option.CenterPos.Y ?? 0, i.Option.CenterPos.Z ?? 0);
          s.Set(i.Option.CenterRot.Y ?? 0, i.Option.CenterRot.Z ?? 0, i.Option.CenterRot.X ?? 0);
          let r = undefined;
          if (i.Option.OrthogonalConfig) {
            this.cz.Set(i.Option.OrthogonalConfig.BasePoint.X ?? 0, i.Option.OrthogonalConfig.BasePoint.Y ?? 0, i.Option.OrthogonalConfig.BasePoint.Z ?? 0);
            a = i.Option.OrthogonalConfig.FadeInTime ?? 0;
            n = i.Option.OrthogonalConfig.FadeOutTime ?? 0;
            this.$Jd.Set(this.cz, a, n, i.Option.FadeOutTime);
            r = this.$Jd;
          }
          ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.EnterFixSceneSubCamera(l, s, i.Option.Fov, i.Option.FadeInTime, i.Option.FadeOutTime, 1, undefined, i.Option.BlendIn?.Type, i.Option.BlendIn?.BlendExp, i.Option.BlendOut?.Type, i.Option.BlendOut?.BlendExp, !!i.Option.OrthogonalConfig, r);
          break;
        case IAction_1.EAdjustPlayerCamera.Basic:
          if (i.Option.IsSynchronous) {
            o = true;
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AdjustCameraSync, this.N4l);
          }
          this.TLe(i);
          if (i.Option.SightUi) {
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetCameraAimVisible, true, 0, i.Option.SightUi);
          }
          break;
        case IAction_1.EAdjustPlayerCamera.AxisLock:
          var a = i.Option.AxisRotate.Y ?? 0;
          var n = i.Option.AxisRotate.Z ?? 0;
          this.yLe.DefaultConfig.set(45, a);
          this.yLe.DefaultConfig.set(46, a);
          this.yLe.DefaultConfig.set(60, n);
          this.yLe.DefaultConfig.set(61, n);
          if (i.Option.ScreenConfig) {
            if (Math.abs(ControllerHolder_1.ControllerHolder.CameraController.CameraRotator.Pitch - a) <= i.Option.ScreenConfig.TriggerAngle && Math.abs(ControllerHolder_1.ControllerHolder.CameraController.CameraRotator.Yaw - n) <= i.Option.ScreenConfig.TriggerAngle) {
              this.TLe(i, noAimGameplayTag);
            } else {
              l = i.Option.ScreenConfig.FadeInTime;
              const _ = i.Option.ScreenConfig.FadeOutTime;
              ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, () => {
                this.yLe.FadeInTime = IMMEDIATELY_FADE_CAMERA_TIME;
                this.TLe(i, noAimGameplayTag);
                ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0, undefined, _);
              }, l);
            }
          } else {
            this.TLe(i, noAimGameplayTag);
          }
          break;
        case IAction_1.EAdjustPlayerCamera.FirstPerson:
          this.TLe(i, noAimGameplayTag);
          ControllerHolder_1.ControllerHolder.CameraController.SetHideHeadEnable(true, 0);
          if (i.Option.HidePlayer) {
            ModelManager_1.ModelManager.CameraModel.SetHidePlayer(true);
          }
          break;
        case IAction_1.EAdjustPlayerCamera.FixedLookAt:
          if (!this.X6m()) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Event", 74, "当前不能调整相机!");
            }
            this.FinishExecute(false);
          }
          return;
      }
      if (!o) {
        this.N4l();
      }
    } else {
      this.FinishExecute(false);
    }
  }
  ILe(e) {
    var t;
    var r = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraConfigController;
    if (r) {
      t = e.Option.Type;
      if (r = r.GetCameraConfigByTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t))) {
        (this.yLe = r).Priority = e.Option.Priority;
        r.FadeInTime = e.Option.FadeInTime;
        r.FadeOutTime = e.Option.FadeOutTime;
        if (e.Option.FadeInCurve) {
          r.FadeInCurve = ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(e.Option.FadeInCurve);
        } else {
          r.FadeInCurve = CurveUtils_1.CurveUtils.CreateCurve(0);
        }
        if (e.Option.FadeOutCurve) {
          r.FadeOutCurve = ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(e.Option.FadeOutCurve);
        } else {
          r.FadeOutCurve = CurveUtils_1.CurveUtils.CreateCurve(0);
        }
        if (e.Option.ArmLength && e.Option.ArmLength !== 0) {
          r.DefaultConfig.set(1, e.Option.ArmLength);
        } else {
          r.DefaultConfig.delete(1);
        }
        if (e.Option.MinumArmLength && e.Option.MinumArmLength !== 0) {
          r.DefaultConfig.set(2, e.Option.MinumArmLength);
        } else {
          r.DefaultConfig.delete(2);
        }
        if (e.Option.MaxiumArmLength && e.Option.MaxiumArmLength !== 0) {
          r.DefaultConfig.set(3, e.Option.MaxiumArmLength);
        } else {
          r.DefaultConfig.delete(3);
        }
        if (e.Option.Offset.X && e.Option.Offset.X !== 0) {
          r.DefaultConfig.set(6, e.Option.Offset.X);
        } else {
          r.DefaultConfig.delete(6);
        }
        if (e.Option.Offset.Y && e.Option.Offset.Y !== 0) {
          r.DefaultConfig.set(7, e.Option.Offset.Y);
        } else {
          r.DefaultConfig.delete(7);
        }
        if (e.Option.Offset.Z && e.Option.Offset.Z !== 0) {
          r.DefaultConfig.set(8, e.Option.Offset.Z);
        } else {
          r.DefaultConfig.delete(8);
        }
        if (e.Option.Fov && e.Option.Fov !== 0) {
          r.DefaultConfig.set(5, e.Option.Fov);
        } else {
          r.DefaultConfig.delete(5);
        }
        if (e.Option.IsDisableResetFocus === undefined) {
          r.DefaultConfig.delete(56);
        } else {
          r.DefaultConfig.set(56, e.Option.IsDisableResetFocus ? 1 : 0);
        }
        if (e.Option.Type === IAction_1.EAdjustPlayerCamera.Basic || e.Option.Type === IAction_1.EAdjustPlayerCamera.FirstPerson) {
          if (e.Option.YawLimitMax !== undefined) {
            r.DefaultConfig.set(34, e.Option.YawLimitMax);
          } else {
            r.DefaultConfig.delete(34);
          }
          if (e.Option.YawLimitMin !== undefined) {
            r.DefaultConfig.set(33, e.Option.YawLimitMin);
          } else {
            r.DefaultConfig.delete(33);
          }
          if (e.Option.PitchLimitMax !== undefined) {
            r.DefaultConfig.set(46, e.Option.PitchLimitMax);
          } else {
            r.DefaultConfig.delete(46);
          }
          if (e.Option.PitchLimitMin !== undefined) {
            r.DefaultConfig.set(45, e.Option.PitchLimitMin);
          } else {
            r.DefaultConfig.delete(45);
          }
        } else if (e.Option.Type === IAction_1.EAdjustPlayerCamera.Horizontal) {
          if (e.Option.OffsetInMovementDirection?.MinInterpolationSpeed !== undefined) {
            r.DefaultConfig.set(70, 4);
          } else {
            r.DefaultConfig.delete(70);
          }
          if (e.Option.OffsetInMovementDirection?.MinInterpolationSpeed !== undefined) {
            r.DefaultConfig.set(47, e.Option.OffsetInMovementDirection.MinInterpolationSpeed);
          } else {
            r.DefaultConfig.delete(47);
          }
          if (e.Option.OffsetInMovementDirection?.MaxInterpolationSpeed !== undefined) {
            r.DefaultConfig.set(48, e.Option.OffsetInMovementDirection.MaxInterpolationSpeed);
          } else {
            r.DefaultConfig.delete(48);
          }
          if (e.Option.OffsetInMovementDirection?.OffsetDistance1 !== undefined) {
            r.DefaultConfig.set(49, e.Option.OffsetInMovementDirection.OffsetDistance1);
          } else {
            r.DefaultConfig.delete(49);
          }
          if (e.Option.OffsetInMovementDirection?.OffsetDistance2 !== undefined) {
            r.DefaultConfig.set(50, e.Option.OffsetInMovementDirection.OffsetDistance2);
          } else {
            r.DefaultConfig.delete(50);
          }
          if (e.Option.OffsetInMovementDirection?.StartupWaitTime !== undefined) {
            r.DefaultConfig.set(111, e.Option.OffsetInMovementDirection.StartupWaitTime * MathUtils_1.MathUtils.MillisecondToSecond);
          } else {
            r.DefaultConfig.delete(111);
          }
          if (e.Option.OffsetInMovementDirection?.CenteringWaitTime !== undefined) {
            r.DefaultConfig.set(112, e.Option.OffsetInMovementDirection.CenteringWaitTime * MathUtils_1.MathUtils.MillisecondToSecond);
          } else {
            r.DefaultConfig.delete(112);
          }
        }
        return true;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 38, "没有找到对应Tag的镜头配置", ["tag", t]);
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 38, "CameraConfigController不存在");
      }
      return false;
    }
  }
  TLe(e, t = undefined) {
    this.Ytf(e);
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent?.CameraConfigController.EnableHookConfig(e.Option.Type, t);
    if (Global_1.Global.BaseCharacter) {
      ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId)?.Entity?.GetComponent(67)?.InterruptAutoMoving("进入相机调整AdjustPlayerCamera", true);
    }
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, this.Type, this.BaseContext, {
      Name: "RestorePlayerCameraAdjustment"
    }, true);
  }
  Zsg(e, t, r, o, i, l, s, a = false, n = false, _ = 0, v = false, d, h = false) {
    if (ControllerHolder_1.ControllerHolder.PanoramicController.CheckCanEnterCameraGuide()) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraGuide(e, t, r, o, i, l, s, a, n, _, v, d, h);
      if (this.Jsg) {
        TickSystem_1.TickSystem.Remove(this.Jsg.Id);
        this.Jsg = undefined;
      }
      this.Jsg = TickSystem_1.TickSystem.Add(e => {
        var t = ControllerHolder_1.ControllerHolder.CameraController.FightCamera?.LogicComponent;
        if (t && t.CameraCollision?.GetIsMiddleCollision() && (t.ExitCameraGuideAtOnce(), d?.(), this.Jsg && (TickSystem_1.TickSystem.Remove(this.Jsg.Id), this.Jsg = undefined), Log_1.Log.CheckWarn())) {
          Log_1.Log.Warn("Panoramic", 74, "[环视]检测到相机碰撞, 退出CameraGuide");
        }
      }, "LevelEventAdjustPlayerCamera_TryEnterCameraGuide");
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Event", 74, "[环视]TryEnterCameraGuide 当前无法进入CameraGuide, 直接跳过");
      }
      d?.();
    }
  }
  X6m() {
    var e = this.OPt?.Option;
    var t = e.TargetType;
    var r = t.EntityId;
    var o = t.MovingFlow;
    var t = t.MovingTimeParams;
    var r = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(r);
    if (!r) {
      return false;
    }
    var i = (0, IComponent_1.getComponent)(r.ComponentsData, "RangeComponent");
    if (!i) {
      return false;
    }
    var l;
    var s;
    var a = Vector_1.Vector.Create();
    let n = 0;
    return i?.Shape?.Type === "Cylinder" && (i = i?.Shape, !!(r = r.Transform?.Pos) && !(l = i.Height, n = i.Radius, a.FromConfigVector(r), a.Z += l / 2, a.IsNearlyZero()) && !(i = Vector_1.Vector.Create(), !(r = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.PlayerLocation)) && !((l = Vector_1.Vector.Create()).X = r.X, l.Y = r.Y, l.Z = a.Z, s = Vector_1.Vector.Create(), a.Subtraction(l, s), s.Normalize(), s.MultiplyEqual(-n), a.Addition(s, i), Log_1.Log.CheckInfo() && Log_1.Log.Info("Event", 45, "[环视]FixedLookAt", ["normalVector", s], ["cameraFinalVector", i], ["cameraLocation", r]), ControllerHolder_1.ControllerHolder.PanoramicController.EnterPanoramic(true, e.PlayerMoveTag), ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ExitSequenceDialogue(), this.Ytf(this.OPt), o ? (FlowController_1.FlowController.StartFlowForCallback(o.FlowListName, o.FlowId, o.StateId, this.W6m), this.Zsg(a, t?.FadeInTime ?? 1, 1, t?.FadeOutTime ?? 1, true, i, 75, false, true, 1, false, () => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 45, "[环视]ApplyCameraGuide 等待StartFlowForCallback");
      }
    }, true)) : this.Zsg(a, t?.FadeInTime ?? 1, (t?.AfterFadeInStayTime ?? 0.02) < 0.02 ? 0.02 : t?.AfterFadeInStayTime ?? 0.02, t?.FadeOutTime ?? 1, true, i, 75, false, true, 1, false, this.W6m, true), 0));
  }
  OnReset() {
    this.OPt = undefined;
    if (this.H6m && this.H6m.Valid()) {
      this.H6m.Remove();
    }
    this.H6m = undefined;
    if (this.$6m && this.$6m.Valid()) {
      this.$6m.Remove();
    }
    this.$6m = undefined;
    if (this.Jsg) {
      TickSystem_1.TickSystem.Remove(this.Jsg.Id);
      this.Jsg = undefined;
    }
  }
  K6m() {
    return !this.OPt?.Option?.Type || this.OPt.Option.Type !== IAction_1.EAdjustPlayerCamera.FixedLookAt;
  }
  Ytf(e) {
    var t = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent;
    if (t) {
      if (e = e?.Option.GravityDirection) {
        (e = Vector_1.Vector.Create(GravityUtils_1.GravityUtils.GetGravityDirectionByConfigAndActor(e, undefined))).Normalize();
        t.SetCameraGravityMode(1, e);
      } else {
        t.SetCameraGravityMode(2);
      }
    }
  }
  Xtf() {
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent?.SetCameraGravityMode(2);
  }
}
exports.LevelEventAdjustPlayerCamera = LevelEventAdjustPlayerCamera;
//# sourceMappingURL=LevelEventAdjustPlayerCamera.js.map