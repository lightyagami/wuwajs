"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgingController = undefined;
const AudioController_1 = require("../../../../Core/Audio/AudioController");
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
const CommonManager_1 = require("../Common/CommonManager");
const ForgingDefine_1 = require("./ForgingDefine");
const ENTER_AUDIO_ID = "play_ui_fx_spl_gen_page_open";
const LEAVE_AUDIO_ID = "play_ui_fx_spl_gen_page_close";
const SUCCESS_AUDIO_ID = "play_ui_fx_spl_gen_robot_success_vo";
class ForgingController extends UiControllerBase_1.UiControllerBase {
  static get ForgingCostId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("ForgingCost") ?? -1;
  }
  static OnClear() {
    this.ClearCurrentInteractionEntityDisplay();
    return true;
  }
  static OnLeaveLevel() {
    this.ClearCurrentInteractionEntityDisplay();
    return true;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveRole, ForgingController.QIi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SwitchViewType, ForgingController.XIi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, ForgingController.Nqt);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveRole, ForgingController.QIi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SwitchViewType, ForgingController.XIi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, ForgingController.Nqt);
  }
  static RegisterCurrentInteractionEntity() {
    this.YIi = ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
  }
  static ClearCurrentInteractionEntityDisplay() {
    if (this.YIi) {
      this.ClearForgingDisplay();
      this.YIi = undefined;
    }
  }
  static tLi(e) {
    ModelManager_1.ModelManager.ForgingModel.UpdateForgingDataList(e.yUs);
    ModelManager_1.ModelManager.ForgingModel.UpdateForgingByServerConfig(e.yUs);
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(23840, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Forging", 49, "10270_服务端主动推送锻造数据更新");
      }
      var r = ModelManager_1.ModelManager.ForgingModel;
      let o = false;
      for (const i of e.yUs) {
        var t = i.s5n;
        var n = r.GetForgingDataById(t);
        if (!!n && !n.IsUnlock) {
          n.IsNew = true;
          n.IsUnlock = 1;
          ModelManager_1.ModelManager.NewFlagModel.AddNewFlag(LocalStorageDefine_1.ELocalStoragePlayerKey.ForgingLevelKey, t);
          o = true;
        }
      }
      if (o) {
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("FormulaLearned");
      }
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23840);
  }
  static SendForgeInfoRequest() {
    var e;
    if (ForgingController.iLi) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Forging", 49, "已经请求过10266_锻造系统相关数据，等待返回");
      }
    } else {
      ForgingController.iLi = true;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Forging", 49, "10266_客户端请求锻造系统相关数据");
      }
      e = new Protocol_1.Aki.Protocol.srs();
      Net_1.Net.Call(18871, Protocol_1.Aki.Protocol.srs.create(e), e => {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Forging", 49, "10266_返回请求锻造系统相关数据");
        }
        ForgingController.iLi = false;
        if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
          ModelManager_1.ModelManager.ForgingModel.SaveLimitRefreshTime(e.APs);
          ForgingController.tLi(e);
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GetForgingData);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 16707, undefined, true, false);
          if (UiManager_1.UiManager.IsViewShow("ForgingRootView")) {
            UiManager_1.UiManager.CloseView("ForgingRootView");
          }
        }
      });
    }
  }
  static async SendForgeInfoRequestAsync() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Forging", 49, "10266_客户端请求锻造系统相关数据(异步刷新)");
    }
    var e = new Protocol_1.Aki.Protocol.srs();
    var e = await Net_1.Net.CallAsync(18871, e);
    if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
      ModelManager_1.ModelManager.ForgingModel.SaveLimitRefreshTime(e.APs);
      ForgingController.tLi(e);
    } else {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 16707, undefined, true, false);
      if (UiManager_1.UiManager.IsViewShow("ForgingRootView")) {
        UiManager_1.UiManager.CloseView("ForgingRootView");
      }
    }
  }
  static SendForgeItemRequest(e, r, o) {
    var t = new Protocol_1.Aki.Protocol.hrs();
    t.s5n = e;
    t.Q6n = r;
    t.m9n = o;
    t.AVn = ModelManager_1.ModelManager.ForgingModel.CurrentInteractCreatureDataLongId;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Forging", 49, "10268_请求锻造道具");
    }
    Net_1.Net.Call(15588, Protocol_1.Aki.Protocol.hrs.create(t), e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Forging", 49, "10268_请求锻造道具返回");
      }
      if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
        var r = ModelManager_1.ModelManager.ForgingModel.GetForgingDataById(e.s5n);
        if (r) {
          r.LastRoleId = e.Q6n;
        }
        var r = e.MPs;
        if (e.EPs.length !== 0) {
          r.push(...e.EPs);
        }
        var o = [];
        for (const i of r) {
          var t = i.L8n;
          for (let e = 0; e < (i.UVn ?? 1); e++) {
            var n = new RewardItemData_1.RewardItemData(t, 1);
            o.push(n);
          }
        }
        ForgingController.oLi(SUCCESS_AUDIO_ID);
        ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2003, true, o);
        ModelManager_1.ModelManager.ForgingModel.UpdateForgingItemList(r);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForgingSuccess);
      } else {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ForgingFail);
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 15314);
      }
    });
  }
  static SendForgeFormulaUnlockRequest(o) {
    var e = new Protocol_1.Aki.Protocol.urs();
    e.s5n = o;
    Net_1.Net.Call(20122, Protocol_1.Aki.Protocol.urs.create(e), e => {
      var r;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Forging", 49, "10271_请求解锁配方返回");
      }
      if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
        r = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(o);
        r = ConfigManager_1.ConfigManager.ForgingConfig.GetLocalText(r.Name);
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ComposeStudy", r);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateForgingFormula);
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 22118);
      }
    });
  }
  static CheckIsBuff(e, r) {
    return ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(r).RoleList.includes(e);
  }
  static CheckIsBuffEx(e, r) {
    var o = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(r);
    if (!o.RoleList.includes(e)) {
      for (const t of ModelManager_1.ModelManager.RoleModel.GetRoleIdList()) {
        if (o.RoleList.includes(t)) {
          return true;
        }
      }
    }
    return false;
  }
  static GetMaxCreateCount(e) {
    e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e);
    return ForgingController.Hqt(e.ConsumeItems, CommonParamById_1.configCommonParamById.GetIntConfig("MaxForgingCount"));
  }
  static Hqt(e, r) {
    let o = r;
    for (const i of e) {
      var t = i.Count;
      var n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(i.ItemId);
      if (n < t) {
        return 0;
      }
      n = MathUtils_1.MathUtils.GetFloatPointFloor(n / t, 0);
      o = o < n ? o : n;
    }
    return o;
  }
  static GetForgingInfoText(e) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    let r = "";
    for (const o of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(e.SkillId)) {
      if (o.LeftSkillEffect !== 0) {
        r = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o.SkillDescribe), ...o.SkillDetailNum);
      }
    }
    return r;
  }
  static CheckCanForging(e) {
    return ModelManager_1.ModelManager.ForgingModel.CheckCanForging(e);
  }
  static CheckCanUnlock(e) {
    e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e);
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e.FormulaItemId) !== 0;
  }
  static CheckCanForgingOrCanUnlock(e) {
    if (ModelManager_1.ModelManager.ForgingModel.GetForgingDataById(e).IsUnlock) {
      return ForgingController.CheckCanForging(e);
    } else {
      return ForgingController.CheckCanUnlock(e);
    }
  }
  static GetForgingText(e) {
    e = ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e);
    return ConfigManager_1.ConfigManager.ForgingConfig.GetLocalText(e.Name);
  }
  static GetForgingId(e) {
    return ConfigManager_1.ConfigManager.ForgingConfig.GetForgeFormulaById(e).ItemId;
  }
  static GetForgingMaterialList(e) {
    return ModelManager_1.ModelManager.ForgingModel.GetForgingMaterialList(e);
  }
  static GetHelpRoleItemDataList(e) {
    return ModelManager_1.ModelManager.ForgingModel.GetHelpRoleItemDataList(e);
  }
  static CheckShowRoleView() {
    return true;
  }
  static GetCurrentRoleId() {
    return ModelManager_1.ModelManager.ForgingModel.CurrentForgingRoleId;
  }
  static SetCurrentRoleId(e) {
    ModelManager_1.ModelManager.ForgingModel.CurrentForgingRoleId = e;
  }
  static SendManufacture(e, r) {
    if (ForgingController.CheckCanForging(e)) {
      ForgingController.SendForgeItemRequest(e, ForgingController.GetCurrentRoleId(), r);
    } else {
      ForgingController.PlayForgingFailDisplay(() => {
        ForgingController.PlayForgingLoopDisplay();
      });
    }
  }
  static GetForgingRoleId(e) {
    return ModelManager_1.ModelManager.ForgingModel.GetForgingRoleId(e);
  }
  static GetForgingItemList() {
    return ModelManager_1.ModelManager.ForgingModel.GetForgingItemList();
  }
  static PlayForgingEnterDisplay(e) {
    this.ClearForgingDisplay();
    var r = this.jqt();
    if (r) {
      ForgingController.oLi(ENTER_AUDIO_ID);
      r.AddTag(-234527092);
    }
  }
  static PlayForgingLoopDisplay() {
    this.ClearForgingDisplay();
    var e = this.jqt();
    if (e) {
      e.AddTag(236686531);
    }
  }
  static PlayForgingWorkingDisplay(e) {
    this.ClearForgingDisplay();
    var r = this.jqt();
    if (!r) {
      return false;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBeginPlayForgingWorkingDisplay);
    r.AddTag(686058684);
    this.oTi = e;
    this.rLi = TimerSystem_1.TimerSystem.Delay(() => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayForgingWorkingDisplayFinished);
      if (this.oTi) {
        this.oTi();
      }
    }, ForgingDefine_1.FORGING_WORKING_SEQUENCE_TIME_LENGTH);
    return true;
  }
  static PlayForgingFlow(e, r = 2) {
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 64, "[PlayForgingFlow]播放D级剧情", ["FlowListName", e.FlowListName], ["StateId", e.StateId], ["FlowId", e.FlowId]);
      }
      r = {
        ViewName: "ForgingRootView",
        Position: r,
        TextWidth: 700
      };
      ControllerHolder_1.ControllerHolder.FlowController.StartFlowForView(e.FlowListName, e.StateId, e.FlowId, r);
    }
  }
  static oLi(e, r) {
    var o = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e);
    if (o && (AudioController_1.AudioController.PostEventByUi(o.Path, r), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Forging", 64, "播放锻造台音频", ["audioId", e]);
    }
  }
  static PlayLeaveForgingAudio() {
    this.oLi(LEAVE_AUDIO_ID);
  }
  static PlayForgingFailDisplay(e) {
    this.ClearForgingDisplay();
    var r;
    var o = this.jqt();
    if (o) {
      r = ModelManager_1.ModelManager.ComposeModel.ComposeFailFlow;
      ForgingController.PlayForgingFlow(r);
      o.AddTag(-269686894);
      this.rTi = e;
      this.rLi = TimerSystem_1.TimerSystem.Delay(() => {
        if (this.rTi) {
          this.rTi();
        }
      }, ForgingDefine_1.FORGING_FAIL_SEQUENCE_TIME_LENGTH);
    }
  }
  static ClearForgingDisplay() {
    var e = this.jqt();
    if (e) {
      e.RemoveTag(-269686894);
      e.RemoveTag(686058684);
      e.RemoveTag(236686531);
      e.RemoveTag(-234527092);
    }
    if (this.rLi && TimerSystem_1.TimerSystem.Has(this.rLi)) {
      TimerSystem_1.TimerSystem.Remove(this.rLi);
      this.rLi = undefined;
    }
  }
  static jqt() {
    var e = ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
    if (e) {
      e = EntitySystem_1.EntitySystem.Get(e);
      if (e) {
        return e.GetComponent(206);
      }
    }
  }
}
exports.ForgingController = ForgingController;
(_a = ForgingController).rLi = undefined;
ForgingController.oTi = undefined;
ForgingController.rTi = undefined;
ForgingController.YIi = 0;
ForgingController.Nqt = () => {
  ModelManager_1.ModelManager.ForgingModel.CreateForgingDataList();
  _a.SendForgeInfoRequest();
};
ForgingController.XIi = e => {
  if (CommonManager_1.CommonManager.GetCurrentSystem() === 2) {
    switch (e) {
      case 0:
        ModelManager_1.ModelManager.ForgingModel.CurrentForgingViewType = 1;
        break;
      case 2:
        ModelManager_1.ModelManager.ForgingModel.CurrentForgingViewType = 2;
    }
  }
};
ForgingController.QIi = () => {
  ModelManager_1.ModelManager.ForgingModel.UpdateHelpRoleItemDataList();
};
ForgingController.iLi = false; //# sourceMappingURL=ForgingController.js.map