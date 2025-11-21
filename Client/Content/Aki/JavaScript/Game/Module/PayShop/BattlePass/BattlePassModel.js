"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassModel = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringBuilder_1 = require("../../../../Core/Utils/StringBuilder");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../ConfirmBox/ConfirmBoxDefine");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
const WeaponTrialData_1 = require("../../Weapon/Data/WeaponTrialData");
const BattlePassController_1 = require("./BattlePassController");
const BattlePassRewardGridItem_1 = require("./BattlePassTabView/BattlePassRewardGridItem");
const BattlePassTaskLoopItem_1 = require("./BattlePassTabView/BattlePassTaskLoopItem");
const GIFT_ID = 301;
class BattlePassModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.IsRequiringViewData = false;
    this.Lki = false;
    this.IncreasedLevelToShow = 0;
    this.Dki = undefined;
    this.Rki = 0;
    this.Uki = true;
    this.Pta = undefined;
    this.Aki = 0;
    this.Pki = 0;
    this.xki = GIFT_ID;
    this.wki = 0;
    this.Bki = 0;
    this.RewardDataList = [];
    this.BattlePassId = 0;
    this.UQ = 0;
    this.StageLevelList = [];
    this.bki = 0;
    this.qki = 0;
    this.Gki = 0;
    this.Nki = Protocol_1.Aki.Protocol.PNs.Proto_NoPaid;
    this.Oki = 0;
    this.kki = 0;
    this.Fki = 0;
    this.Vki = 0;
    this.BattlePassTaskMap = new Map();
    this.kc1 = undefined;
  }
  GetInTimeRange() {
    return this.Lki;
  }
  SetInTimeRange(t) {
    this.Lki = t;
  }
  GetDayEndTime() {
    return this.wki;
  }
  GetWeekEndTime() {
    return this.Bki;
  }
  GetGiftId() {
    return this.xki;
  }
  get PrimaryItemId() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("PrimaryGiftItem")[0];
  }
  get AdvanceItemId() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("AdvancedGiftItem")[0];
  }
  get HadEnter() {
    return this.Uki;
  }
  set HadEnter(t) {
    if (this.Uki !== t) {
      this.Uki = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattlePassHadEnterUpdate);
    }
  }
  GetWeaponDataList() {
    if (!this.Dki) {
      this.Dki = [];
      for (const e of CommonParamById_1.configCommonParamById.GetIntArrayConfig("BattlePassUnlockWeapons")) {
        var t = new WeaponTrialData_1.WeaponTrialData();
        t.SetTrialId(e);
        this.Dki.push(t);
      }
    }
    return this.Dki;
  }
  GetRewardData(t) {
    var e = this.RewardDataList[t - 1];
    if (e) {
      return e;
    }
    if (Log_1.Log.CheckWarn()) {
      Log_1.Log.Warn("Temp", 10, "战令奖励数据 没有这个等级的", ["level", t]);
    }
  }
  set PayButtonRedDotState(t) {
    if (this.Pta !== t) {
      this.Pta = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattlePassHadEnterUpdate);
      LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.BattlePassPayButton, this.Pta);
    }
  }
  get PayButtonRedDotState() {
    if (this.Pta === undefined) {
      this.Pta = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.BattlePassPayButton, true) ?? true;
    }
    return this.Pta;
  }
  GetMaxLevel() {
    return this.UQ;
  }
  IsLevelMax() {
    return this.bki >= this.UQ;
  }
  IsWeekMax() {
    return this.WeekExp >= this.Fki;
  }
  GetNextStageLevel(t) {
    if (t === undefined) {
      return 0;
    }
    let e = 0;
    for (const a of this.StageLevelList) {
      if (!(a <= t)) {
        e = a;
        break;
      }
    }
    return e;
  }
  InitBattlePassConfigData() {
    var t = this.BattlePassId;
    this.RewardDataList.length = 0;
    var t = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassData(t);
    this.UQ = t.LevelLimit;
    var e = ConfigManager_1.ConfigManager.BattlePassConfig.GetAllRewardData(t.BattlePassRewardId);
    for (const l of e) {
      if (!(l.Level > this.UQ)) {
        var a;
        var r;
        var i;
        var s;
        var o = new BattlePassRewardGridItem_1.BattlePassRewardData(l.Level);
        for ([a, r] of l.FreeReward) {
          var n = new BattlePassRewardGridItem_1.BattlePassRewardItem(a, r);
          if (this.BattlePassLevel >= l.Level) {
            n.ItemType = 1;
          }
          o.FreeRewardItem.push(n);
        }
        for ([i, s] of l.PayReward) {
          var h = new BattlePassRewardGridItem_1.BattlePassRewardItem(i, s);
          if (this.BattlePassLevel >= l.Level && this.Nki !== Protocol_1.Aki.Protocol.PNs.Proto_NoPaid) {
            h.ItemType = 1;
          }
          o.PayRewardItem.push(h);
        }
        if (l.IsMilestone) {
          this.StageLevelList.push(l.Level);
        }
        this.RewardDataList.push(o);
      }
    }
    this.Fki = t.WeekExpLimit;
    this.Vki = t.LevelUpExp;
    this.Hki();
  }
  Hki() {
    this.Pki = this.Vki * (this.UQ - this.bki) - this.LevelExp;
    this.Aki = this.Fki - this.WeekExp;
  }
  jki(t) {
    let e = 0;
    let a = 0;
    for (const i of t) {
      var r = this.GetTaskData(i);
      e += r.Exp;
      a += r.UpdateType === 0 ? 0 : r.Exp;
    }
    return [e, a];
  }
  TryRequestTaskList(t) {
    var [e, a] = this.jki(t);
    var e = e - Math.max(0, a - this.Aki);
    if (this.IsLevelMax() || e > this.Pki) {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("BattlePassExpMax");
      BattlePassController_1.BattlePassController.RequestBattlePassTaskTake(t);
    } else if (a > this.Aki) {
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(this.IsWeekMax() ? 91 : 178)).FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("BattlePassWeeklyExpMax");
        BattlePassController_1.BattlePassController.RequestBattlePassTaskTake(t);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    } else {
      BattlePassController_1.BattlePassController.RequestBattlePassTaskTake(t);
    }
  }
  UpdateBattlePassRewardDataFromResponse(t) {
    if (t !== undefined && t.length !== 0) {
      for (const e of t) {
        this.TakeReward(e.h5n, e.F6n, e.L8n);
      }
    }
  }
  UpdateRewardDataWithTargetLevel(e) {
    for (let t = 1; t <= e; t++) {
      this.Wki(t);
    }
  }
  Wki(t, e = false) {
    t = this.RewardDataList[t - 1];
    if (t) {
      for (const a of t.FreeRewardItem) {
        if (a.ItemType === 0 || !!e) {
          a.ItemType = 1;
        }
      }
      if (this.PayType !== Protocol_1.Aki.Protocol.PNs.Proto_NoPaid) {
        for (const r of t.PayRewardItem) {
          if (r.ItemType === 0 || !!e) {
            r.ItemType = 1;
          }
        }
      }
    }
  }
  TakeReward(t, e, a) {
    var r = this.GetRewardData(e);
    let i = undefined;
    if (i = t === Protocol_1.Aki.Protocol.ANs.Proto_Free ? r.GetFreeRewardItem(a) : r.GetPayRewardItem(a)) {
      i.ItemType = 2;
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Temp", 64, "【TakeReward】战令奖励数据 没有这个奖励的配置", ["battlePassType", t], ["level", e], ["itemId from server", a]);
    }
  }
  OnResponseTakeReward(t, e, a, r) {
    this.TakeReward(t, e, a);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GetBattlePassRewardEvent, r);
  }
  set BattlePassLevel(t) {
    this.bki = t;
  }
  get BattlePassLevel() {
    return this.bki;
  }
  set WeekExp(t) {
    this.qki = t;
  }
  get WeekExp() {
    return this.qki;
  }
  set LevelExp(t) {
    this.Gki = t;
  }
  get LevelExp() {
    return this.Gki;
  }
  set PayType(t) {
    this.Nki = t;
  }
  get PayType() {
    return this.Nki;
  }
  GetBattlePassStartTime() {
    return this.Oki;
  }
  GetBattlePassEndTime() {
    return this.kki;
  }
  InBattlePassInWarningTime() {
    return TimeUtil_1.TimeUtil.GetServerTime() > this.Rki;
  }
  Kki(t) {
    this.Oki = Number(MathUtils_1.MathUtils.LongToBigInt(t));
  }
  Qki(t) {
    this.kki = Number(MathUtils_1.MathUtils.LongToBigInt(t));
    this.Rki = this.kki - CommonParamById_1.configCommonParamById.GetIntConfig("BattlePassSettleBugTime") * 3600;
  }
  SetDayEndTime(t) {
    this.wki = Number(MathUtils_1.MathUtils.LongToBigInt(t));
  }
  SetWeekEndTime(t) {
    this.Bki = Number(MathUtils_1.MathUtils.LongToBigInt(t));
  }
  GetMaxWeekExp() {
    return this.Fki;
  }
  GetMaxLevelExp() {
    return this.Vki;
  }
  GetPassPayBtnKey() {
    switch (this.Nki) {
      case Protocol_1.Aki.Protocol.PNs.Proto_NoPaid:
        return "Text_BattlePassBuyButton1_Text";
      case Protocol_1.Aki.Protocol.PNs.Proto_Paid:
        return "Text_BattlePassBuyButton2_Text";
      case Protocol_1.Aki.Protocol.PNs.Proto_Advanced:
        return "Text_BattlePassBuyButton3_Text";
      default:
        return "";
    }
  }
  OnInit() {
    return this.Uki = true;
  }
  GetBattlePassRemainTime() {
    return TimeUtil_1.TimeUtil.CalculateHourGapBetweenNow(this.kki, true);
  }
  GetBattlePassRemainTimeSecond() {
    var t = TimeUtil_1.TimeUtil.GetServerTimeStamp() / TimeUtil_1.TimeUtil.InverseMillisecond;
    return this.kki - t;
  }
  GetTargetLevelRewardList(e, t) {
    t.length = 0;
    var a;
    var r = this.bki;
    var i = new Map();
    for (let t = r + 1; t <= e; t++) {
      var s = this.GetRewardData(t);
      if (s) {
        for (const h of this.Nki === Protocol_1.Aki.Protocol.PNs.Proto_NoPaid ? s.FreeRewardItem : s.FreeRewardItem.concat(s.PayRewardItem)) {
          var o = h.Item[0].ItemId;
          var n = h.Item[1];
          if (i.has(o)) {
            i.get(o)[1] += n;
          } else {
            i.set(o, [{
              IncId: 0,
              ItemId: o
            }, n]);
          }
        }
      }
    }
    for ([, a] of i) {
      t.push(a);
    }
    t.sort((t, e) => {
      var a = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t[0].ItemId).QualityId;
      var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e[0].ItemId).QualityId;
      if (a === r) {
        return t[1] - e[1];
      } else {
        return r - a;
      }
    });
  }
  GetTaskData(t) {
    return this.BattlePassTaskMap.get(t);
  }
  GetTaskList(t, e) {
    e.length = 0;
    for (var [, a] of this.BattlePassTaskMap) {
      if (a.UpdateType === t) {
        e.push(a);
      }
    }
    e.sort((t, e) => t.TaskState === 3 || e.TaskState === 2 ? -1 : t.TaskState === 2 || e.TaskState === 3 ? 1 : 0);
  }
  GetTaskTypeList() {
    return [1, 2, 0];
  }
  GetPrimaryBattlePassGoodsId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("PrimaryBattlePassShopId");
  }
  GetHighBattlePassGoodsId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("AdvancedWithActive");
  }
  GetSupplyBattlePassGoodsId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("AdvancedWithoutActive");
  }
  GetAllFinishedTask() {
    var t;
    var e;
    var a = [];
    for ([t, e] of this.BattlePassTaskMap) {
      if (e.TaskState === 3) {
        a.push(t);
      }
    }
    return a;
  }
  CheckHasRewardWaitTake() {
    for (const t of this.RewardDataList) {
      for (const e of t.FreeRewardItem) {
        if (e.ItemType === 1) {
          return true;
        }
      }
      for (const a of t.PayRewardItem) {
        if (a.ItemType === 1) {
          return true;
        }
      }
    }
    return false;
  }
  CheckHasTaskWaitTake() {
    if (this.UQ !== this.BattlePassLevel) {
      for (var [, t] of this.BattlePassTaskMap) {
        if (t.TaskState === 3) {
          return true;
        }
      }
    }
    return false;
  }
  CheckHasTaskWaitTakeWithType(t) {
    if (this.bki !== this.UQ) {
      for (var [, e] of this.BattlePassTaskMap) {
        if (t === e.UpdateType && e.TaskState === 3) {
          return true;
        }
      }
    }
    return false;
  }
  AddTaskDataFromProtocol(t) {
    var e;
    var a;
    var r = CommonParamById_1.configCommonParamById.GetIntConfig("BattlePassExp");
    var i = this.BattlePassTaskMap;
    var s = new BattlePassTaskLoopItem_1.BattlePassTaskData();
    s.TaskId = t.s5n;
    var o = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassTask(t.s5n);
    for ([e, a] of o.TaskReward) {
      var n = [{
        IncId: 0,
        ItemId: e
      }, a];
      if (e === r) {
        s.Exp += a;
      }
      s.RewardItemList.push(n);
    }
    s.CurrentProgress = t.lMs ?? 0;
    s.TargetProgress = t.j6n ?? 0;
    s.UpdateType = o.UpdateType;
    s.SkipId = o.JumpId === 0 ? undefined : o.JumpId;
    if (t.dMs) {
      if (t.mMs) {
        s.TaskState = 2;
      } else {
        s.TaskState = 3;
      }
    } else {
      s.TaskState = 1;
    }
    i.set(t.s5n, s);
  }
  SetDataFromBattlePassResponse(t) {
    var e = t.iEs;
    this.Lki = e.YSs ?? false;
    if (this.Lki) {
      this.HadEnter = e.tEs;
      this.BattlePassId = e.s5n;
      this.PayType = e.zSs;
      this.BattlePassLevel = e.F6n;
      this.LevelExp = e.U8n;
      this.WeekExp = e.JSs;
      this.Qki(e.dps);
      this.Kki(e.cps);
      this.InitBattlePassConfigData();
      this.UpdateBattlePassRewardDataFromResponse(t.iEs.ZSs ?? undefined);
      if (!e.tEs && e.YSs) {
        this.PayButtonRedDotState = true;
      }
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReceiveBattlePassDataEvent);
    } else {
      this.PayButtonRedDotState = false;
    }
  }
  UpdateTaskDataFromBattlePassTaskTakeResponse(t) {
    var e = this.BattlePassTaskMap;
    for (const r of t) {
      var a = e.get(r);
      if (a) {
        a.TaskState = 2;
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateBattlePassTaskEvent);
  }
  UpdateExpDataFromBattlePassExpUpdateNotify(t, e, a) {
    this.UpdateRewardDataWithTargetLevel(t);
    if (t > this.BattlePassLevel) {
      this.IncreasedLevelToShow = t - this.BattlePassLevel;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBattlePassLevelUpEvent);
    }
    this.BattlePassLevel = t;
    this.LevelExp = e;
    this.WeekExp = a;
    this.Hki();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReceiveBattlePassDataEvent);
  }
  UpdateRewardDataFromBattlePassTakeAllRewardResponse(t) {
    for (const e of t.ZSs) {
      this.TakeReward(e.h5n, e.F6n, e.L8n);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ReceiveBattlePassDataEvent);
  }
  UpdateRewardDataFormFreeToPay() {
    for (let t = 1; t <= this.bki; t++) {
      var e = this.GetRewardData(t);
      if (e) {
        for (const a of e.PayRewardItem) {
          a.ItemType = 1;
        }
      }
    }
  }
  GetBattlePassIconPath() {
    var t = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassData(this.BattlePassId);
    if (t) {
      return t.ExclusiveRewardPath;
    }
  }
  GetCurrentShowLevel() {
    let t = 0;
    for (const e of this.RewardDataList) {
      if (e.IsThisType(1)) {
        t = e.Level;
        break;
      }
    }
    if (t === 0) {
      for (const a of this.RewardDataList) {
        if (a.IsThisType(2)) {
          t = a.Level;
        }
      }
    }
    return t = t === 0 ? 1 : t;
  }
  GetHighBattlePassOriginalPrice() {
    var t = this.GetPrimaryBattlePassGoodsId();
    var e = CommonParamById_1.configCommonParamById.GetIntConfig("AdvancedWithoutActive");
    var t = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopDirectGoods(t).PayId;
    var t = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(t).Amount;
    var e = ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopDirectGoods(e).PayId;
    var a = ConfigManager_1.ConfigManager.PayItemConfig.GetPayConf(e).Amount;
    var r = new StringBuilder_1.StringBuilder();
    var e = ConfigManager_1.ConfigManager.PayItemConfig.GetPayShow(e);
    r.Append(ConfigManager_1.ConfigManager.PayItemConfig.GetPayShowCurrency());
    r.Append(t + a);
    return e;
  }
  GetBattlePassItemConfirmId(t) {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10040)) {
      if (this.GetInTimeRange()) {
        if (t === this.PrimaryItemId) {
          if (ModelManager_1.ModelManager.BattlePassModel.PayType !== Protocol_1.Aki.Protocol.PNs.Proto_NoPaid) {
            return 151;
          } else if (ModelManager_1.ModelManager.BattlePassModel.InBattlePassInWarningTime()) {
            return 152;
          } else {
            return 153;
          }
        } else if (ModelManager_1.ModelManager.BattlePassModel.PayType === Protocol_1.Aki.Protocol.PNs.Proto_Advanced) {
          return 155;
        } else if (ModelManager_1.ModelManager.BattlePassModel.PayType === Protocol_1.Aki.Protocol.PNs.Proto_Paid) {
          return 154;
        } else if (ModelManager_1.ModelManager.BattlePassModel.InBattlePassInWarningTime()) {
          return 159;
        } else {
          return 156;
        }
      } else {
        return 150;
      }
    } else {
      return 149;
    }
  }
  get RemindLevel() {
    return this.kc1;
  }
  TryAssignRemindLevel(t) {
    if (!(this.PayType > Protocol_1.Aki.Protocol.PNs.Proto_NoPaid)) {
      var e = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassData(this.BattlePassId)?.BattlePassRewardId ?? 0;
      if (t === undefined) {
        for (const a of ConfigManager_1.ConfigManager.BattlePassConfig.GetAllRewardData(e)) {
          if (a.IsRemind && this.GetRewardData(a.Level).IsThisType(1)) {
            this.kc1 = this.BattlePassLevel;
            return;
          }
        }
      } else if (this.GetRewardData(t)?.IsThisType(1)) {
        for (const r of ConfigManager_1.ConfigManager.BattlePassConfig.GetAllRewardData(e)) {
          if (r.Level === t) {
            this.kc1 = r.IsRemind ? this.BattlePassLevel : undefined;
            return;
          }
        }
      }
    }
    this.kc1 = undefined;
  }
  GetExtraRewardItems() {
    if (this.kc1 === undefined) {
      return [];
    }
    var t;
    var e;
    var a = new Map();
    var r = [];
    var i = ConfigManager_1.ConfigManager.BattlePassConfig.GetBattlePassData(this.BattlePassId)?.BattlePassRewardId ?? 0;
    for (const n of ConfigManager_1.ConfigManager.BattlePassConfig.GetAllRewardData(i)) {
      if (n.Level <= this.kc1) {
        for (var [s, o] of n.PayReward) {
          if (a.has(s)) {
            a.set(s, a.get(s) + o);
          } else {
            a.set(s, o);
          }
        }
      }
    }
    for ([t, e] of a) {
      r.push(new RewardItemData_1.RewardItemData(t, e));
    }
    r.sort((t, e) => {
      var a = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t.ConfigId).QualityId;
      var r = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e.ConfigId).QualityId;
      if (a === r) {
        return t.Count - e.Count;
      } else {
        return r - a;
      }
    });
    return r;
  }
}
exports.BattlePassModel = BattlePassModel;
//# sourceMappingURL=BattlePassModel.js.map