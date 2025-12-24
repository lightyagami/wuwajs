"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BuffItemConfig = undefined;
const BuffById_1 = require("../../../Core/Define/ConfigQuery/BuffById");
const BuffEquipItemByItemId_1 = require("../../../Core/Define/ConfigQuery/BuffEquipItemByItemId");
const BuffEquipItemByRoleId_1 = require("../../../Core/Define/ConfigQuery/BuffEquipItemByRoleId");
const BuffItemById_1 = require("../../../Core/Define/ConfigQuery/BuffItemById");
const BuffItemByPublicCdGroup_1 = require("../../../Core/Define/ConfigQuery/BuffItemByPublicCdGroup");
const BuffItemCdGroupById_1 = require("../../../Core/Define/ConfigQuery/BuffItemCdGroupById");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ModelManager_1 = require("../../Manager/ModelManager");
class BuffItemConfig extends ConfigBase_1.ConfigBase {
  GetDamageConfig(e, f) {
    return ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(f);
  }
  GetBuffItemBuffConfig(e) {
    e = this.GetBuffItemConfig(e);
    if (e && e.Buffs?.length) {
      var f = new Array();
      for (const u of e.Buffs) {
        var r = BuffById_1.configBuffById.GetConfig(u);
        if (r) {
          f.push(r);
        }
      }
      return f;
    }
  }
  GetBuffConfig(e, f) {
    return BuffById_1.configBuffById.GetConfig(f);
  }
  GetBuffConfigs(e, f) {
    if (f && f?.length) {
      var r = new Array();
      for (const t of f) {
        var u = BuffById_1.configBuffById.GetConfig(t);
        if (u) {
          r.push(u);
        }
      }
      return r;
    }
  }
  IsResurrectionItem(e) {
    e = this.GetBuffItemBuffConfig(e);
    if (e) {
      for (const f of e) {
        if (f.ExtraEffectID === 101) {
          return true;
        }
      }
    }
    return false;
  }
  IsTeamBuffItem(e) {
    var f = ItemInfoById_1.configItemInfoById.GetConfig(e);
    return !!f && !!f.IsBuffItem && !!(f = this.GetBuffItemConfig(e)) && f.Share;
  }
  GetBuffItemTotalCdTime(e) {
    e = this.GetBuffItemConfig(e);
    if (!e) {
      return 0;
    }
    var f = e.PublicCdGroup;
    if (f > 0) {
      f = this.GetBuffItemCdGroup(f);
      if (f) {
        return f.CoolDownTime;
      }
    }
    return e.Cd;
  }
  GetBuffItemConfig(e) {
    return BuffItemById_1.configBuffItemById.GetConfig(e);
  }
  GetBuffItemConfigByPublicCdGroup(e) {
    return BuffItemByPublicCdGroup_1.configBuffItemByPublicCdGroup.GetConfigList(e);
  }
  GetBuffItemCdGroup(e) {
    return BuffItemCdGroupById_1.configBuffItemCdGroupById.GetConfig(e);
  }
  IsBuffItem(e) {
    var f = ItemInfoById_1.configItemInfoById.GetConfig(e);
    return !!f && !!f.IsBuffItem && this.GetBuffItemConfig(e) !== undefined;
  }
  IsEquipBuffItem(e) {
    return !!ItemInfoById_1.configItemInfoById.GetConfig(e) && this.GetBuffEquipItemByItemId(e).length > 0;
  }
  GetBuffEquipItemByRoleId(e) {
    return BuffEquipItemByRoleId_1.configBuffEquipItemByRoleId.GetConfigList(e) ?? [];
  }
  GetBuffEquipItemByItemId(e) {
    return BuffEquipItemByItemId_1.configBuffEquipItemByItemId.GetConfigList(e) ?? [];
  }
  GetBuffEquipItemCategory(e) {
    e = this.GetBuffEquipItemByItemId(e);
    if (e.length > 0) {
      return e[0].WearPos;
    } else {
      return 0;
    }
  }
}
exports.BuffItemConfig = BuffItemConfig;
//# sourceMappingURL=BuffItemConfig.js.map