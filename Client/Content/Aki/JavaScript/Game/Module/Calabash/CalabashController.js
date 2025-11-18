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
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class CalabashController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveBattleView, CalabashController.Oft);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveBattleView, CalabashController.Oft);
  }
  static OpenCalabashUpgradeSuccessView(e) {
    UiManager_1.UiManager.OpenView("CalabashUpgradeSuccessView", e);
  }
  static kft() {
    if (!UiManager_1.UiManager.IsViewShow("CalabashUnlockItemView") && !!UiManager_1.UiManager.IsViewShow("BattleView") && !ModelManager_1.ModelManager.SundryModel.IsBlockTips) {
      UiManager_1.UiManager.OpenView("CalabashUnlockItemView", ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.shift());
    }
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25240, this.Fft);
    Net_1.Net.Register(15894, this.Vft);
    Net_1.Net.Register(26061, this.Hft);
    Net_1.Net.Register(24902, this.jft);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25240);
    Net_1.Net.UnRegister(15894);
    Net_1.Net.UnRegister(26061);
    Net_1.Net.UnRegister(24902);
  }
  static RequestMultiCalabashLevelReward(e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Calabash", 10, "请求领取幻象等级奖励");
    }
    var a = Protocol_1.Aki.Protocol.C8u.create();
    a.F6n = e;
    Net_1.Net.Call(15448, a, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29444);
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
    Net_1.Net.Call(17169, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20466);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRecoveryResult, e);
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
    Net_1.Net.Call(23128, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19858);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRecoveryBatchResult, e);
        }
      }
    });
  }
  static JumpToCalabashCollectTabView(e) {
    this.JumpToCalabashRootView("CalabashCollectTabView", e);
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
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Text_UnlockNotice_Text");
    }
  }
  static RequestPhantomPolishRequest(e, a) {
    var o = Protocol_1.Aki.Protocol.Jrc.create();
    o.b9n = e;
    o.zrc = a;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Calabash", 75, "RequestPhantomPolishRequest", ["id", e], ["propItemId", a]);
    }
    Net_1.Net.Call(28904, o, e => {
      if (e && e.xPs) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26576);
        } else {
          ModelManager_1.ModelManager.InventoryModel.UpdatePhantomItemData(e.xPs);
          ModelManager_1.ModelManager.PhantomBattleModel.UpdatePhantomBattleData(e.xPs);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnVisionRefineResult, e);
        }
      }
    });
  }
}
exports.CalabashController = CalabashController;
(_a = CalabashController).Oft = () => {
  if (ModelManager_1.ModelManager.CalabashModel.CalabashUnlockTipsList.length !== 0) {
    CalabashController.kft();
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
}; //# sourceMappingURL=CalabashController.js.map