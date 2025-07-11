"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MingSuModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const DragonPoolAll_1 = require("../../../Core/Define/ConfigQuery/DragonPoolAll");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const DarkCoastDeliveryData_1 = require("./DarkCoastDeliveryData");
const MingSuDefine_1 = require("./MingSuDefine");
const MingSuInstance_1 = require("./MingSuInstance");
class MingSuModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.wbi = new Map();
    this.Bbi = undefined;
    this.bbi = 0;
    this.UpgradeFlow = undefined;
    this.CurrentPreviewLevel = 0;
    this.qAr = 0;
    this.CurrentInteractCreatureDataLongId = undefined;
    this.qbi = 0;
  }
  OnInit() {
    this.InitData();
    return true;
  }
  InitData() {
    this.InitMingSuMap();
  }
  SetCurrentDragonPoolId(e) {
    this.bbi = e;
  }
  GetCurrentDragonPoolId() {
    return this.bbi;
  }
  SetCollectItemConfigId(e) {
    this.qAr = e;
  }
  GetCollectItemConfigId() {
    return this.qAr;
  }
  RefreshDragonPoolActiveStatus(e, r) {
    e = this.wbi.get(e);
    if (e) {
      e.SetDragonPoolState(r);
    }
  }
  RefreshDragonPoolDropItems(e) {
    var r = this.wbi.get(e.k7n);
    if (r !== undefined) {
      r.SetDropItemList(e.XSs);
    }
  }
  RefreshDarkCoastGuardInfo(e, r, t) {
    e = this.wbi.get(e);
    if (e !== undefined) {
      e.RefreshLevelDataState(r, t);
    }
  }
  RefreshDragonPoolLevel(e, r) {
    e = this.wbi.get(e);
    if (e) {
      e.SetDragonPoolLevel(r);
    }
  }
  RefreshDragonPoolHadCoreCount(e, r) {
    e = this.wbi.get(e);
    if (e) {
      e.SetHadCoreCount(r);
    }
  }
  RefreshDragonPoolLevelGains(e, r) {
    e = this.wbi.get(e);
    if (e) {
      e.SetLevelGainList(r);
    }
  }
  UpdateDragonPoolInfoMap(e) {
    for (const r of e) {
      this.DoUpdateDragonPoolInfoMap(r);
    }
  }
  DoUpdateDragonPoolInfoMap(e) {
    this.RefreshDragonPoolActiveStatus(e.k7n, e.WSs);
    this.RefreshDragonPoolLevel(e.k7n, e.F6n);
    this.RefreshDragonPoolHadCoreCount(e.k7n, e.KSs);
  }
  InitMingSuMap() {
    var e = DragonPoolAll_1.configDragonPoolAll.GetConfigList();
    if (e) {
      for (const t of e) {
        var r = this.SQa(t.Id);
        this.wbi.set(t.Id, r);
      }
    } else if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("MingSuTi", 58, "龙池配置读取失败", ["dragonPoolConfigList", e]);
    }
  }
  SQa(e) {
    return new (e === MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID ? DarkCoastDeliveryData_1.DarkCoastDeliveryData : MingSuInstance_1.MingSuInstance)(e);
  }
  GetDragonPoolInstanceById(e) {
    return this.wbi.get(e);
  }
  GetTargetDragonPoolLevelById(e) {
    e = this.GetDragonPoolInstanceById(e);
    if (e) {
      return e.GetDragonPoolLevel();
    } else {
      return 0;
    }
  }
  GetTargetDragonPoolMaxLevelById(e) {
    e = this.GetDragonPoolInstanceById(e);
    if (e) {
      return e.GetDragonPoolMaxLevel();
    } else {
      return 0;
    }
  }
  GetTargetDragonPoolCoreCountById(e) {
    e = this.GetDragonPoolInstanceById(e);
    if (e) {
      return e.GetHadCoreCount();
    } else {
      return 0;
    }
  }
  GetTargetDragonPoolLevelNeedCoreById(e, r) {
    e = this.GetDragonPoolInstanceById(e);
    if (e) {
      return e.GetNeedCoreCount(r);
    } else {
      return 0;
    }
  }
  GetTargetDragonPoolLevelRewardById(e, r) {
    e = this.GetDragonPoolInstanceById(e);
    if (e) {
      e = e.GetDropItemList();
      if (e && e.length > r) {
        e = e[r].bMs;
        if (!e) {
          return;
        }
        var t = new Array();
        for (const n of e) {
          var o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(n.L8n);
          t.push({
            ItemInfo: o,
            Count: n.n9n
          });
        }
        return t;
      }
    }
  }
  GetTargetDragonPoolLevelRewardByIdEx(e, r) {
    e = this.GetDragonPoolInstanceById(e);
    if (e) {
      e = e.GetDropItemList();
      if (e && e.length > r) {
        e = e[r].bMs;
        if (!e) {
          return;
        }
        var t = new Array();
        for (const o of e) {
          t.push([{
            ItemId: o.L8n,
            IncId: 0
          }, o.n9n]);
        }
        return t;
      }
    }
  }
  GetTargetDragonPoolCoreById(e) {
    e = this.GetDragonPoolInstanceById(e);
    if (e) {
      return e.GetCoreId();
    } else {
      return 0;
    }
  }
  GetTargetDragonPoolActiveById(e) {
    e = this.GetDragonPoolInstanceById(e);
    if (e) {
      return e.GetDragonPoolState();
    } else {
      return 0;
    }
  }
  GetItemCount(e) {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
  }
  GetItemInfoById(e) {
    return ItemInfoById_1.configItemInfoById.GetConfig(e);
  }
  GetDarkCoastDeliveryDataByLevelPlayId(r) {
    return this.GetDragonPoolInstanceById(MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID).GetLevelDataList().find(e => e.Config.LevelPlayId === r);
  }
  CheckUp(e) {
    let r = this.GetTargetDragonPoolLevelById(e);
    var t = this.GetDragonPoolInstanceById(e).GetGoalList();
    var o = this.GetTargetDragonPoolMaxLevelById(e);
    var n = this.GetTargetDragonPoolCoreCountById(e);
    let i = 0;
    for (; r < o; r++) {
      var a = t[r];
      i += a;
    }
    i -= n;
    var n = this.GetTargetDragonPoolCoreById(e);
    var e = this.GetItemCount(n);
    var n = this.GetItemInfoById(n);
    return e !== 0 && (n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(n.Name), this.Gbi({
      UseCoreCount: e >= i ? i : e,
      CoreName: n ?? ""
    }), true);
  }
  CanLevelUp(e) {
    var r = this.GetTargetDragonPoolLevelById(e);
    var e = this.GetDragonPoolInstanceById(e);
    return !!e && e.GetNeedCoreCount(r) <= e.GetHadCoreCount() + this.GetItemCount(e.GetCoreId());
  }
  GetCanUpPoolId() {
    let e = 0;
    for (var [r, t] of this.wbi) {
      var o = t.GetDragonPoolLevel();
      var o = t.GetNeedCoreCount(o) - t.GetHadCoreCount();
      var t = this.GetTargetDragonPoolCoreById(r);
      if (o <= this.GetItemCount(t)) {
        e = r;
        break;
      }
    }
    return e;
  }
  Gbi(e) {
    var r = [];
    r.push(e.CoreName, e.UseCoreCount.toString());
    this.Bbi = new ConfirmBoxDefine_1.ConfirmBoxDataNew(9);
    this.Bbi.SetTextArgs(...r);
  }
  GetUpData() {
    return this.Bbi;
  }
  set MingSuLastLevel(e) {
    this.qbi = e;
  }
  get MingSuLastLevel() {
    return this.qbi;
  }
}
exports.MingSuModel = MingSuModel;
//# sourceMappingURL=MingSuModel.js.map