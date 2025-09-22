"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GreatSwordController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const BlackSwordChallengeById_1 = require("../../../Core/Define/ConfigQuery/BlackSwordChallengeById");
const BlackSwordGameplayById_1 = require("../../../Core/Define/ConfigQuery/BlackSwordGameplayById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class GreatSwordController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLevelPlayCompleteNumberChange, this.fJc);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLevelPlayCompleteNumberChange, this.fJc);
  }
  static OnRegisterNetEvent() {}
  static OnUnRegisterNetEvent() {}
  static RequestGreatSwordInfoAndOpenView(a, n) {
    var e;
    if (!a || a <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 88, "未能加载大剑挑战数据，UI 不显示", ["ChallengeId", a]);
      }
    } else {
      (e = new Protocol_1.Aki.Protocol.N$c()).e8n = a;
      Net_1.Net.Call(16203, Protocol_1.Aki.Protocol.N$c.create(e), e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16203);
          } else {
            var r = [];
            for (const l of e.rXu) {
              var o = BlackSwordGameplayById_1.configBlackSwordGameplayById.GetConfig(l._ps);
              if (o) {
                r.push({
                  Config: o,
                  Unlocked: l.iXu,
                  Completed: l.Bb_ > 0
                });
              }
            }
            e = {
              BoardId: a,
              SubChallenges: r
            };
            if ((ModelManager_1.ModelManager.MapModel?.CurrentWorldMapConfigId ?? 0) === (BlackSwordChallengeById_1.configBlackSwordChallengeById.GetConfig(a)?.RelativeDungeonId ?? 0)) {
              ModelManager_1.ModelManager.GreatSwordChallengeModel?.InitChallenge(e);
              UiManager_1.UiManager.OpenView("GreatSwordLevelSelectView");
              ModelManager_1.ModelManager.GreatSwordChallengeModel.SetActionIncId(n);
            }
          }
        }
      });
    }
  }
  static async RequestGreatSwordChallengeMarkItemPanelInfo(a) {
    if (!a || a <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("GeneralLogicTree", 88, "[WMQ] RequestGreatSwordChallengeMarkItemPanelInfo called with challengeId", ["challengeId", a]);
      }
      return Promise.resolve(undefined);
    } else {
      return Net_1.Net.CallAsync(23943, ((e = new Protocol_1.Aki.Protocol.RNd()).e8n = a, e)).then(e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16203);
            return;
          }
          var r = [];
          for (const l of e.rXu) {
            var o = BlackSwordGameplayById_1.configBlackSwordGameplayById.GetConfig(l._ps);
            if (o) {
              r.push({
                Config: o,
                Unlocked: l.iXu,
                Completed: l.Bb_ > 0
              });
            }
          }
          e = {
            BoardId: a,
            SubChallenges: r
          };
          ModelManager_1.ModelManager.GreatSwordChallengeModel?.InitChallenge(e);
          return e;
        }
      });
    }
    var e;
  }
}
(exports.GreatSwordController = GreatSwordController).RequestGreatSwordLevelSelected = (r, o) => {
  var e = new Protocol_1.Aki.Protocol.eXu();
  e.r6n = r;
  e._ps = o;
  Net_1.Net.Call(18977, Protocol_1.Aki.Protocol.eXu.create(e), e => {
    if (e) {
      if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ModelManager_1.ModelManager.GreatSwordChallengeModel.SetIsStartChallenge(true);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GreatSwordLevelSelectedComplete, r, o);
      } else {
        ModelManager_1.ModelManager.GreatSwordChallengeModel.SetIsStartChallenge(false);
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18977);
      }
    }
  });
};
GreatSwordController.fJc = (r, e, o) => {
  var l;
  var a = ModelManager_1.ModelManager.LevelPlayModel.GetLevelPlayInfo(r);
  if (a && a.LevelPlayType === "BlackSwordChallenge" && (a = e !== 0, e = o > 0, BlackSwordGameplayById_1.configBlackSwordGameplayById.GetConfig(r)) && (o = ModelManager_1.ModelManager.GreatSwordChallengeModel.GetChallenge()) && (l = o.SubChallenges.findIndex(e => e.Config.Id === r)) !== -1) {
    ModelManager_1.ModelManager.GreatSwordChallengeModel.SetSubChallengeState(l, a, e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GreatSwordLevelRefreshUI, o.SubChallenges);
  }
}; //# sourceMappingURL=GreatSwordController.js.map