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
const RouletteAssemblyViewProxy_1 = require("./ViewProxy/RouletteAssemblyViewProxy");
class RouletteController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    InputManager_1.InputManager.RegisterOpenViewFunc("PhantomExploreSetView", RouletteController.YHt);
    return true;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(17973, e => {
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "推送探索技能设置更新信息");
        }
        e = e.$Ps;
        ModelManager_1.ModelManager.ExploreModel.SetDefaultExploreSkillId(e);
        ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId = e;
      }
    });
    Net_1.Net.Register(15986, e => {
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "推送当前轮盘保存的数据");
        }
        ModelManager_1.ModelManager.RouletteModel.UpdateRouletteData(e.HPs);
      }
    });
    Net_1.Net.Register(24974, e => {
      if (e) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "推送探索技能解锁", ["Id", e.r5n]);
        }
        ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkill(e.r5n);
      }
    });
    Net_1.Net.Register(16541, e => {
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
    Net_1.Net.UnRegister(17973);
    Net_1.Net.UnRegister(15986);
    Net_1.Net.UnRegister(24974);
    Net_1.Net.UnRegister(16541);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharUseSkill, this.T0o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, this.L0o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnUseBuffItem, this.L0o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnMapExploreToolPlaceNumUpdated, this.D0o);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnRefreshTempFishingPointNum, this.p8_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharUseSkill, this.T0o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemUse, this.L0o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnUseBuffItem, this.L0o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnMapExploreToolPlaceNumUpdated, this.D0o);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnRefreshTempFishingPointNum, this.p8_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, this.qdi);
  }
  static ExploreSkillSetRequest(e, t, o = false) {
    if (this.CheckCanExploreSkillEquip(e)) {
      const r = ModelManager_1.ModelManager.RouletteModel.GetCurrentExploreRouletteListData();
      var n;
      if (!r.IsExploreSkillIdAllowEquip(e) || (n = ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList.at(-1)) === undefined && ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId === e || n === e) {
        t?.(false);
      } else {
        ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList.push(e);
        (n = new Protocol_1.Aki.Protocol.Cts()).r5n = e;
        n.T0a = o;
        n.o6s = RouletteDefine_1.rouletteTypeDefine[r.RouletteType];
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Phantom", 37, "请求设置探索技能", ["skillId", e], ["RouletteType", r.RouletteType]);
        }
        Net_1.Net.Call(26867, Protocol_1.Aki.Protocol.Cts.create(n), e => {
          ModelManager_1.ModelManager.RouletteModel.OnSettingExploreSkillIdList.shift();
          if (e) {
            if (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
              ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId = e.r5n;
              r.EquipExploreSkillIdServer = e.r5n;
              t?.(true);
            } else {
              t?.(false);
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 25083);
            }
          } else {
            t?.(false);
          }
        });
      }
    } else {
      t?.(false);
    }
  }
  static SaveRouletteDataRequest(e, t) {
    var o = Protocol_1.Aki.Protocol.vts.create();
    var n = new Protocol_1.Aki.Protocol.s6s();
    n.KHn = e.RouletteIdList;
    n.QHn = e.ExtraItemId;
    n.$Ps = e.EquipExploreSkillId;
    o.uOm = n;
    o.o6s = RouletteDefine_1.rouletteTypeDefine[e.RouletteType];
    Net_1.Net.Call(15340, o, e => {
      if (e) {
        if (e.G9n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (e.uOm) {
            ModelManager_1.ModelManager.RouletteModel.UpdateRouletteDataByType(e.o6s, e.uOm);
          }
          t?.(true);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.G9n, 18777);
          t?.(false);
        }
      } else {
        t?.(false);
      }
    });
  }
  static SaveExploreRouletteExtraItemId(e, t) {
    var o = ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(0).GetRouletteListSaveData();
    o.ExtraItemId = e;
    this.SaveRouletteDataRequest(o, t);
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
      ModelManager_1.ModelManager.ExploreModel.SetExploreSkillId(3001, o, "EquipItemSetRequest");
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
  static GetCurrentRouletteMainViewProxy() {
    return ModelManager_1.ModelManager.RouletteModel.GetCurrentExploreRouletteListData().GetRouletteMainViewProxy();
  }
  static OpenRouletteMainView(e) {
    UiManager_1.UiManager.OpenView("PhantomExploreView", e);
  }
  static OpenAssemblyView(e = 0, t, o) {
    var n;
    if (!UiManager_1.UiManager.IsViewOpen("PhantomExploreSetView")) {
      (n = new RouletteAssemblyViewProxy_1.RouletteAssemblyViewProxy()).OpenParam = {
        RouletteType: e,
        SelectGridIndex: t,
        EndSwitchSkillId: o
      };
      UiManager_1.UiManager.OpenView("PhantomExploreSetView", n);
    }
    return false;
  }
  static CheckCanExploreSkillEquip(e) {
    var t = ConfigManager_1.ConfigManager.RouletteConfig.GetExploreConfigById(e);
    return !!t && (e !== 3001 || ModelManager_1.ModelManager.RouletteModel.CurrentEquipItemId !== 0) && t.CanEquip;
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
      _a.SaveExploreRouletteExtraItemId(0);
    } else {
      RouletteController.RefreshExploreSkillButton();
    }
  }
};
RouletteController.T0o = (e, t, o) => {
  ControllerHolder_1.ControllerHolder.RouletteExploreSkillController.UseExploreSkillId(e, t);
};
RouletteController.iVe = (e, t) => {
  var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  return !!o && !!o.Entity && t.CanOpenView();
};
RouletteController.U0o = (e, t) => {
  var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
  return !!o && !!o.Entity && t.CanOpenView();
}; //# sourceMappingURL=RouletteController.js.map