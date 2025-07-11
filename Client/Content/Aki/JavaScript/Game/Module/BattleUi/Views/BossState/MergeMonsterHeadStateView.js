"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MergeMonsterHeadStateView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const GlobalData_1 = require("../../../../GlobalData");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BattleChildView_1 = require("../BattleChildView/BattleChildView");
const BuffItemSimpleContainer_1 = require("../BuffItemSimpleContainer");
const HpBufferStateMachine_1 = require("../HeadState/HpBufferStateMachine");
const VisibleAnimMachine_1 = require("../State/VisibleAnimMachine");
const rgbSplitProgress = new UE.FName("RGBSplit_Progress");
const SHOW_VIEW_ANIM_TIME = 667;
const CLOSE_VIEW_ANIM_TIME = 167;
const MAX_BUFF_ITEM_COUNT = 12;
class MergeMonsterHeadStateView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments);
    this.Info = undefined;
    this.SPe = undefined;
    this.ont = undefined;
    this.nnt = -0;
    this.snt = 1;
    this.cnt = new HpBufferStateMachine_1.HpBufferStateMachine();
    this.Cnt = undefined;
    this.gnt = -1;
    this.fnt = -0;
    this.pnt = 0;
    this.Ant = false;
    this.mkn = new BuffItemSimpleContainer_1.BuffItemSimpleContainer();
    this.Hnt = new Map();
    this.jnt = i => {
      if (!i) {
        this.Hide();
      }
    };
    this.Wnt = i => {
      if (i) {
        this.SPe.PlaySequencePurely("ShowView");
      } else {
        this.SPe.PlaySequencePurely("CloseView");
      }
    };
    this.Knt = i => {
      this.SPe.StopCurrentSequence();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UISprite], [8, UE.UIItem], [9, UE.UISprite], [10, UE.UISprite], [11, UE.UIItem], [12, UE.UINiagara], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UISprite], [19, UE.UINiagara], [20, UE.UISprite], [21, UE.UISprite], [22, UE.UIItem], [23, UE.UINiagara], [24, UE.UINiagara], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIItem], [31, UE.UIItem], [32, UE.UIItem]];
    this.fnt = CommonParamById_1.configCommonParamById.GetIntConfig("HitEffectDuration");
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.Qnt();
    this.nnt = CommonParamById_1.configCommonParamById.GetIntConfig("HitLargeBufferPercent") / 10000;
    this.ont = new VisibleAnimMachine_1.VisibleAnimMachine();
    this.ont.InitCallback(this.jnt, this.Wnt, this.Knt);
    this.ont.InitVisible(false);
    this.Tst();
    var i = UE.Color.FromHex("ED601BFF");
    this.GetText(1).SetColor(i);
    var i = this.GetItem(13);
    i.SetAnchorOffsetY(-15);
    this.mkn.Init(i, MAX_BUFF_ITEM_COUNT);
  }
  Tst() {
    this.GetSprite(10).SetUIActive(false);
    this.GetItem(11).SetUIActive(false);
    this.GetItem(32)?.SetUIActive(false);
  }
  OnBeforeDestroy() {
    this.SPe.Clear();
    this.SPe = undefined;
    this.ont.Reset();
    this.ont = undefined;
    this.mkn.ClearAll();
    if (this.gnt >= 0) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[合并血条]销毁时重置受击shader特效");
      }
      this.hst(0);
    }
  }
  OnBeforeShow() {
    this.Lst();
    this.ont.SetVisible(true, SHOW_VIEW_ANIM_TIME);
  }
  Refresh(i) {
    this.Info = i;
    if (this.IsShowOrShowing) {
      if (i === undefined) {
        this.ist();
      } else {
        this.Lst();
      }
    }
  }
  Lst() {
    this.xnt();
    this.Dst();
    this.Rst();
    this.tst();
    this.jN1();
  }
  Initialize(i) {
    super.Initialize(i);
    this.pnt = this.GetItem(8).GetParentAsUIItem().GetWidth();
    ResourceSystem_1.ResourceSystem.LoadAsync("/LGUI/MPC_UIShader.MPC_UIShader", UE.MaterialParameterCollection, i => {
      this.Cnt = i;
    }, 103);
  }
  OnHealthChanged() {
    this.Rst(true);
  }
  OnLanguageChange() {
    this.Dst();
  }
  Tick(i) {
    var t;
    if (this.IsShowOrShowing) {
      if (this.Ant) {
        if ((t = this.cnt.UpdatePercent(i)) < 0) {
          this.ist();
        } else if (t <= 1) {
          this.ast(t);
        }
      }
      if (this.gnt > this.fnt) {
        this.hst(0);
        this.gnt = -1;
      }
      if (this.gnt >= 0) {
        this.gnt += i;
      }
      this.mkn.Tick(i);
    }
  }
  Rst(i = false) {
    var t;
    if (!(this.Info.TotalHpMax <= 0)) {
      t = this.Info.TotalHp / this.Info.TotalHpMax;
      this.Cst(t);
      if (i) {
        this.fst(t);
      } else {
        this.ist();
      }
      this.snt = t;
    }
  }
  fst(i) {
    var t;
    if (i < this.snt) {
      t = this.cnt.IsOriginState();
      this.cnt.GetHit(i, this.snt);
      if (t && !this.cnt.IsOriginState()) {
        this.ast(this.snt);
      }
      this.Ant = true;
      if (this.snt - i < this.nnt) {
        this.bnt(25);
      } else {
        this.bnt(26);
        this.gnt = 0;
        this.hst(1);
      }
    }
  }
  hst(i) {
    if (this.Cnt) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[合并血条]播放受击shader特效", ["", i]);
      }
      UE.KismetMaterialLibrary.SetScalarParameterValue(GlobalData_1.GlobalData.GameInstance.GetWorld(), this.Cnt, rgbSplitProgress, i);
    }
  }
  ist() {
    this.GetItem(8).SetUIActive(false);
    this.cnt.Reset();
    this.Ant = false;
  }
  Cst(i) {
    this.GetSprite(7).SetFillAmount(i);
  }
  ast(i) {
    var t = this.pnt * this.snt;
    var i = this.pnt * i;
    var t = i - t;
    var i = i - (this.pnt + t) / 2;
    var e = this.GetItem(8);
    e.SetAnchorOffsetX(i);
    e.SetWidth(t);
    e.SetUIActive(true);
    this.GetSprite(9).SetAnchorOffsetX(-i);
  }
  xnt() {
    var i = this.GetText(0);
    if (i) {
      i.SetUIActive(false);
    }
  }
  Dst() {
    var i = this.Info.MonsterGroupName;
    var t = this.GetText(1);
    if (i) {
      t.SetText(PublicUtil_1.PublicUtil.GetConfigTextByKey(i));
    } else {
      t.SetText("");
    }
  }
  tst() {
    var i = this.Info.MonsterMergedHpBarSettings?.DisplayBuffIds;
    if (i) {
      this.mkn.RefreshBuff(i);
    } else {
      this.mkn.ClearAll();
    }
  }
  jN1() {
    this.GetItem(32)?.SetUIActive(false);
  }
  Qnt() {
    this.Est(25);
    this.Est(26);
  }
  Est(i) {
    var t = [];
    var e = this.GetItem(i).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    var s = e.Num();
    for (let i = 0; i < s; i++) {
      t.push(e.Get(i));
    }
    this.Hnt.set(i, t);
  }
  bnt(i) {
    i = this.Hnt.get(i);
    if (i) {
      for (const t of i) {
        t.Play();
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
exports.MergeMonsterHeadStateView = MergeMonsterHeadStateView;
//# sourceMappingURL=MergeMonsterHeadStateView.js.map