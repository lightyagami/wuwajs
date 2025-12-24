"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookController = undefined;
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelGeneralNetworks_1 = require("../../LevelGamePlay/LevelGeneralNetworks");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiTimeDilation_1 = require("../../Ui/Base/UiTimeDilation");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ItemRewardController_1 = require("../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData");
const CookDefine_1 = require("./CookDefine");
class CookController extends UiControllerBase_1.UiControllerBase {
  static get CookCoinId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("CookCost") ?? -1;
  }
  static OnClear() {
    this.ClearCookDisplay();
    return true;
  }
  static OnLeaveLevel() {
    this.ClearCookDisplay();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveRole, CookController.qqt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, CookController.Gqt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, CookController.Nqt);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveRole, CookController.qqt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemUse, CookController.Gqt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, CookController.Nqt);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20415, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Cook", 49, "10264_服务端主动推送厨师数据");
      }
      ModelManager_1.ModelManager.CookModel.UpdateCookerInfo(e.TPs);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateCookerInfo);
    });
    Net_1.Net.Register(19882, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Cook", 49, "10265_服务端主动推送配方更新");
      }
      ModelManager_1.ModelManager.CookModel.UpdateCookingDataList(e.LPs);
      ModelManager_1.ModelManager.CookModel.UpdateMachiningDataList(e.RPs, true);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20415);
    Net_1.Net.UnRegister(19882);
  }
  static CheckCanShowExpItem() {
    return ModelManager_1.ModelManager.CookModel.GetCookerInfo().AddExp !== 0;
  }
  static Oqt(e) {
    ModelManager_1.ModelManager.CookModel.CreateCookerInfo(e.TPs);
    ModelManager_1.ModelManager.CookModel.CreateCookingDataList(e.LPs);
    ModelManager_1.ModelManager.CookModel.UpdateCookingDataByServerConfig(e.DPs);
    ModelManager_1.ModelManager.CookModel.UpdateMachiningDataList(e.RPs, false);
    ModelManager_1.ModelManager.CookModel.SaveLimitRefreshTime(e.APs);
  }
  static async SendCookingDataRequestAsync() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Cook", 49, "10260_客户端请求烹饪系统相关数据(异步刷新用)");
    }
    var e = new Protocol_1.Aki.Protocol.LZn();
    var e = await Net_1.Net.CallAsync(19793, e);
    if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Cook", 49, "10260_返回请求烹饪系统相关数据(异步刷新用)");
      }
      CookController.Oqt(e);
      return true;
    } else {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 27769, undefined, true, false);
      if (UiManager_1.UiManager.IsViewShow("CookRootView")) {
        UiManager_1.UiManager.CloseView("CookRootView");
      }
      return false;
    }
  }
  static SendCookFormulaRequest(t) {
    var e = new Protocol_1.Aki.Protocol.gZn();
    e.LVn = t;
    Net_1.Net.Call(24991, Protocol_1.Aki.Protocol.gZn.create(e), e => {
      var o;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Cook", 49, "10252_食物配方解锁请求返回");
      }
      if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ModelManager_1.ModelManager.CookModel.UnlockCookMenuData(e.LVn);
        o = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(t);
        o = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(o.Name);
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("CookStudy", o);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFormula);
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 17586);
      }
    });
  }
  static SendCookFoodRequest(e, o, t) {
    var r = new Protocol_1.Aki.Protocol.vZn();
    r.s5n = e;
    r.Q6n = o;
    r.DVn = t;
    r.AVn = ModelManager_1.ModelManager.CookModel.CurrentInteractCreatureDataLongId;
    Net_1.Net.Call(24555, Protocol_1.Aki.Protocol.vZn.create(r), e => {
      var o;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Cook", 49, "10254_食物烹饪请求返回");
      }
      if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (o = ModelManager_1.ModelManager.CookModel.GetCookingDataById(e.s5n)) {
          o.LastRoleId = e.Q6n;
        }
        o = e.MPs;
        if (e.EPs.length !== 0) {
          o.push(...e.EPs);
        }
        ModelManager_1.ModelManager.CookModel.UpdateCookItemList(o);
        CookController.kqt(e);
        CookController.PlayCookSuccessDisplay(() => {
          ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2001, true);
        });
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CookSuccess);
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 18513);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CookFail);
      }
    });
  }
  static kqt(e) {
    var o = ModelManager_1.ModelManager.CookModel;
    var t = o.GetCookerInfo();
    var r = t.CookingLevel;
    var n = o.GetCookerMaxLevel();
    var a = o.GetCookLevelByLevel(n);
    var t = t.TotalProficiencys;
    var a = a.Completeness;
    var i = o.LastExp;
    let _ = undefined;
    if (i !== t && (i < a || r < n && t < a)) {
      a = {
        FromProgress: i,
        ToProgress: t,
        MaxProgress: o.GetCookLevelByLevel(Math.min(n, r + 1)).Completeness
      };
      _ = [a];
    }
    o.LastExp = t;
    var l = [];
    for (const g of e.MPs) {
      var C = new RewardItemData_1.RewardItemData(g.L8n, g.UVn);
      l.push(C);
    }
    for (const M of e.EPs) {
      var s = new RewardItemData_1.RewardItemData(M.L8n, M.UVn);
      l.push(s);
    }
    ItemRewardController_1.ItemRewardController.SetItemList(l);
    ItemRewardController_1.ItemRewardController.SetProgressQueue(_);
  }
  static Fqt(e) {
    var o = new Array();
    for (const t of e) {
      if (t.K6n) {
        o.push(t);
      }
    }
    return o;
  }
  static SendFoodProcessRequest(e, o, t) {
    var r = new Protocol_1.Aki.Protocol.MZn();
    r.s5n = e;
    r.RVn = CookController.Fqt(o);
    r.DVn = t;
    r.AVn = ModelManager_1.ModelManager.CookModel.CurrentInteractCreatureDataLongId;
    Net_1.Net.Call(21415, Protocol_1.Aki.Protocol.MZn.create(r), e => {
      var o;
      var t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Cook", 49, "10256_食物加工返回");
      }
      if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
        o = ModelManager_1.ModelManager.CookModel.GetMachiningDataById(e.s5n);
        t = e.fPs;
        if (o && (o.IsUnLock = t, e.IPs.length !== 0)) {
          o.UnlockList = e.IPs;
        }
        ModelManager_1.ModelManager.CookModel.UpdateCookItemList(e.yPs);
        if (t) {
          CookController.PlayCookSuccessDisplay(() => {
            ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2002);
          });
        } else {
          CookController.PlayCookFailDisplay(() => {
            ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2005, false);
          });
        }
        if (e.fPs) {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MachiningSuccess);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MachiningStudyFail);
        }
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 24598);
      }
    });
  }
  static SendCertificateLevelRewardRequest() {
    var e = new Protocol_1.Aki.Protocol.EZn();
    Net_1.Net.Call(29272, Protocol_1.Aki.Protocol.EZn.create(e), e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Cook", 49, "10258_领取厨师等级奖励返回");
      }
      if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpgradeCookerLevel);
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 27176);
      }
    });
  }
  static SendFixToolRequest(o, e) {
    var t = new Protocol_1.Aki.Protocol.mZn();
    t.xVn = o;
    t.F4n = e;
    Net_1.Net.Call(17428, Protocol_1.Aki.Protocol.mZn.create(t), e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Cook", 49, "10250_请求修复厨具返回");
      }
      if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Cook", 49, "请求修复厨具成功", ["修复Id", o]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FixSuccess);
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 17076);
      }
    });
  }
  static SetCurrentFixId(e) {
    ModelManager_1.ModelManager.CookModel.CurrentFixId = e;
  }
  static GetCurrentFixId() {
    return ModelManager_1.ModelManager.CookModel.CurrentFixId;
  }
  static SetCurrentEntityId(e) {
    ModelManager_1.ModelManager.CookModel.CurrentEntityId = e;
  }
  static GetCurrentEntityId() {
    return ModelManager_1.ModelManager.CookModel.CurrentEntityId;
  }
  static CheckCanCook(e) {
    return ModelManager_1.ModelManager.CookModel.CheckCanCook(e);
  }
  static CheckCanProcessed(e) {
    for (const t of ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(e).ConsumeItemsId) {
      var o = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t.ItemId);
      if (t.Count > o) {
        return false;
      }
    }
    return true;
  }
  static CheckCanAdd(e, o, t) {
    switch (t) {
      case 0:
        var r = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(o);
        if (r) {
          return CookController.Vqt(e, r.ConsumeItems);
        }
        break;
      case 1:
        r = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(o);
        if (r) {
          return CookController.Vqt(e, r.ConsumeItemsId);
        }
    }
    return false;
  }
  static Vqt(e, o) {
    for (const r of o) {
      var t = e * r.Count;
      if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r.ItemId) < t) {
        return false;
      }
    }
    return true;
  }
  static GetMaxCreateCount(e, o) {
    switch (o) {
      case 0:
        var t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(e);
        if (t) {
          return CookController.Hqt(t.ConsumeItems);
        }
        break;
      case 1:
        t = ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(e);
        if (t) {
          return CookController.Hqt(t.ConsumeItemsId);
        }
    }
    return 0;
  }
  static Hqt(e) {
    let o = CommonParamById_1.configCommonParamById.GetIntConfig("max_cooking_count");
    for (const n of e) {
      var t = n.Count;
      var r = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(n.ItemId);
      if (r < t) {
        return 0;
      }
      r = MathUtils_1.MathUtils.GetFloatPointFloor(r / t, 0);
      o = o < r ? o : r;
    }
    return o;
  }
  static CheckIsBuff(e, o) {
    return ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(o).RoleList.includes(e);
  }
  static CheckIsBuffEx(e, o) {
    var t = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(o);
    if (!t.RoleList.includes(e)) {
      for (const r of ModelManager_1.ModelManager.RoleModel.GetRoleIdList()) {
        if (t.RoleList.includes(r)) {
          return true;
        }
      }
    }
    return false;
  }
  static GetCookInfoText(e) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    let o = "";
    for (const t of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(e.SkillId)) {
      if (t.LeftSkillEffect !== 0) {
        o = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.SkillDescribe), ...t.SkillDetailNum);
      }
    }
    return o;
  }
  static CheckCanFix() {
    for (const o of ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(CookController.GetCurrentFixId()).Items) {
      var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o[0]);
      if (o[1] > e) {
        return false;
      }
    }
    return true;
  }
  static GetCookItemSelectedList(e) {
    let o = ModelManager_1.ModelManager.InventoryModel.GetCommonItemByShowType(26);
    const r = ModelManager_1.ModelManager.CookModel.GetMachiningDataById(e);
    return o = o.filter((e, o, t) => !r.UnlockList.includes(e.GetConfigId()));
  }
  static CheckTmpListHasLock() {
    for (const o of ModelManager_1.ModelManager.CookModel.GetTmpMachiningItemList()) {
      if (!o.K6n) {
        return true;
      }
      var e = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o.L8n);
      if (o.UVn > e) {
        return true;
      }
    }
    return false;
  }
  static CheckIsUnlock(e, o) {
    return ModelManager_1.ModelManager.CookModel.GetMachiningDataById(e).UnlockList.includes(o);
  }
  static CheckCanGetCookerLevel() {
    var e = ModelManager_1.ModelManager.CookModel.GetCookerInfo();
    if (e.CookingLevel !== ModelManager_1.ModelManager.CookModel.GetCookerMaxLevel()) {
      var o = ModelManager_1.ModelManager.CookModel.GetSumExpByLevel(e.CookingLevel);
      if (e.TotalProficiencys >= o) {
        return true;
      }
    }
    return false;
  }
  static async ShowFixCookView() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(107);
    var o = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("UnlockTitle");
    var o = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o);
    e.SetTitle(o);
    var o = ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(CookController.GetCurrentFixId());
    var t = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(o.Description);
    let r = 0;
    let n = "";
    for (const C of o.Items) {
      r = C[1];
      var a = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(C[0]);
      n = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(a.Name);
    }
    e.SetTextArgs(r.toString(), n, t);
    var o = CookController.CheckCanFix();
    e.InteractionMap.set(2, o);
    var i = new Map();
    for (const s of ConfigManager_1.ConfigManager.CookConfig.GetCookFixToolById(CookController.GetCurrentFixId()).Items) {
      var _ = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(s[0]);
      i.set(s[0], _);
    }
    e.ItemIdMap = i;
    e.FunctionMap.set(2, () => {
      CookController.SendFixToolRequest(CookController.GetCurrentFixId(), CookController.GetCurrentEntityId());
    });
    const l = new CustomPromise_1.CustomPromise();
    e.FinishOpenFunction = e => {
      l.SetResult(e);
    };
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    return l.Promise;
  }
  static PlayCookSuccessDisplay(e) {
    this.ClearCookDisplay();
    var o;
    var t = this.jqt();
    if (t) {
      if (o = UiManager_1.UiManager.GetViewByName("CookRootView")) {
        UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
          ViewId: o.GetViewId(),
          TimeDilation: 1,
          DebugName: "CookRootView",
          Reason: "Cook"
        });
      }
      this.IsPlayingSuccessDisplay = true;
      this.Wqt = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBeginPlayCookSuccessDisplay);
      t.AddTag(2014138653);
      this.Kqt = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayCookSuccessDisplayFinished);
        var e = UiManager_1.UiManager.GetViewByName("CookRootView");
        if (e) {
          UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
            ViewId: e.GetViewId(),
            TimeDilation: e.Info.TimeDilation,
            DebugName: "CookRootView",
            Reason: "Cook"
          });
        }
        this.IsPlayingSuccessDisplay = false;
        if (this.Wqt) {
          this.Wqt();
        }
      }, CookDefine_1.COOK_SEQUENCE_TIME_LENGTH);
    } else if (e) {
      e();
    }
  }
  static SkipCookSuccessDisplay() {
    if (this.IsPlayingSuccessDisplay) {
      if (this.Wqt) {
        this.Wqt();
      }
      this.Wqt = undefined;
    }
  }
  static PlayCookFailDisplay(e) {
    this.ClearCookDisplay();
    var o;
    var t = this.jqt();
    if (t) {
      if (o = UiManager_1.UiManager.GetViewByName("CookRootView")) {
        UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
          ViewId: o.GetViewId(),
          TimeDilation: 1,
          DebugName: "CookRootView",
          Reason: "Cook"
        });
      }
      this.IsPlayingFailDisplay = true;
      this.Qqt = e;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBeginPlayCookFailDisplay);
      t.AddTag(-269686894);
      this.Kqt = TimerSystem_1.GameplayTimerSystem.Delay(() => {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayCookFailDisplayFinished);
        var e = UiManager_1.UiManager.GetViewByName("CookRootView");
        if (e) {
          UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
            ViewId: e.GetViewId(),
            TimeDilation: e.Info.TimeDilation,
            DebugName: "CookRootView",
            Reason: "Cook"
          });
        }
        this.IsPlayingFailDisplay = false;
        if (this.Qqt) {
          this.Qqt();
        }
      }, CookDefine_1.COOK_SEQUENCE_TIME_LENGTH);
    }
  }
  static SkipCookFailDisplay() {
    if (this.IsPlayingFailDisplay) {
      if (this.Qqt) {
        this.Qqt();
      }
      this.Qqt = undefined;
    }
  }
  static ClearCookDisplay() {
    var e = this.jqt();
    if (e) {
      e.RemoveTag(2014138653);
      e.RemoveTag(-269686894);
    }
    if (this.Kqt && TimerSystem_1.GameplayTimerSystem.Has(this.Kqt)) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.Kqt);
      this.Kqt = undefined;
    }
    this.IsPlayingSuccessDisplay = false;
    this.IsPlayingFailDisplay = false;
    this.Wqt = undefined;
    this.Qqt = undefined;
  }
  static jqt() {
    var e = ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
    if (e) {
      e = EntitySystem_1.EntitySystem.Get(e);
      if (e) {
        return e.GetComponent(206);
      }
    }
  }
  static TryRequestChangeEntityStateByEvent(e, o) {
    var t;
    if (CookDefine_1.cookEntityCanChangeList.includes(o.Info.Name)) {
      if ((o = ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId) === undefined) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Cook", 64, "当前无法获取交互实体的id");
        }
      } else if ((t = ModelManager_1.ModelManager.CreatureModel?.GetCreatureDataId(o)) === undefined || t === 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Cook", 64, "当前交互实体无法获取服务端实体uid", ["client entity uid", o]);
        }
      } else {
        LevelGeneralNetworks_1.LevelGeneralNetworks.RequestEntitySendEvent(t, e);
      }
    }
  }
}
(exports.CookController = CookController).Kqt = undefined;
CookController.IsPlayingSuccessDisplay = false;
CookController.IsPlayingFailDisplay = false;
CookController.Wqt = undefined;
CookController.Qqt = undefined;
CookController.qqt = () => {
  ModelManager_1.ModelManager.CookModel.UpdateCookRoleItemDataList();
};
CookController.Gqt = (e, o) => {
  if (ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e).ShowTypes.includes(24)) {
    e = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaByFormulaItemId(e);
    e = ConfigManager_1.ConfigManager.CookConfig.GetLocalText(e.Name);
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("CookStudy", e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFormula);
  }
};
CookController.Nqt = () => {
  ModelManager_1.ModelManager.CookModel.CreateMachiningDataList();
}; //# sourceMappingURL=CookController.js.map