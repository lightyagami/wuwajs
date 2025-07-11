"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiPopFrameViewStorage = undefined;
class UiPopFrameViewStorage {
  static RegisterUiBehaviourPop(e, o) {
    UiPopFrameViewStorage.igr.set(e, o);
  }
  static GetUiBehaviourPopInfo(e) {
    return UiPopFrameViewStorage.igr.get(e);
  }
}
(exports.UiPopFrameViewStorage = UiPopFrameViewStorage).igr = new Map();
//# sourceMappingURL=UiPopFrameViewStorage.js.map