"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageView = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../../Ui/UiManager");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const FilterSortEntrance_1 = require("../../Common/FilterSort/FilterSortEntrance");
const ItemTipsUtilTool_1 = require("../../Common/ItemTips/ItemTipsUtilTool");
const ItemTipsWithButton_1 = require("../../Common/ItemTips/ItemTipsWithButton");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const PhantomManageMediumItemGrid_1 = require("./PhantomManageMediumItemGrid");
const PhantomManageViewModel_1 = require("./PhantomManageViewModel");
const EMPTY_SELECT_TIPS_TEXT_ID = "PhantomManage_Tips01";
class PhantomManageView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.qsd = 0;
    this.r_u = 0;
    this.z3u = undefined;
    this.w1c = [];
    this.yil = undefined;
    this.A1c = undefined;
    this.adi = undefined;
    this.lqe = undefined;
    this.vxt = undefined;
    this.J3u = undefined;
    this.Z3u = undefined;
    this.fTu = t => {
      if (t === 0) {
        this.zao();
      }
    };
    this.SortViewDataSelectOn = (t, i) => {
      t = this.vRu(t) ? 1 : 0;
      return (this.vRu(i) ? 1 : 0) - t;
    };
    this.FNt = (t, i, e) => {
      var r = this.yil.GetSelectSet();
      if (r !== undefined && r.size > 0) {
        t.sort(this.SortViewDataSelectOn);
      }
      this.w1c = t;
      this.A1c.RefreshByData(t);
      this.vxt.SetVisible(this.w1c.length > 0);
      this.GetItem(16).SetUIActive(this.w1c.length <= 0);
      if (!(this.w1c.length <= 0)) {
        if (this.qsd > 0) {
          this.Gsd();
        } else {
          r = this.w1c[0];
          this.e4u(r.GetUniqueId());
          this.C4e(r);
        }
      }
    };
    this.I3a = i => {
      this.zao();
      for (let t = 0; t < this.w1c.length; t++) {
        if (i === this.w1c[t].GetUniqueId()) {
          this.A1c.RefreshGridProxy(t);
          return;
        }
      }
    };
    this.GGu = i => {
      for (let t = 0; t < this.w1c.length; t++) {
        var e = this.w1c[t].GetUniqueId();
        if (i.includes(e)) {
          this.A1c.RefreshGridProxy(t);
        }
      }
      this.zao();
    };
    this.VJu = t => {
      this.e4u(t.GetUniqueId());
      this.C4e(t);
    };
    this.vRu = t => {
      return this.yil.GetSelectSet().has(t.GetUniqueId());
    };
    this.t4u = t => t.GetUniqueId() === this.r_u;
    this.X8a = (t, i, e) => i;
    this.Kwi = t => {
      t = t.Data;
      this.yil.SwitchSelectState(t.GetUniqueId(), false);
      this.e4u(t.GetUniqueId());
      this.sbi(t);
    };
    this.sGe = () => {
      var t = new PhantomManageMediumItemGrid_1.PhantomManageMediumItemGrid();
      t.SetUseFixedAsync(true);
      t.BindOnExtendToggleStateChanged(this.Kwi);
      t.BindOnCanExecuteChange(this.X8a);
      return t;
    };
    this.LGu = () => {
      this.CloseMe();
    };
    this.FGu = t => {
      if (t === 1) {
        for (const i of this.w1c) {
          this.yil.SetSelectState(i.GetUniqueId(), true);
        }
        this.A1c.RefreshAllGridProxies();
      } else {
        this.NGu();
      }
    };
    this.NGu = () => {
      for (const t of this.yil.GetSelectSet()) {
        this.yil.SetSelectState(t, false);
      }
      this.A1c.RefreshAllGridProxies();
      this.GetExtendToggle(12).SetToggleState(0);
    };
    this.HGu = () => {
      if (this.i4u() !== 1) {
        this.r4u();
      } else {
        this.o4u(true);
      }
    };
    this.VGu = () => {
      if (this.i4u() !== 2) {
        this.n4u();
      } else {
        this.o4u(false);
      }
    };
    this.n4u = () => {
      var t = this.yil.GetSelectSet();
      if (t.size <= 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(EMPTY_SELECT_TIPS_TEXT_ID);
      } else if (this.s4u(t)) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(331)).FunctionMap.set(2, () => {
          this.jGu();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      } else {
        this.jGu();
      }
    };
    this.mGu = () => {
      if (UiManager_1.UiManager.IsViewOpen("PhantomManageConfigView") || UiManager_1.UiManager.IsViewHide("PhantomManageConfigView")) {
        UiManager_1.UiManager.CloseView("PhantomManageConfigView", this.$Gu);
      } else {
        this.$Gu(true);
      }
    };
    this.$Gu = t => {
      if (t) {
        ControllerHolder_1.ControllerHolder.InventoryController.OpenManageConfigView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UILoopScrollViewComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UITexture], [11, UE.UIButtonComponent], [12, UE.UIExtendToggle], [13, UE.UIButtonComponent], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem]];
    this.BtnBindInfo = [[9, this.LGu], [12, this.FGu], [13, this.NGu], [11, this.mGu]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.J3u = new ButtonItem_1.ButtonItem();
    this.Z3u = new ButtonItem_1.ButtonItem();
    this.J3u.SetFunction(this.HGu);
    this.Z3u.SetFunction(this.VGu);
    t.push(this.J3u.CreateThenShowByActorAsync(this.GetItem(15).GetOwner()));
    t.push(this.Z3u.CreateThenShowByActorAsync(this.GetItem(14).GetOwner()));
    this.vxt = new ItemTipsWithButton_1.ItemTipsWithButtonComponent();
    t.push(this.vxt.CreateByActorAsync(this.GetItem(7).GetOwner()));
    await Promise.all(t);
  }
  OnStart() {
    this.yil = new PhantomManageViewModel_1.PhantomManageViewModel();
    this.yil.Bind(this.fTu);
    this.A1c = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), this.GetItem(5).GetOwner(), this.sGe);
    PhantomManageMediumItemGrid_1.PhantomManageMediumItemGrid.CallbackCheckTips = this.t4u;
    PhantomManageMediumItemGrid_1.PhantomManageMediumItemGrid.CallbackCheckSelect = this.vRu;
    PhantomManageMediumItemGrid_1.PhantomManageMediumItemGrid.CallbackListenerFocus = this.VJu;
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(8), this.FNt);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(1));
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetCloseBtnShowState(false);
  }
  OnBeforeShow() {
    this.qsd = this.OpenParam ?? 0;
    var t = this.qsd > 0 ? ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(this.qsd) : undefined;
    this.r_u = t ? this.qsd : 0;
    this.SetButtonUiActive(11, false);
    this.SCi();
    this.d4e();
    this.zao();
  }
  OnBeforeDestroy() {
    this.yil.UnBind(this.fTu);
    this.yil.ClearSelectSet();
    this.jJu();
  }
  SCi() {
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemMainTypeConfig(3).PackageId;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetPackageConfig(t);
    var i = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByMainType(3).size;
    var t = t.Capacity;
    var e = this.GetText(2);
    if (t <= i) {
      e.SetText(`<color=red>${i}</color>/${t}`);
    } else {
      e.SetText(i + "/" + t);
    }
  }
  d4e() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetItemDataBaseByMainType(3);
    this.adi.UpdateDataWithConfig(43, 4, Array.from(t));
  }
  sbi(t) {
    this.C4e(t);
    this.BNe(t);
    this.bGt(t);
    this.Gxc(t);
  }
  C4e(t) {
    var i = t.GetConfigId();
    var t = t.GetUniqueId();
    var i = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataById(i, t);
    if (i) {
      this.vxt.RefreshTips(i);
      this.vxt.SetVisible(true);
    } else {
      this.vxt.SetVisible(false);
    }
    this.vxt.SetTipsComponentLockButton(false);
  }
  BNe(t) {
    var i = ModelManager_1.ModelManager.InventoryModel;
    var e = t.GetConfigId();
    var t = t.GetUniqueId();
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    if (e && e.RedDotDisableRule === 1) {
      i.RemoveRedDotAttributeItem(t);
    }
    i.SaveNewAttributeItemUniqueIdList();
    i.SaveRedDotAttributeItemUniqueIdList();
  }
  bGt(t) {
    ModelManager_1.ModelManager.InventoryModel.RemoveNewAttributeItem(t.GetUniqueId());
  }
  Gxc(t) {
    t = this.w1c.indexOf(t);
    if (this.A1c.IsGridDisplaying(t)) {
      this.A1c.RefreshGridProxy(t);
    }
  }
  zao() {
    var t = this.i4u();
    this.z3u = t;
    var t = this.z3u === 1 ? "PhantomManage_UnLock" : "PhantomManage_Lock";
    this.J3u.SetLocalTextNew(t);
    var t = this.z3u === 2 ? "PhantomManage_Reset" : "PhantomManage_Discard";
    this.Z3u.SetLocalTextNew(t);
  }
  Gsd() {
    for (let t = 0; t < this.w1c.length; t++) {
      var i = this.w1c[t];
      if (i.GetUniqueId() === this.qsd) {
        this.A1c.RefreshGridProxy(t);
        this.sbi(i);
        this.A1c.ScrollToGridIndex(t);
        break;
      }
    }
    this.qsd = 0;
  }
  e4u(t) {
    var i = this.r_u;
    this.r_u = t;
    for (let t = 0; t < this.w1c.length; t++) {
      var e = this.w1c[t].GetUniqueId();
      if (i === e || this.r_u === e) {
        this.A1c.RefreshGridProxy(t);
      }
    }
  }
  i4u() {
    var i = this.yil.GetSelectSet();
    if (i.size !== 0) {
      let t = undefined;
      for (const r of i) {
        var e = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(r).GetFunctionValueType();
        if (t === undefined) {
          t = e;
        } else if (e !== t) {
          return;
        }
      }
      return t;
    }
  }
  s4u(t) {
    if (t.size !== 0) {
      for (const i of t) {
        if (ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(i).GetFunctionValueType() === 1) {
          return true;
        }
      }
    }
    return false;
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueBatchChange, this.GGu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueBatchChange, this.GGu);
  }
  jJu() {
    var t = {
      ConfigId: ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst(),
      SelectRuleMap: new Map()
    };
    ModelManager_1.ModelManager.FilterModel.SetFilterConfigData(4, 43, t, "");
  }
  async jGu() {
    var t = this.yil.GetSelectSet();
    var t = Array.from(t);
    if (await ControllerHolder_1.ControllerHolder.InventoryController.PhantomFuncValueBatchRequest(t, Protocol_1.Aki.Protocol.Fxu.Proto_Disuse)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomProject_Warning07");
    }
  }
  async r4u() {
    var t = this.yil.GetSelectSet();
    if (t.size <= 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(EMPTY_SELECT_TIPS_TEXT_ID);
    } else {
      t = Array.from(t);
      if (await ControllerHolder_1.ControllerHolder.InventoryController.PhantomFuncValueBatchRequest(t, Protocol_1.Aki.Protocol.Fxu.Z6n)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomProject_Warning05");
      }
    }
  }
  async o4u(t) {
    var i = this.yil.GetSelectSet();
    if (i.size <= 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(EMPTY_SELECT_TIPS_TEXT_ID);
    } else {
      i = Array.from(i);
      if (await ControllerHolder_1.ControllerHolder.InventoryController.PhantomFuncValueBatchRequest(i, Protocol_1.Aki.Protocol.Fxu.UTs)) {
        i = t ? "PhantomProject_Warning06" : "PhantomProject_Warning08";
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(i);
      }
    }
  }
}
exports.PhantomManageView = PhantomManageView;
//# sourceMappingURL=PhantomManageView.js.map