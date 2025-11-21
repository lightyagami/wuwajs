"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScrollSettingSliderItem = undefined;
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LguiUtil_1 = require("../../Util/LguiUtil");
const MenuTool_1 = require("../MenuTool");
const MenuScrollSettingBaseItem_1 = require("./MenuScrollSettingBaseItem");
class MenuScrollSettingSliderItem extends MenuScrollSettingBaseItem_1.MenuScrollSettingBaseItem {
  constructor() {
    super(...arguments);
    this.ubi = 0;
    this.cbi = (t, i = true) => {
      if (this.GetItemClickLimit(this.GetSlider(1))) {
        this.mbi(this.ubi, i);
      } else {
        this.gbi(t, i);
      }
    };
    this.dbi = () => {
      if (!this.GetItemClickLimit(this.GetSlider(1))) {
        this.Cbi();
      }
    };
    this.mbi = (t, i = true) => {
      this.GetSlider(1).SetValue(t, i);
      this.gbi(t, i);
    };
    this.Cbi = () => {
      ModelManager_1.ModelManager.MenuModel.IsEdited = true;
      this.PlaySequenceByName("Flashing");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISliderComponent], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIText], [5, UE.UISprite]];
  }
  OnStart() {
    this.GetSlider(1).SetCanClickWhenDisable(true);
    this.fbi();
  }
  OnClear() {
    this.GetSlider(1).OnValueChangeCb?.Unbind();
    this.GetSlider(1).OnEndDragCb?.Unbind();
    this.Data &&= undefined;
  }
  Update(t, i) {
    this.Data = t;
    this.mGe();
    if (!i) {
      this.tOt();
    }
    this.sxi();
    this.cHa();
  }
  mGe() {
    this.GetText(0).ShowTextNew(this.Data.FunctionName ?? "");
  }
  tOt() {
    var t = this.Data.SliderRange;
    var i = t[0];
    var t = t[1];
    var e = ModelManager_1.ModelManager.MenuModel?.GetDataCacheOrCurValue(this.Data.FunctionId);
    var e = MathUtils_1.MathUtils.GetFloatPointFloor(e, this.Data.SliderDigits);
    var s = this.GetSlider(1);
    s.GetRootComponent()?.SetUIActive(true);
    s.SetMaxValue(t, true, false);
    s.SetMinValue(i, true, false);
    this.mbi(MathUtils_1.MathUtils.Clamp(e, i, t), false);
  }
  fbi() {
    this.GetSlider(1)?.OnValueChangeCb.Bind(this.cbi);
    this.GetSlider(1)?.OnEndDragCb.Bind(this.dbi);
  }
  gbi(t, i = true) {
    t = MenuTool_1.FunctionItemViewTool.GetSliderDisplayValue(this.Data, t);
    this.GetText(2).SetText(t.toString());
    if (i) {
      this.FireSaveMenuChange(t);
    }
  }
  SetInteractionActive(t) {
    this.GetSlider(1).SetSelfInteractive(t);
    if (!t) {
      this.ubi = this.GetSlider(1).GetValue();
    }
  }
  OnSetDetailVisible(t) {
    this.GetItem(3)?.SetUIActive(t);
  }
  sxi() {
    var t;
    var i;
    if (this.Data && this.Data.HasDetailText()) {
      t = this.GetText(4);
      i = this.Data.GetDetailTextId();
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, i);
    }
  }
  cHa() {
    if (this.Data) {
      this.GetSprite(5)?.SetUIActive(this.Data.HasDetailText());
    }
  }
}
exports.MenuScrollSettingSliderItem = MenuScrollSettingSliderItem;
//# sourceMappingURL=MenuScrollSettingSliderItem.js.map