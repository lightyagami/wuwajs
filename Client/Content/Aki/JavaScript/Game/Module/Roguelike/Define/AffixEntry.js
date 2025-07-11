"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AffixEntry = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RoguelikeDefine_1 = require("./RoguelikeDefine");
class AffixEntry {
  constructor(e) {
    this.Id = e.s5n ?? undefined;
    this.IsUnlock = e.K6n ?? undefined;
    this.ElementDict = new Map();
    for (const n of Object.keys(e.x2s ?? {})) {
      var r = e.x2s[n] ?? 0;
      if (r) {
        this.ElementDict.set(Number(n), r);
      }
    }
  }
  GetSortElementInfoArrayByCount(e = false) {
    var r;
    var n;
    var o = new Array();
    for ([r, n] of this.ElementDict) {
      if (!e || r !== 9) {
        o.push(new RoguelikeDefine_1.ElementInfo(r, n));
      }
    }
    o.sort((e, r) => r.Count - e.Count);
    return o;
  }
  GetAffixDesc() {
    var e = ConfigManager_1.ConfigManager.RoguelikeConfig?.GetRogueAffixConfig(this.Id);
    if (ModelManager_1.ModelManager.RoguelikeModel?.GetDescModel() === 0) {
      return e?.AffixDescSimple ?? "";
    } else {
      return e?.AffixDesc ?? "";
    }
  }
}
exports.AffixEntry = AffixEntry;
//# sourceMappingURL=AffixEntry.js.map