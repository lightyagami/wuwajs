"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashSkinViewProxy = undefined;
const UE = require("ue");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SkinViewModelBase_1 = require("../../SkinViewModelBase");
const CalabashSkinData_1 = require("./CalabashSkinData");
const CalabashSkinDefine_1 = require("./CalabashSkinDefine");
class CalabashSkinViewProxy extends SkinViewModelBase_1.ViewModelBase {
  constructor() {
    super();
    this.W9m = false;
    this.Q9m = 0;
    this.K9m = CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID;
    this.X9m = CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID;
    this.G9m = undefined;
    this.NeedLoadModel = false;
    this.CalabashGridItemCanExecuteChange = e => {
      e = e.SkinId;
      return this.GetSelectedSkinId() !== e;
    };
    this.DataMap.set(0, []);
    this.DataMap.set(1, CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID);
    this.DataMap.set(2, CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID);
  }
  get NeedStopRotate() {
    return this.W9m;
  }
  get FailRequestCd() {
    return this.Q9m;
  }
  Init(e) {
    this.X9m = e.CalabashSkinId ?? CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID;
    this.Q9m = ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinFailRequestCd();
    this.W9m = ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinNeedStopRotate();
    this.InitSkinDataList();
    this.InitGridSelected();
  }
  GetSkinDataList() {
    return this.GetData(0);
  }
  GetSkinDataByIndex(e) {
    return this.GetSkinDataList()[e];
  }
  GetSkinDataBySkinId(e) {
    e = this.GetDataIndexBySkinId(e);
    return this.GetSkinDataByIndex(e);
  }
  SetEquipSkinId(e, a) {
    this.K9m = this.GetEquipSkinId();
    this.SetData(1, e, a);
  }
  GetEquipSkinId() {
    return this.GetData(1);
  }
  SetSelectedSkinId(e, a) {
    this.SetData(2, e, a);
  }
  GetSelectedSkinId() {
    return this.GetData(2);
  }
  SetGetDragItemFunc(e) {
    this.G9m = e;
  }
  get PrevEquipSkinId() {
    return this.K9m;
  }
  GetDragItem() {
    return this.G9m?.();
  }
  GBd(e) {
    return new CalabashSkinData_1.CalabashSkinData(e);
  }
  GetDataIndexBySkinId(a) {
    var e = this.GetSkinDataList().findIndex(e => e.SkinId === a);
    if (e < 0) {
      return 0;
    } else {
      return e;
    }
  }
  GetCalabashSkinTabCameraInputData() {
    var e = ConfigManager_1.ConfigManager.UiRoleCameraConfig.GetRoleCameraConfig(CalabashSkinDefine_1.CALABASH_CONFIG_TAG);
    var a = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName(CalabashSkinDefine_1.DEFAULT_CALABASH_SKIN_CASE), 1).D_K2_GetActorLocation();
    return {
      DragComponent: this.GetDragItem(),
      CameraSettingConfig: e,
      SourceLocation: a
    };
  }
  InitGridSelected() {
    if (this.X9m !== CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID) {
      this.SetSelectedSkinId(this.X9m);
    } else {
      this.SetSelectedSkinId(ModelManager_1.ModelManager.CalabashSkinModel.GetCurrentEquipSkinId());
    }
    var e = ModelManager_1.ModelManager.CalabashSkinModel.GetCurrentEquipSkinId();
    this.K9m = e;
    this.SetEquipSkinId(e);
  }
  InitSkinDataList() {
    var e = ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfigList();
    const a = this.GBd(CalabashSkinDefine_1.CALABASH_SKIN_DEFAULT_ID);
    var i = this.GetSkinDataList();
    i.push(a);
    for (const r of e) {
      var t = ConfigManager_1.ConfigManager.SkinConfig.GetCalabashSkinConfig(r.Id);
      if (t) {
        var n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.Id);
        if (!(n <= 0) || t.ShowWhenLocked) {
          const a = this.GBd(r.Id);
          i.push(a);
        }
      }
    }
    i.sort((e, a) => {
      var i;
      if (e.IsEmptyData !== a.IsEmptyData) {
        if (e.IsEmptyData) {
          return -1;
        } else {
          return 1;
        }
      } else if ((i = e.GetIsLock()) !== a.GetIsLock()) {
        if (i) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return a.SortIndex - e.SortIndex;
      }
    });
  }
}
exports.CalabashSkinViewProxy = CalabashSkinViewProxy;
//# sourceMappingURL=CalabashSkinViewProxy.js.map