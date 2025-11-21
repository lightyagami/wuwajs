"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsHandbookView = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../../Common/TabComponent/TabItem/CommonTabItem");
const TabViewComponent_1 = require("../../../Common/TabComponent/TabViewComponent");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const SurvivorsActivityController_1 = require("../../Activity/SurvivorsActivityController");
const tabIndexMap = {
  [0]: "SurvivorsItemTabView",
  2: "SurvivorsRoleTabView",
  1: "SurvivorsWeaponTabView"
};
class SurvivorsHandbookView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dmo = undefined;
    this.lqe = undefined;
    this.yvt = [];
    this.Tvt = undefined;
    this.rGd = undefined;
    this.UOt = true;
    this.fqe = (e, o) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.pqe = e => {
      var o = this.yvt[e];
      var t = o.ChildViewName;
      var e = this.lqe.GetTabItemByIndex(e);
      this.Tvt?.ToggleCallBack(o, t, e, this.rGd);
      this.rGd &&= undefined;
    };
    this.yqe = e => {
      e = this.yvt[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.Awe = () => {
      this.CloseMe();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
    this.BtnBindInfo = [];
  }
  async OnBeforeStartAsync() {
    this.dmo = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
    this.dmo.Model?.CheckGetComponent(3)?.SetLoadingOpen(false);
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.fqe, this.pqe, this.yqe);
    this.lqe = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(1), e, this.Awe);
    this.lqe.SetHelpButtonShowState(false);
    await this.oGd();
    this.Gvt();
  }
  OnBeforeShow() {
    if (this.UOt) {
      this.T6d();
      var o = this.OpenParam;
      let e = 0;
      if (o) {
        const t = tabIndexMap[o.SelectTabType];
        if (t !== undefined && (e = this.yvt.findIndex(e => e.ChildViewName === t)) === -1) {
          e = 0;
        }
        this.rGd = o.SelectCfgId;
      }
      this.lqe?.SelectToggleByIndex(e, true);
      this.UOt = false;
    }
    SurvivorsActivityController_1.SurvivorsActivityController.CheckIsActivityClose();
  }
  T6d() {
    this.dmo.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
    ControllerHolder_1.ControllerHolder.RoleController.PlayRoleMontage(3, false);
  }
  async oGd() {
    this.yvt = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("SurvivorsHandbookView");
    await this.lqe.RefreshTabItemByLengthAsync(this.yvt.length);
  }
  Gvt() {
    this.Tvt = new TabViewComponent_1.TabViewComponent(this.GetItem(0));
  }
  OnBeforeDestroy() {
    ModelManager_1.ModelManager.SurvivorsRogueModel.SaveCacheHandbookClickedMap();
    if (this.dmo) {
      UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.dmo);
      this.dmo = undefined;
    }
    if (this.lqe) {
      this.lqe.Destroy();
      this.lqe = undefined;
    }
  }
  OnAfterDestroy() {
    if (this.dmo) {
      UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.dmo);
      this.dmo = undefined;
    }
  }
}
exports.SurvivorsHandbookView = SurvivorsHandbookView;
//# sourceMappingURL=SurvivorsHandbookView.js.map