"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MiniMapView = undefined;
const UE = require("ue");
const Stats_1 = require("../../../../Core/Common/Stats");
const Time_1 = require("../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil");
const MapUtil_1 = require("../../Map/MapUtil");
const MiniMap_1 = require("../../Map/View/BaseMap/MiniMap");
const WorldMapController_1 = require("../../WorldMap/WorldMapController");
const BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView");
const UPDATE_INTERVAL = 100;
const PLAYER_ROTATE_UPDATE_THRESHOLD = 10;
class MiniMapView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments);
    this.RealMinimapScale = 0;
    this.Nut = undefined;
    this.Out = false;
    this.IRe = undefined;
    this.aN_ = new UE.Rotator(0, 0, 0);
    this.hN_ = new UE.Rotator(0, 0, 0);
    this.d3r = -1;
    this.Fut = () => {
      WorldMapController_1.WorldMapController.OpenView(1, true);
    };
    this.RefreshShow = () => {
      var e;
      var i;
      var t;
      if (this.Out && (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)?.Valid && (t = t.Entity.GetComponent(3))) {
        e = this.GetItem(1);
        i = this.GetSprite(2);
        t = -(t.ActorRotationProxy.Yaw + 90);
        if (Math.abs(this.hN_.Yaw - t) > PLAYER_ROTATE_UPDATE_THRESHOLD) {
          this.hN_.Yaw = t;
          e.SetUIRelativeRotation(this.hN_);
        }
        t = ModelManager_1.ModelManager.CameraModel.CameraRotator.Yaw;
        this.aN_.Yaw = this.lN_(-(t + 90));
        i.SetUIRelativeRotation(this.aN_);
      }
    };
    this.Vut = () => {
      if (this.d3r !== Time_1.Time.Frame) {
        this.d3r = Time_1.Time.Frame;
        MiniMapView.Hut.Start();
        this.jut();
        MiniMapView.Hut.Stop();
      }
    };
  }
  Initialize(e) {
    super.Initialize(e);
    this.InitChildType(4);
    this.Out = false;
  }
  async InitializeAsync() {
    var e = ModelManager_1.ModelManager.MapModel.CurrentMapConfigId;
    var e = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(e, false);
    var i = this.GetItem(0);
    var e = e ? e.LittleMapDefaultScale / 100 : 1;
    var t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    this.Nut = new MiniMap_1.MiniMap(1, t, e, CommonParamById_1.configCommonParamById.GetFloatConfig("MiniMap_Mark_Scale"));
    await this.Nut.CreateThenShowByResourceIdAsync("UiItem_MiniMap_Prefab", i, true);
    this.RealMinimapScale = this.Nut.GetRootActor().GetActorRelativeScale3D().X;
    this.Nut.GetRootItem().SetUIActive(ConfigManager_1.ConfigManager.InstanceDungeonConfig.IsMiniMapShow(ModelManager_1.ModelManager.CreatureModel.GetInstanceId()));
    this.Out = true;
    this.d3r = -1;
    this.IRe = TimerSystem_1.GameplayTimerSystem.Forever(this.Vut, UPDATE_INTERVAL);
  }
  Reset() {
    this.Nut.Destroy();
    if (this.IRe) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
      this.IRe = undefined;
    }
    super.Reset();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UISprite], [3, UE.UIButtonComponent]];
    this.BtnBindInfo = [[3, this.Fut]];
  }
  lN_(e) {
    if (ModelManager_1.ModelManager.CameraModel.CameraMode === 0 && ModelManager_1.ModelManager.CameraModel.FightCamera && ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent) {
      var i = ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent.CurrentCamera;
      var t = i.YawLimitMin;
      var t = (i.YawLimitMax - t) % 360;
      if (MathUtils_1.MathUtils.IsNearlyZero(t) || MathUtils_1.MathUtils.IsNearlyEqual(t, 360)) {
        return MathUtils_1.MathUtils.Clamp(MathUtils_1.MathUtils.WrapAngle(e), i.WorldYawMin, i.WorldYawMax);
      }
    }
    return e;
  }
  jut() {
    var e;
    var i;
    var t;
    if (this.IsUiActiveInHierarchy() && (e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation())) {
      this.Nut.Tick();
      i = Vector2D_1.Vector2D.Create(e.X, e.Y);
      (i = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(i, i)).MultiplyEqual(this.RealMinimapScale).UnaryNegation(i);
      this.Nut.GetRootItem().SetAnchorOffset(i.ToUeVector2D(true));
      this.Nut.UpdateMinimapTiles(e);
      i = Vector2D_1.Vector2D.Create(this.Nut.GetRootItem().GetAnchorOffset());
      t = this.RealMinimapScale;
      this.Nut.MiniMapUpdateMarkItems(i, t, e);
    }
  }
  RefreshOnPlatformChanged() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ModelReady);
  }
  SetRoguelikeVisible(e) {
    this.SetVisible(1, e);
  }
  SetBattleLinkVisible(e) {
    this.SetVisible(2, e);
  }
  RefreshMiniMap() {
    this.Nut?.ChangeMapAsync(ModelManager_1.ModelManager.MapModel.CurrentMapConfigId);
  }
}
(exports.MiniMapView = MiniMapView).Hut = Stats_1.Stat.Create("MiniMapView.UpdateMarkItems");
//# sourceMappingURL=MiniMapView.js.map