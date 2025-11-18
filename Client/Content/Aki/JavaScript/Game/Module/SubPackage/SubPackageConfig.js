"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubPackageConfig = undefined;
const DownLoadSubPackageAll_1 = require("../../../Core/Define/ConfigQuery/DownLoadSubPackageAll");
const DownLoadSubPackageById_1 = require("../../../Core/Define/ConfigQuery/DownLoadSubPackageById");
const DownLoadSubPackageByVersion_1 = require("../../../Core/Define/ConfigQuery/DownLoadSubPackageByVersion");
const DownLoadVersionByType_1 = require("../../../Core/Define/ConfigQuery/DownLoadVersionByType");
const DownLoadVersionByVersion_1 = require("../../../Core/Define/ConfigQuery/DownLoadVersionByVersion");
const VideoDataByBelongBranch_1 = require("../../../Core/Define/ConfigQuery/VideoDataByBelongBranch");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class SubPackageConfig extends ConfigBase_1.ConfigBase {
  GetDownLoadSubPackageById(e) {
    return DownLoadSubPackageById_1.configDownLoadSubPackageById.GetConfig(e);
  }
  GetDownLoadVersionByVersion(e) {
    return DownLoadVersionByVersion_1.configDownLoadVersionByVersion.GetConfig(e);
  }
  GetDownLoadVersionByType(e) {
    return DownLoadVersionByType_1.configDownLoadVersionByType.GetConfigList(e);
  }
  GetDownLoadSubPackageList() {
    return DownLoadSubPackageAll_1.configDownLoadSubPackageAll.GetConfigList();
  }
  GetDownLoadSubPackageListByVersion(e) {
    return DownLoadSubPackageByVersion_1.configDownLoadSubPackageByVersion.GetConfigList(e);
  }
  GetVideoDataByBranch(e) {
    return VideoDataByBelongBranch_1.configVideoDataByBelongBranch.GetConfigList(e);
  }
}
exports.SubPackageConfig = SubPackageConfig;
//# sourceMappingURL=SubPackageConfig.js.map