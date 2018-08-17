
class SetCheckPoints { // extends BasePage
    private minDistance:number=30;
    public stickRecyclePool:any=[];
    private fixtionHeight:Object={
        'fixation':{
            height:32,
            width:126
        }
    };

	private createStick(){
		let item = null;
		let propsList = this.stickRecyclePool;
		if(propsList.length) {
			item = propsList[0];
			propsList.shift();
		}else {
			item = new StickItem();
		}
		return item;
	}


    public fixtionStick(obj:{
          lastY:number,
        stageWidth:number,
        distance:number,
        num:number
    }){
        // interface obj{
          
        // }
        let list = [];
        let perY = obj.lastY;
        let keyName = 'fixation';
        let objHeight = this.fixtionHeight[keyName].height;
        let objWidth= this.fixtionHeight[keyName].width;

        for(let i=0;i<obj.num;i++) {
            let item = this.createStick();
            let ranDistance = Math.ceil(Math.abs(Math.random() * (obj.distance - this.minDistance)) + this.minDistance);
            item.$y = perY-objHeight-ranDistance;
            item.$x = this.randomObjX(obj.stageWidth,objWidth);
            item.typeName = keyName;
            perY = item.$y ;
            list.push(item);
        }
        return list;
    }
    public randomObjX(stageWidth:number,objWidth:number){
        let randomX = 0;
        randomX = Math.random() * (stageWidth-objWidth);
        return randomX;
    }
}