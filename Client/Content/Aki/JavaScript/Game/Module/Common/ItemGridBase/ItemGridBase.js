"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemGridBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LongPressButtonItem_1 = require("../Button/LongPressButtonItem");
class ItemGridBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.mPt = new Map();
    this.dPt = new Set();
    this.CPt = new Set();
    this.uh1 = [];
    this.gPt = [];
    this.fPt = [];
    this.pPt = undefined;
    this.vPt = undefined;
    this.dh1 = undefined;
    this.LongPressButton = new LongPressButtonItem_1.LongPressButtonItem();
    this.IsHover = false;
    this.IsSelected = false;
    this.IsForceSelected = false;
    this.MPt = true;
    this.IsAnyComponentLoading = false;
    this.UseFixedAsync = false;
    this.AllComponentLoadedCallback = undefined;
    this.SPt = undefined;
    this.yPt = undefined;
    this.IPt = undefined;
    this.TPt = undefined;
    this.LPt = undefined;
    this.DPt = undefined;
    this.RPt = undefined;
    this.UPt = () => {
      var t;
      this.OnExtendTogglePress();
      if (this.yPt) {
        t = {
          MediumItemGrid: this,
          State: this.GetItemGridExtendToggle().GetToggleState(),
          Data: this.Data
        };
        this.yPt(t);
      }
    };
    this.APt = () => {
      var t;
      this.OnExtendToggleRelease();
      if (this.IPt) {
        t = {
          MediumItemGrid: this,
          State: this.GetItemGridExtendToggle().GetToggleState(),
          Data: this.Data
        };
        this.IPt(t);
      }
      this.OnExtendToggleClicked();
      if (this.TPt) {
        t = {
          MediumItemGrid: this,
          State: this.GetItemGridExtendToggle().GetToggleState(),
          Data: this.Data
        };
        this.TPt(t);
      }
    };
    this.PPt = t => {
      this.OnExtendToggleStateChanged(t);
      if (this.SPt) {
        t = {
          MediumItemGrid: this,
          State: t,
          Data: this.Data
        };
        this.SPt(t);
      }
    };
    this.Lke = () => this.LPt ? this.LPt(this.Data, this.IsForceSelected, this.GetItemGridExtendToggle().GetToggleState()) : this.OnCanExecuteChange();
    this.xPt = () => {
      this.IsHover = true;
    };
    this.wPt = () => {
      this.IsHover = false;
    };
    this.OnLongPressActivate = t => {
      if (this.DPt) {
        this.DPt(t, this, this.Data);
      }
    };
    this.CanItemLongPressClick = () => !this.RPt || this.RPt(this, this.Data);
    this.sKu = (t, i) => {
      if (i) {
        this.CPt.add(t);
      } else {
        this.CPt.delete(t);
      }
    };
    this.BPt = t => {
      if (!this.UseFixedAsync) {
        this.bPt(t);
      }
      this.dPt.delete(t);
      if (!(this.dPt.size > 0)) {
        this.IsAnyComponentLoading = false;
        this.RefreshComponentVisible();
        this.RefreshComponentHierarchyIndex();
        this.AllComponentLoadedCallback?.();
      }
    };
  }
  Initialize(t) {
    if (t) {
      this.CreateThenShowByActor(t);
    }
  }
  OnStartImplement() {
    this.pPt = this.OnSetTopAdditionItem();
    this.vPt = this.OnSetBottomAdditionItem();
    this.dh1 = this.OnSetUnderTextAdditionItem();
    this.LongPressButton.Initialize(this.GetItemGridExtendToggle(), this.OnLongPressActivate, this.UPt, this.APt);
    this.LongPressButton.SetTickConditionDelegate(this.CanItemLongPressClick);
    this.AddEvents();
  }
  OnBeforeDestroyImplement() {
    this.pPt = undefined;
    this.vPt = undefined;
    this.dh1 = undefined;
    this.uh1.length = 0;
    this.gPt.length = 0;
    this.fPt.length = 0;
    this.LongPressButton?.Clear();
    this.LongPressButton = undefined;
    this.IsAnyComponentLoading = false;
    this.UnBindOnExtendTogglePress();
    this.UnBindOnExtendToggleRelease();
    this.UnBindOnExtendToggleStateChanged();
    this.UnBindOnExtendToggleClicked();
    this.UnBindOnCanExecuteChange();
    this.UnBindLongPress();
    this.UnBindComponentEvents();
    this.ClearVisibleComponent();
    this.ClearItemGridComponents();
    this.RemoveEvents();
  }
  OnSetUnderTextAdditionItem() {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Inventory", 75, "没有实现OnSetUnderTextAdditionItem");
    }
  }
  OnSetBottomAdditionItem() {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Inventory", 37, "没有实现OnSetBottomAdditionItem");
    }
  }
  OnSetTopAdditionItem() {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Inventory", 37, "没有实现OnSetBottomAdditionItem");
    }
  }
  GetItemGridExtendToggle() {
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Inventory", 37, "没有实现GetItemGridExtendToggle");
    }
  }
  AddEvents() {
    var t = this.GetItemGridExtendToggle();
    t.OnStateChange.Add(this.PPt);
    t.CanExecuteChange.Bind(this.Lke);
    t.OnHover.Add(this.xPt);
    t.OnUnHover.Add(this.wPt);
    this.OnAddEvents();
  }
  RemoveEvents() {
    var t = this.GetItemGridExtendToggle();
    t.OnStateChange.Remove(this.PPt);
    t.CanExecuteChange.Unbind();
    t.OnHover.Remove(this.xPt);
    t.OnUnHover.Remove(this.wPt);
    this.OnRemoveEvents();
  }
  UnBindComponentEvents() {}
  OnAddEvents() {}
  OnRemoveEvents() {}
  OnExtendTogglePress() {}
  OnExtendToggleRelease() {}
  OnExtendToggleClicked() {}
  OnExtendToggleStateChanged(t) {}
  OnCanExecuteChange() {
    return true;
  }
  SetSelected(t, i = false) {
    var s = this.GetItemGridExtendToggle();
    if (t) {
      if (i) {
        s.SetToggleStateForce(1, false);
      } else {
        s.SetToggleState(1, false);
      }
    } else if (i) {
      s.SetToggleStateForce(0, false);
    } else {
      s.SetToggleState(0, false);
    }
    this.IsSelected = t;
    this.IsForceSelected = i;
  }
  SetExtendToggleEnable(t, i = false) {
    var s;
    if (this.MPt !== t || !!i) {
      this.MPt = t;
      s = this.GetItemGridExtendToggle();
      if (t) {
        this.SetSelected(this.IsSelected, i);
      } else {
        s.SetToggleState(2);
      }
    }
  }
  BindOnExtendTogglePress(t) {
    this.yPt = t;
  }
  UnBindOnExtendTogglePress() {
    this.yPt = undefined;
  }
  BindOnExtendToggleRelease(t) {
    this.IPt = t;
  }
  UnBindOnExtendToggleRelease() {
    this.IPt = undefined;
  }
  BindOnExtendToggleStateChanged(t) {
    this.SPt = t;
  }
  UnBindOnExtendToggleStateChanged() {
    this.SPt = undefined;
  }
  BindOnExtendToggleClicked(t) {
    this.TPt = t;
  }
  UnBindOnExtendToggleClicked() {
    this.TPt = undefined;
  }
  BindOnCanExecuteChange(t) {
    this.LPt = t;
  }
  UnBindOnCanExecuteChange() {
    this.LPt = undefined;
  }
  BindLongPress(t, i, s) {
    this.LongPressButton.Deactivate();
    this.LongPressButton.Activate(t);
    this.DPt = i;
    this.RPt = s;
  }
  UnBindLongPress() {
    this.DPt = undefined;
    this.RPt = undefined;
  }
  RefreshComponent(t, i, s) {
    let e = this.GetItemGridComponent(t);
    if (s === undefined) {
      e?.SetActive(false);
      this.CPt.delete(e);
    } else if (e = !e && i ? this.qPt(t) : e) {
      e.Refresh(s);
      this.GPt(e);
      if (!this.UseFixedAsync && !e.IsCreating) {
        this.bPt(e);
      }
    }
    return e;
  }
  bPt(t) {
    if (t.IsShowOrShowing) {
      this.CPt.add(t);
    } else {
      this.CPt.delete(t);
    }
  }
  SetComponentVisible(t, i) {
    if (t) {
      if (i) {
        this.CPt.add(t);
      } else {
        this.CPt.delete(t);
      }
      t.SetActive(i);
    }
  }
  qPt(t) {
    var i = this.mPt.get(t);
    if (!i) {
      switch ((i = new t()).GetLayoutLevel()) {
        case 0:
          i.Initialize(this.pPt, this.UseFixedAsync);
          break;
        case 1:
          i.Initialize(this.vPt, this.UseFixedAsync);
          break;
        case 2:
          i.Initialize(this.dh1, this.UseFixedAsync);
      }
      if (this.UseFixedAsync) {
        i.OnComponentVisibleChanged = this.sKu;
      }
      this.mPt.set(t, i);
      this.dPt.add(i);
      this.IsAnyComponentLoading = true;
      i.Load().then(this.BPt, () => {});
    }
    return i;
  }
  RefreshComponentVisible() {
    if (!this.UseFixedAsync || !this.IsAnyComponentLoading) {
      for (const t of this.mPt.values()) {
        if (!this.CPt.has(t)) {
          t.SetActive(false);
        }
      }
    }
  }
  ClearVisibleComponent() {
    if (this.UseFixedAsync && this.IsAnyComponentLoading) {
      for (const t of this.mPt.values()) {
        if (t.InAsyncLoading()) {
          t.Refresh(undefined);
        }
      }
    }
    this.CPt.clear();
  }
  GPt(t) {
    switch (t.GetLayoutLevel()) {
      case 0:
        this.fPt.push(t);
        break;
      case 1:
        this.gPt.push(t);
        break;
      case 2:
        this.uh1.push(t);
    }
  }
  ClearComponentList() {
    this.uh1.length = 0;
    this.gPt.length = 0;
    this.fPt.length = 0;
  }
  RefreshComponentHierarchyIndex() {
    if (!this.IsAnyComponentLoading) {
      for (let t = 0; t < this.fPt.length; t++) {
        this.fPt[t].SetHierarchyIndex(t);
      }
      for (let t = 0; t < this.gPt.length; t++) {
        this.gPt[t].SetHierarchyIndex(t);
      }
      for (let t = 0; t < this.uh1.length; t++) {
        this.uh1[t].SetHierarchyIndex(t);
      }
    }
  }
  GetItemGridComponent(t) {
    t = this.mPt.get(t);
    if (t) {
      return t;
    }
  }
  HiddenAllItemGridComponents() {
    for (const t of this.mPt.values()) {
      t.SetActive(false);
    }
  }
  SetItemGridComponentVisible(t, i) {
    this.mPt.get(t)?.SetActive(i);
  }
  ClearItemGridComponents() {
    this.mPt.clear();
    this.dPt.clear();
    this.ClearComponentList();
  }
  SetToggleInteractive(t) {
    this.GetItemGridExtendToggle().SetSelfInteractive(t);
  }
  SetUseFixedAsync(t) {
    this.UseFixedAsync = t;
  }
}
exports.ItemGridBase = ItemGridBase;
//# sourceMappingURL=ItemGridBase.js.map