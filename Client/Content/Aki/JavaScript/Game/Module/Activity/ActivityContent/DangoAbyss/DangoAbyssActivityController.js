"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DangoAbyssActivityController = void 0;
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  DangoAbyssRootView_1 = require("../../../Dango/DangoAbyss/View/DangoAbyssRootView"),
  DangoAbyssSubView_1 = require("../../../Dango/DangoAbyss/View/DangoAbyssSubView"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  DangoAbyssActivityData_1 = require("./DangoAbyssActivityData");
class DangoAbyssActivityController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments), this.Io_ = e => {
      var t = this.cvc();
      t ? (t.OnRoleInfoUpdate(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate)) : Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启")
    }, this.uvc = e => {
      var t = this.cvc();
      if (t) {
        t.OnAddRoleInfo(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssAddRole);
        const o = new Map;
        e.Y7n.forEach(e => {
          o.set(e.s5n, e.F6n)
        }), ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenGetDangoView(o)
      } else Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启")
    }, this.dvc = e => {
      var t = this.cvc();
      t ? (t.OnPluginInfoUpdate(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssPluginInfoUpdate)) : Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启")
    }, this.mvc = e => {
      var t = this.cvc();
      t ? (t.OnPluginRemove(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssPluginInfoUpdate)) : Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启")
    }, this.VNc = e => {
      var t = this.cvc();
      if (t) {
        t.OnPluginAdd(e);
        const o = new Map;
        e.F0c.forEach(e => {
          o.set(e.L8n, e.m9n)
        }), ControllerHolder_1.ControllerHolder.ItemHintController.AddAbyssItemList(o), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssPluginInfoUpdate)
      } else Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启")
    }, this.fvc = e => {
      var t = this.cvc();
      t ? (t.OnUpdateRewardIdList(e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssRewardStateUpdate), e = t.Id, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAbyssRewardRedDot, e), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e)) : Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启")
    }
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiView_CelebrationGuideMain"
  }
  OnCreateSubPageComponent(e) {
    return new DangoAbyssSubView_1.DangoAbyssSubView
  }
  OnCreateActivityData(e) {
    return new DangoAbyssActivityData_1.DangoAbyssActivityData
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(21283, this.Io_), Net_1.Net.Register(21714, this.uvc), Net_1.Net.Register(15111, this.dvc), Net_1.Net.Register(19440, this.mvc), Net_1.Net.Register(26141, this.fvc), Net_1.Net.Register(21287, this.VNc)
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21283), Net_1.Net.UnRegister(21714), Net_1.Net.UnRegister(15111), Net_1.Net.UnRegister(19440), Net_1.Net.UnRegister(26141), Net_1.Net.UnRegister(21287)
  }
  cvc() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap())
      if (e[1].Type === Protocol_1.Aki.Protocol.uks.Proto_Abyss) return e[1]
  }
  OpenCurrentRoleUpView() {
    var e, t = this.cvc();
    t ? ((e = new DangoAbyssRootView_1.DangoRootViewData).ActivityId = t.Id, UiManager_1.UiManager.OpenView("DangoAbyssRootView", e)) : Log_1.Log.CheckInfo() && Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启")
  }
  static RequestGetAbyssRewardList(e) {
    var t = new Protocol_1.Aki.Protocol.M0c;
    t.BVn = e, Net_1.Net.Call(21992, t, e => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs && ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25337)
    })
  }
  static RequestAbyssDangoLevelUp(t, o) {
    var e = new Protocol_1.Aki.Protocol.I0c;
    e.s5n = t, e.F6n = o, Net_1.Net.Call(29683, e, e => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15940) : EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssDangoLevelUp, t, o)
    })
  }
  static RequestPutPluginOnDango(e, t, o) {
    var i = new Protocol_1.Aki.Protocol.b0c;
    i.Q0c = e, i.j0c = t, Net_1.Net.Call(26893, i, e => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22452) : this.ShowEquipTipsByState(o)
    })
  }
  static RequestPluginRecovery(e) {
    var t = new Protocol_1.Aki.Protocol.w0c;
    t.cPc = e, Net_1.Net.Call(16896, t, e => {
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18381) : (e = e.uPc, EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssPluginRecovery, e))
    })
  }
  static GetAbyssChallengeByActivityId(e) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return e ? e.GetAbyssChallengeDataList() : []
  }
  static GetAbyssChallengeRankListByActivityId(e) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    return e ? e.GetAbyssChallengeRankList() : []
  }
  static ShowEquipTipsByState(e) {
    switch (e) {
      case 2:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_DangoEquipSuccessSwitch_Text");
        break;
      case 3:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_DangoEquipSuccessTakeOff_Text");
        break;
      case 4:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_DangoEquipSuccessSwitch_Text");
        break;
      case 5:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_DangoEquipSuccessPutOn_Text");
        break;
      case 6:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_DangoEquipSuccessSwitch_Text");
        break;
      case 7:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_DangoEquipSuccessPutOn_Text")
    }
  }
}
exports.DangoAbyssActivityController = DangoAbyssActivityController;
//# sourceMappingURL=DangoAbyssActivityController.js.map