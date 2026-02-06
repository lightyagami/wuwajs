"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposePopupModel = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Queue_1 = require("../../../../../Core/Container/Queue");
const ModelBase_1 = require("../../../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ItemDefines_1 = require("../../../Item/Data/ItemDefines");
const ComposeDefine_1 = require("../ComposeDefine");
class ComposePopupModel extends ModelBase_1.ModelBase {
  GetComposeMaterialList(e) {
    e = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByItemId(e);
    if (e) {
      var t = new Array();
      for (const r of e.ConsumeItems) {
        t.push({
          ItemId: r.ItemId,
          RequiredNum: r.Count
        });
      }
      return t;
    }
  }
  GetMaxCreateCountNormal(e, t) {
    var r = this.GetComposeMaterialList(e);
    var e = t ? this.GetMaxGiftExchangeCount(e) : 0;
    if (!r) {
      return e;
    }
    let a = Number.MAX_VALUE;
    for (const i of r) {
      let e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i.ItemId);
      if (t) {
        e += this.GetMaxGiftExchangeCount(i.ItemId);
      }
      var o = Math.floor(e / i.RequiredNum);
      a = Math.min(a, o);
    }
    if (a === Number.MAX_VALUE) {
      return e;
    } else {
      return a + e;
    }
  }
  CalcMaterialListNormal(e, t, r) {
    var a = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByItemId(e);
    if (a) {
      if (t <= 0) {
        return [];
      }
      var o = [];
      var i = this.GetMaxCreateCountNormal(e, false);
      var [n, s] = this.fTf(e, r = t <= i ? false : r, t, i);
      if (n <= 0) {
        return this.ugm(s);
      }
      for (const u of a.ConsumeItems) {
        let e = u.Count * n;
        var f = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(u.ItemId);
        if (f > 0) {
          f = Math.min(f, e);
          o.push({
            ItemId: u.ItemId,
            RequiredNum: f
          });
          e -= f;
        }
        if (r && e > 0 && (f = this.CalcGiftExchangeList(u.ItemId, e))) {
          s.push(...f);
          e = 0;
        }
        if (e > 0) {
          return;
        }
      }
      return this.ugm([...o, ...s]);
    }
  }
  GetComposeMaterialListPurification(e) {
    e = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByItemId(e);
    if (e) {
      var t = new Array();
      const o = new Queue_1.Queue();
      const i = new Set();
      for (e?.ConsumeItems.forEach(e => {
        o.Push({
          ItemId: e.ItemId,
          RequiredNum: e.Count
        });
        i.add(e.ItemId);
      }); o.Size > 0;) {
        var r = o.Pop();
        t.push(r);
        var a = ConfigManager_1.ConfigManager.ComposeConfig?.GetSynthesisFormulaByItemId(r.ItemId);
        if (a) {
          for (const n of a.ConsumeItems) {
            const e = n.ItemId;
            if (i.has(e)) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Compose", 90, "[ComposePopupModel] 检测到配方合成链条上存在重复的itemId: " + e);
              }
              break;
            }
            i.add(e);
            o.Push({
              ItemId: e,
              RequiredNum: n.Count * r.RequiredNum
            });
          }
        }
      }
      return t;
    }
  }
  GetLowestLevelExchangeMap(t) {
    var r = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByItemId(t);
    if (r) {
      var a = new Map();
      let e = undefined;
      var o = new Queue_1.Queue();
      const u = r.ConsumeItems[0];
      if (u) {
        o.Push(u.ItemId);
        a.set(u.ItemId, [t, u.Count]);
        e = u.ItemId;
        while (o.Size > 0) {
          var i = o.Pop();
          var n = ConfigManager_1.ConfigManager.ComposeConfig?.GetSynthesisFormulaByItemId(i);
          if (n) {
            const u = n.ConsumeItems[0];
            if (u) {
              if (a.has(u.ItemId)) {
                if (Log_1.Log.CheckError()) {
                  Log_1.Log.Error("Compose", 90, "[ComposePopupModel] 检测到配方合成链条上存在重复的itemId: " + u.ItemId);
                }
              } else {
                o.Push(u.ItemId);
                a.set(u.ItemId, [i, u.Count]);
                e = u.ItemId;
              }
            }
          }
        }
        var s = new Map();
        for (s.set(e, 1); a.has(e);) {
          var f = a.get(e);
          s.set(f[0], s.get(e) * f[1]);
          e = f[0];
        }
        return s;
      }
    }
  }
  GetMaxCreateCountPurification(e, t) {
    var r = this.GetComposeMaterialListPurification(e);
    var a = t ? this.GetMaxGiftExchangeCount(e) : 0;
    if (!r) {
      return a;
    }
    var o = this.GetLowestLevelExchangeMap(e);
    let i = 0;
    for (const s of this.GetComposeMaterialListPurification(e)) {
      const e = s.ItemId;
      var n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
      i += n * o.get(e);
      if (t) {
        n = this.GetMaxGiftExchangeCount(e);
        i += n * o.get(e);
      }
    }
    return MathUtils_1.MathUtils.GetFloatPointFloor(i / o.get(e)) + a;
  }
  CalcMaterialListPurification(e, t, r) {
    if (!ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByItemId(e)) {
      if (r) {
        return this.CalcGiftExchangeList(e, t);
      } else {
        return undefined;
      }
    }
    var a = [];
    var o = this.GetMaxCreateCountPurification(e, false);
    var [t, i] = this.fTf(e, r = t <= o ? false : r, t, o);
    if (t <= 0) {
      return this.ugm(i);
    }
    var n = this.GetLowestLevelExchangeMap(e);
    let s = n.get(e) * t;
    for (const l of this.GetComposeMaterialListPurification(e)) {
      const e = l.ItemId;
      var f;
      var u = n.get(e);
      var M = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
      if (M > 0) {
        M = Math.min(M, MathUtils_1.MathUtils.GetFloatPointFloor(s / u));
        a.push({
          ItemId: e,
          RequiredNum: M
        });
        s -= M * u;
      }
      if (r && s > 0 && (M = this.GetMaxGiftExchangeCount(e)) > 0) {
        M = Math.min(M, MathUtils_1.MathUtils.GetFloatPointFloor(s / u));
        f = this.CalcGiftExchangeList(e, M);
        i.push(...f);
        s -= M * u;
      }
      if (s <= 0) {
        break;
      }
    }
    if (s > 0) {
      return undefined;
    } else {
      return this.ugm([...a, ...i]);
    }
  }
  fTf(e, t, r, a) {
    if (t && a < r) {
      t = this.GetMaxGiftExchangeCount(e);
      a = Math.min(t, r);
      t = this.CalcGiftExchangeList(e, a);
      if (a > 0 && t !== undefined) {
        return [r - a, t];
      }
    }
    return [r, []];
  }
  GetExchangeItemData(t, r) {
    var a = ConfigManager_1.ConfigManager.ComposeConfig.GetExchangeList();
    if (a) {
      let e = undefined;
      for (const o of a) {
        if (o.ItemId === t) {
          e = o;
          break;
        }
      }
      if (e) {
        a = ModelManager_1.ModelManager.ComposeModel.GetExchangeMaterialListByGroupId(e.GroupId).filter(e => e.L8n !== t);
        if (a && a.length !== 0) {
          a.sort((e, t) => e.UVn !== t.UVn ? t.UVn - e.UVn : e.L8n - t.L8n);
          a = a[0];
          if (!(a.UVn < r * ComposeDefine_1.EXCHANGE_COUNT)) {
            return {
              ItemId: a.L8n,
              IncId: 0,
              Count: r * ComposeDefine_1.EXCHANGE_COUNT,
              SelectedCount: a.UVn
            };
          }
        }
      }
    }
  }
  GetMaxGiftExchangeCount(e) {
    let t = 0;
    for (const o of ConfigManager_1.ConfigManager.ItemAccessedFromGiftPathConfig.GetGiftItemGroupById(e, true)) {
      var r;
      var a = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o);
      if (!(a <= 0)) {
        r = this.GetGiftInnerCount(o, e);
        t += r * a;
      }
    }
    return t;
  }
  CalcGiftExchangeList(e, t, r) {
    var a = this.GetMaxGiftExchangeCount(e);
    if (!(a < t)) {
      var o = [];
      var a = ConfigManager_1.ConfigManager.ItemAccessedFromGiftPathConfig.GetGiftItemGroupById(e, true);
      if (r !== undefined) {
        a.sort((e, t) => {
          e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
          t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(t);
          if (r) {
            return e.QualityId - t.QualityId;
          } else {
            return t.QualityId - e.QualityId;
          }
        });
      }
      for (const f of a) {
        var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(f);
        if (!(i <= 0)) {
          var n = this.GetGiftInnerCount(f, e);
          var s = Math.ceil(t / n);
          var s = Math.min(s, i);
          o.push({
            ItemId: f,
            RequiredNum: s
          });
          if ((t -= s * n) <= 0) {
            return o;
          }
        }
      }
      return o;
    }
  }
  GetGiftInnerCount(e, t) {
    e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e).Parameters;
    return ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(e.values().next().value)?.Content.get(t) ?? 0;
  }
  GetMaxCreateCount(e, t) {
    var r = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByItemId(e);
    if (r) {
      if (r.FormulaType === 3) {
        return this.GetMaxCreateCountPurification(e, t);
      } else {
        return this.GetMaxCreateCountNormal(e, t);
      }
    } else if (t) {
      return this.GetMaxGiftExchangeCount(e);
    } else {
      return 0;
    }
  }
  CalcComposeList(e, t, r) {
    var a = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByItemId(e);
    if (a) {
      if (a.FormulaType === 3) {
        return this.CalcMaterialListPurification(e, t, r);
      } else {
        return this.CalcMaterialListNormal(e, t, r);
      }
    } else if (r) {
      return this.CalcGiftExchangeList(e, t);
    } else {
      return undefined;
    }
  }
  CalcComposeListAll(e, t) {
    var r = [];
    for (const o of e) {
      if (o.Count - o.SelectedCount <= 0) {
        r.push({
          Item: o,
          State: 2
        });
      } else {
        var a = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByItemId(o.ItemId);
        let e = undefined;
        e = a ? this.dgm(o, t) : this.mgm(o, t);
        r.push(e);
      }
    }
    return r;
  }
  dgm(e, t) {
    var r = e.Count - e.SelectedCount;
    if (t) {
      const a = this.CalcComposeList(e.ItemId, r, true);
      if (a && a.length > 0) {
        return {
          Item: e,
          State: 0,
          ComposeList: this.ConvertToSelectedData(a)
        };
      }
    }
    const a = this.CalcComposeList(e.ItemId, r, false);
    if (a && a.length > 0) {
      return {
        Item: e,
        State: 0,
        ComposeList: this.ConvertToSelectedData(a)
      };
    } else if (t = this.GetExchangeItemData(e.ItemId, r)) {
      return {
        Item: e,
        State: 1,
        ComposeList: [t]
      };
    } else {
      return {
        Item: e,
        State: 3
      };
    }
  }
  mgm(t, e) {
    var r = t.Count - t.SelectedCount;
    if (e) {
      let e = undefined;
      if ((e = t.ItemId === ItemDefines_1.EItemId.Gold ? this.CalcGiftExchangeList(t.ItemId, r, true) : this.CalcGiftExchangeList(t.ItemId, r)) && e.length > 0) {
        return {
          Item: t,
          State: 0,
          ComposeList: this.ConvertToSelectedData(e)
        };
      }
    }
    e = this.GetExchangeItemData(t.ItemId, r);
    if (e) {
      return {
        Item: t,
        State: 1,
        ComposeList: [e]
      };
    } else {
      return {
        Item: t,
        State: 3
      };
    }
  }
  CheckComposeResult(e, t, r = false) {
    e = this.CalcComposeListAll(e, t);
    let a = true;
    let o = false;
    const i = new Map();
    for (const u of e) {
      switch (u.State) {
        case 0:
          o = true;
          break;
        case 1:
          o = true;
          a = false;
          break;
        case 3:
          a = false;
          break;
        case 2:
          if (!r) {
            o = true;
          }
      }
      u.ComposeList?.forEach(e => {
        var t = i.get(e.ItemId) ?? 0;
        i.set(e.ItemId, t + e.Count);
      });
    }
    let n = undefined;
    if (o) {
      let e = true;
      for (var [s, f] of i) {
        if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(s) < f) {
          e = false;
          break;
        }
      }
      n = e && a ? 0 : 1;
    } else {
      n = 2;
    }
    return {
      Result: n,
      GridDataList: e
    };
  }
  CheckOpenResult(e) {
    return this.CheckComposeResult(e, true, true).Result !== 2;
  }
  IsComposeGiftShouldShow(e) {
    for (const a of e) {
      var t = a.Count - a.SelectedCount;
      if (!(t <= 0)) {
        var r = this.GetMaxCreateCount(a.ItemId, false) >= t;
        var t = this.GetMaxCreateCount(a.ItemId, true) >= t;
        if (!r && t) {
          return true;
        }
      }
    }
    return false;
  }
  ugm(e) {
    var t = new Map();
    var r = [];
    for (const o of e) {
      var a = t.get(o.ItemId);
      if (a) {
        a.RequiredNum += o.RequiredNum;
      } else {
        t.set(o.ItemId, o);
        r.push(o);
      }
    }
    return r;
  }
  MergeDuplicateSelectedData(e) {
    var t = new Map();
    var r = [];
    for (const o of e) {
      var a = t.get(o.ItemId);
      if (a) {
        a.Count += o.Count;
      } else {
        t.set(o.ItemId, o);
        r.push(o);
      }
    }
    return r;
  }
  ConvertToSelectedData(e) {
    return e.map(e => ({
      ItemId: e.ItemId,
      IncId: 0,
      Count: e.RequiredNum,
      SelectedCount: ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.ItemId)
    }));
  }
}
exports.ComposePopupModel = ComposePopupModel;
//# sourceMappingURL=ComposePopupModel.js.map