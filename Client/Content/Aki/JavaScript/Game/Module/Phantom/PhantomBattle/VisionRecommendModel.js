"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VisionRecommendModel = exports.VisionSelectRecommendData = exports.AttrRecommendInfo = exports.VisionAttrRecommendInfo = exports.VisionFetterRecommendInfo = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PhantomBattleDefine_1 = require("./PhantomBattleDefine");
const VisionFetterDescItem_1 = require("./View/VisionFetterDescItem");
class VisionFetterRecommendInfo {
  constructor() {
    this.HHa = 0;
    this.Kwu = 0;
    this.bo_ = 0;
    this.Xwu = 0;
    this.Ywu = [];
  }
  GetRecommendFetterGroupId() {
    return this.HHa;
  }
  GetSpecialFetterSubGroupId() {
    return this.Kwu;
  }
  GetUsage() {
    return this.bo_;
  }
  GetUsageText() {
    var e = (this.bo_ - this.bo_ % 10) / 100;
    if (this.bo_ === 0) {
      return "";
    } else {
      return e.toFixed(1) + "%";
    }
  }
  GetFetterCountList() {
    return this.Ywu;
  }
  GetFetterType() {
    return this.Xwu;
  }
  Phrase(e) {
    this.zwu(e);
    this.bo_ = e.PGs;
    this.Xwu = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(this.HHa).FetterType;
  }
  zwu(e) {
    this.Ywu = [];
    let t = 0;
    let r = 0;
    e = e.Lwu;
    if (e.length !== 2 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Phantom", 75, "推荐的套装羁绊数量异常，请确认配置与统计");
    }
    for (const s of e) {
      var n = s.rL_;
      var o = s.Awu;
      var i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(n);
      if (t === 0 || i.FetterType === 1) {
        t = n;
      } else {
        r = n;
      }
      var i = i.FetterMap.get(o);
      if (i) {
        this.Ywu.push({
          GroupId: n,
          Count: o,
          FetterId: i
        });
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Phantom", 75, "推荐的套装没有对应的羁绊效果", ["Group", n], ["Count", o]);
      }
    }
    this.HHa = t;
    this.Kwu = r;
  }
}
exports.VisionFetterRecommendInfo = VisionFetterRecommendInfo;
class VisionAttrRecommendInfo {
  constructor() {
    this.Lo_ = new Array();
    this.Ao_ = new Array();
  }
  GetMainAttrRecommendInfo() {
    return this.Lo_;
  }
  GetSubAttrRecommendInfo() {
    return this.Ao_;
  }
}
exports.VisionAttrRecommendInfo = VisionAttrRecommendInfo;
class AttrRecommendInfo {
  constructor() {
    this.gXo = 0;
    this.bo_ = 0;
    this.xo_ = 0;
  }
  GetAttrId() {
    return this.gXo;
  }
  GetUsage() {
    return this.bo_;
  }
  GetUsageText() {
    var e = (this.bo_ - this.bo_ % 10) / 100;
    if (this.bo_ === 0) {
      return "";
    } else {
      return e.toFixed(1) + "%";
    }
  }
  GetAddType() {
    return this.xo_;
  }
  Phrase(e) {
    this.gXo = e.oL_;
    this.bo_ = e.PGs;
    this.xo_ = e.nL_;
  }
}
exports.AttrRecommendInfo = AttrRecommendInfo;
class VisionSelectRecommendData {
  constructor() {
    this.AttrId = 0;
    this.AddType = 0;
  }
}
exports.VisionSelectRecommendData = VisionSelectRecommendData;
class VisionRecommendModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Ro_ = new Map();
    this.Po_ = new Map();
    this.CurrentSelectMainAttrArray = new Array();
    this.CurrentSelectSubAttrArray = new Array();
    this.Jwu = (e, t, r, n, o) => {
      e = e.GetFetterGroupId() === n;
      t = t.GetFetterGroupId() === n;
      if (e && !t) {
        return -1;
      } else if (t && !e) {
        return 1;
      } else {
        return 0;
      }
    };
    this.Zwu = (e, t) => t.GetQuality() - e.GetQuality();
    this.eLu = (e, t, r) => {
      e = e.GetIfHaveRecommendMainProp(r);
      t = t.GetIfHaveRecommendMainProp(r);
      if (e && !t) {
        return -1;
      } else if (t && !e) {
        return 1;
      } else {
        return 0;
      }
    };
    this.tLu = (e, t, r) => {
      e = e.GetIfHaveRecommendSubProp(r);
      t = t.GetIfHaveRecommendSubProp(r);
      if (e && !t) {
        return -1;
      } else if (t && !e) {
        return 1;
      } else {
        return 0;
      }
    };
    this.iLu = (e, t) => t.GetPhantomLevel() - e.GetPhantomLevel();
    this.jRt = (e, t, r, n, o, i) => {
      e = o.includes(e.GetUniqueId());
      o = o.includes(t.GetUniqueId());
      if (e && !o) {
        return -1;
      } else if (o && !e) {
        return 1;
      } else {
        return 0;
      }
    };
    this.rLu = (e, t) => t.GetConfigId() - e.GetConfigId();
    this.G2u = (e, t, r) => {
      e = e.GetFetterGroupId();
      if (e === t) {
        return 2;
      } else if (e === r) {
        return 1;
      } else {
        return 0;
      }
    };
    this.F2u = (e, t, r, n, o, i) => {
      e = this.G2u(e, n, i);
      return this.G2u(t, n, i) - e;
    };
    this.UU1 = (e, t) => {
      e = e.GetCost();
      return t.GetCost() - e;
    };
    this.nLu = [this.Jwu, this.Zwu, this.eLu, this.tLu, this.iLu, this.jRt, this.rLu];
    this.sLu = [this.F2u, this.UU1, this.Zwu, this.eLu, this.tLu, this.iLu, this.jRt, this.rLu];
  }
  OnRoleRecommendData(e, t) {
    if (t && t.hL_) {
      var r = new Array();
      for (const o of t.hL_) {
        var n = new VisionFetterRecommendInfo();
        n.Phrase(o);
        r.push(n);
      }
      this.Ro_.set(e, r);
    }
  }
  OnRoleRecommendAttrData(e, t) {
    if (t && t.lL_) {
      if (!this.Po_.get(e)) {
        const i = new Map();
        this.Po_.set(e, i);
      }
      const i = this.Po_.get(e);
      if (i) {
        for (const s of t.lL_) {
          var r = new VisionAttrRecommendInfo();
          for (const a of s.sL_) {
            var n = new AttrRecommendInfo();
            n.Phrase(a);
            r.GetMainAttrRecommendInfo().push(n);
          }
          for (const h of s.aL_) {
            var o = new AttrRecommendInfo();
            o.Phrase(h);
            r.GetSubAttrRecommendInfo().push(o);
          }
          i.set(s.N2s, r);
        }
      }
    }
  }
  GetRoleFetterRecommendInfo(e) {
    return this.Ro_.get(e);
  }
  GetRoleCostAttrRecommendInfo(e, t) {
    e = this.Po_.get(e);
    if (e) {
      return e.get(t);
    }
  }
  CheckVisionOneKeyEquipRedDot(r) {
    var n;
    var o = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(r);
    if (o && !o.IsTrialRole()) {
      let e = false;
      let t = 0;
      for (const s of ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(r).GetIncrIdList()) {
        if (s === 0) {
          e = true;
        } else if (n = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(s)) {
          t += n.GetCost();
        }
      }
      if (e) {
        var i = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost() - t;
        var o = this.Bo_(r);
        if (o) {
          for (const a of o) {
            if (a.GetEquipRoleId() !== r && a.GetCost() <= i) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }
  GetRecommendEquipUniqueIdList(e, t) {
    var r = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
    var n = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetVisionRecommendRuleLevel();
    let o = PhantomBattleDefine_1.costListRecommendLowLevel;
    if (n <= r) {
      o = PhantomBattleDefine_1.costListRecommendHighLevel;
    }
    var n = t.GetRecommendFetterGroupId();
    var r = t.GetSpecialFetterSubGroupId();
    var i = [0, 0, 0, 0, 0];
    if (t.GetFetterType() === 1) {
      this.hLu(e, n, r, o, i);
    } else {
      this.lLu(e, n, o, i);
    }
    return i;
  }
  hLu(e, r, n, o, i) {
    var s = this.Bo_(e);
    if (s) {
      this.uLu(s, this.sLu, e, r, n);
      let t = 0;
      var a = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
      var h = i.length;
      for (let e = 0; e < h && !(t >= a); e++) {
        var c = o[e];
        var f = this.cLu(i) ? [r] : [];
        if ((c = this.qo_(i, c, s, false, f)) !== 0) {
          t += ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(c).GetCost();
          i[e] = c;
        }
      }
    }
    return i;
  }
  cLu(e) {
    var t;
    var r;
    var n;
    var o = new Map();
    for (const s of e) {
      if (!(s <= 0)) {
        t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(s).GetFetterGroupId();
        o.set(t, (o.get(t) ?? 0) + 1);
      }
    }
    for ([r, n] of o) {
      if (ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupById(r).FetterType === 1) {
        var i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetFetterGroupMaxCountById(r);
        if (n >= i) {
          return true;
        }
      }
    }
    return false;
  }
  lLu(e, r, n, o) {
    var i = this.Bo_(e);
    if (i) {
      this.uLu(i, this.nLu, e, r);
      var s = o.length;
      let t = 0;
      var a = ModelManager_1.ModelManager.PhantomBattleModel.GetMaxCost();
      for (let e = 0; e < s && !(t >= a); e++) {
        var h = n[e];
        var h = this.qo_(o, h, i, true, []);
        if (h !== 0) {
          t += ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(h).GetCost();
          o[e] = h;
        }
      }
    }
    return o;
  }
  qo_(t, r, n, o, i) {
    const s = new Array();
    t.forEach(e => {
      e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
      if (e) {
        s.push(e.GetMonsterId());
      }
    });
    var a = n.length;
    let h = 0;
    var c = new Array();
    for (let e = 0; e < a; e++) {
      var f = n[e];
      if (!t.includes(f?.GetUniqueId()) && !(o ? f.GetCost() !== r : f.GetCost() > r) && !i.includes(f.GetFetterGroupId())) {
        var u = f.GetMonsterId();
        if (!s.includes(u)) {
          h = f.GetUniqueId();
          break;
        }
        c.push(f.GetUniqueId());
      }
    }
    return h = h === 0 && c.length > 0 ? c[0] : h;
  }
  Bo_(e) {
    var t;
    var r = ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataList();
    if (r.length !== 0) {
      const n = new Array();
      for (const o of r) {
        if (!ModelManager_1.ModelManager.PhantomBattleModel.CheckPhantomIsEquip(o.GetUniqueId())) {
          t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(o.GetUniqueId());
          n.push(t);
        }
      }
      ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(e).GetIncrIdList().forEach(e => {
        e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
        if (e) {
          n.push(e);
        }
      });
      return n;
    }
  }
  uLu(e, o, i, s, a) {
    const h = ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(i).GetIncrIdList();
    e.sort((e, t) => {
      for (const n of o) {
        var r = n(e, t, i, s, h, a);
        if (r !== 0) {
          return r;
        }
      }
      return 0;
    });
  }
  GetFetterDescByRecommendInfo(e) {
    var t = new Array();
    for (const n of e.GetFetterCountList()) {
      var r = new VisionFetterDescItem_1.VisionFetterDescData();
      r.Key = n.Count;
      r.Value = n.FetterId;
      t.push(r);
    }
    return t;
  }
}
exports.VisionRecommendModel = VisionRecommendModel;
//# sourceMappingURL=VisionRecommendModel.js.map