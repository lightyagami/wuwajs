"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortLogic = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const AdventureGuideSort_1 = require("./Rule/AdventureGuideSort");
const AssemblyGridSort_1 = require("./Rule/AssemblyGridSort");
const CalabashCollectSort_1 = require("./Rule/CalabashCollectSort");
const ComposeExchangeSort_1 = require("./Rule/ComposeExchangeSort");
const ComposePurificationSort_1 = require("./Rule/ComposePurificationSort");
const ComposeSort_1 = require("./Rule/ComposeSort");
const ComposeStructureSort_1 = require("./Rule/ComposeStructureSort");
const CookSort_1 = require("./Rule/CookSort");
const DangoAbyssPluginItemSort_1 = require("./Rule/DangoAbyssPluginItemSort");
const FishingItemSort_1 = require("./Rule/FishingItemSort");
const ForgingSort_1 = require("./Rule/ForgingSort");
const ItemSort_1 = require("./Rule/ItemSort");
const PhantomSort_1 = require("./Rule/PhantomSort");
const RoleSort_1 = require("./Rule/RoleSort");
const VisionFetterSort_1 = require("./Rule/VisionFetterSort");
const WeaponSort_1 = require("./Rule/WeaponSort");
class SortLogic {
  constructor() {
    this.VLt = {
      [1]: new RoleSort_1.RoleSort(),
      2: new WeaponSort_1.WeaponSort(),
      3: new ItemSort_1.ItemSort(),
      4: new PhantomSort_1.PhantomSort(),
      5: new CookSort_1.CookSort(),
      6: new ComposeSort_1.ComposeSort(),
      7: new ComposeStructureSort_1.ComposeStructureSort(),
      8: new ComposePurificationSort_1.ComposePurificationSort(),
      9: new ForgingSort_1.ForgingSort(),
      10: new CalabashCollectSort_1.CalabashCollectSort(),
      11: new AssemblyGridSort_1.AssemblyGridSort(),
      12: new VisionFetterSort_1.VisionFetterSort(),
      13: new AdventureGuideSort_1.AdventureGuideSort(),
      14: new ComposeExchangeSort_1.ComposeExchangeSort(),
      15: new PhantomSort_1.PhantomSort(),
      16: new FishingItemSort_1.FishingItem(),
      17: new DangoAbyssPluginItemSort_1.DangoAbyssPluginItemSort()
    };
  }
  SortDataList(e, o, r, ...t) {
    var o = ConfigManager_1.ConfigManager.SortConfig.GetSortConfig(o);
    var i = r.GetAllSelectRuleSet();
    var r = r.GetIsAscending();
    var o = o.DataId;
    this.SortDataByData(e, o, i, r, ...t);
  }
  SortDataByData(e, o, i, n, ...u) {
    const S = this.VLt[o];
    S.InitSortMap();
    e.sort((e, o) => {
      for (const t of i.values()) {
        var r = S.GetSortFunctionByRuleId(t)(e, o, n, ...u);
        if (r) {
          return r;
        }
      }
      return 0;
    });
  }
}
exports.SortLogic = SortLogic;
//# sourceMappingURL=SortLogic.js.map