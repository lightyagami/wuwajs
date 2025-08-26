"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const InputManager_1 = require("../../Ui/Input/InputManager");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ItemUseLogic_1 = require("../Inventory/ItemUseLogic");
const RouletteDefine_1 = require("./Data/RouletteDefine");
const RouletteFunctionOpenController_1 = require("./RouletteFunctionOpenController");
class RouletteController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    InputManager_1.InputManager.RegisterOpenViewFunc("PhantomExploreSetView", RouletteController.YHt);
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(29225, e => {
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "推送探索技能设置更新信息");
        }
        e = e.$Ps;
        ModelManager_1.ModelManager.ExploreModel.SetDefaultExploreSkillId(e);
        ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId = e;
      }
    });
    Net_1.Net.Register(18174, e => {
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "推送当前轮盘保存的数据");
        }
        ModelManager_1.ModelManager.RouletteModel.UpdateRouletteData(e.HPs);
      }
    });
    Net_1.Net.Register(25228, e => {
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "推送探索技能解锁", ["Id", e.r5n]);
        }
        ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkill(e.r5n);
      }
    });
    Net_1.Net.Register(20546, e => {
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "推送所有已解锁的探索技能及当前装备的探索技能");
        }
        ModelManager_1.ModelManager.RouletteModel.CreateAllUnlockExploreSkill(e.VPs);
        ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId = e.$Ps;
        e = e.Sna;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "新解锁探索技能", ["NewUnlock", e]);
        }
        for (const t of e) {
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkill(t);
        }
      }
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29225);
    Net_1.Net.UnRegister(18174);
    Net_1.Net.UnRegister(25228);
    Net_1.Net.UnRegister(20546);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.T0o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, this.L0o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUseBuffItem, this.L0o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMapExploreToolPlaceNumUpdated, this.D0o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshTempFishingPointNum, this.p8_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.T0o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemUse, this.L0o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUseBuffItem, this.L0o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMapExploreToolPlaceNumUpdated, this.D0o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshTempFishingPointNum, this.p8_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldDone, this.nye);
  }
  static ExploreSkillSetRequest(e, t, o = false) {
    var r;
    if (!this.CheckCanExploreSkillEquip(e) || (r = ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList.at(-1)) === undefined && ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === e || r === e) {
      t?.(false);
    } else {
      ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList.push(e);
      (r = new Protocol_1.Aki.Protocol.Cts()).r5n = e;
      r.T0a = o;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "请求设置探索技能", ["skillId", e]);
      }
      Net_1.Net.Call(16481, Protocol_1.Aki.Protocol.Cts.create(r), e => {
        ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList.shift();
        if (e) {
          if (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId = e.r5n;
            t?.(true);
          } else {
            t?.(false);
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 20324);
          }
        } else {
          t?.(false);
        }
      });
    }
  }
  static SetLastSkillId() {
    var e = ModelManager_1.ModelManager.RouletteModel.GetLastSkillId();
    ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(e);
    RouletteController.ExploreSkillSetRequest(e);
  }
  static lB_(e, t, o, r = false, n) {
    var l = new Protocol_1.Aki.Protocol.vts();
    var a = new Array();
    var _ = new Protocol_1.Aki.Protocol.s6s();
    _.KHn = e;
    _.QHn = o;
    a.push(_);
    var e = new Protocol_1.Aki.Protocol.s6s();
    e.KHn = t;
    a.push(e);
    l.XHn = a;
    Net_1.Net.Call(16394, Protocol_1.Aki.Protocol.vts.create(l), e => {
      if (e) {
        if (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (r) {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("SaveChangeSuccess");
          }
          ModelManager_1.ModelManager.RouletteModel.UpdateRouletteData(e.XHn);
          n?.(true);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 29590);
          n?.(false);
        }
      } else {
        n?.(false);
      }
    });
  }
  static SaveCurrentRouletteData(e, t, o, r = false, n) {
    var l = ModelManager_1.ModelManager.RouletteModel;
    this.lB_(e ?? l.ExploreSkillIdListServer, t ?? l.FunctionIdListServer, o ?? l.CurrentEquipItemId, r, n);
  }
  static FunctionOpenRequest(e) {
    if (e !== 0 && e !== undefined && (e = ModelManager_1.ModelManager.RouletteModel.GetFuncDataByFuncId(e))) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "轮盘请求打开界面", ["Function Id", e.UnlockCondition]);
      }
      if (e.UnlockCondition) {
        ControllerHolder_1.ControllerHolder.FunctionController.OpenFunctionRelateView(e.UnlockCondition);
      } else {
        RouletteFunctionOpenController_1.RouletteFunctionOpenController.OpenRelateView(e.FuncId);
      }
    }
  }
  static EquipItemSetRequest(e, t, o = 0) {
    if (ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn) {
      RouletteController.RefreshExploreSkillButton();
    } else {
      ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(3001, o);
      RouletteController.ExploreSkillSetRequest(3001, t);
    }
  }
  static RefreshExploreSkillButton() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnChangeSelectedExploreId);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnSkillButtonSkillIdRefresh, 7);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Phantom", 37, "刷新探索技能按钮表现");
    }
  }
  static OnUseEquipItem() {
    var e = ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId;
    if (ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn) {
      if (ControllerHolder_1.ControllerHolder.SpecialItemController.IsSpecialItem(e)) {
        t = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(e);
        if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !t.UseInstance) {
          ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsById("CanNotUseInstance");
          return;
        } else {
          ControllerHolder_1.ControllerHolder.InventoryController.RequestItemUse(e, 1);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Phantom", 37, "请求使用特殊道具", ["道具Id", e]);
          }
          ModelManager_1.ModelManager.RouletteModel.SendExploreToolItemUseLogData(e);
          return;
        }
      }
      if (ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(e)) {
        var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
        if (!t) {
          return;
        }
        ItemUseLogic_1.ItemUseLogic.TryUseBuffItem(e, 1, true, t.GetConfigId);
      } else {
        ControllerHolder_1.ControllerHolder.InventoryController.TryUseItem(e, 1);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "请求使用普通道具", ["道具Id", e]);
      }
      ModelManager_1.ModelManager.RouletteModel.SendExploreToolItemUseLogData(e);
    }
  }
  static OpenEmptyTips() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(143);
    e.FunctionMap.set(2, () => {
      RouletteController.OpenAssemblyView(0, RouletteDefine_1.DEFAULT_ITEM_ROULETTE_GRID_INDEX, 3001);
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("PhantomExploreView", RouletteController.iVe, "RouletteController.CanOpenView");
    UiManager_1.UiManager.AddOpenViewCheckFunction("PhantomExploreSetView", RouletteController.U0o, "RouletteController.CanOpenSetView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("PhantomExploreView", RouletteController.iVe);
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("PhantomExploreSetView", RouletteController.U0o);
  }
  static OpenRouletteMainView(e) {
    UiManager_1.UiManager.OpenView("PhantomExploreView", e);
  }
  static OpenAssemblyView(e = 0, t, o) {
    var r = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen();
    var n = ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen();
    var r = e === 0 ? r : n;
    return !UiManager_1.UiManager.IsViewOpen("PhantomExploreSetView") && !!r && !(n = {
      RouletteType: e,
      SelectGridIndex: t,
      EndSwitchSkillId: o
    }, UiManager_1.UiManager.OpenView("PhantomExploreSetView", n), 0);
  }
  static CheckCanExploreSkillEquip(e) {
    e = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    return !!e && e.CanEquip;
  }
  static ListenRelatedTags(e) {
    var t = e?.Entity?.GetComponent(194);
    this.StopListenRelatedTags();
    var o = ModelManager_1.ModelManager.RouletteModel.RelatedTagIdPriorityList;
    var r = ModelManager_1.ModelManager.RouletteModel.RelatedTagIdExistPriorityList;
    for (let e = 0; e < o.length; e++) {
      var n = o[e];
      t?.AddTagAddOrRemoveListener(n, this._B_);
      r[e] = t?.HasTag(n) ?? false;
    }
    ModelManager_1.ModelManager.RouletteModel.RelatedTagEntityHandle = e;
    this.L5_(o, r);
  }
  static StopListenRelatedTags() {
    var e = ModelManager_1.ModelManager.RouletteModel.RelatedTagEntityHandle;
    if (e) {
      var t = e.Entity?.GetComponent(194);
      if (t) {
        for (const o of ModelManager_1.ModelManager.RouletteModel.RelatedTagIdPriorityList) {
          t.RemoveTagAddOrRemoveListener(o, this._B_);
        }
      }
      ModelManager_1.ModelManager.RouletteModel.RelatedTagEntityHandle = undefined;
    }
  }
  static L5_(t, o) {
    for (let e = 0; e < o.length; e++) {
      var r;
      if (o[e]) {
        r = t[e];
        ModelManager_1.ModelManager.RouletteModel.ActiveReplaceConfig(r);
        return;
      }
    }
    ModelManager_1.ModelManager.RouletteModel.DisActiveReplaceConfig();
  }
}
exports.RouletteController = RouletteController;
(_a = RouletteController).YHt = () => {
  RouletteController.OpenAssemblyView();
};
RouletteController.D0o = (e, t) => {
  if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === e) {
    RouletteController.RefreshExploreSkillButton();
  }
};
RouletteController.p8_ = () => {
  if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === 1018) {
    RouletteController.RefreshExploreSkillButton();
  }
};
RouletteController.qdi = (e, t) => {
  RouletteController.L0o(e);
  var o = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
  var o = ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.get(o);
  if ((o &&= o.Cost) && o.size > 0 && ([o] = o.keys(), o === e)) {
    RouletteController.RefreshExploreSkillButton();
  }
};
RouletteController.L0o = e => {
  if (e === ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId) {
    if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) === 0) {
      _a.SaveCurrentRouletteData(undefined, undefined, 0);
      ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(3002);
      RouletteController.ExploreSkillSetRequest(3002);
    } else {
      RouletteController.RefreshExploreSkillButton();
    }
  }
};
RouletteController.T0o = (e, t, o) => {
  switch (t) {
    case 210013:
      RouletteController.OnUseEquipItem();
      break;
    case 210018:
      RouletteController.OpenEmptyTips();
      break;
    case 210015:
    case 210016:
    case 210017:
      ControllerHolder_1.ControllerHolder.MapExploreToolController.CheckUseMapExploreTool(e, t);
      break;
    case 210011:
      ControllerHolder_1.ControllerHolder.AdviceController.OpenAdviceCreateView();
      break;
    case 210012:
      ControllerHolder_1.ControllerHolder.PhotographController.PhotographFastScreenShot();
  }
};
RouletteController.iVe = (e, t) => {
  var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  return !!o && !!o.Entity && t.CanOpenView();
};
RouletteController.U0o = e => {
  var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  return !!t && !!t.Entity && (ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() || ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen());
};
RouletteController.xie = (e, t) => {
  _a.StopListenRelatedTags();
  _a.ListenRelatedTags(e);
};
RouletteController._B_ = (e, t) => {
  var o;
  var r;
  if (ModelManager_1.ModelManager.RouletteModel.RelatedTagEntityHandle?.Entity?.GetComponent(194)) {
    o = ModelManager_1.ModelManager.RouletteModel.RelatedTagIdPriorityList;
    (r = ModelManager_1.ModelManager.RouletteModel.RelatedTagIdExistPriorityList)[o.indexOf(e)] = t;
    _a.L5_(o, r);
  }
};
RouletteController.nye = () => {
  var e;
  if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()) {
    e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    if (e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) {
      ModelManager_1.ModelManager.RouletteModel.TryActiveFunctionRouletteReplaceConfig(e.InstSubType);
    }
  } else {
    ModelManager_1.ModelManager.RouletteModel.DisActiveFunctionRouletteReplaceConfig();
  }
}; //# sourceMappingURL=RouletteController.js.map