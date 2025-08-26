"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseMiniMapPanel = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const BattleChildViewPanel_1 = require("../../../BattleUi/Views/BattleChildViewPanel/BattleChildViewPanel");
const TrapDefenseDefine_1 = require("../../../TrapDefense/TrapDefenseDefine");
const TrapDefenseCampMarkView_1 = require("./MarkView/TrapDefenseCampMarkView");
const TrapDefenseMarkPlayerMarkView_1 = require("./MarkView/TrapDefenseMarkPlayerMarkView");
const TrapDefenseMonsterMarkView_1 = require("./MarkView/TrapDefenseMonsterMarkView");
const TrapDefensePhantomPointMarkView_1 = require("./MarkView/TrapDefensePhantomPointMarkView");
const TrapDefenseRoutePointView_1 = require("./MarkView/TrapDefenseRoutePointView");
const UPDATE_INTERVAL = 50;
class TrapDefenseMiniMapPanel extends BattleChildViewPanel_1.BattleChildViewPanel {
  constructor() {
    super(...arguments);
    this.PUi = 0;
    this.JXu = new Map();
    this.IRe = undefined;
    this.ZXu = Vector2D_1.Vector2D.Create();
    this.eYu = Vector2D_1.Vector2D.Create();
    this.kG = 1;
    this.oYu = undefined;
    this.nYu = new Map();
    this.MAi = () => {
      var e;
      if (ModelManager_1.ModelManager.TrapDefenseModel.MapData.MapId !== 0) {
        this.RootItem.SetUIActive(true);
        this.sYu();
        this.aYu(ModelManager_1.ModelManager.TrapDefenseModel.MapData.MapId);
        e = ControllerHolder_1.ControllerHolder.TowerDefenseEventController.ProcessStatus;
        this.OnTowerDefenseStepUpdate(e);
      }
    };
    this.hYu = async i => {
      if (!this.JXu.has(i)) {
        var t = ModelManager_1.ModelManager.TrapDefenseModel.MapData.GetDynamicMarkInfoByMarkId(i);
        if (t !== undefined) {
          let e = undefined;
          switch (t.MarkType) {
            case 4:
              e = new TrapDefenseCampMarkView_1.TrapDefenseCampMarkView(i);
              this.JXu.set(i, e);
              await e.CreateThenShowByPathAsync(TrapDefenseDefine_1.MARK_PREFAB_PATH, this.GetItem(3));
              break;
            case 3:
              e = new TrapDefenseMonsterMarkView_1.TrapDefenseMonsterMarkView(i);
              this.JXu.set(i, e);
              await e.CreateThenShowByPathAsync(TrapDefenseDefine_1.MARK_PREFAB_PATH, this.GetItem(3));
              break;
            case 2:
              e = new TrapDefensePhantomPointMarkView_1.TrapDefensePhantomPointMarkView(i);
              this.JXu.set(i, e);
              await e.CreateThenShowByPathAsync(TrapDefenseDefine_1.MARK_PREFAB_PATH, this.GetItem(3));
              break;
            case 1:
              await (e = new TrapDefenseMarkPlayerMarkView_1.TrapDefensePlayerMarkView(i, this.GetSprite(5))).CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
              this.JXu.set(i, e);
          }
          if (this.PUi === 0) {
            e?.GetRootItem().SetUIItemScale(new UE.Vector(TrapDefenseDefine_1.MINI_MAP_MARK_SCALE, TrapDefenseDefine_1.MINI_MAP_MARK_SCALE, TrapDefenseDefine_1.MINI_MAP_MARK_SCALE));
          }
        }
      }
      return Promise.resolve();
    };
    this.Cl = () => {
      this.lYu();
      this._Yu();
      this.uYu();
    };
    this.aYe = e => {
      var i = this.JXu.get(e);
      if (i) {
        i.Destroy();
        this.JXu.delete(e);
      }
    };
    this.cYu = e => {
      this.aYu(e);
    };
    this.dYu = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.MapData.GetDynamicMarksByMarkType(2).filter(e => e.IsActivated()).map(e => e.SplineId).forEach(e => {
        if (!this.nYu.has(e)) {
          this.nYu.set(e, []);
        }
        this.nYu.get(e).push([]);
        var i = this.nYu.get(e)[this.nYu.get(e).length - 1];
        var t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseRoutePointShootInterval();
        for (let e = 0; e < ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseRoutePointNum(); e++) {
          var s = new TrapDefenseRoutePointView_1.TrapDefenseRoutePointView();
          s.StartTimestamp = TimerSystem_1.GameplayTimerSystem.Now + t * e;
          s.Index = e;
          s.CreateThenShowByPathAsync(TrapDefenseDefine_1.ROUTE_POINT_PATH, this.GetItem(3));
          i.push(s);
        }
      });
    };
    this.XA = () => {
      UiManager_1.UiManager.OpenView("TrapDefenseMapView");
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UISprite], [6, UE.UITexture], [7, UE.UIButtonComponent]];
    this.BtnBindInfo = [[7, this.XA]];
  }
  InitializeTemp() {
    this.PUi = this.OpenParam === 4 ? 0 : 1;
    this.MAi();
  }
  OnTowerDefenseStepUpdate(t) {
    this.JXu.forEach((e, i) => {
      e.OnTowerDefenseStepUpdate(t);
    });
    this.Jdd();
    if (t === 1) {
      ModelManager_1.ModelManager.TrapDefenseModel.MapData.InitSplineData();
      this.mYu();
    } else {
      this.fYu();
    }
  }
  Jdd() {
    var s = ModelManager_1.ModelManager.TrapDefenseModel.MapData.GetDynamicMarksByMarkType(2);
    s.sort((e, i) => e.IsActivated() !== i.IsActivated() ? e.IsActivated() ? 1 : -1 : e.MarkId - i.MarkId);
    var r = s.map(e => e.WorldPosition);
    var a = Vector_1.Vector.Create();
    for (let t = 0; t < s.length; t++) {
      let i = true;
      for (let e = t + 1; e < s.length; e++) {
        r[e].Subtraction(r[t], a);
        if (a.IsNearlyZero()) {
          i = false;
          break;
        }
      }
      this.JXu.get(s[t].MarkId)?.SetUiActive(i);
    }
  }
  aYu(e) {
    var i;
    var t;
    var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseMapConfigById(e);
    if (e === undefined) {
      this.RootItem.SetUIActive(false);
    } else {
      i = this.PUi === 0 ? e.MiniMapResourcePath : e.MapResourcePath;
      this.kG = this.PUi === 0 ? e.MiniMapScale : e.MapScale;
      if ((t = this.PUi === 0 ? e.UiOffset : e.BigMapUiOffset).length === 2) {
        this.ZXu.Set(t[0], t[1]);
      } else {
        this.ZXu.Reset();
      }
      if (e.CenterOffset.length === 2 && (this.eYu.Set(e.CenterOffset[0], e.CenterOffset[1]), this.PUi === 1)) {
        this.eYu.MultiplyEqual(TrapDefenseDefine_1.BIG_MAP_CENTER_OFFSET_MULTIPLIER);
      }
      this.GetButton(7).GetOwner()?.GetComponentByClass(UE.UIItem.StaticClass())?.SetAnchorOffset(this.ZXu.ToUeVector2D());
      this.SetTextureByPath(i, this.GetTexture(0));
      this.GetItem(1).SetUIActive(false);
      this.SetTextureByPath(e.MiniMapLightResourcePath, this.GetTexture(6));
    }
  }
  OnStart() {
    this.IRe = TimerSystem_1.GameplayTimerSystem.Forever(this.Cl, UPDATE_INTERVAL);
  }
  OnBeforeDestroy() {
    if (this.IRe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
      this.IRe = undefined;
    }
    this.fYu();
    if (this.PUi === 0) {
      ModelManager_1.ModelManager.TrapDefenseModel.MapData.ClearAllSpline();
    }
    this.JXu.forEach((e, i) => {
      e.Destroy();
    });
    this.JXu.clear();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseActivityDataUpdate, this.MAi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseMapMarkRemoved, this.aYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseMapChanged, this.cYu);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseActivityDataUpdate, this.MAi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseMapMarkRemoved, this.aYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseMapChanged, this.cYu);
  }
  Reset() {
    if (this.IRe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
      this.IRe = undefined;
    }
    super.Reset();
  }
  async sYu() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.MapData.GetAllDynamicMarkInfo();
    const t = [];
    e.forEach((e, i) => {
      t.push(this.hYu(i));
    });
    await Promise.all(t);
    this.Jdd();
    this._Yu(true);
  }
  _Yu(t = false) {
    this.JXu.forEach((e, i) => {
      if ((e.NeedUpdatePosition || t) && e.IsShow && e.GetMarkData()) {
        e.UpdatePosition(this.kG, this.eYu);
      }
    });
  }
  lYu() {
    ControllerHolder_1.ControllerHolder.TrapDefenseController.UpdateEnemyPositions();
    ModelManager_1.ModelManager.TrapDefenseModel.MapData.GetDynamicMarksByMarkType(3).forEach(e => {
      var i = this.JXu.get(e.MarkId);
      if (i) {
        if (i.NeedUpdatePosition && i.IsShow && i.GetMarkData()) {
          i.UpdatePosition(this.kG, this.eYu);
        }
      } else {
        this.hYu(e.MarkId);
      }
    });
  }
  mYu() {
    this.oYu ||= TimerSystem_1.GameplayTimerSystem.Forever(this.dYu, ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseRoutePreviewInterval());
  }
  uYu() {
    const n = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseRoutePreviewTime();
    this.nYu.forEach((t, e) => {
      const r = ModelManager_1.ModelManager.TrapDefenseModel.MapData.GetSplineComponent(e);
      const a = r.GetSplineLength();
      t.forEach((e, i) => {
        const s = [];
        e.forEach((e, i) => {
          var t = TimerSystem_1.GameplayTimerSystem.Now - e.StartTimestamp;
          if (t >= n) {
            e.Destroy();
          } else {
            t = a * Math.min(n, t) / n;
            t = r.D_GetLocationAtDistanceAlongSpline(t, 1);
            e.UpdatePosition(t, this.kG, this.eYu);
            s.push(e);
          }
        });
        t[i] = s;
      });
    });
  }
  fYu() {
    this.CYu();
    this.vYu();
    if (this.PUi === 0) {
      ModelManager_1.ModelManager.TrapDefenseModel.MapData.ClearAllSpline();
    }
  }
  CYu() {
    if (this.oYu) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.oYu);
      this.oYu = undefined;
    }
  }
  vYu() {
    this.nYu.forEach((e, i) => {
      e.forEach((e, i) => {
        e.forEach((e, i) => {
          e.Destroy();
        });
      });
    });
    this.nYu.clear();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (e.length !== 0) {
      e = e[0];
      if (e === "DynActivityTowerMap") {
        e = this.GetGuideUiItem("0");
        if (e !== undefined) {
          var i = this.GetButton(7)?.GetRootComponent();
          if (i !== undefined) {
            return [i, e];
          }
        }
      }
    }
  }
}
exports.TrapDefenseMiniMapPanel = TrapDefenseMiniMapPanel;
//# sourceMappingURL=TrapDefenseMiniMapPanel.js.map