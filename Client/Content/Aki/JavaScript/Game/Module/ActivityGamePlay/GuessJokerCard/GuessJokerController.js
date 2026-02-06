"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerController = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../Core/Net/Net");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
class GuessJokerController extends UiControllerBase_1.UiControllerBase {
  static RequestJokerGuessStartNew(o, r) {
    var e = Protocol_1.Aki.Protocol.gXm.create();
    e.gG_ = o;
    const t = String(TimeUtil_1.TimeUtil.GetServerTimeStamp());
    e.g7n = t;
    Net_1.Net.Call(15006, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22846);
        } else {
          ModelManager_1.ModelManager.GuessJokerGamePlayModel.EnterGame(e.RWn, o, t);
          ModelManager_1.ModelManager.GuessJokerGamePlayModel.UpdateTaskData(e.wra);
          r?.();
        }
      }
    });
  }
  static RequestJokerGuessRematch(o, r) {
    var e = Protocol_1.Aki.Protocol.gXm.create();
    e.gG_ = o;
    const t = String(TimeUtil_1.TimeUtil.GetServerTimeStamp());
    e.g7n = t;
    Net_1.Net.Call(15006, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22846);
        } else {
          ModelManager_1.ModelManager.GuessJokerGamePlayModel.RematchGame(e.RWn, o, t).then(() => {
            ModelManager_1.ModelManager.GuessJokerGamePlayModel.UpdateTaskData(e.wra);
            r?.();
          });
        }
      }
    });
  }
  static RequestJokerGuessPlayCard(e, o) {
    var r = Protocol_1.Aki.Protocol.pXm.create();
    var t = new Protocol_1.Aki.Protocol.$Xm();
    t.Yru = e;
    r.OXm = t;
    Net_1.Net.Call(21274, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26123);
        } else {
          ModelManager_1.ModelManager.GuessJokerGamePlayModel.UpdateTaskData(e.wra);
          o?.();
        }
      }
    });
  }
  static RequestJokerGuessDrawCard(e, o) {
    var r = Protocol_1.Aki.Protocol.yXm.create();
    r.GXm = e;
    Net_1.Net.Call(21488, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29075);
        } else {
          ModelManager_1.ModelManager.GuessJokerGamePlayModel.UpdateTaskData(e.wra);
          e = e.QFg;
          o?.(e);
        }
      }
    });
  }
  static JokerGuessUseSkillRequest(e, o, r) {
    var t = Protocol_1.Aki.Protocol.MXm.create();
    t.r5n = e;
    t.NXm = o ? 0 : 1;
    Net_1.Net.Call(20006, t, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 27334);
        } else {
          ModelManager_1.ModelManager.GuessJokerGamePlayModel.UpdateTaskData(e.wra);
          r?.();
        }
      }
    });
  }
  static JokerGuessRewardRequest(o, r) {
    var e = Protocol_1.Aki.Protocol.D3g.create();
    e.gG_ = o;
    Net_1.Net.Call(23748, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28708);
        } else if (e = ModelManager_1.ModelManager.SpringManorModel.ActivityData) {
          e.UpdateLevelGetReward(o);
          r?.();
        }
      }
    });
  }
  static OpenGuessJokerFloatTipsView(e, o) {
    e = {
      TextId: e,
      TextParam: o
    };
    UiManager_1.UiManager.OpenView("GuessJokerFloatTipsView", e);
  }
}
exports.GuessJokerController = GuessJokerController;
//# sourceMappingURL=GuessJokerController.js.map