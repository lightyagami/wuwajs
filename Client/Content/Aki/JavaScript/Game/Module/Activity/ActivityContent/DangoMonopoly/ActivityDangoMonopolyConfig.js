"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityDangoMonopolyConfig = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const DangoMonopolyBoardByGroup_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyBoardByGroup");
const DangoMonopolyBoardById_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyBoardById");
const DangoMonopolyByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyByActivityId");
const DangoMonopolyGridByGroup_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyGridByGroup");
const DangoMonopolyGridById_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyGridById");
const DangoMonopolyMapPointByActivityId_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyMapPointByActivityId");
const DangoMonopolyPropertyById_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyPropertyById");
const DangoMonopolyTaskByGroup_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyTaskByGroup");
const DangoMonopolyTaskById_1 = require("../../../../../Core/Define/ConfigQuery/DangoMonopolyTaskById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class ActivityDangoMonopolyConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.QT1 = undefined;
    this.HR1 = false;
  }
  OnInit() {
    return true;
  }
  OnClear() {
    return true;
  }
  GetInfo(o) {
    return DangoMonopolyByActivityId_1.configDangoMonopolyByActivityId.GetConfig(o);
  }
  GetBoard(o) {
    return DangoMonopolyBoardById_1.configDangoMonopolyBoardById.GetConfig(o);
  }
  GetBoardList(o) {
    return DangoMonopolyBoardByGroup_1.configDangoMonopolyBoardByGroup.GetConfigList(o) ?? [];
  }
  GetTask(o) {
    return DangoMonopolyTaskById_1.configDangoMonopolyTaskById.GetConfig(o);
  }
  GetTaskList(o) {
    return DangoMonopolyTaskByGroup_1.configDangoMonopolyTaskByGroup.GetConfigList(o) ?? [];
  }
  GetGrid(o) {
    return DangoMonopolyGridById_1.configDangoMonopolyGridById.GetConfig(o);
  }
  GetGridList(o) {
    return DangoMonopolyGridByGroup_1.configDangoMonopolyGridByGroup.GetConfigList(o) ?? [];
  }
  GetProperty(o) {
    return DangoMonopolyPropertyById_1.configDangoMonopolyPropertyById.GetConfig(o);
  }
  GetGridPoint(o) {
    return DangoMonopolyMapPointByActivityId_1.configDangoMonopolyMapPointByActivityId.GetConfigList(o) ?? [];
  }
  GetBattleConfigPath() {
    return "/Game/Aki/Character/NPC/Tuanzi/CommonConfig/DangoGlobalConfig_Monopoly.DangoGlobalConfig_Monopoly";
  }
  GetActiveDangoAniInfo() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("DangoMonopolyActiveDangoAni") ?? [];
  }
  GetIsOpenHintShow() {
    if (this.QT1 === undefined) {
      this.QT1 = CommonParamById_1.configCommonParamById.GetBoolConfig("DangoMonopolyIsOpenHintShow") ?? false;
    }
    return this.QT1;
  }
  SetPushHintState(o) {
    this.HR1 = o;
  }
  GetIsPushHintShow() {
    return !!this.HR1 && !!this.GetIsOpenHintShow();
  }
  GetDangoMoveInTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("MonopolyDangoInTime") ?? 0;
  }
  GetDangoMoveOutTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("MonopolyDangoOutTime") ?? 0;
  }
  GetDangoMoveOutDelayTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("MonopolyDangoOutDelayTime") ?? 0;
  }
  GetDangoChangeCheckTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("MonopolyDangoChangeCheckTime") ?? 0;
  }
}
exports.ActivityDangoMonopolyConfig = ActivityDangoMonopolyConfig;
//# sourceMappingURL=ActivityDangoMonopolyConfig.js.map