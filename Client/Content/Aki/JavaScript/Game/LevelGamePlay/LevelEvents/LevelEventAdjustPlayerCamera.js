"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventAdjustPlayerCamera = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CurveUtils_1 = require("../../../Core/Utils/Curve/CurveUtils");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const Global_1 = require("../../Global");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RenderUtil_1 = require("../../Render/Utils/RenderUtil");
const ConfigCurveUtils_1 = require("../../Utils/ConfigCurveUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const IMMEDIATELY_FADE_CAMERA_TIME = 0.1;
const noAimGameplayTag = -1036349300;
class LevelEventAdjustPlayerCamera extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.yLe = undefined;
    this.N4l = () => {
      this.FinishExecute(true);
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AdjustCameraSync, this.N4l)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AdjustCameraSync, this.N4l);
      }
    };
  }
  ExecuteNew(e, t) {
    const o = e;
    if (o) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Event", 38, "进入相机调整");
      }
      if (this.ILe(o)) {
        let r = false;
        switch (o.Option.Type) {
          case IAction_1.EAdjustPlayerCamera.Horizontal:
            this.TLe(o, noAimGameplayTag);
            ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraSpline(o.Option.SplineEntityId, o.Option.YawAngle, o.Option.PitchAngle, o.Option.FadeInTime);
            if (o.Option.DepthOfField !== undefined) {
              ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyDepthOfField(o.Option.DepthOfField.Fstop, o.Option.DepthOfField.Distance, o.Option.DepthOfField.BlurAmount, o.Option.DepthOfField.BlurRadius);
            } else {
              ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ExitDepthOfField();
            }
            ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.SetPlayCameraSequenceEnabled(false);
            RenderUtil_1.RenderUtil.CloseVelocityScreenSizeCull();
            break;
          case IAction_1.EAdjustPlayerCamera.Dialog:
            this.TLe(o, noAimGameplayTag);
            let e = o.Option.PitchAngle;
            if (e !== undefined) {
              e = -e;
            }
            let t = o.Option.YawAngle;
            if (t !== undefined) {
              t += 180;
            }
            var i = this.yLe.DefaultConfig.get(1);
            ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.AdjustDialogueCamera(o.Option.CenterPos, e, t, i);
            break;
          case IAction_1.EAdjustPlayerCamera.Fixed:
            this.TLe(o, noAimGameplayTag);
            var i = Vector_1.Vector.Create();
            var l = Rotator_1.Rotator.Create();
            i.Set(o.Option.CenterPos.X ?? 0, o.Option.CenterPos.Y ?? 0, o.Option.CenterPos.Z ?? 0);
            l.Set(o.Option.CenterRot.Y ?? 0, o.Option.CenterRot.Z ?? 0, o.Option.CenterRot.X ?? 0);
            ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.EnterFixSceneSubCamera(i, l, o.Option.Fov, o.Option.FadeInTime, o.Option.FadeOutTime, 1, undefined, o.Option.BlendIn?.Type, o.Option.BlendIn?.BlendExp, o.Option.BlendOut?.Type, o.Option.BlendOut?.BlendExp);
            break;
          case IAction_1.EAdjustPlayerCamera.Basic:
            if (o.Option.IsSynchronous) {
              r = true;
              EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AdjustCameraSync, this.N4l);
            }
            this.TLe(o);
            if (o.Option.SightUi) {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetCameraAimVisible, true, 0, o.Option.SightUi);
            }
            break;
          case IAction_1.EAdjustPlayerCamera.AxisLock:
            i = o.Option.AxisRotate.Y ?? 0;
            l = o.Option.AxisRotate.Z ?? 0;
            this.yLe.DefaultConfig.set(45, i);
            this.yLe.DefaultConfig.set(46, i);
            this.yLe.DefaultConfig.set(60, l);
            this.yLe.DefaultConfig.set(61, l);
            if (o.Option.ScreenConfig) {
              if (Math.abs(ControllerHolder_1.ControllerHolder.CameraController.CameraRotator.Pitch - i) <= o.Option.ScreenConfig.TriggerAngle && Math.abs(ControllerHolder_1.ControllerHolder.CameraController.CameraRotator.Yaw - l) <= o.Option.ScreenConfig.TriggerAngle) {
                this.TLe(o, noAimGameplayTag);
              } else {
                i = o.Option.ScreenConfig.FadeInTime;
                const a = o.Option.ScreenConfig.FadeOutTime;
                ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, () => {
                  this.yLe.FadeInTime = IMMEDIATELY_FADE_CAMERA_TIME;
                  this.TLe(o, noAimGameplayTag);
                  ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0, undefined, a);
                }, i);
              }
            } else {
              this.TLe(o, noAimGameplayTag);
            }
            break;
          case IAction_1.EAdjustPlayerCamera.FirstPerson:
            this.TLe(o, noAimGameplayTag);
            ControllerHolder_1.ControllerHolder.CameraController.SetHideHeadEnable(true, 0);
        }
        if (!r) {
          this.N4l();
        }
      } else {
        this.FinishExecute(false);
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
    ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent?.CameraConfigController.EnableHookConfig(e.Option.Type, t);
    if (Global_1.Global.BaseCharacter) {
      ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId)?.Entity?.GetComponent(62)?.InterruptAutoMoving("进入相机调整AdjustPlayerCamera", true);
    }
  }
  OnUpdateGuarantee() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AddGuaranteeAction, this.Type, this.BaseContext, {
      Name: "RestorePlayerCameraAdjustment"
    }, true);
  }
}
exports.LevelEventAdjustPlayerCamera = LevelEventAdjustPlayerCamera;
//# sourceMappingURL=LevelEventAdjustPlayerCamera.js.map