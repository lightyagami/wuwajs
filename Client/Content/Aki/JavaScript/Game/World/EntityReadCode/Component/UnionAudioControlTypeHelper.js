"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionAudioControlTypeHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbGramophoneAudioControl_1 = require("./FbGramophoneAudioControl");
class UnionAudioControlTypeHelper {
  static GetUnionAudioControlTypeObject(o) {
    if (o === fb_component_1.UnionAudioControlType.GramophoneAudioControl) {
      return new fb_component_1.GramophoneAudioControl();
    }
  }
  static ReadUnionAudioControlType(o, e) {
    if (e !== undefined && o === fb_component_1.UnionAudioControlType.GramophoneAudioControl) {
      return FbGramophoneAudioControl_1.FbGramophoneAudioControl.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionAudioControlTypeHelper = UnionAudioControlTypeHelper;
//# sourceMappingURL=UnionAudioControlTypeHelper.js.map