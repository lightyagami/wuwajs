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
const TowerDefenseEventController_1 = require("../../../TowerDefenseEvent/TowerDefenseEventController");
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
    this.$zu = new Map();
    this.IRe = undefined;
    this.Wzu = Vector2D_1.Vector2D.Create();
    this.Qzu = Vector2D_1.Vector2D.Create();
    this.kG = 1;
    this.wKc = undefined;
    this.LKc = new Map();
    this.MAi = () => {
      var e;
      if (ModelManager_1.ModelManager.TrapDefenseModel.MapData.MapId !== 0) {
        this.RootItem.SetUIActive(true);
        this.Kzu();
        this.fZu(ModelManager_1.ModelManager.TrapDefenseModel.MapData.MapId);
        e = TowerDefenseEventController_1.TowerDefenseEventController.ProcessStatus;
        this.OnTowerDefenseStepUpdate(e);
      }
    };
    this.Xzu = async i => {
      if (!this.$zu.has(i)) {
        var t = ModelManager_1.ModelManager.TrapDefenseModel.MapData.GetDynamicMarkInfoByMarkId(i);
        if (t !== undefined) {
          let e = undefined;
          switch (t.MarkType) {
            case 4:
              e = new TrapDefenseCampMarkView_1.TrapDefenseCampMarkView(i);
              this.$zu.set(i, e);
              await e.CreateThenShowByPathAsync(TrapDefenseDefine_1.MARK_PREFAB_PATH, this.GetItem(3));
              break;
            case 3:
              e = new TrapDefenseMonsterMarkView_1.TrapDefenseMonsterMarkView(i);
              this.$zu.set(i, e);
              await e.CreateThenShowByPathAsync(TrapDefenseDefine_1.MARK_PREFAB_PATH, this.GetItem(3));
              break;
            case 2:
              e = new TrapDefensePhantomPointMarkView_1.TrapDefensePhantomPointMarkView(i);
              this.$zu.set(i, e);
              await e.CreateThenShowByPathAsync(TrapDefenseDefine_1.MARK_PREFAB_PATH, this.GetItem(3));
              break;
            case 1:
              await (e = new TrapDefenseMarkPlayerMarkView_1.TrapDefensePlayerMarkView(i, this.GetSprite(5))).CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
              this.$zu.set(i, e);
          }
          if (this.PUi === 0) {
            e?.GetRootItem().SetUIItemScale(new UE.Vector(TrapDefenseDefine_1.MINI_MAP_MARK_SCALE, TrapDefenseDefine_1.MINI_MAP_MARK_SCALE, TrapDefenseDefine_1.MINI_MAP_MARK_SCALE));
          }
        }
      }
      return Promise.resolve();
    };
    this.Cl = () => {
      this.Yzu();
      this.zzu();
      this.AKc();
    };
    this.aYe = e => {
      var i = this.$zu.get(e);
      if (i) {
        i.Destroy();
        this.$zu.delete(e);
      }
    };
    this.mZu = e => {
      this.fZu(e);
    };
    this.PKc = () => {
      ModelManager_1.ModelManager.TrapDefenseModel.MapData.GetDynamicMarksByMarkType(2).filter(e => e.IsActivated()).map(e => e.SplineId).forEach(e => {
        if (!this.LKc.has(e)) {
          this.LKc.set(e, []);
        }
        this.LKc.get(e).push([]);
        var i = this.LKc.get(e)[this.LKc.get(e).length - 1];
        var t = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseRoutePointShootInterval();
        for (let e = 0; e < ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseRoutePointNum(); e++) {
          var r = new TrapDefenseRoutePointView_1.TrapDefenseRoutePointView();
          r.StartTimestamp = TimerSystem_1.GameplayTimerSystem.Now + t * e;
          r.Index = e;
          r.CreateThenShowByPathAsync(TrapDefenseDefine_1.ROUTE_POINT_PATH, this.GetItem(3));
          i.push(r);
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
    this.$zu.forEach((e, i) => {
      e.OnTowerDefenseStepUpdate(t);
    });
    this.pxd();
    if (t === 1) {
      ModelManager_1.ModelManager.TrapDefenseModel.MapData.InitSplineData();
      this.DKc();
    } else {
      this.xKc();
    }
  }
  pxd() {
    var r = ModelManager_1.ModelManager.TrapDefenseModel.MapData.GetDynamicMarksByMarkType(2);
    r.sort((e, i) => e.IsActivated() !== i.IsActivated() ? e.IsActivated() ? 1 : -1 : e.MarkId - i.MarkId);
    var s = r.map(e => e.WorldPosition);
    var a = Vector_1.Vector.Create();
    for (let t = 0; t < r.length; t++) {
      let i = true;
      for (let e = t + 1; e < r.length; e++) {
        s[e].Subtraction(s[t], a);
        if (a.IsNearlyZero()) {
          i = false;
          break;
        }
      }
      this.$zu.get(r[t].MarkId)?.SetUiActive(i);
    }
  }
  fZu(e) {
    var i;
    var t;
    var e = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseMapConfigById(e);
    if (e === undefined) {
      this.RootItem.SetUIActive(false);
    } else {
      i = this.PUi === 0 ? e.MiniMapResourcePath : e.MapResourcePath;
      this.kG = this.PUi === 0 ? e.MiniMapScale : e.MapScale;
      if ((t = this.PUi === 0 ? e.UiOffset : e.BigMapUiOffset).length === 2) {
        this.Wzu.Set(t[0], t[1]);
      } else {
        this.Wzu.Reset();
      }
      if (e.CenterOffset.length === 2 && (this.Qzu.Set(e.CenterOffset[0], e.CenterOffset[1]), this.PUi === 1)) {
        this.Qzu.MultiplyEqual(TrapDefenseDefine_1.BIG_MAP_CENTER_OFFSET_MULTIPLIER);
      }
      this.GetButton(7).GetOwner()?.GetComponentByClass(UE.UIItem.StaticClass())?.SetAnchorOffset(this.Wzu.ToUeVector2D());
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
    this.xKc();
    if (this.PUi === 0) {
      ModelManager_1.ModelManager.TrapDefenseModel.MapData.ClearAllSpline();
      ModelManager_1.ModelManager.TrapDefenseModel.MapData.ClearMapChanged();
    }
    this.$zu.forEach((e, i) => {
      e.Destroy();
    });
    this.$zu.clear();
  }
  AddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseActivityDataUpdate, this.MAi);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseMapMarkRemoved, this.aYe);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.TrapDefenseMapChanged, this.mZu);
  }
  RemoveEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseActivityDataUpdate, this.MAi);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseMapMarkRemoved, this.aYe);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.TrapDefenseMapChanged, this.mZu);
  }
  Reset() {
    if (this.IRe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
      this.IRe = undefined;
    }
    super.Reset();
  }
  async Kzu() {
    var e = ModelManager_1.ModelManager.TrapDefenseModel.MapData.GetAllDynamicMarkInfo();
    const t = [];
    e.forEach((e, i) => {
      t.push(this.Xzu(i));
    });
    await Promise.all(t);
    this.pxd();
    this.zzu(true);
  }
  zzu(t = false) {
    this.$zu.forEach((e, i) => {
      if ((e.NeedUpdatePosition || t) && e.IsShow && e.GetMarkData()) {
        e.UpdatePosition(this.kG, this.Qzu);
      }
    });
  }
  Yzu() {
    ControllerHolder_1.ControllerHolder.TrapDefenseController.UpdateEnemyPositions();
    ModelManager_1.ModelManager.TrapDefenseModel.MapData.GetDynamicMarksByMarkType(3).forEach(e => {
      var i = this.$zu.get(e.MarkId);
      if (i) {
        if (i.NeedUpdatePosition && i.IsShow && i.GetMarkData()) {
          i.UpdatePosition(this.kG, this.Qzu);
        }
      } else {
        this.Xzu(e.MarkId);
      }
    });
  }
  DKc() {
    this.wKc ||= TimerSystem_1.GameplayTimerSystem.Forever(this.PKc, ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseRoutePreviewInterval());
  }
  AKc() {
    const n = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetTrapDefenseRoutePreviewTime();
    this.LKc.forEach((t, e) => {
      const s = ModelManager_1.ModelManager.TrapDefenseModel.MapData.GetSplineComponent(e);
      const a = s.GetSplineLength();
      t.forEach((e, i) => {
        const r = [];
        e.forEach((e, i) => {
          var t = TimerSystem_1.GameplayTimerSystem.Now - e.StartTimestamp;
          if (t >= n) {
            e.Destroy();
          } else {
            t = a * Math.min(n, t) / n;
            t = s.D_GetLocationAtDistanceAlongSpline(t, 1);
            e.UpdatePosition(t, this.kG, this.Qzu);
            r.push(e);
          }
        });
        t[i] = r;
      });
    });
  }
  xKc() {
    this.BKc();
    this.OKc();
    if (this.PUi === 0) {
      ModelManager_1.ModelManager.TrapDefenseModel.MapData.ClearAllSpline();
    }
  }
  BKc() {
    if (this.wKc) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.wKc);
      this.wKc = undefined;
    }
  }
  OKc() {
    this.LKc.forEach((e, i) => {
      e.forEach((e, i) => {
        e.forEach((e, i) => {
          e.Destroy();
        });
      });
    });
    this.LKc.clear();
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