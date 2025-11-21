"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomRoleEquipmentData = undefined;
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const RoleAttrListScrollData_1 = require("../../../RoleUi/View/ViewData/RoleAttrListScrollData");
class PhantomRoleEquipmentData {
  constructor() {
    this.dFe = 0;
    this.NVi = [0, 0, 0, 0, 0];
    this.OVi = undefined;
  }
  Phrase(t) {
    if (t instanceof Protocol_1.Aki.Protocol.z6s) {
      this.dFe = t.Q6n;
      this.NVi = t.eHn;
    } else if (t instanceof Protocol_1.Aki.Protocol.Z6s) {
      this.OVi = t;
    }
  }
  GetRoleId() {
    return this.dFe;
  }
  RemoveIncrIdLocal(t) {
    if (t > 0 && (t = this.NVi.indexOf(t)) >= 0) {
      this.NVi[t] = 0;
    }
  }
  GetIncrIdList() {
    return this.NVi;
  }
  GetPropData() {
    return this.OVi;
  }
  CheckPhantomIsMain(t) {
    return this.NVi.length > 0 && this.NVi[0] === t;
  }
  CheckPhantomIsSub(t) {
    return this.NVi.length > 0 && this.NVi[0] !== t && this.NVi.includes(t);
  }
  CheckMonsterIsEquip(r) {
    var e = this.NVi.length;
    for (let t = 0; t < e; t++) {
      var o = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(this.NVi[t]);
      if (o && o.GetMonsterId() === r) {
        return true;
      }
    }
    return false;
  }
  GetPhantomIndex(r) {
    var e = this.NVi.length;
    for (let t = 0; t < e; t++) {
      if (this.NVi[t] === r) {
        return t;
      }
    }
    return -1;
  }
  GetIndexPhantomId(t) {
    if (this.NVi.length > t) {
      return this.NVi[t];
    } else {
      return 0;
    }
  }
  GetSumEquipLevel() {
    let r = 0;
    this.NVi.forEach(t => {
      t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(t);
      if (t) {
        r += t.GetPhantomLevel();
      }
    });
    return r;
  }
  GetAverageEquipLevel() {
    var t = this.NVi.length;
    if (t <= 0) {
      return 0;
    } else {
      return this.GetSumEquipLevel() / t;
    }
  }
  GetPhantomOperationState(t, r) {
    t = this.NVi[t];
    if (t === 0) {
      return 1;
    } else if (t === r) {
      return 0;
    } else {
      return 2;
    }
  }
  GetCombinationActiveNum(t) {
    let r = 0;
    var e = new Array();
    for (const i of t) {
      for (const n of this.GetIncrIdList()) {
        var o = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetPhantomItemDataByUniqueId(n);
        if (!!o && i === o.GetMonsterId() && !e.includes(i)) {
          e.push(i);
          r++;
        }
      }
    }
    return t.length - r;
  }
  GetPropDetailAttributeList() {
    var t = CommonParamById_1.configCommonParamById.GetIntArrayConfig("VisionMainViewExtraAttribute");
    const e = this.GetPropShowAttributeList();
    const o = e.length;
    const i = [];
    let n = false;
    t.forEach(r => {
      n = false;
      for (let t = 0; t < o; t++) {
        if (e[t].Id === r) {
          i.push(e[t]);
          n = true;
          break;
        }
      }
      var t;
      if (!n) {
        t = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(r);
        i.push(new RoleAttrListScrollData_1.RoleAttrListScrollData(r, 0, 0, t.Priority, false, 1));
      }
    });
    return i;
  }
  GetPropShowAttributeList() {
    var r = new Array();
    const e = new Map();
    this.OVi?.bws.forEach(t => {
      e.set(t.Z4n, t.e5n);
    });
    const o = new Map();
    this.OVi?.Bws.forEach(t => {
      o.set(t.Z4n, t.e5n);
      if (!e.has(t.Z4n)) {
        e.set(t.Z4n, 0);
      }
    });
    var i = Array.from(e.keys());
    var n = i.length;
    for (let t = 0; t < n; t++) {
      var a = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(i[t]);
      r.push(new RoleAttrListScrollData_1.RoleAttrListScrollData(i[t], e.get(i[t]), o.get(i[t]) ?? 0, a.Priority, false, 1));
    }
    return r;
  }
  CheckHasEmpty() {
    return this.NVi && this.NVi.findIndex(t => t === 0) >= 0;
  }
  GetEquippedNum() {
    if (this.NVi) {
      return this.NVi.filter(t => t > 0).length;
    } else {
      return 0;
    }
  }
}
exports.PhantomRoleEquipmentData = PhantomRoleEquipmentData;
//# sourceMappingURL=PhantomRoleEquipmentData.js.map