"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleDamageView = undefined;
const UE = require("ue");
const Stats_1 = require("../../../../Core/Common/Stats");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const Global_1 = require("../../../Global");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const DamageUiManager_1 = require("../DamageUiManager");
const ANIM_TIME = 1200;
const CRITICAL_OFFSET_SCALE = 3;
class SimpleDamageView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.uFt = Vector_1.Vector.Create();
    this.cX1 = new UE.VectorDouble();
    this.cFt = 0;
    this.mFt = 0;
    this._Ft = undefined;
    this.FUn = undefined;
    this.gFt = undefined;
    this.pFt = -0;
    this.nSu = undefined;
    this.sSu = 1;
  }
  Init() {
    var i = ControllerHolder_1.ControllerHolder.BattleUiControl.Pool.GetSimpleDamageView();
    this.CreateByActor(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UINiagara], [4, UE.UIItem]];
  }
  OnStart() {
    this.GetText(0)?.SetUIActive(false);
    this.GetText(2)?.SetUIActive(false);
  }
  DestroyOverride() {
    ControllerHolder_1.ControllerHolder.BattleUiControl.Pool.RecycleSimpleDamageView(this.RootActor);
    return true;
  }
  InitializeData(a, r, i, s, h = false, n = false, o = false, _ = "") {
    if (s) {
      SimpleDamageView.MFt.Start();
      this.gFt = s;
      this.uFt.FromUeVector(r);
      this.cX1.Set(this.uFt.X, this.uFt.Y, this.uFt.Z);
      let i = s.GetRandomOffsetX();
      let e = s.GetRandomOffsetY();
      if (h) {
        i *= CRITICAL_OFFSET_SCALE;
        e *= CRITICAL_OFFSET_SCALE;
      }
      r = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      r = Vector_1.Vector.DistSquared(r, this.uFt);
      r = MathUtils_1.MathUtils.RangeClamp(r, DamageUiManager_1.DamageUiManager.MinDamageOffsetDistance, DamageUiManager_1.DamageUiManager.MaxDamageOffsetDistance, DamageUiManager_1.DamageUiManager.MaxDamageOffsetScale, DamageUiManager_1.DamageUiManager.MinDamageOffsetScale);
      this.cFt = i * r;
      this.mFt = e * r;
      r = !StringUtils_1.StringUtils.IsEmpty(_);
      let t = undefined;
      t = r ? (_ = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(_), ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(_) ?? "") : n ? "+" + a : a.toString();
      _ = this.aSu();
      if (_) {
        n = this.gFt.GetSequencePath(o, h, r);
        this.sSu = SimpleDamageView.LFt.get(n) ?? 1;
        let i = s.GetTextColor();
        if (i = h ? s.GetCriticalTextColor() : i) {
          this.nSu = DamageUiManager_1.DamageUiManager.PlayDamageNumBatch(t, _, i, this.sSu);
        }
        if (this.nSu) {
          this.pFt = ANIM_TIME;
          if (h) {
            this.RFt(_);
            this.yFt(h);
            this.TFt();
            this.SetActive(true);
          }
        } else {
          this.pFt = 0;
        }
      }
      SimpleDamageView.MFt.Stop();
    }
  }
  ClearData() {
    this.gFt = undefined;
    this.SetActive(false);
    this.SetCriticalNiagaraVisible(false);
  }
  Tick(i) {
    var e;
    if (this.RootItem) {
      if (this.FUn) {
        (e = this.GetUiNiagara(3)).SetNiagaraSystem(this.FUn);
        e.ActivateSystem(true);
        this.FUn = undefined;
      }
      this.pFt -= i;
      if (this.pFt <= 0) {
        DamageUiManager_1.DamageUiManager.RemoveSimpleDamageView(this);
      } else {
        this.RFt(this.aSu());
      }
    }
  }
  aSu() {
    var i = UE.LGUIBPLibrary.ConvertWorldPosToLGUIPos(Global_1.Global.CharacterController, this.cX1);
    if (i) {
      i.X = i.X + this.cFt;
      i.Y = i.Y + this.mFt;
      return i;
    }
  }
  TFt() {
    var i = DamageUiManager_1.DamageUiManager.TotalDamageViewNum + DamageUiManager_1.DamageUiManager.TotalSimpleDamageViewNum - 1;
    this.RootItem.SetHierarchyIndex(i);
  }
  UFt(i) {
    if (this._Ft !== i) {
      const e = this.GetUiNiagara(3);
      if (StringUtils_1.StringUtils.IsEmpty(i)) {
        this._Ft = undefined;
        e.DeactivateSystem();
        e.SetNiagaraSystem(undefined);
      } else {
        this._Ft = i;
        ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.NiagaraSystem, i => {
          if (i?.IsValid() && e) {
            this.FUn = i;
          }
        });
      }
    }
  }
  AFt(i) {
    var e = this.GetItem(4);
    if (e.IsUIActiveSelf() !== i) {
      e.SetUIActive(i);
    }
  }
  SetCriticalNiagaraVisible(i) {
    var e = this.GetUiNiagara(3);
    if (e.IsUIActiveSelf() !== i) {
      e.SetUIActive(i);
    }
  }
  yFt(i) {
    if (i) {
      this.AFt(true);
      this.UFt(this.gFt.GetCriticalNiagaraPath());
    } else {
      this.AFt(false);
    }
  }
  RFt(i) {
    if (i) {
      this.RootItem.SetAnchorOffset(i);
      if (this.nSu?.IsGeometryValid()) {
        DamageUiManager_1.DamageUiManager.UpdateDamageLocation(this.nSu, i, this.sSu);
      } else {
        this.nSu = undefined;
      }
    }
  }
}
(exports.SimpleDamageView = SimpleDamageView).LFt = new Map([["Ani_OwnDamageSequence", 1], ["Ani_OwnCriticalDamageSequence", 2], ["Ani_MonsterDamageSequence", 3], ["Ani_MonsterCriticalDamageSequence", 4], ["Ani_BuffSequence", 5], ["Ani_SpecialDamage", 6], ["Ani_SpecialCriticalDamage", 7]]);
SimpleDamageView.MFt = Stats_1.Stat.Create("[DamageView]InitializeDamageView"); //# sourceMappingURL=SimpleDamageView.js.map