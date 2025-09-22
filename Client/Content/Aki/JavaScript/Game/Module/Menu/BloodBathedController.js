"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BloodBathedController = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
class BloodBathedController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(18228, this.Qwd);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(18228);
  }
  static RequestChangePlayerBloodMode(o, r) {
    var e = Protocol_1.Aki.Protocol.vMd.create();
    e.TMd = o;
    Net_1.Net.Call(23959, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24808);
          r?.(undefined);
        } else {
          ModelManager_1.ModelManager.MenuModel.SetBloodBathedMode(o);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshMenuSetting, GameSettingsDefine_1.EFunction.BloodBathedMode);
          r?.(e);
        }
      } else {
        r?.(undefined);
      }
    });
  }
  static RequestChangeBtBloodMode() {
    var e;
    var o = ModelManager_1.ModelManager.DeadReviveModel.BtBloodBathedModeInfo;
    if (o) {
      (e = Protocol_1.Aki.Protocol.SMd.create()).RMd = o.RMd;
      e.hps = o.hps;
      e.LMd = 5;
      Net_1.Net.Call(25192, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 17243);
          } else {
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("YuxueOffTips");
          }
        }
      });
    }
  }
  static RequestIsInBloodMode(o) {
    var e = Protocol_1.Aki.Protocol.aVd.create();
    Net_1.Net.Call(25611, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15904);
        } else {
          this.TryChangePlayerBloodMode(e.lVd, o);
        }
      }
    });
  }
  static TryChangePlayerBloodMode(e, o) {
    if (e) {
      if (o === 10) {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(382)).FunctionMap.set(1, () => {
          UiManager_1.UiManager.ResetToBattleView();
        });
        e.FunctionMap.set(2, () => {
          this.RequestChangePlayerBloodMode(o, () => {
            UiManager_1.UiManager.ResetToBattleView();
          });
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      } else {
        (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(383)).FunctionMap.set(1, () => {
          UiManager_1.UiManager.ResetToBattleView();
        });
        e.FunctionMap.set(2, () => {
          this.RequestChangePlayerBloodMode(o, () => {
            UiManager_1.UiManager.ResetToBattleView();
          });
        });
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
      }
    } else if (o === 10) {
      (e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(374)).FunctionMap.set(2, () => {
        this.RequestChangePlayerBloodMode(o);
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(e);
    } else {
      this.RequestChangePlayerBloodMode(o);
    }
  }
  static TryRequestChangePlayerBloodMode(e) {
    if (e !== ModelManager_1.ModelManager.MenuModel.GetBloodBathedMode()) {
      this.RequestIsInBloodMode(e);
    }
  }
}
(exports.BloodBathedController = BloodBathedController).Qwd = e => {
  ModelManager_1.ModelManager.MenuModel.SetBloodBathedMode(e.TMd);
};
//# sourceMappingURL=BloodBathedController.js.map