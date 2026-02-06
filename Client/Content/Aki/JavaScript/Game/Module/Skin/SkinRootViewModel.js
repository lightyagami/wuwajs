"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkinRootViewModel = undefined;
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiCameraInputComponent_1 = require("../Common/UiCamera/UiCameraInputComponent");
const SkinViewModelBase_1 = require("./SkinViewModelBase");
const CalabashSkinDefine_1 = require("./Tab/Calabash/CalabashSkinDefine");
class SkinRootViewModel extends SkinViewModelBase_1.ViewModelBase {
  constructor() {
    super();
    this.O9m = undefined;
    this.Til = 0;
    this.JGi = 0;
    this.G9m = undefined;
    this.F9m = false;
    this.N9m = new Map([["RoleSkinTabView", 146], ["CalabashSkinTabView", CalabashSkinDefine_1.CALABASH_SKIN_HELP_ID]]);
    this.TsUiSceneRoleActor = undefined;
    this.CameraInputComponent = new UiCameraInputComponent_1.UiCameraInputComponent();
    this.DataMap.set(0, undefined);
    this.DataMap.set(1, true);
    this.DataMap.set(2, true);
    this.DataMap.set(3, true);
    this.DataMap.set(4, undefined);
  }
  get ViewData() {
    return this.O9m;
  }
  get RoleId() {
    return this.JGi;
  }
  get WeaponIncId() {
    return this.Til;
  }
  get NeedLoadRole() {
    return this.F9m;
  }
  SetCurSelectTabViewName(e, t) {
    this.SetData(0, e, t);
  }
  GetCurSelectTabViewName() {
    return this.GetData(0);
  }
  SetRootUiVisible(e, t) {
    this.SetData(1, e, t);
  }
  GetRootUiVisible() {
    return this.GetData(1);
  }
  SetMoveGamepadKeyTipActive(e, t) {
    this.SetData(2, e, t);
  }
  GetMoveGamepadKeyTipActive() {
    return this.GetData(2);
  }
  SetModelState(e, t) {
    if (this.GetModelState() !== e) {
      this.SetData(4, e, t);
    }
  }
  GetModelState() {
    return this.GetData(4);
  }
  NotifyGamePadKeyTipRefresh() {
    this.SetData(3, true);
  }
  Init(e) {
    this.O9m = e;
    this.JGi = e.RoleId;
    this.Til = e.WeaponId;
    this.F9m = e.NeedLoadRole;
    this.SetCurSelectTabViewName(e.TabViewName, true);
  }
  SetGetDragItemFunc(e) {
    this.G9m = e;
  }
  GetDragItem() {
    return this.G9m?.();
  }
  get IsMainRole() {
    return ModelManager_1.ModelManager.RoleModel.IsMainRole(this.JGi);
  }
  IsShowHelpBtn(e) {
    return this.N9m.has(e);
  }
  GetHelpId(e) {
    return this.N9m.get(e);
  }
  GetSkinSkipDataList(e, t) {
    var i = [];
    for (const n of t) {
      var a = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(n);
      if (a) {
        a = {
          Id: n,
          ConfigId: e,
          Type: a?.Type,
          Text: a.Description,
          SortIndex: a.SortIndex
        };
        i.push(a);
      }
    }
    i.sort((e, t) => {
      var i = e.SortIndex;
      var a = t.SortIndex;
      if (i === a) {
        return t.Id - e.Id;
      } else {
        return a - i;
      }
    });
    return i;
  }
  SetCaptionItemActive(e) {
    if (e) {
      this.SetRootUiVisible(true);
    } else {
      this.SetRootUiVisible(false);
    }
  }
  GetTabRedDotName(e) {
    if (e === "FlySkinTabView") {
      return "FlySkinTab";
    } else if (e === "CalabashSkinTabView") {
      return "HuluSkinTab";
    } else {
      return undefined;
    }
  }
}
exports.SkinRootViewModel = SkinRootViewModel;
//# sourceMappingURL=SkinRootViewModel.js.map