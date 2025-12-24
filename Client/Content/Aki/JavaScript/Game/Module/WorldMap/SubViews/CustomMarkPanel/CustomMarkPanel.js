"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomMarkPanel = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const MapController_1 = require("../../../Map/Controller/MapController");
const MarkUiUtils_1 = require("../../../Map/Mark/Misc/MarkUiUtils");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const WorldMapSecondaryUiLayoutB_1 = require("../WorldMapSecondaryUiLayout/WorldMapSecondaryUiLayoutB");
const MarkIconOption_1 = require("./MarkIconOption");
const CUSTOM_MARK_PANEL_WIDTH = 778;
const CUSTOM_MARK_PANEL_HEIGHT = 592;
class CustomMarkPanel extends WorldMapSecondaryUiLayoutB_1.WorldMapSecondaryUiLayoutB {
  constructor() {
    super(...arguments);
    this.g2o = undefined;
    this.u2o = undefined;
    this.f2o = false;
    this.p2o = 0;
    this.OnRightConfirmBtnClick = () => {
      if (!this.LayoutContext?.TakeAction) {
        switch (this.p2o) {
          case 0:
            MapController_1.MapController.RequestCreateCustomMark(this.u2o.TrackPosition, this.u2o.ConfigId);
            this.LayoutContext.TakeAction = true;
            this.Close();
            break;
          case 1:
            var t = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(this.Map, this.u2o);
            if (t) {
              MarkUiUtils_1.MarkUiUtils.QuickGotoTeleport(this.u2o, t, () => {
                this.Close();
              });
            }
        }
      }
    };
    this.OnLeftConfirmBtnClick = () => {
      if (!this.LayoutContext?.TakeAction) {
        this.CheckAndShowCrossMapTips(this.u2o);
        MapController_1.MapController.RequestTrackMapMark({
          MarkType: this.u2o.MarkType,
          MarkId: this.u2o.MarkId,
          Track: !this.f2o,
          TrackMode: 1
        });
        this.LayoutContext.TakeAction = true;
        this.f2o = !this.f2o;
        this.Close();
      }
    };
    this.OnDelBtnClick = () => {
      if (!this.LayoutContext?.TakeAction) {
        if (this.p2o === 1) {
          MapController_1.MapController.RequestRemoveMapMarks(9, [this.u2o.MarkId]);
        }
        this.LayoutContext.TakeAction = true;
        this.Close();
      }
    };
  }
  GetResourceId() {
    return "UiItem_CustomMarkPanel_Prefab";
  }
  OnStart() {
    super.OnStart();
    this.g2o = [];
    this.E2o();
  }
  OnShowWorldMapSecondaryUi(t, i) {
    if (this.LayoutContext) {
      this.LayoutContext.MarkItem = t;
    }
    this.p2o = i;
    t.IsCreated = i === 1;
    this.u2o = t;
    this.LayoutContext.TakeAction = false;
    this.QQl();
    this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), false);
    i = ModelManager_1.ModelManager.MapModel.GetMarkCountByType(9);
    this.GetText(3).text = i + "/" + ModelManager_1.ModelManager.WorldMapModel.CustomMarkSize;
    this.RootItem.SetUIActive(true);
    this.RightConfirmBtn.SetUiActive(true);
    this.LeftConfirmBtn.SetUiActive(true);
    this.MiddleCenterBtn.SetUiActive(false);
    this.SelectOptionChecked(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), "CustomeMark");
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), "CustomeMarkTip");
  }
  SelectOptionChecked(t) {
    if (this.g2o.length !== 0) {
      if (this.p2o === 1) {
        for (const i of this.g2o) {
          if (i.Config.MarkPic === t.IconPath) {
            i.SetToggleChecked();
            return;
          }
        }
      }
      this.g2o[0].SetToggleChecked();
    }
  }
  QQl() {
    switch (this.p2o) {
      case 0:
        var t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_Add_Text") ?? "";
        this.RightConfirmBtn.SetText(t);
        this.RightConfirmBtn.SetEnableClick(true);
        break;
      case 1:
        t = MarkUiUtils_1.MarkUiUtils.FindNearbyValidGotoMark(this.Map, this.u2o);
        this.RightConfirmBtn.SetEnableClick(ModelManager_1.ModelManager.TeleportModel.AllowTeleportByUi && t !== undefined);
        this.RightConfirmBtn.TrySetLocalTextNew("MapMarkQuickTransfer_Text");
    }
    var i = this.p2o === 0;
    this.SetDelBtnActive(!i);
    this.LeftConfirmBtn.SetEnableClick(!i);
    this.Zno(this.u2o.IsTracked);
  }
  OnCloseWorldMapSecondaryUi() {
    this.LayoutContext.TakeAction = false;
    if (this.u2o && this.p2o === 0) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RemoveMapMark, 9, this.u2o.MarkId);
    }
  }
  Zno(t) {
    this.f2o = t;
    t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.f2o ? "Text_InstanceDungeonEntranceCancelTrack_Text" : "Text_InstanceDungeonEntranceTrack_Text") ?? "";
    this.LeftConfirmBtn.SetText(t);
  }
  y2o(t, i) {
    if (i === 1) {
      if (!this.u2o.IsNewCustomMarkItem) {
        MapController_1.MapController.RequestMapMarkReplace(this.u2o.MarkId, t);
      }
      this.u2o.SetConfigId(t);
      this.SetSpriteByPath(this.u2o.IconPath, this.GetSprite(0), false);
    }
  }
  E2o() {
    var t = ConfigManager_1.ConfigManager.WorldMapConfig.GetCustomMarks();
    if (t) {
      for (const s of t) {
        var i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(6), this.GetItem(4));
        var e = new MarkIconOption_1.MarkIconOption();
        e.Initialize(i, this.GetItem(4), s);
        if (this.p2o === 0 && this.g2o.length === 0) {
          e.SetToggleChecked();
        }
        if (this.p2o === 1 && this.u2o.IconPath === s.MarkPic) {
          e.SetToggleChecked();
        }
        e.SetOnclick(this.y2o.bind(this, s.MarkId));
        this.g2o.push(e);
      }
      this.GetItem(6).SetUIActive(false);
    }
  }
  OnAfterShowWorldMapSecondaryUi() {
    super.OnAfterShowWorldMapSecondaryUi();
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMapCustomMarkPanelShow);
  }
  OnRefreshPanel(t) {
    this.u2o = t;
    if (this.u2o) {
      this.LayoutContext.MarkItem = this.u2o;
    }
    this.p2o = this.u2o?.IsCreated ? 1 : 0;
    this.QQl();
  }
}
(exports.CustomMarkPanel = CustomMarkPanel).PanelSize = new UE.Vector2D(CUSTOM_MARK_PANEL_WIDTH, CUSTOM_MARK_PANEL_HEIGHT);
//# sourceMappingURL=CustomMarkPanel.js.map