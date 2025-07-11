"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgingModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ForgingController_1 = require("./ForgingController");
class ForgingModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.Xqt = -1;
    this.CurrentInteractCreatureDataLongId = undefined;
    this.nLi = 0;
    this.ForgingEnterFlow = undefined;
    this.ForgingSuccessFlow = undefined;
    this.ForgingFailFlow = undefined;
    this.sLi = undefined;
    this.XQs = new Map();
    this.aLi = undefined;
    this.hLi = 0;
    this.lLi = undefined;
    this.fTi = (t, e) => t.IsBuff === e.IsBuff ? t.RoleId - e.RoleId : t.IsBuff ? -1 : 1;
  }
  SaveLimitRefreshTime(t) {
    this.Xqt = MathUtils_1.MathUtils.LongToNumber(t) * TimeUtil_1.TimeUtil.Millisecond;
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
  OnInit() {
    this.ForgingEnterFlow = {
      StateId: CommonParamById_1.configCommonParamById.GetIntConfig("ForgingEnterStateId"),
      FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig("ForgingEnterFlowListName"),
      FlowId: CommonParamById_1.configCommonParamById.GetIntConfig("ForgingEnterFlowId")
    };
    this.ForgingSuccessFlow = {
      StateId: CommonParamById_1.configCommonParamById.GetIntConfig("ForgingSuccessStateId"),
      FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig("ForgingSuccessFlowListName"),
      FlowId: CommonParamById_1.configCommonParamById.GetIntConfig("ForgingSuccessFlowId")
    };
    this.ForgingFailFlow = {
      StateId: CommonParamById_1.configCommonParamById.GetIntConfig("ForgingFailStateId"),
      FlowListName: CommonParamById_1.configCommonParamById.GetStringConfig("ForgingFailFlowListName"),
      FlowId: CommonParamById_1.configCommonParamById.GetIntConfig("ForgingFailFlowId")
    };
    return true;
  }
  OnClear() {
    this.ForgingEnterFlow = undefined;
    this.ForgingSuccessFlow = undefined;
    return !(this.ForgingFailFlow = undefined);
  }
  set CurrentForgingViewType(t) {
    this.nLi = t;
  }
  get CurrentForgingViewType() {
    return this.nLi;
  }
  CreateForgingDataList() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Forging", 49, "初始化锻造数据相关数据列表");
    }
    this.sLi ||= new Array();
    this.sLi.length = 0;
    for (const o of ConfigManager_1.ConfigManager.ForgingConfig.GetForgeList()) {
      var t = o.Id;
      var e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(t);
      var i = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(e.ItemId);
      var i = {
        MainType: 0,
        ItemId: t,
        IsUnlock: 0,
        FormulaItemId: e.FormulaItemId,
        UniqueId: 0,
        IsNew: ModelManager_1.ModelManager.NewFlagModel.HasNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.ForgingLevelKey, t),
        IsForging: 0,
        Quality: i.QualityId,
        LastRoleId: 0,
        WeaponType: i.WeaponType,
        ExistStartTime: 0,
        ExistEndTime: 0,
        MadeCountInLimitTime: 0,
        TotalMakeCountInLimitTime: 0,
        SortId: e.SortId
      };
      this.sLi.push(i);
      this.XQs.set(t, i);
      i.IsForging = this.CheckCanForging(t) ? 1 : 0;
    }
  }
  YQs(e) {
    var t = this.sLi.findIndex(t => t.ItemId === e);
    this.sLi.splice(t, 1);
    this.XQs.delete(e);
  }
  CheckCanForging(t) {
    t = this.GetForgingDataById(t);
    return this.CheckUnlock(t) && this.CheckLimitCount(t) && this.CheckCoinEnough(t.ItemId) && this.CheckMaterialEnough(t.ItemId);
  }
  CheckCoinEnough(t) {
    t = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(t);
    return ModelManager_1.ModelManager.InventoryModel.CheckIsCoinEnough(ForgingController_1.ForgingController.ForgingCostId, t.ConsumeItems);
  }
  CheckLimitCount(t) {
    return t.TotalMakeCountInLimitTime <= 0 || t.MadeCountInLimitTime < t.TotalMakeCountInLimitTime;
  }
  CheckUnlock(t) {
    return t.IsUnlock > 0;
  }
  CheckMaterialEnough(t) {
    for (const i of ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(t).ConsumeItems) {
      var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i.ItemId);
      if (i.Count > e) {
        return false;
      }
    }
    return true;
  }
  UpdateForgingDataList(t) {
    for (const o of t) {
      var e = o.s5n;
      var i = this.GetForgingDataById(e);
      if (i) {
        i.LastRoleId = o.cPs ?? 0;
        i.ExistStartTime = MathUtils_1.MathUtils.LongToNumber(o.CPs) * TimeUtil_1.TimeUtil.Millisecond;
        i.ExistEndTime = MathUtils_1.MathUtils.LongToNumber(o.gPs) * TimeUtil_1.TimeUtil.Millisecond;
        i.MadeCountInLimitTime = o.TUs;
        i.TotalMakeCountInLimitTime = o.dPs;
        i.IsUnlock = 1;
        i.IsForging = this.CheckCanForging(e) ? 1 : 0;
      }
    }
  }
  UpdateForgingByServerConfig(t) {
    for (const n of t) {
      var e = MathUtils_1.MathUtils.LongToNumber(n.CPs) * TimeUtil_1.TimeUtil.Millisecond;
      var i = MathUtils_1.MathUtils.LongToNumber(n.gPs) * TimeUtil_1.TimeUtil.Millisecond;
      var o = n.s5n;
      var r = this.GetForgingDataById(o);
      if (r) {
        if (e == 0 && i == 0 || TimeUtil_1.TimeUtil.IsInTimeSpan(e, i)) {
          r.ExistStartTime = e;
          r.ExistEndTime = i;
        } else {
          this.YQs(o);
        }
      }
    }
  }
  GetForgingDataList() {
    return this.sLi;
  }
  GetForgingDataById(t) {
    return this.XQs.get(t);
  }
  GetForgingRoleId(t) {
    t = this.GetForgingDataById(t);
    if (t?.LastRoleId) {
      return t.LastRoleId;
    } else {
      return ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerRoleId();
    }
  }
  GetForgingMaterialList(t) {
    var e = new Array();
    for (const i of ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(t).ConsumeItems) {
      e.push({
        L8n: i.ItemId,
        UVn: i.Count,
        K6n: true
      });
    }
    return e;
  }
  UpdateForgingItemList(t) {
    this.aLi ||= new Array();
    this.aLi.length = 0;
    for (const e of t) {
      this.aLi.push({
        ItemId: e.L8n,
        ItemNum: e.UVn
      });
    }
  }
  GetForgingItemList() {
    return this.aLi;
  }
  set CurrentForgingRoleId(t) {
    this.hLi = t;
  }
  get CurrentForgingRoleId() {
    return this.hLi;
  }
  UpdateHelpRoleItemDataList() {
    this.lLi ||= new Array();
    this.lLi.length = 0;
    for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleList()) {
      this.lLi.push({
        RoleId: t.GetRoleId(),
        RoleName: t.GetRoleRealName(),
        RoleIcon: t.GetRoleConfig().RoleHeadIcon,
        IsBuff: false,
        ItemId: 0
      });
    }
  }
  GetHelpRoleItemDataList(t) {
    if (!this.lLi) {
      this.UpdateHelpRoleItemDataList();
    }
    for (const e of this.lLi) {
      e.ItemId = t;
      e.IsBuff = ForgingController_1.ForgingController.CheckIsBuff(e.RoleId, t);
    }
    return this.lLi.sort(this.fTi);
  }
}
exports.ForgingModel = ForgingModel;
//# sourceMappingURL=ForgingModel.js.map