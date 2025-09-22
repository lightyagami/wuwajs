"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AchievementController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
class AchievementController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    this.OnAddEvents();
    this.OnRegisterNetEvent();
    return true;
  }
  static OnClear() {
    this.OnRemoveEvents();
    this.OnUnRegisterNetEvent();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, AchievementController.obe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleViewActiveSequenceFinish, this.rbe);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, AchievementController.obe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleViewActiveSequenceFinish, this.rbe);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(21752, AchievementController.nbe);
    Net_1.Net.Register(27478, AchievementController.sbe);
    Net_1.Net.Register(15675, AchievementController.abe);
    Net_1.Net.Register(19602, AchievementController.yth);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21752);
    Net_1.Net.UnRegister(27478);
    Net_1.Net.UnRegister(15675);
    Net_1.Net.UnRegister(19602);
  }
  static OpenAchievementMainView() {
    UiManager_1.UiManager.OpenView("AchievementMainView");
  }
  static ChangeAchievementPopViewShowState() {
    this.Wq_ = !this.Wq_;
  }
  static OpenAchievementDetailView(e, t, r = -1) {
    t = ModelManager_1.ModelManager.AchievementModel.GetAchievementGroupData(t);
    e = ModelManager_1.ModelManager.AchievementModel.GetCategory(e);
    ModelManager_1.ModelManager.AchievementModel.CurrentSelectCategory = e;
    ModelManager_1.ModelManager.AchievementModel.CurrentSelectGroup = t;
    ModelManager_1.ModelManager.AchievementModel.AchievementSearchState = false;
    ModelManager_1.ModelManager.AchievementModel.CurrentSelectAchievementId = r;
    ModelManager_1.ModelManager.AchievementModel.CurrentSearchText = "";
    UiManager_1.UiManager.OpenView("AchievementDetailView");
  }
  static async RequestUpdateAchievementInfo() {
    var e = new Protocol_1.Aki.Protocol.kg_();
    var e = await Net_1.Net.CallAsync(27496, e);
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27673);
    } else {
      ModelManager_1.ModelManager.AchievementModel.PhraseUpdateData(e);
    }
  }
  static RequestGetAchievementReward(e, t) {
    var r = new Protocol_1.Aki.Protocol.o$n();
    r.s5n = t;
    r.x6n = e;
    Net_1.Net.Call(27480, r, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22535);
      }
    });
  }
  static RequestGetMultiAchievementReward(e, t) {
    var r = new Protocol_1.Aki.Protocol.a8u();
    r.T8u = e;
    r.b8u = t;
    Net_1.Net.Call(23920, r, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15353);
      }
    });
  }
  static RequestAchievementFinish(e) {
    var t = new Protocol_1.Aki.Protocol.l$n();
    t.s5n = e;
    Net_1.Net.Call(24149, t, e => {
      if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29619);
      }
    });
  }
  static hbe(e) {
    var t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(e.s5n).GetFinishState();
    ModelManager_1.ModelManager.AchievementModel.OnAchievementProgressNotify(e);
    var r = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(e.s5n).GetFinishState();
    if (t !== r && r !== 2 && r !== 0) {
      t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(e.s5n);
      if (!ModelManager_1.ModelManager.AchievementModel?.IsHideAchievementGroup(t.GetGroupId())) {
        ModelManager_1.ModelManager.AchievementModel.CurrentFinishAchievementArray.push(e.s5n);
        this.lbe();
      }
    }
  }
  static lbe() {
    if (this.Wq_) {
      for (var e = ModelManager_1.ModelManager.AchievementModel.CurrentFinishAchievementArray; e.length > 0;) {
        var t = e.shift();
        var t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(t);
        UiManager_1.UiManager.OpenView("AchievementCompleteTipsView", t);
      }
    }
  }
}
exports.AchievementController = AchievementController;
(_a = AchievementController).Wq_ = true;
AchievementController.obe = async () => {
  var e = new Protocol_1.Aki.Protocol.i$n();
  var e = await Net_1.Net.CallAsync(25289, e);
  ModelManager_1.ModelManager.AchievementModel.PhraseBaseData(e);
};
AchievementController.nbe = e => {
  AchievementController.hbe(e.uvs);
};
AchievementController.rbe = () => {
  _a.lbe();
};
AchievementController.abe = t => {
  var r = t.avs.length;
  for (let e = 0; e < r; e++) {
    AchievementController.hbe(t.avs[e]);
  }
};
AchievementController.yth = e => {
  ModelManager_1.ModelManager.AchievementModel.OnAchievementCountChangeNotify(e);
};
AchievementController.sbe = e => {
  ModelManager_1.ModelManager.AchievementModel.OnAchievementGroupProgressNotify(e);
}; //# sourceMappingURL=AchievementController.js.map