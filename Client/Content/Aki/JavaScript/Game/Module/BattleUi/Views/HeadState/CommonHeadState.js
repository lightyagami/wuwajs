"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonHeadState = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const BuffItemContainer_1 = require("../BuffItemContainer");
const HeadStateViewBase_1 = require("./HeadStateViewBase");
class CommonHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments);
    this.mkn = new BuffItemContainer_1.BuffItemContainer();
    this.pnt = 0;
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
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UISprite], [2, UE.UISprite], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UISprite], [7, UE.UIItem]];
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
  }
  OnStart() {
    this.pnt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
    this.mkn.Init(this.GetItem(5), undefined, true);
  }
  OnBeforeShow() {
    super.OnBeforeShow();
    var t = this.GetItem(7);
    if (this.MoraleLevelItem) {
      this.MoraleLevelItem.GetRootItem().SetUIParent(t);
      t?.SetUIActive(true);
    } else {
      t?.SetUIActive(false);
    }
  }
  ResetBattleHeadState() {
    this.mkn.ClearAll();
    super.ResetBattleHeadState();
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
    this.MoraleLevelItem?.SetUiActive(t);
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
}
exports.CommonHeadState = CommonHeadState;
//# sourceMappingURL=CommonHeadState.js.map