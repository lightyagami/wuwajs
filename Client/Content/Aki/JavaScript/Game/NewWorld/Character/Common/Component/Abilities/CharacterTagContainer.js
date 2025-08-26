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
      for (const r of this.xQo.keys()) {
        var a = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(r);
        if (a) {
          t.UpdateTagMap(a, this.xQo.get(r) ?? 0);
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
    const r = this.xQo.get(t) ?? 0;
    const e = Math.max(0, r + a);
    a = e - r;
    if (r === e) {
      TagContainer.w__.Stop();
      TagContainer.P__.Stop();
      return [];
    }
    if (e <= 0) {
      this.xQo.delete(t);
    } else {
      this.xQo.set(t, e);
    }
    let n = GameplayTagUtils_1.GameplayTagUtils.GetParentTag(t);
    var i = [[t, e, r, true, t]];
    for (; n;) {
      const r = this.wQo.get(n) ?? 0;
      var s = this.xQo.get(n) ?? 0;
      const e = Math.max(0, r + a);
      if (e <= 0) {
        this.wQo.delete(n);
      } else {
        this.wQo.set(n, e);
      }
      i.push([n, e + s, r + s, false, t]);
      n = GameplayTagUtils_1.GameplayTagUtils.GetParentTag(n);
    }
    TagContainer.w__.Stop();
    TagContainer.U__.Start();
    var o = GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t);
    if (o) {
      this.qQo?.UpdateTagMap(o, a);
    }
    TagContainer.U__.Stop();
    TagContainer.P__.Stop();
    return i;
  }
  NQo(t) {
    if (t && !(t.length <= 0)) {
      TagContainer.D__.Start();
      for (var [a, r, e, n, i] of t) {
        if (n) {
          for (const s of this.bQo) {
            try {
              s(a, r, e, i);
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
        for (const o of this.BQo) {
          try {
            o(a, r, e, i);
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
    let r = this.PQo.get(t);
    if (!r) {
      this.PQo.set(t, r = new Map());
    }
    r.set(a, (r.get(a) ?? 0) + 1);
    t = this.GQo(a, 1);
    this.NQo(t);
  }
  RemoveTag(t, a) {
    var r = this.PQo.get(t);
    if (r) {
      const s = r.get(a) ?? 0;
      r.delete(a);
      var e = this.GQo(a, -s) ?? [];
      if (this.wQo.get(a) > 0) {
        var n = [];
        for (const o of r.keys()) {
          if (GameplayTagUtils_1.GameplayTagUtils.IsChildTag(o, a)) {
            n.push(o);
          }
        }
        for (const g of n) {
          const s = r.get(g) ?? 0;
          r.delete(g);
          var i = this.GQo(g, -s);
          if (i) {
            e.push(...i);
          }
        }
      }
      if (r.size === 0) {
        this.PQo.delete(t);
      }
      this.NQo(e);
    }
  }
  RemoveExactTag(a, r) {
    var e = this.PQo.get(a);
    if (e) {
      var n = e.get(r) ?? 0;
      let t = undefined;
      if (n > 0) {
        t = this.GQo(r, -n);
        e.delete(r);
      }
      if (e.size === 0) {
        this.PQo.delete(a);
      }
      this.NQo(t);
    }
  }
  UpdateExactTag(t, a, r) {
    TagContainer.B__.Start();
    let e = this.PQo.get(t);
    if (!e) {
      if (!(r > 0)) {
        TagContainer.B__.Stop();
        return;
      }
      this.PQo.set(t, e = new Map());
    }
    var n = e.get(a) ?? 0;
    var r = Math.max(0, n + r);
    if (r > 0) {
      e.set(a, r);
    } else {
      e.delete(a);
    }
    var a = this.GQo(a, r - n);
    if (e.size === 0) {
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
      let r = `${GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(t)} x ${a}(`;
      for (const n of this.PQo.keys()) {
        var e = this.PQo.get(n)?.get(t);
        if (e) {
          r += exports.channelDebugName[n] + " x " + e;
        }
      }
      return r + ")\n";
    }).sort((t, a) => t.localeCompare(a)).join("");
  }
  HasAnyTag(t) {
    for (const a of t.GetAllExactTags()) {
      if (this.ContainsTag(a)) {
        return true;
      }
    }
    return false;
  }
  HasAllTag(t) {
    for (const a of t.GetAllExactTags()) {
      if (!this.ContainsTag(a)) {
        return false;
      }
    }
    return true;
  }
  NotHasAnyTag(t) {
    for (const a of t.GetAllExactTags()) {
      if (!this.ContainsTag(a)) {
        return true;
      }
    }
    return false;
  }
  NotHasAllTag(t) {
    for (const a of t.GetAllExactTags()) {
      if (this.ContainsTag(a)) {
        return false;
      }
    }
    return true;
  }
}
(exports.TagContainer = TagContainer).P__ = Stats_1.Stat.Create("TagContainer.ModifyTagInner", StatDefine_1.BATTLESTAT_GROUP);
TagContainer.w__ = Stats_1.Stat.Create("TagContainer.ModifyTagInner.ModifyCount", StatDefine_1.BATTLESTAT_GROUP);
TagContainer.U__ = Stats_1.Stat.Create("TagContainer.ModifyTagInner.UpdateUe", StatDefine_1.BATTLESTAT_GROUP);
TagContainer.D__ = Stats_1.Stat.Create("TagContainer.InvokeEvents", StatDefine_1.BATTLESTAT_GROUP);
TagContainer.B__ = Stats_1.Stat.Create("TagContainer.UpdateExactTag", StatDefine_1.BATTLESTAT_GROUP); //# sourceMappingURL=CharacterTagContainer.js.map