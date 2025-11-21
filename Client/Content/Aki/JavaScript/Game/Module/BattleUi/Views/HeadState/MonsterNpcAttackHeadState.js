"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterNpcAttackHeadState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BuffItemContainer_1 = require("../BuffItemContainer");
const HeadStateViewBase_1 = require("./HeadStateViewBase");
const MonsterNpcAttackMachine_1 = require("./MonsterNpcAttackMachine");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const SCALE_TOLERATION = 0.003;
const LERP_ANIM_TIME = 200;
class MonsterNpcAttackHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments);
    this.HeadStateData = undefined;
    this.SPe = undefined;
    this.mkn = new BuffItemContainer_1.BuffItemContainer();
    this.YCd = new MonsterNpcAttackMachine_1.MonsterNpcAttackMachine();
    this.nnt = 0;
    this.pnt = 0;
    this.zCd = 0;
    this.OnAddOrRemoveBuff = (t, e, i, s) => {
      if (this.HeadStateData.GetEntityId() === t) {
        if (i) {
          this.mkn.AddBuffByCue(e, s, true);
        } else {
          this.mkn.RemoveBuffByCue(e, s, true);
        }
      }
    };
    this.OnShieldChanged = t => {
      this.RefreshHpAndShield(true);
    };
    this.OnLevelChanged = (t, e, i) => {
      this.Olt();
    };
    this.OnRoleLevelChange = (t, e, i) => {
      this.Olt();
    };
    this.OnChangeTeam = () => {
      this.Olt();
    };
    this.JCd = (t, e, i) => {
      this.ZCd(true);
    };
    this.epd = (t, e) => {
      this.tpd(e);
    };
    this.ipd = (t, e) => {
      this.rpd(e);
    };
    this.opd = (t, e) => {
      this.npd(e);
    };
    this.spd = (t, e) => {
      this.apd(e);
    };
    this.hpd = (t, e) => {
      this.lpd(e);
    };
    this._pd = (t, e) => {
      this.upd(e);
    };
    this.Hnt = new Map();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIText], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UISliderComponent], [11, UE.UISprite], [12, UE.UISliderComponent], [13, UE.UISprite], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UINiagara], [17, UE.UINiagara], [18, UE.UINiagara], [19, UE.UINiagara], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem]];
    this.ScaleToleration = SCALE_TOLERATION;
  }
  ActiveBattleHeadState(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[MonsterNpcAttackHeadState]激活血条");
    }
    super.ActiveBattleHeadState(t);
    this.o1t();
    this.RefreshHpAndShield();
    this.Olt();
    this.RefreshHeadStateRotation();
    this.klt();
    this.Flt();
    this.Vlt();
    this.tst();
    this.Hlt();
    this.ZCd(false);
    this.tpd();
    this.rpd();
    this.npd();
    this.apd();
    this.lpd();
    this.upd();
  }
  OnStart() {
    this.Qnt();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.nnt = CommonParamById_1.configCommonParamById.GetIntConfig("HitLargeBufferPercent") / 10000;
    this.pnt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
    this.GetItem(21)?.SetUIActive(false);
    this.GetUiNiagara(16)?.SetUIActive(false);
    this.GetUiNiagara(18)?.SetUIActive(false);
    this.GetUiNiagara(17)?.SetUIActive(false);
    this.GetUiNiagara(19)?.SetUIActive(false);
    this.mkn.Init(this.GetItem(8), undefined, true);
  }
  OnBeforeDestroy() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[MonsterNpcAttackHeadState]销毁血条");
    }
    this.SPe.Clear();
    this.SPe = undefined;
  }
  ResetBattleHeadState() {
    this.mkn.ClearAll();
    super.ResetBattleHeadState();
  }
  GetResourceId() {
    return "UiItem_EnergyBarAogusita";
  }
  OnRefresh(t, e, i) {
    super.OnRefresh(t, e, i);
    if (this.IsActivated) {
      this.klt();
      this.Flt();
      this.Vlt();
      this.jlt(i);
      this.cpd(i);
    }
  }
  tst() {
    var t;
    if (this.HeadStateData) {
      t = ModelManager_1.ModelManager.CharacterModel?.GetHandle(this.HeadStateData.GetEntityId());
      this.mkn.RefreshBuff(t);
    } else {
      this.mkn.ClearAll();
    }
  }
  klt() {
    var t = this.IsDetailVisible();
    this.GetItem(5).SetUIActive(t);
  }
  Flt() {
    var t = this.IsLevelTextVisible();
    this.GetText(4).SetUIActive(t);
  }
  Vlt() {
    var t = this.IsBuffVisible();
    this.GetItem(8).SetUIActive(t);
  }
  jlt(t) {
    if (this.IsBuffVisible()) {
      this.mkn.Tick(t);
    }
  }
  cpd(t) {
    this.YCd.UpdatePercent(t);
    if (this.YCd.HasUpdate()) {
      this.Mic(this.YCd.CurrentPercent);
    }
  }
  o1t() {
    var t = this.HeadStateData.ActorComponent;
    if ((0, RegisterComponent_1.isComponentInstance)(t, 3) && t.HalfHeight > this.HeadStateData.CommonParam.OutMonsterHalfHeight) {
      this.NeedCorrectionOutside = true;
    }
  }
  RefreshHpAndShield(t = false) {
    var [e, i] = this.GetHpAndShieldPercent();
    this.Cst(e);
    this.gst(i);
    if (t) {
      if (e < this.CurrentBarPercent) {
        this.CurrentBarPercent;
        this.nnt;
      }
      this.PlayBarAnimation(e);
    } else {
      this.StopBarLerpAnimation();
    }
  }
  OnBeginBarAnimation(t) {
    this.ast(t);
  }
  StopBarLerpAnimation() {
    super.StopBarLerpAnimation();
    this.GetSprite(1).SetUIActive(false);
  }
  OnLerpBarBufferPercent(t) {
    this.ast(t);
  }
  Cst(t) {
    this.GetSprite(0).SetFillAmount(t);
  }
  ast(t) {
    var e = this.GetSprite(1);
    e.SetFillAmount(t);
    e.SetUIActive(true);
    var e = this.GetSprite(2);
    e.SetStretchLeft(this.pnt * this.CurrentBarPercent - 2);
    e.SetStretchRight(this.pnt * (1 - t) - 2);
  }
  gst(t) {
    var e = this.GetSprite(3);
    if (t > 0) {
      e.SetFillAmount(t);
      e.SetUIActive(true);
    } else {
      e.SetUIActive(false);
    }
  }
  BindCallback() {
    super.BindCallback();
    this.HeadStateData.BindOnSpecialEnergy4Changed(this.JCd);
    this.HeadStateData.BindOnSlowChargeStateChanged(this.epd);
    this.HeadStateData.BindOnFastChargeStateChanged(this.ipd);
    this.HeadStateData.BindOnAttackReadyStateChanged(this.opd);
    this.HeadStateData.BindOnAttackBeginStateChanged(this.spd);
    this.HeadStateData.BindOnAttackEndStateChanged(this.hpd);
    this.HeadStateData.BindOnAttackBrokenStateChanged(this._pd);
  }
  OnHealthChanged() {
    this.RefreshHpAndShield(true);
  }
  Olt() {
    var t;
    var e;
    var i;
    if (this.HeadStateData) {
      t = this.GetLevel();
      e = this.GetText(4);
      i = ConfigManager_1.ConfigManager.BattleUiConfig.GetThreadColor(t, this.HeadStateData.Camp);
      e.SetColor(UE.Color.FromHex(i));
      LguiUtil_1.LguiUtil.SetLocalText(e, "LevelShow", t);
    }
  }
  RefreshOnCampChanged() {
    this.Olt();
    this.Hlt();
  }
  Hlt() {
    var t = this.GetHpColor();
    if (t) {
      t = UE.Color.FromHex(t);
      this.GetSprite(0)?.SetColor(t);
    }
  }
  Mic(t) {
    if (t <= 0) {
      this.GetItem(21)?.SetUIActive(false);
    } else {
      this.GetItem(21)?.SetUIActive(true);
      this.GetSlider(10)?.SetValue(t);
      this.GetSlider(12)?.SetValue(t);
      if (this.zCd >= 1) {
        this.GetUiNiagara(16)?.SetUIActive(false);
        this.GetUiNiagara(18)?.SetUIActive(false);
        this.GetUiNiagara(17)?.SetUIActive(false);
        this.GetUiNiagara(19)?.SetUIActive(false);
      }
    }
  }
  ZCd(t) {
    var e = this.HeadStateData.GetAttributeCurrentValueById(EAttributeId.Proto_SpecialEnergy4);
    var i = this.HeadStateData.GetAttributeCurrentValueById(EAttributeId.Proto_SpecialEnergy4Max);
    var e = i === 0 ? 0 : e / i;
    if (e !== this.zCd) {
      this.zCd = e;
      this.YCd.SetTargetPercent(e, t ? LERP_ANIM_TIME : 0);
    }
  }
  tpd(t) {
    if (t ?? this.HeadStateData.ContainsTagById(792676641)) {
      if (!this.dpd()) {
        this.GetUiNiagara(16)?.SetUIActive(true);
        this.GetUiNiagara(18)?.SetUIActive(true);
      }
    } else {
      this.GetUiNiagara(16)?.SetUIActive(false);
      this.GetUiNiagara(18)?.SetUIActive(false);
    }
  }
  rpd(t) {
    if (t ?? this.HeadStateData.ContainsTagById(-325960901)) {
      if (!this.dpd()) {
        this.GetUiNiagara(17)?.SetUIActive(true);
        this.GetUiNiagara(19)?.SetUIActive(true);
      }
    } else {
      this.GetUiNiagara(17)?.SetUIActive(false);
      this.GetUiNiagara(19)?.SetUIActive(false);
    }
  }
  npd(t) {
    t = t ?? this.HeadStateData.ContainsTagById(314261857);
    this.GetItem(20)?.SetUIActive(t);
    if (t) {
      this.bnt(25);
    } else {
      this.Gnt(25);
      this.bnt(26);
    }
  }
  apd(t) {
    if (t ?? this.HeadStateData.ContainsTagById(1921770646)) {
      this.bnt(22);
    } else {
      this.Gnt(22);
    }
  }
  lpd(t) {
    if (t ?? this.HeadStateData.ContainsTagById(897633166)) {
      this.bnt(23);
    } else {
      this.Gnt(23);
    }
  }
  upd(t) {
    if (t ?? this.HeadStateData.ContainsTagById(-1737347985)) {
      this.bnt(24);
    } else {
      this.Gnt(24);
    }
  }
  dpd() {
    return this.zCd >= 1;
  }
  Qnt() {
    this.Est(22);
    this.Est(23);
    this.Est(24);
    this.Est(25);
    this.Est(26);
  }
  Est(t) {
    var e = [];
    var i = this.GetItem(t).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var s = i.Num();
    for (let t = 0; t < s; t++) {
      e.push(i.Get(t));
    }
    this.Hnt.set(t, e);
  }
  bnt(t) {
    t = this.Hnt.get(t);
    if (t) {
      for (const e of t) {
        e.Play();
      }
    }
  }
  Gnt(t) {
    t = this.Hnt.get(t);
    if (t) {
      for (const e of t) {
        e.Stop();
      }
    }
  }
}
exports.MonsterNpcAttackHeadState = MonsterNpcAttackHeadState;
//# sourceMappingURL=MonsterNpcAttackHeadState.js.map