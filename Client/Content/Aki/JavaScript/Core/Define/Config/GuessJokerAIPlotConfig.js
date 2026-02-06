"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerAIPlotConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class GuessJokerAIPlotConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get RoleId() {
    return this.roleid();
  }
  get State() {
    return this.state();
  }
  get ExtraParam() {
    return this.extraparam();
  }
  get PlotIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.plotidlistLength(), this.plotidlist, this);
  }
  get DelayTime() {
    return this.delaytime();
  }
  get WaitDeleteTime() {
    return this.waitdeletetime();
  }
  get CanHardCut() {
    return this.canhardcut();
  }
  get Cd() {
    return this.cd();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsGuessJokerAIPlotConfig(t, i) {
    return (i || new GuessJokerAIPlotConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  state() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  extraparam() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetPlotidlistAt(t) {
    return this.plotidlist(t);
  }
  plotidlist(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + i) + t * 4);
    } else {
      return 0;
    }
  }
  plotidlistLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  plotidlistArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  delaytime() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  waitdeletetime() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  canhardcut() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  cd() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.GuessJokerAIPlotConfig = GuessJokerAIPlotConfig;
//# sourceMappingURL=GuessJokerAIPlotConfig.js.map