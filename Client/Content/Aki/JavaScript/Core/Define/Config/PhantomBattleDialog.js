"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleDialog = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleDialog {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get PlotName() {
    return this.plotname()
  }
  get FlowId() {
    return this.flowid()
  }
  get StateId() {
    return this.stateid()
  }
  __init(t, i) {
    return this.z7 = t, this.J7 = i, this
  }
  static getRootAsPhantomBattleDialog(t, i) {
    return (i || new PhantomBattleDialog).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  plotname(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  flowid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  stateid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.PhantomBattleDialog = PhantomBattleDialog;
//# sourceMappingURL=PhantomBattleDialog.js.map