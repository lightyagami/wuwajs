"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardItemListItem = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase");
const LguiEventSystemManager_1 = require("../../../../../../Ui/LguiEventSystem/LguiEventSystemManager");
const GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout");
const DockyardPanelUtil_1 = require("../DockyardPanelUtil");
class ListItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.IsActive = false;
    this.PYl = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnStart() {
    this.PYl = this.GetSprite(0);
  }
  Refresh(t, i, s) {
    this.IsActive = t === 1;
    this.PYl.SetAlpha(t);
  }
  SetSpriteByQuality(t) {
    if (this.IsActive) {
      this.PYl.SetColor(UE.Color.FromHex(t));
    }
  }
}
class ListLayout extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Layout = undefined;
    this.GridWidth = 0;
    this.sGe = () => new ListItem();
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UILayoutBase], [1, UE.UIItem]];
  }
  OnStart() {
    this.Layout = new GenericLayout_1.GenericLayout(this.GetLayoutBase(0), this.sGe, this.GetItem(1).GetOwner());
    this.GridWidth = this.GetItem(1).GetWidth();
  }
  async RefreshAsync(t, i) {
    this.Layout.GetRootUiItem().SetWidth(t[0].length * this.GridWidth);
    this.Layout.GetRootUiItem().SetHeight(t.length * this.GridWidth);
    var t = t.flat();
    await this.Layout.RefreshByDataAsync(t);
    var s = ConfigManager_1.ConfigManager.FishingConfig.GetFishingQualityConfig(i);
    for (const e of this.Layout.GetLayoutItemList()) {
      e.SetSpriteByQuality(s.GridColor);
    }
  }
}
const MOVE_DISTANCE = 50;
class DockyardItemListItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.ParentModel = undefined;
    this.ListLayoutMap = new Map();
    this.ut_ = undefined;
    this.U1e = 0;
    this.BKs = Vector_1.Vector.Create(0, 0, 0);
    this.n5t = Vector_1.Vector.Create(0, 0, 0);
    this.WD_ = false;
    this.$Ve = undefined;
    this.NeedInteract = true;
    this.QD_ = () => {
      this.ParentModel?.DragClick(this.ItemData);
    };
    this.Ngo = () => {
      var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(0);
      if (t) {
        this.U1e = 0;
        this.BKs.DeepCopy(t.pointerPosition);
        this.WD_ = true;
      }
    };
    this.Lke = () => !this.ParentModel || this.ParentModel.InSelectedBlockId !== this.ItemData.IncId;
    this.Pgt = t => {
      this.n5t.DeepCopy(t.pointerPosition);
      t = MathUtils_1.MathUtils.GetAngleByVector2D(this.n5t.SubtractionEqual(this.BKs));
      return !(Math.abs(t) < 45) && !(Math.abs(t) > 135) && !(this.WD_ = false);
    };
    this.Vv1 = () => {
      if (this.ItemData) {
        this.Mk_(this.ItemData.ItemId);
      }
    };
    this.Agt = t => {
      if (this.WD_ && (this.n5t.DeepCopy(t.pointerPosition), t = this.n5t.X - this.BKs.X, this.U1e += t, this.BKs.DeepCopy(this.n5t), Math.abs(this.U1e) > MOVE_DISTANCE)) {
        this.ParentModel?.DragBegin(this.ItemData);
        this.WD_ = false;
      }
      return true;
    };
  }
  OnRegisterComponent() {
    this.ParentModel = this.OpenParam;
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UITexture], [2, UE.UIText], [3, UE.UIItem], [4, UE.UIItem], [5, UE.UIItem], [6, UE.UIItem], [7, UE.UITexture], [8, UE.UIItem]];
  }
  uYl() {
    this.$Ve = this.GetExtendToggle(0);
    if (this.NeedInteract) {
      this.$Ve.OnPointDownCallBack.Bind(this.Ngo);
      this.$Ve.CanExecuteChange.Bind(this.Lke);
      this.$Ve.OnStateChange.Add(this.QD_);
      this.$Ve.OnPointerBeginDragCallBack.Bind(this.Pgt);
      this.$Ve.OnPointerDragCallBack.Bind(this.Agt);
    } else {
      this.$Ve.SetSelfInteractive(false);
      this.$Ve.SetCanClickWhenDisable(false);
    }
  }
  async wYl(t, i) {
    var s = new ListLayout();
    await s.CreateThenShowByActorAsync(i.GetOwner());
    this.ListLayoutMap.set(t, s);
  }
  Mk_(t) {
    t = ModelManager_1.ModelManager.FishingQuestModel.IsUnDeliverableByItemId(t);
    this.GetItem(8).SetUIActive(t);
  }
  EUt(t) {
    t = t ? 1 : 0;
    this.GetExtendToggle(0).SetToggleStateForce(t);
  }
  async OnBeforeStartAsync() {
    this.uYl();
    await Promise.all([this.wYl(3, this.GetItem(4)), this.wYl(4, this.GetItem(5)), this.wYl(5, this.GetItem(6))]);
  }
  OnStart() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.FishingBackpackDeliverableRefresh, this.Vv1);
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.FishingBackpackDeliverableRefresh, this.Vv1);
  }
  UYl() {
    for (const t of this.ListLayoutMap.values()) {
      t.GetRootItem().SetUIActive(false);
    }
  }
  async Aqe(t) {
    var i = this.GetTexture(7);
    i.SetWidth(this.ut_.Width);
    i.SetHeight(this.ut_.Height);
    i.SetUIActive(false);
    var t = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(t);
    await this.SetTextureAsync(t.Pic, i);
    i.SetUIActive(true);
  }
  DYl(t, i) {
    var s = t[0].length;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Dockyard", 10, "列表格子显示长度", ["tag", s]);
    }
    var s = Math.max(s, 3);
    var s = this.ListLayoutMap.get(s);
    this.ut_ = s.GetRootItem();
    this.ut_.SetUIActive(true);
    s.RefreshAsync(t, i);
  }
  BYl(t, i) {
    var i = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(i).Type === 1;
    var s = this.GetTexture(1);
    var t = DockyardPanelUtil_1.DockyardPanelUtil.GetTexturePathByCup(t);
    var i = !StringUtils_1.StringUtils.IsBlank(t) && i;
    s.SetUIActive(i);
    if (i) {
      this.SetTextureByPath(t, s);
    }
  }
  iFi(t) {
    this.GetText(2).SetText(t.toString());
  }
  Refresh(t, i, s) {
    this.UYl();
    this.ItemData = t;
    this.RefreshRedDot();
    this.iFi(t.Price);
    this.BYl(t.Cup, t.ItemId);
    this.DYl(t.ValidDoublyList, t.Quality);
    this.Aqe(t.ItemId);
    this.Mk_(t.ItemId);
    this.RefreshToggleState();
  }
  RefreshRedDot() {
    var t = ModelManager_1.ModelManager.DockyardModel.CheckListItemReadFlag(this.ItemData.ItemId);
    this.GetItem(3).SetUIActive(!t);
  }
  RefreshToggleState() {
    var t;
    if (this.ParentModel) {
      t = this.ParentModel.InSelectedBlockId === this.ItemData.IncId;
      this.EUt(t);
    } else {
      this.EUt(false);
    }
  }
  GetKey(t, i) {
    return this.ItemData;
  }
}
exports.DockyardItemListItem = DockyardItemListItem;
//# sourceMappingURL=DockyardItemListItem.js.map