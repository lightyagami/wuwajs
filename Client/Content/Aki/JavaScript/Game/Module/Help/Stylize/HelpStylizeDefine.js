"use strict";

var EHelpStylizeType;
function createDefaultRecord(t) {
  const p = {};
  Object.values(EHelpStylizeType).forEach(e => {
    p[e] = t;
  });
  return p;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.helpStylizeType2PopFrameType = exports.helpPopUpViewStylizeMap = exports.EHelpStylizeType = undefined;
(function (e) {
  e[e.None = 0] = "None";
  e[e.FloroRanch = 1] = "FloroRanch";
})(EHelpStylizeType = exports.EHelpStylizeType ||= {});
const defaultPopFrameTypeMap = createDefaultRecord(undefined);
const defaultStylizeMap = createDefaultRecord("HelpView");
exports.helpPopUpViewStylizeMap = {
  ...defaultStylizeMap,
  [EHelpStylizeType.FloroRanch]: "FloroRanchHelpView"
};
exports.helpStylizeType2PopFrameType = {
  ...defaultPopFrameTypeMap
}; //# sourceMappingURL=HelpStylizeDefine.js.map