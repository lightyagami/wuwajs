"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleSkinTrialSubView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const RoleController_1 = require("../../../RoleUi/RoleController");
const SkipTaskManager_1 = require("../../../SkipInterface/SkipTaskManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase");
const ActivitySmallItemGrid_1 = require("../UniversalComponents/ActivitySmallItemGrid");
const ActivityDescriptionTypeB_1 = require("../UniversalComponents/Content/ActivityDescriptionTypeB");
const ActivityRewardList_1 = require("../UniversalComponents/Content/ActivityRewardList");
const ActivityFunctionalTypeA_1 = require("../UniversalComponents/Functional/ActivityFunctionalTypeA");
const ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA");
const RoleSkinTrialController_1 = require("./RoleSkinTrialController");
class RoleSkinTrialSubView extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments);
    this.M7l = 0;
    this.tFe = undefined;
    this.$8i = undefined;
    this.iFe = undefined;
    this.LNe = undefined;
    this.DNe = undefined;
    this.UNe = undefined;
    this.ANe = undefined;
    this.oFe = i => {
      if (i === this.ActivityBaseData.Id) {
        this.jqe(this.M7l);
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
    this.pqe = i => {
      this.M7l = i.Index;
      this.E7l(this.M7l);
      this.v4e();
      this.sFe();
    };
    this.hFe = () => {
      var i;
      var t;
      if (RoleController_1.RoleController.IsInRoleTrial()) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleDungeonsLimit");
      } else {
        i = this.$8i.GetSelectIdByIndex(this.M7l);
        t = this.$8i.GetInstanceIdById(i);
        RoleSkinTrialController_1.RoleSkinTrialController.EnterRoleTrialDungeonDirectly(t, this.$8i.Id, i);
      }
    };
    this.aFe = () => {
      var i = this.$8i.GetSelectIdByIndex(this.M7l);
      RoleSkinTrialController_1.RoleSkinTrialController.RequestRoleSkinTrailInstanceReward(this.$8i.Id, i);
    };
    this.zxl = () => {
      var i = this.$8i.GetSelectIdByIndex(this.M7l);
      var i = this.$8i.GetAccessIdById(i);
      SkipTaskManager_1.SkipTaskManager.RunByConfigId(i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIHorizontalLayout], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIButtonComponent], [9, UE.UITexture], [10, UE.UITexture], [11, UE.UITexture], [12, UE.UITexture], [13, UE.UITexture], [14, UE.UIButtonComponent], [15, UE.UIText], [16, UE.UIText], [17, UE.SpineSkeletonAnimationComponent], [18, UE.UIItem], [19, UE.UIItem]];
    this.BtnBindInfo = [[8, this.aFe], [14, this.zxl]];
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(2);
    this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA();
    await this.LNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(3);
    this.DNe = new ActivityDescriptionTypeB_1.ActivityDescriptionTypeB();
    await this.DNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(4);
    this.UNe = new ActivityRewardList_1.ActivityRewardList();
    await this.UNe.CreateThenShowByActorAsync(i.GetOwner());
    var i = this.GetItem(5);
    this.ANe = new ActivityFunctionalTypeA_1.ActivityFunctionalTypeA(this.ActivityBaseData);
    await this.ANe.CreateThenShowByActorAsync(i.GetOwner());
    this.tFe = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(1), this.nFe);
    this.UNe.SetTitleByTextId("CollectActivity_reward");
    this.UNe.InitGridLayout(this.W2e);
    this.ANe.FunctionButton.SetFunction(this.hFe);
    this.iFe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.oFe);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.oFe);
  }
  OnRefreshView() {
    this.$8i = this.ActivityBaseData;
    this.M7l = 0;
    this.E7l(this.M7l);
    this.I7l();
    this.sFe();
    this.T7l();
    this.v4e();
  }
  E7l(i) {
    this.jqe(i);
    this.b7l(i);
    this.Wbe(i);
    this.h$a(i);
    this.RAr(i);
    this.L7l(i);
  }
  I7l() {
    var i = this.ActivityBaseData.LocalConfig;
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
    this.LNe.SetSubTitleVisible(!StringUtils_1.StringUtils.IsEmpty(i?.DescTheme));
    if (i?.DescTheme) {
      this.LNe.SetSubTitleByTextId(i.DescTheme);
    }
    this.gxl();
  }
  gxl() {
    var [i, t] = ModelManager_1.ModelManager.ActivityModel.GetTimeVisibleAndRemainTime(this.ActivityBaseData);
    this.LNe.SetTimeTextVisible(i);
    if (i) {
      this.LNe.SetTimeTextByText(t);
    }
  }
  b7l(i) {
    i = this.$8i.GetSelectIdByIndex(i);
    let t = ConfigManager_1.ConfigManager.RoleSkinTrialConfig.GetRoleSkinTrialInfoById(i).Introduction;
    if (StringUtils_1.StringUtils.IsEmpty(t)) {
      t = this.ActivityBaseData.LocalConfig.Desc;
    }
    i = !StringUtils_1.StringUtils.IsEmpty(t);
    this.DNe.SetContentVisible(i);
    if (i) {
      this.DNe.SetContentByTextId(t);
    }
  }
  OnTimer(i) {
    this.gxl();
  }
  jqe(i) {
    var i = this.$8i.GetSelectIdByIndex(i);
    var t = this.$8i?.GetRewardDataById(i);
    this.UNe.SetItemLayoutVisible(t !== undefined && t.length > 0);
    var i = this.$8i.GetRewardStateById(i);
    if (t && t.length > 0) {
      this.UNe.RefreshItemLayout(t);
    }
    this.GetItem(6).SetUIActive(i === Protocol_1.Aki.Protocol.Lps.a3_);
    this.GetItem(7).SetUIActive(i === Protocol_1.Aki.Protocol.Lps.Proto_Running);
    this.GetButton(8).RootUIComp.SetUIActive(i === Protocol_1.Aki.Protocol.Lps.Proto_WaitTakeReward);
  }
  h$a(i) {
    i = this.$8i.GetSelectIdByIndex(i);
    i = this.$8i.GetRoleSkinTrialUiConfigById(i);
    this.GetTexture(9).SetColor(UE.Color.FromHex(i?.Color1 ?? ""));
    this.GetTexture(10).SetColor(UE.Color.FromHex(i?.Color2 ?? ""));
    this.GetTexture(11).SetColor(UE.Color.FromHex(i?.Color3 ?? ""));
    this.GetTexture(12).SetColor(UE.Color.FromHex(i?.Color4 ?? ""));
    this.GetTexture(13).SetColor(UE.Color.FromHex(i?.Color5 ?? ""));
  }
  v4e() {
    var t = this.$8i.GetRoleList();
    var e = [];
    for (let i = 0; i < t.length; i++) {
      var s = t[i];
      var r = new RoleItemData();
      r.RoleId = s;
      r.ActivityId = this.$8i.Id;
      r.Index = i;
      r.SelectState = i === this.M7l;
      e.push(r);
    }
    this.tFe.RefreshByData(e);
  }
  Wbe(i) {
    i = this.$8i.GetSelectIdByIndex(i);
    i = ConfigManager_1.ConfigManager.RoleSkinTrialConfig.GetRoleSkinTrialInfoById(i).PreviewSkinId;
    i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(i);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), i.GetTitleName());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), i.GetSubTitle());
  }
  async RAr(i) {
    var i = this.$8i.GetSelectIdByIndex(i);
    var i = ConfigManager_1.ConfigManager.RoleSkinTrialConfig.GetRoleSkinTrialInfoById(i).PreviewSkinId;
    var i = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(i);
    var t = i.GetSmallSpineAtlas();
    var i = i.GetSpineSkeletonData();
    this.GetItem(19).SetUIActive(false);
    await this.SetSpineAssetByPath(t, i, this.GetSpine(17));
    this.GetSpine(17).SetAnimation(0, "idle", true);
    this.GetItem(19).SetUIActive(true);
  }
  sFe() {
    if (this.iFe.GetCurrentSequence() === "Switch") {
      this.iFe.ReplaySequenceByKey("Switch");
    } else {
      this.iFe.PlayLevelSequenceByName("Switch", false);
    }
  }
  L7l(i) {
    var t;
    var i = this.$8i.GetSelectIdByIndex(i);
    var i = ConfigManager_1.ConfigManager.RoleSkinTrialConfig.GetRoleSkinTrialInfoById(i);
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(i.RoleId);
    if (i) {
      i = i.PartyId;
      i = ConfigManager_1.ConfigManager.InfluenceConfig.GetInfluenceConfig(i);
      if (!StringUtils_1.StringUtils.IsEmpty(i?.Logo)) {
        t = this.GetTexture(0);
        this.SetTextureByPath(i.Logo, t);
      }
    }
  }
  OnBeforeDestroy() {
    this.iFe?.Clear();
  }
  T7l() {
    var i = this.$8i.GetRoleList().length > 1;
    this.GetHorizontalLayout(1).RootUIComp.SetUIActive(i);
    this.GetItem(18).SetUIActive(i);
  }
}
exports.RoleSkinTrialSubView = RoleSkinTrialSubView;
class RoleItemData {
  constructor() {
    this.RoleId = 0;
    this.ActivityId = 0;
    this.Index = 0;
    this.SelectState = false;
  }
}
class RoleItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.RoleId = 0;
    this.Pe = undefined;
    this.Toggle = undefined;
    this.CanToggleExecuteChange = undefined;
    this.ToggleCallBack = undefined;
    this.oFe = i => {
      if (i === this.Pe?.ActivityId) {
        this.RefreshRedDot(this.Pe);
      }
    };
    this.uFe = () => !this.CanToggleExecuteChange || this.CanToggleExecuteChange(this.RoleId);
    this.cFe = () => {
      if (this.ToggleCallBack) {
        this.ToggleCallBack(this.Pe);
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.oFe);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RefreshCommonActivityRedDot, this.oFe);
  }
  Refresh(i) {
    this.RoleId = i.RoleId;
    this.Pe = i;
    this.lyl(this.RoleId);
    this.mFe(this.RoleId);
    this.RefreshRedDot(i);
    this.Oqe(i.SelectState);
  }
  Oqe(i) {
    this.GetExtendToggle(0).SetToggleState(i ? 1 : 0);
  }
  lyl(i) {
    i = ConfigManager_1.ConfigManager.RoleSkinTrialConfig.GetRoleSkinTrialInfoById(i);
    if (i.RoleIcon) {
      this.SetTextureShowUntilLoaded(i.RoleIcon, this.GetTexture(3));
      this.SetTextureShowUntilLoaded(i.RoleIcon, this.GetTexture(5));
    }
  }
  mFe(i) {
    var i = ConfigManager_1.ConfigManager.RoleSkinTrialConfig.GetRoleSkinTrialInfoById(i);
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i.TrialRoleId).GetRoleConfig().QualityId;
    var t = this.GetSprite(1);
    var i = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(i);
    t.SetColor(UE.Color.FromHex(i?.RoleTrialQualityColor ?? ""));
  }
  RefreshRedDot(i) {
    var t = i.ActivityId;
    var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(t);
    var i = t.GetSelectIdByIndex(i.Index);
    var t = t.GetRewardStateById(i);
    this.GetItem(4).SetUIActive(t === Protocol_1.Aki.Protocol.Lps.Proto_WaitTakeReward);
  }
}
//# sourceMappingURL=RoleSkinTrialSubView.js.map