"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckGramophonePlayingMusic = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckGramophonePlayingMusic extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r, n) {
    if (e) {
      var a = ModelManager_1.ModelManager.PhonographModel.GetRecordMusicId(e.TargetGramophone);
      var o = e.CheckCondition;
      if (!o) {
        return a !== 0;
      }
      switch (o.CheckType) {
        case 0:
          if (o.PlayList.length !== 1) {
            return false;
          } else {
            return o.PlayList[0] === a;
          }
        case 1:
          for (const s of o.PlayList) {
            if (s === a) {
              return true;
            }
          }
          return false;
        case 2:
          for (const t of o.PlayList) {
            if (t === a) {
              return false;
            }
          }
          return true;
      }
    }
    return false;
  }
}
exports.LevelConditionCheckGramophonePlayingMusic = LevelConditionCheckGramophonePlayingMusic;
//# sourceMappingURL=LevelConditionCheckGramophonePlayingMusic.js.map