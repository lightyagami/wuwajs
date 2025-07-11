"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionTargetTagCheck = undefined;
const UE = require("ue");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionTargetTagCheck extends LevelGeneralBase_1.LevelConditionBase {
  Check(r, e) {
    if (r.LimitParams) {
      var t = r.LimitParams.get("CreatureGen");
      var a = r.LimitParams.get("Tag");
      var i = r.LimitParams.get("CheckTag");
      if (t && a && i) {
        var n = r.LimitParams.get("MatchAll");
        var r = r.LimitParams.get("Negative");
        var t = UE.KismetStringLibrary.Conv_StringToInt64(t);
        var l = new Array();
        ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(t, l);
        if (l.length) {
          var t = n && n === StringUtils_1.ONE_STRING;
          var o = r && r === StringUtils_1.ONE_STRING;
          let e = false;
          if (t) {
            for (const g of l) {
              var s = g.Entity.GetComponent(0);
              if (!s.ContainsTag(a)) {
                return e;
              }
              e = s.ContainsTag(i);
              if (o && e) {
                return false;
              }
              if (!e) {
                return e;
              }
            }
            return e;
          }
          for (const f of l) {
            var u = f.Entity.GetComponent(0);
            if (u.ContainsTag(a)) {
              e = u.ContainsTag(i);
              if (o && !e) {
                return true;
              }
              if (e) {
                return e;
              }
            }
          }
        }
      }
    }
    return false;
  }
}
exports.LevelConditionTargetTagCheck = LevelConditionTargetTagCheck;
//# sourceMappingURL=LevelConditionTargetTagCheck.js.map