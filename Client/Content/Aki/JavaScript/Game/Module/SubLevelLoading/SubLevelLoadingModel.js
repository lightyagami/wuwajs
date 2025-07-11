"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubLevelLoadingModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ModelManager_1 = require("../../Manager/ModelManager");
class SubLevelLoadingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.LIo = 0;
    this.uEr = undefined;
    this.DIo = false;
  }
  get ScreenEffect() {
    return this.LIo;
  }
  set ScreenEffect(e) {
    this.LIo = e;
  }
  get LoadSubLeveling() {
    return this.DIo;
  }
  set LoadSubLeveling(e) {
    this.DIo = e;
  }
  set LoadSubLevelPromise(e) {
    this.uEr = e;
  }
  get LoadSubLevelPromise() {
    return this.uEr;
  }
  OnLeaveLevel() {
    return !(this.DIo = false);
  }
  OnClear() {
    this.LIo = 0;
    ModelManager_1.ModelManager.LoadingModel.ScreenEffect = 0;
    this.DIo = false;
    return !(this.uEr = undefined);
  }
}
exports.SubLevelLoadingModel = SubLevelLoadingModel;
//# sourceMappingURL=SubLevelLoadingModel.js.map