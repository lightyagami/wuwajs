"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const EffectSystem_1 = require("./EffectSystem");
class TsEffectActor extends UE.Actor {
  constructor() {
    super(...arguments);
    this.InPool = 0;
    this.HandleId = 0;
    this.EffectPath = "";
    this.EffectType = 3;
    this.OwnerEntityId = 0;
    this.TimeScale = 1;
  }
  Constructor() {
    this.InPool = 0;
    this.HandleId = 0;
    this.EffectPath = "";
    this.EffectType = 3;
    this.OwnerEntityId = 0;
    this.TimeScale = 1;
  }
  SetEffectHandle(t = 0, e = "", s = 3) {
    this.HandleId = t;
    this.EffectPath = e;
    this.EffectType = s;
  }
  SetTimeScale(t) {
    if (this.TimeScale !== t) {
      this.TimeScale = t;
    }
  }
  GetTimeScale() {
    return this.TimeScale ?? 1;
  }
  GetHandle() {
    return this.HandleId ?? 0;
  }
  SetHandle(t) {}
  RemoveHandle() {
    this.HandleId = 0;
  }
  ReceiveEndPlay() {}
  StopEffect(t, e = false, s = false) {
    if (EffectSystem_1.EffectSystem.IsValid(this.HandleId)) {
      EffectSystem_1.EffectSystem.StopEffectById(this.HandleId, t, e, s);
    }
  }
  GetEffectPath() {
    return this.EffectPath;
  }
  GetEffectType() {
    return this.EffectType;
  }
}
exports.default = TsEffectActor;
//# sourceMappingURL=TsEffectActor.js.map