"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlySkinController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../../Ui/Base/UiControllerBase");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
class FlySkinController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {}
  static OnRemoveEvents() {}
  static OnRegisterNetEvent() {
    Net_1.Net.Register(28369, this.Bkc);
    Net_1.Net.Register(15714, this.kkc);
    Net_1.Net.Register(18980, this.mGc);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28369);
    Net_1.Net.UnRegister(15714);
    Net_1.Net.UnRegister(18980);
  }
  static FlySkinWearRequest(t, o) {
    var e;
    if (ControllerHolder_1.ControllerHolder.SkinController.CheckCanWearSkinAndShowTip()) {
      (e = Protocol_1.Aki.Protocol.HDc.create()).Q6n = t;
      e.Z7n = o;
      Net_1.Net.Call(29464, e, e => {
        if (e) {
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            ModelManager_1.ModelManager.FlySkinModel.EquipFlySkin(t, o);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFlySkinEquipResponse, t, o);
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("FlySkinReplaceTip");
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15224);
          }
        }
      });
    }
  }
  static FlySkinWearAllRoleRequest(e) {
    var t;
    if (ControllerHolder_1.ControllerHolder.SkinController.CheckCanWearSkinAndShowTip()) {
      (t = Protocol_1.Aki.Protocol.WDc.create()).Z7n = e;
      Net_1.Net.Call(28237, t, e => {
        if (e) {
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            var t = e.zDc;
            for (const o of t) {
              ModelManager_1.ModelManager.FlySkinModel.EquipFlySkin(o.Q6n, o.Z7n);
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFlySkinEquipToAllRoleResponse, t);
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27501);
          }
        }
      });
    }
  }
  static FlySkinUnLoadRequest(t, o) {
    var e;
    if (ControllerHolder_1.ControllerHolder.SkinController.CheckCanWearSkinAndShowTip()) {
      (e = Protocol_1.Aki.Protocol.KDc.create()).Q6n = t;
      e.Z7n = o;
      Net_1.Net.Call(23890, e, e => {
        if (e) {
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            ModelManager_1.ModelManager.FlySkinModel.UnLoadRoleFlySkinBySkinId(t, o);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFlySkinUnLoadResponse, t, o);
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25082);
          }
        }
      });
    }
  }
  static FlySkinAllUnLoadRequest(o) {
    var e;
    if (ControllerHolder_1.ControllerHolder.SkinController.CheckCanWearSkinAndShowTip()) {
      (e = Protocol_1.Aki.Protocol.DNc.create())._Gc = o;
      Net_1.Net.Call(23313, e, e => {
        if (e) {
          if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
            for (const t of e.FNc) {
              ModelManager_1.ModelManager.FlySkinModel.UnLoadRoleFlySkinBySkinType(t, o);
            }
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFlySkinAllUnLoadResponse, o);
          } else {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25082);
          }
        }
      });
    }
  }
  static UpdateAllRoleSkinRedDot() {
    ModelManager_1.ModelManager.RedDotModel.GetRedDot("RoleSkin")?.UpdateAllRedDotData();
  }
}
exports.FlySkinController = FlySkinController;
(_a = FlySkinController).Bkc = e => {
  if (e) {
    ModelManager_1.ModelManager.FlySkinModel.UpdateFlySkinEquipDataList(e.Gxs);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleFlyEquipNotify);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFlySkinTabRedDot);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFlySkinChildTabRed, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFlySkinChildTabRed, 0);
  }
};
FlySkinController.kkc = e => {
  if (e) {
    e = e.zDc;
    for (const t of e) {
      ModelManager_1.ModelManager.FlySkinModel.EquipFlySkin(t.Q6n, t.Z7n);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleFlyEquipChangeNotify, e);
  }
};
FlySkinController.mGc = e => {
  if (e) {
    e = e.yqc;
    for (const t of e) {
      ModelManager_1.ModelManager.FlySkinModel.AddUnlockSkinId(t);
    }
    _a.UpdateAllRoleSkinRedDot();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFlySkinChildTabRed, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFlySkinChildTabRed, 0);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFlyEquipAddNotify, e);
  }
}; //# sourceMappingURL=FlySkinController.js.map