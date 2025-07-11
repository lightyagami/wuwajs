"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueSelectResult = undefined;
class RogueSelectResult {
  constructor(t, e, s, i = false) {
    this.IsShowCommon = false;
    this.CallBack = undefined;
    this.NewRogueGainEntry = t;
    this.OldRogueGainEntry = e;
    this.SelectRogueGainEntry = s;
    this.IsShowCommon = i;
  }
  GetNewUnlockAffixEntry() {
    var e = new Set();
    var s = this.NewRogueGainEntry.AffixEntryList;
    var i = this.OldRogueGainEntry.AffixEntryList;
    for (let t = 0; t < s.length && t < i.length; t++) {
      var o = s[t];
      var r = i[t];
      if (o.IsUnlock && !r.IsUnlock) {
        e.add(o.Id);
      }
    }
    return e;
  }
}
exports.RogueSelectResult = RogueSelectResult;
//# sourceMappingURL=RogueSelectResult.js.map