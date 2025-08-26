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
    this.i1d = new MonsterNpcAttackMachine_1.MonsterNpcAttackMachine();
    this.nnt = 0;
    this.pnt = 0;
    this.r1d = 0;
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
    this.o1d = (t, e, i) => {
      this.n1d(true);
    };
    this.s1d = (t, e) => {
      this.a1d(e);
    };
    this.h1d = (t, e) => {
      this.l1d(e);
    };
    this._1d = (t, e) => {
      this.u1d(e);
    };
    this.c1d = (t, e) => {
      this.d1d(e);
    };
    this.m1d = (t, e) => {
      this.f1d(e);
    };
    this.g1d = (t, e) => {
      this.C1d(e);
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
    this.n1d(false);
    this.a1d();
    this.l1d();
    this.u1d();
    this.d1d();
    this.f1d();
    this.C1d();
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
      this.p1d(i);
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
  p1d(t) {
    this.i1d.UpdatePercent(t);
    if (this.i1d.HasUpdate()) {
      this.Mic(this.i1d.CurrentPercent);
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
    this.HeadStateData.BindOnSpecialEnergy4Changed(this.o1d);
    this.HeadStateData.BindOnSlowChargeStateChanged(this.s1d);
    this.HeadStateData.BindOnFastChargeStateChanged(this.h1d);
    this.HeadStateData.BindOnAttackReadyStateChanged(this._1d);
    this.HeadStateData.BindOnAttackBeginStateChanged(this.c1d);
    this.HeadStateData.BindOnAttackEndStateChanged(this.m1d);
    this.HeadStateData.BindOnAttackBrokenStateChanged(this.g1d);
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
      if (this.r1d >= 1) {
        this.GetUiNiagara(16)?.SetUIActive(false);
        this.GetUiNiagara(18)?.SetUIActive(false);
        this.GetUiNiagara(17)?.SetUIActive(false);
        this.GetUiNiagara(19)?.SetUIActive(false);
      }
    }
  }
  n1d(t) {
    var e = this.HeadStateData.GetAttributeCurrentValueById(EAttributeId.Proto_SpecialEnergy4);
    var i = this.HeadStateData.GetAttributeCurrentValueById(EAttributeId.Proto_SpecialEnergy4Max);
    var e = i === 0 ? 0 : e / i;
    if (e !== this.r1d) {
      this.r1d = e;
      this.i1d.SetTargetPercent(e, t ? LERP_ANIM_TIME : 0);
    }
  }
  a1d(t) {
    if (t ?? this.HeadStateData.ContainsTagById(792676641)) {
      if (!this.v1d()) {
        this.GetUiNiagara(16)?.SetUIActive(true);
        this.GetUiNiagara(18)?.SetUIActive(true);
      }
    } else {
      this.GetUiNiagara(16)?.SetUIActive(false);
      this.GetUiNiagara(18)?.SetUIActive(false);
    }
  }
  l1d(t) {
    if (t ?? this.HeadStateData.ContainsTagById(-325960901)) {
      if (!this.v1d()) {
        this.GetUiNiagara(17)?.SetUIActive(true);
        this.GetUiNiagara(19)?.SetUIActive(true);
      }
    } else {
      this.GetUiNiagara(17)?.SetUIActive(false);
      this.GetUiNiagara(19)?.SetUIActive(false);
    }
  }
  u1d(t) {
    t = t ?? this.HeadStateData.ContainsTagById(314261857);
    this.GetItem(20)?.SetUIActive(t);
    if (t) {
      this.bnt(25);
    } else {
      this.Gnt(25);
      this.bnt(26);
    }
  }
  d1d(t) {
    if (t ?? this.HeadStateData.ContainsTagById(1921770646)) {
      this.bnt(22);
    } else {
      this.Gnt(22);
    }
  }
  f1d(t) {
    if (t ?? this.HeadStateData.ContainsTagById(897633166)) {
      this.bnt(23);
    } else {
      this.Gnt(23);
    }
  }
  C1d(t) {
    if (t ?? this.HeadStateData.ContainsTagById(-1737347985)) {
      this.bnt(24);
    } else {
      this.Gnt(24);
    }
  }
  v1d() {
    return this.r1d >= 1;
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