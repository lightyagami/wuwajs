"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RouletteTipsItemPanel = exports.RouletteAssemblyTips = undefined;
const UE = require("ue");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const CommonItemSmallItemGrid_1 = require("../../Common/ItemGrid/CommonItemSmallItemGrid");
const ItemTipsGetWay_1 = require("../../Common/ItemTips/SubComponents/ItemTipsGetWay");
const HelpController_1 = require("../../Help/HelpController");
const PhantomInteractRouletteTipsPanel_1 = require("../../Phantom/PhantomInteract/View/PhantomInteractRouletteTipsPanel");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../../Util/LguiUtil");
class RouletteAssemblyTips extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.Pe = undefined;
    this.Axt = undefined;
    this.hfo = undefined;
    this.lfo = undefined;
    this.Twf = undefined;
    this.XOe = () => {
      var t = this.Pe.HelpId;
      if (t !== 0) {
        HelpController_1.HelpController.OpenHelpById(t);
      }
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UITexture], [1, UE.UISprite], [2, UE.UITexture], [3, UE.UIText], [4, UE.UIButtonComponent], [5, UE.UIText], [6, UE.UIItem], [7, UE.UIText], [8, UE.UIItem], [9, UE.UIItem], [10, UE.UIItem], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIText], [14, UE.UIItem]];
    this.BtnBindInfo = [[4, this.XOe]];
  }
  async OnBeforeStartAsync() {
    var t = [];
    var e = this.GetItem(10);
    this.hfo = new RouletteTipsItemPanel();
    var e = this.hfo.CreateByActorAsync(e.GetOwner());
    t.push(e);
    var e = this.GetItem(11);
    this.lfo = new RouletteTipsItemPanel();
    var e = this.lfo.CreateByActorAsync(e.GetOwner());
    t.push(e);
    var e = this.GetItem(14);
    this.Twf = new PhantomInteractRouletteTipsPanel_1.PhantomInteractRouletteTipsPanel();
    var e = this.Twf.CreateByResourceIdAsync("UiItem_VisionEditExploring", e);
    t.push(e);
    await Promise.all(t);
  }
  OnStart() {
    var t = this.GetItem(9);
    this.Axt = new ItemTipsGetWay_1.TipsGetWayPanel(t);
  }
  OnBeforeDestroy() {
    if (this.Axt) {
      this.Axt.Destroy();
      this.Axt = undefined;
    }
    if (this.hfo) {
      this.hfo.Destroy();
      this.hfo = undefined;
    }
    if (this.lfo) {
      this.lfo.Destroy();
      this.lfo = undefined;
    }
  }
  Refresh(t) {
    this.Pe = t;
    this.mGe();
    this._fo();
    this.WNe();
    this.ufo();
    this.Kbe();
    this.cfo();
    this.mfo();
    this.dfo();
    this.Cfo();
    this.RefreshPhantomInteractEquipmentPanel();
  }
  mGe() {
    this.GetText(3).ShowTextNew(this.Pe.Title);
  }
  _fo() {
    var t = this.Pe.HelpId;
    this.GetButton(4).RootUIComp.SetUIActive(t !== 0);
  }
  WNe() {
    var t = this.GetTexture(0);
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(this.Pe.BgQuality);
    this.SetTextureByPath(e.RouletteTipsQualityTexPath, t);
  }
  ufo() {
    var t = this.Pe.TextMain !== "" && this.Pe.TextMain !== undefined;
    this.GetText(5).SetUIActive(t);
    if (t) {
      this.GetText(5).ShowTextNew(this.Pe.TextMain);
    }
    var t = this.Pe.TextSub !== "" && this.Pe.TextSub !== undefined;
    this.GetItem(6).SetUIActive(t);
    if (t) {
      this.GetText(7).ShowTextNew(this.Pe.TextSub);
    }
  }
  Kbe() {
    const t = this.GetTexture(2);
    t.SetUIActive(false);
    const e = this.GetSprite(1);
    e.SetUIActive(false);
    if (this.Pe.GridType === 2) {
      this.SetItemIcon(t, this.Pe.GridId, undefined, () => {
        t.SetUIActive(true);
      });
    } else if (this.Pe.IconPath !== "") {
      if (this.Pe.IsIconTexture) {
        this.SetTextureByPath(this.Pe.IconPath, t, undefined, () => {
          t.SetUIActive(true);
        });
      } else {
        this.SetSpriteByPath(this.Pe.IconPath, e, false, undefined, () => {
          e.SetUIActive(true);
        });
      }
    }
  }
  cfo() {
    var t = this.Pe.GetWayData;
    this.Axt.SetActive(t.length > 0);
    if (t) {
      this.Axt.Refresh(t);
    }
  }
  mfo() {
    var [t, e] = this.Pe.CanSetItemNum;
    this.GetItem(12).SetUIActive(e !== 0);
    if (e !== 0) {
      t = StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_CollectProgress_Text"), t.toString(), e.toString());
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(13), "Explore_Count", t);
    }
  }
  dfo() {
    var t = this.Pe.NeedItemMap;
    this.hfo.SetActive(t.size !== 0);
    if (t.size !== 0) {
      const s = [];
      t.forEach((t, e) => {
        var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
        var e = {
          ItemId: e,
          NeedLock: false,
          Text: StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_CollectProgress_Text"), i.toString(), t.toString())
        };
        s.push(e);
      });
      this.hfo.RefreshItemPanel(s);
    }
  }
  Cfo() {
    var t = this.Pe.Authorization;
    this.lfo.SetActive(t.length > 0);
    if (t.length !== 0) {
      var e = [];
      for (const s of t) {
        var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(s);
        var i = {
          ItemId: s,
          NeedLock: i <= 0
        };
        e.push(i);
      }
      this.lfo.RefreshItemPanel(e);
    }
  }
  RefreshPhantomInteractEquipmentPanel() {
    if (this.Pe?.ShowPhantomInteractEquipment) {
      this.Twf.SetUiActive(true);
      this.Twf.Refresh();
    } else {
      this.Twf.SetUiActive(false);
    }
  }
}
exports.RouletteAssemblyTips = RouletteAssemblyTips;
class RouletteTipsItemPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments);
    this.s4e = undefined;
    this.W2e = () => {
      return new CommonItemSmallItemGridWrap();
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIGridLayout], [1, UE.UIItem], [2, UE.UIText]];
  }
  OnStart() {
    this.s4e = new GenericLayout_1.GenericLayout(this.GetGridLayout(0), this.W2e);
  }
  RefreshTitle(t) {
    this.GetText(2).ShowTextNew(t);
  }
  RefreshItemPanel(t) {
    this.s4e.RefreshByData(t);
  }
}
exports.RouletteTipsItemPanel = RouletteTipsItemPanel;
class CommonItemSmallItemGridWrap extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.GridItem = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIItem]];
  }
  Refresh(t, e, i) {
    this.GridItem.RefreshByConfigId(t.ItemId);
    this.GridItem.SetLockVisible(t.NeedLock);
    var s = t.Text !== undefined;
    this.GridItem.SetBottomTextVisible(s);
    if (s) {
      this.GridItem.SetBottomText(t.Text);
    }
  }
  OnStart() {
    this.GridItem = new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
    var t = this.GetItem(0);
    this.GridItem.Initialize(t.GetOwner());
  }
  OnBeforeDestroy() {
    this.GridItem.Destroy();
  }
}
//# sourceMappingURL=RouletteAssemblyTips.js.map