"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivitySubViewRoleTrial = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const RoleController_1 = require("../../../RoleUi/RoleController");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivityRoleDescribeComponent_1 = require("../UniversalComponents/ActivityRoleDescribeComponent");
const ActivitySmallItemGrid_1 = require("../UniversalComponents/ActivitySmallItemGrid");
const ActivityDescriptionTypeB_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeB");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const ActivityRoleTrialController_1 = require("./ActivityRoleTrialController");
class ActivitySubViewRoleTrial extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.ActivityBaseData = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.j2e = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.tFe = undefined;
    this.CurrentRoleId = 0;
    this.iFe = undefined;
    this.oFe = i => {
      if (i === this.ActivityBaseData.Id) {
        i = this.ActivityBaseData.RoleIdList;
        this.tFe.RefreshByData(i, () => {
          this.rFe(this.CurrentRoleId);
          this.Ake(this.CurrentRoleId);
        });
      }
    };
    this.W2e = () => {
      return new ActivitySmallItemGrid_1.ActivitySmallItemGrid();
    };
    this.nFe = () => {
      var i = new RoleItem();
      i.ToggleCallBack = this.pqe;
      return i;
    };
    this.pqe = (i, t) => {
      var e = this.ActivityBaseData.RoleIdList.indexOf(this.CurrentRoleId);
      this.tFe.GetLayoutItemByIndex(e)?.SetToggleState(false);
      this.Ake(i);
      this.sFe();
    };
    this.X2e = () => {
      var i = ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(this.CurrentRoleId);
      var i = i?.TrialRoleId ? i.TrialRoleId : 0;
      var t = this.ActivityBaseData.RoleTrialIdList;
      RoleController_1.RoleController.OpenRoleMainView(1, i, t, undefined, () => {
        this.ActivityBaseData.SetRoleTrialState(2);
      });
    };
    this.aFe = () => {
      ActivityRoleTrialController_1.ActivityRoleTrialController.RequestRoleInstanceReward(this.CurrentRoleId);
    };
    this.hFe = () => {
      var i;
      if (RoleController_1.RoleController.IsInRoleTrial()) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleDungeonsLimit");
      } else if ((i = this.ActivityBaseData.GetInstanceIdByRoleId(this.CurrentRoleId)) !== undefined) {
        this.ActivityBaseData.SetRoleTrialState(3);
        ActivityRoleTrialController_1.ActivityRoleTrialController.EnterRoleTrialDungeonDirectly(i, this.ActivityBaseData.Id, this.CurrentRoleId).then(i => {
          if (!i) {
            this.ActivityBaseData.SetRoleTrialState(1);
          }
        });
      }
    };
    this.j41 = () => {
      var i = ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(this.CurrentRoleId);
      if (ModelManager_1.ModelManager.GachaModel.CheckGachaValidByGachaId(i.GachaId)) {
        ControllerHolder_1.ControllerHolder.GachaController.CloseAndOpenGachaView("CommonActivityView", i.GachaId);
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("ErrorCode_1400017_Text");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UITexture], [2, UE.UIHorizontalLayout], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIButtonComponent], [12, UE.UITexture], [13, UE.UITexture], [14, UE.UITexture], [15, UE.UITexture], [16, UE.UITexture], [17, UE.UITexture], [18, UE.UITexture], [19, UE.UIButtonComponent]];
    this.BtnBindInfo = [[6, this.X2e], [11, this.aFe], [19, this.j41]];
  }
  OnSetData() {}
  async OnBeforeStartAsync() {
    var i = this.GetItem(3);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(4);
    this.DNe = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB();
    await this.DNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(7);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await this.UNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(5);
    this.j2e = new ActivityRoleDescribeComponent_1.ActivityRoleDescribeComponent();
    await this.j2e.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(8);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
    this.tFe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(2), this.nFe);
    this.iFe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnStart() {
    var t = this.ActivityBaseData.LocalConfig;
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    this.LNe.SetSubTitleVisible(!StringUtils_1.StringUtils.IsEmpty(t?.DescTheme));
    if (t?.DescTheme) {
      this.LNe.SetSubTitleByTextId(t.DescTheme);
    }
    this.FNe();
    this.UNe.SetTitleByTextId("CollectActivity_reward");
    this.UNe.InitGridLayout(this.W2e);
    this.ANe.FunctionButton.SetFunction(this.hFe);
    var t = this.ActivityBaseData.RoleIdList;
    if (t.length !== 0) {
      let i = t[0];
      if (this.OpenParam !== undefined) {
        i = this.OpenParam;
      } else if (this.ActivityBaseData.CurrentRoleId && t.includes(this.ActivityBaseData.CurrentRoleId)) {
        i = this.ActivityBaseData.CurrentRoleId;
      }
      this.tFe.RefreshByData(t, () => {
        this.rFe(i);
      });
    }
  }
  OnBeforeShow() {}
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.oFe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.oFe);
  }
  OnBeforeHide() {
    if (!this.ActivityBaseData.IsRoleInstanceOn()) {
      this.ActivityBaseData.SetRoleTrialState(0);
    }
  }
  OnBeforeDestroy() {
    if (!this.ActivityBaseData.IsRoleInstanceOn()) {
      this.ActivityBaseData.SetRoleTrialState(0);
      this.lFe(0);
    }
    this.iFe?.Clear();
  }
  OnRefreshView() {
    this._Fe();
    this.FNe();
    this.ActivityBaseData.SetRoleTrialState(1);
    if (this.ActivityBaseData.CurrentRoleId !== this.CurrentRoleId) {
      this.rFe(this.ActivityBaseData.CurrentRoleId);
    } else {
      this.sFe();
    }
  }
  _Fe() {
    var i = this.ActivityBaseData.IsUnLock();
    this.ANe.SetPanelConditionVisible(!i);
    this.ANe.FunctionButton.SetUiActive(i);
    if (!i) {
      this.ANe.SetPerformanceConditionLock(this.ActivityBaseData.ConditionGroupId, this.ActivityBaseData.Id);
    }
  }
  OnTimer(i) {
    this.FNe();
  }
  FNe() {
    var [i, t] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
    }
  }
  lFe(i) {
    this.CurrentRoleId = i;
    this.ActivityBaseData.CurrentRoleId = i;
  }
  Ake(i) {
    this.lFe(i);
    var t = ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(i);
    var e = ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialRoleConfigByRoleId(t.RoleId);
    let s = e.Introduction;
    if (StringUtils_1.StringUtils.IsEmpty(s)) {
      s = this.ActivityBaseData.LocalConfig.Desc;
    }
    var r = !StringUtils_1.StringUtils.IsEmpty(s);
    this.DNe.SetContentVisible(r);
    if (r) {
      this.DNe.SetContentByTextId(s);
    }
    this.j2e.Update(t.RoleId);
    var r = this.GetTexture(1);
    this.SetTextureShowUntilLoaded(e.RoleStand, r);
    var r = this.GetTexture(12);
    var h = this.GetTexture(13);
    if (e.RoleStand2) {
      this.SetTextureShowUntilLoaded(e.RoleStand2, r);
      this.SetTextureShowUntilLoaded(e.RoleStand2, h);
    }
    this.h$a(e.UiConfigId);
    var r = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(t.RoleId);
    if (r) {
      h = r.PartyId;
      e = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(h);
      if (!StringUtils_1.StringUtils.IsEmpty(e?.Logo)) {
        r = this.GetTexture(0);
        this.SetTextureByPath(e.Logo, r);
      }
    }
    var h = this.GetButton(19);
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10009);
    h?.RootUIComp.SetUIActive(t.GachaId > 0 && e);
    this.jqe(i);
  }
  sFe() {
    if (this.iFe.GetCurrentSequence() === "Switch") {
      this.iFe.ReplaySequenceByKey("Switch");
    } else {
      this.iFe.PlayLevelSequenceByName("Switch", false);
    }
  }
  h$a(i) {
    i = ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialUiConfigById(i);
    this.GetTexture(14).SetColor(UE.Color.FromHex(i?.Color1 ?? ""));
    this.GetTexture(15).SetColor(UE.Color.FromHex(i?.Color2 ?? ""));
    this.GetTexture(16).SetColor(UE.Color.FromHex(i?.Color3 ?? ""));
    this.GetTexture(17).SetColor(UE.Color.FromHex(i?.Color4 ?? ""));
    this.GetTexture(18).SetColor(UE.Color.FromHex(i?.Color5 ?? ""));
  }
  jqe(i) {
    var t = this.ActivityBaseData.GetRewardDataByRoleId(i);
    this.UNe.SetItemLayoutVisible(t !== undefined && t.length > 0);
    var i = this.ActivityBaseData.GetRewardStateByRoleId(i);
    if (t && t.length > 0) {
      this.UNe.RefreshItemLayout(t);
    }
    this.GetItem(9).SetUIActive(i === 2);
    this.GetItem(10).SetUIActive(i === 0);
    this.GetButton(11).RootUIComp.SetUIActive(i === 1);
  }
  rFe(i) {
    i = this.ActivityBaseData.RoleIdList.indexOf(i);
    if (i >= 0) {
      this.tFe.GetLayoutItemByIndex(i)?.SetToggleState(true, true);
    }
  }
}
exports.ActivitySubViewRoleTrial = ActivitySubViewRoleTrial;
class RoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.RoleId = 0;
    this.Toggle = undefined;
    this.CanToggleExecuteChange = undefined;
    this.ToggleCallBack = undefined;
    this.uFe = () => !this.CanToggleExecuteChange || this.CanToggleExecuteChange(this.RoleId);
    this.cFe = () => {
      if (this.ToggleCallBack) {
        this.ToggleCallBack(this.RoleId, this.Toggle.GetToggleState() === 1);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UITexture]];
    this.BtnBindInfo = [[0, this.cFe]];
  }
  OnStart() {
    this.Toggle = this.GetExtendToggle(0);
    if (this.Toggle) {
      this.Toggle.CanExecuteChange.Unbind();
      this.Toggle.CanExecuteChange.Bind(this.uFe);
    }
  }
  Refresh(i) {
    this.RoleId = i;
    var t;
    var e;
    var i = ModelManager_1.ModelManager.ActivityModel.GetActivityById(ActivityRoleTrialController_1.ActivityRoleTrialController.CurrentActivityId);
    if (i) {
      e = ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialInfoConfigByRoleId(this.RoleId);
      t = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.TrialRoleId);
      if ((e = ConfigManager_1.ConfigManager.ActivityRoleTrialConfig.GetRoleTrialRoleConfigByRoleId(e.RoleId)).RoleIcon) {
        this.SetTextureShowUntilLoaded(e.RoleIcon, this.GetTexture(3));
        this.SetTextureShowUntilLoaded(e.RoleIcon, this.GetTexture(5));
      }
      this.mFe(t.GetRoleConfig().QualityId);
      this.BNe(i);
    }
  }
  mFe(i) {
    var t = this.GetSprite(1);
    var i = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(i);
    t.SetColor(UE.Color.FromHex(i?.RoleTrialQualityColor ?? ""));
  }
  BNe(i) {
    i = i.GetRewardStateByRoleId(this.RoleId);
    this.GetItem(4).SetUIActive(i === 1);
  }
  SetToggleState(i, t = false) {
    this.Toggle?.SetToggleState(i ? 1 : 0, t);
  }
}
//# sourceMappingURL=ActivitySubViewRoleTrial.js.map