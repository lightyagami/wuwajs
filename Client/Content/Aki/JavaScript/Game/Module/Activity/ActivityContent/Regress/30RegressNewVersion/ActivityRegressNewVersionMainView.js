"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityRegressNewVersionMainView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../../../Core/Common/Info");
const Time_1 = require("../../../../../../Core/Common/Time");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
const CommonTabComponentData_1 = require("../../../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../../../Common/TabComponent/CommonTabTitleData");
const CommonTabItemBase_1 = require("../../../../Common/TabComponent/TabItem/CommonTabItemBase");
const ActivityRegressMainCaptionListPanel_1 = require("../Panels/ActivityRegressMainCaptionListPanel");
const ActivityRegressTabItemPanel_1 = require("../Panels/ActivityRegressTabItemPanel");
const ActivityRegressNewVersionMainQuestView_1 = require("./ActivityRegressNewVersionMainQuestView");
const ActivityRegressNewVersionRoleView_1 = require("./ActivityRegressNewVersionRoleView");
const TAB_CD = 600;
class ActivityRegressNewVersionMainView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this._da = new Map();
    this.uda = undefined;
    this.z3f = [];
    this.cda = undefined;
    this.jdi = (e, i) => {
      return new ActivityRegressTabItemPanel_1.ActivityRegressTabItemPanel();
    };
    this.zno = e => {
      this.L6e = Time_1.Time.Now;
      this.mda(this.z3f[e]);
    };
    this.yqe = e => {
      var e = this.z3f[e];
      var i = this.J3f(e) ?? "";
      var e = this.Z3f(e);
      var e = e !== undefined ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e) : "";
      return new CommonTabData_1.CommonTabData(e, new CommonTabTitleData_1.CommonTabTitleData(i));
    };
    this.L6e = 0;
    this.CanToggleChange = e => {
      var i;
      return !!Info_1.Info.IsInGamepad() || (i = TAB_CD, !this.L6e) || Time_1.Time.Now - this.L6e >= i;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UITexture], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    await this.sso();
    this.cda.SelectToggleByIndex(e ?? 0, true);
    this.cda.SetPnlListUiActive(true);
    this.cda.BindCanExecuteChange(this.CanToggleChange);
  }
  OnStart() {
    this.GetItem(4).SetUIActive(false);
  }
  async sso() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.jdi, this.zno, this.yqe);
    this.cda = new ActivityRegressMainCaptionListPanel_1.ActivityRegressMainCaptionListPanel();
    var i = this.GetItem(0).GetOwner();
    this.cda.Init(e);
    await this.cda.CreateThenShowByActorAsync(i);
    await this.Tfa();
    this.cda.BindTabTitleCallBack(() => {
      UiManager_1.UiManager.CloseView("ActivityRegressNewVersionMainView");
    });
  }
  async Tfa() {
    if (ModelManager_1.ModelManager.ActivityRegressModel.GetGachaPoolUpPool()?.length > 0) {
      this.z3f.push(0);
    }
    this.z3f.push(1);
    var i = new Array();
    for (let e = 0; e < this.z3f.length; e++) {
      var t = new CommonTabItemBase_1.CommonTabItemData();
      t.Index = e;
      t.Data = this.cda.GetTabComponentData(e);
      i.push(t);
    }
    await this.cda.RefreshTabItemByDataAsync(i);
  }
  async mda(e, i = 0) {
    if (e !== this.uda) {
      if (this.uda !== undefined) {
        await this.pda(this.uda);
      }
      await this.gda(e, i);
      this.uda = e;
      this.qEi();
    }
  }
  qEi() {
    var e = this.J3f(this.uda) ?? "";
    var i = this.Z3f(this.uda) ?? "";
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.cda.UpdateTitle(i, new CommonTabTitleData_1.CommonTabTitleData(e));
  }
  async gda(i, e) {
    if (!this._da.has(i)) {
      await this.vda(i).then(e => {
        if (e) {
          this._da.set(i, e);
        }
      });
    }
    await this._da.get(i).ShowAsync();
  }
  async vda(e) {
    let i = undefined;
    var t = this.GetItem(2);
    switch (e) {
      case 0:
        await (i = new ActivityRegressNewVersionRoleView_1.ActivityRegressNewVersionRoleView()).CreateThenShowByResourceIdAsync("UiItem_InvocationGuide", t);
        break;
      case 1:
        await (i = new ActivityRegressNewVersionMainQuestView_1.ActivityRegressNewVersionMainQuestView()).CreateThenShowByResourceIdAsync("UiItem_MissionGuide", t);
    }
    return i;
  }
  async pda(e) {
    if (this._da.has(e)) {
      await this._da.get(e).HideAsync();
    }
  }
  J3f(e) {
    switch (e) {
      case 0:
        return "Regress_NewVersion_Role_Title";
      case 1:
        return "Regress_NewVersion_MainLine_Title";
    }
  }
  Z3f(e) {
    switch (e) {
      case 0:
        return "SP_IconComDrawcard";
      case 1:
        return "SP_FuncIconRenwu";
    }
  }
}
exports.ActivityRegressNewVersionMainView = ActivityRegressNewVersionMainView;
//# sourceMappingURL=ActivityRegressNewVersionMainView.js.map