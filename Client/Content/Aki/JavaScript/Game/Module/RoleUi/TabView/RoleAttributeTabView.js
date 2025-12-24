"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleAttributeTabView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const FormationDataController_1 = require("../../Abilities/FormationDataController");
const AttributeItem_1 = require("../../Common/AttributeItem");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonController_1 = require("../../InstanceDungeon/InstanceDungeonController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const SkinController_1 = require("../../Skin/SkinController");
const UiRoleUtils_1 = require("../../UiComponent/UiRoleUtils");
const UiSceneManager_1 = require("../../UiComponent/UiSceneManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MainRoleController_1 = require("../MainRoleController");
const RoleController_1 = require("../RoleController");
const RoleDefine_1 = require("../RoleDefine");
const RoleTagSmallIconItem_1 = require("../RoleTag/RoleTagSmallIconItem");
const RoleUtils_1 = require("../RoleUtils");
const StarItem_1 = require("../View/StarItem");
const RoleViewViewModel_1 = require("../View/ViewData/RoleViewViewModel");
class RoleAttributeTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.Ndo = 0;
    this.Odo = undefined;
    this.kdo = undefined;
    this.RoleViewAgent = undefined;
    this.RoleInstance = undefined;
    this.AttributeItemList = [];
    this.RoleSystemUiParams = undefined;
    this.$be = undefined;
    this.Klo = undefined;
    this.DetailClick = () => {
      this.Fdo();
    };
    this.LevelUpClick = () => {
      var e = this.RoleInstance.GetRoleId();
      var e = new RoleViewViewModel_1.RoleViewViewModel(e, false);
      RoleController_1.RoleController.OpenRoleViewByViewModel("RoleLevelUpView", e);
    };
    this.BreakthroughClick = () => {
      var e = this.RoleInstance.GetRoleId();
      var e = new RoleViewViewModel_1.RoleViewViewModel(e, false);
      RoleController_1.RoleController.OpenRoleViewByViewModel("RoleBreachView", e);
    };
    this.RoleChangeClick = () => {
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("InstanceDungeonShieldViewCantOpen");
      } else {
        LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DirectTrainMakeRoleChange, true);
        this.GetItem(23)?.SetUIActive(false);
        UiManager_1.UiManager.OpenView("RoleElementView", this.RoleViewAgent);
      }
    };
    this.RoleTagClick = () => {
      var e = this.RoleInstance.GetRoleConfig();
      var e = ModelManager_1.ModelManager.RoleModel.GetRoleTagByRoleInfo(e);
      UiManager_1.UiManager.OpenView("RoleTagDetailView", e);
    };
    this.OnRoleSkinClick = () => {
      var e = this.RoleViewAgent.GetCurSelectRoleId();
      SkinController_1.SkinController.SkipToSkinView(e, "RoleSkinTabView", false);
    };
    this.TeachClick = () => {
      if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice01");
      } else if (FormationDataController_1.FormationDataController.GlobalIsInFight) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice06");
      } else if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice05");
      } else {
        const o = this.RoleViewAgent.GetCurSelectRoleId();
        var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o);
        var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(e.Name);
        const r = e.RoleGuide;
        if (r === 0) {
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("RoleGuideNotice02", t);
        } else if (ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(r)) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("PhantomFormationEnterInstanceTip");
        } else {
          (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(94)).SetTextArgs(t);
          e.FunctionMap.set(2, () => {
            var e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(r).FightFormationId;
            var e = ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(e)?.AutoRole;
            if ((e?.length ?? 0) > 0) {
              var t = new Array();
              for (const i of e) {
                t.push(ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(i));
              }
              e = {
                Q6n: o
              };
              ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Hah = e;
              InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(r, t, 0, 0);
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Role", 43, "未配置出战人物");
            }
          });
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
        }
      }
    };
    this.dVi = undefined;
    this.vke = () => {
      return new StarItem_1.StarItem();
    };
    this.qdo = () => new RoleTagSmallIconItem_1.RoleTagSmallIconItem();
    this.Vdo = e => {
      this.RoleInstance = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RoleSkinRedDotRefresh, e);
      this.PlayMontageStartWithReLoop();
      this.Hdo();
      this.jdo();
    };
    this.Wdo = () => {
      this.Hdo();
    };
    this.Kdo = () => {
      this.PlayModelEffect();
    };
    this.Qdo = () => {
      this.Xdo();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UIText], [3, UE.UISprite], [4, UE.UIText], [6, UE.UIText], [5, UE.UIItem], [7, UE.UIText], [8, UE.UIText], [9, UE.UITexture], [10, UE.UIHorizontalLayout], [11, UE.UIText], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UIButtonComponent], [17, UE.UIHorizontalLayout], [18, UE.UIItem], [19, UE.UIButtonComponent], [20, UE.UIButtonComponent], [21, UE.UIButtonComponent], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UISprite], [25, UE.UIText]];
    this.BtnBindInfo = [[0, this.DetailClick], [14, this.TeachClick], [16, this.RoleChangeClick], [19, this.RoleTagClick], [21, this.OnRoleSkinClick]];
  }
  OnStart() {
    this.RoleViewAgent = this.ExtraParams;
    if (this.RoleViewAgent === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Role", 58, "RoleViewAgent为空", ["界面名称", "RoleAttributeTabView"]);
      }
    } else {
      this.RoleSystemUiParams = this.RoleViewAgent.GetRoleSystemUiParams();
      this.dVi = UiSceneManager_1.UiSceneManager.GetRoleSystemRoleActor();
      this.Ndo = 0;
      this.Odo = new ButtonItem_1.ButtonItem(this.GetItem(1));
      this.kdo = new ButtonItem_1.ButtonItem(this.GetItem(15));
      this.Odo.SetFunction(this.LevelUpClick);
      this.kdo.SetFunction(this.BreakthroughClick);
      this.SetButtonUiActive(20, false);
      this.Uho();
      this.$be = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.vke);
      this.Klo = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(17), this.qdo);
    }
  }
  Uho() {
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("RoleAttributeDisplay6");
    var i = this.GetItem(12);
    var o = this.GetItem(5);
    let r = undefined;
    var n = t.length;
    for (let e = 0; e < n; ++e) {
      r = e === 0 ? o : LguiUtil_1.LguiUtil.CopyItem(o, i);
      var l = t[e];
      var s = new AttributeItem_1.AttributeItem();
      s.CreateThenShowByActor(r.GetOwner());
      s.UpdateParam(l, false);
      if (n > 2 && e % 2 == 0) {
        s.SetBgActive(true);
      } else {
        s.SetBgActive(false);
      }
      this.AttributeItemList.push(s);
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleInfoUpdate, this.Wdo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleSystemChangeRole, this.Vdo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleLevelUp, this.Wdo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveRole, this.Kdo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RoleRefreshName, this.Qdo);
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleInfoUpdate, this.Wdo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleSystemChangeRole, this.Vdo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleLevelUp, this.Wdo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveRole, this.Kdo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RoleRefreshName, this.Qdo);
  }
  jdo() {
    var e;
    var t;
    var i;
    this.Odo.BindRedDot("RoleAttributeTabLevelUp", this.RoleInstance.GetDataId());
    this.kdo.BindRedDot("RoleAttributeTabBreakUp", this.RoleInstance.GetDataId());
    RedDotController_1.RedDotController.BindRedDot("RoleSkin", this.GetItem(22), undefined, this.RoleInstance.GetDataId());
    if (this.RoleSystemUiParams.TeachBtn && (e = this.RoleInstance.IsTrialRole(), t = ModelManager_1.ModelManager.FunctionModel.IsShow(10043), i = ModelManager_1.ModelManager.FunctionModel.IsOpen(10043), t) && i) {
      this.GetButton(14).GetRootComponent().SetUIActive(!e);
    } else {
      this.GetButton(14).GetRootComponent().SetUIActive(false);
    }
  }
  PlayModelEffect() {
    UiRoleUtils_1.UiRoleUtils.PlayRoleLevelUpEffect(this.dVi);
  }
  Fdo() {
    UiManager_1.UiManager.OpenView("RoleAttributeDetailView", this.RoleInstance.GetShowAttrList());
  }
  $do() {
    this.SetRoleLevelUpState();
    var e = this.RoleInstance.GetLevelData();
    if (this.Ndo === 1 || this.Ndo === 0) {
      this.GetText(2).SetText("");
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "RoleExp", e.GetExp(), e.GetCurrentMaxExp());
    }
    var t = this.Ndo === 1 || this.Ndo === 0 ? 1 : e.GetExpPercentage();
    this.GetSprite(3).SetFillAmount(t);
    var t = this.GetText(6);
    LguiUtil_1.LguiUtil.SetLocalText(t, "RoleMaxLevel02", e.GetCurrentMaxLevel());
  }
  Ydo() {
    var e = this.RoleInstance.GetLevelData();
    var t = e.GetBreachLevel();
    let i = ConfigManager_1.ConfigManager.TextConfig.GetTextById("RoleBreakLevel");
    if ((i = i?.replace("%s", "[" + t + "]")) !== undefined) {
      this.GetText(4).SetText(i);
    }
    var o = e.GetMaxBreachLevel();
    var r = new Array(o);
    for (let e = 0; e < o; ++e) {
      var n = {
        StarOnActive: e < t,
        StarOffActive: e >= t,
        StarNextActive: false,
        StarLoopActive: false,
        PlayLoopSequence: false,
        PlayActivateSequence: false
      };
      r[e] = n;
    }
    this.$be.RefreshByData(r);
    e = this.Ndo === 0 ? e.GetRoleMaxLevel() : e.GetLevel();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(7), "CommonLevel", e);
    e = this.RoleInstance.GetElementInfo();
    this.SetElementIcon(e.Icon, this.GetTexture(9), this.RoleInstance.GetRoleConfig().ElementId, "RoleRootView");
    e = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfoLocalName(e.Name);
    this.GetText(8).SetText(e);
  }
  Jdo() {
    var e = ModelManager_1.ModelManager.RoleModel.GetRoleTagByRoleInfo(this.RoleInstance.GetRoleConfig());
    this.Klo.RefreshByData(e);
  }
  Hdo() {
    this.$do();
    this.UpdateButtonState();
    this.Ydo();
    this.Xdo();
    this.UpdateAttribute();
    this.zdo();
    this.Zdo();
    this.Jdo();
    this.bIl();
  }
  Zdo() {
    var e = this.RoleViewAgent.GetCurSelectRoleId();
    var t = this.RoleViewAgent.GetCurSelectRoleData();
    var e = MainRoleController_1.MainRoleController.IsMainRole(e);
    var t = t.IsTrialRole();
    var i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleElementTransferFunctionId();
    var i = ModelManager_1.ModelManager.FunctionModel.IsOpen(i);
    var o = ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
    var e = e && i && !o && !t;
    this.GetButton(16).RootUIComp.SetUIActive(e);
    this.GetItem(23)?.SetUIActive(e && !LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.DirectTrainMakeRoleChange));
  }
  bIl() {
    var e = this.RoleViewAgent.GetCurSelectRoleData().IsTrialRole();
    this.GetButton(21).RootUIComp.SetUIActive(!e);
  }
  Xdo() {
    this.GetText(11).SetText(this.RoleInstance.GetName());
  }
  zdo() {
    var e;
    var t = this.RoleInstance.IsTrialRole();
    this.GetItem(13).SetUIActive(t);
    if (t) {
      t = this.RoleInstance.GetTrialRoleId();
      e = RoleUtils_1.RoleUtils.GetTrailRoleLabelIconById(t);
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
      this.SetSpriteByPath(e, this.GetSprite(24), false);
      e = RoleUtils_1.RoleUtils.GetTrialRoleType(t);
      t = RoleDefine_1.trialRoleHexColor[e] ?? RoleDefine_1.trialRoleHexColor[1];
      e = UE.Color.FromHex(t);
      this.GetText(25)?.SetColor(e);
    }
  }
  UpdateButtonState() {
    if (this.RoleInstance.IsTrialRole()) {
      this.Odo.SetActive(false);
      this.kdo.SetActive(false);
    } else {
      let e = "RoleMaxLevelPreview";
      this.Odo.SetActive(this.Ndo !== 0 && this.Ndo !== 3);
      if (this.Ndo !== 0) {
        if (this.Ndo === 1) {
          e = "RoleReachMaxLevel";
        } else if (this.Ndo === 3) {
          e = "RoleBreakup";
        } else if (this.Ndo === 2) {
          e = "RoleLevelUp";
        }
        t = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e);
        this.Odo.SetText(t);
        this.Odo.SetEnableClick(this.Ndo !== 1);
      }
      this.kdo.SetActive(this.Ndo !== 0 && this.Ndo === 3);
      var t = ConfigManager_1.ConfigManager.TextConfig.GetTextById("RoleBreakup");
      this.kdo.SetText(t);
    }
  }
  SetRoleLevelUpState() {
    var e = this.RoleInstance.GetLevelData();
    if (e.GetRoleIsMaxLevel()) {
      this.Ndo = 1;
    } else if (e.GetRoleNeedBreakUp()) {
      this.Ndo = 3;
    } else {
      this.Ndo = 2;
    }
  }
  PlayMontageStart() {
    RoleController_1.RoleController.PlayRoleMontage(3);
  }
  PlayMontageStartWithReLoop() {
    RoleController_1.RoleController.PlayRoleMontage(3, false, true, false);
  }
  UpdateAttribute() {
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("RoleAttributeDisplay6");
    for (let e = 0; e < this.AttributeItemList.length; ++e) {
      var i = this.AttributeItemList[e];
      var o = t[e];
      var o = this.RoleInstance.GetShowAttributeValueById(o);
      i.SetCurrentValue(o);
      i.SetActive(true);
    }
  }
  OnBeforeShow() {
    this.RoleInstance = this.RoleViewAgent.GetCurSelectRoleData();
    this.Hdo();
    this.jdo();
    this.Odo.BindRedDot("RoleAttributeTabLevelUp", this.RoleInstance.GetDataId());
  }
  OnAfterShow() {
    this.PlayMontageStart();
  }
  OnBeforeHide() {
    this.Odo.UnBindRedDot();
    RedDotController_1.RedDotController.UnBindGivenUi("RoleSkin");
  }
  OnBeforeDestroy() {
    for (const e of this.AttributeItemList) {
      e.Destroy();
    }
    this.AttributeItemList = [];
    this.Odo = undefined;
  }
}
exports.RoleAttributeTabView = RoleAttributeTabView;
//# sourceMappingURL=RoleAttributeTabView.js.map