class BasePage extends eui.Component{
    constructor(){
        super();
    }
    public STAGE_METER: number = 200; // 一屏等于多少米

	
	// public imgH:number = 0;
    public createChildren() {
        
        super.createChildren();
    }
    /**
	 * 像素更换成多少米
	*/
	public changeToMeter(y, stage) {
		let meterNum = null;
		if (y > 0) {
			meterNum = (this.stage.$stageHeight - y) / this.stage.$stageHeight * this.STAGE_METER + (stage - 1) * this.STAGE_METER;
		} else {
			meterNum = (Math.abs(y)) / this.stage.$stageHeight * this.STAGE_METER + stage * this.STAGE_METER;
		}


		return meterNum;
	}
	public doodleChangeToMeter(y){
		let num = 0;
		num = Math.ceil((y/this.stage.$stageHeight)*this.STAGE_METER);
		return num;
	}	

	/**
	 * 米换成像素
	 */
	public changeToPixel(meter) {
		let pixel = 0;
		let stage =meter/this.STAGE_METER;

		pixel = stage*this.stage.$stageHeight;

		return pixel;
	}
	/**
	 * 随机出传入数组中的一个值
	 */
	public randomShowSameType(list) {
		let len = list.length;
		let randomNum ,item;

		if(!len) {
			alert('随机的跳板数组长度不对!');
			return;
		}
		if(len === 1) {
			item = list[0];
		}else {
			randomNum = Math.floor(Math.random()*len);
			if(randomNum>=len) {
				randomNum = len-1;
			}else if(randomNum<0) {
				randomNum = 0;
			}
			item = list[randomNum];
		}

		return item;
	}

}