"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoAbyssActivityController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const DangoAbyssRootView_1 = require("../../../Dango/DangoAbyss/View/DangoAbyssRootView");
const DangoAbyssSubView_1 = require("../../../Dango/DangoAbyss/View/DangoAbyssSubView");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const DangoAbyssActivityData_1 = require("./DangoAbyssActivityData");
class DangoAbyssActivityController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Io_ = e => {
      var t = this.cvc();
      if (t) {
        t.OnRoleInfoUpdate(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssRoleInfoUpdate);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }
    };
    this.uvc = e => {
      var t = this.cvc();
      if (t) {
        t.OnAddRoleInfo(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssAddRole);
        const o = new Map();
        e.Y7n.forEach(e => {
          o.set(e.s5n, e.F6n);
        });
        ControllerHolder_1.ControllerHolder.DangoAbyssController.OpenGetDangoView(o);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }
    };
    this.dvc = e => {
      var t = this.cvc();
      if (t) {
        t.OnPluginInfoUpdate(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssPluginInfoUpdate);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }
    };
    this.mvc = e => {
      var t = this.cvc();
      if (t) {
        t.OnPluginRemove(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssPluginInfoUpdate);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }
    };
    this.VNc = e => {
      var t = this.cvc();
      if (t) {
        t.OnPluginAdd(e);
        const o = new Map();
        e.F0c.forEach(e => {
          o.set(e.L8n, e.m9n);
        });
        ControllerHolder_1.ControllerHolder.ItemHintController.AddAbyssItemList(o);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssPluginInfoUpdate);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }
    };
    this.fvc = e => {
      var t = this.cvc();
      if (t) {
        t.OnUpdateRewardIdList(e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssRewardStateUpdate);
        e = t.Id;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshAbyssRewardRedDot, e);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, e);
      } else if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
      }
    };
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiView_CelebrationGuideMain";
  }
  OnCreateSubPageComponent(e) {
    return new DangoAbyssSubView_1.DangoAbyssSubView();
  }
  OnCreateActivityData(e) {
    return new DangoAbyssActivityData_1.DangoAbyssActivityData();
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(28089, this.Io_);
    Net_1.Net.Register(21178, this.uvc);
    Net_1.Net.Register(27718, this.dvc);
    Net_1.Net.Register(29794, this.mvc);
    Net_1.Net.Register(15996, this.fvc);
    Net_1.Net.Register(23649, this.VNc);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28089);
    Net_1.Net.UnRegister(21178);
    Net_1.Net.UnRegister(27718);
    Net_1.Net.UnRegister(29794);
    Net_1.Net.UnRegister(15996);
    Net_1.Net.UnRegister(23649);
  }
  cvc() {
    for (const e of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap()) {
      if (e[1].Type === Protocol_1.Aki.Protocol.uks.Proto_Abyss) {
        return e[1];
      }
    }
  }
  OpenCurrentRoleUpView() {
    var e;
    var t = this.cvc();
    if (t) {
      (e = new DangoAbyssRootView_1.DangoRootViewData()).ActivityId = t.Id;
      UiManager_1.UiManager.OpenView("DangoAbyssRootView", e);
    } else if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Activity", 27, "当前深渊团子没有开启");
    }
  }
  static RequestGetAbyssRewardList(e) {
    var t = new Protocol_1.Aki.Protocol.M0c();
    t.BVn = e;
    Net_1.Net.Call(15502, t, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18053);
      }
    });
  }
  static RequestAbyssDangoLevelUp(t, o) {
    var e = new Protocol_1.Aki.Protocol.I0c();
    e.s5n = t;
    e.F6n = o;
    Net_1.Net.Call(20589, e, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24410);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssDangoLevelUp, t, o);
      }
    });
  }
  static RequestPutPluginOnDango(e, t, o) {
    var i = new Protocol_1.Aki.Protocol.b0c();
    i.Q0c = e;
    i.j0c = t;
    Net_1.Net.Call(17967, i, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20492);
      } else {
        this.ShowEquipTipsByState(o);
      }
    });
  }
  static RequestPluginRecovery(e) {
    var t = new Protocol_1.Aki.Protocol.w0c();
    t.cPc = e;
    Net_1.Net.Call(25288, t, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17026);
      } else {
        e = e.uPc;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnAbyssPluginRecovery, e);
      }
    });
  }
  static GetAbyssChallengeByActivityId(e) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    if (e) {
      return e.GetAbyssChallengeDataList();
    } else {
      return [];
    }
  }
  static GetAbyssChallengeRankListByActivityId(e) {
    e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
    if (e) {
      return e.GetAbyssChallengeRankList();
    } else {
      return [];
    }
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
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Text_DangoEquipSuccessPutOn_Text");
    }
  }
}
exports.DangoAbyssActivityController = DangoAbyssActivityController;
//# sourceMappingURL=DangoAbyssActivityController.js.map