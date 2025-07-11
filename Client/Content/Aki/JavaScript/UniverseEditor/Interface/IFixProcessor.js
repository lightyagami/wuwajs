"use strict";

function newPerformanceSetting(e = {}) {
  return {
    Author: e.Author ?? "",
    Note: e.Note ?? "",
    EnableOptimize: e.EnableOptimize ?? true,
    RangeEntities: e.RangeEntities ?? [],
    Mode: e.Mode ?? {
      Type: 0
    }
  };
}
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newPerformanceSetting = undefined;
exports.newPerformanceSetting = newPerformanceSetting; //# sourceMappingURL=IFixProcessor.js.map