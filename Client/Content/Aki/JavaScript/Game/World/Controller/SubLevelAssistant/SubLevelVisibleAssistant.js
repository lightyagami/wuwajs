"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SubLevelVisibleAssistant = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Net_1 = require("../../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const IAction_1 = require("../../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../Effect/EffectSystem");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ControllerAssistantBase_1 = require("../../../Module/GeneralLogicTree/ControllerAssistant/ControllerAssistantBase");
const ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem");
class SubLevelVisibleAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments);
    this.lW_ = undefined;
    this.ap1 = undefined;
    this.cW_ = 0;
    this.xe = 0;
    this._Dt = 0;
    this.nx = undefined;
  }
  OnDestroy() {
    this.gW_();
  }
  async SetSubLevelVisible(e) {
    return this.by1(e);
  }
  async by1(e) {
    this.xe = e.ActionId;
    this._Dt = e.GroupId;
    this.nx = e.Context;
    this.qSr();
    this.ZHd(e.ActionParams);
    await this.dW_(e.ActionParams);
    this.e$d(e.ActionParams);
    this.gW_();
    this.xe = 0;
    this._Dt = 0;
    return !(this.nx = undefined);
  }
  qSr() {
    this.lW_ = new CustomPromise_1.CustomPromise();
    this.ap1 = new CustomPromise_1.CustomPromise();
  }
  gW_() {
    this.lW_ = undefined;
    this.ap1 = undefined;
  }
  ZHd(e) {
    e = e.TransitionOption;
    let t = false;
    t = e?.Type !== IAction_1.EEnableSubLevelTransitionType.SceneCapture || !e.IsAllowInput;
    ModelManager_1.ModelManager.SubLevelModel.SetSubLevelSwitching(t);
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
  }
  e$d(e) {
    ModelManager_1.ModelManager.SubLevelModel.UnsetSubLevelSwitching();
    ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag();
  }
  async dW_(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 开始", ["ActionId", this.xe], ["GroupId", this._Dt]);
    }
    var i;
    var s = t.TransitionOption;
    if (s) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 开始执行转换表现", ["ActionId", this.xe], ["GroupId", this._Dt]);
      }
      if (s.SceneCaptureEffect && !StringUtils_1.StringUtils.IsBlank(s.SceneCaptureEffect) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 开始播放SceneCaptureEffect(场景特效)", ["Path", s.SceneCaptureEffect], ["ActionId", this.xe], ["GroupId", this._Dt]), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.KuroCaptureSceneColor.Release"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.KuroCaptureSceneColor.ImmediateCapture 5"), this.cW_ = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, Global_1.Global.BaseCharacter?.D_GetTransform(), s.SceneCaptureEffect, "[LevelEventSetSubLevelsVisible]", undefined, 3, undefined, e => {
        this.lW_.SetResult(e);
      }), EffectSystem_1.EffectSystem.GetEffectActor(this.cW_)?.K2_AttachToActor(Global_1.Global.BaseCharacter, undefined, 2, 2, 2, false), (i = await this.lW_.Promise) !== 5 && Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 加载SceneCaptureEffect错误", ["loadResult", i], ["Path", s.SceneCaptureEffect], ["ActionId", this.xe], ["GroupId", this._Dt]), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible SceneCaptureEffect播放成功", ["Path", s.SceneCaptureEffect], ["ActionId", this.xe], ["GroupId", this._Dt]);
      }
      let e = undefined;
      if (s.ScreenEffectLoop && !StringUtils_1.StringUtils.IsBlank(s.ScreenEffectLoop) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 准备开始播放ScreenEffectLoop(屏幕特效)", ["Path", s.ScreenEffectLoop], ["ActionId", this.xe], ["GroupId", this._Dt]), e = await this.mW_(s.ScreenEffectLoop), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible ScreenEffectLoop已经打开", ["Path", s.ScreenEffectLoop], ["ActionId", this.xe], ["GroupId", this._Dt]);
      }
      TimerSystem_1.GameplayTimerSystem.Next(() => {
        this.ap1.SetResult();
      });
      await this.ap1.Promise;
      if (s.DelayTime && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 39, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 等待指定时间后(再处理子关卡): 开始", ["ActionId", this.xe], ["GroupId", this._Dt], ["DelayTime", s.DelayTime]), (i = s.DelayTime * CommonDefine_1.MILLIONSECOND_PER_SECOND) >= TimerSystem_1.MIN_TIME && i <= TimerSystem_1.MAX_TIME ? await TimerSystem_1.GameplayTimerSystem.Wait(i) : Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 39, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 等待指定时间配置过长或过短，跳过等待", ["ActionId", this.xe], ["GroupId", this._Dt], ["DelayTime", s.DelayTime]), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("LevelEvent", 39, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 等待指定时间(再处理子关卡): 完成", ["ActionId", this.xe], ["GroupId", this._Dt], ["DelayTime", s.DelayTime]);
      }
      await this.fW_(t);
      if (s.ScreenEffect && !StringUtils_1.StringUtils.IsBlank(s.ScreenEffect) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 生成ScreenEffect(屏幕特效)", ["Path", s.ScreenEffect], ["ActionId", this.xe], ["GroupId", this._Dt]), await this.mW_(s.ScreenEffect), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 生成ScreenEffect结束", ["Path", s.ScreenEffect], ["ActionId", this.xe], ["GroupId", this._Dt]);
      }
      if (e?.IsValid() && (ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(e), Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 关闭ScreenEffectLoop", ["Path", s.ScreenEffectLoop], ["ActionId", this.xe], ["GroupId", this._Dt]);
      }
      if (EffectSystem_1.EffectSystem.IsValid(this.cW_) && (EffectSystem_1.EffectSystem.StopEffectById(this.cW_, "[SubLevelVisibleAssistant.StopScreenCaptureEffect]", false), this.cW_ = 0, Log_1.Log.CheckDebug())) {
        Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 关闭ScreenCaptureEffect", ["Path", s.SceneCaptureEffect], ["ActionId", this.xe], ["GroupId", this._Dt]);
      }
    } else {
      await this.fW_(t);
    }
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 切换流程结束", ["ActionId", this.xe], ["GroupId", this._Dt]);
    }
  }
  async fW_(e) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible SetVisibleImp开始", ["ActionId", this.xe], ["GroupId", this._Dt]);
    }
    var t = new Array();
    if (e.EnableLevels) {
      for (const i of e.EnableLevels) {
        t.push(this.FCc(i));
      }
    }
    t.length = 0;
    if (e.DisableLevels) {
      for (const s of e.DisableLevels) {
        t.push(this.NCc(s));
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLevelEnvChange, 4);
    this.fj1(e.EnableLevels, e.DisableLevels);
    await Promise.all(t);
    Global_1.Global.BaseCharacter?.CharacterActorComponent?.RefreshCurrentFloor();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible SetVisibleImp结束");
    }
  }
  async FCc(e) {
    var t;
    var i;
    if (!this.ve1(e, "enable")) {
      if ((i = (t = ModelManager_1.ModelManager.SubLevelModel).GetPreloadOrLoadedSubLevel(e))?.Level) {
        await i.SetLevelVisible(true, "LevelEventSetSubLevelsVisible.EnableLevel");
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:EnableLevel", ["levelPath", e], ["ActionId", this.xe], ["GroupId", this._Dt]);
        }
        t.MovePreloadSubLevelToSubLevel(e);
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant 想要enable的子关卡没有预加载,强制执行加载后显示", ["subLevelPath", e], ["ActionId", this.xe], ["GroupId", this._Dt]);
        }
        await ControllerHolder_1.ControllerHolder.SubLevelController.LoadSubLevel(e, true);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant 想要enable的子关卡没有预加载,强制加载显示完毕", ["subLevelPath", e], ["ActionId", this.xe], ["GroupId", this._Dt]);
        }
      }
    }
  }
  async NCc(e) {
    var t;
    if (!this.ve1(e, "disable")) {
      if ((t = ModelManager_1.ModelManager.SubLevelModel.GetPreloadOrLoadedSubLevel(e)) && t.Level) {
        await t.SetLevelVisible(false, "LevelEventSetSubLevelsVisible.DisableLevel");
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:DisableLevel", ["levelPath", e], ["ActionId", this.xe], ["GroupId", this._Dt]);
        }
      } else if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant 想要Disable的子关卡没有加载", ["subLevelPath", e], ["ActionId", this.xe], ["GroupId", this._Dt]);
      }
    }
  }
  async mW_(e) {
    const t = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.EffectScreenPlayData_C, e => {
      t.SetResult(e);
    });
    var i = await t.Promise;
    if (i.IsValid()) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:PlayScreenEffect 生成ScreenEffect", ["Path", e], ["ActionId", this.xe], ["GroupId", this._Dt]);
      }
      ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(i);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant 屏幕特效资源无效", ["Path", e], ["ActionId", this.xe], ["GroupId", this._Dt]);
    }
    return i;
  }
  ve1(e, t) {
    if (!StringUtils_1.StringUtils.IsBlank(e)) {
      return false;
    }
    let i = "";
    if (this.nx) {
      switch (this.nx.Type) {
        case 1:
          var s = EntitySystem_1.EntitySystem.Get(this.nx.EntityId)?.GetComponent(0);
          i = (s?.GetPbDataId() ?? 0).toString();
          break;
        case 6:
          i = this.nx.TreeConfigId + "_" + this.nx.NodeId;
      }
    }
    t = `想要${t}的子关卡路径为空,配置来源：${i}`;
    ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByText(t);
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant 想要disable的子关卡路径为空", ["subLevelPath", e], ["source", i]);
    }
    return true;
  }
  fj1(e, t) {
    e = Protocol_1.Aki.Protocol.N$_.create({
      $$_: e,
      j$_: t
    });
    Net_1.Net.Call(22492, e, e => {});
  }
}
exports.SubLevelVisibleAssistant = SubLevelVisibleAssistant;
//# sourceMappingURL=SubLevelVisibleAssistant.js.map