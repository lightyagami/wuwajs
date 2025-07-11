"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoleySynthModel2Handler = exports.FoleySynthModel1Handler = undefined;
const AudioController_1 = require("../../../../../../../Core/Audio/AudioController");
const Log_1 = require("../../../../../../../Core/Common/Log");
const FoleySynthHandlerBase_1 = require("./FoleySynthHandlerBase");
class FoleySynthModel1Handler extends FoleySynthHandlerBase_1.FoleySynthHandlerBase {
  OnInit(e) {
    for (const o of e) {
      this.FoleySynthModelConfigs.push(o);
    }
  }
  OnParseBoneSpeedForAudio() {
    let o = 0;
    let t = 0;
    for (let e = 0; e < this.FoleySynthModelConfigs.length; ++e) {
      var i = this.FoleySynthRecordsModel[this.RecordIndex][e].Speed;
      var s = this.FoleySynthModelDynamicConfigs[e].State;
      var r = this.FoleySynthModelConfigs[e];
      switch (s) {
        case -1:
          if (i > r.Ceil) {
            AudioController_1.AudioController.PostEventByComponent(r.CeilEvent, this.UeAkComp);
            this.FoleySynthModelDynamicConfigs[e].State = 1;
            o = i;
            t = r.CeilInterpolation;
            if (this.IsDebug && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Audio", 57, "-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息", ["Model", this.constructor?.name], ["Actor", this.ActorComp.Actor.GetName()], ["Event", r.CeilEvent]);
            }
          } else if (i < r.Floor && (AudioController_1.AudioController.PostEventByComponent(r.FloorEvent, this.UeAkComp), this.FoleySynthModelDynamicConfigs[e].State = 0, o = 0, t = r.FloorInterpolation, this.IsDebug) && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Audio", 57, "-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息", ["Model", this.constructor?.name], ["Actor", this.ActorComp.Actor.GetName()], ["Event", r.FloorEvent]);
          }
          this.UeAkComp.SetRTPCValue(r.Rtpc, o, t, "");
          break;
        case 0:
          if (i > r.Ceil) {
            AudioController_1.AudioController.PostEventByComponent(r.CeilEvent, this.UeAkComp);
            this.FoleySynthModelDynamicConfigs[e].State = 1;
            o = i;
            t = r.CeilInterpolation;
            this.UeAkComp.SetRTPCValue(r.Rtpc, o, t, "");
            if (this.IsDebug && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Audio", 57, "-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息", ["Model", this.constructor?.name], ["Actor", this.ActorComp.Actor.GetName()], ["Event", r.CeilEvent]);
            }
          } else {
            o = 0;
            t = r.FloorInterpolation;
          }
          break;
        case 1:
          if (i < r.Floor) {
            AudioController_1.AudioController.PostEventByComponent(r.FloorEvent, this.UeAkComp);
            this.FoleySynthModelDynamicConfigs[e].State = 0;
            o = 0;
            t = r.FloorInterpolation;
            this.UeAkComp.SetRTPCValue(r.Rtpc, o, t, "");
            if (this.IsDebug && Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Audio", 57, "-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息", ["Model", this.constructor?.name], ["Actor", this.ActorComp.Actor.GetName()], ["Event", r.FloorEvent]);
            }
          } else {
            o = i;
            t = r.CeilInterpolation;
            this.UeAkComp.SetRTPCValue(r.Rtpc, o, t, "");
          }
      }
    }
    if (this.IsDebug && Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Audio", 57, "-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息", ["Model", this.constructor?.name], ["Actor", this.ActorComp.Actor.GetName()], ["rtpcSpeed", o], ["interpolation", t]);
    }
  }
}
exports.FoleySynthModel1Handler = FoleySynthModel1Handler;
class FoleySynthModel2Handler extends FoleySynthHandlerBase_1.FoleySynthHandlerBase {
  constructor() {
    super(...arguments);
    this.VelocityMaxCount = 0;
    this.MYo = new Array();
  }
  OnInit(e) {
    for (const o of e) {
      this.FoleySynthModelConfigs.push(o);
      this.MYo.push(-1);
    }
  }
  OnParseBoneSpeedForAudio() {
    var t = [];
    var i = [];
    for (let e = 0; e < this.FoleySynthModelConfigs.length; ++e) {
      t.push(0);
      i.push(0);
    }
    for (let o = 0; o < this.FoleySynthModelConfigs.length; ++o) {
      if (this.MYo[o] === -1) {
        var e = this.FoleySynthModelConfigs[o];
        if (this.GetCurrentRecord(o).Speed > e.Ceil) {
          AudioController_1.AudioController.PostEventByComponent(e.CeilEvent, this.UeAkComp);
          if (this.IsDebug && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Audio", 57, "-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息", ["Model", this.constructor?.name], ["Actor", this.ActorComp.Actor.GetName()], ["Event", e.CeilEvent]);
          }
          for (let e = 0; e < this.RecordCount; ++e) {
            var s = this.FoleySynthRecordsModel[e][o].Acceleration;
            if (s > i[o]) {
              i[o] = s;
            }
          }
          for (let e = 0; e < this.VelocityMaxCount; ++e) {
            var r = this.GetPreRecordIndex(e);
            var r = this.FoleySynthRecordsModel[r][o].Speed;
            if (r > t[o]) {
              t[o] = r;
            }
          }
          this.UeAkComp.SetRTPCValue(e.RtpcVelMax, t[o], 0, "");
          this.UeAkComp.SetRTPCValue(e.RtpcAccMax, i[o], 0, "");
          this.MYo[o] = t[o];
        }
      } else {
        var e = this.FoleySynthModelConfigs[o];
        var h = this.GetCurrentRecord(o).Speed;
        if (h < e.Floor || h < this.MYo[o] * e.FloorPrecent) {
          AudioController_1.AudioController.PostEventByComponent(e.FloorEvent, this.UeAkComp);
          if (this.IsDebug && Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Audio", 57, "-------------Ak[FoleySynth][ParseBoneSpeedForAudio] Debug信息", ["Model", this.constructor?.name], ["Actor", this.ActorComp.Actor.GetName()], ["Event", e.FloorEvent]);
          }
          this.UeAkComp.SetRTPCValue(e.RtpcVelDur, h, e.FloorInterpolation, "");
          this.MYo[o] = -1;
        } else {
          this.UeAkComp.SetRTPCValue(e.RtpcVelDur, h, e.CeilInterpolation, "");
        }
      }
    }
  }
}
exports.FoleySynthModel2Handler = FoleySynthModel2Handler;
//# sourceMappingURL=FoleySynthHandler.js.map