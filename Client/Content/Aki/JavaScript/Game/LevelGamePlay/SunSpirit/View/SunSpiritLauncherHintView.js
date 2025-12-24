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
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const MAX_DELTA_TIME = 200;
const MIN_DELTA_OFFSET = 0.5;
const MAX_POS_OFFSET = 500;
class SunSpiritLauncherHintView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.$lf = undefined;
    this.Wlf = undefined;
    this.$pt = undefined;
    this.Nlf = () => {
      this.Qlf(this.jlf());
    };
    this.vK1 = t => {
      if (t === "Start") {
        this.btg(true);
      } else if (t === "Close") {
        this.SetUiActive(false);
      }
    };
    this.BZm = () => {
      this.kZm();
    };
    this.NZm = () => {
      this.kZm();
    };
    this.qZm = (0, puerts_1.$ref)(undefined);
    this.X9f = Vector2D_1.Vector2D.Create();
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
  }
  OnEnd() {
    EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
  }
  OnAddEventListener() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, this.Nlf)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, this.Nlf);
    }
    this.Qlf(this.jlf());
  }
  OnRemoveEventListener() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, this.Nlf)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, this.Nlf);
    }
  }
  OnTick(t) {
    this.Vlf();
    this.Swr(t);
  }
  OnAfterShow() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged, this.NZm)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged, this.NZm);
    }
    this.kZm();
  }
  OnBeforeHide() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged, this.NZm)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged, this.NZm);
    }
  }
  Rtg() {
    this.SetUiActive(true);
    if (this.$pt) {
      if (this.$pt.IsSequenceFinish("Start")) {
        this.$pt.PlaySequence("Start");
      }
    } else {
      this.vK1("Start");
    }
  }
  Ltg() {
    if (this.$pt) {
      if (this.$pt.IsSequenceFinish("Close")) {
        this.btg(false);
        this.$pt.PlaySequence("Close");
      }
    } else {
      this.vK1("Close");
    }
  }
  btg(t) {
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
  jlf() {
    var t = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
    if (t?.Valid) {
      return t?.GetComponent(105)?.GetSunSpiritLauncherUiTarget();
    }
  }
  Qlf(t) {
    if (t !== this.$lf) {
      this.Klf();
      if (t) {
        this.Xlf(t);
      }
      this.Vlf();
    }
  }
  Klf() {
    if (this.Wlf && EventSystem_1.EventSystem.HasWithTarget(this.Wlf.Entity, EventDefine_1.EEventName.OnSunSpiritOccupiedByGearChanged, this.BZm)) {
      EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, this.Wlf.Entity, EventDefine_1.EEventName.OnSunSpiritOccupiedByGearChanged, this.BZm);
    }
    this.$lf = undefined;
    this.Wlf = undefined;
  }
  Xlf(t) {
    if (t && t.GetTargetGear()) {
      this.$lf = t;
      this.Wlf = t.GetTargetGear();
      if (!EventSystem_1.EventSystem.HasWithTarget(this.Wlf.Entity, EventDefine_1.EEventName.OnSunSpiritOccupiedByGearChanged, this.BZm)) {
        EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, this.Wlf.Entity, EventDefine_1.EEventName.OnSunSpiritOccupiedByGearChanged, this.BZm);
      }
    }
  }
  Vlf() {
    if (this.$lf) {
      if (!this.RootItem?.IsUIActiveSelf()) {
        this.Rtg();
        this.kZm();
      }
    } else if (this.RootItem?.IsUIActiveSelf()) {
      this.Ltg();
    }
  }
  OZm() {
    this.GetItem(2)?.SetUIActive(false);
    this.GetText(3)?.SetUIActive(false);
    this.GetItem(4)?.SetUIActive(true);
    this.GetText(5)?.SetUIActive(true);
  }
  GZm() {
    this.GetItem(4)?.SetUIActive(false);
    this.GetText(5)?.SetUIActive(false);
    this.GetItem(2)?.SetUIActive(true);
    this.GetText(3)?.SetUIActive(true);
  }
  kZm() {
    var t;
    if (this.$lf) {
      t = this.$lf.GetNumOfNeededSunSpirit();
      if (this.$lf.GetNumOfSunSpiritRelatedToLauncher(true, true, true, true) < t) {
        this.GZm();
      } else {
        this.OZm();
      }
      this.FZm(t);
      this.Swr(0);
    }
  }
  FZm(t) {
    this.GetText(5)?.SetText(t.toString(), true);
    this.GetText(3)?.SetText(t.toString(), true);
  }
  Swr(t) {
    var e;
    var i;
    var s;
    var h;
    if (this.$lf?.GetHintViewLocation(this.Lz) && (e = this.Lz, h = Global_1.Global.CharacterController) && (s = ModelManager_1.ModelManager.BattleUiModel) && (i = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig()) && UE.GameplayStatics.D_ProjectWorldToScreen(h, e.ToUeVector(), this.qZm) && (this.X9f.FromUeVector2D((0, puerts_1.$unref)(this.qZm)), this.X9f.MultiplyEqual(s.ScreenPositionScale).AdditionEqual(s.ScreenPositionOffset), this.X9f.Y *= -1, this.X9f.AdditionEqual(i.LauncherHintUiAnchorOffset), this.RootItem)) {
      this.Hzu.FromUeVector2D(this.RootItem.GetAnchorOffset());
      h = this.X9f.X - this.Hzu.X;
      e = this.X9f.Y - this.Hzu.Y;
      if (!(Math.abs(h) < MIN_DELTA_OFFSET) || !(Math.abs(e) < MIN_DELTA_OFFSET)) {
        if (t && !i.LauncherHintUiPosLerpSpeed.IsNearlyZero() && Math.abs(h) <= MAX_POS_OFFSET && Math.abs(e) <= MAX_POS_OFFSET) {
          s = i.LauncherHintUiPosLerpSpeed.X * CommonDefine_1.MILLIONSECOND_PER_SECOND;
          i = i.LauncherHintUiPosLerpSpeed.Y * CommonDefine_1.MILLIONSECOND_PER_SECOND;
          t = t > MAX_DELTA_TIME ? MAX_DELTA_TIME : t;
          s = MathUtils_1.MathUtils.Clamp(Math.abs(s * t / h), 0, 1);
          h = MathUtils_1.MathUtils.Clamp(Math.abs(i * t / e), 0, 1);
          this.Hzu.X = MathUtils_1.MathUtils.Lerp(this.Hzu.X, this.X9f.X, s);
          this.Hzu.Y = MathUtils_1.MathUtils.Lerp(this.Hzu.Y, this.X9f.Y, h);
        } else {
          this.Hzu.DeepCopy(this.X9f);
        }
        this.RootItem?.SetAnchorOffset(this.Hzu.ToUeVector2D());
      }
    }
  }
}
exports.SunSpiritLauncherHintView = SunSpiritLauncherHintView;
//# sourceMappingURL=SunSpiritLauncherHintView.js.map