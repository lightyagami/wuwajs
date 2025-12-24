"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookRootView = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotController_1 = require("../../../RedDot/RedDotController");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine");
const TouchFingerDefine_1 = require("../../../Ui/TouchFinger/TouchFingerDefine");
const UiManager_1 = require("../../../Ui/UiManager");
const FilterEntrance_1 = require("../../Common/FilterSort/Filter/View/FilterEntrance");
const SortEntrance_1 = require("../../Common/FilterSort/Sort/View/SortEntrance");
const StarLevelComponent_1 = require("../../Manufacture/Common/StarLevelComponent");
const UiCameraAnimationManager_1 = require("../../UiCameraAnimation/UiCameraAnimationManager");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const CookController_1 = require("../CookController");
const CookingIngredientsView_1 = require("./CookingIngredientsView");
const CookMediumItemGrid_1 = require("./CookMediumItemGrid");
const TIMERGAP = 1000;
class CookRootView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.mNt = 0;
    this.dNt = 0;
    this.CNt = undefined;
    this.gNt = undefined;
    this.fNt = new Array();
    this.Zqt = new Array();
    this.pNt = undefined;
    this.vNt = undefined;
    this.MNt = undefined;
    this.ENt = false;
    this.SNt = undefined;
    this.oWs = undefined;
    this.p9s = false;
    this.yNt = () => {
      this.INt();
      this.TNt();
      this.vNt.UpdateData(19, this.LNt());
      var e = this.vNt.GetUniqueIdByGroupId(19);
      this.MNt.SetFilterUniqueId(e);
      this.MNt.SetResultDataDirty();
      this.MNt.UpdateData(19, this.LNt());
      var e = this.MNt.GetUniqueIdByGroupId(19);
      this.vNt.SetSortUniqueId(e);
      this.YGt();
      var e = ModelManager_1.ModelManager.CookModel.GetCookerMaxLevel();
      var t = ModelManager_1.ModelManager.CookModel.GetCookerInfo().CookingLevel;
      this.SNt.ShowLevel(t, e);
      this.AGt();
    };
    this.RNt = e => {
      this.UNt(e);
    };
    this.ANt = () => {
      this.PNt();
    };
    this.GOe = undefined;
    this.xNt = () => {
      var e = new MainTypeItem();
      e.SetMainTypeCallback(this.wNt);
      return e;
    };
    this.BNt = () => {
      this.AGt();
      this.pNt?.OnSecondTimerRefresh();
      if (this.bNt() || this.qNt()) {
        CookController_1.CookController.SendCookingDataRequestAsync().then(e => {
          if (e) {
            this.GNt();
          }
        });
      } else if (this.NNt()) {
        CookController_1.CookController.SendCookingDataRequestAsync().then(e => {
          if (e) {
            this.vNt.UpdateData(19, this.LNt());
            e = this.vNt.GetUniqueIdByGroupId(19);
            this.MNt.SetFilterUniqueId(e);
          }
        });
      }
    };
    this.cHe = () => {
      var e = new CookMediumItemGrid_1.CookMediumItemGrid();
      e.BindOnExtendToggleStateChanged(this.ONt);
      return e;
    };
    this.jwe = e => {
      if (e === "OnBlackScreen") {
        this.ChildPopView?.PlayLevelSequenceByName("BlackScreenShow");
        if (this.oWs?.IsPending()) {
          this.oWs.SetResult();
        }
        this.p9s = true;
      }
    };
    this.Qvt = (e, t) => {
      this.gNt.DeselectCurrentGridProxy(false);
      this.mNt = 0;
      this.FNt(e);
    };
    this.VNt = (e, t) => {
      this.FNt(e);
    };
    this.GNt = () => {
      var e;
      if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
        this.vNt.UpdateData(19, this.LNt());
        e = this.vNt.GetUniqueIdByGroupId(19);
        this.MNt.SetFilterUniqueId(e);
        this.MNt.SetResultDataDirty();
        this.MNt.UpdateData(19, this.LNt());
        e = this.MNt.GetUniqueIdByGroupId(19);
        this.vNt.SetSortUniqueId(e);
      } else {
        this.vNt.UpdateData(27, this.LNt());
        e = this.vNt.GetUniqueIdByGroupId(27);
        this.MNt.SetFilterUniqueId(e);
        this.MNt.SetResultDataDirty();
        this.MNt.UpdateData(27, this.LNt());
        e = this.MNt.GetUniqueIdByGroupId(27);
        this.vNt.SetSortUniqueId(e);
      }
    };
    this.HNt = (e = true) => {
      this.jNt(() => {
        this.WNt(e);
      });
      this.pNt.RefreshTipsWithSavedData();
    };
    this.jNt = e => {
      this.gNt.DeselectCurrentGridProxy();
      if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
        this.gNt.RefreshByData(this.fNt, false, e);
      } else {
        this.gNt.RefreshByData(this.Zqt, false, e);
      }
    };
    this.KNt = () => {
      this.ChildPopView?.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise(), true, false).then(() => {
        this.ChildPopView?.PopItem.SetActive(false);
      });
    };
    this.XNt = () => {
      this.ChildPopView?.PopItem.SetUiActive(false);
    };
    this.QNt = () => {
      CookController_1.CookController.TryRequestChangeEntityStateByEvent("finishcook", this);
    };
    this.$Ge = e => {
      if (e === "CompositeRewardView") {
        this.ChildPopView?.PopItem.SetActive(true);
        this.ChildPopView?.PlayLevelSequenceByName("Start");
      }
    };
    this._la = () => {
      this.pNt.RefreshCooking();
    };
    this.YNt = () => {
      if (CookController_1.CookController.IsPlayingSuccessDisplay) {
        CookController_1.CookController.SkipCookSuccessDisplay();
      } else if (CookController_1.CookController.IsPlayingFailDisplay) {
        CookController_1.CookController.SkipCookFailDisplay();
      }
    };
    this.wNt = e => {
      if (ModelManager_1.ModelManager.CookModel.CurrentCookListType !== e) {
        if (e === 0) {
          ModelManager_1.ModelManager.CookModel.CurrentCookListType = 0;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchCookType);
          this.GetItem(3).SetUIActive(true);
          this.ENt = true;
        } else {
          ModelManager_1.ModelManager.CookModel.CurrentCookListType = 1;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SwitchCookType);
          this.ENt = true;
          this.GetItem(3).SetUIActive(false);
        }
        this.GNt();
        this.DNt();
        this.ENt = false;
      }
    };
    this.ONt = e => {
      let t = 0;
      var i;
      var e = e.Data;
      this.gNt.DeselectCurrentGridProxy();
      if (e.MainType === 0) {
        this.mNt = this.fNt.indexOf(i = e);
        t = this.mNt;
        this.pNt.RefreshTips(i);
      } else {
        this.dNt = this.Zqt.indexOf(i = e);
        t = this.dNt;
        this.pNt.RefreshTips(i);
      }
      if (this.gNt.IsGridDisplaying(t)) {
        if (e.IsNew && !this.ENt) {
          ModelManager_1.ModelManager.NewFlagModel.RemoveNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey, e.ItemId);
          e.IsNew = false;
        }
        this.gNt.SelectGridProxy(t);
        this.gNt.RefreshGridProxy(t);
        this.DNt();
        this.ENt = false;
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIHorizontalLayout], [1, UE.UIItem], [2, UE.UILoopScrollViewComponent], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIButtonComponent], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIText], [10, UE.UIItem], [11, UE.UIHorizontalLayout], [12, UE.UIItem], [13, UE.UIText]];
    this.BtnBindInfo = [[5, this.ANt]];
  }
  async OnBeforeStartAsync() {
    this.pNt = new CookingIngredientsView_1.CookingIngredientsView();
    this.CNt = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(0), this.xNt);
    await Promise.all([this.pNt.CreateByActorAsync(this.GetItem(4).GetOwner()), this.CNt.RefreshByDataAsync([0, 1]), CookController_1.CookController.SendCookingDataRequestAsync()]);
  }
  OnStart() {
    this.gNt = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(2), this.GetLoopScrollViewComponent(2).TemplateGrid, this.cHe);
    this.vNt = new FilterEntrance_1.FilterEntrance(this.GetItem(3), this.Qvt);
    this.MNt = new SortEntrance_1.SortEntrance(this.GetItem(10), this.VNt);
    this.MNt.SetSortToggleState(true);
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(9), "CookLevelButtonText");
    this.SNt = new StarLevelComponent_1.StarLevelComponent(this.GetHorizontalLayout(11));
    if (ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId === undefined) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Cook", 64, "[LevelEventOpenSystem] 打开烹饪界面时找不到交互对象，直接关闭界面");
      }
      this.CloseMe();
    }
    this.oWs = new CustomPromise_1.CustomPromise();
    var e = ModelManager_1.ModelManager.CookModel;
    e.CurrentInteractCreatureDataLongId = ModelManager_1.ModelManager.InteractionModel.InteractCreatureDataLongId;
    e.CurrentCookListType = 0;
    this.yNt();
    CookController_1.CookController.TryRequestChangeEntityStateByEvent("opencook", this);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent, this.jwe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseCookRole, this._la);
  }
  OnBeforeShow() {
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
  JNt() {
    var e;
    var t = this.ChildPopView.PopItem;
    if (t && !this.p9s && (e = !UiCameraAnimationManager_1.UiCameraAnimationManager.IsPlayingBlendInSequence(), t.GetActive() !== e)) {
      t.SetActive(e);
    }
  }
  OnAfterPlayStartSequence() {
    var e = this.mNt;
    this.gNt.DeselectCurrentGridProxy();
    this.gNt.ScrollToGridIndex(e);
    this.gNt.SelectGridProxy(e);
  }
  INt() {
    ModelManager_1.ModelManager.CookModel.CurrentCookViewType = 0;
    var t = this.CNt.GetLayoutItemList();
    let i = false;
    for (let e = 0; e < t.length; e++) {
      var s = t[e];
      if (this.zNt(s.GetMainType()).length > 0 || e === t.length - 1) {
        s.SetUiActive(true);
        if (!i) {
          this.CNt.SelectGridProxy(s.GridIndex);
          ModelManager_1.ModelManager.CookModel.CurrentCookListType = s.GetMainType();
          i = true;
        }
      } else {
        s.SetUiActive(false);
      }
    }
  }
  UNt(e) {
    UiManager_1.UiManager.OpenView("CookRoleView", e);
  }
  PNt() {
    UiManager_1.UiManager.OpenView("CookLevelView");
  }
  OnAfterHide() {
    ModelManager_1.ModelManager.NewFlagModel.SaveNewFlagConfig(LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.UpdateFormula, this.GNt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CookSuccess, this.HNt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CookFail, this.HNt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MachiningSuccess, this.HNt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MachiningStudyFail, this.HNt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.GetCookData, this.yNt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenCookRole, this.RNt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OpenCookLevel, this.ANt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeginPlayCookSuccessDisplay, this.KNt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeginPlayCookFailDisplay, this.XNt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayCookSuccessDisplayFinished, this.QNt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Ui左键点击, this.YNt);
    InputDistributeController_1.InputDistributeController.BindTouch(TouchFingerDefine_1.EFingerIndex.One, this.YNt);
    this.GOe = TimerSystem_1.GameplayTimerSystem.Forever(this.BNt, TIMERGAP);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.UpdateFormula, this.GNt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CookSuccess, this.HNt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CookFail, this.HNt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MachiningSuccess, this.HNt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MachiningStudyFail, this.HNt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.GetCookData, this.yNt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenCookRole, this.RNt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OpenCookLevel, this.ANt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeginPlayCookSuccessDisplay, this.KNt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeginPlayCookFailDisplay, this.XNt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayCookSuccessDisplayFinished, this.QNt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Ui左键点击, this.YNt);
    InputDistributeController_1.InputDistributeController.UnBindTouch(TouchFingerDefine_1.EFingerIndex.One, this.YNt);
    if (this.GOe && TimerSystem_1.GameplayTimerSystem.Has(this.GOe)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.GOe);
      this.GOe = undefined;
    }
  }
  AGt() {
    var e = ModelManager_1.ModelManager.CookModel.GetRefreshLimitTime();
    if (e) {
      this.GetItem(12).SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "RefreshTime", e);
    } else {
      this.GetItem(12).SetUIActive(false);
    }
  }
  bNt() {
    return ModelManager_1.ModelManager.CookModel.GetRefreshLimitTimeValue() <= 0;
  }
  qNt() {
    return ModelManager_1.ModelManager.CookModel.CheckHasItemTimeoutStateChangedCore();
  }
  NNt() {
    if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
      for (const e of this.LNt()) {
        if (e.ExistEndTime > 0 && !TimeUtil_1.TimeUtil.IsInTimeSpan(e.ExistStartTime, e.ExistEndTime)) {
          return true;
        }
      }
    }
    return false;
  }
  TNt() {
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_CookLevel");
    this.SetSpriteByPath(e, this.GetSprite(6), false);
  }
  YGt() {
    var e = this.GetItem(7);
    RedDotController_1.RedDotController.BindRedDot("CookerLevel", e);
  }
  DisableRedDot() {
    RedDotController_1.RedDotController.UnBindRedDot("CookerLevel");
  }
  FNt(e) {
    if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
      this.fNt = e;
      this.fNt = this.fNt.filter(e => e.IsUnLock || e.ExistEndTime <= 0 || TimeUtil_1.TimeUtil.IsInTimeSpan(e.ExistStartTime, e.ExistEndTime));
    } else {
      this.Zqt = e;
    }
    this.jNt(() => {
      if (e.length > 0) {
        this.WNt(true);
      }
    });
    if (e.length === 0) {
      this.GetItem(8).SetUIActive(true);
      this.pNt.SetUiActive(false);
    } else {
      this.GetItem(8).SetUIActive(false);
      this.pNt.SetUiActive(true);
    }
  }
  DNt() {
    this.ChildPopView?.PopItem.SetTitleVisible(true);
    switch (ModelManager_1.ModelManager.CookModel.CurrentCookListType) {
      case 0:
        this.ChildPopView?.PopItem.SetTitleText(ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("MakingDishes") ?? "");
        break;
      case 1:
        this.ChildPopView?.PopItem.SetTitleText(ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("MakingAccessory") ?? "");
    }
  }
  zNt(e) {
    if (e === 0) {
      return ModelManager_1.ModelManager.CookModel.GetCookingDataList();
    } else {
      return ModelManager_1.ModelManager.CookModel.GetMachiningDataList();
    }
  }
  LNt() {
    return this.zNt(ModelManager_1.ModelManager.CookModel.CurrentCookListType);
  }
  WNt(e = false) {
    let t = 0;
    if (ModelManager_1.ModelManager.CookModel.CurrentCookListType === 0) {
      t = this.mNt;
      this.pNt.RefreshTips(this.fNt[t]);
    } else {
      t = this.dNt;
      this.pNt.RefreshTips(this.Zqt[t]);
    }
    this.gNt.DeselectCurrentGridProxy();
    if (e) {
      TimerSystem_1.GameplayTimerSystem.Wait(TimerSystem_1.MIN_TIME).finally(() => {
        this.gNt.ScrollToGridIndex(t);
      });
    }
    this.gNt.SelectGridProxy(t);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnExecuteUiCameraSequenceEvent, this.jwe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseCookRole, this._la);
    CookController_1.CookController.TryRequestChangeEntityStateByEvent("endcook", this);
    CookController_1.CookController.ClearCookDisplay();
    this.DisableRedDot();
    if (this.gNt) {
      this.gNt.ClearGridProxies();
      this.gNt = undefined;
    }
    if (this.vNt) {
      this.vNt.Destroy();
      this.vNt = undefined;
    }
    if (this.MNt) {
      this.MNt.Destroy();
    }
    if (this.CNt) {
      this.CNt.ClearChildren();
      this.CNt = undefined;
    }
    this.SNt.Clear();
    var e = ModelManager_1.ModelManager.CookModel;
    e.CurrentCookRoleId = undefined;
    e.ClearCookRoleItemDataList();
    this.oWs = undefined;
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = this.GetGuideUiItem(e[0]);
    if (t) {
      return [t, t];
    }
    t = Number(e[0]);
    if (this.gNt?.DataInited) {
      if (t !== 0) {
        t = this.gNt.GetGridAndScrollToByJudge(t, (e, t) => {
          return t.MainType === 0 && t.SubType === 60000 && e === t.DataId;
        });
        if (t) {
          return [t, t];
        }
      } else {
        t = this.gNt.GetGridByDisplayIndex(0);
        if (t) {
          return [t, t];
        }
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Guide", 16, "烹饪界面聚焦引导的额外参数配置错误", ["configParams", e]);
      }
    }
  }
}
exports.CookRootView = CookRootView;
class MainTypeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ZNt = undefined;
    this.OnClickedCallback = undefined;
    this.ScrollViewDelegate = undefined;
    this.GridIndex = 0;
    this.DisplayIndex = 0;
    this.OnItemButtonClicked = e => {
      if (e === 1) {
        this.ScrollViewDelegate.SelectGridProxy(this.GridIndex, this.DisplayIndex, true);
      }
    };
  }
  Refresh(e, t, i) {
    this.ZNt = e;
    let s = "";
    s = this.ZNt === 0 ? ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_Cooking") : ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath("SP_Machining");
    this.SetSpriteByPath(s, this.GetSprite(0), false);
  }
  Clear() {}
  OnSelected(e) {
    this.GetExtendToggle(1).SetToggleState(1, e);
    this.OnClickedCallback?.(this.ZNt);
  }
  OnDeselected(e) {
    this.GetExtendToggle(1).SetToggleState(0, false);
  }
  GetKey(e, t) {
    return t;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIExtendToggle]];
    this.BtnBindInfo = [[1, this.OnItemButtonClicked]];
  }
  GetMainType() {
    return this.ZNt;
  }
  SetMainTypeCallback(e) {
    this.OnClickedCallback = e;
  }
}
//# sourceMappingURL=CookRootView.js.map