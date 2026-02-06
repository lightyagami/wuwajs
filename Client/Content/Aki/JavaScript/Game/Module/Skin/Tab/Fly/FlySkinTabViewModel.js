"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySkinTabViewModel = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const SkinViewModelBase_1 = require("../../SkinViewModelBase");
const FlySkinDefine_1 = require("./FlySkinDefine");
const FlySkinGridData_1 = require("./FlySkinGridData");
class FlySkinTabViewModel extends SkinViewModelBase_1.ViewModelBase {
  constructor() {
    super();
    this._Br = 0;
    this.z9m = 1;
    this.J9m = -1;
    this.Z9m = undefined;
    this.ejm = undefined;
    this.tjm = new Map();
    this.ijm = undefined;
    this.rjm = "";
    this.UiShowState = true;
    this.IsApplyToAll = false;
    this.DataMap.set(0, []);
    this.DataMap.set(1, undefined);
    this.DataMap.set(2, -1);
  }
  get RoleDataId() {
    return this._Br;
  }
  get SelectedFlySkinType() {
    return this.z9m;
  }
  get SelectedFlySkinId() {
    return this.J9m;
  }
  get SelectedGridData() {
    return this.ejm;
  }
  get GetWayDataList() {
    return this.ijm;
  }
  get ModelCase() {
    return this.rjm;
  }
  GetGridDataList() {
    return this.GetData(0);
  }
  SetSelectedTab(t, e) {
    this.SetData(1, t, e);
  }
  GetSelectedTab() {
    return this.GetData(1);
  }
  SetSelectedGridIndex(t, e) {
    this.SetData(2, t, e);
  }
  GetSelectedGridIndex() {
    return this.GetData(2);
  }
  Init(t) {
    this._Br = t.RoleId;
    this.J9m = t.FlySkinId ?? -1;
    t = t.FlySkinTab ?? 0;
    this.SetSelectedTab(t);
  }
  SelectTab(t) {
    this.z9m = FlySkinDefine_1.flySkinTabToType[t];
    this.rjm = FlySkinDefine_1.flySkinTypeToCase[this.z9m];
    this.SetSelectedGridIndex(-1, true);
    this.UpdateGridData();
    this.SetSelectedTab(t);
  }
  UpdateGridData() {
    var e = this.GetGridDataList();
    e.length = 0;
    this.tjm.clear();
    var t = this.z9m;
    e.push(new FlySkinGridData_1.FlySkinGridData(0, this._Br, t));
    var i = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfigListByType(t);
    for (const r of i) {
      var s = new FlySkinGridData_1.FlySkinGridData(r.Id, this._Br, t, r);
      e.push(s);
    }
    e.sort((t, e) => t.SkinConfig === undefined ? -1 : e.SkinConfig === undefined ? 1 : t.GetIsLock() !== e.GetIsLock() ? t.GetIsLock() ? 1 : -1 : t.SkinConfig.SortIndex !== e.SkinConfig.SortIndex ? e.SkinConfig.SortIndex - t.SkinConfig.SortIndex : e.SkinId - t.SkinId);
    for (let t = 0; t < e.length; t++) {
      this.tjm.set(e[t].SkinId, t);
    }
    this.SetData(0, e);
  }
  GetGridIndexBySkinId(t) {
    return this.tjm?.get(t);
  }
  SelectGridByIndex(t) {
    this.ejm = this.GetGridDataList()[t];
    this.J9m = this.ejm.SkinId;
    this.Z9m = this.J9m > 0 ? ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(this.J9m) : undefined;
    this.UpdateGetWayDataList();
    this.SetSelectedGridIndex(t);
  }
  UpdateGetWayDataList() {
    this.ijm = [];
    if (this.Z9m) {
      for (const e of this.Z9m.ItemAccess) {
        var t = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(e);
        if (t) {
          t = {
            Id: e,
            ConfigId: this.SelectedFlySkinId,
            Type: t?.Type,
            Text: t.Description,
            SortIndex: t.SortIndex
          };
          this.ijm.push(t);
        }
      }
      this.ijm.sort((t, e) => {
        var i = t.SortIndex;
        var s = e.SortIndex;
        if (i === s) {
          return e.Id - t.Id;
        } else {
          return s - i;
        }
      });
    }
  }
  SetUiShowState(t) {
    this.UiShowState = t;
  }
  SetIsApplyToAll(t) {
    this.IsApplyToAll = t;
  }
  ResetSelectedTab() {
    this.SetSelectedTab(undefined);
    this.SetSelectedGridIndex(-1);
  }
  GetFlySkinTabCameraInputData(t) {
    var e = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig("翱翔滑翔皮肤旋转查看");
    var i = this.rjm;
    return {
      DragComponent: t,
      CameraSettingConfig: e,
      SourceLocation: UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(i), 1).D_K2_GetActorLocation()
    };
  }
}
exports.FlySkinTabViewModel = FlySkinTabViewModel;
//# sourceMappingURL=FlySkinTabViewModel.js.map