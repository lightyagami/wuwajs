"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwitchRef = undefined;
const AudioSystem_1 = require("../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../Core/Common/Log");
class SwitchRef {
  constructor(t, i) {
    this.hs = t;
    this.Cbo = i;
    this.OC = undefined;
  }
  get State() {
    return this.Cbo;
  }
  set State(t) {
    if (this.OC?.IsValid()) {
      if (this.Cbo !== t) {
        this.Cbo = t;
        AudioSystem_1.AudioSystem.SetSwitch(this.hs, this.State, this.OC);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Audio", 56, "[Core.SwitchRef] 绑定对象无效", ["Group", this.hs]);
    }
  }
  Bind(t) {
    this.OC = t;
    AudioSystem_1.AudioSystem.SetSwitch(this.hs, this.State, this.OC);
  }
  ClearObject() {
    return !(this.OC = undefined);
  }
}
exports.SwitchRef = SwitchRef;
//# sourceMappingURL=SwitchRef.js.map