"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RandomPlot = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RandomPlot {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Probability() {
    return this.probability();
  }
  get Cooldown() {
    return this.cooldown();
  }
  get ClientPlotReferenceList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.clientplotreferencelistLength(), this.clientplotreferencelist, this);
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRandomPlot(t, i) {
    return (i || new RandomPlot()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  probability() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 100;
    }
  }
  cooldown() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetClientplotreferencelistAt(t) {
    return this.clientplotreferencelist(t);
  }
  clientplotreferencelist(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  clientplotreferencelistLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  clientplotreferencelistArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.RandomPlot = RandomPlot;
//# sourceMappingURL=RandomPlot.js.map