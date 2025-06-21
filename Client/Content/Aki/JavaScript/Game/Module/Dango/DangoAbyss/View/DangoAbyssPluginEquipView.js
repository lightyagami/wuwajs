"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssPluginEquipView = void 0;
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  UiViewBase_1 = require("../../../../Ui/Base/UiViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  FilterSortEntrance_1 = require("../../../Common/FilterSort/FilterSortEntrance"),
  ItemTipsComponent_1 = require("../../../Common/ItemTips/ItemTipsComponent"),
  ItemTipsUtilTool_1 = require("../../../Common/ItemTips/ItemTipsUtilTool"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  DynScrollView_1 = require("../../../Util/ScrollView/DynScrollView"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  DangoAbyssDefine_1 = require("../DangoAbyssDefine"),
  DangoAbyssAttributeBaseItem_1 = require("./DangoAbyssAttributeBaseItem"),
  DangoAbyssAttributeParentItem_1 = require("./DangoAbyssAttributeParentItem"),
  DangoAbyssItemMediumItemGrid_1 = require("./DangoAbyssItemMediumItemGrid"),
  DangoAbyssPluginItem_1 = require("./DangoAbyssPluginItem");
class DangoAbyssPluginEquipView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), this.iSc = void 0, this.A1c = void 0, this.Vvt = void 0, this.adi = void 0, this.y5c = void 0, this.yil = void 0, this.FU1 = [], this.Z71 = [], this.zB1 = -1, this.Qru = [], this.Kru = -1, this.Xru = -1, this.K3e = () => {
      var t = new DangoAbyssItemMediumItemGrid_1.DangoAbyssItemMediumItemGrid;
      return t.BindOnExtendToggleStateChanged(this.jbe), t.BindOnCanExecuteChange(this.OnCanExecuteChange), t
    }, this.AOe = t => {
      switch (t) {
        case 0:
          this.EGc();
          break;
        case 1:
          this.IGc();
          break;
        case 2:
          this.TGc()
      }
    }, this.e91 = () => {
      var t = this._M1();
      0 <= t && this.A1c.ScrollToGridIndex(t)
    }, this.FNt = t => {
      this.Z71 = t, this.wGc(), this.i91(), this.t91()
    }, this.cNc = () => {
      const i = this.Qru;
      this.aSc(), this.A1c.RefreshAllGridProxies(), this.fvt(), this.wGc();
      var t = this.yil.GetDangoId(),
        t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(t),
        t = (this.Qru = t?.GetEquipItems() ?? [], this.Qru.some(t => !i.includes(t)) || i.some(t => !this.Qru.includes(t)));
      t && (ControllerHolder_1.ControllerHolder.GuideController.TryFinishRunningGuides(), this.Kru = this.gO1(), this.Xru = this.fO1(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssPluginEquipAttrRefresh, -1 < this.Xru, -1 < this.Kru))
    }, this.$a1 = t => {
      t = this.rH1(t, -1);
      t < 0 || this.A1c.RefreshGridProxy(t)
    }, this.I5t = () => {
      this.yil.UnBind(this.AOe), this.CloseMe()
    }, this.Wa1 = () => {
      ModelManager_1.ModelManager.DangoAbyssModel.GetRecoveryAvailable() && UiManager_1.UiManager.OpenView("DangoAbyssPluginRecoveryView", this.yil)
    }, this.S5c = (t, i, e) => {
      return new DangoAbyssAttributeParentItem_1.DangoAbyssAttributeParentItem
    }, this.jbe = t => {
      var i = t.Data,
        e = this.yil.GetPluginItem();
      i.GetUniqueId() !== e?.GetUniqueId() && 1 === t.State && (e = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(i.GetUniqueId()), this.yil.SetPluginItem(e))
    }, this.OnCanExecuteChange = (t, i, e) => {
      var s = this.yil.GetPluginItem();
      return !(t.GetUniqueId() === s?.GetUniqueId()) || !(1 === e)
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UILoopScrollViewComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIDynScrollViewComponent],
      [12, UE.UIItem],
      [13, UE.UIButtonComponent],
      [14, UE.UIText]
    ], this.BtnBindInfo = [
      [0, this.I5t],
      [2, this.Wa1]
    ]
  }
  GetLoopAudioEventSwitch() {
    return !ModelManager_1.ModelManager.DangoAbyssModel.CheckIfInSmallWorldInstance()
  }
  async OnBeforeStartAsync() {
    this.yil = this.OpenParam, this.iSc = new PluginPanel, this.iSc.ViewModel = this.yil;
    [].push(this.iSc.CreateThenShowByActorAsync(this.GetItem(8).GetOwner())), this.Vvt = new ItemTipsComponent_1.ItemTipsComponentContentComponent, await this.Vvt.CreateByActorAsync(this.GetItem(3).GetOwner()), this.y5c = new DynScrollView_1.DynamicScrollView(this.GetUIDynScrollViewComponent(11), this.GetItem(10), new DangoAbyssAttributeBaseItem_1.DangoAbyssAttributeBaseItem, this.S5c), await this.y5c.Init(), this.A1c = new LoopScrollView_1.LoopScrollView(this.GetLoopScrollViewComponent(4), this.GetItem(5).GetOwner(), this.K3e), this.adi = new FilterSortEntrance_1.FilterSortEntrance(this.GetItem(7), this.FNt)
  }
  OnBeforeShow() {
    this.yil.SetPluginItem(void 0, !0), this.yil.Bind(this.AOe), this.FU1 = [], this.zB1 = this.yil.GetSlotIndex();
    var t = this.yil.GetDangoId(),
      i = (Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 75, "打开装备页", ["dangoId", t]), ModelManager_1.ModelManager.DangoAbyssModel.GetRecoveryAvailable()),
      i = (this.GetButton(2).RootUIComp.SetUIActive(i), this.SetButtonUiActive(13, !1), this.pO(), ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(t));
    this.Qru = i?.GetEquipItems() ?? []
  }
  OnBeforeDestroy() {
    this.yil.SetSlotIndex(-1, !0), this.yil.SetPluginItem(void 0, !0), this.yil.UnBind(this.AOe)
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.cNc), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemFuncValueChange, this.$a1)
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, this.cNc), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemFuncValueChange, this.$a1)
  }
  pO() {
    this.aSc(), this.d4e(), this.fvt(), this.wGc()
  }
  aSc() {
    this.iSc.Refresh()
  }
  d4e() {
    var t = this.yil.GetSlotIndex(),
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemListBySlotIndex(t),
      i = this.yil.GetDangoId();
    this.adi.UpdateData(41, t, i)
  }
  fvt() {
    var t = this.yil.GetDangoId();
    ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(t) ? (this.GetItem(12).SetUIActive(!1), this.GetUIDynScrollViewComponent(11).RootUIComp.SetUIActive(!0), t = ModelManager_1.ModelManager.DangoAbyssModel.GetEquipViewAttributeDataById(t), t = ModelManager_1.ModelManager.DangoAbyssModel.SetEquipViewAttributeType(this.FU1, t), this.FU1 = t, this.y5c.RefreshByData(t)) : (this.GetItem(12).SetUIActive(!0), this.GetUIDynScrollViewComponent(11).RootUIComp.SetUIActive(!1))
  }
  wGc() {
    var t, i, e, s = this.yil.GetPluginItem();
    s ? (e = s.GetConfigId(), t = this.yil.GetSlotIndex(), i = this.yil.GetDangoId(), e = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemTipsData(e, s.GetUniqueId(), t, i), s = ItemTipsUtilTool_1.ItemTipsComponentUtilTool.GetTipsDataByPram(e), this.Vvt.Refresh(s), this.Vvt.SetUiActive(!0)) : this.Vvt.SetUiActive(!1)
  }
  i91(t) {
    var i = this.Z71,
      e = (this.GetItem(6).SetUIActive(i.length <= 0), this.yil.GetSlotIndex()),
      s = i.length,
      r = ModelManager_1.ModelManager.DangoAbyssModel.GetAllPluginItemList().length,
      e = ModelManager_1.ModelManager.DangoAbyssModel.GetSlotTypeTextIdBySlotIndex(e),
      e = (LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(1), e, s), ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemPackageCapacity());
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(14), "Text_DangoPluginItemCapacity_Text", r, e), this.A1c.RefreshByData(i, t)
  }
  t91(t) {
    var i = this.Z71,
      i = (this._M1() < 0 && (i = i?.[0], this.yil.SetPluginItem(i)), this.A1c.DeselectCurrentGridProxy(!1), this._M1());
    this.A1c.SelectGridProxy(i), t || this.e91()
  }
  EGc() {
    this.pO()
  }
  IGc() {
    var t, i, e = this.yil.GetSlotIndex(),
      s = (Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 75, "EquipView OnSlotIndexUpdate", ["index", e]), this.aSc(), this.yil.GetDangoId()),
      s = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemIncIdBySlotIndex(s, e);
    0 < s && (t = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(s), (i = this.yil.GetPluginItem()) && i.GetUniqueId() !== t.GetUniqueId() && this.A1c.DeselectCurrentGridProxy(!1), this.yil.SetPluginItem(t, !0)), ModelManager_1.ModelManager.DangoAbyssModel.GetIfSlotTypeChange(this.zB1, e) ? this.d4e() : (this.i91(s <= 0), this.t91(s <= 0)), this.zB1 = e, this.wGc()
  }
  TGc() {
    this.A1c.DeselectCurrentGridProxy(!1);
    var t = this._M1();
    this.A1c.SelectGridProxy(t), this.A1c.RefreshAllGridProxies(), this.wGc()
  }
  _M1() {
    var t = this.yil.GetPluginItem();
    return t ? this.rH1(t.GetUniqueId(), t.GetConfigId()) : -1
  }
  rH1(e, s) {
    if (0 < e || 0 < s)
      for (let t = 0, i = this.Z71.length; t < i; ++t) {
        var r = this.Z71[t];
        if (0 < e) {
          if (r.GetUniqueId() === e) return t
        } else if (r.GetConfigId() === s) return t
      }
    return -1
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i, e;
    if (0 !== t.length) return "PluginSelect" === (i = t[0]) ? !(t.length < 2) && (e = Number(t[1]), e = this.A1c?.GetGridByDisplayIndex(e)) ? [e, e] : void 0 : "InvalidAttr" === i ? (e = this.Xru, (e = this.y5c?.GetGridByDisplayIndex(e)) ? [e, e] : void 0) : "ValidAttr" === i ? (e = this.Kru, (e = this.y5c?.GetGridByDisplayIndex(e)) ? [e, e] : void 0) : "DangoPlugin" === i ? this.Vvt?.GetGuideUiItemAndUiItemForShowEx(t) : void 0
  }
  fO1() {
    return this.FU1.findIndex(t => !t.IsValid && !!t.Tag)
  }
  gO1() {
    return this.FU1.findIndex(t => t.IsChange && t.IsValid)
  }
}
exports.DangoAbyssPluginEquipView = DangoAbyssPluginEquipView;
class PluginPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.hSc = new Map, this.ViewModel = void 0
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    var i = [];
    for (let t = 0; t < DangoAbyssDefine_1.SLOT_COUNT; t++) {
      var e = new DangoAbyssPluginItem_1.DangoAbyssPluginItem(t, !0);
      e.ViewModel = this.ViewModel, i.push(e.CreateThenShowByActorAsync(this.GetItem(t).GetOwner())), this.hSc.set(t, e)
    }
    await Promise.all(i)
  }
  Refresh() {
    var t = this.ViewModel.GetDangoId(),
      t = ModelManager_1.ModelManager.DangoAbyssModel.GetDangoAbyssRoleData(t);
    t && this.aSc(t)
  }
  aSc(e) {
    this.hSc.forEach((t, i) => {
      i = e.GetPluginSlotData(i);
      t.Refresh(i)
    })
  }
}
//# sourceMappingURL=DangoAbyssPluginEquipView.js.map