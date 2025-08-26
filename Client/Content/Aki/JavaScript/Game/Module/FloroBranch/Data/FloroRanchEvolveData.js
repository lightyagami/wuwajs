"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchEvolveData = undefined;
class FloroRanchEvolveData {
  constructor(s) {
    this.CurExp = 0;
    this.CurLevel = 0;
    this.MaxLevel = 100;
    this.ExpPerLevel = 0;
    this.IsValid = false;
    this.CurExp = s.ILs;
    this.CurLevel = s.TLs;
    this.ExpPerLevel = s.tRu;
    this.IsValid = true;
  }
  Refresh(s) {
    if (s) {
      this.CurExp = s.ILs;
      this.CurLevel = s.TLs;
      this.ExpPerLevel = s.tRu;
      this.IsValid = true;
    } else {
      this.IsValid = false;
    }
  }
}
exports.FloroRanchEvolveData = FloroRanchEvolveData;
//# sourceMappingURL=FloroRanchEvolveData.js.map