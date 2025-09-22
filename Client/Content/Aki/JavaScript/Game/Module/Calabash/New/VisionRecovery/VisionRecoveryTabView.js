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
const RedDotController_1 = require("../../../../RedDot/RedDotController");
const UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const UiManager_1 = require("../../../../Ui/UiManager");
const CommonItemSelectView_1 = require("../../../Common/CommonItemSelectView");
const SortViewData_1 = require("../../../Common/FilterSort/Sort/Model/SortViewData");
const CommonItemSmallItemGrid_1 = require("../../../Common/ItemGrid/CommonItemSmallItemGrid");
const ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool");
const SelectableComponent_1 = require("../../../Common/PropItem/SelectablePropItem/SelectableComponent");
const SelectablePropDataUtil_1 = require("../../../Common/PropItem/SelectablePropItem/SelectablePropDataUtil");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const UiTabSequence_1 = require("../../../DynamicTab/UiTabViewBehavior/UiTabSequence");
const InventoryDefine_1 = require("../../../Inventory/InventoryDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const GenericLayout_1 = require("../../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const CalabashController_1 = require("../../CalabashController");
const CalabashDefine_1 = require("../../CalabashDefine");
const VisionRecoveryChoosePanel_1 = require("./VisionRecoveryChoosePanel");
const VisionRecoverySlotPanel_1 = require("./VisionRecoverySlotPanel");
class VisionRecoveryTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments);
    this.cMt = [];
    this.mMt = [];
    this.dMt = [];
    this.CMt = undefined;
    this.Xvt = undefined;
    this.H3e = undefined;
    this.C3a = undefined;
    this.gMt = false;
    this.fMt = false;
    this.g3a = 0;
    this.p3a = CalabashDefine_1.VISION_RECOVERY_SLOT_MAX_NUM;
    this.f3a = 0;
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
    this.vMt = (e, i) => {
      if (e) {
        if (!this.fMt) {
          this.MMt(this.g3a);
        }
        if (i !== undefined) {
          this.Mza(i);
        }
        this.EMt();
      } else if (!((e = this.cMt.findIndex(e => e.IncId === i.GetUniqueId())) < 0)) {
        this.cMt.splice(e, 1);
        this.SMt(this.mMt, this.cMt, 0);
        this.Zvt(this.cMt);
      }
    };
    this.yMt = () => {
      if (this.cMt.length <= 0) {
        this.IMt(0);
      } else {
        this.TMt(0);
      }
    };
    this.LMt = () => {
      if (this.cMt.length < this.p3a) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Text_EchoLack_Text");
      } else {
        this.v3a(() => {
          CalabashController_1.CalabashController.RequestPhantomRefiningRequest(this.cMt);
        });
      }
    };
    this.RMt = e => {
      ModelManager_1.ModelManager.CalabashModel.HideVisionRecoveryConfirmBox = e;
    };
    this.M3a = () => {
      ModelManager_1.ModelManager.PhantomBattleModel.RecordVisionRecoveryRedDot(false);
      this.g3a = 1;
      this.cMt = [];
      if (this.fMt) {
        this.SMt(this.mMt, this.cMt, this.g3a);
      } else {
        this.MMt(this.g3a);
      }
      this.Zvt(this.cMt);
      this.S3a(this.cMt);
      this.u7a();
      this.EMt();
    };
    this.E3a = () => {
      if (this.cMt.length < this.p3a) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("Text_BatchEchoLack");
      } else {
        this.v3a(() => {
          CalabashController_1.CalabashController.RequestBatchRefiningRequest(this.cMt);
        });
      }
    };
    this.UMt = () => {
      return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    };
    this.AMt = e => {
      this.cMt = e;
      if (this.g3a === 0) {
        this.Zvt(this.cMt);
      } else {
        this.S3a(this.cMt);
      }
    };
    this.PMt = () => {
      if (this.g3a === 1) {
        this.g3a = 0;
        this.cMt = [];
        this.SMt(this.mMt, this.cMt, this.g3a);
        this.Zvt(this.cMt);
        this.S3a(this.cMt);
        this.c7a();
      }
      this.xMt();
    };
    this.wMt = e => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashQuitInternalView);
      UiManager_1.UiManager.OpenView("VisionRecoveryResultView", e, () => {
        this.mMt = ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
        this.TMt(0);
        this.xMt();
      });
    };
    this.y3a = e => {
      this.g3a = 0;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashQuitInternalView);
      UiManager_1.UiManager.OpenView("VisionRecoveryBatchResultView", e, () => {
        this.mMt = ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
        this.TMt(0);
        this.c7a();
        this.xMt();
      });
    };
    this.I3a = i => {
      var e;
      var t = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(i);
      if (t !== undefined && ((e = this.cMt.findIndex(e => e.IncId === i)) >= 0 && t.GetIsLock() && (this.cMt.splice(e, 1), this.g3a === 0 ? this.Zvt(this.cMt) : this.S3a(this.cMt)), (t = this.dMt.findIndex(e => e.GetUniqueId() === i)) >= 0)) {
        this.CMt.UpdatePartByIndex(t);
      }
    };
    this.BMt = e => {
      if (e !== undefined) {
        this.dMt = e;
      }
    };
    this.T3a = e => {
      if (e === 0) {
        this.TMt(1);
      } else {
        this.m7a(1);
      }
    };
    this.Aqu = () => {
      ControllerHolder_1.ControllerHolder.InventoryController.OpenManageConfigView();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIButtonComponent], [4, UE.UIButtonComponent], [5, UE.UIHorizontalLayout], [6, UE.UIText], [7, UE.UIButtonComponent], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIHorizontalLayout], [11, UE.UIText], [12, UE.UIText], [13, UE.UIButtonComponent], [14, UE.UIItem], [15, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.yMt], [4, this.LMt], [7, this.M3a], [13, this.E3a], [15, this.Aqu]];
  }
  async OnBeforeStartAsync() {
    this.Xvt = new VisionRecoverySlotPanel_1.VisionRecoverySlotPanel(this.vMt, true);
    await this.Xvt.CreateThenShowByActorAsync(this.GetItem(0).GetOwner());
    this.H3e = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(5), this.UMt);
    this.C3a = new GenericLayout_1.GenericLayout(this.GetHorizontalLayout(10), this.UMt);
    this.bMt();
    this.CMt = new VisionRecoveryChoosePanel_1.VisionRecoveryChoosePanel();
    this.CMt.BindClickCloseCallBack(this.PMt);
    this.CMt.BindFilterSortRefresh(this.BMt);
    this.CMt.BindClickSelectAllToggleCallback(this.T3a);
    var e = this.GetItem(1);
    await this.CMt.CreateByResourceIdAsync("UiItem_VisionRecoveryList", e);
    this.f3a = ConfigManager_1.ConfigManager.CalabashConfig.GetVisionBatchRecoveryMaxCount();
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(InventoryDefine_1.MANAGE_CONFIG_FUNCTION_ID);
    this.SetButtonUiActive(15, e);
    this.g3a = 0;
    this.Zvt(this.cMt);
    e = this.GetTabBehavior(UiTabSequence_1.UiTabSequence)?.GetLevelSequencePlayer();
    if (e) {
      e.BindSequenceStartEvent(this.Rrh);
      e.BindSequenceCloseEvent(this.Urh);
    }
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionRecoveryResult, this.wMt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionRecoveryBatchResult, this.y3a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
    RedDotController_1.RedDotController.BindRedDot("VisionRecovery", this.GetItem(14));
  }
  OnBeforeShow() {
    if (this.gMt) {
      this.SMt(this.mMt, this.cMt, this.g3a);
    }
  }
  MMt(e) {
    this.fMt = true;
    this.mMt = ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
    this.SMt(this.mMt, this.cMt, e);
  }
  bMt() {
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("VisionRecoveryPreviewRewardDropId");
    var i = new Array();
    var t = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e).DropPreview;
    for (const o of t.keys()) {
      var s = [{
        IncId: 0,
        ItemId: o
      }, t.get(o)];
      i.push(s);
    }
    this.H3e.RefreshByData(i);
    this.C3a.RefreshByData(i);
  }
  SMt(e, i, t) {
    var s = new CommonItemSelectView_1.CommonItemSelectViewOpenViewData();
    var o = new SelectableComponent_1.SelectableComponentData();
    o.IsSingleSelected = false;
    o.MaxSelectedGridNum = t === 0 ? this.p3a : this.f3a;
    o.OnChangeSelectedFunction = this.AMt;
    s.SelectableComponentType = 1;
    s.ItemDataBaseList = e;
    s.SelectedDataList = i;
    s.ExpData = undefined;
    s.SelectableComponentData = o;
    s.UseWayId = 33;
    s.InitSortToggleState = true;
    this.CMt.RefreshUi(s);
    this.CMt.SetAllSelectToggleVisible(t === 1);
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
    var e = i.length;
    var t = this.GetText(2);
    var s = e > 0 ? "DeleteSelect" : "AutoSelect";
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, "Text_EchoSelect_Text", e, this.p3a);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), s);
  }
  S3a(e) {
    var e = e.length;
    var i = Math.floor(e / this.p3a);
    this.GetText(11).SetText(e.toString() + "/" + this.f3a);
    this.GetText(12).SetText(i.toString());
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(11), "Text_BatchEchoSelect_Text", e, this.f3a);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), "Text_BatchEchoSelectNum_Text", i);
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
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshCalabashTabShowState, false);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CalabashQuitInternalView);
    }
  }
  Mza(e) {
    if (this.gMt) {
      e = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(e.GetConfigId(), e.GetUniqueId());
      this.CMt.ShowTipsComponent(e);
    }
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionRecoveryResult, this.wMt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionRecoveryBatchResult, this.y3a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
    RedDotController_1.RedDotController.UnBindGivenUi("VisionRecovery", this.GetItem(14));
  }
  u7a() {
    this.UiViewSequence.StopPrevSequence(false);
    this.GetItem(8).SetUIActive(true);
    this.GetButton(7).RootUIComp.SetUIActive(false);
    this.UiViewSequence.PlaySequence("BatchIn");
  }
  c7a() {
    this.UiViewSequence.StopPrevSequence(false);
    this.GetButton(7).RootUIComp.SetUIActive(true);
    this.UiViewSequence.PlaySequence("BatchOut");
  }
  $Qc() {
    if (this.ExtraParams !== undefined) {
      switch (this.ExtraParams) {
        case 0:
          break;
        case 1:
          this.M3a();
      }
      this.ExtraParams = undefined;
    }
  }
  IMt(e) {
    if (this.g3a === 0) {
      if (!this.fMt) {
        this.qMt();
      }
      var i = [];
      for (const s of this.dMt) {
        var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(s.GetUniqueId());
        if (t !== undefined && t.GetVisionIfCanRecovery()) {
          i.push(s);
        }
        if (i.length >= this.p3a) {
          break;
        }
      }
      if (i.length < this.p3a) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("RoleNoMaterial");
      } else {
        this.cMt = [];
        i.forEach(e => {
          e = SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(e);
          e.SelectedCount = 1;
          this.cMt.push(e);
        });
        if (e === 0) {
          this.Zvt(this.cMt);
        } else {
          this.S3a(this.cMt);
        }
        this.SMt(this.mMt, this.cMt, e);
      }
    }
  }
  m7a(e) {
    if (e === 1) {
      if (!this.fMt) {
        this.qMt();
      }
      for (const t of this.dMt) {
        const s = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t.GetUniqueId());
        if (s !== undefined && s.GetVisionIfCanRecovery()) {
          var i = this.cMt.find(e => e.IncId === s.GetIncrId());
          if (i === undefined && ((i = SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(t)).SelectedCount = 1, this.cMt.push(i), this.cMt.length >= this.f3a)) {
            break;
          }
        }
      }
      this.S3a(this.cMt);
      this.SMt(this.mMt, this.cMt, e);
    }
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
  TMt(e) {
    if (!(this.cMt.length <= 0)) {
      this.cMt = [];
      if (e === 0) {
        this.Zvt(this.cMt);
      } else {
        this.S3a(this.cMt);
      }
      this.SMt(this.mMt, this.cMt, e);
    }
  }
  RemoveAllVisionItemOutside() {
    this.mMt = ModelManager_1.ModelManager.InventoryModel.GetUnEquipPhantomItemDataList();
    this.TMt(this.g3a);
  }
  v3a(s) {
    var o = () => {
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
      o();
    } else {
      let e = false;
      let i = false;
      let t = false;
      for (const a of this.cMt) {
        var h = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(a.IncId);
        if (h && (!e && ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighQuality(h) && (e = true), !i && ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighLevel(h) && (i = true), !t) && ModelManager_1.ModelManager.PhantomBattleModel.IsVisionHighRare(h)) {
          t = true;
        }
      }
      let s = undefined;
      var r;
      var n = [];
      if (e) {
        r = ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionHighQuality");
        n.push(r);
      }
      if (i) {
        r = ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionHighLevel");
        n.push(r);
      }
      if (t) {
        r = ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionHighRare");
        n.push(r);
      }
      switch (n.length) {
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
        (r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(s)).SetTextArgs(...n);
        r.FunctionMap.set(2, o);
        r.HasToggle = true;
        r.ToggleText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ItemRecycleConfirmToggle_text");
        r.SetToggleFunction(this.RMt);
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
      } else {
        o();
      }
    }
  }
}
exports.VisionRecoveryTabView = VisionRecoveryTabView;
//# sourceMappingURL=VisionRecoveryTabView.js.map