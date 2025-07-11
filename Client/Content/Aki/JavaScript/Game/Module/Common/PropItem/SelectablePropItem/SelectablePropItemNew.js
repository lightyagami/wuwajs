"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectablePropItemNew = undefined;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const LongPressButtonItem_1 = require("../../Button/LongPressButtonItem");
const SelectablePropItemBase_1 = require("./SelectablePropItemBase");
class SelectablePropItemNew extends SelectablePropItemBase_1.SelectablePropItemBase {
  constructor() {
    super(...arguments);
    this.ShowItemTipsFunction = undefined;
    this.AddFunction = undefined;
    this.ReduceFunction = undefined;
    this.GetSelectedNumber = undefined;
    this.GetSelectedSpriteActive = undefined;
    this.GetGraySpriteActive = undefined;
    this.PromptFunction = undefined;
    this.CheckEnableFunction = undefined;
    this.HideSelectNumberStateFunction = undefined;
    this.GBt = true;
    this.IsSelectableProp = true;
    this.$Bt = undefined;
    this.YBt = undefined;
    this.JBt = false;
    this.kBt = () => {
      var t;
      if (this.JBt && this.GetSelectedNumber?.(this.PropData) === 1) {
        return this.jBt();
      }
      if (this.PromptFunction) {
        this.PromptFunction(this.PropData, this.GridIndex);
      }
      return !!this.AddFunction && ((t = this.AddFunction(this.PropData, this.GridIndex)) && this.WBt(), this.ScrollViewDelegate && this.ScrollViewDelegate.SelectGridProxy(this.GridIndex, this.DisplayIndex, false), t);
    };
    this.jBt = () => {
      var t;
      return !!this.ReduceFunction && ((t = this.ReduceFunction(this.PropData, this.GridIndex)) && (this.WBt(), this.KBt()), this.ScrollViewDelegate && this.ScrollViewDelegate.SelectGridProxy(this.GridIndex, this.DisplayIndex, false), t);
    };
    this.FBt = t => {
      if (LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0).inputType === 1 && (this.ShowItemTipsFunction?.(this.PropData, this.GridIndex), this.ScrollViewDelegate)) {
        this.ScrollViewDelegate.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
      }
    };
    this.Lke = () => {
      var t;
      var i;
      return !!this.GetSelectableToggle() && !(t = this.GetSelectableToggle().GetToggleState(), (i = this.GetSelectedNumber?.(this.PropData) ?? 0) > 0 && t === 1) && (!(i <= 0) || t !== 0);
    };
  }
  OnStart() {
    var t;
    this.GetControlItem()?.SetUIActive(false);
    if (this.GetSelectableToggle()) {
      (t = this.GetSelectableToggle()).OnPointEnterCallBack.Bind(this.FBt);
      t.CanExecuteChange.Bind(this.Lke);
    }
    if (this.GetReduceButton()) {
      this.GetReduceButton().RootUIComp.SetUIActive(this.GBt);
    }
    this.$Bt = new LongPressButtonItem_1.LongPressButtonItem(this.GetSelectableToggle(), 1, this.kBt);
    this.$Bt.SetTickConditionDelegate(() => !this.JBt);
    this.YBt = new LongPressButtonItem_1.LongPressButtonItem(this.GetReduceButton(), 1, this.jBt);
  }
  WBt() {
    var t;
    var i;
    if (this.HideSelectNumberStateFunction) {
      this.SetControllerState(this.HideSelectNumberStateFunction(this.PropData, this.GridIndex));
    } else {
      if ((this.GetSelectedNumber?.(this.PropData) ?? 0) > 0) {
        this.SetControllerState(true);
      } else {
        this.SetControllerState(false);
      }
      this.Oqe();
    }
    if (this.GetSelectNumberText()) {
      t = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this.PropData.IncId);
      if ((i = this.GetSelectedNumber?.(this.PropData) ?? 0) > 0 && StringUtils_1.StringUtils.IsEmpty(t?.GetDefaultDownText())) {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetSelectNumberText(), "RoleExp", i, this.PropData.Count);
      } else {
        this.ShowDefaultDownText();
      }
    }
  }
  SetControllerState(t) {
    var i = this.GetControlItem();
    var s = ModelManager_1.ModelManager.InventoryModel.GetItemDataBase(this.PropData)[0];
    if (s) {
      i?.SetUIActive(t);
      if (t) {
        t = s.GetMaxStackCount() === 1;
        this.GetFinishSelectItem()?.SetUIActive(t);
      }
    } else {
      i?.SetUIActive(false);
    }
  }
  Oqe() {
    if ((this.GetSelectedNumber?.(this.PropData) ?? 0) > 0) {
      this.EUt(1);
    } else {
      this.EUt(0);
    }
  }
  EUt(t) {
    if (this.GetSelectableToggle()) {
      this.GetSelectableToggle().SetToggleState(t);
    }
  }
  QBt() {
    this.WBt();
    this.GetSelectItem()?.SetUIActive(false);
  }
  KBt() {
    if ((this.GetSelectedNumber?.(this.PropData) ?? 0) <= 0) {
      this.EUt(0);
    }
  }
  OnBeforeDestroy() {
    this.GetSelectableToggle()?.CanExecuteChange.Unbind();
    this.YBt.Clear();
    this.$Bt.Clear();
  }
  OnRefresh(t, i) {
    this.WBt();
    this.Oqe();
    var s = this.GetSelectedSpriteActive?.(this.PropData, this.GridIndex) ?? false;
    this.GetSelectItem()?.SetUIActive(s);
  }
  OnSelected(t) {
    this.GetSelectItem()?.SetUIActive(true);
  }
  OnDeselected(t) {
    this.QBt();
  }
  Clear() {
    this.KBt();
    this.QBt();
  }
  SetShowItemTipsFunction(t) {
    this.ShowItemTipsFunction = t;
  }
  SetSelectMode(t) {
    this.JBt = t;
  }
  SetAddFunction(t) {
    this.AddFunction = t;
  }
  SetReduceFunction(t) {
    this.ReduceFunction = t;
  }
  SetSelectedNumber(t) {
    this.GetSelectedNumber = t;
  }
  SetSelectedSpriteActive(t) {
    this.GetSelectedSpriteActive = t;
  }
  SetGraySpriteActive(t) {
    this.GetGraySpriteActive = t;
  }
  SetReduceButtonActive(t) {
    this.GBt = t;
  }
  SetPromptFunction(t) {
    this.PromptFunction = t;
  }
  SetCheckEnableFunction(t) {
    this.CheckEnableFunction = t;
  }
  SetHideSelectNumberStateFunction(t) {
    this.HideSelectNumberStateFunction = t;
  }
}
exports.SelectablePropItemNew = SelectablePropItemNew;
//# sourceMappingURL=SelectablePropItemNew.js.map