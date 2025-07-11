"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ueArrayToArray = exports.ObjectUtils = undefined;
const Long = require("../Define/Net/long");
const FNameUtil_1 = require("./FNameUtil");
const GameplayTagUtils_1 = require("./GameplayTagUtils");
const MathUtils_1 = require("./MathUtils");
class ObjectUtils {
  static CopyValue(e, a) {
    Object.keys(e).forEach(t => {
      if (a[t] !== undefined) {
        a[t] = e[t];
      }
    });
  }
  static DeepCopyValue(e, a) {
    Object.keys(e).forEach(t => {
      if (e[t] instanceof Long) {
        if (a[t] !== undefined) {
          a[t] = MathUtils_1.MathUtils.LongToBigInt(e[t]);
        }
      } else if (typeof e[t] == "object") {
        ObjectUtils.DeepCopyValue(e[t], a[t]);
      } else if (a[t] !== undefined) {
        a[t] = e[t];
      }
    });
  }
  static SettingValue(t, e) {
    for (var [a, r] of t) {
      e[a] = r;
    }
  }
  static IsValid(t) {
    return t?.IsValid() ?? false;
  }
  static SoftObjectPathIsValid(t) {
    return !!t && !FNameUtil_1.FNameUtil.IsNothing(t.AssetPathName);
  }
  static SoftObjectReferenceValid(t) {
    return !!t && (t = t?.ToAssetPathName())?.length > 0 && t !== "None";
  }
  static GetGameplayTags(t) {
    var e = new Array();
    for (const r of t) {
      var a = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagByName(r);
      if (a) {
        e.push(a);
      }
    }
    return e;
  }
  static GetRandomArrayItem(e) {
    var a = e.length;
    if (a > 0) {
      let t = 0;
      if (a > 1 && (t = MathUtils_1.MathUtils.GetRandomRange(0, a), (t = Math.floor(t)) === a)) {
        --t;
      }
      return e[t];
    }
  }
}
function ueArrayToArray(e) {
  var a = e.Num();
  var r = [];
  for (let t = 0; t < a; t++) {
    r.push(e.Get(t));
  }
  return r;
}
exports.ObjectUtils = ObjectUtils;
exports.ueArrayToArray = ueArrayToArray; //# sourceMappingURL=ObjectUtils.js.map