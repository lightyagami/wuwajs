"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayCueReference = undefined;
const GameplayCueController_1 = require("./Controller/GameplayCueController");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueReference extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments);
    this.BDf = -1;
    this.kDf = [];
    this.qDf = [];
    this.Ang = undefined;
  }
  OnInit() {
    var e = this.CueConfig.Parameters;
    if (e.length > 0) {
      this.BDf = Number(e[0]);
    }
    if (e.length > 1) {
      for (const t of e[1].split("#")) {
        this.kDf.push(Number(t));
      }
    }
  }
  OnCreate() {
    if (this.kDf.length > 0) {
      var e = this.ODf();
      if (e) {
        this.Ang = new WeakRef(e);
        for (const s of this.kDf) {
          var t = e.AddCue(s, {
            Instant: this.IsInstant
          });
          if (t !== GameplayCueController_1.INVALID_CUE_HANDLE && t !== GameplayCueController_1.INSTANT_CUE_HANDLE) {
            this.qDf.push(t);
          }
        }
      }
    }
  }
  OnDestroy() {
    if (this.qDf.length > 0) {
      var e = this.Ang?.deref();
      if (e) {
        for (const t of this.qDf) {
          e.RemoveCueByHandle(t);
        }
      }
    }
    this.kDf.length = 0;
    this.qDf.length = 0;
    this.Ang = undefined;
  }
  ODf() {
    if (this.BDf === 0) {
      return this.EntityHandle.Entity?.GetComponent(242)?.VehicleEntity?.GetComponent(238);
    }
  }
}
exports.GameplayCueReference = GameplayCueReference;
//# sourceMappingURL=GameplayCueReference.js.map