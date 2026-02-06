"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritLauncherHintView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../Ui/Base/UiSequencePlayer");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const MAX_DELTA_TIME = 200;
const MIN_DELTA_OFFSET = 0.5;
const MAX_POS_OFFSET = 500;
class SunSpiritLauncherHintView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.G0f = undefined;
    this.F0f = undefined;
    this.$pt = undefined;
    this.U0f = () => {
      this.N0f(this.q0f());
    };
    this.vK1 = t => {
      if (t === "Start") {
        this.aDg(true);
      } else if (t === "Close") {
        this.SetUiActive(false);
      }
    };
    this.V0f = () => {
      this.D0f();
    };
    this.P0f = () => {
      this.D0f();
    };
    this.k0f = (0, puerts_1.$ref)(undefined);
    this.peg = Vector2D_1.Vector2D.Create();
    this.Hzu = Vector2D_1.Vector2D.Create();
    this.Lz = Vector_1.Vector.Create();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText]];
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.$pt.BindOnEndSequenceEvent(this.vK1);
    this.GetText(0)?.SetUIActive(false);
    this.GetItem(1)?.SetUIActive(true);
    this.GetItem(2)?.SetUIActive(false);
    this.GetText(3)?.SetUIActive(false);
    this.GetItem(4)?.SetUIActive(false);
    this.GetText(5)?.SetUIActive(false);
    this.SetUiActive(false);
    this.Ore();
  }
  OnBeforeDestroy() {
    this.H0f();
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
    this.kre();
  }
  Ore() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, this.U0f)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, this.U0f);
    }
    this.N0f(this.q0f());
  }
  kre() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, this.U0f)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, this.U0f);
    }
  }
  Tick(t) {
    this.x0f();
    this.Swr(t);
  }
  hDg() {
    this.SetUiActive(true);
    if (this.$pt) {
      if (this.$pt.IsSequenceFinish("Start")) {
        this.$pt.PlaySequence("Start");
      }
    } else {
      this.vK1("Start");
    }
  }
  lDg() {
    if (this.$pt) {
      if (this.$pt.IsSequenceFinish("Close")) {
        this.aDg(false);
        this.$pt.PlaySequence("Close");
      }
    } else {
      this.vK1("Close");
    }
  }
  aDg(t) {
    if (this.$pt) {
      if (this.$pt.IsSequenceFinish("Loop")) {
        if (t) {
          this.$pt.PlaySequence("Loop");
        }
      } else if (!t) {
        this.$pt.StopSequenceByKey("Loop");
      }
    }
  }
  q0f() {
    var t = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
    if (t?.Valid) {
      return t?.GetComponent(107)?.GetSunSpiritLauncherUiTarget();
    }
  }
  N0f(t) {
    if (t !== this.G0f) {
      this.H0f();
      if (t) {
        this.j0f(t);
      }
      this.x0f();
      this.D0f();
    }
  }
  H0f() {
    if (this.F0f && EventSystem_1.EventSystem.HasWithTarget(this.F0f.Entity, EventDefine_1.EEventName.OnSunSpiritOccupiedByGearChanged, this.V0f)) {
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, this.F0f.Entity, EventDefine_1.EEventName.OnSunSpiritOccupiedByGearChanged, this.V0f);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged, this.P0f)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged, this.P0f);
    }
    this.G0f = undefined;
    this.F0f = undefined;
  }
  j0f(t) {
    if (t && t.GetTargetGear()) {
      this.G0f = t;
      this.F0f = t.GetTargetGear();
      if (!EventSystem_1.EventSystem.HasWithTarget(this.F0f.Entity, EventDefine_1.EEventName.OnSunSpiritOccupiedByGearChanged, this.V0f)) {
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.F0f.Entity, EventDefine_1.EEventName.OnSunSpiritOccupiedByGearChanged, this.V0f);
      }
      if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged, this.P0f)) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged, this.P0f);
      }
    }
  }
  x0f() {
    if (this.G0f) {
      if (this.RootItem && !this.RootItem.IsUIActiveSelf()) {
        this.hDg();
        this.D0f();
      }
    } else if (this.RootItem?.IsUIActiveSelf()) {
      this.lDg();
    }
  }
  $0f() {
    this.GetItem(2)?.SetUIActive(false);
    this.GetText(3)?.SetUIActive(false);
    this.GetItem(4)?.SetUIActive(true);
    this.GetText(5)?.SetUIActive(true);
  }
  W0f() {
    this.GetItem(4)?.SetUIActive(false);
    this.GetText(5)?.SetUIActive(false);
    this.GetItem(2)?.SetUIActive(true);
    this.GetText(3)?.SetUIActive(true);
  }
  D0f() {
    var t;
    if (this.G0f) {
      t = this.G0f.GetNumOfNeededSunSpirit();
      if (this.G0f.GetNumOfSunSpiritRelatedToLauncher(true, true, true, true) < t) {
        this.W0f();
      } else {
        this.$0f();
      }
      this.O0f(t);
      this.Swr(0);
    }
  }
  O0f(t) {
    this.GetText(5)?.SetText(t.toString(), true);
    this.GetText(3)?.SetText(t.toString(), true);
  }
  Swr(t) {
    var e;
    var i;
    var s;
    var h;
    if (this.G0f?.GetHintViewLocation(this.Lz) && (e = this.Lz, h = Global_1.Global.CharacterController) && (s = ModelManager_1.ModelManager.BattleUiModel) && (i = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig()) && UE.GameplayStatics.D_ProjectWorldToScreen(h, e.ToUeVector(), this.k0f) && (this.peg.FromUeVector2D((0, puerts_1.$unref)(this.k0f)), this.peg.MultiplyEqual(s.ScreenPositionScale).AdditionEqual(s.ScreenPositionOffset), this.peg.Y *= -1, this.peg.AdditionEqual(i.LauncherHintUiAnchorOffset), this.RootItem)) {
      this.Hzu.FromUeVector2D(this.RootItem.GetAnchorOffset());
      h = this.peg.X - this.Hzu.X;
      e = this.peg.Y - this.Hzu.Y;
      if (!(Math.abs(h) < MIN_DELTA_OFFSET) || !(Math.abs(e) < MIN_DELTA_OFFSET)) {
        if (t && !i.LauncherHintUiPosLerpSpeed.IsNearlyZero() && Math.abs(h) <= MAX_POS_OFFSET && Math.abs(e) <= MAX_POS_OFFSET) {
          s = i.LauncherHintUiPosLerpSpeed.X * CommonDefine_1.MILLIONSECOND_PER_SECOND;
          i = i.LauncherHintUiPosLerpSpeed.Y * CommonDefine_1.MILLIONSECOND_PER_SECOND;
          t = t > MAX_DELTA_TIME ? MAX_DELTA_TIME : t;
          s = MathUtils_1.MathUtils.Clamp(Math.abs(s * t / h), 0, 1);
          h = MathUtils_1.MathUtils.Clamp(Math.abs(i * t / e), 0, 1);
          this.Hzu.X = MathUtils_1.MathUtils.Lerp(this.Hzu.X, this.peg.X, s);
          this.Hzu.Y = MathUtils_1.MathUtils.Lerp(this.Hzu.Y, this.peg.Y, h);
        } else {
          this.Hzu.DeepCopy(this.peg);
        }
        this.RootItem?.SetAnchorOffset(this.Hzu.ToUeVector2D());
      }
    }
  }
}
exports.SunSpiritLauncherHintView = SunSpiritLauncherHintView;
//# sourceMappingURL=SunSpiritLauncherHintView.js.map