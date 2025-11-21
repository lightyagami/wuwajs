"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActivityFunPlayController = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerBase_1 = require("../../ActivityControllerBase");
const ActivityFunPlayData_1 = require("./ActivityFunPlayData");
const ActivitySubViewFunPlay_1 = require("./ActivitySubViewFunPlay");
class ActivityFunPlayController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
    this.dsd = e => {
      e.J$c.forEach(e => {
        ModelManager_1.ModelManager.ActivityFunPlayModel?.UpdateChallengeData(e);
      });
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ActivityFunPlayInfoRefresh);
    };
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnOpenView(e) {}
  OnGetActivityResource(e) {
    return "UiItem_ActivityInterestMain";
  }
  OnCreateSubPageComponent(e) {
    return new ActivitySubViewFunPlay_1.ActivitySubViewFunPlay();
  }
  OnCreateActivityData(e) {
    this.Data = new ActivityFunPlayData_1.ActivityFunPlayData();
    return this.Data;
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(27727, this.dsd);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(27727);
  }
  ChallengeAwardRequest(e) {
    var t = new Protocol_1.Aki.Protocol.W$c();
    t.e8n = e;
    Net_1.Net.Call(27622, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27622);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("ActivityFunPlay", 87, "领取奖励回包为空");
      }
    });
  }
  async RequestEnterChallengeAsync(e) {
    var t;
    var r = ConfigManager_1.ConfigManager.ActivityFunPlayConfig.GetFunPlayActivityChallenge(e);
    if (r) {
      t = {
        e8n: e
      };
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("ActivityFunPlay", 87, "进入趣味活动副本", ["挑战id", e]);
      }
      ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.tWc = t;
      e = ModelManager_1.ModelManager.EditFormationModel.GetCurrentFormationData?.GetRoleIdList ?? [];
      await ControllerHolder_1.ControllerHolder.InstanceDungeonController.PrewarTeamFightRequest(r.InstId, e, 0, 0);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("ActivityFunPlay", 87, "找不到对应的趣味活动挑战配置");
    }
  }
  async OpenActivityFunPlayView() {
    let e = undefined;
    for (const r of ModelManager_1.ModelManager.ActivityModel.GetAllActivityMap().values()) {
      if (r.Type === Protocol_1.Aki.Protocol.uks.Proto_FunPlay) {
        var t = r;
        e = t;
        break;
      }
    }
    return !!e && !!(await UiManager_1.UiManager.OpenViewAsync("ActivityFunPlayView", e));
  }
}
exports.ActivityFunPlayController = ActivityFunPlayController;
//# sourceMappingURL=ActivityFunPlayController.js.map