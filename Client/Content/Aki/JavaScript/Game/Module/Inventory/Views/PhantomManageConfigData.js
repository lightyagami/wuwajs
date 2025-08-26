"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomManageConfigData = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const InventoryDefine_1 = require("../InventoryDefine");
class PhantomManageConfigData {
  constructor(t) {
    this.E9 = Protocol_1.Aki.Protocol.Oxu.Proto_AutoLock;
    this.Xy = -1;
    this.iGu = false;
    this.he = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(InventoryDefine_1.EMPTY_CONFIG_TEXT_ID);
    this.rGu = new Map();
    this.Fhd = -1;
    this.Xy = t;
    t = ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst();
    for (const e of ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(t).RuleList) {
      this.rGu.set(e, []);
    }
  }
  SetDisplayIndex(t) {
    this.Fhd = t;
  }
  GetDisplayIndex() {
    return this.Fhd;
  }
  GetIndex() {
    return this.Xy;
  }
  GetIndexString() {
    var t = this.Xy + 1;
    if (t < 10) {
      return "0" + t;
    } else {
      return t.toString();
    }
  }
  GetIsOn() {
    return this.iGu;
  }
  SetIsOn(t) {
    this.iGu = t;
  }
  GetName() {
    return this.he;
  }
  SetName(t) {
    this.he = t;
  }
  GetType() {
    return this.E9;
  }
  GetValueListByRuleId(t) {
    return this.rGu.get(t) ?? [];
  }
  GetRuleIdMapValueList() {
    return new Map(this.rGu);
  }
  SetRuleIdMapValueList(t) {
    this.rGu.clear();
    var e = ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst();
    for (const r of ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(e).RuleList) {
      this.rGu.set(r, t.get(r) ?? []);
    }
  }
  SetType(t) {
    this.E9 = t;
  }
  IsEmpty() {
    if (this.rGu.size !== 0) {
      for (const t of this.rGu.values()) {
        if (t.length !== 0) {
          return false;
        }
      }
    }
    return true;
  }
  IsEqual(t, e) {
    if (!e || t !== this.iGu) {
      return false;
    }
    for (const [i, n] of this.rGu) {
      var r = e.get(i);
      if (!r || r.length !== n.length || !r.every((t, e) => t === n[e])) {
        return false;
      }
    }
    return true;
  }
  Parse(t) {
    this.Reset(true, true);
    this.iGu = t.qjn;
    this.he = t.H8n;
    this.Xy = t.c5n;
    for (const e of t.Dxu) {
      this.rGu.set(e.Bxu, e.kxu);
    }
  }
  Integrate() {
    var t;
    var e;
    var r = [];
    for ([t, e] of this.rGu) {
      r.push({
        Bxu: t,
        kxu: e
      });
    }
    return {
      c5n: this.Xy,
      qjn: this.iGu,
      H8n: this.he,
      Dxu: r
    };
  }
  Reset(t, e) {
    this.Xy = t ? -1 : this.Xy;
    this.iGu = false;
    this.he = e ? ConfigManager_1.ConfigManager.TextConfig.GetMultiText(InventoryDefine_1.EMPTY_CONFIG_TEXT_ID) : this.he;
    this.rGu.clear();
    t = ModelManager_1.ModelManager.InventoryModel.GetFilterIdConst();
    for (const r of ConfigManager_1.ConfigManager.FilterConfig.GetFilterConfig(t).RuleList) {
      this.rGu.set(r, []);
    }
  }
  Clone() {
    var t = new PhantomManageConfigData(this.Xy);
    t.iGu = this.iGu;
    t.he = this.he;
    t.E9 = this.E9;
    t.rGu = new Map(this.rGu);
    return t;
  }
}
exports.PhantomManageConfigData = PhantomManageConfigData;
//# sourceMappingURL=PhantomManageConfigData.js.map