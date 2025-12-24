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
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
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
    this.yNf = new Set();
    this.qbi = 0;
    this.qdi = (e, t) => {
      var r;
      var o;
      if (this.yNf.has(e) && (e = ConfigManager_1.ConfigManager.CollectItemConfig.GetDragonPoolConfigByCoreId(e)) && e.CanLevelUpTips && e.CanLevelUpTips.length === MingSuDefine_1.PLOTPARAM_NUM && this.hxf(e.Id)) {
        r = e.CanLevelUpTips[0];
        o = Number(e.CanLevelUpTips[1]);
        e = Number(e.CanLevelUpTips[2]);
        ControllerHolder_1.ControllerHolder.FlowController.StartFlow(r, o, e);
      }
    };
  }
  OnInit() {
    this.InitData();
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    var e = ConfigManager_1.ConfigManager.CollectItemConfig.GetAllDragonPoolConfigList();
    if (e !== undefined) {
      for (const t of e) {
        this.yNf.add(t.CoreId);
      }
    }
    return true;
  }
  OnClear() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
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
  RefreshDragonPoolActiveStatus(e, t) {
    e = this.wbi.get(e);
    if (e) {
      e.SetDragonPoolState(t);
    }
  }
  RefreshDragonPoolDropItems(e) {
    var t = this.wbi.get(e.k7n);
    if (t !== undefined) {
      t.SetDropItemList(e.XSs);
    }
  }
  RefreshDarkCoastGuardInfo(e, t, r) {
    e = this.wbi.get(e);
    if (e !== undefined) {
      e.RefreshLevelDataState(t, r);
    }
  }
  RefreshDragonPoolLevel(e, t) {
    e = this.wbi.get(e);
    if (e) {
      e.SetDragonPoolLevel(t);
    }
  }
  RefreshDragonPoolHadCoreCount(e, t) {
    e = this.wbi.get(e);
    if (e) {
      e.SetHadCoreCount(t);
    }
  }
  RefreshDragonPoolLevelGains(e, t) {
    e = this.wbi.get(e);
    if (e) {
      e.SetLevelGainList(t);
    }
  }
  UpdateDragonPoolInfoMap(e) {
    for (const t of e) {
      this.DoUpdateDragonPoolInfoMap(t);
    }
  }
  DoUpdateDragonPoolInfoMap(e) {
    this.RefreshDragonPoolActiveStatus(e.k7n, e.HE_);
    this.RefreshDragonPoolLevel(e.k7n, e.F6n);
    this.RefreshDragonPoolHadCoreCount(e.k7n, e.KSs);
  }
  InitMingSuMap() {
    var e = DragonPoolAll_1.configDragonPoolAll.GetConfigList();
    if (e) {
      for (const r of e) {
        var t = this.SQa(r.Id);
        this.wbi.set(r.Id, t);
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
  GetTargetDragonPoolLevelNeedCoreById(e, t) {
    e = this.GetDragonPoolInstanceById(e);
    if (e) {
      return e.GetNeedCoreCount(t);
    } else {
      return 0;
    }
  }
  GetTargetDragonPoolLevelRewardById(e, t) {
    e = this.GetDragonPoolInstanceById(e);
    if (e) {
      e = e.GetDropItemList();
      if (e && e.length > t) {
        e = e[t].bMs;
        if (!e) {
          return;
        }
        var r = new Array();
        for (const n of e) {
          var o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(n.L8n);
          r.push({
            ItemInfo: o,
            Count: n.n9n
          });
        }
        return r;
      }
    }
  }
  GetTargetDragonPoolLevelRewardByIdEx(e, t) {
    e = this.GetDragonPoolInstanceById(e);
    if (e) {
      e = e.GetDropItemList();
      if (e && e.length > t) {
        e = e[t].bMs;
        if (!e) {
          return;
        }
        var r = new Array();
        for (const o of e) {
          r.push([{
            ItemId: o.L8n,
            IncId: 0
          }, o.n9n]);
        }
        return r;
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
  GetDarkCoastDeliveryDataByLevelPlayId(t) {
    return this.GetDragonPoolInstanceById(MingSuDefine_1.DARK_COAST_POOL_CONFIG_ID).GetLevelDataList().find(e => e.Config.LevelPlayId === t);
  }
  CheckUp(e) {
    let t = this.GetTargetDragonPoolLevelById(e);
    var r = this.GetDragonPoolInstanceById(e).GetGoalList();
    var o = this.GetTargetDragonPoolMaxLevelById(e);
    var n = this.GetTargetDragonPoolCoreCountById(e);
    let i = 0;
    for (; t < o; t++) {
      var a = r[t];
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
    var t = this.GetTargetDragonPoolLevelById(e);
    var e = this.GetDragonPoolInstanceById(e);
    return !!e && e.GetNeedCoreCount(t) <= e.GetHadCoreCount() + this.GetItemCount(e.GetCoreId());
  }
  GetCanUpPoolId() {
    let e = 0;
    for (var [t, r] of this.wbi) {
      var o = r.GetDragonPoolLevel();
      var o = r.GetNeedCoreCount(o) - r.GetHadCoreCount();
      var r = this.GetTargetDragonPoolCoreById(t);
      if (o <= this.GetItemCount(r)) {
        e = t;
        break;
      }
    }
    return e;
  }
  Gbi(e) {
    var t = [];
    t.push(e.CoreName, e.UseCoreCount.toString());
    this.Bbi = new ConfirmBoxDefine_1.ConfirmBoxDataNew(9);
    this.Bbi.SetTextArgs(...t);
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
  hxf(e) {
    var t = this.GetDragonPoolInstanceById(e);
    var r = t.GetGoalList();
    var o = this.GetTargetDragonPoolCoreCountById(e) + this.GetItemCount(t.GetCoreId());
    var n = this.GetTargetDragonPoolMaxLevelById(e);
    let i = 0;
    for (let e = 0; e < n; e++) {
      var a = r[e];
      if (o === (i += a)) {
        return true;
      }
    }
    return false;
  }
}
exports.MingSuModel = MingSuModel;
//# sourceMappingURL=MingSuModel.js.map