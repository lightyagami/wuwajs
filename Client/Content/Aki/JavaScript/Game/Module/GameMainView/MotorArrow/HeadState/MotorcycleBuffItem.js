"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleBuffItem = exports.MotorcycleBattleBuff = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Time_1 = require("../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../Camera/CameraController");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SHOW_DURATION = 2000;
class MotorcycleBattleBuff extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.ySn = undefined;
    this.rGg = undefined;
    this.$pt = undefined;
    this.IsFree = true;
    this.IsUp = false;
    this.CloseTime = 0;
    this.yB = Vector_1.Vector.Create(0, 0, 0);
  }
  GetResourceId() {
    return "MotorcycleBattleBuff";
  }
  CreateHeadStateView(e, t) {
    var i = this.GetResourceId();
    var i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i);
    this.CreateByPathAsync(i, e, true);
    this.ySn = t;
    var i = CommonParamById_1.configCommonParamById.GetIntArrayConfig("MotorBuffItemOffset");
    if (i && i.length >= 3) {
      this.yB.Set(i[0] ?? 0, i[1] ?? 0, i[2] ?? 0);
    }
  }
  UpdateBuffInfo(e) {
    this.ySn = e;
    if (this.rGg) {
      this.rGg.SetDesc(this.ySn);
    }
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
    this.rGg = new MotorcycleBuffItem();
    await this.rGg.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
    if (this.ySn) {
      this.rGg.SetDesc(this.ySn);
    }
  }
  OnStart() {
    this.$pt = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeShow() {
    this.$pt.StopPlayingSequence();
    this.$pt.PlaySequencePurely("Start", false);
    this.IsFree = false;
    this.IsUp = false;
    this.CloseTime = Time_1.Time.WorldTime + SHOW_DURATION;
    this.RefreshHeadStateRotation();
  }
  SetUp() {
    this.IsUp = true;
    this.$pt.StopPlayingSequence();
    this.$pt.PlaySequencePurely("Up", false);
  }
  async OnBeforeHideAsync() {
    var e = this.IsUp ? "UpClose" : "Close";
    await this.$pt.PlaySequenceAsync(e, new CustomPromise_1.CustomPromise());
    this.IsFree = true;
  }
  Tick() {
    var e;
    var t;
    if (!this.IsFree) {
      if (Time_1.Time.WorldTime > this.CloseTime) {
        this.SetActive(false);
      }
      if ((e = ModelManager_1.ModelManager.SceneTeamModel?.GetCurrentEntity)?.Valid) {
        e = e.Entity.GetComponent(3).ActorLocationProxy;
        t = MathUtils_1.MathUtils.CommonTempVector;
        e.Addition(this.yB, t);
        this.RootItem?.SetUIRelativeLocation(t.ToUeVectorOld());
      }
    }
  }
  RefreshHeadStateRotation() {
    var e = CameraController_1.CameraController.CameraRotator;
    var t = MathUtils_1.MathUtils.CommonTempRotator;
    t.Yaw = e.Yaw + 90;
    t.Roll = e.Pitch - 90;
    t.Pitch = 0;
    this.RootItem.SetUIRelativeRotation(t.ToUeRotator());
  }
}
exports.MotorcycleBattleBuff = MotorcycleBattleBuff;
class MotorcycleBuffItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIText]];
  }
  SetDesc(e) {
    var t = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetBuffGateConfigById(e.BuffGateId);
    if (t) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), t.DetailDesc, ...e.Desc[1]);
      e = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetMotorFightQuality(t.Quality);
      t = ConfigManager_1.ConfigManager.MotorcycleArrowConfig.GetCollectionTypeConfigById(t.Type);
      this.SetTextureByPath(t.TextureIcon, this.GetTexture(2));
      this.GetSprite(1)?.SetColor(UE.Color.FromHex(e.BgColor));
    }
  }
}
exports.MotorcycleBuffItem = MotorcycleBuffItem;
//# sourceMappingURL=MotorcycleBuffItem.js.map