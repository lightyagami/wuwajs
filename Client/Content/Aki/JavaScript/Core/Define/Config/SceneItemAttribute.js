"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SceneItemAttribute = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class SceneItemAttribute {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Description() {
    return this.description();
  }
  get CreatorId() {
    return this.creatorid();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsSceneItemAttribute(t, e) {
    return (e || new SceneItemAttribute()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  description(t) {
    var e = this.J7.__offset(this.z7, 4);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  creatorid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SceneItemAttribute = SceneItemAttribute;
//# sourceMappingURL=SceneItemAttribute.js.map