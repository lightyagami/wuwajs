"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbConnectorComponent = undefined;
const UnionConnectorLogicHelper_1 = require("./UnionConnectorLogicHelper");
class FbConnectorComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.h$h = false;
    this.l$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbConnectorComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get LogicType() {
    var t;
    var e;
    if (!this.h$h && (this.h$h = true, t = this.FbDataInternal.logicTypeType(), e = UnionConnectorLogicHelper_1.UnionConnectorLogicHelper.GetUnionConnectorLogicObject(t))) {
      this.l$h = UnionConnectorLogicHelper_1.UnionConnectorLogicHelper.ReadUnionConnectorLogic(t, this.FbDataInternal.logicType(e));
    }
    return this.l$h;
  }
}
exports.FbConnectorComponent = FbConnectorComponent;
//# sourceMappingURL=FbConnectorComponent.js.map