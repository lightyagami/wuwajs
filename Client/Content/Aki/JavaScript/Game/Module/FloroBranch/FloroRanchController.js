"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchController = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const ActivityControllerBase_1 = require("../Activity/ActivityControllerBase");
const FloroRanchActivityData_1 = require("./Data/FloroRanchActivityData");
const FloroRanchEntityActionSystem_1 = require("./Entity/FloroRanchEntityActionSystem");
const FloroRanchActivityView_1 = require("./View/FloroRanchActivityView");
class FloroRanchController extends ActivityControllerBase_1.ActivityControllerBase {
  OnOpenView(e) {
    throw new Error("Method not implemented.");
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityPastureGuide";
  }
  OnCreateSubPageComponent(e) {
    return new FloroRanchActivityView_1.FloroRanchActivityView();
  }
  OnCreateActivityData(e) {
    var o = new FloroRanchActivityData_1.FloroRanchActivityData();
    ModelManager_1.ModelManager.FloroRanchModel.SetActivityData(o);
    return o;
  }
  OnGetIsOpeningActivityRelativeView() {
    for (const e of ["FloroRanchMainView", "FloroRanchLimitRewardView", "FloroRanchPermanentRewardView", "FloroRanchDungeonSelectView"]) {
      if (UiManager_1.UiManager.IsViewOpen(e)) {
        return true;
      }
    }
    return false;
  }
  OnActivityFirstUnlock(e) {
    UiManager_1.UiManager.OpenView("FloroRanchUnlockTipView");
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(29126, FloroRanchController.enu);
    Net_1.Net.Register(27176, FloroRanchController.JFu);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(29126);
    Net_1.Net.UnRegister(27176);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, FloroRanchController.qdi);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, FloroRanchController.qdi);
  }
  static SendFloroRanchStartPlayRequest(o, t, e, r, l) {
    var n = Protocol_1.Aki.Protocol.viu.create();
    n.w6n = o;
    n.Qiu = t;
    if (e && r) {
      n.Tru = e;
      n.r5n = r;
    }
    Net_1.Net.Call(16687, n, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21119);
        } else {
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.InitGame(o, e.bru.Tru, e.bru.RUs.sku.r5n);
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnterGame(e);
          l?.(e);
          if (e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData()) {
            e.SetUnFinishedSubDungeonId(t);
          }
        }
      }
    });
  }
  static SendFloroRanchPlayNextDayRequest(e, o, t) {
    var r = Protocol_1.Aki.Protocol.Iiu.create();
    r.w6n = e;
    r.Qiu = o;
    Net_1.Net.Call(15818, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 26567);
          t(undefined);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchNextDayTaskRefresh, e.Whu);
          t(e);
        }
      } else {
        t(undefined);
      }
    });
  }
  static FloroRanchPlayGachaRequest(e, o, t, r, l) {
    var n = Protocol_1.Aki.Protocol.biu.create();
    n.w6n = e;
    n.Qiu = o;
    n.J7n = t;
    n.w5n = r;
    Net_1.Net.Call(15819, n, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22324);
          l(undefined);
        } else {
          FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.AddEntity(e.b6s);
          l(e);
        }
      } else {
        l(undefined);
      }
    });
  }
  static FloroRanchPlayRefreshGachaRequest(e, o, t, r) {
    var l = Protocol_1.Aki.Protocol.Gku.create();
    l.w6n = e;
    l.Qiu = o;
    l.w5n = t;
    Net_1.Net.Call(28935, l, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28357);
          r(undefined);
        } else {
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnCurrencyChange(Number(MathUtils_1.MathUtils.LongToBigInt(e.xhu)), Number(MathUtils_1.MathUtils.LongToBigInt(e.Uhu)));
          r(e);
        }
      } else {
        r(undefined);
      }
    });
  }
  static SendFloroRanchPlayShopBuyRequest(e, o, t, r, l, n) {
    var a = Protocol_1.Aki.Protocol.Liu.create();
    a.w6n = e;
    a.Qiu = o;
    a.Pru = t;
    a.h5n = r;
    a.w5n = l;
    Net_1.Net.Call(22436, a, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28012);
          n(undefined);
        } else {
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnShopItemPurchased(e);
          n(e);
        }
      } else {
        n(undefined);
      }
    });
  }
  static SendFloroRanchPlayRefreshShopRequest(e, o, t, r) {
    var l = Protocol_1.Aki.Protocol.Q_u.create();
    l.w6n = e;
    l.Qiu = o;
    l.w5n = t;
    Net_1.Net.Call(15559, l, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19561);
          r(undefined);
        } else {
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnCurrencyChange(Number(MathUtils_1.MathUtils.LongToBigInt(e.xhu)), Number(MathUtils_1.MathUtils.LongToBigInt(e.Uhu)));
          r(e);
        }
      } else {
        r(undefined);
      }
    });
  }
  static SendFloroRanchPlaySelectCardGroupRequest(e, o, t, r) {
    var l = Protocol_1.Aki.Protocol.Kbu.create();
    l.w6n = e;
    l.Qiu = o;
    l.J7n = t;
    Net_1.Net.Call(28301, l, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23949);
          r(undefined);
        } else {
          FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.AddEntity(e.Ocu);
          r(e);
        }
      }
    });
  }
  static SendFloroRanchExecuteSkillPlayRequest(e, o, t) {
    var r = Protocol_1.Aki.Protocol.Nku.create();
    r.w6n = e;
    r.Qiu = o;
    Net_1.Net.Call(29245, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16298);
          t(false);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchInsertTask, e.Whu);
          t(true);
        }
      } else {
        t(false);
      }
    });
  }
  static SendFloroRanchPlayEventChoiceRequest(e, o, t, r, l) {
    var n = Protocol_1.Aki.Protocol.Aiu.create();
    n.w6n = e;
    n.Qiu = o;
    n.J2s = t;
    n.l4c = r;
    Net_1.Net.Call(27121, n, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23552);
          l(undefined);
        } else {
          l(e);
        }
      } else {
        l(undefined);
      }
    });
  }
  static SendFloroRanchPlayTributeRequest(e, o, t) {
    var r = Protocol_1.Aki.Protocol.xiu.create();
    r.w6n = e;
    r.Qiu = o;
    Net_1.Net.Call(15513, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28223);
          t(undefined);
        } else {
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnTributeResult(e);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchInsertTask, e.Whu);
          t(e);
        }
      } else {
        t(undefined);
      }
    });
  }
  static SendFloroRanchPlayUnlimitedModeRequest(e, o, t) {
    var r = Protocol_1.Aki.Protocol.Diu.create();
    r.w6n = e;
    r.Qiu = o;
    Net_1.Net.Call(28111, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25104);
          t?.(undefined);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchInsertTask, e.Whu);
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsEndlessMode = true;
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.CurStage = e._Uu;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchStageInfoRefresh);
          t?.(e);
        }
      } else {
        t?.(undefined);
      }
    });
  }
  static SendFloroRanchPlayRemoveUnitRequest(e, o, t, r) {
    var l = Protocol_1.Aki.Protocol.Ahu.create();
    l.w6n = e;
    l.Qiu = o;
    l.Khu = t;
    Net_1.Net.Call(25704, l, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 15537);
          r(undefined);
        } else {
          FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.RemoveEntity(t);
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnCurrencyChange(Number(MathUtils_1.MathUtils.LongToBigInt(e.xhu)), Number(MathUtils_1.MathUtils.LongToBigInt(e.Uhu)));
          r(e);
        }
      } else {
        r(undefined);
      }
    });
  }
  static SendFloroRanchSettleDataRequest(e, o, t) {
    var r = Protocol_1.Aki.Protocol.bFu.create();
    r.w6n = e;
    r.Qiu = o;
    Net_1.Net.Call(17381, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20937);
          t(undefined);
        } else {
          t(e);
        }
      } else {
        t(undefined);
      }
    });
  }
  static SendFloroRanchSettleRequest(e, t, o, r) {
    var l = Protocol_1.Aki.Protocol.Siu.create();
    l.w6n = e;
    l.Qiu = t;
    l.Rru = o;
    Net_1.Net.Call(25018, l, e => {
      var o;
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25097);
          r(undefined);
        } else {
          r(e);
          if (o = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData()) {
            if (e.qhu) {
              o.UpdateFloroRanchSubDungeonPass(t);
            }
            o.ClearUnFinishedSubDungeonId();
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FloroRanchSettlement);
          }
        }
      } else {
        r(undefined);
      }
    });
  }
  static async SendFloroRanchReStartRequest(e, o, t, r) {
    var l = Protocol_1.Aki.Protocol.Siu.create();
    l.w6n = e;
    l.Qiu = o;
    l.Rru = true;
    var l = await Net_1.Net.CallAsync(25018, l);
    if (l) {
      if (l.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(l.Q4n, 25097);
      } else {
        this.SendFloroRanchStartPlayRequest(e, o, t, r);
        await TimerSystem_1.GameplayTimerSystem.Wait(1000);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "SendFloroRanchReStartRequest 失败");
    }
  }
  static RequestTaskReward(o) {
    const t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var e;
    if (t) {
      (e = new Protocol_1.Aki.Protocol.fiu()).B6n = o;
      e.w6n = t.Id;
      Net_1.Net.Call(17576, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20885);
          } else {
            t.UpdateTaskRewardStatus(o);
          }
        }
      });
    }
  }
  static RequestMilestoneReward(o) {
    const t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var e;
    if (t) {
      (e = Protocol_1.Aki.Protocol.Ciu.create()).w6n = t.Id;
      e.Jiu = o;
      Net_1.Net.Call(19890, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24637);
          }
          t.UpdateFloroRanchMilestoneDataList(o);
        }
      });
    }
  }
  static RequestUnlockTechPoint(o, t) {
    const r = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var e;
    if (r) {
      (e = Protocol_1.Aki.Protocol.diu.create()).w6n = r.Id;
      e.ziu = o;
      Net_1.Net.Call(24895, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18737);
          } else {
            r.UpdateFloroRanchTechnologyData(o);
            t(e);
          }
        }
      });
    }
  }
  static RequestComicRead() {
    const o = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var e;
    if (o) {
      (e = new Protocol_1.Aki.Protocol.k$c()).w6n = o.Id;
      Net_1.Net.Call(20941, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24205);
          } else {
            o.ReadComic();
          }
        }
      });
    }
  }
  static RequestSubDungeonRead(o) {
    const t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var e;
    if (t) {
      (e = new Protocol_1.Aki.Protocol.D$c()).w6n = t.Id;
      e.Qiu = o;
      Net_1.Net.Call(21464, e, e => {
        if (e) {
          if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 23012);
          } else {
            t.UpdateFloroRanchSubDungeonRedDot([o]);
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
          }
        }
      });
    }
  }
}
(exports.FloroRanchController = FloroRanchController).enu = e => {
  var o = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
  if (o) {
    switch (e.oEu) {
      case Protocol_1.Aki.Protocol.hEu.Proto_FloroCard:
        o.UpdateFloroRanchCardData(e.nEu);
        break;
      case Protocol_1.Aki.Protocol.hEu.Proto_FloroToy:
        o.UpdateFloroRanchToyData(e.sEu);
        break;
      case Protocol_1.Aki.Protocol.hEu.Proto_FloroSkill:
        o.UpdateFloroRanchSkillData(e.aEu);
        break;
      case Protocol_1.Aki.Protocol.hEu.Proto_FloroTask:
        o.UpdateFloroRanchTaskData(e.Iwu);
        break;
      case Protocol_1.Aki.Protocol.hEu.Proto_FloroRace:
        o.UpdateFloroRanchRaceData(e.rEu);
        break;
      case Protocol_1.Aki.Protocol.hEu.Proto_FloroIns:
        o.UpdateFloroRanchDungeonUnLock(e.Viu);
        break;
      case Protocol_1.Aki.Protocol.hEu.Proto_FloroSubIns:
        o.UpdateFloroRanchSubDungeon(e.qwu);
        break;
      case Protocol_1.Aki.Protocol.hEu.m9c:
        o.UpdateFloroRanchSubDungeonHistoryData(e.f9c);
    }
  }
};
FloroRanchController.JFu = e => {};
FloroRanchController.qdi = (e, o) => {
  var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
  if (t && (t.GetFloroRanchParamConfig().MilestoneItemId === e && t.UpdateFloroRanchMilestoneItemCount(), t.GetFloroRanchParamConfig().TechPointItem === e)) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FloroRanchDataRedDot);
  }
}; //# sourceMappingURL=FloroRanchController.js.map