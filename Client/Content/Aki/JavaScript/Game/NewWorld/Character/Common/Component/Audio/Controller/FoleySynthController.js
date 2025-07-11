"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FoleySynthController = undefined;
const FoleySynthHandler_1 = require("./FoleySynthHandler");
class FoleySynthController {
  constructor(t, s, i) {
    this.ActorComp = t;
    this.AkComp = s;
    this.TagComp = i;
    this.vYo = new Array();
    this.Lo = undefined;
  }
  Init(t) {
    if (t) {
      this.Lo = t;
      this.Vi(t);
    }
  }
  Tick(t) {
    if (this.Lo?.IsLoadSuccess() && (!this.TagComp.HasTag(-1371021686) || this.TagComp.HasTag(1781274524))) {
      for (const s of this.vYo) {
        s.Tick(t);
      }
    }
  }
  Clear() {
    for (const t of this.vYo) {
      t.Clear();
    }
    this.vYo.length = 0;
    this.Lo = undefined;
  }
  SetDebug(t, s) {
    for (const i of s) {
      if (i < this.vYo.length) {
        this.vYo[i].SetDebug(t);
      }
    }
  }
  Vi(t) {
    var s;
    if (t.FoleySynthModel1Configs && t.FoleySynthModel1Configs.length > 0) {
      (s = new FoleySynthHandler_1.FoleySynthModel1Handler(this.ActorComp, this.AkComp, 2)).Init(t.FoleySynthModel1Configs);
      this.vYo.push(s);
    }
    if (t.FoleySynthModel2Configs && t.FoleySynthModel2Configs.length > 0) {
      (s = new FoleySynthHandler_1.FoleySynthModel2Handler(this.ActorComp, this.AkComp, t.Model2AccelerationMaxCount)).Init(t.FoleySynthModel2Configs);
      s.VelocityMaxCount = t.Model2VelocityMaxCount;
      this.vYo.push(s);
    }
  }
}
exports.FoleySynthController = FoleySynthController;
//# sourceMappingURL=FoleySynthController.js.map