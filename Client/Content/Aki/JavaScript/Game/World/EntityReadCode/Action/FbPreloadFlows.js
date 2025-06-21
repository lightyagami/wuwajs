"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbPreloadFlows = void 0;
const FbPlayFlow_1 = require("./FbPlayFlow");
class FbPreloadFlows {
  constructor(t) {
    this.FbDataInternal = t, this.u_h = !1, this.f8o = void 0, this.B11 = !1, this.k11 = void 0
  }
  static Create(t) {
    if (t) return new FbPreloadFlows(t)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get FlowData() {
    return this.B11 || (this.B11 = !0, this.k11 = FbPlayFlow_1.FbPlayFlow.Create(this.FbDataInternal.flowData())), this.k11
  }
}
exports.FbPreloadFlows = FbPreloadFlows;
//# sourceMappingURL=FbPreloadFlows.js.map