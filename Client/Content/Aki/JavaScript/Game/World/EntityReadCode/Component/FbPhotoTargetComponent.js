"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPhotoTargetComponent = undefined;
const fb_var_1 = require("../../../../Game/World/EntityFb/fb-var");
const UnionPhotoTargetCaptureUiHelper_1 = require("../Common/UnionPhotoTargetCaptureUiHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPhotoTargetComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.B7h = false;
    this.q7h = undefined;
    this.k7h = false;
    this.G7h = undefined;
    this.O7h = false;
    this.F7h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbPhotoTargetComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get RequiredPoints() {
    if (!this.B7h) {
      this.B7h = true;
      this.q7h = new Array();
      var e = this.FbDataInternal.requiredPointsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.requiredPoints(t, new fb_var_1.VectorInfo());
          this.q7h.push(FbVectorInfo_1.FbVectorInfo.Create(i));
        }
      }
    }
    return this.q7h;
  }
  get TargetCapturePromptUi() {
    var t;
    var e;
    if (!this.k7h && (this.k7h = true, t = this.FbDataInternal.targetCapturePromptUiType(), e = UnionPhotoTargetCaptureUiHelper_1.UnionPhotoTargetCaptureUiHelper.GetUnionPhotoTargetCaptureUiObject(t))) {
      this.G7h = UnionPhotoTargetCaptureUiHelper_1.UnionPhotoTargetCaptureUiHelper.ReadUnionPhotoTargetCaptureUi(t, this.FbDataInternal.targetCapturePromptUi(e));
    }
    return this.G7h;
  }
  get RayCastIgnoreEntities() {
    if (!this.O7h) {
      this.O7h = true;
      this.F7h = new Array();
      var e = this.FbDataInternal.rayCastIgnoreEntitiesLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.F7h.push(this.FbDataInternal.rayCastIgnoreEntities(t));
        }
      }
    }
    return this.F7h;
  }
}
exports.FbPhotoTargetComponent = FbPhotoTargetComponent;
//# sourceMappingURL=FbPhotoTargetComponent.js.map