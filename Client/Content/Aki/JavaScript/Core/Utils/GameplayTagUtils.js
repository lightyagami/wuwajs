"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayTagUtils = undefined;
const UE = require("ue");
const GameplayTagDefine_1 = require("../../Game/Define/GameplayTagDefine");
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
class GameplayTagUtils {
  static GetTagIdByName(a) {
    GameplayTagUtils.MJ.Start();
    a = UE.GASBPLibrary.FnvHash(a);
    a = GameplayTagDefine_1.TagId2UglyTagIdMap.get(a) ?? a;
    GameplayTagUtils.MJ.Stop();
    return a;
  }
  static GetNameByTagId(a) {
    return GameplayTagUtils.GetGameplayTagById(a)?.OriginalTagName;
  }
  static GetGameplayTagByName(a) {
    a = GameplayTagUtils.GetTagIdByName(a);
    return GameplayTagUtils.GetGameplayTagById(a);
  }
  static GetGameplayTagById(a) {
    let t = this.qJ.get(a);
    if (!t) {
      t = UE.GASBPLibrary.GetGameplayTagFromTagHash(a);
      this.qJ.set(a, t);
    }
    if (t) {
      return t;
    }
    if (!GameplayTagUtils.GJ.has(a)) {
      GameplayTagUtils.GJ.add(a);
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Game", 36, "TagId对应的GameplayTag不存在，请检查GameplayTag设置", ["TagId", a]);
      }
    }
  }
  static GetParentTag(a) {
    return GameplayTagDefine_1.ParentTagIdMap.get(a);
  }
  static IsChildTag(a, t) {
    return a === t || (a = this.GetNameByTagId(a), t = this.GetNameByTagId(t), !!a && !!t && !(a.length <= t.length) && a.startsWith(t) && a[t.length] === ".");
  }
  static Contains(a, t) {
    if (a) {
      for (const e of a) {
        if (GameplayTagUtils.IsChildTag(t, e)) {
          return true;
        }
      }
    }
    return false;
  }
  static ContainsExact(a, t) {
    if (a) {
      for (const e of a) {
        if (e === t) {
          return true;
        }
      }
    }
    return false;
  }
  static HasAll(a, t) {
    if (t) {
      for (const e of t) {
        if (!this.Contains(a, e)) {
          return false;
        }
      }
    }
    return true;
  }
  static HasAny(a, t) {
    if (t) {
      for (const e of t) {
        if (this.Contains(a, e)) {
          return true;
        }
      }
    }
    return false;
  }
  static ConvertFromUeContainer(t) {
    if (!t) {
      return [];
    }
    var e = [];
    var i = t.GameplayTags.Num();
    for (let a = 0; a < i; a++) {
      e.push(t.GameplayTags.Get(a).TagId);
    }
    return e;
  }
}
(exports.GameplayTagUtils = GameplayTagUtils).GJ = new Set();
GameplayTagUtils.MJ = Stats_1.Stat.Create("GameplayTagUtils.FnvHash");
GameplayTagUtils.qJ = new Map(); //# sourceMappingURL=GameplayTagUtils.js.map