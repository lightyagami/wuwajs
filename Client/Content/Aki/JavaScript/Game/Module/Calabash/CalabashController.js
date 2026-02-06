"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CalabashController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const CalabashDefine_1 = require("./CalabashDefine");
const VisionRefineAttributeItem_1 = require("./New/VisionRefine/VisionRefineAttributeItem");
const VisionRefineSubResultView_1 = require("./New/VisionRefine/VisionRefineSubResultView");
class CalabashController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, CalabashController.Oft);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnVisionRefineSubNeedAck, CalabashController.k3g);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, CalabashController.Oft);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnVisionRefineSubNeedAck, CalabashController.k3g);
  }
  static OpenCalabashUpgradeSuccessView(e) {
    UiManager_1.UiManager.OpenView("CalabashUpgradeSuccessView", e);
  }
  static BuildRefineSubVerticalLeftDataByUid(a, o, t) {
    var r = [];
    for (let e = 0; e < 5; e++) {
      var n = new VisionRefineAttributeItem_1.VisionRefineAttributeItemData();
      if (a !== undefined) {
        var l = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(a)?.GetEquipmentViewPreviewData();
        if (l !== undefined && l[e] !== undefined) {
          n.NameTextId = l[e].GetSubPropName();
          n.NumberText = l[e].GetAttributeValueString();
          n.IsChosen = o.has(e);
          n.CanInteractive = false;
          l = l[e].PhantomSubProp.Yws;
          const i = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(l);
          n.IsRecommend = !!t && t.find(e => e.GetAttrId() === i.PropId && e.GetAddType() === i.AddType) !== undefined;
        } else {
          n.NameTextId = CalabashDefine_1.VISION_REFINE_NON_UPGRADE_TEXT_ID;
          n.CanInteractive = false;
        }
      } else {
        n.NameTextId = CalabashDefine_1.VISION_REFINE_UNSELECTED_TEXT_ID;
        n.CanInteractive = false;
      }
      r.push(n);
    }
    return r;
  }
  static BuildRefineSubVerticalRightDataByUid(a, o, t, r) {
    var n = [];
    for (let e = 0; e < 5; e++) {
      var l = new VisionRefineAttributeItem_1.VisionRefineAttributeItemData();
      if (a !== undefined) {
        var i = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomDataBase(a);
        var s = t.has(e);
        var i = i?.GetEquipmentViewPreviewData();
        if (i !== undefined && i[e] !== undefined) {
          var i = i[e];
          var _ = o[e].Yws;
          const C = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSubPropertyById(_);
          l.NameTextId = i.GetSubPropNameByPropId(_);
          l.NumberText = i.GetAttributeValueStringByPropId(_, o[e].e5n);
          l.ForceCheckboxActive = false;
          l.HasNewIcon = !s;
          l.IsChosen = s;
          l.CanInteractive = false;
          l.IsRecommend = !!r && r.find(e => e.GetAttrId() === C.PropId && e.GetAddType() === C.AddType) !== undefined;
        } else {
          l.NameTextId = CalabashDefine_1.VISION_REFINE_NON_UPGRADE_TEXT_ID;
          l.CanInteractive = false;
        }
      } else {
        l.NameTextId = CalabashDefine_1.VISION_REFINE_UNSELECTED_TEXT_ID;
        l.CanInteractive = false;
      }
      n.push(l);
    }
    return n;
  }
  static kft() {
    if (!UiManager_1.UiManager.IsViewShow("CalabashUnlockItemView") && !!UiManager_1.UiManager.IsViewShow("BattleView") && !ModelManager_1.ModelManager.SundryModel.IsBlockTips) {
      UiManager_1.UiManager.OpenView("CalabashUnlockItemView", ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.shift());
    }
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(29358, this.Fft);
    Net_1.Net.Register(27242, this.Vft);
    Net_1.Net.Register(26512, this.Hft);
    Net_1.Net.Register(19663, this.jft);
    Net_1.Net.Register(17895, this.PhantomDirectRefiningWeeklyResetNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29358);
    Net_1.Net.UnRegister(27242);
    Net_1.Net.UnRegister(26512);
    Net_1.Net.UnRegister(19663);
    Net_1.Net.UnRegister(17895);
  }
  static RequestMultiCalabashLevelReward(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Calabash", 10, "请求领取幻象等级奖励");
    }
    var a = Protocol_1.Aki.Protocol.C8u.create();
    a.F6n = e;
    Net_1.Net.Call(16635, a, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28094);
      }
    });
  }
  static RequestPhantomRefiningRequest(e) {
    const a = [];
    e.forEach(e => {
      a.push(e.IncId);
    });
    e = Protocol_1.Aki.Protocol.Gls.create();
    e.A8n = a;
    Net_1.Net.Call(29296, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21034);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRecoveryResult, e);
        }
      }
    });
  }
  static PhantomBatchDirectRefiningRequest(e) {
    const a = [];
    e.forEach(e => {
      a.push(e.IncId);
    });
    e = Protocol_1.Aki.Protocol.cyg.create();
    e.A8n = a;
    e.gyg = ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTargetFetterGroup;
    Net_1.Net.Call(24970, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22165);
        } else {
          ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTime = e.fyg;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRecoveryBatchResult, e);
        }
      }
    });
  }
  static RequestBatchRefiningRequest(e) {
    const a = [];
    e.forEach(e => {
      a.push(e.IncId);
    });
    e = Protocol_1.Aki.Protocol.$m_.create();
    e.A8n = a;
    Net_1.Net.Call(24585, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16828);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRecoveryBatchResult, e);
        }
      }
    });
  }
  static JumpToCalabashCollectTabView(e) {
    this.JumpToCalabashRootView("CalabashCollectTabView", {
      MonsterId: e
    });
  }
  static JumpToCalabashCollectTabViewOnlyShow(e, a) {
    this.JumpToCalabashRootView("CalabashCollectTabView", {
      MonsterId: e,
      OnlyShow: a
    });
  }
  static JumpToCalabashRootView(e, a) {
    let o = 10003;
    if (e === "VisionRecoveryTabView") {
      o = 10024001;
    } else if (e === "VisionRefineTabView") {
      o = 10083;
    }
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(o)) {
      e = {
        TabViewName: e,
        Param: a
      };
      UiManager_1.UiManager.OpenView("CalabashRootView", e);
    } else {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(CalabashDefine_1.VISION_REFINE_FUNCTION_NOT_OPEN_TIP_TEXT_ID);
    }
  }
  static RequestPhantomPolishRequest(e, a) {
    var o = Protocol_1.Aki.Protocol.Jrc.create();
    o.b9n = e;
    o.zrc = a;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Calabash", 75, "RequestPhantomPolishRequest", ["id", e], ["propItemId", a]);
    }
    Net_1.Net.Call(19067, o, e => {
      if (e && e.xPs) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20402);
        } else {
          ModelManager_1.ModelManager.InventoryModel.UpdatePhantomItemData(e.xPs);
          ModelManager_1.ModelManager.PhantomBattleModel.UpdatePhantomBattleData(e.xPs);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRefineResult, e);
        }
      }
    });
  }
  static async RequestPhantomBatchPolishRequest(e, a) {
    var o = Protocol_1.Aki.Protocol.vSg.create();
    o.izl = e;
    o.zrc = a;
    var e = await Net_1.Net.CallAsync(27069, o);
    if (e !== undefined) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28169);
      } else {
        for (const t of e.TSg) {
          ModelManager_1.ModelManager.InventoryModel.UpdatePhantomItemData(t);
          ModelManager_1.ModelManager.PhantomBattleModel.UpdatePhantomBattleData(t);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRefineBatchMainResult, e);
      }
    }
  }
  static async RequestPhantomVicePolishRequest(e, a) {
    var o = Protocol_1.Aki.Protocol.SSg.create();
    o.b9n = e;
    o.bSg = a;
    var e = await Net_1.Net.CallAsync(17066, o);
    if (e !== undefined) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17733);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Calabash", 64, "RequestPhantomVicePolishRequest", ["response", e]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRefineSubPreviewResult, e);
      }
    }
  }
  static async RequestPhantomVicePolishAckRequest(e, a) {
    var o = Protocol_1.Aki.Protocol.ESg.create();
    o.b9n = e;
    o.RSg = a;
    var e = await Net_1.Net.CallAsync(16180, o);
    if (e !== undefined && e.xPs !== undefined) {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15978);
      } else {
        ModelManager_1.ModelManager.InventoryModel.UpdatePhantomItemData(e.xPs);
        ModelManager_1.ModelManager.PhantomBattleModel.UpdatePhantomBattleData(e.xPs);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Calabash", 64, "RequestPhantomVicePolishAckRequest", ["response", e], ["ack", a]);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRefineSubResult, e, a);
      }
    }
  }
}
exports.CalabashController = CalabashController;
(_a = CalabashController).Oft = () => {
  if (ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.length !== 0) {
    CalabashController.kft();
  }
};
CalabashController.k3g = () => {
  var t;
  var r = ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomBattleDataMap();
  if (r !== undefined) {
    let e = undefined;
    let a = undefined;
    let o = undefined;
    for (var [n, l] of r) {
      if (l.GetUnAckSubProp().length > 0) {
        e = n;
        a = l.GetUnAckSubProp();
        o = l.GetLockSubPropIndices();
        break;
      }
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Calabash", 64, "OnVisionRefineSubNeedAck", ["uid", e]);
    }
    if (e !== undefined) {
      r = new VisionRefineSubResultView_1.VisionRefineBatchResultViewData();
      t = new Set(o);
      r.LeftAttrList = CalabashController.BuildRefineSubVerticalLeftDataByUid(e, t, undefined);
      r.RightAttrList = CalabashController.BuildRefineSubVerticalRightDataByUid(e, a, t, undefined);
      r.OnClickCancel = async () => {
        await ControllerHolder_1.ControllerHolder.CalabashController.RequestPhantomVicePolishAckRequest(e, false);
      };
      r.OnClickConfirm = async () => {
        await ControllerHolder_1.ControllerHolder.CalabashController.RequestPhantomVicePolishAckRequest(e, true);
      };
      r.UniqueId = e;
      r.ConfirmTipTextId = "Text_UnconfirmedResultTips_Text";
      UiManager_1.UiManager.OpenView("VisionRefineSubResultView", r);
    }
  }
};
CalabashController.Fft = e => {
  var a;
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Calabash", 10, "服务端推送吸收器信息");
  }
  if (ModelManager_1.ModelManager.CalabashModel.CalabashInstance && (a = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp(), ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel() !== e.ELs.F6n)) {
    a = {
      AddExp: false,
      PreLevel: ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel(),
      PreExp: a,
      CurLevel: e.ELs.F6n,
      CurExp: a
    };
    _a.OpenCalabashUpgradeSuccessView(a);
  }
  ModelManager_1.ModelManager.CalabashModel.SetCalabashInstanceBaseInfo(e.ELs);
  ModelManager_1.ModelManager.CalabashModel.SetCalabashInstanceConfigInfo(e.yLs);
  ModelManager_1.ModelManager.CalabashModel.UpdateCalabashDevelopRewardData();
};
CalabashController.Vft = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Calabash", 10, "服务端推送吸收器经验变化信息");
  }
  var a = e.TLs;
  var o = e.ILs;
  var t = ModelManager_1.ModelManager.CalabashModel.GetCurrentExp();
  var r = ModelManager_1.ModelManager.CalabashModel.GetCalabashLevel();
  var t = {
    AddExp: true,
    PreLevel: r,
    PreExp: t,
    CurLevel: a,
    CurExp: o
  };
  ModelManager_1.ModelManager.CalabashModel.SetCurrentExp(o);
  ModelManager_1.ModelManager.CalabashModel.SetCalabashLevel(a);
  ModelManager_1.ModelManager.CalabashModel.SetCalabashInstanceConfigInfo(e.yLs);
  ModelManager_1.ModelManager.CalabashModel.UpdateCalabashDevelopRewardData();
  _a.OpenCalabashUpgradeSuccessView(t);
  if (r < a) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RedDotRefreshCalabash);
  }
};
CalabashController.Hft = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Calabash", 10, "服务端更新的葫芦经验图谱信息");
  }
  ModelManager_1.ModelManager.CalabashModel.SetUnlockCalabashDevelopReward(e.LLs);
  ModelManager_1.ModelManager.CalabashModel.UpdateCalabashDevelopRewardData();
};
CalabashController.jft = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Calabash", 10, "服务端更新的葫芦已获得奖励等级列表数据");
  }
  ModelManager_1.ModelManager.CalabashModel.SetCalabashLevelsReward(e.RLs);
};
CalabashController.PhantomDirectRefiningWeeklyResetNotify = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Calabash", 5, "服务端更新定向融合次数");
  }
  ModelManager_1.ModelManager.CalabashModel.DirectionalFusionTime = e.fyg;
  if (UiManager_1.UiManager.IsViewOpen("CalabashRootView") && UiManager_1.UiManager.GetViewByName("CalabashRootView").GetIsVisionRecoveryTabViewOpen()) {
    (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(439)).FunctionMap.set(1, () => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.PhantomDirectRefiningWeeklyReset);
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
  }
}; //# sourceMappingURL=CalabashController.js.map