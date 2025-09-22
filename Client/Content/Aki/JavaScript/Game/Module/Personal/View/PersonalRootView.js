"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalRootView = undefined;
const UE = require("ue");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById");
const FNameUtil_1 = require("../../../../Core/Utils/FNameUtil");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const CameraController_1 = require("../../../Camera/CameraController");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiBehaviorGachaSequence_1 = require("../../../Ui/Base/UiBehaviorGachaSequence");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const CommonInputViewController_1 = require("../../Common/InputView/Controller/CommonInputViewController");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
const QuickRoleSelectView_1 = require("../../RoleSelect/QuickRoleSelectView");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WorldLevelController_1 = require("../../WorldLevel/WorldLevelController");
const PersonalController_1 = require("../Controller/PersonalController");
const PersonalRoleDisplayMediumItem_1 = require("./PersonalRoleDisplayMediumItem");
class PersonalRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.hVi = undefined;
    this._Vi = [];
    this.nVi = 0;
    this.p5i = undefined;
    this.Qma = undefined;
    this.Kma = undefined;
    this.gKt = undefined;
    this.Hha = undefined;
    this.L6e = 0;
    this.gLt = undefined;
    this.FQc = undefined;
    this.nFe = () => {
      var e = new PersonalRoleDisplayMediumItem_1.PersonalRoleDisplayMediumItem();
      e.BindClickItemCallBack(this.OnRoleItemClick);
      return e;
    };
    this.jha = () => {
      if (ModelManager_1.ModelManager.PlayerInfoModel.GetId() === this.p5i.PlayerId) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("CopiedMyUid");
      } else {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("CopyOtherUID");
      }
      UE.LGUIBPLibrary.ClipBoardCopy(this.p5i.PlayerId.toString());
    };
    this.OnWorldLevelChange = () => {
      this.yVi();
    };
    this.OnSignChange = () => {
      this.pVi();
    };
    this.OnNameChange = () => {
      this.vVi();
    };
    this.OnBirthChange = () => {
      this.CVi();
    };
    this.OnRoleShowListChange = () => {};
    this.OnHeadIconChange = () => {
      this.MVi();
    };
    this.OnCardChange = () => {
      this.RefreshCard();
    };
    this.OnPlayerTitleChange = () => {
      this.RefreshPlayerTitle();
    };
    this.OnClickDetailButton = () => {
      if (!this.p5i.IsOtherData) {
        UiManager_1.UiManager.OpenView("PersonalOptionView");
      }
    };
    this.OnClickSignButton = () => {
      if (!this.p5i.IsOtherData) {
        CommonInputViewController_1.CommonInputViewController.OpenPersonalSignInputView();
      }
    };
    this.OnClickWorldLevelTipsButton = () => {
      WorldLevelController_1.WorldLevelController.OpenWorldLevelInfoView();
    };
    this.OnClickCloseButton = () => {
      this.CloseMe();
    };
    this.OnClickRenameButton = () => {
      CommonInputViewController_1.CommonInputViewController.OpenSetRoleNameInputView();
    };
    this.OnClickShowViewToggle = e => {
      if (e === 1) {
        this.UiViewSequence.StopPrevSequence(true);
        this.PlaySequence("CloseView", () => {
          this.GetItem(20)?.SetUIActive(false);
        });
      } else {
        this.UiViewSequence.StopPrevSequence(true);
        this.PlaySequence("StartView");
        this.GetItem(20).SetUIActive(true);
      }
    };
    this.OnCanShowToggleExecuteChange = () => !this.UiViewSequence.IsInSequence();
    this.OnClickPersonalCardButton = () => {
      UiManager_1.UiManager.OpenView("PersonalCardView", this.p5i);
    };
    this.OnClickExchangePreviewRoleButton = () => {
      var e;
      if (!UiManager_1.UiManager.IsViewOpen("QuickRoleSelectView")) {
        ModelManager_1.ModelManager.PersonalModel.SetPersonalTipState(false);
        this.BNe();
        e = ModelManager_1.ModelManager.RoleModel.GetRoleList();
        (e = new QuickRoleSelectView_1.QuickRoleSelectViewData(5, this._Vi, e)).OnWaitLoadingConfirm = this.OnWaitLoadingConfirmCallBack;
        e.OnRoleSelectFull = this.OnRoleSelectFull;
        e.OnBack = this.y5t;
        UiManager_1.UiManager.OpenView("PersonalQuickRoleSelectView", e);
      }
    };
    this.OnWaitLoadingConfirmCallBack = async e => {
      if (await PersonalController_1.PersonalController.SendRoleShowListUpdateRequestAsync(e)) {
        await this.FQc.PreloadLevelSequenceList(e);
        this.RefreshRoleShowList(e, false);
        this.BNe();
      }
    };
    this.y5t = () => {
      this.BNe();
    };
    this.OnRoleItemClick = t => {
      var e;
      if (this.nVi !== t && this.CheckClickInterval()) {
        this.nVi = t;
        e = this._Vi.findIndex(e => e === t);
        this.hVi.SelectGridProxy(e);
        this.FQc.PlayRoleSequence(t);
        this.L6e = Time_1.Time.Now;
      }
    };
    this.OnRoleSelectFull = () => {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("DisplayFull_text");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UITexture], [4, UE.UITexture], [5, UE.UIText], [6, UE.UIText], [7, UE.UIText], [8, UE.UIText], [9, UE.UIText], [10, UE.UIHorizontalLayout], [11, UE.UIButtonComponent], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UIItem], [16, UE.UIExtendToggle], [17, UE.UIButtonComponent], [18, UE.UIButtonComponent], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIText], [23, UE.UIItem], [24, UE.UISprite], [25, UE.UISprite], [26, UE.UIItem], [27, UE.UITexture], [28, UE.UIItem]];
    this.BtnBindInfo = [[0, this.jha], [2, this.OnClickDetailButton], [11, this.OnClickSignButton], [12, this.OnClickWorldLevelTipsButton], [13, this.OnClickCloseButton], [14, this.OnClickRenameButton], [16, this.OnClickShowViewToggle], [17, this.OnClickPersonalCardButton], [18, this.OnClickExchangePreviewRoleButton]];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignChange, this.OnSignChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNameChange, this.OnNameChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRoleShowListChange, this.OnRoleShowListChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHeadIconChange, this.OnHeadIconChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCardChange, this.OnCardChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBirthChange, this.OnBirthChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CurWorldLevelChange, this.OnWorldLevelChange);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerTitleChange, this.OnPlayerTitleChange);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignChange, this.OnSignChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNameChange, this.OnNameChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRoleShowListChange, this.OnRoleShowListChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHeadIconChange, this.OnHeadIconChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCardChange, this.OnCardChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBirthChange, this.OnBirthChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CurWorldLevelChange, this.OnWorldLevelChange);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerTitleChange, this.OnPlayerTitleChange);
  }
  OnBeforeCreate() {
    this.FQc = new UiBehaviorGachaSequence_1.UiBehaviorGachaSequence();
    this.AddUiBehavior(this.FQc);
  }
  async OnBeforeStartAsync() {
    this.p5i = this.OpenParam;
    var e = [];
    for (const t of this.p5i.RoleShowList) {
      e.push(t.Q6n);
    }
    await this.FQc.PreloadLevelSequenceList(e);
    this.gLt = new PlayerTitleItem_1.PlayerTitleItem();
    await this.gLt.CreateThenShowByActorAsync(this.GetItem(26).GetOwner());
  }
  OnStart() {
    this.hVi = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.nFe);
    if (Platform_1.Platform.IsPs5Platform()) {
      this.GetButton(0)?.SetSelfInteractive(false);
      this.GetSprite(24)?.SetUIActive(false);
      this.GetSprite(25)?.SetUIActive(false);
    }
    this.SVi();
    this.yVi();
    this.IVi();
    this.CVi();
    this.vVi();
    this.pVi();
    this.MVi();
    this.RefreshCard();
    this.RefreshPlayerTitle();
    this.Nxa();
    this.RefreshButtonState();
    this.BNe();
    this.GetExtendToggle(16).CanExecuteChange.Bind(this.OnCanShowToggleExecuteChange);
  }
  OnHandleLoadScene() {
    this.gKt = CameraController_1.CameraController.Model.CurrentCameraActor;
    this.Qma = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("SceneCamera1"), 0);
    this.FQc.BindSceneSequenceCamera(this.Qma);
    this.Kma = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("personal"), 0);
    this.FQc.BindEmptySequenceCamera(this.Kma);
    this.Hha = UE.KuroCollectActorComponent.GetActorWithTag(FNameUtil_1.FNameUtil.GetDynamicFName("UpdateInteractBP"), 0);
    this.Hha.SetTickableWhenPaused(true);
    this.FQc.BindUpdateInteractBp(this.Hha);
  }
  OnBeforeShow() {
    var e = [];
    for (const t of this.p5i.RoleShowList) {
      e.push(t.Q6n);
    }
    this.RefreshRoleShowList(e, true);
    this.K8e();
  }
  RefreshRoleShowList(t, e) {
    var i;
    var s = CommonParamById_1.configCommonParamById.GetIntConfig("role_show_list_max_count");
    this._Vi = [];
    for (let e = 0; e < s; e++) {
      if (e < t.length) {
        i = t[e];
        this._Vi.push(i);
      } else {
        this._Vi.push(-1);
      }
    }
    var r = [];
    for (const o of this._Vi) {
      var h = new PersonalRoleDisplayMediumItem_1.PersonalRoleDisplayContentData();
      h.RoleId = o;
      h.IfOtherData = this.p5i.IsOtherData;
      r.push(h);
    }
    this.hVi.RefreshByData(r, () => {
      if (this._Vi.length > 0 && this._Vi[0] > 0) {
        this.nVi = this._Vi[0];
        this.hVi.SelectGridProxy(0);
        this.FQc.PlayRoleSequence(this.nVi);
        this.GetItem(15).SetUIActive(false);
      } else {
        this.FQc.PlayEmptySequence();
        this.GetItem(15).SetUIActive(true);
      }
    });
  }
  OnBeforeHide() {
    this.Ovt();
  }
  OnBeforeDestroy() {
    this.gLt?.Destroy();
  }
  OnAfterDestroy() {
    CameraController_1.CameraController.SetViewTarget(this.gKt, "PersonalRootView.OnBeforeDestroy");
  }
  yVi() {
    var e = this.p5i.IsOtherData ? this.p5i.WorldLevel : ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel;
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(8), "WorldLevelNum", e);
    }
  }
  IVi() {
    var e = this.p5i.IsOtherData ? this.p5i.Level : ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
    if (e) {
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(9), "PlayerLevelNum", e);
    }
  }
  CVi() {
    var e;
    var t;
    var i;
    var s = this.GetText(7);
    if (this.p5i.IsOtherData && !this.p5i.IsBirthdayDisplay || (e = this.p5i.Birthday, t = Math.floor(e / 100), i = e % 100, e === 0)) {
      LguiUtil_1.LguiUtil.SetLocalText(s, "BirthDay", "--", "--");
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(s, "BirthDay", t, i);
    }
  }
  vVi() {
    var e = this.p5i.IsOtherData ? this.p5i.Name : ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    if (e) {
      this.GetText(5).SetText(e);
    }
  }
  pVi() {
    var e = this.p5i.Signature;
    var t = this.p5i.IsOtherData;
    var i = this.GetText(6);
    if (e || t) {
      i.SetText(e);
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(i, "ClickToSetSign");
    }
  }
  MVi() {
    var e = this.GetTexture(4);
    var t = this.p5i.HeadPhotoId;
    var i = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(t, false);
    if (i) {
      this.SetTextureByPath(i.GetRoleHeadIconCircle(), e);
      e.SetUIActive(true);
    } else if (t > 0) {
      i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleHeadIcon(t);
      this.SetRoleIcon(i, e, t);
    }
  }
  SVi() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "UserId", (this.p5i.IsOtherData ? this.p5i : ModelManager_1.ModelManager.FunctionModel).PlayerId);
  }
  RefreshCard() {
    var e = this.p5i.CurCardId;
    if (e &&= BackgroundCardById_1.configBackgroundCardById.GetConfig(e)) {
      this.SetTextureByPath(e.FunctionViewCardPath, this.GetTexture(3));
    }
  }
  Nxa() {
    var e;
    if (PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NeedShowThirdPartyId()) {
      e = (this.p5i.IsOtherData ? this.p5i?.PsnUserId : ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId()) !== "";
      this.GetItem(21)?.SetUIActive(true);
      this.GetTexture(27)?.SetUIActive(e);
      this.GetItem(28)?.SetUIActive(!e);
      if (e) {
        e = this.p5i.IsOtherData ? this.p5i?.PsnOnlineId ?? "" : ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyOnlineId();
        this.GetText(22)?.SetText(e);
      } else {
        this.GetText(22)?.SetText("");
      }
    } else {
      this.GetItem(21)?.SetUIActive(false);
      this.GetTexture(27)?.SetUIActive(false);
      this.GetItem(28)?.SetUIActive(false);
    }
  }
  RefreshButtonState() {
    var e = !this.p5i.IsOtherData;
    this.GetButton(11).SetSelfInteractive(e);
    this.GetButton(2).RootUIComp.SetUIActive(e);
    this.GetButton(12).RootUIComp.SetUIActive(e);
    this.GetButton(14).RootUIComp.SetUIActive(e);
    this.GetButton(18).RootUIComp.SetUIActive(e);
  }
  BNe() {
    var e = ModelManager_1.ModelManager.PersonalModel.CheckCanShowPersonalTip() && !this.p5i.IsOtherData;
    this.GetItem(23).SetUIActive(e);
  }
  K8e() {
    if (!this.p5i.IsOtherData) {
      RedDotController_1.RedDotController.BindRedDot("PersonalCard", this.GetItem(19));
    }
  }
  Ovt() {
    if (!this.p5i.IsOtherData) {
      RedDotController_1.RedDotController.UnBindGivenUi("PersonalCard", this.GetItem(19));
    }
  }
  CheckClickInterval() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("IndividualizationRoleSwitchIntervalTime");
    return Time_1.Time.Now - this.L6e >= e;
  }
  RefreshPlayerTitle() {
    var e = this.p5i.CurPlayerTitleId;
    var t = this.p5i.CurPlayerTitleLevel;
    var i = this.p5i.Sex;
    this.gLt?.Refresh(e, t, i);
  }
}
exports.PersonalRootView = PersonalRootView;
//# sourceMappingURL=PersonalRootView.js.map