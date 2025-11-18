"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonItemDropGrid = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../Core/Common/CustomPromise");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const SmallItemGrid_1 = require("./SmallItemGrid/SmallItemGrid");
class CommonItemDropGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.wTt = 0;
    this.Mne = 0;
    this.Count = 0;
    this.apt = undefined;
    this.oft = undefined;
    this.sft = undefined;
    this.BTt = () => {
      if (this.oft) {
        this.oft(this);
      }
    };
  }
  Initialize(t) {
    this.CreateThenShowByActor(t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIButtonComponent], [1, UE.UIItem], [2, UE.UINiagara]];
    this.BtnBindInfo = [[0, this.BTt]];
  }
  Refresh(t, i, e) {
    var s;
    if (t && (s = t[0])) {
      this.RefreshByItemInfo(s.ItemId, t[1], s.IncId);
    }
  }
  RefreshByItemInfo(t, i, e) {
    this.wTt = e;
    this.Mne = t;
    this.Count = i;
    this.apt = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.Mne);
    if (this.apt) {
      t = {
        Type: 4,
        Data: [t, e],
        ItemConfigId: this.Mne,
        BottomText: i > 0 ? "" + i : ""
      };
      this.sft.Apply(t);
      this.bTt(this.apt.QualityId);
    }
  }
  async AsyncRefreshByItemInfo(t, i, e) {
    this.wTt = e;
    this.Mne = t;
    this.Count = i;
    this.apt = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.Mne);
    if (this.apt) {
      const s = new CustomPromise_1.CustomPromise();
      t = {
        Type: 4,
        Data: [t, e],
        ItemConfigId: this.Mne,
        BottomText: i > 0 ? "" + i : ""
      };
      this.sft.Apply(t);
      this.bTt(this.apt.QualityId, () => {
        s.SetResult();
      });
      await s.Promise;
    }
  }
  bTt(t, i) {
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(t);
    if (t) {
      t = t.DropItemQualityNiagaraPath;
      if (!StringUtils_1.StringUtils.IsEmpty(t)) {
        ResourceSystem_1.ResourceSystem.LoadAsync(t, UE.NiagaraSystem, t => {
          this.GetUiNiagara(2).SetNiagaraSystem(t);
          if (i) {
            i();
          }
        }, 100, this.MemoryTag);
      }
    }
  }
  Clear() {
    this.apt = undefined;
    this.oft = undefined;
  }
  OnStart() {
    this.sft = new SmallItemGrid_1.SmallItemGrid();
    this.sft.Initialize(this.GetItem(1).GetOwner());
  }
  GetUniqueId() {
    return this.wTt;
  }
  GetConfigId() {
    return this.Mne;
  }
  GetItemConfig() {
    return this.apt;
  }
  BindOnClicked(t) {
    this.oft = t;
  }
}
exports.CommonItemDropGrid = CommonItemDropGrid;
//# sourceMappingURL=CommonItemDropGrid.js.map