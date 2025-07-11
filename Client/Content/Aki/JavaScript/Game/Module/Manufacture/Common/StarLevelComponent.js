"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StarLevelComponent = undefined;
const CookLevelView_1 = require("../../Cook/View/CookLevelView");
const GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
class StarLevelComponent {
  constructor(e) {
    this.kGt = (e, o, t) => {
      var r = new CookLevelView_1.StarItem();
      r.CreateThenShowByActor(o.GetOwner());
      r.SetState(e);
      return {
        Key: t,
        Value: r
      };
    };
    this.$be = new GenericLayoutNew_1.GenericLayoutNew(e, this.kGt);
  }
  ShowLevel(o, e) {
    var t = new Array(e);
    for (let e = 0; e < o; e++) {
      t[e] = true;
    }
    this.$be.RebuildLayoutByDataNew(t);
  }
  Clear() {
    this.$be.ClearChildren();
  }
}
exports.StarLevelComponent = StarLevelComponent;
//# sourceMappingURL=StarLevelComponent.js.map