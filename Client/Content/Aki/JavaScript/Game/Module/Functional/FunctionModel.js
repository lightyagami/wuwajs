"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ConfigCommon_1 = require("../../../Core/Config/ConfigCommon");
const FunctionConditionByFunctionId_1 = require("../../../Core/Define/ConfigQuery/FunctionConditionByFunctionId");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const ActivityDirectTrainHelper_1 = require("../Activity/ActivityContent/DirectTrain/ActivityDirectTrainHelper");
const ChannelController_1 = require("../Channel/ChannelController");
const FunctionInstance_1 = require("./View/FunctionInstance");
class FunctionModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.PlayerAttributeNum = new Map();
    this.PlayerAttributeString = new Map();
    this.PlayerId = 0;
    this.I7t = new Map();
    this.T7t = [];
    this.L7t = new Map();
    this.D7t = () => ModelManager_1.ModelManager.ActivityModel.GetIfShowActivity();
    this.R7t = () => ControllerHolder_1.ControllerHolder.KuroSdkController.NeedShowCustomerService();
    this.U7t = () => ChannelController_1.ChannelController.CheckKuroStreetOpen();
    this.Wtl = () => ModelManager_1.ModelManager.MailBindModel.CheckGlobalMailBindOpen();
    this.jpu = () => ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.IsProOpen;
  }
  OnInit() {
    this.L7t.set(10053, this.D7t);
    this.L7t.set(10028, this.R7t);
    this.L7t.set(10058, this.U7t);
    this.L7t.set(10072, this.Wtl);
    this.L7t.set(10095, this.jpu);
    return true;
  }
  SetFunctionOpenInfo(e) {
    for (const t of e.VUs) {
      var n = new FunctionInstance_1.FunctionInstance(t.o5n, t.s5n);
      this.I7t.set(t.s5n, new FunctionInstance_1.FunctionInstance(t.o5n, t.s5n));
      var n = n.GetIsOpen();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFunctionOpenSet, t.s5n, n);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Functional", 10, "功能数据添加", ["Id", t.s5n], ["IsOpen", n]);
      }
    }
  }
  UpdateFunctionOpenInfo(e) {
    for (const o of e.VUs) {
      var n;
      var t = this.I7t.get(o.s5n);
      if (t) {
        t.SetFlag(o.o5n);
        if ((t = t.GetIsOpen()) && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Functional", 10, "功能数据更新", ["Id", o.s5n]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFunctionOpenUpdate, o.s5n, t);
        n = FunctionConditionByFunctionId_1.configFunctionConditionByFunctionId.GetConfig(o.s5n);
        if (!!t && n.ShowUIType === 1 && !ModelManager_1.ModelManager.SundryModel.IsBlockTips && !e.YU1) {
          this.T7t.push(n);
        }
        if (ModelManager_1.ModelManager.SundryModel.IsBlockTips && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Functional", 10, "[UpdateFunctionOpenInfo]用了GM屏蔽功能开启界面显示");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Functional", 10, "当前刷新的功能id不在功能列表中", ["功能Id", o.s5n]);
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFunctionOpenUpdateNotify);
  }
  UpdateFunctionOpenLockByBehaviorTree(e, n) {
    var t = this.I7t.get(e);
    if (t) {
      t.SetIsLockByBehaviorTree(n);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Functional", 10, "[UpdateFunctionOpenLockByBehaviorTree]行为树执行了系统功能的启用/禁用", ["功能ID", e], ["是否禁用", n]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Functional", 10, "[BehaviorTree]当前的功能id不在功能列表中", ["功能Id", e]);
    }
  }
  RefreshInfoManualState(e) {
    for (const o of e) {
      var n;
      var t = this.I7t.get(o);
      if (t) {
        n = FunctionConditionByFunctionId_1.configFunctionConditionByFunctionId.GetConfig(o);
        if (t.GetIsOpen() && !ModelManager_1.ModelManager.SundryModel.IsBlockTips) {
          this.T7t.push(n);
        }
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Functional", 10, "手动开启功能开启界面成功", ["FunctionId", o]);
        }
        if (ModelManager_1.ModelManager.SundryModel.IsBlockTips && Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Functional", 10, "[RefreshInfoManualState]用了GM屏蔽功能开启界面显示");
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Functional", 10, "当前刷新的功能id不在功能列表中", ["功能Id", o]);
      }
    }
  }
  PopNewOpenFunctionList() {
    var e;
    if (this.IsExistNewOpenFunction()) {
      e = this.T7t[0];
      this.T7t.splice(0, 1);
      return e;
    }
  }
  IsExistNewOpenFunction() {
    return this.T7t.length > 0;
  }
  ClearNewOpenFunctionList() {
    this.T7t = [];
  }
  GetNewOpenFunctionIdList() {
    var e = [];
    for (const n of this.T7t) {
      e.push(n.FunctionId);
    }
    return e;
  }
  UpdatePlayerAttributeNumberInfo(e) {
    let n = 0;
    let t = undefined;
    if (e.has(Protocol_1.Aki.Protocol.LNs.F6n)) {
      n = this.GetPlayerLevel();
    }
    if (e.has(Protocol_1.Aki.Protocol.LNs.U8n)) {
      t = this.GetPlayerExp();
    }
    e.forEach((e, n) => {
      this.PlayerAttributeNum.set(n, e);
    });
    var o;
    var r;
    var i;
    var e = this.GetPlayerExp();
    var a = this.GetPlayerLevel();
    var s = ConfigManager_1.ConfigManager.FunctionConfig;
    if (n > 0 && n < a && t !== undefined) {
      if (!!(i = s.GetRangePlayerExpConfig(n, a)) && !(i.length < 1)) {
        o = i[0];
        r = i[i.length - 1];
        o = o.LevelExp;
        i = this.A7t(i, t, e);
        r = r.LevelExp;
        ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(4);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerLevelChanged, n, a, e, t, i, r, o);
      }
    } else if (t !== undefined && t < e) {
      i = s.GetPlayerLevelConfig(a).LevelExp;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayerExpChanged, e, t, i);
    }
  }
  A7t(e, n, t) {
    let o = 0;
    for (const r of e) {
      o += r.LevelExp;
    }
    return o - n + t;
  }
  SetPlayerId(e) {
    this.PlayerId = e;
  }
  GetPlayerName() {
    return this.PlayerAttributeString.get(Protocol_1.Aki.Protocol.LNs.H8n);
  }
  SetPlayerName(e) {
    this.PlayerAttributeString.set(Protocol_1.Aki.Protocol.LNs.H8n, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnNameChange);
  }
  GetPlayerLevel() {
    return this.PlayerAttributeNum.get(Protocol_1.Aki.Protocol.LNs.F6n);
  }
  GetPlayerExp() {
    return this.PlayerAttributeNum.get(Protocol_1.Aki.Protocol.LNs.U8n);
  }
  GetPlayerCashCoin() {
    var e = this.PlayerAttributeString.get(Protocol_1.Aki.Protocol.LNs.Proto_CashCoin);
    return e || "0";
  }
  GetWorldPermission() {
    return this.PlayerAttributeNum.get(Protocol_1.Aki.Protocol.LNs.Proto_WorldPermission);
  }
  UpdatePlayerAttributeStringInfo(e) {
    e.forEach((e, n) => {
      this.PlayerAttributeString.set(n, e);
    });
  }
  IsOpen(e) {
    return e === 0 || !!(e = this.I7t.get(e)) && e.GetIsOpen();
  }
  IsShow(e) {
    e = this.I7t.get(e);
    return !!e && e.GetIsShow();
  }
  IsLockByBehaviorTree(e) {
    return e !== 0 && !!(e = this.I7t.get(e)) && e.GetIsLockByBehaviorTree();
  }
  GetFunctionInstance(e) {
    return this.I7t.get(e);
  }
  GetShowFunctionIdList() {
    var e = new Array();
    var n = ConfigCommon_1.ConfigCommon.ToList(ConfigManager_1.ConfigManager.FunctionConfig.GetAllFunctionList());
    n.sort((e, n) => e.SortIndex - n.SortIndex);
    for (const r of n) {
      var t;
      var o = this.I7t.get(r.FunctionId);
      if (o && (t = !(t = this.L7t.get(r.FunctionId)) || t(), o.GetIsOpen()) && t) {
        e.push(r.FunctionId);
      }
    }
    return e;
  }
  GetFunctionItemRedDotName(e) {
    switch (e) {
      case 10001:
        return "FunctionRole";
      case 10003:
        return "FunctionCalabash";
      case 10011:
        return "FunctionFriend";
      case 10009:
        return "FunctionGacha";
      case 10022:
        return "FunctionTutorial";
      case 10023:
        return "FunctionAdventure";
      case 10029:
        return "InfluenceReputation";
      case 10041:
        return "RoleHandBook";
      case 10013:
        return "Achievement";
      case 10040:
        return "BattlePass";
      case 10002:
        return "FunctionInventory";
      case 10053:
        return "ActivityEntrance";
      case 10010:
        return "FunctionPayShop";
      case 10004:
        return "FunctionViewQuestBtn";
      case 10028:
        return "CustomerService";
      case 10026:
        return "FunctionPhantomExploreSet";
      case 10072:
        return "FunctionMailBind";
      case 10058:
        return "FunctionKuroStreet";
      case 10015:
        return "FunctionMap";
      case 10095:
        return "ActivityDirectTrainPro";
    }
  }
  RedDotFunctionPhantomCondition() {
    return false;
  }
}
exports.FunctionModel = FunctionModel;
//# sourceMappingURL=FunctionModel.js.map