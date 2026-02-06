"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelFlowAdjustPlayerCameraAction = undefined;
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
const LevelFlowActionBase_1 = require("./LevelFlowActionBase");
const IMMEDIATELY_FADE_CAMERA_TIME = 0.1;
const noAimGameplayTag = -1036349300;
class LevelFlowAdjustPlayerCameraAction extends LevelFlowActionBase_1.LevelFlowActionBase {
  constructor() {
    super(...arguments);
    this.yLe = undefined;
    this.pDe = undefined;
    this.N4l = () => {
      this.FinishExecute(true);
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.AdjustCameraSync, this.N4l)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.AdjustCameraSync, this.N4l);
      }
    };
  }
  Init(e) {
    this.pDe = e;
    return this;
  }
  OnExecute() {
    if (this.pDe) {
      const l = this.pDe;
      if (this.ILe(l)) {
        let o = false;
        switch (l.Option.Type) {
          case IAction_1.EAdjustPlayerCamera.Horizontal:
            this.TLe(l, noAimGameplayTag);
            ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyCameraSpline(l.Option.SplineEntityId, l.Option.YawAngle, l.Option.PitchAngle, l.Option.FadeInTime);
            if (l.Option.DepthOfField !== undefined) {
              ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ApplyDepthOfField(l.Option.DepthOfField.Fstop, l.Option.DepthOfField.Distance, l.Option.DepthOfField.BlurAmount, l.Option.DepthOfField.BlurRadius);
            } else {
              ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.ExitDepthOfField();
            }
            ControllerHolder_1.ControllerHolder.CameraController.SequenceCamera.PlayerComponent.SetPlayCameraSequenceEnabled(false);
            RenderUtil_1.RenderUtil.CloseVelocityScreenSizeCull();
            break;
          case IAction_1.EAdjustPlayerCamera.Dialog:
            this.TLe(l, noAimGameplayTag);
            let e = l.Option.PitchAngle;
            if (e !== undefined) {
              e = -e;
            }
            let t = l.Option.YawAngle;
            if (t !== undefined) {
              t += 180;
            }
            var r = this.yLe.DefaultConfig.get(1);
            ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.AdjustDialogueCamera(l.Option.CenterPos, e, t, r);
            break;
          case IAction_1.EAdjustPlayerCamera.Fixed:
            this.TLe(l, noAimGameplayTag);
            var r = Vector_1.Vector.Create();
            var i = Rotator_1.Rotator.Create();
            r.Set(l.Option.CenterPos.X ?? 0, l.Option.CenterPos.Y ?? 0, l.Option.CenterPos.Z ?? 0);
            i.Set(l.Option.CenterRot.Y ?? 0, l.Option.CenterRot.Z ?? 0, l.Option.CenterRot.X ?? 0);
            ControllerHolder_1.ControllerHolder.CameraController.SceneCamera.PlayerComponent.EnterFixSceneSubCamera(r, i, l.Option.Fov, l.Option.FadeInTime, l.Option.FadeOutTime, 1, undefined, l.Option.BlendIn?.Type, l.Option.BlendIn?.BlendExp, l.Option.BlendOut?.Type, l.Option.BlendOut?.BlendExp);
            break;
          case IAction_1.EAdjustPlayerCamera.Basic:
            if (l.Option.IsSynchronous) {
              o = true;
              EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.AdjustCameraSync, this.N4l);
            }
            this.TLe(l);
            if (l.Option.SightUi) {
              EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SetCameraAimVisible, true, 0, l.Option.SightUi);
            }
            break;
          case IAction_1.EAdjustPlayerCamera.AxisLock:
            r = l.Option.AxisRotate.Y ?? 0;
            i = l.Option.AxisRotate.Z ?? 0;
            this.yLe.DefaultConfig.set(45, r);
            this.yLe.DefaultConfig.set(46, r);
            this.yLe.DefaultConfig.set(60, i);
            this.yLe.DefaultConfig.set(61, i);
            if (l.Option.ScreenConfig) {
              if (Math.abs(ControllerHolder_1.ControllerHolder.CameraController.CameraRotator.Pitch - r) <= l.Option.ScreenConfig.TriggerAngle && Math.abs(ControllerHolder_1.ControllerHolder.CameraController.CameraRotator.Yaw - i) <= l.Option.ScreenConfig.TriggerAngle) {
                this.TLe(l, noAimGameplayTag);
              } else {
                r = l.Option.ScreenConfig.FadeInTime;
                const a = l.Option.ScreenConfig.FadeOutTime;
                ControllerHolder_1.ControllerHolder.LevelLoadingController.OpenLoading(0, 3, () => {
                  this.yLe.FadeInTime = IMMEDIATELY_FADE_CAMERA_TIME;
                  this.TLe(l, noAimGameplayTag);
                  ControllerHolder_1.ControllerHolder.LevelLoadingController.CloseLoading(0, undefined, a);
                }, r);
              }
            } else {
              this.TLe(l, noAimGameplayTag);
            }
            break;
          case IAction_1.EAdjustPlayerCamera.FirstPerson:
            this.TLe(l, noAimGameplayTag);
            ControllerHolder_1.ControllerHolder.CameraController.SetHideHeadEnable(true, 0);
        }
        if (!o) {
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
    var o = ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.CameraConfigController;
    if (o) {
      t = e.Option.Type;
      if (o = o.GetCameraConfigByTag(GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t))) {
        (this.yLe = o).Priority = e.Option.Priority;
        o.FadeInTime = e.Option.FadeInTime;
        o.FadeOutTime = e.Option.FadeOutTime;
        if (e.Option.FadeInCurve) {
          o.FadeInCurve = ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(e.Option.FadeInCurve);
        } else {
          o.FadeInCurve = CurveUtils_1.CurveUtils.CreateCurve(0);
        }
        if (e.Option.FadeOutCurve) {
          o.FadeOutCurve = ConfigCurveUtils_1.ConfigCurveUtils.CreateCurveByBaseCurve(e.Option.FadeOutCurve);
        } else {
          o.FadeOutCurve = CurveUtils_1.CurveUtils.CreateCurve(0);
        }
        if (e.Option.ArmLength && e.Option.ArmLength !== 0) {
          o.DefaultConfig.set(1, e.Option.ArmLength);
        } else {
          o.DefaultConfig.delete(1);
        }
        if (e.Option.MinumArmLength && e.Option.MinumArmLength !== 0) {
          o.DefaultConfig.set(2, e.Option.MinumArmLength);
        } else {
          o.DefaultConfig.delete(2);
        }
        if (e.Option.MaxiumArmLength && e.Option.MaxiumArmLength !== 0) {
          o.DefaultConfig.set(3, e.Option.MaxiumArmLength);
        } else {
          o.DefaultConfig.delete(3);
        }
        if (e.Option.Offset.X && e.Option.Offset.X !== 0) {
          o.DefaultConfig.set(6, e.Option.Offset.X);
        } else {
          o.DefaultConfig.delete(6);
        }
        if (e.Option.Offset.Y && e.Option.Offset.Y !== 0) {
          o.DefaultConfig.set(7, e.Option.Offset.Y);
        } else {
          o.DefaultConfig.delete(7);
        }
        if (e.Option.Offset.Z && e.Option.Offset.Z !== 0) {
          o.DefaultConfig.set(8, e.Option.Offset.Z);
        } else {
          o.DefaultConfig.delete(8);
        }
        if (e.Option.Fov && e.Option.Fov !== 0) {
          o.DefaultConfig.set(5, e.Option.Fov);
        } else {
          o.DefaultConfig.delete(5);
        }
        if (e.Option.IsDisableResetFocus === undefined) {
          o.DefaultConfig.delete(56);
        } else {
          o.DefaultConfig.set(56, e.Option.IsDisableResetFocus ? 1 : 0);
        }
        if (e.Option.Type === IAction_1.EAdjustPlayerCamera.Basic || e.Option.Type === IAction_1.EAdjustPlayerCamera.FirstPerson) {
          if (e.Option.YawLimitMax !== undefined) {
            o.DefaultConfig.set(34, e.Option.YawLimitMax);
          } else {
            o.DefaultConfig.delete(34);
          }
          if (e.Option.YawLimitMin !== undefined) {
            o.DefaultConfig.set(33, e.Option.YawLimitMin);
          } else {
            o.DefaultConfig.delete(33);
          }
          if (e.Option.PitchLimitMax !== undefined) {
            o.DefaultConfig.set(46, e.Option.PitchLimitMax);
          } else {
            o.DefaultConfig.delete(46);
          }
          if (e.Option.PitchLimitMin !== undefined) {
            o.DefaultConfig.set(45, e.Option.PitchLimitMin);
          } else {
            o.DefaultConfig.delete(45);
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
      ModelManager_1.ModelManager.CreatureModel.GetEntityById(Global_1.Global.BaseCharacter.EntityId)?.Entity?.GetComponent(67)?.InterruptAutoMoving("进入相机调整AdjustPlayerCamera", true);
    }
  }
}
exports.LevelFlowAdjustPlayerCameraAction = LevelFlowAdjustPlayerCameraAction;
//# sourceMappingURL=LevelFlowAdjustPlayerCameraAction.js.map