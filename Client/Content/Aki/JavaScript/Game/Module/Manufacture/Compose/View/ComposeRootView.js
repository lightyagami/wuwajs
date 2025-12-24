"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeRootView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance");
const UiCameraAnimationManager_1 = require("../../../UiCameraAnimation/UiCameraAnimationManager");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const CommonManager_1 = require("../../Common/CommonManager");
const StarLevelComponent_1 = require("../../Common/StarLevelComponent");
const ComposeController_1 = require("../ComposeController");
const ComposeMediumItemGrid_1 = require("../Item/ComposeMediumItemGrid");
const MainTypeItem_1 = require("../Item/MainTypeItem");
const ComposeIngredientsView_1 = require("./ComposeIngredientsView");
const TIMERGAP = 1000;
class ComposeRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.UTi = 0;
    this.ATi = 0;
    this.PTi = 0;
    this.xTi = undefined;
    this.wTi = undefined;
    this.BTi = undefined;
    this.vNt = undefined;
    this.MNt = undefined;
    this.aTi = [];
    this.hTi = [];
    this.lTi = [];
    this.SNt = undefined;
    this.bTi = false;
    this.p9s = false;
    this.oWs = undefined;
    this.qTi = () => {
      this.INt();
      this.bTi = true;
      this.MNt.SetResultDataDirty();
      this.MNt.UpdateData(20, this.LNt());
      var e = this.MNt.GetUniqueIdByGroupId(20);
      this.vNt.SetSortUniqueId(e);
      this.vNt.SetActive(true);
      this.vNt.UpdateData(20, this.LNt());
      var e = this.vNt.GetUniqueIdByGroupId(20);
      this.MNt.SetFilterUniqueId(e);
      this.bTi = false;
      this.GTi();
      this.YGt();
      this.DNt();
      var e = CommonManager_1.CommonManager.GetComposeMaxLevel();
      var t = CommonManager_1.CommonManager.GetCurrentRewardLevel();
      this.SNt.ShowLevel(t, e);
      this.AGt();
    };
    this.GOe = undefined;
    this.BNt = () => {
      this.AGt();
      this.xTi.OnSecondTimerRefresh();
      if (this.bNt()) {
        ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync().then(() => {
          this.NTi();
        });
      } else if (this.NNt()) {
        ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync().then(() => {
          this.bTi = false;
          this.OTi();
        });
      }
    };
    this.kTi = () => {
      this.ChildPopView?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise(), true, false).then(() => {
        this.ChildPopView?.PopItem.SetActive(false);
      });
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, true);
    };
    this.jwe = e => {
      if (e === "OnBlackScreen") {
        this.ChildPopView?.PlayLevelSequenceByName("BlackScreenShow");
        if (this.oWs?.IsPending()) {
          this.oWs.SetResult();
        }
        ComposeController_1.ComposeController.PlayCompositeEnterDisplay(this.VTi);
        this.p9s = true;
      }
    };
    this.VTi = () => {
      if (UiManager_1.UiManager.IsViewShow("ComposeCarryOnView")) {
        ComposeController_1.ComposeController.PlayCompositeLoopDisplay();
      }
    };
    this.$Ge = e => {
      if (e === "CompositeRewardView") {
        this.ChildPopView?.PopItem.SetActive(true);
        this.ChildPopView?.PlayLevelSequenceByName("Start");
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.HangPlotViewHud, false);
        e = ModelManager_1.ModelManager.ComposeModel.ComposeSuccessFlow;
        ComposeController_1.ComposeController.PlayCompositeFlow(e);
      }
    };
    this.cHe = () => {
      var e = new ComposeMediumItemGrid_1.ComposeMediumItemGrid();
      e.BindOnExtendToggleStateChanged(this.HTi);
      return e;
    };
    this.HTi = e => {
      var t = e.Data;
      let i = 0;
      this.BTi.DeselectCurrentGridProxy();
      switch (t.MainType) {
        case 1:
          this.UTi = this.aTi.indexOf(t);
          i = this.UTi;
          break;
        case 2:
          this.ATi = this.hTi.indexOf(t);
          i = this.ATi;
          break;
        case 3:
          this.PTi = this.lTi.indexOf(t);
          i = this.PTi;
      }
      if (this.BTi.IsGridDisplaying(i)) {
        if (t.IsNew) {
          ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey, t.ConfigId);
          t.IsNew = false;
        }
        this.BTi.SelectGridProxy(i);
        this.BTi.RefreshGridProxy(i);
        this.xTi.RefreshTips(t);
      }
    };
    this.xNt = () => {
      var e = new MainTypeItem_1.MainTypeItem();
      e.SetMainTypeCallback(this.wNt);
      return e;
    };
    this.wNt = e => {
      if (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType !== e) {
        switch (e) {
          case 1:
            ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType = 1;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchComposeType);
            this.GTi();
            this.OTi();
            this.DNt();
            break;
          case 2:
            ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType = 2;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchComposeType);
            this.GTi();
            this.OTi();
            this.DNt();
            break;
          case 3:
            ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType = 3;
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchComposeType);
            this.GTi();
            this.OTi();
            this.DNt();
        }
      }
    };
    this.OTi = () => {
      switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
        case 1:
          this.vNt.UpdateData(20, this.LNt());
          var e = this.vNt.GetUniqueIdByGroupId(20);
          this.MNt.SetFilterUniqueId(e);
          this.MNt.SetResultDataDirty();
          this.MNt.UpdateData(20, this.LNt());
          var e = this.MNt.GetUniqueIdByGroupId(20);
          this.vNt.SetSortUniqueId(e);
          break;
        case 2:
          this.vNt.UpdateData(22, this.LNt());
          e = this.vNt.GetUniqueIdByGroupId(22);
          this.MNt.SetFilterUniqueId(e);
          this.MNt.SetResultDataDirty();
          this.MNt.UpdateData(22, this.LNt());
          e = this.MNt.GetUniqueIdByGroupId(22);
          this.vNt.SetSortUniqueId(e);
          break;
        case 3:
          this.MNt.SetResultDataDirty();
          this.MNt.UpdateData(23, this.LNt());
      }
    };
    this.FNt = e => {
      var t = e.filter(e => {
        return e.ExistStartTime <= 0 || TimeUtil_1.TimeUtil.IsInTimeSpan(e.ExistStartTime, e.ExistEndTime);
      });
      switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
        case 1:
          this.UTi = this.bTi ? this.UTi : 0;
          this.aTi = t;
          break;
        case 2:
          this.ATi = this.bTi ? this.ATi : 0;
          this.hTi = t;
          break;
        case 3:
          this.PTi = this.bTi ? this.PTi : 0;
          this.lTi = t;
      }
      this.BTi.DeselectCurrentGridProxy();
      this.jNt();
      if (t.length === 0) {
        this.GetItem(8).SetUIActive(true);
        this.xTi.SetActive(false);
      } else {
        this.GetItem(8).SetUIActive(false);
        this.xTi.SetActive(true);
        this.jTi(!this.bTi);
      }
    };
    this.NTi = () => {
      this.bTi = true;
      this.OTi();
      this.bTi = false;
    };
    this.jNt = () => {
      switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
        case 1:
          this.BTi.RefreshByData(this.aTi);
          break;
        case 2:
          this.BTi.RefreshByData(this.hTi);
          break;
        case 3:
          this.BTi.RefreshByData(this.lTi);
      }
    };
    this.WTi = e => {
      ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 2;
      UiManager_1.UiManager.OpenView("ComposeLevelView");
    };
    this.KTi = e => {
      ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 1;
      UiManager_1.UiManager.OpenView("ManufactureHelpRoleView", e);
    };
    this.DNt = () => {
      this.ChildPopView?.PopItem.SetTitleVisible(true);
      switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
        case 1:
          this.ChildPopView?.PopItem.SetTitleText(ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("ReagentProduction") ?? "");
          break;
        case 2:
          this.ChildPopView?.PopItem.SetTitleText(ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("Structure") ?? "");
          break;
        case 3:
          this.ChildPopView?.PopItem.SetTitleText(ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("Purification") ?? "");
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIHorizontalLayout], [12, UE.UIItem], [13, UE.UIText]];
    this.BtnBindInfo = [[5, this.WTi]];
  }
  async OnBeforeStartAsync() {
    this.xTi = new ComposeIngredientsView_1.ComposeIngredientsView();
    this.wTi = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.xNt);
    await Promise.all([this.wTi.RefreshByDataAsync([1, 2, 3]), this.xTi.CreateByActorAsync(this.GetItem(4).GetOwner()), ComposeController_1.ComposeController.SendSynthesisInfoRequestAsync()]);
    this.xTi.SetActive(true);
  }
  OnStart() {
    this.vNt = new FilterEntrance_1.FilterEntrance(this.GetItem(3), this.FNt);
    this.vNt.SetActive(false);
    this.MNt = new SortEntrance_1.SortEntrance(this.GetItem(10), this.FNt);
    this.MNt.SetSortToggleState(true);
    this.BTi = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetLoopScrollViewComponent(2).TemplateGrid, this.cHe);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(9), "ComposeLevelButtonText");
    this.SNt = new StarLevelComponent_1.StarLevelComponent(this.GetHorizontalLayout(11));
    CommonManager_1.CommonManager.SetCurrentSystem(1);
    ComposeController_1.ComposeController.RegisterCurrentInteractionEntity();
    this.oWs = new CustomPromise_1.CustomPromise();
    ModelManager_1.ModelManager.ComposeModel.CurrentInteractCreatureDataLongId = ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent, this.jwe);
    if (ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId === undefined) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Compose", 64, "[LevelEventOpenSystem] 打开合成界面时找不到交互对象，直接关闭界面");
      }
      this.CloseMe();
    }
  }
  OnBeforeShow() {
    this.qTi();
    this.ChildPopView?.PopItem.SetMaskResponsibleState(false);
  }
  async OnBeforeShowAsyncImplement() {
    if (UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence() && this.oWs) {
      await this.oWs.Promise;
    }
  }
  OnAfterShow() {
    this.JNt();
    this.oWs = undefined;
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent, this.jwe);
    this.wTi.ClearChildren();
    this.BTi.ClearGridProxies();
    this.SNt.Clear();
    var e = ModelManager_1.ModelManager.ComposeModel;
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.ComposeLevelKey);
    ComposeController_1.ComposeController.PlayLeaveCompositeAudio();
    ComposeController_1.ComposeController.ClearCurrentInteractionEntityDisplay();
    e.ClearComposeRoleItemDataList();
    e.CurrentComposeRoleId = 0;
    e.CurrentComposeListType = 1;
    RedDotController_1.RedDotController.UnBindRedDot("ComposeReagentProduction");
    this.oWs = undefined;
  }
  JNt() {
    var e;
    var t = this.ChildPopView.PopItem;
    if (t && !this.p9s && (e = !UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence(), t.GetActive() !== e)) {
      t.SetActive(e);
    }
  }
  INt() {
    ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 0;
    var t = this.wTi.GetLayoutItemList();
    let i = false;
    var s = ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType;
    for (let e = 0; e < t.length; e++) {
      var r = t[e];
      var o = r.GetMainType();
      if (this.zNt(s).length > 0 || e === t.length - 1) {
        r.SetUiActive(true);
        if (s === o && !i) {
          this.wTi.SelectGridProxy(r.GridIndex);
          i = true;
        }
      } else {
        r.SetUiActive(false);
      }
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GetComposeData, this.qTi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenHelpRole, this.KTi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComposeSuccess, this.NTi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ComposeFail, this.NTi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeginPlayCompositeWorkingDisplay, this.kTi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    this.GOe = TimerSystem_1.TimerSystem.Forever(this.BNt, TIMERGAP);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GetComposeData, this.qTi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComposeSuccess, this.NTi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ComposeFail, this.NTi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenHelpRole, this.KTi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeginPlayCompositeWorkingDisplay, this.kTi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    if (this.GOe && TimerSystem_1.TimerSystem.Has(this.GOe)) {
      TimerSystem_1.TimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
  AGt() {
    var e = ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTime();
    if (e) {
      this.GetItem(12).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "RefreshTime", e);
    } else {
      this.GetItem(12).SetUIActive(false);
    }
  }
  bNt() {
    return ModelManager_1.ModelManager.ComposeModel.GetRefreshLimitTimeValue() <= 0;
  }
  NNt() {
    var e = this.LNt();
    if (e) {
      for (const t of e) {
        if (t.ExistEndTime > 0 && !TimeUtil_1.TimeUtil.IsInTimeSpan(t.ExistStartTime, t.ExistEndTime)) {
          return true;
        }
      }
    }
    return false;
  }
  jTi(e = false) {
    let t = 0;
    switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
      case 1:
        t = this.UTi;
        this.xTi.RefreshTips(this.aTi[t]);
        break;
      case 2:
        t = this.ATi;
        this.xTi.RefreshTips(this.hTi[t]);
        break;
      case 3:
        t = this.PTi;
        this.xTi.RefreshTips(this.lTi[t]);
    }
    this.BTi.DeselectCurrentGridProxy();
    if (e) {
      this.BTi.ScrollToGridIndex(t);
    }
    this.BTi.SelectGridProxy(t);
  }
  GTi() {
    this.GetButton(5).GetOwner().GetUIItem().SetUIActive(ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType === 1);
    this.QTi();
  }
  QTi() {
    var e;
    if (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType === 1) {
      e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_ReagentProductionLevel");
      this.SetSpriteByPath(e, this.GetSprite(6), false);
    }
  }
  zNt(e) {
    let t = undefined;
    switch (e) {
      case 1:
        t = ModelManager_1.ModelManager.ComposeModel.GetReagentProductionDataList();
        break;
      case 2:
        t = ModelManager_1.ModelManager.ComposeModel.GetStructureDataList();
        break;
      case 3:
        t = ModelManager_1.ModelManager.ComposeModel.GetPurificationDataList();
        break;
      default:
        return;
    }
    return t;
  }
  LNt() {
    return this.zNt(ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType);
  }
  YGt() {
    RedDotController_1.RedDotController.BindRedDot("ComposeReagentProduction", this.GetItem(7));
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t;
    if (this.BTi?.DataInited) {
      t = Number(e[0]);
      if (t = this.BTi.GetGridByDisplayIndex(t)) {
        return [t, t];
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Guide", 53, "合成界面聚焦引导的额外参数配置错误", ["configParams", e]);
        }
        return;
      }
    }
  }
}
exports.ComposeRootView = ComposeRootView;
//# sourceMappingURL=ComposeRootView.js.map