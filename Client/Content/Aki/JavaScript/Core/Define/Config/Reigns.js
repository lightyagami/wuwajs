"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.Reigns = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class Reigns {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get FlowId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.flowidLength(), this.flowid, this)
  }
  get EndingList() {
    return this.endinglist()
  }
  get BaseProperty() {
    return this.baseproperty()
  }
  get PropertyDownReducePercent() {
    return this.propertydownreducepercent()
  }
  __init(t, s) {
    return this.z7 = t, this.J7 = s, this
  }
  static getRootAsReigns(t, s) {
    return (s || new Reigns).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetFlowidAt(t) {
    return this.flowid(t)
  }
  flowid(t, s) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + 4 * t, s) : null;
    return "string" == typeof i && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(i), i
  }
  flowidLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  endinglist(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  baseproperty(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  propertydownreducepercent() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
}
exports.Reigns = Reigns;
//# sourceMappingURL=Reigns.js.map