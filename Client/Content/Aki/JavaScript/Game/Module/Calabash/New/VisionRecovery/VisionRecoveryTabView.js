"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecoveryTabView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSelectView_1 = require("../../../Common/CommonItemSelectView");
const SortViewData_1 = require("../../../Common/FilterSort/Sort/Model/SortViewData");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent");
const SelectablePropDataUtil_1 = require("../../../Common/PropItem/SelectablePropItem/SelectablePropDataUtil");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CalabashController_1 = require("../../CalabashController");
const CalabashDefine_1 = require("../../CalabashDefine");
const VisionRecoveryChoosePanel_1 = require("./VisionRecoveryChoosePanel");
const VisionRecoveryDirectionalFusionItem_1 = require("./VisionRecoveryDirectionalFusionItem");
const VisionRecoverySlotPanel_1 = require("./VisionRecoverySlotPanel");
const VisionRecoveryTabItem_1 = require("./VisionRecoveryTabItem");
class VisionRecoveryTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.cMt = [];
    this.mMt = [];
    this.dMt = [];
    this.CMt = undefined;
    this.Xvt = undefined;
    this.KSg = undefined;
    this.B7t = undefined;
    this.H3e = undefined;
    this.C3a = undefined;
    this.gMt = false;
    this.fMt = false;
    this.g3a = 1;
    this.p3a = CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM;
    this.f3a = 0;
    this.BO_ = 0;
    this.ebl = undefined;
    this.pMt = () => {
      this.CMt.SetActive(false);
      this.CMt.UiViewSequence.RemoveSequenceFinishEvent("SwitchB", this.pMt);
    };
    this.Rrh = e => {
      if (e === "Start" || e === "ShowView" || e === "Sle") {
        UiLayer_1.UiLayer.SetShowMaskLayer("VisionRecoveryTabView", true);
      }
    };
    this.Urh = e => {
      if (e === "Start" || e === "ShowView" || e === "Sle") {
        UiLayer_1.UiLayer.SetShowMaskLayer("VisionRecoveryTabView", false);
        this.$Qc();
      }
    };
    this.vMt = (e, i) => {};
    this.LMt = () => {
      if (this.gMt) {
        if (this.cMt.length < this.p3a) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Text_EchoLack_Text");
        } else {
          switch (this.BO_) {
            case 0:
              this.v3a(() => {
                CalabashController_1.CalabashController.RequestPhantomRefiningRequest(this.cMt);
              });
              break;
            case 1:
              this.v3a(() => {
                CalabashController_1.CalabashController.PhantomBatchDirectRefiningRequest(this.cMt);
              });
          }
        }
      } else {
        switch (this.BO_) {
          case 0:
            this.M3a();
            break;
          case 1:
            this.XSg();
        }
      }
    };
    this.RMt = e => {
      ModelManager_1.ModelManager.CalabashModel.HideVisionRecoveryConfirmBox = e;
    };
    this.M3a = () => {
      this.g3a = 1;
      this.cMt = [];
      if (this.fMt) {
        this.SMt(this.mMt, this.cMt);
      } else {
        this.MMt(this.g3a);
      }
      this.Zvt(this.cMt);
      this.S3a(this.cMt);
      this.u7a();
      this.EMt();
      this.YSg();
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), "VisionRecoveryTabView_Btn_RandomModel");
    };
    this.XSg = () => {
      if (ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTimeMax - ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTime <= 0) {
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("PhantomRecycle_Tips02");
      } else if (!UiManager_1.UiManager.IsViewOpen("VisionDirectionalFusionSelectTargetView")) {
        UiManager_1.UiManager.OpenView("VisionDirectionalFusionSelectTargetView");
      }
    };
    this.E3a = () => {
      if (this.gMt) {
        if (this.cMt.length < this.p3a) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Text_BatchEchoLack");
        } else {
          switch (this.BO_) {
            case 0:
              this.v3a(() => {
                CalabashController_1.CalabashController.RequestBatchRefiningRequest(this.cMt);
              });
              break;
            case 1:
              this.v3a(() => {
                CalabashController_1.CalabashController.PhantomBatchDirectRefiningRequest(this.cMt);
              });
          }
        }
      } else {
        switch (this.BO_) {
          case 0:
            this.M3a();
            break;
          case 1:
            this.XSg();
        }
      }
    };
    this.UMt = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.zSg = () => {
      var e = new VisionRecoveryTabItem_1.VisionRecoveryTabItem();
      e.OnClickToggleCallBack = this.JSg;
      return e;
    };
    this.JSg = (e, i) => {
      this.ebl?.SetToggleStateForce(0, false);
      this.ebl = i;
      this.BO_ = e;
      this.cMt = [];
      if (e === 0) {
        this.f3a = ConfigManager_1.ConfigManager.CalabashConfig.GetVisionBatchRecoveryMaxCount();
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "VisionRecoveryTabView_Out_Btn_RandomModel");
        this.GetItem(14).SetUIActive(false);
      } else {
        i = ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTimeMax - ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTime;
        this.f3a = i * this.p3a;
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(15), "VisionRecoveryTabView_Out_Btn_AimModel");
        this.GetItem(14).SetUIActive(true);
      }
      this.Zvt(this.cMt);
      this.YSg();
      this.UiViewSequence?.PlaySequence("Change");
    };
    this.AMt = e => {
      this.cMt = e;
      this.S3a(this.cMt);
    };
    this.PMt = () => {
      this.cMt = [];
      this.SMt(this.mMt, this.cMt);
      this.Zvt(this.cMt);
      this.S3a(this.cMt);
      this.c7a();
      this.xMt();
    };
    this.wMt = e => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashQuitInternalView);
      UiManager_1.UiManager.OpenView("VisionRecoveryResultView", e, () => {
        this.mMt = ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
        this.TMt();
        this.Zvt(this.cMt);
        this.c7a();
        this.xMt();
      });
    };
    this.y3a = e => {
      var i;
      if (this.BO_ === 1) {
        i = ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTimeMax - ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTime;
        this.f3a = i * this.p3a;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashQuitInternalView);
      UiManager_1.UiManager.OpenView("VisionRecoveryBatchResultView", e, () => {
        this.mMt = ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
        this.TMt();
        this.Zvt(this.cMt);
        this.c7a();
        this.xMt();
      });
    };
    this.I3a = i => {
      var e;
      var t = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(i);
      if (t !== undefined && ((e = this.cMt.findIndex(e => e.IncId === i)) >= 0 && t.GetIsLock() && (this.cMt.splice(e, 1), this.S3a(this.cMt)), (t = this.dMt.findIndex(e => e.GetUniqueId() === i)) >= 0)) {
        this.CMt.UpdatePartByIndex(t);
      }
    };
    this.ZSg = () => {
      this.KSg?.RefreshItem();
      this.YSg();
      this.rBg();
    };
    this.eMg = () => {
      UiManager_1.UiManager.CloseView("CalabashRootView");
    };
    this.BMt = e => {
      if (e !== undefined) {
        this.dMt = e;
      }
    };
    this.T3a = e => {
      if (e === 0) {
        this.TMt();
      } else {
        this.m7a();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIHorizontalLayout], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIHorizontalLayout], [8, UE.UIText], [9, UE.UIText], [10, UE.UIButtonComponent], [11, UE.UIHorizontalLayout], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIText], [16, UE.UIText]];
    this.BtnBindInfo = [[3, this.LMt], [10, this.E3a]];
  }
  async OnBeforeStartAsync() {
    this.Xvt = new VisionRecoverySlotPanel_1.VisionRecoverySlotPanel(this.vMt, true);
    await this.Xvt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(4), this.UMt);
    this.C3a = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(7), this.UMt);
    this.bMt();
    this.CMt = new VisionRecoveryChoosePanel_1.VisionRecoveryChoosePanel();
    this.CMt.BindClickCloseCallBack(this.PMt);
    this.CMt.BindFilterSortRefresh(this.BMt);
    this.CMt.BindClickSelectAllToggleCallback(this.T3a);
    var e = this.GetItem(1);
    await this.CMt.CreateByResourceIdAsync("UiItem_VisionRecoveryList", e);
    this.B7t = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(11), this.zSg);
    this.KSg = new VisionRecoveryDirectionalFusionItem_1.VisionRecoveryDirectionalFusionItem();
    await this.KSg.CreateByActorAsync(this.GetItem(13).GetOwner());
  }
  OnStart() {
    ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTargetFetterGroup = 0;
    this.Zvt(this.cMt);
    var e = this.GetTabBehavior(UiTabSequence_1.UiTabSequence)?.GetLevelSequencePlayer();
    if (e) {
      e.BindSequenceStartEvent(this.Rrh);
      e.BindSequenceCloseEvent(this.Urh);
    }
    const i = ModelManager_1.ModelManager.FunctionModel.IsOpen(10100);
    this.B7t?.RefreshByData([1, 0], () => {
      (i && ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTimeMax - ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTime > 0 ? this.B7t?.GetLayoutItemByIndex(0) : this.B7t?.GetLayoutItemByIndex(1))?.SelectToggle();
    });
    this.B7t?.GetRootUiItem()?.SetUIActive(i);
    ModelManager_1.ModelManager.PhantomBattleModel.RecordVisionRecoveryRedDot(false);
    ModelManager_1.ModelManager.PhantomBattleModel.RecordVisionRecoveryAimRedDot(false);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionRecoveryResult, this.wMt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionRecoveryBatchResult, this.y3a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SelectDirectionalFusionTarget, this.ZSg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PhantomDirectRefiningWeeklyReset, this.eMg);
  }
  OnBeforeShow() {
    if (this.gMt) {
      this.SMt(this.mMt, this.cMt);
    }
  }
  MMt(e) {
    this.fMt = true;
    this.mMt = ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
    this.SMt(this.mMt, this.cMt);
  }
  bMt() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("VisionRecoveryPreviewRewardDropId");
    var i = new Array();
    var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e).DropPreview;
    for (const h of t.keys()) {
      var s = [{
        IncId: 0,
        ItemId: h
      }, t.get(h)];
      i.push(s);
    }
    this.H3e.RefreshByData(i);
    this.C3a.RefreshByData(i);
  }
  SMt(e, i) {
    var t = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData();
    var s = new SelectableComponent_1.SelectableComponentData();
    s.IsSingleSelected = false;
    s.MaxSelectedGridNum = this.f3a;
    s.OnlyGold = this.BO_ === 1;
    s.OnChangeSelectedFunction = this.AMt;
    t.SelectableComponentType = 1;
    t.ItemDataBaseList = e;
    t.SelectedDataList = i;
    t.ExpData = undefined;
    t.SelectableComponentData = s;
    t.UseWayId = this.BO_ === 0 ? 33 : 49;
    t.InitSortToggleState = true;
    this.CMt.RefreshUi(t);
    this.CMt.SetAllSelectToggleVisible(true);
  }
  Zvt(e) {
    const i = [];
    e.forEach(e => {
      e = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(e.IncId);
      if (e !== undefined) {
        i.push(e);
      }
    });
    this.Xvt.RefreshUi(i);
    this.GetItem(14).SetUIActive(this.BO_ === 1);
    var e = ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTimeMax - ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTime;
    var t = this.GetText(2);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e > 0 ? "DirectionalFusion_Times" : "DirectionalFusion_Times_Red", e, ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTimeMax);
  }
  S3a(e) {
    var i;
    var e = e.length;
    if (this.BO_ === 0) {
      i = Math.floor(e / this.p3a);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Text_BatchEchoSelect_Text", e, this.f3a);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "Text_BatchEchoSelectNum_Text", i);
    }
    if (this.BO_ === 1) {
      i = ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTimeMax - ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTime;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Text_BatchEchoSelect_Text", e, i * CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM);
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), "DirectionalFusion_Times", i, ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTimeMax);
    }
  }
  EMt() {
    if (!this.gMt) {
      this.gMt = true;
      this.CMt.SetActive(true);
      this.UiViewSequence.PlaySequence("SwitchA");
      this.CMt.UiViewSequence.PlaySequence("SwitchA");
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshCalabashTabShowState, true);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashEnterInternalView);
    }
  }
  xMt() {
    if (this.gMt) {
      this.gMt = false;
      this.UiViewSequence.PlaySequence("SwitchB");
      this.CMt.UiViewSequence.PlaySequence("SwitchB");
      this.CMt.UiViewSequence.AddSequenceFinishEvent("SwitchB", this.pMt);
      this.KSg?.SetUiActive(false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshCalabashTabShowState, false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashQuitInternalView);
    }
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionRecoveryResult, this.wMt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionRecoveryBatchResult, this.y3a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SelectDirectionalFusionTarget, this.ZSg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PhantomDirectRefiningWeeklyReset, this.eMg);
  }
  u7a() {
    this.UiViewSequence.StopPrevSequence(false);
    this.GetItem(5).SetUIActive(true);
    this.UiViewSequence.PlaySequence("BatchIn");
    this.GetHorizontalLayout(11).RootUIComp.SetUIActive(false);
  }
  c7a() {
    this.UiViewSequence.StopPrevSequence(false);
    this.UiViewSequence.PlaySequence("BatchOut");
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10100);
    this.GetHorizontalLayout(11).RootUIComp.SetUIActive(e);
  }
  $Qc() {
    if (this.ExtraParams !== undefined) {
      switch (this.ExtraParams) {
        case 2:
          this.XSg();
          break;
        case 1:
          this.M3a();
      }
      this.ExtraParams = undefined;
    }
  }
  m7a() {
    if (!this.fMt) {
      this.qMt();
    }
    for (const i of this.dMt) {
      if (this.cMt.length >= this.f3a) {
        break;
      }
      const t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i.GetUniqueId());
      var e;
      if (t !== undefined && t.GetVisionIfCanRecovery(this.BO_ === 1) && (e = this.cMt.find(e => e.IncId === t.GetIncrId())) === undefined) {
        (e = SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(i)).SelectedCount = 1;
        this.cMt.push(e);
      }
    }
    this.S3a(this.cMt);
    this.SMt(this.mMt, this.cMt);
  }
  qMt() {
    this.dMt = ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortId(33);
    var e = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(e);
    var i = new SortViewData_1.SortResultData();
    i.SetConfigId(e.Id);
    i.SetIsAscending(true);
    var t = e.BaseSortList[0];
    var s = ConfigManager_1.ConfigManager.SortConfig.GetSortRuleName(t, e.DataId);
    i.SetSelectBaseSort([t, s]);
    ModelManager_1.ModelManager.SortModel.SortDataList(this.dMt, e.Id, i);
  }
  TMt() {
    if (!(this.cMt.length <= 0)) {
      this.cMt = [];
      this.S3a(this.cMt);
      this.SMt(this.mMt, this.cMt);
    }
  }
  RemoveAllVisionItemOutside() {
    this.mMt = ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
    this.TMt();
  }
  v3a(s) {
    var h = () => {
      let e = false;
      for (const t of this.cMt) {
        if (t.IncId > 0 && ModelManager_1.ModelManager.VisionEquipGroupModel.CheckVisionListIfInGroup([t.IncId])) {
          e = true;
          break;
        }
      }
      var i;
      if (e) {
        (i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(247)).FunctionMap.set(2, s);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(i);
      } else {
        s();
      }
    };
    if (ModelManager_1.ModelManager.CalabashModel.HideVisionRecoveryConfirmBox) {
      h();
    } else {
      let e = false;
      let i = false;
      let t = false;
      for (const n of this.cMt) {
        var o = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(n.IncId);
        if (o && (!e && ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighQuality(o) && (e = true), !i && ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighLevel(o) && (i = true), !t) && ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighRare(o)) {
          t = true;
        }
      }
      let s = undefined;
      var a;
      var r = [];
      if (e) {
        a = ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionHighQuality");
        r.push(a);
      }
      if (i) {
        a = ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionHighLevel");
        r.push(a);
      }
      if (t) {
        a = ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionHighRare");
        r.push(a);
      }
      switch (r.length) {
        case 1:
          s = 127;
          break;
        case 2:
          s = 126;
          break;
        case 3:
          s = 125;
      }
      if (s) {
        (a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(s)).SetTextArgs(...r);
        a.FunctionMap.set(2, h);
        a.HasToggle = true;
        a.ToggleText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ItemRecycleConfirmToggle_text");
        a.SetToggleFunction(this.RMt);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(a);
      } else {
        h();
      }
    }
  }
  rBg() {
    this.g3a = 2;
    this.cMt = [];
    if (this.fMt) {
      this.SMt(this.mMt, this.cMt);
    } else {
      this.MMt(this.g3a);
    }
    this.Zvt(this.cMt);
    this.S3a(this.cMt);
    this.u7a();
    this.EMt();
    this.KSg?.SetUiActive(true);
    this.KSg?.RefreshItem();
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(16), "VisionRecoveryTabView_Btn_AimModel");
  }
  YSg() {
    for (const e of this.H3e?.GetLayoutItemList() ?? []) {
      e.SetDirectionalFusionComponent(this.BO_ === 1 ? -1 : 0);
    }
    for (const i of this.C3a?.GetLayoutItemList() ?? []) {
      i.SetDirectionalFusionComponent(this.BO_ === 1 ? ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTargetFetterGroup : 0);
    }
  }
}
exports.VisionRecoveryTabView = VisionRecoveryTabView;
//# sourceMappingURL=VisionRecoveryTabView.js.map