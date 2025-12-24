"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomInteractEditViewParam = exports.PhantomInteractInfoData = exports.PhantomInteractGridData = exports.PhantomInteractItemData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
class PhantomInteractItemData {
  constructor() {
    this.ItemIndex = 0;
    this.MonsterId = 0;
  }
  LoadData(t, a) {
    this.ItemIndex = t;
    this.MonsterId = a;
  }
  LoadEmpty(t) {
    this.ItemIndex = t;
    this.MonsterId = 0;
  }
}
exports.PhantomInteractItemData = PhantomInteractItemData;
class PhantomInteractGridData {
  constructor() {
    this.MonsterId = 0;
    this.MonsterInfoId = 0;
    this.SkinIds = [];
    this.EquippedSkin = 0;
    this.IsSpecial = false;
    this.Cost = 0;
    this.Name = undefined;
    this.IsUnlocked = false;
    this.InteractAreaId = 0;
    this.InSlotIndex = -1;
    this.IconPath = undefined;
    this.HasSkin = false;
    this.GetWayConfigId = 0;
    this.SortId = 0;
  }
  LoadSkinId(t) {
    this.EquippedSkin = t;
    let a = this.MonsterId;
    let i = false;
    if (t !== 0) {
      t = ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomItemById(t);
      a = t?.MonsterId ?? -1;
      this.IconPath = t?.IconMiddle;
      i = true;
    }
    var t = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(a);
    var t = t ? t.MonsterInfoId : 0;
    var s = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(t);
    this.Name = s.Name;
    this.MonsterInfoId = t;
    if (!i && !!(s = ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomItemByMonsterId(this.MonsterId)) && !(s.length <= 0)) {
      t = s[0];
      this.IconPath = t.IconMiddle;
    }
  }
  LoadData(t) {
    var a = t.TIs;
    let i = a;
    if (t.gff > 0) {
      i = t.gff;
    }
    var s = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(i);
    var h = ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomItemByMonsterId(a);
    if (!!h && !(h.length <= 0)) {
      h = h[0];
      this.IsUnlocked = true;
      this.HasSkin = PhantomInteractGridData.Swf(t.TIs);
      this.MonsterId = a;
      this.SkinIds = [0, ...t.bBs];
      this.GetWayConfigId = s?.ItemAccess ?? 0;
      this.SortId = s?.SortId ?? 0;
      this.LoadSkinId(t.gff);
      this.IsSpecial = s.IsWorldInteractable;
      this.InteractAreaId = s.InteractAreaId;
      a = h.Rarity;
      this.Cost = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(a).Cost;
    }
  }
  LoadLockData(t) {
    var a = ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(t);
    var i = a.MonsterInfoId;
    var s = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(i);
    var h = ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomItemByMonsterId(t);
    if (!!h && !(h.length <= 0)) {
      h = h[0];
      this.IsUnlocked = false;
      this.MonsterInfoId = i;
      this.MonsterId = t;
      this.SkinIds = [];
      this.LoadSkinId(0);
      this.EquippedSkin = 0;
      this.IsSpecial = a.IsWorldInteractable;
      this.GetWayConfigId = a?.ItemAccess ?? 0;
      this.SortId = a?.SortId ?? 0;
      this.Name = s.Name;
      i = h.Rarity;
      this.Cost = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(i).Cost;
      this.InteractAreaId = a.InteractAreaId;
      this.HasSkin = false;
    }
  }
  static Swf(t) {
    t = ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomItemByParentMonsterId(t);
    return !!t && !(t.length <= 0);
  }
}
exports.PhantomInteractGridData = PhantomInteractGridData;
class PhantomInteractInfoData {
  constructor() {
    this.EquippedMonsterIdMap = new Map();
    this.EquippedVisionData = [];
    this.GridItemDataList = [];
    this.GridItemDataMap = new Map();
    this.iYf = (t, a) => t.SortId - a.SortId;
  }
  LoadFromProto(t) {
    this.EquippedMonsterIdMap.clear();
    this.GridItemDataMap.clear();
    this.EquippedVisionData.length = 0;
    let a = void (this.GridItemDataList.length = 0);
    for (const r of a = !(a = t.vff) || a.length <= 0 ? [0, 0, 0, 0, 0, 0, 0, 0] : a) {
      var i;
      var s;
      if (r <= 0) {
        (i = new PhantomInteractItemData()).LoadEmpty(this.EquippedVisionData.length);
        this.EquippedVisionData.push(i);
      } else {
        i = new PhantomInteractItemData();
        s = this.EquippedVisionData.length;
        i.LoadData(s, r);
        this.EquippedVisionData.push(i);
        this.EquippedMonsterIdMap.set(r, s);
      }
    }
    for (const e of t.pff) {
      var h = new PhantomInteractGridData();
      var o = e.TIs;
      var n = this.EquippedMonsterIdMap.get(o) ?? -1;
      h.LoadData(e);
      h.InSlotIndex = n;
      this.GridItemDataList.push(h);
      this.GridItemDataMap.set(o, h);
    }
  }
  UpdateFromProto(t) {
    var a;
    var i;
    var t = t.yff;
    if (!!t && !(a = t.TIs, i = this.GridItemDataMap.get(a))) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("PhantomInteraction", 95, "新解锁声骸交互数据", ["MonsterId", a]);
      }
      (i = new PhantomInteractGridData()).LoadData(t);
      this.GridItemDataMap.set(a, i);
      this.GridItemDataList.push(i);
      this.GridItemDataList.sort(this.iYf);
    }
  }
}
exports.PhantomInteractInfoData = PhantomInteractInfoData;
class PhantomInteractEditViewParam {
  constructor() {
    this.InfoData = new PhantomInteractInfoData();
    this.OpenSlotIndex = -1;
    this.FromSummonView = false;
  }
}
exports.PhantomInteractEditViewParam = PhantomInteractEditViewParam;
//# sourceMappingURL=PhantomInteractDefine.js.map