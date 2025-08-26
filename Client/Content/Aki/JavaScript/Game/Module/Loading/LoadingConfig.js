"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadingConfig = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const BroadcastImageById_1 = require("../../../Core/Define/ConfigQuery/BroadcastImageById");
const LoadingLevelAreaAll_1 = require("../../../Core/Define/ConfigQuery/LoadingLevelAreaAll");
const LoadingLevelAreaById_1 = require("../../../Core/Define/ConfigQuery/LoadingLevelAreaById");
const LoadingTipsTextByLevelAreaId_1 = require("../../../Core/Define/ConfigQuery/LoadingTipsTextByLevelAreaId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class LoadingConfig extends ConfigBase_1.ConfigBase {
  GetLoadingTipsTextList(e) {
    return LoadingTipsTextByLevelAreaId_1.configLoadingTipsTextByLevelAreaId.GetConfigList(e);
  }
  GetBroadcastImageConfig(e) {
    return BroadcastImageById_1.configBroadcastImageById.GetConfig(e);
  }
  GetLevelArea() {
    return LoadingLevelAreaAll_1.configLoadingLevelAreaAll.GetConfigList();
  }
  GetLevelAreaById(e) {
    return LoadingLevelAreaById_1.configLoadingLevelAreaById.GetConfig(e);
  }
  GetLoadingTipsTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("loadingtips_time") ?? 1;
  }
}
exports.LoadingConfig = LoadingConfig;
//# sourceMappingURL=LoadingConfig.js.map