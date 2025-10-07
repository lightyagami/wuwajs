"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExploreLevelController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class ExploreLevelController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20428, ExploreLevelController.lVt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20428);
  }
  static MultiExploreScoreRewardRequest(e) {
    var o = new Protocol_1.Aki.Protocol.v8u();
    o.nBs = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("ExploreLevel", 63, "客户端请求请求探索进度评分奖励 ExploreScoreRewardRequest", ["request", o]);
    }
    Net_1.Net.Call(15268, o, this.G8u);
  }
  static CountryExploreScoreInfoRequest(l, s) {
    var e = new Protocol_1.Aki.Protocol.lts();
    e.jVn = l;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("ExploreLevel", 63, "客户端请求国家探索评分信息 CountryExploreScoreInfoRequest", ["request", e]);
    }
    Net_1.Net.Call(25670, e, e => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("ExploreLevel", 63, "服务端返回国家探索评分信息 CountryExploreScoreInfoResponse", ["response", e]);
      }
      if (s) {
        s();
      }
      var o = ModelManager_1.ModelManager.ExploreLevelModel;
      for (const t of e.kPs) {
        var r = t.p6n;
        for (const n of t.HVn) {
          o.SetCountryExploreScoreReceived(r, n, true);
        }
      }
      o.SetCountryExploreScore(l, e.OPs);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse);
    });
  }
  static async CountryExploreScoreInfoAsyncRequest(e) {
    var o = new Protocol_1.Aki.Protocol.lts();
    o.jVn = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("ExploreLevel", 63, "客户端请求国家探索评分信息 CountryExploreScoreInfoRequest", ["request", o]);
    }
    var o = await Net_1.Net.CallAsync(25670, o);
    if (o) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("ExploreLevel", 63, "服务端返回国家探索评分信息 CountryExploreScoreInfoResponse", ["response", o]);
      }
      var r = ModelManager_1.ModelManager.ExploreLevelModel;
      for (const n of o.kPs) {
        var t = n.p6n;
        for (const l of n.HVn) {
          r.SetCountryExploreScoreReceived(t, l, true);
        }
      }
      r.SetCountryExploreScore(e, o.OPs);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse);
    }
  }
}
(exports.ExploreLevelController = ExploreLevelController).lVt = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("ExploreLevel", 63, "服务端通知探索等级 ExploreLevelNotify", ["notify", e]);
  }
  var o = ModelManager_1.ModelManager.ExploreLevelModel;
  for (const r of e.FPs) {
    o.SetCountryExploreLevel(r.jVn, r.NPs);
  }
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnExploreLevelNotify);
};
ExploreLevelController.G8u = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("ExploreLevel", 63, "服务端返回探索评分奖励 ExploreScoreRewardResponse", ["response", e]);
  }
  if (e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnExploreScoreRewardResponse);
  }
}; //# sourceMappingURL=ExploreLevelController.js.map