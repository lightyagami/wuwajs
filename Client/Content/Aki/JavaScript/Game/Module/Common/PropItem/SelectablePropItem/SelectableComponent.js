"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectableComponent = exports.SelectableComponentData = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
const SelectableExpData_1 = require("./SelectableExpData");
const SelectablePropDataUtil_1 = require("./SelectablePropDataUtil");
const SelectablePropMediumItemGrid_1 = require("./SelectablePropMediumItemGrid");
const DEFAULT_MAX_SIZE = 20;
class SelectableComponentData {
  constructor() {
    this.IsSingleSelected = false;
    this.IsNumSelectable = true;
    this.MaxSelectedGridNum = DEFAULT_MAX_SIZE;
    this.SuitActive = false;
    this.IsNeedSort = true;
    this.FirstOpenOperationData = undefined;
    this.OtherFunction = undefined;
    this.OnPropItemFunction = undefined;
    this.OnChangeSelectedFunction = undefined;
    this.CheckIfCanAddFunction = undefined;
  }
}
exports.SelectableComponentData = SelectableComponentData;
class SelectableComponent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.LoopScrollView = undefined;
    this.Data = undefined;
    this.SelectedDataList = [];
    this.ItemDataList = undefined;
    this.LastAddData = undefined;
    this.LastSelectedPropData = undefined;
    this.MaxSize = 20;
    this.SelectableExpData = undefined;
    this.FirstOperationData = undefined;
    this.ExpData = undefined;
    this.LastSelectedIndex = 0;
    this.uBt = t => {
      var t = this.ItemDataList[t];
      var t = SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(t);
      var e = this.cBt(t);
      t.SelectedCount = e;
      return t;
    };
    this.InitItem = () => {
      var t = new SelectablePropMediumItemGrid_1.SelectablePropMediumItemGrid();
      t.BindLongPress(1, this.AddFunction, this.CanItemLongPress);
      t.BindReduceLongPress(this.ReduceFunction);
      t.BindAfterApply(this.OnAfterApplyMediumItemGrid);
      t.BindOnCanExecuteChange(this.OnCanExecuteChange);
      return t;
    };
    this.OnAfterApplyMediumItemGrid = t => {};
    this.OnCanExecuteChange = (t, e, i) => {
      return this.CanAddMaterial(t);
    };
    this.CanItemLongPress = (t, e) => {
      return this.CanAddMaterial(e, false);
    };
    this.AddFunction = (t, e, i) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectItemAdd, i.ItemId, i.IncId);
      this.SetPrevPropItemSelectedState(i);
      if (!this.CanAddMaterial(i, true)) {
        return false;
      }
      if (this.Data.IsSingleSelected) {
        this.DeleteLastData(i);
        this.CancelPropItemSelected(i);
      }
      this.mBt(i);
      this.AddData(i);
      this.UpdateExp();
      this.dBt();
      var s = this.GetSelectedData(i);
      i.SelectedCount = s.SelectedCount;
      e.RefreshCostCount();
      var s = {
        IsVisible: i.SelectedCount > 0,
        LongPressConfigId: 1
      };
      if (this.Data?.IsNumSelectable) {
        e.SetReduceButton(s);
      }
      e.SetSelected(i.SelectedCount > 0, true);
      return true;
    };
    this.ReduceFunction = (t, e, i) => {
      this.SetPrevPropItemSelectedState(i);
      var s = this.GetSelectedData(i);
      if (!s) {
        return false;
      }
      var r = s.SelectedCount;
      if (!r) {
        return false;
      }
      if (--r <= 0) {
        this.CBt(i);
      } else {
        s.SelectedCount = r;
      }
      i.SelectedCount = r;
      if (this.Data.OtherFunction) {
        this.Data.OtherFunction();
      }
      this.UpdateExp();
      this.dBt();
      s = e;
      s.RefreshCostCount();
      s.SetSelected(r > 0, true);
      e = {
        IsVisible: i.SelectedCount > 0,
        LongPressConfigId: 1
      };
      if (this.Data?.IsNumSelectable) {
        s.SetReduceButton(e);
      }
      return true;
    };
  }
  InitLoopScroller(t, e, i) {
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(t, e.GetOwner(), this.InitItem);
    this.SetData(i);
  }
  SetData(t) {
    this.Data = t;
  }
  SetExpData(t) {
    this.SelectableExpData = SelectableExpData_1.SelectableExpData.PhraseData(t);
  }
  SetMaxSize(t) {
    this.MaxSize = t;
  }
  UpdateComponent(t, e, i = undefined) {
    this.gBt(e);
    if (i) {
      this.ExpData = i;
      this.SetExpData(i);
      this.UpdateExp();
    }
  }
  RefreshPartByIndex(t) {
    this.LoopScrollView.RefreshGridProxy(t);
  }
  RefreshAllByDisplay() {
    this.LoopScrollView.RefreshAllGridProxies();
  }
  gBt(t) {
    this.SelectedDataList = t || [];
    if (this.Data.IsSingleSelected && t.length > 0) {
      this.mBt(t[0]);
    }
  }
  GetCurrentSelectedData() {
    return this.SelectedDataList;
  }
  UpdateDataList(t) {
    this.ItemDataList = t;
    this.LoopScrollView.ReloadProxyData(this.uBt, this.ItemDataList.length, false);
    if (this.ItemDataList.length > 0) {
      this.LoopScrollView.ScrollToGridIndex(this.LastSelectedIndex);
    }
  }
  RefreshByData(t, e = false, i) {
    this.ItemDataList = t;
    var s = new Array();
    for (const a of this.ItemDataList) {
      var r = SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(a);
      var h = this.cBt(r);
      r.SelectedCount = h;
      s.push(r);
    }
    this.LoopScrollView.RefreshByData(s, e, i);
  }
  UpdateChangeItemSelectList() {
    this.Data.OnChangeSelectedFunction?.(this.SelectedDataList, this.SelectableExpData);
  }
  GetFirstOperationItem() {
    return this.FirstOperationData;
  }
  SetFirstOperationData(t) {
    this.FirstOperationData = t;
  }
  OnBeforeDestroy() {}
  SetPrevPropItemSelectedState(t) {
    if (this.LastSelectedPropData !== undefined && !this.fBt(t) && !!this.LastAddData && !((t = this.GetLoopScrollViewIndex(this.LastAddData.IncId, this.LastAddData.ItemId)) < 0)) {
      if (this.LoopScrollView.IsGridDisplaying(t)) {
        this.LoopScrollView.UnsafeGetGridProxy(t).OnDeselected(false);
      }
    }
  }
  CanAddMaterial(t, e = false) {
    var i;
    if (t.GetIsLock()) {
      if (e) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponLockTipsText");
      }
      return false;
    } else if (this.SelectableExpData?.IsInMax()) {
      if (e) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponAddExpTipsText");
      }
      return false;
    } else {
      return (!(i = this.GetSelectedData(t))?.SelectedCount || i.SelectedCount !== t.Count) && !(!i && this.SelectedDataList.length >= this.MaxSize && !this.Data.IsSingleSelected ? (e && ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponFullMaterialText"), 1) : this.Data.CheckIfCanAddFunction && !this.Data.CheckIfCanAddFunction(this.SelectedDataList, t.IncId, t.ItemId, 1));
    }
  }
  fBt(t) {
    var e;
    return !!this.LastAddData && ((e = t.IncId) > 0 ? this.LastAddData.IncId === e : this.LastAddData.ItemId === t.ItemId);
  }
  GetLoopScrollViewIndex(i, s) {
    if (i > 0 || s > 0) {
      for (let t = 0, e = this.ItemDataList.length; t < e; ++t) {
        var r = this.ItemDataList[t];
        if (i > 0) {
          if (r.GetUniqueId() === i) {
            return t;
          }
        } else if (r.GetConfigId() === s) {
          return t;
        }
      }
    }
    return -1;
  }
  DeleteLastData(t) {
    if (!this.fBt(t)) {
      this.CBt(this.LastAddData);
    }
  }
  CBt(t) {
    var e;
    if (t) {
      if ((e = t.IncId) > 0) {
        this.RemoveSelectedDataByIncId(e);
      } else {
        this.MBt(t.ItemId);
      }
    }
  }
  RemoveSelectedDataByIncId(e) {
    for (let t = 0; t < this.SelectedDataList.length; t++) {
      var i = this.SelectedDataList[t];
      if (i.IncId === e) {
        i.SelectedCount = 0;
        this.SelectedDataList.splice(t, 1);
        return;
      }
    }
  }
  MBt(e) {
    for (let t = 0; t < this.SelectedDataList.length; t++) {
      var i = this.SelectedDataList[t];
      if (i.ItemId === e) {
        i.SelectedCount = 0;
        this.SelectedDataList.splice(t, 1);
        return;
      }
    }
  }
  CancelPropItemSelected(t) {
    if (this.LastAddData !== undefined && !this.fBt(t) && !((t = this.GetLoopScrollViewIndex(this.LastAddData.IncId, this.LastAddData.ItemId)) < 0)) {
      if (this.LoopScrollView.IsGridDisplaying(t)) {
        (t = this.LoopScrollView.UnsafeGetGridProxy(t)).Clear();
        t.SetSelected(false, true);
        t.SetReduceButton(undefined);
      }
    }
  }
  mBt(t) {
    this.LastAddData = t;
  }
  AddData(t) {
    var e = this.GetSelectedData(t);
    if (e) {
      this.EBt(e);
    } else {
      this.SelectedDataList.push(t);
      t.SelectedCount++;
    }
    if (this.Data.OtherFunction) {
      this.Data.OtherFunction();
    }
  }
  EBt(e) {
    var i = this.SelectedDataList.length;
    for (let t = 0; t < i; t++) {
      var s = this.SelectedDataList[t];
      if (s.IncId === 0 && s.ItemId === e.ItemId) {
        s.SelectedCount = s.SelectedCount + 1;
        return;
      }
    }
    this.SelectedDataList.push(e);
  }
  GetSelectedData(t) {
    if (t) {
      var e = t.IncId;
      if (e > 0) {
        for (const t of this.SelectedDataList) {
          if (t.IncId === e) {
            return t;
          }
        }
      } else {
        var i = t.ItemId;
        if (i > 0) {
          for (const t of this.SelectedDataList) {
            if (t.ItemId === i) {
              return t;
            }
          }
        }
      }
    }
  }
  cBt(t) {
    t = this.GetSelectedData(t);
    if (t) {
      return t.SelectedCount;
    } else {
      return 0;
    }
  }
  UpdateExp() {
    if (this.ExpData?.GetItemExpFunction) {
      let t = 0;
      for (const e of this.SelectedDataList) {
        t += this.ExpData.GetItemExpFunction(e) * e.SelectedCount;
      }
      this.SelectableExpData.UpdateExp(t);
    }
  }
  dBt() {
    this.UpdateChangeItemSelectList();
  }
  GetGridByDisplayIndex(t) {
    return this.LoopScrollView?.GetGridByDisplayIndex(t);
  }
}
exports.SelectableComponent = SelectableComponent;
//# sourceMappingURL=SelectableComponent.js.map