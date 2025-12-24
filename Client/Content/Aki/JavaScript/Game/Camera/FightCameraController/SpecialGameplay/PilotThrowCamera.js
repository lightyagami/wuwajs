"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PilotThrowCamera = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TsBaseCharacter_1 = require("../../../Character/TsBaseCharacter");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AUDIO_EVENT_Y = "play_npc_zhipaojubi_elevation_y";
const AUDIO_EVENT_X = "play_npc_zhipaojubi_rotate_x";
const AUDIO_EVENT_LIMIE = "play_npc_zhipaojubi_limit";
const LERP_DURATION = 0.15;
const FEEDBACK_NAME = "TieyuThrow";
class PilotThrowCamera {
  constructor() {
    this.Ic = undefined;
    this.Tae = undefined;
    this.Nce = undefined;
    this.LWm = undefined;
    this.c$o = undefined;
    this.yLe = undefined;
    this.Lz = Vector_1.Vector.Create();
    this.Gue = Rotator_1.Rotator.Create();
    this.EPn = Rotator_1.Rotator.Create();
    this.Adc = Rotator_1.Rotator.Create();
    this.PWm = LERP_DURATION;
    this.mUo = 0;
    this.dUo = 0;
    this.eJm = 0;
    this.wZd = undefined;
    this.qxf = -1;
    this.Oxf = -1;
    this.Gxf = false;
    this.a9f = false;
    this.AWm = 0;
    this.DWm = 0.5;
    this.UWm = false;
  }
  OnInit(t) {
    this.Ic = t;
    this.Eme();
    ControllerHolder_1.ControllerHolder.GamepadController.TryAddFeedbackReason("PilotThrow", FEEDBACK_NAME);
  }
  Update(t) {
    var i;
    var s;
    if (this.UWm) {
      if (this.Nce?.Valid) {
        [this.mUo, this.dUo] = this.Nce.GetCameraInput();
        if (this.mUo !== 0 && this.qxf === -1) {
          this.qxf = AudioSystem_1.AudioSystem.PostEvent(AUDIO_EVENT_Y);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Camera", 31, "[PilotThrowCamera] PostEvent AUDIO_EVENT_Y");
          }
        } else if (this.mUo === 0 && this.qxf !== -1) {
          AudioSystem_1.AudioSystem.ExecuteAction(this.qxf, 0);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Camera", 31, "[PilotThrowCamera] Stop AUDIO_EVENT_Y");
          }
          this.qxf = -1;
        }
        if (this.dUo !== 0 && this.Oxf === -1) {
          this.Oxf = AudioSystem_1.AudioSystem.PostEvent(AUDIO_EVENT_X);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Camera", 31, "[PilotThrowCamera] PostEvent AUDIO_EVENT_X");
          }
        } else if (this.dUo === 0 && this.Oxf !== -1) {
          AudioSystem_1.AudioSystem.ExecuteAction(this.Oxf, 0);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Camera", 31, "[PilotThrowCamera] Stop AUDIO_EVENT_X");
          }
          this.Oxf = -1;
        }
        if (this.Nlh()) {
          this.mUo *= ModelManager_1.ModelManager.PilotThrowModel.Setting.手柄移动系数.X;
          this.dUo *= ModelManager_1.ModelManager.PilotThrowModel.Setting.手柄移动系数.Y;
        } else if (this.eut()) {
          this.mUo *= ModelManager_1.ModelManager.PilotThrowModel.Setting.触屏移动系数.X;
          this.dUo *= ModelManager_1.ModelManager.PilotThrowModel.Setting.触屏移动系数.Y;
        } else if (Info_1.Info.IsInKeyBoard()) {
          this.mUo *= ModelManager_1.ModelManager.CharacterModel.SelfCenteredTimeDilation;
          this.dUo *= ModelManager_1.ModelManager.CharacterModel.SelfCenteredTimeDilation;
          this.mUo /= 60;
          this.dUo /= 60;
          this.mUo *= ModelManager_1.ModelManager.PilotThrowModel.Setting.PC移动系数.X;
          this.dUo *= ModelManager_1.ModelManager.PilotThrowModel.Setting.PC移动系数.Y;
        }
        if (MathUtils_1.MathUtils.IsNearlyZero(this.mUo) && MathUtils_1.MathUtils.IsNearlyZero(this.dUo)) {
          if (MathUtils_1.MathUtils.IsNearlyZero(this.mUo) && MathUtils_1.MathUtils.IsNearlyZero(this.dUo) && this.PWm >= LERP_DURATION) {
            if (this.EPn.Yaw > this.Adc.Yaw + this.yLe.MaxYawAngleDelta) {
              this.EPn.Yaw = this.Adc.Yaw + this.yLe.MaxYawAngleDelta;
              this.PWm = 0;
            } else if (this.EPn.Yaw < this.Adc.Yaw - this.yLe.MaxYawAngleDelta) {
              this.EPn.Yaw = this.Adc.Yaw - this.yLe.MaxYawAngleDelta;
              this.PWm = 0;
            }
          }
        } else {
          this.PWm = 0;
          this.EPn.Yaw += this.mUo;
          this.EPn.Pitch -= this.dUo;
          this.EPn.Yaw = MathUtils_1.MathUtils.Clamp(this.EPn.Yaw, this.Adc.Yaw - (this.yLe.MaxYawAngleDelta + this.eJm), this.Adc.Yaw + (this.yLe.MaxYawAngleDelta + this.eJm));
          this.EPn.Pitch = MathUtils_1.MathUtils.Clamp(this.EPn.Pitch, this.yLe.MinPitchAngle, this.yLe.MaxPitchAngle);
        }
        if (this.Gue.Yaw > this.Adc.Yaw + this.yLe.MaxYawAngleDelta && !this.Gxf && (this.Gxf = true, AudioSystem_1.AudioSystem.PostEvent(AUDIO_EVENT_LIMIE), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Camera", 31, "[PilotThrowCamera] PostEvent AUDIO_EVENT_LIMIE");
        }
        if (this.Gue.Yaw < this.Adc.Yaw - this.yLe.MaxYawAngleDelta && !this.Gxf && (this.Gxf = true, AudioSystem_1.AudioSystem.PostEvent(AUDIO_EVENT_LIMIE), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Camera", 31, "[PilotThrowCamera] PostEvent AUDIO_EVENT_LIMIE");
        }
        if (this.PWm > LERP_DURATION) {
          if (this.a9f) {
            this.a9f = false;
            ControllerHolder_1.ControllerHolder.GamepadController.StopKuroForceFeedback(ModelManager_1.ModelManager.PilotThrowModel.Setting.手柄震动配置, FNameUtil_1.FNameUtil.GetDynamicFName("PilotThrowCamera"));
          }
        } else {
          this.PWm += t;
          if (!this.a9f && this.Nlh()) {
            this.a9f = true;
            ControllerHolder_1.ControllerHolder.GamepadController.PlayKuroForceFeedback(ModelManager_1.ModelManager.PilotThrowModel.Setting.手柄震动配置, FNameUtil_1.FNameUtil.GetDynamicFName("PilotThrowCamera"), true, false, false, "PilotThrowCamera");
          } else if (this.a9f && !this.Nlh()) {
            this.a9f = false;
            ControllerHolder_1.ControllerHolder.GamepadController.StopKuroForceFeedback(ModelManager_1.ModelManager.PilotThrowModel.Setting.手柄震动配置, FNameUtil_1.FNameUtil.GetDynamicFName("PilotThrowCamera"));
          }
          s = Rotator_1.Rotator.Create();
          Rotator_1.Rotator.Lerp(this.Gue, this.EPn, MathUtils_1.MathUtils.Clamp(this.PWm / LERP_DURATION, 0, 1), s);
          this.Gue.DeepCopy(s);
          this.LWm?.SetRotation(s.ToUeRotator());
          this.Ic.D_K2_SetActorLocationAndRotation(this.LWm.CameraLocation.ToUeVector(), this.LWm.CameraRotation.ToUeRotator(), false, undefined, true);
          if (this.Gue.Yaw <= this.Adc.Yaw + this.yLe.MaxYawAngleDelta && this.Gue.Yaw >= this.Adc.Yaw - this.yLe.MaxYawAngleDelta && this.Gxf && (this.Gxf = false, Log_1.Log.CheckDebug())) {
            Log_1.Log.Debug("Camera", 31, "[PilotThrowCamera] Reset PlayedAudioEventLimit");
          }
          if (this.wZd && this.wZd.Valid) {
            s = this.LWm.CameraRotation.ToUeRotator();
            i = ModelManager_1.ModelManager.PilotThrowModel.Setting.铁驭旋转偏移;
            s = new UE.Rotator(0, s.Yaw + i, 0);
            this.wZd.GetComponent(1)?.SetActorRotation(s);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 31, "[PilotThrowCamera] Update InputComp is undefined");
      }
    } else {
      this.xWm(t);
    }
  }
  OnDestroy() {
    this.Tae = undefined;
    this.Nce = undefined;
    this.LWm?.SetRotation(this.Gue.ToUeRotator());
    ControllerHolder_1.ControllerHolder.GamepadController.RemoveFeedbackReason("PilotThrow");
    ControllerHolder_1.ControllerHolder.GamepadController.StopKuroForceFeedback(ModelManager_1.ModelManager.PilotThrowModel.Setting.手柄震动配置, FNameUtil_1.FNameUtil.GetDynamicFName("PilotThrowCamera"));
  }
  Eme() {
    var t;
    var i = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
    if (i?.Valid) {
      this.Tae = i.Entity?.GetComponent(3)?.Actor;
      if (this.Tae instanceof TsBaseCharacter_1.default) {
        this.Nce = i.Entity?.GetComponent(65);
        if (!this.Nce) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 31, "[PilotThrowCamera] OnInitInternal InputComp is undefined");
          }
        }
        this.LWm = ControllerHolder_1.ControllerHolder.CameraController.FightCamera?.LogicComponent;
        if (this.LWm) {
          if (i = ModelManager_1.ModelManager.PilotThrowModel?.GetCurrentInteractHookPoint()) {
            if ((i = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(i)?.Entity)?.Valid) {
              this.c$o = i.GetComponent(1)?.Owner;
              if (this.c$o?.IsValid()) {
                this.yLe = i.GetComponent(88)?.GetHookInteractConfig();
                if (this.yLe) {
                  t = ModelManager_1.ModelManager.PilotThrowModel.GetCurrentTitanEntityId();
                  this.wZd = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t)?.Entity;
                  this.eJm = ModelManager_1.ModelManager.PilotThrowModel.Setting.边缘超出角度;
                  this.Gue.DeepCopy(this.LWm.CameraRotation);
                  this.Lz.DeepCopy(this.LWm.CameraLocation);
                  this.Ic?.D_K2_SetActorLocationAndRotation(this.Lz.ToUeVector(), this.Gue.ToUeRotator(), false, undefined, true);
                  this.Ic.CameraComponent?.SetFieldOfView(this.LWm.Fov);
                  if (ModelManager_1.ModelManager.PilotThrowModel.ForceLookDir) {
                    ModelManager_1.ModelManager.PilotThrowModel.ForceLookDir.Rotation(this.EPn);
                    ModelManager_1.ModelManager.PilotThrowModel.ForceLookDir = undefined;
                  } else {
                    t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(i.GetComponent(0).GetPbDataId()).Transform.Rot;
                    i = Rotator_1.Rotator.Create(t?.Y ?? 0, t?.Z ?? 0, t?.X ?? 0);
                    this.EPn.DeepCopy(i);
                  }
                  this.EPn.Pitch = this.yLe.DefaultPitchAngle;
                  this.DWm = ModelManager_1.ModelManager.PilotThrowModel.Setting.启动镜头插值;
                } else if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Camera", 31, "[PilotThrowCamera] OnInitInternal TitanHookConfig is undefined");
                }
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Camera", 31, "[PilotThrowCamera] OnInitInternal TitanActor is invalid");
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Camera", 31, "[PilotThrowCamera] OnInitInternal hookEntity is invalid");
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Camera", 31, "[PilotThrowCamera] OnInitInternal hookEntityId is undefined");
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Camera", 31, "[PilotThrowCamera] OnInitInternal FightCameraLogicComponent is undefined");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 31, "[PilotThrowCamera] OnInitInternal character is not TsBaseCharacter");
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Camera", 31, "[PilotThrowCamera] OnInitInternal curEntity is invalid");
    }
  }
  xWm(t) {
    if (this.Ic?.IsValid()) {
      if (this.AWm < this.DWm) {
        this.AWm += t;
        t = Math.min(this.AWm / this.DWm, 1);
        Rotator_1.Rotator.Lerp(this.Gue, this.EPn, t, this.Adc);
        this.LWm?.SetRotation(this.Adc.ToUeRotator());
        this.Ic.D_K2_SetActorLocationAndRotation(this.LWm.CameraLocation.ToUeVector(), this.LWm.CameraRotation.ToUeRotator(), false, undefined, true);
      } else {
        this.LWm?.SetRotation(this.EPn.ToUeRotator());
        this.Lz.DeepCopy(this.LWm.CameraLocation);
        this.Gue.DeepCopy(this.LWm.CameraRotation);
        this.Adc.DeepCopy(this.Gue);
        this.Ic.D_K2_SetActorLocationAndRotation(this.Lz.ToUeVector(), this.Gue.ToUeRotator(), false, undefined, true);
        this.UWm = true;
      }
    }
  }
  eut() {
    return Info_1.Info.IsInTouch() || Info_1.Info.IsInGamepad() && !!ModelManager_1.ModelManager.ControlScreenModel?.IsTouching;
  }
  Nlh() {
    return Info_1.Info.IsInGamepad() && !ModelManager_1.ModelManager.ControlScreenModel?.IsTouching;
  }
}
exports.PilotThrowCamera = PilotThrowCamera;
//# sourceMappingURL=PilotThrowCamera.js.map