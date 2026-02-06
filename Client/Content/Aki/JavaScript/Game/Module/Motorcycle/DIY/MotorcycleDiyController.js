"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleDiyController = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const MotorcycleDiyDefine_1 = require("./MotorcycleDiyDefine");
class MotorcycleDiyController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnRegisterNetEvent();
    return true;
  }
  static OnClear() {
    this.OnUnRegisterNetEvent();
    return true;
  }
  static OnRegisterNetEvent() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.DQe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    Net_1.Net.Register(25363, MotorcycleDiyController.fyf);
    Net_1.Net.Register(22012, MotorcycleDiyController.gyf);
    Net_1.Net.Register(21421, MotorcycleDiyController.Cyf);
    Net_1.Net.Register(23617, MotorcycleDiyController.pyf);
  }
  static OnUnRegisterNetEvent() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.DQe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.RQe);
    Net_1.Net.UnRegister(25363);
    Net_1.Net.UnRegister(22012);
    Net_1.Net.UnRegister(21421);
    Net_1.Net.UnRegister(23617);
  }
  static MotorDiyInfoRequest() {
    var e = Protocol_1.Aki.Protocol.ypf.create();
    Net_1.Net.Call(23904, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.MotorcycleDiyModel.UpdateMotorOutlookInfo(e);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24292);
        }
      }
    });
  }
  static EquipMotorSkinRequest(e) {
    var o = Protocol_1.Aki.Protocol.gpf.create();
    o.Z7n = e;
    Net_1.Net.Call(16000, o, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21118);
      }
    });
  }
  static EquipMotorOutLookRequest(e, o, r, t) {
    var a = Protocol_1.Aki.Protocol.upf.create();
    a.Ipf = e;
    a.Evg = o;
    a.Ivg = r;
    Net_1.Net.Call(18683, a, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (t) {
            t();
          }
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15521);
        }
      }
    });
  }
  static EquipMotorStickerRequest(e, o) {
    var r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedFrameId();
    var t = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedDecorationIdList();
    this.EquipMotorOutLookRequest(e, t, r, o);
  }
  static EquipMotorFrameRequest(e, o) {
    var r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerIdList();
    var t = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedDecorationIdList();
    this.EquipMotorOutLookRequest(r, t, e, o);
  }
  static EquipMotorDecorationRequest(e, o) {
    var r = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedStickerIdList();
    var t = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedFrameId();
    this.EquipMotorOutLookRequest(r, e, t, o);
  }
  static async OpenRootView() {
    return (await UiManager_1.UiManager.OpenViewAsync("MotorcycleDiyRootView")) !== undefined;
  }
  static OpenRootViewByReward(e, o = 0) {
    var r = [];
    var t = [];
    let a = l = ModelManager_1.ModelManager.MotorcycleDiyModel.GetEquippedFrameId();
    let n = "MotorcycleDiyFrameTabView";
    switch (o) {
      case 1:
        n = "MotorcycleDiyFrameTabView";
        break;
      case 2:
        n = "MotorcycleDiyStickerTabView";
        break;
      case 3:
        n = "MotorcycleDiyDecorationTabView";
    }
    for (const y of e) {
      var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(y.ConfigId);
      if (i === 25) {
        a = y.ConfigId;
      } else if (i === 21) {
        r.push(y.ConfigId);
      } else if (i === 26) {
        t.push(y.ConfigId);
      }
    }
    if (l !== a && ModelManager_1.ModelManager.MotorcycleDiyModel.IsEquipFrameLockedByPlayer()) {
      ModelManager_1.ModelManager.MotorcycleDiyModel.ResetSelectedItemInfo();
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("MotorDIYWarning02");
      return;
    }
    var l = a;
    var c = [0, 0, 0];
    for (const v of r) {
      var M = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorStickerConfig(v);
      if (M && (M = M.PartId, (M = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_STICKER_PART.indexOf(M)) !== -1)) {
        c[M] = v;
      }
    }
    var _ = ModelManager_1.ModelManager.MotorcycleDiyModel.GetDefaultDecorationIdList();
    for (const D of t) {
      var s = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorDecorationConfig(D);
      if (s && (s = s.PartId, (s = MotorcycleDiyDefine_1.MOTORCYCLE_DIY_DECORATION_PART.indexOf(s)) !== -1)) {
        _[s] = D;
      }
    }
    this.EquipMotorOutLookRequest(c, _, l, () => {
      ModelManager_1.ModelManager.MotorcycleDiyModel.ResetSelectedItemInfo();
      var e = {
        OpenTabView: n
      };
      UiManager_1.UiManager.OpenView("MotorcycleDiyRootView", e);
    });
  }
  static OpenMotorGeneralPreviewView(o) {
    var r = ConfigManager_1.ConfigManager.MotorDiyConfig.GetMotorGeneralPreviewConfig(o);
    if (r) {
      let e = undefined;
      if (r.Sticker.length > 0) {
        e = "MotorcycleDiyStickerPreviewView";
      } else if (r.Decorations.length > 0) {
        e = "MotorcycleDiyDecorationPreviewView";
      }
      if (e) {
        UiManager_1.UiManager.OpenView(e, o);
      }
    }
  }
}
exports.MotorcycleDiyController = MotorcycleDiyController;
(_a = MotorcycleDiyController).DQe = (e, o) => {
  if (o && e === 10098) {
    _a.MotorDiyInfoRequest();
  }
};
MotorcycleDiyController.RQe = (e, o) => {
  if (o && e === 10098) {
    _a.MotorDiyInfoRequest();
  }
};
MotorcycleDiyController.fyf = e => {
  if (e) {
    ModelManager_1.ModelManager.MotorcycleDiyModel.UpdateMotorCanUseOutlookInfo(e);
  }
};
MotorcycleDiyController.gyf = e => {
  if (e) {
    ModelManager_1.ModelManager.MotorcycleDiyModel.AddMotorOutlookInfo(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyInfoUpdate);
  }
};
MotorcycleDiyController.Cyf = e => {
  if (e) {
    ModelManager_1.ModelManager.MotorcycleDiyModel.UpdateMotorOutlookOwnedChange(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyInfoUpdate);
  }
};
MotorcycleDiyController.pyf = e => {
  if (e) {
    ModelManager_1.ModelManager.MotorcycleDiyModel.UpdateMotorOutlookEquippedChange(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.MotorDiyInfoUpdate);
  }
}; //# sourceMappingURL=MotorcycleDiyController.js.map