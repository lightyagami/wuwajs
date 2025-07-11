"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AoiModel = undefined;
const UE = require("ue");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class AoiModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.nMr = undefined;
    this.sMr = undefined;
  }
  get MinCoordinate() {
    return this.nMr;
  }
  set MinCoordinate(e) {
    this.nMr = e;
  }
  get MaxCoordinate() {
    return this.sMr;
  }
  set MaxCoordinate(e) {
    this.sMr = e;
  }
  OnInit() {
    this.nMr = new UE.Vector();
    this.sMr = new UE.Vector();
    return true;
  }
  OnClear() {
    this.nMr = undefined;
    return !(this.sMr = undefined);
  }
  OnLeaveLevel() {
    return true;
  }
}
exports.AoiModel = AoiModel;
//# sourceMappingURL=AoiModel.js.map