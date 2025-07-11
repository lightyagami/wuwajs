"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCharacterConnectorComponent = undefined;
const UnionCharacterConnectorLogicHelper_1 = require("./UnionCharacterConnectorLogicHelper");
class FbCharacterConnectorComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.h$h = false;
    this.l$h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCharacterConnectorComponent(t);
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
    if (!this.h$h && (this.h$h = true, t = this.FbDataInternal.logicTypeType(), e = UnionCharacterConnectorLogicHelper_1.UnionCharacterConnectorLogicHelper.GetUnionCharacterConnectorLogicObject(t))) {
      this.l$h = UnionCharacterConnectorLogicHelper_1.UnionCharacterConnectorLogicHelper.ReadUnionCharacterConnectorLogic(t, this.FbDataInternal.logicType(e));
    }
    return this.l$h;
  }
}
exports.FbCharacterConnectorComponent = FbCharacterConnectorComponent;
//# sourceMappingURL=FbCharacterConnectorComponent.js.map