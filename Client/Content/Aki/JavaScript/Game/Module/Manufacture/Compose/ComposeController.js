"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeController = undefined;
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
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiControllerBase_1 = require("../../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../../Ui/UiManager");
const ItemRewardController_1 = require("../../ItemReward/ItemRewardController");
const RewardItemData_1 = require("../../ItemReward/RewardData/RewardItemData");
const CommonManager_1 = require("../Common/CommonManager");
const ComposeDefine_1 = require("./ComposeDefine");
const ENTER_AUDIO_ID = "play_ui_fx_spl_gen_page_open";
const LEAVE_AUDIO_ID = "play_ui_fx_spl_gen_page_close";
const SUCCESS_AUDIO_ID = "play_ui_fx_spl_gen_robot_success_vo";
class ComposeController extends UiControllerBase_1.UiControllerBase {
  static get ComposeCoinId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("ComposeCost") ?? -1;
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
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ActiveRole, ComposeController.QIi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.SwitchViewType, ComposeController.XIi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLoadingNetDataDone, ComposeController.Nqt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnItemUse, ComposeController.$Ii);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CloseView, ComposeController.$Ge);
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ActiveRole, ComposeController.QIi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.SwitchViewType, ComposeController.XIi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLoadingNetDataDone, ComposeController.Nqt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnItemUse, ComposeController.$Ii);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CloseView, ComposeController.$Ge);
  }
  static RegisterCurrentInteractionEntity() {
    this.YIi = ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId;
  }
  static ClearCurrentInteractionEntityDisplay() {
    if (this.YIi) {
      this.ClearCompositeDisplay();
      this.YIi = undefined;
    }
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(17635, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Compose", 49, "10277_服务端主动推送合成数据更新");
      }
      ModelManager_1.ModelManager.ComposeModel.UpdateComposeDataList(e.nGs);
      ModelManager_1.ModelManager.ComposeModel.HideComposeDataList(e._Gs);
    });
    Net_1.Net.Register(18687, e => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Compose", 49, "10280_服务端主动推送合成等级数据更新");
      }
      ModelManager_1.ModelManager.ComposeModel.UpdateComposeInfo(e.aGs);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateComposeInfo);
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(17635);
    Net_1.Net.UnRegister(18687);
  }
  static JIi(e) {
    ModelManager_1.ModelManager.ComposeModel.CreateComposeDataList(e.nGs);
    ModelManager_1.ModelManager.ComposeModel.UpdateComposeByServerConfig(e.sGs);
    ModelManager_1.ModelManager.ComposeModel.CreateComposeLevelInfo(e.aGs);
    ModelManager_1.ModelManager.ComposeModel.SaveLimitRefreshTime(e.APs);
  }
  static async SendSynthesisInfoRequestAsync() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Compose", 49, "10273_客户端请求合成系统相关数据(异步刷新)");
    }
    var e = new Protocol_1.Aki.Protocol.tCs();
    var e = await Net_1.Net.CallAsync(18011, e);
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Compose", 49, "10273_返回请求合成系统相关数据(异步刷新)");
    }
    if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
      ComposeController.JIi(e);
    } else {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 25781, undefined, true, false);
      if (UiManager_1.UiManager.IsViewShow("ComposeCarryOnView")) {
        UiManager_1.UiManager.CloseView("ComposeCarryOnView");
      }
    }
  }
  static async SendSynthesisItemRequest(t, r, n) {
    var a = new Protocol_1.Aki.Protocol.rCs();
    a.s5n = t;
    a.Q6n = r;
    a.m9n = n;
    a.AVn = ModelManager_1.ModelManager.ComposeModel.CurrentInteractCreatureDataLongId;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Compose", 49, "10275_请求合成道具");
    }
    var t = await Net_1.Net.CallAsync(21860, Protocol_1.Aki.Protocol.rCs.create(a));
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Compose", 49, "10275_请求合成道具返回");
    }
    if (t.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
      let e = undefined;
      if (e = (e = (e = e || ModelManager_1.ModelManager.ComposeModel.GetStructureDataById(t.s5n)) || ModelManager_1.ModelManager.ComposeModel.GetReagentProductionDataById(t.s5n)) || ModelManager_1.ModelManager.ComposeModel.GetPurificationDataById(t.s5n)) {
        e.LastRoleId = t.Q6n;
      }
      var r = t.MPs;
      if (t.EPs.length !== 0) {
        r.push(...t.EPs);
      }
      var n = ModelManager_1.ModelManager.ComposeModel;
      var a = n.GetComposeInfo();
      var s = a.ComposeLevel;
      var i = n.GetComposeMaxLevel();
      var l = n.GetComposeLevelByLevel(i);
      var a = a.TotalProficiency;
      var l = l.Completeness;
      let o = undefined;
      if (n.CurrentComposeListType === 1 && (n.LastExp < l || s < i && a < l)) {
        l = n.GetComposeLevelByLevel(Math.min(i, s + 1));
        i = {
          FromProgress: n.LastExp,
          ToProgress: a,
          MaxProgress: l.Completeness
        };
        o = [i];
      }
      n.LastExp = a;
      const m = [];
      for (const g of r) {
        var _ = g.L8n;
        var C = g.UVn;
        var _ = new RewardItemData_1.RewardItemData(_, C);
        m.push(_);
      }
      if (!ComposeController.PlayCompositeWorkingDisplay(() => {
        ComposeController.ZIi(SUCCESS_AUDIO_ID);
        ComposeController.PlayCompositeLoopDisplay();
        ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2004, true, m, o);
      })) {
        ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2004, true, m, o);
      }
      ModelManager_1.ModelManager.ComposeModel.UpdateComposeItemList(r);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComposeSuccess);
    } else {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Cvs, 15074);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComposeFail);
    }
  }
  static async SendExchangeItemRequest(e, o, t) {
    var r;
    var n;
    var a = new Protocol_1.Aki.Protocol.Np_();
    a.Mjl = e;
    a.Ejl = o;
    a.Ijl = t;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Compose", 5, "请求置换");
    }
    var o = await Net_1.Net.CallAsync(26974, Protocol_1.Aki.Protocol.Np_.create(a));
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Compose", 5, "请求置换返回");
    }
    if (o.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
      a = [];
      r = e;
      n = t / ComposeDefine_1.EXCHANGE_COUNT;
      r = new RewardItemData_1.RewardItemData(r, n);
      a.push(r);
      ItemRewardController_1.ItemRewardController.OpenCompositeRewardView(2004, true, a, undefined);
      n = {
        L8n: e,
        UVn: t / ComposeDefine_1.EXCHANGE_COUNT
      };
      ModelManager_1.ModelManager.ComposeModel.UpdateComposeItemList([n]);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComposeSuccess);
    } else {
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(o.Cvs, 15074);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ComposeFail);
    }
  }
  static SendSynthesisLevelRewardRequest() {
    var e;
    if (ComposeController.eTi) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Compose", 49, "已经请求过10278_领取制药等级奖励，等待返回");
      }
    } else {
      e = new Protocol_1.Aki.Protocol.sCs();
      ComposeController.eTi = true;
      Net_1.Net.Call(27422, Protocol_1.Aki.Protocol.sCs.create(e), e => {
        ComposeController.eTi = false;
        if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Compose", 49, "10278_领取制药等级奖励返回");
          }
          EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpgradeComposeLevel);
        } else {
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 28596);
        }
      });
    }
  }
  static SendSynthesisFormulaUnlockRequest(t) {
    var e = new Protocol_1.Aki.Protocol.lCs();
    e.s5n = t;
    Net_1.Net.Call(18662, Protocol_1.Aki.Protocol.lCs.create(e), e => {
      var o;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Compose", 49, "10281_制药配方解锁请求返回");
      }
      if (e.Cvs === Protocol_1.Aki.Protocol.Q4n.KRs) {
        ModelManager_1.ModelManager.ComposeModel.UnlockReagentProductionData(e.s5n);
        ModelManager_1.ModelManager.ComposeModel.UnlockStructureData(e.s5n);
        o = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t);
        o = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(o.Name);
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ComposeStudy", o);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateComposeFormula);
      } else {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Cvs, 16494);
      }
    });
  }
  static CheckIsBuff(e, o) {
    return ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(o).RoleList.includes(e);
  }
  static GetComposeInfoText(e) {
    e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    let o = "";
    for (const t of ConfigManager_1.ConfigManager.RoleSkillConfig.GetSkillList(e.SkillId)) {
      if (t.LeftSkillEffect !== 0) {
        o = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.SkillDescribe), ...t.SkillDetailNum);
      }
    }
    return o;
  }
  static GetComposeItemList() {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeItemList();
  }
  static SetSelectedComposeLevel(e) {
    ModelManager_1.ModelManager.ComposeModel.SelectedComposeLevel = e;
  }
  static GetSelectedComposeLevel() {
    return ModelManager_1.ModelManager.ComposeModel.SelectedComposeLevel;
  }
  static GetRewardLevelInfo() {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeInfo();
  }
  static GetComposeLevelByLevel(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeLevelByLevel(e);
  }
  static GetSumExpByLevel(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetSumExpByLevel(e);
  }
  static GetDropIdByLevel(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetDropIdByLevel(e);
  }
  static GetComposeMaxLevel() {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeMaxLevel();
  }
  static CheckCanReagentProduction(e) {
    return ModelManager_1.ModelManager.ComposeModel.CheckCanReagentProduction(e);
  }
  static CheckCanPurification(e) {
    return ModelManager_1.ModelManager.ComposeModel.CheckCanPurification(e);
  }
  static CheckCanExchange(e) {
    return ModelManager_1.ModelManager.ComposeModel.CheckCanExchange(e);
  }
  static CheckCanStructure(e) {
    return ModelManager_1.ModelManager.ComposeModel.CheckCanStructure(e);
  }
  static CheckIsBuffEx(e, o) {
    var t = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(o);
    if (!t.RoleList.includes(e)) {
      for (const r of ModelManager_1.ModelManager.RoleModel.GetRoleIdList()) {
        if (t.RoleList.includes(r)) {
          return true;
        }
      }
    }
    return false;
  }
  static GetComposeText(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeText(e);
  }
  static GetComposeId(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeId(e);
  }
  static CheckShowRoleView() {
    return true;
  }
  static GetMaxCreateCount(e, o) {
    e = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(e);
    e = ComposeController.Hqt(e.ConsumeItems, e.LimitCount);
    if (!o || o.TotalMakeCountInLimitTime <= 0) {
      return e;
    } else {
      o = o.TotalMakeCountInLimitTime - o.MadeCountInLimitTime;
      return Math.min(e, o);
    }
  }
  static Hqt(e, o) {
    let t = 0;
    t = o !== 0 ? o : CommonParamById_1.configCommonParamById.GetIntConfig("max_cooking_count");
    for (const a of e) {
      var r = a.Count;
      var n = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(a.ItemId);
      if (n < r) {
        return 0;
      }
      n = MathUtils_1.MathUtils.GetFloatPointFloor(n / r, 0);
      t = t < n ? t : n;
    }
    return t;
  }
  static async SendManufacture(e, o) {
    if (ModelManager_1.ModelManager.ComposeModel.CheckComposeMaterialEnough(e)) {
      if (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType === 1) {
        ModelManager_1.ModelManager.ComposeModel.CleanAddExp();
      }
      await ComposeController.SendSynthesisItemRequest(e, ComposeController.GetCurrentRoleId(), o);
    } else {
      ComposeController.PlayCompositeFailDisplay(() => {
        ComposeController.PlayCompositeLoopDisplay();
      });
    }
  }
  static async SendExchangeRequest(e, o, t) {
    if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(o) < t) {
      ComposeController.PlayCompositeFailDisplay(() => {
        ComposeController.PlayCompositeLoopDisplay();
      });
    } else {
      await this.SendExchangeItemRequest(e, o, t);
    }
  }
  static GetCurrentRoleId() {
    return ModelManager_1.ModelManager.ComposeModel.CurrentComposeRoleId;
  }
  static SetCurrentRoleId(e) {
    ModelManager_1.ModelManager.ComposeModel.CurrentComposeRoleId = e;
  }
  static GetManufactureMaterialList(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetComposeMaterialList(e);
  }
  static GetHelpRoleItemDataList(e) {
    return ModelManager_1.ModelManager.ComposeModel.GetHelpRoleItemDataList(e);
  }
  static GetComposeRoleId(e) {
    switch (ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType) {
      case 1:
        return ModelManager_1.ModelManager.ComposeModel.GetReagentProductionRoleId(e);
      case 2:
        return ModelManager_1.ModelManager.ComposeModel.GetStructureRoleId(e);
      case 3:
        return ModelManager_1.ModelManager.ComposeModel.GetPurificationRoleId(e);
      default:
        return 0;
    }
  }
  static CheckCanShowExpItem() {
    return ModelManager_1.ModelManager.ComposeModel.CurrentComposeListType === 1;
  }
  static CheckCanGetComposeLevel() {
    var e = ModelManager_1.ModelManager.ComposeModel.GetComposeInfo();
    if (e.ComposeLevel !== ModelManager_1.ModelManager.ComposeModel.GetComposeMaxLevel()) {
      var o = ModelManager_1.ModelManager.ComposeModel.GetSumExpByLevel(e.ComposeLevel);
      if (e.TotalProficiency >= o) {
        return true;
      }
    }
    return false;
  }
  static PlayCompositeEnterDisplay(e) {
    this.ClearCompositeDisplay();
    var o;
    var t = this.jqt();
    if (t) {
      o = ModelManager_1.ModelManager.ComposeModel.ComposeEnterFlow;
      ComposeController.PlayCompositeFlow(o);
      ComposeController.ZIi(ENTER_AUDIO_ID);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 64, "[CompositeDisplay]播放进入合成表现");
      }
      t.AddTag(-234527092);
      this.tTi = e;
      this.iTi = TimerSystem_1.TimerSystem.Delay(() => {
        if (this.tTi) {
          this.tTi();
        }
      }, ComposeDefine_1.COMPOSITE_ENTER_SEQUENCE_TIME_LENGTH);
    }
  }
  static PlayCompositeLoopDisplay() {
    this.ClearCompositeDisplay();
    var e = this.jqt();
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 64, "[CompositeDisplay]播放合成循环表现");
      }
      e.AddTag(236686531);
    }
  }
  static PlayCompositeWorkingDisplay(e) {
    this.ClearCompositeDisplay();
    var o = this.jqt();
    if (!o) {
      return false;
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnBeginPlayCompositeWorkingDisplay);
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Test", 64, "[CompositeDisplay]播放合成工作中表现");
    }
    o.AddTag(686058684);
    this.oTi = e;
    this.iTi = TimerSystem_1.TimerSystem.Delay(() => {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnPlayCompositeWorkingDisplayFinished);
      if (this.oTi) {
        this.oTi();
      }
    }, ComposeDefine_1.COMPOSITE_WORKING_SEQUENCE_TIME_LENGTH);
    return true;
  }
  static PlayCompositeFlow(e) {
    var o;
    if (e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 64, "[PlayCompositeFlow]播放D级剧情", ["FlowListName", e.FlowListName], ["StateId", e.StateId], ["FlowId", e.FlowId]);
      }
      o = {
        ViewName: "ComposeCarryOnView",
        Position: 2,
        TextWidth: 700
      };
      ControllerHolder_1.ControllerHolder.FlowController.StartFlowForView(e.FlowListName, e.StateId, e.FlowId, o);
    }
  }
  static ZIi(e, o) {
    var t = ConfigManager_1.ConfigManager.AudioConfig.GetAudioPath(e);
    if (t && (AudioController_1.AudioController.PostEventByUi(t.Path, o), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("Compose", 64, "播放合成台音频", ["audioId", e]);
    }
  }
  static PlayLeaveCompositeAudio() {
    this.ZIi(LEAVE_AUDIO_ID);
  }
  static PlayCompositeFailDisplay(e) {
    this.ClearCompositeDisplay();
    var o;
    var t = this.jqt();
    if (t) {
      o = ModelManager_1.ModelManager.ComposeModel.ComposeFailFlow;
      ComposeController.PlayCompositeFlow(o);
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Test", 64, "[CompositeDisplay]播放合成失败表现");
      }
      t.AddTag(-269686894);
      this.rTi = e;
      this.iTi = TimerSystem_1.TimerSystem.Delay(() => {
        if (this.rTi) {
          this.rTi();
        }
      }, ComposeDefine_1.COMPOSITE_FAIL_SEQUENCE_TIME_LENGTH);
    }
  }
  static ClearCompositeDisplay() {
    var e = this.jqt();
    if (e && (e.RemoveTag(-269686894), e.RemoveTag(686058684), e.RemoveTag(236686531), e.RemoveTag(-234527092), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Test", 64, "[CompositeDisplay]清理所有GameplayTag");
    }
    this.tTi = undefined;
    this.oTi = undefined;
    this.rTi = undefined;
    if (this.iTi && TimerSystem_1.TimerSystem.Has(this.iTi)) {
      TimerSystem_1.TimerSystem.Remove(this.iTi);
      this.iTi = undefined;
    }
  }
  static jqt() {
    if (this.YIi) {
      var e = EntitySystem_1.EntitySystem.Get(this.YIi);
      if (e) {
        return e.GetComponent(196);
      }
    }
  }
}
(exports.ComposeController = ComposeController).iTi = undefined;
ComposeController.tTi = undefined;
ComposeController.oTi = undefined;
ComposeController.rTi = undefined;
ComposeController.YIi = undefined;
ComposeController.Nqt = () => {
  ModelManager_1.ModelManager.ComposeModel.CreatePurificationDataList();
};
ComposeController.XIi = e => {
  if (CommonManager_1.CommonManager.GetCurrentSystem() === 1) {
    switch (e) {
      case 0:
        ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 1;
        break;
      case 1:
        ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 2;
        break;
      case 2:
        ModelManager_1.ModelManager.ComposeModel.CurrentComposeViewType = 3;
    }
  }
};
ComposeController.$Ii = (e, o) => {
  var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e);
  if (t.ShowTypes.includes(35) || t.ShowTypes.includes(37)) {
    t = ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaByFormulaItemId(e);
    e = ConfigManager_1.ConfigManager.ComposeConfig.GetLocalText(t.Name);
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode("ComposeStudy", e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.UpdateFormula);
  }
};
ComposeController.$Ge = e => {
  if (e === "ItemTipsView") {
    ModelManager_1.ModelManager.ComposeModel.ComposeSelectItem = undefined;
  }
};
ComposeController.QIi = () => {
  ModelManager_1.ModelManager.ComposeModel.UpdateHelpRoleItemDataList();
};
ComposeController.eTi = false; //# sourceMappingURL=ComposeController.js.map