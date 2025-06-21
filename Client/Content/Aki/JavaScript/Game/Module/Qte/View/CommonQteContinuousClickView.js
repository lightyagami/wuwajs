"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.CommonQteContinuousClickView = void 0;
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../../Ui/UiManager"),
  InputMultiKeyItem_1 = require("../../Common/InputKey/InputMultiKeyItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  CommonQteContinuousClickContext_1 = require("../CommonQte/CommonQteContinuousClickContext"),
  CommonQteViewBase_1 = require("./CommonQteViewBase");
class CommonQteContinuousClickView extends CommonQteViewBase_1.CommonQteViewBase {
  constructor() {
    super(...arguments), this.OOi = void 0, this.d5l = void 0, this.DOt = void 0, this.NUi = void 0, this.wOi = void 0, this.Oy1 = void 0, this.HO1 = void 0, this.SPe = void 0, this.lMc = void 0, this.qy1 = !1, this.NTe = 0, this.Gy1 = !1, this.Fy1 = 0, this.Ny1 = 0, this.Vy1 = -1, this.jy1 = !1, this.Hy1 = "", this.NQa = !1, this.FQa = "", this.iIl = -1, this.$y1 = void 0, this._Mc = !1, this.$xt = t => {
      "Start" === t ? this.IsQteEnd || (this.qy1 && (this.SPe?.PlayLevelSequenceByName("Loop"), !this.IsQtePause && 0 < this.NTe ? this.FOi("Loop", 1 / this.NTe) : this.FOi("Loop", 0)), this.Gy1 && (this.SPe?.PlayLevelSequenceByName("Charge"), this.Wy1("Charge", !1), this.$y1) && (this.Ny1 = this.$y1.CurrentEnergyPercent / 100, this.Fy1 = this.Ny1, this.Qy1("Charge", this.Fy1)), this.IsQteStart = !0, this.IsQteInteractive = !0) : "Success" !== t && "Fail" !== t || UiManager_1.UiManager.CloseView("CommonQteContinuousClickView")
    }, this.BOi = (t, i) => {
      this.IsValidInput() ? 0 === i && this.bOi() : Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte输入无效")
    }, this.jj_ = (t, i) => {
      Info_1.Info.IsInGamepad() && ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.SwitchInteractData.IsSwitchInteractOpen && 2 === ModelManager_1.ModelManager.SkillButtonUiModel?.GamepadData?.SwitchInteractData.State && this.FQa === InputMappingsDefine_1.actionMappings.幻象1 && (this.IsValidInput() ? 0 === i && this.bOi() : Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte输入无效"))
    }
  }
  OnRegisterComponent() {
    super.OnRegisterComponent(), this.IsMobile ? this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText]
    ] : this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIButtonComponent],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIItem]
    ]
  }
  async OnBeforeStartAsync() {
    var t;
    !this.IsMobile && (this.HO1 = new InputMultiKeyItem_1.InputMultiKeyItem, t = this.GetItem(6)) && await this.HO1?.CreateByActorAsync(t.GetOwner())
  }
  OnStart() {
    super.OnStart(), this.IsMobile, this.OOi = this.GetItem(0), this.d5l = this.GetButton(1), this.DOt = this.GetSprite(2), this.NUi = this.GetItem(3), this.wOi = this.GetItem(4), this.Oy1 = this.GetText(5), this.d5l?.OnPointDownCallBack.Bind(() => {
      this.qOi()
    }), this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.OOi), this.SPe.BindSequenceCloseEvent(this.$xt), this.lMc = new LevelSequencePlayer_1.LevelSequencePlayer(this.NUi), this.OOi?.SetUIActive(!1)
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(), !this.IsQteEnd && this.$y1?.IsActive() && ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(this.$y1.HandleId), this.jQa(), this.d5l?.OnPointDownCallBack.Unbind(), this.SPe?.Clear(), this.lMc?.Clear(), this.$y1 = void 0, this.iIl = -1, this.FQa = ""
  }
  SetQteContext(t) {
    var i;
    t instanceof CommonQteContinuousClickContext_1.CommonQteContinuousClickContext && (this.iIl = t.HandleId, (i = (this.$y1 = t).GetAction()) && (this.FQa = i, this.IsMobile || (i = {
      ActionOrAxisName: this.FQa
    }, this.HO1?.RefreshByActionOrAxis(i), this.HO1?.Show())), this.NTe = Math.max(0, t.Duration * TimeUtil_1.TimeUtil.Millisecond), this.qy1 = !1, this.Gy1 = !0, this.IsQteInteractive = !1, this._Mc = !1, (i = t.GetUiConfig()) && (this.IsQteInteractive = 0 === i.InteractiveTiming, this._Mc = i.IsShowBorder, this.jy1 = i.IsShowTip, this.Hy1 = i.TipTextId, 0 < i.PerformInterpSpeedForEnergyPercent ? this.Vy1 = i.PerformInterpSpeedForEnergyPercent / 100 / TimeUtil_1.TimeUtil.InverseMillisecond : this.Vy1 = -1), (i = ModelManager_1.ModelManager.CommonQteModel?.GetQteIcon(t.QteId)) ? (this.DOt?.SetSprite(i, !1), this.DOt?.SetUIActive(!0)) : Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "获取Qte图标失败", ["QteId", t.QteId]), this.Bfc(), this.SetQteActive(t))
  }
  PlayQteStart() {
    this.IsQteActive && !this.IsQteEnd && !this.IsQtePause && this.$y1 && (this.IsQtePlayStart = !0, this.OOi?.SetUIActive(!0), this.Ky1("Start"), this._Mc && (this.NUi?.SetUIActive(!0), this.lMc?.PlayLevelSequenceByName("Start")), this.jy1 ? (LguiUtil_1.LguiUtil.SetLocalTextNew(this.Oy1, this.Hy1), this.wOi?.SetUIActive(!0)) : this.wOi?.SetUIActive(!1), this.HQa(), ControllerHolder_1.ControllerHolder.CommonQteController.SetExpiredTimer(this.$y1))
  }
  Ky1(t) {
    var i = (this.SPe?.GetSequencePlayContext(t)?.PlayInfo)?.LevelSequence.AssetPathName;
    i && !FNameUtil_1.FNameUtil.IsNothing(i) && i.toString().length ? this.SPe?.PlayLevelSequenceByName(t) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 39, "Qte缺少生命周期Sequence", ["SequenceName", t], ["QteId", this.$y1?.QteId]), TimerSystem_1.TimerSystem.Next(() => {
      this.SPe && this.$xt?.(t)
    }))
  }
  CommonQteEnd(t) {
    this.iIl === t && this.HandleQteEnd()
  }
  RefreshOnBattleUiVisibleChanged() {
    var t;
    2 !== this.$y1?.Source && 3 !== this.$y1?.Source && (t = ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(20), this.SetActive(t))
  }
  HQa() {
    this.NQa || (this.NQa = !0, this.IsMobile) || (InputDistributeController_1.InputDistributeController.BindActionIgnoreLimit(this.FQa, this.BOi), Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用QTE绑定Action", ["Action", this.FQa]), this.FQa === InputMappingsDefine_1.actionMappings.幻象1 && InputDistributeController_1.InputDistributeController.BindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.通用交互, this.jj_))
  }
  jQa() {
    this.NQa && (this.NQa = !1, this.IsMobile || (InputDistributeController_1.InputDistributeController.UnBindActionIgnoreLimit(this.FQa, this.BOi), Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用QTE解绑Action", ["Action", this.FQa]), this.FQa === InputMappingsDefine_1.actionMappings.幻象1 && InputDistributeController_1.InputDistributeController.UnBindActionIgnoreLimit(InputMappingsDefine_1.actionMappings.通用交互, this.jj_)))
  }
  qOi() {
    this.IsValidInput() ? this.bOi() : Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "通用Qte输入无效")
  }
  bOi() {
    this.jy1 && this.wOi?.SetUIActive(!1), this.$y1 && this.$y1.IsActive() && this.$y1.IsPending() && (this.Gy1 && (this.Fy1 = this.Ny1, this.Qy1("Charge", this.Fy1)), this.SPe?.PlayLevelSequenceByName("Press"), this.$y1.Response())
  }
  HandleQteEnd() {
    this.IsQteEnd || (this.IsQteEnd = !0, this.$y1 && this.Gy1 && (this.Ny1 = this.$y1.CurrentEnergyPercent / 100, this.Fy1 = this.Ny1, this.Qy1("Charge", this.Fy1)), this.SPe?.StopCurrentSequence(), this.$y1?.IsSuccess() ? this.Ky1("Success") : this.Ky1("Fail"), this._Mc && (this.lMc?.StopCurrentSequence(), this.lMc?.PlayLevelSequenceByName("Close")), this.jQa())
  }
  FOi(t, i) {
    this.OOi.GetOwner().GetSequencePlayerByKey(t)?.SequencePlayer?.SetPlayRate(i)
  }
  Wy1(t, i) {
    t = this.OOi.GetOwner().GetSequencePlayerByKey(t)?.SequencePlayer;
    i ? t?.Play() : t?.Pause()
  }
  Qy1(t, i) {
    var s, e, t = this.OOi.GetOwner().GetSequencePlayerByKey(t)?.SequencePlayer;
    t && (i = (e = (e = t.GetDuration().Time).FrameNumber.Value + e.SubFrame) * MathUtils_1.MathUtils.Clamp(i, 0, 1), e < 1 || e < i || (e = t.GetStartTime().Time, s = t.GetEndTime().Time, e = e.FrameNumber.Value + e.SubFrame, s = s.FrameNumber.Value + s.SubFrame, s = (i = MathUtils_1.MathUtils.Clamp(e + i, e, s)) - (e = Math.floor(i)), i = new UE.FrameTime(new UE.FrameNumber(e), s), e = new UE.MovieSceneSequencePlaybackParams(i, 0, "", 0, 0), t.SetPlaybackPosition(e)))
  }
  OnQtePause() {
    this.jQa(), this.qy1 && this.FOi("Loop", 0), this.$y1 && ControllerHolder_1.ControllerHolder.CommonQteController.PauseQte(this.$y1.HandleId)
  }
  OnQteResume() {
    this.IsQtePlayStart && this.HQa(), this.qy1 && (0 < this.NTe ? this.FOi("Loop", 1 / this.NTe) : this.FOi("Loop", 0)), this.$y1 && ControllerHolder_1.ControllerHolder.CommonQteController.ResumeQte(this.$y1.HandleId)
  }
  OnTick(t) {
    !this.IsQteStart || this.IsQteEnd || this.IsQtePause || (!this.$y1 || this.$y1.IsInvalid() ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("CommonQte", 67, "Qte界面Context已无效, 强制关闭界面", ["State", this.$y1?.State]), this.HandleQteEnd()) : (this.$y1.UpdateTime(t), this.Gy1 && (this.Ny1 = this.$y1.CurrentEnergyPercent / 100, 0 < this.Vy1 ? this.Fy1 = MathUtils_1.MathUtils.InterpConstantTo(this.Fy1, this.Ny1, t, this.Vy1) : this.Fy1 = this.Ny1, this.Qy1("Charge", this.Fy1)), ModelManager_1.ModelManager.CommonQteModel?.IsRefreshMode && this.Bfc()))
  }
  Bfc() {
    var t;
    this.$y1 && (t = this.$y1.GetUiConfig()?.UIConfig) && (this.OOi.SetAnchorAlign(t.AnchorHAlign, t.AnchorVAlign), this.OOi.SetAnchorOffset(t.AnchorOffset))
  }
}
exports.CommonQteContinuousClickView = CommonQteContinuousClickView;
//# sourceMappingURL=CommonQteContinuousClickView.js.map