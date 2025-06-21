"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelConditionCheckGramophonePlayingMusic = void 0;
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckGramophonePlayingMusic extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r, n) {
    if (e) {
      var a = ModelManager_1.ModelManager.PhonographModel.GetRecordMusicId(e.TargetGramophone),
        o = e.CheckCondition;
      if (!o) return 0 !== a;
      switch (o.CheckType) {
        case 0:
          return 1 !== o.PlayList.length ? !1 : o.PlayList[0] === a;
        case 1:
          for (const s of o.PlayList)
            if (s === a) return !0;
          return !1;
        case 2:
          for (const t of o.PlayList)
            if (t === a) return !1;
          return !0
      }
    }
    return !1
  }
}
exports.LevelConditionCheckGramophonePlayingMusic = LevelConditionCheckGramophonePlayingMusic;
//# sourceMappingURL=LevelConditionCheckGramophonePlayingMusic.js.map