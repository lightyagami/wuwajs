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
  OnOpenView(o) {
    throw new Error("Method not implemented.");
  }
  OnGetActivityResource(o) {
    return "UiItem_ActivityPastureGuide";
  }
  OnCreateSubPageComponent(o) {
    return new FloroRanchActivityView_1.FloroRanchActivityView();
  }
  OnCreateActivityData(o) {
    var e = new FloroRanchActivityData_1.FloroRanchActivityData();
    ModelManager_1.ModelManager.FloroRanchModel.SetActivityData(e);
    return e;
  }
  OnGetIsOpeningActivityRelativeView() {
    return false;
  }
  OnShowActivityFirstUnlockView(o) {
    UiManager_1.UiManager.OpenView("FloroRanchUnlockTipView");
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(17779, FloroRanchController.bnu);
    Net_1.Net.Register(23967, FloroRanchController.MVu);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17779);
    Net_1.Net.UnRegister(23967);
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountAnyChange, FloroRanchController.qdi);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountAnyChange, FloroRanchController.qdi);
  }
  static SendFloroRanchStartPlayRequest(e, t, o, r, l) {
    var a = Protocol_1.Aki.Protocol.$iu.create();
    a.w6n = e;
    a.vru = t;
    if (o && r) {
      a.Jru = o;
      a.r5n = r;
    }
    Net_1.Net.Call(23970, a, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 17083);
          l?.(undefined);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("FloroRanchGamePlay", 78, "弗洛洛牧场 游戏开始", ["SubInsId", o.Zru.vru], ["SkillId", o.Zru.RUs.Y2u.r5n], ["Races", o.Zru.Jru.join(",")], ["Stage", o.Zru.Gru], ["Day", o.Zru.Fru]);
          }
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.InitGame(e, o.Zru.Jru, o.Zru.RUs.Y2u.r5n, o.Zru.AEd);
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.EnterGame(o);
          l?.(o);
          ModelManager_1.ModelManager.FloroRanchModel.GetActivityData().SetUnFinishedSubDungeonId(t);
        }
      } else {
        l?.(undefined);
      }
    });
  }
  static SendFloroRanchPlayNextDayRequest(o, e, t) {
    var r = Protocol_1.Aki.Protocol.Yiu.create();
    r.w6n = o;
    r.vru = e;
    Net_1.Net.Call(27486, r, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 18691);
          t(undefined);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchNextDayTaskRefresh, o.vlu);
          t(o);
        }
      } else {
        t(undefined);
      }
    });
  }
  static FloroRanchPlayGachaRequest(o, e, t, r, l) {
    var a = Protocol_1.Aki.Protocol.Jiu.create();
    a.w6n = o;
    a.vru = e;
    a.J7n = t;
    a.w5n = r;
    Net_1.Net.Call(27615, a, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 27397);
          l(undefined);
        } else {
          FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.AddEntities(o.b6s).then(() => {
            l(o);
          });
        }
      } else {
        l(undefined);
      }
    });
  }
  static FloroRanchPlayRefreshGachaRequest(o, e, t, r) {
    var l = Protocol_1.Aki.Protocol.H2u.create();
    l.w6n = o;
    l.vru = e;
    l.w5n = t;
    Net_1.Net.Call(18039, l, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 25817);
          r(undefined);
        } else {
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnCurrencyChange(Number(MathUtils_1.MathUtils.LongToBigInt(o.nlu)), Number(MathUtils_1.MathUtils.LongToBigInt(o.slu)));
          r(o);
        }
      } else {
        r(undefined);
      }
    });
  }
  static SendFloroRanchPlayShopBuyRequest(o, e, t, r, l, a, n) {
    var _ = Protocol_1.Aki.Protocol.eru.create();
    _.w6n = o;
    _.vru = e;
    _.rou = r;
    _.h5n = l;
    _.w5n = t;
    _.Xxs = a;
    Net_1.Net.Call(15767, _, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 27623);
          n(undefined);
        } else {
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnShopItemPurchased(o);
          n(o);
        }
      } else {
        n(undefined);
      }
    });
  }
  static SendFloroRanchPlayRefreshShopRequest(o, e, t, r) {
    var l = Protocol_1.Aki.Protocol.A1u.create();
    l.w6n = o;
    l.vru = e;
    l.w5n = t;
    Net_1.Net.Call(25423, l, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 22413);
          r(undefined);
        } else {
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnCurrencyChange(Number(MathUtils_1.MathUtils.LongToBigInt(o.nlu)), Number(MathUtils_1.MathUtils.LongToBigInt(o.slu)));
          r(o);
        }
      } else {
        r(undefined);
      }
    });
  }
  static SendFloroRanchPlaySelectCardGroupRequest(o, e, t, r) {
    var l = Protocol_1.Aki.Protocol.CRu.create();
    l.w6n = o;
    l.vru = e;
    l.J7n = t;
    Net_1.Net.Call(18574, l, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 27135);
          r(undefined);
        } else {
          FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.AddEntities(o.vdu).then(() => {
            r(o);
          });
        }
      }
    });
  }
  static SendFloroRanchExecuteSkillPlayRequest(o, e, t) {
    var r = Protocol_1.Aki.Protocol.W2u.create();
    r.w6n = o;
    r.vru = e;
    Net_1.Net.Call(22564, r, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 26012);
          t(false);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchNextDayTaskRefresh, o.vlu);
          t(true);
        }
      } else {
        t(false);
      }
    });
  }
  static SendFloroRanchPlayEventChoiceRequest(o, e, t, r, l) {
    var a = Protocol_1.Aki.Protocol.iru.create();
    a.w6n = o;
    a.vru = e;
    a.J2s = t;
    a.l4c = r;
    Net_1.Net.Call(17085, a, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 19829);
          l(undefined);
        } else {
          l(o);
        }
      } else {
        l(undefined);
      }
    });
  }
  static SendFloroRanchPlayTributeRequest(o, e, t) {
    var r = Protocol_1.Aki.Protocol.oru.create();
    r.w6n = o;
    r.vru = e;
    Net_1.Net.Call(20822, r, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 17215);
          t(undefined);
        } else {
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnTributeResult(o);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchNextDayTaskRefresh, o.vlu);
          t(o);
        }
      } else {
        t(undefined);
      }
    });
  }
  static SendFloroRanchPlayUnlimitedModeRequest(o, e, t) {
    var r = Protocol_1.Aki.Protocol.sru.create();
    r.w6n = o;
    r.vru = e;
    Net_1.Net.Call(18665, r, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 25129);
          t?.(undefined);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchInsertTask, o.vlu);
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.IsEndlessMode = true;
          ModelManager_1.ModelManager.FloroRanchGamePlayModel.CurStage = o.tDu;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchStageInfoRefresh);
          t?.(o);
        }
      } else {
        t?.(undefined);
      }
    });
  }
  static SendFloroRanchPlayRemoveUnitRequest(o, e, t, r) {
    var l = Protocol_1.Aki.Protocol.rlu.create();
    l.w6n = o;
    l.vru = e;
    l.Slu = t;
    Net_1.Net.Call(28935, l, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 17335);
          r(undefined);
        } else {
          FloroRanchEntityActionSystem_1.FloroRanchEntityActionSystem.RemoveEntity(t).then(() => {
            ModelManager_1.ModelManager.FloroRanchGamePlayModel.OnCurrencyChange(Number(MathUtils_1.MathUtils.LongToBigInt(o.nlu)), Number(MathUtils_1.MathUtils.LongToBigInt(o.slu)));
            EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFloroRanchInsertTask, o.vlu);
            r(o);
          });
        }
      } else {
        r(undefined);
      }
    });
  }
  static SendFloroRanchSettleDataRequest(o, e, t) {
    var r = Protocol_1.Aki.Protocol.N4u.create();
    r.w6n = o;
    r.vru = e;
    Net_1.Net.Call(24906, r, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 21838);
          t(undefined);
        } else {
          t(o);
        }
      } else {
        t(undefined);
      }
    });
  }
  static SendFloroRanchSettleRequest(o, t, e, r) {
    var l = Protocol_1.Aki.Protocol.Qiu.create();
    l.w6n = o;
    l.vru = t;
    l.eou = e;
    Net_1.Net.Call(20329, l, o => {
      var e;
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 28583);
          r(undefined);
        } else {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("FloroRanch", 71, "副本结算", ["isWin", o.ulu], ["subInstanceId", t]);
          }
          r(o);
          e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
          if (o.ulu) {
            e.UpdateFloroRanchSubDungeonPass(t);
          }
          e.ClearUnFinishedSubDungeonId();
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FloroRanchSettlement);
        }
      } else {
        r(undefined);
      }
    });
  }
  static async SendFloroRanchReStartRequest(o, e, t, r) {
    var l;
    var a = Protocol_1.Aki.Protocol.Qiu.create();
    a.w6n = o;
    a.vru = e;
    a.eou = true;
    var a = await Net_1.Net.CallAsync(20329, a);
    if (a) {
      if (a.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(a.Q4n, 28583);
      } else {
        l = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
        if (a.ulu) {
          l.UpdateFloroRanchSubDungeonPass(e);
        }
        this.SendFloroRanchStartPlayRequest(o, e, t, r);
        await TimerSystem_1.GameplayTimerSystem.Wait(1000);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanchGamePlay", 58, "SendFloroRanchReStartRequest 失败");
    }
  }
  static SendFloroRanchCloseTaskRequest(o, e, t, r) {
    var l = Protocol_1.Aki.Protocol.wCd.create();
    l.w6n = o;
    l.vru = e;
    l.PCd = t;
    Net_1.Net.Call(27765, l, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 20186);
          r?.(undefined);
        } else {
          r?.(o);
        }
      } else {
        r?.(undefined);
      }
    });
  }
  static RequestTaskReward(e) {
    const t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var o = new Protocol_1.Aki.Protocol.Niu();
    o.B6n = e;
    o.w6n = t.Id;
    Net_1.Net.Call(19622, o, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 16205);
        } else {
          t.UpdateTaskRewardStatus(e);
        }
      }
    });
  }
  static RequestMilestoneReward(e) {
    const t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var o = Protocol_1.Aki.Protocol.jiu.create();
    o.w6n = t.Id;
    o.Iru = e;
    Net_1.Net.Call(17459, o, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 22043);
        }
        t.UpdateFloroRanchMilestoneDataList(e);
      }
    });
  }
  static RequestUnlockTechPoint(e, t) {
    const r = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var o = Protocol_1.Aki.Protocol.Giu.create();
    o.w6n = r.Id;
    o.Eru = e;
    Net_1.Net.Call(28814, o, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 20620);
        } else {
          r.UpdateFloroRanchTechnologyData(e);
          t(o);
        }
      }
    });
  }
  static RequestComicRead() {
    const e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var o;
    if (!e.GetIsReadComic()) {
      (o = new Protocol_1.Aki.Protocol.jZu()).w6n = e.Id;
      Net_1.Net.Call(17848, o, o => {
        if (o) {
          if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 15937);
          } else {
            e.ReadComic();
          }
        }
      });
    }
  }
  static RequestSubDungeonRead(e) {
    const t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    var o = new Protocol_1.Aki.Protocol.NZu();
    o.w6n = t.Id;
    o.vru = e;
    Net_1.Net.Call(15055, o, o => {
      if (o) {
        if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 23382);
        } else {
          t.UpdateFloroRanchSubDungeonRedDot([e]);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshCommonActivityRedDot, t.Id);
        }
      }
    });
  }
}
(exports.FloroRanchController = FloroRanchController).bnu = o => {
  var e = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
  switch (o.fEu) {
    case Protocol_1.Aki.Protocol.vEu.Proto_FloroCard:
      e.UpdateFloroRanchCardData(o.gEu);
      break;
    case Protocol_1.Aki.Protocol.vEu.Proto_FloroToy:
      e.UpdateFloroRanchToyData(o.CEu);
      break;
    case Protocol_1.Aki.Protocol.vEu.Proto_FloroSkill:
      e.UpdateFloroRanchSkillData(o.pEu);
      break;
    case Protocol_1.Aki.Protocol.vEu.Proto_FloroTask:
      e.UpdateFloroRanchTaskData(o.Dwu);
      break;
    case Protocol_1.Aki.Protocol.vEu.Proto_FloroRace:
      e.UpdateFloroRanchRaceData(o.mEu);
      break;
    case Protocol_1.Aki.Protocol.vEu.Proto_FloroIns:
      e.UpdateFloroRanchDungeonUnLock(o.Nld);
      break;
    case Protocol_1.Aki.Protocol.vEu.Proto_FloroSubIns:
      e.UpdateFloroRanchSubDungeon(o.oAu);
      break;
    case Protocol_1.Aki.Protocol.vEu.q9u:
      e.UpdateFloroRanchSubDungeonHistoryData(o.G9u);
  }
};
FloroRanchController.MVu = o => {};
FloroRanchController.qdi = (o, e) => {
  var t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData(false);
  if (t && (t.GetFloroRanchParamConfig().MilestoneItemId === o && t.UpdateFloroRanchMilestoneItemCount(), t.GetFloroRanchParamConfig().TechPointItem === o)) {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FloroRanchDataRedDot);
  }
}; //# sourceMappingURL=FloroRanchController.js.map