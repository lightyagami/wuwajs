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
    this.OnlyGold = false;
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
    this.OnlyGold = false;
    this.uBt = t => {
      var t = this.ItemDataList[t];
      var t = SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(t);
      var i = this.cBt(t);
      t.SelectedCount = i;
      t.OnlyGold = this.OnlyGold;
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
    this.OnCanExecuteChange = (t, i, e) => {
      return this.CanAddMaterial(t);
    };
    this.CanItemLongPress = (t, i) => {
      return this.CanAddMaterial(i, false);
    };
    this.AddFunction = (t, i, e) => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSelectItemAdd, e.ItemId, e.IncId);
      this.SetPrevPropItemSelectedState(e);
      if (!this.CanAddMaterial(e, true)) {
        return false;
      }
      if (this.Data.IsSingleSelected) {
        this.DeleteLastData(e);
        this.CancelPropItemSelected(e);
      }
      this.mBt(e);
      this.AddData(e);
      this.UpdateExp();
      this.dBt();
      var s = this.GetSelectedData(e);
      e.SelectedCount = s.SelectedCount;
      i.RefreshCostCount();
      var s = {
        IsVisible: e.SelectedCount > 0,
        LongPressConfigId: 1
      };
      if (this.Data?.IsNumSelectable) {
        i.SetReduceButton(s);
      }
      i.SetSelected(e.SelectedCount > 0, true);
      return true;
    };
    this.ReduceFunction = (t, i, e) => {
      this.SetPrevPropItemSelectedState(e);
      var s = this.GetSelectedData(e);
      if (!s) {
        return false;
      }
      var r = s.SelectedCount;
      if (!r) {
        return false;
      }
      if (--r <= 0) {
        this.CBt(e);
      } else {
        s.SelectedCount = r;
      }
      e.SelectedCount = r;
      if (this.Data.OtherFunction) {
        this.Data.OtherFunction();
      }
      this.UpdateExp();
      this.dBt();
      s = i;
      s.RefreshCostCount();
      s.SetSelected(r > 0, true);
      i = {
        IsVisible: e.SelectedCount > 0,
        LongPressConfigId: 1
      };
      if (this.Data?.IsNumSelectable) {
        s.SetReduceButton(i);
      }
      return true;
    };
  }
  InitLoopScroller(t, i, e) {
    this.LoopScrollView = new LoopScrollView_1.LoopScrollView(t, i.GetOwner(), this.InitItem);
    this.SetData(e);
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
  SetOnlyGold(t) {
    this.OnlyGold = t;
  }
  UpdateComponent(t, i, e = undefined) {
    this.gBt(i);
    if (e) {
      this.ExpData = e;
      this.SetExpData(e);
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
  RefreshByData(t, i = false, e) {
    this.ItemDataList = t;
    var s = new Array();
    for (const a of this.ItemDataList) {
      var r = SelectablePropDataUtil_1.SelectablePropDataUtil.GetSelectablePropData(a);
      var h = this.cBt(r);
      r.SelectedCount = h;
      r.OnlyGold = this.OnlyGold;
      s.push(r);
    }
    this.LoopScrollView.RefreshByData(s, i, e);
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
  CanAddMaterial(t, i = false) {
    var e;
    if (t.GetIsLock()) {
      if (i) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponLockTipsText");
      }
      return false;
    } else if (this.SelectableExpData?.IsInMax()) {
      if (i) {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponAddExpTipsText");
      }
      return false;
    } else {
      return (!(e = this.GetSelectedData(t))?.SelectedCount || e.SelectedCount !== t.Count) && !(!e && this.SelectedDataList.length >= this.MaxSize && !this.Data.IsSingleSelected ? (i && ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("WeaponFullMaterialText"), 1) : this.Data.CheckIfCanAddFunction && !this.Data.CheckIfCanAddFunction(this.SelectedDataList, t.IncId, t.ItemId, 1));
    }
  }
  fBt(t) {
    var i;
    return !!this.LastAddData && ((i = t.IncId) > 0 ? this.LastAddData.IncId === i : this.LastAddData.ItemId === t.ItemId);
  }
  GetLoopScrollViewIndex(e, s) {
    if (e > 0 || s > 0) {
      for (let t = 0, i = this.ItemDataList.length; t < i; ++t) {
        var r = this.ItemDataList[t];
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
  DeleteLastData(t) {
    if (!this.fBt(t)) {
      this.CBt(this.LastAddData);
    }
  }
  CBt(t) {
    var i;
    if (t) {
      if ((i = t.IncId) > 0) {
        this.RemoveSelectedDataByIncId(i);
      } else {
        this.MBt(t.ItemId);
      }
    }
  }
  RemoveSelectedDataByIncId(i) {
    for (let t = 0; t < this.SelectedDataList.length; t++) {
      var e = this.SelectedDataList[t];
      if (e.IncId === i) {
        e.SelectedCount = 0;
        this.SelectedDataList.splice(t, 1);
        return;
      }
    }
  }
  MBt(i) {
    for (let t = 0; t < this.SelectedDataList.length; t++) {
      var e = this.SelectedDataList[t];
      if (e.ItemId === i) {
        e.SelectedCount = 0;
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
    var i = this.GetSelectedData(t);
    if (i) {
      this.EBt(i);
    } else {
      this.SelectedDataList.push(t);
      t.SelectedCount++;
    }
    if (this.Data.OtherFunction) {
      this.Data.OtherFunction();
    }
  }
  EBt(i) {
    var e = this.SelectedDataList.length;
    for (let t = 0; t < e; t++) {
      var s = this.SelectedDataList[t];
      if (s.IncId === 0 && s.ItemId === i.ItemId) {
        s.SelectedCount = s.SelectedCount + 1;
        return;
      }
    }
    this.SelectedDataList.push(i);
  }
  GetSelectedData(t) {
    if (t) {
      var i = t.IncId;
      if (i > 0) {
        for (const t of this.SelectedDataList) {
          if (t.IncId === i) {
            return t;
          }
        }
      } else {
        var e = t.ItemId;
        if (e > 0) {
          for (const t of this.SelectedDataList) {
            if (t.ItemId === e) {
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
      for (const i of this.SelectedDataList) {
        t += this.ExpData.GetItemExpFunction(i) * i.SelectedCount;
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