"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceManagerModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const MapBlockInfoAll_1 = require("../../../../Core/Define/ConfigQuery/MapBlockInfoAll");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const QuestRefMapBlockConfigAll_1 = require("../../../../Core/Define/ConfigQuery/QuestRefMapBlockConfigAll");
class ResourceManagerModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.bMm = new Map();
    this.RMm = new Set();
    this.wMm = [];
    this.XTm = new Map();
    this.RefBlockQuests = new Set();
    this.BlockNeedReOpenMap = new Set();
  }
  OnInit() {
    var e = MapBlockInfoAll_1.configMapBlockInfoAll.GetConfigList(false);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("QuestResource", 70, "找不到地块配置");
      }
      return false;
    }
    for (const o of e) {
      this.bMm.set(o.BlockId, o.PakName);
    }
    e = QuestRefMapBlockConfigAll_1.configQuestRefMapBlockConfigAll.GetConfigList(false);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("QuestResource", 70, "找不到任务地块引用配置");
      }
      return false;
    }
    for (const t of e) {
      this.RefBlockQuests.add(t.QuestId);
    }
    return true;
  }
  FillLoginInfo(e, o) {
    this.RMm.clear();
    e.forEach(e => this.RMm.add(e));
    this.wMm.length = 0;
    this.wMm.push(...o);
  }
  get LoginSceneInfos() {
    return this.wMm;
  }
  get MapBlockIdToPackName() {
    return this.bMm;
  }
  get LoginQuests() {
    return this.RMm;
  }
  SetBlockDownloadState(e, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 70, `设置地块下载状态: ${e} => ${o}`);
    }
    this.XTm.set(e, o);
  }
  GetBlockDownloadState(e) {
    if (this.XTm.has(e)) {
      return this.XTm.get(e);
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("QuestResource", 70, "未知或未分包的地块ID: " + e);
      }
      return true;
    }
  }
  OnClear() {
    return true;
  }
  OnLeaveLevel() {
    return true;
  }
  OnChangeMode() {
    return true;
  }
}
exports.ResourceManagerModel = ResourceManagerModel;
//# sourceMappingURL=ResourceManagerModel.js.map