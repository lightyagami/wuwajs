"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const BackgroundCardById_1 = require("../../../../Core/Define/ConfigQuery/BackgroundCardById");
const PlayerExpByPlayerLevel_1 = require("../../../../Core/Define/ConfigQuery/PlayerExpByPlayerLevel");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Platform_1 = require("../../../../Launcher/Platform/Platform");
const PlatformSdkManagerNew_1 = require("../../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const GameSettingsDeviceRender_1 = require("../../../GameSettings/GameSettingsDeviceRender");
const CloudGameManager_1 = require("../../../Manager/CloudGameManager");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const NoCircleAttachView_1 = require("../../AutoAttach/NoCircleAttachView");
const CommonInputViewController_1 = require("../../Common/InputView/Controller/CommonInputViewController");
const PlayerTitleItem_1 = require("../../Common/PlayerTitleItem");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const PreDownloadButton_1 = require("../../MobilePredownload/PreDownloadButton");
const LguiUtil_1 = require("../../Util/LguiUtil");
const WorldLevelController_1 = require("../../WorldLevel/WorldLevelController");
const FunctionController_1 = require("../FunctionController");
const FunctionAttachItemGrid_1 = require("./FunctionAttachItemGrid");
const FunctionBottomButtonItem_1 = require("./FunctionBottomButtonItem");
const FunctionResDownLoadItem_1 = require("./FunctionResDownLoadItem");
const FunctionTabLayout_1 = require("./FunctionTabLayout");
class FunctionView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.ovt = undefined;
    this.B7t = undefined;
    this.G7t = undefined;
    this.N7t = undefined;
    this.O7t = undefined;
    this.k7t = undefined;
    this.F7t = undefined;
    this.V7t = undefined;
    this._4_ = undefined;
    this.KKd = undefined;
    this.gLt = undefined;
    this.TCc = undefined;
    this.P31 = undefined;
    this.H7t = new Map();
    this.ypt = new Array();
    this.j7t = undefined;
    this.Gac = () => {
      this.gLt?.Refresh(ModelManager_1.ModelManager.PersonalModel.GetDressedPlayerTitleId(), ModelManager_1.ModelManager.PersonalModel.GetDressedPlayerTitleLevel(), ModelManager_1.ModelManager.PersonalModel.GetSex());
    };
    this.W7t = () => {
      this.CloseMe();
    };
    this.K7t = () => {
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowReturnLoginConfirmBox();
    };
    this.Q7t = () => {
      ControllerHolder_1.ControllerHolder.KuroSdkController.OpenNotice();
    };
    this.X7t = () => {
      FunctionController_1.FunctionController.OpenFunctionRelateView(10020);
    };
    this.$7t = () => {
      WorldLevelController_1.WorldLevelController.OpenWorldLevelInfoView();
    };
    this.Y7t = () => {
      UiManager_1.UiManager.OpenView("TimeOfDaySecondView");
    };
    this.J7t = () => {
      FunctionController_1.FunctionController.OpenFunctionRelateView(10019);
    };
    this.z7t = () => {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("CopiedMyUid");
      UE.LGUIBPLibrary.ClipBoardCopy(ModelManager_1.ModelManager.PlayerInfoModel.GetId().toString());
    };
    this.Z7t = () => {
      FunctionController_1.FunctionController.OpenFunctionRelateView(10049);
    };
    this.eHt = () => {
      if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10060)) {
        UiManager_1.UiManager.OpenView("PersonalRootView", ModelManager_1.ModelManager.PersonalModel.GetPersonalInfoData());
      }
    };
    this.tHt = () => {
      UiManager_1.UiManager.OpenView("PersonalOptionView");
    };
    this.iHt = () => {
      CommonInputViewController_1.CommonInputViewController.OpenPersonalSignInputView();
    };
    this.oHt = () => {
      CommonInputViewController_1.CommonInputViewController.OpenSetRoleNameInputView();
    };
    this.UEd = () => {
      UiManager_1.UiManager.OpenView("PersonalEditView", 2);
      this.gLt?.SetToggleState();
    };
    this.rHt = () => {
      var e;
      if (!this.ovt.MovingState() && !(this.ovt.GetCurrentSelectIndex() <= 0)) {
        e = this.ovt.GetCurrentSelectIndex() - 1;
        this.ovt.AttachToIndex(e, false);
      }
    };
    this.nHt = () => {
      var e;
      if (!this.ovt.MovingState() && !(this.ovt.GetCurrentSelectIndex() >= this.ovt.GetDataLength())) {
        e = this.ovt.GetCurrentSelectIndex() + 1;
        this.ovt.AttachToIndex(e, false);
      }
    };
    this.cWs = () => {
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
        let e = undefined;
        (e = ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ? new ConfirmBoxDefine_1.ConfirmBoxDataNew(100) : new ConfirmBoxDefine_1.ConfirmBoxDataNew(78)).FunctionMap.set(2, () => {
          ControllerHolder_1.ControllerHolder.OnlineController.LeaveWorldTeamRequest(ModelManager_1.ModelManager.FunctionModel.PlayerId);
          this.CloseMe();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    };
    this.bCc = () => {
      ControllerHolder_1.ControllerHolder.PreDownloadController.OnPreDownloadBtnClick(false);
    };
    this.sHt = () => {
      this.N7t.SetUIActive(false);
      this.G7t.SetUIActive(false);
    };
    this.aHt = () => {
      this.hHt();
    };
    this.$At = () => {
      this.r9t();
    };
    this.XAt = () => {
      var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
      if (e) {
        this.GetText(0).SetText(e);
      }
    };
    this.lHt = () => {
      this._Ht();
    };
    this.uHt = () => {
      this.cHt();
    };
    this.mHt = () => {
      this.yHt();
    };
    this.dHt = e => {
      this.BNe(e);
      this.B7t.SetToggleSelectByIndex(e);
    };
    this.CHt = (e, t, i) => {
      e = new FunctionAttachItemGrid_1.FunctionAttachItemGrid(e);
      e.SetNeedAnim(t === 0);
      this.H7t.set(t, e);
      return e;
    };
    this.AF1 = e => {
      this.PF1();
    };
    this.Veu = () => {
      var e = ModelManager_1.ModelManager.PreDownloadModel.IsPreDownloadAvailable() || ModelManager_1.ModelManager.PreDownloadModel.IsComplete();
      this.GetButton(37)?.RootUIComp.SetUIActive(e);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIText], [5, UE.UIText], [6, UE.UIButtonComponent], [7, UE.UIButtonComponent], [8, UE.UIButtonComponent], [9, UE.UISprite], [10, UE.UIItem], [11, UE.UITexture], [12, UE.UIButtonComponent], [13, UE.UIButtonComponent], [14, UE.UIButtonComponent], [15, UE.UIButtonComponent], [16, UE.UIButtonComponent], [17, UE.UIButtonComponent], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIButtonComponent], [21, UE.UIButtonComponent], [22, UE.UIButtonComponent], [23, UE.UITexture], [24, UE.UIButtonComponent], [25, UE.UIText], [26, UE.UIText], [27, UE.UIButtonComponent], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIGridLayout], [31, UE.UIItem], [32, UE.UIButtonComponent], [33, UE.UISprite], [34, UE.UIItem], [35, UE.UIItem], [36, UE.UISprite], [37, UE.UIButtonComponent], [38, UE.UIItem], [39, UE.UIItem]];
    this.BtnBindInfo = [[6, this.W7t], [7, this.K7t], [8, this.X7t], [3, this.$7t], [12, this.Y7t], [13, this.J7t], [14, this.z7t], [15, this.Q7t], [20, this.Z7t], [21, this.eHt], [22, this.tHt], [24, this.iHt], [27, this.oHt], [17, this.rHt], [16, this.nHt], [32, this.cWs], [37, this.bCc]];
  }
  async OnBeforeStartAsync() {
    this.gLt = new PlayerTitleItem_1.PlayerTitleItem();
    this.gLt.CallBack = this.UEd;
    this.gLt.CanShowTip = false;
    await this.gLt.CreateThenShowByActorAsync(this.GetItem(38).GetOwner());
    this.Gac();
    this.P31 = new FunctionResDownLoadItem_1.FunctionResDownLoadItem();
    await this.P31.CreateByActorAsync(this.GetItem(39).GetOwner());
  }
  OnStart() {
    this.G7t = this.GetButton(17).RootUIComp;
    this.N7t = this.GetButton(16).RootUIComp;
    this.O7t = this.GetItem(19);
    this.k7t = this.GetItem(18);
    this.B7t = new FunctionTabLayout_1.FunctionTabLayout(this.GetItem(28));
    this.ovt = new NoCircleAttachView_1.NoCircleAttachView(this.GetItem(10).GetOwner());
    var e = this.GetItem(29);
    e.SetUIActive(false);
    this.mKu();
    this.ovt.CreateItems(e.GetOwner(), 0, this.CHt);
    this.ovt.SetDragBeginCallback(this.sHt);
    this.ovt.SetMoveMultiFactor(50);
    this.ovt.SetPageLimitState(true);
    this.F7t = new FunctionBottomButtonItem_1.FunctionBottomButtonItem(this.GetButton(8).RootUIComp, "FunctionMail");
    this.V7t = new FunctionBottomButtonItem_1.FunctionBottomButtonItem(this.GetButton(15).RootUIComp, "FunctionNotice");
    this._4_ = new FunctionBottomButtonItem_1.FunctionBottomButtonItem(this.GetButton(20).RootUIComp, "FunctionPhotograph");
    this.KKd = new FunctionBottomButtonItem_1.FunctionBottomButtonItem(this.GetButton(13).RootUIComp, "FunctionSetting");
    this.TCc = new PreDownloadButton_1.PreDownloadButtonItemB(this.GetButton(37).RootUIComp);
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10060);
    this.GetButton(21).RootUIComp.SetRaycastTarget(e);
    this.$Vu();
    this.gHt();
    var e = this.ovt.GetCurrentSelectIndex();
    this.BNe(e);
    this.B7t.SetToggleSelectByIndex(e);
    if (Platform_1.Platform.IsPs5Platform()) {
      this.GetButton(14)?.SetSelfInteractive(false);
      this.GetSprite(36)?.SetUIActive(false);
    }
  }
  mKu() {
    var e = this.GetGridLayout(30);
    var t = e.GetCellSize();
    var e = e.GetSpacing();
    var t = t.X + e.X;
    var e = this.THt().HorizontalGridNum * t;
    this.GetItem(10)?.SetWidth(e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CurWorldLevelChange, this.aHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSignChange, this.$At);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNameChange, this.XAt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnHeadIconChange, this.lHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCardChange, this.uHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBirthChange, this.mHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FunctionGridSelected, this.dHt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerTitleChange, this.Gac);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ResDownLoadStateRefresh, this.AF1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPreDownloadAvailableUpdate, this.Veu);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFunctionViewShow);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CurWorldLevelChange, this.aHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSignChange, this.$At);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNameChange, this.XAt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnHeadIconChange, this.lHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCardChange, this.uHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBirthChange, this.mHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerTitleChange, this.Gac);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FunctionGridSelected, this.dHt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ResDownLoadStateRefresh, this.AF1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPreDownloadAvailableUpdate, this.Veu);
  }
  BNe(e) {
    this.G7t.SetUIActive(e > 0);
    this.N7t.SetUIActive(e < this.ovt.GetDataLength() - 1);
    this.O7t.SetUIActive(this.fHt(e));
    this.k7t.SetUIActive(this.pHt(e));
  }
  $Vu() {
    let e = true;
    if (CloudGameManager_1.CloudGameManager.IsCloudGame || Info_1.Info.IsPs5Platform()) {
      e = false;
    }
    this.GetButton(7).RootUIComp.SetUIActive(e);
  }
  fHt(i) {
    var r = [];
    for (let e = 0, t = i; e < t; ++e) {
      r.push(...this.ypt[e]);
    }
    for (const t of r) {
      var e = ModelManager_1.ModelManager.FunctionModel.GetFunctionItemRedDotName(t);
      if (e) {
        e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
        if (e && e.IsRedDotActive()) {
          return true;
        }
      }
    }
    return false;
  }
  pHt(i) {
    var r = [];
    for (let e = i + 1, t = this.ypt.length; e < t; ++e) {
      r.push(...this.ypt[e]);
    }
    for (const t of r) {
      var e = ModelManager_1.ModelManager.FunctionModel.GetFunctionItemRedDotName(t);
      if (e) {
        e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e);
        if (e && e.IsRedDotActive()) {
          return true;
        }
      }
    }
    return false;
  }
  OnBeforeShow() {
    this.vHt();
    this.MHt();
    this.K8e();
    this.mWs();
    this.PF1();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.TemporaryDisableFrameGeneration("FunctionView");
  }
  OnAfterShow() {
    this.EHt();
    this.DUd();
  }
  OnAfterHide() {
    this.Ovt();
  }
  OnBeforeDestroy() {
    for (const e of this.ovt.GetItems()) {
      this.AddChild(e);
    }
    this.B7t.Destroy();
    this.F7t.Destroy();
    this.V7t.Destroy();
    this._4_.Destroy();
    this.KKd.Destroy();
    this.gLt.Destroy();
    this.TCc.Destroy();
    this.P31.EndShow();
    GameSettingsDeviceRender_1.GameSettingsDeviceRender.CancelTemporaryDisableFrameGeneration("FunctionView");
  }
  K8e() {
    this.F7t.BindRedDot();
    this.V7t.BindRedDot();
    this._4_.BindRedDot();
    this.KKd.BindRedDot();
    this.TCc.BindRedDot();
    RedDotController_1.RedDotController.BindRedDot("PersonalInfo", this.GetItem(34));
  }
  Ovt() {
    this.F7t.UnBindRedDot();
    this.V7t.UnBindRedDot();
    this._4_.UnBindRedDot();
    this.KKd.UnBindRedDot();
    this.TCc.UnBindRedDot();
    RedDotController_1.RedDotController.UnBindGivenUi("PersonalInfo", this.GetItem(34));
  }
  vHt() {
    this.K7e();
    this.SHt();
    this.hHt();
    this._Ht();
    this.cHt();
    this.r9t();
    this.yHt();
    this.Gac();
  }
  K7e() {
    var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerName();
    this.GetText(0).SetText(e);
  }
  SHt() {
    var e;
    var t = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(4), "PlayerLevelNum", t);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(1), "UserId", ModelManager_1.ModelManager.FunctionModel.PlayerId);
    var t = PlayerExpByPlayerLevel_1.configPlayerExpByPlayerLevel.GetConfig(t);
    if (t?.LevelExp) {
      e = ModelManager_1.ModelManager.FunctionModel.GetPlayerExp();
      LguiUtil_1.LguiUtil.SetLocalText(this.GetText(5), "ExpText", e, t.LevelExp);
      this.GetSprite(9).SetFillAmount(e / t.LevelExp);
    }
  }
  hHt() {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(2), "WorldLevelNum", ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel);
  }
  _Ht() {
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4);
    const t = this.GetTexture(11);
    var e = ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(e);
    if (e !== undefined) {
      t.SetUIActive(false);
      this.SetTextureShowUntilLoaded(e.GetRoleHeadIconCircle(), t, () => {
        t.SetUIActive(true);
      });
      e = ModelManager_1.ModelManager.PersonalModel.CheckCanShowPersonalTip();
      this.GetItem(35).SetUIActive(e);
    }
  }
  cHt() {
    var e = ModelManager_1.ModelManager.PersonalModel.GetCurCardId();
    if (e &&= BackgroundCardById_1.configBackgroundCardById.GetConfig(e)) {
      this.SetTextureByPath(e.FunctionViewCardPath, this.GetTexture(23));
    }
  }
  r9t() {
    var e = ModelManager_1.ModelManager.PersonalModel.GetSignature();
    var t = this.GetText(25);
    if (e) {
      t.SetText(e);
    } else {
      LguiUtil_1.LguiUtil.SetLocalText(t, "ClickToSetSign");
    }
  }
  yHt() {
    var e;
    var t = ModelManager_1.ModelManager.PersonalModel.GetBirthday();
    var i = this.GetText(26);
    if (t === 0) {
      LguiUtil_1.LguiUtil.SetLocalText(i, "BirthDay", "--", "--");
    } else {
      e = Math.floor(t / 100);
      t = t % 100;
      e = ConfigManager_1.ConfigManager.PersonalConfig.GetBirthLocalText(e, 1);
      t = ConfigManager_1.ConfigManager.PersonalConfig.GetBirthLocalText(t, 0);
      LguiUtil_1.LguiUtil.SetLocalText(i, "BirthDay", e, t);
    }
  }
  IHt(e) {
    var t = this.GetItem(31);
    var i = t.GetStretchRight();
    t.SetStretchRight(i + e);
  }
  gHt() {
    this.j7t = this.THt();
    this.IHt(this.j7t.OffsetWidth);
    var e = ModelManager_1.ModelManager.FunctionModel.GetShowFunctionIdList();
    var t = e.length;
    this.ypt = [];
    let i = 0;
    while (t > i + this.j7t.TotalGridNumber) {
      this.ypt.push(e.slice(i, i + this.j7t.TotalGridNumber));
      i += this.j7t.TotalGridNumber;
    }
    this.ypt.push(e.slice(i, t));
    var r = Math.ceil(t / this.j7t.TotalGridNumber);
    this.B7t.RefreshTab(r);
    this.ovt.SetBoundDistance(0);
    this.ovt.ReloadView(r, this.ypt);
  }
  LHt(i) {
    var r = this.ypt;
    let n = -1;
    for (let e = 0, t = r.length; e < t; ++e) {
      if (r[e].includes(i)) {
        n = e;
      }
    }
    return n;
  }
  mWs() {
    var e;
    var t = this.GetButton(32)?.RootUIComp;
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      t?.SetUIActive(true);
      e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(ModelManager_1.ModelManager.FunctionModel.PlayerId)?.PingState;
      this.pOi(e);
    } else {
      t?.SetUIActive(false);
    }
  }
  pOi(e) {
    var t;
    var i = this.GetSprite(33);
    i.SetUIActive(true);
    if (e === Protocol_1.Aki.Protocol.r7s.Proto_UNKNOWN) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("SP_SignalUnknown");
      this.SetSpriteByPath(t, i, false);
    } else if (e === Protocol_1.Aki.Protocol.r7s.Proto_GREAT) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("SP_SignalGreat");
      this.SetSpriteByPath(t, i, false);
    } else if (e === Protocol_1.Aki.Protocol.r7s.Proto_GOOD) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("SP_SignalGood");
      this.SetSpriteByPath(t, i, false);
    } else if (e === Protocol_1.Aki.Protocol.r7s.Proto_POOR) {
      t = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath("SP_SignalPoor");
      this.SetSpriteByPath(t, i, false);
    }
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length > 1 || isNaN(Number(e[0]))) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "功能菜单聚焦引导的ExtraParam配置错误", ["configParams", e]);
      }
    } else {
      var e = Number(e[0]);
      var t = this.LHt(e);
      if (t === -1) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 16, "功能菜单聚焦引导的ExtraParam配置错误, 检查functionId", ["functionId", e]);
        }
      } else {
        this.ovt.AttachToIndex(t, true);
        t = this.H7t.get(t);
        if (t) {
          t = t.GetFunctionItem(e);
          if (t.GetActive()) {
            t = t.GetButtonItem();
            if (t) {
              return [t, t];
            }
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 16, "功能菜单聚焦引导的ExtraParam配置错误, 检查functionId", ["functionId", e]);
        }
      }
    }
  }
  MHt() {
    this.GetButton(8).SetSelfInteractive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10020));
    this.GetButton(12).SetSelfInteractive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10018));
    this.GetButton(13).SetSelfInteractive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10019));
    this.GetButton(15).SetSelfInteractive(ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk() || PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn);
    this.GetButton(20).SetSelfInteractive(ModelManager_1.ModelManager.FunctionModel.IsOpen(10049));
    var e = ModelManager_1.ModelManager.PreDownloadModel.IsPreDownloadAvailable() || ModelManager_1.ModelManager.PreDownloadModel.IsComplete();
    this.GetButton(37)?.RootUIComp.SetUIActive(e);
  }
  DUd() {
    ControllerHolder_1.ControllerHolder.ParallelPackageController.TryShowParallelPackageUpdateConfirmBox(0);
  }
  EHt() {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Functional", 10, "功能开启界面Start阶段计算数据输出", ["剩余宽度", this.j7t.OffsetWidth], ["显示数量", this.j7t.TotalGridNumber]);
    }
    var e = this.THt();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Functional", 10, "功能开启界面AfterShow阶段计算数据输出", ["剩余宽度", e.OffsetWidth], ["显示数量", e.TotalGridNumber]);
    }
  }
  THt() {
    var e = this.GetItem(29);
    var t = this.GetGridLayout(30);
    var i = t.GetCellSize();
    var r = t.GetSpacing();
    var t = t.GetPadding();
    var n = e.GetWidth();
    var e = e.GetHeight();
    var o = (n - t.Left - t.Right) % (i.X + r.X);
    var s = o >= i.X ? 1 : 0;
    var n = Math.floor((n - t.Left - t.Right) / (i.X + r.X)) + s;
    var s = (e - t.Top - t.Bottom) % (i.Y + r.Y) > i.Y ? 1 : 0;
    var e = Math.floor((e - t.Top - t.Bottom) / (i.Y + r.Y)) + s;
    return {
      TotalGridNumber: n * e,
      OffsetWidth: o >= i.X ? o - i.X : o + r.X,
      HorizontalGridNum: n,
      VerticalGridNum: e
    };
  }
  PF1() {
    if (ModelManager_1.ModelManager.SubPackageDownLoadModel.NeedShowBattleViewButton()) {
      this.P31?.SetUiActive(true);
      this.P31?.StartShow();
    } else {
      this.P31?.SetUiActive(false);
      this.P31?.EndShow();
    }
  }
}
exports.FunctionView = FunctionView;
//# sourceMappingURL=FunctionView.js.map