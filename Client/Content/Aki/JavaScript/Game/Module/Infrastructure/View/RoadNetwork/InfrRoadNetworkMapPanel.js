"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InfrRoadNetworkMapPanel = undefined;
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const LocalStorage_1 = require("../../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
const InfrRoadNetworkMarkItem_1 = require("./InfrRoadNetworkMarkItem");
const InfrRoadNetworkObservatoryMarkItem_1 = require("./InfrRoadNetworkObservatoryMarkItem");
class InfrRoadNetworkMapPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.c6m = new Map();
    this.d6m = new InfrRoadNetworkObservatoryMarkItem_1.InfrRoadNetworkObservatoryMarkItem();
    this.m6m = 0;
    this.f6m = 0;
    this.g6m = undefined;
    this.cz = Vector_1.Vector.Create();
    this.euf = false;
    this.tsg = 0;
    this.isg = Protocol_1.Aki.Protocol.a4m.Proto_Road;
    this.C6m = [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19];
    this.p6m = [10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22];
    this.TextureStaticLineList = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62];
    this.oQf = [23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
    this.TextureLineSweepList = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42];
    this.v6m = t => {
      if (this.f6m === 1) {
        var i = this.c6m.get(this.m6m);
        i?.SetSelected(false);
        if (i) {
          const e = this.E6m();
          i = e.indexOf(this.m6m);
          this.GetItem(this.TextureLineSweepList[i]).SetUIActive(false);
          this.GetItem(this.oQf[i]).SetUIActive(false);
        }
      } else if (this.f6m === 2) {
        this.d6m.SetSelected(false);
      }
      this.f6m = 1;
      this.m6m = t;
      i = this.c6m.get(t);
      const e = this.E6m();
      (ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(t)?.Status === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusComplete ? this.GetItem(this.TextureLineSweepList[e.indexOf(t)]) : this.GetItem(this.oQf[e.indexOf(t)])).SetUIActive(true);
      i?.Refresh(t);
      this.g6m?.({
        DeliveryType: Protocol_1.Aki.Protocol.a4m.Proto_Road,
        RoadId: t,
        OpenSource: 0
      });
    };
    this.y6m = () => {
      if (this.f6m !== 2) {
        if (this.f6m === 1) {
          this.c6m.get(this.m6m)?.SetSelected(false);
        }
        this.f6m = 2;
        this.d6m.Refresh();
        this.g6m?.({
          DeliveryType: Protocol_1.Aki.Protocol.a4m.Proto_Observatory,
          RoadId: this.m6m,
          OpenSource: 0
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIItem], [31, UE.UIItem], [32, UE.UIItem], [33, UE.UIItem], [34, UE.UIItem], [35, UE.UIItem], [36, UE.UIItem], [37, UE.UIItem], [38, UE.UIItem], [39, UE.UIItem], [40, UE.UIItem], [41, UE.UIItem], [42, UE.UIItem], [52, UE.UIItem], [53, UE.UIItem], [54, UE.UIItem], [55, UE.UIItem], [56, UE.UIItem], [57, UE.UIItem], [58, UE.UIItem], [59, UE.UIItem], [60, UE.UIItem], [61, UE.UIItem], [62, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.S6m(), this.M6m()]);
  }
  E6m() {
    return ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigList().map(t => t.Id).sort((t, i) => t - i);
  }
  async S6m() {
    var i = this.E6m();
    var e = [];
    for (let t = 0; t < i.length; t++) {
      var r = i[t];
      if (t >= this.C6m.length) {
        break;
      }
      var s = new InfrRoadNetworkMarkItem_1.InfrRoadNetworkMarkItem();
      this.c6m.set(r, s);
      s.SetOnClickToggleCb(this.v6m);
      e.push(s.CreateThenShowByActorAsync(this.GetItem(this.C6m[t]).GetOwner()));
    }
    await Promise.all(e);
  }
  async M6m() {
    await this.d6m.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
    this.d6m.SetOnClickToggleCb(this.y6m);
  }
  OnStart() {
    var t = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkMarkBaseScale");
    this.cz.Set(t, t, t);
    var t = this.OpenParam;
    if (t) {
      this.SetNeedPlayFinishSeq(t.NeedPlayFinishSeq ?? false, t.RoadId, t.DeliveryType);
    }
    this.RefreshAllMarks();
    this.T6m();
  }
  RefreshAllMarks() {
    for (var [t, i] of this.c6m) {
      i.SetNeedPlayFinishSeq(this.euf && this.isg === Protocol_1.Aki.Protocol.a4m.Proto_Road, this.tsg);
      i.Refresh(t);
    }
    this.d6m.SetNeedPlayFinishSeq(this.euf && this.isg === Protocol_1.Aki.Protocol.a4m.Proto_Observatory);
  }
  T6m() {
    var t = this.E6m();
    let i = 0;
    for (i = 0; i < t.length; i++) {
      var e = t[i];
      if (ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(e)?.Status === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusComplete) {
        if (this.tsg === e && this.isg === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
          this.GetItem(this.p6m[i]).SetUIActive(false);
          this.GetItem(this.TextureStaticLineList[i]).SetUIActive(false);
        } else {
          this.GetItem(this.p6m[i]).SetUIActive(false);
          this.GetItem(this.TextureStaticLineList[i]).SetUIActive(true);
        }
        if (this.p6m[i] === 21) {
          this.GetItem(52).SetUIActive(false);
        }
      } else {
        this.GetItem(this.p6m[i]).SetUIActive(false);
        this.GetItem(this.TextureStaticLineList[i]).SetUIActive(false);
      }
    }
    while (i < this.p6m.length && i < this.C6m.length) {
      this.GetItem(this.p6m[i]).SetUIActive(false);
      this.GetItem(this.C6m[i]).SetUIActive(false);
      i++;
    }
  }
  SetOnClickMarkCb(t) {
    this.g6m = t;
  }
  SetNeedPlayFinishSeq(t, i, e) {
    this.euf = t;
    this.tsg = i;
    this.isg = e;
  }
  SelectMark(t, i) {
    var e;
    if (t === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
      this.c6m.get(i)?.SetSelected(true);
      e = this.E6m();
      (ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(i)?.Status === Protocol_1.Aki.Protocol.g4m.Proto_InfrStatusComplete ? this.GetItem(this.TextureLineSweepList[e.indexOf(i)]) : this.GetItem(this.oQf[e.indexOf(i)])).SetUIActive(true);
    } else if (t === Protocol_1.Aki.Protocol.a4m.Proto_Observatory) {
      this.d6m.SetSelected(true);
    }
  }
  DeselectMark() {
    var t;
    if (this.f6m === 1) {
      (t = this.c6m.get(this.m6m))?.SetSelected(false);
      if (t) {
        t = this.E6m().indexOf(this.m6m);
        this.GetItem(this.TextureLineSweepList[t]).SetUIActive(false);
        this.GetItem(this.oQf[t]).SetUIActive(false);
      }
    } else if (this.f6m === 2) {
      this.d6m.SetSelected(false);
    }
    this.f6m = 0;
    this.m6m = -1;
  }
  GetMarkUiPosition(t) {
    var t = this.c6m.get(t);
    if (t) {
      return [(t = t.GetRootItem().GetAnchorOffset()).X, t.Y];
    } else {
      return [0, 0];
    }
  }
  GetObservatoryMarkUiPosition() {
    var t = this.d6m.GetRootItem().GetAnchorOffset();
    return [t.X, t.Y];
  }
  RefreshMarkScale(t) {
    var i = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkMarkBaseScale");
    var e = Vector_1.Vector.Create(i / t, i / t, i / t);
    for (const r of this.c6m.values()) {
      r.GetRootItem().SetUIItemScale(e.ToUeVectorOld());
    }
    this.d6m.GetRootItem().SetUIItemScale(e.ToUeVectorOld());
  }
  ShowMarkFinishSeq(t, i, e) {
    if (t === Protocol_1.Aki.Protocol.a4m.Proto_Road) {
      this.c6m.get(i)?.ShowMarkFinish(() => {
        var t = this.E6m();
        if (this.p6m[t.indexOf(i)] === 21) {
          this.GetItem(52).SetUIActive(false);
        }
        e?.();
      });
    } else if (t === Protocol_1.Aki.Protocol.a4m.Proto_Observatory) {
      this.d6m.ShowMarkFinish(() => {
        e?.();
      });
    }
  }
  RefreshFinishTextureLine(t) {
    var i = this.E6m();
    this.GetItem(this.p6m[i.indexOf(t)]).SetUIActive(true);
  }
  ShowMarkUnlock(t, i) {
    var e = ModelManager_1.ModelManager.InfrastructureModel.GetHasUnlockRoadAndNotPlaySeqMark();
    for (const s of e) {
      this.c6m.get(s)?.ShowMarkUnlock(i);
    }
    if (e.length === 0) {
      i();
    }
    var e = ModelManager_1.ModelManager.InfrastructureModel.FireLevel;
    var r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.InfrObservatoryLevelUpSeq);
    if (r && r < e && !t) {
      this.d6m.ShowLevelUpSeq();
    }
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.InfrObservatoryLevelUpSeq, ModelManager_1.ModelManager.InfrastructureModel.FireLevel);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (t.length !== 0 && t[0] === "RoadMark") {
      i = Number(t[1]);
      return this.c6m.get(i)?.GetGuideUiItemAndUiItemForShowEx(t);
    } else {
      return undefined;
    }
  }
}
exports.InfrRoadNetworkMapPanel = InfrRoadNetworkMapPanel;
//# sourceMappingURL=InfrRoadNetworkMapPanel.js.map