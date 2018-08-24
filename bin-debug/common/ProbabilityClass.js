var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ProbabilityClass = (function () {
    function ProbabilityClass() {
        this.meterLevel = [
            {
                minHeight: 0,
                maxHeight: 4000,
                levelName: [
                    'norSpringPropLevel',
                    'norSpringPropLevel',
                ],
                levelRate: [1, 0],
                maxDistance: 40,
                minDistance: 30
            },
            {
                minHeight: 4000,
                maxHeight: 10000,
                levelName: [
                    'normalSticketLevel',
                    'norWingPropLevel',
                    'norSpringPropLevel'
                ],
                levelRate: [0.7, 0.2, 0.1],
                maxDistance: 50,
                minDistance: 40
            },
        ];
    }
    ProbabilityClass.prototype.getLevelName = function (playMeter) {
        var nowMeterIndex = this.getNowPropIndex(playMeter);
        var levelIndex = this.getRandomKey(nowMeterIndex);
        var levelName = this.meterLevel[nowMeterIndex].levelName[levelIndex];
        var minDistance = this.meterLevel[nowMeterIndex].minDistance;
        var maxDistance = this.meterLevel[nowMeterIndex].maxDistance;
        return {
            levelName: levelName,
            minDistance: minDistance,
            maxDistance: maxDistance
        };
    };
    ProbabilityClass.prototype.getNowPropIndex = function (playMeter) {
        var meter = playMeter;
        var list = this.meterLevel;
        var len = list.length;
        var index = null;
        for (var i = 0; i < len; i++) {
            if (meter >= list[i].minHeight && meter <= list[i].maxHeight) {
                index = i;
                break;
            }
        }
        if (index === null) {
            var randomNum = Math.floor(Math.random() * list.length);
            if (randomNum >= list.length) {
                randomNum = list.length - 1;
            }
            index = randomNum;
        }
        return index;
    };
    ProbabilityClass.prototype.getRandomKey = function (index) {
        var randomNum = Math.random();
        var start = 0;
        var end = 0;
        var listKey = null;
        var percentageObj = this.meterLevel[index].levelRate;
        for (var i = 0; i < percentageObj.length; i++) {
            end = start + percentageObj[i];
            if (randomNum > start && randomNum <= end) {
                listKey = i;
                break;
            }
            start = end;
        }
        return listKey;
    };
    return ProbabilityClass;
}());
__reflect(ProbabilityClass.prototype, "ProbabilityClass");
//# sourceMappingURL=ProbabilityClass.js.map