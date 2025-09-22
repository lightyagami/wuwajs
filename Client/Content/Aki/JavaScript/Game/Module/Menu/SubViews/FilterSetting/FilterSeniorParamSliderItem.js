"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterSeniorParamSliderItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../../Util/LguiUtil");
class FilterSeniorParamSliderItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ParentViewModel = undefined;
    this.nqd = undefined;
    this.$tu = (t, i = 0) => {
      var t = MathUtils_1.MathUtils.RangeClamp(t, 0, 1, this.nqd.RangeMin, this.nqd.RangeMax);
      var e = t / this.nqd.Ratio;
      this.ParentViewModel?.OnSeniorSliderChanged?.(this.nqd.ParamIndex, e);
      this.GetText(0).SetText("" + Math.round(t) + this.nqd.Unit);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UISliderComponent], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [7, UE.UIText]];
  }
  OnStart() {
    this.GetSlider(1).OnValueChangeCb.Bind(this.$tu);
  }
  Refresh(t, i, e) {
    this.nqd = t;
    this.GetSprite(4)?.SetUIActive(t.IsNeedSpecialBg);
    this.GetSprite(3)?.SetUIActive(!t.IsNeedSpecialBg);
    this.GetItem(5)?.SetUIActive(!t.IsNeedSpecialBg);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.Name);
    var t = ModelManager_1.ModelManager.MenuModel.FilterSettingIdCache;
    var t = ModelManager_1.ModelManager.MenuModel.FilterSettingValuesCache.get(t);
    if (t) {
      t = t[this.nqd.ParamIndex];
      t = Math.round(t * this.nqd.Ratio);
      this.GetText(0).SetText("" + t + this.nqd.Unit);
      t = MathUtils_1.MathUtils.RangeClamp(t, this.nqd.RangeMin, this.nqd.RangeMax, 0, 1);
      this.GetSlider(1)?.SetValue(t, false);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("GameSettings", 71, "全局滤镜高级参数未找到默认值", ["param", this.nqd.ParamIndex]);
    }
  }
}
exports.FilterSeniorParamSliderItem = FilterSeniorParamSliderItem;
//# sourceMappingURL=FilterSeniorParamSliderItem.js.map