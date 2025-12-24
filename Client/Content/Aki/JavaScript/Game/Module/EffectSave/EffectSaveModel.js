"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectSaveModel = undefined;
const UE = require("ue");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class EffectSaveModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.TempTransform = new UE.TransformDouble();
    this.TempPosition = new UE.VectorDouble();
    this.TempRotation = new UE.Rotator();
    this.EffectSaveMap = new Map();
  }
  OnInit() {
    this.EffectSaveMap.clear();
    return true;
  }
}
exports.EffectSaveModel = EffectSaveModel;
//# sourceMappingURL=EffectSaveModel.js.map