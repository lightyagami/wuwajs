"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PersonalController = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
class PersonalController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.Wac);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.Wac);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleViewActiveSequenceFinish, this.CGd);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnPlayerTitleUnlock, this.CGd);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, this.xkt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.Wac);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.Wac);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleViewActiveSequenceFinish, this.CGd);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnPlayerTitleUnlock, this.CGd);
  }
  static c3l() {
    var e = new Protocol_1.Aki.Protocol.E0_();
    Net_1.Net.Call(25435, e, e => {
      if (e) {
        ModelManager_1.ModelManager.PersonalModel.InitPlayerHeadData(e.FE_);
      }
    });
  }
  static SendBirthdayInitRequest(t) {
    var e = Protocol_1.Aki.Protocol.SYn.create();
    e.ZVn = t;
    Net_1.Net.Call(27323, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.SetBirthday(t);
          ModelManager_1.ModelManager.BirthdayModel.ResetBirthday();
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21134);
        }
      }
    });
  }
  static SendBirthdayShowSetRequest(t) {
    var e = Protocol_1.Aki.Protocol.wYn.create();
    e.$7n = t;
    Net_1.Net.Call(20751, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.SetBirthdayDisplay(t);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15424);
        }
      }
    });
  }
  static SendRoleShowListUpdateRequest(t) {
    var e = Protocol_1.Aki.Protocol.yYn.create();
    e.Y7n = t;
    Net_1.Net.Call(16029, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.UpdateRoleShowList(t);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23017);
        }
      }
    });
  }
  static async SendRoleShowListUpdateRequestAsync(e) {
    var t = Protocol_1.Aki.Protocol.yYn.create();
    t.Y7n = e;
    var t = await Net_1.Net.CallAsync(16029, t);
    if (t) {
      if (t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ModelManager_1.ModelManager.PersonalModel.UpdateRoleShowList(e);
        return true;
      }
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 23017);
    }
    return false;
  }
  static SendChangeCardRequest(t) {
    var e = Protocol_1.Aki.Protocol.RYn.create();
    e.J7n = t;
    Net_1.Net.Call(28414, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.SetCurCardId(t);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20194);
        }
      }
    });
  }
  static SendReadCardRequest(t) {
    var e = Protocol_1.Aki.Protocol.AYn.create();
    e.J7n = t;
    Net_1.Net.Call(19489, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.UpdateCardUnlockList(t, true);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23890);
        }
      }
    });
  }
  static SendModifySignatureRequest(t) {
    var e = Protocol_1.Aki.Protocol.uYn.create();
    e.zVn = t;
    Net_1.Net.Call(20682, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.SetSignature(t);
        } else if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord || e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrRoleInvalidNameLength) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NotElegantName");
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22575);
        }
      }
    });
  }
  static SendChangeHeadPhotoRequest(t) {
    var e = Protocol_1.Aki.Protocol.dYn.create();
    e.z7n = t;
    Net_1.Net.Call(25488, e, e => {
      if (e) {
        if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(t);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20452);
        }
      }
    });
  }
  static CheckCardIsUsing(e) {
    return ModelManager_1.ModelManager.PersonalModel.GetCurCardId() === e;
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(18399, e => {
      ModelManager_1.ModelManager.PersonalModel.AddCardUnlockList(e.J7n, false);
    });
    Net_1.Net.Register(21362, e => {
      ModelManager_1.ModelManager.PersonalModel.SetHeadPhotoId(e.dSs);
    });
    Net_1.Net.Register(29011, e => {
      ModelManager_1.ModelManager.PersonalModel.SetRoleShowList(e.MSs);
    });
    Net_1.Net.Register(15352, e => {
      ModelManager_1.ModelManager.PersonalModel.SetSignature(e.zVn);
    });
    Net_1.Net.Register(25876, e => {
      ModelManager_1.ModelManager.PlayerInfoModel.SetPlayerName(e.H8n);
      ModelManager_1.ModelManager.PersonalModel.SetModifyNameInfo(e.Zha, StringUtils_1.EMPTY_STRING);
    });
    Net_1.Net.Register(16020, e => {
      ModelManager_1.ModelManager.PersonalModel.UpdatePlayerHeadData(e.NE_);
    });
    Net_1.Net.Register(22078, e => {
      ModelManager_1.ModelManager.PersonalModel.SetDressedPlayerTitle(e.tnc, e.inc);
    });
    Net_1.Net.Register(27505, e => {
      ModelManager_1.ModelManager.PersonalModel.UpdateUnDressedPlayerTitleList(e.rnc);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18399);
    Net_1.Net.UnRegister(21362);
    Net_1.Net.UnRegister(29011);
    Net_1.Net.UnRegister(15352);
    Net_1.Net.UnRegister(25876);
    Net_1.Net.UnRegister(16020);
    Net_1.Net.UnRegister(22078);
    Net_1.Net.UnRegister(27505);
  }
  static SendChangePlayerTitleRequest(e) {
    var t = Protocol_1.Aki.Protocol.Zoc.create();
    t.tnc = e;
    Net_1.Net.Call(19544, t, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23606);
      }
    });
  }
  static TryOpenTitleGetView() {
    for (var e = ModelManager_1.ModelManager.PersonalModel.CurrentNewUnLockTitleArray; e.length > 0;) {
      var t = e.shift();
      UiManager_1.UiManager.OpenView("PersonalPlayerTitleUnLockTipsView", t);
    }
  }
}
exports.PersonalController = PersonalController;
(_a = PersonalController).xkt = () => {
  PersonalController.c3l();
};
PersonalController.RequestModifySignature = async e => {
  var t = Protocol_1.Aki.Protocol.uYn.create();
  t.zVn = e;
  var t = await Net_1.Net.CallAsync(20682, t);
  if (t.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
    ModelManager_1.ModelManager.PersonalModel.SetSignature(e);
  } else if (t.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord || t.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrRoleInvalidNameLength) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NotElegantName");
  } else {
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 22575);
  }
  return t.Q4n;
};
PersonalController.RequestModifyName = async e => {
  var t = Protocol_1.Aki.Protocol.lYn.create();
  t.H8n = e;
  var e = await Net_1.Net.CallAsync(29255, t);
  if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
    ModelManager_1.ModelManager.PersonalModel.SetModifyNameInfo(e.Zha, e.ela);
  } else if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ContainsDirtyWord || e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrRoleInvalidNameLength) {
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById("NotElegantName");
  } else {
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20452);
  }
  return e.Q4n;
};
PersonalController.Wac = (e, t) => {
  if (e === 10082 && t) {
    e = Protocol_1.Aki.Protocol.zoc.create();
    Net_1.Net.Call(24323, e, e => {
      if (e) {
        ModelManager_1.ModelManager.PersonalModel.InitPlayerTitleData(e.onc);
      }
    });
  }
};
PersonalController.CGd = () => {
  _a.TryOpenTitleGetView();
}; //# sourceMappingURL=PersonalController.js.map