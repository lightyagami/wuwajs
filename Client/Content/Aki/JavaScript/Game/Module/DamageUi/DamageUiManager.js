"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.DamageUiManager = exports.DamageInfo = void 0;
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Queue_1 = require("../../../Core/Container/Queue"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  Global_1 = require("../../Global"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  BattleUiDefine_1 = require("../BattleUi/BattleUiDefine"),
  DamageUiSequencePool_1 = require("./DamageUiSequencePool"),
  DamageViewData_1 = require("./DamageViewData"),
  DamageNumView_1 = require("./View/DamageNumView"),
  DamageView_1 = require("./View/DamageView"),
  SimpleDamageView_1 = require("./View/SimpleDamageView"),
  PRELOAD_DAMAGE_VIEW_COUNT = 21,
  MAX_DAMAGE_PER_FRAME = 1;
class DamageInfo {
  constructor() {
    this.Damage = 0, this.ElementId = 0, this.DamagePosition = void 0, this.IsOwnPlayer = !1, this.IsCritical = !1, this.IsCure = !1, this.DamageTextId = 0, this.DamageText = "", this.EnableOptimization = !1
  }
}
exports.DamageInfo = DamageInfo;
class DamageUiManager {
  static Initialize() {
    this.MinDamageOffsetScale = CommonParamById_1.configCommonParamById.GetIntConfig("MinDamageOffsetScale") / 100, this.MaxDamageOffsetScale = CommonParamById_1.configCommonParamById.GetIntConfig("MaxDamageOffsetScale") / 100, this.MinDamageOffsetDistance = CommonParamById_1.configCommonParamById.GetIntConfig("MinDamageOffsetDistance"), this.MaxDamageOffsetDistance = CommonParamById_1.configCommonParamById.GetIntConfig("MaxDamageOffsetDistance"), this.DamagePositionCache = Vector_1.Vector.Create(), this.k2t = ConfigManager_1.ConfigManager.DamageUiConfig.GetAllDamageTextConfig(), this.InitializeDamageViewData()
  }
  static InitializeDamageViewData() {
    for (const e of this.k2t) {
      var a = new DamageViewData_1.DamageViewData;
      a.Initialize(e), this.F2t.set(e.Id, a)
    }
  }
  static ClearDamageViewData() {
    this.F2t.clear()
  }
  static GetDamageViewData(a) {
    return this.F2t.get(a)
  }
  static PreloadDamageView() {
    for (let a = this.V2t.length; a < PRELOAD_DAMAGE_VIEW_COUNT; a++) {
      var e = new DamageView_1.DamageView;
      e.Init(), this.TotalDamageViewNum++, this.V2t.push(e)
    }
    for (let a = this.M81.length; a < PRELOAD_DAMAGE_VIEW_COUNT; a++) {
      var i = new SimpleDamageView_1.SimpleDamageView;
      i.Init(), this.TotalSimpleDamageViewNum++, this.M81.push(i)
    }
    this.z1u = new DamageNumView_1.DamageNumView, this.z1u.Init(), this.f71.length = 0;
    var a = CommonParamById_1.configCommonParamById.GetStringArrayConfig("DamageViewMaterialPaths");
    if (a)
      for (const r of a) {
        var t = ResourceSystem_1.ResourceSystem.Load(r, UE.MaterialInterface);
        this.f71.push(t)
      }
  }
  static PreloadSequence() {}
  static ApplyDamage(e, i, t, r, g, s, n = -1, o = "") {
    if (DamageUiManager.H2t && r.Active && !(n < 0 || 1 === n && s && 0 === e)) {
      var m = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (m) {
        m = m.Id === r.Id;
        let a = void 0;
        (a = 0 < this.j2t.length ? this.j2t.pop() : new DamageInfo).Damage = e, a.ElementId = i, a.DamagePosition = t, a.IsOwnPlayer = m, a.IsCritical = g, a.IsCure = s, a.DamageTextId = n, a.DamageText = o, a.EnableOptimization = this.EnableOptimization || 2 === n, this.W2t.Push(a)
      }
    }
  }
  static K2t(a) {
    var e, i, t, r;
    DamageUiManager.H2t && (e = Math.floor(Math.abs(a.Damage)), (i = DamageUiManager.Q2t(a.ElementId, a.IsCure, a.Damage, a.DamageTextId)) < 0 ? Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 17, "[DamageText]产生伤害飘字时，伤害飘字Id无效", ["textId", i], ["elementId", a.ElementId], ["bCure", a.IsCure], ["damageTextId", a.DamageTextId]) : (this.DamagePositionCache.DeepCopy(a.DamagePosition), (t = this.GetDamageViewData(i)) ? (r = this.ProjectWorldLocationToScreenPosition(a.DamagePosition)) && (a.EnableOptimization ? DamageUiManager.E81(e, this.DamagePositionCache, r, t, a.IsCritical, a.IsCure, a.IsOwnPlayer, a.DamageText) : DamageUiManager.X2t(e, this.DamagePositionCache, r, t, a.IsCritical, a.IsCure, a.IsOwnPlayer, a.DamageText)) : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 17, "找不到对应的伤害飘字配置", ["伤害飘字Id", i])))
  }
  static Tick(a) {
    if (this.YFa) {
      var e = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
      if (e?.Valid) {
        var i = e.Entity?.GetComponent(179)?.CurrentTimeScale ?? 1;
        for (const r of DamageUiManager.$2t) r.SetTimeScale(i)
      }
    }
    DamageUiManager.p81.Start();
    for (const g of DamageUiManager.$2t) g.Tick(a);
    for (const s of DamageUiManager.I81) s.Tick(a);
    DamageUiManager.p81.Stop();
    for (let a = 0; a < MAX_DAMAGE_PER_FRAME && !this.W2t.Empty; a++) {
      var t = this.W2t.Pop();
      this.K2t(t), this.j2t.push(t)
    }
  }
  static Q2t(a, e, i, t = -1) {
    let r = -1;
    return r = t && -1 !== t && 2 !== t ? t : 0 === i ? BattleUiDefine_1.IMMUNITY_DAMAGE_TEXT_ID : 0 < a ? a : e ? BattleUiDefine_1.CURE_DAMAGE_TEXT : BattleUiDefine_1.ATK_DAMAGE_TEXT
  }
  static ProjectWorldLocationToScreenPosition(a) {
    var e = Global_1.Global.CharacterController;
    if (UE.GameplayStatics.D_ProjectWorldToScreen(e, a, this.Y2t, !1)) {
      e = (0, puerts_1.$unref)(this.Y2t);
      if (e) {
        var a = e.X,
          i = e.Y;
        if (!isNaN(a) && !isNaN(i) && isFinite(a) && isFinite(i)) return e
      }
    }
  }
  static ScreenPositionToLguiPosition(a) {
    return UiLayer_1.UiLayer.UiRootItem.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(a)
  }
  static X2t(a, e, i, t, r = !1, g = !1, s = !1, n = "", o = !1) {
    let m = void 0;
    return 0 < this.V2t.length ? m = this.V2t.pop() : ((m = new DamageView_1.DamageView).Init(), this.TotalDamageViewNum++), this.$2t.add(m), m.InitializeData(a, e, i, t, r, g, s, n, o), m
  }
  static RemoveDamageView(a) {
    this.$2t.has(a) && (a.ClearData(), this.$2t.delete(a), this.V2t.push(a))
  }
  static E81(a, e, i, t, r = !1, g = !1, s = !1, n = "") {
    let o = void 0;
    return 0 < this.M81.length ? o = this.M81.pop() : ((o = new SimpleDamageView_1.SimpleDamageView).Init(), this.TotalDamageViewNum++), this.I81.add(o), o.InitializeData(a, e, i, t, r, g, s, n), o
  }
  static RemoveSimpleDamageView(a) {
    this.I81.has(a) && (a.ClearData(), this.I81.delete(a), this.M81.push(a))
  }
  static OnEditorPlatformChanged() {
    for (const a of DamageUiManager.$2t) a.RefreshFontSize();
    for (const e of DamageUiManager.V2t) e.RefreshFontSize()
  }
  static SetDamageTimeScaleEnable(a) {
    if (this.YFa = a, !this.YFa)
      for (const e of DamageUiManager.$2t) e.SetTimeScale(1)
  }
  static SetDamageViewVisible(a) {
    this.H2t = a
  }
  static GetDamageViewVisible() {
    return this.H2t
  }
  static GetMaterialByAnimType(a) {
    return this.f71[a]
  }
  static PlayDamageNumBatch(a, e, i, t = 1) {
    return this.z1u?.PlayNumBatch(a, e, i, t)
  }
  static UpdateDamageLocation(a, e, i = 1) {
    this.z1u?.UpdateDamageLocation(a, e, i)
  }
  static EnableDamageViewOptimization() {
    var a = this.wgu++;
    return this.Lgu.add(a), this.EnableOptimization = !0, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "开启伤害飘字优化", ["id", a]), a
  }
  static DisableDamageViewOptimization(a) {
    this.Lgu.delete(a);
    var e = 0 < this.Lgu.size;
    this.EnableOptimization = e, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "关闭伤害飘字优化", ["id", a], ["优化是否仍然开启", e])
  }
  static OnLeaveLevel() {
    for (const a of DamageUiManager.$2t) a.ClearData(), a.Destroy();
    DamageUiManager.$2t.clear();
    for (const e of DamageUiManager.V2t) e.Destroy();
    DamageUiManager.V2t.length = 0, DamageUiManager.TotalDamageViewNum = 0;
    for (const i of DamageUiManager.I81) i.ClearData(), i.Destroy();
    DamageUiManager.I81.clear();
    for (const t of DamageUiManager.M81) t.Destroy();
    DamageUiManager.M81.length = 0, DamageUiManager.TotalSimpleDamageViewNum = 0, this.z1u?.Destroy(), this.z1u = void 0, DamageUiSequencePool_1.DamageUiSequencePool.Clear(), DamageUiManager.W2t.Clear(), DamageUiManager.j2t.length = 0, DamageUiManager.f71.length = 0
  }
  static Clear() {
    this.Lgu.clear(), this.EnableOptimization = !1, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "清理时关闭伤害飘字优化")
  }
}(exports.DamageUiManager = DamageUiManager).W2t = new Queue_1.Queue, DamageUiManager.j2t = [], DamageUiManager.TotalDamageViewNum = 0, DamageUiManager.$2t = new Set, DamageUiManager.V2t = new Array, DamageUiManager.TotalSimpleDamageViewNum = 0, DamageUiManager.I81 = new Set, DamageUiManager.M81 = new Array, DamageUiManager.z1u = void 0, DamageUiManager.F2t = new Map, DamageUiManager.H2t = !0, DamageUiManager.MinDamageOffsetScale = 0, DamageUiManager.MaxDamageOffsetScale = 0, DamageUiManager.MinDamageOffsetDistance = 0, DamageUiManager.MaxDamageOffsetDistance = 0, DamageUiManager.DamagePositionCache = void 0, DamageUiManager.k2t = void 0, DamageUiManager.Y2t = (0, puerts_1.$ref)(void 0), DamageUiManager.YFa = !1, DamageUiManager.EnableOptimization = !1, DamageUiManager.wgu = 0, DamageUiManager.Lgu = new Set, DamageUiManager.f71 = [], DamageUiManager.p81 = Stats_1.Stat.Create("DamageUiManager.TickStat1");
//# sourceMappingURL=DamageUiManager.js.map