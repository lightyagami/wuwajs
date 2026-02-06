"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DigitalHpHeadStateHeadState = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../Camera/CameraController");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiManager_1 = require("../../../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const DigitScroll_1 = require("../Utilities/DigitScroll");
const MotorcycleUtil_1 = require("../Utilities/MotorcycleUtil");
const DAMAGEABSORPTION_PERCELL = 5;
const MIN_CELL_COUNT = 1;
const SCROLL_DURATION = 500;
const DEFAULT_SCALE = 2.5;
class DigitalHpHeadStateHeadState extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.QAg = -1;
    this.KAg = -1;
    this.HpText = undefined;
    this.ShieldBarLine = undefined;
    this.ShieldBar = undefined;
    this.ShieldBarDivider = undefined;
    this.DividerCount = 0;
    this.MaxDamageAbsorptionCount = 0;
    this.SequencePlayer = undefined;
    this.Aqg = new DigitScroll_1.DigitScroll();
  }
  GetResourceId() {
    return "UiItem_BattleHpMonster";
  }
  CreateHeadStateView(t, i) {
    var e = this.GetResourceId();
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e);
    this.DividerCount = Math.max(MIN_CELL_COUNT, Math.ceil(i.Shield / DAMAGEABSORPTION_PERCELL));
    this.MaxDamageAbsorptionCount = this.DividerCount * DAMAGEABSORPTION_PERCELL;
    this.QAg = i.CurHp;
    this.KAg = i.Shield;
    this.CreateThenShowByPathAsync(e, t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UIArtText], [3, UE.UIItem], [4, UE.UISprite], [5, UE.UIItem]];
  }
  OnStart() {
    this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.RootItem.SetUIItemScale(new UE.Vector(DEFAULT_SCALE, DEFAULT_SCALE, DEFAULT_SCALE));
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.HpText = this.GetArtText(2);
    this.ShieldBarLine = this.GetItem(3);
    this.ShieldBar = this.GetSprite(1);
    this.ShieldBarDivider = this.GetSprite(4);
    this.RefreshHeadStateRotation();
    this.HpText?.SetText(MotorcycleUtil_1.MotorcycleUtil.CompactNumberFormat(this.QAg));
    if (this.KAg > 0) {
      this.GetItem(5).SetUIActive(true);
      this.InitShieldBarDivider();
      this.ShieldBar?.SetFillAmount(Math.min(this.KAg / this.MaxDamageAbsorptionCount, 1));
    } else {
      this.GetItem(5).SetUIActive(false);
    }
    this.Aqg.Init(this.QAg, this.QAg, SCROLL_DURATION);
  }
  OnBeforeShow() {
    this.SequencePlayer.PlaySequencePurely("Start");
  }
  async OnBeforeHideAsync() {
    await this.SequencePlayer.PlaySequenceAsync("Close", new CustomPromise_1.CustomPromise());
  }
  OnAfterHide() {
    UiManager_1.UiManager.RemoveTickView(this);
  }
  InitShieldBarDivider() {
    if (this.ShieldBarDivider && !(this.DividerCount <= 1)) {
      var t = this.ShieldBarDivider.GetWidth();
      let i = t * 0.5;
      var e = this.GetItem(3);
      var s = (e.GetWidth() - t) / this.DividerCount;
      for (let t = 1; t < this.DividerCount; t++) {
        i += s;
        LguiUtil_1.LguiUtil.CopyItem(this.ShieldBarDivider, e).SetAnchorOffsetX(i);
      }
    }
  }
  UpdateByHeadInfo(t) {
    this.kCg(t.Location);
    this.UpdateHpText(t.CurHp);
    this.UpdateShieldBar(t.Shield);
  }
  UpdateHpText(t) {
    t = this.Aqg.SetTarget(t);
    if (t !== 0) {
      UiManager_1.UiManager.AddTickView(this);
    }
    if (t < 0) {
      this.SequencePlayer.PlaySequencePurely("Hit");
    }
  }
  UpdateShieldBar(t) {
    if (this.KAg !== t && (this.KAg = t, this.ShieldBar?.SetFillAmount(Math.min(t / this.MaxDamageAbsorptionCount, 1)), t <= 0)) {
      this.GetItem(5).SetUIActive(false);
    }
  }
  kCg(t) {
    var i = MathUtils_1.MathUtils.CommonTempVector;
    i.FromUeVector(t);
    this.RootItem?.SetUIRelativeLocation(i.ToUeVectorOld());
  }
  RefreshHeadStateRotation() {
    var t = CameraController_1.CameraController.CameraRotator;
    var i = MathUtils_1.MathUtils.CommonTempRotator;
    i.Yaw = t.Yaw + 90;
    i.Roll = t.Pitch - 90;
    i.Pitch = 0;
    this.RootItem.SetUIRelativeRotation(i.ToUeRotator());
  }
  Tick(t) {
    if (this.Aqg.IsFinished()) {
      UiManager_1.UiManager.RemoveTickView(this);
    } else {
      t = this.Aqg.Tick(t);
      this.HpText?.SetText(MotorcycleUtil_1.MotorcycleUtil.CompactNumberFormat(Math.floor(t)));
    }
  }
  AfterTick() {}
}
exports.DigitalHpHeadStateHeadState = DigitalHpHeadStateHeadState;
//# sourceMappingURL=DigitalHpHeadState.js.map