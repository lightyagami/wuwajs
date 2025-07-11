"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssPluginEquipView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const FilterSortEntrance_1 = require("../../../Common/FilterSort/FilterSortEntrance");
const ItemTipsComponent_1 = require("../../../Common/ItemTips/ItemTipsComponent");
const ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DynScrollView_1 = require("../../../Util/ScrollView/DynScrollView");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const DangoAbyssDefine_1 = require("../DangoAbyssDefine");
const DangoAbyssAttributeBaseItem_1 = require("./DangoAbyssAttributeBaseItem");
const DangoAbyssAttributeParentItem_1 = require("./DangoAbyssAttributeParentItem");
const DangoAbyssItemMediumItemGrid_1 = require("./DangoAbyssItemMediumItemGrid");
const DangoAbyssPluginItem_1 = require("./DangoAbyssPluginItem");
class DangoAbyssPluginEquipView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.iSc = undefined;
    this.A1c = undefined;
    this.Vvt = undefined;
    this.adi = undefined;
    this.y5c = undefined;
    this.yil = undefined;
    this.CB1 = [];
    this.B91 = [];
    this.Lk1 = -1;
    this.Bau = [];
    this.kau = -1;
    this.Oau = -1;
    this.K3e = () => {
      var t = new DangoAbyssItemMediumItemGrid_1.DangoAbyssItemMediumItemGrid();
      t.BindOnExtendToggleStateChanged(this.jbe);
      t.BindOnCanExecuteChange(this.OnCanExecuteChange);
      return t;
    };
    this.AOe = t => {
      switch (t) {
        case 0:
          this.EGc();
          break;
        case 1:
          this.IGc();
          break;
        case 2:
          this.TGc();
      }
    };
    this.k91 = () => {
      var t = this.DM1();
      if (t >= 0) {
        this.A1c.ScrollToGridIndex(t);
      }
    };
    this.FNt = t => {
      this.B91 = t;
      this.wGc();
      this.q91();
      this.O91();
    };
    this.cNc = () => {
      const i = this.Bau;
      this.aSc();
      this.A1c.RefreshAllGridProxies();
      this.fvt();
      this.wGc();
      var t = this.yil.GetDangoId();
      var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(t);
      this.Bau = t?.GetEquipItems() ?? [];
      var t = this.Bau.some(t => !i.includes(t)) || i.some(t => !this.Bau.includes(t));
      if (t) {
        ControllerHolder_1.ControllerHolder.GuideController.TryFinishRunningGuides();
        this.kau = this.QO1();
        this.Oau = this.WO1();
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssPluginEquipAttrRefresh, this.Oau > -1, this.kau > -1);
      }
    };
    this.mh1 = t => {
      t = this.FH1(t, -1);
      if (!(t < 0)) {
        this.A1c.RefreshGridProxy(t);
      }
    };
    this.I5t = () => {
      this.yil.UnBind(this.AOe);
      this.CloseMe();
    };
    this.fh1 = () => {
      if (ModelManager_1.ModelManager.DangoAbyssModel.GetRecoveryAvailable()) {
        UiManager_1.UiManager.OpenView("DangoAbyssPluginRecoveryView", this.yil);
      }
    };
    this.S5c = (t, i, e) => {
      return new DangoAbyssAttributeParentItem_1.DangoAbyssAttributeParentItem();
    };
    this.jbe = t => {
      var i = t.Data;
      var e = this.yil.GetPluginItem();
      if (i.GetUniqueId() !== e?.GetUniqueId() && t.State === 1) {
        e = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(i.GetUniqueId());
        this.yil.SetPluginItem(e);
      }
    };
    this.OnCanExecuteChange = (t, i, e) => {
      var s = this.yil.GetPluginItem();
      return t.GetUniqueId() !== s?.GetUniqueId() || e !== 1;
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIText], [2, UE.UIButtonComponent], [3, UE.UIItem], [4, UE.UILoopScrollViewComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIDynScrollViewComponent], [12, UE.UIItem], [13, UE.UIButtonComponent], [14, UE.UIText]];
    this.BtnBindInfo = [[0, this.I5t], [2, this.fh1]];
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance();
  }
  async OnBeforeStartAsync() {
    this.yil = this.OpenParam;
    this.iSc = new PluginPanel();
    this.iSc.ViewModel = this.yil;
    [].push(this.iSc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner()));
    this.Vvt = new ItemTipsComponent_1.ItemTipsComponentContentComponent();
    await this.Vvt.CreateByActorAsync(this.GetItem(3).GetOwner());
    this.y5c = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(11), this.GetItem(10), new DangoAbyssAttributeBaseItem_1.DangoAbyssAttributeBaseItem(), this.S5c);
    await this.y5c.Init();
    this.A1c = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), this.GetItem(5).GetOwner(), this.K3e);
    this.adi = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(7), this.FNt);
  }
  OnBeforeShow() {
    this.yil.SetPluginItem(undefined, true);
    this.yil.Bind(this.AOe);
    this.CB1 = [];
    this.Lk1 = this.yil.GetSlotIndex();
    var t = this.yil.GetDangoId();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Activity", 75, "打开装备页", ["dangoId", t]);
    }
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetRecoveryAvailable();
    this.GetButton(2).RootUIComp.SetUIActive(i);
    this.SetButtonUiActive(13, false);
    this.pO();
    var i = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(t);
    this.Bau = i?.GetEquipItems() ?? [];
  }
  OnBeforeDestroy() {
    this.yil.SetSlotIndex(-1, true);
    this.yil.SetPluginItem(undefined, true);
    this.yil.UnBind(this.AOe);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.cNc);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.mh1);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.cNc);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.mh1);
  }
  pO() {
    this.aSc();
    this.d4e();
    this.fvt();
    this.wGc();
  }
  aSc() {
    this.iSc.Refresh();
  }
  d4e() {
    var t = this.yil.GetSlotIndex();
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemListBySlotIndex(t);
    var i = this.yil.GetDangoId();
    this.adi.UpdateData(41, t, i);
  }
  fvt() {
    var t = this.yil.GetDangoId();
    if (ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(t)) {
      this.GetItem(12).SetUIActive(false);
      this.GetUIDynScrollViewComponent(11).RootUIComp.SetUIActive(true);
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetEquipViewAttributeDataById(t);
      t = ModelManager_1.ModelManager.DangoAbyssModel.SetEquipViewAttributeType(this.CB1, t);
      this.CB1 = t;
      this.y5c.RefreshByData(t);
    } else {
      this.GetItem(12).SetUIActive(true);
      this.GetUIDynScrollViewComponent(11).RootUIComp.SetUIActive(false);
    }
  }
  wGc() {
    var t;
    var i;
    var e;
    var s = this.yil.GetPluginItem();
    if (s) {
      e = s.GetConfigId();
      t = this.yil.GetSlotIndex();
      i = this.yil.GetDangoId();
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemTipsData(e, s.GetUniqueId(), t, i);
      s = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataByPram(e);
      this.Vvt.Refresh(s);
      this.Vvt.SetUiActive(true);
    } else {
      this.Vvt.SetUiActive(false);
    }
  }
  q91(t) {
    var i = this.B91;
    this.GetItem(6).SetUIActive(i.length <= 0);
    var e = this.yil.GetSlotIndex();
    var s = i.length;
    var r = ModelManager_1.ModelManager.DangoAbyssModel.GetAllPluginItemList().length;
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetSlotTypeTextIdBySlotIndex(e);
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), e, s);
    var e = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemPackageCapacity();
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(14), "Text_DangoPluginItemCapacity_Text", r, e);
    this.A1c.RefreshByData(i, t);
  }
  O91(t) {
    var i = this.B91;
    if (this.DM1() < 0) {
      i = i?.[0];
      this.yil.SetPluginItem(i);
    }
    this.A1c.DeselectCurrentGridProxy(false);
    var i = this.DM1();
    this.A1c.SelectGridProxy(i);
    if (!t) {
      this.k91();
    }
  }
  EGc() {
    this.pO();
  }
  IGc() {
    var t;
    var i;
    var e = this.yil.GetSlotIndex();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Activity", 75, "EquipView OnSlotIndexUpdate", ["index", e]);
    }
    this.aSc();
    var s = this.yil.GetDangoId();
    var s = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemIncIdBySlotIndex(s, e);
    if (s > 0) {
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(s);
      if ((i = this.yil.GetPluginItem()) && i.GetUniqueId() !== t.GetUniqueId()) {
        this.A1c.DeselectCurrentGridProxy(false);
      }
      this.yil.SetPluginItem(t, true);
    }
    if (ModelManager_1.ModelManager.DangoAbyssModel.GetIfSlotTypeChange(this.Lk1, e)) {
      this.d4e();
    } else {
      this.q91(s <= 0);
      this.O91(s <= 0);
    }
    this.Lk1 = e;
    this.wGc();
  }
  TGc() {
    this.A1c.DeselectCurrentGridProxy(false);
    var t = this.DM1();
    this.A1c.SelectGridProxy(t);
    this.A1c.RefreshAllGridProxies();
    this.wGc();
  }
  DM1() {
    var t = this.yil.GetPluginItem();
    if (t) {
      return this.FH1(t.GetUniqueId(), t.GetConfigId());
    } else {
      return -1;
    }
  }
  FH1(e, s) {
    if (e > 0 || s > 0) {
      for (let t = 0, i = this.B91.length; t < i; ++t) {
        var r = this.B91[t];
        if (e > 0) {
          if (r.GetUniqueId() === e) {
            return t;
          }
        } else if (r.GetConfigId() === s) {
          return t;
        }
      }
    }
    return -1;
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    var e;
    if (t.length !== 0) {
      if ((i = t[0]) === "PluginSelect") {
        if (!(t.length < 2) && (e = Number(t[1]), e = this.A1c?.GetGridByDisplayIndex(e))) {
          return [e, e];
        } else {
          return undefined;
        }
      } else if (i === "InvalidAttr") {
        e = this.Oau;
        if (e = this.y5c?.GetGridByDisplayIndex(e)) {
          return [e, e];
        } else {
          return undefined;
        }
      } else if (i === "ValidAttr") {
        e = this.kau;
        if (e = this.y5c?.GetGridByDisplayIndex(e)) {
          return [e, e];
        } else {
          return undefined;
        }
      } else if (i === "DangoPlugin") {
        return this.Vvt?.GetGuideUiItemAndUiItemForShowEx(t);
      } else {
        return undefined;
      }
    }
  }
  WO1() {
    return this.CB1.findIndex(t => !t.IsValid && !!t.Tag);
  }
  QO1() {
    return this.CB1.findIndex(t => t.IsChange && t.IsValid);
  }
}
exports.DangoAbyssPluginEquipView = DangoAbyssPluginEquipView;
class PluginPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.hSc = new Map();
    this.ViewModel = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    var i = [];
    for (let t = 0; t < DangoAbyssDefine_1.SLOT_COUNT; t++) {
      var e = new DangoAbyssPluginItem_1.DangoAbyssPluginItem(t, true);
      e.ViewModel = this.ViewModel;
      i.push(e.CreateThenShowByActorAsync(this.GetItem(t).GetOwner()));
      this.hSc.set(t, e);
    }
    await Promise.all(i);
  }
  Refresh() {
    var t = this.ViewModel.GetDangoId();
    var t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(t);
    if (t) {
      this.aSc(t);
    }
  }
  aSc(e) {
    this.hSc.forEach((t, i) => {
      i = e.GetPluginSlotData(i);
      t.Refresh(i);
    });
  }
}
//# sourceMappingURL=DangoAbyssPluginEquipView.js.map