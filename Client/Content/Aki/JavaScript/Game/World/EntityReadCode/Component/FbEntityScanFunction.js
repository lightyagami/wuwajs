"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityScanFunction = undefined;
const FbScanTraceEffect_1 = require("./FbScanTraceEffect");
class FbEntityScanFunction {
  constructor(t) {
    this.FbDataInternal = t;
    this.eUh = false;
    this.tUh = 0;
    this.iUh = false;
    this.rUh = false;
    this.oUh = false;
    this.nUh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityScanFunction(t);
    }
  }
  get ScanId() {
    if (!this.eUh) {
      this.eUh = true;
      this.tUh = this.FbDataInternal.scanId();
    }
    return this.tUh;
  }
  get IsConcealed() {
    if (!this.iUh) {
      this.iUh = true;
      this.rUh = this.FbDataInternal.isConcealed();
    }
    return this.rUh;
  }
  get TraceEffect() {
    if (!this.oUh) {
      this.oUh = true;
      this.nUh = FbScanTraceEffect_1.FbScanTraceEffect.Create(this.FbDataInternal.traceEffect());
    }
    return this.nUh;
  }
}
exports.FbEntityScanFunction = FbEntityScanFunction;
//# sourceMappingURL=FbEntityScanFunction.js.map