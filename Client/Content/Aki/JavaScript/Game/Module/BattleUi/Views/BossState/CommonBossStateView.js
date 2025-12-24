"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonBossStateView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BuffItemContainer_1 = require("../BuffItemContainer");
const HpBufferStateMachine_1 = require("../HeadState/HpBufferStateMachine");
const RageBufferStateMachine_1 = require("../HeadState/RageBufferStateMachine");
const VisibleAnimMachine_1 = require("../State/VisibleAnimMachine");
const StateExtraFunction_1 = require("../StateExtra/StateExtraFunction");
const HeadStateWeaknessItem_1 = require("../Weakness/HeadStateWeaknessItem");
const BossStateViewBase_1 = require("./BossStateViewBase");
const FallDownPercentMachine_1 = require("./FallDownPercentMachine");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const rgbSplitProgress = new UE.FName("RGBSplit_Progress");
const FALL_DOWN_DISAPPEAR_PERCENT = 0.9;
const FALL_DOWN_DISAPPEAR_TAIL_COUNT_FACTOR = 10;
const SHOW_VIEW_ANIM_TIME = 667;
const CLOSE_VIEW_ANIM_TIME = 167;
const TOUGH_ANIM_TIME = 250;
const fallDownAttributeId = EAttributeId.Proto_ParalysisTime;
const fallDownMaxAttributeId = EAttributeId.Proto_ParalysisTimeMax;
const MAX_BUFF_ITEM_COUNT = 12;
class CommonBossStateView extends BossStateViewBase_1.BossStateViewBase {
  constructor() {
    super(...arguments);
    this.SPe = undefined;
    this.int = undefined;
    this.ont = undefined;
    this.rnt = undefined;
    this.nnt = -0;
    this.snt = 1;
    this.ant = 1;
    this.hnt = false;
    this.mkn = new BuffItemContainer_1.BuffItemContainer();
    this.cnt = new HpBufferStateMachine_1.HpBufferStateMachine();
    this.mnt = new FallDownPercentMachine_1.FallDownPercentMachine();
    this.dnt = new RageBufferStateMachine_1.RageBufferStateMachine();
    this.Cnt = undefined;
    this.gnt = -1;
    this.fnt = -0;
    this.pnt = 0;
    this.vnt = 0;
    this.Mnt = false;
    this.Ent = false;
    this.Snt = false;
    this.ynt = true;
    this.Tnt = true;
    this.Lnt = false;
    this.Dnt = false;
    this.Rnt = 0;
    this.Unt = 0;
    this.Ant = false;
    this.JWt = undefined;
    this.j9d = false;
    this.Qti = undefined;
    this.OnBossHeathChanged = (t, i, s) => {
      this.Pnt(true);
    };
    this.OnBossMaxHealthChanged = (t, i, s) => {
      this.Pnt();
    };
    this.OnVulnerabilityActivated = (t, i) => {
      this.Dnt = i;
      var s = this.GetSprite(21);
      s.SetUIActive(i);
      if (this.Dnt) {
        [i] = this.GetHpAndShieldPercent();
        s.SetFillAmount(i);
        this.int.Play();
      } else {
        this.int.Stop();
      }
    };
    this.OnLevelChanged = (t, i, s) => {
      this.xnt();
    };
    this.wnt = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "狂暴条刷新", ["visible", t]);
      }
      this.GetItem(11).SetUIActive(t);
      if (t) {
        this.GetItem(11).SetAlpha(1);
      }
    };
    this.Bnt = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "播放狂暴条动画", ["visible", t]);
      }
      if (t) {
        this.bnt(27);
      } else {
        this.bnt(30);
      }
    };
    this.qnt = t => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "停止狂暴条动画", ["visible", t]);
      }
      if (t) {
        this.Gnt(27);
      } else {
        this.Gnt(30);
      }
    };
    this.Nnt = (t, i, s) => {
      var e;
      if (t <= i) {
        this.Ont();
      } else {
        (e = this.GetSprite(20)).SetUIActive(true);
        e.SetStretchRight(this.vnt * (1 - t));
        e.SetStretchLeft(this.vnt * i);
        if (s) {
          this.bnt(28);
        }
      }
    };
    this.knt = (t, i) => {
      var s;
      if (t <= i) {
        this.Fnt();
      } else {
        (s = this.GetItem(22)).SetUIActive(true);
        s.SetStretchRight(this.vnt * (1 - t));
        s.SetStretchLeft(this.vnt * i);
        this.GetUiNiagara(23).ActivateSystem(true);
        this.bnt(26);
      }
    };
    this.Vnt = () => {
      this.bnt(31);
    };
    this.mLm = () => {
      this.fLm();
      this.gLm();
    };
    this.Hnt = new Map();
    this.jnt = t => {
      if (!t) {
        this.Hide();
      }
    };
    this.Wnt = t => {
      if (t) {
        this.SPe.PlaySequencePurely("ShowView");
      } else {
        this.SPe.PlaySequencePurely("CloseView");
      }
    };
    this.Knt = t => {
      this.SPe.StopCurrentSequence();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UISprite], [11, UE.UIItem], [12, UE.UINiagara], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UISprite], [19, UE.UINiagara], [20, UE.UISprite], [21, UE.UISprite], [22, UE.UIItem], [23, UE.UINiagara], [24, UE.UINiagara], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIItem], [31, UE.UIItem], [32, UE.UIItem], [33, UE.UITexture], [34, UE.UIItem], [35, UE.UIItem], [36, UE.UISprite], [37, UE.UINiagara], [38, UE.UIItem], [39, UE.UIItem]];
    this.fnt = CommonParamById_1.configCommonParamById.GetIntConfig("HitEffectDuration");
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Qnt();
    this.nnt = CommonParamById_1.configCommonParamById.GetIntConfig("HitLargeBufferPercent") / 10000;
    this.ont = new VisibleAnimMachine_1.VisibleAnimMachine();
    this.ont.InitCallback(this.jnt, this.Wnt, this.Knt);
    this.ont.InitVisible(false);
    this.rnt = new VisibleAnimMachine_1.VisibleAnimMachine();
    this.rnt.InitCallback(this.wnt, this.Bnt, this.qnt);
    var t = this.GetItem(13);
    t.SetAnchorOffsetY(-40);
    this.mkn.Init(t, MAX_BUFF_ITEM_COUNT);
  }
  OnBeforeDestroy() {
    this.SPe.Clear();
    this.SPe = undefined;
    this.ont.Reset();
    this.ont = undefined;
    this.rnt.Reset();
    this.rnt = undefined;
    if (this.gnt >= 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[boss血条]销毁时重置受击shader特效");
      }
      this.hst(0);
    }
    if (this.Qti) {
      this.Qti.Destroy();
      this.Qti = undefined;
    }
  }
  OnActivate() {
    super.OnActivate();
    this.Ent = this.HasFallDownTag;
    this.Mnt = this.GetItem(11).bIsUIActive;
    this.Tnt = this.GetSprite(4).bIsUIActive;
    this.Snt = this.GetSprite(18).bIsUIActive;
    this.rnt.InitVisible(this.Mnt);
    this.GetItem(11).SetAlpha(1);
    this.GetItem(11).SetUIItemScale(Vector_1.Vector.OneVector);
    this.jN1();
    this.xnt();
    this.Xnt();
    this.$nt();
    this.Pnt();
    this.Ynt();
    this.Jnt();
    this.znt();
    this.Znt();
    this.est();
    this.tst();
    this.CLm(true);
    this.dnt.SetUpdateCallback(this.Nnt, this.knt, this.Vnt);
    this.ont.SetVisible(true, SHOW_VIEW_ANIM_TIME);
  }
  OnDeactivate() {
    super.OnDeactivate();
    this.ist();
    this.Ont();
    this.Fnt();
    this.dnt.Reset();
    this.ost();
    this.mkn.ClearAll();
    this.Ent = false;
    this.rnt?.Deactivate();
    this.Qti?.Refresh(undefined);
  }
  Initialize(t) {
    super.Initialize(t);
    t = this.GetSprite(21);
    this.int = t.GetOwner().GetComponentByClass(UE.LGUIPlayTweenComponent.StaticClass());
    this.pnt = this.GetItem(8).GetParentAsUIItem().GetWidth();
    this.vnt = this.GetSprite(20).GetParentAsUIItem().GetWidth();
    ResourceSystem_1.ResourceSystem.LoadAsync("/LGUI/MPC_UIShader.MPC_UIShader", UE.MaterialParameterCollection, t => {
      this.Cnt = t;
    }, 103);
    this.Ent = this.HasFallDownTag;
  }
  async InitializeAsync() {
    this.Qti = new HeadStateWeaknessItem_1.HeadStateWeaknessItem();
    await this.Qti.InitializeAsync(this.GetItem(34));
  }
  OnBossShieldChanged(t) {
    this.Pnt(true);
  }
  OnFallDownVisibleChanged(t) {
    if (t) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 17, "进入倒地状态");
      }
      this.dnt.GetHit(0, this.ant);
      this.nst();
      this.sst(true);
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Battle", 17, "退入倒地状态");
      }
      this.sst(false);
    }
  }
  OnBossHardnessChanged(t) {
    this.Znt();
  }
  OnBossLanguageChange() {
    this.Xnt();
  }
  OnBossStateChange() {
    this.Jnt(true);
    this.znt();
  }
  Tick(t) {
    var i;
    if (this.Ant) {
      if ((i = this.cnt.UpdatePercent(t)) < 0) {
        this.ist();
      } else if (i <= 1) {
        this.ast(i);
      }
    }
    this.dnt.Update(t);
    this.nst(t);
    if (this.gnt > this.fnt) {
      this.hst(0);
      this.gnt = -1;
    }
    if (this.gnt >= 0) {
      this.gnt += t;
    }
    this.mkn.Tick(t);
    this.Qti?.Tick(t);
    super.Tick(t);
  }
  ChangeBuff(t, i, s, e = 0) {
    if (i) {
      this.mkn.AddBuffByCue(t, s, true);
    } else {
      this.mkn.RemoveBuffByCue(t, s, true);
    }
  }
  Pnt(t = false) {
    var [i, s] = this.GetHpAndShieldPercent();
    this.Cst(i);
    this.gst(s);
    if (t) {
      this.fst(i);
    } else {
      this.ist();
    }
    this.snt = i;
    this.fLm();
  }
  fst(t) {
    var i;
    if (t < this.snt) {
      i = this.cnt.IsOriginState();
      this.cnt.GetHit(t, this.snt);
      if (i && !this.cnt.IsOriginState()) {
        this.ast(this.snt);
      }
      this.Ant = true;
      if (this.snt - t < this.nnt) {
        this.bnt(25);
      } else {
        this.bnt(26);
        this.gnt = 0;
        this.hst(1);
      }
    }
  }
  hst(t) {
    if (this.Cnt) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[boss血条]播放受击shader特效", ["", t]);
      }
      UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.Cnt, rgbSplitProgress, t);
    }
  }
  ist() {
    this.GetItem(8).SetUIActive(false);
    this.cnt.Reset();
    this.Ant = false;
  }
  Cst(t) {
    this.GetSprite(7).SetFillAmount(t);
    if (this.Dnt) {
      this.GetSprite(21).SetFillAmount(t);
    }
  }
  ast(t) {
    var i = this.pnt * this.snt;
    var t = this.pnt * t;
    var i = t - i;
    var t = t - (this.pnt + i) / 2;
    var s = this.GetItem(8);
    s.SetAnchorOffsetX(t);
    s.SetWidth(i);
    s.SetUIActive(true);
    this.GetSprite(9).SetAnchorOffsetX(-t);
  }
  gst(t) {
    var i = this.GetSprite(10);
    if (t > 0) {
      i.SetFillAmount(t);
      i.SetUIActive(true);
    } else {
      i.SetUIActive(false);
    }
  }
  tst() {
    var t = this.GetEntityId();
    if (t === undefined) {
      this.mkn.ClearAll();
    } else {
      t = ModelManager_1.ModelManager.CharacterModel?.GetHandle(t);
      this.mkn.RefreshBuff(t);
    }
  }
  jN1() {
    var t = (0, StateExtraFunction_1.getExtraItemParamsByCreatureData)(this.GetCreatureDataComp());
    var i = this.GetItem(32);
    if (t) {
      if (this.JWt && this.JWt.GetExtraItemType() === t.Type) {
        this.JWt.InitExtraParams(t);
        this.JWt.SetUiActive(true);
        i?.SetUIActive(true);
      } else if (!this.j9d) {
        this.j9d = true;
        const s = t.Creator();
        s.CreateByResourceIdAsync(t.ResourceId, i, true).then(() => {
          if (this.IsValid()) {
            this.JWt = s;
            this.jN1();
            this.xnt();
          }
        }).finally(() => {
          this.j9d = false;
        });
      }
    } else {
      i?.SetUIActive(false);
    }
  }
  xnt() {
    var t;
    var i;
    if (this.IsValid() && (t = this.GetText(0))) {
      if (this.GetMonsterConfig()?.BossStateInfoShowType === 1) {
        t.SetText("");
      } else if (i = this.GetMonsterConfig()?.TidLevelText) {
        i = PublicUtil_1.PublicUtil.GetConfigTextByKey(i);
        LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", i);
      } else {
        i = this.GetCurrentAttributeValueById(EAttributeId.Proto_Lv);
        LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", i);
      }
    }
  }
  $nt() {
    var t;
    var i;
    if (this.IsValid()) {
      i = this.GetCurrentAttributeValueById(EAttributeId.Proto_Lv);
      t = this.GetText(0);
      i = ConfigManager_1.ConfigManager.BattleUiConfig.GetThreadColor(i, 1);
      i = UE.Color.FromHex(i);
      t.SetColor(i);
      this.GetText(1).SetColor(i);
    }
  }
  HideBossName(t) {
    this.GetText(0).SetUIActive(t);
    this.GetText(1).SetUIActive(t);
  }
  Xnt() {
    var t;
    var i;
    var s;
    if (this.IsValid() && (t = PublicUtil_1.PublicUtil.GetConfigTextByKey(this.GetCreatureDataComp().GetEntityTidName()), i = PublicUtil_1.PublicUtil.GetConfigTextByKey(this.GetMonsterConfig().TidBossSubTitle), s = this.GetText(1))) {
      s.SetText(t + i);
    }
  }
  SetNameAndLevel(t, i, s) {
    var e = this.GetText(1);
    if (e) {
      e.SetText(t ?? i ?? "");
    }
    var e = this.GetText(0);
    if (e) {
      if (s) {
        LguiUtil_1.LguiUtil.SetLocalText(e, "LevelShow", s);
      }
      e.SetUIActive(!!s);
    }
  }
  znt() {
    var t = this.Ent || this.ynt;
    if (this.Mnt !== t) {
      this.Mnt = t;
      this.rnt.SetVisible(t, TOUGH_ANIM_TIME);
    }
  }
  Znt() {
    var t;
    if (this.IsValid() && this.HardnessAttributeId === EAttributeId.Proto_Rage) {
      t = this.GetCurrentAttributeValueById(this.HardnessAttributeId) / this.GetCurrentAttributeValueById(this.MaxHardnessAttributeId);
      this.pst(t);
      this.vst(t);
      this.ant = t;
    }
  }
  pst(t) {
    this.GetSprite(4).SetFillAmount(t);
    this.dnt.GetHit(t, this.ant);
  }
  vst(t) {
    if (t < 1) {
      this.hnt = false;
    } else if (!this.hnt) {
      if (this.ynt) {
        this.Lnt = false;
        this.hnt = true;
        if ((t = this.GetUiNiagara(12)).IsUIActiveSelf()) {
          t.ActivateSystem(true);
        } else {
          t.SetUIActive(true);
        }
        this.est();
      } else {
        this.Lnt = true;
      }
    }
  }
  ost() {
    var t = this.GetUiNiagara(12);
    if (t.IsUIActiveSelf()) {
      t.SetUIActive(false);
    }
  }
  Jnt(t = false) {
    this.Mst();
    if (this.Tnt !== this.ynt && (this.Tnt = this.ynt, this.GetSprite(4).SetUIActive(this.Tnt), t || this.Tnt && this.Lnt)) {
      this.Znt();
    }
  }
  Mst() {
    if (this.Ent || this.HardnessAttributeId !== EAttributeId.Proto_Rage) {
      this.ynt = false;
    } else {
      this.ynt = true;
    }
  }
  Ont() {
    this.GetSprite(20).SetUIActive(false);
  }
  Fnt() {
    this.GetItem(22).SetUIActive(false);
  }
  est() {}
  sst(t) {
    this.Ent = t;
    this.Ynt();
    this.Jnt(!t);
    this.znt();
  }
  Ynt() {
    if (this.Ent !== this.Snt) {
      this.Snt = this.Ent;
      this.GetSprite(18).SetUIActive(this.Snt);
      if (this.Snt) {
        this.bnt(29);
      } else {
        this.Gnt(29);
      }
    }
  }
  nst(t = 0) {
    if (this.Ent) {
      var i = this.GetCurrentAttributeValueById(fallDownAttributeId);
      var s = this.GetCurrentAttributeValueById(fallDownMaxAttributeId);
      this.mnt.SetTargetPercent(1 - i / s);
      if (t > 0) {
        this.mnt.Update(t);
      }
      var i = this.mnt.GetCurPercent();
      if (i >= 0 && i <= 1) {
        s = this.GetSprite(18);
        this.Rnt ||= this.GetItem(17).GetWidth();
        s.SetStretchRight(this.Rnt * i);
        let t = 1;
        if (i > FALL_DOWN_DISAPPEAR_PERCENT) {
          t = (1 - i) * FALL_DOWN_DISAPPEAR_TAIL_COUNT_FACTOR;
        }
        if (this.Unt !== t) {
          this.Unt = t;
          this.GetUiNiagara(19).SetNiagaraVarFloat("Count", t);
        }
      }
    }
  }
  CLm(t = false) {
    this.GetUiNiagara(37).SetUIActive(false);
    if (this.Qti) {
      this.Qti.Refresh(this.GetEntity());
      this.fLm();
      this.gLm(t);
      this.Qti.SetStateChangeCallback(this.mLm);
    }
  }
  fLm() {
    if (this.Qti && this.Qti.IsFullState()) {
      this.GetSprite(36).SetFillAmount(this.snt);
    }
  }
  gLm(t = false) {
    if (this.Qti.IsInBreakAnim() && !t) {
      this.GetItem(35).SetUIActive(true);
      this.bnt(39);
    } else if (this.Qti.IsFullState()) {
      this.GetItem(35).SetUIActive(true);
      this.bnt(38);
    } else {
      this.GetItem(35).SetUIActive(false);
    }
  }
  Qnt() {
    this.Est(25);
    this.Est(26);
    this.Est(27);
    this.Est(28);
    this.Est(29);
    this.Est(30);
    this.Est(31);
    this.Est(38);
    this.Est(39);
  }
  Est(t) {
    var i = [];
    var s = this.GetItem(t).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var e = s.Num();
    for (let t = 0; t < e; t++) {
      i.push(s.Get(t));
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
  HideWithAnim() {
    this.ont.SetVisible(false, CLOSE_VIEW_ANIM_TIME);
  }
  GetResourceId() {
    return "UiItem_BossState_Prefab";
  }
}
exports.CommonBossStateView = CommonBossStateView;
//# sourceMappingURL=CommonBossStateView.js.map