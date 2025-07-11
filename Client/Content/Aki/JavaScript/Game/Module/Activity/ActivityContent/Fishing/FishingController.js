"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingController = undefined;
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const StringBuilder_1 = require("../../../../../Core/Utils/StringBuilder");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const FishingQteController_1 = require("../../../../LevelGamePlay/FishingQte/FishingQteController");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../../Ui/Base/UiControllerBase");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const DockyardItemBlockOriginalData_1 = require("./Dockyard/Base/DockyardItemBlockOriginalData");
const DockyardCageViewModel_1 = require("./Dockyard/Cage/DockyardCageViewModel");
const DockyardInteractViewModel_1 = require("./Dockyard/Interact/DockyardInteractViewModel");
const DockyardViewModel_1 = require("./Dockyard/Main/DockyardViewModel");
const DockyardWareHouseViewModel_1 = require("./Dockyard/WareHouse/DockyardWareHouseViewModel");
const FishingDefine_1 = require("./FishingDefine");
const FishingLevelUpData_1 = require("./FishingTips/FishingLevelUpData");
const FISHING_SHIP_DEAD_TIME = 1300;
class FishingController extends UiControllerBase_1.UiControllerBase {
  static OpenDockyardView() {
    var e = new DockyardViewModel_1.DockyardViewModel();
    UiManager_1.UiManager.OpenView("DockyardView", e);
  }
  static OpenDockyardWareHouseView(e = false) {
    var o = new DockyardWareHouseViewModel_1.DockyardWareHouseViewModel();
    o.InGameplayFlow = e;
    UiManager_1.UiManager.OpenView("DockyardWareHouseView", o);
  }
  static async OpenDockyardCageView(e) {
    var o = new DockyardCageViewModel_1.DockyardCageViewModel();
    o.ConfigId = e;
    await UiManager_1.UiManager.OpenViewAsync("DockyardCageView", o);
  }
  static OpenDockyardInteractView(e, o) {
    var r = new DockyardInteractViewModel_1.DockyardInteractViewModel();
    r.ConfigId = e;
    r.ActionIncId = o;
    UiManager_1.UiManager.OpenView("DockyardInteractView", r);
  }
  static OpenDockyardShopView(e = undefined) {
    if (ModelManager_1.ModelManager.FunctionModel.IsOpen(10077)) {
      UiManager_1.UiManager.OpenView("DockyardShopMainView", e);
    } else {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_NotOpenFunction");
    }
  }
  static OpenFishingTechRootView() {
    UiManager_1.UiManager.OpenView("FishingTechRootView");
  }
  static OpenFishingHandBookView() {
    UiManager_1.UiManager.OpenView("FishingHandBookView");
  }
  static OpenFishingQuestView() {
    UiManager_1.UiManager.OpenView("FishingQuestView");
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction("FishingQuestView", FishingController.$N_, "FishingController.CanOpenFishingQuestView");
    UiManager_1.UiManager.AddOpenViewCheckFunction("FishingHandBookView", FishingController.WN_, "FishingController.CanOpenHandBookView");
    UiManager_1.UiManager.AddOpenViewCheckFunction("FishingTechRootView", FishingController.QN_, "FishingController.CanOpenTechRootView");
    UiManager_1.UiManager.AddOpenViewCheckFunction("DockyardShopMainView", FishingController.KN_, "FishingController.CanOpenDockyardShopView");
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("FishingQuestView", FishingController.$N_);
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("FishingHandBookView", FishingController.WN_);
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("FishingTechRootView", FishingController.QN_);
    UiManager_1.UiManager.RemoveOpenViewCheckFunction("DockyardShopMainView", FishingController.KN_);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenSet, this.JYl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.JYl);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.u1_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, this.v7t);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenSet, this.JYl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFunctionOpenUpdate, this.JYl);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnCommonItemCountRefresh, this.u1_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, this.v7t);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(28091, e => {});
    Net_1.Net.Register(21369, e => {
      e = e.RT_;
      if (e) {
        ModelManager_1.ModelManager.DockyardModel.UpdateDockyardData(e.OT_);
        ModelManager_1.ModelManager.FishingModel.GetShipData().RefreshData(e);
      }
    });
    Net_1.Net.Register(22881, e => {
      ModelManager_1.ModelManager.DockyardModel.SetTrawlDataListFromServer(e.QT_);
    });
    Net_1.Net.Register(16819, e => {
      ModelManager_1.ModelManager.FishingModel.UpdateFishingTechData(e.rb_);
    });
    Net_1.Net.Register(25770, e => {
      ModelManager_1.ModelManager.FishingModel.RefreshHandBookData(e.AT_);
      ModelManager_1.ModelManager.FishingModel.FishingItemHandBookUnlockTraceList.push(...e.WA_);
    });
    Net_1.Net.Register(17370, e => {
      ModelManager_1.ModelManager.FishingModel.RefreshHandBookDataReward(e.ob_);
    });
    Net_1.Net.Register(23924, e => {
      ModelManager_1.ModelManager.FishingModel.AddCageDataFromServer(e.nb_, e.sb_);
    });
    Net_1.Net.Register(26174, e => {
      if (e.ab_) {
        if (e.eTs) {
          ModelManager_1.ModelManager.FishingModel.RemoveOneFishingPointData(e.nb_, e.ab_);
        } else {
          ModelManager_1.ModelManager.FishingModel.RefreshFishingPointData(e.nb_, e.ab_);
        }
      }
    });
    Net_1.Net.Register(28661, e => {
      if (e.ab_) {
        if (e.eTs) {
          ModelManager_1.ModelManager.FishingModel.RemoveTempFishingPointData(e.ab_);
        } else {
          ModelManager_1.ModelManager.FishingModel.SetTempFishingPointData(e.nb_, e.ab_);
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshTempFishingPointNum);
      }
    });
    Net_1.Net.Register(26306, e => {});
    Net_1.Net.Register(22936, e => {
      for (const o of e.lb_) {
        ModelManager_1.ModelManager.DockyardModel.SetTrawlData(o);
      }
      for (const r of e._b_) {
        ModelManager_1.ModelManager.DockyardModel.SetWareHouseData(r);
      }
    });
    Net_1.Net.Register(26197, e => {
      ModelManager_1.ModelManager.FishingModel.RoleTalkIds = e.UT_;
    });
    Net_1.Net.Register(17621, e => {
      ModelManager_1.ModelManager.FishingModel.UpdateInteractData(e.DT_);
    });
    Net_1.Net.Register(20115, e => {
      if (ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust !== e.LT_) {
        ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust = e.LT_;
        ModelManager_1.ModelManager.FishingQuestModel.TraceEntrust();
      }
      ModelManager_1.ModelManager.FishingQuestModel.EntrustRefreshCostRatio = e.y$_;
      ModelManager_1.ModelManager.FishingQuestModel.UpdateEntrusts(e.bT_);
    });
    Net_1.Net.Register(17997, this.Hx_);
    Net_1.Net.Register(25965, e => {
      ModelManager_1.ModelManager.FishingModel.UnlockPort.push(...e.BT_);
    });
    Net_1.Net.Register(18308, this.w4_);
    Net_1.Net.Register(23704, e => {
      ModelManager_1.ModelManager.FishingModel.UnlockShipSkin.push(...e.Nws);
    });
    Net_1.Net.Register(29791, e => {
      var o = ModelManager_1.ModelManager.FishingModel.GetShipData();
      o.SetLastPortId(e.XP_);
      o.SetIsInPortInternal(e.GT_);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28091);
    Net_1.Net.UnRegister(21369);
    Net_1.Net.UnRegister(22881);
    Net_1.Net.UnRegister(16819);
    Net_1.Net.UnRegister(25770);
    Net_1.Net.UnRegister(17370);
    Net_1.Net.UnRegister(23924);
    Net_1.Net.UnRegister(26174);
    Net_1.Net.UnRegister(26306);
    Net_1.Net.UnRegister(22936);
    Net_1.Net.UnRegister(26197);
    Net_1.Net.UnRegister(17621);
    Net_1.Net.UnRegister(20115);
    Net_1.Net.UnRegister(17997);
    Net_1.Net.UnRegister(25965);
    Net_1.Net.UnRegister(18308);
    Net_1.Net.UnRegister(23704);
  }
  static dQ_() {
    var e;
    if (this.mQ_()) {
      e = ModelManager_1.ModelManager.FishingModel.GetFishingLevelUpInfo();
      ModelManager_1.ModelManager.FishingModel.ClearLastFishingExp();
      UiManager_1.UiManager.OpenView("FishingLevelUpView", e);
    }
  }
  static RequestFishingIllustratedReward(e) {
    var o = Protocol_1.Aki.Protocol.$0_.create();
    o.N6n = e;
    Net_1.Net.Call(21063, o, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24572);
      }
    });
  }
  static e8_(e, o) {
    if (ModelManager_1.ModelManager.DockyardModel.IsPrintLog) {
      var r = new StringBuilder_1.StringBuilder();
      for (const i of e) {
        r.Append("\n");
        r.Append(`IcId: ${i.b9n}, ItemId: ${i.L8n}, RowIndex: ${i.l8n.rPs}, ColumnIndex: ${i.l8n.iPs}, Rotate: ${i.EXl}`);
      }
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Dockyard", 10, "输出请求前的背包数据信息", ["请求类型", o], ["背包道具信息", r.ToString()]);
      }
    }
  }
  static RequestFishingCabinPut(r) {
    var e = Protocol_1.Aki.Protocol.Q0_.create();
    e.IXl = r.Type;
    e.s5n = r.RequestId ?? 0;
    e.ZYl = r.LeftDataList;
    e.ezl = r.RightDataList;
    e.tzl = r.RemoveIncId ?? 0;
    this.e8_(r.RightDataList, r.Type);
    Net_1.Net.Call(20044, e, e => {
      var o;
      if (e) {
        if (!(o = e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs)) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 24572);
        }
        r.Callback?.(o);
      }
    });
  }
  static RequestFishingQuickSell(r) {
    var e = Protocol_1.Aki.Protocol.z0_.create();
    Net_1.Net.Call(28064, e, e => {
      var o;
      if (e) {
        if (!(o = e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs)) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20194);
        }
        r(o);
      }
    });
  }
  static TryRequestFishingSell(e, o, r, i) {
    if (!ModelManager_1.ModelManager.FishingQuestModel.OnFishingItemSell(o, r, () => {
      this.RequestFishingSell(e, i);
    })) {
      this.RequestFishingSell(e, i);
    }
  }
  static RequestFishingSell(e, r) {
    var o = Protocol_1.Aki.Protocol.tv_.create();
    o.izl = e;
    Net_1.Net.Call(27043, o, e => {
      var o;
      if (e) {
        if (!(o = e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs)) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29697);
        }
        r(o);
      }
    });
  }
  static RequestFishingSailingRequest(o, e, r) {
    var i = Protocol_1.Aki.Protocol.rv_.create();
    i.nZl = o;
    i.sZl = e;
    Net_1.Net.Call(15591, i, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 18957);
        } else {
          UiManager_1.UiManager.CloseView("SailingView");
          UiManager_1.UiManager.CloseView("FishingDockView");
          ModelManager_1.ModelManager.FishingModel.SaveLocalSailingIsFix(o);
          if (r === 1) {
            ControllerHolder_1.ControllerHolder.TimeOfDayController.AdjustTime(FishingDefine_1.SAILING_DAY_TIME, Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto);
          } else if (r === 2) {
            ControllerHolder_1.ControllerHolder.TimeOfDayController.AdjustTime(FishingDefine_1.SAILING_NIGHT_TIME, Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto);
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnFishingSailing, ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust);
        }
      }
    });
  }
  static RequestFishingShipFixRequest() {
    var e = Protocol_1.Aki.Protocol.uv_.create();
    Net_1.Net.Call(24896, e, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29821);
      }
    });
  }
  static RequestFishingEntrustHandInRequest(e, o) {
    var r = Protocol_1.Aki.Protocol.nv_.create();
    r.X6n = e;
    r.k9n = o;
    Net_1.Net.Call(19510, r, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 19404);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingRefreshQuestView, false);
          ModelManager_1.ModelManager.FishingQuestModel.AutoTraceEntrust();
        }
      }
    });
  }
  static RequestFishingEntrustTrace(e) {
    var o = Protocol_1.Aki.Protocol.av_.create();
    o.X6n = e;
    Net_1.Net.Call(28016, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 16804);
          ModelManager_1.ModelManager.FishingQuestModel.TraceFormClick = false;
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingRefreshQuestView, true);
        }
      }
    });
  }
  static RequestFishingEntrustRefresh(e) {
    var o = Protocol_1.Aki.Protocol.lv_.create();
    o.X6n = e;
    Net_1.Net.Call(28926, o, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 20233);
        } else {
          e = e.X6n;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingRefreshQuestView, false, e);
        }
      }
    });
  }
  static RequestFishingEntrustAccept(e, o, r) {
    var i = Protocol_1.Aki.Protocol.zv_.create();
    i.X6n = e;
    i.jc_ = o;
    Net_1.Net.Call(22038, i, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 21263);
        } else {
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingRefreshQuestView, true);
          r?.();
        }
      }
    });
  }
  static RequestFishingTechLevelUp(r) {
    var e = Protocol_1.Aki.Protocol.mv_.create();
    e.b5n = r;
    Net_1.Net.Call(16920, e, e => {
      var o;
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 25398);
        } else {
          e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechById(r);
          if ((o = ModelManager_1.ModelManager.FishingModel.GetTechNodeCurrentLevel(r)) && e) {
            o = {
              Title: "FishingTechLevelUpSuccessTitle",
              TextList: [{
                TextId: (o = ConfigManager_1.ConfigManager.FishingConfig.GetFishingTechEffectById(e.Effect[o - 1])).Desc,
                Params: o.ShowParams
              }]
            };
            UiManager_1.UiManager.OpenView("FishingTechLevelUpSuccessView", o);
            FishingController.PlayRoleTechAudio(e.Type);
          }
        }
      }
    });
  }
  static async RequestFishingPointInfo(e, o) {
    var r = Protocol_1.Aki.Protocol.oy_.create();
    r.s5n = o;
    var o = await Net_1.Net.CallAsync(17015, r);
    if (o) {
      if (o.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Q4n, 27721);
      } else if (o.ub_) {
        ModelManager_1.ModelManager.FishingModel.RefreshFishingPointData(e, o.ub_);
      }
    }
  }
  static RequestFishingShipSkinChange(o) {
    var e = Protocol_1.Aki.Protocol.iy_.create();
    e.Z7n = o;
    e.sZl = ModelManager_1.ModelManager.FishingModel.DockId;
    Net_1.Net.Call(19937, e, e => {
      if (e) {
        if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 29676);
        } else {
          ModelManager_1.ModelManager.FishingModel.CurrentShipSkin = o;
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FishingShipSkinChangeSuccess);
        }
      }
    });
  }
  static ShowExitFishingViewConfirm(e) {
    var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(236);
    o.FunctionMap.set(2, e);
    o.HasToggle = true;
    o.ToggleText = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Fishing_LoginRepeat");
    o.SetToggleFunction(this.zYl);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
  }
  static ShowConfirmBoxAndRequestFishingExit(o) {
    var e = () => {
      ControllerHolder_1.ControllerHolder.FishingController.RequestFishingExit(e => {
        ModelManager_1.ModelManager.FishingQteModel.GameInfo?.SetGameStage(7);
        o?.(e);
      });
    };
    if (ModelManager_1.ModelManager.DockyardModel.GetWareHouseDataSize() > 0 && ModelManager_1.ModelManager.DockyardModel.IsNeedShowExitConfirmBox) {
      ControllerHolder_1.ControllerHolder.FishingController.ShowExitFishingViewConfirm(e);
    } else {
      e();
    }
  }
  static RequestFishingExit(o) {
    var e = Protocol_1.Aki.Protocol.Zv_.create();
    Net_1.Net.Call(18475, e, e => {
      o?.(!!e);
    });
  }
  static IsInFishingShip() {
    return ModelManager_1.ModelManager.FishingModel.GetShipData().IsShipDriving();
  }
  static ConfirmToTeleportToPort(e) {
    var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(253);
    o.FunctionMap.set(2, e);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(o);
  }
  static TeleportToPortPosition(e) {
    var o;
    var e = ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortConfig(e);
    if (e &&= ConfigManager_1.ConfigManager.FishingConfig.GetFishingPortPosition(e.AshorePoint)) {
      ModelManager_1.ModelManager.FishingModel.GetShipData().GetEntityHandle()?.Entity?.GetComponent(233)?.TryLeave(Global_1.Global.BaseCharacter.CharacterActorComponent.Entity, 1);
      o = e.Position;
      o = Vector_1.Vector.Create(o[0], o[1], o[2]);
      e = e.Rotation;
      e = Rotator_1.Rotator.Create(e[1], e[2], e[0]);
      ControllerHolder_1.ControllerHolder.TeleportController.TeleportToPositionNoLoading(o.ToUeVector(), e.ToUeRotator(), "FishingController");
    }
  }
  static RequestFishingHandIn(r) {
    var e = Protocol_1.Aki.Protocol.hy_.create();
    e.s5n = r.InteractId;
    e.ZYl = r.LeftDataList;
    e.ezl = r.RightDataList;
    e.tzl = r.RemoveIncId ?? 0;
    e.kr_ = r.ActionIncId;
    Net_1.Net.Call(27812, e, e => {
      var o;
      if (e) {
        if (!(o = e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs)) {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22605);
        }
        r.Callback?.(o, e.mb_);
      }
    });
  }
  static CheckFishingSkillCanBegin(e) {
    switch (e) {
      case 1:
        if (this.$8_()) {
          return 0;
        } else {
          return 1;
        }
      case 2:
        if (this.$8_()) {
          if (ModelManager_1.ModelManager.FishingModel.GetTempFishingPointNum() >= ModelManager_1.ModelManager.FishingModel.GetTempFishingPointLimit()) {
            return 3;
          } else {
            return 0;
          }
        } else {
          return 1;
        }
      default:
        return 0;
    }
  }
  static ShowFishingSkillTips(e, o) {
    switch (o) {
      case 2:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(FishingDefine_1.FISHING_SKILL_IN_CD);
        break;
      case 1:
        if (e === 1) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(FishingDefine_1.FISHING_SKILL_BOMB_NOT_ENOUGH);
        } else if (e === 2) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(FishingDefine_1.FISHING_SKILL_BAIT_NOT_ENOUGH);
        }
        break;
      case 3:
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(FishingDefine_1.FISHING_SKILL_BAIT_LIMIT);
    }
  }
  static BeginFishingSkill(e) {
    switch (e) {
      case 0:
        ControllerHolder_1.ControllerHolder.FishingController.E2_();
        break;
      case 1:
        ControllerHolder_1.ControllerHolder.FishingController.I2_();
        break;
      case 2:
        ControllerHolder_1.ControllerHolder.FishingController.T2_();
    }
  }
  static E2_() {
    var e = new Protocol_1.Aki.Protocol.my_();
    Net_1.Net.Call(25927, e, () => {});
  }
  static I2_() {
    var e;
    var o = this.GetFishingSkillCostId();
    if (!(o <= 0)) {
      (e = new Protocol_1.Aki.Protocol._y_()).L8n = o;
      Net_1.Net.Call(27046, e, e => {
        if (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(FishingDefine_1.FISHING_SKILL_BOMB_SUCCESS);
          var o = [];
          for (const i of e.bMs) {
            var r = new DockyardItemBlockOriginalData_1.DockyardItemBlockOriginalData(i);
            o.push(r);
          }
          FishingQteController_1.FishingQteController.OpenFishingSuccessView(o);
        }
      });
    }
  }
  static T2_() {
    var e;
    var o = this.GetFishingSkillCostId();
    if (!(o <= 0)) {
      (e = new Protocol_1.Aki.Protocol.uy_()).L8n = o;
      Net_1.Net.Call(24624, e, e => {
        if (e && e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(FishingDefine_1.FISHING_SKILL_BAIT_SUCCESS);
        }
      });
    }
  }
  static $8_() {
    var e = this.GetFishingSkillCostId();
    return !(e <= 0) && ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e) > 0;
  }
  static GetFishingSkillCostId() {
    var e = ModelManager_1.ModelManager.RouletteModel.CurrentExploreSkillId;
    var e = ModelManager_1.ModelManager.RouletteModel.UnlockExploreSkillDataMap.get(e);
    if (!e || (e = e.Cost).size <= 0) {
      return 0;
    } else {
      return e.keys().next().value;
    }
  }
  static FishingTeleportToBoat() {
    if (ControllerHolder_1.ControllerHolder.TeleportController.CheckCanTeleport()) {
      if (!ControllerHolder_1.ControllerHolder.TeleportController.ShowTeleportConfirmBox(() => {
        this.h5_();
      })) {
        this.h5_();
      }
    } else {
      ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("TrialRoleTransmitLimit");
    }
  }
  static h5_() {
    ModelManager_1.ModelManager.GameModeModel.IsTeleport = true;
    ModelManager_1.ModelManager.GameModeModel.AddLoadMapHandle("RequestFishingTeleportToBoat");
    var e = new Protocol_1.Aki.Protocol.l6_();
    Net_1.Net.Call(25842, e, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 28547);
      }
      ModelManager_1.ModelManager.GameModeModel.RemoveLoadMapHandle("RequestFishingTeleportToBoat");
      ModelManager_1.ModelManager.GameModeModel.IsTeleport = false;
    });
  }
  static PlayRoleTechAudio(e) {
    this.StopRoleTechAudio();
    var o;
    var r = Math.ceil(Math.random() * FishingDefine_1.FISHING_TECH_AUDIO_SIZE);
    let i = "";
    if (e === 4) {
      o = ModelManager_1.ModelManager.PlayerInfoModel.GetPlayerGender();
      i = o === 0 ? FishingDefine_1.FISHING_FEMALE_TECH_AUDIO : FishingDefine_1.FISHING_MALE_TECH_AUDIO;
    } else if (e === 5) {
      i = FishingDefine_1.FISHING_PHOEBE_TECH_AUDIO;
    }
    if (i !== "") {
      i += r;
      this.S8_ = i;
      AudioSystem_1.AudioSystem.PostEvent(i);
    }
  }
  static StopRoleTechAudio() {
    if (!StringUtils_1.StringUtils.IsEmpty(this.S8_)) {
      AudioSystem_1.AudioSystem.ExecuteAction(this.S8_, 0);
      this.S8_ = "";
    }
  }
  static HideEffectInWorld() {
    for (const e of FishingDefine_1.fishingEffectList) {
      ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)?.Entity?.DisableByKey(4);
    }
  }
  static ShowEffectInWorld() {
    for (const e of FishingDefine_1.fishingEffectList) {
      ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e)?.Entity?.EnableByKey(4);
    }
  }
}
exports.FishingController = FishingController;
(_a = FishingController).$N_ = () => {
  var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(100081);
  if (!e) {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_NotOpenFunction");
  }
  return e;
};
FishingController.WN_ = () => {
  var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10079);
  if (!e) {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_NotOpenFunction");
  }
  return e;
};
FishingController.QN_ = () => {
  var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10078);
  if (!e) {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_NotOpenFunction");
  }
  return e;
};
FishingController.KN_ = () => {
  var e = ModelManager_1.ModelManager.FunctionModel.IsOpen(10076);
  if (!e) {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("Fishing_NotOpenFunction");
  }
  return e;
};
FishingController.FishingInputHandler = e => {
  switch (e) {
    case InputMappingsDefine_1.actionMappings.切换角色1:
      _a.OpenDockyardView();
      break;
    case InputMappingsDefine_1.actionMappings.切换角色2:
      _a.OpenFishingQuestView();
      break;
    case InputMappingsDefine_1.actionMappings.切换角色3:
      _a.OpenFishingTechRootView();
      break;
    case InputMappingsDefine_1.actionMappings.切换角色4:
      _a.OpenFishingHandBookView();
  }
};
FishingController.w4_ = e => {
  if (Log_1.Log.CheckInfo()) {
    Log_1.Log.Info("Fishing", 10, "幽灵船玩法状态通知", ["是否开启", e.V2_]);
  }
  if (e.V2_) {
    UiManager_1.UiManager.OpenView("FishingWarningTips");
  } else {
    UiManager_1.UiManager.CloseView("FishingWarningTips");
  }
};
FishingController.Hx_ = a => {
  const l = a?.l8n;
  if (l) {
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      var e = ModelManager_1.ModelManager.FishingModel.GetShipData();
      e.GetEntityHandle()?.Entity?.GetComponent(276)?.ExecuteRevive();
      var o = e.GetCreatureDataId();
      var e = e.IsShipDriving();
      var r = new UE.VectorDouble(l.X, l.Y, l.Z);
      var i = Rotator_1.Rotator.Create(a._8n?.Pitch ?? 0, a._8n?.Yaw ?? 0, a._8n?.Roll ?? 0);
      var t = new Protocol_1.Aki.Protocol.t4s();
      t.p5n = Protocol_1.Aki.Protocol.p5n.Proto_CenterText;
      var n = new Protocol_1.Aki.Protocol.M4s();
      n.v5n = "剧情_V2.1航海活动主线";
      n.M5n = 20;
      n.S5n = 1;
      t.E5n = n;
      ControllerHolder_1.ControllerHolder.TeleportController.TeleportVehicle(o, e, r, i, false, Protocol_1.Aki.Protocol.v4s.Proto_TeleportVehicle, t);
    }, FISHING_SHIP_DEAD_TIME);
  } else if (Log_1.Log.CheckError()) {
    Log_1.Log.Error("Teleport", 48, "捕鱼船死亡时目标位置错误");
  }
};
FishingController.JYl = (e, o) => {
  if (e === 10073 && o) {
    e = Protocol_1.Aki.Protocol.k0_.create();
    Net_1.Net.Call(25598, e, e => {
      if (e) {
        ModelManager_1.ModelManager.DockyardModel.SetFishingShipData(e.TT_.RT_);
        ModelManager_1.ModelManager.FishingQuestModel.CurrentTraceEntrust = e.TT_.LT_;
        ModelManager_1.ModelManager.FishingQuestModel.TraceEntrust();
        ModelManager_1.ModelManager.FishingModel.RoleTalkIds = e.TT_.UT_;
        ModelManager_1.ModelManager.FishingModel.UnlockPort = e.TT_.BT_;
        ModelManager_1.ModelManager.FishingModel.CurrentShipSkin = e.TT_.RT_.Z7n;
        ModelManager_1.ModelManager.FishingModel.UnlockShipSkin = e.TT_.Nws;
        ModelManager_1.ModelManager.FishingQuestModel.UpdateEntrusts(e.TT_.bT_);
        ModelManager_1.ModelManager.FishingModel.GetShipData().RefreshData(e.TT_.RT_);
        ModelManager_1.ModelManager.FishingModel.SetFishingTechData(e.TT_.wT_);
        ModelManager_1.ModelManager.FishingModel.SetCageDataMapFromServer(e.TT_.PT_);
        ModelManager_1.ModelManager.FishingModel.SetInteractData(e.TT_.DT_);
        ModelManager_1.ModelManager.FishingModel.SetAllFishingPointData(e.TT_.xT_);
        ModelManager_1.ModelManager.FishingModel.SetHandBookData(e.TT_.AT_);
        ModelManager_1.ModelManager.FishingQuestModel.EntrustRefreshCostRatio = e.TT_.y$_;
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshTempFishingPointNum);
      }
    });
  }
};
FishingController.u1_ = (e, o, r) => {
  if (e.s5n === ModelManager_1.ModelManager.FishingModel.FishingReputationItemId) {
    e = new FishingLevelUpData_1.FishingLevelUpData(r, o);
    ModelManager_1.ModelManager.FishingModel.SetFishingLevelUpInfo(e);
    UiManager_1.UiManager.OpenView("FishingLevelUpTips", e);
  }
};
FishingController.v7t = e => {
  if (e === "DockyardWareHouseView" || e === "CommonRewardView") {
    if ((e = ModelManager_1.ModelManager.FishingModel.GetFishingLevelUpInfo()) && e.IsLevelUp()) {
      _a.dQ_();
    }
  }
};
FishingController.mQ_ = () => !!UiManager_1.UiManager.IsViewOpen("BattleView") || !!UiManager_1.UiManager.IsViewOpen("FishingQuestView") && ModelManager_1.ModelManager.FishingModel.IsInDock;
FishingController.zYl = e => {
  ModelManager_1.ModelManager.DockyardModel.IsNeedShowExitConfirmBox = !e;
};
FishingController.S8_ = ""; //# sourceMappingURL=FishingController.js.map