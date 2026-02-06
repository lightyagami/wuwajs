"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DrinksParam = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class DrinksParam {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MainColorPalette() {
    return GameUtils_1.GameUtils.ConvertToArray(this.maincolorpaletteLength(), this.maincolorpalette, this);
  }
  get WaterHighProcessMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.waterhighprocessmapLength(), this.waterhighprocessmapKey, this.waterhighprocessmapValue, this);
  }
  waterhighprocessmapKey(t) {
    return this.waterhighprocessmap(t)?.key();
  }
  waterhighprocessmapValue(t) {
    return this.waterhighprocessmap(t)?.value();
  }
  get WaterMaskCenterOffsetMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.watermaskcenteroffsetmapLength(), this.watermaskcenteroffsetmapKey, this.watermaskcenteroffsetmapValue, this);
  }
  watermaskcenteroffsetmapKey(t) {
    return this.watermaskcenteroffsetmap(t)?.key();
  }
  watermaskcenteroffsetmapValue(t) {
    return this.watermaskcenteroffsetmap(t)?.value();
  }
  get WaterMaskWidthMap() {
    return GameUtils_1.GameUtils.ConvertToMap(this.watermaskwidthmapLength(), this.watermaskwidthmapKey, this.watermaskwidthmapValue, this);
  }
  watermaskwidthmapKey(t) {
    return this.watermaskwidthmap(t)?.key();
  }
  watermaskwidthmapValue(t) {
    return this.watermaskwidthmap(t)?.value();
  }
  get WaterLineColor() {
    return GameUtils_1.GameUtils.ConvertToArray(this.waterlinecolorLength(), this.waterlinecolor, this);
  }
  get WaterColorHigh() {
    return GameUtils_1.GameUtils.ConvertToArray(this.watercolorhighLength(), this.watercolorhigh, this);
  }
  get WaterColorMiddle() {
    return GameUtils_1.GameUtils.ConvertToArray(this.watercolormiddleLength(), this.watercolormiddle, this);
  }
  get WaterColorDown() {
    return GameUtils_1.GameUtils.ConvertToArray(this.watercolordownLength(), this.watercolordown, this);
  }
  get UpColorAdd() {
    return GameUtils_1.GameUtils.ConvertToArray(this.upcoloraddLength(), this.upcoloradd, this);
  }
  get UpLightColor() {
    return GameUtils_1.GameUtils.ConvertToArray(this.uplightcolorLength(), this.uplightcolor, this);
  }
  get ColorMidHighProcess() {
    return this.colormidhighprocess();
  }
  get ColorMidHighWidth() {
    return this.colormidhighwidth();
  }
  get ColorDownMidProcess() {
    return this.colordownmidprocess();
  }
  get ColorDownMidWidth() {
    return this.colordownmidwidth();
  }
  get UpLightMaskProcess() {
    return this.uplightmaskprocess();
  }
  get WaterRoughness() {
    return this.waterroughness();
  }
  get WaterMetallic() {
    return this.watermetallic();
  }
  get FresnelColorAdd() {
    return GameUtils_1.GameUtils.ConvertToArray(this.fresnelcoloraddLength(), this.fresnelcoloradd, this);
  }
  get FresnelRangeWater() {
    return this.fresnelrangewater();
  }
  get RefractIntensity() {
    return this.refractintensity();
  }
  get BubbleIntensity() {
    return this.bubbleintensity();
  }
  get BubbleSpeed() {
    return this.bubblespeed();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsDrinksParam(t, r) {
    return (r || new DrinksParam()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetMaincolorpaletteAt(t) {
    return this.maincolorpalette(t);
  }
  maincolorpalette(t) {
    var r = this.J7.__offset(this.z7, 6);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  maincolorpaletteLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  maincolorpaletteArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetWaterhighprocessmapAt(t, r) {
    return this.waterhighprocessmap(t);
  }
  waterhighprocessmap(t, r) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return (r || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  waterhighprocessmapLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWatermaskcenteroffsetmapAt(t, r) {
    return this.watermaskcenteroffsetmap(t);
  }
  watermaskcenteroffsetmap(t, r) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return (r || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  watermaskcenteroffsetmapLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWatermaskwidthmapAt(t, r) {
    return this.watermaskwidthmap(t);
  }
  watermaskwidthmap(t, r) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return (r || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + i) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  watermaskwidthmapLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWaterlinecolorAt(t) {
    return this.waterlinecolor(t);
  }
  waterlinecolor(t) {
    var r = this.J7.__offset(this.z7, 14);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  waterlinecolorLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  waterlinecolorArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetWatercolorhighAt(t) {
    return this.watercolorhigh(t);
  }
  watercolorhigh(t) {
    var r = this.J7.__offset(this.z7, 16);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  watercolorhighLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  watercolorhighArray() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetWatercolormiddleAt(t) {
    return this.watercolormiddle(t);
  }
  watercolormiddle(t) {
    var r = this.J7.__offset(this.z7, 18);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  watercolormiddleLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  watercolormiddleArray() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetWatercolordownAt(t) {
    return this.watercolordown(t);
  }
  watercolordown(t) {
    var r = this.J7.__offset(this.z7, 20);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  watercolordownLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  watercolordownArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetUpcoloraddAt(t) {
    return this.upcoloradd(t);
  }
  upcoloradd(t) {
    var r = this.J7.__offset(this.z7, 22);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  upcoloraddLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  upcoloraddArray() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetUplightcolorAt(t) {
    return this.uplightcolor(t);
  }
  uplightcolor(t) {
    var r = this.J7.__offset(this.z7, 24);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  uplightcolorLength() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  uplightcolorArray() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  colormidhighprocess() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1100000;
    }
  }
  colormidhighwidth() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1000000;
    }
  }
  colordownmidprocess() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1100000;
    }
  }
  colordownmidwidth() {
    var t = this.J7.__offset(this.z7, 32);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1000000;
    }
  }
  uplightmaskprocess() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -150000;
    }
  }
  waterroughness() {
    var t = this.J7.__offset(this.z7, 36);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 500000;
    }
  }
  watermetallic() {
    var t = this.J7.__offset(this.z7, 38);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetFresnelcoloraddAt(t) {
    return this.fresnelcoloradd(t);
  }
  fresnelcoloradd(t) {
    var r = this.J7.__offset(this.z7, 40);
    if (r) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + r) + t * 4);
    } else {
      return 0;
    }
  }
  fresnelcoloraddLength() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  fresnelcoloraddArray() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  fresnelrangewater() {
    var t = this.J7.__offset(this.z7, 42);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 2200000;
    }
  }
  refractintensity() {
    var t = this.J7.__offset(this.z7, 44);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1000000;
    }
  }
  bubbleintensity() {
    var t = this.J7.__offset(this.z7, 46);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bubblespeed() {
    var t = this.J7.__offset(this.z7, 48);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -150000;
    }
  }
}
exports.DrinksParam = DrinksParam;
//# sourceMappingURL=DrinksParam.js.map