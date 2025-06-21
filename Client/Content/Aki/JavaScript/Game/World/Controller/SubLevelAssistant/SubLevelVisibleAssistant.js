"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SubLevelVisibleAssistant = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../Core/Common/Log"),
  Queue_1 = require("../../../../Core/Container/Queue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Net_1 = require("../../../../Core/Net/Net"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  LevelEventLockInputState_1 = require("../../../LevelGamePlay/LevelEventLockInputState"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  ControllerAssistantBase_1 = require("../../../Module/GeneralLogicTree/ControllerAssistant/ControllerAssistantBase"),
  ScreenEffectSystem_1 = require("../../../Render/Effect/ScreenEffectSystem/ScreenEffectSystem"),
  ALLINPUTTAG = "BlockAllInputTag";
class SubLevelVisibleAssistant extends ControllerAssistantBase_1.ControllerAssistantBase {
  constructor() {
    super(...arguments), this.$Er = new Queue_1.Queue, this.lW_ = void 0, this.O01 = void 0, this.cW_ = 0, this.xe = 0, this._Dt = 0, this.nx = void 0, this.k81 = () => {
      this.$Er.Pop()?.FinishCallback(), this.m8()
    }
  }
  OnDestroy() {
    this.gW_()
  }
  SetSubLevelVisible(e) {
    this.$Er.Empty ? (this.$Er.Push(e), this.m8()) : (this.$Er.Push(e), Log_1.Log.CheckInfo() && Log_1.Log.Info("GameMode", 18, "SubLevelController.SubLevelVisibleAssistant:添加Task", ["ActionId", e.ActionId], ["GroupId", e.GroupId]))
  }
  m8() {
    var e;
    this.$Er.Empty || (e = this.$Er.Front, this.iy1(e).then(this.k81))
  }
  async iy1(e) {
    this.xe = e.ActionId, this._Dt = e.GroupId, this.nx = e.Context, this.qSr(), this.yp1(), await this.dW_(e.ActionParams), this.Sp1(), this.gW_(), this.xe = 0, this._Dt = 0, this.nx = void 0
  }
  qSr() {
    this.lW_ = new CustomPromise_1.CustomPromise, this.O01 = new CustomPromise_1.CustomPromise
  }
  gW_() {
    this.lW_ = void 0, this.O01 = void 0
  }
  yp1() {
    LevelEventLockInputState_1.LevelEventLockInputState.IsLockInput() ? (LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.push(ALLINPUTTAG), ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag()) : (ModelManager_1.ModelManager.InputDistributeModel.SetInputDistributeTag(ALLINPUTTAG), LevelEventLockInputState_1.LevelEventLockInputState.Lock([ALLINPUTTAG]))
  }
  Sp1() {
    var e;
    LevelEventLockInputState_1.LevelEventLockInputState.IsLockInput() && (0 <= (e = LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.findIndex(e => e === ALLINPUTTAG)) && LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.splice(e, 1), 0 === LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames.length) && (LevelEventLockInputState_1.LevelEventLockInputState.Unlock(), ControllerHolder_1.ControllerHolder.InputDistributeController.RefreshInputTag())
  }
  async dW_(t) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 开始", ["ActionId", this.xe], ["GroupId", this._Dt]);
    var i, s = t.TransitionOption;
    if (s) {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 开始执行转换表现", ["ActionId", this.xe], ["GroupId", this._Dt]), s.SceneCaptureEffect && !StringUtils_1.StringUtils.IsBlank(s.SceneCaptureEffect) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 开始播放SceneCaptureEffect特效", ["ActionId", this.xe], ["GroupId", this._Dt]), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.KuroCaptureSceneColor.Release"), UE.KismetSystemLibrary.ExecuteConsoleCommand(GlobalData_1.GlobalData.World, "r.KuroCaptureSceneColor.ImmediateCapture 5"), this.cW_ = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, Global_1.Global.BaseCharacter?.D_GetTransform(), s.SceneCaptureEffect, "[LevelEventSetSubLevelsVisible]", void 0, 3, void 0, e => {
        this.lW_.SetResult(e)
      }), 5 !== (i = await this.lW_.Promise) && Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 加载屏幕特效错误", ["loadResult", i], ["SceneCaptureEffectPath", s.SceneCaptureEffect], ["ActionId", this.xe], ["GroupId", this._Dt]), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible SceneCaptureEffect特效播放成功", ["ActionId", this.xe], ["GroupId", this._Dt]);
      let e = void 0;
      s.ScreenEffectLoop && !StringUtils_1.StringUtils.IsBlank(s.ScreenEffectLoop) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 准备开始播放ScreenEffectLoop特效", ["ActionId", this.xe], ["GroupId", this._Dt]), e = await this.mW_(s.ScreenEffectLoop), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible ScreenEffectLoop已经打开", ["ActionId", this.xe], ["GroupId", this._Dt]), TimerSystem_1.TimerSystem.Next(() => {
        this.O01.SetResult()
      }), await this.O01.Promise, await this.fW_(t), s.ScreenEffect && !StringUtils_1.StringUtils.IsBlank(s.ScreenEffect) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 生成ScreenEffect", ["ActionId", this.xe], ["GroupId", this._Dt]), await this.mW_(s.ScreenEffect), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 生成ScreenEffect结束", ["ActionId", this.xe], ["GroupId", this._Dt]), e?.IsValid() && (ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().EndScreenEffect(e), Log_1.Log.CheckDebug()) && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 关闭ScreenEffectLoop", ["ActionId", this.xe], ["GroupId", this._Dt]), EffectSystem_1.EffectSystem.IsValid(this.cW_) && (EffectSystem_1.EffectSystem.StopEffectById(this.cW_, "[WorldLevelUpView.RecycleEffect]", !1), this.cW_ = 0, Log_1.Log.CheckDebug()) && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 关闭ScreenCapture特效", ["ActionId", this.xe], ["GroupId", this._Dt])
    } else await this.fW_(t);
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible 切换流程结束", ["ActionId", this.xe], ["GroupId", this._Dt])
  }
  async fW_(e) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible SetVisibleImp开始", ["ActionId", this.xe], ["GroupId", this._Dt]);
    var t = new Array;
    if (e.EnableLevels)
      for (const i of e.EnableLevels) t.push(this.FCc(i));
    if (t.length = 0, e.DisableLevels)
      for (const s of e.DisableLevels) t.push(this.NCc(s));
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLevelEnvChange, 4), this.O81(e.EnableLevels, e.DisableLevels), await Promise.all(t), Global_1.Global.BaseCharacter?.CharacterActorComponent?.RefreshCurrentFloor(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:StartSetSubLevelsVisible SetVisibleImp结束")
  }
  async FCc(e) {
    var t, i;
    this.ee1(e, "enable") || ((i = (t = ModelManager_1.ModelManager.SubLevelModel).GetPreloadOrLoadedSubLevel(e))?.Level ? (await i.SetLevelVisible(!0, "LevelEventSetSubLevelsVisible.EnableLevel"), Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:EnableLevel", ["levelPath", e], ["ActionId", this.xe], ["GroupId", this._Dt]), t.MovePreloadSubLevelToSubLevel(e)) : (Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant 想要enable的子关卡没有预加载,强制执行加载后显示", ["subLevelPath", e], ["ActionId", this.xe], ["GroupId", this._Dt]), await ControllerHolder_1.ControllerHolder.SubLevelController.LoadSubLevel(e, !0), Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant 想要enable的子关卡没有预加载,强制加载显示完毕", ["subLevelPath", e], ["ActionId", this.xe], ["GroupId", this._Dt])))
  }
  async NCc(e) {
    var t;
    this.ee1(e, "disable") || ((t = ModelManager_1.ModelManager.SubLevelModel.GetPreloadOrLoadedSubLevel(e)) && t.Level ? (await t.SetLevelVisible(!1, "LevelEventSetSubLevelsVisible.DisableLevel"), Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant:DisableLevel", ["levelPath", e], ["ActionId", this.xe], ["GroupId", this._Dt])) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant 想要Disable的子关卡没有加载", ["subLevelPath", e], ["ActionId", this.xe], ["GroupId", this._Dt]))
  }
  async mW_(e) {
    const t = new CustomPromise_1.CustomPromise;
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.EffectScreenPlayData_C, e => {
      t.SetResult(e)
    });
    var i = await t.Promise;
    return i.IsValid() ? ScreenEffectSystem_1.ScreenEffectSystem.GetInstance().PlayScreenEffect(i) : Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant 屏幕特效资源无效", ["effectPath", e]), i
  }
  ee1(e, t) {
    if (!StringUtils_1.StringUtils.IsBlank(e)) return !1;
    let i = "";
    if (this.nx) switch (this.nx.Type) {
      case 1:
        var s = EntitySystem_1.EntitySystem.Get(this.nx.EntityId)?.GetComponent(0);
        i = (s?.GetPbDataId() ?? 0).toString();
        break;
      case 6:
        i = this.nx.TreeConfigId + "_" + this.nx.NodeId
    }
    t = `想要${t}的子关卡路径为空,配置来源：` + i;
    return ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenConfirmBoxByText(t), Log_1.Log.CheckError() && Log_1.Log.Error("LevelEvent", 18, "SubLevelController.SubLevelVisibleAssistant 想要disable的子关卡路径为空", ["subLevelPath", e], ["source", i]), !0
  }
  O81(e, t) {
    e = Protocol_1.Aki.Protocol.N$_.create({
      $$_: e,
      j$_: t
    });
    Net_1.Net.Call(23994, e, e => {})
  }
}
exports.SubLevelVisibleAssistant = SubLevelVisibleAssistant;
//# sourceMappingURL=SubLevelVisibleAssistant.js.map