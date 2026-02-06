"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EncirclePlayLevelController = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const RewardData_1 = require("../../../ItemReward/RewardData/RewardData");
const ActivityEncircleController_1 = require("./ActivityEncircleController");
const EncirclePlayDataManager_1 = require("./EncirclePlayDataManager");
const EncircleUtils_1 = require("./EncircleUtils");
class EncirclePlayLevelController {
  constructor() {
    this.JUg = new EncirclePlayDataManager_1.EncirclePlayDataManager();
    this.abg = {
      [0]: 1,
      1: 2,
      2: 3,
      3: 0
    };
    this.hbg = {
      [0]: () => {
        this.lbg();
      },
      1: () => {
        this._bg();
      },
      2: () => {
        this.ubg();
      },
      3: () => {
        this.cbg();
      }
    };
    this.G2e = 0;
    this.KDo = 0;
    this.CGg = 0;
    this.jv1 = 0;
    this._Dt = 0;
    this.hyc = 0;
    this.zUg = 0;
    this.F2g = -1;
    this.v7g = false;
  }
  static GetInstance() {
    this.Me ||= new EncirclePlayLevelController();
    return this.Me;
  }
  GetCurrentDifficulty() {
    return this.KDo;
  }
  GetCurrentRound() {
    return this.jv1;
  }
  GetGmLog() {
    return this.v7g;
  }
  GetTotalRound() {
    return this.jv1 + this.zUg;
  }
  SetGmLog(e) {
    this.v7g = e;
  }
  mbg() {
    var e = this.abg[this.G2e];
    return e !== undefined && (this.G2e = e, this.fbg(), true);
  }
  gbg(e, t) {
    return !!this.JUg.CheckCanAddObstacle(e, t) && (this.JUg.AddObstacle(e, t), true);
  }
  ClickMapItem(e, t) {
    return this.G2e === 0 && !!this.gbg(e, t) && (this.IncreaseRound(), this.mbg(), true);
  }
  Cbg() {
    var e;
    var t = ConfigManager_1.ConfigManager.ActivityEncircleConfig?.GetEncircleGroup(this._Dt);
    if (!t.ReduceDiffCnt) {
      return false;
    }
    let i = false;
    let r = 0;
    for (let e = this.KDo; e < t.ReduceDiffCnt.length; e++) {
      var s = t.ReduceDiffCnt[e];
      if (this.CGg >= s) {
        r = e + 1;
        i = true;
      }
    }
    if (i) {
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(437)).FunctionMap.set(1, () => {
        this.pbg();
      });
      e.FunctionMap.set(2, () => {
        this.KDo = r;
        var e = Protocol_1.Aki.Protocol.Xvg.create();
        e.e8n = this.hyc;
        ActivityEncircleController_1.ActivityEncircleController.SendEnterRequest(e, () => {
          this.pbg();
        });
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    }
    return i;
  }
  GetCurrentChallengeId() {
    return this.hyc;
  }
  GetLimitWallByPosKey(e) {
    return this.JUg.GetLimitWall(e);
  }
  EnterPlay(e, t) {
    var i = Protocol_1.Aki.Protocol.Xvg.create();
    i.e8n = t;
    ActivityEncircleController_1.ActivityEncircleController.SendEnterRequest(i, () => {
      this.x3t(e, t);
    });
  }
  x3t(e, t) {
    this._Dt = e;
    this.hyc = t;
    this.KDo = 0;
    this.ClearMap();
    e = {
      Hexes: this.JUg.InitHexMap(t),
      Height: this.JUg.GetMapHeight(),
      Width: this.JUg.GetMapWidth()
    };
    UiManager_1.UiManager.OpenView("EncirclePlayView", e, () => {
      this.TryShowMonsterMoveEffect();
    });
  }
  ClearMap() {
    this.G2e = 0;
    this.jv1 = 0;
    this.CGg = 0;
    this.zUg = 0;
    this.F2g = TimeUtil_1.TimeUtil.GetServerTime();
    this.JUg.Clear();
  }
  fbg() {
    var e = this.hbg[this.G2e];
    if (e) {
      e();
    }
  }
  lbg() {
    this.TryShowMonsterMoveEffect();
  }
  TryShowMonsterMoveEffect() {
    this.JUg.TryShowMonsterMoveEffect();
  }
  ShowItemMoveEffect(e, t) {
    var i = UiManager_1.UiManager.GetViewByName("EncirclePlayView");
    if (i) {
      i.ShowItemMoveEffect(EncircleUtils_1.EncircleUtils.HexPosToKey(e), t);
    }
  }
  IncreaseRound() {
    this.jv1 += 1;
    var e = UiManager_1.UiManager.GetViewByName("EncirclePlayView");
    if (e) {
      e.SetCurrentStepText(this.jv1);
    }
  }
  IncreaseDifficultyRound() {
    this.zUg += 1;
    var e = UiManager_1.UiManager.GetViewByName("EncirclePlayView");
    if (e) {
      e.SetDifficultyStepTxt(this.zUg);
    }
  }
  ExecuteWin() {
    this.Sbg();
  }
  Mbg() {
    const e = new RewardData_1.RewardData();
    var t = {
      ViewName: "EncircleResultView",
      IsSuccess: false,
      Type: 1,
      Score: this.jv1 + this.zUg
    };
    e.SetRewardInfo(t);
    ActivityEncircleController_1.ActivityEncircleController.SendCompleteRequest(this.N2g(0), () => {
      UiManager_1.UiManager.OpenView("EncircleResultView", e);
    });
  }
  dPg() {
    var e = new RewardData_1.RewardData();
    var t = {
      ViewName: "EncircleResultView",
      IsSuccess: true,
      Type: 1,
      Score: this.jv1 + this.zUg,
      RecordScore: ActivityEncircleController_1.ActivityEncircleController.GetEncircleData().GetChallengeRecord(this.hyc)
    };
    e.SetRewardInfo(t);
    UiManager_1.UiManager.OpenView("EncircleResultView", e);
  }
  Sbg() {
    var e = ActivityEncircleController_1.ActivityEncircleController.GetEncircleData();
    if (e && e.CheckChallengeComplete(this.hyc)) {
      this.dPg();
    }
    ActivityEncircleController_1.ActivityEncircleController.SendCompleteRequest(this.N2g(1), () => {
      this.ClearMap();
    });
  }
  SetAllMonsterDead() {
    var e = UiManager_1.UiManager.GetViewByName("EncirclePlayView");
    if (e) {
      e.SetAllMonsterDead(this.JUg.GetAllMonsterId());
    }
  }
  CloseEncircle() {
    ActivityEncircleController_1.ActivityEncircleController.SendCompleteRequest(this.N2g(2), () => {
      UiManager_1.UiManager.CloseView("EncirclePlayView");
    });
  }
  ResetEncircle() {
    var e = Protocol_1.Aki.Protocol.Xvg.create();
    e.e8n = this.hyc;
    ActivityEncircleController_1.ActivityEncircleController.SendEnterRequest(e, () => {
      this.CGg += 1;
      if (!this.Cbg()) {
        this.pbg();
      }
    });
  }
  pbg() {
    this.G2e = 0;
    this.jv1 = 0;
    this.zUg = 0;
    this.F2g = TimeUtil_1.TimeUtil.GetServerTime();
    this.JUg.Clear();
    var e = this.JUg.InitHexMap(this.hyc);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.EncircleReset, e);
    this.TryShowMonsterMoveEffect();
  }
  ChangeViewMapType(e, t, i) {
    var r = UiManager_1.UiManager.GetViewByName("EncirclePlayView");
    if (r) {
      r.ChangeEncircleMap(e, t, i);
    }
  }
  _bg() {
    if (!this.JUg.TryMoveMonster()) {
      this.SetAllMonsterDead();
    }
  }
  ubg() {
    this.Ebg();
    if (this.Ibg()) {
      this.Mbg();
    } else {
      this.mbg();
    }
  }
  TryPushMoveToNextState() {
    if (this.G2e === 1) {
      this.mbg();
    }
  }
  SetMonsterDead(e) {
    var t = UiManager_1.UiManager.GetViewByName("EncirclePlayView");
    if (t) {
      t.SetMonsterDead(e);
    }
  }
  cbg() {
    this.mbg();
  }
  Ibg() {
    return this.JUg.CheckMonsterEscape();
  }
  GetNextState() {
    return this.abg[this.G2e];
  }
  Ebg() {
    this.JUg.PushWallLimit();
  }
  CheckIsBoundary(e) {
    return this.JUg.CheckIsBoundary(e);
  }
  N2g(e) {
    var t = Protocol_1.Aki.Protocol.zvg.create();
    t.e8n = this.hyc;
    t.sT_ = this.jv1 + this.zUg;
    t.j7n = e;
    t.Hkg = this.KDo > 0;
    t.jkg = TimeUtil_1.TimeUtil.GetServerTime() - this.F2g;
    return t;
  }
}
exports.EncirclePlayLevelController = EncirclePlayLevelController;
//# sourceMappingURL=EncirclePlayLevelController.js.map