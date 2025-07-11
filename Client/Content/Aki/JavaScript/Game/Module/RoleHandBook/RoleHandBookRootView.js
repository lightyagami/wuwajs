"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleHandBookRootView = undefined;
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const DynamicTabCamera_1 = require("../DynamicTab/DynamicTabCamera");
const RoleRootView_1 = require("../RoleUi/RoleRootView");
const UiCameraAnimationManager_1 = require("../UiCameraAnimation/UiCameraAnimationManager");
class RoleHandBookRootView extends RoleRootView_1.RoleRootView {
  constructor() {
    super(...arguments);
    this.qlo = "";
    this.Glo = true;
  }
  OnCheckIfNeedScene() {
    return this.Glo;
  }
  OnHandleLoadScene() {
    var e = DynamicTabCamera_1.DynamicTabCamera.GetUiCameraHandleName("RoleHandBookPreviewView");
    this.RoleRootUiCameraHandleData = UiCameraAnimationManager_1.UiCameraAnimationManager.PushCameraHandleByHandleName(e, false, false);
  }
  OnHandleReleaseScene() {
    UiCameraAnimationManager_1.UiCameraAnimationManager.PopCameraHandle(this.RoleRootUiCameraHandleData);
  }
  OnBeforeCreate() {
    this.qlo = this.OpenParam;
    this.Glo = this.qlo !== "RoleHandBookSelectionView";
  }
  InitRoleIdList() {
    ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.RoleConfig.GetRoleListByType(1)).sort((e, i) => e.Id - i.Id);
  }
  UpdateSelectRoleInstance() {}
  OnAfterShow() {
    this.TabViewComponent.SetCurrentTabViewState(true);
  }
  RebuildTabItem() {
    this.TabDataList = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("RoleHandBookRootView");
    var e = this.TabDataList.length;
    this.TabComponent.RefreshTabItemByLength(e);
  }
  OnStart() {
    this.InitTabComponent();
    this.GetButton(1).GetRootComponent().SetUIActive(false);
    this.GetItem(3).SetUIActive(false);
    if (this.Glo) {
      this.UpdateSelectRoleInstance();
    }
    this.TabComponent.SelectToggleByIndex(0, true);
    this.LoadFloorEffect();
  }
  LoadFloorEffect() {
    if (this.Glo) {
      super.LoadFloorEffect();
    }
  }
  OnBeforeDestroy() {
    this.ClearData();
  }
  OnAfterHide() {
    this.TabViewComponent.SetCurrentTabViewState(false);
  }
}
exports.RoleHandBookRootView = RoleHandBookRootView;
//# sourceMappingURL=RoleHandBookRootView.js.map