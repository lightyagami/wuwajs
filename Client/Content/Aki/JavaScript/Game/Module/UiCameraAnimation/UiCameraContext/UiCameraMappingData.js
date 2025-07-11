"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiCameraMappingData = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiCameraAnimationManager_1 = require("../UiCameraAnimationManager");
class UiCameraMappingData {
  constructor(t, i) {
    this.WDe = t.ViewName;
    this.Lo = t;
    this.IsChildView = i;
  }
  GetUiCameraMappingConfig() {
    return this.Lo;
  }
  GetSourceHandleName() {
    var t;
    var i;
    var e;
    if (this.Lo) {
      i = this.Lo.BodyTargetType;
      t = this.Lo.DefaultUiCameraSettingsName;
      if (i === 0 || !(i = UiCameraAnimationManager_1.UiCameraAnimationManager.GetTargetBodyKey(i)) || !(e = this.Lo.BodyCameraSettingsNameMap) || (e = e.get(i), StringUtils_1.StringUtils.IsEmpty(e))) {
        return t;
      } else {
        return e;
      }
    }
  }
  CanPushCameraHandle() {
    var t;
    return !!this.Lo && (t = this.Lo.DefaultUiCameraSettingsName) !== "None" && !StringUtils_1.StringUtils.IsEmpty(t);
  }
  GetToBlendName(t) {
    var i = this.Lo.UiCameraBlendNameMap;
    if (!i || (i = i.get(t), StringUtils_1.StringUtils.IsEmpty(i))) {
      return this.Lo.DefaultCameraBlendName;
    } else {
      return i;
    }
  }
  GetUiCameraDelayTime() {
    return this.Lo.UiCameraDelayTime;
  }
  GetViewName() {
    return this.WDe;
  }
}
exports.UiCameraMappingData = UiCameraMappingData;
//# sourceMappingURL=UiCameraMappingData.js.map