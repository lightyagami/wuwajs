"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagContainer = exports.channelDebugName = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../../Core/Common/Stats");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const StatDefine_1 = require("../../../../../Common/StatDefine");
exports.channelDebugName = {
  [1]: "Tag",
  2: "Buff",
  3: "关卡服务器",
  4: "动画",
  5: "玩家编队",
  6: "Frozen",
  7: "被动技能"
};
class TagContainer {
  constructor() {
    this.PQo = new Map();
    this.xQo = new Map();
    this.wQo = new Map();
    this.BQo = new Set();
    this.bQo = new Set();
    this.qQo = undefined;
  }
  GetAllExactTags() {
    return this.xQo.keys();
  }
  GetAllChannels() {
    return this.PQo.keys();
  }
  BindTsTagContainer(t) {
    if (this.qQo = t) {
      for (const e of this.xQo.keys()) {
        var a = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(e);
        if (a) {
          t.UpdateTagMap(a, this.xQo.get(e) ?? 0);
        }
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Character", 19, "绑定UE Actor并复制Tag", ["tags", this.xQo]);
      }
    }
  }
  Clear() {
    this.xQo.clear();
    this.PQo.clear();
    this.wQo.clear();
    this.BQo.clear();
    this.bQo.clear();
    return !(this.qQo = undefined);
  }
  ClearObject() {
    return this.Clear();
  }
  GQo(t, a) {
    TagContainer.P__.Start();
    if (!a) {
      TagContainer.P__.Stop();
      return [];
    }
    TagContainer.w__.Start();
    const e = this.xQo.get(t) ?? 0;
    const i = Math.max(0, e + a);
    a = i - e;
    if (e === i) {
      TagContainer.w__.Stop();
      TagContainer.P__.Stop();
      return [];
    }
    if (i <= 0) {
      this.xQo.delete(t);
    } else {
      this.xQo.set(t, i);
    }
    let r = GameplayTagUtils_1.GameplayTagUtils.GetParentTag(t);
    var n = [[t, i, e, true]];
    for (; r;) {
      const e = this.wQo.get(r) ?? 0;
      var s = this.xQo.get(r) ?? 0;
      const i = Math.max(0, e + a);
      if (i <= 0) {
        this.wQo.delete(r);
      } else {
        this.wQo.set(r, i);
      }
      n.push([r, i + s, e + s, false]);
      r = GameplayTagUtils_1.GameplayTagUtils.GetParentTag(r);
    }
    TagContainer.w__.Stop();
    TagContainer.U__.Start();
    t = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t);
    if (t) {
      this.qQo?.UpdateTagMap(t, a);
    }
    TagContainer.U__.Stop();
    TagContainer.P__.Stop();
    return n;
  }
  NQo(t) {
    if (t && !(t.length <= 0)) {
      TagContainer.D__.Start();
      for (var [a, e, i, r] of t) {
        if (r) {
          for (const n of this.bQo) {
            try {
              n(a, e, i);
            } catch (t) {
              if (t instanceof Error) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.ErrorWithStack("Character", 19, "执行Tag监听回调时出错", t, ["error", t.message]);
                }
              } else if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Character", 19, "执行Tag监听回调时出错", ["error", t]);
              }
            }
          }
        }
        for (const s of this.BQo) {
          try {
            s(a, e, i);
          } catch (t) {
            if (t instanceof Error) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.ErrorWithStack("Character", 19, "执行Tag监听回调时出错", t, ["error", t.message]);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 19, "执行Tag监听回调时出错", ["error", t]);
            }
          }
        }
      }
      TagContainer.D__.Stop();
    }
  }
  AddExactTag(t, a) {
    let e = this.PQo.get(t);
    if (!e) {
      this.PQo.set(t, e = new Map());
    }
    e.set(a, (e.get(a) ?? 0) + 1);
    t = this.GQo(a, 1);
    this.NQo(t);
  }
  RemoveTag(t, a) {
    var e = this.PQo.get(t);
    if (e) {
      const s = e.get(a) ?? 0;
      e.delete(a);
      var i = this.GQo(a, -s) ?? [];
      if (this.wQo.get(a) > 0) {
        var r = [];
        for (const o of e.keys()) {
          if (GameplayTagUtils_1.GameplayTagUtils.IsChildTag(o, a)) {
            r.push(o);
          }
        }
        for (const g of r) {
          const s = e.get(g) ?? 0;
          e.delete(g);
          var n = this.GQo(g, -s);
          if (n) {
            i.push(...n);
          }
        }
      }
      if (e.size === 0) {
        this.PQo.delete(t);
      }
      this.NQo(i);
    }
  }
  RemoveExactTag(a, e) {
    var i = this.PQo.get(a);
    if (i) {
      var r = i.get(e) ?? 0;
      let t = undefined;
      if (r > 0) {
        t = this.GQo(e, -r);
        i.delete(e);
      }
      if (i.size === 0) {
        this.PQo.delete(a);
      }
      this.NQo(t);
    }
  }
  UpdateExactTag(t, a, e) {
    TagContainer.B__.Start();
    let i = this.PQo.get(t);
    if (!i) {
      if (!(e > 0)) {
        TagContainer.B__.Stop();
        return;
      }
      this.PQo.set(t, i = new Map());
    }
    var r = i.get(a) ?? 0;
    var e = Math.max(0, r + e);
    if (e > 0) {
      i.set(a, e);
    } else {
      i.delete(a);
    }
    var a = this.GQo(a, e - r);
    if (i.size === 0) {
      this.PQo.delete(t);
    }
    this.NQo(a);
    TagContainer.B__.Stop();
  }
  ContainsTag(t) {
    return this.xQo.has(t) || this.wQo.has(t);
  }
  ContainsExactTag(t) {
    return this.xQo.has(t);
  }
  GetRawTagCount(t, a) {
    return this.PQo.get(t)?.get(a) ?? 0;
  }
  GetTagCount(t) {
    return (this.xQo.get(t) ?? 0) + (this.wQo.get(t) ?? 0);
  }
  GetExactTagCount(t) {
    return this.xQo.get(t) ?? 0;
  }
  AddAnyTagListener(t) {
    this.BQo.add(t);
  }
  RemoveAnyTagListener(t) {
    this.BQo.delete(t);
  }
  AddAnyExactTagListener(t) {
    this.bQo.add(t);
  }
  RemoveExactAnyTagListener(t) {
    this.bQo.delete(t);
  }
  GetDebugString() {
    var t = "汇总tag:\n";
    return t + this.GetExactTagsDebugString() + "\n\n父tag:\n" + [...this.wQo.entries()].map(([t, a]) => `${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)} * ${a}
`).sort((t, a) => t.localeCompare(a)).join("");
  }
  GetExactTagsDebugString() {
    return [...this.xQo.entries()].map(([t, a]) => {
      let e = `${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)} x ${a}(`;
      for (const r of this.PQo.keys()) {
        var i = this.PQo.get(r)?.get(t);
        if (i) {
          e += exports.channelDebugName[r] + " x " + i;
        }
      }
      return e + ")\n";
    }).sort((t, a) => t.localeCompare(a)).join("");
  }
}
(exports.TagContainer = TagContainer).P__ = Stats_1.Stat.Create("TagContainer.ModifyTagInner", StatDefine_1.BATTLESTAT_GROUP);
TagContainer.w__ = Stats_1.Stat.Create("TagContainer.ModifyTagInner.ModifyCount", StatDefine_1.BATTLESTAT_GROUP);
TagContainer.U__ = Stats_1.Stat.Create("TagContainer.ModifyTagInner.UpdateUe", StatDefine_1.BATTLESTAT_GROUP);
TagContainer.D__ = Stats_1.Stat.Create("TagContainer.InvokeEvents", StatDefine_1.BATTLESTAT_GROUP);
TagContainer.B__ = Stats_1.Stat.Create("TagContainer.UpdateExactTag", StatDefine_1.BATTLESTAT_GROUP); //# sourceMappingURL=CharacterTagContainer.js.map