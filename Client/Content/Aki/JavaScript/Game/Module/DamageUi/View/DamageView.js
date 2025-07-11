"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageView = undefined;
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const DamageUiManager_1 = require("../DamageUiManager");
const ANIM_TIME = 1200;
const ANIM_SCALE_TIME = 700;
const MOBLIE_FONT_SIZE_SCALE = 1.5;
const CRITICAL_OFFSET_SCALE = 3;
class DamageView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.uFt = Vector_1.Vector.Create();
    this.cX1 = new UE.VectorDouble();
    this.cFt = 0;
    this.mFt = 0;
    this.dFt = undefined;
    this.CFt = undefined;
    this._Ft = undefined;
    this.FUn = undefined;
    this.gFt = undefined;
    this.pFt = -0;
    this.Sjs = undefined;
    this.vFt = 0;
    this.bge = 1;
    this.tlh = 1;
    this.DisableUpdatePos = false;
  }
  Init() {
    var i = ControllerHolder_1.ControllerHolder.BattleUiControl.Pool.GetDamageView();
    this.CreateByActor(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIItem], [2, UE.UIText], [3, UE.UINiagara], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem]];
  }
  OnStart() {
    this.dFt = this.GetText(0);
    this.CFt = this.GetText(2);
    this.vFt = this.dFt.GetSize();
    this.bge = 1;
    this.tlh = 1;
    if (Info_1.Info.IsMobilePlatform()) {
      this.RefreshFontSize();
    }
  }
  RefreshFontSize() {
    var i;
    if (Info_1.Info.IsMobilePlatform()) {
      i = Math.floor(this.vFt * MOBLIE_FONT_SIZE_SCALE);
      this.dFt.SetFontSize(i);
      this.CFt.SetFontSize(i);
    } else {
      this.dFt.SetFontSize(this.vFt);
      this.CFt.SetFontSize(this.vFt);
    }
  }
  DestroyOverride() {
    ControllerHolder_1.ControllerHolder.BattleUiControl.Pool.RecycleDamageView(this.RootActor);
    return true;
  }
  InitializeData(e, s, i, a, h = false, r = false, o = false, _ = "", n = false) {
    if (a) {
      DamageView.MFt.Start();
      this.gFt = a;
      this.DisableUpdatePos = n;
      this.uFt.FromUeVector(s);
      this.cX1.Set(this.uFt.X, this.uFt.Y, this.uFt.Z);
      let i = a.GetRandomOffsetX();
      let t = a.GetRandomOffsetY();
      if (h) {
        i *= CRITICAL_OFFSET_SCALE;
        t *= CRITICAL_OFFSET_SCALE;
      }
      n = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      s = Vector_1.Vector.DistSquared(n, this.uFt);
      a = MathUtils_1.MathUtils.RangeClamp(s, DamageUiManager_1.DamageUiManager.MinDamageOffsetDistance, DamageUiManager_1.DamageUiManager.MaxDamageOffsetDistance, DamageUiManager_1.DamageUiManager.MaxDamageOffsetScale, DamageUiManager_1.DamageUiManager.MinDamageOffsetScale);
      this.cFt = i * a;
      this.mFt = t * a;
      n = !StringUtils_1.StringUtils.IsEmpty(_);
      s = n ? _ : r ? "+" + e : e.toString();
      this.EFt();
      this.SFt(o, h, n);
      this.yFt(h);
      this.IFt(s, h, n);
      this.TFt();
      this.SetActive(true);
      this.dFt.SetAlpha(0);
      DamageView.MFt.Stop();
    }
  }
  ClearData() {
    this.gFt = undefined;
    this.Ejs();
    this.SetActive(false);
    this.SetCriticalNiagaraVisible(false);
  }
  SFt(i, t, e) {
    this.pFt = ANIM_TIME;
    i = this.gFt.GetSequencePath(i, t, e);
    t = DamageView.LFt.get(i);
    if (t === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 17, "缺少伤害数字动画", ["sequencePath", i]);
      }
    } else {
      var s = this.GetItem(t).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
      this.Sjs = [];
      var a = s.Num();
      for (let i = 0; i < a; i++) {
        var h = s.Get(i);
        this.Sjs.push(h);
        h.Play();
      }
    }
  }
  Ejs() {
    if (this.Sjs) {
      this.SetTimeScale(1);
      for (const i of this.Sjs) {
        i.Stop();
      }
      this.Sjs = undefined;
    }
  }
  Tick(i) {
    var t;
    if (this.RootItem) {
      if (this.FUn) {
        (t = this.GetUiNiagara(3)).SetNiagaraSystem(this.FUn);
        t.ActivateSystem(true);
        this.FUn = undefined;
      }
      if (this.bge === 1 || this.pFt > ANIM_SCALE_TIME) {
        this.pFt -= i;
      } else {
        this.pFt -= i * this.bge;
        this.ilh(this.bge);
      }
      if (this.pFt <= 0) {
        DamageUiManager_1.DamageUiManager.RemoveDamageView(this);
      } else if (!this.DisableUpdatePos) {
        this.EFt();
      }
    }
  }
  ilh(i) {
    if (this.tlh !== i && (this.tlh = i, this.Sjs)) {
      for (const e of this.Sjs) {
        var t = e.GetPlayTween()?.GetTweener();
        if (t) {
          t.SetSpeed(this.tlh);
        }
      }
      i = this.GetUiNiagara(3)?.GetOwner();
      if (i) {
        i.CustomTimeDilation = this.tlh;
      }
    }
  }
  EFt() {
    var i = UE.LGUIBPLibrary.ConvertWorldPosToLGUIPos(Global_1.Global.CharacterController, this.cX1);
    if (i) {
      i.X = i.X + this.cFt;
      i.Y = i.Y + this.mFt;
      this.RFt(i);
    }
  }
  TFt() {
    var i = DamageUiManager_1.DamageUiManager.TotalDamageViewNum - 1;
    this.RootItem.SetHierarchyIndex(i);
  }
  UFt(i) {
    if (this._Ft !== i) {
      const t = this.GetUiNiagara(3);
      if (StringUtils_1.StringUtils.IsEmpty(i)) {
        this._Ft = undefined;
        t.DeactivateSystem();
        t.SetNiagaraSystem(undefined);
      } else {
        this._Ft = i;
        ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.NiagaraSystem, i => {
          if (i?.IsValid() && t) {
            this.FUn = i;
          }
        });
      }
    }
  }
  AFt(i) {
    var t = this.GetItem(4);
    if (t.IsUIActiveSelf() !== i) {
      t.SetUIActive(i);
    }
  }
  SetCriticalNiagaraVisible(i) {
    var t = this.GetUiNiagara(3);
    if (t.IsUIActiveSelf() !== i) {
      t.SetUIActive(i);
    }
  }
  IFt(i, t, e) {
    if (e) {
      this.PFt(this.dFt, t);
      if (this.CFt.GetText() !== i) {
        LguiUtil_1.LguiUtil.SetLocalText(this.CFt, i);
      }
      if (this.dFt.IsUIActiveSelf()) {
        this.dFt.SetUIActive(false);
      }
      if (!this.CFt.IsUIActiveSelf()) {
        this.CFt.SetUIActive(true);
      }
    } else {
      this.PFt(this.dFt, t);
      if (this.dFt.GetText() !== i) {
        this.dFt.SetText(i);
      }
      if (!this.dFt.IsUIActiveSelf()) {
        this.dFt.SetUIActive(true);
      }
      if (this.CFt.IsUIActiveSelf()) {
        this.CFt.SetUIActive(false);
      }
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
  PFt(i, t) {
    var e = i.GetOwner().GetComponentByClass(UE.UIEffectOutline.StaticClass());
    let s = this.gFt.GetTextColor();
    let a = this.gFt.GetStrokeColor();
    if (t) {
      s = this.gFt.GetCriticalTextColor();
      a = this.gFt.GetCriticalStrokeColor();
    }
    if (!i.GetColor().op_Equality(s)) {
      i.SetColor(s);
    }
    if (!e.GetOutlineColor().op_Equality(a)) {
      e.SetOutlineColor(a);
    }
  }
  RFt(i) {
    this.RootItem.SetAnchorOffset(i);
  }
  SetTimeScale(i) {
    if ((this.bge = i) === 1) {
      this.ilh(1);
    }
  }
}
(exports.DamageView = DamageView).LFt = new Map([["Ani_OwnDamageSequence", 5], ["Ani_OwnCriticalDamageSequence", 6], ["Ani_MonsterDamageSequence", 7], ["Ani_MonsterCriticalDamageSequence", 8], ["Ani_BuffSequence", 9], ["Ani_SpecialDamage", 10], ["Ani_SpecialCriticalDamage", 11]]);
DamageView.MFt = Stats_1.Stat.Create("[DamageView]InitializeDamageView"); //# sourceMappingURL=DamageView.js.map