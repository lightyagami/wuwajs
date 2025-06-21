"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BattleLinkEnergyButton = void 0;
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Info_1 = require("../../../../../Core/Common/Info"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Stats_1 = require("../../../../../Core/Common/Stats"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  CombineKeyItem_1 = require("../KeyItem/CombineKeyItem"),
  BattleVisibleChildView_1 = require("./BattleVisibleChildView"),
  SCORE_NIAGARA_PATH = "/Game/Aki/Effect/UI/Niagaras/RouGe/NS_Fx_LGUI_WhiteCat_Button_Panner.NS_Fx_LGUI_WhiteCat_Button_Panner",
  READY_NIAGARA_PATH = "/Game/Aki/Effect/UI/Niagaras/Common/NS_Fx_LGUI_Fight_Link.NS_Fx_LGUI_Fight_Link",
  MAX_SMOOTH_TIME = 200,
  LINK_BURST_TRIGGER_INTERVAL = 1e3;
class BattleLinkEnergyButton extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments), this.SPe = void 0, this.$yi = void 0, this.wIn = void 0, this.oel = void 0, this.bE1 = void 0, this.RE1 = void 0, this.edt = void 0, this.Nll = void 0, this.A8c = void 0, this.fuo = void 0, this.xbt = void 0, this.P8c = void 0, this.x8c = void 0, this.D8c = void 0, this.kti = void 0, this.opi = void 0, this.nel = !1, this.sel = !1, this.ael = 0, this.lel = 0, this.hel = 0, this.xte = 0, this._el = 0, this.yBn = void 0, this.SBn = void 0, this.IBn = void 0, this.TBn = void 0, this.rr1 = 0, this.nr1 = 0, this.AAe = 0, this.LR1 = 0, this.U8c = (t, i) => {
      this.GetActive() && 0 === i && this.B8c()
    }, this.oTn = (t, i) => {
      this.IsValidScore(t) && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "新版Link评分变化", ["scoreId", t], ["score", i]), i < this.IBn.LowerUpperLimits[0] ? this.SBn = void 0 : i >= this.TBn.LowerUpperLimits[1] ? this.SBn = this.TBn : this.SBn = this.IBn, this.SIn(i, this.SBn))
    }, this.sr1 = t => {
      this.ar1(), this.RefreshLinkButton(t), ModelManager_1.ModelManager.BattleLinkModel?.IsNewLinkGmTest() && this.SetUiActive(!0)
    }, this.lqt = () => {
      Info_1.Info.IsInKeyBoard() ? (this.x8c?.SetUiActive(!0), this.D8c?.SetUiActive(!1)) : Info_1.Info.IsInGamepad() ? (this.x8c?.SetUiActive(!1), this.D8c?.SetUiActive(!0)) : (this.x8c?.SetUiActive(!1), this.D8c?.SetUiActive(!1))
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UINiagara],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UITexture],
      [6, UE.UITexture],
      [7, UE.UINiagara]
    ], Info_1.Info.IsInTouch() || (this.ComponentRegisterInfos.push([8, UE.UIItem]), this.ComponentRegisterInfos.push([9, UE.UIItem]))
  }
  async OnCreateAsync() {
    await this.YIn(SCORE_NIAGARA_PATH), await this.YIn(READY_NIAGARA_PATH)
  }
  async OnBeforeStartAsync() {
    var t;
    Info_1.Info.IsInTouch() || (t = this.GetItem(8), this.x8c = new CombineKeyItem_1.CombineKeyItem, await this.x8c.CreateByActorAsync(t.GetOwner()), this.x8c.SetUiActive(!1), t = this.GetItem(9), this.D8c = new CombineKeyItem_1.CombineKeyItem, await this.D8c.CreateByActorAsync(t.GetOwner()), this.D8c.SetUiActive(!1))
  }
  OnStart() {
    super.OnStart(), this.$yi = this.GetButton(0), this.edt = this.GetItem(2), this.oel = this.GetUiNiagara(1), this.wIn && (this.oel?.SetUIActive(!1), this.oel?.SetNiagaraSystem(this.wIn)), this.A8c = this.GetItem(3), this.fuo = this.GetItem(4), this.xbt = this.GetTexture(5), this.P8c = this.GetTexture(6), this.RE1 = this.GetUiNiagara(7), this.bE1 && (this.RE1?.SetUIActive(!1), this.RE1?.SetNiagaraSystem(this.bE1)), Info_1.Info.IsInTouch() || (this.x8c?.RefreshAction(InputMappingsDefine_1.actionMappings.Link大招), this.D8c?.RefreshAction(InputMappingsDefine_1.actionMappings.Link大招), Info_1.Info.IsInKeyBoard() ? this.x8c?.SetUiActive(!0) : Info_1.Info.IsInGamepad() && this.D8c?.SetUiActive(!0)), this.$yi?.SetActive(!0), this.$yi?.OnPointDownCallBack.Bind(() => {
      this.k8c()
    }), this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem), this.Nll = new UE.Rotator(0, 0, 0), this.kti = new UE.Color(255, 255, 255, 255), this.opi = new UE.Color(0, 0, 0, 0), this.ar1(), this.RefreshLinkButton(ModelManager_1.ModelManager.BattleLinkModel.GetNewLinkStatus()), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleScoreChanged, this.oTn), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNewLinkStatusChanged, this.sr1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt), InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Link大招, this.U8c)
  }
  OnBeforeDestroy() {
    this.SPe?.Clear(), this.SPe = void 0, EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleScoreChanged, this.oTn), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNewLinkStatusChanged, this.sr1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt), InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Link大招, this.U8c), Info_1.Info.IsInTouch() && this.$yi?.OnPointDownCallBack.Unbind(), super.OnBeforeDestroy()
  }
  async YIn(i) {
    const s = new CustomPromise_1.CustomPromise;
    return ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.NiagaraSystem, t => {
      i === SCORE_NIAGARA_PATH ? this.wIn = t : this.bE1 = t, s.SetResult()
    }, 103), s.Promise
  }
  k8c() {
    this.B8c()
  }
  B8c() {
    ControllerHolder_1.ControllerHolder.CameraController.IsSequenceCameraInCinematic() || (!Info_1.Info.IsBuildShipping && ModelManager_1.ModelManager.BattleLinkModel?.IsNewLinkGmTest() ? ControllerHolder_1.ControllerHolder.BattleLinkController.NewLinkBurstTest() : this.CheckAliveRoles() ? 3 !== ModelManager_1.ModelManager.BattleLinkModel.GetNewLinkStatus() || Date.now() - this.LR1 < LINK_BURST_TRIGGER_INTERVAL || (this.LR1 = Date.now(), ControllerHolder_1.ControllerHolder.BattleLinkController.RequestNewLinkBurst()) : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Link_CannotCast_Tips"))
  }
  ar1() {
    var t = ModelManager_1.ModelManager.BattleLinkModel?.GetLinkConfig();
    if (t) {
      if (t.Id !== this.rr1) {
        this.rr1 = t.Id, this.nr1 = t.BattleScoreId;
        var i = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreConfig(t.BattleScoreId);
        if (i) {
          this.yBn = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(i.LevelGroupId), this.rTn();
          for (var [s, e] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap())
            if (s === t.BattleScoreId) {
              this.oTn(s, e);
              break
            }
        }
      }
    } else this.rr1 = 0, this.nr1 = 0
  }
  SIn(t, i) {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "新版Link评分按钮更新", ["score", t], ["level", i?.Level]), this.AAe = t, this.nel = !!i, this.uel(t), t >= this.xte && !this.sel ? (this.sel = !0, this.SPe?.StopSequenceByKey("Restart"), this.SPe?.PlaySequencePurely("Full"), this.SetLinkButtonState(1)) : t !== this.xte && this.sel && (this.sel = !1, this.SPe?.StopSequenceByKey("Full"), this.SPe?.PlaySequencePurely("Restart"), this.SetLinkButtonState(0))
  }
  Tick(t) {
    BattleLinkEnergyButton.Ult.Start(), this.nel && this.hel !== this.lel && this.GetActive() && (this._el = Math.min(MAX_SMOOTH_TIME, this._el + t), t = this._el / MAX_SMOOTH_TIME, this.hel = this.ael * (1 - t) + this.lel * t, 0 < this.xte) && (t = this.hel / this.xte, this.oel?.SetNiagaraVarFloat("Dissolve", t), this.Nll.Yaw = -360 * t, this.edt?.SetUIRelativeRotation(this.Nll), this.edt?.SetUIActive(0 < t && t < 1)), BattleLinkEnergyButton.Ult.Stop()
  }
  uel(t) {
    0 < t ? (this.ael = this.hel, this.lel = t, this._el = 0) : (this.ael = this.hel, this.lel = 0, this._el = MAX_SMOOTH_TIME)
  }
  rTn() {
    if (this.IBn = void 0, this.TBn = void 0, this.yBn) {
      let t = MathUtils_1.MathUtils.Int32Max,
        i = 0;
      for (const e of this.yBn) {
        var s = e.Level;
        t > s && (t = s, this.IBn = e), i < s && (i = s, this.TBn = e)
      }
      this.xte = this.TBn.LowerUpperLimits[0], this.xte <= 0 && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 67, "新版Link评分最大值不合法", ["MaxScore", this.xte])
    }
  }
  IsValidScore(t) {
    return t === this.nr1 && !!ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(t, !0)
  }
  CheckAliveRoles() {
    var t = ModelManager_1.ModelManager.BattleLinkModel.GetLinkConfig();
    if (t && t.IsEnableOneRoleBurst) return !0;
    let i = 0;
    for (const s of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) s.IsDead() || i++;
    return 1 < i
  }
  RefreshLinkButton(t) {
    if (0 === t) this.SetUiActive(!1);
    else if (this.SetUiActive(!0), this.CheckAliveRoles()) switch (t) {
      case 1:
        this.SetLinkButtonState(4);
        break;
      case 2:
        this.AAe !== this.xte ? this.SetLinkButtonState(0) : this.SetLinkButtonState(1);
        break;
      case 3:
        this.SetLinkButtonState(1);
        break;
      case 4:
        this.SetLinkButtonState(2)
    } else this.SetLinkButtonState(3)
  }
  SetLinkButtonState(t) {
    switch (t) {
      case 0:
        this.edt?.SetUIActive(!0), this.oel?.SetUIActive(!0), this.RE1?.SetUIActive(!1), this.A8c?.SetUIActive(!1), this.fuo?.SetUIActive(!1), this.oel?.SetAlpha(1), this.edt?.SetAlpha(1), this.xbt?.SetAlpha(1), this.P8c?.SetColor(this.kti);
        break;
      case 1:
        this.edt?.SetUIActive(!0), this.oel?.SetUIActive(!0), this.RE1?.SetUIActive(!0), this.A8c?.SetUIActive(!1), this.fuo?.SetUIActive(!1), this.oel?.SetAlpha(1), this.xbt?.SetAlpha(1), this.P8c?.SetColor(this.kti);
        break;
      case 2:
        this.edt?.SetUIActive(!0), this.oel?.SetUIActive(!0), this.RE1?.SetUIActive(!1), this.A8c?.SetUIActive(!1), this.fuo?.SetUIActive(!1), this.oel?.SetAlpha(1), this.xbt?.SetAlpha(1), this.P8c?.SetColor(this.kti);
        break;
      case 3:
        this.edt?.SetUIActive(!0), this.oel?.SetUIActive(!0), this.RE1?.SetUIActive(!1), this.A8c?.SetUIActive(!0), this.fuo?.SetUIActive(!1), this.oel?.SetAlpha(.5), this.edt?.SetAlpha(.5), this.xbt?.SetAlpha(.3), this.P8c?.SetColor(this.opi);
        break;
      case 4:
        this.edt?.SetUIActive(!1), this.oel?.SetUIActive(!1), this.RE1?.SetUIActive(!1), this.A8c?.SetUIActive(!1), this.fuo?.SetUIActive(!0), this.xbt?.SetAlpha(.3), this.P8c?.SetColor(this.opi)
    }
  }
}(exports.BattleLinkEnergyButton = BattleLinkEnergyButton).Ult = Stats_1.Stat.Create("[BattleView]BattleLinkEnergyButtonTick");
//# sourceMappingURL=BattleLinkEnergyButton.js.map