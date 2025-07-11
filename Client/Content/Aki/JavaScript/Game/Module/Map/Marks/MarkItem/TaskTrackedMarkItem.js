"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskTrackedMarkItem = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const GeneralLogicTreeUtil_1 = require("../../../GeneralLogicTree/GeneralLogicTreeUtil");
const MapDefine_1 = require("../../MapDefine");
const MapUtil_1 = require("../../MapUtil");
const ONE_HUNDRED = 100;
class TaskTrackedMarkItem {
  constructor(t, i) {
    this.MarkRange = 0;
    this.RangeMarkShowDisUp = 0;
    this.RangeMarkShowDisDown = 0;
    this.RangeMarkShowDis = 0;
    this.BtType = undefined;
    this.TreeIncId = undefined;
    this.TreeConfigId = 0;
    this.Tree = undefined;
    this.NodeId = 0;
    this.TrackTarget = undefined;
    this.MarkPointInfo = undefined;
    this.Qza = false;
    this.ECt = 2;
    this.NRi = false;
    this.ige = false;
    this.MarkPointInfo = t;
    this.TrackTarget = t.TrackTarget;
    this.NodeId = t.NodeId;
    this.ECt = i;
    if (this.NodeId) {
      this.TreeIncId = t.TreeId;
      this.Tree = ModelManager_1.ModelManager.GeneralLogicTreeModel.GetBehaviorTree(this.TreeIncId);
      if (!this.Tree) {
        return;
      }
      this.BtType = this.Tree.BtType;
      this.TreeConfigId = this.Tree.TreeConfigId;
      i = this.Tree.GetNode(this.NodeId);
      if (i?.TrackTarget && i.TrackTarget.ZaxisViewRange) {
        this.RangeMarkShowDisUp = i.TrackTarget.ZaxisViewRange.Up / ONE_HUNDRED;
        this.RangeMarkShowDisDown = -i.TrackTarget.ZaxisViewRange.Down / ONE_HUNDRED;
      }
      i = this.Tree.GetRangeMarkSize(this.NodeId);
      if (i) {
        this.MarkRange = i / ONE_HUNDRED;
      }
      i = this.Tree.GetRangeMarkShowDis(this.NodeId);
      if (i) {
        this.RangeMarkShowDis = i / ONE_HUNDRED;
      }
    } else {
      this.BtType = Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest;
      this.TreeConfigId = t.TreeId;
    }
    i = this.MarkRange;
    this.NRi = i > 0;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.ECt, this.TreeIncId, this.MarkPointInfo.NodeId, this.MarkPointInfo.MarkId, false);
  }
  Update() {
    var t;
    if (this.NRi && !this.TargetInDiffWorld() && (t = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation())) {
      this.HRi(t);
    }
  }
  HRi(s) {
    if (this.NRi) {
      var h;
      var r = this.RangeMarkShowDis;
      var n = r + 2;
      let t = 0;
      let i = false;
      let e = true;
      i = this.RangeMarkShowDisUp !== 0 || this.RangeMarkShowDisDown !== 0 ? (h = (s.Z - this.WorldPosition.Z) * MapDefine_1.FLOAT_0_01, t = Vector_1.Vector.Dist2D(s, this.WorldPosition) * MapDefine_1.FLOAT_0_01, e = h < this.RangeMarkShowDisUp && h > this.RangeMarkShowDisDown, t > r && h > this.RangeMarkShowDisUp && h < this.RangeMarkShowDisDown) : (t = Vector_1.Vector.Dist(s, this.WorldPosition) * MapDefine_1.FLOAT_0_01) > r;
      if (this.ige) {
        this.vNa(!i);
        this.ige = false;
      } else {
        this.vNa(t < n && e);
      }
    }
  }
  get WorldPosition() {
    return MapUtil_1.MapUtil.GetTrackPositionByTrackTarget(this.TrackTarget, false, undefined, this.MarkPointInfo.MapId);
  }
  get InstanceDungeonId() {
    return this.Tree?.DungeonId;
  }
  vNa(t) {
    if (this.NRi && this.Qza !== t) {
      this.Qza = t;
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TaskRangeTrackStateChange, this.ECt, this.TreeIncId, this.MarkPointInfo.NodeId, this.MarkPointInfo.MarkId, t);
    }
  }
  TargetInDiffWorld() {
    var t;
    var i;
    return !!this.Tree && (t = this.Tree.DungeonId, i = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), !!ModelManager_1.ModelManager.WorldMapModel.IsPlayerInStoryInstanceDungeon() && !!this.AW_() || MapUtil_1.MapUtil.IsDungeonDiffWorld(i, t) === true);
  }
  AW_() {
    return this.InstanceDungeonId !== 0 && this.InstanceDungeonId !== undefined && this.InstanceDungeonId !== ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
  }
}
exports.TaskTrackedMarkItem = TaskTrackedMarkItem;
//# sourceMappingURL=TaskTrackedMarkItem.js.map