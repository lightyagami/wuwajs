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
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
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
const CRITICAL_OFFSET_SCALE = 1;
const MERGE_NUM = 10;
const MERGE_PER_TEXT_TIME = 100;
class DamageView extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.uFt = Vector_1.Vector.Create();
    this.MOm = Vector_1.Vector.Create();
    this.gX1 = new UE.VectorDouble();
    this.EOm = Vector2D_1.Vector2D.Create();
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
    this.r7c = [];
    this.IOm = -1;
    this.TOm = false;
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
  InitializeData(h, a, r, _, o = false, l = false, n = false, E = "", U = 0, g) {
    if (_) {
      DamageView.MFt.Start();
      this.TOm = n;
      this.gFt = _;
      this.uFt.FromUeVector(a);
      this.MOm.FromUeVector(r);
      this.gX1.Set(this.uFt.X, this.uFt.Y, this.uFt.Z);
      var a = DamageUiManager_1.DamageUiManager.GetDamageTextAreaById(U);
      var r = UE.LGUIBPLibrary.ConvertWorldPosToLGUIPos(Global_1.Global.CharacterController, this.gX1);
      let i = 0;
      let t = 0;
      let s = 0;
      let e = 0;
      e = a ? (i = a.MinDeviationX, t = a.MaxDeviationX, s = a.MinDeviationY, a.MaxDeviationY) : (i = _.MinRandomOffsetX, t = _.MaxRandomOffsetX, s = _.MinRandomOffsetY, _.MaxRandomOffsetY);
      if (o) {
        i *= CRITICAL_OFFSET_SCALE;
        s *= CRITICAL_OFFSET_SCALE;
        t *= CRITICAL_OFFSET_SCALE;
        e *= CRITICAL_OFFSET_SCALE;
      }
      this.EOm.X = MathUtils_1.MathUtils.GetRandomFloatNumber(i, t);
      this.EOm.Y = MathUtils_1.MathUtils.GetRandomFloatNumber(s, e);
      this.RFt(r.X + this.EOm.X, r.Y + this.EOm.Y);
      this.r7c.length = 0;
      if (g) {
        if (StringUtils_1.StringUtils.IsEmpty(E)) {
          U = l ? "+" + h : h.toString();
          this.r7c.push(U);
        }
        let i = 0;
        let t = 1;
        for (const S of g) {
          if (StringUtils_1.StringUtils.IsEmpty(E)) {
            if (++t < MERGE_NUM) {
              this.r7c.push(S.IsCure ? "+" + S.Damage : S.Damage.toString());
            } else if (l) {
              i += S.Damage;
            } else {
              i -= S.Damage;
            }
          }
        }
        if (i > 0) {
          this.r7c.push("+" + i);
        } else if (i < 0) {
          this.r7c.push("" + -i);
        }
      }
      if (this.r7c.length > 0) {
        this.IOm = 0;
        this.SFt(n, false, false);
        this.yFt(false);
        this.IFt(this.r7c[0], false, false);
      } else {
        this.IOm = -1;
        _ = (a = !StringUtils_1.StringUtils.IsEmpty(E)) ? E : l ? "+" + h : h.toString();
        this.SFt(n, o, a);
        this.yFt(o);
        this.IFt(_, o, a);
      }
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
  SFt(i, t, s) {
    this.pFt = ANIM_TIME;
    i = this.gFt.GetSequencePath(i, t, s);
    t = DamageView.LFt.get(i);
    if (t === undefined) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 17, "缺少伤害数字动画", ["sequencePath", i]);
      }
    } else {
      var e = this.GetItem(t).GetOwner().K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
      this.Sjs = [];
      var h = e.Num();
      for (let i = 0; i < h; i++) {
        var a = e.Get(i);
        this.Sjs.push(a);
        a.Play();
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
      } else {
        if (this.IOm !== -1 && (t = Math.floor((ANIM_TIME - this.pFt) / MERGE_PER_TEXT_TIME), this.IOm !== t) && (this.IOm = t, this.r7c.length > t)) {
          this.dFt.SetText(this.r7c[t]);
        }
        if (this.TOm) {
          this.bOm();
        } else {
          this.EFt();
        }
      }
    }
  }
  ilh(i) {
    if (this.tlh !== i && (this.tlh = i, this.Sjs)) {
      for (const s of this.Sjs) {
        var t = s.GetPlayTween()?.GetTweener();
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
    var i;
    var t = UE.LGUIBPLibrary.ConvertWorldPosToLGUIPos(Global_1.Global.CharacterController, this.gX1);
    if (t) {
      i = t.X + this.EOm.X;
      t = t.Y + this.EOm.Y;
      this.RFt(i, t);
    }
  }
  bOm() {
    var i;
    var t = UE.LGUIBPLibrary.ConvertWorldPosToLGUIPos(Global_1.Global.CharacterController, this.gX1);
    if (t) {
      i = t.X + this.EOm.X;
      t = t.Y + this.EOm.Y;
      this.RFt(i, t);
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
  IFt(i, t, s) {
    if (s) {
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
    var s = i.GetOwner().GetComponentByClass(UE.UIEffectOutline.StaticClass());
    let e = this.gFt.GetTextColor();
    let h = this.gFt.GetStrokeColor();
    if (t) {
      e = this.gFt.GetCriticalTextColor();
      h = this.gFt.GetCriticalStrokeColor();
    }
    if (!i.GetColor().op_Equality(e)) {
      i.SetColor(e);
    }
    if (!s.GetOutlineColor().op_Equality(h)) {
      s.SetOutlineColor(h);
    }
  }
  RFt(i, t) {
    this.RootItem.SetAnchorOffsetX(i);
    this.RootItem.SetAnchorOffsetY(t);
  }
  SetTimeScale(i) {
    if ((this.bge = i) === 1) {
      this.ilh(1);
    }
  }
}
(exports.DamageView = DamageView).LFt = new Map([["Ani_OwnDamageSequence", 5], ["Ani_OwnCriticalDamageSequence", 6], ["Ani_MonsterDamageSequence", 7], ["Ani_MonsterCriticalDamageSequence", 8], ["Ani_BuffSequence", 9], ["Ani_SpecialDamage", 10], ["Ani_SpecialCriticalDamage", 11]]);
DamageView.MFt = Stats_1.Stat.Create("[DamageView]InitializeDamageView"); //# sourceMappingURL=DamageView.js.map