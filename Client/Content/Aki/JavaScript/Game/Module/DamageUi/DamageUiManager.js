"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DamageUiManager = exports.DamageInfo = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const Info_1 = require("../../../Core/Common/Info");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Time_1 = require("../../../Core/Common/Time");
const Queue_1 = require("../../../Core/Container/Queue");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const Global_1 = require("../../Global");
const GlobalData_1 = require("../../GlobalData");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiLayer_1 = require("../../Ui/UiLayer");
const BattleUiDefine_1 = require("../BattleUi/BattleUiDefine");
const LguiUtil_1 = require("../Util/LguiUtil");
const DamageViewData_1 = require("./DamageViewData");
const DamageView_1 = require("./View/DamageView");
const PRELOAD_DAMAGE_VIEW_COUNT = 21;
const MAX_DAMAGE_PER_FRAME = 1;
class DamageInfo {
  constructor() {
    this.Damage = 0;
    this.ElementId = 0;
    this.DamagePosition = undefined;
    this.BaseLocation = Vector_1.Vector.Create(0, 0, 0);
    this.IsOwnPlayer = false;
    this.IsCritical = false;
    this.IsCure = false;
    this.DamageTextId = 0;
    this.DamageText = "";
    this.DamageTextAreaId = 0;
    this.EntityId = 0;
    this.EnableOptimization = false;
    this.Valid = false;
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
    for (const a of ConfigManager_1.ConfigManager.DamageUiConfig.GetAllDamageTextArea()) {
      this.SOm.set(a.Id, a);
    }
    this.InitializeDamageViewData();
  }
  static InitializeDamageViewData() {
    for (const i of this.k2t) {
      var a;
      var e = new DamageViewData_1.DamageViewData();
      e.Initialize(i);
      this.F2t.set(i.Id, e);
      if (!StringUtils_1.StringUtils.IsEmpty(e.CriticalNiagaraPath)) {
        if ((a = this.rXd.get(e.CriticalNiagaraPath)) === undefined) {
          e.CriticalNiagaraId = this.oXd;
          this.rXd.set(e.CriticalNiagaraPath, e.CriticalNiagaraId);
          this.oXd++;
        } else {
          e.CriticalNiagaraId = a;
        }
      }
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
  }
  static ApplyDamage(e, i, t, r, s, g, o = -1, n = "", m = 0) {
    if (DamageUiManager.H2t && r.Active && !(o < 0) && (o !== 1 || !g || e !== 0)) {
      var D = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      if (D) {
        var h = D.Id === r.Id;
        if (this.EnableOptimization || o === 2) {
          if (this.nXd) {
            var _;
            var U = Math.floor(Math.abs(e));
            var l = DamageUiManager.Q2t(i, g, e, o);
            let a = n;
            if (!StringUtils_1.StringUtils.IsEmpty(n)) {
              _ = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(n);
              a = ConfigManager_1.ConfigManager.TextConfig.GetMultiTextByKey(_) ?? " ";
            }
            this.nXd.AddDamageInfo(new UE.DamageInfo(U, l, t, h, s, g, a));
            return;
          }
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Battle", 17, "产生性能伤害飘字时，缺少ueDamageUiManager");
          }
        }
        let a = undefined;
        (a = this.j2t.length > 0 ? this.j2t.pop() : new DamageInfo()).Damage = e;
        a.ElementId = i;
        a.DamagePosition = t;
        a.IsOwnPlayer = h;
        a.IsCritical = s;
        a.IsCure = g;
        a.DamageTextId = o;
        a.DamageText = n;
        a.DamageTextAreaId = m;
        a.EntityId = r.Id;
        a.EnableOptimization = false;
        a.Valid = true;
        if (h) {
          if (_ = D.Entity.GetComponent(3).ActorLocationProxy) {
            a.BaseLocation.FromUeVector(_);
          } else {
            a.BaseLocation.Reset();
          }
        }
        this.W2t.Push(a);
      }
    }
  }
  static K2t(e, i) {
    if (DamageUiManager.H2t) {
      var t = Math.floor(Math.abs(e.Damage));
      var a = DamageUiManager.Q2t(e.ElementId, e.IsCure, e.Damage, e.DamageTextId);
      if (a < 0) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 17, "[DamageText]产生伤害飘字时，伤害飘字Id无效", ["textId", a], ["elementId", e.ElementId], ["bCure", e.IsCure], ["damageTextId", e.DamageTextId]);
        }
      } else {
        this.DamagePositionCache.DeepCopy(e.DamagePosition);
        var r = this.GetDamageViewData(a);
        if (r) {
          if (this.ProjectWorldLocationToScreenPosition(e.DamagePosition)) {
            let a = undefined;
            if (this.V2t.length > 0) {
              a = this.V2t.pop();
            } else {
              (a = new DamageView_1.DamageView()).Init();
              this.TotalDamageViewNum++;
            }
            this.$2t.add(a);
            a.InitializeData(t, this.DamagePositionCache, e.BaseLocation, r, e.IsCritical, e.IsCure, e.IsOwnPlayer, e.DamageText, e.DamageTextAreaId, i);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Battle", 17, "找不到对应的伤害飘字配置", ["伤害飘字Id", a]);
        }
      }
    }
  }
  static Tick(a) {
    var e = a * Time_1.Time.InverseSelfCenteredTimeDilation;
    if (this.YFa) {
      var i = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity;
      if (i?.Valid) {
        var t = i.Entity?.GetComponent(190)?.CurrentTimeScale ?? 1;
        for (const o of DamageUiManager.$2t) {
          o.SetTimeScale(t);
        }
      }
    }
    DamageUiManager.Z81.Start();
    for (const n of DamageUiManager.$2t) {
      n.Tick(e);
    }
    DamageUiManager.Z81.Stop();
    for (let a = 0; a < MAX_DAMAGE_PER_FRAME && !this.W2t.Empty; a++) {
      var r = this.W2t.Pop();
      if (r.Valid) {
        if (ModelManager_1.ModelManager.CharacterModel.IsValid(r.EntityId)) {
          this.K2t(r);
        } else {
          var s = [];
          for (let a = 0; a < this.W2t.Size; a++) {
            var g = this.W2t.Get(a);
            if (g.EntityId === r.EntityId) {
              s.push(g);
              g.Valid = false;
            }
          }
          this.K2t(r, s);
        }
      } else {
        a--;
      }
      this.j2t.push(r);
    }
    if (this.UeDamageUiManager) {
      i = ControllerHolder_1.ControllerHolder.CameraController.CameraLocation;
      this.UeDamageUiManager.Update(a * TimeUtil_1.TimeUtil.Millisecond, i.ToUeVector(), Global_1.Global.CharacterController);
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
  static RemoveDamageView(a) {
    if (this.$2t.has(a)) {
      a.ClearData();
      this.$2t.delete(a);
      this.V2t.push(a);
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
    if (this.nXd) {
      this.nXd.bDamageViewVisible = this.H2t;
      if (!a) {
        this.nXd.ClearDamageInfo();
      }
    }
  }
  static GetDamageViewVisible() {
    return this.H2t;
  }
  static PlayDamageNumBatch(a, e, i, t = 0) {}
  static UpdateDamageLocation(a, e, i = 0) {}
  static EnableDamageViewOptimization() {
    var a = this.jVu++;
    this.HVu.add(a);
    this.EnableOptimization = true;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "开启伤害飘字优化", ["id", a]);
    }
    return a;
  }
  static DisableDamageViewOptimization(a) {
    this.HVu.delete(a);
    var e = this.HVu.size > 0;
    this.EnableOptimization = e;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "关闭伤害飘字优化", ["id", a], ["优化是否仍然开启", e]);
    }
  }
  static GetDamageTextAreaById(a) {
    return this.SOm.get(a);
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
    DamageUiManager.W2t.Clear();
    DamageUiManager.j2t.length = 0;
    this.sXd.length = 0;
    this.oXd = 0;
  }
  static Clear() {
    this.HVu.clear();
    this.EnableOptimization = false;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "清理时关闭伤害飘字优化");
    }
  }
  static InitUeDamageUiManager(a) {
    if (this.Bem) {
      a.InitDamageConfig(this.Bem);
    }
    a.InitAllRes(UiLayer_1.UiLayer.GetBattleViewUnit(0), this.aXd, this.hXd, this.HideDamageCritEffect ? 1 : 20, Info_1.Info.IsMobilePlatform());
    for (const i of this.k2t) {
      var e;
      if (i.UseForOptimization && (e = i.Id, e = this.F2t.get(e))) {
        e = new UE.DamageViewData(e.ConfigId, e.MinRandomOffsetX, e.MinRandomOffsetY, e.MaxRandomOffsetX, e.MaxRandomOffsetY, e.TextColor, e.CriticalTextColor, this.HideDamageCritEffect ? -1 : e.CriticalNiagaraId, this.LFt.get(e.DamageTextConfig.OwnDamageSequence) ?? 0, this.LFt.get(e.DamageTextConfig.OwnCriticalDamageSequence) ?? 0, this.LFt.get(e.DamageTextConfig.MonsterDamageSequence) ?? 0, this.LFt.get(e.DamageTextConfig.MonsterCriticalDamageSequence) ?? 0, this.LFt.get(e.DamageTextConfig.DamageTextSequence) ?? 0);
        a.AddDamageViewData(e);
      }
    }
    for (const t of this.sXd) {
      a.AddCritNiagara(t);
    }
    a.bDamageViewVisible = this.H2t;
  }
  static async PreloadAsync() {
    var a;
    var e;
    var i = [];
    for ([a, e] of this.rXd) {
      i.push(this._Xd(a, e));
    }
    i.push(this.uXd());
    i.push(this.cXd());
    await Promise.all(i);
  }
  static async _Xd(e, i) {
    const t = new CustomPromise_1.CustomPromise();
    ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.NiagaraSystem, a => {
      if (a) {
        this.sXd[i] = a;
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "LoadCriticalNiagara失败", ["path", e]);
      }
      t.SetResult();
    });
    return t.Promise;
  }
  static async uXd() {
    this.aXd = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_DamageView_Num_Prefab", UiLayer_1.UiLayer.GetBattleViewUnit(0), GlobalData_1.GlobalData.World, 100, "Ui.DamageUi");
  }
  static async cXd() {
    this.hXd = await LguiUtil_1.LguiUtil.LoadPrefabByResourceIdAsync("UiItem_DamageView_Sim_Prefab", UiLayer_1.UiLayer.GetBattleViewUnit(0), GlobalData_1.GlobalData.World, 100, "Ui.HeadStateUi");
  }
  static get UeDamageUiManager() {
    return this.nXd;
  }
  static StartUeDamageUiManager() {
    if (!this.nXd) {
      this.nXd = UE.DamageUiManager.CreateInstance(GlobalData_1.GlobalData.World);
      DamageUiManager.InitUeDamageUiManager(this.nXd);
    }
  }
  static StopUeDamageUiManager() {
    if (this.nXd) {
      UE.DamageUiManager.DestroyInstance();
      this.nXd = undefined;
    }
    this.Bem = undefined;
    this.HideDamageCritEffect = false;
    this.aXd = undefined;
    this.hXd = undefined;
  }
  static SetUeDamageConfig(a, e = false) {
    if (this.UeDamageUiManager) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Battle", 17, "UeDamageUiManager已经初始化过，此时再设置DamageConfig不会生效");
      }
    } else {
      this.Bem = a;
      this.HideDamageCritEffect = e;
    }
  }
}
(exports.DamageUiManager = DamageUiManager).W2t = new Queue_1.Queue();
DamageUiManager.j2t = [];
DamageUiManager.TotalDamageViewNum = 0;
DamageUiManager.$2t = new Set();
DamageUiManager.V2t = new Array();
DamageUiManager.F2t = new Map();
DamageUiManager.H2t = true;
DamageUiManager.MinDamageOffsetScale = 0;
DamageUiManager.MaxDamageOffsetScale = 0;
DamageUiManager.MinDamageOffsetDistance = 0;
DamageUiManager.MaxDamageOffsetDistance = 0;
DamageUiManager.DamagePositionCache = undefined;
DamageUiManager.k2t = undefined;
DamageUiManager.SOm = new Map();
DamageUiManager.Y2t = (0, puerts_1.$ref)(undefined);
DamageUiManager.YFa = false;
DamageUiManager.EnableOptimization = false;
DamageUiManager.jVu = 0;
DamageUiManager.HVu = new Set();
DamageUiManager.rXd = new Map();
DamageUiManager.sXd = [];
DamageUiManager.oXd = 0;
DamageUiManager.aXd = undefined;
DamageUiManager.hXd = undefined;
DamageUiManager.LFt = new Map([["", 0], ["Ani_OwnDamageSequence", 1], ["Ani_OwnCriticalDamageSequence", 2], ["Ani_MonsterDamageSequence", 3], ["Ani_MonsterCriticalDamageSequence", 4], ["Ani_BuffSequence", 5], ["Ani_SpecialDamage", 6], ["Ani_SpecialCriticalDamage", 7], ["Ani_SpecialPathDamage", 8]]);
DamageUiManager.Z81 = Stats_1.Stat.Create("DamageUiManager.TickStat1");
DamageUiManager.nXd = undefined;
DamageUiManager.Bem = undefined;
DamageUiManager.HideDamageCritEffect = false; //# sourceMappingURL=DamageUiManager.js.map