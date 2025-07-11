"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleLinkEnergyButton = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Info_1 = require("../../../../../Core/Common/Info");
const Log_1 = require("../../../../../Core/Common/Log");
const Stats_1 = require("../../../../../Core/Common/Stats");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const InputDistributeController_1 = require("../../../../Ui/InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../../../../Ui/InputDistribute/InputMappingsDefine");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController");
const CombineKeyItem_1 = require("../KeyItem/CombineKeyItem");
const BattleVisibleChildView_1 = require("./BattleVisibleChildView");
const SCORE_NIAGARA_PATH = "/Game/Aki/Effect/UI/Niagaras/RouGe/NS_Fx_LGUI_WhiteCat_Button_Panner.NS_Fx_LGUI_WhiteCat_Button_Panner";
const READY_NIAGARA_PATH = "/Game/Aki/Effect/UI/Niagaras/Common/NS_Fx_LGUI_Fight_Link.NS_Fx_LGUI_Fight_Link";
const MAX_SMOOTH_TIME = 200;
const LINK_BURST_TRIGGER_INTERVAL = 1000;
class BattleLinkEnergyButton extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.$yi = undefined;
    this.wIn = undefined;
    this.oel = undefined;
    this.zE1 = undefined;
    this.JE1 = undefined;
    this.edt = undefined;
    this.Nll = undefined;
    this.A8c = undefined;
    this.fuo = undefined;
    this.xbt = undefined;
    this.P8c = undefined;
    this.x8c = undefined;
    this.D8c = undefined;
    this.kti = undefined;
    this.opi = undefined;
    this.nel = false;
    this.sel = false;
    this.ael = 0;
    this.lel = 0;
    this.hel = 0;
    this.xte = 0;
    this._el = 0;
    this.yBn = undefined;
    this.SBn = undefined;
    this.IBn = undefined;
    this.TBn = undefined;
    this.Er1 = 0;
    this.Tr1 = 0;
    this.AAe = 0;
    this.eL1 = 0;
    this.U8c = (t, i) => {
      if (this.GetActive() && i === 0) {
        this.B8c();
      }
    };
    this.oTn = (t, i) => {
      if (this.IsValidScore(t)) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 67, "新版Link评分变化", ["scoreId", t], ["score", i]);
        }
        if (i < this.IBn.LowerUpperLimits[0]) {
          this.SBn = undefined;
        } else if (i >= this.TBn.LowerUpperLimits[1]) {
          this.SBn = this.TBn;
        } else {
          this.SBn = this.IBn;
        }
        this.SIn(i, this.SBn);
      }
    };
    this.br1 = t => {
      this.Lr1();
      this.RefreshLinkButton(t);
      if (ModelManager_1.ModelManager.BattleLinkModel?.IsNewLinkGmTest()) {
        this.SetUiActive(true);
      }
    };
    this.lqt = () => {
      if (Info_1.Info.IsInKeyBoard()) {
        this.x8c?.SetUiActive(true);
        this.D8c?.SetUiActive(false);
      } else if (Info_1.Info.IsInGamepad()) {
        this.x8c?.SetUiActive(false);
        this.D8c?.SetUiActive(true);
      } else {
        this.x8c?.SetUiActive(false);
        this.D8c?.SetUiActive(false);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UINiagara], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UITexture], [6, UE.UITexture], [7, UE.UINiagara]];
    if (!Info_1.Info.IsInTouch()) {
      this.ComponentRegisterInfos.push([8, UE.UIItem]);
      this.ComponentRegisterInfos.push([9, UE.UIItem]);
    }
  }
  async OnCreateAsync() {
    await this.YIn(SCORE_NIAGARA_PATH);
    await this.YIn(READY_NIAGARA_PATH);
  }
  async OnBeforeStartAsync() {
    var t;
    if (!Info_1.Info.IsInTouch()) {
      t = this.GetItem(8);
      this.x8c = new CombineKeyItem_1.CombineKeyItem();
      await this.x8c.CreateByActorAsync(t.GetOwner());
      this.x8c.SetUiActive(false);
      t = this.GetItem(9);
      this.D8c = new CombineKeyItem_1.CombineKeyItem();
      await this.D8c.CreateByActorAsync(t.GetOwner());
      this.D8c.SetUiActive(false);
    }
  }
  OnStart() {
    super.OnStart();
    this.$yi = this.GetButton(0);
    this.edt = this.GetItem(2);
    this.oel = this.GetUiNiagara(1);
    if (this.wIn) {
      this.oel?.SetUIActive(false);
      this.oel?.SetNiagaraSystem(this.wIn);
    }
    this.A8c = this.GetItem(3);
    this.fuo = this.GetItem(4);
    this.xbt = this.GetTexture(5);
    this.P8c = this.GetTexture(6);
    this.JE1 = this.GetUiNiagara(7);
    if (this.zE1) {
      this.JE1?.SetUIActive(false);
      this.JE1?.SetNiagaraSystem(this.zE1);
    }
    if (!Info_1.Info.IsInTouch()) {
      this.x8c?.RefreshAction(InputMappingsDefine_1.actionMappings.Link大招);
      this.D8c?.RefreshAction(InputMappingsDefine_1.actionMappings.Link大招);
      if (Info_1.Info.IsInKeyBoard()) {
        this.x8c?.SetUiActive(true);
      } else if (Info_1.Info.IsInGamepad()) {
        this.D8c?.SetUiActive(true);
      }
    }
    this.$yi?.SetActive(true);
    this.$yi?.OnPointDownCallBack.Bind(() => {
      this.k8c();
    });
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Nll = new UE.Rotator(0, 0, 0);
    this.kti = new UE.Color(255, 255, 255, 255);
    this.opi = new UE.Color(0, 0, 0, 0);
    this.Lr1();
    this.RefreshLinkButton(ModelManager_1.ModelManager.BattleLinkModel.GetNewLinkStatus());
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleScoreChanged, this.oTn);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnNewLinkStatusChanged, this.br1);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    InputDistributeController_1.InputDistributeController.BindAction(InputMappingsDefine_1.actionMappings.Link大招, this.U8c);
  }
  OnBeforeDestroy() {
    this.SPe?.Clear();
    this.SPe = undefined;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleScoreChanged, this.oTn);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnNewLinkStatusChanged, this.br1);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InputControllerChange, this.lqt);
    InputDistributeController_1.InputDistributeController.UnBindAction(InputMappingsDefine_1.actionMappings.Link大招, this.U8c);
    if (Info_1.Info.IsInTouch()) {
      this.$yi?.OnPointDownCallBack.Unbind();
    }
    super.OnBeforeDestroy();
  }
  async YIn(i) {
    const s = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.NiagaraSystem, t => {
      if (i === SCORE_NIAGARA_PATH) {
        this.wIn = t;
      } else {
        this.zE1 = t;
      }
      s.SetResult();
    }, 103);
    return s.Promise;
  }
  k8c() {
    this.B8c();
  }
  B8c() {
    if (!ControllerHolder_1.ControllerHolder.CameraController.IsSequenceCameraInCinematic()) {
      if (!Info_1.Info.IsBuildShipping && ModelManager_1.ModelManager.BattleLinkModel?.IsNewLinkGmTest()) {
        ControllerHolder_1.ControllerHolder.BattleLinkController.NewLinkBurstTest();
      } else if (this.CheckAliveRoles()) {
        if (ModelManager_1.ModelManager.BattleLinkModel.GetNewLinkStatus() === 3 && !(Date.now() - this.eL1 < LINK_BURST_TRIGGER_INTERVAL)) {
          this.eL1 = Date.now();
          ControllerHolder_1.ControllerHolder.BattleLinkController.RequestNewLinkBurst();
        }
      } else {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Link_CannotCast_Tips");
      }
    }
  }
  Lr1() {
    var t = ModelManager_1.ModelManager.BattleLinkModel?.GetLinkConfig();
    if (t) {
      if (t.Id !== this.Er1) {
        this.Er1 = t.Id;
        this.Tr1 = t.BattleScoreId;
        var i = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreConfig(t.BattleScoreId);
        if (i) {
          this.yBn = ConfigManager_1.ConfigManager.BattleScoreConfig.GetBattleScoreActionConfigByGroupId(i.LevelGroupId);
          this.rTn();
          for (var [s, e] of ModelManager_1.ModelManager.BattleScoreModel.GetScoreMap()) {
            if (s === t.BattleScoreId) {
              this.oTn(s, e);
              break;
            }
          }
        }
      }
    } else {
      this.Er1 = 0;
      this.Tr1 = 0;
    }
  }
  SIn(t, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 67, "新版Link评分按钮更新", ["score", t], ["level", i?.Level]);
    }
    this.AAe = t;
    this.nel = !!i;
    this.uel(t);
    if (t >= this.xte && !this.sel) {
      this.sel = true;
      this.SPe?.StopSequenceByKey("Restart");
      this.SPe?.PlaySequencePurely("Full");
      this.SetLinkButtonState(1);
    } else if (t !== this.xte && this.sel) {
      this.sel = false;
      this.SPe?.StopSequenceByKey("Full");
      this.SPe?.PlaySequencePurely("Restart");
      this.SetLinkButtonState(0);
    }
  }
  Tick(t) {
    BattleLinkEnergyButton.Ult.Start();
    if (this.nel && this.hel !== this.lel && this.GetActive() && (this._el = Math.min(MAX_SMOOTH_TIME, this._el + t), t = this._el / MAX_SMOOTH_TIME, this.hel = this.ael * (1 - t) + this.lel * t, this.xte > 0)) {
      t = this.hel / this.xte;
      this.oel?.SetNiagaraVarFloat("Dissolve", t);
      this.Nll.Yaw = t * -360;
      this.edt?.SetUIRelativeRotation(this.Nll);
      this.edt?.SetUIActive(t > 0 && t < 1);
    }
    BattleLinkEnergyButton.Ult.Stop();
  }
  uel(t) {
    if (t > 0) {
      this.ael = this.hel;
      this.lel = t;
      this._el = 0;
    } else {
      this.ael = this.hel;
      this.lel = 0;
      this._el = MAX_SMOOTH_TIME;
    }
  }
  rTn() {
    this.IBn = undefined;
    this.TBn = undefined;
    if (this.yBn) {
      let t = MathUtils_1.MathUtils.Int32Max;
      let i = 0;
      for (const e of this.yBn) {
        var s = e.Level;
        if (t > s) {
          t = s;
          this.IBn = e;
        }
        if (i < s) {
          i = s;
          this.TBn = e;
        }
      }
      this.xte = this.TBn.LowerUpperLimits[0];
      if (this.xte <= 0 && Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 67, "新版Link评分最大值不合法", ["MaxScore", this.xte]);
      }
    }
  }
  IsValidScore(t) {
    return t === this.Tr1 && !!ModelManager_1.ModelManager.BattleScoreModel?.GetScoreConfig(t, true);
  }
  CheckAliveRoles() {
    var t = ModelManager_1.ModelManager.BattleLinkModel.GetLinkConfig();
    if (t && t.IsEnableOneRoleBurst) {
      return true;
    }
    let i = 0;
    for (const s of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
      if (!s.IsDead()) {
        i++;
      }
    }
    return i > 1;
  }
  RefreshLinkButton(t) {
    if (t === 0) {
      this.SetUiActive(false);
    } else {
      this.SetUiActive(true);
      if (this.CheckAliveRoles()) {
        switch (t) {
          case 1:
            this.SetLinkButtonState(4);
            break;
          case 2:
            if (this.AAe !== this.xte) {
              this.SetLinkButtonState(0);
            } else {
              this.SetLinkButtonState(1);
            }
            break;
          case 3:
            this.SetLinkButtonState(1);
            break;
          case 4:
            this.SetLinkButtonState(2);
        }
      } else {
        this.SetLinkButtonState(3);
      }
    }
  }
  SetLinkButtonState(t) {
    switch (t) {
      case 0:
        this.edt?.SetUIActive(true);
        this.oel?.SetUIActive(true);
        this.JE1?.SetUIActive(false);
        this.A8c?.SetUIActive(false);
        this.fuo?.SetUIActive(false);
        this.oel?.SetAlpha(1);
        this.edt?.SetAlpha(1);
        this.xbt?.SetAlpha(1);
        this.P8c?.SetColor(this.kti);
        break;
      case 1:
        this.edt?.SetUIActive(true);
        this.oel?.SetUIActive(true);
        this.JE1?.SetUIActive(true);
        this.A8c?.SetUIActive(false);
        this.fuo?.SetUIActive(false);
        this.oel?.SetAlpha(1);
        this.xbt?.SetAlpha(1);
        this.P8c?.SetColor(this.kti);
        break;
      case 2:
        this.edt?.SetUIActive(true);
        this.oel?.SetUIActive(true);
        this.JE1?.SetUIActive(false);
        this.A8c?.SetUIActive(false);
        this.fuo?.SetUIActive(false);
        this.oel?.SetAlpha(1);
        this.xbt?.SetAlpha(1);
        this.P8c?.SetColor(this.kti);
        break;
      case 3:
        this.edt?.SetUIActive(true);
        this.oel?.SetUIActive(true);
        this.JE1?.SetUIActive(false);
        this.A8c?.SetUIActive(true);
        this.fuo?.SetUIActive(false);
        this.oel?.SetAlpha(0.5);
        this.edt?.SetAlpha(0.5);
        this.xbt?.SetAlpha(0.3);
        this.P8c?.SetColor(this.opi);
        break;
      case 4:
        this.edt?.SetUIActive(false);
        this.oel?.SetUIActive(false);
        this.JE1?.SetUIActive(false);
        this.A8c?.SetUIActive(false);
        this.fuo?.SetUIActive(true);
        this.xbt?.SetAlpha(0.3);
        this.P8c?.SetColor(this.opi);
    }
  }
}
(exports.BattleLinkEnergyButton = BattleLinkEnergyButton).Ult = Stats_1.Stat.Create("[BattleView]BattleLinkEnergyButtonTick");
//# sourceMappingURL=BattleLinkEnergyButton.js.map