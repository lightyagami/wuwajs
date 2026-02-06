"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiScanItemMarkItem = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MarkDefine_1 = require("../../Mark/MarkDefine");
const HonamiScanItemMarkItemView_1 = require("../MarkItemView/HonamiScanItemMarkItemView");
const ServerMarkItem_1 = require("./ServerMarkItem");
class HonamiScanItemMarkItem extends ServerMarkItem_1.ServerMarkItem {
  constructor() {
    super(...arguments);
    this.InnerView = undefined;
    this.IsDirty = false;
    this.yIf = false;
    this.OnSubMapChanged = () => {
      this.ECf();
    };
  }
  OnInitialize() {
    super.OnInitialize();
    var e = this.ServerMarkInfo;
    this.SetTrackData(e.TrackTarget);
    var e = MarkDefine_1.HONAMI_SCAN_MARK_ITEM_ID;
    this.SIf();
    this.SetConfigId(e);
    this.UpdateVisibleRelativeState();
    this.Qvm();
    this.yn_();
    this.ECf();
    if (this.MapType === 2) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate, this.OnSubMapChanged);
    }
  }
  OnDestroy() {
    if (this.MapType === 2) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.WorldMapSubMapChangedFromUpdate, this.OnSubMapChanged);
    }
  }
  get InstanceDungeonId() {
    return this.ServerMarkInfo.InstanceDungeonId;
  }
  GetMarkItemViewType() {
    return 30;
  }
  CreateView() {
    return new HonamiScanItemMarkItemView_1.HonamiScanItemMarkItemView(this);
  }
  SetConfigId(e) {
    this.OnSetConfigId(e);
  }
  OnSetConfigId(e) {
    e = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(e);
    this.OnAfterSetConfigId({
      ShowRange: e.ShowRange,
      MarkPic: e.UnlockMarkPic,
      ShowPriority: e.ShowPriority,
      Scale: e.Scale,
      CornerScale: e.CornerScale
    });
  }
  OnAfterSetConfigId(e) {
    if (e) {
      if (e.ShowRange) {
        this.MinShowScale = e.ShowRange[0] ?? 0;
        this.MaxShowScale = e.ShowRange[1] ?? 0;
      }
      this.Qvm();
      if (e.ShowPriority) {
        this.ShowPriority = e.ShowPriority;
      }
      this.ConfigScale = e.Scale ?? 1;
      this.CornerScale = e.CornerScale ?? 1;
    }
  }
  SIf() {
    if (this.EntityConfigId !== undefined && this.EntityConfigId !== 0) {
      this.yIf = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiScanItemWhileListIds().includes(this.EntityConfigId);
    }
  }
  OnUpdate(e) {
    super.OnUpdate(e);
    if (this.MapType === 1) {
      this.fMf();
    }
  }
  Qvm() {
    var e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiMapMarkById(this.GetHonamiMarkCategory());
    if (e) {
      this.IconPath = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e.MarkIconResourceId);
    }
    this.InnerView?.OnIconPathChanged(this.IconPath);
  }
  GetTitleText() {
    var e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiMapMarkById(this.GetHonamiMarkCategory());
    if (e) {
      return ConfigManager_1.ConfigManager.MapConfig.GetLocalText(e.Name);
    } else {
      return "";
    }
  }
  GetMultiMapId() {
    var e;
    if (this.EntityConfigId !== undefined && this.EntityConfigId !== 0 && this.yIf && (e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiScanItemWhiteListConfigByEntityConfigId(this.EntityConfigId))) {
      return e.MultiMapId;
    } else {
      return 0;
    }
  }
  LocateInGround() {
    return this.GetMultiMapId() === 0;
  }
  GetDescriptionText() {
    var e = ConfigManager_1.ConfigManager.HonamiStoryConfig.GetHonamiMapMarkById(this.GetHonamiMarkCategory());
    if (e) {
      return e.Description;
    } else {
      return "";
    }
  }
  GetHonamiMarkCategory() {
    var e = this.ServerMarkInfo;
    var e = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(e.EntityConfigId);
    if (e) {
      e = (0, IComponent_1.getComponent)(e.ComponentsData, "BaseInfoComponent")?.Category?.HonamiStoryMapMarkType;
      if (e !== undefined) {
        return e;
      }
    }
    return 1;
  }
  yn_() {
    var e = this.ServerMarkInfo;
    this.MarkItemEntity.GamePlay.GamePlayState = e.ServerMarkState === Protocol_1.Aki.Protocol.Tom.Proto_MarkComplete ? 2 : 0;
  }
  fMf() {
    this.IsSelectThisFloor = this.GetIsSelectThisFloor();
  }
  ECf() {
    this.fMf();
    this.InnerView?.OnIconPathChanged(this.IconPath);
  }
}
exports.HonamiScanItemMarkItem = HonamiScanItemMarkItem;
//# sourceMappingURL=HonamiScanItemMarkItem.js.map