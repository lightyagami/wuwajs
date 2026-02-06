"use strict";

var __decorate = this && this.__decorate || function (e, o, t, i) {
  var _;
  var E = arguments.length;
  var n = E < 3 ? o : i === null ? i = Object.getOwnPropertyDescriptor(o, t) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, o, t, i);
  } else {
    for (var r = e.length - 1; r >= 0; r--) {
      if (_ = e[r]) {
        n = (E < 3 ? _(n) : E > 3 ? _(o, t, n) : _(o, t)) || n;
      }
    }
  }
  if (E > 3 && n) {
    Object.defineProperty(o, t, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GongduolaAudioComponent = undefined;
const AudioSystem_1 = require("../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const ModelManager_1 = require("../../../Manager/ModelManager");
const VehicleAudioComponent_1 = require("../Common/VehicleAudioComponent");
const VEHICLE_MOVE_EVENT = "play_interactive_gongduola_move";
const MAX_VEHICLE_SPEED_RTPC_PARAM = 50;
const CHANGE_VEHICLE_SPEED_TOLERENCE = 50;
const VEHICLE_MOVE_SPEED_MAPPING = 100;
let GongduolaAudioComponent = class GongduolaAudioComponent extends VehicleAudioComponent_1.VehicleAudioComponent {
  constructor() {
    super(...arguments);
    this.OnVehicleBeenEntered = e => {
      ModelManager_1.ModelManager.GameAudioModel.GondolaGetOnAudioEvent(this.Entity);
      if (e.IsNpcPassenger() && ModelManager_1.ModelManager.GameAudioModel?.CheckRideSharingState()) {
        ModelManager_1.ModelManager.GameAudioModel.PlayRideSharingPlotAudio(IAction_1.EGondolaVoiceTriggeredType.InviteRole);
      }
    };
    this.OnVehicleBeenLeaved = e => {
      ModelManager_1.ModelManager.GameAudioModel.GondolaGetOnAudioEvent(this.Entity);
    };
    this.TEn = 0;
    this.B2l = 0;
  }
  UpdateVehicleMoveSound(e, o) {
    if (!(Math.abs(this.TEn - e) < CHANGE_VEHICLE_SPEED_TOLERENCE) || this.TEn !== 0 && e === 0) {
      this.TEn = e;
      AudioSystem_1.AudioSystem.SetRtpcValue("vehicle_speed", MathUtils_1.MathUtils.Clamp(e / VEHICLE_MOVE_SPEED_MAPPING, 0, MAX_VEHICLE_SPEED_RTPC_PARAM), {
        Actor: o
      });
      if (e === 0) {
        this.q2l(o);
      } else if (this.B2l === 0 && (this.B2l = AudioSystem_1.AudioSystem.PostEvent(VEHICLE_MOVE_EVENT, o), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] PostEvent 开启水花音效", ["EntityId", this.Entity.Id], ["Owner", o.GetName()], ["Name", VEHICLE_MOVE_EVENT]);
      }
    }
  }
  q2l(e) {
    if (this.B2l !== 0 && (AudioSystem_1.AudioSystem.ExecuteAction(this.B2l, 0), this.B2l = 0, Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Audio", 42, "[Vehicle.Audio] PostEvent 停止水花音效", ["EntityId", this.Entity.Id], ["Owner", e.GetName()], ["Name", VEHICLE_MOVE_EVENT]);
    }
  }
};
GongduolaAudioComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(298)], GongduolaAudioComponent);
exports.GongduolaAudioComponent = GongduolaAudioComponent; //# sourceMappingURL=GongduolaAudioComponent.js.map