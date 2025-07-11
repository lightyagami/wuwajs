"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomSort = undefined;
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CalabashDefine_1 = require("../../../../../Calabash/CalabashDefine");
const CommonItemData_1 = require("../../../../../Inventory/ItemData/CommonItemData");
const PhantomItemData_1 = require("../../../../../Inventory/ItemData/PhantomItemData");
const ItemViewData_1 = require("../../../../../Inventory/ItemViewData");
const CommonSort_1 = require("./CommonSort");
class PhantomSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments);
    this.oRt = (t, i, s) => {
      var e;
      var a;
      var h;
      if (t instanceof ItemViewData_1.ItemViewData && i instanceof ItemViewData_1.ItemViewData || t instanceof PhantomItemData_1.PhantomItemData && i instanceof PhantomItemData_1.PhantomItemData) {
        h = ModelManager_1.ModelManager.PhantomBattleModel;
        a = t.GetUniqueId();
        e = i.GetUniqueId();
        a = h.GetPhantomBattleData(a);
        h = h.GetPhantomBattleData(e);
        if (a.GetPhantomLevel() !== h.GetPhantomLevel()) {
          return (h.GetPhantomLevel() - a.GetPhantomLevel()) * (s ? -1 : 1);
        } else {
          return 0;
        }
      } else if (t.Level !== i.Level) {
        return (i.Level - t.Level) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.sRt = (t, i, s) => {
      var e = t;
      var a = i;
      var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(e.GetUniqueId());
      var i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(a.GetUniqueId());
      let h = 0;
      let n = 0;
      if (t) {
        h = t.GetExp();
      } else {
        var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
        var o = r.length;
        for (let t = 0; t < o; t++) {
          if (r[t].ItemId === e.GetConfigId()) {
            h = r[t].Exp;
            break;
          }
        }
      }
      if (i) {
        n = i.GetExp();
      } else {
        var m = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
        var f = m.length;
        for (let t = 0; t < f; t++) {
          if (m[t].ItemId === a.GetConfigId()) {
            n = m[t].Exp;
            break;
          }
        }
      }
      if (h !== n) {
        return (n - h) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.aRt = (t, i, s) => {
      var e = t;
      var a = i;
      var h = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
      var n = h.length;
      let r = false;
      for (let t = 0; t < n; t++) {
        if (h[t].ItemId === e.GetConfigId()) {
          r = true;
          break;
        }
      }
      let o = false;
      for (let t = 0; t < n; t++) {
        if (h[t].ItemId === a.GetConfigId()) {
          o = true;
          break;
        }
      }
      if (r !== o) {
        t = r ? 1 : 0;
        return (o ? 1 : 0) - t;
      } else {
        return 0;
      }
    };
    this.hRt = (t, i, s) => {
      var e;
      var a;
      var h;
      if (t instanceof ItemViewData_1.ItemViewData && i instanceof ItemViewData_1.ItemViewData || t instanceof PhantomItemData_1.PhantomItemData && i instanceof PhantomItemData_1.PhantomItemData) {
        e = ModelManager_1.ModelManager.PhantomBattleModel;
        a = t.GetUniqueId();
        h = i.GetUniqueId();
        a = e.GetPhantomBattleData(a);
        e = e.GetPhantomBattleData(h);
        h = a.GetPhantomSubProp();
        a = e.GetPhantomSubProp();
        if ((e = h?.length > 0 ? 1 : 0) != (h = a?.length > 0 ? 1 : 0)) {
          return (h - e) * (s ? -1 : 1);
        } else {
          return 0;
        }
      } else if ((a = t.IsBreach ? 1 : 0) != (h = i.IsBreach ? 1 : 0)) {
        return (h - a) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.KDt = (t, i, s) => {
      var e;
      var a;
      var h;
      if (t instanceof CommonItemData_1.CommonItemData && i instanceof CommonItemData_1.CommonItemData) {
        return (i.GetQuality() - t.GetQuality()) * (s ? -1 : 1);
      } else if (t instanceof ItemViewData_1.ItemViewData && i instanceof ItemViewData_1.ItemViewData || t instanceof PhantomItemData_1.PhantomItemData && i instanceof PhantomItemData_1.PhantomItemData) {
        h = ModelManager_1.ModelManager.PhantomBattleModel;
        a = t.GetUniqueId();
        e = i.GetUniqueId();
        a = h.GetPhantomBattleData(a);
        h = h.GetPhantomBattleData(e);
        if (a.GetQuality() !== h.GetQuality()) {
          return (h.GetQuality() - a.GetQuality()) * (s ? -1 : 1);
        } else {
          return 0;
        }
      } else if (t.Quality !== i.Quality) {
        return (i.Quality - t.Quality) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.$Dt = (t, i, s) => {
      var e;
      var a;
      var h;
      if (t instanceof ItemViewData_1.ItemViewData && i instanceof ItemViewData_1.ItemViewData || t instanceof PhantomItemData_1.PhantomItemData && i instanceof PhantomItemData_1.PhantomItemData) {
        h = ModelManager_1.ModelManager.PhantomBattleModel;
        a = t.GetUniqueId();
        e = i.GetUniqueId();
        a = h.GetPhantomBattleData(a);
        h = h.GetPhantomBattleData(e);
        if (a.GetConfigId() !== h.GetConfigId()) {
          return (h.GetConfigId() - a.GetConfigId()) * (s ? -1 : 1);
        } else {
          return 0;
        }
      } else if (t.MonsterId !== i.MonsterId) {
        return (i.MonsterId - t.MonsterId) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.rRt = (t, i, s) => {
      var e;
      var a;
      var h;
      if (t instanceof ItemViewData_1.ItemViewData && i instanceof ItemViewData_1.ItemViewData || t instanceof PhantomItemData_1.PhantomItemData && i instanceof PhantomItemData_1.PhantomItemData) {
        h = ModelManager_1.ModelManager.PhantomBattleModel;
        a = t.GetUniqueId();
        e = i.GetUniqueId();
        a = h.GetPhantomBattleData(a);
        h = h.GetPhantomBattleData(e);
        if (a.GetUniqueId() !== h.GetUniqueId()) {
          return (h.GetUniqueId() - a.GetUniqueId()) * (s ? -1 : 1);
        } else {
          return 0;
        }
      } else if (t.Id !== i.Id) {
        return (i.Id - t.Id) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.lRt = (i, s, e = false) => {
      var a = i.length;
      for (let t = 0; t < a; t++) {
        if (i[t].PhantomPropId === s) {
          if (e && i[t].IfPercentage) {
            return i[t].Value;
          }
          if (!e && !i[t].IfPercentage) {
            return i[t].Value;
          }
        }
      }
      return 0;
    };
    this._Rt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 10002);
      i = this.lRt(i.MainPropMap, 10002);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.uRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 10002, true);
      i = this.lRt(i.MainPropMap, 10002, true);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.cRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 10007);
      i = this.lRt(i.MainPropMap, 10007);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.mRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 10007, true);
      i = this.lRt(i.MainPropMap, 10007, true);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.dRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 10010);
      i = this.lRt(i.MainPropMap, 10010);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.CRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 10010, true);
      i = this.lRt(i.MainPropMap, 10010, true);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.gRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 8);
      i = this.lRt(i.MainPropMap, 8);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.fRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 9);
      i = this.lRt(i.MainPropMap, 9);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.pRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 35);
      i = this.lRt(i.MainPropMap, 35);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.vRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 21);
      i = this.lRt(i.MainPropMap, 21);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.MRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 22);
      i = this.lRt(i.MainPropMap, 22);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.ERt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 23);
      i = this.lRt(i.MainPropMap, 23);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.SRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 24);
      i = this.lRt(i.MainPropMap, 24);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.yRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 25);
      i = this.lRt(i.MainPropMap, 25);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.IRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 26);
      i = this.lRt(i.MainPropMap, 26);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.TRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 27);
      i = this.lRt(i.MainPropMap, 27);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.LRt = (t, i, s) => {
      t = this.lRt(t.MainPropMap, 11);
      i = this.lRt(i.MainPropMap, 11);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.DRt = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 1);
      i = this.lRt(i.SubPropMap, 1);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.RRt = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 4, true);
      i = this.lRt(i.SubPropMap, 4, true);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.URt = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 2);
      i = this.lRt(i.SubPropMap, 2);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.ARt = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 5, true);
      i = this.lRt(i.SubPropMap, 5, true);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.PRt = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 3);
      i = this.lRt(i.SubPropMap, 3);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.xRt = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 6, true);
      i = this.lRt(i.SubPropMap, 6, true);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.wRt = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 14);
      i = this.lRt(i.SubPropMap, 14);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.BRt = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 15);
      i = this.lRt(i.SubPropMap, 15);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.bRt = (t, i, s) => 0;
    this.kRt = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 11);
      i = this.lRt(i.SubPropMap, 11);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.FRt = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 12);
      i = this.lRt(i.SubPropMap, 12);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.VRt = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 13);
      i = this.lRt(i.SubPropMap, 13);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.HRt = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 13);
      i = this.lRt(i.SubPropMap, 13);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.jRt = (t, i, s) => {
      if (t instanceof ItemViewData_1.ItemViewData && i instanceof ItemViewData_1.ItemViewData || t instanceof PhantomItemData_1.PhantomItemData && i instanceof PhantomItemData_1.PhantomItemData) {
        var e = t.GetUniqueId();
        var a = i.GetUniqueId();
        var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
        var a = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(a);
        const h = e.GetEquipRoleId() > 0 ? 1 : 0;
        const n = a.GetEquipRoleId() > 0 ? 1 : 0;
        if (h != n) {
          return (h - n) * (s ? -1 : 1);
        }
      }
      const h = t.Role > 0 ? 1 : 0;
      const n = i.Role > 0 ? 1 : 0;
      if (h !== n) {
        return (h - n) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.WRt = (t, i, s, e) => {
      if (e <= 0) {
        return 0;
      }
      if (t instanceof ItemViewData_1.ItemViewData && i instanceof ItemViewData_1.ItemViewData || t instanceof PhantomItemData_1.PhantomItemData && i instanceof PhantomItemData_1.PhantomItemData) {
        var a = t.GetUniqueId();
        var h = i.GetUniqueId();
        var a = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(a);
        var h = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(h);
        const n = a.GetEquipRoleId() === e ? 1 : 0;
        const r = h.GetEquipRoleId() === e ? 1 : 0;
        if ((n == 1 || r == 1) && n != r) {
          return (n - r) * -1;
        }
      }
      const n = t.Role === e ? 1 : 0;
      const r = i.Role === e ? 1 : 0;
      if (n !== 1 && r !== 1 || n === r) {
        return 0;
      } else {
        return (n - r) * -1;
      }
    };
    this.KRt = (t, i, s) => {
      if (t instanceof ItemViewData_1.ItemViewData && i instanceof ItemViewData_1.ItemViewData || t instanceof PhantomItemData_1.PhantomItemData && i instanceof PhantomItemData_1.PhantomItemData) {
        var e = t.GetUniqueId();
        var a = i.GetUniqueId();
        var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
        var a = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(a);
        const h = e.GetIsLock() ? 1 : 0;
        const n = a.GetIsLock() ? 1 : 0;
        if (h != n) {
          return h - n;
        }
      }
      const h = t.IsLock ? 1 : 0;
      const n = i.IsLock ? 1 : 0;
      if (h !== n) {
        return (h - n) * -1;
      } else {
        return 0;
      }
    };
    this.Z$a = (t, i, s) => this.q5a(t, i, s);
    this.eXa = (t, i, s) => this.q5a(t, i, s) * -1;
    this.QRt = (t, i, s) => {
      if (t instanceof ItemViewData_1.ItemViewData && i instanceof ItemViewData_1.ItemViewData || t instanceof PhantomItemData_1.PhantomItemData && i instanceof PhantomItemData_1.PhantomItemData) {
        var e = t.GetUniqueId();
        var a = i.GetUniqueId();
        var e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(e);
        var a = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(a);
        const h = e.GetConfig().Rarity;
        const n = a.GetConfig().Rarity;
        if (h !== n) {
          return (h - n) * (s ? 1 : -1);
        }
      }
      const h = t.Rarity;
      const n = i.Rarity;
      if (h !== n) {
        return (h - n) * (s ? 1 : -1);
      } else {
        return 0;
      }
    };
    this.JDt = (t, i, s) => {
      t = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(t.MonsterId)?.length ?? 0;
      i = ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterSkinListByMonsterId(i.MonsterId)?.length ?? 0;
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.uVs = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 7);
      i = this.lRt(i.SubPropMap, 7);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.cVs = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 8);
      i = this.lRt(i.SubPropMap, 8);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.mVs = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 9);
      i = this.lRt(i.SubPropMap, 9);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.dVs = (t, i, s) => {
      t = this.lRt(t.SubPropMap, 10);
      i = this.lRt(i.SubPropMap, 10);
      if (t !== i) {
        return (i - t) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
    this.Tw1 = (t, i, s) => this.KDt(t, i, false);
    this.bw1 = (t, i, s) => {
      var e = this.oRt(t, i, true);
      if (e !== 0) {
        return e;
      } else {
        return this.jIc(t, i, true);
      }
    };
    this.jIc = (t, i, s) => {
      var e = t;
      var a = i;
      var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(e.GetUniqueId());
      var i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(a.GetUniqueId());
      let h = 0;
      let n = 0;
      if (t) {
        h = t.GetEatFullExp();
      } else {
        var r = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
        var o = r.length;
        for (let t = 0; t < o; t++) {
          if (r[t].ItemId === e.GetConfigId()) {
            h = r[t].Exp;
            break;
          }
        }
      }
      if (i) {
        n = i.GetEatFullExp();
      } else {
        var m = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomExpItemList();
        var f = m.length;
        for (let t = 0; t < f; t++) {
          if (m[t].ItemId === a.GetConfigId()) {
            n = m[t].Exp;
            break;
          }
        }
      }
      if (h !== n) {
        return (n - h) * (s ? -1 : 1);
      } else {
        return 0;
      }
    };
  }
  q5a(t, i, s) {
    if (t instanceof ItemViewData_1.ItemViewData && i instanceof ItemViewData_1.ItemViewData || t instanceof PhantomItemData_1.PhantomItemData && i instanceof PhantomItemData_1.PhantomItemData) {
      var t = t.GetUniqueId();
      var i = i.GetUniqueId();
      var t = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(t);
      var i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(i);
      var e = CalabashDefine_1.VISION_RECOVERT_FILTER_DEPERCATE;
      var a = CalabashDefine_1.VISION_RECOVERT_FILTER_UNDEPERCATE;
      var t = t.GetIsDeprecated() ? e : a;
      var i = i.GetIsDeprecated() ? e : a;
      if (t !== i) {
        return (i - t) * (s ? 1 : -1);
      }
    }
    return 0;
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.oRt);
    this.SortMap.set(2, this.hRt);
    this.SortMap.set(3, this.KDt);
    this.SortMap.set(4, this.$Dt);
    this.SortMap.set(5, this.rRt);
    this.SortMap.set(8, this.cRt);
    this.SortMap.set(9, this.mRt);
    this.SortMap.set(6, this._Rt);
    this.SortMap.set(7, this.uRt);
    this.SortMap.set(10, this.dRt);
    this.SortMap.set(11, this.CRt);
    this.SortMap.set(12, this.gRt);
    this.SortMap.set(13, this.fRt);
    this.SortMap.set(14, this.pRt);
    this.SortMap.set(15, this.vRt);
    this.SortMap.set(16, this.MRt);
    this.SortMap.set(17, this.ERt);
    this.SortMap.set(18, this.SRt);
    this.SortMap.set(19, this.yRt);
    this.SortMap.set(20, this.IRt);
    this.SortMap.set(21, this.TRt);
    this.SortMap.set(22, this.LRt);
    this.SortMap.set(25, this.URt);
    this.SortMap.set(26, this.ARt);
    this.SortMap.set(23, this.DRt);
    this.SortMap.set(24, this.RRt);
    this.SortMap.set(27, this.PRt);
    this.SortMap.set(28, this.xRt);
    this.SortMap.set(29, this.wRt);
    this.SortMap.set(30, this.BRt);
    this.SortMap.set(31, this.bRt);
    this.SortMap.set(36, this.kRt);
    this.SortMap.set(37, this.FRt);
    this.SortMap.set(38, this.VRt);
    this.SortMap.set(39, this.HRt);
    this.SortMap.set(40, this.sRt);
    this.SortMap.set(41, this.aRt);
    this.SortMap.set(42, this.jRt);
    this.SortMap.set(43, this.WRt);
    this.SortMap.set(44, this.KRt);
    this.SortMap.set(45, this.QRt);
    this.SortMap.set(46, this.JDt);
    this.SortMap.set(47, this.uVs);
    this.SortMap.set(48, this.cVs);
    this.SortMap.set(49, this.mVs);
    this.SortMap.set(50, this.dVs);
    this.SortMap.set(51, this.Z$a);
    this.SortMap.set(52, this.eXa);
    this.SortMap.set(53, this.Tw1);
    this.SortMap.set(54, this.bw1);
    this.SortMap.set(55, this.jIc);
  }
}
exports.PhantomSort = PhantomSort;
//# sourceMappingURL=PhantomSort.js.map