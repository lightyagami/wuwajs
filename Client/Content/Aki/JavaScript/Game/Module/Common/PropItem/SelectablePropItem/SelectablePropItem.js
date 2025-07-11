"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectablePropItem = undefined;
const TickSystem_1 = require("../../../../../Core/Tick/TickSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiEventSystemManager_1 = require("../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SelectablePropItemBase_1 = require("./SelectablePropItemBase");
const ONE_SECOND_TO_MILLISECOND = 1000;
class SelectablePropItem extends SelectablePropItemBase_1.SelectablePropItemBase {
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
    this.sKe = 0;
    this.wBt = false;
    this.BBt = false;
    this.e8 = 0;
    this.rut = 0;
    this.H5e = undefined;
    this.bBt = false;
    this.qBt = false;
    this.GBt = true;
    this.Mne = 1;
    this.Lo = undefined;
    this.IsSelectableProp = true;
    this.NBt = t => {
      this.wBt = true;
    };
    this.OBt = t => {
      if ((!this.CheckEnableFunction || !!this.CheckEnableFunction(this.PropData, this.GridIndex)) && !this.bBt) {
        this.kBt();
      }
      this.bBt = false;
      this.wBt = false;
    };
    this.FBt = t => {
      if (LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0).inputType === 1 && (this.ShowItemTipsFunction?.(this.PropData, this.GridIndex), this.ScrollViewDelegate)) {
        this.ScrollViewDelegate.SelectGridProxy(this.GridIndex, this.DisplayIndex, false);
      }
    };
    this.Lke = () => {
      var t = this.H5e.GetToggleState();
      var i = this.GetSelectedNumber?.(this.PropData) ?? 0;
      return (!(i > 0) || t !== 1) && (!(i <= 0) || t !== 0);
    };
    this.VBt = () => {
      this.BBt = true;
    };
    this.HBt = () => {
      if (this.CheckEnableFunction && !this.CheckEnableFunction(this.PropData, this.GridIndex)) {
        this.bBt = false;
        this.wBt = false;
      } else {
        if (!this.qBt) {
          this.jBt();
        }
        this.qBt = false;
        this.BBt = false;
      }
    };
    this.r6 = t => {
      this.LDe(t);
    };
  }
  SetPressConfig(t = 1) {
    this.Mne = t;
  }
  kBt() {
    var t;
    if (this.PromptFunction) {
      this.PromptFunction(this.PropData, this.GridIndex);
    }
    return !!this.AddFunction && ((t = this.AddFunction(this.PropData, this.GridIndex)) && this.WBt(), this.ScrollViewDelegate && this.ScrollViewDelegate.SelectGridProxy(this.GridIndex, this.DisplayIndex, false), t);
  }
  jBt() {
    var t;
    return !!this.ReduceFunction && ((t = this.ReduceFunction(this.PropData, this.GridIndex)) && (this.WBt(), this.KBt()), this.ScrollViewDelegate && this.ScrollViewDelegate.SelectGridProxy(this.GridIndex, this.DisplayIndex, false), t);
  }
  OnStart() {
    this.GetControlItem()?.SetUIActive(false);
    this.H5e = this.GetSelectableToggle();
    this.H5e.OnPointDownCallBack.Bind(this.NBt);
    this.H5e.OnPointUpCallBack.Bind(this.OBt);
    this.H5e.OnPointEnterCallBack.Bind(this.FBt);
    this.H5e.CanExecuteChange.Bind(this.Lke);
    var t = this.GetReduceButton();
    t.RootUIComp.SetUIActive(this.GBt);
    t.OnPointDownCallBack.Bind(this.VBt);
    t.OnPointUpCallBack.Bind(this.HBt);
    this.Lo = ConfigManager_1.ConfigManager.CommonConfig.GetLongPressConfig(this.Mne);
    this.sKe = TickSystem_1.TickSystem.Add(this.r6, "SelectablePropItem", 0, true, undefined, true).Id;
  }
  LDe(t) {
    if (this.wBt || this.BBt) {
      if (LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0).isDragging) {
        this.bBt = this.wBt;
        this.qBt = this.BBt;
        this.rut = 0;
        this.e8 = 0;
      } else {
        this.rut += t;
        if (!(this.rut < this.Lo.PressTime[0]) && !(this.e8 += t, t = this.dTt(), this.e8 < t)) {
          this.e8 -= t;
          this.oTt(false);
        }
      }
    } else {
      if (this.rut < this.Lo.PressTime[0] && this.rut > 0) {
        this.oTt(true);
      }
      this.rut = 0;
      this.e8 = 0;
    }
  }
  dTt() {
    var i = this.Lo.PressTime.length;
    for (let t = 1; t < i; ++t) {
      if (this.rut < this.Lo.PressTime[t]) {
        const s = this.Lo.TriggerTime[t - 1];
        return ONE_SECOND_TO_MILLISECOND / s;
      }
    }
    const s = this.Lo.TriggerTime[i - 1];
    return ONE_SECOND_TO_MILLISECOND / s;
  }
  oTt(t) {
    if (this.wBt) {
      this.bBt = true;
      this.wBt = this.kBt();
    }
    if (this.BBt) {
      this.qBt = true;
      this.BBt = this.jBt();
    }
  }
  WBt() {
    var t;
    if (this.HideSelectNumberStateFunction) {
      this.SetControllerState(this.HideSelectNumberStateFunction(this.PropData, this.GridIndex));
    } else if ((t = this.GetSelectedNumber?.(this.PropData) ?? 0) > 0) {
      this.SetControllerState(true);
      if (this.GetSelectNumberText()) {
        LguiUtil_1.LguiUtil.SetLocalText(this.GetSelectNumberText(), "RoleExp", t, this.PropData.Count);
      }
    } else {
      this.SetControllerState(false);
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
    this.H5e.SetToggleState(t);
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
    var t = this.GetSelectableToggle();
    t?.OnPointDownCallBack.Unbind();
    t?.OnPointUpCallBack.Unbind();
    t?.CanExecuteChange.Unbind();
    var t = this.GetReduceButton();
    t?.OnPointDownCallBack.Unbind();
    t?.OnPointUpCallBack.Unbind();
    if (this.sKe !== TickSystem_1.TickSystem.InvalidId) {
      TickSystem_1.TickSystem.Remove(this.sKe);
      this.sKe = TickSystem_1.TickSystem.InvalidId;
    }
  }
  OnRefresh(t, i) {
    this.WBt();
    this.Oqe();
    var s = this.GetSelectedSpriteActive?.(this.PropData, this.GridIndex) ?? false;
    this.GetSelectItem()?.SetUIActive(s);
    var s = this.GetGraySpriteActive?.(this.PropData, this.GridIndex) ?? false;
    if (this.GetItem(16)) {
      this.GetItem(16).SetUIActive(s);
    }
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
exports.SelectablePropItem = SelectablePropItem;
//# sourceMappingURL=SelectablePropItem.js.map