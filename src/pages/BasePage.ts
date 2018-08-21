class BasePage extends eui.Component{
    constructor(){
        super();
    }
    public group_container: eui.Group;
    public STAGE_METER: number = 200; // 一屏等于多少米
	public COLOR_STATUS:string='normal';
	public COLOR_DEFAULE:string='normal';
	public imgW:number = 0;

	
	public imgH:number = 0;
    public createChildren() {
        
        super.createChildren();
        //  this.percentHeight=100;
        // this.percentWidth =100;
    }
    public createMoveObj(dataName:string,thisMoveObj){
         let data = RES.getRes(dataName+"_png");
         let textr = RES.getRes(dataName+"_json");
         let mcFactory = new egret.MovieClipDataFactory(textr,data);
         let movePesticide = new egret.MovieClip(mcFactory.generateMovieClipData(dataName));
         thisMoveObj.addChild(movePesticide);
         return movePesticide;
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
		// let leftStage = (meter%this.STAGE_METER)/this.STAGE_METER;

		pixel = stage*this.stage.$stageHeight;

		return pixel;
	}
    // 检查是否超过屏幕底线，是的话就移除该对象
    public checkISOverStage(fatherBox,callback:Function) {
		let list = fatherBox.$children;
		let len = list.length;
		let item;
		let removeChildList = [];
		let nowLen, nowList;

		for (let i = 0; i < len; i++) {
			item = list[i];
			if (item.$y >= this.stage.$stageHeight) {
				removeChildList.push(item);
			}

		}
		if (removeChildList.length) {
			for (let j = 0; j < removeChildList.length; j++) {
				if (removeChildList[j]) {
					fatherBox.removeChild(removeChildList[j]);
					callback(removeChildList[j]);
				}

			}
		}
        return fatherBox;
	}
	public hideAllChildren() {
		let len = this.$children.length;

		for(let i=0;i<len;i++) {
			this.$children[i].visible = false;
		}
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
	/**
	 * 设置当前显示的图片的宽度和高度为计算的宽度和高度
	 */
	public setThisWidthHeight(item:{
		width:number,
		height:number
	}){
		this.imgW = item.width;
		this.imgH = item.height;
	}
	// recycle

	// public recycleObj(obj:Object,list:Array<any>){
	// 	list.push(obj);
	// }
}