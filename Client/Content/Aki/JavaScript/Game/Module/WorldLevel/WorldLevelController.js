"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorldLevelController = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventCSharpBridge_1 = require("../../Common/Event/EventCSharpBridge");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../Effect/EffectSystem");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const EffectUtil_1 = require("../../Utils/EffectUtil");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class WorldLevelController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OriginWorldLevelUp, this.OnOriginWorldLevelUp);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BackLoginView, this.loo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestShowWorldLevelUpEffect, this.cxg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestDestroyWorldLevelUpEffect, this.dxg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestWorldLevelChangeInFight, this.mxg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestDownWorldLevel, this.fxg);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CsRequestRegainWorldLevel, this.gxg);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OriginWorldLevelUp, this.OnOriginWorldLevelUp);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BackLoginView, this.loo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.$Ge);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestShowWorldLevelUpEffect, this.cxg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestDestroyWorldLevelUpEffect, this.dxg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestWorldLevelChangeInFight, this.mxg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestDownWorldLevel, this.fxg);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CsRequestRegainWorldLevel, this.gxg);
  }
  static OnRegisterNetEvent() {}
  static OnUnRegisterNetEvent() {}
  static OnBasicInfoNotify(e) {
    this.SetWorldLevelAttributes(e);
  }
  static OnPlayerAttrNotify(e) {
    this.SetWorldLevelAttributes(e);
  }
  static SetWorldLevelAttributes(e) {
    for (const o of e) {
      var t;
      var r;
      if (o.Z4n === Protocol_1.Aki.Protocol.LNs.uSs) {
        ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel = o.jSs;
      }
      if (o.Z4n === Protocol_1.Aki.Protocol.LNs.cSs) {
        ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = o.jSs;
      }
      if (o.Z4n === Protocol_1.Aki.Protocol.LNs.uOs) {
        ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp = o.jSs;
      }
      if (o.Z4n === Protocol_1.Aki.Protocol.LNs.v7n) {
        ModelManager_1.ModelManager.WorldLevelModel.Sex = o.jSs;
        ModelManager_1.ModelManager.PersonalModel.SetSex(o.jSs);
      }
      if (o.Z4n === Protocol_1.Aki.Protocol.LNs.Proto_Sign) {
        ModelManager_1.ModelManager.PersonalModel.SetSignature(o.j8n);
      }
      if (o.Z4n === Protocol_1.Aki.Protocol.LNs.Proto_PlayerTitle) {
        r = (t = o.j8n.split("_")).length === 2 ? parseInt(t[1]) : undefined;
        ModelManager_1.ModelManager.PersonalModel.SetDressedPlayerTitle(parseInt(t[0]), r);
      }
    }
  }
  static SendWorldLevelDownRequest() {
    var e = Protocol_1.Aki.Protocol.q0s.create();
    Net_1.Net.Call(23811, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel = e.uSs;
          ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = e.cSs;
          ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp = e.uOs;
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(WorldLevelController.GetLocalText("WorldLevelAdjustTo", ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel.toString()));
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17862);
        }
      }
    });
  }
  static SendWorldLevelRegainRequest() {
    var e = Protocol_1.Aki.Protocol.O0s.create();
    Net_1.Net.Call(17506, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.WorldLevelModel.OriginWorldLevel = e.uSs;
          ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel = e.cSs;
          ModelManager_1.ModelManager.WorldLevelModel.LastChangeWorldLevelTimeStamp = e.uOs;
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(WorldLevelController.GetLocalText("WorldLevelAdjustTo", ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel.toString()));
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18141);
        }
      }
    });
  }
  static GetLocalText(e, t) {
    var e = ConfigManager_1.ConfigManager.TextConfig.GetTextById(e);
    var r = UE.NewArray(UE.BuiltinString);
    r.Add(t);
    return UE.KuroStaticLibrary.KuroFormatText(e ?? "", r);
  }
}
exports.WorldLevelController = WorldLevelController;
(_a = WorldLevelController).OnOriginWorldLevelUp = () => {
  if (UiManager_1.UiManager.IsViewShow("WorldLevelUpView")) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.WorldLevelUpViewRefresh);
  } else {
    UiManager_1.UiManager.OpenView("WorldLevelUpView");
  }
};
WorldLevelController.OpenWorldLevelInfoView = () => {
  if (!UiManager_1.UiManager.IsViewShow("WorldLevelInfoView")) {
    UiManager_1.UiManager.OpenView("WorldLevelInfoView");
  }
};
WorldLevelController.$Ge = e => {
  if (e === "FunctionView" && UiManager_1.UiManager.IsViewShow("WorldLevelInfoView")) {
    UiManager_1.UiManager.CloseView("WorldLevelInfoView");
  }
};
WorldLevelController.loo = () => {
  if (UiManager_1.UiManager.IsViewShow("WorldLevelInfoView")) {
    UiManager_1.UiManager.CloseView("WorldLevelInfoView");
  }
};
WorldLevelController.rvi = 0;
WorldLevelController.cxg = () => {
  var e;
  var t;
  var r;
  var o;
  if (Global_1.Global.BaseCharacter && (e = EffectUtil_1.EffectUtil.GetEffectPath("WorldLevelUpEffect")) && e.length !== 0) {
    t = (r = Global_1.Global.BaseCharacter).D_GetTransform();
    r = r.CapsuleComponent.CapsuleHalfHeight;
    (o = t.GetLocation()).Z -= r;
    t.SetLocation(o);
    _a.rvi = EffectSystem_1.EffectSystem.SpawnUnloopedEffect(GlobalData_1.GlobalData.World, t, e, "[WorldLevelUpView.PlayWorldLevelUpEffect]");
    EffectSystem_1.EffectSystem.SetAdditionTimeScale(14, _a.rvi, ModelManager_1.ModelManager.CharacterModel.InverseSelfCenteredTimeDilation);
  }
};
WorldLevelController.dxg = () => {
  if (EffectSystem_1.EffectSystem.IsValid(_a.rvi)) {
    EffectSystem_1.EffectSystem.StopEffectById(_a.rvi, "[WorldLevelUpView.RecycleEffect]", true);
    _a.rvi = 0;
  }
};
WorldLevelController.mxg = () => {
  var e = Global_1.Global.BaseCharacter?.CharacterActorComponent.Entity.GetComponent(217)?.HasTag(1996802261);
  EventCSharpBridge_1.EventCSharpBridge.Emit(EventDefine_1.EEventName.TsResponseWorldLevelChangeInFight, e ?? false);
};
WorldLevelController.fxg = () => {
  _a.SendWorldLevelDownRequest();
};
WorldLevelController.gxg = () => {
  _a.SendWorldLevelRegainRequest();
}; //# sourceMappingURL=WorldLevelController.js.map