"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MovieModeModel = undefined;
const CommonDefine_1 = require("../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
class MovieModeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.MovieModeHideUiTimeThreshold = 0;
    this.hGf = new Set();
  }
  OnInit() {
    this.iRf();
    return true;
  }
  iRf() {
    this.MovieModeHideUiTimeThreshold = CommonParamById_1.configCommonParamById.GetIntConfig("MovieModeHideUiTimeThreshold") ?? 1;
    this.MovieModeHideUiTimeThreshold *= CommonDefine_1.MILLIONSECOND_PER_SECOND;
  }
  FreezeUi(e) {
    this.hGf.add(e);
  }
  UnFreezeUi(e) {
    this.hGf.delete(e);
  }
  get IsFreezingUi() {
    return this.hGf.size > 0;
  }
  OnClear() {
    return true;
  }
}
exports.MovieModeModel = MovieModeModel;
//# sourceMappingURL=MovieModeModel.js.map