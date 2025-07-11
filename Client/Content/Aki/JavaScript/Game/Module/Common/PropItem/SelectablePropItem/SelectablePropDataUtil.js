"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectablePropDataUtil = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const SelectablePropItemDefine_1 = require("./SelectablePropItemDefine");
class SelectablePropDataUtil {
  static get TickMaxTime() {
    this.ABt ||= ConfigManager_1.ConfigManager.CommonConfig.GetSelectablePropItemTickMaxTime();
    return this.ABt;
  }
  static get TickMinTime() {
    this.PBt ||= ConfigManager_1.ConfigManager.CommonConfig.GetSelectablePropItemTickMinTime();
    return this.PBt;
  }
  static get TickInternalTime() {
    this.xBt ||= ConfigManager_1.ConfigManager.CommonConfig.GetSelectablePropItemTickIntervalTime();
    return this.xBt;
  }
  static GetSelectablePropData(e) {
    var t = e.GetItemDataType();
    if (t === 2) {
      return this.WeaponPropData(e.GetUniqueId());
    } else if (t === 3) {
      return this.PhantomPropData(e.GetUniqueId(), e.GetCount());
    } else if (t === 13) {
      return this.DangoAbyssItemPropData(e);
    } else {
      return this.MaterialPropData(e.GetConfigId(), e.GetCount());
    }
  }
  static WeaponPropData(e) {
    var t = new SelectablePropItemDefine_1.SelectablePropData();
    var a = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    t.IncId = e;
    t.ItemId = a.GetItemId();
    t.ItemDataType = 2;
    t.ResonanceLevel = a.GetResonanceLevel();
    t.LevelText = ConfigManager_1.ConfigManager.TextConfig.GetTextById("LevelShow").replace("{0}", a.GetLevel().toString());
    t.RoleId = a.GetRoleId();
    return t;
  }
  static PhantomPropData(e, t) {
    var a;
    var r = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
    if (r) {
      (a = new SelectablePropItemDefine_1.SelectablePropData()).IncId = e;
      a.ItemId = r.GetConfigId();
      a.ItemDataType = 3;
      a.LevelText = ConfigManager_1.ConfigManager.TextConfig.GetTextById("LevelShow").replace("{0}", r.GetPhantomLevel().toString());
      a.Count = t;
      return a;
    }
  }
  static DangoAbyssItemPropData(e) {
    var t;
    var a = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(e.GetUniqueId());
    if (a) {
      (t = new SelectablePropItemDefine_1.SelectablePropData()).IncId = e.GetUniqueId();
      t.ItemId = e.GetConfigId();
      t.ItemDataType = e.GetItemDataType();
      t.RoleId = a.GetRoleId();
      return t;
    }
  }
  static MaterialPropData(e, t) {
    var a = new SelectablePropItemDefine_1.SelectablePropData();
    a.IncId = 0;
    a.LevelText = t.toString();
    a.ItemDataType = 0;
    a.ItemId = e;
    a.Count = t;
    return a;
  }
}
exports.SelectablePropDataUtil = SelectablePropDataUtil;
//# sourceMappingURL=SelectablePropDataUtil.js.map