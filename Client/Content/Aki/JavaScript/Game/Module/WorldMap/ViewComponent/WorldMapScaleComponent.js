"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldMapScaleComponent = undefined;
const UE = require("ue");
const MathCommon_1 = require("../../../../Core/Utils/Math/MathCommon");
const ModelManager_1 = require("../../../Manager/ModelManager");
const MapComponent_1 = require("../../Map/Base/MapComponent");
class WorldMapScaleComponent extends MapComponent_1.MapComponent {
  constructor() {
    super(...arguments);
    this.VYa = undefined;
    this.HYa = undefined;
    this.OnScaleSliderValueChanged = e => {
      this.SetMapScale(e, 3, true, false);
    };
    this.AddMapScale = (e, t) => {
      this.SetMapScale(this.MapScale + e, t);
    };
  }
  get ComponentType() {
    return 4;
  }
  get MapScale() {
    return this.PropertyMap.tryGet(0, 0, false);
  }
  set MapScale(e) {
    this.PropertyMap.set(0, e);
  }
  get IsScaleDirty() {
    return this.PropertyMap.isDirty(0);
  }
  FlushScaleDirty() {
    this.PropertyMap.cleanDirty(0);
  }
  get NYa() {
    var e = this.Parent;
    if (e !== undefined) {
      return e;
    }
    this.LogError(63, "[地图系统]->二级界面组件没有附加到容器下！");
  }
  get ScaleChangeEvent() {
    return this.VYa;
  }
  set ScaleChangeEvent(e) {
    this.VYa = e;
  }
  get ScaleSlider() {
    return this.HYa;
  }
  set ScaleSlider(e) {
    this.HYa = e;
  }
  Initialize() {
    this.ScaleSlider.OnValueChangeCb.Unbind();
    this.ScaleSlider.OnValueChangeCb.Bind(this.OnScaleSliderValueChanged);
    this.SetMapScale(ModelManager_1.ModelManager.WorldMapModel.MapScale, 0);
    this.ScaleSlider.SetMinValue(ModelManager_1.ModelManager.WorldMapModel.MapScaleMin, false, false);
    this.ScaleSlider.SetMaxValue(ModelManager_1.ModelManager.WorldMapModel.MapScaleMax, false, false);
    this.ScaleSlider.SetValue(this.MapScale, false);
  }
  SetMapScale(e, t, a = true, i = true) {
    var s = this.MapScale;
    var e = MathCommon_1.MathCommon.Clamp(e, ModelManager_1.ModelManager.WorldMapModel.MapScaleMin, ModelManager_1.ModelManager.WorldMapModel.MapScaleMax);
    this.MapScale = e;
    ModelManager_1.ModelManager.WorldMapModel.MapScale = e;
    var r = this.NYa.Map;
    r.SetMapScale(e);
    r.SelfPlayerNode.D_SetRelativeScale3D(new UE.VectorDouble(1 / e, 1 / e, 1 / e));
    if (i) {
      this.ScaleSlider.SetValue(e, false);
    }
    if (a) {
      this.ScaleChangeEvent?.(s, e, t);
    }
  }
}
exports.WorldMapScaleComponent = WorldMapScaleComponent;
//# sourceMappingURL=WorldMapScaleComponent.js.map