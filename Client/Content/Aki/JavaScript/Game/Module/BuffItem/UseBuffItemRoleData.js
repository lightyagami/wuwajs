"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UseBuffItemRoleData = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const TEN_THOUSANDTH_RATIO = 10000;
class UseBuffItemRoleData {
  constructor(t, e, r, i, s, o, u, a) {
    this.X0t = 0;
    this.RoleName = t;
    this.Position = e;
    this.RoleConfigId = r;
    this.RoleLevel = i;
    this.CurrentAttribute = s;
    this.MaxAttribute = o;
    this.UseItemConfigId = u;
    this.Entity = a;
  }
  SetCurrentAttribute(t) {
    this.CurrentAttribute = t;
  }
  SetUseItemCount(t) {
    this.X0t = t;
  }
  AddUseItemCount() {
    if (!(ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.UseItemConfigId) <= this.X0t)) {
      this.X0t++;
    }
  }
  ReduceUseItemCount() {
    if (!(this.X0t <= 1)) {
      this.X0t--;
    }
  }
  get UseItemCount() {
    return this.X0t;
  }
  GetUseItemMaxCount() {
    var t = ModelManager_1.ModelManager.InventoryModel;
    var e = t.GetItemCountByConfigId(this.UseItemConfigId);
    var t = t.GetItemDataBaseByConfigId(this.UseItemConfigId)[0].GetUseCountLimit();
    if (t > 0) {
      return Math.min(e, t);
    } else {
      return e;
    }
  }
  IsMaxItemCount() {
    return this.X0t >= this.GetUseItemMaxCount();
  }
  IsMinItemCount() {
    return this.X0t <= 1;
  }
  GetPreviewAttribute() {
    var t = this.GetAddAttribute();
    return Math.min(t + this.CurrentAttribute, this.MaxAttribute);
  }
  GetPreviewAttributeNoLimit() {
    return this.GetAddAttribute() + this.CurrentAttribute;
  }
  GetAddAttribute() {
    var t = this.$0t(this.UseItemConfigId, this.Entity) * this.X0t;
    return Math.floor(t);
  }
  GetEntityId() {
    if (this.Entity) {
      return this.Entity.Id;
    } else {
      return -1;
    }
  }
  $0t(e, r) {
    e = ConfigManager_1.ConfigManager.BuffItemConfig.GetBuffItemBuffConfig(e);
    if (e) {
      let t = 0;
      for (const i of e) {
        t += this.Y0t(i, r);
      }
      return t;
    }
  }
  Y0t(t, e) {
    let r = 0;
    var i = ConfigManager_1.ConfigManager.BuffItemConfig;
    var s = t.ExtraEffectParameters;
    var o = t.ExtraEffectID;
    if (o === 0) {
      for (const g of t.RoutineExpirationEffects) {
        var u = i.GetBuffConfig(e.Id, g);
        r += this.Y0t(u, e);
      }
    } else if (o === 4) {
      for (const I of s) {
        var a;
        var n;
        var h = BigInt(I);
        var f = i.GetDamageConfig(e.Id, Number(h));
        if (f) {
          a = this.J0t(e, f.RelatedProperty);
          if ((n = f.CureBaseValue[0]) === undefined) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("BuffItem", 37, "计算Buff道具治疗生命数值时，结算表对应行的CureBaseValue为空", ["Buff配置", t]);
            }
          } else if (f = f.RateLv[0]) {
            f = f / TEN_THOUSANDTH_RATIO;
            r += n + a * f;
          } else {
            r += n;
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("BuffItem", 37, "计算Buff道具治疗生命数值时，找不到结算表对应配置", ["结算表Id", h], ["Buff配置", t]);
        }
      }
    } else if (o === 101) {
      if (s.length < 2) {
        return r;
      }
      var o = e.GetComponent(177);
      var _ = Number(s[0]) / TEN_THOUSANDTH_RATIO;
      var o = o.GetCurrentValue(EAttributeId.l5n);
      r += _ * o + Number(s[1]);
    }
    return r;
  }
  J0t(t, e) {
    return t.GetComponent(177).GetCurrentValue(e);
  }
}
exports.UseBuffItemRoleData = UseBuffItemRoleData;
//# sourceMappingURL=UseBuffItemRoleData.js.map