"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySkinTabViewModel = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const FlySkinDefine_1 = require("./FlySkinDefine");
const FlySkinGridData_1 = require("./FlySkinGridData");
class FlySkinTabViewModel {
  constructor() {
    this.RoleDataId = 0;
    this.SelectedTab = undefined;
    this.SelectedFlySkinType = 1;
    this.SelectedGridIndex = -1;
    this.SelectedFlySkinId = -1;
    this.SelectedFlySkinConfig = undefined;
    this.SelectedGridData = undefined;
    this.GridDataList = [];
    this.SkinIdToGridIndexMap = new Map();
    this.GetWayDataList = undefined;
    this.UiShowState = true;
    this.IsApplyToAll = false;
    this.ModelCase = "";
  }
  SelectTab(i) {
    this.SelectedTab = i;
    this.SelectedFlySkinType = FlySkinDefine_1.flySkinTabToType[i];
    this.ModelCase = FlySkinDefine_1.flySkinTypeToCase[this.SelectedFlySkinType];
    this.SelectedGridIndex = -1;
    this.UpdateGridData();
  }
  UpdateGridData() {
    this.GridDataList.length = 0;
    this.SkinIdToGridIndexMap.clear();
    var i = this.SelectedFlySkinType;
    this.GridDataList.push(new FlySkinGridData_1.FlySkinGridData(0, this.RoleDataId, i));
    var t = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfigListByType(i);
    for (const e of t) {
      var s = new FlySkinGridData_1.FlySkinGridData(e.Id, this.RoleDataId, i, e);
      this.GridDataList.push(s);
    }
    this.GridDataList.sort((i, t) => i.SkinConfig === undefined ? -1 : t.SkinConfig === undefined ? 1 : i.GetIsLock() !== t.GetIsLock() ? i.GetIsLock() ? 1 : -1 : i.SkinConfig.SortIndex !== t.SkinConfig.SortIndex ? t.SkinConfig.SortIndex - i.SkinConfig.SortIndex : t.SkinId - i.SkinId);
    for (let i = 0; i < this.GridDataList.length; i++) {
      this.SkinIdToGridIndexMap.set(this.GridDataList[i].SkinId, i);
    }
  }
  GetGridIndexBySkinId(i) {
    return this.SkinIdToGridIndexMap?.get(i);
  }
  SelectGridByIndex(i) {
    this.SelectedGridIndex = i;
    this.SelectedGridData = this.GridDataList[i];
    this.SelectedFlySkinId = this.SelectedGridData.SkinId;
    this.SelectedFlySkinConfig = this.SelectedFlySkinId > 0 ? ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(this.SelectedFlySkinId) : undefined;
    this.UpdateGetWayDataList();
  }
  UpdateGetWayDataList() {
    this.GetWayDataList = [];
    if (this.SelectedFlySkinConfig) {
      for (const t of this.SelectedFlySkinConfig.ItemAccess) {
        var i = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(t);
        if (i) {
          i = {
            Id: t,
            ConfigId: this.SelectedFlySkinId,
            Type: i?.Type,
            Text: i.Description,
            SortIndex: i.SortIndex
          };
          this.GetWayDataList.push(i);
        }
      }
      this.GetWayDataList.sort((i, t) => {
        var s = i.SortIndex;
        var e = t.SortIndex;
        if (s === e) {
          return t.Id - i.Id;
        } else {
          return e - s;
        }
      });
    }
  }
  SetUiShowState(i) {
    this.UiShowState = i;
  }
  SetIsApplyToAll(i) {
    this.IsApplyToAll = i;
  }
  ResetSelectedTab() {
    this.SelectedTab = undefined;
    this.SelectedGridIndex = -1;
  }
}
exports.FlySkinTabViewModel = FlySkinTabViewModel;
//# sourceMappingURL=FlySkinTabViewModel.js.map