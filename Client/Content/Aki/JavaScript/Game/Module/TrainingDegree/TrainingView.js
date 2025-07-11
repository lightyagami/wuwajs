"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrainingView = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew");
const TrainingItem_1 = require("./TrainingItem");
class TrainingView {
  constructor() {
    this.Sui = undefined;
    this.DRo = (e, i, r) => {
      i = new TrainingItem_1.TrainingItem(i);
      i.SetData(e);
      return {
        Key: r,
        Value: i
      };
    };
  }
  Show(e, i) {
    var r;
    if (e) {
      r = e.RootUIComp;
      if (!(i = i ?? ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList())) {
        r.SetUIActive(false);
      }
      this.Sui = new GenericLayoutNew_1.GenericLayoutNew(e, this.DRo);
      this.Sui.RebuildLayoutByDataNew(i);
      r.SetUIActive(true);
    }
  }
  Clear() {
    if (this.Sui) {
      this.Sui.ClearChildren();
    }
    this.Sui = undefined;
  }
}
exports.TrainingView = TrainingView;
//# sourceMappingURL=TrainingView.js.map