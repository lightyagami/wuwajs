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
    this.Q5m = new Map();
    this.K5m = new InfrRoadNetworkObservatoryMarkItem_1.InfrRoadNetworkObservatoryMarkItem();
    this.X5m = 0;
    this.Y5m = 0;
    this.z5m = undefined;
    this.cz = Vector_1.Vector.Create();
    this.klf = false;
    this.JWf = 0;
    this.ZWf = Protocol_1.Aki.Protocol.VNm.Proto_Road;
    this.J5m = [0, 1, 2, 3, 4, 5, 6, 7, 8, 18, 19];
    this.Z5m = [10, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22];
    this.TextureStaticLineList = [53, 54, 55, 56, 57, 58, 59, 60, 61, 62];
    this.I5f = [23, 24, 25, 26, 27, 28, 29, 30, 31, 32];
    this.TextureLineSweepList = [33, 34, 35, 36, 37, 38, 39, 40, 41, 42];
    this.eVm = t => {
      if (this.Y5m === 1) {
        var i = this.Q5m.get(this.X5m);
        i?.SetSelected(false);
        if (i) {
          const e = this.oVm();
          i = e.indexOf(this.X5m);
          this.GetItem(this.TextureLineSweepList[i]).SetUIActive(false);
          this.GetItem(this.I5f[i]).SetUIActive(false);
        }
      } else if (this.Y5m === 2) {
        this.K5m.SetSelected(false);
      }
      this.Y5m = 1;
      this.X5m = t;
      i = this.Q5m.get(t);
      const e = this.oVm();
      (ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(t)?.Status === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete ? this.GetItem(this.TextureLineSweepList[e.indexOf(t)]) : this.GetItem(this.I5f[e.indexOf(t)])).SetUIActive(true);
      i?.Refresh(t);
      this.z5m?.({
        DeliveryType: Protocol_1.Aki.Protocol.VNm.Proto_Road,
        RoadId: t,
        OpenSource: 0
      });
    };
    this.tVm = () => {
      if (this.Y5m !== 2) {
        if (this.Y5m === 1) {
          this.Q5m.get(this.X5m)?.SetSelected(false);
        }
        this.Y5m = 2;
        this.K5m.Refresh();
        this.z5m?.({
          DeliveryType: Protocol_1.Aki.Protocol.VNm.Proto_Observatory,
          RoadId: this.X5m,
          OpenSource: 0
        });
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem], [16, UE.UIItem], [17, UE.UIItem], [18, UE.UIItem], [19, UE.UIItem], [20, UE.UIItem], [21, UE.UIItem], [22, UE.UIItem], [23, UE.UIItem], [24, UE.UIItem], [25, UE.UIItem], [26, UE.UIItem], [27, UE.UIItem], [28, UE.UIItem], [29, UE.UIItem], [30, UE.UIItem], [31, UE.UIItem], [32, UE.UIItem], [33, UE.UIItem], [34, UE.UIItem], [35, UE.UIItem], [36, UE.UIItem], [37, UE.UIItem], [38, UE.UIItem], [39, UE.UIItem], [40, UE.UIItem], [41, UE.UIItem], [42, UE.UIItem], [52, UE.UIItem], [53, UE.UIItem], [54, UE.UIItem], [55, UE.UIItem], [56, UE.UIItem], [57, UE.UIItem], [58, UE.UIItem], [59, UE.UIItem], [60, UE.UIItem], [61, UE.UIItem], [62, UE.UIItem]];
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.iVm(), this.rVm()]);
  }
  oVm() {
    return ConfigManager_1.ConfigManager.InfrastructureConfig.GetRoadConfigList().map(t => t.Id).sort((t, i) => t - i);
  }
  async iVm() {
    var i = this.oVm();
    var e = [];
    for (let t = 0; t < i.length; t++) {
      var r = i[t];
      if (t >= this.J5m.length) {
        break;
      }
      var s = new InfrRoadNetworkMarkItem_1.InfrRoadNetworkMarkItem();
      this.Q5m.set(r, s);
      s.SetOnClickToggleCb(this.eVm);
      e.push(s.CreateThenShowByActorAsync(this.GetItem(this.J5m[t]).GetOwner()));
    }
    await Promise.all(e);
  }
  async rVm() {
    await this.K5m.CreateThenShowByActorAsync(this.GetItem(9).GetOwner());
    this.K5m.SetOnClickToggleCb(this.tVm);
  }
  OnStart() {
    var t = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkMarkBaseScale");
    this.cz.Set(t, t, t);
    var t = this.OpenParam;
    if (t) {
      this.SetNeedPlayFinishSeq(t.NeedPlayFinishSeq ?? false, t.RoadId, t.DeliveryType);
    }
    this.RefreshAllMarks();
    this.sVm();
  }
  RefreshAllMarks() {
    for (var [t, i] of this.Q5m) {
      i.SetNeedPlayFinishSeq(this.klf && this.ZWf === Protocol_1.Aki.Protocol.VNm.Proto_Road, this.JWf);
      i.Refresh(t);
    }
    this.K5m.SetNeedPlayFinishSeq(this.klf && this.ZWf === Protocol_1.Aki.Protocol.VNm.Proto_Observatory);
  }
  sVm() {
    var t = this.oVm();
    let i = 0;
    for (i = 0; i < t.length; i++) {
      var e = t[i];
      if (ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(e)?.Status === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete) {
        if (this.JWf === e && this.ZWf === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
          this.GetItem(this.Z5m[i]).SetUIActive(false);
          this.GetItem(this.TextureStaticLineList[i]).SetUIActive(false);
        } else {
          this.GetItem(this.Z5m[i]).SetUIActive(false);
          this.GetItem(this.TextureStaticLineList[i]).SetUIActive(true);
        }
        if (this.Z5m[i] === 21) {
          this.GetItem(52).SetUIActive(false);
        }
      } else {
        this.GetItem(this.Z5m[i]).SetUIActive(false);
        this.GetItem(this.TextureStaticLineList[i]).SetUIActive(false);
      }
    }
    while (i < this.Z5m.length && i < this.J5m.length) {
      this.GetItem(this.Z5m[i]).SetUIActive(false);
      this.GetItem(this.J5m[i]).SetUIActive(false);
      i++;
    }
  }
  SetOnClickMarkCb(t) {
    this.z5m = t;
  }
  SetNeedPlayFinishSeq(t, i, e) {
    this.klf = t;
    this.JWf = i;
    this.ZWf = e;
  }
  SelectMark(t, i) {
    var e;
    if (t === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
      this.Q5m.get(i)?.SetSelected(true);
      e = this.oVm();
      (ModelManager_1.ModelManager.InfrastructureModel.GetRoadDataByRoadId(i)?.Status === Protocol_1.Aki.Protocol.zNm.Proto_InfrStatusComplete ? this.GetItem(this.TextureLineSweepList[e.indexOf(i)]) : this.GetItem(this.I5f[e.indexOf(i)])).SetUIActive(true);
    } else if (t === Protocol_1.Aki.Protocol.VNm.Proto_Observatory) {
      this.K5m.SetSelected(true);
    }
  }
  DeselectMark() {
    var t;
    if (this.Y5m === 1) {
      (t = this.Q5m.get(this.X5m))?.SetSelected(false);
      if (t) {
        t = this.oVm().indexOf(this.X5m);
        this.GetItem(this.TextureLineSweepList[t]).SetUIActive(false);
        this.GetItem(this.I5f[t]).SetUIActive(false);
      }
    } else if (this.Y5m === 2) {
      this.K5m.SetSelected(false);
    }
    this.Y5m = 0;
    this.X5m = -1;
  }
  GetMarkUiPosition(t) {
    var t = this.Q5m.get(t);
    if (t) {
      return [(t = t.GetRootItem().GetAnchorOffset()).X, t.Y];
    } else {
      return [0, 0];
    }
  }
  GetObservatoryMarkUiPosition() {
    var t = this.K5m.GetRootItem().GetAnchorOffset();
    return [t.X, t.Y];
  }
  RefreshMarkScale(t) {
    var i = CommonParamById_1.configCommonParamById.GetFloatConfig("InfrRoadNetworkMarkBaseScale");
    var e = Vector_1.Vector.Create(i / t, i / t, i / t);
    for (const r of this.Q5m.values()) {
      r.GetRootItem().SetUIItemScale(e.ToUeVectorOld());
    }
    this.K5m.GetRootItem().SetUIItemScale(e.ToUeVectorOld());
  }
  ShowMarkFinishSeq(t, i, e) {
    if (t === Protocol_1.Aki.Protocol.VNm.Proto_Road) {
      this.Q5m.get(i)?.ShowMarkFinish(() => {
        var t = this.oVm();
        if (this.Z5m[t.indexOf(i)] === 21) {
          this.GetItem(52).SetUIActive(false);
        }
        e?.();
      });
    } else if (t === Protocol_1.Aki.Protocol.VNm.Proto_Observatory) {
      this.K5m.ShowMarkFinish(() => {
        e?.();
      });
    }
  }
  RefreshFinishTextureLine(t) {
    var i = this.oVm();
    this.GetItem(this.Z5m[i.indexOf(t)]).SetUIActive(true);
  }
  ShowMarkUnlock(t, i) {
    var e = ModelManager_1.ModelManager.InfrastructureModel.GetHasUnlockRoadAndNotPlaySeqMark();
    for (const s of e) {
      this.Q5m.get(s)?.ShowMarkUnlock(i);
    }
    if (e.length === 0) {
      i();
    }
    var e = ModelManager_1.ModelManager.InfrastructureModel.FireLevel;
    var r = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.InfrObservatoryLevelUpSeq);
    if (r && r < e && !t) {
      this.K5m.ShowLevelUpSeq();
    }
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.InfrObservatoryLevelUpSeq, ModelManager_1.ModelManager.InfrastructureModel.FireLevel);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    if (t.length !== 0 && t[0] === "RoadMark") {
      i = Number(t[1]);
      return this.Q5m.get(i)?.GetGuideUiItemAndUiItemForShowEx(t);
    } else {
      return undefined;
    }
  }
}
exports.InfrRoadNetworkMapPanel = InfrRoadNetworkMapPanel;
//# sourceMappingURL=InfrRoadNetworkMapPanel.js.map