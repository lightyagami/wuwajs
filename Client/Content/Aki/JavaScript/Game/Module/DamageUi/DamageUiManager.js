"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageUiManager = exports.DamageInfo = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Time_1 = require("../../../Core/Common/Time");
const Queue_1 = require("../../../Core/Container/Queue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const Global_1 = require("../../Global");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const BattleUiDefine_1 = require("../BattleUi/BattleUiDefine");
const DamageUiSequencePool_1 = require("./DamageUiSequencePool");
const DamageViewData_1 = require("./DamageViewData");
const DamageNumView_1 = require("./View/DamageNumView");
const DamageView_1 = require("./View/DamageView");
const SimpleDamageView_1 = require("./View/SimpleDamageView");
const PRELOAD_DAMAGE_VIEW_COUNT = 21;
const MAX_DAMAGE_PER_FRAME = 1;
class DamageInfo {
  constructor() {
    this.Damage = 0;
    this.ElementId = 0;
    this.DamagePosition = undefined;
    this.IsOwnPlayer = false;
    this.IsCritical = false;
    this.IsCure = false;
    this.DamageTextId = 0;
    this.DamageText = "";
    this.EnableOptimization = false;
  }
}
exports.DamageInfo = DamageInfo;
class DamageUiManager {
  static Initialize() {
    this.MinDamageOffsetScale = CommonParamById_1.configCommonParamById.GetIntConfig("MinDamageOffsetScale") / 100;
    this.MaxDamageOffsetScale = CommonParamById_1.configCommonParamById.GetIntConfig("MaxDamageOffsetScale") / 100;
    this.MinDamageOffsetDistance = CommonParamById_1.configCommonParamById.GetIntConfig("MinDamageOffsetDistance");
    this.MaxDamageOffsetDistance = CommonParamById_1.configCommonParamById.GetIntConfig("MaxDamageOffsetDistance");
    this.DamagePositionCache = Vector_1.Vector.Create();
    this.k2t = ConfigManager_1.ConfigManager.DamageUiConfig.GetAllDamageTextConfig();
    this.InitializeDamageViewData();
  }
  static InitializeDamageViewData() {
    for (const e of this.k2t) {
      var a = new DamageViewData_1.DamageViewData();
      a.Initialize(e);
      this.F2t.set(e.Id, a);
    }
  }
  static ClearDamageViewData() {
    this.F2t.clear();
  }
  static GetDamageViewData(a) {
    return this.F2t.get(a);
  }
  static PreloadDamageView() {
    for (let a = this.V2t.length; a < PRELOAD_DAMAGE_VIEW_COUNT; a++) {
      var e = new DamageView_1.DamageView();
      e.Init();
      this.TotalDamageViewNum++;
      this.V2t.push(e);
    }
    for (let a = this.ej1.length; a < PRELOAD_DAMAGE_VIEW_COUNT; a++) {
      var i = new SimpleDamageView_1.SimpleDamageView();
      i.Init();
      this.TotalSimpleDamageViewNum++;
      this.ej1.push(i);
    }
    this.e7c = new DamageNumView_1.DamageNumView();
    this.e7c.Init();
    this.Y71.length = 0;
    var a = CommonParamById_1.configCommonParamById.GetStringArrayConfig("DamageViewMaterialPaths");
    if (a) {
      for (const r of a) {
        var t = ResourceSystem_1.ResourceSystem.Load(r, UE.MaterialInterface);
        this.Y71.push(t);
      }
    }
  }
  static PreloadSequence() {}
  static ApplyDamage(e, i, t, r, g, s, n = -1, m = "") {
    if (DamageUiManager.H2t && r.Active && !(n < 0) && (n !== 1 || !s || e !== 0)) {
      var o = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (o) {
        o = o.Id === r.Id;
        let a = undefined;
        (a = this.j2t.length > 0 ? this.j2t.pop() : new DamageInfo()).Damage = e;
        a.ElementId = i;
        a.DamagePosition = t;
        a.IsOwnPlayer = o;
        a.IsCritical = g;
        a.IsCure = s;
        a.DamageTextId = n;
        a.DamageText = m;
        a.EnableOptimization = this.EnableOptimization || n === 2;
        this.W2t.Push(a);
      }
    }
  }
  static ApplyDamageForKsc(e, i, t, r, g) {
    if (DamageUiManager.H2t && ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity) {
      let a = undefined;
      (a = this.j2t.length > 0 ? this.j2t.pop() : new DamageInfo()).Damage = e;
      a.ElementId = i;
      a.DamagePosition = t;
      a.IsOwnPlayer = false;
      a.IsCritical = r;
      a.IsCure = g;
      a.DamageTextId = 2;
      a.DamageText = "";
      a.EnableOptimization = true;
      this.W2t.Push(a);
    }
  }
  static K2t(a) {
    var e;
    var i;
    var t;
    var r;
    if (DamageUiManager.H2t) {
      e = Math.floor(Math.abs(a.Damage));
      if ((i = DamageUiManager.Q2t(a.ElementId, a.IsCure, a.Damage, a.DamageTextId)) < 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 17, "[DamageText]产生伤害飘字时，伤害飘字Id无效", ["textId", i], ["elementId", a.ElementId], ["bCure", a.IsCure], ["damageTextId", a.DamageTextId]);
        }
      } else {
        this.DamagePositionCache.DeepCopy(a.DamagePosition);
        if (t = this.GetDamageViewData(i)) {
          if (r = this.ProjectWorldLocationToScreenPosition(a.DamagePosition)) {
            if (a.EnableOptimization) {
              DamageUiManager.tj1(e, this.DamagePositionCache, r, t, a.IsCritical, a.IsCure, a.IsOwnPlayer, a.DamageText);
            } else {
              DamageUiManager.X2t(e, this.DamagePositionCache, r, t, a.IsCritical, a.IsCure, a.IsOwnPlayer, a.DamageText);
            }
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Battle", 17, "找不到对应的伤害飘字配置", ["伤害飘字Id", i]);
        }
      }
    }
  }
  static Tick(a) {
    var e = a * Time_1.Time.InverseSelfCenteredTimeDilation;
    if (this.YFa) {
      a = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
      if (a?.Valid) {
        var i = a.Entity?.GetComponent(180)?.CurrentTimeScale ?? 1;
        for (const r of DamageUiManager.$2t) {
          r.SetTimeScale(i);
        }
      }
    }
    DamageUiManager.Z81.Start();
    for (const g of DamageUiManager.$2t) {
      g.Tick(e);
    }
    for (const s of DamageUiManager.ij1) {
      s.Tick(e);
    }
    DamageUiManager.Z81.Stop();
    for (let a = 0; a < MAX_DAMAGE_PER_FRAME && !this.W2t.Empty; a++) {
      var t = this.W2t.Pop();
      this.K2t(t);
      this.j2t.push(t);
    }
  }
  static Q2t(a, e, i, t = -1) {
    let r = -1;
    return r = t && t !== -1 && t !== 2 ? t : i === 0 ? BattleUiDefine_1.IMMUNITY_DAMAGE_TEXT_ID : a > 0 ? a : e ? BattleUiDefine_1.CURE_DAMAGE_TEXT : BattleUiDefine_1.ATK_DAMAGE_TEXT;
  }
  static ProjectWorldLocationToScreenPosition(a) {
    var e = Global_1.Global.CharacterController;
    if (UE.GameplayStatics.D_ProjectWorldToScreen(e, a, this.Y2t, false)) {
      e = (0, puerts_1.$unref)(this.Y2t);
      if (e) {
        var a = e.X;
        var i = e.Y;
        if (!isNaN(a) && !isNaN(i) && isFinite(a) && isFinite(i)) {
          return e;
        }
      }
    }
  }
  static ScreenPositionToLguiPosition(a) {
    return UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(a);
  }
  static X2t(a, e, i, t, r = false, g = false, s = false, n = "", m = false) {
    let o = undefined;
    if (this.V2t.length > 0) {
      o = this.V2t.pop();
    } else {
      (o = new DamageView_1.DamageView()).Init();
      this.TotalDamageViewNum++;
    }
    this.$2t.add(o);
    o.InitializeData(a, e, i, t, r, g, s, n, m);
    return o;
  }
  static RemoveDamageView(a) {
    if (this.$2t.has(a)) {
      a.ClearData();
      this.$2t.delete(a);
      this.V2t.push(a);
    }
  }
  static tj1(a, e, i, t, r = false, g = false, s = false, n = "") {
    let m = undefined;
    if (this.ej1.length > 0) {
      m = this.ej1.pop();
    } else {
      (m = new SimpleDamageView_1.SimpleDamageView()).Init();
      this.TotalDamageViewNum++;
    }
    this.ij1.add(m);
    m.InitializeData(a, e, i, t, r, g, s, n);
    return m;
  }
  static RemoveSimpleDamageView(a) {
    if (this.ij1.has(a)) {
      a.ClearData();
      this.ij1.delete(a);
      this.ej1.push(a);
    }
  }
  static OnEditorPlatformChanged() {
    for (const a of DamageUiManager.$2t) {
      a.RefreshFontSize();
    }
    for (const e of DamageUiManager.V2t) {
      e.RefreshFontSize();
    }
  }
  static SetDamageTimeScaleEnable(a) {
    this.YFa = a;
    if (!this.YFa) {
      for (const e of DamageUiManager.$2t) {
        e.SetTimeScale(1);
      }
    }
  }
  static SetDamageViewVisible(a) {
    this.H2t = a;
  }
  static GetDamageViewVisible() {
    return this.H2t;
  }
  static GetMaterialByAnimType(a) {
    return this.Y71[a];
  }
  static PlayDamageNumBatch(a, e, i, t = 1) {
    return this.e7c?.PlayNumBatch(a, e, i, t);
  }
  static UpdateDamageLocation(a, e, i = 1) {
    this.e7c?.UpdateDamageLocation(a, e, i);
  }
  static EnableDamageViewOptimization() {
    var a = this.Y2u++;
    this.z2u.add(a);
    this.EnableOptimization = true;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "开启伤害飘字优化", ["id", a]);
    }
    return a;
  }
  static DisableDamageViewOptimization(a) {
    this.z2u.delete(a);
    var e = this.z2u.size > 0;
    this.EnableOptimization = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "关闭伤害飘字优化", ["id", a], ["优化是否仍然开启", e]);
    }
  }
  static OnLeaveLevel() {
    for (const a of DamageUiManager.$2t) {
      a.ClearData();
      a.Destroy();
    }
    DamageUiManager.$2t.clear();
    for (const e of DamageUiManager.V2t) {
      e.Destroy();
    }
    DamageUiManager.V2t.length = 0;
    DamageUiManager.TotalDamageViewNum = 0;
    for (const i of DamageUiManager.ij1) {
      i.ClearData();
      i.Destroy();
    }
    DamageUiManager.ij1.clear();
    for (const t of DamageUiManager.ej1) {
      t.Destroy();
    }
    DamageUiManager.ej1.length = 0;
    DamageUiManager.TotalSimpleDamageViewNum = 0;
    this.e7c?.Destroy();
    this.e7c = undefined;
    DamageUiSequencePool_1.DamageUiSequencePool.Clear();
    DamageUiManager.W2t.Clear();
    DamageUiManager.j2t.length = 0;
    DamageUiManager.Y71.length = 0;
  }
  static Clear() {
    this.z2u.clear();
    this.EnableOptimization = false;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "清理时关闭伤害飘字优化");
    }
  }
}
(exports.DamageUiManager = DamageUiManager).W2t = new Queue_1.Queue();
DamageUiManager.j2t = [];
DamageUiManager.TotalDamageViewNum = 0;
DamageUiManager.$2t = new Set();
DamageUiManager.V2t = new Array();
DamageUiManager.TotalSimpleDamageViewNum = 0;
DamageUiManager.ij1 = new Set();
DamageUiManager.ej1 = new Array();
DamageUiManager.e7c = undefined;
DamageUiManager.F2t = new Map();
DamageUiManager.H2t = true;
DamageUiManager.MinDamageOffsetScale = 0;
DamageUiManager.MaxDamageOffsetScale = 0;
DamageUiManager.MinDamageOffsetDistance = 0;
DamageUiManager.MaxDamageOffsetDistance = 0;
DamageUiManager.DamagePositionCache = undefined;
DamageUiManager.k2t = undefined;
DamageUiManager.Y2t = (0, puerts_1.$ref)(undefined);
DamageUiManager.YFa = false;
DamageUiManager.EnableOptimization = false;
DamageUiManager.Y2u = 0;
DamageUiManager.z2u = new Set();
DamageUiManager.Y71 = [];
DamageUiManager.Z81 = Stats_1.Stat.Create("DamageUiManager.TickStat1"); //# sourceMappingURL=DamageUiManager.js.map