"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleStateView = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterAttributeTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../Util/LguiUtil");
const BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView");
const MotorcycleShieldItem_1 = require("./Motorcycle/MotorcycleShieldItem");
const LOW_HP_PERCENT = 0.2;
class RoleStateView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.Wst = undefined;
    this.E0 = undefined;
    this.$te = undefined;
    this.l1t = undefined;
    this.cmt = undefined;
    this.snt = -1;
    this.j1t = 0;
    this.W1t = 0;
    this.K1t = -1;
    this.Xrt = 0;
    this.mmt = undefined;
    this.dmt = new UE.Margin();
    this.Cmt = 0;
    this.gmt = undefined;
    this.fmt = false;
    this.oKu = 0;
    this.jhf = undefined;
    this.u$e = t => {
      if (t === this.E0) {
        this.RefreshHpAndShield(true);
      }
    };
    this.hXe = t => {
      if (t === this.E0) {
        this.RefreshHpAndShield(true);
        this.SetNiagaraActive(true);
      }
    };
    this.m2 = t => {
      if (t === this.E0) {
        this.pmt();
      }
    };
    this.vmt = () => {
      this.pmt();
      this.RefreshHpAndShield();
    };
    this.Wef = () => {
      this.$hf();
    };
    this.pmt = () => {
      var t;
      var i;
      if (this.IsValid()) {
        t = this.GetText(2);
        if (this.Wst.RoleConfig?.RoleType !== 2 && (i = this.$te)) {
          i = i.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Lv);
          LguiUtil_1.LguiUtil.SetLocalTextNew(t, "LevelShowNew", i);
        } else {
          t.SetText("");
        }
      }
    };
    this.EIf = () => {
      this.gst(this.oKu);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite], [1, UE.UIText], [2, UE.UIText], [3, UE.UISprite], [4, UE.UISprite], [5, UE.UISprite], [6, UE.UINiagara], [7, UE.UIText], [8, UE.UIItem], [11, UE.UIItem]];
  }
  Initialize(t) {
    super.Initialize(t);
    this.InitChildType(43);
    this.Xrt = CommonParamById_1.configCommonParamById.GetIntConfig("PlayerHPAttenuateBufferSpeed");
    this.mmt = this.GetItem(8).GetOwner().GetComponentByClass(UE.LGUICanvas.StaticClass());
    this.Cmt = this.GetText(1).GetWidth();
    this.gmt = new LevelSequencePlayer_1.LevelSequencePlayer(this.GetSprite(5));
    this.Ore();
  }
  OnBeforeDestroy() {
    this.Refresh(undefined);
    if (this.jhf) {
      this.jhf.ExistShieldChanged = undefined;
      this.jhf.Destroy();
      this.jhf = undefined;
    }
  }
  Reset() {
    this.kre();
    super.Reset();
  }
  Refresh(t) {
    if (t) {
      this.Wst = t;
      this.E0 = t?.EntityHandle?.Id;
      this.$te = t.AttributeComponent;
      this.l1t = t?.EntityHandle?.Entity?.GetComponent(80);
      this.RefreshRoleState();
    } else {
      this.Wst = undefined;
      this.E0 = undefined;
      this.$te = undefined;
      this.l1t = undefined;
      this.Mmt();
    }
  }
  IsValid() {
    return this.Wst?.EntityHandle !== undefined;
  }
  GetEntityId() {
    return this.E0;
  }
  Ore() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiHealthChanged, this.hXe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiShieldChanged, this.u$e);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiLevelChanged, this.m2);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TextLanguageChange, this.vmt);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.Wef);
  }
  kre() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiHealthChanged, this.hXe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiShieldChanged, this.u$e);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiLevelChanged, this.m2);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TextLanguageChange, this.vmt);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.BattleUiMotorcycleStateChanged, this.Wef);
  }
  Tick(t) {
    this.nmt(t);
    this.jhf?.Tick(t);
  }
  Mmt() {
    if (TimerSystem_1.TimerSystem.Has(this.cmt)) {
      TimerSystem_1.TimerSystem.Remove(this.cmt);
    }
    this.ist();
    this.cmt = undefined;
    this.SetVisible(1, false);
  }
  nmt(t) {
    var i;
    if (this.K1t !== -1 && !(this.K1t >= this.Xrt && this.ist(), this.j1t >= this.W1t)) {
      i = this.K1t / this.Xrt;
      i = MathUtils_1.MathUtils.Lerp(this.W1t, this.j1t, i);
      this.ast(i);
      this.K1t = this.K1t + t;
    }
  }
  SetNiagaraActive(t) {
    var i = this.GetUiNiagara(6);
    i.SetUIActive(t);
    if (t) {
      i.SetNiagaraVarFloat("Dissolve", this.snt);
      i.ActivateSystem(true);
    } else {
      i.DeactivateSystem();
    }
  }
  RefreshRoleState() {
    if (this.IsValid()) {
      this.ist();
      this.RefreshHpAndShield();
      this.pmt();
      this.$hf();
      this.SetVisible(1, true);
    }
  }
  RefreshHpAndShield(t = false) {
    var i;
    var e;
    var s;
    var h;
    if (this.IsValid() && (i = this.$te)) {
      h = i.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life);
      i = i.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n);
      s = this.l1t.ShieldTotal;
      e = h / i;
      s = Math.min(s / i, 1);
      h = Math.ceil(h) + "/" + Math.ceil(i);
      this.dmt.Right = -(1 - e) * this.Cmt;
      this.mmt.SetRectClipOffset(this.dmt);
      this.GetText(1).SetText(h);
      this.GetText(7).SetText(h);
      this.Cst(e);
      this.gst(s);
      if (t) {
        this.fst();
      } else {
        this.ist();
      }
      this.snt = e;
    }
  }
  fst() {
    var t;
    var i = this.$te;
    if (i) {
      i = i.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Life) / i.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.l5n);
      if (!((t = this.snt) <= i)) {
        this.j1t = i;
        this.W1t = t;
        this.K1t = 0;
      }
    }
  }
  ast(t) {
    var i = this.GetSprite(4);
    i.SetFillAmount(t);
    i.SetUIActive(true);
  }
  ist() {
    this.GetSprite(4).SetUIActive(false);
    this.j1t = 0;
    this.W1t = 0;
    this.K1t = -1;
  }
  Cst(t) {
    this.Emt(t);
    var i = this.GetSprite(3);
    var e = this.GetSprite(0);
    if (i.bIsUIActive) {
      i.SetFillAmount(t);
    }
    if (e.bIsUIActive) {
      e.SetFillAmount(t);
    }
  }
  Emt(t) {
    var i = this.GetSprite(3);
    var e = this.GetSprite(0);
    if (t <= LOW_HP_PERCENT) {
      i.SetUIActive(true);
      e.SetUIActive(false);
    } else {
      i.SetUIActive(false);
      e.SetUIActive(true);
    }
  }
  gst(t) {
    this.oKu = t;
    var i = this.GetSprite(5);
    let e = false;
    e = !this.jhf?.ExistShield && t > 0;
    i.SetUIActive(e);
    if (this.fmt !== e && (this.fmt = e)) {
      this.gmt.PlayLevelSequenceByName("Start");
    }
    if (e) {
      i.SetFillAmount(t);
    }
  }
  $hf() {
    if (ModelManager_1.ModelManager.BattleUiModel.MotorcycleData.IsDriving) {
      if (!this.jhf) {
        this.jhf = new MotorcycleShieldItem_1.MotorcycleShieldItem();
        this.jhf.ExistShieldChanged = this.EIf;
        this.jhf.CreateThenShowByResourceIdAsync("UiItem_MotorcycleShieldBar", this.GetRootItem());
      }
    } else if (this.jhf) {
      this.jhf.ExistShieldChanged = undefined;
      this.jhf.Destroy();
      this.jhf = undefined;
      this.EIf();
    }
  }
}
exports.RoleStateView = RoleStateView;
//# sourceMappingURL=RoleStateView.js.map