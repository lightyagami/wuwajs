"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EyeProtectSliderItem = exports.EyeProtectItem = undefined;
const UE = require("ue");
const GameSettingsDefine_1 = require("../../../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../../../GameSettings/GameSettingsManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../../Util/ScrollView/GenericScrollViewNew");
const MenuTool_1 = require("../../MenuTool");
class EyeProtectItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.SelectCallback = undefined;
    this.CanExecuteChange = undefined;
    this.ScrollView = undefined;
    this.uWt = () => {
      this.SelectCallback?.(this.GridIndex);
    };
    this.$6d = () => new EyeProtectSliderItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIScrollViewWithScrollbarComponent], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem]];
    this.BtnBindInfo = [[0, this.uWt]];
  }
  SetSelected(t) {
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0);
    this.GetItem(3).SetUIActive(t);
  }
  Refresh(t, e, i) {
    this.Data = t;
    this.InitData();
    if (e) {
      this.OnSelected(false);
    } else {
      this.OnDeselected(false);
    }
  }
  InitData() {
    var t;
    if (this.Data) {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), this.Data.GetModeName());
      if (this.Data.IsCustom()) {
        this.GetItem(6).SetUIActive(false);
        this.GetItem(8).SetUIActive(true);
      } else {
        this.GetItem(6).SetUIActive(true);
        this.GetItem(8).SetUIActive(false);
      }
      this.ScrollView = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(4), this.$6d);
      if (t = this.Data.GetViewModel().GetSliderDataList(this.Data.GetModeValue())) {
        this.ScrollView.RefreshByData(t);
      }
      this.OnApply(GameSettingsManager_1.GameSettingsManager.GetCurrentValueSafely(GameSettingsDefine_1.EFunction.EyeProtectionMode));
    }
  }
  OnSelected(t) {
    this.SetSelected(true);
  }
  OnDeselected(t) {
    this.SetSelected(false);
  }
  OnApply(t) {
    this.GetItem(7).SetUIActive(t === this.Data?.GetModeValue());
  }
}
exports.EyeProtectItem = EyeProtectItem;
class EyeProtectSliderItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.IsTemp = false;
    this.CHs = t => {
      var e;
      if (this.Data) {
        this.Data.OnChangeValue(t);
        t = MenuTool_1.FunctionItemViewTool.GetSliderDisplayValue(this.Data.MenuData, t);
        e = this.IsTemp ? "k" : "";
        this.GetText(0).SetText(t.toString() + e);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISliderComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem]];
  }
  OnStart() {
    this.GetSlider(1).OnValueChangeCb.Bind(this.CHs);
  }
  Refresh(t, e, i) {
    var s = this.GetSlider(1);
    s.SetMaxValue(t.MaxValue, true, false);
    s.SetMinValue(t.MinValue, true, false);
    s.SetValue(t.CurValue);
    this.IsTemp = t.FunctionId === GameSettingsDefine_1.EFunction.EyeProtectionTemp;
    this.AU(t);
    this.Data = t;
    var s = MenuTool_1.FunctionItemViewTool.GetSliderDisplayValue(t.MenuData, t.CurValue);
    var t = this.IsTemp ? "k" : "";
    this.GetText(0).SetText(s.toString() + t);
  }
  AU(t) {
    if (!this.Data) {
      LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(2), t.Title);
      if (this.IsTemp) {
        this.GetItem(3).SetUIActive(true);
        this.GetItem(4).SetUIActive(false);
      }
    }
  }
}
exports.EyeProtectSliderItem = EyeProtectSliderItem;
//# sourceMappingURL=EyeProtectItem.js.map