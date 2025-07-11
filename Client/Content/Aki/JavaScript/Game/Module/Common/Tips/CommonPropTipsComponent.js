"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonPropTipsButtonData = exports.CommonPropTipsComponent = undefined;
const UE = require("ue");
const ActorSystem_1 = require("../../../../Core/Actor/ActorSystem");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiResourceManager_1 = require("../../../Ui/LguiResourceManager");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
const GenericLayoutAdd_1 = require("../../Util/GenericLayoutAdd");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ButtonItem_1 = require("../Button/ButtonItem");
const LevelSequencePlayer_1 = require("../LevelSequencePlayer");
class CommonPropTipsComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super();
    this.Ybt = undefined;
    this.GetWayLayout = undefined;
    this.ConfigId = 0;
    this.DoubleButtonItemList = [];
    this.OneButtonItem = undefined;
    this.IsOpenGetWay = false;
    this.Jbt = () => {
      this.IsOpenGetWay = !this.IsOpenGetWay;
      this.GetLayoutBase(5).GetRootComponent().SetUIActive(this.IsOpenGetWay);
      this.GetExtendToggle(4).SetToggleState(this.IsOpenGetWay ? 1 : 0, false);
    };
    this.sGe = (t, e, i) => {
      const s = t;
      var t = new ButtonItem_1.ButtonItem(e);
      var e = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(s);
      if (e) {
        t.SetData(s);
        t.SetEnableClick(e.Type === 2);
        t.SetFunction(t => {
          SkipTaskManager_1.SkipTaskManager.RunByConfigId(s, this.ConfigId);
        });
        t.SetButtonAllowEventBubbleUp(true);
        e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Description);
        t.SetText(e);
      }
      return {
        Key: i,
        Value: t
      };
    };
    this.zbt = LguiResourceManager_1.LguiResourceManager.InvalidId;
    this.CreateThenShowByActor(t.GetOwner());
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIText], [4, UE.UIExtendToggle], [5, UE.UILayoutBase], [6, UE.UIItem], [7, UE.UIItem], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UISprite], [12, UE.UIText], [13, UE.UISprite], [14, UE.UIText], [15, UE.UIItem]];
    this.BtnBindInfo = [[4, this.Jbt]];
  }
  OnStart() {
    this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
    this.GetWayLayout = new GenericLayoutAdd_1.GenericLayoutAdd(this.GetLayoutBase(5), this.sGe);
    this.GetItem(15).SetUIActive(true);
    this.Zbt(false);
    this.SetBottomState(false, false);
    this.OneButtonItem = new ButtonItem_1.ButtonItem(this.GetItem(8));
    var i = this.GetItem(7).GetAttachUIChildren();
    for (let t = 0, e = i.Num(); t < e; ++t) {
      var s = new ButtonItem_1.ButtonItem(i.Get(t));
      this.DoubleButtonItemList.push(s);
    }
    this.SetOwnTextState(false);
  }
  Zbt(t) {
    this.GetExtendToggle(4).RootUIComp.SetUIActive(t);
    this.GetLayoutBase(5).GetRootComponent().SetUIActive(false);
    this.IsOpenGetWay = false;
    this.GetExtendToggle(4).SetToggleState(this.IsOpenGetWay ? 1 : 0, false);
  }
  eqt(t) {
    this.GetWayLayout.AddItemToLayout(t, 1);
  }
  LoadDebugText() {
    if (GlobalData_1.GlobalData.IsPlayInEditor) {
      if (this.Ybt) {
        LguiUtil_1.LguiUtil.SetLocalText(this.Ybt, "CommonTipsDebugItemId", this.ConfigId);
      } else {
        LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.zbt);
        this.zbt = LguiResourceManager_1.LguiResourceManager.LoadPrefabByResourceId("UiItem_DebugText_Prefab", this.RootItem, t => {
          this.zbt = LguiResourceManager_1.LguiResourceManager.InvalidId;
          this.Ybt = t.GetComponentByClass(UE.UIText.StaticClass());
          LguiUtil_1.LguiUtil.SetLocalText(this.Ybt, "CommonTipsDebugItemId", this.ConfigId);
        });
      }
    }
  }
  OnBeforeDestroy() {
    this.SPe.Clear();
    this.SPe = undefined;
    this.GetWayLayout.ClearChildren();
    this.GetWayLayout = undefined;
    this.OneButtonItem.Destroy();
    this.OneButtonItem = undefined;
    for (const t of this.DoubleButtonItemList) {
      t.Destroy();
    }
    this.DoubleButtonItemList = [];
    LguiResourceManager_1.LguiResourceManager.CancelLoadPrefab(this.zbt);
    if (this.Ybt) {
      ActorSystem_1.ActorSystem.Put("CommonPropTipsComponent.OnBeforeDestroy", this.Ybt.GetOwner());
      this.Ybt = undefined;
    }
  }
  UpdateComponent(t, e = false) {
    this.ConfigId = t;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Name);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), t.TypeDescription);
    var i = this.GetText(3);
    if (t.AttributesDescription) {
      i.SetUIActive(true);
      LguiUtil_1.LguiUtil.SetLocalTextNew(i, t.AttributesDescription);
    } else {
      i.SetUIActive(false);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(12), t.BgDescription);
    this.SetItemIcon(this.GetTexture(1), this.ConfigId);
    this.SetItemQualityIcon(this.GetSprite(11), this.ConfigId, undefined, "TipsSprite");
    this.LoadDebugText();
    if (e && (this.GetWayLayout.ClearChildren(), t.ItemAccess.length > 0)) {
      this.eqt(t.ItemAccess);
      this.Zbt(true);
    } else {
      this.Zbt(false);
    }
  }
  SetBottomState(t, e) {
    var i;
    var s = this.GetItem(6);
    if (t) {
      s.SetUIActive(true);
      t = this.GetItem(8);
      i = this.GetItem(7);
      t.SetUIActive(e);
      i.SetUIActive(!e);
    } else {
      s.SetUIActive(false);
    }
  }
  SetOwnTextState(t) {
    var e = this.GetText(14);
    if (t) {
      t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ConfigId);
      LguiUtil_1.LguiUtil.SetLocalText(e, "ItemTipsHaveNum", t);
      e.SetUIActive(true);
    } else {
      e.SetUIActive(false);
    }
  }
  GetDoubleLeftButton() {
    return this.DoubleButtonItemList[0];
  }
  GetDoubleRightButton() {
    return this.DoubleButtonItemList[1];
  }
  GetOneButton() {
    return this.OneButtonItem;
  }
  SetOneButtonEnable(t) {
    this.OneButtonItem.SetEnableClick(t);
  }
  GetConfigId() {
    return this.ConfigId;
  }
  PlayStartSequence() {
    this.SPe.PlayLevelSequenceByName("Start");
  }
  StopStartSequence() {
    this.SPe.StopSequenceByKey("Start");
  }
}
exports.CommonPropTipsComponent = CommonPropTipsComponent;
class CommonPropTipsButtonData {
  constructor() {
    this.Content = "";
    this.NeedInteractionGroup = false;
    this.ClickFunction = undefined;
  }
}
exports.CommonPropTipsButtonData = CommonPropTipsButtonData;
//# sourceMappingURL=CommonPropTipsComponent.js.map