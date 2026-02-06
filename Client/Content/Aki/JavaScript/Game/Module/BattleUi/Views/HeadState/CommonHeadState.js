"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonHeadState = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BuffItemContainer_1 = require("../BuffItemContainer");
const HeadStateWeaknessItem_1 = require("../Weakness/HeadStateWeaknessItem");
const HeadStateViewBase_1 = require("./HeadStateViewBase");
class CommonHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments);
    this.mkn = new BuffItemContainer_1.BuffItemContainer();
    this.pnt = 0;
    this.FOf = undefined;
    this.Qti = undefined;
    this.OLm = () => {
      this.GLm();
      this.FLm();
    };
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
      this.RefreshHpAndShield(false);
    };
    this.OnChangeTeam = () => {
      this.Olt();
    };
    this.OnLevelChanged = (t, e, i) => {
      this.Olt();
    };
    this.OnRoleLevelChange = (t, e, i) => {
      this.Olt();
    };
    this.Hnt = new Map();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UISprite], [11, UE.UINiagara], [12, UE.UIItem], [13, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    this.Qti = new HeadStateWeaknessItem_1.HeadStateWeaknessItem();
    this.FOf = this.GetItem(8);
    await this.Qti.InitializeAsync(this.FOf, 0.5);
  }
  ActiveBattleHeadState(t) {
    super.ActiveBattleHeadState(t);
    this.RefreshHpAndShield();
    this.Olt();
    this.klt();
    this.Flt();
    this.Vlt();
    this.tst();
    this.Hlt();
    this.NLm(true);
  }
  OnStart() {
    this.Qnt();
    this.pnt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
    this.mkn.Init(this.GetItem(5), undefined, true);
  }
  OnBeforeDestroy() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[CommonHeadState]销毁血条");
    }
    if (this.Qti) {
      this.Qti.Destroy();
      this.Qti = undefined;
    }
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    var t = this.GetItem(7);
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
  NLm(t = false) {
    this.GetUiNiagara(11).SetUIActive(false);
    if (this.Qti) {
      this.Qti.Refresh(this.HeadStateData?.GetEntity());
      this.GLm();
      this.FLm(t);
      this.Qti.SetStateChangeCallback(this.OLm);
    }
  }
  GLm() {
    if (this.Qti && this.Qti.IsFullState()) {
      this.GetSprite(10).SetFillAmount(this.CurrentBarPercent);
    }
  }
  FLm(t = false) {
    if (this.Qti.IsInBreakAnim()) {
      this.GetItem(9).SetUIActive(true);
      if (!t) {
        this.bnt(13);
      }
    } else if (this.Qti.IsFullState()) {
      this.GetItem(9).SetUIActive(true);
      if (!t) {
        this.bnt(12);
      }
    } else {
      this.GetItem(9).SetUIActive(false);
    }
  }
  GetResourceId() {
    return "UiItem_LittleMonsterState_Prefab";
  }
  OnRefresh(t, e, i) {
    super.OnRefresh(t, e, i);
    if (this.IsActivated) {
      this.klt();
      this.Flt();
      this.Vlt();
      this.jlt(i);
      this.Qti?.Tick(i);
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
  Hlt() {
    var t = this.GetHpColor();
    if (t) {
      t = UE.Color.FromHex(t);
      this.GetSprite(0)?.SetColor(t);
    }
  }
  klt() {
    var t = this.IsDetailVisible();
    this.GetItem(4).SetUIActive(t);
    this.ExtraItem?.SetUiActive(t);
    this.FOf.SetUIActive(t);
  }
  Flt() {
    var t = this.IsLevelTextVisible();
    this.GetText(3).SetUIActive(t);
  }
  Vlt() {
    var t = this.IsBuffVisible();
    this.GetItem(5).SetUIActive(t);
  }
  jlt(t) {
    if (this.IsBuffVisible()) {
      this.mkn.Tick(t);
    }
  }
  RefreshHpAndShield(t = false) {
    var [e, i] = this.GetHpAndShieldPercent();
    this.Cst(e);
    this.gst(i);
    if (t) {
      this.PlayBarAnimation(e);
    } else {
      this.StopBarLerpAnimation();
    }
    this.GLm();
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
    if (!e.IsUIActiveSelf()) {
      e.SetUIActive(true);
    }
    var e = this.GetSprite(2);
    e.SetStretchLeft(this.pnt * this.CurrentBarPercent - 2);
    e.SetStretchRight(this.pnt * (1 - t) - 2);
  }
  gst(t) {
    var e = this.GetSprite(6);
    if (t > 0) {
      e.SetFillAmount(t);
      e.SetUIActive(true);
    } else {
      e.SetUIActive(false);
    }
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
      e = this.GetText(3);
      i = ConfigManager_1.ConfigManager.BattleUiConfig.GetThreadColor(t, this.HeadStateData.Camp);
      e.SetColor(UE.Color.FromHex(i));
      LguiUtil_1.LguiUtil.SetLocalText(e, "LevelShow", t);
    }
  }
  RefreshOnCampChanged() {
    this.Olt();
    this.Hlt();
  }
  Qnt() {
    this.Est(12);
    this.Est(13);
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
}
exports.CommonHeadState = CommonHeadState;
//# sourceMappingURL=CommonHeadState.js.map