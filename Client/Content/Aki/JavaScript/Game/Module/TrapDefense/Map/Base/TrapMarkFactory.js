"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkFactory = undefined;
const TrapDefenseDefine_1 = require("../../TrapDefenseDefine");
const TrapMapEntity_1 = require("./TrapMapEntity");
class MarkFactory {
  static CreateAndAssembleMark(e) {
    var t = this.sf1(e);
    this.pn_(t, e);
    return t;
  }
  static pn_(t, e) {
    TrapDefenseDefine_1.markAssembleRegisterMap[e.MarkType].forEach(e => {
      t.AddComponent(e);
    });
  }
  static sf1(e) {
    return new TrapMapEntity_1.TrapMapEntity();
  }
}
exports.MarkFactory = MarkFactory;
//# sourceMappingURL=TrapMarkFactory.js.map