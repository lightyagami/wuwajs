"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookRewardPopData = exports.CookModel = undefined;
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
const CookController_1 = require("./CookController");
class CookModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Xqt = -1;
    this.LastExp = 0;
    this.CurrentInteractCreatureDataLongId = undefined;
    this.$qt = 0;
    this.Yqt = 0;
    this.Jqt = undefined;
    this.zqt = new Map();
    this.Zqt = undefined;
    this.eGt = (t, e) => {
      var i = t.IsUnLock ? 1 : 0;
      var o = e.IsUnLock ? 1 : 0;
      if (i == 1 && i == o) {
        if (t.IsMachining === e.IsMachining) {
          if (t.Quality === e.Quality) {
            return t.ItemId - e.ItemId;
          } else {
            return t.Quality - e.Quality;
          }
        } else {
          return e.IsMachining - t.IsMachining;
        }
      } else if (i == 0 && i == o) {
        if (t.Quality === e.Quality) {
          return t.ItemId - e.ItemId;
        } else {
          return t.Quality - e.Quality;
        }
      } else {
        return o - i;
      }
    };
    this.tGt = 0;
    this.iGt = undefined;
    this.oGt = undefined;
    this.rGt = undefined;
    this.nGt = undefined;
    this.sGt = undefined;
    this.aGt = undefined;
    this.hGt = undefined;
    this.lGt = (t, e) => t.IsBuff === e.IsBuff ? t.RoleId - e.RoleId : t.IsBuff ? -1 : 1;
    this._Gt = 0;
    this.E0 = undefined;
    this.uGt = undefined;
  }
  OnInit() {
    return true;
  }
  OnClear() {
    this.ClearCookRoleItemDataList();
    return true;
  }
  set CurrentCookViewType(t) {
    this.$qt = t;
  }
  get CurrentCookViewType() {
    return this.$qt;
  }
  set CurrentCookListType(t) {
    this.Yqt = t;
  }
  get CurrentCookListType() {
    return this.Yqt;
  }
  SaveLimitRefreshTime(t) {
    this.Xqt = MathUtils_1.MathUtils.LongToNumber(t) * TimeUtil_1.TimeUtil.Millisecond;
  }
  CheckCanCook(t) {
    return this.CheckLimitCount(t) && this.CheckCoinEnough(t) && this.CheckMaterialEnough(t);
  }
  CheckLimitCount(t) {
    t = this.GetCookingDataById(t);
    return t.LimitTotalCount <= 0 || t.CookCount < t.LimitTotalCount;
  }
  CheckCoinEnough(t) {
    t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(t);
    return ModelManager_1.ModelManager.InventoryModel.CheckIsCoinEnough(CookController_1.CookController.CookCoinId, t.ConsumeItems);
  }
  CheckMaterialEnough(t) {
    for (const i of ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(t).ConsumeItems) {
      var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i.ItemId);
      if (i.Count > e) {
        return false;
      }
    }
    return true;
  }
  CheckHasItemTimeoutStateChangedCore() {
    var t;
    var e;
    var i;
    var o;
    var r;
    var s;
    var n = this.Jqt;
    var a = this.zqt;
    for ([t, e] of a) {
      a.set(t, e - 1);
    }
    let h = false;
    for (const l of n) {
      if (l.ExistStartTime !== 0 && l.ExistEndTime !== 0) {
        i = l.ItemId;
        o = TimeUtil_1.TimeUtil.IsInTimeSpan(l.ExistStartTime, l.ExistEndTime) ? 1 : 3;
        if (!a.has(i) || a.get(i) !== o - 1) {
          h = true;
        }
        a.set(i, o);
      }
    }
    for ([r, s] of a) {
      if (s === 0 || s === 2) {
        a.delete(r);
      }
    }
    return h;
  }
  CreateCookingDataList(t) {
    this.Jqt ||= new Array();
    this.Jqt.length = 0;
    var e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormula() ?? [];
    var i = new Map();
    for (const a of e) {
      var o = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(a.FoodItemId);
      const r = {
        MainType: 0,
        SubType: 60000,
        UniqueId: 0,
        ItemId: a.Id,
        CookCount: 0,
        IsNew: false,
        LastRoleId: undefined,
        IsCook: 0,
        Quality: o.QualityId,
        EffectType: a.TypeId,
        DataId: a.FoodItemId,
        LimitTotalCount: 0,
        LimitedCount: 0,
        ExistStartTime: 0,
        ExistEndTime: 0,
        IsUnLock: false
      };
      i.set(r.ItemId, r);
      this.Jqt.push(r);
    }
    let r = undefined;
    for (const h of t) {
      var s = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(h.s5n);
      var n = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(s.FoodItemId);
      if (i.has(h.s5n)) {
        (r = i.get(h.s5n)).CookCount = h.DVn;
        r.IsNew = ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey, h.s5n);
        r.LastRoleId = h.cPs;
        r.IsCook = 0;
        r.LimitTotalCount = h.dPs;
        r.LimitedCount = h.mPs;
        r.DataId = s.FoodItemId;
        r.ExistStartTime = MathUtils_1.MathUtils.LongToNumber(h.CPs) * TimeUtil_1.TimeUtil.Millisecond;
        r.ExistEndTime = MathUtils_1.MathUtils.LongToNumber(h.gPs) * TimeUtil_1.TimeUtil.Millisecond;
        r.IsUnLock = true;
      } else {
        r = {
          MainType: 0,
          SubType: 0,
          UniqueId: 0,
          ItemId: h.s5n,
          CookCount: h.DVn,
          IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey, h.s5n),
          LastRoleId: h.cPs,
          IsCook: 0,
          Quality: n.QualityId,
          EffectType: s.TypeId,
          DataId: s.FoodItemId,
          LimitTotalCount: h.dPs,
          LimitedCount: h.mPs,
          ExistStartTime: MathUtils_1.MathUtils.LongToNumber(h.CPs) * TimeUtil_1.TimeUtil.Millisecond,
          ExistEndTime: MathUtils_1.MathUtils.LongToNumber(h.gPs) * TimeUtil_1.TimeUtil.Millisecond,
          IsUnLock: true
        };
        this.Jqt.push(r);
      }
      r.IsCook = this.CheckCanCook(h.s5n) ? 1 : 0;
    }
  }
  UpdateCookingDataList(t) {
    if (!this.Jqt) {
      this.CreateCookingDataList(t);
    }
    for (const i of t) {
      for (const o of this.Jqt) {
        var e;
        if (i.s5n === o.ItemId) {
          o.CookCount = i.DVn;
          o.LimitedCount = i.mPs;
          if (!o.IsUnLock) {
            e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(i.s5n);
            o.IsNew = true;
            o.IsUnLock = true;
            o.DataId = e.FoodItemId;
            o.ExistStartTime = MathUtils_1.MathUtils.LongToNumber(i.CPs) * TimeUtil_1.TimeUtil.Millisecond;
            o.ExistEndTime = MathUtils_1.MathUtils.LongToNumber(i.gPs) * TimeUtil_1.TimeUtil.Millisecond;
            ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey, i.s5n);
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FormulaLearned");
          }
          o.IsCook = this.CheckCanCook(i.s5n) ? 1 : 0;
        }
      }
    }
  }
  UpdateCookingDataByServerConfig(t) {
    for (const r of t) {
      var e = MathUtils_1.MathUtils.LongToNumber(r.CPs) * TimeUtil_1.TimeUtil.Millisecond;
      var i = MathUtils_1.MathUtils.LongToNumber(r.gPs) * TimeUtil_1.TimeUtil.Millisecond;
      var o = this.Jqt.findIndex(t => t.ItemId === r.s5n);
      if (o !== -1) {
        this.Jqt[o].ExistStartTime = e;
        this.Jqt[o].ExistEndTime = i;
      }
    }
  }
  UnlockCookMenuData(t) {
    var e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(t);
    let i = 0;
    for (; i < this.Jqt.length && (this.Jqt[i].SubType !== 60000 || this.Jqt[i].ItemId !== e.FormulaItemId); i++);
    this.Jqt.splice(i, 1);
  }
  GetCookingDataList() {
    return this.Jqt;
  }
  GetCookingDataById(t) {
    for (const e of this.Jqt) {
      if (t === e.ItemId) {
        return e;
      }
    }
  }
  GetCookRoleId(t) {
    t = this.GetCookingDataById(t);
    if (t?.LastRoleId) {
      return t.LastRoleId;
    } else {
      return ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId() ?? 1502;
    }
  }
  CreateMachiningDataList() {
    this.Zqt ||= new Array();
    for (const e of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessed()) {
      var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e.FinalItemId);
      var t = {
        MainType: 1,
        ItemId: e.Id,
        IsUnLock: false,
        InteractiveList: [],
        UnlockList: [],
        IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey, e.Id),
        IsMachining: CookController_1.CookController.CheckCanProcessed(e.Id) ? 1 : 0,
        Quality: t.QualityId
      };
      this.Zqt.push(t);
    }
    this.Zqt.sort(this.eGt);
  }
  UpdateMachiningDataList(t, e) {
    for (const s of t) {
      for (const n of this.Zqt) {
        if (s.s5n === n.ItemId) {
          let t = [];
          var i = [];
          var o = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(s.s5n);
          if (s.fPs) {
            for (const a of o.ConsumeItemsId) {
              i.push(a.ItemId);
            }
            t = o.InterationId;
          } else {
            for (const h of t = s.vPs) {
              var r = o.InterationId.indexOf(h);
              if (r >= 0) {
                r = o.ConsumeItemsId[r].ItemId;
                i.push(r);
              }
            }
          }
          n.IsUnLock = t.length === o.InterationId.length;
          n.InteractiveList = t;
          n.UnlockList = i;
          n.IsMachining = CookController_1.CookController.CheckCanProcessed(s.s5n) ? 1 : 0;
          if (e && (n.IsNew = e, ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.CookerLevelKey, s.s5n), s.fPs)) {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FormulaLearned");
          }
          break;
        }
      }
    }
    this.Zqt.sort(this.eGt);
  }
  GetMachiningDataList() {
    return this.Zqt;
  }
  GetMachiningDataById(t) {
    for (const e of this.Zqt) {
      if (t === e.ItemId) {
        return e;
      }
    }
  }
  set SelectedCookerLevel(t) {
    this.tGt = t;
  }
  get SelectedCookerLevel() {
    return this.tGt;
  }
  CreateCookerInfo(t) {
    this.UpdateCookerInfo(t);
    this.iGt = new Map();
    for (const e of ConfigManager_1.ConfigManager.CookConfig.GetCookLevel()) {
      this.iGt.set(e.Id, e);
    }
  }
  UpdateCookerInfo(t) {
    let e = 0;
    if (this.oGt) {
      this.LastExp = this.oGt.TotalProficiencys;
      e = t.uPs - this.oGt.TotalProficiencys;
    }
    this.oGt = {
      CookingLevel: t._Ps,
      TotalProficiencys: t.uPs,
      AddExp: e
    };
  }
  GetCookerInfo() {
    return this.oGt;
  }
  CleanAddExp() {
    this.oGt.AddExp = 0;
  }
  GetCookLevelByLevel(t) {
    return this.iGt.get(t);
  }
  GetCookerMaxLevel() {
    return this.iGt.size;
  }
  GetSumExpByLevel(t) {
    var e = this.GetCookerMaxLevel();
    let i = t + 1;
    if (i > e) {
      i = e;
    }
    return this.GetCookLevelByLevel(i).Completeness;
  }
  GetDropIdByLevel(t) {
    t += 1;
    if (this.GetCookerMaxLevel() < t) {
      return -1;
    } else {
      return this.GetCookLevelByLevel(t).DropIds;
    }
  }
  CreateTmpMachiningItemList(t) {
    this.rGt ||= new Array();
    this.rGt.length = 0;
    this.nGt ||= new Array();
    this.nGt.length = 0;
    this.sGt ||= new Map();
    this.sGt.clear();
    this.rGt.length = 0;
    this.nGt.length = 0;
    for (const e of t) {
      this.rGt.push(e);
      if (!e.K6n) {
        this.nGt.push(e);
      }
    }
  }
  UpdateTmpMachiningItemList(t, e) {
    this.rGt[t] = e;
  }
  SubOneTmpMachiningItemSelectNum(e) {
    if (this.rGt[e]) {
      e = this.rGt[e];
      if (this.sGt.has(e.L8n)) {
        var i = this.sGt.get(e.L8n) - 1;
        this.sGt.set(e.L8n, i);
        if (!(i > 0)) {
          this.sGt.delete(e.L8n);
          function o(t, e) {
            t.K6n = e.K6n;
            t.L8n = e.L8n;
          }
          var i = {
            K6n: e.K6n = false,
            L8n: 0,
            UVn: 0
          };
          o(i, e);
          let t = this.nGt.indexOf(e);
          for (; t < this.nGt.length - 1; t++) {
            var r = this.nGt[t + 1];
            o(this.nGt[t], r);
          }
          o(this.nGt[t], i);
        }
      }
    }
  }
  ClearTmpMachiningItemList() {
    this.rGt.length = 0;
    this.nGt.length = 0;
    this.sGt.clear();
  }
  SetEmptyBySelectedItem(t, e, i, o) {
    t = this.nGt[t];
    if (t) {
      if (i && (t.L8n = i, o)) {
        this.sGt.set(i, o);
      }
      t.K6n = e;
    }
  }
  IsSelectNumFromEmpty(t) {
    let e = false;
    let i = 0;
    if (this.sGt.has(t)) {
      e = true;
      i = this.sGt.get(t);
    }
    return [e, i];
  }
  CheckCanProcessedNew(t) {
    if (this.sGt.size === 0) {
      return CookController_1.CookController.CheckCanProcessed(t);
    }
    let e = true;
    for (const o of this.rGt) {
      if (this.sGt.has(o.L8n)) {
        var i = this.sGt.get(o.L8n);
        if (o.UVn > i) {
          e = false;
          break;
        }
      }
    }
    return e;
  }
  GetTmpMachiningItemList() {
    return this.rGt;
  }
  GetEmptyMachiningItemListNum() {
    return this.nGt.length;
  }
  set CurrentCookRoleId(t) {
    this.aGt = t;
  }
  get CurrentCookRoleId() {
    return this.aGt;
  }
  UpdateCookRoleItemDataList() {
    this.hGt ||= new Array();
    this.hGt.length = 0;
    for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleList()) {
      this.hGt.push({
        RoleId: t.GetRoleId(),
        RoleName: t.GetRoleRealName(),
        RoleIcon: t.GetRoleConfig().RoleHeadIcon,
        IsBuff: false,
        ItemId: 0
      });
    }
  }
  ClearCookRoleItemDataList() {
    this.hGt = undefined;
  }
  GetCookRoleItemDataList(t) {
    if (!this.hGt) {
      this.UpdateCookRoleItemDataList();
    }
    for (const e of this.hGt) {
      e.ItemId = t;
      e.IsBuff = CookController_1.CookController.CheckIsBuff(e.RoleId, t);
    }
    return this.hGt.sort(this.lGt);
  }
  GetCookMaterialList(t, e) {
    var i = new Array();
    if (e === 0) {
      for (const r of ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(t).ConsumeItems) {
        i.push({
          L8n: r.ItemId,
          UVn: r.Count,
          K6n: true
        });
      }
    } else {
      var o = this.GetMachiningDataById(t);
      for (const s of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(t).ConsumeItemsId) {
        i.push({
          L8n: s.ItemId,
          UVn: s.Count,
          K6n: o.UnlockList.includes(s.ItemId)
        });
      }
    }
    return i;
  }
  GetMachiningMaterialStudyList(t) {
    var e = new Array();
    var i = this.GetMachiningDataById(t);
    for (const r of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(t).ConsumeItemsId) {
      var o = i.UnlockList.includes(r.ItemId);
      e.push({
        L8n: o ? r.ItemId : 0,
        UVn: r.Count,
        K6n: o
      });
    }
    return e;
  }
  GetRefreshLimitTime() {
    var t;
    if (this.Xqt !== 0) {
      t = TimeUtil_1.TimeUtil.GetServerTime();
      return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(this.Xqt - t).CountDownText;
    }
  }
  GetRefreshLimitTimeValue() {
    var t;
    if (this.Xqt <= 0) {
      return 1;
    } else {
      t = TimeUtil_1.TimeUtil.GetServerTime();
      return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat(this.Xqt - t).RemainingTime;
    }
  }
  set CurrentFixId(t) {
    this._Gt = t;
  }
  get CurrentFixId() {
    return this._Gt;
  }
  set CurrentEntityId(t) {
    this.E0 = t;
  }
  get CurrentEntityId() {
    return this.E0;
  }
  UpdateCookItemList(t) {
    this.uGt ||= new Array();
    this.uGt.length = 0;
    for (const e of t) {
      this.uGt.push({
        ItemId: e.L8n,
        ItemNum: e.UVn
      });
    }
  }
  GetCookItemList() {
    return this.uGt;
  }
}
exports.CookModel = CookModel;
class CookRewardPopData extends UiPopViewData_1.UiPopViewData {
  constructor() {
    super(...arguments);
    this.CookRewardPopType = 0;
  }
}
exports.CookRewardPopData = CookRewardPopData;
//# sourceMappingURL=CookModel.js.map