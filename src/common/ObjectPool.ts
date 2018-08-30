class ObjectPool {
    constructor(){

    }
    public allPropsClass:Object = {
			woodSticket: WoodSticket,
			waterSticket: WaterSticket,
			normalSticket:NormalSticket,
            verticalSticket:VerticalSticket,
            leafSticket:LeafSticket,
            cloudSticket:CloudSticket,
            monsterProp:Monster,
            mushroomProp:Mushroom,
            rocketProp:Rocket,
            spiderWebProp:SpiderWeb,
            springProp:Spring,
            springShoeProp:SpringShoe,
            wingProp:Wing,
            protectionProp:ProtectionProp,
            bulletProp:Bullet
            
	}
    public allPropsPool:Object = {
			woodSticket: [],
			waterSticket: [],
            verticalSticket:[],
			normalSticket:[],
            leafSticket:[],
            cloudSticket:[],
            monsterProp:[],
            mushroomProp:[],
            rocketProp:[],
            spiderWebProp:[],
            springProp:[],
            springShoeProp:[],
            wingProp:[],
            protectionProp:[],
            bulletProp:[]
	}
    public createSkinObj(recycleName:string,fatherObj?:any){
		let item = null;
        let propsList = this.allPropsPool[recycleName];
        let objClass = this.allPropsClass[recycleName];
		if(this.allPropsPool[recycleName].length) {
			item = this.allPropsPool[recycleName][0];
			this.allPropsPool[recycleName].shift();
            item.resertData();
		}else {
            if(fatherObj) {
                item = new objClass(fatherObj);
            }else {
                item = new objClass();
            }
			
		}

		return item;
	}
    public recycleObj(obj,typeName){
        this.allPropsPool[typeName].push(obj);
    }
}