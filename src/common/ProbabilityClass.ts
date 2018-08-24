class ProbabilityClass {
    public meterLevel:Array<any> = [
        {
            minHeight:0,
            maxHeight:4000,
            levelName:[
                'norSpringPropLevel',
                'norSpringPropLevel',
            ],
            levelRate:[1,0],
            maxDistance:40,
            minDistance:30
        },
        {
            minHeight:4000,
            maxHeight:10000,
            levelName:[
                'normalSticketLevel',
                'norWingPropLevel',
                'norSpringPropLevel'
            ],
            levelRate:[0.7,0.2,0.1],
            maxDistance:50,
            minDistance:40
        },
    ]
    public getLevelName(playMeter){
        let nowMeterIndex = this.getNowPropIndex(playMeter);
        let levelIndex = this.getRandomKey(nowMeterIndex);
        let levelName = this.meterLevel[nowMeterIndex].levelName[levelIndex];
        let minDistance = this.meterLevel[nowMeterIndex].minDistance;
        let maxDistance = this.meterLevel[nowMeterIndex].maxDistance;
        return {
            levelName:levelName,
            minDistance:minDistance,
            maxDistance:maxDistance
        }
    }

 	public getNowPropIndex(playMeter) {
		let meter = playMeter;
		let list = this.meterLevel;
		let len = list.length;
		let index = null;

		for (let i = 0; i < len; i++) {
			if (meter >= list[i].minHeight && meter <= list[i].maxHeight) {
				index = i;
				break;
			}
		}
        if(index === null) {
            let randomNum = Math.floor(Math.random()*list.length);
            if(randomNum>=list.length) {
                randomNum = list.length-1;
            }
            index = randomNum;
        }
		return index;
	}
    private getRandomKey(index){
		let randomNum = Math.random();
		let start = 0;
		let end = 0;
		let listKey = null;
        let percentageObj = this.meterLevel[index].levelRate;

        for(let i=0;i<percentageObj.length;i++) {
            end = start+ percentageObj[i];
            if(randomNum>start &&　randomNum<=end) {
				listKey = i;
				break;
			}
            start = end;
        }

		return listKey;
	}
    
    
}