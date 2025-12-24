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
    this._wf = -1;
    this.uwf = [];
    this.cwf = [];
    this.UWf = undefined;
  }
  OnInit() {
    var e = this.CueConfig.Parameters;
    if (e.length > 0) {
      this._wf = Number(e[0]);
    }
    if (e.length > 1) {
      for (const t of e[1].split("#")) {
        this.uwf.push(Number(t));
      }
    }
  }
  OnCreate() {
    if (this.uwf.length > 0) {
      var e = this.dwf();
      if (e) {
        this.UWf = new WeakRef(e);
        for (const s of this.uwf) {
          var t = e.AddCue(s, {
            Instant: this.IsInstant
          });
          if (t !== GameplayCueController_1.INVALID_CUE_HANDLE && t !== GameplayCueController_1.INSTANT_CUE_HANDLE) {
            this.cwf.push(t);
          }
        }
      }
    }
  }
  OnDestroy() {
    if (this.cwf.length > 0) {
      var e = this.UWf?.deref();
      if (e) {
        for (const t of this.cwf) {
          e.RemoveCueByHandle(t);
        }
      }
    }
    this.uwf.length = 0;
    this.cwf.length = 0;
    this.UWf = undefined;
  }
  dwf() {
    if (this._wf === 0) {
      return this.EntityHandle.Entity?.GetComponent(242)?.VehicleEntity?.GetComponent(238);
    }
  }
}
exports.GameplayCueReference = GameplayCueReference;
//# sourceMappingURL=GameplayCueReference.js.map