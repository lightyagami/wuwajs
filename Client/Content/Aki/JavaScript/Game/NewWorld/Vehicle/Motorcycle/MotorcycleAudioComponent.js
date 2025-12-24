"use strict";

var __decorate = this && this.__decorate || function (t, i, o, s) {
  var e;
  var _ = arguments.length;
  var r = _ < 3 ? i : s === null ? s = Object.getOwnPropertyDescriptor(i, o) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, i, o, s);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (e = t[h]) {
        r = (_ < 3 ? e(r) : _ > 3 ? e(i, o, r) : e(i, o)) || r;
      }
    }
  }
  if (_ > 3 && r) {
    Object.defineProperty(i, o, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleAudioComponent = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const FormationAttributeController_1 = require("../../../Module/Abilities/FormationAttributeController");
const VehicleAudioComponent_1 = require("../Common/VehicleAudioComponent");
const SPEED_TOLERANCE = 20;
const ACC_CHANGE_TOLERANCE = 10;
const STRENGTH_TOLERANCE = 5;
const MS_TO_SECOND = 0.001;
const IN_AIR_MAX_DURATION = 10;
const LEAVE_MOTOR_TIME = 200;
const HANG_CHANGE_SPEED_TOLERANCE = 25;
const HANG_AUDIO_INTERVAL_TIME = 100;
let MotorcycleAudioComponent = class MotorcycleAudioComponent extends VehicleAudioComponent_1.VehicleAudioComponent {
  constructor() {
    super(...arguments);
    this.cz = Vector_1.Vector.Create();
    this.bHf = Vector_1.Vector.Create();
    this.eQf = 0;
    this.CKf = Vector_1.Vector.Create();
    this.iQf = 0;
    this.pKf = Vector_1.Vector.Create();
    this.Gce = undefined;
    this.Lie = undefined;
    this.RHf = new Map();
    this.LHf = false;
    this.OnVehicleBeenEntered = t => {
      if (t.IsNpcPassenger() && ModelManager_1.ModelManager.GameAudioModel?.CheckMotorState()) {
        ModelManager_1.ModelManager.GameAudioModel.PlayMotorPlotAudio(IAction_1.EGondolaVoiceTriggeredType.InviteRole);
      }
      if (t.IsRolePassenger(true)) {
        this.LHf = true;
        this.wHf("play_sfx_motor_engine");
        this.PHf();
        this.l8f = FormationAttributeController_1.FormationAttributeController.GetValue(14);
        this._8f = FormationAttributeController_1.FormationAttributeController.GetMax(14);
        this.u8f(this.l8f, this._8f);
      }
    };
    this.OnVehicleBeenLeaved = t => {
      if (t.IsRolePassenger(true)) {
        this.LHf = false;
        this.PHf(true);
        this.AHf();
      }
    };
    this.DHf = false;
    this.l8f = 0;
    this._8f = 0;
    this.Pni = (t, i, o) => {
      if (!(Math.abs(i - this.l8f) < STRENGTH_TOLERANCE) || i === 0) {
        if (i < STRENGTH_TOLERANCE) {
          this.l8f = 0;
        } else {
          this.l8f = i;
        }
        this.u8f(this.l8f, this._8f);
      }
    };
    this.bni = (t, i, o) => {
      this._8f = i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 42, "[MotorAudio] OnStrengthMaxChanged", ["MaxStrength", i]);
      }
    };
    this.UHf = 0;
    this.xHf = 0;
    this.BHf = (t, i) => {
      if (!!this.ActorComp && !(Math.abs(this.UHf - this.c8f) < SPEED_TOLERANCE)) {
        this.UHf = this.c8f;
        this.cz.DeepCopy(i.Normal);
        this.xHf = Math.abs(this.bHf.DotProduct(this.cz));
        AudioSystem_1.AudioSystem.SetRtpcValue("motor_crash_strength", this.xHf, {
          Actor: this.ActorComp.Owner
        });
        AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_crash", this.ActorComp.Owner);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[MotorAudio] MotorOnHit", ["LastMotorOnHitStrength", this.xHf], ["LastMotorSpeed", this.UHf]);
        }
      }
    };
    this.kHf = (t, i) => {
      if (i) {
        this.wHf("play_sfx_motor_drift");
      } else {
        this.wHf("play_sfx_motor_drift", true);
      }
    };
    this.oZf = (t, i) => {
      this.nZf(i);
    };
    this.qHf = 0;
    this.X8f = 5;
    this.Y8f = (t, i) => {
      if (this.ActorComp) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[MotorAudio] MotorSubStateModeChange", ["newValue", t]);
        }
        switch (t) {
          case 3:
            this.qHf = 0;
            AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_takeoff", this.ActorComp.Owner);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Audio", 42, "[MotorAudio] 滞空音效", ["newValue", t]);
            }
            break;
          case 4:
            this.wHf("play_sfx_motor_burnout");
        }
        switch (i) {
          case 3:
            this.qHf = 0;
            AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_touchdown", this.ActorComp.Owner);
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Audio", 42, "[MotorAudio] 滞空后落地音效", ["newValue", t]);
            }
            break;
          case 4:
            this.wHf("play_sfx_motor_burnout", true);
        }
        this.X8f = t;
      }
    };
    this.c8f = 0;
    this.OHf = 0;
    this.oQf = 0;
  }
  OnStart() {
    this.Gce = this.Entity.GetComponent(265);
    this.Lie = this.Entity.GetComponent(215);
    this.eQf = this.Gce?.VehicleMovement?.MotorFrontWheelHang.GPerCm ?? 0.07;
    this.iQf = this.Gce?.VehicleMovement?.MotorBackWheelHang.GPerCm ?? 0.07;
    return true;
  }
  OnTick(t) {
    var i;
    if (this.Gce && this.LHf) {
      i = this.ActorComp.ActorVelocityProxy.DotProduct(this.ActorComp.ActorForwardProxy) < 0 ? -1 : 1;
      i = this.Gce.Speed * i;
      this.nQf(t);
      this.g8f(t, i);
      this.gOf(t, i);
      this.GHf(t);
    }
  }
  OnEnd() {
    return true;
  }
  PHf(t = false) {
    if (t || this.DHf) {
      if (t && this.DHf) {
        this.DHf = false;
        this.Lie?.RemoveTagAddOrRemoveListener(312204375, this.kHf);
        this.Lie?.RemoveTagAddOrRemoveListener(-595765206, this.oZf);
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.MotorOnHit, this.BHf);
        EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.MotorSubStateModeChange, this.Y8f);
        FormationAttributeController_1.FormationAttributeController.RemoveValueListener(14, this.Pni);
        FormationAttributeController_1.FormationAttributeController.RemoveValueListener(14, this.bni);
      }
    } else {
      this.DHf = true;
      this.Lie?.AddTagAddOrRemoveListener(312204375, this.kHf);
      this.Lie?.AddTagAddOrRemoveListener(-595765206, this.oZf);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.MotorOnHit, this.BHf);
      EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.MotorSubStateModeChange, this.Y8f);
      FormationAttributeController_1.FormationAttributeController.AddValueListener(14, this.Pni);
      FormationAttributeController_1.FormationAttributeController.AddMaxListener(14, this.bni);
    }
  }
  AHf() {
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
      this.wHf("play_sfx_motor_nos", true);
      this.wHf("play_sfx_motor_engine", true);
      this.wHf("play_sfx_motor_wheel", true);
      this.wHf("play_sfx_motor_burnout", true);
      this.wHf("play_sfx_motor_drift", true);
    }
  }
  u8f(t, i) {
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
  GHf(t) {
    var i;
    if (this.ActorComp && (i = MathUtils_1.MathUtils.Clamp(this.qHf + t * (this.X8f === 3 ? 1 : -1) * MS_TO_SECOND, -IN_AIR_MAX_DURATION, IN_AIR_MAX_DURATION), this.qHf !== i)) {
      this.qHf = i;
      AudioSystem_1.AudioSystem.SetRtpcValue("motor_air_land_time_seconds", this.qHf, {
        Actor: this.ActorComp.Owner,
        TransitionDuration: t
      });
    }
  }
  gOf(t, i) {
    if (!!this.ActorComp?.Owner && (i !== 0 || this.c8f !== 0) && (!(Math.abs(this.c8f - i) < SPEED_TOLERANCE) || this.c8f === 0)) {
      this.c8f = i;
      this.bHf.DeepCopy(this.ActorComp.ActorVelocityProxy);
      AudioSystem_1.AudioSystem.SetRtpcValue("motor_speed", i, {
        Actor: this.ActorComp.Owner,
        TransitionDuration: t
      });
      if (Math.abs(i) < SPEED_TOLERANCE || this.X8f === 3) {
        this.wHf("play_sfx_motor_wheel", true);
      } else {
        this.wHf("play_sfx_motor_wheel");
      }
    }
  }
  g8f(t, i) {
    var o;
    var s;
    var e;
    var _ = this.Gce?.VehicleMovement;
    if (this.ActorComp?.Owner && _) {
      o = _.GetCurrentMotorPower();
      s = _.MotorAccelConfig.PowerAccel.ToMax;
      _ = _.MotorAccelConfig.PowerAccel.ToMax;
      e = this.X8f === 3 ? 1.6 : 1;
      i = MathUtils_1.MathUtils.Clamp(Math.abs(i) / _, 0, 1);
      if (((_ = MathUtils_1.MathUtils.Clamp(i * -2500 * (i - 2) + o / s * 3000 * e, 0, 6000)) !== 0 || this.OHf !== 0) && (!(Math.abs(this.OHf - _) < ACC_CHANGE_TOLERANCE) || this.OHf === 0)) {
        this.OHf = _;
        AudioSystem_1.AudioSystem.SetRtpcValue("motor_engine_speed", _, {
          Actor: this.ActorComp.Owner,
          TransitionDuration: t
        });
      }
    }
  }
  nZf(t) {
    if (this.ActorComp?.Owner) {
      if (t) {
        AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_nos_start", this.ActorComp.Owner);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[MotorAudio] 氮气加速开始");
        }
        this.wHf("play_sfx_motor_nos");
      } else {
        this.wHf("play_sfx_motor_nos", true);
        AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_nos_end", this.ActorComp.Owner);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[MotorAudio] 氮气加速停止");
        }
      }
    }
  }
  MotorNitroAccelerationFailure() {
    if (this.ActorComp?.Owner && (AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_nos_failed", this.ActorComp.Owner), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Audio", 42, "[MotorAudio] 氮气加速失败");
    }
  }
  nQf(t) {
    var i;
    if (this.ActorComp && this.Gce?.VehicleMovement && (this.cz.FromUeVector(this.Gce.VehicleMovement.GetCurrentMotorFrontPulling()), i = this.CKf.SubtractionEqual(this.cz).Size() * this.eQf / (t * MS_TO_SECOND), this.CKf.DeepCopy(this.cz), this.cz.FromUeVector(this.Gce.VehicleMovement.GetCurrentMotorRearPulling()), t = this.pKf.SubtractionEqual(this.cz).Size() * this.iQf / (t * MS_TO_SECOND), this.pKf.DeepCopy(this.cz), i > HANG_CHANGE_SPEED_TOLERANCE || t > HANG_CHANGE_SPEED_TOLERANCE) && Time_1.Time.Now - this.oQf > HANG_AUDIO_INTERVAL_TIME) {
      this.oQf = Time_1.Time.Now;
      AudioSystem_1.AudioSystem.PostEvent("play_sfx_motor_suspension", this.ActorComp.Owner);
    }
  }
  wHf(t, i = false) {
    var o;
    if (this.ActorComp) {
      o = this.RHf.has(t);
      if (i || o) {
        if (i && o && (i = this.RHf.get(t), AudioSystem_1.AudioSystem.ExecuteAction(i, 0), this.RHf.delete(t), Log_1.Log.CheckDebug())) {
          Log_1.Log.Debug("Audio", 42, "[MotorAudio] 停止音效", ["类型", this.FHf(t)]);
        }
      } else {
        o = AudioSystem_1.AudioSystem.PostEvent(t, this.ActorComp.Owner);
        this.RHf.set(t, o);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Audio", 42, "[MotorAudio] 播放音效", ["类型", this.FHf(t)]);
        }
      }
    }
  }
  FHf(t) {
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
};
MotorcycleAudioComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(297)], MotorcycleAudioComponent);
exports.MotorcycleAudioComponent = MotorcycleAudioComponent; //# sourceMappingURL=MotorcycleAudioComponent.js.map