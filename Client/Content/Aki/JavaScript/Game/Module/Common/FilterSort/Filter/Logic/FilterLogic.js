"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FilterLogic = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const FilterTypeFunctionLibrary_1 = require("./FilterTypeFunctionLibrary");
const CalabashCollectFilter_1 = require("./Rule/CalabashCollectFilter");
const ComposeFilter_1 = require("./Rule/ComposeFilter");
const CookFilter_1 = require("./Rule/CookFilter");
const DangoAbyssPluginFilter_1 = require("./Rule/DangoAbyssPluginFilter");
const DungeonDetectFilter_1 = require("./Rule/DungeonDetectFilter");
const FishingItemFilter_1 = require("./Rule/FishingItemFilter");
const InventoryFilter_1 = require("./Rule/InventoryFilter");
const ItemFilter_1 = require("./Rule/ItemFilter");
const MonsterDetectFilter_1 = require("./Rule/MonsterDetectFilter");
const PhantomFetterFilter_1 = require("./Rule/PhantomFetterFilter");
const PhantomFilter_1 = require("./Rule/PhantomFilter");
const RoleFilter_1 = require("./Rule/RoleFilter");
const SilentAreaDetectFilter_1 = require("./Rule/SilentAreaDetectFilter");
const VisionAssembleFilter_1 = require("./Rule/VisionAssembleFilter");
const VisionDestroyFilter_1 = require("./Rule/VisionDestroyFilter");
class FilterLogic {
  constructor() {
    this.VLt = {
      [1]: new RoleFilter_1.RoleFilter(),
      2: new PhantomFilter_1.PhantomFilter(),
      3: new PhantomFetterFilter_1.PhantomFetterFilter(),
      4: new CalabashCollectFilter_1.CalabashCollectFilter(),
      5: new ItemFilter_1.ItemFilter(),
      6: new MonsterDetectFilter_1.MonsterDetectFilter(),
      7: new SilentAreaDetectFilter_1.SilentAreaDetectFilter(),
      8: new DungeonDetectFilter_1.DungeonDetectFilter(),
      9: new CookFilter_1.CookFilter(),
      10: new ComposeFilter_1.ComposeFilter(),
      11: new ComposeFilter_1.ComposeFilter(),
      12: new InventoryFilter_1.InventoryFilter(),
      13: new VisionDestroyFilter_1.VisionDestroyFilter(),
      14: new VisionAssembleFilter_1.VisionAssembleFilter(),
      15: new FishingItemFilter_1.FishingItemFilter(),
      16: new RoleFilter_1.EditFormationRoleFilter(),
      17: new DangoAbyssPluginFilter_1.DangoAbyssPluginFilter()
    };
    this.HLt = {
      [1]: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetElementFilterData,
      2: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetWeaponFilterData,
      3: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetPhantomFilterData,
      4: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetPhantomFilterData,
      7: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetDetectFilterData,
      8: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetDetectFilterData,
      9: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetDetectFilterData,
      10: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetCookMenuFilterData,
      11: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetCookTypeFilterData,
      12: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetComposeFilterData,
      13: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetComposeFilterData,
      14: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetPhantomRarityFilterData,
      15: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetPhantomFettersEquipFilterData,
      16: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetPhantomFettersHasFilterData,
      17: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetDetectFilterData,
      18: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetPhantomRarityZeroFilterData,
      19: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetPhantomRarityOneFilterData,
      20: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetPhantomRarityTwoFilterData,
      21: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetPhantomRarityThreeFilterData,
      22: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetItemQualityFilterData,
      23: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetVisionDestroyCostData,
      24: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetVisionDestroyQualityData,
      25: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetVisionDestroyFetterGroupData,
      26: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetVisionDestroyAttribute,
      27: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetRoleTagFilterList,
      28: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetItemDeprecateFilterList,
      29: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetVisionGroupAttributeFilterList,
      31: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetFishingTechData,
      33: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetFishingAreaData,
      32: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetFishingTimeData,
      34: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetFishingTypeData,
      35: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetDangoAbyssPluginQualityData,
      36: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetDangoAbyssPluginPropData,
      37: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetDangoAbyssPluginTagData,
      38: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetPhantomFettersEquipFilterData,
      39: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetDangoAbyssPluginLockStateData,
      40: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetItemDeprecateFilterList,
      41: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetPhantomManageFirstMainPropData,
      42: FilterTypeFunctionLibrary_1.FilterTypeFunctionLibrary.GetPhantomManageCostData
    };
  }
  GetDataFuncByType(e) {
    var r = this.HLt[e];
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Filter", 75, "GetDataFuncByType not found " + e);
      }
    }
    return r;
  }
  jLt(e) {
    return this.VLt[e].DefaultFilterList();
  }
  WLt(e, r) {
    var i = this.VLt[e];
    i.InitFilterMap();
    var i = i.GetFilterFunction(r);
    if (i) {
      return i;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Filter", 10, "传入的筛选项id查找不到对应方法", ["数据类型", e], ["筛选表格类型", r]);
    }
  }
  KLt(e, r, i, t) {
    var n = this.WLt(r, i);
    if (!n) {
      return e;
    }
    var F = [];
    for (const o of e) {
      var l = n(o, t);
      if (l instanceof Array) {
        for (const a of l) {
          if (t.has(a)) {
            F.push(o);
            break;
          }
        }
      } else if (t.has(l)) {
        F.push(o);
      }
    }
    return F;
  }
  QLt(e, r, i, t) {
    var n = this.WLt(r, i);
    if (!n) {
      return {
        FindList: [],
        UnFindList: e
      };
    }
    var F = [];
    var l = [];
    for (const a of e) {
      var o = n(a, t);
      if (o instanceof Array) {
        let e = false;
        for (const u of o) {
          if (t.has(u)) {
            F.push(a);
            e = true;
            break;
          }
        }
        if (!e) {
          l.push(a);
        }
      } else {
        (t.has(o) ? F : l).push(a);
      }
    }
    return {
      FindList: F,
      UnFindList: l
    };
  }
  GetFilterList(e, i, r, t, n) {
    var F = [];
    let l = [];
    var o;
    var a;
    var u = this.jLt(i);
    if (u.length === 0) {
      l = e;
    }
    for (const p of u) {
      for (const b of e) {
        (p(b) ? F : l).push(b);
      }
    }
    if (r && t) {
      let e = l;
      var y;
      var _;
      var c;
      var s = [];
      let r = false;
      for ([y, _] of n) {
        if (!(_.size <= 0)) {
          r = true;
          c = this.QLt(e, i, y, _);
          e = c.UnFindList;
          s.push(...c.FindList);
        }
      }
      if (r) {
        return s.concat(F);
      } else {
        return e.concat(F);
      }
    }
    let L = l;
    for ([o, a] of n) {
      if (!(a.size <= 0)) {
        L = this.KLt(L, i, o, a);
      }
    }
    return L.concat(F);
  }
  GetFilterItemDataList(e, r) {
    var i = ConfigManager_1.ConfigManager.FilterConfig.GetFilterRuleConfig(e);
    var e = i.FilterType;
    var t = this.HLt[e];
    if (t) {
      var n = ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(r);
      var r = t(i.IdList);
      for (const F of r) {
        F.SetIsShowIcon(n.IsShowIcon);
        F.NeedChangeColor = i.NeedChangeColor;
      }
      return r;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Filter", 10, "传入的筛选表格类型未进行枚举定义以及方法实现", ["EFilterType", e]);
    }
  }
}
exports.FilterLogic = FilterLogic;
//# sourceMappingURL=FilterLogic.js.map