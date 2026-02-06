"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRoadWayView = exports.MapRoadWaysMgr = undefined;
const UE = require("ue");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const Vector2D_1 = require("../../../../../../Core/Utils/Math/Vector2D");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class MapRoadWaysMgr {
  constructor(e) {
    this._Ui = 0;
    this.ERi = undefined;
    this.Tgf = [];
    this.qWf = [];
    this.OWf = Vector2D_1.Vector2D.Create();
    this.kG = Vector_1.Vector.Create();
    this.GWf = "/Game/Aki/UI/UIResources/UiWorldMap/Prefabs/UiItem_MapRoadWay_Prefab.UiItem_MapRoadWay_Prefab";
    this.OnMapSetup = () => {
      this.FWf();
      this.NWf();
    };
    this._Ui = e.MapId;
    this.ERi = e.Container;
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.InfrastructureRoadDataUpdate, this.OnMapSetup);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MapOpenFogChange, this.OnMapSetup);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.MapOpenFogFullUpdate, this.OnMapSetup);
  }
  FWf() {
    for (const e of this.Tgf) {
      e.SetUiActive(false);
      this.qWf.push(e);
    }
    this.Tgf.length = 0;
  }
  async NWf() {
    var e = ConfigManager_1.ConfigManager.MapConfig?.GetMapRoadWaysByMapId(this._Ui);
    if (e && e.length !== 0) {
      var t = [];
      for (const i of e) {
        if (this.Lfg(i)) {
          t.push(this.VWf(this._Ui, i.ResourcePath, i.UiPosition, i.UiScale));
        }
      }
      await Promise.all(t);
    }
  }
  Lfg(e) {
    if (e.RoadBuildId > 0) {
      var t = ModelManager_1.ModelManager.InfrastructureModel?.GetRoadDataByRoadId(e.RoadBuildId);
      if (!t || t.Status !== Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusComplete) {
        return false;
      }
    }
    for (const i of e.FogIdArray) {
      if (!ModelManager_1.ModelManager.MapModel?.CheckFogUnlocked(i)) {
        return false;
      }
    }
    return true;
  }
  async VWf(t, i, s, a) {
    if (t === this._Ui) {
      let e = this.qWf.pop();
      (e || (await (e = new MapRoadWayView()).CreateThenShowByPathAsync(this.GWf, this.ERi), t === this._Ui) ? (e.SetUiActive(true), e.SetTexture(i), this.OWf.Set(s[0], s[1]), e.GetRootItem().SetAnchorOffset(this.OWf.ToUeVector2D()), this.kG.Set(a, a, a), e.GetRootItem().SetUIItemScale(this.kG.ToUeVectorOld()), this.Tgf) : (e.SetUiActive(false), this.qWf)).push(e);
    }
  }
  OnChangeWorldMap(e) {
    this._Ui = e;
    this.OnMapSetup();
  }
  Dispose() {
    for (const e of this.Tgf) {
      e.Destroy();
    }
    this.Tgf.length = 0;
    for (const t of this.qWf) {
      t.Destroy();
    }
    this.qWf.length = 0;
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.InfrastructureRoadDataUpdate, this.OnMapSetup);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MapOpenFogChange, this.OnMapSetup);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.MapOpenFogFullUpdate, this.OnMapSetup);
  }
}
exports.MapRoadWaysMgr = MapRoadWaysMgr;
class MapRoadWayView extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture]];
  }
  SetTexture(e) {
    const t = this.GetTexture(0);
    this.TrySetTextureByPath(e, t, undefined, () => {
      t?.SetSizeFromTexture();
    });
  }
}
exports.MapRoadWayView = MapRoadWayView;
//# sourceMappingURL=MapRoadWaysMgr.js.map