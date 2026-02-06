"use strict";

var MotorcycleAudioComponent_1;
var __decorate = this && this.__decorate || function (t, i, o, e) {
  var s;
  var r = arguments.length;
  var _ = r < 3 ? i : e === null ? e = Object.getOwnPropertyDescriptor(i, o) : e;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    _ = Reflect.decorate(t, i, o, e);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        _ = (r < 3 ? s(_) : r > 3 ? s(i, o, _) : s(i, o)) || _;
      }
    }
  }
  if (r > 3 && _) {
    Object.defineProperty(i, o, _);
  }
  return _;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleAudioComponent = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Time_1 = require("../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../Module/Abilities/FormationAttributeController");
const AudioUtils_1 = require("../../../Utils/AudioUtils");
const VehicleAudioComponent_1 = require("../Common/VehicleAudioComponent");
const MATERIAL_ID_WAT = 6;
const MATERIAL_ID_SHR = 14;
const SPEED_TOLERANCE = 20;
const ACC_CHANGE_TOLERANCE = 10;
const STRENGTH_TOLERANCE = 5;
const MS_TO_SECOND = 0.001;
const IN_AIR_MAX_DURATION = 10;
const LEAVE_MOTOR_TIME = 200;
const HANG_CHANGE_SPEED_TOLERANCE = 25;
const HANG_AUDIO_INTERVAL_TIME = 100;
let MotorcycleAudioComponent = MotorcycleAudioComponent_1 = class MotorcycleAudioComponent extends VehicleAudioComponent_1.VehicleAudioComponent {
  constructor() {
    super(...arguments);
    this.cz = Vector_1.Vector.Create();
    this.Otg = Vector_1.Vector.Create();
    this.rsg = 0;
    this.Qhg = Vector_1.Vector.Create();
    this.nsg = 0;
    this.Khg = Vector_1.Vector.Create();
    this.Gce = undefined;
    this.Lie = undefined;
    this.Ckg = undefined;
    this.Gtg = new Map();
    this.V9g = undefined;
    this.vkg = "DirtSurface";
    this.d9g = new Map();
    this.Ftg = false;
    this.OnVehicleBeenEntered = t => {
      if (t.IsNpcPassenger() && ModelManager_1.ModelManager.GameAudioModel?.CheckMotorState()) {
        ModelManager_1.ModelManager.GameAudioModel.PlayMotorPlotAudio(IAction_1.EGondolaVoiceTriggeredType.InviteRole);
      }
      if (t.IsRolePassenger(true)) {
        this.Ftg = true;
        this.Ntg("play_sfx_motor_engine");
        this.Vtg();
        this.CYf = FormationAttributeController_1.FormationAttributeController.GetValue(14);
        this.pYf = FormationAttributeController_1.FormationAttributeController.GetMax(14);
        this.vYf(this.CYf, this.pYf);
      }
    };
    this.OnVehicleBeenLeaved = t => {
      if (t.IsRolePassenger(true)) {
        this.Ftg = false;
        this.Vtg(true);
        this.Htg();
      }
    };
    this.jtg = false;
    this.CYf = 0;
    this.pYf = 0;
    this.Pni = (t, i, o) => {
      if (!(Math.abs(i - this.CYf) < STRENGTH_TOLERANCE) || i === 0) {
        if (i < STRENGTH_TOLERANCE) {
          this.CYf = 0;
        } else {
          this.CYf = i;
        }
        this.vYf(this.CYf, this.pYf);
      }
    };
    this.bni = (t, i, o) => {
      this.pYf = i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[MotorAudio] OnStrengthMaxChanged", ["MaxStrength", i]);
      }
    };
    this.$tg = 0;
    this.Wtg = 0;
    this.Qtg = (t, i) => {
      if (!!this.ActorComp && !(Math.abs(this.$tg - this.yYf) < SPEED_TOLERANCE)) {
        this.$tg = this.yYf;
        this.cz.DeepCopy(i.Normal);
        this.Wtg = Math.abs(this.Otg.DotProduct(this.cz));
        AudioSystem_1.AudioSystem.SetRtpcValue("motor_crash_strength", this.Wtg, {
          Actor: this.ActorComp.Owner
        });
        AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_crash", this.ActorComp.Owner);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[MotorAudio] MotorOnHit", ["LastMotorOnHitStrength", this.Wtg], ["LastMotorSpeed", this.$tg]);
        }
      }
    };
    this.Ktg = (t, i) => {
      if (i) {
        this.Ntg("play_sfx_motor_drift");
      } else {
        this.Ntg("play_sfx_motor_drift", true);
      }
    };
    this.Svg = (t, i) => {
      this.Mvg(i);
    };
    this.Xtg = 0;
    this.hzf = 5;
    this.lzf = (t, i) => {
      if (this.ActorComp) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[MotorAudio] MotorSubStateModeChange", ["newValue", t]);
        }
        switch (t) {
          case 3:
            this.Xtg = 0;
            AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_takeoff", this.ActorComp.Owner);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Audio", 42, "[MotorAudio] 滞空音效", ["newValue", t]);
            }
            break;
          case 4:
            this.Ntg("play_sfx_motor_burnout");
        }
        switch (i) {
          case 3:
            this.Xtg = 0;
            AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_touchdown", this.ActorComp.Owner);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Audio", 42, "[MotorAudio] 滞空后落地音效", ["newValue", t]);
            }
            break;
          case 4:
            this.Ntg("play_sfx_motor_burnout", true);
        }
        this.hzf = t;
      }
    };
    this.yYf = 0;
    this.Ytg = 0;
    this.oBg = false;
    this.nBg = false;
    this.asg = 0;
  }
  get pkg() {
    this.V9g ||= new UE.HitResult();
    return this.V9g;
  }
  set pkg(t) {
    this.V9g = t;
  }
  OnStart() {
    this.Gce = this.Entity.GetComponent(265);
    this.Lie = this.Entity.GetComponent(217);
    this.Ckg = this.Entity.GetComponent(266);
    this.rsg = this.Gce?.VehicleMovement?.MotorFrontWheelHang.GPerCm ?? 0.07;
    this.nsg = this.Gce?.VehicleMovement?.MotorBackWheelHang.GPerCm ?? 0.07;
    return true;
  }
  OnTick(t) {
    var i;
    if (this.Gce && this.Ftg) {
      i = this.ActorComp.ActorVelocityProxy.DotProduct(this.ActorComp.ActorForwardProxy) < 0 ? -1 : 1;
      i = this.Gce.Speed * i;
      this.hsg(t);
      this.ykg();
      this.IYf(t, i);
      this.T8f(t, i);
      this.ztg(t);
    }
  }
  OnEnd() {
    return true;
  }
  Vtg(t = false) {
    if (t || this.jtg) {
      if (t && this.jtg) {
        this.jtg = false;
        this.Lie?.RemoveTagAddOrRemoveListener(312204375, this.Ktg);
        this.Lie?.RemoveTagAddOrRemoveListener(-595765206, this.Svg);
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.MotorOnHit, this.Qtg);
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.MotorSubStateModeChange, this.lzf);
        FormationAttributeController_1.FormationAttributeController.RemoveValueListener(14, this.Pni);
        FormationAttributeController_1.FormationAttributeController.RemoveValueListener(14, this.bni);
      }
    } else {
      this.jtg = true;
      this.Lie?.AddTagAddOrRemoveListener(312204375, this.Ktg);
      this.Lie?.AddTagAddOrRemoveListener(-595765206, this.Svg);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.MotorOnHit, this.Qtg);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.MotorSubStateModeChange, this.lzf);
      FormationAttributeController_1.FormationAttributeController.AddValueListener(14, this.Pni);
      FormationAttributeController_1.FormationAttributeController.AddMaxListener(14, this.bni);
    }
  }
  Htg() {
    if (this.ActorComp) {
      AudioSystem_1.AudioSystem.SetRtpcValue("motor_speed", 0, {
        Actor: this.ActorComp.Owner,
        TransitionDuration: LEAVE_MOTOR_TIME
      });
      AudioSystem_1.AudioSystem.SetRtpcValue("motor_nos_energe", 0, {
        Actor: this.ActorComp.Owner,
        TransitionDuration: LEAVE_MOTOR_TIME
      });
      AudioSystem_1.AudioSystem.SetRtpcValue("motor_nos_energe_percent", 0, {
        Actor: this.ActorComp.Owner,
        TransitionDuration: LEAVE_MOTOR_TIME
      });
      AudioSystem_1.AudioSystem.SetRtpcValue("motor_engine_speed", 0, {
        Actor: this.ActorComp.Owner,
        TransitionDuration: LEAVE_MOTOR_TIME
      });
      AudioSystem_1.AudioSystem.SetRtpcValue("motor_crash_strength", 0, {
        Actor: this.ActorComp.Owner,
        TransitionDuration: LEAVE_MOTOR_TIME
      });
      AudioSystem_1.AudioSystem.SetRtpcValue("motor_air_land_time_seconds", 0, {
        Actor: this.ActorComp.Owner,
        TransitionDuration: LEAVE_MOTOR_TIME
      });
      this.Ntg("play_sfx_motor_nos", true);
      this.Ntg("play_sfx_motor_engine", true);
      this.Ntg("play_sfx_motor_wheel", true);
      this.Ntg("play_sfx_motor_burnout", true);
      this.Ntg("play_sfx_motor_drift", true);
    }
  }
  vYf(t, i) {
    if (!!this.ActorComp && !(i < t)) {
      AudioSystem_1.AudioSystem.SetRtpcValue("motor_nos_energe", t, {
        Actor: this.ActorComp.Owner
      });
      t = t / i;
      AudioSystem_1.AudioSystem.SetRtpcValue("motor_nos_energe_percent", t, {
        Actor: this.ActorComp.Owner
      });
    }
  }
  ztg(t) {
    var i;
    if (this.ActorComp && (i = MathUtils_1.MathUtils.Clamp(this.Xtg + t * (this.hzf === 3 ? 1 : -1) * MS_TO_SECOND, -IN_AIR_MAX_DURATION, IN_AIR_MAX_DURATION), this.Xtg !== i)) {
      this.Xtg = i;
      AudioSystem_1.AudioSystem.SetRtpcValue("motor_air_land_time_seconds", this.Xtg, {
        Actor: this.ActorComp.Owner,
        TransitionDuration: t
      });
    }
  }
  T8f(t, i) {
    if (!!this.ActorComp?.Owner && (i !== 0 || this.yYf !== 0) && (!(Math.abs(this.yYf - i) < SPEED_TOLERANCE) || this.yYf === 0)) {
      this.yYf = i;
      this.Otg.DeepCopy(this.ActorComp.ActorVelocityProxy);
      AudioSystem_1.AudioSystem.SetRtpcValue("motor_speed", i, {
        Actor: this.ActorComp.Owner,
        TransitionDuration: t
      });
      if (Math.abs(i) < SPEED_TOLERANCE || this.hzf === 3) {
        this.Ntg("play_sfx_motor_wheel", true);
      } else {
        this.Ntg("play_sfx_motor_wheel");
      }
    }
  }
  IYf(t, i) {
    var o;
    var e;
    var s;
    var r = this.Gce?.VehicleMovement;
    if (this.ActorComp?.Owner && r) {
      o = r.GetCurrentMotorPower();
      e = r.MotorAccelConfig.PowerAccel.ToMax;
      r = r.MotorAccelConfig.PowerAccel.ToMax;
      s = this.hzf === 3 ? 1.6 : 1;
      i = MathUtils_1.MathUtils.Clamp(Math.abs(i) / r, 0, 1);
      if (((r = MathUtils_1.MathUtils.Clamp(i * -2500 * (i - 2) + o / e * 3000 * s, 0, 6000)) !== 0 || this.Ytg !== 0) && (!(Math.abs(this.Ytg - r) < ACC_CHANGE_TOLERANCE) || this.Ytg === 0)) {
        this.Ytg = r;
        AudioSystem_1.AudioSystem.SetRtpcValue("motor_engine_speed", r, {
          Actor: this.ActorComp.Owner,
          TransitionDuration: t
        });
      }
    }
  }
  Mvg(t) {
    if (this.ActorComp?.Owner) {
      if (t) {
        AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_nos_start", this.ActorComp.Owner);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[MotorAudio] 氮气加速开始");
        }
        this.Ntg("play_sfx_motor_nos");
      } else {
        this.Ntg("play_sfx_motor_nos", true);
        if (this.Gce.BackBraking) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 42, "[MotorAudio] 氮气加速刹停");
          }
        } else {
          AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_nos_end", this.ActorComp.Owner);
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 42, "[MotorAudio] 氮气加速停止");
          }
        }
      }
    }
  }
  MotorNitroAccelerationFailure(t, i, o) {
    if (this.ActorComp?.Owner) {
      if (t && (this.nBg !== i || !this.oBg && o) && (AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_nos_failed", this.ActorComp.Owner), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Audio", 42, "[MotorAudio] 氮气加速失败");
      }
      this.oBg = o;
      this.nBg = i;
    }
  }
  hsg(t) {
    var i;
    if (this.ActorComp && this.Gce?.VehicleMovement && (this.cz.FromUeVector(this.Gce.VehicleMovement.GetCurrentMotorFrontPulling()), i = this.Qhg.SubtractionEqual(this.cz).Size() * this.rsg / (t * MS_TO_SECOND), this.Qhg.DeepCopy(this.cz), this.cz.FromUeVector(this.Gce.VehicleMovement.GetCurrentMotorRearPulling()), t = this.Khg.SubtractionEqual(this.cz).Size() * this.nsg / (t * MS_TO_SECOND), this.Khg.DeepCopy(this.cz), i > HANG_CHANGE_SPEED_TOLERANCE || t > HANG_CHANGE_SPEED_TOLERANCE) && Time_1.Time.Now - this.asg > HANG_AUDIO_INTERVAL_TIME) {
      this.asg = Time_1.Time.Now;
      AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_suspension", this.ActorComp.Owner);
    }
  }
  Ntg(t, i = false) {
    var o;
    if (this.ActorComp) {
      o = this.Gtg.has(t);
      if (i || o) {
        if (i && o && (i = this.Gtg.get(t), AudioSystem_1.AudioSystem.ExecuteAction(i, 0), this.Gtg.delete(t), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Audio", 42, "[MotorAudio] 停止音效", ["类型", this.Jtg(t)]);
        }
      } else {
        o = this.d9g.get(t) ?? t;
        i = AudioSystem_1.AudioSystem.PostEvent(o, this.ActorComp.Owner);
        this.Gtg.set(t, i);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[MotorAudio] 播放音效", ["类型", this.Jtg(t)]);
        }
      }
    }
  }
  Jtg(t) {
    switch (t) {
      case "play_sfx_motor_wheel":
        return "轮胎音效";
      case "play_sfx_motor_burnout":
        return "烧胎音效";
      case "play_sfx_motor_drift":
        return "漂移音效";
      case "play_sfx_motor_engine":
        return "引擎音效";
      case "play_sfx_motor_nos":
        return "氮气音效";
    }
    return "未知音效";
  }
  ykg() {
    var t;
    if (this.ActorComp?.Owner) {
      MotorcycleAudioComponent_1.Skg.Start();
      t = this.Mkg();
      if (this.vkg !== t) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[MotorAudio] UpdateMotorWheelTexture", ["last", this.vkg], ["now", t]);
        }
        this.vkg = t;
        AudioSystem_1.AudioSystem.SetSwitch("motor_wheel_texture", t, this.ActorComp.Owner);
      }
      MotorcycleAudioComponent_1.Skg.Stop();
    }
  }
  Mkg() {
    var t = this.ActorComp?.Actor;
    if (!this.Gce?.VehicleMovement || !t) {
      return "DirtSurface";
    }
    if (this.hzf === 3) {
      return this.vkg;
    }
    if (this.Ckg?.InSwimArea) {
      return this.uQ_();
    }
    if (!this.Ekg()) {
      return this.vkg;
    }
    this.cz.DeepCopy(this.pkg.Location);
    var t = AudioUtils_1.AudioUtils.QueryFoliageAudioPhysicalMaterial(this.cz.ToUeVector(), this.Entity);
    if (t.IsHitFoliage && t.PhysicalMaterial) {
      return this.Ikg(t.PhysicalMaterial);
    } else {
      t = this.pkg.PhysMaterial;
      return this.Ikg(t);
    }
  }
  Ekg() {
    var t = t => {
      var i = (0, puerts_1.$ref)(this.pkg);
      if (t) {
        this.Gce?.VehicleMovement?.GetFrontMotorHitResult(i);
      } else {
        this.Gce?.VehicleMovement?.GetBackMotorHitResult(i);
      }
      this.pkg = (0, puerts_1.$unref)(i);
    };
    var i = this.ActorComp.ActorVelocityProxy.DotProduct(this.ActorComp.ActorForwardProxy) > 0;
    t(i);
    if (!this.pkg.bBlockingHit) {
      t(!i);
    }
    return this.pkg.bBlockingHit;
  }
  Ikg(t) {
    if (t?.IsValid()) {
      if (t.SurfaceType === MATERIAL_ID_WAT || t.SurfaceType === MATERIAL_ID_SHR) {
        return "DirtSurface";
      }
      t = UE.KuroAudioMaterialSettings.GetFootstepTextureName(t.SurfaceType).toString();
      if (t.length > 0) {
        return t;
      }
    }
    return "DirtSurface";
  }
  uQ_() {
    if (this.ActorComp) {
      var t = this.ActorComp.Owner?.GetComponentByClass(UE.KuroEnviInteractionComponent.StaticClass());
      if (t && this.ActorComp.Owner) {
        var i = UE.KuroInteractionEffectSystem.GetKuroInteractionEffectSystem(this.ActorComp.Owner.GetWorld());
        if (i) {
          if (i.EnviInteractionCollections.Get(t)?.WaterType === 1) {
            return "VoicelessSurface";
          }
        }
      }
    }
    return "WaterSurface";
  }
  SetAudioEventOverride(t, i) {
    if (i) {
      this.d9g.set(t, i);
    } else {
      this.d9g.delete(t);
    }
    var i = this.Gtg.get(t);
    if (i && this.ActorComp) {
      AudioSystem_1.AudioSystem.ExecuteAction(i, 0);
      this.Gtg.delete(t);
      i = this.d9g.get(t) ?? t;
      i = AudioSystem_1.AudioSystem.PostEvent(i, this.ActorComp.Owner);
      this.Gtg.set(t, i);
    }
  }
  ClearAudioEventOverrides() {
    this.d9g.clear();
  }
};
MotorcycleAudioComponent.Skg = Stats_1.Stat.Create("MotorcycleAudioComponent.DetectFloorHandle");
MotorcycleAudioComponent = MotorcycleAudioComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(299)], MotorcycleAudioComponent);
exports.MotorcycleAudioComponent = MotorcycleAudioComponent; //# sourceMappingURL=MotorcycleAudioComponent.js.map