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
    this.ylu = 0;
    this.eFu = undefined;
    this.w1c = [];
    this.yil = undefined;
    this.A1c = undefined;
    this.adi = undefined;
    this.lqe = undefined;
    this.vxt = undefined;
    this.tFu = undefined;
    this.iFu = undefined;
    this.rTu = t => {
      if (t === 0) {
        this.zao();
      }
    };
    this.FNt = (t, i, e) => {
      this.w1c = t;
      this.A1c.RefreshByData(t);
      this.vxt.SetVisible(this.w1c.length > 0);
      this.GetItem(16).SetUIActive(this.w1c.length <= 0);
      if (!(this.w1c.length <= 0)) {
        for (let t = 0; t < this.w1c.length; t++) {
          const r = this.w1c[t];
          if (r.GetUniqueId() === this.ylu) {
            this.C4e(r);
            this.A1c.ScrollToGridIndex(t);
            return;
          }
        }
        const r = this.w1c[0];
        this.rFu(r.GetUniqueId());
        this.C4e(r);
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
    this.f2u = i => {
      for (let t = 0; t < this.w1c.length; t++) {
        var e = this.w1c[t].GetUniqueId();
        if (i.includes(e)) {
          this.A1c.RefreshGridProxy(t);
        }
      }
      this.zao();
    };
    this.XHc = t => {
      this.rFu(t.GetUniqueId());
      this.C4e(t);
    };
    this.Ybu = t => {
      return this.yil.GetSelectSet().has(t.GetUniqueId());
    };
    this.oFu = t => t.GetUniqueId() === this.ylu;
    this.X8a = (t, i, e) => i;
    this.Kwi = t => {
      t = t.Data;
      this.yil.SwitchSelectState(t.GetUniqueId(), false);
      this.rFu(t.GetUniqueId());
      this.sbi(t);
    };
    this.sGe = () => {
      var t = new PhantomManageMediumItemGrid_1.PhantomManageMediumItemGrid();
      t.SetUseFixedAsync(true);
      t.BindOnExtendToggleStateChanged(this.Kwi);
      t.BindOnCanExecuteChange(this.X8a);
      return t;
    };
    this.n2u = () => {
      this.YHc();
      this.CloseMe();
    };
    this.g2u = t => {
      if (t === 1) {
        for (const i of this.w1c) {
          this.yil.SetSelectState(i.GetUniqueId(), true);
        }
        this.A1c.RefreshAllGridProxies();
      } else {
        this.C2u();
      }
    };
    this.C2u = () => {
      for (const t of this.yil.GetSelectSet()) {
        this.yil.SetSelectState(t, false);
      }
      this.A1c.RefreshAllGridProxies();
      this.GetExtendToggle(12).SetToggleState(0);
    };
    this.y2u = () => {
      if (this.nFu() !== 1) {
        this.sFu();
      } else {
        this.aFu(true);
      }
    };
    this.p2u = () => {
      if (this.nFu() !== 2) {
        this.hFu();
      } else {
        this.aFu(false);
      }
    };
    this.hFu = () => {
      var t = this.yil.GetSelectSet();
      if (t.size <= 0) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(EMPTY_SELECT_TIPS_TEXT_ID);
      } else if (this.lFu(t)) {
        (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(331)).FunctionMap.set(2, () => {
          this.v2u();
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(t);
      } else {
        this.v2u();
      }
    };
    this.Hqu = () => {
      if (UiManager_1.UiManager.IsViewOpen("PhantomManageConfigView") || UiManager_1.UiManager.IsViewHide("PhantomManageConfigView")) {
        UiManager_1.UiManager.CloseView("PhantomManageConfigView", this.S2u);
      } else {
        this.S2u(true);
      }
    };
    this.S2u = t => {
      if (t) {
        ControllerHolder_1.ControllerHolder.InventoryController.OpenManageConfigView();
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UILoopScrollViewComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIButtonComponent], [10, UE.UITexture], [11, UE.UIButtonComponent], [12, UE.UIExtendToggle], [13, UE.UIButtonComponent], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem]];
    this.BtnBindInfo = [[9, this.n2u], [12, this.g2u], [13, this.C2u], [11, this.Hqu]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    this.tFu = new ButtonItem_1.ButtonItem();
    this.iFu = new ButtonItem_1.ButtonItem();
    this.tFu.SetFunction(this.y2u);
    this.iFu.SetFunction(this.p2u);
    t.push(this.tFu.CreateThenShowByActorAsync(this.GetItem(15).GetOwner()));
    t.push(this.iFu.CreateThenShowByActorAsync(this.GetItem(14).GetOwner()));
    this.vxt = new ItemTipsWithButton_1.ItemTipsWithButtonComponent();
    t.push(this.vxt.CreateByActorAsync(this.GetItem(7).GetOwner()));
    await Promise.all(t);
  }
  OnStart() {
    this.yil = new PhantomManageViewModel_1.PhantomManageViewModel();
    this.yil.Bind(this.rTu);
    this.A1c = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), this.GetItem(5).GetOwner(), this.sGe);
    PhantomManageMediumItemGrid_1.PhantomManageMediumItemGrid.CallbackCheckTips = this.oFu;
    PhantomManageMediumItemGrid_1.PhantomManageMediumItemGrid.CallbackCheckSelect = this.Ybu;
    PhantomManageMediumItemGrid_1.PhantomManageMediumItemGrid.CallbackListenerFocus = this.XHc;
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(8), this.FNt);
    this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(1));
    this.lqe.SetHelpBtnActive(false);
    this.lqe.SetCloseBtnShowState(false);
  }
  OnBeforeShow() {
    this.ylu = this.OpenParam ?? 0;
    var t = this.ylu > 0 ? ModelManager_1.ModelManager.InventoryModel.GetPhantomItemData(this.ylu) : undefined;
    if (t) {
      this.sbi(t);
    } else {
      this.ylu = 0;
    }
    this.SetButtonUiActive(11, false);
    this.SCi();
    this.d4e();
    this.zao();
  }
  OnBeforeDestroy() {
    this.yil.UnBind(this.rTu);
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
    var t = this.nFu();
    this.eFu = t;
    var t = this.eFu === 1 ? "PhantomManage_UnLock" : "PhantomManage_Lock";
    this.tFu.SetLocalTextNew(t);
    var t = this.eFu === 2 ? "PhantomManage_Reset" : "PhantomManage_Discard";
    this.iFu.SetLocalTextNew(t);
  }
  rFu(t) {
    var i = this.ylu;
    this.ylu = t;
    for (let t = 0; t < this.w1c.length; t++) {
      var e = this.w1c[t].GetUniqueId();
      if (i === e || this.ylu === e) {
        this.A1c.RefreshGridProxy(t);
      }
    }
  }
  nFu() {
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
  lFu(t) {
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueBatchChange, this.f2u);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.I3a);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueBatchChange, this.f2u);
  }
  YHc() {
    var t = {
      ConfigId: ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst(),
      SelectRuleMap: new Map()
    };
    ModelManager_1.ModelManager.FilterModel.SetFilterConfigData(4, 43, t, "");
  }
  async v2u() {
    var t = this.yil.GetSelectSet();
    var t = Array.from(t);
    if (await ControllerHolder_1.ControllerHolder.InventoryController.PhantomFuncValueBatchRequest(t, Protocol_1.Aki.Protocol.dxu.Proto_Disuse)) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomProject_Warning07");
    }
  }
  async sFu() {
    var t = this.yil.GetSelectSet();
    if (t.size <= 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(EMPTY_SELECT_TIPS_TEXT_ID);
    } else {
      t = Array.from(t);
      if (await ControllerHolder_1.ControllerHolder.InventoryController.PhantomFuncValueBatchRequest(t, Protocol_1.Aki.Protocol.dxu.Z6n)) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("PhantomProject_Warning05");
      }
    }
  }
  async aFu(t) {
    var i = this.yil.GetSelectSet();
    if (i.size <= 0) {
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(EMPTY_SELECT_TIPS_TEXT_ID);
    } else {
      i = Array.from(i);
      if (await ControllerHolder_1.ControllerHolder.InventoryController.PhantomFuncValueBatchRequest(i, Protocol_1.Aki.Protocol.dxu.UTs)) {
        i = t ? "PhantomProject_Warning06" : "PhantomProject_Warning08";
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(i);
      }
    }
  }
}
exports.PhantomManageView = PhantomManageView;
//# sourceMappingURL=PhantomManageView.js.map