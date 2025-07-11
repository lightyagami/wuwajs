"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPostAkEvent = undefined;
const UnionPostAkEventHelper_1 = require("./UnionPostAkEventHelper");
class FbPostAkEvent {
  constructor(t) {
    this.FbDataInternal = t;
    this.BEh = false;
    this.qEh = undefined;
    this.dUc = false;
    this.mUc = false;
  }
  static Create(t) {
    if (t) {
      return new FbPostAkEvent(t);
    }
  }
  get EventConfig() {
    var t;
    var e;
    if (!this.BEh && (this.BEh = true, t = this.FbDataInternal.eventConfigType(), e = UnionPostAkEventHelper_1.UnionPostAkEventHelper.GetUnionPostAkEventObject(t))) {
      this.qEh = UnionPostAkEventHelper_1.UnionPostAkEventHelper.ReadUnionPostAkEvent(t, this.FbDataInternal.eventConfig(e));
    }
    return this.qEh;
  }
  get PersistWhenExitDungeon() {
    if (!this.dUc) {
      this.dUc = true;
      this.mUc = this.FbDataInternal.persistWhenExitDungeon();
    }
    return this.mUc;
  }
}
exports.FbPostAkEvent = FbPostAkEvent;
//# sourceMappingURL=FbPostAkEvent.js.map