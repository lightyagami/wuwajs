"use strict";

var SceneItemStateAudioComponent_1;
var __decorate = this && this.__decorate || function (t, i, e, o) {
  var s;
  var n = arguments.length;
  var h = n < 3 ? i : o === null ? o = Object.getOwnPropertyDescriptor(i, e) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, i, e, o);
  } else {
    for (var r = t.length - 1; r >= 0; r--) {
      if (s = t[r]) {
        h = (n < 3 ? s(h) : n > 3 ? s(i, e, h) : s(i, e)) || h;
      }
    }
  }
  if (n > 3 && h) {
    Object.defineProperty(i, e, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemStateAudioComponent = undefined;
const UE = require("ue");
const AudioController_1 = require("../../../../../Core/Audio/AudioController");
const AudioModel_1 = require("../../../../../Core/Audio/AudioModel");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const GameplayTagUtils_1 = require("../../../../../Core/Utils/GameplayTagUtils");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const AudioUtils_1 = require("../../../../Utils/AudioUtils");
let SceneItemStateAudioComponent = SceneItemStateAudioComponent_1 = class SceneItemStateAudioComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.EIe = undefined;
    this.cen = undefined;
    this.Men = undefined;
    this.b1n = false;
    this.q1n = undefined;
    this.G1n = IComponent_1.EAudioRangeType.AOI;
    this.N1n = undefined;
    this.O1n = undefined;
    this.k1n = undefined;
    this.fd1 = undefined;
    this.V1n = undefined;
    this.H1n = undefined;
    this.j1n = undefined;
    this.W1n = 0;
    this.K1n = 0;
    this.Q1n = t => {
      if (!this.b1n && t) {
        var i = this.O1n.get(this.W1n);
        if (i) {
          this.X1n(i, 0);
        }
      } else if (this.b1n && !t) {
        let t = false;
        i = this.k1n.get(this.W1n);
        if (i) {
          t = true;
          this.X1n(i, 1);
        }
        if (this.N1n.Type === IComponent_1.EAkEventType.Box && !t) {
          this.X1n(undefined, 1);
        }
        i = this.fd1.get(this.W1n);
        if (i) {
          this.$1n(i);
        }
      }
      this.b1n = t;
    };
    this.Usi = (t, i) => {
      if (this.W1n !== t) {
        var e = this.O1n.get(t);
        var o = this.fd1.get(this.W1n);
        if (o) {
          this.$1n(o);
        }
        this.W1n = t;
        if (e) {
          switch (this.G1n) {
            case IComponent_1.EAudioRangeType.AOI:
              this.X1n(e, 2);
              break;
            case IComponent_1.EAudioRangeType.RangeComp:
            case IComponent_1.EAudioRangeType.SceneActorRefComp:
              if (this.b1n) {
                this.X1n(e, 2);
              }
          }
        }
      }
    };
    this.Y1n = (i, t) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 39, "[StateAudioComp] [疑难杂症] AkEvent回调", ["PbDataId", this.EIe?.GetPbDataId()], ["CallbackType", i]);
      }
      if (i === 2) {
        i = t;
        if (i?.Label) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 39, "[StateAudioComp] [疑难杂症] 解析AkEvent回调", ["PbDataId", this.EIe?.GetPbDataId()], ["Label", i.Label]);
          }
          let t = undefined;
          try {
            t = JSON.parse(i.Label);
          } catch {
            if (Log_1.Log.CheckDebug()) {
              Log_1.Log.Debug("Audio", 39, "[StateAudioComp] [疑难杂症] AkEvent回调解析失败", ["PbDataId", this.EIe?.GetPbDataId()], ["Label", i.Label]);
            }
            return;
          }
          if (t?.MarkerType === "SoundTrackingEffectNotify" && t.Action === "Start") {
            EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.PlaySoundTrackEffect, t.Length);
          }
        }
      }
    };
  }
  static get Dependencies() {
    return [206, 0];
  }
  OnInitData(t) {
    var t = t.GetParam(SceneItemStateAudioComponent_1)[0];
    this.q1n = t;
    this.EIe = this.Entity.GetComponent(0);
    this.G1n = this.q1n.AudioRangeType;
    this.N1n = this.q1n.AkEventType;
    return !!this.G1n && !!this.N1n || (t = this.EIe.GetPbDataId(), Log_1.Log.CheckError() && Log_1.Log.Error("Entity", 39, "组件配置参数缺失", ["entityId", t]), false);
  }
  OnStart() {
    var t;
    this.cen = this.Entity.GetComponent(137);
    if (!this.cen) {
      t = this.EIe.GetPbDataId();
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Entity", 39, "StateComponent不存在", ["entityId", t]);
      }
      return false;
    }
    this.W1n = this.cen.StateTagId;
    if (this.N1n.Type === IComponent_1.EAkEventType.Box) {
      this.J1n(this.N1n);
    }
    this.z1n();
    switch (this.G1n) {
      case IComponent_1.EAudioRangeType.RangeComp:
        if (!EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Q1n)) {
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Q1n);
        }
        break;
      case IComponent_1.EAudioRangeType.AOI:
        this.Z1n(true);
        break;
      case IComponent_1.EAudioRangeType.SceneActorRefComp:
        this.Men = this.Entity.GetComponent(167);
        if (!this.Men) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 39, "SceneItemReferenceComponent不存在", ["entityConfigId", this.EIe.GetPbDataId()]);
          }
          return false;
        }
        this.Men.AddOnPlayerOverlapCallback(this.Q1n);
    }
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.Usi);
    return true;
  }
  OnEnd() {
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.Usi)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSceneItemStateChange, this.Usi);
    }
    switch (this.G1n) {
      case IComponent_1.EAudioRangeType.RangeComp:
        if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Q1n)) {
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, this.Entity, EventDefine_1.EEventName.OnMyPlayerInOutRangeLocal, this.Q1n);
        }
        if (this.b1n) {
          this.Q1n(false);
        }
        break;
      case IComponent_1.EAudioRangeType.AOI:
        if (this.cen) {
          this.Z1n(false);
        }
        break;
      case IComponent_1.EAudioRangeType.SceneActorRefComp:
        if (this.Men) {
          this.Men.RemoveOnPlayerOverlapCallback(this.Q1n);
          this.Men = undefined;
        }
        if (this.b1n) {
          this.Q1n(false);
        }
    }
    return true;
  }
  OnClear() {
    return true;
  }
  z1n() {
    this.O1n = new Map();
    this.k1n = new Map();
    this.fd1 = new Map();
    for (const i of this.q1n.Config ?? []) {
      var t = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(i.State);
      if (t && (i.AkEvent && this.O1n.set(t, i.AkEvent), i.LeaveAkEvent && this.k1n.set(t, i.LeaveAkEvent), i.AudioFade)) {
        this.fd1.set(t, i.AudioFade);
      }
    }
  }
  e_n() {
    var t;
    if (!this.V1n?.IsValid()) {
      if ((t = this.Entity?.GetComponent(1)?.Owner)?.IsValid()) {
        this.V1n = AudioSystem_1.AudioSystem.GetAkComponent(t);
      } else {
        this.V1n = undefined;
      }
    }
  }
  X1n(t, i) {
    if (this.N1n.Type === IComponent_1.EAkEventType.Point) {
      if (this.N1n.PointIds?.length) {
        this.t_n(t, i);
      } else {
        this.i_n(t, i);
      }
    } else if (this.N1n.Type === IComponent_1.EAkEventType.Box) {
      switch (i) {
        case 0:
        case 2:
          this.j1n = t;
          break;
        case 1:
          this.j1n = undefined;
      }
      AudioUtils_1.AudioUtils.HandleAudioBoxUpdate(this.H1n, i);
    } else if (this.N1n.Type === IComponent_1.EAkEventType.Default && t) {
      this.o_n(t, i);
    }
  }
  o_n(t, i) {
    var e;
    if (this.N1n.Type === IComponent_1.EAkEventType.Default && t) {
      if ((e = this.Entity?.GetComponent(206)?.Owner)?.IsValid()) {
        t = (0, AudioSystem_1.parseAudioEventPath)(t);
        t = AudioSystem_1.AudioSystem.PostEvent(t, e);
        if (i !== 1) {
          this.K1n = t;
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("SceneItem", 7, "[PostDefaultAkEvent]未能获取到该实体对应的有效Actor", ["PbDataId", this.EIe?.GetPbDataId()]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("SceneItem", 7, "[PostDefaultAkEvent]Path为空", ["PbDataId", this.EIe?.GetPbDataId()]);
    }
  }
  i_n(t, i) {
    var e = this.N1n;
    if (this.N1n.Type === IComponent_1.EAkEventType.Point && !e.PointIds?.length) {
      if (!this.V1n?.IsValid()) {
        this.e_n();
        if (!this.V1n?.IsValid()) {
          o = this.EIe.GetPbDataId();
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 39, "AkComponent创建失败", ["entityId", o]);
          }
          return;
        }
      }
      this.V1n.bEnableOcclusion = !!e.EnableOcclusion;
      var o = (0, AudioSystem_1.parseAudioEventPath)(t);
      var e = AudioSystem_1.AudioSystem.PostEvent(o, this.V1n, {
        StopWhenOwnerDestroyed: true,
        CallbackMask: 4,
        CallbackHandler: this.Y1n
      });
      if (i !== 1) {
        this.K1n = e;
      }
    }
  }
  t_n(t, i) {
    var e = this.N1n;
    if (this.N1n.Type === IComponent_1.EAkEventType.Point && e.PointIds?.length) {
      if (!this.V1n?.IsValid()) {
        this.e_n();
        if (!this.V1n?.IsValid()) {
          r = this.EIe.GetPbDataId();
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Entity", 39, "AkComponent创建失败", ["entityId", r]);
          }
          return;
        }
      }
      var o = UE.NewArray(UE.TransformDouble);
      for (const a of e.PointIds) {
        var s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a);
        let t = undefined;
        if (s) {
          t = s.Entity.GetComponent(1)?.ActorTransform ?? s.Entity.GetComponent(0)?.D_GetTransform();
        } else {
          s = ModelManager_1.ModelManager.CreatureModel.GetEntityData(a);
          if (!s) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Audio", 39, "多点音源位置实体不存在", ["entityId", a]);
            }
            return;
          }
          var n;
          var h;
          var s = s.Transform;
          if (s) {
            n = Vector_1.Vector.Create(s.Pos?.X ?? 0, s.Pos?.Y ?? 0, s.Pos?.Z ?? 0);
            h = Rotator_1.Rotator.Create(s.Rot?.X ?? 0, s.Rot?.Y ?? 0, s.Rot?.Z ?? 0);
            s = Vector_1.Vector.Create(s.Scale?.X ?? 0, s.Scale?.Y ?? 0, s.Scale?.Z ?? 0);
            t = new UE.TransformDouble(h.ToUeRotator(), n.ToUeVector(), s.ToUeVector());
          }
        }
        if (!t?.IsValid()) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Audio", 33, "未能获取到多点音源位置实体的有效Transform", ["entityId", a]);
          }
          return;
        }
        o.Add(t);
      }
      this.V1n.bEnableOcclusion = !!e.EnableOcclusion;
      this.V1n.SetStopWhenOwnerDestroyed(true);
      AudioController_1.AudioController.SetMultiplePositions(this.V1n, o);
      var r = (0, AudioSystem_1.parseAudioEventPath)(t);
      var e = AudioSystem_1.AudioSystem.PostEvent(r, this.V1n);
      if (i !== 1) {
        this.K1n = e;
      }
    }
  }
  Z1n(i) {
    if (i) {
      i = this.O1n.get(this.W1n);
      if (i) {
        this.X1n(i, 0);
      }
    } else {
      let t = false;
      i = this.k1n.get(this.W1n);
      if (i) {
        t = true;
        this.X1n(i, 1);
      }
      if (this.N1n.Type === IComponent_1.EAkEventType.Box && !t) {
        this.X1n(undefined, 1);
      }
      i = this.fd1.get(this.W1n);
      if (i) {
        this.$1n(i);
      }
    }
  }
  $1n(t) {
    var i;
    if (this.K1n) {
      i = t.FadeCurve;
      AudioSystem_1.AudioSystem.ExecuteAction(this.K1n, 0, {
        TransitionDuration: t.FadeDuration,
        TransitionFadeCurve: i
      });
      this.K1n = 0;
    }
  }
  J1n(t) {
    var i = t.Priority;
    let e = undefined;
    var o = this.EIe?.GetPbDataId();
    switch (t.AudioType) {
      case IComponent_1.EAudioType.AudioAMB:
        e = "AudioAMB";
        break;
      case IComponent_1.EAudioType.AudioBGM:
        e = "AudioBGM";
    }
    if (e) {
      this.H1n = new AudioModel_1.AudioBox(i, o, e);
    } else if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Entity", 7, "[AudioBox]音频盒子类型未配置，请检查对应实体配置", ["EntityConfigId", this.EIe?.GetPbDataId()]);
    }
  }
  PostAudioBoxEvent() {
    if (this.j1n) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Audio", 39, "[AudioBox] 播放音频盒子", ["PbDataId", this.EIe?.GetPbDataId()], ["AkEventPath", this.j1n]);
      }
      AudioController_1.AudioController.PostEvent(this.j1n, undefined, undefined, undefined, undefined, undefined, true);
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Audio", 39, "[AudioBox] 播放音频盒子失败, 缺少对应的AkEventPath配置", ["PbDataId", this.EIe?.GetPbDataId()]);
    }
  }
};
SceneItemStateAudioComponent = SceneItemStateAudioComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(135)], SceneItemStateAudioComponent);
exports.SceneItemStateAudioComponent = SceneItemStateAudioComponent; //# sourceMappingURL=SceneItemStateAudioComponent.js.map