"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchIncomeDetailView = undefined;
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const CommonDropDown_1 = require("../../Common/DropDown/CommonDropDown");
const OneTextDropDownItem_1 = require("../../Common/DropDown/Item/OneText/OneTextDropDownItem");
const OneTextTitleItem_1 = require("../../Common/DropDown/Item/OneText/OneTextTitleItem");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const FloroRanchTipData_1 = require("../Data/FloroRanchTipData");
const FloroRanchDefine_1 = require("../FloroRanchDefine");
const FloroRanchCommonTipItem_1 = require("./Item/FloroRanchCommonTipItem");
const FloroRanchIncomeItem_1 = require("./Item/FloroRanchIncomeItem");
const FloroRanchTerrainTipItem_1 = require("./Item/FloroRanchTerrainTipItem");
class FloroRanchIncomeDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Dvu = undefined;
    this.VRu = [];
    this.BSi = undefined;
    this.jRu = undefined;
    this.kvu = false;
    this.pUt = true;
    this.ypt = [];
    this.iqu = -1;
    this.MOu = undefined;
    this.TOu = undefined;
    this.bOu = undefined;
    this.ROu = undefined;
    this.wOu = undefined;
    this.nqu = undefined;
    this.$_u = () => {
      var i = new FloroRanchIncomeItem_1.FloroRanchIncomeItem();
      i.BindClickCallBack(this.$Ru);
      i.SetSelectState(false);
      this.VRu.push(i);
      return i;
    };
    this.$Ru = (i, e) => {
      this.aWt(i);
      var i = e.CheckGetComponent(0);
      var t = i.Point;
      var s = i.IsValid && t !== -1;
      if (s) {
        this.jt_(e);
      } else {
        if (t === -1) {
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId("Farm_AnimalBehind");
        }
        this.lqu();
      }
      if (s && e.EntityType !== 2) {
        if (i?.IsValid && s) {
          this.nqu?.(t);
        } else {
          this.nqu?.(0);
        }
      } else {
        this.nqu?.(-1);
      }
    };
    this.$Yl = i => {
      this.WRu(false, this.iqu);
      this.GKu();
      this.bOu.GetRootItem().SetUIActive(false);
      this.TOu.GetRootItem().SetUIActive(false);
      this.nqu?.(-1);
    };
    this.fbu = (i, e) => {
      this.jRu = e;
      this.GKu();
      this.hqu();
    };
    this.Suu = i => {
      return new LguiUtil_1.TableTextArgNew(i.Name);
    };
    this.qvu = () => {
      this.kvu = !this.kvu;
      this.GKu();
      this.hqu();
    };
    this.gbu = () => {
      this.pUt = !this.pUt;
      this.GKu();
      this.hqu();
    };
    this.dV1 = () => {
      this.nqu?.(-1);
      this.hqu();
      this.CloseMe();
    };
    this.BOu = i => {
      if (i === "Close") {
        this.TOu?.SetUiActive(false);
      }
    };
    this.kOu = i => {
      if (i === "Close") {
        this.bOu?.SetUiActive(false);
      }
    };
    this.FOu = () => {
      var i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.OwnCardEntityCount;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Farm_ShowAllAnimal", i);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[2, UE.UIText], [1, UE.UITexture], [3, UE.UIScrollViewWithScrollbarComponent], [4, UE.UIItem], [5, UE.UIItem], [0, UE.UIButtonComponent], [6, UE.UIExtendToggle], [7, UE.UIExtendToggle], [8, UE.UIText], [9, UE.UIItem], [10, UE.UIButtonComponent], [11, UE.UIItem]];
    this.BtnBindInfo = [[0, this.dV1], [7, this.qvu], [6, this.gbu], [10, this.dV1]];
  }
  async OnBeforeStartAsync() {
    this.nqu = this.OpenParam;
    this.MOu = new FloroRanchTipData_1.FloroRanchTipData();
    this.Dvu = new GenericScrollViewNew_1.GenericScrollViewNew(this.GetScrollViewWithScrollbar(3), this.$_u);
    var i = [];
    var e = this.GetItem(9);
    this.bOu = new FloroRanchTerrainTipItem_1.FloroRanchTerrainTipItem();
    i.push(this.bOu.CreateByResourceIdAsync("PnlMapInfo", e, false));
    this.TOu = new FloroRanchCommonTipItem_1.FloroRanchCommonTipItem();
    i.push(this.TOu.CreateByResourceIdAsync("PnlCardItemInfo", e, false));
    this.BSi = new CommonDropDown_1.CommonDropDown(this.GetItem(5), i => new OneTextDropDownItem_1.OneTextDropDownItem(i), i => new OneTextTitleItem_1.OneTextTitleItem(i));
    i.push(this.BSi.Init());
    await Promise.all(i);
    this.ROu = new LevelSequencePlayer_1.LevelSequencePlayer(this.TOu.GetRootItem());
    this.ROu.BindSequenceCloseEvent(this.BOu);
    this.wOu = new LevelSequencePlayer_1.LevelSequencePlayer(this.bOu.GetRootItem());
    this.wOu.BindSequenceCloseEvent(this.kOu);
  }
  OnBeforeShow() {
    ModelManager_1.ModelManager.FloroRanchGamePlayModel.RefreshLastIncomeEntityList();
    this.kvu = false;
    this.pUt = true;
    this.GetText(2).SetText(ModelManager_1.ModelManager.FloroRanchModel.GetCoinText(ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetLastDayIncome()));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), "Farm_ShowAllAnimal", ModelManager_1.ModelManager.FloroRanchGamePlayModel.OwnCardEntityCount);
    this.SetTextureByPath(ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(1).GetSmallIcon(), this.GetTexture(1));
    this.GKu();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnFloroRanchCardEntityCountChange, this.FOu);
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnFloroRanchCardEntityCountChange, this.FOu);
  }
  OnStart() {
    var i = ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchFilterTypeConfigList();
    if (i.length <= 0) {
      this.BSi.SetUiActive(false);
    } else {
      this.jRu = i[0];
      this.BSi.InitScroll(i, this.Suu, 0);
      this.BSi.SetShowType(1);
      this.BSi.SetOnSelectCall(this.fbu);
    }
  }
  aWt(i) {
    this.WRu(false, this.iqu);
    if (i < 0 || i >= this.ypt.length || i === this.iqu) {
      this.iqu = -1;
    } else {
      this.iqu = i;
    }
    this.WRu(true, i);
  }
  hqu() {
    this.aWt(-1);
    this.lqu();
    this.nqu?.(-1);
  }
  _qu(e) {
    var i = e.EntityType;
    var t = e.CheckGetComponent(0).Point;
    switch (i) {
      case 1:
        {
          let i = undefined;
          if (t !== -1) {
            i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetTerrainEntityByPoint(t);
          }
          this.MOu.ChangeTipInfo(1, e, i);
        }
        break;
      case 0:
        {
          let i = undefined;
          if (t !== -1) {
            i = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetCardEntityByPoint(t);
          }
          this.MOu.ChangeTipInfo(1, i, e);
        }
        break;
      case 2:
        this.MOu.ChangeTipInfo(2, e, undefined);
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("FloroRanchGamePlay", 78, "SetTipType Invalid entity type:", ["entityType", i]);
        }
    }
  }
  jt_(i) {
    this._qu(i);
    var i = this.MOu.LastMainEntityData;
    var e = this.MOu.LastSubEntityData;
    var t = this.MOu.MainEntityData;
    var s = this.MOu.SubEntityData;
    var h = this.MOu.LastTipType;
    var o = this.MOu.TipType;
    var h = h === 0 || o === 0;
    if (t) {
      this.WOu(h);
    } else if (i) {
      this.QOu(h);
    }
    if (s) {
      this.KOu(h);
    } else if (e) {
      this.XOu(h);
    }
  }
  XOu(i = true) {
    this.wOu.PlayLevelSequenceByName("Close");
    if (!i) {
      this.wOu.EndSequenceLastFrame("Close");
      this.bOu?.SetUiActive(false);
    }
  }
  QOu(i = true) {
    this.ROu.PlayLevelSequenceByName("Close");
    if (!i) {
      this.ROu.EndSequenceLastFrame("Close");
      this.TOu?.SetUiActive(false);
    }
  }
  KOu(i = true) {
    var e = this.MOu.SubEntityData;
    this.bOu.RefreshInfoTipByEntity(e);
    var e = this.MOu.MainEntityData;
    this.YOu(e ? FloroRanchDefine_1.FLORO_RANCH_TERRAIN_TIP_HEIGHT_SHORT : FloroRanchDefine_1.FLORO_RANCH_TERRAIN_TIP_HEIGHT_HIGHER);
    this.wOu.PlayLevelSequenceByName("Start");
    if (!i) {
      this.wOu.EndSequenceLastFrame("Start");
    }
  }
  WOu(i = true) {
    var e = this.MOu.MainEntityData;
    this.TOu?.RefreshInfoTipByParam({
      TipType: 0,
      EntityData: e,
      RemoveCallback: this.$Yl,
      CurrencyData: undefined
    });
    this.ROu.PlayLevelSequenceByName("Start");
    if (!i) {
      this.ROu.EndSequenceLastFrame("Start");
    }
  }
  lqu() {
    this.MOu.ChangeTipInfo(0, undefined, undefined);
    this.QOu();
    this.XOu();
  }
  YOu(i) {
    var e = this.bOu?.GetRootItem();
    if (e) {
      e.SetHeight(i);
    }
  }
  WRu(i, e) {
    if (!(e < 0) && !(e >= this.VRu.length)) {
      this.VRu[e].SetSelectState(i);
    }
  }
  GKu() {
    this.ypt = ModelManager_1.ModelManager.FloroRanchGamePlayModel.GetLastIncomeEntityList(this.jRu, this.pUt, this.kvu);
    this.Dvu.RefreshByData(this.ypt);
    this.GetItem(11).SetUIActive(this.ypt.length <= 0);
  }
}
exports.FloroRanchIncomeDetailView = FloroRanchIncomeDetailView;
//# sourceMappingURL=FloroRanchIncomeDetailView.js.map