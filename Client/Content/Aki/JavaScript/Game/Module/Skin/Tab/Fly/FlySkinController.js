"use strict";
var _a;
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FlySkinController = void 0;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../../../Ui/Base/UiControllerBase"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
class FlySkinController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {}
  static OnRemoveEvents() {}
  static OnRegisterNetEvent() {
    Net_1.Net.Register(16288, this.Bkc), Net_1.Net.Register(23065, this.kkc), Net_1.Net.Register(22850, this.mGc)
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16288), Net_1.Net.UnRegister(23065), Net_1.Net.UnRegister(22850)
  }
  static FlySkinWearRequest(t, o) {
    var e;
    ControllerHolder_1.ControllerHolder.SkinController.CheckCanWearSkinAndShowTip() && ((e = Protocol_1.Aki.Protocol.HDc.create()).Q6n = t, e.Z7n = o, Net_1.Net.Call(29050, e, e => {
      e && (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ? (ModelManager_1.ModelManager.FlySkinModel.EquipFlySkin(t, o), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFlySkinEquipResponse, t, o), ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("FlySkinReplaceTip")) : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17666))
    }))
  }
  static FlySkinWearAllRoleRequest(e) {
    var t;
    ControllerHolder_1.ControllerHolder.SkinController.CheckCanWearSkinAndShowTip() && ((t = Protocol_1.Aki.Protocol.WDc.create()).Z7n = e, Net_1.Net.Call(26945, t, e => {
      if (e)
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          var t = e.zDc;
          for (const o of t) ModelManager_1.ModelManager.FlySkinModel.EquipFlySkin(o.Q6n, o.Z7n);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFlySkinEquipToAllRoleResponse, t)
        } else ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19467)
    }))
  }
  static FlySkinUnLoadRequest(t, o) {
    var e;
    ControllerHolder_1.ControllerHolder.SkinController.CheckCanWearSkinAndShowTip() && ((e = Protocol_1.Aki.Protocol.KDc.create()).Q6n = t, e.Z7n = o, Net_1.Net.Call(23396, e, e => {
      e && (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ? (ModelManager_1.ModelManager.FlySkinModel.UnLoadRoleFlySkinBySkinId(t, o), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFlySkinUnLoadResponse, t, o)) : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16027))
    }))
  }
  static FlySkinAllUnLoadRequest(o) {
    var e;
    ControllerHolder_1.ControllerHolder.SkinController.CheckCanWearSkinAndShowTip() && ((e = Protocol_1.Aki.Protocol.DNc.create())._Gc = o, Net_1.Net.Call(19381, e, e => {
      if (e)
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          for (const t of e.FNc) ModelManager_1.ModelManager.FlySkinModel.UnLoadRoleFlySkinBySkinType(t, o);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFlySkinAllUnLoadResponse, o)
        } else ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16027)
    }))
  }
  static UpdateAllRoleSkinRedDot() {
    ModelManager_1.ModelManager.RedDotModel.GetRedDot("RoleSkin")?.UpdateAllRedDotData()
  }
}
exports.FlySkinController = FlySkinController, (_a = FlySkinController).Bkc = e => {
  e && (ModelManager_1.ModelManager.FlySkinModel.UpdateFlySkinEquipDataList(e.Gxs), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleFlyEquipNotify), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFlySkinTabRedDot), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFlySkinChildTabRed, 1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFlySkinChildTabRed, 0))
}, FlySkinController.kkc = e => {
  if (e) {
    e = e.zDc;
    for (const t of e) ModelManager_1.ModelManager.FlySkinModel.EquipFlySkin(t.Q6n, t.Z7n);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRoleFlyEquipChangeNotify, e)
  }
}, FlySkinController.mGc = e => {
  if (e) {
    e = e.yqc;
    for (const t of e) ModelManager_1.ModelManager.FlySkinModel.AddUnlockSkinId(t);
    _a.UpdateAllRoleSkinRedDot(), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFlySkinChildTabRed, 1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshFlySkinChildTabRed, 0), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFlyEquipAddNotify, e)
  }
};
//# sourceMappingURL=FlySkinController.js.map