"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalController = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
class PersonalController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.Wac);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.Wac);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.Wac);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.Wac);
  }
  static c3l() {
    var e = new Protocol_1.Aki.Protocol.E0_();
    Net_1.Net.Call(27077, e, e => {
      if (e) {
        ModelManager_1.ModelManager.PersonalModel.InitPlayerHeadData(e.FE_);
      }
    });
  }
  static SendBirthdayInitRequest(o) {
    var e = Protocol_1.Aki.Protocol.SYn.create();
    e.ZVn = o;
    Net_1.Net.Call(24630, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.SetBirthday(o);
          ModelManager_1.ModelManager.BirthdayModel.ResetBirthday();
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20325);
        }
      }
    });
  }
  static SendBirthdayShowSetRequest(o) {
    var e = Protocol_1.Aki.Protocol.wYn.create();
    e.$7n = o;
    Net_1.Net.Call(23680, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.SetBirthdayDisplay(o);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29071);
        }
      }
    });
  }
  static SendRoleShowListUpdateRequest(o) {
    var e = Protocol_1.Aki.Protocol.yYn.create();
    e.Y7n = o;
    Net_1.Net.Call(21804, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.UpdateRoleShowList(o);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23361);
        }
      }
    });
  }
  static async SendRoleShowListUpdateRequestAsync(e) {
    var o = Protocol_1.Aki.Protocol.yYn.create();
    o.Y7n = e;
    var o = await Net_1.Net.CallAsync(21804, o);
    if (o) {
      if (o.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ModelManager_1.ModelManager.PersonalModel.UpdateRoleShowList(e);
        return true;
      }
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 23361);
    }
    return false;
  }
  static SendChangeCardRequest(o) {
    var e = Protocol_1.Aki.Protocol.RYn.create();
    e.J7n = o;
    Net_1.Net.Call(24952, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.SetCurCardId(o);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21032);
        }
      }
    });
  }
  static SendReadCardRequest(o) {
    var e = Protocol_1.Aki.Protocol.AYn.create();
    e.J7n = o;
    Net_1.Net.Call(26866, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.UpdateCardUnlockList(o, true);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18428);
        }
      }
    });
  }
  static SendModifySignatureRequest(o) {
    var e = Protocol_1.Aki.Protocol.uYn.create();
    e.zVn = o;
    Net_1.Net.Call(20552, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.SetSignature(o);
        } else if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord || e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrRoleInvalidNameLength) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NotElegantName");
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29570);
        }
      }
    });
  }
  static SendChangeHeadPhotoRequest(o) {
    var e = Protocol_1.Aki.Protocol.dYn.create();
    e.z7n = o;
    Net_1.Net.Call(25924, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(o);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28517);
        }
      }
    });
  }
  static CheckCardIsUsing(o) {
    var t = ModelManager_1.ModelManager.PersonalModel.GetCardShowList();
    var r = t.length;
    let l = false;
    for (let e = 0; e < r; e++) {
      if (t[e] === o) {
        l = true;
        break;
      }
    }
    return l;
  }
  static CheckCardIsUnLock(o) {
    var t = ModelManager_1.ModelManager.PersonalModel.GetCardDataList();
    var r = t.length;
    for (let e = 0; e < r; e++) {
      var l = t[e];
      if (l.CardId === o) {
        return l.IsUnLock;
      }
    }
    return false;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(27947, e => {
      ModelManager_1.ModelManager.PersonalModel.AddCardUnlockList(e.J7n, false);
    });
    Net_1.Net.Register(23025, e => {
      ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(e.dSs);
    });
    Net_1.Net.Register(25453, e => {
      ModelManager_1.ModelManager.PersonalModel.SetRoleShowList(e.MSs);
    });
    Net_1.Net.Register(23541, e => {
      ModelManager_1.ModelManager.PersonalModel.SetSignature(e.zVn);
    });
    Net_1.Net.Register(17937, e => {
      ModelManager_1.ModelManager.PersonalModel.SetModifyNameInfo(e.Zha, e.H8n);
    });
    Net_1.Net.Register(26132, e => {
      ModelManager_1.ModelManager.PersonalModel.UpdatePlayerHeadData(e.NE_);
    });
    Net_1.Net.Register(15023, e => {
      ModelManager_1.ModelManager.PersonalModel.SetDressedPlayerTitle(e.tnc, e.inc);
    });
    Net_1.Net.Register(26686, e => {
      ModelManager_1.ModelManager.PersonalModel.UpdateUnDressedPlayerTitleList(e.rnc);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27947);
    Net_1.Net.UnRegister(23025);
    Net_1.Net.UnRegister(25453);
    Net_1.Net.UnRegister(23541);
    Net_1.Net.UnRegister(17937);
    Net_1.Net.UnRegister(26132);
    Net_1.Net.UnRegister(15023);
    Net_1.Net.UnRegister(26686);
  }
  static SendChangePlayerTitleRequest(e) {
    var o = Protocol_1.Aki.Protocol.Zoc.create();
    o.tnc = e;
    Net_1.Net.Call(26194, o, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17551);
      }
    });
  }
}
exports.PersonalController = PersonalController;
(_a = PersonalController).xkt = () => {
  PersonalController.c3l();
};
PersonalController.RequestModifySignature = async e => {
  var o = Protocol_1.Aki.Protocol.uYn.create();
  o.zVn = e;
  var o = await Net_1.Net.CallAsync(20552, o);
  if (o.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
    ModelManager_1.ModelManager.PersonalModel.SetSignature(e);
  } else if (o.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord || o.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrRoleInvalidNameLength) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NotElegantName");
  } else {
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 29570);
  }
  return o.Q4n;
};
PersonalController.RequestModifyName = async e => {
  var o = Protocol_1.Aki.Protocol.lYn.create();
  o.H8n = e;
  var e = await Net_1.Net.CallAsync(23193, o);
  if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
    ModelManager_1.ModelManager.PersonalModel.SetModifyNameInfo(e.Zha, e.ela);
  } else if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord || e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrRoleInvalidNameLength) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NotElegantName");
  } else {
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28517);
  }
  return e.Q4n;
};
PersonalController.Wac = (e, o) => {
  if (e === 10082 && o) {
    e = Protocol_1.Aki.Protocol.zoc.create();
    Net_1.Net.Call(22987, e, e => {
      if (e) {
        ModelManager_1.ModelManager.PersonalModel.InitPlayerTitleData(e.onc);
      }
    });
  }
}; //# sourceMappingURL=PersonalController.js.map