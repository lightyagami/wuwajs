"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SimpleDamageView = void 0;
const UE = require("ue"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils"),
  Global_1 = require("../../../Global"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  DamageUiManager_1 = require("../DamageUiManager"),
  ANIM_TIME = 1200,
  CRITICAL_OFFSET_SCALE = 3;
class SimpleDamageView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), this.uFt = Vector_1.Vector.Create(), this.vK1 = new UE.VectorDouble, this.cFt = 0, this.mFt = 0, this._Ft = void 0, this.FUn = void 0, this.gFt = void 0, this.pFt = -0, this.ruu = void 0, this.ouu = 1
  }
  Init() {
    var i = ControllerHolder_1.ControllerHolder.BattleUiControl.Pool.GetSimpleDamageView();
    this.CreateByActor(i)
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UINiagara],
      [4, UE.UIItem]
    ]
  }
  OnStart() {
    this.GetText(0)?.SetUIActive(!1), this.GetText(2)?.SetUIActive(!1)
  }
  DestroyOverride() {
    return ControllerHolder_1.ControllerHolder.BattleUiControl.Pool.RecycleSimpleDamageView(this.RootActor), !0
  }
  InitializeData(a, r, i, s, h = !1, n = !1, o = !1, _ = "") {
    if (s) {
      SimpleDamageView.MFt.Start(), this.gFt = s, this.uFt.FromUeVector(r), this.vK1.Set(this.uFt.X, this.uFt.Y, this.uFt.Z);
      let i = s.GetRandomOffsetX(),
        e = s.GetRandomOffsetY();
      h && (i *= CRITICAL_OFFSET_SCALE, e *= CRITICAL_OFFSET_SCALE);
      r = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation, r = Vector_1.Vector.DistSquared(r, this.uFt), r = MathUtils_1.MathUtils.RangeClamp(r, DamageUiManager_1.DamageUiManager.MinDamageOffsetDistance, DamageUiManager_1.DamageUiManager.MaxDamageOffsetDistance, DamageUiManager_1.DamageUiManager.MaxDamageOffsetScale, DamageUiManager_1.DamageUiManager.MinDamageOffsetScale), r = (this.cFt = i * r, this.mFt = e * r, !StringUtils_1.StringUtils.IsEmpty(_));
      let t = void 0;
      t = r ? (_ = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(_), ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(_) ?? "") : n ? "+" + a : a.toString();
      _ = this.nuu();
      if (_) {
        n = this.gFt.GetSequencePath(o, h, r);
        this.ouu = SimpleDamageView.LFt.get(n) ?? 1;
        let i = s.GetTextColor();
        (i = h ? s.GetCriticalTextColor() : i) && (this.ruu = DamageUiManager_1.DamageUiManager.PlayDamageNumBatch(t, _, i, this.ouu)), this.ruu ? (this.pFt = ANIM_TIME, h && (this.RFt(_), this.yFt(h), this.TFt(), this.SetActive(!0))) : this.pFt = 0
      }
      SimpleDamageView.MFt.Stop()
    }
  }
  ClearData() {
    this.gFt = void 0, this.SetActive(!1), this.SetCriticalNiagaraVisible(!1)
  }
  Tick(i) {
    var e;
    this.RootItem && (this.FUn && ((e = this.GetUiNiagara(3)).SetNiagaraSystem(this.FUn), e.ActivateSystem(!0), this.FUn = void 0), this.pFt -= i, this.pFt <= 0 ? DamageUiManager_1.DamageUiManager.RemoveSimpleDamageView(this) : this.RFt(this.nuu()))
  }
  nuu() {
    var i = UE.LGUIBPLibrary.ConvertWorldPosToLGUIPos(Global_1.Global.CharacterController, this.vK1);
    if (i) return i.X = i.X + this.cFt, i.Y = i.Y + this.mFt, i
  }
  TFt() {
    var i = DamageUiManager_1.DamageUiManager.TotalDamageViewNum + DamageUiManager_1.DamageUiManager.TotalSimpleDamageViewNum - 1;
    this.RootItem.SetHierarchyIndex(i)
  }
  UFt(i) {
    if (this._Ft !== i) {
      const e = this.GetUiNiagara(3);
      StringUtils_1.StringUtils.IsEmpty(i) ? (this._Ft = void 0, e.DeactivateSystem(), e.SetNiagaraSystem(void 0)) : (this._Ft = i, ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.NiagaraSystem, i => {
        i?.IsValid() && e && (this.FUn = i)
      }))
    }
  }
  AFt(i) {
    var e = this.GetItem(4);
    e.IsUIActiveSelf() !== i && e.SetUIActive(i)
  }
  SetCriticalNiagaraVisible(i) {
    var e = this.GetUiNiagara(3);
    e.IsUIActiveSelf() !== i && e.SetUIActive(i)
  }
  yFt(i) {
    i ? (this.AFt(!0), this.UFt(this.gFt.GetCriticalNiagaraPath())) : this.AFt(!1)
  }
  RFt(i) {
    i && (this.RootItem.SetAnchorOffset(i), this.ruu?.IsGeometryValid() ? DamageUiManager_1.DamageUiManager.UpdateDamageLocation(this.ruu, i, this.ouu) : this.ruu = void 0)
  }
}(exports.SimpleDamageView = SimpleDamageView).LFt = new Map([
  ["Ani_OwnDamageSequence", 1],
  ["Ani_OwnCriticalDamageSequence", 2],
  ["Ani_MonsterDamageSequence", 3],
  ["Ani_MonsterCriticalDamageSequence", 4],
  ["Ani_BuffSequence", 5],
  ["Ani_SpecialDamage", 6],
  ["Ani_SpecialCriticalDamage", 7]
]), SimpleDamageView.MFt = Stats_1.Stat.Create("[DamageView]InitializeDamageView");
//# sourceMappingURL=SimpleDamageView.js.map