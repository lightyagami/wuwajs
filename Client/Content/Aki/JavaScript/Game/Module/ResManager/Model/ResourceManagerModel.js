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
    this.CBm = new Map();
    this.pBm = new Set();
    this.vBm = [];
    this.dFm = new Map();
    this.QuestsRefBlocks = new Map();
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
      this.CBm.set(o.BlockId, o.PakName);
    }
    e = QuestRefMapBlockConfigAll_1.configQuestRefMapBlockConfigAll.GetConfigList(false);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("QuestResource", 70, "找不到任务地块引用配置");
      }
      return false;
    }
    for (const t of e) {
      this.QuestsRefBlocks.set(t.QuestId, t.MapBlockId);
    }
    return true;
  }
  FillLoginInfo(e, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 70, "填充登录资源信息", ["quests", e], ["sceneInfos", o]);
    }
    this.pBm.clear();
    e.forEach(e => this.pBm.add(e));
    this.vBm.length = 0;
    this.vBm.push(...o);
  }
  get LoginSceneInfos() {
    return this.vBm;
  }
  get MapBlockIdToPackName() {
    return this.CBm;
  }
  get LoginQuests() {
    return this.pBm;
  }
  SetBlockDownloadState(e, o) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("QuestResource", 70, `设置地块下载状态: ${e} => ${o}`);
    }
    this.dFm.set(e, o);
  }
  GetBlockDownloadState(e) {
    if (this.dFm.has(e)) {
      return this.dFm.get(e);
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