"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSceneItemAiComponent = undefined;
const UnionSceneItemAiTypeHelper_1 = require("./UnionSceneItemAiTypeHelper");
class FbSceneItemAiComponent {
  constructor(e) {
    this.FbDataInternal = e;
    this.q_h = false;
    this.k_h = false;
    this.IYh = false;
    this.TYh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbSceneItemAiComponent(e);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get AiConfig() {
    var e;
    var t;
    if (!this.IYh && (this.IYh = true, e = this.FbDataInternal.aiConfigType(), t = UnionSceneItemAiTypeHelper_1.UnionSceneItemAiTypeHelper.GetUnionSceneItemAiTypeObject(e))) {
      this.TYh = UnionSceneItemAiTypeHelper_1.UnionSceneItemAiTypeHelper.ReadUnionSceneItemAiType(e, this.FbDataInternal.aiConfig(t));
    }
    return this.TYh;
  }
}
exports.FbSceneItemAiComponent = FbSceneItemAiComponent;
//# sourceMappingURL=FbSceneItemAiComponent.js.map