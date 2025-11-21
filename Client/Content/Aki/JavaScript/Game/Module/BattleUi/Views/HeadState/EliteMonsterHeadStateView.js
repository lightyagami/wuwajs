"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EliteMonsterHeadStateView = undefined;
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
const VisibleAnimMachine_1 = require("../State/VisibleAnimMachine");
const HeadStateWeaknessItem_1 = require("../Weakness/HeadStateWeaknessItem");
const HeadStateViewBase_1 = require("./HeadStateViewBase");
const RageBufferStateMachine_1 = require("./RageBufferStateMachine");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const SCALE_TOLERATION = 0.003;
const FALL_DOWN_DISAPPEAR_PERCENT = 0.8;
const FALL_DOWN_DISAPPEAR_TAIL_COUNT_FACTOR = 5;
const TOUGH_ANIM_TIME = 250;
const fallDownAttributeId = EAttributeId.Proto_ParalysisTime;
const fallDownMaxAttributeId = EAttributeId.Proto_ParalysisTimeMax;
class EliteMonsterHeadStateView extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.rnt = undefined;
    this.nnt = 0;
    this.hnt = false;
    this.mkn = new BuffItemContainer_1.BuffItemContainer();
    this.t1t = new RageBufferStateMachine_1.RageBufferStateMachine();
    this.i1t = 1;
    this.pnt = 0;
    this.vnt = 1;
    this.Mnt = true;
    this.Ent = false;
    this.Snt = false;
    this.ynt = true;
    this.Tnt = true;
    this.Lnt = false;
    this.Dnt = false;
    this.Rnt = 0;
    this.Unt = 0;
    this.Qti = undefined;
    this.OnFallDownVisibleChange = () => {
      if (this.HeadStateData.HasFallDownTag) {
        this.t1t.GetHit(0, this.i1t);
        this.nst();
        this.sst(true);
      } else {
        this.sst(false);
      }
    };
    this.Xvm = () => {
      this.Yvm();
      this.zvm();
    };
    this.OnAddOrRemoveBuff = (t, i, e, s) => {
      if (this.HeadStateData.GetEntityId() === t) {
        if (e) {
          this.mkn.AddBuffByCue(i, s, true);
        } else {
          this.mkn.RemoveBuffByCue(i, s, true);
        }
      }
    };
    this.OnShieldChanged = t => {
      this.RefreshHpAndShield(true);
    };
    this.OnHardnessHideChanged = t => {
      this.Jnt();
      this.znt();
    };
    this.OnHardnessChanged = (t, i, e) => {
      if (t === this.HardnessAttributeId || t === this.MaxHardnessAttributeId) {
        this.Znt();
      }
    };
    this.VulnerabilityActivated = t => {
      this.Dnt = t;
      var i = this.GetSprite(15);
      i.SetUIActive(t);
      if (this.Dnt) {
        [t] = this.GetHpAndShieldPercent();
        i.SetFillAmount(t);
        this.SPe?.PlaySequencePurely("Flicker");
      } else {
        this.SPe?.StopSequenceByKey("Flicker");
      }
    };
    this.OnLevelChanged = (t, i, e) => {
      this.Olt();
    };
    this.OnRoleLevelChange = (t, i, e) => {
      this.Olt();
    };
    this.OnChangeTeam = () => {
      this.Olt();
    };
    this.wnt = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "狂暴条刷新", ["visible", t]);
      }
      this.GetItem(8).SetUIActive(t);
    };
    this.Bnt = t => {
      if (t) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[EliteHeadState]播放狂暴条Start动画");
        }
        this.bnt(21);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[EliteHeadState]播放狂暴条Close动画");
        }
        this.bnt(24);
      }
    };
    this.qnt = t => {
      if (t) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[EliteHeadState]停止狂暴条Start动画");
        }
        this.Gnt(21);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[EliteHeadState]停止狂暴条Close动画");
        }
        this.Gnt(24);
      }
    };
    this.Nnt = (t, i, e) => {
      var s;
      if (t <= i) {
        this.Ont();
      } else {
        (s = this.GetSprite(14)).SetUIActive(true);
        s.SetStretchRight(this.vnt * (1 - t));
        s.SetStretchLeft(this.vnt * i);
        if (e) {
          this.bnt(22);
        }
      }
    };
    this.knt = (t, i) => {
      this.bnt(20);
    };
    this.Vnt = () => {
      var t = this.GetUiNiagara(18);
      if (!t.bIsUIActive) {
        t.SetUIActive(true);
      }
      t.ActivateSystem(true);
    };
    this.Hnt = new Map();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UISprite], [4, UE.UIText], [5, UE.UIItem], [6, UE.UINiagara], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UISprite], [11, UE.UIItem], [12, UE.UISprite], [13, UE.UINiagara], [14, UE.UISprite], [15, UE.UISprite], [16, UE.UIItem], [17, UE.UINiagara], [18, UE.UINiagara], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UISprite], [29, UE.UISprite], [30, UE.UISprite], [31, UE.UINiagara], [32, UE.UIItem], [33, UE.UIItem]];
    this.ScaleToleration = SCALE_TOLERATION;
  }
  async OnBeforeStartAsync() {
    this.Qti = new HeadStateWeaknessItem_1.HeadStateWeaknessItem();
    await this.Qti.InitializeAsync(this.GetItem(26));
    this.Qti.SetStateChangeCallback(this.Xvm);
  }
  ActiveBattleHeadState(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[EliteHeadState]激活血条");
    }
    super.ActiveBattleHeadState(t);
    this.Mnt = this.GetItem(8).bIsUIActive;
    this.Tnt = this.GetItem(5).bIsUIActive;
    this.Snt = this.GetSprite(12).bIsUIActive;
    this.rnt.InitVisible(this.Mnt);
    this.GetItem(8).SetAlpha(1);
    this.Dnt = t.HasTag(242005298);
    this.GetSprite(15).SetUIActive(this.Dnt);
    this.Ent = t.HasFallDownTag;
    this.o1t();
    this.RefreshHpAndShield();
    this.Olt();
    this.RefreshHeadStateRotation();
    this.klt();
    this.Flt();
    this.Vlt();
    this.Ynt();
    this.Jnt();
    this.znt();
    this.Znt();
    this.est();
    this.tst();
    this.Hlt();
    this.Jvm();
  }
  OnStart() {
    this.Qnt();
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.nnt = CommonParamById_1.configCommonParamById.GetIntConfig("HitLargeBufferPercent") / 10000;
    this.t1t.SetUpdateCallback(this.Nnt, this.knt, this.Vnt);
    this.pnt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
    this.vnt = this.GetSprite(14).GetParentAsUIItem().GetWidth();
    this.rnt = new VisibleAnimMachine_1.VisibleAnimMachine();
    this.rnt.InitCallback(this.wnt, this.Bnt, this.qnt);
    this.mkn.Init(this.GetItem(9), undefined, true);
  }
  OnBeforeDestroy() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[EliteHeadState]销毁血条");
    }
    this.SPe.Clear();
    this.SPe = undefined;
    this.Ont();
    this.est();
    this.t1t.Reset();
    this.rnt.Deactivate();
    this.rnt = undefined;
    if (this.Qti) {
      this.Qti.Destroy();
      this.Qti = undefined;
    }
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    var t = this.GetItem(25);
    if (this.ExtraItem) {
      this.ExtraItem.GetRootItem().SetUIParent(t);
      t?.SetUIActive(true);
    } else {
      t?.SetUIActive(false);
    }
  }
  ResetBattleHeadState() {
    this.mkn.ClearAll();
    this.Qti?.Refresh(undefined);
    super.ResetBattleHeadState();
  }
  Jvm() {
    if (this.Qti) {
      this.Qti.Refresh(this.HeadStateData?.GetEntity());
    }
  }
  Yvm() {
    if (this.Qti && this.Qti.IsFullState()) {
      this.GetSprite(28).SetFillAmount(this.CurrentBarPercent);
      this.GetSprite(29).SetFillAmount(this.CurrentBarPercent);
      this.GetSprite(30).SetFillAmount(this.CurrentBarPercent);
    }
  }
  zvm() {
    if (this.Qti.IsFullState()) {
      this.GetItem(27).SetUIActive(true);
      this.bnt(32);
    } else if (this.Qti.IsBreakState()) {
      this.GetItem(27).SetUIActive(true);
      this.bnt(33);
    } else {
      this.GetItem(27).SetUIActive(false);
    }
  }
  GetResourceId() {
    return "UiItem_EliteMonsterState_Prefab";
  }
  OnRefresh(t, i, e) {
    super.OnRefresh(t, i, e);
    if (this.IsActivated) {
      this.klt();
      this.Flt();
      this.Vlt();
      this.jlt(e);
      this.t1t.Update(e);
      this.nst();
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
    this.GetItem(7).SetUIActive(t);
    this.ExtraItem?.SetUiActive(t);
  }
  Flt() {
    var t = this.IsLevelTextVisible();
    this.GetText(4).SetUIActive(t);
  }
  Vlt() {
    var t = this.IsBuffVisible();
    this.GetItem(9).SetUIActive(t);
  }
  jlt(t) {
    if (this.IsBuffVisible()) {
      this.mkn.Tick(t);
    }
  }
  OnEliteStateChange() {
    this.Jnt();
    this.znt();
  }
  o1t() {
    var t = this.HeadStateData.ActorComponent;
    if ((0, RegisterComponent_1.isComponentInstance)(t, 3) && t.HalfHeight > this.HeadStateData.CommonParam.OutMonsterHalfHeight) {
      this.NeedCorrectionOutside = true;
    }
  }
  RefreshHpAndShield(t = false) {
    var [i, e] = this.GetHpAndShieldPercent();
    this.Cst(i);
    this.gst(e);
    if (t) {
      if (i < this.CurrentBarPercent) {
        if (this.CurrentBarPercent - i < this.nnt) {
          this.bnt(19);
        } else {
          this.bnt(20);
        }
      }
      this.PlayBarAnimation(i);
    } else {
      this.StopBarLerpAnimation();
    }
    this.Yvm();
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
    if (this.Dnt) {
      this.GetSprite(15).SetFillAmount(t);
    }
  }
  ast(t) {
    var i = this.GetSprite(1);
    i.SetFillAmount(t);
    i.SetUIActive(true);
    var i = this.GetSprite(2);
    i.SetStretchLeft(this.pnt * this.CurrentBarPercent - 2);
    i.SetStretchRight(this.pnt * (1 - t) - 2);
  }
  gst(t) {
    var i = this.GetSprite(3);
    if (t > 0) {
      i.SetFillAmount(t);
      i.SetUIActive(true);
    } else {
      i.SetUIActive(false);
    }
  }
  OnHardnessAttributeChanged() {
    super.OnHardnessAttributeChanged();
    this.Znt();
  }
  OnHealthChanged() {
    this.RefreshHpAndShield(true);
  }
  Olt() {
    var t;
    var i;
    var e;
    if (this.HeadStateData) {
      t = this.GetLevel();
      i = this.GetText(4);
      e = ConfigManager_1.ConfigManager.BattleUiConfig.GetThreadColor(t, this.HeadStateData.Camp);
      i.SetColor(UE.Color.FromHex(e));
      LguiUtil_1.LguiUtil.SetLocalText(i, "LevelShow", t);
    }
  }
  RefreshOnCampChanged() {
    this.Olt();
    this.Hlt();
  }
  znt() {
    var t = this.Ent || this.ynt;
    if (this.Mnt !== t && (this.Mnt = t, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[EliteHeadState]ToughItemVisible改变", ["visible", this.Mnt], ["EntityId", this.HeadStateData?.GetEntityId()]), this.rnt.SetVisible(t, TOUGH_ANIM_TIME), t)) {
      this.GetItem(8).SetAlpha(1);
    }
  }
  Znt() {
    var t;
    var i;
    var e;
    if (this.HardnessAttributeId === EAttributeId.Proto_Rage) {
      t = this.HeadStateData.GetAttributeCurrentValueById(this.MaxHardnessAttributeId);
      e = (i = this.HeadStateData.GetAttributeCurrentValueById(this.HardnessAttributeId)) / t;
      this.GetSprite(10).SetFillAmount(e);
      this.t1t.GetHit(e, this.i1t);
      this.i1t = i / t;
      this.vst(e);
    }
  }
  vst(t) {
    if (t < 1) {
      this.hnt = false;
    } else if (!this.hnt) {
      if (this.ynt) {
        this.Lnt = false;
        this.hnt = true;
        this.GetUiNiagara(6).ActivateSystem(true);
        this.est();
      } else {
        this.Lnt = true;
      }
    }
  }
  Jnt() {
    this.Mst();
    if (this.Tnt !== this.ynt && (this.Tnt = this.ynt, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[EliteHeadState]白条Visible改变", ["visible", this.Tnt], ["EntityId", this.HeadStateData?.GetEntityId()]), this.GetItem(5).SetUIActive(this.Tnt), this.Tnt) && this.Lnt) {
      this.Znt();
    }
  }
  Mst() {
    var t;
    if (this.Ent || this.HardnessAttributeId !== EAttributeId.Proto_Rage || this.HeadStateData.ContainsTagById(1261361093)) {
      this.ynt = false;
    } else {
      t = this.HeadStateData.GetAttributeCurrentValueById(this.MaxHardnessAttributeId);
      this.ynt = !(t <= 0);
    }
  }
  Ont() {
    this.GetSprite(14).SetUIActive(false);
  }
  est() {
    var t = this.GetUiNiagara(18);
    if (t.bIsUIActive) {
      t.SetUIActive(false);
    }
  }
  sst(t) {
    this.Ent = t;
    this.Ynt();
    this.Jnt();
    this.znt();
  }
  Ynt() {
    if (this.Ent !== this.Snt) {
      this.Snt = this.Ent;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[EliteHeadState]倒地条Visible改变", ["visible", this.Snt], ["EntityId", this.HeadStateData?.GetEntityId()]);
      }
      this.GetSprite(12).SetUIActive(this.Snt);
      if (this.Snt) {
        this.bnt(23);
      } else {
        this.Gnt(23);
      }
    }
  }
  nst() {
    if (this.Ent) {
      var i = 1 - this.HeadStateData.GetAttributeCurrentValueById(fallDownAttributeId) / this.HeadStateData.GetAttributeCurrentValueById(fallDownMaxAttributeId);
      if (i >= 0 && i <= 1) {
        var e = this.GetSprite(12);
        this.Rnt ||= this.GetItem(11).GetWidth();
        e.SetStretchRight(this.Rnt * i);
        let t = 1;
        if (i > FALL_DOWN_DISAPPEAR_PERCENT) {
          t = (1 - i) * FALL_DOWN_DISAPPEAR_TAIL_COUNT_FACTOR;
        }
        if (this.Unt !== t) {
          this.Unt = t;
          this.GetUiNiagara(13).SetNiagaraVarFloat("Count", t);
        }
      }
    }
  }
  Hlt() {
    var t = this.GetHpColor();
    if (t) {
      t = UE.Color.FromHex(t);
      this.GetSprite(0)?.SetColor(t);
    }
  }
  Qnt() {
    this.Est(19);
    this.Est(20);
    this.Est(21);
    this.Est(22);
    this.Est(23);
    this.Est(24);
    this.Est(32);
    this.Est(33);
  }
  Est(t) {
    var i = [];
    var e = this.GetItem(t).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var s = e.Num();
    for (let t = 0; t < s; t++) {
      i.push(e.Get(t));
    }
    this.Hnt.set(t, i);
  }
  bnt(t) {
    t = this.Hnt.get(t);
    if (t) {
      for (const i of t) {
        i.Play();
      }
    }
  }
  Gnt(t) {
    t = this.Hnt.get(t);
    if (t) {
      for (const i of t) {
        i.Stop();
      }
    }
  }
}
exports.EliteMonsterHeadStateView = EliteMonsterHeadStateView;
//# sourceMappingURL=EliteMonsterHeadStateView.js.map