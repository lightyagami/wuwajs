"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRoleData = exports.SurvivorsTeamEditRoleItemGird = exports.SurvivorsTeamEditView = undefined;
const UE = require("ue");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityFunctionalTypeA_1 = require("../../../Activity/ActivityContent/UniversalComponents/Functional/ActivityFunctionalTypeA");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const RoleDataBase_1 = require("../../../RoleUi/RoleData/RoleDataBase");
const UiSceneManager_1 = require("../../../UiComponent/UiSceneManager");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const SurvivorsActivityController_1 = require("../../Activity/SurvivorsActivityController");
const SurvivorsRogueCardBase_1 = require("../../Card/SurvivorsRogueCardBase");
const SurvivorsRogueCardDataFactory_1 = require("../../Card/SurvivorsRogueCardDataFactory");
const SurvivorsRoleTabDetail_1 = require("../TabView/SurvivorsRoleTabDetail");
class SurvivorsTeamEditView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.dmo = undefined;
    this.MNd = undefined;
    this.Flo = undefined;
    this.ENd = undefined;
    this.m0o = [];
    this.lqe = undefined;
    this.eVi = undefined;
    this.INd = undefined;
    this.TNd = undefined;
    this.cHe = () => {
      var e = new SurvivorsTeamEditRoleItemGird();
      e.BindOnExtendToggleStateChanged(this.j5e);
      e.BindOnCanExecuteChange(this.Vbt);
      return e;
    };
    this.j5e = e => {
      var i = e.State;
      var e = e.Data;
      if (i === 1) {
        this.Flo.DeselectCurrentGridProxy();
        i = this.m0o.indexOf(e);
        this.Flo.SelectGridProxy(i);
        this.ENd = e;
        this.Og();
      }
    };
    this.Vbt = (e, i, t) => true;
    this.tWt = () => {
      this.MNd.RoleId = this.ENd.SurRoleId;
      ControllerHolder_1.ControllerHolder.SurvivorsRogueController.OpenEnterInstConfirm();
    };
    this.QEu = () => {
      var e = {
        SelectTabType: 1,
        SelectCfgId: this.ENd?.InitWeaponID
      };
      UiManager_1.UiManager.OpenView("SurvivorsHandbookView", e);
    };
    this.B6e = () => {
      UiManager_1.UiManager.CloseView("SurvivorsTeamEditView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILoopScrollViewComponent], [1, UE.UIInturnAnimController], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIButtonComponent], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIExtendToggle], [10, UE.UIButtonComponent], [11, UE.UIItem]];
    this.BtnBindInfo = [[6, this.tWt], [10, this.QEu]];
  }
  async OnBeforeStartAsync() {
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(8));
    this.lqe.SetCloseCallBack(this.B6e);
    var e = [];
    this.INd = new SurvivorsRoleTabDetail_1.SurvivorsRoleTabDetail();
    e.push(this.INd.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()));
    this.TNd = new ActivityFunctionalTypeA_1.FunctionalPanelConditionLock();
    e.push(this.TNd.CreateThenShowByActorAsync(this.GetItem(11).GetOwner()));
    this.eVi = new SurvivorsRogueCardBase_1.SurvivorsRogueCardBase();
    e.push(this.eVi.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()));
    e.push(this.Zqd());
    await Promise.all(e);
    this.TNd.SetButtonVisible(false);
    this.dmo = UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
  }
  OnBeforeShow() {
    SurvivorsActivityController_1.SurvivorsActivityController.CheckIsActivityClose();
  }
  OnBeforeDestroy() {
    if (this.dmo) {
      UiSceneManager_1.UiSceneManager.DestroyRoleSystemRoleActor(this.dmo);
      this.dmo = undefined;
    }
  }
  async Zqd() {
    this.ANo();
    if (this.m0o.length > 0) {
      this.Flo = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(0), this.GetItem(2).GetOwner(), this.cHe, true);
      await this.Flo.RefreshByDataAsync(this.m0o, false, true);
      this.Flo.SelectGridProxy(0);
      this.ENd = this.m0o[0];
    }
  }
  ANo() {
    this.MNd = ModelManager_1.ModelManager.SurvivorsRogueModel.SelectLevelInfo;
    var e = ModelManager_1.ModelManager.SurvivorsRogueModel.ActivityData;
    if (e !== undefined) {
      var i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsLevel(this.MNd.LevelId);
      for (const o of e.GetShowRoleList()) {
        var t = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(o).TrialRoleId;
        var r = e.RoleMap.get(o);
        var s = i.InitRoles.includes(o);
        var t = new SurvivorsRoleData(o, t, r || s);
        t.IsSurvivorsTrial = s;
        this.m0o.push(t);
      }
      this.m0o.sort((e, i) => e.IsSurvivorsTrial !== i.IsSurvivorsTrial ? e.IsSurvivorsTrial ? -1 : 1 : e.IsUnLock !== i.IsUnLock ? e.IsUnLock ? -1 : 1 : 0);
    }
  }
  Og() {
    this.GetItem(5)?.SetUIActive(this.ENd.IsUnLock);
    this.GetButton(6)?.RootUIComp.SetUIActive(this.ENd.IsUnLock);
    this.TNd.SetUiActive(!this.ENd.IsUnLock);
    if (!this.ENd.IsUnLock) {
      e = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(this.ENd.UnlockConditionId);
      this.TNd.SetTextByTextId(e);
    }
    this.INd.RefreshFourAttr(this.ENd.SurRoleId, true);
    var e = SurvivorsRogueCardDataFactory_1.SurvivorsRogueCardDataFactory.CreateGeneralWeapon(this.ENd.InitWeaponID);
    e.TagVisible = false;
    this.eVi.Apply(e);
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(this.ENd.TrialRoleId);
    if (e) {
      ControllerHolder_1.ControllerHolder.RoleController.OnSelectedRoleChangeByConfig(e.GetRoleConfig().Id, e.GetRoleSkinId());
    }
  }
  OnHandleLoadScene() {
    this.dmo ||= UiSceneManager_1.UiSceneManager.InitRoleSystemRoleActor(1);
    this.dmo.Model?.CheckGetComponent(1)?.SetTransformByTag("RoleCase");
    ControllerHolder_1.ControllerHolder.RoleController.PlayRoleMontage(3, false);
    this.Og();
  }
}
exports.SurvivorsTeamEditView = SurvivorsTeamEditView;
class SurvivorsTeamEditRoleItemGird extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, i, t) {
    var r = {
      Type: 4,
      Data: e,
      ItemConfigId: e.GetRoleId(),
      BottomText: e.GetName(),
      IsNewVisible: false,
      IsDisable: !e.IsUnLock,
      IsLockVisible: !e.IsUnLock,
      IconPath: e.IconPath,
      QualityId: e.QualityId
    };
    this.Apply(r);
    this.SetSelected(i);
    this.SetElement(e.GetRoleConfig().ElementId);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false, true);
  }
}
exports.SurvivorsTeamEditRoleItemGird = SurvivorsTeamEditRoleItemGird;
class SurvivorsRoleData extends RoleDataBase_1.RoleDataBase {
  constructor(e, i, t) {
    super(i);
    this.IsSurvivorsTrial = false;
    this.SurRoleId = e;
    this.TrialRoleId = i;
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(this.TrialRoleId);
    this.Id = e.id();
    this.IconPath = e.RoleHeadIconBig;
    this.QualityId = e.QualityId;
    this.IsUnLock = t;
    this.DefaultEvolveTxtID = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRoleDefaultEvolve(this.SurRoleId).Describe;
    i = ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(this.SurRoleId);
    this.UnlockConditionId = i.UnlockConditionId;
    this.InitWeaponID = i.InitWeapon;
    this.PropId = i.PropId;
  }
  IsTrialRole() {
    return true;
  }
  GetRoleId() {
    return this.Id;
  }
  GetName(e) {
    var i = this.GetRoleConfig();
    return ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(i.Name);
  }
  CanChangeName() {
    return false;
  }
  IsOnlineRole() {
    return false;
  }
  GetRoleCreateTime() {
    return 0;
  }
  GetIsNew() {
    return false;
  }
  GetSurRoleConfig() {
    return ConfigManager_1.ConfigManager.SurvivorsRogueConfig.GetSurvivorsRole(this.SurRoleId);
  }
}
exports.SurvivorsRoleData = SurvivorsRoleData;
//# sourceMappingURL=SurvivorsTeamEditView.js.map