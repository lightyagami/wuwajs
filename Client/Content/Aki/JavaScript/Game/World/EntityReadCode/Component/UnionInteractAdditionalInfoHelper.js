"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionInteractAdditionalInfoHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbFishingPointAdditionalInfo_1 = require("./FbFishingPointAdditionalInfo");
class UnionInteractAdditionalInfoHelper {
  static GetUnionInteractAdditionalInfoObject(n) {
    if (n === fb_component_1.UnionInteractAdditionalInfo.FishingPointAdditionalInfo) {
      return new fb_component_1.FishingPointAdditionalInfo();
    }
  }
  static ReadUnionInteractAdditionalInfo(n, o) {
    if (o !== undefined && n === fb_component_1.UnionInteractAdditionalInfo.FishingPointAdditionalInfo) {
      return FbFishingPointAdditionalInfo_1.FbFishingPointAdditionalInfo.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionInteractAdditionalInfoHelper = UnionInteractAdditionalInfoHelper;
//# sourceMappingURL=UnionInteractAdditionalInfoHelper.js.map