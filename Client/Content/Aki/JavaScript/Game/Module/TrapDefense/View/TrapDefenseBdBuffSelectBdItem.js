"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBdBuffSelectBdItem = undefined;
const UE = require("ue");
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const TrapDefenseBtnTagTips_1 = require("./TrapDefenseBtnTagTips");
class TrapDefenseBdBuffSelectBdItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments);
    this.ItemData = undefined;
    this.ClickCallBack = undefined;
    this.SequenceItem = undefined;
    this.IsUpStage = false;
    this.Quality = 4;
    this.BtnTagTips = undefined;
    this.OnClickToggleSelf = () => {
      this.ClickCallBack?.(this.ItemData);
      this.GetSelfToggle().SetToggleState(0);
    };
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle], [1, UE.UIItem], [2, UE.UIItem], [3, UE.UITexture], [4, UE.UIText], [5, UE.UIText], [6, UE.UIText], [7, UE.UISprite], [8, UE.UISprite], [9, UE.UISprite], [10, UE.UISprite], [11, UE.UIItem], [12, UE.UIItem], [13, UE.UIItem], [14, UE.UIItem], [15, UE.UIItem]];
    this.BtnBindInfo = [[0, this.OnClickToggleSelf]];
  }
  async OnBeforeStartAsync() {
    var t = this.GetItem(15);
    this.BtnTagTips = new TrapDefenseBtnTagTips_1.TrapDefenseBtnTagTips();
    await this.BtnTagTips.Init(t);
  }
  OnStart() {
    this.SequenceItem = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  OnBeforeDestroy() {}
  UpdateDataBase(t) {
    this.ItemData = t;
    var s = this.GetTexture(3);
    this.SetTextureByPath(t.Config.IconSmall, s);
    this.GetText(4)?.ShowTextNew(t.Config.Name);
  }
  Refresh(t) {
    this.UpdateDataBase(t);
    this.UpdateProgressValue();
    this.jHc();
    this.CheckBdActiveNewQuality(true);
  }
  RefreshItem(t) {
    this.UpdateDataBase(t);
    this.UpdateProgressValue();
    this.jHc();
    this.CheckBdActiveNewQuality();
  }
  RefreshCheckProgress(t) {
    this.UpdateDataBase(t);
    this.CheckBdActiveNewQuality();
    var [t] = this.ItemData.PreAddedBuffIsActiveNewQuality(0);
    if (t) {
      t = this.ItemData.GetCurrentActiveProgressNum() - 1;
      this.UpdateProgressValue(t, 1, -1);
    } else {
      this.UpdateProgressValue();
    }
    this.jHc();
  }
  UpdateProgressValue(t, s, e) {
    var i = this.GetText(5);
    var t = t ?? this.ItemData.GetCurrentActiveProgressNum();
    var s = s ?? (this.ItemData.PreAddedBdBuffData ? 1 : 0);
    i.SetText(s > 0 ? t + "+" + s : "" + t);
    var i = this.ItemData.GetSumProgressForStageMode(e);
    this.GetText(6)?.SetText("/" + i);
    var e = i === 0 ? 0 : t / i;
    this.GetSprite(8)?.SetFillAmount(e);
    this.GetSprite(10)?.SetFillAmount(e);
    var e = i === 0 ? 0 : (t + s) / i;
    this.GetSprite(7)?.SetFillAmount(e);
    this.GetSprite(9)?.SetFillAmount(e);
    this.IsUpStage = e == 1 && s > 0;
    if (this.IsUpStage) {
      this.SequenceItem?.PlaySequencePurely("Loop");
    } else {
      this.SequenceItem?.StopSequenceByKey("Loop");
    }
  }
  jHc() {
    var [t, s] = this.ItemData.PreAddedBuffIsActiveNewQuality();
    var e = t && this.IsUpStage;
    switch (this.Quality = s) {
      case 5:
        this.SetProgressShowStatePurple(false);
        this.SetProgressShowStateGold(true, true);
        break;
      case 4:
        this.SetProgressShowStateGold(!e, false, true);
        this.SetProgressShowStatePurple(e, true);
        break;
      default:
        this.SetProgressShowStateGold(false);
        this.SetProgressShowStatePurple(true, false, true);
    }
  }
  SetProgressShowStatePurple(t, s = false, e = false) {
    var i = this.GetSprite(8);
    i?.SetUIActive(t);
    i?.SetChangeColor(e, i.changeColor);
    this.GetItem(2)?.SetUIActive(s);
    this.GetSprite(7)?.SetUIActive(t);
    this.GetItem(11)?.SetUIActive(t);
  }
  SetProgressShowStateGold(t, s = false, e = false) {
    var i = this.GetSprite(10);
    i?.SetUIActive(t);
    i?.SetChangeColor(e, i.changeColor);
    this.GetItem(1)?.SetUIActive(s);
    this.GetSprite(9)?.SetUIActive(t);
    this.GetItem(12)?.SetUIActive(t);
  }
  GetSelfToggle() {
    return this.GetExtendToggle(0);
  }
  async CheckPlayUpStageEffect() {
    var t;
    var s;
    if (this.IsUpStage) {
      this.ItemData.SetPreAddedBuff(undefined);
      this.RefreshItem(this.ItemData);
      s = !(t = this.Quality === 4) && this.Quality === 5;
      this.GetItem(13)?.SetUIActive(s);
      this.GetItem(14)?.SetUIActive(t);
      await this.SequenceItem?.PlaySequenceAsync("Select", new CustomPromise_1.CustomPromise());
    }
  }
  CheckBdActiveNewQuality(t = false) {
    var s;
    if (t && !this.ItemData.PreAddedBdBuffData) {
      this.BtnTagTips.SetActive(false);
    } else {
      [t, s] = this.ItemData.PreAddedBuffIsActiveNewQuality();
      this.BtnTagTips.SetActive(t);
      if (t) {
        this.BtnTagTips.UpdateQuality(s);
        this.BtnTagTips.UpdateDescForBuffSelect(s);
      }
    }
  }
}
exports.TrapDefenseBdBuffSelectBdItem = TrapDefenseBdBuffSelectBdItem;
//# sourceMappingURL=TrapDefenseBdBuffSelectBdItem.js.map