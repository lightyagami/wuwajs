"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowState = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class FlowState {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get StateKey() {
    return this.statekey();
  }
  get Id() {
    return this.id();
  }
  get KeepBgm() {
    return this.keepbgm();
  }
  get IsPreloadFlow() {
    return this.ispreloadflow();
  }
  get IsClientFlow() {
    return this.isclientflow();
  }
  get Pos() {
    return this.pos();
  }
  get Actions() {
    return this.actions();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsFlowState(t, s) {
    return (s || new FlowState()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  statekey(t) {
    var s = this.J7.__offset(this.z7, 4);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  id() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  keepbgm() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  ispreloadflow() {
    var t = this.J7.__offset(this.z7, 10);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isclientflow() {
    var t = this.J7.__offset(this.z7, 12);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  pos(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  actions(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.FlowState = FlowState;
//# sourceMappingURL=FlowState.js.map