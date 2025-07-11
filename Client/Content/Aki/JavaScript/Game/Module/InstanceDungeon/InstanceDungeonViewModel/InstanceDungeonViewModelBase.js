"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InstanceDungeonViewModelBase = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const InstanceDungeonMapDefine_1 = require("../Define/InstanceDungeonMapDefine");
class InstanceDungeonViewModelBase {
  constructor() {
    this.View = undefined;
    this.EntranceId = 0;
    this.InstanceIdList = [];
    this.InstanceByTitleMap = new Map();
    this.aH_ = undefined;
    this.RankItemModel = undefined;
    this.EntranceId = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
    this.Onc();
    this.Jfc();
  }
  Onc() {
    this.InstanceByTitleMap = this.GetInstanceByTitleMap();
    for (var [, e] of this.InstanceByTitleMap) {
      for (const t of e) {
        this.InstanceIdList.push(t);
      }
    }
  }
  Jfc() {
    var e = ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(this.EntranceId).FlowId;
    this.aH_ = InstanceDungeonMapDefine_1.instanceDungeonEntranceViewGetterDataMap[e];
  }
  RegisterView(e) {
    this.View = e;
  }
  async RequestServerData() {
    await this.OnRequestServerData();
  }
  SortInstanceArray(e) {
    this.OnSortInstanceArray(e);
  }
  GetInstanceItemTextureBg(e) {
    return this.OnGetInstanceItemTextureBg(e);
  }
  CheckInstanceUnlock(e) {
    return this.OnCheckInstanceUnlock(e);
  }
  GetUnlockConditionTextId(e) {
    return this.OnGetUnlockConditionTextId(e);
  }
  IsFinishInstance(e) {
    return this.OnIsFinishInstance(e);
  }
  GetInstanceDetectItemIcon(e) {
    return this.OnGetInstanceDetectItemIcon(e);
  }
  GetDefaultSelectData() {
    return this.OnGetDefaultSelectData();
  }
  CheckNeedOnTimer(e) {
    return this.OnCheckNeedOnTimer(e);
  }
  TimerRefreshFunction(e) {
    this.OnTimerRefreshFunction(e);
  }
  CheckInstanceItemHasRedDot(e) {
    return this.OnCheckInstanceHasRedDot(e);
  }
  OnSortInstanceArray(e) {}
  OnGetInstanceItemTextureBg(e) {
    return "T_TogListNor";
  }
  GetInstanceByTitleMap() {
    var t;
    var n;
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetSortedByTitleEntranceInstanceIdList(this.EntranceId);
    var r = new Map();
    for ([t, n] of e) {
      let e = r.get(n);
      if (!e) {
        e = [];
        r.set(n, e);
      }
      e.push(t);
    }
    return r;
  }
  OnCheckInstanceUnlock(e) {
    return ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(e);
  }
  OnGetUnlockConditionTextId(e) {
    e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetUnlockConditionGroupHintText(e);
    if (e) {
      return new LguiUtil_1.TableTextArgNew(e);
    }
  }
  OnIsFinishInstance(e) {
    return ModelManager_1.ModelManager.ExchangeRewardModel.IsFinishInstance(e);
  }
  OnGetInstanceDetectItemIcon(e) {
    return ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).DifficultyIcon;
  }
  OnGetDefaultSelectData() {
    if (this.InstanceByTitleMap && this.aH_?.DefaultSelectDataGetter) {
      return this.aH_.DefaultSelectDataGetter(this.InstanceByTitleMap);
    }
  }
  OnCheckNeedOnTimer(e) {
    return false;
  }
  OnTimerRefreshFunction(e) {}
  OnCheckInstanceHasRedDot(e) {
    return false;
  }
  async OnRequestServerData() {}
}
exports.InstanceDungeonViewModelBase = InstanceDungeonViewModelBase;
//# sourceMappingURL=InstanceDungeonViewModelBase.js.map