"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HeadStateCommonParam = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
class HeadStateCommonParam {
  constructor() {
    this.OutMonsterHalfHeight = 0;
    this.OutTopMargin = 0;
    this.OutHorizontalMargin = 0;
    this.DrawHeadStateSocket = false;
  }
  Init() {
    this.OutMonsterHalfHeight = CommonParamById_1.configCommonParamById.GetFloatConfig("HeadStateOutMonsterHeight") / 2;
    this.OutTopMargin = CommonParamById_1.configCommonParamById.GetFloatConfig("HeadStateOutTopMargin");
    this.OutHorizontalMargin = CommonParamById_1.configCommonParamById.GetFloatConfig("HeadStateOutHorizontalMargin");
    this.DrawHeadStateSocket = false;
  }
}
exports.HeadStateCommonParam = HeadStateCommonParam;
//# sourceMappingURL=HeadStateCommonParam.js.map