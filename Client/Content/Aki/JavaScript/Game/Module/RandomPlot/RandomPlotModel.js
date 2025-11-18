"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RandomPlotModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class RandomPlotModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.RandomPlotMap = new Map();
    this.InstanceTriggerGroupMap = new Map();
    this.InstanceConditionMap = undefined;
  }
}
exports.RandomPlotModel = RandomPlotModel;
//# sourceMappingURL=RandomPlotModel.js.map