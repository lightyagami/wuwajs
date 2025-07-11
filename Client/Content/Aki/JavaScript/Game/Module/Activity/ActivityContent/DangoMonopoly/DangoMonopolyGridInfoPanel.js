"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoMonopolyGridInfoPanel = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../../Core/Common/CustomPromise");
const Log_1 = require("../../../../../Core/Common/Log");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const CameraController_1 = require("../../../../Camera/CameraController");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const UiLayer_1 = require("../../../../Ui/UiLayer");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const UiModelUtil_1 = require("../../../UiModel/UiModelUtil");
const DangoMonopolyDefine_1 = require("./DangoMonopolyDefine");
class DangoMonopolyGridInfoPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.GridData = undefined;
    this.Promise = undefined;
    this.RootActorRotation = undefined;
    this.TimerHandle = undefined;
    this.Sequence = undefined;
    this.ActivityData = undefined;
    this.TimerUpdate = () => {
      this.UpdateCameraFace();
    };
  }
  async Init(t, i) {
    this.ActivityData = i;
    await this.CreateThenShowByResourceIdAsync("UiItem_ActivityMonopolyGridInfo");
    this.RootItem?.SetUIParent(UiLayer_1.UiLayer.WorldSpaceUiRootItem);
    this.Sequence = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.RootItem?.SetDisplayName(`MonopolyGrid_${t.Id}_${t.GetPosition()}`);
    this.UpdateGridData(t);
    return this;
  }
  UpdateGridData(t) {
    this.GridData = t;
    this.UpdateData();
    this.CheckCompletedStateToEnd();
  }
  OnBeforeCreate() {}
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIText], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIText], [7, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnStart() {
    this.RootActorRotation = this.RootActor.K2_GetActorRotation();
    this.GetText(6)?.ShowTextNew(DangoMonopolyDefine_1.dangoMonopolyTextKey.Double);
  }
  OnBeforeShow() {
    this.TimerHandle = TimerSystem_1.GameplayTimerSystem.Forever(this.TimerUpdate, TimerSystem_1.MIN_TIME);
  }
  OnBeforeHide() {
    this.ClearTimerHandle();
  }
  OnBeforeDestroy() {
    this.ClearTimerHandle();
  }
  ClearTimerHandle() {
    if (this.TimerHandle) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.TimerHandle);
      this.TimerHandle = undefined;
    }
  }
  UpdateData() {
    var t = this.GridData;
    if (t.IsExistItem()) {
      this.UpdateItemInfo();
    } else if (t.IsExistDango()) {
      this.UpdateDangoInfo();
    } else {
      this.UpdateEmptyInfo();
    }
  }
  CheckCompletedStateToEnd() {
    if (this.GridData.IsFinish()) {
      this.Sequence?.PlayLevelSequenceByName("Done");
      this.Sequence?.EndSequenceLastFrame("Done");
    }
  }
  UpdateItemInfo() {
    var t = this.GridData;
    var i = t.IsActiveDouble();
    this.GetItem(0)?.SetUIActive(i);
    this.GetItem(5)?.SetUIActive(i);
    var i = "X" + (i ? t.ItemCount * 2 : t.ItemCount);
    this.GetText(1)?.SetText(i);
    var i = t.IsFinish();
    this.GetItem(2)?.SetUIActive(i);
    var i = t.ItemId;
    var t = ConfigManager_1.ConfigManager.ItemConfig?.GetConfig(i);
    if (t) {
      i = t.Icon;
      this.SetTextureByPath(i, this.GetTexture(3));
    }
  }
  UpdateDangoInfo() {
    this.SetActive(false);
  }
  UpdateEmptyInfo() {
    this.SetActive(false);
  }
  async EnterStartGridUpdate() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "格子UI => 团子进入格子起步 - 开始起跳 - Burst", ["Id", this.GridData.Id], ["Position", this.GridData.GetPosition()]);
    }
    await this.PlaySequence("Burst");
  }
  async EnterEndGirdUpdate() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "格子UI => 团子进入到格子里之后 - 落地 - ShiftIn", ["Id", this.GridData.Id], ["Position", this.GridData.GetPosition()]);
    }
    await this.Promise?.Promise;
    this.UpdateHeight();
    await this.PlaySequence("ShiftIn");
    this.UpdateData();
    await this.PlaySequence("Done");
  }
  async OutBeforeGridUpdate() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "格子UI => 团子从格子出来之前 - 未起跳 - Hide", ["Id", this.GridData.Id], ["Position", this.GridData.GetPosition()]);
    }
    await this.PlaySequence("Hide");
  }
  async OutStartGridUpdate() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("DangoMonopoly", 69, "格子UI => 团子从格子出来起步 - 开始起跳 - ShiftOut", ["Id", this.GridData.Id], ["Position", this.GridData.GetPosition()]);
    }
    this.UpdateHeight();
    await this.PlaySequence("ShiftOut");
    this.UpdateData();
    await this.PlaySequence("Done");
  }
  async PlaySequence(t) {
    await this.Promise?.Promise;
    this.Promise = new CustomPromise_1.CustomPromise();
    await this.Sequence?.PlaySequenceAsync(t, this.Promise);
    this.Promise = undefined;
  }
  async PlayActiveSequence() {
    this.UpdateData();
    await this.PlaySequence("Transform");
  }
  UpdateRotation(t, i) {
    var e;
    var s;
    if (this.RootActorRotation) {
      i = i - 90;
      t = t + 90;
      e = MathUtils_1.MathUtils.IsNearlyEqual(this.RootActorRotation.Roll, i, 0.001);
      s = MathUtils_1.MathUtils.IsNearlyEqual(this.RootActorRotation.Yaw, t, 0.001);
      if (!e || !s) {
        this.RootActorRotation.Roll = i;
        this.RootActorRotation.Pitch = 0;
        this.RootActorRotation.Yaw = t;
        this.RootItem.SetUIWorldRotation(this.RootActorRotation);
      }
    }
  }
  UpdateCameraFace() {
    var t = CameraController_1.CameraController.CameraRotator;
    if (t) {
      this.UpdateRotation(t.Yaw, t.Pitch);
    }
  }
  UpdateHeight() {
    var t = this.GridData.Id;
    var i = this.ActivityData.ChessPointParamsMap.get(t);
    if (i) {
      t = Vector_1.Vector.Create(i.Location.X, i.Location.Y, this.ActivityData.GetGridEntityInfoAddHeight(t, i.Location.Z)).ToUeVector();
      this.GetRootItem().D_K2_SetWorldLocation(t, true, undefined, false);
    }
  }
  GetCursorPosition() {
    var t = this.GetItem(7);
    return UiModelUtil_1.UiModelUtil.GetActorLguiPos(t.GetOwner());
  }
}
exports.DangoMonopolyGridInfoPanel = DangoMonopolyGridInfoPanel;
//# sourceMappingURL=DangoMonopolyGridInfoPanel.js.map