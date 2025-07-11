"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkFactory = undefined;
const MarkItemEntity_1 = require("../Marks/MarkItemEntity");
class MarkFactory {
  static CreateAndAssembleMark(t) {
    var r = this.sf1(t);
    this.pn_(r, t);
    return r;
  }
  static pn_(t, r) {
    r = this.fn_.get(r.MarkType);
    if (r) {
      for (const a of r) {
        t.AddComponent(a);
      }
    }
  }
  static CreateAndAssembleConfigMark(t) {
    var r = this.vn_(t);
    this.pn_(r, t);
    return r;
  }
  static CreateAndAssembleServerMark(t) {
    var r = this.af1(t);
    this.pn_(r, t);
    return r;
  }
  static CreateAndAssembleDynamicConfigMark(t) {
    var r = this.pHc(t);
    this.pn_(r, t);
    return r;
  }
  static sf1(t) {
    var r = new MarkItemEntity_1.MarkItemEntity();
    r.GamePlay.MarkId = t.MarkId;
    r.GamePlay.MarkType = t.MarkType;
    r.GamePlay.Gravity = t.Gravity;
    r.GamePlay.MapId = t.MapId;
    return r;
  }
}
exports.MarkFactory = MarkFactory;
(_a = MarkFactory).vn_ = t => {
  var r = _a.sf1(t);
  r.AddComponent(15).MapMarkConfig = t.Config;
  r.AddComponent(18).EntityId = t.EntityId;
  return r;
};
MarkFactory.af1 = t => {
  var r = _a.sf1(t);
  r.AddComponent(18).EntityId = t.EntityId;
  return r;
};
MarkFactory.pHc = t => {
  var r = _a.sf1(t);
  r.AddComponent(15).DynamicConfig = t.DynamicConfig;
  return r;
};
MarkFactory.fn_ = new Map([[29, [14]], [28, [14]], [10, [13]], [32, [16, 15]], [31, [15]], [7, [14]]]); //# sourceMappingURL=MarkFactory.js.map