"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritHintView = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiSequencePlayer_1 = require("../../../Ui/Base/UiSequencePlayer");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const SunSpiritOccupiedByPlayerState_1 = require("../SunSpiritState/SunSpiritOccupiedByPlayerState");
const MAX_DELTA_TIME = 200;
const MIN_DELTA_OFFSET = 0.5;
const MAX_POS_OFFSET = 500;
class SunSpiritHintView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments);
    this.$pt = undefined;
    this.vK1 = t => {
      if (t === "Start") {
        this.btg(true);
      } else if (t === "Close") {
        this.SetUiActive(false);
      }
    };
    this.NZm = () => {
      var t = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig().CharacterHintUiShowDurationWhenUpdate;
      if (t) {
        this.VZm(t * CommonDefine_1.MILLIONSECOND_PER_SECOND);
      }
      this.kZm();
    };
    this.Nlf = () => {
      this.Vlf();
    };
    this.Hlf = 0;
    this.qZm = (0, puerts_1.$ref)(undefined);
    this.X9f = Vector2D_1.Vector2D.Create();
    this.Hzu = Vector2D_1.Vector2D.Create();
    this.lLo = Vector2D_1.Vector2D.Create();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIText], [4, UE.UIItem], [5, UE.UIText]];
  }
  OnStart() {
    this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem);
    this.$pt.BindOnEndSequenceEvent(this.vK1);
    this.GetText(0)?.SetUIActive(true);
    this.GetItem(1)?.SetUIActive(true);
    this.GetItem(2)?.SetUIActive(false);
    this.GetText(3)?.SetUIActive(false);
    this.GetItem(4)?.SetUIActive(false);
    this.GetText(5)?.SetUIActive(false);
    this.SetUiActive(false);
  }
  OnAddEventListener() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged, this.NZm)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged, this.NZm);
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, this.Nlf)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, this.Nlf);
    }
  }
  OnRemoveEventListener() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged, this.NZm)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSunSpiritOccupiedByPlayerChanged, this.NZm);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, this.Nlf)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnSunSpiritLauncherWatchSelectedChanged, this.Nlf);
    }
  }
  OnAfterShow() {
    this.kZm();
  }
  OnTick(t) {
    this.Hlf -= t;
    this.Vlf();
    this.Swr(t);
  }
  jlf() {
    var t = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
    if (t?.Valid) {
      return t?.GetComponent(105)?.GetSunSpiritLauncherUiTarget();
    }
  }
  Vlf() {
    if (this.Hlf <= 0) {
      this.Hlf = 0;
    }
    if (this.Hlf > 0 || this.jlf()) {
      if (!this.RootItem?.IsUIActiveSelf()) {
        this.Rtg();
        this.kZm();
      }
    } else if (this.RootItem?.IsUIActiveSelf()) {
      this.Ltg();
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
  VZm(t) {
    if (!(t <= 0)) {
      this.Rtg();
      this.Hlf = t;
    }
  }
  kZm() {
    var t = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritNumByPlayerIdAndAreaId(ModelManager_1.ModelManager.CreatureModel?.GetPlayerId(), ModelManager_1.ModelManager.AreaModel?.GetCurrentAreaId(), true, t => {
      t = t.GetSunSpiritState();
      return t instanceof SunSpiritOccupiedByPlayerState_1.SunSpiritOccupiedByPlayerState && !t.IsFinished;
    }) ?? 0;
    this.FZm(t);
    this.Swr(0);
  }
  FZm(t) {
    this.GetText(0)?.SetText(t.toString(), true);
  }
  Swr(t) {
    var e;
    var i;
    var s;
    var h = Global_1.Global.BaseCharacter?.D_K2_GetActorLocation();
    if (h && (s = Global_1.Global.CharacterController) && (e = ModelManager_1.ModelManager.BattleUiModel) && (i = ModelManager_1.ModelManager.SunSpiritModel?.GetSunSpiritConfig()) && UE.GameplayStatics.D_ProjectWorldToScreen(s, h, this.qZm) && (this.X9f.FromUeVector2D((0, puerts_1.$unref)(this.qZm)), this.X9f.MultiplyEqual(e.ScreenPositionScale).AdditionEqual(e.ScreenPositionOffset), this.X9f.Y *= -1, this.X9f.AdditionEqual(i.CharacterHintUiAnchorOffset), this.RootItem)) {
      if (Math.abs(this.X9f.X - this.Hzu.X) > MAX_POS_OFFSET || Math.abs(this.X9f.Y - this.Hzu.Y) > MAX_POS_OFFSET) {
        this.Hzu.X = this.X9f.X;
        this.Hzu.Y = this.X9f.Y;
        this.RootItem?.SetAnchorOffset(this.Hzu.ToUeVector2D());
      } else {
        this.lLo.X = this.jii(t, this.X9f.X, this.Hzu.X, this.lLo.X);
        this.lLo.Y = this.jii(t, this.X9f.Y, this.Hzu.Y, this.lLo.Y);
        s = this.lLo.X * t;
        h = this.lLo.Y * t;
        if (!(Math.abs(s) < MIN_DELTA_OFFSET) || !(Math.abs(h) < MIN_DELTA_OFFSET)) {
          this.Hzu.X += s;
          this.Hzu.Y += h;
          this.RootItem?.SetAnchorOffset(this.Hzu.ToUeVector2D());
        }
      }
    }
  }
  jii(t, e, i, s) {
    let h = e - i;
    let r = false;
    if (h < 0) {
      h = -h;
      r = true;
    }
    if (h < 1) {
      return 0;
    }
    let n = 0;
    n = t >= MAX_DELTA_TIME ? h / t : h / MAX_DELTA_TIME;
    if (r) {
      n = -n;
    }
    return MathUtils_1.MathUtils.Lerp(s, n, 0.5);
  }
}
exports.SunSpiritHintView = SunSpiritHintView;
//# sourceMappingURL=SunSpiritHintView.js.map