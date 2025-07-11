"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteController = undefined;
const Info_1 = require("../../../Core/Common/Info");
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
const AdviceController_1 = require("../Advice/AdviceController");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const FunctionController_1 = require("../Functional/FunctionController");
const ItemUseLogic_1 = require("../Inventory/ItemUseLogic");
const SpecialItemController_1 = require("../Item/SpecialItem/SpecialItemController");
const MapExploreToolController_1 = require("../MapExploreTool/MapExploreToolController");
const PhotographController_1 = require("../Photograph/PhotographController");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const RouletteDefine_1 = require("./Data/RouletteDefine");
const RouletteFunctionOpenController_1 = require("./RouletteFunctionOpenController");
class RouletteController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    InputManager_1.InputManager.RegisterOpenViewFunc("PhantomExploreSetView", RouletteController.YHt);
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20429, e => {
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "推送探索技能设置更新信息");
        }
        e = e.$Ps;
        ModelManager_1.ModelManager.ExploreModel.SetDefaultExploreSkillId(e);
        ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId = e;
      }
    });
    Net_1.Net.Register(26144, e => {
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "推送当前轮盘保存的数据");
        }
        ModelManager_1.ModelManager.RouletteModel.UpdateRouletteData(e.HPs);
      }
    });
    Net_1.Net.Register(21299, e => {
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "推送探索技能解锁", ["Id", e.r5n]);
        }
        ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkill(e.r5n);
      }
    });
    Net_1.Net.Register(19663, e => {
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
        for (const o of e) {
          ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkill(o);
        }
      }
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20429);
    Net_1.Net.UnRegister(26144);
    Net_1.Net.UnRegister(21299);
    Net_1.Net.UnRegister(19663);
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
  static ExploreSkillSetRequest(e, o, t = false) {
    var r;
    if (!this.CheckCanExploreSkillEquip(e) || (r = ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList.at(-1)) === undefined && ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === e || r === e) {
      o?.(false);
    } else {
      ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList.push(e);
      (r = new Protocol_1.Aki.Protocol.Cts()).r5n = e;
      r.T0a = t;
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "请求设置探索技能", ["skillId", e]);
      }
      Net_1.Net.Call(25461, Protocol_1.Aki.Protocol.Cts.create(r), e => {
        ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList.shift();
        if (e) {
          if (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId = e.r5n;
            o?.(true);
          } else {
            o?.(false);
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 27524);
          }
        } else {
          o?.(false);
        }
      });
    }
  }
  static SetLastSkillId() {
    var e = ModelManager_1.ModelManager.RouletteModel.GetLastSkillId();
    ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(e);
    RouletteController.ExploreSkillSetRequest(e);
  }
  static lB_(e, o, t, r = false, n) {
    var l = new Protocol_1.Aki.Protocol.vts();
    var a = new Array();
    var i = new Protocol_1.Aki.Protocol.s6s();
    i.KHn = e;
    i.QHn = t;
    a.push(i);
    var e = new Protocol_1.Aki.Protocol.s6s();
    e.KHn = o;
    a.push(e);
    l.XHn = a;
    Net_1.Net.Call(28955, Protocol_1.Aki.Protocol.vts.create(l), e => {
      if (e) {
        if (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (r) {
            ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("SaveChangeSuccess");
          }
          ModelManager_1.ModelManager.RouletteModel.UpdateRouletteData(e.XHn);
          n?.(true);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 29159);
          n?.(false);
        }
      } else {
        n?.(false);
      }
    });
  }
  static SaveCurrentRouletteData(e, o, t, r = false, n) {
    var l = ModelManager_1.ModelManager.RouletteModel;
    this.lB_(e ?? l.ExploreSkillIdListServer, o ?? l.FunctionIdListServer, t ?? l.CurrentEquipItemId, r, n);
  }
  static FunctionOpenRequest(e) {
    if (e !== 0 && e !== undefined && (e = ModelManager_1.ModelManager.RouletteModel.GetFuncDataByFuncId(e))) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Phantom", 37, "轮盘请求打开界面", ["Function Id", e.UnlockCondition]);
      }
      if (e.UnlockCondition) {
        FunctionController_1.FunctionController.OpenFunctionRelateView(e.UnlockCondition);
      } else {
        RouletteFunctionOpenController_1.RouletteFunctionOpenController.OpenRelateView(e.FuncId);
      }
    }
  }
  static EquipItemSetRequest(e, o, t = 0) {
    if (ModelManager_1.ModelManager.RouletteModel.IsEquipItemSelectOn) {
      RouletteController.RefreshExploreSkillButton();
    } else {
      ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(3001, t);
      RouletteController.ExploreSkillSetRequest(3001, o);
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
      if (SpecialItemController_1.SpecialItemController.IsSpecialItem(e)) {
        o = ConfigManager_1.ConfigManager.SpecialItemConfig.GetConfig(e);
        if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !o.UseInstance) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("CanNotUseInstance");
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
        var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
        if (!o) {
          return;
        }
        ItemUseLogic_1.ItemUseLogic.TryUseBuffItem(e, 1, true, o.GetConfigId);
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
  static OpenAssemblyView(e = 0, o, t) {
    var r = ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen();
    var n = ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen();
    var r = e === 0 ? r : n;
    return !UiManager_1.UiManager.IsViewOpen("PhantomExploreSetView") && !!r && !(n = {
      RouletteType: e,
      SelectGridIndex: o,
      EndSwitchSkillId: t
    }, UiManager_1.UiManager.OpenView("PhantomExploreSetView", n), 0);
  }
  static CheckCanExploreSkillEquip(e) {
    e = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    return !!e && e.CanEquip;
  }
  static ListenRelatedTags(e) {
    var o = e?.Entity?.GetComponent(193);
    this.StopListenRelatedTags();
    var t = ModelManager_1.ModelManager.RouletteModel.RelatedTagIdPriorityList;
    var r = ModelManager_1.ModelManager.RouletteModel.RelatedTagIdExistPriorityList;
    for (let e = 0; e < t.length; e++) {
      var n = t[e];
      o?.AddTagAddOrRemoveListener(n, this._B_);
      r[e] = o?.HasTag(n) ?? false;
    }
    ModelManager_1.ModelManager.RouletteModel.RelatedTagEntityHandle = e;
    this.L5_(t, r);
  }
  static StopListenRelatedTags() {
    var e = ModelManager_1.ModelManager.RouletteModel.RelatedTagEntityHandle;
    if (e) {
      var o = e.Entity?.GetComponent(193);
      if (o) {
        for (const t of ModelManager_1.ModelManager.RouletteModel.RelatedTagIdPriorityList) {
          o.RemoveTagAddOrRemoveListener(t, this._B_);
        }
      }
      ModelManager_1.ModelManager.RouletteModel.RelatedTagEntityHandle = undefined;
    }
  }
  static L5_(o, t) {
    for (let e = 0; e < t.length; e++) {
      var r;
      if (t[e]) {
        r = o[e];
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
RouletteController.D0o = (e, o) => {
  if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === e) {
    RouletteController.RefreshExploreSkillButton();
  }
};
RouletteController.p8_ = () => {
  if (ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === 1018) {
    RouletteController.RefreshExploreSkillButton();
  }
};
RouletteController.qdi = (e, o) => {
  RouletteController.L0o(e);
  var t = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
  var t = ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.get(t);
  if ((t &&= t.Cost) && t.size > 0 && ([t] = t.keys(), t === e)) {
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
RouletteController.T0o = (e, o, t) => {
  switch (o) {
    case 210013:
      RouletteController.OnUseEquipItem();
      break;
    case 210018:
      RouletteController.OpenEmptyTips();
      break;
    case 210015:
    case 210016:
    case 210017:
      MapExploreToolController_1.MapExploreToolController.CheckUseMapExploreTool(e, o);
      break;
    case 210011:
      AdviceController_1.AdviceController.OpenAdviceCreateView();
      break;
    case 210012:
      PhotographController_1.PhotographController.PhotographFastScreenShot();
  }
};
RouletteController.iVe = (e, o) => {
  var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  return !!t && !!t.Entity && (Info_1.Info.IsInGamepad() ? ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(true) || ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen() : (o = (t = o ?? []).length > 0 ? Number(t[0]) : 1, ModelManager_1.ModelManager.RouletteModel.GetRouletteActionOpenConfig(o) === 0 ? ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen(true) : ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen()));
};
RouletteController.U0o = e => {
  var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  return !!o && !!o.Entity && (ModelManager_1.ModelManager.RouletteModel.IsExploreRouletteOpen() || ModelManager_1.ModelManager.RouletteModel.IsFunctionRouletteOpen());
};
RouletteController.xie = (e, o) => {
  _a.StopListenRelatedTags();
  _a.ListenRelatedTags(e);
};
RouletteController._B_ = (e, o) => {
  var t;
  var r;
  if (ModelManager_1.ModelManager.RouletteModel.RelatedTagEntityHandle?.Entity?.GetComponent(193)) {
    t = ModelManager_1.ModelManager.RouletteModel.RelatedTagIdPriorityList;
    (r = ModelManager_1.ModelManager.RouletteModel.RelatedTagIdExistPriorityList)[t.indexOf(e)] = o;
    _a.L5_(t, r);
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