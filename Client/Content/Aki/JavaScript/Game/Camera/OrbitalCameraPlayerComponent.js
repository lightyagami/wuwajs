"use strict";

var __decorate = this && this.__decorate || function (t, e, i, r) {
  var s;
  var o = arguments.length;
  var h = o < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, r);
  } else {
    for (var a = t.length - 1; a >= 0; a--) {
      if (s = t[a]) {
        h = (o < 3 ? s(h) : o > 3 ? s(e, i, h) : s(e, i)) || h;
      }
    }
  }
  if (o > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrbitalCameraPlayerComponent = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../Core/Actor/ActorSystem");
const Log_1 = require("../../Core/Common/Log");
const EntityComponent_1 = require("../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../Core/Timer/TimerSystem");
const Vector_1 = require("../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../Core/Utils/MathUtils");
const EventDefine_1 = require("../Common/Event/EventDefine");
const EventSystem_1 = require("../Common/Event/EventSystem");
const Global_1 = require("../Global");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
const CameraUtility_1 = require("./CameraUtility");
const SEQUENCE_CAMERA = new UE.FName("SequenceCamera");
let OrbitalCameraPlayerComponent = class OrbitalCameraPlayerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ZPr = undefined;
    this.nZo = undefined;
    this.exr = undefined;
    this.txr = undefined;
    this.ixr = undefined;
    this._ae = Vector_1.Vector.Create();
    this.uae = Vector_1.Vector.Create();
    this.oxr = Vector_1.Vector.Create();
    this.nJo = -0;
    this.ose = -0;
    this.rxr = -0;
    this.nxr = -0;
    this.GPe = UE.NewArray(UE.Actor);
    this.m5i = new UE.FrameTime();
    this.Lz = Vector_1.Vector.Create();
    this.sxr = undefined;
    this.OnModeChanged = (t, e) => {
      if (t === 4) {
        if (this.sxr) {
          this.Enable(this.sxr, "[OrbitalCameraPlayerComponent.OnModeChanged] newMode === Orbital");
          this.sxr = undefined;
        }
      } else if (e === 4 && !this.sxr) {
        this.sxr = this.Disable("[OrbitalCameraPlayerComponent.OnModeChanged] oldMode === Orbital");
      }
    };
    this.axr = (t, e) => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Camera", 6, "Orbital LoadComplete");
      }
      if (e === this.ixr) {
        this.nZo = t;
        this.Vtr();
      }
    };
  }
  OnStart() {
    this.ZPr = this.Entity.GetComponent(9);
    this.sxr = this.Disable("[OrbitalCameraPlayerComponent.OnStart]");
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CameraModeChanged, this.OnModeChanged);
    return true;
  }
  OnEnd() {
    this.nZo = undefined;
    if (this.exr) {
      const t = this.exr;
      TimerSystem_1.TimerSystem.Next(() => {
        ActorSystem_1.ActorSystem.Put("OrbitalCameraPlayerComponent.OnEnd", t);
      });
      this.exr = undefined;
      this.txr = undefined;
    }
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CameraModeChanged, this.OnModeChanged);
    return true;
  }
  OnTick(t) {
    var e;
    if (this.exr) {
      e = this.hxr();
      this.lxr(e);
      this.txr.PlayToFrame(this.m5i);
    } else if (this.sxr) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Camera", 6, "OrbitalCamera Impossible Tick!");
      }
    } else {
      this.sxr = this.Disable("[OrbitalCameraPlayerComponent.OnTick] this.CameraSequenceActor无效");
    }
  }
  PlayCameraOrbitalPath(t, e, i, r, s) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Orbital Play");
    }
    this.ixr = t;
    this._ae.FromUeVector(e);
    this.uae.FromUeVector(i);
    this.ose = r;
    this.rxr = s;
    this.uae.Subtraction(this._ae, this.oxr);
    this.nJo = this.oxr.Size();
    this.oxr.DivisionEqual(this.nJo);
    this._xr();
  }
  PlayCameraOrbital(t, e, i, r, s) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 6, "Orbital Play");
    }
    this.nZo = t;
    this._ae.FromUeVector(e);
    this.uae.FromUeVector(i);
    this.ose = r;
    this.rxr = s;
    this.uae.Subtraction(this._ae, this.oxr);
    this.nJo = this.oxr.Size();
    this.oxr.DivisionEqual(this.nJo);
    this.Vtr();
  }
  StopCameraOrbital() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Camera", 6, "Orbital Stop");
    }
    if (this.ixr || this.nZo) {
      ControllerHolder_1.ControllerHolder.CameraController.FightCamera.LogicComponent.SetRotation(CameraUtility_1.CameraUtility.GetCameraDefaultFocusUeRotator());
      ControllerHolder_1.ControllerHolder.CameraController.ExitCameraMode(4, this.rxr);
      this.nZo &&= undefined;
      if (this.exr) {
        this.txr.Stop();
        const t = this.exr;
        TimerSystem_1.TimerSystem.Next(() => {
          ActorSystem_1.ActorSystem.Put("OrbitalCameraPlayerComponent.StopCameraOrbital", t);
        });
        this.exr = undefined;
        this.txr = undefined;
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Camera", 6, "Orbital: No CameraSequenceActor");
      }
      this.ixr = undefined;
    }
  }
  _xr() {
    ResourceSystem_1.ResourceSystem.LoadAsync(this.ixr, UE.LevelSequence, this.axr);
  }
  Vtr() {
    var t = new UE.MovieSceneSequencePlaybackSettings();
    t.bDisableMovementInput = false;
    t.bDisableLookAtInput = false;
    this.exr = ActorSystem_1.ActorSystem.Get(UE.LevelSequenceActor.StaticClass(), MathUtils_1.MathUtils.DefaultTransformDouble, undefined, false);
    this.exr.PlaybackSettings = t;
    this.exr.SetSequence(this.nZo);
    this.exr.bOverrideInstanceData = true;
    this.txr = this.exr.SequencePlayer;
    this.txr.Play();
    this.txr.SetPlayRate(0);
    this.txr.Pause();
    this.GPe.Add(this.ZPr.CineCamera);
    this.exr.SetBindingByTag(SEQUENCE_CAMERA, this.GPe, false);
    this.GPe.Empty();
    this.nxr = this.txr.GetEndTime().Time.FrameNumber.Value;
    ControllerHolder_1.ControllerHolder.CameraController.EnterCameraMode(4, this.ose, 0);
  }
  hxr() {
    var t;
    if (!Global_1.Global.BaseCharacter || this.nJo < MathUtils_1.MathUtils.SmallNumber) {
      return 0;
    } else {
      Global_1.Global.BaseCharacter.CharacterActorComponent.ActorLocationProxy.Subtraction(this._ae, this.Lz);
      t = this.Lz.DotProduct(this.oxr) / this.nJo;
      return MathUtils_1.MathUtils.Clamp(t, 0, 1);
    }
  }
  lxr(t) {
    var t = t * this.nxr;
    var e = Math.floor(t);
    var t = t - e;
    this.m5i.FrameNumber.Value = e;
    this.m5i.SubFrame = t;
    return this.m5i;
  }
};
OrbitalCameraPlayerComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(6)], OrbitalCameraPlayerComponent);
exports.OrbitalCameraPlayerComponent = OrbitalCameraPlayerComponent; //# sourceMappingURL=OrbitalCameraPlayerComponent.js.map