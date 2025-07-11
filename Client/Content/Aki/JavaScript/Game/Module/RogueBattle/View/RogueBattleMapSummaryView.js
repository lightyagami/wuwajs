"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueBattleMapSummaryView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonTabComponentData_1 = require("../../Common/TabComponent/CommonTabComponentData");
const CommonTabData_1 = require("../../Common/TabComponent/CommonTabData");
const CommonTabTitleData_1 = require("../../Common/TabComponent/CommonTabTitleData");
const TabComponentWithCaptionItem_1 = require("../../Common/TabComponent/TabComponentWithCaptionItem");
const CommonTabItem_1 = require("../../Common/TabComponent/TabItem/CommonTabItem");
const TabViewComponent_1 = require("../../Common/TabComponent/TabViewComponent");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
class RogueBattleMapSummaryView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.TabComponent = undefined;
    this.TabViewComponent = undefined;
    this.L6e = undefined;
    this.TabDataList = [];
    this.rmo = undefined;
    this.dmo = undefined;
    this.TIc = () => {
      this.CloseMe();
    };
    this.yqe = e => {
      e = this.TabDataList[e];
      return new CommonTabData_1.CommonTabData(e.Icon, new CommonTabTitleData_1.CommonTabTitleData(e.TabName));
    };
    this.CanToggleChange = e => {
      var t;
      return !!Info_1.Info.IsInGamepad() || (t = CommonParamById_1.configCommonParamById.GetIntConfig("panel_interval_time"), !this.L6e) || Time_1.Time.Now - this.L6e >= t;
    };
    this.R6e = (e, t) => {
      return new CommonTabItem_1.CommonTabItem();
    };
    this.pqe = e => {
      this.L6e = Time_1.Time.Now;
      var t = this.TabDataList[e];
      var i = t.ChildViewName;
      this.RE1(i === "RogueBattleMapSummaryTeamTabView");
      this.eR1(i === "RogueBattleSummaryTokenTabView");
      var e = this.TabComponent.GetTabItemByIndex(e);
      this.TabViewComponent.ToggleCallBack(t, i, e);
      this.rmo = i;
    };
    this.RE1 = e => {
      this.dmo?.Model?.CheckGetComponent(0)?.SetVisible(e);
      this.GetItem(4)?.SetUIActive(!e);
    };
    this.eR1 = e => {
      if (e) {
        e = ModelManager_1.ModelManager.RogueBattleModel.GetTokenData().length === 0;
        this.GetItem(2)?.SetUIActive(e);
        this.GetItem(5)?.SetUIActive(!e);
      } else {
        this.GetItem(2)?.SetUIActive(false);
        this.GetItem(5)?.SetUIActive(false);
      }
    };
    this.Zb1 = () => {
      for (let e = 0; e < this.TabDataList.length; e++) {
        if (this.TabDataList[e].ChildViewName === "RogueBattleMapSummaryFettersTabView") {
          this.TabComponent.SelectToggleByIndex(e);
          break;
        }
      }
    };
    this.wIc = e => {
      ModelManager_1.ModelManager.RogueBattleModel.ChangeDescMode();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIExtendToggle], [4, UE.UIItem], [5, UE.UIItem]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RogueResMapSummaryTeamToBondUpdate, this.Zb1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RogueResMapSummaryTeamToBondUpdate, this.Zb1);
  }
  OnStart() {
    var e;
    this.dmo = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
    this.dmo?.Model?.CheckGetComponent(0)?.SetVisible(false);
    this.dmo?.Model?.CheckGetComponent(3)?.SetLoadingOpen(false);
    this.InitTabComponent();
    if (this.OpenParam !== undefined) {
      e = this.OpenParam;
      this.rmo = e.TabName;
      ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond = e.FetterId ?? 0;
      if (e.FetterId && e.FetterId > 0) {
        ModelManager_1.ModelManager.RogueBattleModel.IsMapSummaryBondJumping = true;
      }
    } else {
      ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond = 0;
    }
    this.InitExtendToggle();
  }
  async OnBeforeShowAsyncImplementImplement() {
    await this.RIc();
  }
  OnBeforeDestroy() {
    if (this.TabComponent) {
      this.TabComponent.Destroy();
      this.TabComponent = undefined;
    }
  }
  OnHandleLoadScene() {
    this.dmo ||= UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
    this.dmo.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
    if (this.rmo === "RogueBattleMapSummaryTeamTabView") {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RogueResMapSummaryTeamShowAgain);
    }
  }
  OnHandleReleaseScene() {
    UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.dmo);
    this.dmo = undefined;
  }
  InitTabComponent() {
    var e = new CommonTabComponentData_1.CommonTabComponentData(this.R6e, this.pqe, this.yqe);
    this.TabComponent = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(this.GetItem(0), e, this.TIc);
    this.TabComponent.SetHelpButtonShowState(false);
    this.L6e = undefined;
    this.TabComponent.SetCanChange(this.CanToggleChange);
    this.TabViewComponent = new TabViewComponent_1.TabViewComponent(this.GetItem(1));
  }
  async RIc() {
    var e = ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList("RogueBattleMapSummaryView");
    var t = this.TabDataList.toString() !== e.toString();
    this.TabDataList = e;
    var e = this.TabDataList.length;
    var e = this.TabComponent.CreateTabItemDataByLength(e);
    await this.TabComponent.RefreshTabItemAsync(e, t);
    if (t) {
      let t = 0;
      for (let e = 0; e < this.TabDataList.length; e++) {
        if (this.TabDataList[e].ChildViewName === this.rmo) {
          t = e;
          break;
        }
      }
      this.TabComponent.SelectToggleByIndex(t, true);
    }
  }
  InitExtendToggle() {
    var e = this.GetExtendToggle(3);
    var t = ModelManager_1.ModelManager.RogueBattleModel.DescMode === 1 ? 0 : 1;
    e?.SetToggleState(t);
    e?.OnStateChange.Add(this.wIc);
  }
}
exports.RogueBattleMapSummaryView = RogueBattleMapSummaryView;
//# sourceMappingURL=RogueBattleMapSummaryView.js.map